const INBOX = "louhabali@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 8_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestsByIp = new Map<string, number[]>();

function getClientIp(request: Request) {
  // Prefer headers set by the hosting proxy. Configure a trusted proxy in production;
  // client-supplied forwarding headers are not safe when the app is directly exposed.
  return request.headers.get("cf-connecting-ip")?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}

function isRateLimited(ip: string, now: number) {
  const recent = (requestsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    requestsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestsByIp.set(ip, recent);

  // Keep the in-memory fallback bounded during bursts from many IPs.
  if (requestsByIp.size > 10_000) {
    for (const [key, timestamps] of requestsByIp) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) requestsByIp.delete(key);
    }
  }
  return false;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host && originUrl.protocol === requestUrl.protocol;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: "Please reload the page and try again." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return Response.json({ error: "Please submit a valid message." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Your message is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  const now = Date.now();
  if (isRateLimited(ip, now)) {
    return Response.json({ error: "Too many messages. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) },
    });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return Response.json({ error: "Your message is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Please submit a valid message." }, { status: 400 });
  }

  const { name, email, message, website } = body as Record<string, unknown>;
  if (typeof website === "string" && website.trim()) return Response.json({ ok: true });
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return Response.json({ error: "Please complete all fields." }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  if (!cleanName || cleanName.length > 100 || !EMAIL_PATTERN.test(cleanEmail) || cleanEmail.length > 254 || !cleanMessage || cleanMessage.length > 5000) {
    return Response.json({ error: "Please check your name, email, and message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "The contact form is not configured yet. Please email louhabali@gmail.com directly." }, { status: 503 });
  }

  let delivery: Response;
  try {
    delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>",
        to: [INBOX],
        reply_to: cleanEmail,
        subject: `Portfolio message from ${cleanName.replace(/[\r\n]+/g, " ")}`,
        text: `From: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return Response.json({ error: "We couldn't deliver your message right now. Please try again later." }, { status: 502 });
  }

  if (!delivery.ok) {
    return Response.json({ error: "We couldn't deliver your message right now. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
