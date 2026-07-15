import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { getErrorMessage } from "../api/errors";
import { isTwoFactorChallenge } from "../api/auth";
import { ForgotPasswordPage } from "./ForgotPasswordPage";

export function LoginPage() {
  const { login, loginWith2fa, loggingIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotting, setForgotting] = useState(false);
  // 2FA step-up state.
  const [twoFactorToken, setTwoFactorToken] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");

  if (forgotting) return <ForgotPasswordPage onDone={() => setForgotting(false)} />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Step 2 of 2FA — submit the OTP against the step-up token.
    if (twoFactorToken) {
      if (!otpCode) {
        toast.error("من فضلك أدخل رمز التحقق");
        return;
      }
      try {
        await loginWith2fa(twoFactorToken, otpCode);
        toast.success("تم تسجيل الدخول بنجاح");
      } catch (err) {
        toast.error(getErrorMessage(err, "ar"));
      }
      return;
    }
    if (!email || !password) {
      toast.error("من فضلك أدخل البريد وكلمة المرور");
      return;
    }
    try {
      const res = await login(email, password);
      if (isTwoFactorChallenge(res)) {
        // Backend wants a second factor — show the OTP input.
        setTwoFactorToken(res.twoFactorToken);
        toast("أدخل رمز التحقق الثنائي");
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (err) {
      toast.error(getErrorMessage(err, "ar"));
    }
  }

  // ─── Electric Violet + GreyScale tokens (matches the entry brand panel) ──────
  const V600 = "#7C3AED", V700 = "#6D28D9", V800 = "#5B21B6";
  const G200 = "#E4E7EC", G300 = "#D0D5DD", G400 = "#98A2B3", G500 = "#667085",
    G600 = "#475467", G700 = "#344054", G900 = "#101828";
  const FONT = "'IBM Plex Sans Arabic', 'Segoe UI', system-ui, sans-serif";

  const inputBase = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    background: "#fff",
    border: `1.5px solid ${G300}`,
    color: G900,
    fontSize: 14,
    outline: "none",
    direction: "ltr" as const,
    textAlign: "right" as const,
    fontFamily: "inherit",
    transition: "border-color .15s ease, box-shadow .15s ease",
  };
  const focusOn = (e: { currentTarget: HTMLInputElement }) => {
    e.currentTarget.style.borderColor = V600;
    e.currentTarget.style.boxShadow = `0 0 0 4px ${V600}1f`;
  };
  const focusOff = (e: { currentTarget: HTMLInputElement }) => {
    e.currentTarget.style.borderColor = G300;
    e.currentTarget.style.boxShadow = "none";
  };
  const labelStyle = { display: "block", fontSize: 12.5, color: G700, marginBottom: 7, fontWeight: 600 } as const;

  return (
    <form
      onSubmit={handleSubmit}
      dir="rtl"
      style={{
        width: "100%",
        maxWidth: 440,
        margin: "0 auto",
        background: "#fff",
        border: `1px solid ${G200}`,
        borderRadius: 20,
        padding: "34px 32px",
        boxShadow: "0 24px 60px -24px rgba(16,24,40,0.18)",
        fontFamily: FONT,
      }}
    >
      <h1 style={{ fontSize: 22, color: G900, fontWeight: 800, margin: "0 0 6px" }}>تسجيل الدخول</h1>
      <p style={{ fontSize: 13.5, color: G500, margin: "0 0 26px" }}>أدخل بياناتك للوصول إلى لوحة التحكم</p>

      {/* Email */}
      <label style={labelStyle}>البريد الإلكتروني</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={focusOn}
        onBlur={focusOff}
        autoComplete="email"
        autoFocus
        required
        disabled={loggingIn}
        placeholder="name@example.com"
        style={{ ...inputBase, marginBottom: 18 }}
      />

      {/* Password */}
      <label style={labelStyle}>كلمة المرور</label>
      <div style={{ position: "relative", marginBottom: 24 }}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={focusOn}
          onBlur={focusOff}
          autoComplete="current-password"
          required
          disabled={loggingIn}
          style={{ ...inputBase, paddingInlineStart: 52 }}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
          style={{
            position: "absolute",
            insetInlineStart: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: G400,
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 8px",
            fontFamily: "inherit",
          }}
        >
          {showPassword ? "إخفاء" : "إظهار"}
        </button>
      </div>

      {/* 2FA OTP — shown only after a step-up challenge */}
      {twoFactorToken && (
        <>
          <label style={labelStyle}>رمز التحقق الثنائي</label>
          <input
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
            onFocus={focusOn}
            onBlur={focusOff}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            placeholder="------"
            disabled={loggingIn}
            style={{ ...inputBase, borderColor: V600, fontSize: 20, letterSpacing: 8, textAlign: "center", marginBottom: 24 }}
          />
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loggingIn}
        style={{
          width: "100%",
          padding: "13px",
          background: loggingIn ? G300 : `linear-gradient(135deg, ${V600}, ${V800})`,
          color: "white",
          border: "none",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          cursor: loggingIn ? "wait" : "pointer",
          fontFamily: "inherit",
          boxShadow: loggingIn ? "none" : `0 10px 24px -10px ${V700}`,
          transition: "transform .15s ease, box-shadow .15s ease",
        }}
        onMouseEnter={(e) => { if (!loggingIn) e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
      >
        {loggingIn ? "جاري الدخول..." : twoFactorToken ? "تأكيد الرمز" : "تسجيل الدخول"}
      </button>

      <button
        type="button"
        onClick={() => setForgotting(true)}
        style={{ display: "block", width: "100%", background: "transparent", border: "none", color: G500, fontSize: 12.5, cursor: "pointer", marginTop: 16, fontFamily: "inherit", fontWeight: 500 }}
      >
        نسيت كلمة المرور؟
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
        <div style={{ flex: 1, height: 1, background: G200 }} />
        <span style={{ fontSize: 11, color: G400 }}>أو</span>
        <div style={{ flex: 1, height: 1, background: G200 }} />
      </div>

      <button
        type="button"
        onClick={() => (window.location.hash = "#/onboarding")}
        style={{ display: "block", width: "100%", background: "#fff", border: `1.5px solid ${V600}33`, color: V700, fontSize: 13, cursor: "pointer", padding: "11px", borderRadius: 12, fontFamily: "inherit", fontWeight: 700 }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#F5F3FF"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
      >
        تسجيل شركة جديدة
      </button>

      <p style={{ fontSize: 11, color: G400, textAlign: "center", marginTop: 22, marginBottom: 0 }}>
        عصب ASAB · نظام إدارة مالية المطاعم
      </p>
    </form>
  );
}
