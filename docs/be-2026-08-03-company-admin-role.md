# للباك إند — 2026-08-03: إنشاء أدمن شركة يُنشئ سوبر-أدمن جديد لعصب (بلوكر أمني)

نفّذنا الفرونت لكل ملاحظات ردّك (1→5). بقيت **ملاحظة واحدة لم يغطِّها ردّك**
وهي الأخطر لأنها تسريب صلاحيات عبر المستأجرين (cross-tenant). محتاجين تأكيد
منك قبل نعتبرها منتهية.

---

## المشكلة (الملاحظة الثانية عند العميل)

في **بوابة الشركات** (سوبر-أدمن عصب) → «إضافة شركة جديدة» → إدخال بريد
الأدمن (`adminEmail`) → إنشاء.

**المتوقّع:** يُنشأ حساب **أدمن الشركة** (company-admin) مقصور على بيانات تلك
الشركة فقط، ويدخل على داشبورد الشركة.

**الواقع:** ظهر **سوبر-أدمن جديد على مستوى منصّة عصب** (نفس صلاحيات «أمن
النظام»). أي أن الحساب المُنشأ يقدر يشوف/يدير كل الشركات والعلامات
والمستخدمين على المنصّة كلها — مش شركته بس.

هذا يعني أن أي إضافة شركة تُنتج حساباً بامتياز platform-admin. **تسريب
صلاحيات خطير** لازم يتقفل قبل أي عرض حيّ.

---

## اللي بيبعته الفرونت الآن

```
POST /api/v1/admin/companies
{
  "name": "...",
  "contactName": "...",
  "contactEmail": "<adminEmail>",
  "contactPhone": "...",
  "city": "...",
  "plan": "Basic|Professional|Enterprise",
  "modules": [],
  "adminEmail": "<adminEmail>"
}
```

الفرونت لا يرسل أي `role`/`roleKey`/`scope` للحساب المُنشأ — تحديد الدور
مسؤولية الباك إند بالكامل. مفيش تغيير فرونت يقدر يصلح هذا؛ الإصلاح كله في
تزويد المستخدم (user provisioning) عندك.

---

## المطلوب تأكيده / إصلاحه

1. **الدور:** الحساب المُنشأ من `POST /admin/companies` لازم يكون
   `roleKey = "company-admin"` (مش `admin`/سوبر-أدمن منصّة). أكّد القيمة
   الفعلية اللي بتُكتب في قاعدة البيانات حالياً.

2. **النطاق (scope):** لازم يكون مقصوراً على `companyId` الشركة الجديدة
   فقط — يقرأ/يكتب داتا شركته لا غير. أكّد وجود ربط
   `user.company_id = <newCompanyId>` وأن الميدلوير يفرضه على كل
   `/company/me/*`.

3. **عدم التسريب:** الحساب **يجب ألا** يظهر في:
   - قائمة مستخدمي منصّة عصب / «أمن النظام» (`GET /admin/users`),
   - ولا يقدر يوصل أي مسار `/admin/*` (لازم 403).
   أكّد إن `GET /admin/users?role=admin` ما بيرجّعش company-admins، وإن
   حرّاس المسارات (guards) بترفض توكن company-admin على `/admin/*`.

4. **لو محتاج حقل صريح:** لو التمييز محتاج الفرونت يبعت حقل (مثلاً
   `adminRole: "company-admin"` أو `provisionScope: "company"`)، قوللي
   الاسم الدقيق وأضيفه فوراً على `POST /admin/companies`. الأفضل عندنا إنه
   يُشتق سيرفر-سايد من كون النداء على `/admin/companies` بحد ذاته.

5. **تنظيف الحسابات المتسرّبة:** الحسابات اللي اتعملت غلط كسوبر-أدمن خلال
   الاختبار محتاجة تتحوّل لـ company-admin أو تتحذف — مش تفضل platform-admin.

---

## تأكيدات إضافية (عشان الفرونت اللي شحنّاه دلوقتي يشتغل فعلاً)

نفّذنا ربط ردّك؛ محتاج تأكيد إن التالي **منشور على الباك الحيّ** (نفس
`ivory-snail`) مش على فرعك المحلي بس:

- `GET /admin/brands/{id}/branches/upload-status` يرجّع الفروع المرتبطة عبر
  `asab_restaurant_id` كمان (مش `asab_brand_id` بس) مع `fixedAssetsStatus`.
- `GET /admin/upload/templates/{type}?brandId=/&branchId=/&restaurantId=`
  ينزّل البيانات المحفوظة (اسم الملف `{type}-data.xlsx`).
- `GET /admin/brands/{id}/upload-status` يرجّع بلوك `summary{shared,
  branchAssets, restaurantEmployees, completionPct}` و`brandFixedAssets`.
- `GET /lookups/users?role=head&status=active` يرجّع `label`/`roleLabel`/
  `status` (الفرونت بيعرض `label` في قائمة «يرفع تقريره إلى»).
- `GET /admin/subscriptions` (و`/admin/restaurants/subscriptions`) يرجّع
  `expiresAtDate` + `isExpired` + `daysLeft` محسوب.

سؤال صغير (ملاحظة 1 — «التجديد القادم» في تفاصيل الشركة داخل بوابة
الشركات): `GET /admin/companies` بيرجّع `nextBilling` **ISO خام**. الفرونت
بيهيّئه للعرض client-side حالياً فمفيش بلوكر، بس لو ضفت `expiresAtDate`
هناك زي بقية البطاقات هنستخدمه مباشرة.
