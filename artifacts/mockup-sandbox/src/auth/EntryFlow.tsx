import { useState, type ReactNode } from "react";
import { LoginPage } from "./LoginPage";
import { writeEntrySelection } from "./entrySelection";
import { SUPPLIER_PORTAL_ENABLED } from "../featureFlags";
import { readAppLang, writeAppLang, applyDocumentLang, type AppLang } from "../appLang";
import { V, G, CYAN, LOGO, ensureAuthStyles } from "./authTheme";

// Pre-login entry: choose dashboard → choose role → login. A professional split-panel
// experience built on the client's Electric Violet + GreyScale palette. Pure UI; no API
// calls until the credential step. The chosen {slug, role} is persisted so the mockup
// opens directly on that role after authentication.

const FEATURES = [
  { icon: "📊", label: "9 موديولات مالية متكاملة", labelEn: "9 integrated financial modules" },
  { icon: "✅", label: "خط اعتماد من 6 مراحل", labelEn: "6-stage approval pipeline" },
  { icon: "🏢", label: "تعدد الفروع والعلامات التجارية", labelEn: "Multi-branch & multi-brand" },
  { icon: "⚡", label: "تقارير ولوحات تحكم لحظية", labelEn: "Real-time reports & dashboards" },
];

const DASHBOARDS = [
  {
    slug: "asab/ASABPrototype",
    title: "الداشبورد الرئيسي",
    titleEn: "Main Dashboard",
    subtitle: "منظومة عصب الكاملة",
    subtitleEn: "The complete ASAB system",
    desc: "إدارة مالية متكاملة — المبيعات، المصروفات، المشتريات، المخزون، الشفتات، العهد النقدية، والأصول الثابتة.",
    descEn: "End-to-end financial management — sales, expenses, purchases, inventory, shifts, cash custody and fixed assets.",
    badge: "9 موديولات · 6 أدوار · خط اعتماد 6 مراحل",
    badgeEn: "9 modules · 6 roles · 6-stage approval",
    icon: "🏢",
  },
  {
    slug: "asab/CompanyDashboard",
    title: "بوابة الشركات",
    titleEn: "Company Portal",
    subtitle: "مجموعة التاج — بوابة المؤسسات",
    subtitleEn: "Al-Taj Group — enterprise portal",
    desc: "لوحة إدارة متعددة الفروع لمجموعات المطاعم — مراجعة البيانات وتدقيق العمليات عبر جميع العلامات التجارية.",
    descEn: "Multi-branch console for restaurant groups — review data and audit operations across every brand.",
    badge: "5 أدوار · 4 علامات تجارية · متعدد الفروع",
    badgeEn: "5 roles · 4 brands · multi-branch",
    icon: "🏨",
  },
] as const;

const ROLES: Record<string, { id: string; icon: string; title: string; titleEn: string; desc: string; descEn: string; accent: string }[]> = {
  "asab/ASABPrototype": [
    { id: "admin", icon: "🧠", title: "أدمن النظام", titleEn: "System Admin", desc: "المستخدمون والاشتراكات والإعدادات", descEn: "Users, subscriptions and settings", accent: "#ef4444" },
    { id: "head", icon: "👑", title: "رئيس الحسابات", titleEn: "Head Accountant", desc: "الاعتماد النهائي والإشراف", descEn: "Final approval and oversight", accent: "#f59e0b" },
    { id: "accountant", icon: "🧮", title: "المحاسب", titleEn: "Accountant", desc: "مراجعة وتدقيق العمليات اليومية", descEn: "Review and audit daily operations", accent: V[600] },
    { id: "branch", icon: "🏪", title: "مدير الفرع", titleEn: "Branch Manager", desc: "رفع البيانات اليومية وإدارة الفرع", descEn: "Upload daily data and manage the branch", accent: "#10b981" },
    { id: "procurement", icon: "🛒", title: "مدير المشتريات", titleEn: "Procurement Manager", desc: "طلبات الشراء والتنسيق مع الموردين", descEn: "Purchase requests and supplier coordination", accent: "#8b5cf6" },
    { id: "supplier", icon: "🏭", title: "المورد", titleEn: "Supplier", desc: "استلام طلبات التوريد وإدارة الكتالوج", descEn: "Receive supply orders and manage the catalog", accent: CYAN },
  ],
  "asab/CompanyDashboard": [
    { id: "company-admin", icon: "🏢", title: "أدمن الشركة", titleEn: "Company Admin", desc: "إدارة الاشتراك والمستخدمين", descEn: "Manage subscription and users", accent: V[700] },
    { id: "head", icon: "👑", title: "رئيس الحسابات", titleEn: "Head Accountant", desc: "الإشراف والاعتماد النهائي", descEn: "Oversight and final approval", accent: "#3b82f6" },
    { id: "accountant", icon: "📊", title: "محاسب", titleEn: "Accountant", desc: "مراجعة العمليات المالية", descEn: "Review financial operations", accent: CYAN },
    { id: "branch", icon: "🏪", title: "مدير فرع", titleEn: "Branch Manager", desc: "رفع بيانات الفرع اليومية", descEn: "Upload the branch's daily data", accent: "#10b981" },
    { id: "procurement", icon: "🛒", title: "مدير مشتريات", titleEn: "Procurement Manager", desc: "أوامر الشراء والموردون", descEn: "Purchase orders and suppliers", accent: "#f59e0b" },
  ],
};

// Static copy for the entry flow itself.
const COPY = {
  brandTitle:   ["منظومة الإدارة المالية", "The Smart Financial"],
  brandTitle2:  ["الذكية للمطاعم", "Platform for Restaurants"],
  brandLede:    ["منصة واحدة تجمع كل عملياتك المالية عبر الفروع والعلامات التجارية — بدقة، وشفافية، وفي الوقت الحقيقي.",
                 "One platform for every financial operation across your branches and brands — accurate, transparent and real-time."],
  version:      ["عصب ASAB · النسخة التجريبية 2.0", "ASAB · Preview build 2.0"],
  welcome:      ["مرحباً بك في عصب", "Welcome to ASAB"],
  pickDash:     ["اختر الداشبورد للبدء", "Choose a dashboard to begin"],
  pickRole:     ["اختر المستخدم للمتابعة إلى تسجيل الدخول", "Choose a user to continue to sign-in"],
  back:         ["رجوع", "Back"],
  backToDash:   ["اختيار الداشبورد", "Choose dashboard"],
  changeUser:   ["تغيير المستخدم", "Change user"],
} as const;

// ─── Persistent brand panel (left) ────────────────────────────────────────────
function BrandPanel({ lang }: { lang: AppLang }) {
  const pick = (pair: readonly [string, string]) => (lang === "en" ? pair[1] : pair[0]);
  return (
    <aside className="asab-brand">
      <div className="asab-brand__grid" />
      <div className="asab-blob asab-blob--a" style={{ width: 320, height: 320, background: CYAN, opacity: 0.18, top: -80, insetInlineStart: -60 }} />
      <div className="asab-blob asab-blob--b" style={{ width: 360, height: 360, background: V[400], opacity: 0.28, bottom: -120, insetInlineEnd: -80 }} />

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Logo lockup — real color logo on a white surface so the brand mark stays crisp. */}
        <div className="asab-logo-in" style={{ background: "#fff", borderRadius: 18, padding: "14px 20px", alignSelf: "flex-start", boxShadow: "0 12px 32px rgba(0,0,0,.22)" }}>
          <img src={LOGO} alt="ASAB — عصب" style={{ height: 52, width: "auto", display: "block" }} />
        </div>

        <div style={{ marginTop: "auto" }}>
          <h1 className="asab-rise" style={{ animationDelay: "80ms", fontSize: 34, fontWeight: 800, lineHeight: 1.25, margin: "0 0 14px", letterSpacing: "-0.01em" }}>
            {pick(COPY.brandTitle)}
            <br />
            <span style={{ color: CYAN }}>{pick(COPY.brandTitle2)}</span>
          </h1>
          <p className="asab-rise" style={{ animationDelay: "160ms", fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.8, margin: "0 0 32px", maxWidth: 420 }}>
            {pick(COPY.brandLede)}
          </p>

          <div className="asab-brand__features" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={f.label} className="asab-feat asab-rise" style={{ animationDelay: `${240 + i * 70}ms` }}>
                <span>{f.icon}</span>
                {lang === "en" ? f.labelEn : f.label}
              </div>
            ))}
          </div>
        </div>

        <p style={{ position: "relative", fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 40, marginBottom: 0 }}>
          {pick(COPY.version)}
        </p>
      </div>
    </aside>
  );
}

function EntryShell({ children, onBack, backLabel, lang, onToggleLang }: {
  children: ReactNode; onBack?: () => void; backLabel?: string;
  lang: AppLang; onToggleLang: () => void;
}) {
  const rtl = lang !== "en";
  return (
    <div className="asab-entry" dir={rtl ? "rtl" : "ltr"}>
      <BrandPanel lang={lang} />
      <main className="asab-content" style={{ position: "relative" }}>
        {/* Language toggle — the single place the pre-login language is chosen. */}
        <button
          type="button"
          onClick={onToggleLang}
          aria-label={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
          style={{
            position: "absolute", top: 18, insetInlineEnd: 18, zIndex: 2,
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 13px", borderRadius: 999,
            border: `1px solid ${G[200]}`, background: "#fff", color: G[700],
            fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 1px 3px rgba(0,0,0,.05)",
          }}
        >
          <span aria-hidden>🌐</span>
          {lang === "en" ? "العربية" : "English"}
        </button>
        <div className="asab-stage">
          {onBack && (
            <button type="button" className="asab-back" onClick={onBack}>
              {rtl ? "→" : "←"} {backLabel ?? (rtl ? "رجوع" : "Back")}
            </button>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

export function EntryFlow() {
  ensureAuthStyles();
  const [slug, setSlug] = useState<string | null>(null);
  const [step, setStep] = useState<"dashboard" | "role" | "login">("dashboard");
  const [lang, setLang] = useState<AppLang>(() => {
    const l = readAppLang();
    applyDocumentLang(l);
    return l;
  });
  const en = lang === "en";
  const pick = (pair: readonly [string, string]) => (en ? pair[1] : pair[0]);
  const toggleLang = () => {
    const next: AppLang = en ? "ar" : "en";
    setLang(next);
    writeAppLang(next);
  };
  const shell = { lang, onToggleLang: toggleLang };

  // ── Step 3: credential login ──
  if (step === "login") {
    return (
      <EntryShell {...shell} onBack={() => setStep("role")} backLabel={pick(COPY.changeUser)}>
        <LoginPage />
      </EntryShell>
    );
  }

  // ── Step 2: role chooser ──
  if (step === "role" && slug) {
    const dash = DASHBOARDS.find((d) => d.slug === slug)!;
    const roles = (ROLES[slug] ?? []).filter((r) => r.id !== "supplier" || SUPPLIER_PORTAL_ENABLED);
    return (
      <EntryShell {...shell} onBack={() => { setSlug(null); setStep("dashboard"); }} backLabel={pick(COPY.backToDash)}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: V[50], border: `1px solid ${V[100]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{dash.icon}</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: G[900] }}>{en ? dash.titleEn : dash.title}</h2>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: G[500] }}>{en ? dash.subtitleEn : dash.subtitle}</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: G[600], margin: "14px 0 22px" }}>{pick(COPY.pickRole)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {roles.map((r, i) => (
            <button
              key={r.id}
              type="button"
              className="asab-role asab-rise"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => { writeEntrySelection({ slug, role: r.id }); setStep("login"); }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = r.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = G[200]; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: `${r.accent}14`, border: `1px solid ${r.accent}33` }}>{r.icon}</div>
              <div style={{ color: G[900], fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{en ? r.titleEn : r.title}</div>
              <div style={{ color: G[500], fontSize: 12, lineHeight: 1.6, minHeight: 30 }}>{en ? r.descEn : r.desc}</div>
            </button>
          ))}
        </div>
      </EntryShell>
    );
  }

  // ── Step 1: dashboard chooser ──
  return (
    <EntryShell {...shell}>
      <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: G[900] }}>{pick(COPY.welcome)}</h2>
      <p style={{ fontSize: 14, color: G[600], margin: "0 0 26px" }}>{pick(COPY.pickDash)}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {DASHBOARDS.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            className="asab-card asab-rise"
            onClick={() => { setSlug(d.slug); setStep("role"); }}
            style={{ padding: 24, animationDelay: `${i * 90}ms` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 15, flexShrink: 0, background: `linear-gradient(135deg, ${V[600]}, ${V[800]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: `0 8px 20px -6px ${V[600]}66` }}>{d.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: G[900] }}>{en ? d.titleEn : d.title}</div>
                <div style={{ fontSize: 13, color: V[600], fontWeight: 600, marginTop: 2 }}>{en ? d.subtitleEn : d.subtitle}</div>
              </div>
              <div style={{ color: V[600], fontSize: 22, fontWeight: 700 }}>{en ? "→" : "←"}</div>
            </div>
            <p style={{ fontSize: 13, color: G[600], lineHeight: 1.7, margin: "14px 0 12px" }}>{en ? d.descEn : d.desc}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: G[500], background: G[100], border: `1px solid ${G[200]}`, borderRadius: 8, padding: "5px 10px" }}>
              {en ? d.badgeEn : d.badge}
            </div>
          </button>
        ))}
      </div>
    </EntryShell>
  );
}
