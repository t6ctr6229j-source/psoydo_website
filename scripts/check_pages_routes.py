#!/usr/bin/env python3
"""Check the built release over HTTP against the Cloudflare Pages runtime.

Run after `wrangler pages dev cf-dist --port 8080`; physical .html files stay
unchanged while canonical page URLs must return 200 without a redirect.
"""
import os
from pathlib import Path
import urllib.error
import urllib.request
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get('BASE_URL', 'http://127.0.0.1:8080').rstrip('/')


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


opener = urllib.request.build_opener(NoRedirect(), urllib.request.ProxyHandler({}))


def get(path):
    try:
        return opener.open(BASE + path, timeout=10)
    except urllib.error.HTTPError as response:
        return response


urls = [node.text for node in ET.parse(ROOT / 'sitemap.xml').iterfind(
    './/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
for canonical in urls:
    path = urlsplit(canonical).path
    response = get(path)
    assert response.code == 200, (path, response.code, response.headers.get('Location'))
    text = response.read().decode()
    assert f'rel="canonical" href="{canonical}"' in text, (path, 'canonical mismatch')
    assert f'property="og:url" content="{canonical}"' in text, (path, 'Open Graph mismatch')
    assert 'name="robots" content="index,follow,max-image-preview:large"' in text, path
    assert 'noindex' not in response.headers.get('X-Robots-Tag', ''), path
    if not path.endswith('/'):
        legacy = get(path + '.html?source=legacy')
        assert legacy.code == 308, (path, 'Pages HTML normalization', legacy.code)
        target = urlsplit(legacy.headers['Location'])
        assert (target.path, target.query) == (path, 'source=legacy'), (path, target)

for path in ['/de/impressum', '/de/datenschutz']:
    response = get(path)
    assert response.code == 200, (path, response.code)
    assert 'name="robots" content="noindex,follow"' in response.read().decode(), path

redirects = [
    ('/', '/de/'), ('/index.html', '/de/'), ('/de', '/de/'),
    ('/de/index.html', '/de/'), ('/en/', '/de/'), ('/en/index.html', '/de/'),
    ('/en/datenschutz.html', '/de/datenschutz'),
    ('/en/impressum.html', '/de/impressum'),
]
for old, expected in redirects:
    response = get(old + '?source=legacy')
    assert response.code == 301, (old, response.code)
    target = urlsplit(response.headers['Location'])
    assert (target.path, target.query) == (expected, 'source=legacy'), (old, target)

for path in ['/missing/deep/path', '/de/not-a-page', '/en/not-a-page.html']:
    response = get(path)
    assert response.code == 404, (path, response.code)
    text = response.read().decode()
    assert 'ERROR / 404' in text and 'noindex,nofollow' in text, path

for path, content in [('/robots.txt', 'Sitemap: https://psoydo.com/sitemap.xml'),
                      ('/sitemap.xml', '<urlset')]:
    response = get(path)
    assert response.code == 200 and content in response.read().decode(), path

print(f'Cloudflare Pages routing passed: {len(urls)} canonical pages, HTML aliases, '
      'query preservation, legal noindex, robots/sitemap and real 404 responses.')
