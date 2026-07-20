// ─────────────────────────────────────────────────────────────────────────────
// Shared app language (ar | en).
//
// Each dashboard mockup owns a local Lang context, so the pre-login entry flow
// had no way to express a language choice and was hardcoded Arabic. This module
// is the one place the choice lives: the entry flow writes it, and every mockup
// context seeds itself from it on mount, so the language survives the jump from
// the entry screen into a dashboard (and across reloads).
// ─────────────────────────────────────────────────────────────────────────────

export type AppLang = "ar" | "en";

const KEY = "asab_lang";

/** Reads the persisted language; defaults to Arabic. Safe in non-browser contexts. */
export function readAppLang(): AppLang {
  try {
    return localStorage.getItem(KEY) === "en" ? "en" : "ar";
  } catch {
    return "ar";
  }
}

/** Persists the language and mirrors it onto <html lang/dir> for global styling. */
export function writeAppLang(lang: AppLang): void {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* storage unavailable — the in-memory choice still applies for this session */
  }
  applyDocumentLang(lang);
}

/** Keeps the document element in sync so RTL/LTR flips outside React too. */
export function applyDocumentLang(lang: AppLang): void {
  try {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "en" ? "ltr" : "rtl";
  } catch {
    /* no document (SSR/tests) */
  }
}
