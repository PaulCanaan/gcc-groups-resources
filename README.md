# Golden City Groups Resources

A public resource library for Golden City Church, built with Astro, Sanity, and Vercel. It helps groups prepare, gather around Scripture, and follow Jesus together.

- **Live library:** [gcc-groups-resources.vercel.app](https://gcc-groups-resources.vercel.app/)
- **Source:** [PaulCanaan/gcc-groups-resources](https://github.com/PaulCanaan/gcc-groups-resources)
- **Build status:** the features below shipped October 22, 2026; latest application release `8850f24`.

## Current build

The landing page opens with three collapsed categories. Visitors unfold a category to browse its resources.

| Category | Published resources |
|---|---|
| City Groups Resources | Weekly Recaps: Love (October 4), Joy (October 11), Peace (October 18, 2026) |
| Collectives Resources | Galatians Sessions 1–2, with separate Men’s and Women’s Collective editions |
| Other Resources | GCC Group Leader Agreement, public edition; future approved Group Leader Collaboration and training resources belong here |

All eight resources have a full reading page and an approved printable PDF. The Agreement public edition excludes private pastoral phone numbers; completed acknowledgements remain private. Design examples do not appear in production. Legacy `cojourner` category values normalize to Other Resources, rather than creating a fourth category.

Each card offers two actions:

- **View Full Resource:** a light, warm parchment button opening the reading page in the same tab.
- **Preview Printable PDF:** a small in-page dialog with Previous/Next page controls, close/Escape support, keyboard focus containment and return, a reading-page link, and a separate **Download Printable PDF** choice. Opening a preview does not open another tab or start a download.

The design retains Roboto, grayscale, restrained gold accents, the Groups wordmark, the official GCC skyline favicon, category icons, and a compact open Bible illustration. The illustration is hidden on phones to keep the opening compact. The footer reads: “Forge Your Faith. Find Freedom in Christ. Follow Him Fully.”

## Architecture and repository boundaries

```text
Approved public content in Sanity
              ↓ build-time fetch
Astro → static HTML + PDF copies → Vercel
              ↑
       GitHub main pushes
```

Astro generates the directory and full resource pages at build time. Markdown is rendered with `micromark`, with embedded HTML and unsafe URL protocols disabled. Category navigation and reading pages work without JavaScript; the PDF dialog uses JavaScript and loads PDF.js on demand. No visitor accounts, application database, or server runtime are required by the current build.

| Route | Purpose |
|---|---|
| `/` | Three-category resource library |
| `/resources/<slug>/` | Full approved resource text |
| `/pdfs/<slug>.pdf` | Static copy of the approved PDF for same-origin preview |
| `/404.html`, `/robots.txt` | Missing-page handling and indexing rules |

During a build, approved PDFs are copied byte-for-byte from their asset URLs to the static PDF routes. This lets the viewer read them from the website’s own origin. An unavailable asset or invalid PDF signature fails the build. PDFs are generated build output, not files committed to this repository. The explicit download action requests the Sanity asset with `dl=<slug>.pdf` for a readable attachment filename.

This checkout lives under `06 Resources/Resources Page/` in the Groups Ministry workspace, but has its own Git repository and remote. Groups OS ignores `/06 Resources/Resources Page/`. Commit and push website changes from this checkout; do not add its build files to the parent repository. Ministry governance, review evidence, source drafts, and private information remain outside this public repository.

## Local development

Use Node **22.23.4 or newer**, as required by `package.json`.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://127.0.0.1:4321`. The example configuration selects clearly labeled design samples. These are not approved ministry resources; sample pages carry `noindex`, and their robots file blocks indexing. Production builds reject demo content. To preview the actual library, configure the Sanity values below and set `CONTENT_SOURCE=sanity`.

```sh
npm test
npm run check
npm run build
npm run preview
```

The preview command serves the built `dist/` directory. Rebuild after making source or CMS changes when using this preview.

| Location | Responsibility |
|---|---|
| `src/pages/` | Library, resource pages, static PDF routes, 404, robots |
| `src/components/` | Resource cards, PDF preview button/dialog, shared graphics |
| `src/lib/` | CMS loading, publication validation, Markdown, download URLs, design samples |
| `src/styles/global.css` | Shared styles and responsive layouts |
| `sanity/resource.ts` | Resource editing schema |
| `public/` | Church graphics, Bible illustration, local Roboto font and license |
| `tests/resources.test.ts` | Publication boundaries, safe content, routes, and download URLs |

## Sanity and publication

The existing Sanity project is **`1consdwv`**, dataset **`production`**. A standalone Studio is included; run `npm run studio` at `http://localhost:3333`, or `npm run studio:build` to build it. A hosted editorial Studio is not part of the deployed Astro library. The Sanity plugin was unavailable during setup, so this build uses the official client and Studio.

| Environment variable | Configuration |
|---|---|
| `CONTENT_SOURCE` | `sanity` for live content; `demo` only for design previews |
| `SANITY_STUDIO_PROJECT_ID` | `1consdwv` |
| `SANITY_STUDIO_DATASET` | `production` |
| `SANITY_READ_TOKEN` | Only if a private dataset requires build-time read access |
| `SITE_URL` | `https://gcc-groups-resources.vercel.app` for the current production origin |

Keep tokens, environment files, provisioning records, CMS backups, and Deploy Hook URLs out of Git and browser code. The ignored `.sanity/` directory holds local provisioning/publication records. Project and dataset IDs are not secrets.

Only the published perspective and documents with `publicDistribution=true` enter a build. The loader rejects invalid content, duplicate slugs, and unsafe destinations; a CMS failure does not fall back to design samples. This filter is not access control: ordinary Sanity dataset attachments have public CDN URLs, including on a private dataset. Upload only public-safe editions. Confidential pastoral, safeguarding, screening, participant, and completed agreement records stay in existing controlled systems.

For each new or updated resource:

1. Review the source, audience, public edition, and any required pastoral or copyright clearance. Leadership training may be public, including Belonging–Beholding–Becoming; its availability does not change the Groups overview’s messaging.
2. Prepare matching web and PDF editions. Paste the complete approved Markdown into **Full resource (Markdown)**, starting section headings at `##`. Omit repeated titles, YAML frontmatter, print-layout comments, internal references, and private notes. Preserve Scripture credits.
3. Set the title, stable slug, summary, category, date, resource type, audience, and optional Scripture/series/session fields. Attach the approved PDF and confirm public-distribution clearance, then publish.
4. Trigger a deliberate Vercel production rebuild. CMS-only changes do not currently deploy automatically.
5. Check the public card, full text, PDF preview, page navigation, and explicit download. A Markdown edit does not regenerate the PDF; review both editions together.

Unpublishing or deleting in Sanity requires a successful rebuild to remove the old HTML and static PDF routes. Previously public CDN attachments are not revoked by removing a card. A failed build leaves the previous successful deployment live and needs follow-up.

## Hosting and deployment

The Vercel project is **`gcc-groups-resources`** (`prj_Dmc1G3spqjZuE5co8WtVIguL6nYG`) in **PaulCanaan** (`paul-canaan`). `vercel.json` selects Astro, `npm run build`, and `dist`; no server adapter is needed. Configure the environment variables above in the intended deployment environments.

GitHub pushes to **`main` trigger production builds**. Other branches use Vercel previews. Use explicit team/project scope when linking or deploying. The current public origin remains the Vercel domain; the main church website continues on Squarespace.

## Future development plan

The following work is pending or conditional, not shipped functionality or approval of new ministry content. No new delivery deadline is set.

| Priority | Work | Completion evidence |
|---|---|---|
| Next: church entry | When Squarespace access is available, create a native `goldencity.church/groups/resources` entry page with an **Open Resource Library** button pointing to Vercel, and add a resources link on `/groups`. This is deferred until sign-in can be arranged. | Verify the saved Groups → resources entry → Vercel path, return links, phone layout, and keyboard use. Preserve a recovery copy before editing. |
| Next: publishing reliability | Configure a Sanity webhook to a Vercel Deploy Hook for published-content creation, updates, unpublishing, and deletion. Keep draft-only edits from triggering production and keep the hook URL private. Until configured and tested, continue deliberate rebuilds. | Prove both addition and removal reach the live library, and confirm a failed build leaves the last successful release available. |
| Ongoing: approved resources | Add later Weekly Recaps and Galatians sessions, then approved Group Leader Collaboration and other training resources under Other Resources. Preserve the compact three-category structure and review web/PDF editions together. | Resource-specific clearance, complete public text, matching printable edition, and verified live actions. |
| When editorial access needs it | Decide whether to host the existing Studio for editors; document the editor’s publish/rebuild/verify handoff. | Editors can maintain public-safe content without changing application code, with the publication boundary preserved. |
| Maintenance | Review dependency fixes, PDF viewer behavior, accessibility, and deployment recovery as part of normal maintenance. The last build review recorded unresolved Sanity CLI dependency advisories for `braces` and `uuid`; these remain follow-up work. | Relevant checks pass and changes are verified in the browser; avoid forced unrelated dependency downgrades. |

The native Squarespace entry is the current integration plan. A custom resource subdomain, redirect, or reverse proxy is not required for that page. Individual resources currently use the Vercel `/resources/<slug>/` addresses; `goldencity.church/groups/resources/<slug>` is **not configured**. If retaining those exact church-domain paths becomes a requirement, assess routing, canonical URLs, assets, main-site compatibility, and rollback separately before changing DNS or ingress.

Defer member accounts, private resource delivery, advanced search/filtering, training tracking, live editorial previews, and custom CI until a demonstrated need justifies them. Existing church identity and ministry approval boundaries govern future additions.

## Verification and recovery

The latest application release passed four automated tests, Astro/TypeScript checks across twenty-one files, and the static build. All eight generated PDFs matched their approved original hashes. Browser verification covered actual PDF rendering on library and reading pages, multi-page navigation, Escape and focus return, Tab wrapping, and 320/375px phone layouts without horizontal overflow. These are release evidence from October 22, 2026, not a substitute for verifying later changes.

For code changes, run the existing tests, type checks, and build, then inspect the affected visitor paths. Verify the actual public result after deployment. Resource removal and publication automation also need an end-to-end CMS/rebuild check.

Restore a known-good Git revision or Vercel deployment to recover application code. The release before the PDF preview was `ba01501`; CMS content has its own recovery records and is not rolled back by Git. Keep controlled backups outside this public repository. Check compatibility between restored code and current CMS content before rebuilding.
