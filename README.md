# Harsh Yadav — Personal Site

Dark-themed personal engineering site built with Astro, TypeScript, and Tailwind CSS. Static output, Markdown-based blog, RSS + sitemap included.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:4321.

```bash
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

## Editing content

All the editable copy lives outside the components, in `src/data/`:

| What | File |
|---|---|
| Name, bio, tagline, social links, contact email | `src/data/profile.ts` |
| Work experience | `src/data/experience.ts` |
| Skills groups | `src/data/skills.ts` |

Edit those and the site updates everywhere it's used — no need to touch any `.astro` component.

### Adding a new blog post

Drop a new Markdown file into `src/content/blog/`, e.g.:

```
src/content/blog/my-new-post.md
```

with frontmatter like:

```yaml
---
title: "Your Post Title"
description: "One or two sentences for the blog index and SEO."
pubDate: 2026-08-05
tags:
  - kubernetes
  - sre
draft: false
---

Your content here.
```

It shows up on `/blog` automatically, sorted by `pubDate`, with search, tag filtering, and pagination (9 posts per page) already wired up. Set `draft: true` to hide a post without deleting it.

## Placeholders you still need to fill in

Search the codebase for `TODO` to find all of these, or check here:

- `src/data/profile.ts` — real GitHub/LinkedIn URLs, contact email, and how much location detail (if any) you want public
- `src/data/experience.ts` — start date for the CloudRaft role (and any earlier roles you want listed)
- `astro.config.mjs` — the `site` value is set to a placeholder (`https://harshyadav.dev`); change it to your real domain or `https://<your-username>.github.io` (or `/<repo-name>` — see below) before deploying, since it's used for the sitemap, RSS, and canonical URLs

Note on the Experience copy: it describes the kind of platform, reliability, and observability work in general terms. Client names, client projects and incident details must not be published on this site.

## Deploying to GitHub Pages

A workflow is already set up at `.github/workflows/deploy.yml` using Astro's official GitHub Action.

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Decide which of these you're using, and update `astro.config.mjs` accordingly:
   - **User/org site** (`https://<username>.github.io`): set `site: 'https://<username>.github.io'`, no `base` needed.
   - **Project site** (`https://<username>.github.io/<repo-name>`): set `site: 'https://<username>.github.io/<repo-name>'` **and** add `base: '/<repo-name>'` to the config, or every internal link/asset will 404 once deployed.
   - **Custom domain**: set `site` to your domain and add a `public/CNAME` file containing just the domain name.
4. Push to `main` — the workflow builds and deploys automatically. Re-runs happen on every push to `main`, or manually via the Actions tab (`workflow_dispatch`).

## Architecture

```
src/
├── components/     Presentational Astro components (Header, Hero, Skills, Experience, BlogCard, etc.)
├── content/blog/   Markdown blog posts (Content Collections)
├── data/           Editable content: profile, experience, skills
├── layouts/        Layout.astro (base HTML shell + SEO), BlogPost.astro (article layout)
├── lib/            Small utilities (reading time, date formatting)
├── pages/          Routes: index, about, blog/*, rss.xml, 404
└── styles/         global.css (Tailwind layers + the site's shared component classes)
```

Design notes: dark-first, monospace (IBM Plex Mono) for headings/labels/code and Inter for body text, a muted mint accent, and a recurring "log line" motif (`log-eyebrow`) used as the section-header device throughout — a nod to monitoring/observability output rather than generic numbered markers.
