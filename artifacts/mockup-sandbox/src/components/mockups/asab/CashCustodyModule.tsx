import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { KPICard } from "./_shared/KPICard";
import { Wallet, ArrowDownRight, ArrowUpRight, AlertTriangle, CheckCircle2, Download, Plus, TrendingDown } from "lucide-react";

const custodyTransactions = [
  { date: "2025/10/01", description: "رصيد افتتاحي", debit: "10,000", credit: "—", balance: "10,000", type: "opening" },
  { date: "2025/10/02", description: "تعزيز عهدة من الخزينة", debit: "5,000", credit: "—", balance: "15,000", type: "in" },
  { date: "2025/10/03", description: "سداد مورد لحوم", debit: "—", credit: "3,000", balance: "12,000", type: "out" },
  { date: "2025/10/05", description: "سداد فاتورة كهرباء", debit: "—", credit: "2,500", balance: "9,500", type: "out" },
  { date: "2025/10/08", description: "استلام من الخزينة", debit: "10,000", credit: "—", balance: "19,500", type: "in" },
  { date: "2025/10/10", description: "سداد رواتب عمال يومية", debit: "—", credit: "4,000", balance: "15,500", type: "out" },
  { date: "2025/10/12", description: "مصروفات متنوعة", debit: "—", credit: "1,500", balance: "14,000", type: "out" },
  { date: "2025/10/14", description: "رصيد حالي", debit: "—", credit: "—", balance: "14,000", type: "current" },
];

const branches = [
  { name: "فرع الرياض - العليا", opening: "10,000", received: "25,000", spent: "22,000", current: "13,000", status: "normal", minAlert: "5,000" },
  { name: "فرع جدة - الحمراء", opening: "8,000", received: "18,000", spent: "20,000", current: "6,000", status: "normal", minAlert: "5,000" },
  { name: "فرع مكة - المعابدة", opening: "12,000", received: "15,000", spent: "22,500", current: "4,500", status: "low", minAlert: "5,000" },
  { name: "فرع الدمام - الكورنيش", opening: "15,000", received: "30,000", spent: "42,000", current: "3,000", status: "critical", minAlert: "5,000" },
];

export function CashCustodyModule() {
  return (
    <AppLayout role="head-accountant" userName="خالد أحمد" activeSection="cash" notificationsCount={8}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">إدارة العهد النقدية</h2>
            <p className="text-gray-400 text-sm mt-0.5">متابعة حركات العهدة لجميع الفروع</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-gray-50">
              <option>أكتوبر 2025</option>
              <option>سبتمبر 2025</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              <Download size={15} /> تصدير
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
              <Plus size={15} /> تعزيز عهدة
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard title="إجمالي العهدات" value="26,500 ر.س" subtitle="جميع الفروع الحالي" icon={<Wallet size={22} className="text-purple-600" />} iconBg="bg-purple-50" />
          <KPICard title="إجمالي المصروف" value="107,000 ر.س" subtitle="هذا الشهر" icon={<ArrowDownRight size={22} className="text-red-600" />} iconBg="bg-red-50" />
          <KPICard title="إجمالي المستلم" value="133,500 ر.س" subtitle="هذا الشهر" icon={<ArrowUpRight size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" status="success" />
          <KPICard title="فروع رصيدها منخفض" value="2 فروع" subtitle="تحتاج تعزيز فوري" icon={<AlertTriangle size={22} className="text-red-600" />} iconBg="bg-red-50" status="danger" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Branches Summary */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">ملخص الفروع</h3>
              <span className="text-xs text-gray-400">الحد الأدنى: 5,000 ر.س</span>
            </div>
            <div className="p-4 space-y-3">
              {branches.map((br, i) => (
                <div key={i} className={`p-3 rounded-xl border ${br.status === "critical" ? "border-red-200 bg-red-50" : br.status === "low" ? "border-amber-200 bg-amber-50" : "border-gray-100"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">{br.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      br.status === "critical" ? "bg-red-100 text-red-700" :
                      br.status === "low" ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {br.status === "critical" ? "⚠ حرج" : br.status === "low" ? "↓ منخفض" : "✓ طبيعي"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>الرصيد الحالي</span>
                    <span className={`font-bold font-mono ${br.status === "critical" ? "text-red-700" : br.status === "low" ? "text-amber-700" : "text-emerald-700"}`} dir="ltr">
                      {br.current} ر.س
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>0</span>
                      <span>الحد الأدنى: {br.minAlert}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${br.status === "critical" ? "bg-red-500" : br.status === "low" ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min((parseInt(br.current.replace(",","")) / 20000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  {(br.status === "critical" || br.status === "low") && (
                    <button className="w-full mt-2 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700">
                      + تعزيز فوري
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Detail */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">حركات العهدة — فرع الرياض العليا</h3>
              <div className="flex items-center gap-2">
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-gray-50">
                  <option>فرع الرياض - العليا</option>
                  <option>فرع جدة - الحمراء</option>
                  <option>فرع مكة - المعابدة</option>
                </select>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                  <Download size={13} /> Excel
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-3 p-4 border-b border-gray-100">
              {[
                { label: "رصيد افتتاحي", value: "10,000 ر.س", color: "text-gray-700" },
                { label: "إجمالي المستلم", value: "25,000 ر.س", color: "text-emerald-600" },
                { label: "إجمالي المصروف", value: "22,000 ر.س", color: "text-red-600" },
                { label: "الرصيد الحالي", value: "13,000 ر.س", color: "text-purple-600" },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-[11px] text-gray-400">{s.label}</p>
                  <p className={`font-bold text-lg font-mono mt-1 ${s.color}`} dir="ltr">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">التاريخ</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">البيان</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">مدين (وارد)</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">دائن (صادر)</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الرصيد</th>
                  </tr>
                </thead>
                <tbody>
                  {custodyTransactions.map((tx, i) => (
                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${tx.type === "current" ? "bg-purple-50 font-bold" : ""}`}>
                      <td className="px-4 py-3 text-gray-500 text-xs font-mono" dir="ltr">{tx.date}</td>
                      <td className="px-4 py-3 text-gray-700">{tx.description}</td>
                      <td className="px-4 py-3">
                        {tx.debit !== "—" ? (
                          <span className="text-emerald-600 font-semibold font-mono" dir="ltr">{tx.debit}</span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        {tx.credit !== "—" ? (
                          <span className="text-red-600 font-semibold font-mono" dir="ltr">{tx.credit}</span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className={`px-4 py-3 font-bold font-mono ${tx.type === "current" ? "text-purple-600" : "text-gray-800"}`} dir="ltr">
                        {tx.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
