import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { KPICard } from "./_shared/KPICard";
import { Users, Package, Truck, Upload, Download, Plus, Search, CheckCircle2, AlertTriangle } from "lucide-react";

const employees = [
  { name: "علي محمد السيد", id: "1234567890", role: "كاشير", salary: "3,500", hireDate: "2023/01/15", status: "active" },
  { name: "سعد الشمري", id: "0987654321", role: "مشرف", salary: "5,200", hireDate: "2022/06/10", status: "active" },
  { name: "فهد العتيبي", id: "1122334455", role: "طباخ", salary: "4,000", hireDate: "2023/03/20", status: "active" },
  { name: "نايف السلمي", id: "5566778899", role: "عامل نظافة", salary: "2,800", hireDate: "2024/01/01", status: "inactive" },
];

const items = [
  { code: "ITM-001", name: "دجاج طازج", category: "مواد خام", unit: "كجم", price: "24.00", status: "active" },
  { code: "ITM-002", name: "حليب طازج", category: "مشروبات", unit: "لتر", price: "8.00", status: "active" },
  { code: "ITM-003", name: "خبز تمييز", category: "مخبوزات", unit: "رغيف", price: "1.50", status: "active" },
  { code: "ITM-004", name: "زيت نباتي", category: "مواد خام", unit: "لتر", price: "18.00", status: "active" },
];

export function BranchManagerDashboard() {
  return (
    <AppLayout role="branch-manager" userName="أحمد محمد" activeSection="overview" branchName="فرع الرياض - العليا">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-xl">لوحة مدير الفرع</h2>
            <p className="text-gray-400 text-sm mt-0.5">فرع الرياض - العليا</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700">
            <Upload size={15} /> رفع بيانات جديدة
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <KPICard title="الموظفون النشطون" value="25" subtitle="من 28 إجمالي" icon={<Users size={22} className="text-purple-600" />} iconBg="bg-purple-50" />
          <KPICard title="الأصناف النشطة" value="150" subtitle="في قاعدة البيانات" icon={<Package size={22} className="text-blue-600" />} iconBg="bg-blue-50" />
          <KPICard title="الموردون النشطون" value="12" subtitle="مورد معتمد" icon={<Truck size={22} className="text-emerald-600" />} iconBg="bg-emerald-50" />
        </div>

        {/* Quick Upload Cards */}
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              title: "رفع أسماء الموظفين",
              icon: <Users size={20} className="text-purple-600" />,
              iconBg: "bg-purple-50",
              fields: ["الاسم", "رقم الهوية", "الوظيفة", "الراتب", "تاريخ التعيين"],
            },
            {
              title: "رفع أسماء الأصناف",
              icon: <Package size={20} className="text-blue-600" />,
              iconBg: "bg-blue-50",
              fields: ["رمز الصنف", "اسم الصنف", "الفئة", "الوحدة", "السعر"],
            },
            {
              title: "رفع أسماء الموردين",
              icon: <Truck size={20} className="text-emerald-600" />,
              iconBg: "bg-emerald-50",
              fields: ["اسم المورد", "السجل التجاري", "الهاتف", "البريد الإلكتروني", "العنوان"],
            },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{card.title}</h3>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">الحقول المطلوبة:</p>
                <ul className="space-y-1">
                  {card.fields.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 flex-shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-purple-300 hover:bg-purple-50/30 transition-colors cursor-pointer mb-3">
                <Upload size={20} className="text-gray-300 mx-auto mb-1" />
                <p className="text-xs text-gray-400">اسحب الملف هنا أو اضغط للاختيار</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 flex items-center justify-center gap-1">
                  <Upload size={13} /> رفع الآن
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50">
                  <Download size={13} /> نموذج
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Employees List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">الموظفون</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                <Search size={14} className="text-gray-400" />
                <input type="text" placeholder="بحث..." className="text-sm text-gray-600 bg-transparent border-none outline-none w-24" />
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs hover:bg-purple-700">
                <Plus size={13} /> إضافة
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الاسم</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">رقم الهوية</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الوظيفة</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الراتب</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">تاريخ التعيين</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.name}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs" dir="ltr">{emp.id}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.role}</td>
                    <td className="px-4 py-3 font-semibold text-gray-700 font-mono" dir="ltr">{emp.salary} ر.س</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{emp.hireDate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${emp.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500"}`}>
                        {emp.status === "active" ? "✓ نشط" : "غير نشط"}
                      </span>
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
