#!/usr/bin/env python3
"""Exercise the packaged .htaccess with Apache, not an imitation of rewrite rules."""
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time
import urllib.request
import urllib.error
from zipfile import ZipFile
ROOT=Path(__file__).resolve().parents[1]
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): return None
opener=urllib.request.build_opener(NoRedirect(),urllib.request.ProxyHandler({}))
with tempfile.TemporaryDirectory(prefix='psoydo-routing-') as folder:
    base=Path(folder);base.chmod(0o755)
    site=base/'site';site.mkdir(mode=0o755)
    with ZipFile(ROOT/'dist/psoydo-upload.zip') as z:z.extractall(site)
    config=base/'httpd.conf'
    modules=['mpm_event','authz_core','authz_host','mime','dir','rewrite']
    config.write_text(f'''ServerRoot "/etc/apache2"
ServerName localhost
Listen 127.0.0.1:8091
PidFile "{base}/httpd.pid"
ErrorLog "{base}/error.log"
User www-data
Group www-data
TypesConfig /etc/mime.types
DocumentRoot "{site}"
DirectoryIndex index.html
'''+''.join(f'LoadModule {m}_module /usr/lib/apache2/modules/mod_{m}.so\n' for m in modules)+f'''
<Directory "{site}">
  Options FollowSymLinks
  Require all granted
  AllowOverride FileInfo
</Directory>
''')
    # Directives must be parsed after their modules have loaded.
    lines=config.read_text().splitlines();loads=[x for x in lines if x.startswith('LoadModule')]
    config.write_text('\n'.join(loads+[x for x in lines if not x.startswith('LoadModule')])+'\n')
    apache=shutil.which('apache2') or '/usr/sbin/apache2'
    subprocess.run([apache,'-t','-f',str(config)],check=True)
    proc=subprocess.Popen([apache,'-X','-f',str(config)])
    try:
        for _ in range(30):
            try:opener.open('http://127.0.0.1:8091/de/',timeout=1);break
            except urllib.error.URLError:time.sleep(.1)
        checks=[('/en/','psoydo.com',301,'https://psoydo.com/de/'),('/en/index.html','www.psoydo.com',301,'https://psoydo.com/de/'),('/en/datenschutz.html','psoydo.com',301,'https://psoydo.com/de/datenschutz.html'),('/en/impressum.html?source=old','psoydo.com',301,'https://psoydo.com/de/impressum.html?source=old'),('/en/not-a-page.html','psoydo.com',404,None),('/', 'psoydo.com',301,'https://psoydo.com/de/'),('/?source=test','www.psoydo.com',301,'https://psoydo.com/de/?source=test'),('/index.html','psoydo.com',301,'https://psoydo.com/de/'),('/de','www.psoydo.com',301,'https://psoydo.com/de/'),('/de/index.html','psoydo.com',301,'https://psoydo.com/de/'),('/de/ki-finanzberichte.html?x=1','www.psoydo.com',301,'https://psoydo.com/de/ki-finanzberichte.html?x=1'),('/de/','psoydo.com',200,None),('/missing/deep/path','psoydo.com',404,None)]
        for path,host,status,location in checks:
            req=urllib.request.Request('http://127.0.0.1:8091'+path,headers={'Host':host})
            try:response=opener.open(req)
            except urllib.error.HTTPError as e:response=e
            assert response.code==status,(path,response.code,status)
            if location:assert response.headers['Location']==location,(path,response.headers)
            if status==404:assert b'ERROR / 404' in response.read()
        print('Apache routing passed:',len(checks),'status, canonical, query-preservation and real-404 cases.')
    finally:
        proc.terminate();proc.wait(timeout=10)
