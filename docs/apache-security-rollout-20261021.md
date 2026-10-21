# Psoydo security header rollout — 2026-10-21

## Scope
Publish the already-reviewed and Apache-QA-tested `.htaccess` hardening from PR #28. It includes HTTP header baseline, disabled directory listings and access restrictions for sensitive files.

- Source PR: #28, merged into main with source commit `e00fc15b02e1fa6ba0d2d44742af6f8ffe61d7dc`.
- The prior push did **not** deploy to United Domains because the production workflow requires `[deploy-ud]` in the main-branch commit message.
- Independent GitHub-runner SSH host-key consistency and rollback / packaging preflight: <https://github.com/t6ctr6229j-source/psoydo_website/actions/runs/39664783744>.
- The pinned SFTP fingerprint matched the observed ED25519 host key. Provider-authenticated independent verification remains a separate control.
- Approved rollout commit uses `[deploy-ud]` so GitHub Actions runs the production workflow once.
- The release package is an allowlist: `de/*.html`, CSS/JS, web assets, robots/sitemap/404 and Apache `.htaccess`. This Markdown note is not part of the deployed archive.
- The deployment verifies SHA-256 per file, stages a new directory, retains prior `psoydo-backup-<run>`, and only renames the controlled `psoydo` folder.
- After the deployment, externally probe `https://psoydo.com/de/`: HTTP 200 and HSTS, nosniff, CSP, Referrer, X-Frame and Permissions headers, plus 404 behavior.
- If the new hosting configuration causes a server error, restore the preserved previous release using the named backup. Never delete the backup before acceptance.
- Cloudflare zone `psoydo.com` remains **pending**, with DNS only. No nameserver or mail changes are part of this rollout.
