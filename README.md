<!-- @scry.entry
id: internal.scryspec-landing-repo~placeholder
kind: internal
status: active
weight: 0.4
tags:
  - "topic:scryspec"
  - "scryspec"
  - "topic:landing-page"
  - "landing-page"
  - "scope:repo-readme"
  - "repo-readme"
summary: >
  Repo readme for scryspec-landing — the standalone repo that holds the
  scryspec.com promotional landing site. Single self-contained
  index.html in site/, deployed to Cloudflare Pages project `scryspec`.
  Owning track: scryspec-worker (in reflection). Also: scryspec.com,
  landing page, static HTML, Cloudflare Pages, scryspec-worker,
  standalone repo, project layout.
rationale: >
  Without this, a future hand opening the repo cold has no idea what it
  is or how to deploy it. The repo is small enough that its own readme
  fits in one screen.
applies: opening scryspec-landing repo cold, deploying scryspec.com, locating the owning track
seeded_questions:
  - "What is scryspec-landing?"
  - "How do I deploy scryspec.com?"
  - "Which track owns scryspec.com?"
@scry.entry.end -->

# scryspec-landing

Source for **scryspec.com** — the promotional landing page for
[scry](https://github.com/prmichaelsen/scry) and the
[scry marker contract](https://github.com/prmichaelsen/scry-spec).

- `site/index.html` — single self-contained page (HTML + inline CSS).
- No build step. No framework.
- Deployed to Cloudflare Pages project `scryspec`.
- Custom domain `scryspec.com` attaches on or after 2026-05-20.

## Owning track

[`scryspec-worker`](https://github.com/prmichaelsen/reflection) in
reflection. The track authors the page in marketing voice and
hand-syncs it as the scry marker contract versions.

## Deploy

```
cd site
wrangler pages deploy . --project-name=scryspec --branch=main
```

Requires `CLOUDFLARE_API_TOKEN` with Pages Write on the account.
