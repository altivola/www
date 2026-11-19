# www

The Altivola website: https://www.altivola.workers.dev

One static page built with Astro and Tailwind, served by a Cloudflare Worker. The Worker also stores the two forms on the page in a D1 database:

- "Punya ide sendiri?": ideas from people who want something custom, with their WhatsApp or email
- "Mau jadi yang pertama coba?": emails of people who want to hear about new products

## Develop

```sh
pnpm install
pnpm dev        # Astro dev server, page only (the forms need the Worker)
pnpm preview    # build, then run the page and the Worker together with wrangler
pnpm check      # lint and typecheck
```

For `pnpm preview`, create the local tables once: `pnpm exec wrangler d1 migrations apply www --local`.

## Read the form entries

```sh
pnpm leads         # latest 50 ideas
pnpm subscribers   # every email on the list
```

Both need `wrangler login` with the Altivola Cloudflare account.

## Deploy

Pushing to `main` deploys the Worker through GitHub Actions (repo variable `DEPLOY=cloudflare`, tokens from `altivola/secrets` `ci.env`).

The CI token cannot change D1, so a new file in `migrations/` is applied by hand before pushing: `pnpm exec wrangler d1 migrations apply www --remote`.

## License

MIT
