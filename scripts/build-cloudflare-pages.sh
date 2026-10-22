#!/bin/sh
# Package only Psoydo's validated public release into an isolated Cloudflare preview.
set -eu
cd "$(dirname "$0")/.."
python3 scripts/build_release.py
rm -rf cf-dist
mkdir cf-dist
python3 - <<'PY'
from pathlib import Path
from zipfile import ZipFile
root=Path('cf-dist')
with ZipFile('dist/psoydo-upload.zip') as archive:
    archive.extractall(root)
(root/'.htaccess').unlink(missing_ok=True)
PY
cat > cf-dist/_headers <<'EOF'
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
  Content-Security-Policy: base-uri 'self'; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests

https://psoydo-website.pages.dev/*
  X-Robots-Tag: noindex, nofollow

https://:version.psoydo-website.pages.dev/*
  X-Robots-Tag: noindex, nofollow
EOF
cat > cf-dist/_redirects <<'EOF'
/ /de/ 301
/index.html /de/ 301
/en /de/ 301
/en/ /de/ 301
/en/index.html /de/ 301
/en/datenschutz.html /de/datenschutz.html 301
/en/impressum.html /de/impressum.html 301
/de /de/ 301
/de/index.html /de/ 301
EOF
test -s cf-dist/de/index.html
test -s cf-dist/de/datenschutz.html
test -s cf-dist/404.html
test -s cf-dist/app.js
test ! -e cf-dist/.htaccess
echo 'Psoydo: Pages preview ready.'
