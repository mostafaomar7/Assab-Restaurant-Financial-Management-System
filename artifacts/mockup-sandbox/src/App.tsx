import { useEffect, useRef, useState, type ComponentType } from "react";
import { modules as discoveredModules } from "./.generated/mockup-components";
import { EntryFlow } from "./auth/EntryFlow";
import { V, G, CYAN, LOGO, ensureAuthStyles } from "./auth/authTheme";
import { readEntrySelection } from "./auth/entrySelection";
import { useAuth } from "./auth/AuthContext";
import { OnboardingWizard } from "./auth/OnboardingWizard";
import { InvitationAcceptPage } from "./auth/InvitationAcceptPage";
import { SubscriptionExpiredBanner } from "./components/shared/SubscriptionExpiredBanner";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }
      try {
        const mod = await loader();
        if (cancelled) return;
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(`No exported React component found in ${componentPath}.tsx`);
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();
    return () => { cancelled = true; };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }
  if (!Component) return null;
  return <Component />;
}

// ─── Routing helpers ──────────────────────────────────────────────────────────

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

// Returns true when running as deployed static site (BASE_PATH = /)
function isStaticDeployment(): boolean {
  return getBasePath() === "";
}

// Build an href to a preview component — hash-based in production, path-based in dev
function previewHref(componentSlug: string): string {
  if (isStaticDeployment()) {
    return `#/preview/${componentSlug}`;
  }
  return `${getBasePath()}/preview/${componentSlug}`;
}

// Detect which component to render from current URL
// Supports BOTH:
//   • Hash routing:     /#/preview/asab/ASABPrototype       (static deployment)
//   • Pathname routing: /__mockup/preview/asab/ASABPrototype (dev canvas iframes)
function getPreviewPath(): string | null {
  // 1. Hash routing (static deployment)
  const hash = window.location.hash;
  const hashMatch = hash.match(/^#\/preview\/(.+)$/);
  if (hashMatch) return hashMatch[1];

  // 2. Pathname routing (dev / canvas iframes)
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

// Map a backend defaultPage hint to a known mockup slug. Backend can return
// either a full slug ("asab/CompanyDashboard") or a short hint ("dashboard").
function resolveLandingSlug(defaultPage: string | null, role: string | undefined): string {
  if (defaultPage && defaultPage.includes("/")) return defaultPage;
  if (role === "admin") return "asab/ASABPrototype";
  // Every company role lands in CompanyDashboard (it routes internally by role).
  return "asab/CompanyDashboard";
}

// ─── ASAB Landing Page (only shown for logged-in users — picks a dashboard) ──
function ASABLanding({ onLogout, userName }: { onLogout: () => void; userName: string }) {
  const dashboards = [
    {
      slug: "asab/ASABPrototype",
      title: "الداشبورد الرئيسي",
      subtitle: "منظومة عصب الكاملة",
      description:
        "إدارة مالية متكاملة — المبيعات، المصروفات، المشتريات، المخزون، الشفتات، العهد النقدية، والأصول الثابتة.",
      roles: ["محاسب", "رئيس حسابات", "مدير فرع", "مدير مشتريات", "مشرف", "أدمن"],
      badge: "9 موديولات · 6 أدوار · خط اعتماد 6 مراحل",
      icon: "🏢",
    },
    {
      slug: "asab/CompanyDashboard",
      title: "بوابة الشركات",
      subtitle: "مجموعة التاج — بوابة المؤسسات",
      description:
        "لوحة إدارة متعددة الفروع لمجموعات المطاعم — مراجعة البيانات وتدقيق العمليات عبر جميع العلامات التجارية.",
      roles: ["أدمن الشركة", "رئيس حسابات", "محاسب", "مدير فرع", "مدير مشتريات"],
      badge: "5 أدوار · 4 علامات تجارية · متعدد الفروع",
      icon: "🏨",
    },
  ] as const;

  return (
    <div className="asab-landing">
      <div className="asab-blob asab-blob--a" style={{ width: 340, height: 340, background: V[300], opacity: 0.3, top: -120, insetInlineStart: -80 }} />
      <div className="asab-blob asab-blob--b" style={{ width: 320, height: 320, background: CYAN, opacity: 0.12, bottom: -120, insetInlineEnd: -60 }} />

      {/* Top bar: logo + welcome + logout */}
      <header
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 28px",
          borderBottom: `1px solid ${G[200]}`,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <img src={LOGO} alt="ASAB — عصب" style={{ height: 34, width: "auto" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, color: G[600] }}>
            مرحباً، <span style={{ color: G[900], fontWeight: 700 }}>{userName}</span>
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "#fff",
              border: "1px solid #FECACA",
              color: "#DC2626",
              padding: "7px 16px",
              borderRadius: 10,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background .15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main — dashboard picker */}
      <main style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "44px 24px" }}>
        <div className="asab-rise" style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: 27, fontWeight: 800, color: G[900], margin: 0, letterSpacing: "-0.01em" }}>اختر الداشبورد</h1>
          <p style={{ fontSize: 14, color: G[500], margin: "8px 0 0" }}>ابدأ من حيث تحتاج — كل داشبورد بمستخدميه وصلاحياته</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "100%", maxWidth: 860 }}>
          {dashboards.map((d, i) => (
            <a
              key={d.slug}
              href={previewHref(d.slug)}
              className="asab-card asab-rise"
              style={{ display: "block", padding: 26, textDecoration: "none", animationDelay: `${i * 90}ms` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 54, height: 54, borderRadius: 15, flexShrink: 0, background: `linear-gradient(135deg, ${V[600]}, ${V[800]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, boxShadow: `0 8px 20px -6px ${V[600]}66` }}>{d.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: G[900] }}>{d.title}</div>
                  <div style={{ fontSize: 12.5, color: V[600], fontWeight: 600, marginTop: 2 }}>{d.subtitle}</div>
                </div>
                <div style={{ color: V[600], fontSize: 22, fontWeight: 700 }}>←</div>
              </div>
              <p style={{ fontSize: 13, color: G[600], lineHeight: 1.7, margin: "0 0 14px" }}>{d.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {d.roles.map((r) => (
                  <span key={r} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, border: `1px solid ${V[200]}`, color: V[700], background: V[50], fontWeight: 600 }}>{r}</span>
                ))}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${V[600]}, ${V[800]})`, color: "white", padding: "10px 22px", borderRadius: 12, fontSize: 13, fontWeight: 700, boxShadow: `0 10px 24px -12px ${V[700]}` }}>
                فتح الداشبورد ←
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer style={{ position: "relative", textAlign: "center", padding: "16px 24px 28px", borderTop: `1px solid ${G[200]}` }}>
        <p style={{ fontSize: 12, color: G[400], margin: 0 }}>عصب ASAB · نظام إدارة مالية المطاعم · النسخة التجريبية 2.0</p>
      </footer>
    </div>
  );
}

// ─── App — auth-aware shell ──────────────────────────────────────────────────
function App() {
  const { user, initializing, defaultPage, logout } = useAuth();
  const [, forceUpdate] = useState(0);
  // True once the post-login auto-redirect has run — so a later Back to root shows
  // the dashboard picker instead of getting stuck on the "opening…" loader.
  const redirectHandledRef = useRef(false);
  ensureAuthStyles();

  useEffect(() => {
    const onHashChange = () => forceUpdate((n) => n + 1);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Reset the one-shot redirect guard on logout so the next login redirects afresh.
  useEffect(() => {
    if (!user) redirectHandledRef.current = false;
  }, [user]);

  // After a fresh login, auto-redirect to the dashboard the user picked on the
  // pre-login entry flow (falls back to the role-appropriate landing).
  // NOTE: a stored entry selection redirects on its own — do NOT gate on
  // defaultPage, or a null defaultPage strands us on the "opening…" loader.
  useEffect(() => {
    if (!user) return;
    redirectHandledRef.current = true; // we've evaluated the landing for this session
    const sel = readEntrySelection();
    const current = getPreviewPath();
    const target = sel?.slug ?? (defaultPage ? resolveLandingSlug(defaultPage, user.role) : null);
    if (!target) return;
    // Already on the chosen dashboard → leave the user where they are.
    if (current === target) return;
    // Navigated somewhere with no explicit pre-login pick → don't yank them away.
    if (current && !sel) return;
    // Fresh pick wins over a stale preview hash left over from a previous session.
    window.location.hash = `#/preview/${target}`;
  }, [user, defaultPage]);

  if (initializing) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0A1628 0%, #0F1C35 40%, #1B3A6B 100%)",
          fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  // Public routes (no auth) — onboarding + invitation accept.
  const hash = window.location.hash;
  if (!user && hash.startsWith("#/onboarding")) {
    return <OnboardingWizard onDone={() => (window.location.hash = "#/login")} />;
  }
  if (!user && hash.startsWith("#/accept-invitation/")) {
    return <InvitationAcceptPage onDone={() => (window.location.hash = "#/")} />;
  }

  if (!user) {
    // Pre-login entry: choose dashboard → choose role → login.
    return <EntryFlow />;
  }

  const previewPath = getPreviewPath();
  if (previewPath) {
    return (
      <>
        <SubscriptionExpiredBanner />
        <PreviewRenderer
          componentPath={previewPath}
          modules={discoveredModules}
        />
      </>
    );
  }

  // Just authenticated with a pending entry selection → the redirect effect is about to
  // navigate to the chosen dashboard; show a loader instead of flashing the landing.
  // Once the redirect has run, a later Back to root should fall through to the picker.
  if (readEntrySelection() && !redirectHandledRef.current) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0A1628 0%, #0F1C35 40%, #1B3A6B 100%)",
          fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        جاري فتح الداشبورد...
      </div>
    );
  }

  return (
    <>
      <SubscriptionExpiredBanner />
      <ASABLanding onLogout={() => void logout()} userName={user.name} />
    </>
  );
}

export default App;
