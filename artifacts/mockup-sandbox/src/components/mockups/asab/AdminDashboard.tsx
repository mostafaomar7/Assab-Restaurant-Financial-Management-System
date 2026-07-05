import "./_group.css";
import { AppLayout } from "./_shared/AppLayout";
import { useState } from "react";
import {
  Plus, Search, Edit, Trash2, ToggleLeft, Mail, ChevronRight,
  ChevronDown, X, Check, Building2, Layers, Users, RefreshCw,
  AlertTriangle, CheckCircle2, Clock
} from "lucide-react";

/* ─────────────────── DATA ─────────────────── */

const MODULES = [
  "المبيعات", "المصروفات", "المشتريات",
  "المخزون", "الأصول الثابتة", "الشفتات", "الموظفين", "العهد المالية",
];

type Plan      = "فضي" | "ذهبي" | "بلاتيني";
type SubStatus = "active" | "warning" | "danger" | "expired";

interface BranchSub {
  id: string; name: string; plan: Plan;
  status: SubStatus; daysLeft: number; price: number;
}
interface BrandSub {
  id: string; name: string; color: string; emoji: string;
  branches: BranchSub[];
}

const PLAN_ICON: Record<Plan, string> = { فضي:"🥈", ذهبي:"🥇", بلاتيني:"💎" };
const PLAN_CLS:  Record<Plan, string> = {
  فضي:      "bg-gray-100 text-gray-600 border-gray-200",
  ذهبي:     "bg-amber-50 text-amber-700 border-amber-200",
  بلاتيني:  "bg-purple-50 text-purple-700 border-purple-200",
};
const STATUS_CFG: Record<SubStatus, { label:string; cls:string; dot:string; btnCls:string; btnLabel:string }> = {
  active:  { label:"نشط",           cls:"bg-emerald-50 text-emerald-700",  dot:"bg-emerald-500", btnCls:"",                              btnLabel:"" },
  warning: { label:"ينتهي قريباً",  cls:"bg-amber-50 text-amber-700",     dot:"bg-amber-500",   btnCls:"bg-amber-600 text-white",        btnLabel:"تجديد" },
  danger:  { label:"حرج",           cls:"bg-red-50 text-red-700",          dot:"bg-red-500",     btnCls:"bg-red-600 text-white",          btnLabel:"تجديد فوري" },
  expired: { label:"منتهي",         cls:"bg-red-100 text-red-800",         dot:"bg-red-700",     btnCls:"bg-gray-800 text-white",         btnLabel:"تفعيل مجدداً" },
};

const BRANDS_SUB: BrandSub[] = [
  { id:"reem",     name:"مطاعم الريم",           color:"#7C3AED", emoji:"🌟",
    branches:[
      { id:"r1", name:"الريم الصحافة",         plan:"بلاتيني", status:"active",  daysLeft:307, price:2499 },
      { id:"r2", name:"الريم النسيم",          plan:"بلاتيني", status:"active",  daysLeft:307, price:2499 },
      { id:"r3", name:"الريم العليا",          plan:"بلاتيني", status:"warning", daysLeft:35,  price:2499 },
      { id:"r4", name:"الريم النخيل",          plan:"ذهبي",    status:"active",  daysLeft:260, price:1499 },
    ]
  },
  { id:"herfy",    name:"مطاعم هرفي",            color:"#DC2626", emoji:"🍗",
    branches:[
      { id:"r5",  name:"هرفي الصحافة",         plan:"ذهبي",    status:"active",  daysLeft:180, price:1499 },
      { id:"r6",  name:"هرفي النسيم",          plan:"ذهبي",    status:"warning", daysLeft:22,  price:1499 },
      { id:"r7",  name:"هرفي العليا",          plan:"ذهبي",    status:"active",  daysLeft:200, price:1499 },
      { id:"r8",  name:"هرفي الملز",           plan:"فضي",     status:"danger",  daysLeft:8,   price:899  },
      { id:"r9",  name:"هرفي الروضة",          plan:"فضي",     status:"active",  daysLeft:150, price:899  },
    ]
  },
  { id:"mcd",      name:"ماكدونالدز السعودية",   color:"#D97706", emoji:"🍔",
    branches:[
      { id:"r10", name:"ماكدونالدز العليا",     plan:"بلاتيني", status:"active",  daysLeft:400, price:2499 },
      { id:"r11", name:"ماكدونالدز الملك فهد",  plan:"بلاتيني", status:"active",  daysLeft:88,  price:2499 },
      { id:"r12", name:"ماكدونالدز رياض بارك",  plan:"ذهبي",    status:"active",  daysLeft:210, price:1499 },
      { id:"r13", name:"ماكدونالدز جدة",        plan:"ذهبي",    status:"expired", daysLeft:-12, price:1499 },
    ]
  },
  { id:"broasted", name:"بروستد الوطني",         color:"#059669", emoji:"🍖",
    branches:[
      { id:"r14", name:"بروستد الطائف",         plan:"فضي",     status:"active",  daysLeft:95,  price:899  },
      { id:"r15", name:"بروستد أبها",           plan:"فضي",     status:"warning", daysLeft:18,  price:899  },
    ]
  },
];

const ALL_BRANCHES = BRANDS_SUB.flatMap(b => b.branches.map(br => ({ ...br, brandName: b.name, brandColor: b.color })));

interface Accountant {
  id: string; name: string; email: string; status: "active" | "inactive";
  assignments: Record<string, string[]>;
}

const ACC_INIT: Accountant[] = [
  { id:"u1", name:"أحمد محمد الشهري", email:"ahmed@asab.sa",  status:"active",
    assignments:{ r1:MODULES, r2:MODULES, r3:MODULES } },
  { id:"u2", name:"سارة العمري",      email:"sara@asab.sa",   status:"active",
    assignments:{ r5:["المبيعات","المصروفات","المخزون"], r6:["المبيعات","المصروفات","المخزون"] } },
  { id:"u3", name:"محمد الحربي",      email:"harbi@asab.sa",  status:"inactive",
    assignments:{ r10:["المبيعات","المصروفات","المشتريات"] } },
  { id:"u4", name:"فاطمة السالم",     email:"fatima@asab.sa", status:"active",
    assignments:{ r14:["المبيعات","المصروفات"], r15:["المبيعات","المصروفات"] } },
];

/* ─────────────────── HELPERS ─────────────────── */

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
}

/* ─────────────────── COMPONENT ─────────────────── */

type AdminTab = "overview" | "users" | "subscriptions";
type DistMode = "restaurant" | "module";

export function AdminDashboard() {
  const [tab,          setTab]        = useState<AdminTab>("overview");
  const [addUserOpen,  setAddUserOpen] = useState(false);
  const [accountants,  setAccountants] = useState<Accountant[]>(ACC_INIT);
  const [subData,      setSubData]     = useState<BrandSub[]>(BRANDS_SUB);
  const [expandBrand,  setExpandBrand] = useState<Record<string,boolean>>({ reem:true });
  const [subSearch,    setSubSearch]   = useState("");

  /* Distribution panel */
  const [distUser,  setDistUser]  = useState<string|null>(null);
  const [distMode,  setDistMode]  = useState<DistMode>("restaurant");
  const [selMods,   setSelMods]   = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const selAcc = accountants.find(a => a.id === distUser) ?? null;

  function openDist(id: string) {
    setDistUser(id); setDistMode("restaurant"); setSelMods([]);
  }
  function closeDist() { setDistUser(null); }

  /* Assign all modules to a branch */
  function assignRestaurant(accId: string, branchId: string) {
    setAccountants(prev => prev.map(a => a.id !== accId ? a : {
      ...a,
      assignments: { ...a.assignments, [branchId]: [...MODULES] }
    }));
  }
  /* Remove a branch from accountant */
  function removeRestaurant(accId: string, branchId: string) {
    setAccountants(prev => prev.map(a => {
      if (a.id !== accId) return a;
      const { [branchId]: _, ...rest } = a.assignments;
      return { ...a, assignments: rest };
    }));
  }
  /* Assign specific modules to selected branches */
  function assignModuleToBranches(accId: string, mods: string[], branchIds: string[]) {
    setAccountants(prev => prev.map(a => {
      if (a.id !== accId) return a;
      const next = { ...a.assignments };
      branchIds.forEach(bid => {
        const cur = next[bid] ?? [];
        next[bid] = [...new Set([...cur, ...mods])];
      });
      return { ...a, assignments: next };
    }));
  }
  /* Remove module from branch */
  function removeModuleFromBranch(accId: string, branchId: string, mod: string) {
    setAccountants(prev => prev.map(a => {
      if (a.id !== accId) return a;
      const cur = (a.assignments[branchId] ?? []).filter(m => m !== mod);
      const next = { ...a.assignments };
      if (cur.length === 0) delete next[branchId];
      else next[branchId] = cur;
      return { ...a, assignments: next };
    }));
  }

  /* Renew subscription */
  function renewSub(brandId: string, branchId: string) {
    setSubData(prev => prev.map(b => b.id !== brandId ? b : {
      ...b,
      branches: b.branches.map(br => br.id !== branchId ? br : {
        ...br, status: "active" as SubStatus, daysLeft: 365
      })
    }));
  }

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: "overview",       label: "الرئيسية",    icon: "📊" },
    { id: "users",          label: "المستخدمون", icon: "👥" },
    { id: "subscriptions",  label: "الاشتراكات", icon: "💰" },
  ];

  /* Filtered branches for subscriptions */
  const filteredBrands = subData.map(b => ({
    ...b,
    branches: b.branches.filter(br => !subSearch || br.name.includes(subSearch))
  })).filter(b => !subSearch || b.branches.length > 0);

  const urgentBranches = ALL_BRANCHES.filter(b => {
    const sub = subData.flatMap(x=>x.branches).find(x=>x.id===b.id);
    return sub && (sub.status==="warning"||sub.status==="danger"||sub.status==="expired");
  });

  return (
    <AppLayout role="admin" userName="الأدمن" activeSection="admin" notificationsCount={5}>

      {/* ── Add User Modal ── */}
      {addUserOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-[560px] p-6 space-y-4" dir="rtl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">➕ إضافة مستخدم جديد</h3>
              <button onClick={()=>setAddUserOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} className="text-gray-500"/></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">الاسم الكامل *</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700" placeholder="اسم المستخدم..."/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">البريد الإلكتروني *</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700" placeholder="user@asab.sa" dir="ltr"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">رقم الجوال</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700" placeholder="05XXXXXXXX" dir="ltr"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1.5">الدور *</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  <option>اختر الدور...</option>
                  <option>محاسب</option>
                  <option>رئيس حسابات</option>
                  <option>مدير فرع</option>
                </select>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-blue-700 text-xs">📧 سيتم إرسال بيانات الدخول تلقائياً إلى البريد الإلكتروني المدخل</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 flex items-center justify-center gap-2">
                <Mail size={14}/> إضافة وإرسال بيانات الدخول
              </button>
              <button onClick={()=>setAddUserOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <h2 className="font-bold text-gray-800 text-xl">🧠 لوحة الأدمن الرئيسية</h2>
          <p className="text-gray-400 text-sm">إدارة شاملة للنظام — المستخدمون، المطاعم، الاشتراكات، الصلاحيات</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl w-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${tab===t.id?"bg-white text-purple-700 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════ OVERVIEW ══════════════ */}
        {tab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label:"فروع نشطة",         value:"15", icon:"🏪", color:"border-l-purple-500", sub:"+2 هذا الشهر" },
                { label:"علامات تجارية",      value:"4",  icon:"🌟", color:"border-l-blue-500",   sub:"مفعّلة بالكامل" },
                { label:"مستخدمون نشطون",    value:"24",  icon:"👥", color:"border-l-emerald-500", sub:"+3 هذا الشهر" },
                { label:"وقت التشغيل",        value:"99.9%", icon:"⚡", color:"border-l-amber-500", sub:"آخر 30 يوم" },
              ].map((k,i) => (
                <div key={i} className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${k.color}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{k.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs">{k.label}</p>
                      <p className="font-bold text-gray-900 text-2xl mt-0.5">{k.value}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{k.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">توزيع المحاسبين</h3>
                  <button onClick={()=>setTab("users")} className="text-xs text-purple-600 hover:underline flex items-center gap-1">إدارة <ChevronRight size={12}/></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label:"محاسبون",       value:accountants.filter(a=>a.status==="active").length, icon:"💼", cls:"bg-blue-50 text-blue-700" },
                    { label:"رؤساء حسابات", value:4,  icon:"👔", cls:"bg-purple-50 text-purple-700" },
                    { label:"مدراء فروع",   value:15, icon:"🏪", cls:"bg-emerald-50 text-emerald-700" },
                    { label:"أدمن",          value:1,  icon:"🔐", cls:"bg-red-50 text-red-700" },
                  ].map((r,i) => (
                    <div key={i} className={`rounded-xl p-4 flex items-center gap-3 ${r.cls}`}>
                      <span className="text-2xl">{r.icon}</span>
                      <div>
                        <p className="text-xs opacity-70">{r.label}</p>
                        <p className="font-bold text-xl">{r.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={()=>setAddUserOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700">
                    <Plus size={12}/> إضافة مستخدم
                  </button>
                  <button onClick={()=>setTab("users")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50">
                    ⚙️ توزيع المهام
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">تنبيهات الاشتراكات</h3>
                  <button onClick={()=>setTab("subscriptions")} className="text-xs text-purple-600 hover:underline flex items-center gap-1">عرض الكل <ChevronRight size={12}/></button>
                </div>
                <div className="space-y-2.5">
                  {urgentBranches.slice(0,4).map(br => {
                    const sub = subData.flatMap(b=>b.branches).find(x=>x.id===br.id)!;
                    const cfg = STATUS_CFG[sub.status];
                    return (
                      <div key={br.id} className={`flex items-center gap-3 p-2.5 rounded-xl border ${sub.status==="expired"?"border-red-200 bg-red-50":sub.status==="danger"?"border-red-100 bg-red-50":"border-amber-200 bg-amber-50"}`}>
                        <span className="text-lg">{sub.status==="expired"||sub.status==="danger"?"❌":"⚠️"}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-xs truncate ${sub.status==="expired"||sub.status==="danger"?"text-red-700":"text-amber-700"}`}>{br.name}</p>
                          <p className="text-[10px] text-gray-500">{br.brandName}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>
                      </div>
                    );
                  })}
                  {urgentBranches.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-6 text-center">
                      <CheckCircle2 size={28} className="text-emerald-400"/>
                      <p className="text-sm text-gray-400">جميع الاشتراكات نشطة</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { icon:"👤", label:"إضافة محاسب",       action:()=>setAddUserOpen(true) },
                  { icon:"🏪", label:"إضافة فرع",         action:()=>setTab("subscriptions") },
                  { icon:"📊", label:"توزيع المحاسبين",   action:()=>setTab("users") },
                  { icon:"💰", label:"إدارة الاشتراكات",  action:()=>setTab("subscriptions") },
                  { icon:"📋", label:"سجل النشاطات",      action:()=>{} },
                ].map((a,i) => (
                  <button key={i} onClick={a.action} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all">
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-xs font-medium text-gray-600 text-center">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ USERS ══════════════ */}
        {tab === "users" && (
          <div className="flex gap-4" style={{minHeight:520}}>

            {/* Left: user list */}
            <div className={`flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm ${distUser?"max-w-[45%]":""}`}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-800">المحاسبون</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{accountants.length} محاسبين في النظام</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                    <Search size={13} className="text-gray-400"/>
                    <input value={userSearch} onChange={e=>setUserSearch(e.target.value)}
                      className="text-sm text-gray-600 bg-transparent outline-none w-28" placeholder="بحث..."/>
                  </div>
                  <button onClick={()=>setAddUserOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700">
                    <Plus size={12}/> إضافة
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-50">
                {accountants.filter(a=>!userSearch||a.name.includes(userSearch)).map(acc => {
                  const branchCount = Object.keys(acc.assignments).length;
                  const isSelected = distUser === acc.id;
                  return (
                    <div key={acc.id} className={`px-5 py-4 transition-colors ${isSelected?"bg-purple-50 border-r-2 border-purple-500":""}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-base font-bold text-purple-700 flex-shrink-0">
                          {acc.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm">{acc.name}</p>
                          <p className="text-xs text-gray-400 truncate" dir="ltr">{acc.email}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${acc.status==="active"?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-gray-100 text-gray-500 border-gray-200"}`}>
                            {acc.status==="active"?"نشط":"معطل"}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {branchCount} فرع
                          </span>
                        </div>
                      </div>

                      {/* Assignment summary chips */}
                      {branchCount > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 mr-13">
                          {Object.entries(acc.assignments).slice(0,3).map(([bid, mods]) => {
                            const br = ALL_BRANCHES.find(b=>b.id===bid);
                            return br ? (
                              <span key={bid} className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                                style={{background:br.brandColor+"15", color:br.brandColor, borderColor:br.brandColor+"30"}}>
                                {br.name} · {mods.length===MODULES.length?"كل الموديولات":`${mods.length} موديول`}
                              </span>
                            ) : null;
                          })}
                          {branchCount > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">+{branchCount-3} أخرى</span>
                          )}
                        </div>
                      )}
                      {branchCount === 0 && (
                        <p className="mt-2 text-[10px] text-amber-600 mr-13">⚠️ لم يُخصص له أي فرع بعد</p>
                      )}

                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>isSelected?closeDist():openDist(acc.id)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${isSelected?"bg-purple-600 text-white hover:bg-purple-700":"bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"}`}>
                          <Layers size={11}/>{isSelected?"إغلاق التوزيع":"توزيع المهام"}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                          <Users size={11}/> عرض التفاصيل
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Distribution Panel */}
            {distUser && selAcc && (
              <div className="flex-1 min-w-0 bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden">
                {/* Panel header */}
                <div className="bg-gradient-to-l from-purple-600 to-blue-600 px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">توزيع مهام — {selAcc.name}</p>
                    <p className="text-purple-200 text-[11px] mt-0.5">اختر طريقة التخصيص</p>
                  </div>
                  <button onClick={closeDist} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"><X size={14}/></button>
                </div>

                {/* Mode toggle */}
                <div className="flex border-b border-gray-100">
                  <button onClick={()=>{setDistMode("restaurant");setSelMods([]);}}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition-colors border-b-2 ${distMode==="restaurant"?"border-purple-500 text-purple-700 bg-purple-50":"border-transparent text-gray-500 hover:text-gray-700"}`}>
                    <Building2 size={13}/> بالمطعم / الفرع
                  </button>
                  <button onClick={()=>{setDistMode("module");setSelMods([]);}}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition-colors border-b-2 ${distMode==="module"?"border-purple-500 text-purple-700 bg-purple-50":"border-transparent text-gray-500 hover:text-gray-700"}`}>
                    <Layers size={13}/> بالموديول
                  </button>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto" style={{maxHeight:440}}>

                  {/* ── Mode A: by Restaurant ── */}
                  {distMode === "restaurant" && (
                    <div className="space-y-2.5">
                      <p className="text-[11px] text-gray-400">اختر فرعاً لتسليم المحاسب جميع موديولاته — أو اضغط ✕ لإزالة التخصيص</p>
                      {BRANDS_SUB.map(brand => (
                        <div key={brand.id}>
                          <p className="text-[10px] font-bold mb-1.5 flex items-center gap-1.5" style={{color:brand.color}}>
                            <span className="text-sm">{brand.emoji}</span>{brand.name}
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {brand.branches.map(br => {
                              const assigned = selAcc.assignments[br.id] !== undefined;
                              const allMods  = assigned && selAcc.assignments[br.id].length === MODULES.length;
                              return (
                                <div key={br.id} className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${assigned?"border-purple-300 bg-purple-50":"border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-gray-700 truncate">{br.name}</p>
                                    {assigned && (
                                      <p className="text-[10px] text-purple-600">{allMods?"كل الموديولات":`${selAcc.assignments[br.id].length} موديول`}</p>
                                    )}
                                  </div>
                                  {assigned ? (
                                    <button onClick={()=>removeRestaurant(selAcc.id, br.id)}
                                      className="p-1 rounded hover:bg-red-100 text-red-500 flex-shrink-0 mr-1">
                                      <X size={11}/>
                                    </button>
                                  ) : (
                                    <button onClick={()=>assignRestaurant(selAcc.id, br.id)}
                                      className="p-1 rounded bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0 mr-1">
                                      <Plus size={11}/>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── Mode B: by Module ── */}
                  {distMode === "module" && (
                    <div className="space-y-3">
                      {/* Step 1: select modules */}
                      <div>
                        <p className="text-[11px] font-bold text-gray-600 mb-2">① اختر الموديول أو الموديولات</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {MODULES.map(m => {
                            const active = selMods.includes(m);
                            return (
                              <button key={m} onClick={()=>setSelMods(p=>toggle(p,m))}
                                className={`text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${active?"bg-purple-600 text-white border-purple-600":"bg-gray-50 text-gray-600 border-gray-200 hover:border-purple-300"}`}>
                                {m}
                                {active && <Check size={11}/>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: select branches */}
                      {selMods.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-gray-600 mb-2">② اختر الفروع التي ستحصل على هذه الموديولات</p>
                          {BRANDS_SUB.map(brand => (
                            <div key={brand.id} className="mb-2">
                              <p className="text-[10px] font-bold mb-1" style={{color:brand.color}}>
                                {brand.emoji} {brand.name}
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                {brand.branches.map(br => {
                                  const hasMods = selMods.every(m => (selAcc.assignments[br.id]??[]).includes(m));
                                  return (
                                    <button key={br.id}
                                      onClick={()=>hasMods
                                        ?selMods.forEach(m=>removeModuleFromBranch(selAcc.id,br.id,m))
                                        :assignModuleToBranches(selAcc.id,selMods,[br.id])}
                                      className={`text-right px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all flex items-center justify-between ${hasMods?"bg-emerald-50 border-emerald-300 text-emerald-700":"bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300"}`}>
                                      <span className="truncate">{br.name}</span>
                                      {hasMods ? <Check size={10} className="text-emerald-600 flex-shrink-0"/> : <Plus size={10} className="text-gray-400 flex-shrink-0"/>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                          <button onClick={()=>assignModuleToBranches(selAcc.id,selMods,ALL_BRANCHES.map(b=>b.id))}
                            className="w-full mt-1 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700">
                            تطبيق على جميع الفروع
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Current assignments summary */}
                  {Object.keys(selAcc.assignments).length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-[11px] font-bold text-gray-500 mb-2">التخصيصات الحالية</p>
                      <div className="space-y-1.5">
                        {Object.entries(selAcc.assignments).map(([bid, mods]) => {
                          const br = ALL_BRANCHES.find(b=>b.id===bid);
                          if (!br) return null;
                          return (
                            <div key={bid} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:br.brandColor}}/>
                              <span className="text-xs font-semibold text-gray-700 flex-1 truncate">{br.name}</span>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {mods.length === MODULES.length
                                  ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">كل الموديولات</span>
                                  : mods.slice(0,2).map(m=><span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">{m}</span>)
                                }
                                {mods.length !== MODULES.length && mods.length > 2 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600">+{mods.length-2}</span>
                                )}
                              </div>
                              <button onClick={()=>removeRestaurant(selAcc.id,bid)} className="p-0.5 rounded hover:bg-red-100 text-red-400 flex-shrink-0">
                                <X size={10}/>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════ SUBSCRIPTIONS ══════════════ */}
        {tab === "subscriptions" && (
          <div className="space-y-4">
            {/* Header + search */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-bold text-gray-800">اشتراكات الفروع</h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {subData.reduce((s,b)=>s+b.branches.length,0)} فرع · {subData.reduce((s,b)=>s+b.branches.filter(br=>br.status==="active").length,0)} نشط
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Status legend */}
                <div className="flex items-center gap-3 text-[10px] text-gray-400 ml-2">
                  {(["active","warning","danger","expired"] as SubStatus[]).map(s=>(
                    <span key={s} className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${STATUS_CFG[s].dot}`}/>
                      {STATUS_CFG[s].label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                  <Search size={12} className="text-gray-400"/>
                  <input value={subSearch} onChange={e=>setSubSearch(e.target.value)}
                    className="text-xs text-gray-600 bg-transparent outline-none w-32" placeholder="بحث باسم الفرع..."/>
                  {subSearch && <button onClick={()=>setSubSearch("")}><X size={11} className="text-gray-400"/></button>}
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700">
                  <Plus size={12}/> إضافة فرع
                </button>
              </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label:"فروع نشطة",    v:subData.reduce((s,b)=>s+b.branches.filter(br=>br.status==="active").length,0),   cls:"text-emerald-700", bg:"bg-emerald-50 border-emerald-200" },
                { label:"تنتهي قريباً", v:subData.reduce((s,b)=>s+b.branches.filter(br=>br.status==="warning").length,0),  cls:"text-amber-700",   bg:"bg-amber-50 border-amber-200"   },
                { label:"حرجة",         v:subData.reduce((s,b)=>s+b.branches.filter(br=>br.status==="danger").length,0),   cls:"text-red-700",     bg:"bg-red-50 border-red-200"       },
                { label:"منتهية",       v:subData.reduce((s,b)=>s+b.branches.filter(br=>br.status==="expired").length,0),  cls:"text-gray-700",    bg:"bg-gray-100 border-gray-300"    },
              ].map((k,i)=>(
                <div key={i} className={`rounded-xl p-3 border text-center ${k.bg}`}>
                  <p className={`text-xl font-extrabold ${k.cls}`}>{k.v}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>

            {/* Brands accordion */}
            <div className="space-y-3">
              {filteredBrands.map(brand => {
                const open = expandBrand[brand.id] ?? false;
                const alertCount = brand.branches.filter(br=>br.status!=="active").length;
                return (
                  <div key={brand.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Brand header */}
                    <button className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors"
                      onClick={()=>setExpandBrand(p=>({...p,[brand.id]:!p[brand.id]}))}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{background:brand.color+"20"}}>
                        {brand.emoji}
                      </div>
                      <div className="flex-1 text-right">
                        <p className="font-bold text-gray-800 text-sm">{brand.name}</p>
                        <p className="text-[11px] text-gray-400">{brand.branches.length} فرع</p>
                      </div>
                      {alertCount > 0 && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={9}/>{alertCount} تنبيه
                        </span>
                      )}
                      <ChevronDown size={15} className={`text-gray-400 transition-transform ${open?"rotate-180":""}`}/>
                    </button>

                    {/* Branch rows */}
                    {open && (
                      <div>
                        <div className="grid grid-cols-6 gap-0 bg-gray-50 border-t border-b border-gray-100 px-5 py-2">
                          <p className="text-[10px] font-bold text-gray-400 col-span-2">الفرع</p>
                          <p className="text-[10px] font-bold text-gray-400 text-center">الخطة</p>
                          <p className="text-[10px] font-bold text-gray-400 text-center">الحالة</p>
                          <p className="text-[10px] font-bold text-gray-400 text-center">المدة المتبقية</p>
                          <p className="text-[10px] font-bold text-gray-400 text-center">إجراء</p>
                        </div>
                        {brand.branches.map((br,i) => {
                          const cfg = STATUS_CFG[br.status];
                          return (
                            <div key={br.id}
                              className={`grid grid-cols-6 gap-0 items-center px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 ${i%2===1?"bg-gray-50/30":""}`}>
                              {/* Branch name */}
                              <div className="col-span-2 flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{background:brand.color}}>
                                  {br.name[0]}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-gray-800">{br.name}</p>
                                  <p className="text-[10px] text-gray-400">{br.price.toLocaleString()} ر.س/شهر</p>
                                </div>
                              </div>
                              {/* Plan */}
                              <div className="text-center">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${PLAN_CLS[br.plan]}`}>
                                  {PLAN_ICON[br.plan]} {br.plan}
                                </span>
                              </div>
                              {/* Status */}
                              <div className="text-center">
                                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.cls}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
                                  {cfg.label}
                                </span>
                              </div>
                              {/* Days */}
                              <div className="text-center">
                                {br.daysLeft > 0
                                  ? <span className={`text-xs font-bold ${br.daysLeft<=30?"text-red-600":br.daysLeft<=90?"text-amber-600":"text-gray-700"}`}>{br.daysLeft} يوم</span>
                                  : <span className="text-xs font-bold text-red-600">منذ {Math.abs(br.daysLeft)} يوم</span>
                                }
                              </div>
                              {/* Actions */}
                              <div className="flex items-center justify-center gap-1.5">
                                {cfg.btnLabel && (
                                  <button onClick={()=>renewSub(brand.id, br.id)}
                                    className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg ${cfg.btnCls} hover:opacity-90`}>
                                    <RefreshCw size={9}/>{cfg.btnLabel}
                                  </button>
                                )}
                                <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                                  <ChevronRight size={12}/>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredBrands.length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  <Search size={32} className="mx-auto mb-2 opacity-30"/>
                  <p>لا توجد نتائج لـ "{subSearch}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
