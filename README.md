# ASAB — Restaurant Financial Management System (عصب)

نظام **عصب (ASAB)** لإدارة مالية المطاعم — واجهة عربية أولاً (RTL) مبنية على React 19 + Vite + TypeScript،
مربوطة بباك Laravel. مونوريبو مُدار بـ pnpm.

## البنية

```
artifacts/
  mockup-sandbox/   واجهة الويب (React 19 + Vite 7 + TS) — الداشبوردات والأدوار
  api-server/       خدمة الـ API المساعدة
docs/
  role-wiring/      توثيق ربط كل دور بالباك اند (admin / head / accountant / …)
```

## الأدوار
مدير النظام (Admin) · مدير الحسابات (Head) · المحاسب (Accountant) · الفرع (Branch) · المشتريات (Procurement) · المورّد (Supplier) · مالك العلامة (Brand Owner).

## التشغيل

```bash
pnpm install

# الواجهة
cd artifacts/mockup-sandbox
pnpm dev            # تشغيل محلي
pnpm build          # بناء إنتاجي
```

### فحص الأنواع والبناء (mockup-sandbox)

```bash
# من داخل artifacts/mockup-sandbox
node --max-old-space-size=12288 ../../node_modules/typescript/bin/tsc -p tsconfig.json --noEmit
node --max-old-space-size=8192 ./node_modules/vite/bin/vite.js build
```

## المتغيرات
انسخ `.env.example` إلى `.env` واضبط عنوان الـ API.

## الترخيص
خاص — جميع الحقوق محفوظة.
