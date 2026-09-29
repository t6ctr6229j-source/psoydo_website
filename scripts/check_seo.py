#!/usr/bin/env python3
"""Semantic release checks, distinct from Google's rich-result eligibility."""
import html
import json
from pathlib import Path
import re
import subprocess
ROOT=Path(__file__).resolve().parents[1]
def plain(s): return ' '.join(html.unescape(re.sub('<[^>]+>',' ',s)).split())
entities={}
for page in sorted((ROOT/'de').glob('*.html')):
    text=page.read_text()
    canonical='https://psoydo.com/de/'+('' if page.name=='index.html' else page.name)
    assert f'rel="canonical" href="{canonical}"' in text, page.name
    assert 'hreflang="en"' not in text and 'href="/en/' not in text, page.name
    graph=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',text,re.S)[1])['@graph']
    ids=[n['@id'] for n in graph if '@id' in n]
    assert len(ids)==len(set(ids)), (page.name,'duplicate entity')
    for node in graph:
        if node.get('@type')=='Organization':
            assert node['name']=='wescaleIT AG'
            assert node['address']['addressLocality']=='Ulm'
            assert node['telephone']=='+49 731 40 32 13 75'
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
print('SEO semantics passed: canonicals, entity consistency, net pilot terms, article dates, visible FAQ parity, contact and retired form guard.')
