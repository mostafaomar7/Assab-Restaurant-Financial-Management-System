import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { ChevronsRight, CheckCircle2, Clock, AlertTriangle, Filter, Download, RefreshCw } from "lucide-react";

const exportBatches = [
  { id: "EXP-2025-10-14-001", module: "مبيعات", branch: "جميع الفروع", count: 45, amount: "1,245,300 ر.س", approvedBy: "خالد أحمد", readyAt: "14 أكتوبر 09:30", status: "ready" },
  { id: "EXP-2025-10-14-002", module: "مصروفات", branch: "جميع الفروع", count: 32, amount: "423,500 ر.س", approvedBy: "خالد أحمد", readyAt: "14 أكتوبر 09:32", status: "ready" },
  { id: "EXP-2025-10-14-003", module: "مشتريات", branch: "جميع الفروع", count: 18, amount: "892,000 ر.س", approvedBy: "خالد أحمد", readyAt: "14 أكتوبر 09:35", status: "exported" },
  { id: "EXP-2025-10-14-004", module: "مخزون", branch: "جميع الفروع", count: 8, amount: "—", approvedBy: "خالد أحمد", readyAt: "14 أكتوبر 09:38", status: "exported" },
  { id: "EXP-2025-10-13-001", module: "مبيعات", branch: "جميع الفروع", count: 43, amount: "1,189,750 ر.س", approvedBy: "خالد أحمد", readyAt: "13 أكتوبر 18:00", status: "exported" },
];

const statusMap: Record<string, { label: string; cls: string }> = {
  ready: { label: "جاهز للتصدير", cls: "bg-emerald-50 text-emerald-700" },
  exported: { label: "تم التصدير لـ ERP", cls: "bg-blue-50 text-blue-700" },
  failed: { label: "فشل التصدير", cls: "bg-red-50 text-red-700" },
};

export function ERPExportScreen() {
  return (
    <AppLayout role="admin" userName="عمر المدير" activeSection="erp-export" notificationsCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">تصدير العمليات إلى ERP</h2>
            <p className="text-gray-400 text-sm mt-0.5">نقل البيانات المعتمدة نهائياً إلى نظام ERP</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <RefreshCw size={15} /> تحديث
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700 font-semibold">
              <ChevronsRight size={15} /> تصدير جماعي للكل الجاهز
            </button>
          </div>
        </div>

        {/* ERP Connection Status */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
          <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-700">نظام ERP متصل ونشط</p>
            <p className="text-xs text-emerald-600">آخر تصدير ناجح: 14 أكتوبر 2025 الساعة 09:38 صباحاً — 26 عملية</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-emerald-700">جاهز للتصدير</div>
            <div className="text-xs text-emerald-600">77 عملية معتمدة</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "جاهزة للتصدير", value: "77", sub: "عملية معتمدة", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={20} className="text-emerald-600" /> },
            { label: "تم تصديرها اليوم", value: "26", sub: "عملية مُرحَّلة", color: "text-blue-600", bg: "bg-blue-50", icon: <ChevronsRight size={20} className="text-blue-600" /> },
            { label: "في انتظار الاعتماد", value: "48", sub: "عند رئيس الحسابات", color: "text-amber-600", bg: "bg-amber-50", icon: <Clock size={20} className="text-amber-600" /> },
            { label: "فشلت الإرسال", value: "0", sub: "لا توجد أخطاء", color: "text-gray-400", bg: "bg-gray-50", icon: <AlertTriangle size={20} className="text-gray-400" /> },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs">{s.label}</p>
                <p className={`font-bold text-2xl mt-0.5 ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-gray-50">
              <option>كل الموديولات</option>
              <option>مبيعات</option>
              <option>مصروفات</option>
              <option>مشتريات</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-gray-50">
              <option>كل الحالات</option>
              <option>جاهز للتصدير</option>
              <option>تم التصدير</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-gray-50">
              <option>اليوم</option>
              <option>هذا الأسبوع</option>
              <option>هذا الشهر</option>
            </select>
            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">
              تطبيق
            </button>
          </div>
        </div>

        {/* Export Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">سجل التصدير</h3>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" /> تحديد الجاهز
              </label>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50">
                <Download size={13} /> تقرير
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 w-8">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">رقم الدفعة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الموديول</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الفروع</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">عدد العمليات</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الإجمالي</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">معتمد بواسطة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">وقت الاستعداد</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحالة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {exportBatches.map((batch, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${batch.status === "ready" ? "bg-emerald-50/30" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded" defaultChecked={batch.status === "ready"} />
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{batch.id}</td>
                    <td className="px-4 py-3">
                      <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-md font-medium">{batch.module}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{batch.branch}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-800">{batch.count}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 font-mono text-sm" dir="ltr">{batch.amount}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{batch.approvedBy}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{batch.readyAt}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusMap[batch.status]?.cls}`}>
                        {statusMap[batch.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {batch.status === "ready" ? (
                        <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-1 font-medium">
                          <ChevronsRight size={12} /> تصدير
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CheckCircle2 size={12} /> مُرحَّل
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="p-4 bg-purple-50 border-t border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">المحدد: <strong className="text-purple-700">2 دفعات</strong></span>
              <span className="text-gray-600">الإجمالي: <strong className="text-purple-700 font-mono">1,668,800 ر.س</strong></span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700">
              <ChevronsRight size={15} />
              تصدير المحدد (2 دفعة)
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
