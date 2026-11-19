#!/usr/bin/env python3
"""Build ATS-friendly CV PDF from ats_cv.html (no company branding)."""

from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "ats_cv.html"
OUT = ROOT / "Ihor_Shymkov_Senior_Frontend_Engineer_ATS.pdf"


def prepare_html(src: str) -> str:
    html = src
    html = html.replace(
        'url("fonts/Carlito-Regular.ttf")',
        f'url("{ROOT / "fonts" / "Carlito-Regular.ttf"}")',
    )
    html = html.replace(
        'url("fonts/Carlito-Bold.ttf")',
        f'url("{ROOT / "fonts" / "Carlito-Bold.ttf"}")',
    )
    return html


def main() -> None:
    html = prepare_html(HTML.read_text(encoding="utf-8"))

    with tempfile.TemporaryDirectory() as tmp:
        body_html = Path(tmp) / "ats.html"
        body_html.write_text(html, encoding="utf-8")
        subprocess.run(
            ["python3", "-m", "weasyprint", str(body_html), str(OUT)],
            check=True,
            cwd=ROOT,
        )

    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
