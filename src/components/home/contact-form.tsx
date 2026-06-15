"use client";

import { useState } from "react";
import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-contact";

const labelDark = "flex flex-col gap-1.5 text-sm font-medium text-white";
const labelLight = "flex flex-col gap-1.5 text-sm font-medium text-black";
const fieldDark =
  "rounded-xl border border-white/40 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/80 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25";
const fieldLight =
  "hero-form-field-glass rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25";

type GrecaptchaV3 = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function getGrecaptcha(): GrecaptchaV3 | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { grecaptcha?: GrecaptchaV3 }).grecaptcha;
}

async function fetchRecaptchaToken(siteKey: string): Promise<string> {
  const grecaptcha = getGrecaptcha();
  if (!grecaptcha?.execute) {
    throw new Error("reCAPTCHA is still loading. Please wait a moment and try again.");
  }
  return new Promise((resolve, reject) => {
    grecaptcha.ready(async () => {
      try {
        const token = await grecaptcha.execute(siteKey, { action: RECAPTCHA_CONTACT_ACTION });
        resolve(token);
      } catch {
        reject(new Error("Could not verify the form. Please try again."));
      }
    });
  });
}

export function ContactForm({
  variant = "dark",
  formName,
  layout = "default",
  compactMessageSingleLine = false,
  defaultMessage,
  submitLabel = "Submit",
}: {
  variant?: "dark" | "light";
  /** Zapier / CRM label for which form placement sent the lead (optional). */
  formName?: string;
  /** `compact-inline`: hero strip (2-col from md). `compact-stack`: same fields/styling, single column. */
  layout?: "default" | "compact-inline" | "compact-stack";
  /** Hero strip only: message field matches single-line input height (phone, etc.). */
  compactMessageSingleLine?: boolean;
  /** Hidden fallback for compact forms that do not show a message field. */
  defaultMessage?: string;
  submitLabel?: string;
}) {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);
  const light = variant === "light";
  const compactInline = layout === "compact-inline";
  const compactStack = layout === "compact-stack";
  const compactFields = compactInline || compactStack;
  const labelClass = compactFields
    ? light
      ? "flex flex-col gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/70"
      : "flex flex-col gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/82"
    : light
      ? labelLight
      : labelDark;
  const fieldClass = compactFields
    ? light
      ? "rounded-full border border-zen-gold/25 bg-white px-4 py-3 text-sm text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
      : "rounded-full border border-white/75 bg-white px-4 py-3 text-sm text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
    : light
      ? fieldLight
      : fieldDark;
  const messageFieldClass = compactFields
    ? compactMessageSingleLine
      ? `${fieldClass} min-h-0 resize-none`
      : light
        ? "min-h-[7.5rem] resize-y rounded-2xl border border-zen-gold/25 bg-white px-4 py-3 text-sm leading-relaxed text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
        : "min-h-[7.5rem] resize-y rounded-2xl border border-white/75 bg-white px-4 py-3 text-sm leading-relaxed text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
    : fieldClass;
  const disclaimerClass = compactFields
    ? light
      ? "text-[0.72rem] leading-relaxed text-black/55"
      : "text-[0.72rem] leading-relaxed text-white/68"
    : light
      ? "text-xs text-black/55"
      : "text-xs text-white/55";
  const formClass = compactStack
    ? "grid grid-cols-1 gap-3"
    : compactInline
      ? "grid gap-3 md:grid-cols-2"
      : "grid gap-4 sm:grid-cols-2";
  const fullWidthClass = compactStack ? "" : compactInline ? "md:col-span-2" : "sm:col-span-2";
  const messageLabelClass = compactInline
    ? `${labelClass} md:col-span-2`
    : compactStack
      ? labelClass
      : `${labelClass} ${fullWidthClass}`;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setStatusError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fallbackMessage = defaultMessage?.trim() ?? "";

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim() || fallbackMessage,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatusError(true);
      setStatusMessage("Please fill in name, email, and message.");
      return;
    }

    if (!siteKey) {
      setStatusError(true);
      setStatusMessage("reCAPTCHA site key is missing. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your env.");
      return;
    }

    setIsSubmitting(true);
    try {
      const recaptchaToken = await fetchRecaptchaToken(siteKey);

      const body: Record<string, unknown> = { ...payload, recaptchaToken };
      const trimmedForm = formName?.trim();
      if (trimmedForm) body.formName = trimmedForm;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message ?? "Unable to submit form.");
      }

      setStatusMessage("Thanks! Your request has been sent.");
      form.reset();
      setPhone("");
    } catch (error) {
      setStatusError(true);
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <label className={labelClass}>
        Name
        <input
          type="text"
          name="name"
          autoComplete="name"
          className={fieldClass}
          placeholder="Your name"
          required
        />
      </label>
      <label className={labelClass}>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
          required
        />
      </label>
      <label className={labelClass}>
        Phone
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className={fieldClass}
          placeholder="(208) 555-1234"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
      </label>
      <label className={labelClass}>
        City
        <input
          type="text"
          name="city"
          autoComplete="address-level2"
          className={fieldClass}
          placeholder="Boise, ID"
        />
      </label>
      {defaultMessage ? (
        <input type="hidden" name="message" defaultValue={defaultMessage} />
      ) : compactFields ? (
        <label className={messageLabelClass}>
          Message
          <textarea
            name="message"
            rows={compactMessageSingleLine ? 1 : 5}
            className={messageFieldClass}
            placeholder="Message"
            required
          />
        </label>
      ) : (
        <label className={messageLabelClass}>
          How can we help you?
          <textarea
            name="message"
            rows={4}
            className={fieldClass}
            placeholder="Tell us about your project..."
            required
          />
        </label>
      )}
      {siteKey ? (
        <p className={[fullWidthClass, disclaimerClass].filter(Boolean).join(" ")}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      ) : (
        <p className={[fullWidthClass, "text-sm text-red-500"].filter(Boolean).join(" ")}>
          reCAPTCHA site key is missing. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your env.
        </p>
      )}
      {statusMessage ? (
        <p className={[fullWidthClass, "text-sm", statusError ? "text-red-500" : "text-emerald-600"].filter(Boolean).join(" ")}>
          {statusMessage}
        </p>
      ) : null}
      <div
        className={
          compactStack
            ? "flex w-full justify-center"
            : compactInline
              ? "flex w-full justify-center md:col-span-2"
              : "flex w-full justify-center sm:col-span-2"
        }
      >
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
