#!/usr/bin/env python3
"""
SkillForge GitHub Wiki Synchronization Script.
Pushes all markdown documentation from the local `wiki/` directory directly
to https://github.com/GarryMarkus/SkillForge.wiki.git.

Note: GitHub requires the first page to be initialized via the web UI once.
Once initialized, this script can be run anytime to update or add pages.
"""

import os
import sys
import shutil
import tempfile
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
WIKI_DIR = ROOT_DIR / "wiki"
REPO_NAME = "GarryMarkus/SkillForge"


def run_cmd(cmd, cwd=None, check=True):
    res = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if check and res.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\nSTDERR: {res.stderr}\nSTDOUT: {res.stdout}")
    return res


def get_gh_token():
    try:
        res = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True)
        return res.stdout.strip()
    except Exception as e:
        print("[!] Error retrieving GitHub CLI token. Ensure 'gh auth login' has been run.", file=sys.stderr)
        sys.exit(1)


def is_wiki_initialized(token):
    wiki_url = f"https://x-access-token:{token}@github.com/{REPO_NAME}.wiki.git"
    res = subprocess.run(["git", "ls-remote", wiki_url], capture_output=True, text=True)
    return res.returncode == 0


def push_wiki(token):
    wiki_url = f"https://x-access-token:{token}@github.com/{REPO_NAME}.wiki.git"
    temp_dir = Path(tempfile.mkdtemp(prefix="skillforge_wiki_"))
    
    try:
        print(f"[*] Cloning wiki repository from {REPO_NAME}.wiki.git...")
        run_cmd(["git", "clone", wiki_url, str(temp_dir)])

        # Copy all wiki files into cloned repo
        print(f"[*] Syncing documentation files from {WIKI_DIR}...")
        for file in WIKI_DIR.iterdir():
            if file.is_file():
                dest = temp_dir / file.name
                shutil.copy2(file, dest)
                print(f"    -> Copied {file.name}")

        # Git commit and push
        run_cmd(["git", "config", "user.name", "Garry Markus"], cwd=temp_dir)
        run_cmd(["git", "config", "user.email", "garrymarkus@users.noreply.github.com"], cwd=temp_dir)
        run_cmd(["git", "add", "."], cwd=temp_dir)

        status_res = run_cmd(["git", "status", "--porcelain"], cwd=temp_dir)
        if not status_res.stdout.strip():
            print("[+] Wiki is already up-to-date. No changes to commit.")
            return True

        run_cmd(["git", "commit", "-m", "docs(wiki): update comprehensive project documentation"], cwd=temp_dir)
        print("[*] Pushing documentation updates to GitHub Wiki...")
        run_cmd(["git", "push", "origin", "master"], cwd=temp_dir)
        print("🎉 [SUCCESS] GitHub Wiki successfully updated and deployed!")
        print(f"    View your wiki at: https://github.com/{REPO_NAME}/wiki")
        return True

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


def main():
    import argparse
    import time

    parser = argparse.ArgumentParser(description="SkillForge GitHub Wiki Sync Tool")
    parser.add_argument("--wait", action="store_true", help="Wait and poll until the first page is created on GitHub")
    args = parser.parse_args()

    print("=" * 60)
    print(" SkillForge GitHub Wiki Sync Tool")
    print("=" * 60)

    if not WIKI_DIR.exists():
        print(f"[!] Directory {WIKI_DIR} does not exist.", file=sys.stderr)
        sys.exit(1)

    token = get_gh_token()
    print(f"[*] Authenticated with GitHub as: GarryMarkus")

    if not is_wiki_initialized(token):
        if args.wait:
            print("\n[*] Waiting for you to click 'Save page' in your browser...")
            print(f"    Target: https://github.com/{REPO_NAME}/wiki")
            retries = 60
            for i in range(retries):
                time.sleep(2)
                if is_wiki_initialized(token):
                    print("\n[+] Wiki initialization detected!")
                    break
                print(".", end="", flush=True)
            else:
                print("\n[!] Timed out waiting for wiki initialization.", file=sys.stderr)
                sys.exit(2)
        else:
            print("\n[!] NOTICE: The GitHub Wiki repository is not yet initialized.")
            print("    GitHub requires the first page to be saved once via the web UI.")
            print(f"    1. Open: https://github.com/{REPO_NAME}/wiki")
            print("    2. Click the green 'Create the first page' button.")
            print("    3. Paste or save your first page (Home).")
            print("    4. Re-run this script (or run with --wait) to automatically publish all other pages!")
            sys.exit(2)

    push_wiki(token)


if __name__ == "__main__":
    main()
