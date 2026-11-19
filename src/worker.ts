// Serves the static site and stores the two forms in D1.

interface Env {
  ASSETS: Fetcher
  DB: D1Database
}

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

/** Trimmed string, or null when empty or too long. */
function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const v = value.trim()
  return v && v.length <= max ? v : null
}

async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  if (req.method !== 'POST') return null
  // Only accept posts from this site.
  const origin = req.headers.get('origin')
  if (origin && origin !== new URL(req.url).origin) return null
  try {
    const body = await req.json()
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(req.url)

    if (pathname === '/api/idea') {
      const body = await readBody(req)
      if (!body) return json(400, { error: 'bad request' })
      // Hidden field that only bots fill in. Pretend it worked.
      if (body.website) return json(200, { ok: true })
      const idea = text(body.idea, 5000)
      const contact = text(body.contact, 200)
      const name = text(body.name, 200)
      if (!idea || !contact) return json(400, { error: 'Ide sama kontaknya diisi dulu ya.' })
      await env.DB.prepare('insert into ideas (idea, name, contact) values (?, ?, ?)').bind(idea, name, contact).run()
      return json(200, { ok: true })
    }

    if (pathname === '/api/subscribe') {
      const body = await readBody(req)
      if (!body) return json(400, { error: 'bad request' })
      if (body.website) return json(200, { ok: true })
      const email = text(body.email, 200)?.toLowerCase()
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return json(400, { error: 'Email-nya kayaknya belum bener, cek lagi ya.' })
      await env.DB.prepare('insert into subscribers (email) values (?) on conflict (email) do nothing')
        .bind(email)
        .run()
      return json(200, { ok: true })
    }

    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
