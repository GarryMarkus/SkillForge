import os
import logging
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

logger = logging.getLogger(__name__)


def _get_http_session() -> requests.Session:
    """Return a requests Session with exponential backoff retries for transient 5xx/429 errors."""
    session = requests.Session()
    retry_strategy = Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


def _compute_language_breakdown(repos: list[dict]) -> list[dict]:
    """Compute sorted language counts and percentages across repositories."""
    counts = {}
    for repo in repos:
        lang = str(repo.get("language") or "").strip()
        if lang:
            counts[lang] = counts.get(lang, 0) + 1

    total = sum(counts.values())
    if total == 0:
        return []

    breakdown = [
        {
            "language": lang,
            "count": cnt,
            "percentage": round((cnt / total) * 100, 1),
        }
        for lang, cnt in counts.items()
    ]
    breakdown.sort(key=lambda item: (-item["count"], item["language"].lower()))
    return breakdown


def _sort_repos(repos: list[dict]) -> list[dict]:
    """Prioritize non-forked repositories with higher star counts and recent updates."""
    return sorted(
        repos,
        key=lambda r: (
            1 if r.get("is_fork") else 0,
            1 if r.get("archived") else 0,
            -(int(r.get("stars") or 0)),
            -(int(r.get("forks") or 0)),
        ),
    )


def _get_mock_github_profile(username: str, reason: str = "") -> dict:
    """Return a graceful fallback mock profile when GitHub API is rate-limited or unavailable."""
    repos = [
        {
            "name": "fullstack-dashboard",
            "description": "High-performance full-stack web application built with Django and React.",
            "language": "Python",
            "stars": 12,
            "forks": 3,
            "topics": ["django", "react", "postgresql"],
            "updated_at": "",
            "is_fork": False,
            "archived": False,
            "url": f"https://github.com/{username}/fullstack-dashboard"
        },
        {
            "name": "algorithms-data-structures",
            "description": "Curated solutions to common algorithm challenges and system design exercises.",
            "language": "Python",
            "stars": 7,
            "forks": 1,
            "topics": ["algorithms", "data-structures"],
            "updated_at": "",
            "is_fork": False,
            "archived": False,
            "url": f"https://github.com/{username}/algorithms-data-structures"
        },
        {
            "name": f"{username}-portfolio",
            "description": "Personal developer portfolio and full-stack project showcases.",
            "language": "JavaScript",
            "stars": 4,
            "forks": 1,
            "topics": ["react", "tailwindcss"],
            "updated_at": "",
            "is_fork": False,
            "archived": False,
            "url": f"https://github.com/{username}/{username}-portfolio"
        },
    ]
    return {
        "username": username,
        "name": username.replace("-", " ").title(),
        "bio": "Software developer exploring modern web applications, distributed systems, and open-source tooling.",
        "avatar_url": "",
        "location": "",
        "company": "",
        "blog": "",
        "followers": 0,
        "following": 0,
        "public_repos": len(repos),
        "total_stars": sum(r["stars"] for r in repos),
        "total_forks": sum(r["forks"] for r in repos),
        "language_breakdown": _compute_language_breakdown(repos),
        "is_mock": True,
        "fallback_reason": reason,
        "repos": repos,
    }


def fetch_github_profile(username: str) -> dict:
    """
    Fetch public GitHub user data and repositories.
    Supports optional GITHUB_TOKEN environment variable for higher API rate limits.
    Injects Authorization: token <GITHUB_TOKEN> if present.
    Gracefully falls back to a mock profile on HTTP 403 (rate limited) or 404,
    and applies exponential backoff on transient network faults.
    """
    clean_username = str(username).strip().lstrip("@")
    if not clean_username:
        return _get_mock_github_profile("developer", reason="Empty username")

    base_url = f"https://api.github.com/users/{clean_username}"
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    session = _get_http_session()

    try:
        profile_resp = session.get(base_url, headers=headers, timeout=10)
        if profile_resp.status_code in (403, 404):
            status_desc = "Rate limited (HTTP 403)" if profile_resp.status_code == 403 else "User not found (HTTP 404)"
            logger.warning("GitHub API returned %s for '%s'. Falling back to mock profile.", status_desc, clean_username)
            return _get_mock_github_profile(clean_username, reason=status_desc)

        if profile_resp.status_code != 200:
            logger.warning(
                "GitHub API returned unexpected status %s for '%s'. Falling back to mock profile.",
                profile_resp.status_code,
                clean_username
            )
            return _get_mock_github_profile(clean_username, reason=f"HTTP {profile_resp.status_code}")

        profile_data = profile_resp.json()

        repos_url = profile_data.get("repos_url", f"{base_url}/repos")
        repos_resp = session.get(
            repos_url,
            headers=headers,
            params={"sort": "updated", "per_page": 30},
            timeout=10,
        )

        if repos_resp.status_code in (403, 404):
            logger.warning(
                "GitHub repos endpoint returned %s for '%s'. Falling back to mock profile.",
                repos_resp.status_code,
                clean_username
            )
            return _get_mock_github_profile(clean_username, reason="Repos rate limited or unavailable")

        repos_data = repos_resp.json() if repos_resp.status_code == 200 else []

        repo_list = []
        if isinstance(repos_data, list):
            for repo in repos_data:
                raw_topics = repo.get("topics") or []
                clean_topics = [str(t).strip() for t in raw_topics if str(t).strip()][:6]
                repo_list.append({
                    "name": repo.get("name", ""),
                    "description": repo.get("description", "") or "",
                    "language": repo.get("language", "") or "",
                    "stars": int(repo.get("stargazers_count", 0) or 0),
                    "forks": int(repo.get("forks_count", 0) or 0),
                    "topics": clean_topics,
                    "updated_at": repo.get("pushed_at") or repo.get("updated_at") or "",
                    "is_fork": bool(repo.get("fork", False)),
                    "archived": bool(repo.get("archived", False)),
                    "homepage": repo.get("homepage", "") or "",
                    "url": repo.get("html_url", "")
                })

        sorted_repos = _sort_repos(repo_list)

        return {
            "username": profile_data.get("login", clean_username),
            "name": profile_data.get("name", "") or clean_username,
            "bio": profile_data.get("bio", "") or "",
            "avatar_url": profile_data.get("avatar_url", "") or "",
            "location": profile_data.get("location", "") or "",
            "company": profile_data.get("company", "") or "",
            "blog": profile_data.get("blog", "") or "",
            "followers": int(profile_data.get("followers", 0) or 0),
            "following": int(profile_data.get("following", 0) or 0),
            "public_repos": int(profile_data.get("public_repos", len(sorted_repos)) or len(sorted_repos)),
            "total_stars": sum(r["stars"] for r in sorted_repos),
            "total_forks": sum(r["forks"] for r in sorted_repos),
            "language_breakdown": _compute_language_breakdown(sorted_repos),
            "repos": sorted_repos,
        }
    except requests.RequestException as exc:
        logger.warning("GitHub request exception for '%s': %s. Using mock fallback.", clean_username, exc)
        return _get_mock_github_profile(clean_username, reason=str(exc))
    finally:
        session.close()
