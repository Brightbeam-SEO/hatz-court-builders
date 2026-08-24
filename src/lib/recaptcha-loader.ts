import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-contact";

type GrecaptchaV3 = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

const READY_TIMEOUT_MS = 15_000;
const READY_POLL_MS = 50;

function getGrecaptcha(): GrecaptchaV3 | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { grecaptcha?: GrecaptchaV3 }).grecaptcha;
}

function isRecaptchaApiReady(): boolean {
  const grecaptcha = getGrecaptcha();
  return typeof grecaptcha?.ready === "function" && typeof grecaptcha?.execute === "function";
}

/** Wait until `window.grecaptcha` exposes ready + execute (script onload alone is not enough). */
function waitForRecaptchaApi(timeoutMs = READY_TIMEOUT_MS): Promise<GrecaptchaV3> {
  if (isRecaptchaApiReady()) return Promise.resolve(getGrecaptcha()!);

  return new Promise((resolve, reject) => {
    const started = Date.now();

    const tick = () => {
      if (isRecaptchaApiReady()) {
        resolve(getGrecaptcha()!);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        reject(new Error("reCAPTCHA failed to initialize. Please refresh and try again."));
        return;
      }
      window.setTimeout(tick, READY_POLL_MS);
    };

    tick();
  });
}

function injectRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://www.google.com/recaptcha/api.js"]',
    );

    if (existing) {
      if (isRecaptchaApiReady()) {
        resolve();
        return;
      }
      // Script tag may already be present with load already fired — poll instead of only listening.
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")), {
        once: true,
      });
      waitForRecaptchaApi()
        .then(() => resolve())
        .catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });
}

let loadPromise: Promise<GrecaptchaV3> | null = null;

/** Load reCAPTCHA v3 on demand and wait until the API is actually usable. */
export function loadRecaptcha(siteKey: string): Promise<GrecaptchaV3> {
  if (isRecaptchaApiReady()) return Promise.resolve(getGrecaptcha()!);

  loadPromise ??= injectRecaptchaScript(siteKey)
    .then(() => waitForRecaptchaApi())
    .catch((error) => {
      loadPromise = null;
      throw error;
    });

  return loadPromise;
}

function executeWhenReady(grecaptcha: GrecaptchaV3, siteKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      void grecaptcha
        .execute(siteKey, { action: RECAPTCHA_CONTACT_ACTION })
        .then(resolve)
        .catch(() => reject(new Error("Could not verify the form. Please try again.")));
    });
  });
}

export async function fetchRecaptchaToken(siteKey: string): Promise<string> {
  const grecaptcha = await loadRecaptcha(siteKey);
  return executeWhenReady(grecaptcha, siteKey);
}
