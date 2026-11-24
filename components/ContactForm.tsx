"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setStatusType("");
    setSending(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      setStatus("Thanks — your message has been sent. I’ll get back to you soon.");
      setStatusType("success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
      setStatusType("error");
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form-heading"><div><div className="eyebrow">YOUR MESSAGE</div><h3>Start a conversation</h3></div><span className="form-index">01 — 03</span></div>
    <p className="contact-form-note">Share a few details and I&apos;ll get back to you by email.</p>
    <div className="contact-fields">
      <label><span>Name <i>REQUIRED</i></span><input name="name" autoComplete="name" placeholder="Jane Smith" maxLength={100} required /></label>
      <label><span>Email <i>REQUIRED</i></span><input name="email" type="email" autoComplete="email" placeholder="jane@company.com" maxLength={254} required /></label>
      <label className="contact-message-field"><span>What would you like to discuss? <i>REQUIRED</i></span><textarea name="message" placeholder="A role, a project, or just a hello…" rows={5} maxLength={5000} required /></label>
      <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
    <div className="contact-submit-row"><button className="contact-submit" type="submit" disabled={sending}>{sending ? "SENDING…" : "SEND MESSAGE"}{sending ? <Send size={14} /> : <ArrowUpRight size={15} />}</button><span className={`contact-status${statusType ? ` contact-status-${statusType}` : ""}`} role="status" aria-live="polite">{status}</span></div>
    <div className="contact-privacy"><span className="contact-privacy-dot" /> Your details are only used to reply to your message.</div>
  </form>;
}
