import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { KPICard } from "./_shared/KPICard";
import { Package, AlertTriangle, TrendingDown, CheckCircle2, Search, Download, Plus } from "lucide-react";

const inventoryItems = [
  { item: "دجاج طازج", unit: "كجم", opening: "150.0", received: "200.0", consumed: "310.0", closing: "40.0", minStock: "50.0", status: "low", waste: "8.5", wasteReason: "انتهاء صلاحية" },
  { item: "حليب طازج", unit: "لتر", opening: "80.0", received: "120.0", consumed: "185.0", closing: "15.0", minStock: "20.0", status: "critical", waste: "2.0", wasteReason: "تلف" },
  { item: "خبز تمييز", unit: "رغيف", opening: "500.0", received: "1000.0", consumed: "1200.0", closing: "300.0", minStock: "100.0", status: "normal", waste: "45.0", wasteReason: "انتهاء صلاحية" },
  { item: "زيت نباتي", unit: "لتر", opening: "60.0", received: "100.0", consumed: "120.0", closing: "40.0", minStock: "30.0", status: "normal", waste: "0.0", wasteReason: "—" },
  { item: "بطاطس مجمدة", unit: "كجم", opening: "200.0", received: "300.0", consumed: "480.0", closing: "20.0", minStock: "50.0", status: "critical", waste: "12.0", wasteReason: "تلف" },
];

const wasteItems = [
  { item: "خبز تمييز", qty: "45 رغيف", reason: "انتهاء صلاحية", cost: "67.5 ر.س", by: "علي محمد", time: "08:30", status: "pending" },
  { item: "دجاج طازج", qty: "8.5 كجم", reason: "انتهاء صلاحية", cost: "204 ر.س", by: "سعد الشمري", time: "09:00", status: "approved" },
  { item: "حليب طازج", qty: "2 لتر", reason: "تلف", cost: "16 ر.س", by: "فهد العتيبي", time: "10:15", status: "pending" },
  { item: "بطاطس مجمدة", qty: "12 كجم", reason: "تلف", cost: "96 ر.س", by: "نايف السلمي", time: "11:00", status: "rejected" },
];

export function InventoryModule() {
  return (
    <AppLayout role="accountant" userName="أحمد محمد" activeSection="inventory" notificationsCount={12}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">موديول المخزون</h2>
            <p className="text-gray-400 text-sm mt-0.5">الجرد اليومي + إدارة الهدر والتالف — 14 أكتوبر 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-gray-50">
              <option>جميع الفروع</option>
              <option>فرع الرياض - العليا</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={15} /> تصدير
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200">
          {["الجرد اليومي", "الهدر والتالف", "جرد الأصناف", "التقارير"].map((tab, i) => (
            <button
              key={i}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                i === 0 ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="أصناف منخفضة" value="3 أصناف" subtitle="تحتاج إعادة تخزين" icon={<AlertTriangle size={22} className="text-amber-600" />} iconBg="bg-amber-50" status="warning" />
          <KPICard title="إجمالي الهدر اليوم" value="383.5 ر.س" subtitle="من 4 حالات" icon={<TrendingDown size={22} className="text-red-600" />} iconBg="bg-red-50" status="danger" />
          <KPICard title="معدل الهدر" value="2.3%" subtitle="من إجمالي المستلم" icon={<Package size={22} className="text-blue-600" />} iconBg="bg-blue-50" />
          <KPICard title="أصناف طبيعية" value="28 صنف" subtitle="ضمن النطاق المقبول" icon={<CheckCircle2 size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" status="success" />
        </div>

        {/* Daily Inventory Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">الجرد اليومي — فرع الرياض العليا</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400" />
                <input type="text" placeholder="بحث..." className="text-sm text-gray-600 bg-transparent border-none outline-none w-28" />
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-600 text-xs font-medium hover:bg-purple-100">
                ✓ اعتماد الجرد
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الصنف</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الوحدة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">افتتاحي</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">مستلم</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">مستهلك</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">هدر</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">ختامي فعلي</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحد الأدنى</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${item.status === "critical" ? "bg-red-50/30" : item.status === "low" ? "bg-amber-50/30" : ""}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.item}</td>
                    <td className="px-4 py-3 text-gray-500">{item.unit}</td>
                    <td className="px-4 py-3 text-gray-600 font-mono" dir="ltr">{item.opening}</td>
                    <td className="px-4 py-3 text-emerald-600 font-mono" dir="ltr">+{item.received}</td>
                    <td className="px-4 py-3 text-blue-600 font-mono" dir="ltr">-{item.consumed}</td>
                    <td className="px-4 py-3">
                      {item.waste !== "0.0" ? (
                        <span className="text-red-600 font-mono font-medium" dir="ltr">-{item.waste}</span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 font-bold font-mono" dir="ltr">{item.closing}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono" dir="ltr">{item.minStock}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        item.status === "critical" ? "bg-red-50 text-red-700" :
                        item.status === "low" ? "bg-amber-50 text-amber-700" :
                        "bg-emerald-50 text-emerald-700"
                      }`}>
                        {item.status === "critical" ? "⚠ حرج" : item.status === "low" ? "↓ منخفض" : "✓ طبيعي"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Waste & Damaged Items */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              الهدر والتالف — يحتاج مراجعة
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">4 حالات · إجمالي 383.5 ر.س</span>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100">
                ✓ اعتماد المعقول
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الصنف</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الكمية</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">السبب</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">التكلفة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">بواسطة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الوقت</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {wasteItems.map((w, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{w.item}</td>
                    <td className="px-4 py-3 text-gray-600">{w.qty}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">{w.reason}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600 font-mono" dir="ltr">{w.cost}</td>
                    <td className="px-4 py-3 text-gray-500">{w.by}</td>
                    <td className="px-4 py-3 text-gray-400">{w.time}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        w.status === "pending" ? "bg-amber-50 text-amber-700" :
                        w.status === "approved" ? "bg-emerald-50 text-emerald-700" :
                        "bg-red-50 text-red-700"
                      }`}>
                        {w.status === "pending" ? "في الانتظار" : w.status === "approved" ? "معتمد" : "مرفوض"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {w.status === "pending" && (
                          <>
                            <button className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded hover:bg-emerald-100">✓</button>
                            <button className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100">✕</button>
                          </>
                        )}
                        <button className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded hover:bg-gray-100">عرض</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
