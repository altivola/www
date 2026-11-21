# www

The Altivola landing page. See README.md for commands.

- One page: `src/pages/index.astro`. Design is style L from the design canvas (dark, yellow `#fafb03` highlight, Space Grotesk headings, Inter body). Keep that look.
- Copy is Indonesian, casual but polite, talking to the visitor as "kamu". No first person at all: no "saya", "kami", "aku", "lu/gua", "Anda". Use passive or drop the subject ("nanti kamu dihubungi", "bikin alat digital..."). Use "gak", "buat", "udah", "aplikasi" (not "nggak", "untuk", "sudah", "app"). Product status is "Udah bisa dipakai" or "Masih ide" (use "Lagi dibikin" only once work on it has actually started). The owner's contact details (phone, email) never go on the page: visitors leave theirs in the form, and the only way to reach the owner is the link to https://jabbar-hafizh.github.io/.
- `src/worker.ts` serves `dist/` and handles `POST /api/idea` and `POST /api/subscribe` into D1 (`migrations/`).
- Run `pnpm check` and `pnpm build` before committing.
