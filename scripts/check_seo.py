#!/usr/bin/env python3
"""Semantic release checks, distinct from Google's rich-result eligibility."""
import html
import json
from pathlib import Path
import re
import subprocess
from datetime import date
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]
def plain(s): return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
entities={}
for page in sorted((ROOT/'de').glob('*.html')):
    text=page.read_text()
    canonical='https://psoydo.com/de/'+('' if page.name=='index.html' else page.stem)
    assert f'rel="canonical" href="{canonical}"' in text, page.name
    assert f'property="og:url" content="{canonical}"' in text, (page.name,'Open Graph URL drift')
    assert not re.search(r'https://(?:www\.)?psoydo\.com/[^\s"<>]*\.html',text), (page.name,'noncanonical owned URL')
    for href in re.findall(r'href="([^"]+)"',text):
        link=urlsplit(html.unescape(href))
        if not link.netloc and not link.scheme:
            assert not link.path.endswith('.html'), (page.name,'redirecting internal link',href)
    assert 'hreflang="en"' not in text and 'href="/en/' not in text, page.name
    graph=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',text,re.S)[1])['@graph']
    ids=[n['@id'] for n in graph if '@id' in n]
    assert len(ids)==len(set(ids)), (page.name,'duplicate entity')
    for node in graph:
        if node.get('@type') in ['WebPage','Article','CollectionPage']:
            page_url=node.get('url') or node.get('mainEntityOfPage')
            assert page_url==canonical, (page.name,'schema page URL',page_url)
        if 'dateModified' in node:
            assert date.fromisoformat(node['dateModified'])<=date.today(), (page.name,'future modification date')
        if node.get('@type')=='Organization':
            assert node.get('@id')=='https://wescaleit.com/#organization', (page.name,'corporate entity id')
            assert node['name']=='wescaleIT AG'
            assert node['address']['addressLocality']=='Ulm'
            assert node['telephone']=='+49 731 40 32 13 75'
        if node.get('@type')=='SoftwareApplication':
            assert node.get('provider',{}).get('@id')=='https://wescaleit.com/#organization'
            assert node.get('brand',{}).get('@id')=='https://wescaleit.com/#brand-psoydo'
        if node.get('@type')=='Offer':
            assert node['price']=='990' and node['priceCurrency']=='EUR'
            assert node['priceSpecification']['valueAddedTaxIncluded'] is False
            assert node['eligibleDuration']['value']==30
            assert 'Keine automatische Verlängerung' in node['description']
        if node.get('@type')=='Article' and 'dateModified' in node:
            assert f'datetime="{node["dateModified"]}"' in text
            assert f'datetime="{node["datePublished"]}"' in text
            assert node['dateModified']>=node['datePublished']
            assert node['headline']==plain(re.search('<h1>(.*?)</h1>',text,re.S)[1])
        if node.get('@type')=='FAQPage':
            visible=[]
            for detail in re.findall('<details>(.*?)</details>',text,re.S):
                q=plain(re.search('<summary>(.*?)</summary>',detail,re.S)[1])
                a=' '.join(plain(p) for p in re.findall('<p>(.*?)</p>',detail,re.S))
                visible.append((q,a))
            assert visible==[(q['name'],q['acceptedAnswer']['text']) for q in node['mainEntity']], 'FAQ drift'
        if node.get('@id') and node.get('@type') in ['Organization','Offer']:
            old=entities.setdefault(node['@id'],node)
            # itemOffered may be explicitly present only on the pricing page.
            assert {k:v for k,v in old.items() if k!='itemOffered'}=={k:v for k,v in node.items() if k!='itemOffered'}, 'Entity disagreement'
    assert 'tel:+4973140321375' in text and 'mailto:info@wescaleit.com' in text
    if page.stem not in ['datenschutz','impressum']:
        assert not re.search('[—–]',plain(text)), (page.name,'editorial dash')
assert 'typeform' not in (ROOT/'app.js').read_text().lower()
assert 'mailto:info@wescaleit.com?subject=Psoydo%20Pilotanfrage' in (ROOT/'de/index.html').read_text()
assert 'data-tally-form="KppMYg"' in (ROOT/'de/index.html').read_text()
assert 'pilot-tally-open' in (ROOT/'app.js').read_text()
for name in ['index','produkt','architektur','preise']:
    visible=plain((ROOT/'de'/f'{name}.html').read_text())
    assert 'Jahreslizenz' in visible and 'Laptops oder Servern' in visible, (name,'customer installation / license drift')
    assert 'SaaS-Demo' in visible, (name,'limited pilot distinction missing')
    assert 'STATUS: ARCHITEKTURZIEL' not in visible, (name,'retired operating-model ambiguity')
print('SEO semantics passed: extensionless canonicals/links/schema, entity consistency, licensed customer installation, limited pilot, article dates and visible FAQ parity.')
