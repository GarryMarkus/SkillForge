import os
import requests


def fetch_github_profile(username: str) -> dict:
    """
    Fetch public GitHub user data and repositories.
    Supports optional GITHUB_TOKEN environment variable for higher API rate limits.
    Returns a dict with profile info and repository metadata.
    """
    base_url = f"https://api.github.com/users/{username}"
    headers = {"Accept": "application/vnd.github.v3+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    profile_resp = requests.get(base_url, headers=headers, timeout=10)
    if profile_resp.status_code != 200:
        raise Exception(f"Failed to fetch GitHub profile for '{username}': HTTP {profile_resp.status_code}")
    profile_data = profile_resp.json()

    repos_resp = requests.get(profile_data.get("repos_url", f"{base_url}/repos"), headers=headers, timeout=10)
    if repos_resp.status_code != 200:
        raise Exception(f"Failed to fetch repositories for '{username}': HTTP {repos_resp.status_code}")
    repos_data = repos_resp.json()

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
        "name": profile_data.get("name", ""),
        "bio": profile_data.get("bio", ""),
        "public_repos": profile_data.get("public_repos", 0),
        "repos": repo_list
    }
