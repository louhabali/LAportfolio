"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setStatusType("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const name = String(values.name ?? "").trim();
    const email = String(values.email ?? "").trim();
    const message = String(values.message ?? "").trim();
    const errors: Record<string, string> = {};

    if (!name) errors.name = "Please enter your name.";
    else if (name.length > 100) errors.name = "Your name must be 100 characters or fewer.";
    if (!email) errors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address, like name@example.com.";
    else if (email.length > 254) errors.email = "Your email address is too long.";
    if (!message) errors.message = "Please write a message.";
    else if (message.length > 5000) errors.message = "Your message must be 5,000 characters or fewer.";

    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      const firstInvalid = form.elements.namedItem(Object.keys(errors)[0]);
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      setFieldErrors({});
      setStatus("Thanks — your message has been sent. I’ll get back to you soon.");
      setStatusType("success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
      setStatusType("error");
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="contact-form-heading"><div><div className="eyebrow">YOUR MESSAGE</div><h3>Start a conversation</h3></div><span className="form-index">01 — 03</span></div>
    <p className="contact-form-note">Share a few details and I&apos;ll get back to you by email.</p>
    <div className="contact-fields">
      <label><span>Name <i>REQUIRED</i></span><input name="name" autoComplete="name" placeholder="Jane Smith" maxLength={100} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "contact-name-error" : undefined} />{fieldErrors.name && <small className="contact-field-error" id="contact-name-error">{fieldErrors.name}</small>}</label>
      <label><span>Email <i>REQUIRED</i></span><input name="email" type="email" autoComplete="email" placeholder="jane@company.com" maxLength={254} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "contact-email-error" : undefined} />{fieldErrors.email && <small className="contact-field-error" id="contact-email-error">{fieldErrors.email}</small>}</label>
      <label className="contact-message-field"><span>What would you like to discuss? <i>REQUIRED</i></span><textarea name="message" placeholder="A role, a project, or just a hello…" rows={5} maxLength={5000} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "contact-message-error" : undefined} />{fieldErrors.message && <small className="contact-field-error" id="contact-message-error">{fieldErrors.message}</small>}</label>
      <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <div className="contact-submit-row"><button className="contact-submit" type="submit" disabled={sending}>{sending ? "SENDING…" : "SEND MESSAGE"}{sending ? <Send size={14} /> : <ArrowUpRight size={15} />}</button><span className={`contact-status${statusType ? ` contact-status-${statusType}` : ""}`} role="status" aria-live="polite">{status}</span></div>
    <div className="contact-privacy"><span className="contact-privacy-dot" /> Your details are only used to reply to your message.</div>
  </form>;
}
