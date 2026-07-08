# Procurement Manager — Backend follow-ups (found while wiring)

الفرونت اتربط بالكامل على دليل *Procurement Manager Dashboard — API Integration Guide*. أثناء الربط
لقينا الحاجات دي محتاجة منكم. كل اختبار بحساب أدمن على السيرفر اللايف (`ivory-snail-183262.hostingersite.com`).

---

## B-P1 — 🚫 عائلة `purchase-orders` (البريدج) بترجّع 404 على اللايف (مش متعملها deploy)

الشاشات الرئيسية (الجديدة/المجمعة/المرسلة/اللوحة) مربوطة على البريدج، لكن كل مساراته بترجّع **404**:

| Endpoint | HTTP | الاستنتاج |
|---|---|---|
| `GET /company/me/procurement/purchase-orders` | **404** | غير مُسجّل على اللايف ❌ |
| `GET /company/me/procurement/purchase-orders/grouped` | **404** | غير مُسجّل ❌ |
| `GET /company/me/procurement/purchase-orders/sent` | **404** | غير مُسجّل ❌ |
| `GET /company/me/procurement/purchase-orders/approved-by-me` | **404** | غير مُسجّل ❌ |
| `GET /company/me/procurement/overview` (Operations القديمة) | 403 WRONG_ROLE | **مُسجّل** ✅ |
| `GET /company/me/procurement/orders` (Operations القديمة) | 403 WRONG_ROLE | **مُسجّل** ✅ |

الفرق بين **404** و**403** قاطع: مسارات Operations القديمة متعمِلها deploy (بترجّع 403 لأن التوكن أدمن مش procurement)، أما مسارات `purchase-orders` بترجّع **404 = الكود الجديد ماوصلش للسيرفر اللايف**.

**المطلوب:** اعملوا merge لـ branch `asab-admin-backend` + **deploy** على ivory-snail + `php artisan route:clear`. أكّدوا بـ:
```
curl -i .../api/v1/company/me/procurement/purchase-orders   # لازم 401/403 مش 404
```
**حالة الفرونت:** كل الشاشات جاهزة وبتعرض حالات فاضية بأمان؛ هتشتغل أوتوماتيك أول ما الروتات تبقى live.

---

## B-P2 — قائمة الأصناف (`GET .../procurement/items`) رفيعة (legacy)

القائمة بترجّع `{id, name}` بس من جدول قديم، فـ:
- **الأصناف اللي بتتعمل بـ POST مبتظهرش فيها** (بتقرأ من جدول تاني).
- الأعمدة **الاستهلاك الشهري / المخزون الحالي / آخر طلب** ملهاش مصدر.

**المطلوب:** خلّوا `GET .../items` يرجّع الأصناف المُنشأة نفسها + الحقول:
`{ id, name, unit, category, lastPriceHalalas, monthlyConsumption?, currentStock?, lastOrderAt? }`.
**حالة الفرونت:** شلنا الأعمدة اللي ملهاش مصدر مؤقتاً وبنعرض السعر/التصنيف/الوحدة + تاريخ الأسعار وإجراءات (تعديل/حذف).

---

## B-P3 — قائمة الموردين (`GET /company/me/suppliers`) رفيعة (legacy)

بترجّع `{id, name, category}` بس، فـ:
- **الموردون اللي بيتعملوا بـ POST مبيظهروش**.
- حقول الكارت **نسبة الالتزام % / الإنفاق الشهري / سجل التسليمات** ملهاش مصدر.

**المطلوب:** خلّوا `GET /company/me/suppliers` يرجّع الموردين المُنشأين + الحقول:
`{ id, name, category, contactName, contactPhone, contactEmail, isActive, ratingAvg (0–50), compliancePct?, monthlySpend?, deliveryHistory?[] }`.
**حالة الفرونت:** الكارت بيعرض الاسم/التصنيف/جهة الاتصال/الحالة/التقييم، وأزرار **تقييم + تعديل + تفعيل/إخفاء** مربوطة. شلنا إحصائيات الالتزام/الشهري وسجل التسليمات لحد ما تتوفّر.

---

## B-P4 — زر «طلب جديد» في كارت المورد + drill-down المدينة (مفيش endpoint)

- **«طلب جديد» على كارت المورد:** دوره المفترض إن مدير المشتريات يعمل طلب يدوي لمورد معيّن. لكن في الموديل الجديد الطلبات بتيجي من الفروع (البريدج)، ومفيش endpoint في البريدج لإنشاء طلب من الداشبورد. **شلنا الزر مؤقتاً.** **سؤال:** عايزينه يتربط بـ Operations (`POST .../procurement/orders`) ولا نضيف endpoint بريدج جديد؟ ولا نلغيه نهائياً؟
- **«عرض طلبات {المدينة}»** في التجميع بالمدينة: مفيش endpoint يرجّع طلبات مدينة بعينها. مؤقتاً الزر بيرجّع لعرض «بالموردين». **سؤال:** نضيف `GET .../purchase-orders/grouped?by=city&city=<name>` أو مسار طلبات لكل مدينة؟

---

## B-P5 — تأكيدات صغيرة على العقود

1. **`ordersValueThisWeek`** في `overview` — بالهللات صح؟ (بنقسم ÷100.)
2. **تقييم المورد `ratingAvg`** — سلّم 0–50 (نجوم×10)؟ الفرونت بيقسم ÷10.
3. **الأصناف** — الحقل الراجع للسعر اسمه `lastPriceHalalas`؟ (بنقرأ `lastPriceHalalas` ثم `priceHalalas` ثم `defaultPrice` كـ fallback.)
4. **التقارير** — أجّلتوها بقرار منتج؛ ربطنا الكتالوج + التحميل (`GET .../reports` و`.../reports/{key}/download`). لو رجّعتوا كتالوج فاضي هنعرض حالة «لا توجد تقارير».

**ملاحظة تشغيلية:** في البرودكشن لازم `MAIL_MAILER` يبقى SMTP حقيقي؛ وإلا أي إشعار «اتبعت» مايوصلش فعلاً.
