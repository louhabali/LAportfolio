const INBOX = "louhabali@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
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

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>",
      to: [INBOX],
      reply_to: cleanEmail,
      subject: `Portfolio message from ${cleanName}`,
      text: `From: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    }),
  });

  if (!delivery.ok) {
    return Response.json({ error: "We couldn't deliver your message right now. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
