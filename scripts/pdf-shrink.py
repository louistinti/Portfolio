"""Reechantillonne les images d'un PDF (150 dpi, JPEG) pour l'alleger.

    python scripts/pdf-shrink.py export/mon.pdf [dpi]

Travaille au niveau des objets image (xref) : les ressources de page
(degrades, motifs) ne sont pas reecrites, contrairement a
Document.rewrite_images() de PyMuPDF qui les perdait sur les PDF de Chrome.
"""
import os
import sys

import pymupdf


def shrink_images(doc, dpi=150, quality=82):
    need = {}  # xref -> largeur affichee max (pt)
    for page in doc:
        for info in page.get_images(full=True):
            xref, w_px, h_px = info[0], info[2], info[3]
            for r in page.get_image_rects(xref):
                need[xref] = max(need.get(xref, 0), r.width, r.height * w_px / max(h_px, 1))
    n = 0
    for xref, w_pt in need.items():
        try:
            pix = pymupdf.Pixmap(doc, xref)
        except Exception:
            continue
        target_w = int(w_pt / 72 * dpi)
        is_jpeg = doc.xref_get_key(xref, "Filter")[1] == "/DCTDecode"
        if pix.width <= target_w * 1.15 and is_jpeg:
            continue
        if pix.width > target_w:
            pix = pymupdf.Pixmap(pix, target_w, int(pix.height * target_w / pix.width), None)
        if pix.alpha:
            pix = pymupdf.Pixmap(pix, 0)  # le masque alpha (SMask) reste un objet a part
        if pix.n - pix.alpha not in (1, 3):
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        doc[0].replace_image(xref, stream=pix.tobytes("jpeg", jpg_quality=quality))
        n += 1
    return n


def main():
    src = sys.argv[1]
    dpi = int(sys.argv[2]) if len(sys.argv) > 2 else 150
    before = os.path.getsize(src)
    doc = pymupdf.open(src)
    n = shrink_images(doc, dpi=dpi)
    tmp = src + ".tmp"
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    os.replace(tmp, src)
    print(f"Images : {n} reechantillonnees, {before/1e6:.1f} -> {os.path.getsize(src)/1e6:.1f} Mo, {pymupdf.open(src).page_count} pages")


if __name__ == "__main__":
    main()
