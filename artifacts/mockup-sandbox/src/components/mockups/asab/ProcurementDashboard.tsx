import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { KPICard } from "./_shared/KPICard";
import { ShoppingCart, PackageCheck, TrendingDown, Search, Filter, Package, Truck } from "lucide-react";

const purchaseGroups = [
  {
    item: "دجاج طازج",
    emoji: "🍗",
    requests: 3,
    branches: ["فرع الرياض: 50 كجم", "فرع جدة: 70 كجم", "فرع مكة: 40 كجم"],
    total: "160 كجم",
    supplier: "شركة الدواجن الوطنية",
    unitPrice: "24 ر.س/كجم",
    totalCost: "3,840 ر.س",
    savings: "320 ر.س",
    savingsPct: "8%",
    status: "new",
  },
  {
    item: "حليب طازج",
    emoji: "🥛",
    requests: 5,
    branches: ["فرع الرياض: 45 لتر", "فرع جدة: 50 لتر", "فرع مكة: 35 لتر", "فرع الدمام: 40 لتر", "فرع الطائف: 30 لتر"],
    total: "200 لتر",
    supplier: "مصنع الألبان السعودي",
    unitPrice: "8 ر.س/لتر",
    totalCost: "1,600 ر.س",
    savings: "200 ر.س",
    savingsPct: "11%",
    status: "grouped",
  },
  {
    item: "زيت نباتي",
    emoji: "🧴",
    requests: 4,
    branches: ["فرع الرياض: 20 لتر", "فرع جدة: 25 لتر", "فرع مكة: 15 لتر", "فرع الدمام: 20 لتر"],
    total: "80 لتر",
    supplier: "شركة الزيوت المتحدة",
    unitPrice: "18 ر.س/لتر",
    totalCost: "1,440 ر.س",
    savings: "180 ر.س",
    savingsPct: "11%",
    status: "sent",
  },
];

const statusMap: Record<string, { label: string; cls: string }> = {
  new: { label: "طلبات جديدة", cls: "bg-blue-50 text-blue-700" },
  grouped: { label: "تم التجميع", cls: "bg-amber-50 text-amber-700" },
  sent: { label: "أُرسل للمورد", cls: "bg-emerald-50 text-emerald-700" },
  confirmed: { label: "مؤكد", cls: "bg-purple-50 text-purple-700" },
};

export function ProcurementDashboard() {
  return (
    <AppLayout role="procurement" userName="سعيد أحمد" activeSection="orders" notificationsCount={5}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">لوحة مدير المشتريات</h2>
            <p className="text-gray-400 text-sm mt-0.5">إدارة مركزية للمشتريات — أكتوبر 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={15} /> تصفية
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
              📦 تجميع وإرسال الكل
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="طلبات جديدة" value="45" subtitle="تحتاج للمعالجة" icon={<ShoppingCart size={22} className="text-blue-600" />} iconBg="bg-blue-50" status="warning" />
          <KPICard title="طلبات مجمعة" value="28" subtitle="جاهزة للإرسال" icon={<PackageCheck size={22} className="text-amber-600" />} iconBg="bg-amber-50" />
          <KPICard title="طلبات مرسلة" value="17" subtitle="في انتظار التأكيد" icon={<Truck size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" status="success" />
          <KPICard title="التوفير الشهري" value="15,400 ر.س" subtitle="8.5% من إجمالي المشتريات" icon={<TrendingDown size={22} className="text-purple-600" />} iconBg="bg-purple-50" trend="up" trendValue="+1.2%" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 flex-1">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="بحث بالصنف أو المورد..." className="text-sm text-gray-600 bg-transparent border-none outline-none flex-1" />
            </div>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-gray-50">
              <option>جميع الفروع</option>
              <option>فرع الرياض</option>
              <option>فرع جدة</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-gray-50">
              <option>جميع الأصناف</option>
              <option>دجاج طازج</option>
              <option>حليب طازج</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-gray-50">
              <option>جميع الموردين</option>
              <option>شركة الدواجن الوطنية</option>
            </select>
          </div>
        </div>

        {/* Purchase Groups */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800">مجموعات الطلبات</h3>
          {purchaseGroups.map((group, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 p-5 border-b border-gray-100">
                <div className="text-2xl">{group.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-gray-800">{group.item}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusMap[group.status]?.cls}`}>
                      {statusMap[group.status]?.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{group.requests} طلبات من {group.requests} فروع · الإجمالي: {group.total}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 font-mono" dir="ltr">{group.totalCost}</div>
                  <div className="text-xs text-emerald-600 font-medium">توفير: {group.savings} ({group.savingsPct})</div>
                </div>
              </div>

              <div className="p-5 grid grid-cols-2 gap-6">
                {/* Branch Details */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">تفاصيل الفروع:</p>
                  <div className="space-y-2">
                    {group.branches.map((br, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-purple-300 flex-shrink-0"></span>
                        <span className="text-gray-600">{br}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supplier & Cost */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">بيانات المورد والتكلفة:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">المورد المقترح:</span>
                      <span className="font-medium text-gray-800">{group.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">السعر:</span>
                      <span className="font-medium text-gray-800 font-mono" dir="ltr">{group.unitPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">الإجمالي:</span>
                      <span className="font-bold text-gray-800 font-mono" dir="ltr">{group.totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">التوفير المتوقع:</span>
                      <span className="font-semibold text-emerald-600 font-mono" dir="ltr">{group.savings} ({group.savingsPct})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 pb-4">
                {group.status === "new" && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    📦 تجميع وإرسال للمورد
                  </button>
                )}
                {group.status === "grouped" && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">
                    ✓ إرسال للمورد
                  </button>
                )}
                {group.status === "sent" && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                    <PackageCheck size={16} />
                    تم الإرسال — في انتظار تأكيد المورد
                  </div>
                )}
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">
                  ✏️ تعديل
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-red-100 text-red-500 text-sm hover:bg-red-50">
                  ✕ رفض
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
