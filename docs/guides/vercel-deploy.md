# Guide: Deploying with Vercel

Vercel builds the site from this repository plus published Sanity content and serves it at [resources.goldencity.church](https://resources.goldencity.church/). Code pushed to `main` deploys itself; a content change needs a redeploy.

## When a rebuild happens

| You changed | What deploys it |
| --- | --- |
| Code or docs pushed to `main` | Automatic production build |
| Another branch | A preview deployment only, not the live site |
| Content in Sanity | A manual redeploy (until the publish webhook is set up) |

## Redeploy after a content change

1. Go to vercel.com → team **PaulCanaan** → project **gcc-groups-resources** → **Deployments**.
2. On the newest **Production** deployment, open ⋯ → **Redeploy** → confirm.
3. Wait for **Ready** (usually under a minute), then open the live page and check the change.

## If a build fails

- The last good version stays live, so visitors see no break.
- Open the failed deployment → **Build Logs**. Common causes: a missing required field, a duplicate slug, or a PDF that won't load.
- Fix the entry in Sanity, publish, and redeploy.

## Roll back a bad release

1. In **Deployments**, find the last good Production deployment.
2. ⋯ → **Promote to Production** (or **Instant Rollback**).
3. Sanity content is not rolled back by this; fix or unpublish the entry too, then rebuild.

## Push code

Push from this repository's folder (`06 Resources/Resources Page`), not from its parent, which is a different repository:

```sh
cd "…/06 Resources/Resources Page" && git push
```
