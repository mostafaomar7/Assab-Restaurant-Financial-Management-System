# طلب تأكيد من الباك اند — تفاصيل عمليات المشتريات/الجرد (2026-07-31)

> **من:** الفرونت · **إلى:** الباك اند
> ربطت أغلب برومبت الربط (التاريخ الحقيقي، التوجيه بالدور، السجل، التعديل المرتبط، الأصول إنشاء+تأكيد، وشاشة «تحديد الأصناف للجرد» كاملة بالحفظ الحقيقي). باقي **لوحتين تفصيل** لسه — عايز أأكّد أسماء الحقول والوحدات والمسارات قبل ما أنفّذهم عشان ما أبنيش على شكل غلط. جاوب نقطة نقطة (أكّد / صحّح).

---

## أ) تفصيل عملية الشراء `PUR-` — `GET /operations/{id}`

1. **`purchaseItems[]`**: أكّد إن الرد فيه `payload.purchaseItems[]` بالحقول دي بالظبط:
   `{ rowId, itemId, item, unit, ordQty, rcvQty, unitPriceHalalas, orderedUnitPriceHalalas }`
   و`rcvQty = null` لحد ما يتم الاستلام (أعرضها «—»)؟ فيه اسم حقل مختلف عن اللي فوق؟
2. **الفلوس**: `unitPriceHalalas` و`orderedUnitPriceHalalas` **بالهللة** (عدد صحيح)؟ فيه `lineTotalHalalas` جاهز لكل سطر ولا أحسبه `rcvQty × unitPriceHalalas`؟
3. **`supersedesOperationId`**: مكانه فين في الرد — `payload.supersedesOperationId` على مستوى العملية؟ وبيرجّع **الـ`publicId`** بتاع العملية المرفوضة القديمة (مش الـuuid) عشان أعمل بانر بلينك عليها؟
4. **تعديل السطر `PATCH purchase-lines`**:
   - المسار الصح: `/company/me/operations/{id}/purchase-lines/{rowId}` ولا `/operations/{id}/purchase-lines/{rowId}`؟ (الهوك عندي حالياً `/company/me/...`)
   - الـbody المقبول: `{ ordQty?, rcvQty?, unitPriceHalalas? }`؟ فيه حقول تانية؟
   - بيرجّع العملية المحدّثة كاملة (عشان أعمل refetch)؟
5. **هيدر اللوحة**: `payload.orderNumber` + `payload.supplierName` + `payload.submittedBy` موجودين في تفصيل الشراء؟
6. **قائمة المشتريات للمحاسب**: هبنيها من `GET /accountant/operations?moduleKey=purchases` (صفوف العمليات القياسية). أكّد إن كل صف شراء فيه: `supplierName`, `amount` (هللة), `date` (يوم العملية), `match`, `publicId` (`PUR-…`).

---

## ب) تفصيل عملية الجرد `INV-` — المعادلة اليومية

1. **المصدر الرسمي** للمعادلة اليومية per-item: `GET /operations/{id}` (`payload.items[]`) **ولا** endpoint منفصل زي `GET /accountant/inventory/branches/{branchId}/daily-reconciliation`؟ أنهي أستخدم؟
2. لو المصدر `payload.items[]`: أكّد الحقول
   `{ itemId, name, unit, actualQty, purchases, waste, expectedQty }`
   وإنها `null` قبل اعتماد الجرد في الموبايل (أعرضها «—»). **فيه** كمان `openingQty` / `consumed` / `transfers` / `expectedClosing` / `actualClosing`؟
3. **المعادلة الإجمالية** المعروضة حالياً (رصيد فتح + مشتريات − مبيعات/استهلاك + تحويلات − هدر = متوقع مقابل فعلي):
   - الأرقام دي بترجع **مجمّعة على مستوى العملية** (aggregate) في الرد، ولا أجمّعها بنفسي من `items[]`؟
   - الوحدة: **كمية** أصناف ولا **قيمة بالهللة**؟

---

## ج) تأكيدات سريعة على اللي ربطته بالفعل (لو حقل مختلف قولّي دلوقتي)

**§4 «تحديد الأصناف للجرد»** — أكّد إنها live بالأشكال دي:
- `GET /accountant/inventory/brands` → `[{ id, name, abbr, branchCount, itemCount }]` (نطاق فاضي = `200` + `[]`)
- `GET /accountant/inventory/brands/{brandId}/branches` → `[{ id, name, restaurantId, listItemCount }]`
- `GET /accountant/inventory/catalog?brandId=` → `{ categories, items:[{ id, name, cat, unit }] }`
- `GET /accountant/inventory/branches/{branchId}/daily-list` → `{ data:[{ id, catalogItemId, name, isFlagged }] }`
- `PUT /accountant/inventory/branches/{branchId}/daily-list` بالـbody `{ items:[catalogItemId] }` → `{ savedCount, pushedAt }`
- فرع غير مربوط: `422` بكود `BRANCH_UNLINKED` + `messageAr`؟

**§5 إنشاء أصل** — `POST /accountant/assets`:
- `cost` **بالهللة** (بعتها `Math.round(SAR*100)`) ولا اسم الحقل `costHalalas`/`priceHalalas`؟
- `category` بيقبل **الليبل العربي** («معدات / تقنية / أثاث / مركبات / أخرى») ولا لازم enum إنجليزي محدد؟ (لو enum، ابعتلي القيم)
- `branchId` إلزامي (أنا بحلّه من الصفوف المحمّلة)؟

---

## بعد ردّك
- على أ) و ب): أنفّذ اللوحتين فوراً (جدول المطابقة المطلوب/المستلم بالـ«—»، بانر supersedes، تعديل السطر PATCH، ومعادلة الجرد من الأصناف الحقيقية).
- على ج): لو أي حقل مختلف، أعدّله في دقايق — الربط جاهز ومبني على السبيك اللي بعتّه، بس عايز أثبّت الأسماء.
