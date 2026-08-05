#!/usr/bin/env python3
"""Build Svitla-styled CV PDF from cv.html + header image."""

from __future__ import annotations

import re
import subprocess
import tempfile
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "cv.html"
HEADER = ROOT / "fonts" / "svitla-header.png"
OUT = ROOT / "Svitla_CV_Ihor_S_Senior_Front_End_Engineer_React.pdf"
HEADER_H = 158.25


def main() -> None:
    html = HTML.read_text(encoding="utf-8")
    # Strip running header markup if present; body PDF uses top margin only.
    html = re.sub(r'<div class="page-header">.*?</div>\s*', "", html, flags=re.S)
    html = re.sub(
        r"@page\s*\{[^}]*\}",
        "@page { size: A4; margin: 170pt 57.8pt 36pt 57.8pt; }",
        html,
        count=1,
    )

    with tempfile.TemporaryDirectory() as tmp:
        body_html = Path(tmp) / "body.html"
        body_pdf = Path(tmp) / "body.pdf"
        body_html.write_text(html, encoding="utf-8")
        subprocess.run(
            ["weasyprint", str(body_html), str(body_pdf)],
            check=True,
            cwd=ROOT,
        )

        body = fitz.open(body_pdf)
        out = fitz.open()
        for i in range(len(body)):
            page = body[i]
            new_page = out.new_page(width=page.rect.width, height=page.rect.height)
            new_page.show_pdf_page(page.rect, body, i)
            new_page.insert_image(
                fitz.Rect(0, 0, page.rect.width, HEADER_H),
                filename=str(HEADER),
            )
        out.save(OUT, deflate=True, garbage=4)
        print(f"Wrote {OUT} ({OUT.stat().st_size} bytes, {len(out)} pages)")


if __name__ == "__main__":
    main()
