import type { NextRequest } from "next/server";
import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-contact";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  recaptchaToken?: string;
  /** Shown in Zapier as "Form Name" (which page/placement sent the lead). */
  formName?: string;
};

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

const GOOGLE_RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function POST(request: NextRequest) {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

  if (!recaptchaSecret || !zapierWebhookUrl) {
    return Response.json(
      { ok: false, message: "Server is missing required environment variables." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const recaptchaToken = (body.recaptchaToken ?? "").trim();
  const formNameRaw = (body.formName ?? "").trim().slice(0, 120);
  const formName = formNameRaw || "Sol website contact";

  if (!name || !email || !message || !recaptchaToken) {
    return Response.json(
      { ok: false, message: "Missing required fields or reCAPTCHA token." },
      { status: 400 },
    );
  }

  const verificationBody = new URLSearchParams({
    secret: recaptchaSecret,
    response: recaptchaToken,
  });

  const recaptchaResponse = await fetch(GOOGLE_RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: verificationBody.toString(),
    cache: "no-store",
  });

  if (!recaptchaResponse.ok) {
    return Response.json(
      { ok: false, message: "Could not verify reCAPTCHA. Please try again." },
      { status: 502 },
    );
  }

  const recaptchaData = (await recaptchaResponse.json()) as RecaptchaVerifyResponse;
  if (!recaptchaData.success) {
    return Response.json(
      {
        ok: false,
        message: "reCAPTCHA verification failed.",
        errors: recaptchaData["error-codes"] ?? [],
      },
      { status: 400 },
    );
  }

  const minScore = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  const threshold = Number.isFinite(minScore) ? minScore : 0.5;
  const score = recaptchaData.score;
  if (typeof score !== "number" || score < threshold) {
    return Response.json(
      { ok: false, message: "Submission could not be verified. Please try again." },
      { status: 400 },
    );
  }
  if (recaptchaData.action !== RECAPTCHA_CONTACT_ACTION) {
    return Response.json(
      { ok: false, message: "reCAPTCHA verification failed." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const referer = request.headers.get("referer") ?? "unknown";

  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const submittedAt = new Date().toISOString();

  // Flat form body: Zapier "Catch Hook" maps urlencoded fields reliably. Include
  // legacy keys so Zaps created for older forms (different JSON names) still fill.
  const zapierBody = new URLSearchParams();
  const append = (key: string, value: string | number | null | undefined) => {
    if (value === null || value === undefined) zapierBody.append(key, "");
    else zapierBody.append(key, String(value));
  };

  append("name", name);
  append("email", email);
  append("phone", phone);
  append("message", message);
  append("Name", name);
  append("Email", email);
  append("source", "website-contact-form");
  append("submittedAt", submittedAt);
  append("ip", ip);
  append("userAgent", userAgent);
  append("referer", referer);
  append("recaptchaScore", recaptchaData.score ?? null);
  append("recaptchaAction", recaptchaData.action ?? null);

  append("Tell Us About Your Project", message);
  append("tell_us_about_your_project", message);
  append("Signup Page", referer);
  append("signup_page", referer);

  // Aliases for Zaps whose Catch Hook sample used different keys (e.g. “Your Name”).
  append("Your Name", name);
  append("Your Email", email);
  append("Form Name", formName);
  // Single-token aliases: some Zapier Gmail mappings fail on spaced keys in the subject.
  append("FormName", formName);
  append("form_name", formName);
  let pageTitle = "Contact";
  try {
    const path = new URL(referer).pathname.replace(/\/$/, "") || "/";
    const last = path.split("/").filter(Boolean).pop();
    if (last) {
      pageTitle = last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
    }
  } catch {
    /* referer may be invalid */
  }
  append("Page Title", pageTitle);
  append("Phone", phone);
  append("Message", message);
  append("utm_source", "");
  append("utm_medium", "");
  append("utm_campaign", "");
  append("utm_term", "");

  const zapierResponse = await fetch(zapierWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: zapierBody.toString(),
    cache: "no-store",
  });

  if (!zapierResponse.ok) {
    return Response.json(
      { ok: false, message: "Lead received but notification failed. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, message: "Submitted successfully." });
}
