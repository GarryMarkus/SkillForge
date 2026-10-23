import os
import logging
import requests

logger = logging.getLogger(__name__)


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
    Gracefully falls back to a mock profile on HTTP 403 (rate limited) or 404.
    """
    base_url = f"https://api.github.com/users/{username}"
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    try:
        profile_resp = requests.get(base_url, headers=headers, timeout=10)
        if profile_resp.status_code in (403, 404):
            status_desc = "Rate limited (HTTP 403)" if profile_resp.status_code == 403 else "User not found (HTTP 404)"
            logger.warning("GitHub API returned %s for '%s'. Falling back to mock profile.", status_desc, username)
            return _get_mock_github_profile(username, reason=status_desc)

        if profile_resp.status_code != 200:
            logger.warning(
                "GitHub API returned unexpected status %s for '%s'. Falling back to mock profile.",
                profile_resp.status_code,
                username
            )
            return _get_mock_github_profile(username, reason=f"HTTP {profile_resp.status_code}")

        profile_data = profile_resp.json()

        repos_url = profile_data.get("repos_url", f"{base_url}/repos")
        repos_resp = requests.get(repos_url, headers=headers, timeout=10)

        if repos_resp.status_code in (403, 404):
            logger.warning(
                "GitHub repos endpoint returned %s for '%s'. Falling back to mock profile.",
                repos_resp.status_code,
                username
            )
            return _get_mock_github_profile(username, reason="Repos rate limited or unavailable")

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
            "username": profile_data.get("login", username),
            "name": profile_data.get("name", "") or username,
            "bio": profile_data.get("bio", "") or "",
            "public_repos": profile_data.get("public_repos", len(repo_list)),
            "repos": repo_list
        }
    except requests.RequestException as exc:
        logger.warning("GitHub request exception for '%s': %s. Using mock fallback.", username, exc)
        return _get_mock_github_profile(username, reason=str(exc))
