#!/usr/bin/env python3
"""
SkillForge Concurrent Development Launcher.
Runs Django backend (port 8000) and Vite frontend (port 5173) simultaneously
in a single terminal window with unified logs and graceful shutdown.
"""

import os
import sys
import signal
import subprocess
import threading
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
SERVER_DIR = ROOT_DIR / "server"
CLIENT_DIR = ROOT_DIR / "client"

# ANSI color codes for terminal output
COLOR_DJANGO = "\033[94m"   # Blue
COLOR_VITE = "\033[92m"     # Green
COLOR_SYSTEM = "\033[93m"   # Yellow
COLOR_RESET = "\033[0m"

processes = []
shutting_down = False


def log_stream(stream, prefix, color):
    """Read lines from a process output stream and print them with a colored prefix."""
    try:
        for line in iter(stream.readline, ""):
            if shutting_down:
                break
            if line:
                print(f"{color}[{prefix}]{COLOR_RESET} {line.rstrip()}", flush=True)
    except Exception:
        pass
    finally:
        stream.close()


def shutdown(signum=None, frame=None):
    """Gracefully terminate both server and client child processes."""
    global shutting_down
    if shutting_down:
        return
    shutting_down = True
    print(f"\n{COLOR_SYSTEM}[SkillForge] Shutting down development servers...{COLOR_RESET}", flush=True)

    for proc in processes:
        if proc.poll() is None:
            try:
                if os.name == "nt":
                    # On Windows, kill process tree to avoid orphaned node or python instances
                    subprocess.run(
                        ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL,
                        check=False
                    )
                else:
                    proc.terminate()
            except Exception:
                pass

    print(f"{COLOR_SYSTEM}[SkillForge] All processes stopped. Goodbye!{COLOR_RESET}", flush=True)
    sys.exit(0)


def main():
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
            sys.stderr.reconfigure(encoding="utf-8")
        except Exception:
            pass

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    print("====================================================")
    print("Starting SkillForge Concurrent Development Engine")
    print("   Backend:  http://127.0.0.1:8000 (API & Swagger Docs)")
    print("   Frontend: http://localhost:5173 (React + Vite SPA)")
    print("   Press Ctrl+C at any time to stop all servers.")
    print("====================================================\n")

    # 1. Django Process
    manage_py = SERVER_DIR / "manage.py"
    django_cmd = [sys.executable, str(manage_py), "runserver", "127.0.0.1:8000"]
    django_proc = subprocess.Popen(
        django_cmd,
        cwd=str(SERVER_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    processes.append(django_proc)

    # 2. Vite Process
    vite_cmd = "npm run dev"
    vite_proc = subprocess.Popen(
        vite_cmd,
        cwd=str(CLIENT_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        shell=True
    )
    processes.append(vite_proc)

    # Stream logs asynchronously
    django_thread = threading.Thread(
        target=log_stream,
        args=(django_proc.stdout, "Django", COLOR_DJANGO),
        daemon=True
    )
    vite_thread = threading.Thread(
        target=log_stream,
        args=(vite_proc.stdout, "Vite", COLOR_VITE),
        daemon=True
    )

    django_thread.start()
    vite_thread.start()

    # Wait for either process to exit or keyboard interrupt
    try:
        while not shutting_down:
            for proc in processes:
                exit_code = proc.poll()
                if exit_code is not None:
                    name = "Django" if proc == django_proc else "Vite"
                    if not shutting_down:
                        print(f"{COLOR_SYSTEM}[SkillForge] {name} exited with code {exit_code}.{COLOR_RESET}")
                        shutdown()
                        return
            threading.Event().wait(0.5)
    except KeyboardInterrupt:
        shutdown()


if __name__ == "__main__":
    main()
