import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-contact";

type GrecaptchaV3 = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function getGrecaptcha(): GrecaptchaV3 | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { grecaptcha?: GrecaptchaV3 }).grecaptcha;
}

let loadPromise: Promise<void> | null = null;

/** Load reCAPTCHA v3 on demand (avoids site-wide script cost until a form submits). */
export function loadRecaptcha(siteKey: string): Promise<void> {
  if (getGrecaptcha()?.execute) return Promise.resolve();

  loadPromise ??= new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://www.google.com/recaptcha/api.js"]',
    );
    if (existing) {
      if (getGrecaptcha()?.execute) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function fetchRecaptchaToken(siteKey: string): Promise<string> {
  await loadRecaptcha(siteKey);

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
