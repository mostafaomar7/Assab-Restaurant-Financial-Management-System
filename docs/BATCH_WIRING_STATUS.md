# حالة ربط دفعة `asab-admin-backend` بالفرونت

> آخر تحديث: 2026-07-10 · الفرونت: `artifacts/mockup-sandbox` · الباك (Hostinger): `https://ivory-snail-183262.hostingersite.com`

## ملخص في سطرين
- **كل الـ endpoints في الدفعة اتربطت في الفرونت** (فيه hook لكل واحد + الواجهات المطلوبة). أول ما الباك يتنشر، تشتغل من غير شغل إضافي.
- الحاجة الوحيدة **مش المنشورة** على السيرفر الحالي هي **الباقات** (`/admin/packages` بيرجّع **404**). كل الباقي منشور (اختبرناه لايف). التفاصيل تحت.

---

## ملاحظة مهمة عن التوكنات
توكنات Sanctum اللي اتبعتت **قصيرة العمر وانتهت** أثناء الاختبار (رجّعت `401` على `/auth/me` بعد دقائق). عشان كده:
- **`404`** = المسار مش موجود أصلاً في الباك (بيرجع قبل فحص التوكن) → **مش منشور**.
- **`401`** = المسار موجود بس التوكن باظ → **منشور**، بس محتاج توكن صالح للتحقق من شكل الرد.
- **`200`** = اتحقق لايف بتوكن صالح.

لأي اختبار جديد: ابعت توكن طازة، واختبر بسرعة قبل ما ينتهي.

---

## جدول حالة كل endpoint

| # | Endpoint | متربط بالفرونت؟ | ملف الربط | حالة النشر |
|---|---|---|---|---|
| 1 | `GET/POST/PATCH/DELETE /admin/packages` | ✅ | `src/api/queries/packages.ts` | ❌ **404 — مش منشور** |
| 2a | `POST /admin/users` (branches=1 / brands) | ✅ | `platform/admin.ts` `useCreateAdminUser` | ✅ منشور (401 بعد انتهاء التوكن) |
| 2b | `POST /company/me/users` (brandId للمحاسب) | ✅ | `companyAdmin.ts` `useCreateCompanyUser` | ✅ منشور |
| 2c | `PATCH /admin/branches/{id}` · `POST /admin/restaurants/{id}/branches` (منع مدير لفرعين) | ✅ | `platform/admin.ts` `useUpdateAdminBranch` / `useCreateAdminBranch` | ✅ منشور |
| 2d | `PATCH /admin/accountants/{id}/assignments` (`brands`) | ✅ | `platform/admin.ts` `useUpdateAccountantAssignments` | ✅ منشور (route موجود) |
| 3 | `POST /company/me/branch/employees` (كاشير + email/phone) | ✅ | `platform/branch.ts` `useAddBranchEmployeePlatform` | ✅ منشور (200 لايف) |
| 4a | `GET /company/me/branch/items` (`{items,configuredBy}`) | ✅ | `branchMgr.ts` `useBranchItems` · `platform/branch.ts` `useBranchInventoryItemsPlatform` | ✅ **منشور — اتحقق 200 بالشكل الجديد** |
| 4b | `GET /company/me/branch/suppliers` | ✅ | `branchMgr.ts` · `platform/branch.ts` | ✅ منشور (200 لايف) |
| 4c | `GET /company/me/branch/settings` (readOnly) | ✅ | `branchMgr.ts` · `platform/branch.ts` | ✅ منشور (200 — لكن لسه بالشكل القديم من غير `readOnlyFields`) |
| 5 | عزل المحاسب (404 طبيعي) | ✅ سلوك | `client.ts` + `errors.ts` (معالجة 404/الأخطاء) | ✅ منشور |
| 6 | `POST/PATCH/DELETE /company/me/procurement/items` + `suppliers` + `toggle-active` | ✅ | `procurement.ts` | ✅ منشور (موجود من قبل) |

> **الوحيد اللي رجّع 404 = `/admin/packages`** (كل الأربع ميثودز). لما يتنشر، صفحة الباقات والـ dropdown يشتغلوا فورًا.

---

## اللي **اتعمل** (بالتفصيل)

### إصلاح اللوجين (كان بيروح على الفرونت نفسه)
- **السبب:** مفيش ملف `.env` → `VITE_API_BASE_URL` فاضي → الطلبات كانت بتروح `localhost:3000/api/v1/...`.
- **الحل:** `artifacts/mockup-sandbox/.env` (جديد) + **proxy في `vite.config.ts`** يمرّر `/api` و`/broadcasting` للباك من جهة السيرفر → مفيش CORS.
- **مطلوب منك:** بعد أي تعديل في `.env` أعد تشغيل `pnpm dev`.

### معالجة الأخطاء (شكل الخطأ الجديد)
- `src/api/errors.ts` + `src/api/client.ts`: بقوا يتحمّلوا الشكلين: القديم `{error:{...}}` والجديد `{success:false, message, errors:{code}}`. دلوقتي أكواد `INVALID_ROLE_SCOPE` / `EMAIL_CONFLICT` بتتقري وبتتعرض صح.

### 1) الباقات
- `src/api/queries/packages.ts` (جديد): `useAdminPackages / useCreateAdminPackage / useUpdateAdminPackage / useDeleteAdminPackage`.
- مفتاح `platformAdminPackages` في `keys.ts` + تصدير في `queries/index.ts`.
- **صفحة إدارة الباقات** في نافبار الأدمن (بند "الباقات") — جدول + إنشاء/تعديل/حذف/تفعيل. (`ASABPrototype.tsx` → `AdminPackages`).
- **dropdown إضافة البراند** بيتملّى من `useAdminPackages` (النشطة بس)، وبيرجع للأوبشنز القديمة تلقائيًا وقت الـ 404.

### 2) قواعد تعيين المستخدمين
- `useCreateCompanyUser` بيقبل `brandId`/`branchId` (المحاسب=براند، الفرع=فرع واحد).
- `useUpdateAccountantAssignments` بيقبل `brands[]` (تعيين على براند).
- `useCreateAdminUser` بيقبل `branches`/`brands` + توثيق قاعدة الفاليديشن.

### 3) الكاشير → حساب موبايل
- `useAddBranchEmployeePlatform` بيبعت `email/phone/salaryHalalas/shift`، وبيعرض توست حسب نتيجة `cashier` في الرد.
- أنواع `CashierProvisioning` + توسيع `PlatformBranchEmployee` في `types/platform.ts`.
- **فورم إضافة موظف/كاشير** في شاشة موظفي الفرع (`ASABPrototype.tsx` → `BranchEmployees`) — الإيميل **مطلوب** لما الدور كاشير.

### 4) شاشات مدير الفرع (قراءة)
- `useBranchItems` بيفكّ الشكل الجديد `{items,configuredBy}` (بدل ما يرجّع فاضي).
- **إصلاح باج:** `useBranchInventoryItemsPlatform` كان بينادي مسار غلط `/company/me/branch/inventory-items` (404) → اتظبط لـ `/company/me/branch/items`.
- توسيع أنواع الموردين والإعدادات (`readOnlyFields`, `shiftConfig`, حقول المورد الجديدة).
- **حقول للعرض فقط:** `branchName/phone/address` بقوا **مقفولين (disabled)** في إعدادات الفرع في الداشبوردين (`ASABPrototype` + `CompanyDashboard`) حسب `readOnlyFields`.

### 6) مزامنة المشتريات
- مفيش تغيير مطلوب — الـ hooks موجودة من قبل (`useCreateProcurementItem/Update/Delete`, `useCreateSupplier`, `useToggleSupplierActive`).

---

## اللي **لسه محتاج انتباه** (مش blockers)

1. **نشر الباك:** `/admin/packages` مش منشور → الباقات مش هتظهر لحد ما فرع `asab-admin-backend` يتعمله deploy على Hostinger.
2. **شكل `/company/me/branch/settings` القديم:** الباك لسه بيرجّع من غير `readOnlyFields`/`branchName`/`address`. الفرونت بيقفل الحقول افتراضيًا لحد ما الباك يرجّع الشكل الجديد — سلوك آمن، بس التسميات "من إدارة النظام" هتظهر حتى قبل ما الباك يوفّر القيم.
3. **فورم تعيين المستخدمين (قسم 2) في الواجهة:** الـ hooks بتقبل الحقول الصح، لكن لو أي فورم قديم بيبعت `scope` غلط أو عدد فروع غلط، الباك هيرجّع 422 (والرسالة دلوقتي بتتعرض بوضوح). لو حصل، محتاجين نظبّط الفورم يبعت فرع واحد للـ branch وبراند للمحاسب.
4. **بورتال المورد:** متبنيش شاشاته (feature flag مخفي حسب قرار الاجتماع).

---

## الـ endpoints اللي رجّعت 404 (مش منشورة)

```
GET    /api/v1/admin/packages
POST   /api/v1/admin/packages
PATCH  /api/v1/admin/packages/{id}
DELETE /api/v1/admin/packages/{id}
```

بالإضافة لمسار **قديم غلط** كان في الفرونت واتشال:
```
GET /api/v1/company/me/branch/inventory-items   ← كان بيرجّع 404 (مسار مش موجود) — اتغيّر لـ /company/me/branch/items
```

> أي endpoint تاني في الدفعة رجّع `401` (يعني موجود ومنشور، بس التوكن كان منتهي وقت الاختبار) أو `200` (اتحقق لايف). مفيش حاجة تانية 404.
