# Golden City Groups Resources

Astro static resource library with a standalone Sanity Studio and Vercel configuration. The site follows Golden City Church's Roboto, grayscale, and restrained gold visual language. It lives in a separate public Git repository inside the ministry workspace.

Live library: [GCC Resources](https://gcc-groups-resources.vercel.app). Published October 22, 2026 with eight PDFs approved by Paul: three Weekly Recaps (October 4/11/18), Galatians Sessions 1–2 for both Collectives, and the public GCC Group Leader Agreement. Resource cards open PDFs directly. The Agreement public edition omits private pastoral phone numbers and keeps completed acknowledgements private. CoJourner and design samples are absent from the live library.

## Local preview

Use Node 22.23.4 or newer (Node 24 LTS recommended).

```sh
npm ci
npm test
npm run check
npm run build
npm run preview
```

Open `http://localhost:4321`. Without a CMS configuration, local builds use **clearly labeled design examples**. They are not approved ministry resources. Sample pages carry `noindex` and `robots.txt` blocks indexing. Production builds reject demo content.

## Sanity setup

The Sanity plugin was not available in the connected catalog when this project was started. The official Sanity client and Studio are included instead. The new Sanity project is `1consdwv` with dataset `production`. Ownership was claimed on October 22, 2026. Temporary provisioning credentials and the claim handoff stay in the ignored `.sanity/` directory, never in this public repository.

1. Sign in to the GCC Groups Resources project (`1consdwv`, dataset `production`) with the account that claimed it.
2. Copy `.env.example` to `.env.local`. Set `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `CONTENT_SOURCE=sanity`. Add `SANITY_READ_TOKEN` only for a private dataset, using build-time read access.
3. Run `npm run studio` to open the editor at `http://localhost:3333`. The schema is in `sanity/resource.ts`.
4. Author a public-safe resource, generate its slug, and mark it cleared for public distribution after the required review. Publish it, then run the web build again.

A leader audience does not imply private content: leadership training may be publicly available, including Belonging, Beholding, Becoming. Truly confidential materials stay outside this CMS and its asset store. Ordinary Sanity dataset attachments have public CDN URLs even on a private dataset.

Only published resources with `publicDistribution=true` enter a web build. CMS query or validation failures fail the build instead of silently replacing content with examples. Slugs must be unique, and external/download destinations must use HTTPS. Resource body text is rendered as plain paragraphs rather than executable HTML.

## Vercel setup

`vercel.json` selects Astro, `npm run build`, and `dist`. Static output needs no Vercel server adapter. The hosting team is **PaulCanaan** (`paul-canaan`, Hobby), selected by Paul as the shared home for his web projects. The GCC Resources project remains separate from his other deployments. Use explicit team and project scope when linking or deploying. The linked project is `gcc-groups-resources` (`prj_Dmc1G3spqjZuE5co8WtVIguL6nYG`).

Configure these environment variables for the intended deployment environments:

| Variable | Value |
|---|---|
| `CONTENT_SOURCE` | `sanity` for production; explicit `demo` is allowed for design previews only |
| `SANITY_STUDIO_PROJECT_ID` | `1consdwv` |
| `SANITY_STUDIO_DATASET` | `production` |
| `SANITY_READ_TOKEN` | Private-dataset read token, only if required |
| `SITE_URL` | `https://gcc-groups-resources.vercel.app` until the church subdomain is connected |

Vercel [classifies a new project’s first deployment as production](https://vercel.com/docs/cli/deploy#prod), even with the preview flag. The first attempt here failed with the sample-content guard enabled and no production release was made. Keeping that failed attempt recorded allowed the next explicit preview attempt to be classified as Preview. Do not weaken that guard to bootstrap a design preview.

Keep credentials and Deploy Hook URLs in provider settings or ignored local environment files. Never commit them. Review the deployment before connecting the church subdomain or main-site redirect. Source is linked to GitHub. A push to `main` now creates a production deployment; other code changes use Vercel previews. The Git-triggered `d981d90` deployment verified this connection.

Content changes currently require a deliberate Vercel rebuild. To automate that later, configure a Sanity webhook to a Vercel Deploy Hook. Trigger on published document creation, update, unpublishing, and deletion. Draft edits should not trigger production builds. Test both adding and removing a resource: an older static page remains until a successful rebuild replaces it. A failed build leaves the previous successful deployment live and requires follow-up.

The planned church entry is `/groups/resources`, with the initial architecture recommending a Squarespace redirect to an independent resource subdomain. The Vercel production URL is live; church-domain DNS and the Squarespace redirect remain pending. If preserving the exact original address becomes mandatory, design and verify the proxy separately.

## Checks and recovery

`npm test` protects publication boundaries, safe destinations, and unique routes. `npm run check` checks Astro and TypeScript. `npm run build` generates the static directory, resource pages, 404, and robots file. Verify browser navigation, print layout, phone widths, keyboard focus, actual PDFs, and CMS publish/unpublish before production use.

Code rollback uses the previous known-good commit/deployment. Resource removal requires changing Sanity and rebuilding; removing a link does not revoke a previously public attachment URL. Keep backups and CMS exports in an appropriate controlled location rather than in this public code repository.

The local UI/UX Pro Max skill informed whitespace, content hierarchy, focus states, touch targets, and Astro's static/no-JavaScript navigation. Existing church brand rules take precedence over generic palette or font suggestions. Local assets include the existing Groups wordmark and Roboto under its included OFL license.

Known dependency limitation: the current Sanity CLI dependency tree includes unresolved `braces` and `uuid` advisories. Compatible `js-yaml` and `smol-toml` parser patches are pinned for `@vercel/frameworks`. The delivered Astro site is static; these CLI packages are build/editor tooling. Recheck upstream fixes before production handoff; a forced major downgrade is not part of this build.
