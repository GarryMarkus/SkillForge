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


def _get_mock_github_profile(username: str, reason: str = "") -> dict:
    """Return a graceful fallback mock profile when GitHub API is rate-limited or unavailable."""
    return {
        "username": username,
        "name": username.replace("-", " ").title(),
        "bio": "Software developer exploring modern web applications, distributed systems, and open-source tooling.",
        "public_repos": 3,
        "is_mock": True,
        "fallback_reason": reason,
        "repos": [
            {
                "name": f"{username}-portfolio",
                "description": "Personal developer portfolio and full-stack project showcases.",
                "language": "JavaScript",
                "stars": 4,
                "url": f"https://github.com/{username}/{username}-portfolio"
            },
            {
                "name": "fullstack-dashboard",
                "description": "High-performance full-stack web application built with Django and React.",
                "language": "Python",
                "stars": 12,
                "url": f"https://github.com/{username}/fullstack-dashboard"
            },
            {
                "name": "algorithms-data-structures",
                "description": "Curated solutions to common algorithm challenges and system design exercises.",
                "language": "Python",
                "stars": 7,
                "url": f"https://github.com/{username}/algorithms-data-structures"
            }
        ]
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
        repos_resp = session.get(repos_url, headers=headers, timeout=10)

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
                repo_list.append({
                    "name": repo.get("name", ""),
                    "description": repo.get("description", "") or "",
                    "language": repo.get("language", "") or "",
                    "stars": repo.get("stargazers_count", 0),
                    "url": repo.get("html_url", "")
                })

        return {
            "username": profile_data.get("login", clean_username),
            "name": profile_data.get("name", "") or clean_username,
            "bio": profile_data.get("bio", "") or "",
            "public_repos": profile_data.get("public_repos", len(repo_list)),
            "repos": repo_list
        }
    except requests.RequestException as exc:
        logger.warning("GitHub request exception for '%s': %s. Using mock fallback.", clean_username, exc)
        return _get_mock_github_profile(clean_username, reason=str(exc))
    finally:
        session.close()
