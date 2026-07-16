"use client";

import { useState } from "react";
import { fetchRecaptchaToken } from "@/lib/recaptcha-loader";

const PHONE_ERROR = "Please enter a complete 10-digit phone number.";

const labelDark = "flex flex-col gap-1.5 text-sm font-medium text-white";
const labelLight = "flex flex-col gap-1.5 text-sm font-medium text-black";
const fieldDark =
  "rounded-xl border border-white/40 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/80 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25";
const fieldLight =
  "hero-form-field-glass rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25";

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
  /** `compact-inline`: hero strip (2-col from md). `compact-stack`: same fields/styling, single column. `contact-page`: email/name row, stacked fields, left-aligned submit. */
  layout?: "default" | "compact-inline" | "compact-stack" | "contact-page";
  /** Hero strip only: message field matches single-line input height (phone, etc.). */
  compactMessageSingleLine?: boolean;
  /** Hidden fallback for compact forms that do not show a message field. */
  defaultMessage?: string;
  submitLabel?: string;
}) {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);
  const light = variant === "light";
  const contactPage = layout === "contact-page";
  const compactInline = layout === "compact-inline";
  const compactStack = layout === "compact-stack";
  const compactFields = compactInline || compactStack;
  const labelClass = contactPage
    ? "flex flex-col gap-1.5 text-sm font-semibold text-white"
    : compactFields
    ? light
      ? "flex flex-col gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/70"
      : "flex flex-col gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/82"
    : light
      ? labelLight
      : labelDark;
  const fieldClass = contactPage
    ? "rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm text-zen-espresso placeholder:text-zen-taupe/70 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25"
    : compactFields
    ? light
      ? "rounded-full border border-zen-gold/25 bg-white px-4 py-3 text-sm text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
      : "rounded-full border border-white/75 bg-white px-4 py-3 text-sm text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
    : light
      ? fieldLight
      : fieldDark;
  const messageFieldClass = contactPage
    ? "min-h-[7.5rem] resize-y rounded-xl border border-slate-200/90 bg-white px-3 py-2.5 text-sm leading-relaxed text-zen-espresso placeholder:text-zen-taupe/70 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/25"
    : compactFields
    ? compactMessageSingleLine
      ? `${fieldClass} min-h-0 resize-none`
      : light
        ? "min-h-[7.5rem] resize-y rounded-2xl border border-zen-gold/25 bg-white px-4 py-3 text-sm leading-relaxed text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
        : "min-h-[7.5rem] resize-y rounded-2xl border border-white/75 bg-white px-4 py-3 text-sm leading-relaxed text-zen-espresso placeholder:text-zen-taupe/75 outline-none transition focus:border-zen-crimson focus:ring-2 focus:ring-zen-crimson/15"
    : fieldClass;
  const disclaimerClass = contactPage
    ? "text-xs text-white/55"
    : compactFields
    ? light
      ? "text-[0.72rem] leading-relaxed text-black/55"
      : "text-[0.72rem] leading-relaxed text-white/68"
    : light
      ? "text-xs text-black/55"
      : "text-xs text-white/55";
  const formClass = contactPage
    ? "grid gap-4"
    : compactStack
    ? "grid grid-cols-1 gap-3"
    : compactInline
      ? "grid gap-3 md:grid-cols-2"
      : "grid gap-4 sm:grid-cols-2";
  const fullWidthClass = contactPage
    ? ""
    : compactStack
      ? ""
      : compactInline
        ? "md:col-span-2"
        : "sm:col-span-2";
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

  const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
    if (phoneError) setPhoneError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPhoneError("");
    setStatusMessage("");
    setStatusError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fallbackMessage = defaultMessage?.trim() ?? "";

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: phone.trim(),
      city: String(formData.get("city") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim() || fallbackMessage,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatusError(true);
      setStatusMessage("Please fill in name, email, and message.");
      return;
    }

    if (getPhoneDigits(phone).length !== 10) {
      setPhoneError(PHONE_ERROR);
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
      setPhoneError("");
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
      {contactPage ? (
        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>
      ) : (
        <>
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
        </>
      )}
      {contactPage ? (
        <div className="grid gap-4 sm:grid-cols-2">
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
              onChange={(e) => handlePhoneChange(e.target.value)}
              aria-invalid={phoneError ? true : undefined}
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
        </div>
      ) : (
        <>
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
              onChange={(e) => handlePhoneChange(e.target.value)}
              aria-invalid={phoneError ? true : undefined}
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
        </>
      )}
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
      ) : contactPage ? (
        <label className={labelClass}>
          How can we help you?
          <textarea
            name="message"
            rows={5}
            className={messageFieldClass}
            placeholder="Tell us about your project..."
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
        <p
          className={[
            fullWidthClass,
            "text-center text-sm",
            statusError ? "text-red-500" : "text-emerald-600",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {statusMessage}
        </p>
      ) : null}
      <div
        className={
          contactPage
            ? "flex w-full flex-col items-center gap-2"
            : compactStack
              ? "flex w-full flex-col items-center gap-2"
              : compactInline
                ? "flex w-full flex-col items-center gap-2 md:col-span-2"
                : "flex w-full flex-col items-center gap-2 sm:col-span-2"
        }
      >
        {phoneError ? (
          <p className="text-center text-sm text-red-500">{phoneError}</p>
        ) : null}
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
