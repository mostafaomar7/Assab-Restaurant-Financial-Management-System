import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { KPICard } from "./_shared/KPICard";
import { Package, CheckCircle2, XCircle, Clock, TrendingUp, Edit, ToggleLeft, ToggleRight, Plus } from "lucide-react";

const orders = [
  { id: "ORD-501", from: "مدير المشتريات", items: "160 كجم دجاج طازج", total: "3,840 ر.س", date: "14 أكتوبر", deliveryDate: "15 أكتوبر", status: "pending" },
  { id: "ORD-500", from: "فرع مكة", items: "40 كجم دجاج طازج", total: "960 ر.س", date: "13 أكتوبر", deliveryDate: "14 أكتوبر", status: "confirmed" },
  { id: "ORD-499", from: "فرع جدة", items: "70 كجم دجاج طازج", total: "1,680 ر.س", date: "12 أكتوبر", deliveryDate: "13 أكتوبر", status: "delivered" },
  { id: "ORD-498", from: "مدير المشتريات", items: "200 كجم دجاج طازج", total: "4,800 ر.س", date: "10 أكتوبر", deliveryDate: "11 أكتوبر", status: "rejected" },
];

const myItems = [
  { code: "DJJ-001", name: "دجاج طازج - وزن كامل", unit: "كجم", price: "24.00", minQty: "10 كجم", status: "active" },
  { code: "DJJ-002", name: "دجاج مقطع - أرباع", unit: "كجم", price: "28.00", minQty: "5 كجم", status: "active" },
  { code: "DJJ-003", name: "صدور دجاج منزوعة", unit: "كجم", price: "35.00", minQty: "5 كجم", status: "active" },
  { code: "DJJ-004", name: "دجاج مجمد", unit: "كجم", price: "20.00", minQty: "20 كجم", status: "inactive" },
];

const orderStatusMap: Record<string, { label: string; cls: string }> = {
  pending: { label: "في انتظار الرد", cls: "bg-amber-50 text-amber-700" },
  confirmed: { label: "مقبول", cls: "bg-emerald-50 text-emerald-700" },
  delivered: { label: "تم التسليم", cls: "bg-blue-50 text-blue-700" },
  rejected: { label: "مرفوض", cls: "bg-red-50 text-red-700" },
};

export function SupplierDashboard() {
  return (
    <AppLayout role="supplier" userName="محمد العلي" activeSection="orders" notificationsCount={8}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">لوحة المورد</h2>
            <p className="text-gray-400 text-sm mt-0.5">شركة الدواجن الوطنية — أكتوبر 2025</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="طلبات جديدة" value="8" subtitle="تحتاج للرد" icon={<Clock size={22} className="text-amber-600" />} iconBg="bg-amber-50" status="warning" />
          <KPICard title="طلبات مقبولة" value="23" subtitle="هذا الشهر" icon={<CheckCircle2 size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" status="success" />
          <KPICard title="إجمالي مبيعاتي" value="142,500 ر.س" subtitle="هذا الشهر" icon={<TrendingUp size={22} className="text-purple-600" />} iconBg="bg-purple-50" trend="up" trendValue="+15%" />
          <KPICard title="أصنافي النشطة" value="12" subtitle="من 15 إجمالي" icon={<Package size={22} className="text-blue-600" />} iconBg="bg-blue-50" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Orders */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">الطلبات الواردة</h3>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">8 جديد</span>
            </div>
            <div className="p-4 space-y-3">
              {orders.map((order, i) => (
                <div key={i} className={`p-4 rounded-xl border ${order.status === "pending" ? "border-amber-200 bg-amber-50" : "border-gray-100"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${orderStatusMap[order.status]?.cls}`}>
                          {orderStatusMap[order.status]?.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">من: {order.from}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800 font-mono text-sm" dir="ltr">{order.total}</div>
                      <div className="text-xs text-gray-400">{order.date}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-white rounded-lg px-3 py-2 border border-gray-100 mb-2">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">موعد التسليم: {order.deliveryDate}</span>
                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} /> قبول
                        </button>
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-medium flex items-center gap-1">
                          <XCircle size={12} /> رفض
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Items */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">أصنافي</h3>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs hover:bg-purple-700">
                <Plus size={13} /> إضافة صنف
              </button>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">الصنف</th>
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">الوحدة</th>
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">السعر</th>
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">الحد الأدنى</th>
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">الحالة</th>
                      <th className="py-2 text-right text-xs font-semibold text-gray-500">تعديل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myItems.map((item, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3">
                          <div className="font-medium text-gray-800 text-xs">{item.name}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{item.code}</div>
                        </td>
                        <td className="py-3 text-gray-500 text-xs">{item.unit}</td>
                        <td className="py-3 font-bold text-gray-800 font-mono text-xs" dir="ltr">{item.price} ر.س</td>
                        <td className="py-3 text-gray-500 text-xs">{item.minQty}</td>
                        <td className="py-3">
                          <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${item.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500"}`}>
                            {item.status === "active" ? "✓ نشط" : "موقوف"}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100">
                              <Edit size={12} />
                            </button>
                            {item.status === "active"
                              ? <button className="p-1 rounded bg-gray-50 text-gray-500 hover:bg-gray-100"><ToggleRight size={12} /></button>
                              : <button className="p-1 rounded bg-gray-50 text-gray-400 hover:bg-gray-100"><ToggleLeft size={12} /></button>
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
