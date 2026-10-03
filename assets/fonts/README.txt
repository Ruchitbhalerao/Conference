FONTS
=====

The original Lovable project loads its typeface from the Google Fonts CDN
(see the <link> tags in the <head> of every HTML page):

    Manrope 400, 500, 600, 700, 800
    https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap

That behaviour is preserved exactly, so no font binaries are bundled here and
the site works offline with the CSS fallback stack
("Manrope", ui-sans-serif, system-ui, sans-serif).

If you need a fully self-contained / offline build, download the woff2 files
from Google Fonts into this folder and replace the CDN <link> in each page with
local @font-face rules. The exact original fallback declaration lives in
style.css under `--font-sans`.