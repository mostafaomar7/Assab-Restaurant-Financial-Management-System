import { V, G } from "./authTheme";
import type { SiteLang } from "./siteLang";

// Segmented Arabic / English switch. `variant` adapts to the surface it sits on.
export function LangToggle({
  lang,
  onChange,
  variant = "light",
}: {
  lang: SiteLang;
  onChange: (l: SiteLang) => void;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const track = dark ? "rgba(255,255,255,0.12)" : "#fff";
  const trackBorder = dark ? "rgba(255,255,255,0.22)" : G[200];
  const idleColor = dark ? "rgba(255,255,255,0.7)" : G[500];

  const opts: { id: SiteLang; label: string }[] = [
    { id: "ar", label: "العربية" },
    { id: "en", label: "English" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: track,
        border: `1px solid ${trackBorder}`,
        boxShadow: dark ? "none" : "0 1px 2px rgba(16,24,40,.05)",
      }}
    >
      {opts.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            style={{
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 999,
              transition: "background .15s ease, color .15s ease",
              background: active ? (dark ? "#fff" : V[600]) : "transparent",
              color: active ? (dark ? V[700] : "#fff") : idleColor,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
