"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin } from "lucide-react";
import { person } from "@/data/portfolio";

export function ContactLinks() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyEmail() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API is unavailable in this browser or context.");
      await navigator.clipboard.writeText(person.email);
      setCopyState("copied");
    } catch (error) {
      console.error("Unable to copy the contact email.", error);
      setCopyState("error");
    }
  }

  return (
    <div>
      <div className="contact-address">
        <span>Email</span>
        <a href={`mailto:${person.email}`}>{person.email}<ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="contact-socials">
        <a className="text-link" href={person.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        <a className="text-link" href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" />LinkedIn<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        <button className="copy-email" type="button" onClick={copyEmail} aria-label="Copy email address">
          {copyState === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        </button>
      </div>
      <div className="copy-message" role="status" data-error={copyState === "error"}>
        {copyState === "copied" && "Email copied."}
        {copyState === "error" && "Copy unavailable. Select the email address above or open it in your mail app."}
      </div>
    </div>
  );
}
