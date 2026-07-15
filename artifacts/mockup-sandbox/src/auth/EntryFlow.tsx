import { useState, type ReactNode } from "react";
import { LoginPage } from "./LoginPage";
import { writeEntrySelection } from "./entrySelection";
import { SUPPLIER_PORTAL_ENABLED } from "../featureFlags";
import { V, G, CYAN, LOGO, ensureAuthStyles } from "./authTheme";

// Pre-login entry: choose dashboard → choose role → login. A professional split-panel
// experience built on the client's Electric Violet + GreyScale palette. Pure UI; no API
// calls until the credential step. The chosen {slug, role} is persisted so the mockup
// opens directly on that role after authentication.

const FEATURES = [
  { icon: "📊", label: "9 موديولات مالية متكاملة" },
  { icon: "✅", label: "خط اعتماد من 6 مراحل" },
  { icon: "🏢", label: "تعدد الفروع والعلامات التجارية" },
  { icon: "⚡", label: "تقارير ولوحات تحكم لحظية" },
];

const DASHBOARDS = [
  {
    slug: "asab/ASABPrototype",
    title: "الداشبورد الرئيسي",
    subtitle: "منظومة عصب الكاملة",
    desc: "إدارة مالية متكاملة — المبيعات، المصروفات، المشتريات، المخزون، الشفتات، العهد النقدية، والأصول الثابتة.",
    badge: "9 موديولات · 6 أدوار · خط اعتماد 6 مراحل",
    icon: "🏢",
  },
  {
    slug: "asab/CompanyDashboard",
    title: "بوابة الشركات",
    subtitle: "مجموعة التاج — بوابة المؤسسات",
    desc: "لوحة إدارة متعددة الفروع لمجموعات المطاعم — مراجعة البيانات وتدقيق العمليات عبر جميع العلامات التجارية.",
    badge: "5 أدوار · 4 علامات تجارية · متعدد الفروع",
    icon: "🏨",
  },
] as const;

const ROLES: Record<string, { id: string; icon: string; title: string; desc: string; accent: string }[]> = {
  "asab/ASABPrototype": [
    { id: "admin", icon: "🧠", title: "أدمن النظام", desc: "المستخدمون والاشتراكات والإعدادات", accent: "#ef4444" },
    { id: "head", icon: "👑", title: "رئيس الحسابات", desc: "الاعتماد النهائي والإشراف", accent: "#f59e0b" },
    { id: "accountant", icon: "🧮", title: "المحاسب", desc: "مراجعة وتدقيق العمليات اليومية", accent: V[600] },
    { id: "branch", icon: "🏪", title: "مدير الفرع", desc: "رفع البيانات اليومية وإدارة الفرع", accent: "#10b981" },
    { id: "procurement", icon: "🛒", title: "مدير المشتريات", desc: "طلبات الشراء والتنسيق مع الموردين", accent: "#8b5cf6" },
    { id: "supplier", icon: "🏭", title: "المورد", desc: "استلام طلبات التوريد وإدارة الكتالوج", accent: CYAN },
  ],
  "asab/CompanyDashboard": [
    { id: "company-admin", icon: "🏢", title: "أدمن الشركة", desc: "إدارة الاشتراك والمستخدمين", accent: V[700] },
    { id: "head", icon: "👑", title: "رئيس الحسابات", desc: "الإشراف والاعتماد النهائي", accent: "#3b82f6" },
    { id: "accountant", icon: "📊", title: "محاسب", desc: "مراجعة العمليات المالية", accent: CYAN },
    { id: "branch", icon: "🏪", title: "مدير فرع", desc: "رفع بيانات الفرع اليومية", accent: "#10b981" },
    { id: "procurement", icon: "🛒", title: "مدير مشتريات", desc: "أوامر الشراء والموردون", accent: "#f59e0b" },
  ],
};

// ─── Persistent brand panel (left) ────────────────────────────────────────────
function BrandPanel() {
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
            منظومة الإدارة المالية
            <br />
            <span style={{ color: CYAN }}>الذكية للمطاعم</span>
          </h1>
          <p className="asab-rise" style={{ animationDelay: "160ms", fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.8, margin: "0 0 32px", maxWidth: 420 }}>
            منصة واحدة تجمع كل عملياتك المالية عبر الفروع والعلامات التجارية — بدقة، وشفافية، وفي الوقت الحقيقي.
          </p>

          <div className="asab-brand__features" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={f.label} className="asab-feat asab-rise" style={{ animationDelay: `${240 + i * 70}ms` }}>
                <span>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>

        <p style={{ position: "relative", fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 40, marginBottom: 0 }}>
          عصب ASAB · النسخة التجريبية 2.0
        </p>
      </div>
    </aside>
  );
}

function EntryShell({ children, onBack, backLabel }: { children: ReactNode; onBack?: () => void; backLabel?: string }) {
  return (
    <div className="asab-entry">
      <BrandPanel />
      <main className="asab-content">
        <div className="asab-stage">
          {onBack && (
            <button type="button" className="asab-back" onClick={onBack}>
              → {backLabel ?? "رجوع"}
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

  // ── Step 3: credential login ──
  if (step === "login") {
    return (
      <EntryShell onBack={() => setStep("role")} backLabel="تغيير المستخدم">
        <LoginPage />
      </EntryShell>
    );
  }

  // ── Step 2: role chooser ──
  if (step === "role" && slug) {
    const dash = DASHBOARDS.find((d) => d.slug === slug)!;
    const roles = (ROLES[slug] ?? []).filter((r) => r.id !== "supplier" || SUPPLIER_PORTAL_ENABLED);
    return (
      <EntryShell onBack={() => { setSlug(null); setStep("dashboard"); }} backLabel="اختيار الداشبورد">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: V[50], border: `1px solid ${V[100]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{dash.icon}</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: G[900] }}>{dash.title}</h2>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: G[500] }}>{dash.subtitle}</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: G[600], margin: "14px 0 22px" }}>اختر المستخدم للمتابعة إلى تسجيل الدخول</p>
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
              <div style={{ color: G[900], fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{r.title}</div>
              <div style={{ color: G[500], fontSize: 12, lineHeight: 1.6, minHeight: 30 }}>{r.desc}</div>
            </button>
          ))}
        </div>
      </EntryShell>
    );
  }

  // ── Step 1: dashboard chooser ──
  return (
    <EntryShell>
      <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: G[900] }}>مرحباً بك في عصب</h2>
      <p style={{ fontSize: 14, color: G[600], margin: "0 0 26px" }}>اختر الداشبورد للبدء</p>
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
                <div style={{ fontSize: 18, fontWeight: 800, color: G[900] }}>{d.title}</div>
                <div style={{ fontSize: 13, color: V[600], fontWeight: 600, marginTop: 2 }}>{d.subtitle}</div>
              </div>
              <div style={{ color: V[600], fontSize: 22, fontWeight: 700 }}>←</div>
            </div>
            <p style={{ fontSize: 13, color: G[600], lineHeight: 1.7, margin: "14px 0 12px" }}>{d.desc}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: G[500], background: G[100], border: `1px solid ${G[200]}`, borderRadius: 8, padding: "5px 10px" }}>
              {d.badge}
            </div>
          </button>
        ))}
      </div>
    </EntryShell>
  );
}
