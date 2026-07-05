import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { Upload, Send, Eye, CheckCircle2, Download, FileText, Plus, Clock } from "lucide-react";

const reports = [
  { restaurant: "مطعم البيك", period: "أكتوبر 2025", type: "قائمة الدخل P&L", status: "approved", revenue: "2,500,000", netProfit: "700,000", profitPct: "28%", uploadedAt: "14 أكتوبر", sent: false },
  { restaurant: "مطعم هرفي", period: "أكتوبر 2025", type: "قائمة الدخل P&L", status: "approved", revenue: "1,850,000", netProfit: "580,000", profitPct: "31%", uploadedAt: "14 أكتوبر", sent: true },
  { restaurant: "مطعم كودو", period: "أكتوبر 2025", type: "قائمة الدخل P&L", status: "pending", revenue: "—", netProfit: "—", profitPct: "—", uploadedAt: "—", sent: false },
  { restaurant: "مطعم ماكدونالدز", period: "أكتوبر 2025", type: "قائمة الدخل P&L", status: "approved", revenue: "3,200,000", netProfit: "896,000", profitPct: "28%", uploadedAt: "13 أكتوبر", sent: true },
  { restaurant: "مطعم برغر كينغ", period: "أكتوبر 2025", type: "قائمة الدخل P&L", status: "uploading", revenue: "—", netProfit: "—", profitPct: "—", uploadedAt: "—", sent: false },
];

const statusConfig: Record<string, { label: string; cls: string }> = {
  approved: { label: "معتمد للإرسال", cls: "bg-emerald-50 text-emerald-700" },
  pending: { label: "في انتظار التقرير", cls: "bg-amber-50 text-amber-700" },
  uploading: { label: "جاري الرفع", cls: "bg-blue-50 text-blue-700" },
  sent: { label: "تم الإرسال", cls: "bg-gray-50 text-gray-600" },
};

export function ReportsManager() {
  return (
    <AppLayout role="admin" userName="عمر المدير" activeSection="reports-manager" notificationsCount={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">مدير التقارير</h2>
            <p className="text-gray-400 text-sm mt-0.5">إدارة وإرسال التقارير المالية لأصحاب المطاعم</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Upload size={15} /> رفع تقرير ERP
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
              <Send size={15} /> إرسال الكل (22 تقرير)
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "تقارير جاهزة", value: "18", sub: "للإرسال", color: "emerald", icon: "📊" },
            { label: "تم إرسالها", value: "12", sub: "هذا الشهر", color: "blue", icon: "📧" },
            { label: "في الانتظار", value: "6", sub: "تقارير ERP", color: "amber", icon: "⏳" },
            { label: "إجمالي المطاعم", value: "25", sub: "مطعم نشط", color: "purple", icon: "🏢" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
              <div className="text-2xl">{s.icon}</div>
              <div>
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className="text-gray-900 font-bold text-2xl mt-0.5">{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Reports Table */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">تقارير أكتوبر 2025</h3>
              <div className="flex items-center gap-2">
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-gray-50">
                  <option>أكتوبر 2025</option>
                  <option>سبتمبر 2025</option>
                </select>
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-gray-50">
                  <option>قائمة الدخل P&L</option>
                  <option>الميزانية العمومية</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">المطعم</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الإيرادات</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">صافي الربح</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">هامش الربح</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحالة</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded" defaultChecked={r.status === "approved"} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">{r.restaurant}</div>
                        <div className="text-xs text-gray-400">{r.period}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-700" dir="ltr">{r.revenue}</td>
                      <td className="px-4 py-3 text-sm font-mono font-semibold text-emerald-700" dir="ltr">{r.netProfit}</td>
                      <td className="px-4 py-3">
                        {r.profitPct !== "—" ? (
                          <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full font-semibold">{r.profitPct}</span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusConfig[r.status]?.cls}`}>
                          {r.sent ? "✓ تم الإرسال" : statusConfig[r.status]?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {r.status === "approved" && !r.sent && (
                            <>
                              <button className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 flex items-center gap-1">
                                <Eye size={11} /> معاينة
                              </button>
                              <button className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 flex items-center gap-1">
                                <Send size={11} /> إرسال
                              </button>
                            </>
                          )}
                          {r.status === "pending" && (
                            <button className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 flex items-center gap-1">
                              <Upload size={11} /> رفع
                            </button>
                          )}
                          {r.sent && (
                            <button className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded hover:bg-gray-100 flex items-center gap-1">
                              <Download size={11} /> تحميل
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Send Configuration */}
          <div className="space-y-4">
            {/* Upload ERP Report */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload size={16} className="text-purple-600" /> رفع تقرير من ERP
              </h3>
              <div className="space-y-3">
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
                  <option>اختر المطعم</option>
                  <option>مطعم كودو</option>
                  <option>مطعم برغر كينغ</option>
                </select>
                <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
                  <option>قائمة الدخل P&L</option>
                  <option>الميزانية العمومية</option>
                  <option>التدفقات النقدية</option>
                </select>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 hover:bg-purple-50/30 transition-colors cursor-pointer">
                  <FileText size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">اسحب ملف Excel هنا</p>
                  <p className="text-xs text-gray-400 mt-1">أو اضغط للاختيار</p>
                  <button className="mt-3 px-4 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium">
                    اختر ملف
                  </button>
                </div>
              </div>
            </div>

            {/* Send Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Send size={16} className="text-purple-600" /> خيارات الإرسال
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-2">طريقة الإرسال:</p>
                  <div className="space-y-1.5">
                    {["بريد إلكتروني", "إشعار في التطبيق", "كلاهما معاً"].map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="send-method" defaultChecked={i === 2} className="accent-purple-600" />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">الصيغة:</p>
                  <div className="flex gap-3">
                    {["PDF", "Excel", "كلاهما"].map((fmt, i) => (
                      <label key={i} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="format" defaultChecked={i === 0} className="accent-purple-600" />
                        <span className="text-sm text-gray-700">{fmt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">رسالة مرفقة:</p>
                  <textarea
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 resize-none"
                    rows={3}
                    defaultValue="السادة أصحاب المطاعم المحترمين، نفيدكم باستلام التقارير المالية لشهر أكتوبر 2025."
                  />
                </div>
                <button className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 flex items-center justify-center gap-2">
                  <Send size={15} /> إرسال التقارير المحددة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
