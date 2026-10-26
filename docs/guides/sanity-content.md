# Guide: Managing Content in Sanity

Sanity holds every resource the site shows (project `1consdwv`, dataset `production`). A change there goes live only after a Vercel rebuild, until the publish webhook is set up ([Deploying with Vercel](vercel-deploy.md)).

## Open the Studio

1. In Terminal, go to the standalone Studio beside this checkout (`06 Resources/studio-gcc-groups-resources`) and run `npm run dev`. The Studio in this repository works too: `npm run studio`. Use one at a time.
2. Open `http://localhost:3333` and sign in with your Sanity account.
3. Choose **Resource** in the left list to see every entry.

## Add a resource

1. Click **+** (Create) → **Resource**.
2. Fill in the fields, copying the closest existing entry:

| Field | What to enter | Weekly Recap example |
| --- | --- | --- |
| Title | Type · name | Weekly Recap · Patience |
| Slug | Click **Generate**, then match the pattern; never change it after publishing | weekly-recap-2026-10-25-patience |
| Summary | One line, under 240 characters | The October 25, 2026 message recap, with check-in questions, Scripture, discussion, and prayer. |
| Category | City Groups, Collectives, or Other Resources | City Groups Resources |
| Resource date | The date it is for | 2026-10-25 |
| Resource type | Reading guide, Discussion guide, Leader training, Leader agreement, External resource | Discussion guide |
| Audience | Everyone or Group leaders (both are public) | Everyone |
| Scripture, Series, Session | Optional | Galatians 5:22–23; Romans 5:1–5 |
| Full resource (Markdown) | The approved text, sections starting at `##`; no frontmatter, repeated title, or internal notes | Starts at `## Check In` |
| Public download | Drag in the approved PDF | weekly-recap-2026-10-25-patience.pdf |
| Cleared for public distribution | Turn on only after review and privacy checks | On |

3. Click **Publish** (bottom right). Drafts never appear on the site.
4. Rebuild the site, then check the live card, reading page, PDF preview, and download.

## Fix or remove a resource

- **Fix a typo:** edit the field, Publish, rebuild. If the PDF also changes, replace the file so the web and PDF editions match.
- **Take one down:** open it, use the ⋯ menu → **Unpublish** (or Delete), then rebuild. The card and pages disappear only after a successful rebuild.

## Keep in mind

- Files uploaded to Sanity have public CDN links, even if the entry is unpublished or the card is removed. Upload only public-safe editions.
- The slug is the page address; changing it breaks shared links.
- Keep the category list in the standalone Studio in step with `src/lib/resource.ts`.
