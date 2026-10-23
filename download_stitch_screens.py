#!/usr/bin/env python3
"""
Downloads screenshots and HTML code for all screens in Stitch project 5241469706240747739.
"""

import os
import requests
from pathlib import Path

DEST_DIR = Path("stitch_designs")
DEST_DIR.mkdir(exist_ok=True)

SCREENS = [
    {
        "id": "ad96e1b2adcf49808dcfb90da558fb66",
        "folder": "01_landing_page",
        "title": "SKILLFORGE - Technical Blueprint Spec Landing Page",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AEtjO1U49Wx26Inkyxp5X0d-7UwAt72Z-2PHNL_JO0cTcI-6akPgSWVEV6oSpp7G8VKQie-C2TUwmfa2_2hGdqp_GURdKz6igDq9JXMAZ3ipGDm7M4K-BofnTJNp87XKKFu9RVPvNKFZe0XK8u3t4LwrYgeEk3Lr8UkGGYRfx0mybGi0kZOhuecUn6t0exL_M7OZTOHZG5snShdgvS48KcMfC28Vyn8708N4YjVP3R952xUw1kedz2Lc3YdVmbU",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZTc2ZjlkOWZjZTYwOTI1ZDZhNzI2MzI3ZTdhEgsSBxCtg6y0lQIYAZIBIwoKcHJvamVjdF9pZBIVQhM1MjQxNDY5NzA2MjQwNzQ3NzM5&filename=&opi=89354086",
    },
    {
        "id": "e21f89bcff0d4a3a9154cc802ad27cc9",
        "folder": "02_candidate_telemetry",
        "title": "SKILLFORGE // CANDIDATE_TELEMETRY_CONSOLE",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AEtjO1XEjpqiCQvCvJY5RuUcYPIQh4FtDhj0nTSpwSs_xH0SegAM2WHE-ZpAtCixC9ybxkBoFCHCit_mIozeK2emKLZ3KbNjlpBOyQkL6xkKAT2qC4J7zYbLSZxTfMeGxGzVgti26hCN9W9jRU3zc9hNMDT7VPC14hUQN37Vf2_7YcMvcg67hV5CKFNze6OMO0G-lkFkHjBVS6oylanoB-e1OaHbj55Nw0FCK_r-9USFUqsGJ4h1kNBbG8hPtEk",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZTc3MDc4NjA1OTIwOTM0ZmFkNTA5MGQwNzRkEgsSBxCtg6y0lQIYAZIBIwoKcHJvamVjdF9pZBIVQhM1MjQxNDY5NzA2MjQwNzQ3NzM5&filename=&opi=89354086",
    },
    {
        "id": "8406174974cf4722a59a0d9f3591a0d2",
        "folder": "03_hardware_assessment",
        "title": "SKILLFORGE // HARDWARE_LOCKED_ASSESSMENT_CONSOLE",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AEtjO1Vc_8tJBnBev4yQSH_A93o82GE-qo85VyYVwVgL5AK4iQAjKAPaxsH0I7QmFZPrbKM6dwTz3WOaoxZJXu1EabCHZ8HQXqoVn5lk1XdHntexZy0xRrY3niPL000U0o7zvT3gkzWsN0ytblvWr8MqdPnmxkvuoegi32JyFvSAbHhpoHiN3cRLs7m43pisCesDyJ0EocmLzbXQtzNf3ZJ36HHCNxVKg_aqCqFfcdqMVB8b-T67GzeQIJ65ZeA",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZTc3NGQ4YWI1MTMwOTI1ZDQ5Y2RiMTg1Y2FlEgsSBxCtg6y0lQIYAZIBIwoKcHJvamVjdF9pZBIVQhM1MjQxNDY5NzA2MjQwNzQ3NzM5&filename=&opi=89354086",
    },
    {
        "id": "143cd41660e54d0584a40e1fae27b67d",
        "folder": "04_talent_acquisition",
        "title": "SKILLFORGE // REQUISITION_&_TALENT_ACQUISITION_CONSOLE",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AEtjO1Wsxe8cah_cvgAso7ttR7sCj4erWyzwR_phfrqGmj0wIytwFF5VaBjpjfNRgMppzYxIWujGGKIZdkZG56u8nyCM3gFEdrfhMJQqrqatTGcOdcCXo_CYS8MWItMxJ2qMiU6uhbh1uDG7gpQ7nSfyd3gQniFJ4t_NcmpFiliw4cSAoLDFEg3QKcFCBMRVIN9T2n2rsN2xr7APU6DtEhL3UfZol6n3orcWOCkp7DV_-unkHTVW-Vumadj0nXw",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZTc3NDBlNDU1MWUwMzM4NWJmMDZlMjA2YjIzEgsSBxCtg6y0lQIYAZIBIwoKcHJvamVjdF9pZBIVQhM1MjQxNDY5NzA2MjQwNzQ3NzM5&filename=&opi=89354086",
    },
]


def download_file(url: str, output_path: Path):
    print(f"Downloading: {output_path.name}...")
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    output_path.write_bytes(resp.content)
    print(f"Saved: {output_path} ({len(resp.content)} bytes)")


def main():
    print(f"Downloading 4 Stitch screens to {DEST_DIR.resolve()}...")
    for item in SCREENS:
        target_dir = DEST_DIR / item["folder"]
        target_dir.mkdir(parents=True, exist_ok=True)

        # 1. Screenshot
        img_path = target_dir / "screenshot.png"
        download_file(item["screenshot_url"], img_path)

        # 2. HTML code
        html_path = target_dir / "screen.html"
        download_file(item["html_url"], html_path)

        # 3. Metadata
        meta_path = target_dir / "metadata.md"
        meta_content = f"""# {item['title']}

- **Screen ID**: `{item['id']}`
- **Project ID**: `5241469706240747739`
- **Screenshot**: `screenshot.png`
- **HTML Code**: `screen.html`
- **Screenshot URL**: {item['screenshot_url']}
- **HTML Download URL**: {item['html_url']}
"""
        meta_path.write_text(meta_content, encoding="utf-8")

    print("\nAll Stitch screen assets downloaded successfully!")


if __name__ == "__main__":
    main()
