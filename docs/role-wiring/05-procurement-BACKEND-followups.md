# Procurement Manager — Backend follow-ups + Response contracts

الفرونت اتربط بالكامل على دليل *Procurement Manager Dashboard — API Integration Guide*.
الملف ده فيه: (أ) حالة المسارات بعد إعادة الاختبار، (ب) المتبقّي المطلوب منكم، (ج) **العقود المتوقّعة**
= اللي الفرونت بيقراه بالظبط من كل endpoint (أسماء الحقول + وحدة الفلوس).

> إعادة اختبار (اليوم) على `ivory-snail-183262.hostingersite.com`. **ملاحظة:** توكن الأدمن اللي كنا بنختبر بيه
> **انتهت صلاحيته** (كل الطلبات رجّعت 401)، فتأكيد **شكل الداتا** لسه محتاج **توكن دور procurement صالح**.
> **محتاجين منكم توكن procurement (أو حساب) عشان نتحقق من الشكل end-to-end.**

---

## ✅ B-P1 — البريدج (`purchase-orders*`) بقى مُسجّل على اللايف (اتحل)

إعادة الاختبار أثبتت إن مسارات البريدج **اتعمِلها deploy**:

| الاختبار | HTTP | الاستنتاج |
|---|---|---|
| روت وهمي `.../procurement/this-route-does-not-exist-xyz` | **404** «could not be found» | الروتات غير الموجودة بترجّع 404 ✅ (معايرة) |
| `.../procurement/purchase-orders` | **401** «Unauthenticated» | الروت **موجود** (auth اشتغل) ✅ |
| `.../purchase-orders/{غير موجود}` | **401** | فيه `purchase-orders/{id}` مُسجّل ✅ |

الفرق قاطع: الوهمي **404**، والبريدج **401** ⇒ **الروتات اتسجّلت** (المرة اللي فاتت كانت 404). التحوّل 404→401 = تم الـ deploy.

**المتبقّي:** تأكيد إن الردود بتطابق العقود تحت (محتاج توكن procurement). لو فيه أي اختلاف في اسم حقل، بلّغونا.

---

## B-P2 — قائمة الأصناف (`GET .../procurement/items`) لازم ترجّع الأصناف المُنشأة + حقول كاملة

الدليل بنفسه قال إنها legacy-thin (`{id,name}`) والأصناف المعمولة بـ POST مبتظهرش، والأعمدة
الاستهلاك الشهري/المخزون/آخر طلب ملهاش مصدر.

**المطلوب:** `GET .../items` يرجّع الأصناف المُنشأة نفسها بالحقول:
`{ id, name, unit, category, lastPriceHalalas, monthlyConsumption?, currentStock?, lastOrderAt? }`.
**الفرونت حالياً:** شال الأعمدة اللي ملهاش مصدر، وبيعرض السعر/التصنيف/الوحدة + تاريخ الأسعار + تعديل/حذف.

---

## B-P3 — قائمة الموردين (`GET /company/me/suppliers`) لازم ترجّع الموردين المُنشأين + حقول كاملة

legacy-thin (`{id,name,category}`)؛ الموردون المعمولين بـ POST مبيظهروش؛ الالتزام%/الشهري/سجل التسليمات مفيش مصدر.

**المطلوب:** `GET /company/me/suppliers` يرجّع:
`{ id, name, category, contactName, contactPhone, contactEmail, isActive, ratingAvg (0–50), compliancePct?, monthlySpend?, deliveryHistory?[] }`.
**الفرونت حالياً:** الكارت بيعرض الاسم/التصنيف/جهة الاتصال/الحالة/التقييم + أزرار تقييم/تعديل/تفعيل-إخفاء.

---

## B-P4 — نقط بلا endpoint (محتاجة قراركم)

1. **«طلب جديد» على كارت المورد** — إنشاء طلب يدوي من الداشبورد لمورد. مفيش endpoint بريدج له. **شلناه مؤقتاً.**
   نربطه بـ Operations (`POST .../procurement/orders`)؟ ولا endpoint بريدج جديد؟ ولا نلغيه؟
2. **«عرض طلبات {المدينة}»** — مفيش مسار يرجّع طلبات مدينة بعينها. مؤقتاً الزر بيرجّع لعرض «بالموردين».
   نضيف `GET .../purchase-orders/grouped?by=city&city=<name>`؟

---

## B-P5 — تأكيدات صغيرة

1. `overview.kpis.ordersValueThisWeek` — بالهللات؟ (بنقسم ÷100).
2. تقييم المورد `ratingAvg` سلّم 0–50 (نجوم×10)؟ (بنقسم ÷10).
3. سعر الصنف اسمه `lastPriceHalalas`؟ (fallback: `priceHalalas` ثم `defaultPrice`).
4. `MAIL_MAILER` في البرودكشن لازم SMTP حقيقي، وإلا «اتبعت» مايوصلش.

---

# العقود المتوقّعة — اللي الباك لازم يرجّعه (اللي الفرونت بيقراه)

> قاعدة الفلوس: **البريدج (`purchase-orders*`) = SAR floats** (بدون ÷100). **الباقي (overview/items/price-history) = هللات integer** (÷100). أظرف: object خام للـ single، `{data,meta}` للـ list.

### 1) قائمة الطلبات — `GET .../procurement/purchase-orders?status=&branchId=&priority=&page=&pageSize=`
`status`: `incoming` (=pending+emergency+variance) أو قيمة واحدة من: pending, emergency, variance, confirmed, rejected, cancelled_by_branch, cancelled_by_supplier, preparing, on_the_way, delivered, closed. `priority`: high|normal.
```jsonc
{ "data": [
  { "id":"uuid", "orderNumber":"PO-20261014-AB12", "branchId":"uuid", "branchName":"فرع الرياض",
    "orderType":"direct_supplier|via_purchasing_officer|multiple_sources",
    "status":"pending", "statusLabel":"Pending", "priority":"high|normal|null",
    "supplierId":"uuid|null", "totalAmount": 4800.0, "totalItems": 4,
    "rejectionReason": null, "submittedAt":"ISO-8601", "decidedAt": null }
], "meta": { "page":1, "pageSize":20, "total":45, "totalPages":3 } }
```
الفرونت بيقرا: `data[].{id,orderNumber,branchName,totalItems,totalAmount,priority}` + **`meta.total`** (كـ عدّاد «طلبات جديدة من الفروع»).

### 2) تفاصيل طلب — `GET .../purchase-orders/{id}`  ({id} = uuid أو orderNumber)
نفس كائن الطلب **+**:
```jsonc
"items": [
  { "orderItemId":"uuid", "itemId":"uuid|null", "name":"دجاج طازج", "unit":"kg",
    "quantityOrdered": 50, "quantityConfirmed": null, "unitPrice": 32.0, "totalPrice": 1600.0,
    "status":"pending", "dailyConsumption": 7, "remainingBalance": 12,
    "weekendForecast": 14, "nextSupplyDate":"2026-10-16" }
]
```
الفرونت بيقرا لكل صنف: `orderItemId, name, unit, quantityOrdered, dailyConsumption` (الموصى به = ×7)، `remainingBalance, unitPrice`. والـ **partial-approve** بيبعت `orderItemId` + `quantity`.

### 3) قرارات الطلب
```
POST .../purchase-orders/{id}/approve            (بدون body)      → كائن الطلب (status:"confirmed")
POST .../purchase-orders/{id}/partial-approve    { items:[{orderItemId, quantity}], note? }  → كائن الطلب   // quantity=0 يرفض السطر
POST .../purchase-orders/{id}/reject             { reason }        → كائن الطلب (status:"rejected")
POST .../purchase-orders/bulk-approve            { orderIds:[...] } → { approved:[ids], failed:[{id,reason}], count }
GET  .../purchase-orders/approved-by-me          → { data:[كائن الطلب], meta }
```

### 4) التجميع — `GET .../purchase-orders/grouped?by=supplier`
```jsonc
{ "suppliers": [
  { "supplierId":"uuid", "supplierName":"شركة الدواجن", "ordersCount":12, "branchesCount":3,
    "cities":["الرياض","جدة"], "urgentCount":2, "totalAmount":28400.0, "itemsCount":3,
    "capacityExceeded":true, "orderIds":["uuid"],
    "items":[ { "itemId":"uuid|null", "name":"صدر دجاج", "unit":"kg", "totalQuantity":320,
                "unitPrice":45.0, "capacity":300, "capacityPct":107, "exceeded":true, "excessQuantity":20 } ] }
],
  "unassignedOrders": [ { "id":"uuid", "orderNumber":"PO-...", "branchName":"...", "totalAmount":0.0 } ] }
```
`capacity:null` = لم يُعلن (الفرونت بيعرض «—» مش تحذير). `?by=city`:
```jsonc
{ "cities": [ { "city":"الرياض", "ordersCount":3, "urgentCount":0, "totalAmount":8900.0,
                "suppliers":["شركة الدواجن"], "orderIds":["uuid"] } ] }
```

### 5) الإرسال والمرسَل
```
POST .../purchase-orders/grouped/send   { supplierId, orderIds? }  → { groupId, groupNumber, supplierId, ordersCount, sentAt }   // بدون orderIds = كل طلبات المورد
GET  .../purchase-orders/sent           → { data:[ { groupId, groupNumber, supplierId, supplierName,
                                                      ordersCount, totalAmount, status, sentAt } ] }
GET  .../purchase-orders/groups/{groupId} → كائن المجموعة أعلاه + 
     "items":[ (نفس شكل عناصر التجميع) ] +
     "orders":[ { id, orderNumber, branchId, branchName, city, status, statusLabel, totalAmount } ]
```
`status` (المجموعة والطلب): confirmed|preparing|on_the_way|delivered — مشتق live.

### 6) اللوحة — `GET .../procurement/overview`
```jsonc
{ "kpis": { "newOrders": 0, "consolidated": 0, "sentToSuppliers": 0, "ordersValueThisWeek": 0 /* هللات */ },
  "newOrders": [ ... ]? }
```
الفرونت بيقرا `kpis.{consolidated, sentToSuppliers, ordersValueThisWeek÷100}`؛ وعدّاد «من الفروع» من `purchase-orders?status=incoming&pageSize=1 → meta.total`.

### 7) الأصناف
```
GET    .../procurement/items                      → { data:[ { id, name, unit, category, lastPriceHalalas } ] }  // ⚠️ B-P2
POST   .../procurement/items   { name, unit, category, lastPriceHalalas }  → الكائن أعلاه
PATCH  .../procurement/items/{id}  { name?, unit?, category?, lastPriceHalalas? }
DELETE .../procurement/items/{id}  → 204
GET    .../procurement/items/{id}/price-history   → { data:[ { supplierId, supplierName, priceHalalas, recordedAt } ] }
GET    .../procurement/items/export?format=xlsx|csv → ملف
```

### 8) الموردون  (تحت `/company/me/suppliers`)
```
GET    /company/me/suppliers                        → { data:[ { id, name, category, contactName, contactPhone,
                                                                  contactEmail, isActive, ratingAvg /* 0–50 */ } ] }  // ⚠️ B-P3
POST   /company/me/suppliers   { name, category?, contactName?, contactPhone?, contactEmail? }  → الكائن
PATCH  /company/me/suppliers/{id}
POST   /company/me/suppliers/{id}/toggle-active     → { id, isActive, status }
POST   /company/me/suppliers/{id}/ratings   { rating:1..5, comment? }  → { supplierId, ratingAvg /* 0–50 */ }
GET    /company/me/suppliers/export?format=xlsx|csv → ملف
```

### 9) التصنيفات (مؤكّد شكلها ✅)
`GET /company/me/lookups/supplier-categories` → `{ data:[ { id, name, isActive } ] }` (الفرونت بيستخدم `id` كـ value و`name` كـ label).

### 10) التقارير (مؤجّلة بقراركم — مربوطة كتالوج+تحميل)
```
GET .../procurement/reports                         → { data:[ { key, labelAr, description? } ] }
GET .../procurement/reports/{key}/download?format=pdf|xlsx|csv → ملف
```

---

**الخلاصة لكم:** B-P1 اتحل (البريدج live). محتاجين: (1) توكن procurement نتحقق بيه من الأشكال، (2) تنفيذ B-P2/B-P3 (قوائم كاملة)، (3) قرار B-P4 (طلب يدوي + drill-down مدينة)، (4) تأكيدات B-P5.
