# www

The Altivola landing page. See README.md for commands.

- One page: `src/pages/index.astro`. Design is style L from the design canvas (dark, yellow `#fafb03` highlight, Space Grotesk headings, Inter body). Keep that look.
- Copy is Indonesian with "kamu" (casual but polite, never "lu/gua", never "Anda"). The owner's contact details never go on the page: visitors leave theirs in the form.
- `src/worker.ts` serves `dist/` and handles `POST /api/idea` and `POST /api/subscribe` into D1 (`migrations/`).
- Run `pnpm check` and `pnpm build` before committing.
