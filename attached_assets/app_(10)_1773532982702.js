/* ══════════════════════════════════════════════════════════════
   ASAB Prototype v4 — Fixed & Complete
   - No 'use strict' at top level (prevents global scope issues)
   - All functions explicitly on window object
   - All 6 roles fully functional
   - All modules complete
══════════════════════════════════════════════════════════════ */

// ══════════════════════════════════════════════════════════════
//  ROLE DEFINITIONS
// ══════════════════════════════════════════════════════════════
var ROLES = {
  admin: {
    label: 'الإداري الرئيسي', icon: '🎯', avatarText: 'أد',
    userName: 'مدير النظام', defaultPage: 'admin-overview',
    nav: [
      { id:'admin-overview',      label:'نظرة عامة',        icon:'📊' },
      { id:'admin-users',         label:'المستخدمون',        icon:'👥' },
      { id:'admin-restaurants',   label:'المطاعم والفروع',   icon:'🏪' },
      { id:'admin-subscriptions', label:'الاشتراكات',        icon:'⭐' },
      { id:'admin-permissions',   label:'مصفوفة الصلاحيات', icon:'🔑' },
      { id:'admin-reports',       label:'التقارير',          icon:'📈' },
      { id:'admin-activity',      label:'سجل النشاطات',     icon:'📋' },
      { id:'admin-settings',      label:'الإعدادات',         icon:'⚙️' }
    ]
  },
  head: {
    label: 'رئيس الحسابات', icon: '👔', avatarText: 'رح',
    userName: 'خالد العمري', defaultPage: 'head-overview',
    nav: [
      { id:'head-overview',        label:'لوحة التحكم',       icon:'📊' },
      { id:'head-pending',         label:'بانتظار الاعتماد',  icon:'⏳', badge:125 },
      { id:'head-approved',        label:'المعتمدة',          icon:'✅' },
      { id:'head-rejected',        label:'المرفوضة',          icon:'❌' },
      { id:'head-sales',           label:'المبيعات',          icon:'💰', badge:15 },
      { id:'head-expenses',        label:'المصروفات',         icon:'💸', badge:18 },
      { id:'head-purchases',       label:'المشتريات',         icon:'🛒', badge:12 },
      { id:'head-inventory',       label:'المخزون',           icon:'📦', badge:3 },
      { id:'head-daily-inv',       label:'الجرد اليومي',      icon:'🔢' },
      { id:'head-waste',           label:'الهدر والتالف',     icon:'♻️', badge:13 },
      { id:'head-shifts',          label:'الشفتات',           icon:'⏰' },
      { id:'head-employees',       label:'كشف الموظفين',      icon:'👤', badge:7 },
      { id:'head-custody',         label:'العهد النقدية',     icon:'💼', badge:5 },
      { id:'head-accountants',     label:'أداء المحاسبين',    icon:'📋' },
      { id:'head-erp',             label:'التصدير لـ ERP',    icon:'🔗' },
      { id:'head-reports',         label:'التقارير',          icon:'📈' }
    ]
  },
  accountant: {
    label: 'المحاسب', icon: '💼', avatarText: 'مح',
    userName: 'أحمد محمد', defaultPage: 'acc-overview',
    nav: [
      { id:'acc-overview',  label:'لوحة التحكم',      icon:'📊' },
      { id:'acc-pending',   label:'المعلقة',           icon:'⏳', badge:28 },
      { id:'acc-approved',  label:'الموافق عليها',     icon:'✅' },
      { id:'acc-rejected',  label:'المرفوضة',          icon:'❌' },
      { id:'acc-sales',     label:'المبيعات',          icon:'💰' },
      { id:'acc-expenses',  label:'المصروفات',         icon:'💸' },
      { id:'acc-purchases', label:'المشتريات',         icon:'🛒' },
      { id:'acc-inventory', label:'المخزون',           icon:'📦' },
      { id:'acc-daily-inv', label:'الجرد اليومي',      icon:'🔢' },
      { id:'acc-waste',     label:'الهدر والتالف',     icon:'♻️' },
      { id:'acc-shifts',    label:'الشفتات',           icon:'⏰' },
      { id:'acc-employees', label:'كشف الموظفين',      icon:'👤' },
      { id:'acc-custody',   label:'العهد النقدية',     icon:'💼' },
      { id:'acc-reports',   label:'التقارير',          icon:'📈' }
    ]
  },
  branch: {
    label: 'مدير الفرع', icon: '🏪', avatarText: 'مف',
    userName: 'سلطان الغامدي', defaultPage: 'branch-overview',
    nav: [
      { id:'branch-overview',   label:'نظرة عامة',     icon:'📊' },
      { id:'branch-employees',  label:'الموظفون',       icon:'👥' },
      { id:'branch-items',      label:'الأصناف',        icon:'🍽️' },
      { id:'branch-suppliers',  label:'الموردون',       icon:'🚚' },
      { id:'branch-upload',     label:'رفع البيانات',   icon:'📤', badge:3 },
      { id:'branch-settings',   label:'الإعدادات',      icon:'⚙️' }
    ]
  },
  procurement: {
    label: 'مدير المشتريات', icon: '🛒', avatarText: 'مش',
    userName: 'فهد الحربي', defaultPage: 'proc-overview',
    nav: [
      { id:'proc-overview',  label:'لوحة التحكم',      icon:'📊' },
      { id:'proc-requests',  label:'طلبات الفروع',      icon:'📋', badge:8 },
      { id:'proc-grouped',   label:'تجميع الطلبات',     icon:'📦' },
      { id:'proc-sent',      label:'المرسلة للموردين',  icon:'📤' },
      { id:'proc-items',     label:'الأصناف والأسعار',  icon:'🏷️' },
      { id:'proc-suppliers', label:'الموردون',          icon:'🚚' },
      { id:'proc-reports',   label:'التقارير',          icon:'📈' }
    ]
  },
  supplier: {
    label: 'المورد', icon: '📦', avatarText: 'مو',
    userName: 'شركة الدواجن الذهبية', defaultPage: 'sup-overview',
    nav: [
      { id:'sup-overview',  label:'لوحة التحكم',       icon:'📊' },
      { id:'sup-new',       label:'الطلبات الجديدة',    icon:'🔔', badge:3 },
      { id:'sup-accepted',  label:'الطلبات المقبولة',   icon:'✅' },
      { id:'sup-rejected',  label:'الطلبات المرفوضة',   icon:'❌' },
      { id:'sup-items',     label:'الأصناف والأسعار',   icon:'🏷️' },
      { id:'sup-reports',   label:'التقارير',           icon:'📈' }
    ]
  }
};

// ══════════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════════
var currentRole = null;
var currentPage = null;

// ══════════════════════════════════════════════════════════════
//  CORE NAVIGATION
// ══════════════════════════════════════════════════════════════
function enterApp(roleKey) {
  currentRole = roleKey;
  var role = ROLES[roleKey];
  if (!role) { alert('دور غير معروف: ' + roleKey); return; }

  // Hide role selector
  document.getElementById('role-selector').style.display = 'none';

  // Show app
  var app = document.getElementById('app');
  app.style.display = 'flex';

  // Set user info in sidebar
  document.getElementById('user-avatar').textContent = role.avatarText;
  document.getElementById('user-name').textContent = role.userName;
  document.getElementById('user-role-label').textContent = role.label;

  // Build sidebar nav
  var nav = document.getElementById('sidebar-nav');
  nav.innerHTML = role.nav.map(function(item) {
    return '<div class="nav-item" id="nav-' + item.id + '" data-page="' + item.id + '" onclick="goTo(\'' + item.id + '\')">' +
      '<span class="nav-icon">' + item.icon + '</span>' +
      '<span class="nav-label">' + item.label + '</span>' +
      (item.badge ? '<span class="nav-badge">' + item.badge + '</span>' : '') +
      '</div>';
  }).join('');

  // Build pages
  var container = document.getElementById('pages-container');
  container.innerHTML = '';
  if (roleKey === 'admin')       buildAdminPages(container);
  else if (roleKey === 'head')        buildHeadPages(container);
  else if (roleKey === 'accountant')  buildAccountantPages(container);
  else if (roleKey === 'branch')      buildBranchPages(container);
  else if (roleKey === 'procurement') buildProcurementPages(container);
  else if (roleKey === 'supplier')    buildSupplierPages(container);

  // Navigate to default page
  goTo(role.defaultPage);
}

function goTo(pageId) {
  // Hide all pages
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }
  // Show target page
  var target = document.getElementById('page-' + pageId);
  if (target) {
    target.style.display = 'block';
    currentPage = pageId;
  }
  // Update nav active state
  var navItems = document.querySelectorAll('.nav-item');
  for (var j = 0; j < navItems.length; j++) {
    if (navItems[j].dataset.page === pageId) {
      navItems[j].classList.add('active');
    } else {
      navItems[j].classList.remove('active');
    }
  }
  // Update topbar
  if (currentRole && ROLES[currentRole]) {
    var role = ROLES[currentRole];
    var navItem = null;
    for (var k = 0; k < role.nav.length; k++) {
      if (role.nav[k].id === pageId) { navItem = role.nav[k]; break; }
    }
    if (navItem) {
      document.getElementById('topbar-title').textContent = navItem.label;
      document.getElementById('topbar-subtitle').textContent = role.label + ' — نظام ASAB';
    }
  }
  window.scrollTo(0, 0);
}

function logout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('role-selector').style.display = 'flex';
  currentRole = null;
  currentPage = null;
}

function switchTab(containerId, tabName) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var tabs = container.querySelectorAll('.tab');
  var contents = container.querySelectorAll('.tab-content');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.toggle('active', tabs[i].dataset.tab === tabName);
  }
  for (var j = 0; j < contents.length; j++) {
    contents[j].classList.toggle('active', contents[j].dataset.tab === tabName);
  }
}

function openModal(title, content, size) {
  size = size || 'md';
  var widths = { sm: '480px', md: '680px', lg: '860px', xl: '1040px' };
  var overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(3px);';
  overlay.innerHTML = '<div style="background:#fff;border-radius:14px;width:100%;max-width:' + widths[size] + ';max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.25);">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #E8EDF7;position:sticky;top:0;background:#fff;z-index:1;border-radius:14px 14px 0 0;">' +
    '<div style="font-size:15px;font-weight:700;color:#0D1B36;">' + title + '</div>' +
    '<button onclick="this.closest(\'[style*=fixed]\').remove()" style="background:none;border:none;cursor:pointer;font-size:20px;color:#6B7A99;line-height:1;padding:2px 6px;border-radius:6px;" onmouseover="this.style.background=\'#F1F5FB\'" onmouseout="this.style.background=\'none\'">×</button>' +
    '</div>' +
    '<div style="padding:24px;">' + content + '</div>' +
    '</div>';
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ══════════════════════════════════════════════════════════════
//  HTML HELPER FUNCTIONS
// ══════════════════════════════════════════════════════════════
function page(id, content) {
  return '<div id="page-' + id + '" class="page content-area" style="display:none;">' + content + '</div>';
}

function pageHeader(title, subtitle, actions) {
  actions = actions || '';
  return '<div class="page-header">' +
    '<div><h1 class="page-title">' + title + '</h1>' +
    (subtitle ? '<div class="page-subtitle">' + subtitle + '</div>' : '') +
    '</div>' +
    (actions ? '<div class="page-header-actions">' + actions + '</div>' : '') +
    '</div>';
}

function kpiCard(title, value, subtitle, color, icon, delta) {
  delta = delta || '';
  var colors = {
    blue:   { bar: '#2563EB', bg: '#EFF6FF', icon: '#DBEAFE', text: '#1D4ED8' },
    green:  { bar: '#059669', bg: '#ECFDF5', icon: '#D1FAE5', text: '#065F46' },
    orange: { bar: '#D97706', bg: '#FFFBEB', icon: '#FDE68A', text: '#92400E' },
    red:    { bar: '#DC2626', bg: '#FEF2F2', icon: '#FECACA', text: '#991B1B' },
    purple: { bar: '#7C3AED', bg: '#F5F3FF', icon: '#DDD6FE', text: '#5B21B6' },
    teal:   { bar: '#0891B2', bg: '#F0F9FF', icon: '#BAE6FD', text: '#0C4A6E' }
  };
  var c = colors[color] || colors.blue;
  var deltaHtml = delta ? '<span style="font-size:11px;font-weight:600;color:' + (delta.startsWith('+') ? '#059669' : '#DC2626') + ';background:' + (delta.startsWith('+') ? '#ECFDF5' : '#FEF2F2') + ';padding:2px 7px;border-radius:10px;margin-right:6px;">' + delta + '</span>' : '';
  return '<div class="kpi-card" style="border-top:3px solid ' + c.bar + ';">' +
    '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">' +
    '<div style="width:38px;height:38px;background:' + c.icon + ';border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;">' + icon + '</div>' +
    (delta ? '<span style="font-size:11px;font-weight:600;color:' + (delta.startsWith('+') ? '#059669' : '#DC2626') + ';background:' + (delta.startsWith('+') ? '#ECFDF5' : '#FEF2F2') + ';padding:2px 7px;border-radius:10px;">' + delta + '</span>' : '') +
    '</div>' +
    '<div style="font-size:26px;font-weight:800;color:#0D1B36;line-height:1;margin-bottom:4px;">' + value + '</div>' +
    '<div style="font-size:12.5px;font-weight:600;color:#374151;margin-bottom:2px;">' + title + '</div>' +
    '<div style="font-size:11.5px;color:#6B7A99;">' + subtitle + '</div>' +
    '</div>';
}

function card(title, body, actions) {
  actions = actions || '';
  return '<div class="card">' +
    '<div class="card-header">' +
    '<div class="card-title">' + title + '</div>' +
    (actions ? '<div class="card-actions">' + actions + '</div>' : '') +
    '</div>' +
    '<div class="card-body">' + body + '</div>' +
    '</div>';
}

function filterBar(items) {
  return '<div class="filter-bar">' + items + '</div>';
}

function badge(text, type) {
  return '<span class="badge badge-' + (type || 'info') + '">' + text + '</span>';
}

function statusBadge(status) {
  var map = {
    'متطابق':      'success',
    'معتمد':       'success',
    'مكتمل':       'success',
    'يحتاج مراجعة':'warning',
    'معلق':        'warning',
    'فرق بسيط':   'warning',
    'مرفوض':      'danger',
    'خطأ':        'danger',
    'جديد':       'info',
    'مرسل':       'info'
  };
  return badge(status, map[status] || 'info');
}

function opCard(module, branch, opsCount, time, matchStatus, filesCount, pageId) {
  pageId = pageId || '';
  var statusColors = {
    'متطابق':      '#059669',
    'يحتاج مراجعة':'#D97706',
    'فرق بسيط':   '#D97706',
    'مرفوض':      '#DC2626'
  };
  var sc = statusColors[matchStatus] || '#6B7A99';
  return '<div class="op-card">' +
    '<div class="op-card-header">' +
    '<div>' +
    '<div style="font-size:11px;color:#6B7A99;margin-bottom:2px;">' + module + '</div>' +
    '<div style="font-size:13.5px;font-weight:700;color:#0D1B36;">' + branch + '</div>' +
    '</div>' +
    '<span style="font-size:11px;font-weight:700;color:' + sc + ';background:' + sc + '18;padding:3px 10px;border-radius:20px;border:1px solid ' + sc + '30;">' + matchStatus + '</span>' +
    '</div>' +
    '<div class="op-card-meta">' +
    '<span>📋 ' + opsCount + ' عملية</span>' +
    '<span>📎 ' + filesCount + ' ملف</span>' +
    '<span>🕐 ' + time + '</span>' +
    '</div>' +
    '<div class="op-card-actions">' +
    '<button class="btn btn-sm btn-primary" onclick="showOpDetail(\'' + branch + '\',\'' + module + '\')">مراجعة</button>' +
    '<button class="btn btn-sm btn-success">✅ اعتماد</button>' +
    '<button class="btn btn-sm btn-danger">❌ رفض</button>' +
    '</div>' +
    '</div>';
}

function dataTable(headers, rows) {
  return '<div class="table-wrap">' +
    '<table class="data-table">' +
    '<thead><tr>' + headers.map(function(h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead>' +
    '<tbody>' + rows.map(function(r) { return '<tr>' + r.map(function(c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>' +
    '</table></div>';
}

function alertBox(type, msg) {
  var icons = { success:'✅', warning:'⚠️', danger:'🚨', info:'ℹ️' };
  return '<div class="alert alert-' + type + '">' + icons[type] + ' ' + msg + '</div>';
}

// ══════════════════════════════════════════════════════════════
//  MODAL ACTIONS
// ══════════════════════════════════════════════════════════════
function showAppsBreakdown() {
  openModal('تفاصيل مبيعات تطبيقات التوصيل', 
    '<div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);">' +
    kpiCard('هنقرستيشن', '58', 'طلب', 'orange', '🍔') +
    kpiCard('كريم فود', '42', 'طلب', 'green', '🚗') +
    kpiCard('جاهز', '28', 'طلب', 'blue', '📱') +
    kpiCard('مرسول', '14', 'طلب', 'purple', '🛵') +
    '</div>' +
    '<div style="margin-top:20px;">' +
    dataTable(
      ['التطبيق','عدد الطلبات','المبلغ الإجمالي','متوسط الطلب','نسبة العمولة','صافي المبلغ'],
      [
        ['🍔 هنقرستيشن','58','2,030 ر.س','35 ر.س','15%','1,725.5 ر.س'],
        ['🚗 كريم فود','42','1,470 ر.س','35 ر.س','18%','1,205.4 ر.س'],
        ['📱 جاهز','28','980 ر.س','35 ر.س','12%','862.4 ر.س'],
        ['🛵 مرسول','14','490 ر.س','35 ر.س','10%','441 ر.س']
      ]
    ) + '</div>', 'lg');
}

function showExpenseDetail(branch) {
  openModal('تفاصيل مصروفات — ' + branch,
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">' +
    kpiCard('إجمالي الفواتير', '12', 'فاتورة', 'blue', '📄') +
    kpiCard('إجمالي المبلغ', '3,450 ر.س', 'هذا اليوم', 'orange', '💸') +
    kpiCard('أعلى بند', '1,200 ر.س', 'صيانة', 'red', '🔧') +
    '</div>' +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['#','البند','الفئة','المبلغ','المورد/الجهة','الفاتورة','الحالة'],
      [
        ['1','صيانة مكيف','صيانة','1,200 ر.س','شركة البرودة','INV-001',statusBadge('متطابق')],
        ['2','مواد تنظيف','مستلزمات','450 ر.س','مستودع الأمانة','INV-002',statusBadge('متطابق')],
        ['3','رسوم إيجار','إيجار','800 ر.س','مالك العقار','INV-003',statusBadge('يحتاج مراجعة')],
        ['4','فاتورة كهرباء','مرافق','320 ر.س','شركة الكهرباء','INV-004',statusBadge('متطابق')],
        ['5','مستلزمات مطبخ','مستلزمات','280 ر.س','مستودع الأمانة','INV-005',statusBadge('متطابق')],
        ['6','رسوم نظافة','خدمات','180 ر.س','بلدية المنطقة','INV-006',statusBadge('متطابق')],
        ['7','إصلاح ثلاجة','صيانة','220 ر.س','تقنية التبريد','INV-007',statusBadge('فرق بسيط')]
      ]
    ) + '</div>', 'xl');
}

function showPurchaseDetail(branch, supplier) {
  openModal('تفاصيل مشتريات — ' + branch + ' | ' + supplier,
    alertBox('info', 'مطابقة ثلاثية: أمر الشراء ✔ | فاتورة المورد ✔ | إذن الاستلام ✔') +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['الصنف','الوحدة','الكمية المطلوبة','الكمية المستلمة','سعر الوحدة','الإجمالي','الفرق','الحالة'],
      [
        ['دجاج مجمد كامل','كجم','50','50','18 ر.س','900 ر.س','0',statusBadge('متطابق')],
        ['دجاج مجمد قطع','كجم','30','28','22 ر.س','616 ر.س','2 كجم',statusBadge('فرق بسيط')],
        ['دجاج طازج','كجم','20','20','25 ر.س','500 ر.س','0',statusBadge('متطابق')],
        ['زيت نباتي','لتر','10','10','12 ر.س','120 ر.س','0',statusBadge('متطابق')]
      ]
    ) + '</div>' +
    '<div style="margin-top:16px;padding:14px;background:#F8FAFD;border-radius:10px;border:1px solid #E8EDF7;">' +
    '<div style="font-size:12px;font-weight:700;color:#6B7A99;margin-bottom:8px;">ملاحظات المطابقة</div>' +
    '<div style="font-size:13px;color:#374151;">فرق في كمية الدجاج المجمد قطع: 2 كجم. تم إشعار المورد. في انتظار تسوية الفرق أو إصدار إشعار دائن.</div>' +
    '</div>', 'xl');
}

function showInventoryDetail(branch) {
  openModal('تفاصيل المخزون — ' + branch,
    alertBox('warning', '3 أصناف تحت الحد الأدنى — يُنصح بإصدار طلب شراء فوري') +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['الصنف','الوحدة','رصيد الشهر السابق','المشتريات','المبيعات','الهدر','الرصيد الحالي','الحد الأدنى','الحالة'],
      [
        ['دجاج مجمد','كجم','120','50','145','5','20','30','<span style="color:#DC2626;font-weight:700;">⚠️ منخفض</span>'],
        ['زيت نباتي','لتر','40','20','35','2','23','10','<span style="color:#059669;">✅ طبيعي</span>'],
        ['أرز','كجم','80','30','75','3','32','20','<span style="color:#059669;">✅ طبيعي</span>'],
        ['بهارات','كجم','15','5','18','1','1','5','<span style="color:#DC2626;font-weight:700;">⚠️ منخفض</span>'],
        ['عبوات تغليف','قطعة','500','200','620','10','70','100','<span style="color:#DC2626;font-weight:700;">⚠️ منخفض</span>']
      ]
    ) + '</div>', 'xl');
}

function showWasteDetail(branch) {
  openModal('تفاصيل الهدر والتالف — ' + branch,
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">' +
    kpiCard('إجمالي الهدر', '23 كجم', 'هذا اليوم', 'orange', '♻️') +
    kpiCard('هدر موظفين', '8 كجم', '35%', 'red', '👤') +
    kpiCard('هدر مطعم', '15 كجم', '65%', 'blue', '🏪') +
    '</div>' +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['الصنف','الكمية','سبب الهدر','المسؤولية','الموظف','الوقت','الإجراء'],
      [
        ['دجاج مجمد','5 كجم','انتهاء صلاحية','مطعم','-','08:30',badge('قيد المراجعة','warning')],
        ['خبز','3 كجم','تلف أثناء التخزين','مطعم','-','09:15',badge('موثق','success')],
        ['صلصة','2 لتر','سقوط وكسر','موظف','محمد علي','10:00',badge('خصم محتمل','danger')],
        ['أرز','4 كجم','طبخ زائد','مطعم','-','12:30',badge('موثق','success')],
        ['زيت','3 لتر','انتهاء صلاحية','مطعم','-','14:00',badge('قيد المراجعة','warning')]
      ]
    ) + '</div>', 'xl');
}

function showEmployeeHistory(name) {
  openModal('سجل معاملات الموظف — ' + name,
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">' +
    kpiCard('الراتب الأساسي', '3,000 ر.س', 'شهرياً', 'blue', '💰') +
    kpiCard('إجمالي الخصومات', '140 ر.س', 'هذا الشهر', 'red', '➖') +
    kpiCard('صافي الراتب', '3,640 ر.س', 'بعد البدلات والخصومات', 'green', '✅') +
    '</div>' +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['التاريخ','نوع المعاملة','المبلغ','السبب','المعتمد من','الحالة'],
      [
        ['01/03/2026','راتب أساسي','+3,000 ر.س','-','رئيس الحسابات',statusBadge('معتمد')],
        ['05/03/2026','بدل مواصلات','+400 ر.س','بدل شهري','رئيس الحسابات',statusBadge('معتمد')],
        ['05/03/2026','بدل سكن','+300 ر.س','بدل شهري','رئيس الحسابات',statusBadge('معتمد')],
        ['10/03/2026','خصم تأخر','-80 ر.س','تأخر 3 مرات','مدير الفرع',statusBadge('معتمد')],
        ['12/03/2026','خصم غياب','-60 ر.س','غياب يوم','مدير الفرع',statusBadge('معتمد')]
      ]
    ) + '</div>', 'lg');
}

function showCustodyHistory(branch) {
  openModal('سجل العهدة النقدية — ' + branch,
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">' +
    kpiCard('العهدة المفتوحة', '500 ر.س', 'رصيد افتتاح', 'blue', '💼') +
    kpiCard('المصروف منها', '320 ر.س', 'هذا الشهر', 'orange', '💸') +
    kpiCard('الرصيد المتبقي', '180 ر.س', 'للتسوية', 'green', '✅') +
    '</div>' +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['التاريخ','البيان','نوع الحركة','المبلغ','الرصيد بعد','الموثق','الحالة'],
      [
        ['01/03/2026','رصيد افتتاح','إيداع','+500 ر.س','500 ر.س','رئيس الحسابات',statusBadge('معتمد')],
        ['03/03/2026','شراء مستلزمات','صرف','-120 ر.س','380 ر.س','مدير الفرع',statusBadge('معتمد')],
        ['07/03/2026','إصلاح طارئ','صرف','-80 ر.س','300 ر.س','مدير الفرع',statusBadge('معتمد')],
        ['10/03/2026','مواد تنظيف','صرف','-60 ر.س','240 ر.س','مدير الفرع',statusBadge('معتمد')],
        ['14/03/2026','مصاريف متنوعة','صرف','-60 ر.س','180 ر.س','مدير الفرع',statusBadge('معتمد')]
      ]
    ) + '</div>' +
    '<div style="margin-top:16px;text-align:left;">' +
    '<button class="btn btn-primary" style="margin-left:8px;">💰 تسوية العهدة</button>' +
    '<button class="btn btn-ghost">📥 تصدير Excel</button>' +
    '</div>', 'lg');
}

function showOpDetail(branch, module) {
  openModal('تفاصيل العملية — ' + branch + ' | ' + module,
    '<div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">' +
    kpiCard('عدد العمليات', '12', 'عملية', 'blue', '📋') +
    kpiCard('الملفات المرفقة', '5', 'ملف', 'green', '📎') +
    kpiCard('حالة المطابقة', 'متطابق', '100%', 'green', '✅') +
    '</div>' +
    '<div style="margin-top:16px;">' +
    dataTable(
      ['#','نوع العملية','المبلغ','الوقت','الحالة','الإجراء'],
      [
        ['1','مبيعات نقدي','1,200 ر.س','08:00 - 14:00',statusBadge('متطابق'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
        ['2','مبيعات بطاقة','850 ر.س','08:00 - 14:00',statusBadge('متطابق'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
        ['3','مصروفات','320 ر.س','10:30',statusBadge('يحتاج مراجعة'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
        ['4','مشتريات','1,500 ر.س','09:00',statusBadge('متطابق'),'<button class="btn btn-sm btn-ghost">عرض</button>']
      ]
    ) + '</div>', 'lg');
}

function lookupEmployee() {
  var input = document.getElementById('emp-search-input');
  if (!input) return;
  var val = input.value.trim();
  if (!val) return;
  var result = document.getElementById('emp-search-result');
  if (result) {
    result.innerHTML = '<div style="padding:16px;background:#F8FAFD;border-radius:10px;border:1px solid #E8EDF7;margin-top:12px;">' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">' +
      '<div><div style="font-size:11px;color:#6B7A99;">اسم الموظف</div><div style="font-weight:700;">محمد أحمد السالم</div></div>' +
      '<div><div style="font-size:11px;color:#6B7A99;">رقم الموظف</div><div style="font-weight:700;">' + val + '</div></div>' +
      '<div><div style="font-size:11px;color:#6B7A99;">الفرع</div><div style="font-weight:700;">فرع الملز</div></div>' +
      '<div><div style="font-size:11px;color:#6B7A99;">المسمى الوظيفي</div><div style="font-weight:700;">كاشير</div></div>' +
      '<div><div style="font-size:11px;color:#6B7A99;">الراتب الأساسي</div><div style="font-weight:700;">3,000 ر.س</div></div>' +
      '<div><div style="font-size:11px;color:#6B7A99;">الحالة</div><div>' + badge('نشط','success') + '</div></div>' +
      '</div>' +
      '<div style="margin-top:12px;display:flex;gap:8px;">' +
      '<button class="btn btn-sm btn-primary" onclick="showEmployeeHistory(\'محمد أحمد السالم\')">📋 عرض السجل الكامل</button>' +
      '<button class="btn btn-sm btn-ghost">✏️ تعديل</button>' +
      '</div>' +
      '</div>';
  }
}

// ══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ══════════════════════════════════════════════════════════════
function buildAdminPages(container) {
  container.innerHTML +=
    page('admin-overview',      buildAdminOverview()) +
    page('admin-users',         buildAdminUsers()) +
    page('admin-restaurants',   buildAdminRestaurants()) +
    page('admin-subscriptions', buildAdminSubscriptions()) +
    page('admin-permissions',   buildAdminPermissions()) +
    page('admin-reports',       buildAdminReports()) +
    page('admin-activity',      buildAdminActivity()) +
    page('admin-settings',      buildAdminSettings());
}

function buildAdminOverview() {
  return pageHeader('لوحة تحكم الإداري الرئيسي', 'نظرة شاملة على النظام — جميع الفروع والمستخدمين') +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العمليات اليوم', '1,245', 'عبر جميع الفروع', 'blue', '📋') +
    kpiCard('عمليات معتمدة', '1,120', 'اعتماد نهائي', 'green', '✅', '+90%') +
    kpiCard('بانتظار الاعتماد', '125', 'عملية معلقة', 'orange', '⏳') +
    kpiCard('عمليات مرفوضة', '85', 'هذا الشهر', 'red', '❌') +
    kpiCard('الفروع النشطة', '100', 'فرع مفعّل', 'blue', '🏪') +
    kpiCard('المستخدمون النشطون', '250', 'مستخدم', 'green', '👥') +
    '</div>' +
    '<div class="grid-2">' +
    card('📊 ملخص حالة النظام',
      dataTable(
        ['الموديول','إجمالي العمليات','معتمدة','معلقة','مرفوضة'],
        [
          ['💰 المبيعات','320','310','8','2'],
          ['💸 المصروفات','280','255','18','7'],
          ['🛒 المشتريات','210','195','12','3'],
          ['📦 المخزون','185','179','3','3'],
          ['♻️ الهدر','150','137','13','0'],
          ['⏰ الشفتات','100','100','0','0']
        ]
      )
    ) +
    card('🔔 تنبيهات النظام',
      alertBox('danger', '3 فروع لم ترفع بيانات اليوم') +
      alertBox('warning', '18 عملية مصروفات تجاوزت 24 ساعة دون اعتماد') +
      alertBox('warning', '5 اشتراكات تنتهي خلال 7 أيام') +
      alertBox('info', '12 مستخدم جديد في انتظار التفعيل')
    ) +
    '</div>' +
    '<div class="grid-2">' +
    card('📈 نشاط الفروع — أعلى 5',
      dataTable(
        ['الفرع','العمليات','معدل الاعتماد','آخر رفع'],
        [
          ['فرع الملز','145','98%','منذ ساعة'],
          ['فرع النزهة','132','95%','منذ 2 ساعة'],
          ['فرع العليا','128','97%','منذ 30 دقيقة'],
          ['فرع الروضة','119','92%','منذ 3 ساعات'],
          ['فرع السليمانية','115','96%','منذ ساعة']
        ]
      )
    ) +
    card('🏢 توزيع الاشتراكات',
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
      [
        { plan:'Enterprise', count:12, pct:48, color:'#2563EB' },
        { plan:'Professional', count:8, pct:32, color:'#059669' },
        { plan:'Starter', count:5, pct:20, color:'#D97706' }
      ].map(function(p) {
        return '<div>' +
          '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">' +
          '<span style="font-size:12.5px;font-weight:600;">' + p.plan + '</span>' +
          '<span style="font-size:12px;color:#6B7A99;">' + p.count + ' عميل (' + p.pct + '%)</span>' +
          '</div>' +
          '<div class="progress-bar"><div class="progress-fill" style="width:' + p.pct + '%;background:' + p.color + ';"></div></div>' +
          '</div>';
      }).join('') +
      '</div>'
    ) +
    '</div>';
}

function buildAdminUsers() {
  return pageHeader('إدارة المستخدمين', 'إضافة وتعديل وإدارة صلاحيات جميع المستخدمين',
    '<button class="btn btn-primary" onclick="showAddUserModal()">+ إضافة مستخدم</button>') +
    filterBar(
      '<span class="filter-label">الدور:</span>' +
      '<select class="filter-select"><option>جميع الأدوار</option><option>رئيس حسابات</option><option>محاسب</option><option>مدير فرع</option></select>' +
      '<span class="filter-label">الحالة:</span>' +
      '<select class="filter-select"><option>الكل</option><option>نشط</option><option>موقوف</option></select>' +
      '<input type="text" class="filter-input" placeholder="بحث بالاسم أو الإيميل..." style="width:220px;">' +
      '<button class="btn btn-sm btn-primary">بحث</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    card('قائمة المستخدمين',
      dataTable(
        ['#','الاسم','الدور','الفروع المخصصة','الموديولات','آخر دخول','الحالة','إجراءات'],
        [
          ['1','خالد العمري','رئيس الحسابات','جميع الفروع','جميع الموديولات','منذ ساعة',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>'],
          ['2','أحمد محمد','محاسب','فرع الملز، النزهة','مبيعات، مصروفات، مشتريات','منذ 2 ساعة',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>'],
          ['3','سلطان الغامدي','مدير فرع','فرع الملز','رفع البيانات فقط','منذ 30 دقيقة',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>'],
          ['4','فهد الحربي','مدير مشتريات','جميع الفروع','المشتريات فقط','أمس',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>'],
          ['5','ناصر القحطاني','محاسب','فرع العليا، الروضة','مبيعات، مصروفات','منذ 3 ساعات',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>'],
          ['6','عبدالله الشمري','محاسب','فرع السليمانية','جميع الموديولات','منذ يومين',badge('موقوف','danger'),'<button class="btn btn-sm btn-ghost">✏️</button> <button class="btn btn-sm btn-ghost">🔑</button>']
        ]
      )
    );
}

function showAddUserModal() {
  openModal('إضافة مستخدم جديد',
    '<div class="form-row-3">' +
    '<div class="form-group"><label class="form-label">الاسم الكامل</label><input class="form-input" placeholder="أدخل الاسم الكامل"></div>' +
    '<div class="form-group"><label class="form-label">البريد الإلكتروني</label><input class="form-input" placeholder="user@asab.com"></div>' +
    '<div class="form-group"><label class="form-label">رقم الجوال</label><input class="form-input" placeholder="05xxxxxxxx"></div>' +
    '</div>' +
    '<div class="form-row-3" style="margin-top:14px;">' +
    '<div class="form-group"><label class="form-label">الدور</label><select class="form-input"><option>رئيس الحسابات</option><option>محاسب</option><option>مدير فرع</option><option>مدير مشتريات</option></select></div>' +
    '<div class="form-group"><label class="form-label">الفروع المخصصة</label><select class="form-input"><option>جميع الفروع</option><option>فرع الملز</option><option>فرع النزهة</option></select></div>' +
    '<div class="form-group"><label class="form-label">كلمة المرور</label><input class="form-input" type="password" placeholder="كلمة مرور قوية"></div>' +
    '</div>' +
    '<div style="margin-top:16px;">' +
    '<div style="font-size:12.5px;font-weight:700;color:#374151;margin-bottom:10px;">الموديولات المسموح بها:</div>' +
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">' +
    ['المبيعات','المصروفات','المشتريات','المخزون','الجرد اليومي','الهدر','الشفتات','كشف الموظفين','العهد النقدية'].map(function(m) {
      return '<label style="display:flex;align-items:center;gap:6px;font-size:12.5px;cursor:pointer;"><input type="checkbox" checked> ' + m + '</label>';
    }).join('') +
    '</div>' +
    '</div>' +
    '<div style="margin-top:20px;display:flex;gap:8px;justify-content:flex-end;">' +
    '<button class="btn btn-primary">💾 حفظ المستخدم</button>' +
    '<button class="btn btn-ghost" onclick="this.closest(\'[style*=fixed]\').remove()">إلغاء</button>' +
    '</div>', 'lg');
}

function buildAdminRestaurants() {
  return pageHeader('المطاعم والفروع', 'إدارة جميع المطاعم والفروع المسجلة في النظام',
    '<button class="btn btn-primary">+ إضافة مطعم</button>') +
    filterBar(
      '<span class="filter-label">المدينة:</span>' +
      '<select class="filter-select"><option>جميع المدن</option><option>الرياض</option><option>جدة</option><option>الدمام</option></select>' +
      '<span class="filter-label">الحالة:</span>' +
      '<select class="filter-select"><option>الكل</option><option>نشط</option><option>موقوف</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>'
    ) +
    card('قائمة المطاعم والفروع',
      dataTable(
        ['#','اسم المطعم','عدد الفروع','المدينة','المحاسب المخصص','الاشتراك','الحالة','إجراءات'],
        [
          ['1','مطعم الأصيل','12','الرياض','أحمد محمد','Enterprise',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['2','مطعم الوليمة','8','جدة','ناصر القحطاني','Professional',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['3','مطعم البيت','6','الدمام','عبدالله الشمري','Starter',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['4','مطعم الضيافة','5','الرياض','أحمد محمد','Professional',badge('موقوف','danger'),'<button class="btn btn-sm btn-ghost">عرض</button>']
        ]
      )
    );
}

function buildAdminSubscriptions() {
  return pageHeader('الاشتراكات', 'إدارة خطط الاشتراك والتجديدات') +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العملاء', '25', 'عميل نشط', 'blue', '🏢') +
    kpiCard('إيرادات الشهر', '125,000 ر.س', 'اشتراكات', 'green', '💰', '+12%') +
    kpiCard('تنتهي قريباً', '5', 'خلال 7 أيام', 'orange', '⏰') +
    kpiCard('اشتراكات موقوفة', '2', 'بحاجة متابعة', 'red', '⚠️') +
    '</div>' +
    card('قائمة الاشتراكات',
      dataTable(
        ['العميل','الخطة','الفروع','تاريخ البدء','تاريخ الانتهاء','القيمة الشهرية','الحالة','إجراءات'],
        [
          ['مطعم الأصيل','Enterprise','12 فرع','01/01/2026','31/12/2026','8,500 ر.س',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">تجديد</button>'],
          ['مطعم الوليمة','Professional','8 فروع','01/02/2026','31/01/2027','5,200 ر.س',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">تجديد</button>'],
          ['مطعم البيت','Starter','6 فروع','15/03/2025','14/03/2026','2,800 ر.س',badge('ينتهي قريباً','warning'),'<button class="btn btn-sm btn-primary">تجديد</button>']
        ]
      )
    );
}

function buildAdminPermissions() {
  return pageHeader('مصفوفة الصلاحيات', 'تحكم كامل في صلاحيات كل دور على كل موديول') +
    card('مصفوفة الصلاحيات — عرض / إضافة / تعديل / حذف / اعتماد',
      '<div style="overflow-x:auto;">' +
      '<table class="data-table">' +
      '<thead><tr><th>الموديول</th><th>الإداري</th><th>رئيس الحسابات</th><th>المحاسب</th><th>مدير الفرع</th><th>مدير المشتريات</th><th>المورد</th></tr></thead>' +
      '<tbody>' +
      [
        ['المبيعات','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['المصروفات','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['المشتريات','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','✅ كامل','📋 استلام'],
        ['المخزون','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['الجرد اليومي','✅ كامل','✅ كامل','👁️ عرض فقط','📤 رفع فقط','❌','❌'],
        ['الهدر والتالف','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['الشفتات','✅ كامل','✅ كامل','👁️ عرض فقط','📤 رفع فقط','❌','❌'],
        ['كشف الموظفين','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['العهد النقدية','✅ كامل','✅ كامل','👁️ عرض + مراجعة','📤 رفع فقط','❌','❌'],
        ['إدارة المستخدمين','✅ كامل','❌','❌','❌','❌','❌'],
        ['الاشتراكات','✅ كامل','❌','❌','❌','❌','❌']
      ].map(function(r) {
        return '<tr>' + r.map(function(c, i) {
          return '<td style="' + (i === 0 ? 'font-weight:600;' : 'text-align:center;') + '">' + c + '</td>';
        }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>'
    );
}

function buildAdminReports() {
  return pageHeader('التقارير', 'تقارير شاملة على مستوى النظام') +
    filterBar(
      '<span class="filter-label">الفترة:</span>' +
      '<select class="filter-select"><option>مارس 2026</option><option>فبراير 2026</option></select>' +
      '<span class="filter-label">المطعم:</span>' +
      '<select class="filter-select"><option>جميع المطاعم</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>' +
      '<button class="btn btn-sm btn-ghost">📄 PDF</button>'
    ) +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العمليات', '12,450', 'هذا الشهر', 'blue', '📋') +
    kpiCard('معدل الاعتماد', '94.2%', 'من الإجمالي', 'green', '✅', '+2.1%') +
    kpiCard('متوسط وقت الاعتماد', '4.2 ساعة', 'لكل عملية', 'orange', '⏱️') +
    kpiCard('العمليات المرفوضة', '723', 'هذا الشهر', 'red', '❌') +
    '</div>' +
    '<div class="grid-2">' +
    card('📊 أداء المحاسبين',
      dataTable(
        ['المحاسب','الفروع','العمليات','معتمدة','مرفوضة','معدل الاعتماد','متوسط الوقت'],
        [
          ['أحمد محمد','5 فروع','1,245','1,180','65','94.8%','3.8 ساعة'],
          ['ناصر القحطاني','4 فروع','980','920','60','93.9%','4.5 ساعة'],
          ['عبدالله الشمري','3 فروع','756','698','58','92.3%','5.1 ساعة']
        ]
      )
    ) +
    card('📈 العمليات الأسبوعية',
      '<div class="bar-chart">' +
      [420, 385, 510, 445, 490, 380, 520].map(function(v, i) {
        return '<div class="bar-item ' + (i === 6 ? 'accent' : '') + '" style="height:' + Math.round(v/6) + '%;" title="' + v + ' عملية"></div>';
      }).join('') +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#6B7A99;">' +
      ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'].map(function(d) { return '<span>' + d + '</span>'; }).join('') +
      '</div>'
    ) +
    '</div>';
}

function buildAdminActivity() {
  return pageHeader('سجل النشاطات', 'سجل كامل لجميع الأحداث والتغييرات في النظام') +
    filterBar(
      '<span class="filter-label">النوع:</span>' +
      '<select class="filter-select"><option>جميع الأحداث</option><option>تسجيل دخول</option><option>اعتماد</option><option>رفض</option><option>تعديل</option></select>' +
      '<span class="filter-label">المستخدم:</span>' +
      '<select class="filter-select"><option>الكل</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">بحث</button>'
    ) +
    card('سجل النشاطات',
      dataTable(
        ['الوقت','المستخدم','الدور','الحدث','التفاصيل','IP'],
        [
          ['09:45','خالد العمري','رئيس الحسابات','اعتماد عملية','مبيعات — فرع الملز — 12 عملية','192.168.1.10'],
          ['09:32','أحمد محمد','محاسب','رفع بيانات','مصروفات — فرع النزهة','192.168.1.15'],
          ['09:20','مدير النظام','إداري','إضافة مستخدم','تم إضافة: ناصر القحطاني','192.168.1.1'],
          ['09:10','خالد العمري','رئيس الحسابات','رفض عملية','مشتريات — فرع العليا — فرق في الكميات','192.168.1.10'],
          ['08:55','سلطان الغامدي','مدير فرع','رفع ملف','جدول الشفتات — فرع الملز','192.168.1.22'],
          ['08:40','فهد الحربي','مدير مشتريات','إرسال طلب','طلب شراء — شركة الدواجن الذهبية','192.168.1.18']
        ]
      )
    );
}

function buildAdminSettings() {
  return pageHeader('إعدادات النظام', 'تكوين الإعدادات العامة للنظام') +
    '<div class="grid-2">' +
    card('⚙️ الإعدادات العامة',
      '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div class="form-group"><label class="form-label">اسم النظام</label><input class="form-input" value="نظام عصب ASAB"></div>' +
      '<div class="form-group"><label class="form-label">العملة الافتراضية</label><select class="form-input"><option>ريال سعودي (SAR)</option></select></div>' +
      '<div class="form-group"><label class="form-label">المنطقة الزمنية</label><select class="form-input"><option>Asia/Riyadh (GMT+3)</option></select></div>' +
      '<div class="form-group"><label class="form-label">لغة النظام</label><select class="form-input"><option>العربية</option><option>English</option></select></div>' +
      '<button class="btn btn-primary">💾 حفظ الإعدادات</button>' +
      '</div>'
    ) +
    card('🔗 إعدادات ERP',
      '<div style="display:flex;flex-direction:column;gap:14px;">' +
      '<div class="form-group"><label class="form-label">نوع نظام ERP</label><select class="form-input"><option>SAP</option><option>Oracle</option><option>Microsoft Dynamics</option></select></div>' +
      '<div class="form-group"><label class="form-label">رابط API</label><input class="form-input" placeholder="https://erp.company.com/api"></div>' +
      '<div class="form-group"><label class="form-label">مفتاح API</label><input class="form-input" type="password" placeholder="••••••••••••"></div>' +
      alertBox('success', 'الاتصال بـ ERP يعمل بشكل صحيح') +
      '<button class="btn btn-primary">💾 حفظ إعدادات ERP</button>' +
      '</div>'
    ) +
    '</div>';
}

// ══════════════════════════════════════════════════════════════
//  HEAD ACCOUNTANT PAGES
// ══════════════════════════════════════════════════════════════
function buildHeadPages(container) {
  container.innerHTML +=
    page('head-overview',    buildHeadOverview()) +
    page('head-pending',     buildHeadPending()) +
    page('head-approved',    buildHeadApproved()) +
    page('head-rejected',    buildHeadRejected()) +
    page('head-sales',       buildSalesModule('head')) +
    page('head-expenses',    buildExpensesModule('head')) +
    page('head-purchases',   buildPurchasesModule('head')) +
    page('head-inventory',   buildInventoryModule('head')) +
    page('head-daily-inv',   buildDailyInvModule('head')) +
    page('head-waste',       buildWasteModule('head')) +
    page('head-shifts',      buildShiftsModule('head')) +
    page('head-employees',   buildEmployeesModule('head')) +
    page('head-custody',     buildCustodyModule('head')) +
    page('head-accountants', buildHeadAccountants()) +
    page('head-erp',         buildHeadERP()) +
    page('head-reports',     buildHeadReports());
}

function buildHeadOverview() {
  return pageHeader('لوحة تحكم رئيس الحسابات', 'مراجعة ومتابعة جميع العمليات المالية — جميع الفروع',
    '<button class="btn btn-primary" onclick="goTo(\'head-erp\')">🔗 ترحيل لـ ERP</button>') +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العمليات', '1,245', 'هذا الشهر', 'blue', '📋') +
    kpiCard('بانتظار الاعتماد', '125', 'عملية معلقة', 'orange', '⏳') +
    kpiCard('معتمدة اليوم', '98', 'عملية', 'green', '✅', '+15%') +
    kpiCard('مرفوضة اليوم', '12', 'عملية', 'red', '❌') +
    kpiCard('الفروع النشطة', '100', 'فرع', 'blue', '🏪') +
    kpiCard('المحاسبون النشطون', '8', 'محاسب', 'teal', '👤') +
    '</div>' +
    alertBox('danger', '3 فروع لم ترفع بيانات اليوم: فرع الشرقية، فرع الخبر، فرع الجبيل') +
    alertBox('warning', '18 عملية مصروفات تجاوزت 24 ساعة دون اعتماد') +
    '<div class="grid-2">' +
    card('📊 توزيع العمليات المعلقة حسب الموديول',
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
      [
        { label:'💸 المصروفات', count:18, pct:42, color:'#D97706' },
        { label:'🛒 المشتريات', count:12, pct:28, color:'#2563EB' },
        { label:'💰 المبيعات', count:15, pct:35, color:'#059669' },
        { label:'♻️ الهدر', count:13, pct:30, color:'#DC2626' },
        { label:'👤 الموظفون', count:7, pct:16, color:'#7C3AED' },
        { label:'💼 العهد', count:5, pct:12, color:'#0891B2' }
      ].map(function(m) {
        return '<div style="display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:12.5px;width:130px;">' + m.label + '</span>' +
          '<div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:' + m.pct + '%;background:' + m.color + ';"></div></div>' +
          '<span style="font-size:12px;font-weight:700;width:30px;">' + m.count + '</span>' +
          '</div>';
      }).join('') +
      '</div>'
    ) +
    card('📈 أداء الاعتماد — آخر 7 أيام',
      '<div class="bar-chart">' +
      [85, 92, 78, 105, 88, 95, 98].map(function(v, i) {
        return '<div class="bar-item ' + (i === 6 ? 'accent' : '') + '" style="height:' + Math.round(v*0.85) + '%;" title="' + v + ' عملية"></div>';
      }).join('') +
      '</div>' +
      '<div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#6B7A99;">' +
      ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'].map(function(d) { return '<span>' + d + '</span>'; }).join('') +
      '</div>'
    ) +
    '</div>' +
    card('🏪 حالة الفروع — أعلى 8 فروع',
      dataTable(
        ['الفرع','المحاسب','المعلقة','المعتمدة','المرفوضة','آخر رفع','الحالة'],
        [
          ['فرع الملز','أحمد محمد','8','145','2','منذ ساعة',badge('نشط','success')],
          ['فرع النزهة','أحمد محمد','12','132','5','منذ 2 ساعة',badge('نشط','success')],
          ['فرع العليا','ناصر القحطاني','5','128','1','منذ 30 دقيقة',badge('نشط','success')],
          ['فرع الروضة','ناصر القحطاني','18','119','8','منذ 3 ساعات',badge('تأخر','warning')],
          ['فرع السليمانية','عبدالله الشمري','3','115','0','منذ ساعة',badge('نشط','success')],
          ['فرع الشرقية','-','0','0','0','لم يرفع',badge('غائب','danger')],
          ['فرع الخبر','-','0','0','0','لم يرفع',badge('غائب','danger')],
          ['فرع الجبيل','-','0','0','0','لم يرفع',badge('غائب','danger')]
        ]
      )
    );
}

function buildHeadPending() {
  return pageHeader('العمليات بانتظار الاعتماد', '125 عملية تنتظر المراجعة والاعتماد') +
    filterBar(
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option><option>المبيعات</option><option>المصروفات</option><option>المشتريات</option><option>المخزون</option><option>الهدر</option><option>الموظفون</option><option>العهد</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع الفروع</option><option>فرع الملز</option><option>فرع النزهة</option><option>فرع العليا</option></select>' +
      '<span class="filter-label">المحاسب:</span>' +
      '<select class="filter-select"><option>الكل</option><option>أحمد محمد</option><option>ناصر القحطاني</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-success">✅ اعتماد الكل</button>'
    ) +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">' +
    opCard('💸 المصروفات', 'فرع الملز', 12, 'منذ 2 ساعة', 'يحتاج مراجعة', 5) +
    opCard('💰 المبيعات', 'فرع النزهة', 8, 'منذ ساعة', 'متطابق', 3) +
    opCard('🛒 المشتريات', 'فرع العليا', 6, 'منذ 3 ساعات', 'فرق بسيط', 4) +
    opCard('♻️ الهدر', 'فرع الروضة', 5, 'منذ 4 ساعات', 'يحتاج مراجعة', 2) +
    opCard('💸 المصروفات', 'فرع السليمانية', 9, 'منذ 5 ساعات', 'متطابق', 6) +
    opCard('👤 الموظفون', 'فرع الملز', 15, 'منذ ساعة', 'متطابق', 1) +
    opCard('💼 العهد', 'فرع النزهة', 3, 'منذ 6 ساعات', 'يحتاج مراجعة', 2) +
    opCard('📦 المخزون', 'فرع العليا', 4, 'منذ 2 ساعة', 'فرق بسيط', 3) +
    '</div>';
}

function buildHeadApproved() {
  return pageHeader('العمليات المعتمدة', 'جميع العمليات التي تم اعتمادها') +
    filterBar(
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option><option>المبيعات</option><option>المصروفات</option><option>المشتريات</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع الفروع</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>' +
      '<button class="btn btn-sm btn-primary">🔗 ترحيل لـ ERP</button>'
    ) +
    card('العمليات المعتمدة',
      dataTable(
        ['#','الموديول','الفرع','المحاسب','عدد العمليات','وقت الاعتماد','معتمد من','إجراءات'],
        [
          ['1','💰 المبيعات','فرع الملز','أحمد محمد','12','09:30',badge('خالد العمري','info'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['2','💸 المصروفات','فرع النزهة','أحمد محمد','8','09:15',badge('خالد العمري','info'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['3','🛒 المشتريات','فرع العليا','ناصر القحطاني','6','08:50',badge('خالد العمري','info'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['4','📦 المخزون','فرع الروضة','ناصر القحطاني','4','08:30',badge('خالد العمري','info'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['5','♻️ الهدر','فرع السليمانية','عبدالله الشمري','5','08:10',badge('خالد العمري','info'),'<button class="btn btn-sm btn-ghost">عرض</button>']
        ]
      )
    );
}

function buildHeadRejected() {
  return pageHeader('العمليات المرفوضة', 'العمليات التي تم رفضها مع أسباب الرفض') +
    filterBar(
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع الفروع</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    card('العمليات المرفوضة',
      dataTable(
        ['#','الموديول','الفرع','المحاسب','سبب الرفض','وقت الرفض','إجراءات'],
        [
          ['1','🛒 المشتريات','فرع العليا','ناصر القحطاني','فرق في الكميات المستلمة — 5 كجم دجاج','10:20','<button class="btn btn-sm btn-ghost">عرض</button> <button class="btn btn-sm btn-primary">إعادة</button>'],
          ['2','💸 المصروفات','فرع الروضة','ناصر القحطاني','فاتورة غير واضحة — يجب إعادة الرفع','09:45','<button class="btn btn-sm btn-ghost">عرض</button> <button class="btn btn-sm btn-primary">إعادة</button>'],
          ['3','💰 المبيعات','فرع الملز','أحمد محمد','تعارض في أرقام الشفت','09:10','<button class="btn btn-sm btn-ghost">عرض</button> <button class="btn btn-sm btn-primary">إعادة</button>']
        ]
      )
    );
}

function buildHeadAccountants() {
  return pageHeader('أداء المحاسبين', 'متابعة أداء وكفاءة فريق المحاسبين') +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي المحاسبين', '8', 'محاسب نشط', 'blue', '👥') +
    kpiCard('متوسط معدل الاعتماد', '93.8%', 'هذا الشهر', 'green', '✅') +
    kpiCard('متوسط وقت المراجعة', '4.2 ساعة', 'لكل عملية', 'orange', '⏱️') +
    kpiCard('عمليات معلقة إجمالي', '125', 'عبر الفريق', 'red', '⏳') +
    '</div>' +
    card('تفاصيل أداء المحاسبين',
      dataTable(
        ['المحاسب','الفروع','العمليات المكلف بها','معتمدة','مرفوضة','معلقة','معدل الاعتماد','متوسط الوقت','التقييم'],
        [
          ['أحمد محمد','5 فروع','1,245','1,180','65','28','94.8%','3.8 ساعة','⭐⭐⭐⭐⭐'],
          ['ناصر القحطاني','4 فروع','980','920','60','35','93.9%','4.5 ساعة','⭐⭐⭐⭐'],
          ['عبدالله الشمري','3 فروع','756','698','58','22','92.3%','5.1 ساعة','⭐⭐⭐⭐'],
          ['محمد الزهراني','3 فروع','680','630','50','18','92.6%','4.8 ساعة','⭐⭐⭐⭐'],
          ['فيصل العتيبي','2 فروع','420','395','25','12','94.0%','4.0 ساعة','⭐⭐⭐⭐⭐']
        ]
      )
    );
}

function buildHeadERP() {
  return pageHeader('التصدير لـ ERP', 'ترحيل البيانات المعتمدة إلى نظام ERP') +
    alertBox('success', 'آخر ترحيل ناجح: اليوم 08:00 — 1,120 عملية مُرحَّلة') +
    '<div class="kpi-grid">' +
    kpiCard('جاهزة للترحيل', '98', 'عملية معتمدة', 'blue', '🔗') +
    kpiCard('مُرحَّلة اليوم', '1,120', 'عملية', 'green', '✅') +
    kpiCard('فشل الترحيل', '0', 'عملية', 'green', '⚠️') +
    kpiCard('في الانتظار', '125', 'بانتظار اعتماد', 'orange', '⏳') +
    '</div>' +
    '<div class="grid-2">' +
    card('⚙️ إعدادات الترحيل',
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div class="form-group"><label class="form-label">نظام ERP</label><input class="form-input" value="SAP S/4HANA" readonly></div>' +
      '<div class="form-group"><label class="form-label">نوع الترحيل</label><select class="form-input"><option>يدوي</option><option>تلقائي يومي</option></select></div>' +
      '<div class="form-group"><label class="form-label">وقت الترحيل التلقائي</label><input class="form-input" type="time" value="08:00"></div>' +
      '<button class="btn btn-primary" style="margin-top:8px;">🔗 ترحيل الآن</button>' +
      '</div>'
    ) +
    card('📋 سجل الترحيل',
      dataTable(
        ['التاريخ','الوقت','العمليات','الحالة','ملاحظات'],
        [
          ['13/03/2026','08:00','1,120',badge('ناجح','success'),'-'],
          ['12/03/2026','08:00','1,085',badge('ناجح','success'),'-'],
          ['11/03/2026','08:00','1,142',badge('ناجح','success'),'-'],
          ['10/03/2026','08:00','1,098',badge('ناجح','success'),'-'],
          ['09/03/2026','08:00','1,063',badge('ناجح','success'),'-']
        ]
      )
    ) +
    '</div>';
}

function buildHeadReports() {
  return pageHeader('التقارير', 'تقارير شاملة على مستوى جميع الفروع') +
    filterBar(
      '<span class="filter-label">الفترة:</span>' +
      '<select class="filter-select"><option>مارس 2026</option><option>فبراير 2026</option><option>يناير 2026</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع الفروع</option></select>' +
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option><option>المبيعات</option><option>المصروفات</option><option>المشتريات</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>' +
      '<button class="btn btn-sm btn-ghost">📄 PDF</button>'
    ) +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العمليات', '12,450', 'هذا الشهر', 'blue', '📋') +
    kpiCard('معتمدة', '11,727', '94.2%', 'green', '✅', '+2.1%') +
    kpiCard('مرفوضة', '723', '5.8%', 'red', '❌') +
    kpiCard('معدل الاعتماد', '94.2%', 'هذا الشهر', 'teal', '📊') +
    '</div>' +
    '<div class="grid-2">' +
    card('📊 توزيع العمليات حسب الموديول',
      dataTable(
        ['الموديول','إجمالي','معتمدة','مرفوضة','معدل الاعتماد'],
        [
          ['💰 المبيعات','3,200','3,100','100','96.9%'],
          ['💸 المصروفات','2,800','2,600','200','92.9%'],
          ['🛒 المشتريات','2,100','1,980','120','94.3%'],
          ['📦 المخزون','1,850','1,780','70','96.2%'],
          ['♻️ الهدر','1,500','1,420','80','94.7%'],
          ['⏰ الشفتات','1,000','1,000','0','100%']
        ]
      )
    ) +
    card('🏪 أداء الفروع',
      dataTable(
        ['الفرع','العمليات','معدل الاعتماد','الترتيب'],
        [
          ['فرع الملز','1,245','98.2%','🥇 1'],
          ['فرع العليا','1,128','97.5%','🥈 2'],
          ['فرع النزهة','1,082','95.8%','🥉 3'],
          ['فرع السليمانية','980','94.5%','4'],
          ['فرع الروضة','945','91.2%','5']
        ]
      )
    ) +
    '</div>';
}

// ══════════════════════════════════════════════════════════════
//  SHARED MODULE PAGES
// ══════════════════════════════════════════════════════════════

// ─── SALES MODULE ───
function buildSalesModule(role) {
  var isHead = role === 'head';
  var title = isHead ? 'المبيعات — جميع الفروع' : 'المبيعات';
  var subtitle = isHead ? 'مراجعة واعتماد بيانات المبيعات' : 'مراجعة بيانات المبيعات المرفوعة';
  return pageHeader(title, subtitle,
    (isHead ? '<button class="btn btn-success">✅ اعتماد المحدد</button> ' : '') +
    '<button class="btn btn-ghost">📥 Excel</button>'
  ) +
  filterBar(
    '<span class="filter-label">القناة:</span>' +
    '<select class="filter-select"><option>الكل</option><option>نقدي</option><option>بطاقة بنكية</option><option>تطبيقات توصيل</option></select>' +
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option><option>فرع الملز</option><option>فرع النزهة</option><option>فرع العليا</option></select>' +
    (isHead ? '<span class="filter-label">المحاسب:</span><select class="filter-select"><option>الكل</option><option>أحمد محمد</option><option>ناصر القحطاني</option></select>' : '') +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العمليات', '320', 'هذا الشهر', 'blue', '📋') +
  kpiCard('عمليات نقدي', '145', 'عملية', 'green', '💵') +
  kpiCard('عمليات بطاقة', '133', 'عملية', 'teal', '💳') +
  kpiCard('عمليات تطبيقات', '42', 'عملية', 'orange', '📱') +
  '</div>' +
  card('📊 بيانات المبيعات',
    dataTable(
      ['#','الفرع','التاريخ','الشفت','نقدي','بطاقة','تطبيقات','الإجمالي','الحالة','إجراءات'],
      [
        ['1','فرع الملز','13/03/2026','صباحي','1,200 ر.س','850 ر.س',
          '<button class="btn btn-xs btn-ghost" onclick="showAppsBreakdown()">142 طلب 📱</button>',
          '3,020 ر.س',statusBadge('يحتاج مراجعة'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['2','فرع النزهة','13/03/2026','صباحي','980 ر.س','720 ر.س',
          '<button class="btn btn-xs btn-ghost" onclick="showAppsBreakdown()">98 طلب 📱</button>',
          '2,420 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['3','فرع العليا','13/03/2026','صباحي','1,100 ر.س','890 ر.س',
          '<button class="btn btn-xs btn-ghost" onclick="showAppsBreakdown()">115 طلب 📱</button>',
          '2,810 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['4','فرع الروضة','13/03/2026','صباحي','750 ر.س','580 ر.س',
          '<button class="btn btn-xs btn-ghost" onclick="showAppsBreakdown()">78 طلب 📱</button>',
          '1,980 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')]
      ]
    )
  );
}

// ─── EXPENSES MODULE ───
function buildExpensesModule(role) {
  var isHead = role === 'head';
  return pageHeader('المصروفات', isHead ? 'مراجعة واعتماد بيانات المصروفات — جميع الفروع' : 'مراجعة بيانات المصروفات',
    (isHead ? '<button class="btn btn-success">✅ اعتماد المحدد</button> ' : '') +
    '<button class="btn btn-ghost">📥 Excel</button>'
  ) +
  filterBar(
    '<span class="filter-label">الفئة:</span>' +
    '<select class="filter-select"><option>الكل</option><option>صيانة</option><option>مرافق</option><option>إيجار</option><option>مستلزمات</option></select>' +
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>' +
    '<div class="filter-divider"></div>' +
    '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العمليات', '280', 'هذا الشهر', 'blue', '📋') +
  kpiCard('تحتاج مراجعة', '18', 'عملية', 'orange', '⚠️') +
  kpiCard('معتمدة', '255', 'عملية', 'green', '✅') +
  kpiCard('مرفوضة', '7', 'عملية', 'red', '❌') +
  '</div>' +
  card('📊 بيانات المصروفات',
    dataTable(
      ['#','الفرع','التاريخ','عدد الفواتير','إجمالي المبلغ','الحالة','إجراءات'],
      [
        ['1','فرع الملز','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showExpenseDetail(\'فرع الملز\')">12 فاتورة 📄</button>',
          '3,450 ر.س',statusBadge('يحتاج مراجعة'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button> <button class="btn btn-sm btn-danger">❌</button>' : '')],
        ['2','فرع النزهة','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showExpenseDetail(\'فرع النزهة\')">8 فواتير 📄</button>',
          '2,180 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['3','فرع العليا','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showExpenseDetail(\'فرع العليا\')">10 فواتير 📄</button>',
          '2,890 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['4','فرع الروضة','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showExpenseDetail(\'فرع الروضة\')">6 فواتير 📄</button>',
          '1,650 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')]
      ]
    )
  );
}

// ─── PURCHASES MODULE ───
function buildPurchasesModule(role) {
  var isHead = role === 'head';
  return pageHeader('المشتريات', isHead ? 'مراجعة واعتماد بيانات المشتريات — مطابقة ثلاثية' : 'مراجعة بيانات المشتريات',
    (isHead ? '<button class="btn btn-success">✅ اعتماد المحدد</button> ' : '') +
    '<button class="btn btn-ghost">📥 Excel</button>'
  ) +
  filterBar(
    '<span class="filter-label">المورد:</span>' +
    '<select class="filter-select"><option>الكل</option><option>شركة الدواجن الذهبية</option><option>مستودع الأمانة</option></select>' +
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">حالة المطابقة:</span>' +
    '<select class="filter-select"><option>الكل</option><option>متطابق</option><option>فرق بسيط</option><option>يحتاج مراجعة</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العمليات', '210', 'هذا الشهر', 'blue', '📋') +
  kpiCard('متطابقة', '185', 'مطابقة كاملة', 'green', '✅') +
  kpiCard('فرق بسيط', '12', 'تحتاج تسوية', 'orange', '⚠️') +
  kpiCard('يحتاج مراجعة', '13', 'فرق كبير', 'red', '🚨') +
  '</div>' +
  card('📊 بيانات المشتريات — مطابقة ثلاثية',
    dataTable(
      ['#','الفرع','المورد','التاريخ','عدد الأصناف','إجمالي المبلغ','حالة المطابقة','إجراءات'],
      [
        ['1','فرع الملز','شركة الدواجن الذهبية','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showPurchaseDetail(\'فرع الملز\',\'شركة الدواجن الذهبية\')">4 أصناف 📦</button>',
          '2,136 ر.س',statusBadge('فرق بسيط'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button> <button class="btn btn-sm btn-danger">❌</button>' : '')],
        ['2','فرع النزهة','مستودع الأمانة','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showPurchaseDetail(\'فرع النزهة\',\'مستودع الأمانة\')">6 أصناف 📦</button>',
          '1,850 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['3','فرع العليا','شركة الدواجن الذهبية','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showPurchaseDetail(\'فرع العليا\',\'شركة الدواجن الذهبية\')">3 أصناف 📦</button>',
          '1,400 ر.س',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')]
      ]
    )
  );
}

// ─── INVENTORY MODULE ───
function buildInventoryModule(role) {
  var isHead = role === 'head';
  return pageHeader('المخزون', isHead ? 'مراجعة واعتماد بيانات المخزون — جميع الفروع' : 'مراجعة بيانات المخزون') +
  alertBox('warning', '3 فروع لديها أصناف تحت الحد الأدنى — انقر لعرض التفاصيل') +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">الحالة:</span>' +
    '<select class="filter-select"><option>الكل</option><option>طبيعي</option><option>منخفض</option><option>نفاد</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العمليات', '185', 'هذا الشهر', 'blue', '📋') +
  kpiCard('أصناف منخفضة', '3', 'تحت الحد الأدنى', 'orange', '⚠️') +
  kpiCard('معتمدة', '179', 'عملية', 'green', '✅') +
  kpiCard('شذوذات مكتشفة', '6', 'تحتاج مراجعة', 'red', '🔍') +
  '</div>' +
  card('📊 بيانات المخزون',
    dataTable(
      ['#','الفرع','التاريخ','عدد الأصناف','أصناف منخفضة','شذوذات','الحالة','إجراءات'],
      [
        ['1','فرع الملز','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showInventoryDetail(\'فرع الملز\')">5 أصناف 📦</button>',
          '<span style="color:#DC2626;font-weight:700;">3 أصناف</span>','1',statusBadge('يحتاج مراجعة'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['2','فرع النزهة','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showInventoryDetail(\'فرع النزهة\')">5 أصناف 📦</button>',
          '0','0',statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['3','فرع العليا','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showInventoryDetail(\'فرع العليا\')">5 أصناف 📦</button>',
          '<span style="color:#D97706;font-weight:700;">1 صنف</span>','0',statusBadge('فرق بسيط'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')]
      ]
    )
  );
}

// ─── DAILY INVENTORY MODULE ───
function buildDailyInvModule(role) {
  var isHead = role === 'head';
  return pageHeader('الجرد اليومي', isHead ? 'مراجعة الجرد اليومي — معادلة الرصيد الكاملة' : 'بيانات الجرد اليومي') +
  '<div style="padding:14px;background:#F0F9FF;border:1px solid #BAE6FD;border-radius:10px;margin-bottom:20px;">' +
  '<div style="font-size:12px;font-weight:700;color:#0C4A6E;margin-bottom:6px;">📐 معادلة الجرد اليومي</div>' +
  '<div style="font-size:13px;color:#0369A1;font-weight:600;">رصيد الافتتاح + المشتريات - المبيعات ± التحويلات بين الفروع - الهدر = رصيد الإغلاق</div>' +
  '</div>' +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">الصنف:</span>' +
    '<select class="filter-select"><option>الكل</option><option>دجاج مجمد</option><option>زيت نباتي</option><option>أرز</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  card('📊 الجرد اليومي — ' + (isHead ? 'جميع الفروع' : 'فروعي'),
    dataTable(
      ['الفرع','الصنف','رصيد الافتتاح','المشتريات','المبيعات','التحويلات','الهدر','رصيد الإغلاق الفعلي','رصيد الإغلاق المتوقع','الفرق','المسؤول','الحالة'],
      [
        ['فرع الملز','دجاج مجمد','120 كجم','50 كجم','145 كجم','0','5 كجم','20 كجم','20 كجم','0',badge('أحمد علي','info'),statusBadge('متطابق')],
        ['فرع الملز','زيت نباتي','40 لتر','20 لتر','35 لتر','0','2 لتر','23 لتر','23 لتر','0',badge('أحمد علي','info'),statusBadge('متطابق')],
        ['فرع النزهة','دجاج مجمد','100 كجم','40 كجم','130 كجم','+5 كجم','3 كجم','12 كجم','12 كجم','0',badge('محمد سالم','info'),statusBadge('متطابق')],
        ['فرع العليا','دجاج مجمد','90 كجم','60 كجم','120 كجم','0','4 كجم','<span style="color:#DC2626;font-weight:700;">24 كجم</span>','26 كجم','<span style="color:#DC2626;font-weight:700;">-2 كجم</span>',badge('خالد ناصر','info'),statusBadge('يحتاج مراجعة')]
      ]
    )
  );
}

// ─── WASTE MODULE ───
function buildWasteModule(role) {
  var isHead = role === 'head';
  return pageHeader('الهدر والتالف', isHead ? 'مراجعة واعتماد بيانات الهدر — تصنيف المسؤولية' : 'بيانات الهدر والتالف') +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">المسؤولية:</span>' +
    '<select class="filter-select"><option>الكل</option><option>موظف</option><option>مطعم</option></select>' +
    '<span class="filter-label">السبب:</span>' +
    '<select class="filter-select"><option>الكل</option><option>انتهاء صلاحية</option><option>تلف</option><option>كسر</option><option>طبخ زائد</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العمليات', '150', 'هذا الشهر', 'blue', '📋') +
  kpiCard('هدر موظفين', '52', 'عملية — 35%', 'red', '👤') +
  kpiCard('هدر مطعم', '98', 'عملية — 65%', 'orange', '🏪') +
  kpiCard('تحتاج مراجعة', '13', 'عملية', 'orange', '⚠️') +
  '</div>' +
  card('📊 بيانات الهدر والتالف',
    dataTable(
      ['#','الفرع','التاريخ','عدد الأصناف','هدر موظفين','هدر مطعم','الحالة','إجراءات'],
      [
        ['1','فرع الملز','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showWasteDetail(\'فرع الملز\')">5 أصناف ♻️</button>',
          '<span style="color:#DC2626;">8 كجم</span>','<span style="color:#D97706;">15 كجم</span>',
          statusBadge('يحتاج مراجعة'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['2','فرع النزهة','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showWasteDetail(\'فرع النزهة\')">3 أصناف ♻️</button>',
          '<span style="color:#DC2626;">3 كجم</span>','<span style="color:#D97706;">8 كجم</span>',
          statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')],
        ['3','فرع العليا','13/03/2026',
          '<button class="btn btn-xs btn-ghost" onclick="showWasteDetail(\'فرع العليا\')">4 أصناف ♻️</button>',
          '<span style="color:#DC2626;">5 كجم</span>','<span style="color:#D97706;">10 كجم</span>',
          statusBadge('متطابق'),
          '<button class="btn btn-sm btn-ghost">عرض</button>' + (isHead ? ' <button class="btn btn-sm btn-success">✅</button>' : '')]
      ]
    )
  );
}

// ─── SHIFTS MODULE ───
function buildShiftsModule(role) {
  var isHead = role === 'head';
  var isAcc = role === 'accountant';
  return pageHeader('الشفتات', isHead ? 'مراجعة جداول الشفتات — جميع الفروع' : 'جداول الشفتات') +
  (isAcc ? alertBox('info', 'هذا الموديول للعرض فقط — لا يمكن تعديل بيانات الشفتات من هنا') : '') +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">الشفت:</span>' +
    '<select class="filter-select"><option>الكل</option><option>صباحي</option><option>مسائي</option><option>ليلي</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي الشفتات', '100', 'هذا الشهر', 'blue', '⏰') +
  kpiCard('شفت صباحي', '40', '40%', 'green', '🌅') +
  kpiCard('شفت مسائي', '38', '38%', 'orange', '🌆') +
  kpiCard('شفت ليلي', '22', '22%', 'purple', '🌙') +
  '</div>' +
  card('📊 جداول الشفتات',
    dataTable(
      ['#','الفرع','التاريخ','الشفت','وقت البدء','وقت الانتهاء','عدد الموظفين','المبيعات','الحالة'],
      [
        ['1','فرع الملز','13/03/2026','صباحي','06:00','14:00','5 موظفين','3,020 ر.س',statusBadge('مكتمل')],
        ['2','فرع الملز','13/03/2026','مسائي','14:00','22:00','4 موظفين','2,850 ر.س',statusBadge('مكتمل')],
        ['3','فرع النزهة','13/03/2026','صباحي','06:00','14:00','4 موظفين','2,420 ر.س',statusBadge('مكتمل')],
        ['4','فرع العليا','13/03/2026','صباحي','06:00','14:00','6 موظفين','2,810 ر.س',statusBadge('مكتمل')],
        ['5','فرع الروضة','13/03/2026','مسائي','14:00','22:00','3 موظفين','1,980 ر.س',statusBadge('مكتمل')]
      ]
    )
  );
}

// ─── EMPLOYEES MODULE ───
function buildEmployeesModule(role) {
  var isHead = role === 'head';
  return pageHeader('كشف الموظفين', isHead ? 'مراجعة واعتماد كشوف الموظفين — جميع الفروع' : 'كشف الموظفين') +
  '<div style="padding:14px;background:#F8FAFD;border:1px solid #E8EDF7;border-radius:10px;margin-bottom:16px;">' +
  '<div style="font-size:12.5px;font-weight:700;color:#374151;margin-bottom:10px;">🔍 بحث سريع بالموظف</div>' +
  '<div style="display:flex;gap:10px;align-items:center;">' +
  '<input id="emp-search-input" class="filter-input" placeholder="أدخل رقم الموظف..." style="width:220px;">' +
  '<button class="btn btn-sm btn-primary" onclick="lookupEmployee()">بحث</button>' +
  '</div>' +
  '<div id="emp-search-result"></div>' +
  '</div>' +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">الشهر:</span>' +
    '<select class="filter-select"><option>مارس 2026</option><option>فبراير 2026</option></select>' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>' +
    '<div class="filter-divider"></div>' +
    '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي الموظفين', '245', 'موظف نشط', 'blue', '👥') +
  kpiCard('إجمالي الرواتب', '735,000 ر.س', 'هذا الشهر', 'green', '💰') +
  kpiCard('إجمالي الخصومات', '12,400 ر.س', 'هذا الشهر', 'red', '➖') +
  kpiCard('تحتاج مراجعة', '7', 'عملية', 'orange', '⚠️') +
  '</div>' +
  card('📊 كشف الموظفين',
    dataTable(
      ['#','الموظف','رقم الموظف','الفرع','الراتب الأساسي','البدلات','الخصومات','الصافي','الحالة','إجراءات'],
      [
        ['1','محمد أحمد السالم','EMP-001','فرع الملز','3,000 ر.س','700 ر.س','80 ر.س','3,620 ر.س',statusBadge('معتمد'),'<button class="btn btn-sm btn-ghost" onclick="showEmployeeHistory(\'محمد أحمد السالم\')">📋 السجل</button>'],
        ['2','عبدالرحمن خالد','EMP-002','فرع الملز','2,800 ر.س','600 ر.س','0','3,400 ر.س',statusBadge('معتمد'),'<button class="btn btn-sm btn-ghost" onclick="showEmployeeHistory(\'عبدالرحمن خالد\')">📋 السجل</button>'],
        ['3','فيصل محمد','EMP-003','فرع النزهة','3,200 ر.س','700 ر.س','140 ر.س','3,760 ر.س',statusBadge('يحتاج مراجعة'),'<button class="btn btn-sm btn-ghost" onclick="showEmployeeHistory(\'فيصل محمد\')">📋 السجل</button>'],
        ['4','سعد عبدالله','EMP-004','فرع العليا','2,500 ر.س','500 ر.س','60 ر.س','2,940 ر.س',statusBadge('معتمد'),'<button class="btn btn-sm btn-ghost" onclick="showEmployeeHistory(\'سعد عبدالله\')">📋 السجل</button>'],
        ['5','نايف الحربي','EMP-005','فرع الروضة','3,500 ر.س','800 ر.س','0','4,300 ر.س',statusBadge('معتمد'),'<button class="btn btn-sm btn-ghost" onclick="showEmployeeHistory(\'نايف الحربي\')">📋 السجل</button>']
      ]
    )
  );
}

// ─── CUSTODY MODULE ───
function buildCustodyModule(role) {
  var isHead = role === 'head';
  return pageHeader('العهد النقدية', isHead ? 'مراجعة واعتماد العهد النقدية — جميع الفروع' : 'العهد النقدية') +
  filterBar(
    '<span class="filter-label">الفرع:</span>' +
    '<select class="filter-select"><option>جميع الفروع</option></select>' +
    '<span class="filter-label">الحالة:</span>' +
    '<select class="filter-select"><option>الكل</option><option>مفتوحة</option><option>مسواة</option><option>تجاوزت الحد</option></select>' +
    '<input type="date" class="filter-input">' +
    '<button class="btn btn-sm btn-primary">تطبيق</button>'
  ) +
  '<div class="kpi-grid">' +
  kpiCard('إجمالي العهد المفتوحة', '5', 'عهدة', 'blue', '💼') +
  kpiCard('إجمالي المبالغ', '2,500 ر.س', 'عهد مفتوحة', 'orange', '💰') +
  kpiCard('المسواة هذا الشهر', '12', 'عهدة', 'green', '✅') +
  kpiCard('تجاوزت الحد', '2', 'تحتاج تسوية عاجلة', 'red', '⚠️') +
  '</div>' +
  card('📊 العهد النقدية',
    dataTable(
      ['#','الفرع','المسؤول','تاريخ الفتح','المبلغ الأصلي','المصروف','الرصيد المتبقي','الحالة','إجراءات'],
      [
        ['1','فرع الملز','سلطان الغامدي','01/03/2026','500 ر.س','320 ر.س','180 ر.س',badge('مفتوحة','warning'),'<button class="btn btn-sm btn-ghost" onclick="showCustodyHistory(\'فرع الملز\')">📋 السجل</button>' + (isHead ? ' <button class="btn btn-sm btn-primary">تسوية</button>' : '')],
        ['2','فرع النزهة','عمر الزيد','01/03/2026','500 ر.س','480 ر.س','20 ر.س',badge('تجاوزت الحد','danger'),'<button class="btn btn-sm btn-ghost" onclick="showCustodyHistory(\'فرع النزهة\')">📋 السجل</button>' + (isHead ? ' <button class="btn btn-sm btn-primary">تسوية</button>' : '')],
        ['3','فرع العليا','ماجد الشهري','05/03/2026','500 ر.س','150 ر.س','350 ر.س',badge('مفتوحة','info'),'<button class="btn btn-sm btn-ghost" onclick="showCustodyHistory(\'فرع العليا\')">📋 السجل</button>' + (isHead ? ' <button class="btn btn-sm btn-primary">تسوية</button>' : '')],
        ['4','فرع الروضة','نواف العتيبي','01/03/2026','500 ر.س','500 ر.س','0','<span style="color:#059669;font-weight:700;">مسواة ✅</span>','<button class="btn btn-sm btn-ghost" onclick="showCustodyHistory(\'فرع الروضة\')">📋 السجل</button>']
      ]
    )
  );
}

// ══════════════════════════════════════════════════════════════
//  ACCOUNTANT PAGES
// ══════════════════════════════════════════════════════════════
function buildAccountantPages(container) {
  container.innerHTML +=
    page('acc-overview',  buildAccOverview()) +
    page('acc-pending',   buildAccPending()) +
    page('acc-approved',  buildAccApproved()) +
    page('acc-rejected',  buildAccRejected()) +
    page('acc-sales',     buildSalesModule('accountant')) +
    page('acc-expenses',  buildExpensesModule('accountant')) +
    page('acc-purchases', buildPurchasesModule('accountant')) +
    page('acc-inventory', buildInventoryModule('accountant')) +
    page('acc-daily-inv', buildDailyInvModule('accountant')) +
    page('acc-waste',     buildWasteModule('accountant')) +
    page('acc-shifts',    buildShiftsModule('accountant')) +
    page('acc-employees', buildEmployeesModule('accountant')) +
    page('acc-custody',   buildCustodyModule('accountant')) +
    page('acc-reports',   buildAccReports());
}

function buildAccOverview() {
  return pageHeader('لوحة تحكم المحاسب', 'متابعة العمليات المكلف بها — فروعي',
    '<button class="btn btn-primary" onclick="goTo(\'acc-pending\')">⏳ مراجعة المعلقة</button>') +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي العمليات', '248', 'هذا الشهر', 'blue', '📋') +
    kpiCard('معلقة', '28', 'تحتاج مراجعة', 'orange', '⏳') +
    kpiCard('موافق عليها', '208', 'عملية', 'green', '✅', '+8%') +
    kpiCard('مرفوضة', '12', 'هذا الشهر', 'red', '❌') +
    kpiCard('فروعي النشطة', '5', 'فرع', 'blue', '🏪') +
    kpiCard('معدل الاعتماد', '94.8%', 'هذا الشهر', 'teal', '📊') +
    '</div>' +
    alertBox('warning', '28 عملية معلقة تحتاج مراجعتك — أقدم منها منذ 6 ساعات') +
    '<div class="grid-2">' +
    card('📊 توزيع العمليات المعلقة',
      '<div style="display:flex;flex-direction:column;gap:10px;">' +
      [
        { label:'💸 المصروفات', count:8, pct:40, color:'#D97706' },
        { label:'🛒 المشتريات', count:6, pct:30, color:'#2563EB' },
        { label:'💰 المبيعات', count:5, pct:25, color:'#059669' },
        { label:'♻️ الهدر', count:4, pct:20, color:'#DC2626' },
        { label:'👤 الموظفون', count:3, pct:15, color:'#7C3AED' },
        { label:'💼 العهد', count:2, pct:10, color:'#0891B2' }
      ].map(function(m) {
        return '<div style="display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:12.5px;width:130px;">' + m.label + '</span>' +
          '<div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:' + m.pct + '%;background:' + m.color + ';"></div></div>' +
          '<span style="font-size:12px;font-weight:700;width:25px;">' + m.count + '</span>' +
          '</div>';
      }).join('') + '</div>'
    ) +
    card('🏪 حالة فروعي',
      dataTable(
        ['الفرع','المعلقة','الموافق عليها','آخر رفع'],
        [
          ['فرع الملز','8','145','منذ ساعة'],
          ['فرع النزهة','12','132','منذ 2 ساعة'],
          ['فرع العليا','5','128','منذ 30 دقيقة'],
          ['فرع الروضة','3','119','منذ 3 ساعات'],
          ['فرع السليمانية','0','115','منذ ساعة']
        ]
      )
    ) +
    '</div>';
}

function buildAccPending() {
  return pageHeader('العمليات المعلقة', '28 عملية تنتظر مراجعتك') +
    filterBar(
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option><option>المبيعات</option><option>المصروفات</option><option>المشتريات</option><option>المخزون</option><option>الهدر</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع فروعي</option><option>فرع الملز</option><option>فرع النزهة</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-success">✅ موافقة على الكل</button>'
    ) +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">' +
    opCard('💸 المصروفات', 'فرع الملز', 12, 'منذ 2 ساعة', 'يحتاج مراجعة', 5) +
    opCard('💰 المبيعات', 'فرع النزهة', 8, 'منذ ساعة', 'متطابق', 3) +
    opCard('🛒 المشتريات', 'فرع العليا', 6, 'منذ 3 ساعات', 'فرق بسيط', 4) +
    opCard('♻️ الهدر', 'فرع الروضة', 5, 'منذ 4 ساعات', 'يحتاج مراجعة', 2) +
    opCard('💸 المصروفات', 'فرع السليمانية', 9, 'منذ 5 ساعات', 'متطابق', 6) +
    opCard('👤 الموظفون', 'فرع الملز', 15, 'منذ ساعة', 'متطابق', 1) +
    '</div>';
}

function buildAccApproved() {
  return pageHeader('العمليات الموافق عليها', 'العمليات التي وافقت عليها وأُرسلت لرئيس الحسابات') +
    filterBar(
      '<span class="filter-label">الموديول:</span>' +
      '<select class="filter-select"><option>الكل</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع فروعي</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    card('العمليات الموافق عليها',
      dataTable(
        ['#','الموديول','الفرع','عدد العمليات','وقت الموافقة','حالة رئيس الحسابات','إجراءات'],
        [
          ['1','💰 المبيعات','فرع الملز','12','09:30',badge('معتمد','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['2','💸 المصروفات','فرع النزهة','8','09:15',badge('معتمد','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['3','🛒 المشتريات','فرع العليا','6','08:50',badge('بانتظار الاعتماد','warning'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['4','📦 المخزون','فرع الروضة','4','08:30',badge('بانتظار الاعتماد','warning'),'<button class="btn btn-sm btn-ghost">عرض</button>']
        ]
      )
    );
}

function buildAccRejected() {
  return pageHeader('العمليات المرفوضة', 'العمليات التي رفضها رئيس الحسابات مع أسباب الرفض') +
    alertBox('warning', '12 عملية مرفوضة — يجب مراجعتها وإعادة رفعها') +
    card('العمليات المرفوضة',
      dataTable(
        ['#','الموديول','الفرع','سبب الرفض من رئيس الحسابات','وقت الرفض','إجراءات'],
        [
          ['1','🛒 المشتريات','فرع العليا','فرق في الكميات المستلمة — 5 كجم دجاج','10:20','<button class="btn btn-sm btn-primary">إعادة رفع</button>'],
          ['2','💸 المصروفات','فرع الروضة','فاتورة غير واضحة — يجب إعادة الرفع','09:45','<button class="btn btn-sm btn-primary">إعادة رفع</button>'],
          ['3','💰 المبيعات','فرع الملز','تعارض في أرقام الشفت','09:10','<button class="btn btn-sm btn-primary">إعادة رفع</button>']
        ]
      )
    );
}

function buildAccReports() {
  return pageHeader('التقارير', 'تقارير أدائي وفروعي') +
    filterBar(
      '<span class="filter-label">الفترة:</span>' +
      '<select class="filter-select"><option>مارس 2026</option><option>فبراير 2026</option></select>' +
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع فروعي</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي عملياتي', '1,245', 'هذا الشهر', 'blue', '📋') +
    kpiCard('معدل الاعتماد', '94.8%', 'من رئيس الحسابات', 'green', '✅', '+1.2%') +
    kpiCard('متوسط وقت المراجعة', '3.8 ساعة', 'لكل عملية', 'orange', '⏱️') +
    kpiCard('مرفوضة', '65', 'هذا الشهر', 'red', '❌') +
    '</div>' +
    card('📊 ملخص أدائي',
      dataTable(
        ['الموديول','إجمالي','موافق عليها','مرفوضة','معدل الاعتماد'],
        [
          ['💰 المبيعات','320','310','10','96.9%'],
          ['💸 المصروفات','280','260','20','92.9%'],
          ['🛒 المشتريات','210','198','12','94.3%'],
          ['📦 المخزون','185','180','5','97.3%'],
          ['♻️ الهدر','150','142','8','94.7%']
        ]
      )
    );
}

// ══════════════════════════════════════════════════════════════
//  BRANCH MANAGER PAGES
// ══════════════════════════════════════════════════════════════
function buildBranchPages(container) {
  container.innerHTML +=
    page('branch-overview',  buildBranchOverview()) +
    page('branch-employees', buildBranchEmployees()) +
    page('branch-items',     buildBranchItems()) +
    page('branch-suppliers', buildBranchSuppliers()) +
    page('branch-upload',    buildBranchUpload()) +
    page('branch-settings',  buildBranchSettings());
}

function buildBranchOverview() {
  return pageHeader('لوحة تحكم مدير الفرع', 'فرع الملز — نظرة عامة على الفرع اليوم') +
    '<div class="kpi-grid">' +
    kpiCard('ملفات مرفوعة اليوم', '8', 'من أصل 9 مطلوبة', 'blue', '📤') +
    kpiCard('ملفات معلقة', '3', 'بانتظار رفع', 'orange', '⏳') +
    kpiCard('موافق عليها', '5', 'من المحاسب', 'green', '✅') +
    kpiCard('موظفون اليوم', '12', 'في الدوام', 'teal', '👥') +
    '</div>' +
    alertBox('warning', '3 ملفات لم يتم رفعها بعد: جدول الشفتات، كشف الموظفين، العهدة النقدية') +
    '<div class="grid-2">' +
    card('📋 حالة الملفات اليوم',
      dataTable(
        ['الموديول','الحالة','وقت الرفع','ملاحظات'],
        [
          ['💰 المبيعات',badge('مرفوع','success'),'08:30','-'],
          ['💸 المصروفات',badge('مرفوع','success'),'09:00','-'],
          ['🛒 المشتريات',badge('مرفوع','success'),'09:30','-'],
          ['📦 المخزون',badge('مرفوع','success'),'10:00','-'],
          ['🔢 الجرد اليومي',badge('مرفوع','success'),'10:30','-'],
          ['♻️ الهدر',badge('مرفوع','success'),'11:00','-'],
          ['⏰ الشفتات',badge('لم يُرفع','danger'),'-','مطلوب رفع'],
          ['👤 الموظفون',badge('لم يُرفع','danger'),'-','مطلوب رفع'],
          ['💼 العهدة',badge('لم يُرفع','danger'),'-','مطلوب رفع']
        ]
      )
    ) +
    card('📊 ملخص اليوم',
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div style="display:flex;justify-content:space-between;padding:10px;background:#F8FAFD;border-radius:8px;">' +
      '<span style="font-size:13px;">مبيعات اليوم (تقديري)</span><span style="font-weight:700;color:#059669;">8,230 ر.س</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:10px;background:#F8FAFD;border-radius:8px;">' +
      '<span style="font-size:13px;">مصروفات اليوم</span><span style="font-weight:700;color:#D97706;">3,450 ر.س</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:10px;background:#F8FAFD;border-radius:8px;">' +
      '<span style="font-size:13px;">مشتريات اليوم</span><span style="font-weight:700;color:#2563EB;">2,136 ر.س</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:10px;background:#F8FAFD;border-radius:8px;">' +
      '<span style="font-size:13px;">هدر اليوم</span><span style="font-weight:700;color:#DC2626;">320 ر.س</span></div>' +
      '</div>'
    ) +
    '</div>';
}

function buildBranchEmployees() {
  return pageHeader('موظفو الفرع', 'إدارة موظفي فرع الملز') +
    filterBar(
      '<span class="filter-label">الحالة:</span>' +
      '<select class="filter-select"><option>الكل</option><option>نشط</option><option>إجازة</option></select>' +
      '<input type="text" class="filter-input" placeholder="بحث بالاسم...">' +
      '<button class="btn btn-sm btn-primary">بحث</button>'
    ) +
    card('قائمة الموظفين',
      dataTable(
        ['#','الاسم','رقم الموظف','المسمى','الشفت','الحالة','إجراءات'],
        [
          ['1','محمد أحمد السالم','EMP-001','كاشير','صباحي',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['2','عبدالرحمن خالد','EMP-002','طباخ','صباحي',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['3','فيصل محمد','EMP-003','مساعد','مسائي',badge('نشط','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['4','سعد عبدالله','EMP-004','كاشير','مسائي',badge('إجازة','warning'),'<button class="btn btn-sm btn-ghost">عرض</button>']
        ]
      )
    );
}

function buildBranchItems() {
  return pageHeader('الأصناف', 'قائمة الأصناف المعتمدة للفرع') +
    card('قائمة الأصناف',
      dataTable(
        ['#','الصنف','الوحدة','الكمية الحالية','الحد الأدنى','المورد','الحالة'],
        [
          ['1','دجاج مجمد كامل','كجم','20','30','شركة الدواجن الذهبية','<span style="color:#DC2626;font-weight:700;">⚠️ منخفض</span>'],
          ['2','زيت نباتي','لتر','23','10','مستودع الأمانة',badge('طبيعي','success')],
          ['3','أرز','كجم','32','20','مستودع الأمانة',badge('طبيعي','success')],
          ['4','بهارات مشكلة','كجم','1','5','مستودع الأمانة','<span style="color:#DC2626;font-weight:700;">⚠️ منخفض</span>'],
          ['5','عبوات تغليف','قطعة','70','100','شركة التغليف',badge('طبيعي','success')]
        ]
      )
    );
}

function buildBranchSuppliers() {
  return pageHeader('الموردون', 'قائمة الموردين المعتمدين للفرع') +
    card('قائمة الموردين',
      dataTable(
        ['#','اسم المورد','الفئة','جوال التواصل','آخر توريد','الحالة'],
        [
          ['1','شركة الدواجن الذهبية','دواجن ولحوم','0501234567','13/03/2026',badge('نشط','success')],
          ['2','مستودع الأمانة','مواد جافة','0507654321','12/03/2026',badge('نشط','success')],
          ['3','شركة التغليف','عبوات','0509876543','10/03/2026',badge('نشط','success')]
        ]
      )
    );
}

function buildBranchUpload() {
  return pageHeader('رفع البيانات', 'رفع بيانات الفرع اليومية — 3 ملفات معلقة',
    '<button class="btn btn-primary">📤 رفع جميع الملفات</button>') +
    alertBox('warning', '3 ملفات لم يتم رفعها بعد: الشفتات، الموظفون، العهدة') +
    '<div id="upload-tabs">' +
    '<div class="tabs">' +
    ['المبيعات','المصروفات','المشتريات','المخزون','الجرد اليومي','الهدر','الشفتات','الموظفون','العهدة'].map(function(t, i) {
      return '<div class="tab' + (i===0?' active':'') + '" data-tab="upload-' + i + '" onclick="switchTab(\'upload-tabs\',\'upload-' + i + '\')">' + t + '</div>';
    }).join('') +
    '</div>' +
    ['المبيعات','المصروفات','المشتريات','المخزون','الجرد اليومي','الهدر','الشفتات','الموظفون','العهدة'].map(function(t, i) {
      var uploaded = i < 6;
      return '<div class="tab-content' + (i===0?' active':'') + '" data-tab="upload-' + i + '">' +
        '<div style="padding:20px;">' +
        (uploaded ?
          alertBox('success', 'تم رفع ملف ' + t + ' بنجاح') :
          alertBox('warning', 'لم يتم رفع ملف ' + t + ' بعد')
        ) +
        '<div style="margin-top:16px;">' +
        '<div style="font-size:12.5px;font-weight:700;color:#374151;margin-bottom:10px;">الملفات المطلوبة لـ ' + t + ':</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;">' +
        ['ملف البيانات الرئيسي (Excel/CSV)', 'صورة الفاتورة أو الإيصال', 'ملف التوقيع الرقمي (اختياري)'].map(function(f, fi) {
          return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#F8FAFD;border-radius:8px;border:1px solid #E8EDF7;">' +
            '<span style="font-size:13px;">' + (uploaded && fi===0 ? '✅ ' : '📎 ') + f + '</span>' +
            (uploaded && fi===0 ?
              '<span style="font-size:11px;color:#059669;font-weight:600;">تم الرفع</span>' :
              '<button class="btn btn-sm btn-primary">رفع</button>'
            ) +
            '</div>';
        }).join('') +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }).join('') +
    '</div>';
}

function buildBranchSettings() {
  return pageHeader('إعدادات الفرع', 'إعدادات فرع الملز') +
    '<div class="grid-2">' +
    card('📋 معلومات الفرع',
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div class="form-group"><label class="form-label">اسم الفرع</label><input class="form-input" value="فرع الملز" readonly></div>' +
      '<div class="form-group"><label class="form-label">المدينة</label><input class="form-input" value="الرياض" readonly></div>' +
      '<div class="form-group"><label class="form-label">العنوان</label><input class="form-input" value="حي الملز، شارع الأمير فيصل"></div>' +
      '<div class="form-group"><label class="form-label">جوال التواصل</label><input class="form-input" value="0501234567"></div>' +
      '<button class="btn btn-primary">💾 حفظ</button>' +
      '</div>'
    ) +
    card('👤 معلومات المدير',
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
      '<div class="form-group"><label class="form-label">الاسم</label><input class="form-input" value="سلطان الغامدي" readonly></div>' +
      '<div class="form-group"><label class="form-label">الجوال</label><input class="form-input" value="0507654321"></div>' +
      '<div class="form-group"><label class="form-label">البريد الإلكتروني</label><input class="form-input" value="sultan@asab.com"></div>' +
      '<div class="form-group"><label class="form-label">كلمة المرور الجديدة</label><input class="form-input" type="password" placeholder="اتركها فارغة إن لم تريد التغيير"></div>' +
      '<button class="btn btn-primary">💾 حفظ</button>' +
      '</div>'
    ) +
    '</div>';
}

// ══════════════════════════════════════════════════════════════
//  PROCUREMENT MANAGER PAGES
// ══════════════════════════════════════════════════════════════
function buildProcurementPages(container) {
  container.innerHTML +=
    page('proc-overview',  buildProcOverview()) +
    page('proc-requests',  buildProcRequests()) +
    page('proc-grouped',   buildProcGrouped()) +
    page('proc-sent',      buildProcSent()) +
    page('proc-items',     buildProcItems()) +
    page('proc-suppliers', buildProcSuppliers()) +
    page('proc-reports',   buildProcReports());
}

function buildProcOverview() {
  return pageHeader('لوحة تحكم مدير المشتريات', 'إدارة طلبات الشراء من جميع الفروع',
    '<button class="btn btn-primary" onclick="goTo(\'proc-grouped\')">📦 تجميع الطلبات</button>') +
    '<div class="kpi-grid">' +
    kpiCard('طلبات جديدة', '8', 'من الفروع', 'orange', '📋') +
    kpiCard('مجمّعة جاهزة', '3', 'للإرسال للموردين', 'blue', '📦') +
    kpiCard('مرسلة للموردين', '5', 'في انتظار التأكيد', 'teal', '📤') +
    kpiCard('مكتملة اليوم', '12', 'طلب', 'green', '✅') +
    '</div>' +
    alertBox('warning', '8 طلبات جديدة من الفروع تحتاج تجميع وإرسال') +
    '<div class="grid-2">' +
    card('📊 طلبات الفروع اليوم',
      dataTable(
        ['الفرع','عدد الأصناف','الإجمالي التقديري','الأولوية','الحالة'],
        [
          ['فرع الملز','4 أصناف','2,136 ر.س',badge('عاجل','danger'),badge('جديد','info')],
          ['فرع النزهة','6 أصناف','1,850 ر.س',badge('عادي','success'),badge('جديد','info')],
          ['فرع العليا','3 أصناف','1,400 ر.س',badge('عادي','success'),badge('جديد','info')],
          ['فرع الروضة','5 أصناف','1,980 ر.س',badge('عاجل','danger'),badge('جديد','info')]
        ]
      )
    ) +
    card('📈 أداء الموردين',
      dataTable(
        ['المورد','الطلبات المكتملة','معدل الالتزام','متوسط التسليم'],
        [
          ['شركة الدواجن الذهبية','45','98%','2 يوم'],
          ['مستودع الأمانة','38','95%','1 يوم'],
          ['شركة التغليف','22','92%','3 أيام']
        ]
      )
    ) +
    '</div>';
}

function buildProcRequests() {
  return pageHeader('طلبات الفروع', '8 طلبات جديدة تحتاج معالجة') +
    filterBar(
      '<span class="filter-label">الفرع:</span>' +
      '<select class="filter-select"><option>جميع الفروع</option></select>' +
      '<span class="filter-label">الأولوية:</span>' +
      '<select class="filter-select"><option>الكل</option><option>عاجل</option><option>عادي</option></select>' +
      '<input type="date" class="filter-input">' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-primary" onclick="goTo(\'proc-grouped\')">📦 تجميع المحدد</button>'
    ) +
    card('طلبات الفروع',
      dataTable(
        ['#','الفرع','الصنف','الوحدة','الكمية المطلوبة','المورد المقترح','الأولوية','الحالة','إجراءات'],
        [
          ['1','فرع الملز','دجاج مجمد كامل','كجم','50','شركة الدواجن الذهبية',badge('عاجل','danger'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>'],
          ['2','فرع الملز','دجاج مجمد قطع','كجم','30','شركة الدواجن الذهبية',badge('عاجل','danger'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>'],
          ['3','فرع النزهة','دجاج مجمد كامل','كجم','40','شركة الدواجن الذهبية',badge('عادي','success'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>'],
          ['4','فرع النزهة','زيت نباتي','لتر','20','مستودع الأمانة',badge('عادي','success'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>'],
          ['5','فرع العليا','أرز','كجم','30','مستودع الأمانة',badge('عادي','success'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>'],
          ['6','فرع الروضة','دجاج مجمد كامل','كجم','60','شركة الدواجن الذهبية',badge('عاجل','danger'),badge('جديد','info'),'<button class="btn btn-sm btn-primary">تجميع</button>']
        ]
      )
    );
}

function buildProcGrouped() {
  return pageHeader('تجميع الطلبات', 'تجميع طلبات الفروع حسب المورد') +
    alertBox('info', 'تم تجميع الطلبات تلقائياً حسب المورد — راجع وأرسل') +
    card('🏭 شركة الدواجن الذهبية — إجمالي: 180 كجم',
      '<div style="margin-bottom:12px;display:flex;gap:8px;">' +
      '<button class="btn btn-primary">📤 إرسال للمورد</button>' +
      '<button class="btn btn-ghost">✏️ تعديل</button>' +
      '</div>' +
      dataTable(
        ['الصنف','الوحدة','فرع الملز','فرع النزهة','فرع الروضة','الإجمالي','سعر الوحدة','الإجمالي المالي'],
        [
          ['دجاج مجمد كامل','كجم','50','40','60','150 كجم','18 ر.س','2,700 ر.س'],
          ['دجاج مجمد قطع','كجم','30','0','0','30 كجم','22 ر.س','660 ر.س']
        ]
      )
    ) +
    card('🏪 مستودع الأمانة — إجمالي: 50 وحدة',
      '<div style="margin-bottom:12px;display:flex;gap:8px;">' +
      '<button class="btn btn-primary">📤 إرسال للمورد</button>' +
      '<button class="btn btn-ghost">✏️ تعديل</button>' +
      '</div>' +
      dataTable(
        ['الصنف','الوحدة','فرع النزهة','فرع العليا','الإجمالي','سعر الوحدة','الإجمالي المالي'],
        [
          ['زيت نباتي','لتر','20','0','20 لتر','12 ر.س','240 ر.س'],
          ['أرز','كجم','0','30','30 كجم','8 ر.س','240 ر.س']
        ]
      )
    );
}

function buildProcSent() {
  return pageHeader('المرسلة للموردين', 'متابعة الطلبات المرسلة') +
    card('الطلبات المرسلة',
      dataTable(
        ['#','المورد','تاريخ الإرسال','عدد الأصناف','الإجمالي','حالة التأكيد','تاريخ التسليم المتوقع','إجراءات'],
        [
          ['1','شركة الدواجن الذهبية','13/03/2026','2 صنف','3,360 ر.س',badge('مؤكد','success'),'14/03/2026','<button class="btn btn-sm btn-ghost">تتبع</button>'],
          ['2','مستودع الأمانة','13/03/2026','2 صنف','480 ر.س',badge('مؤكد','success'),'14/03/2026','<button class="btn btn-sm btn-ghost">تتبع</button>'],
          ['3','شركة التغليف','12/03/2026','1 صنف','350 ر.س',badge('في الطريق','info'),'14/03/2026','<button class="btn btn-sm btn-ghost">تتبع</button>']
        ]
      )
    );
}

function buildProcItems() {
  return pageHeader('الأصناف والأسعار', 'قائمة الأصناف المعتمدة وأسعار الموردين') +
    card('الأصناف والأسعار',
      dataTable(
        ['#','الصنف','الوحدة','المورد الأساسي','سعر الوحدة','آخر تحديث','الحالة'],
        [
          ['1','دجاج مجمد كامل','كجم','شركة الدواجن الذهبية','18 ر.س','01/03/2026',badge('معتمد','success')],
          ['2','دجاج مجمد قطع','كجم','شركة الدواجن الذهبية','22 ر.س','01/03/2026',badge('معتمد','success')],
          ['3','دجاج طازج','كجم','شركة الدواجن الذهبية','25 ر.س','01/03/2026',badge('معتمد','success')],
          ['4','زيت نباتي','لتر','مستودع الأمانة','12 ر.س','01/03/2026',badge('معتمد','success')],
          ['5','أرز','كجم','مستودع الأمانة','8 ر.س','01/03/2026',badge('معتمد','success')]
        ]
      )
    );
}

function buildProcSuppliers() {
  return pageHeader('الموردون', 'إدارة قائمة الموردين المعتمدين') +
    card('قائمة الموردين',
      dataTable(
        ['#','اسم المورد','الفئة','جوال','البريد','الطلبات المكتملة','معدل الالتزام','الحالة'],
        [
          ['1','شركة الدواجن الذهبية','دواجن ولحوم','0501234567','golden@supplier.com','45','98%',badge('نشط','success')],
          ['2','مستودع الأمانة','مواد جافة','0507654321','amanah@supplier.com','38','95%',badge('نشط','success')],
          ['3','شركة التغليف','عبوات ومستلزمات','0509876543','pack@supplier.com','22','92%',badge('نشط','success')]
        ]
      )
    );
}

function buildProcReports() {
  return pageHeader('التقارير', 'تقارير المشتريات والموردين') +
    filterBar(
      '<span class="filter-label">الفترة:</span>' +
      '<select class="filter-select"><option>مارس 2026</option></select>' +
      '<span class="filter-label">المورد:</span>' +
      '<select class="filter-select"><option>الكل</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي الطلبات', '85', 'هذا الشهر', 'blue', '📋') +
    kpiCard('إجمالي المبالغ', '125,000 ر.س', 'هذا الشهر', 'green', '💰') +
    kpiCard('متوسط وقت التسليم', '1.8 يوم', 'لكل طلب', 'orange', '⏱️') +
    kpiCard('طلبات بفروق', '5', 'تحتاج تسوية', 'red', '⚠️') +
    '</div>' +
    card('📊 تقرير الموردين',
      dataTable(
        ['المورد','عدد الطلبات','إجمالي المبالغ','طلبات بفروق','معدل الالتزام','متوسط التسليم'],
        [
          ['شركة الدواجن الذهبية','45','85,000 ر.س','3','98%','2 يوم'],
          ['مستودع الأمانة','28','25,000 ر.س','1','95%','1 يوم'],
          ['شركة التغليف','12','15,000 ر.س','1','92%','3 أيام']
        ]
      )
    );
}

// ══════════════════════════════════════════════════════════════
//  SUPPLIER PAGES
// ══════════════════════════════════════════════════════════════
function buildSupplierPages(container) {
  container.innerHTML +=
    page('sup-overview', buildSupOverview()) +
    page('sup-new',      buildSupNew()) +
    page('sup-accepted', buildSupAccepted()) +
    page('sup-rejected', buildSupRejected()) +
    page('sup-items',    buildSupItems()) +
    page('sup-reports',  buildSupReports());
}

function buildSupOverview() {
  return pageHeader('لوحة تحكم المورد', 'شركة الدواجن الذهبية — نظرة عامة') +
    '<div class="kpi-grid">' +
    kpiCard('طلبات جديدة', '3', 'تحتاج تأكيد', 'orange', '🔔') +
    kpiCard('طلبات مقبولة', '12', 'هذا الشهر', 'green', '✅') +
    kpiCard('طلبات مرفوضة', '0', 'هذا الشهر', 'blue', '❌') +
    kpiCard('إجمالي المبالغ', '85,000 ر.س', 'هذا الشهر', 'teal', '💰') +
    '</div>' +
    alertBox('info', '3 طلبات جديدة تحتاج تأكيدك — يرجى المراجعة والرد') +
    card('📊 آخر الطلبات',
      dataTable(
        ['#','الفرع','الأصناف','الإجمالي','تاريخ الطلب','تاريخ التسليم المطلوب','الحالة'],
        [
          ['1','فرع الملز','دجاج مجمد كامل (50 كجم)، قطع (30 كجم)','3,360 ر.س','13/03/2026','14/03/2026',badge('جديد','info')],
          ['2','فرع الروضة','دجاج مجمد كامل (60 كجم)','1,080 ر.س','13/03/2026','14/03/2026',badge('جديد','info')],
          ['3','فرع النزهة','دجاج مجمد كامل (40 كجم)','720 ر.س','13/03/2026','14/03/2026',badge('جديد','info')]
        ]
      )
    );
}

function buildSupNew() {
  return pageHeader('الطلبات الجديدة', '3 طلبات تحتاج تأكيدك') +
    '<div style="display:flex;flex-direction:column;gap:16px;">' +
    [
      { branch:'فرع الملز', items:'دجاج مجمد كامل (50 كجم) + دجاج مجمد قطع (30 كجم)', total:'3,360 ر.س', delivery:'14/03/2026' },
      { branch:'فرع الروضة', items:'دجاج مجمد كامل (60 كجم)', total:'1,080 ر.س', delivery:'14/03/2026' },
      { branch:'فرع النزهة', items:'دجاج مجمد كامل (40 كجم)', total:'720 ر.س', delivery:'14/03/2026' }
    ].map(function(req) {
      return '<div class="card" style="border-right:4px solid #D97706;">' +
        '<div class="card-body">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">' +
        '<div>' +
        '<div style="font-size:11px;color:#6B7A99;margin-bottom:2px;">طلب جديد من</div>' +
        '<div style="font-size:15px;font-weight:700;color:#0D1B36;">' + req.branch + '</div>' +
        '</div>' +
        badge('جديد','info') +
        '</div>' +
        '<div style="padding:10px;background:#F8FAFD;border-radius:8px;margin-bottom:12px;">' +
        '<div style="font-size:12px;color:#6B7A99;margin-bottom:4px;">الأصناف المطلوبة:</div>' +
        '<div style="font-size:13px;font-weight:600;">' + req.items + '</div>' +
        '</div>' +
        '<div style="display:flex;gap:20px;margin-bottom:14px;">' +
        '<div><div style="font-size:11px;color:#6B7A99;">الإجمالي</div><div style="font-weight:700;color:#059669;">' + req.total + '</div></div>' +
        '<div><div style="font-size:11px;color:#6B7A99;">تاريخ التسليم المطلوب</div><div style="font-weight:700;">' + req.delivery + '</div></div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;">' +
        '<button class="btn btn-success">✅ قبول الطلب</button>' +
        '<button class="btn btn-danger">❌ رفض الطلب</button>' +
        '<button class="btn btn-ghost">💬 ملاحظة</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    }).join('') +
    '</div>';
}

function buildSupAccepted() {
  return pageHeader('الطلبات المقبولة', 'الطلبات التي تم قبولها هذا الشهر') +
    card('الطلبات المقبولة',
      dataTable(
        ['#','الفرع','الأصناف','الإجمالي','تاريخ القبول','تاريخ التسليم','حالة التسليم','إجراءات'],
        [
          ['1','فرع الملز','دجاج مجمد (80 كجم)','1,440 ر.س','12/03/2026','12/03/2026',badge('تم التسليم','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['2','فرع النزهة','دجاج مجمد (60 كجم)','1,080 ر.س','11/03/2026','11/03/2026',badge('تم التسليم','success'),'<button class="btn btn-sm btn-ghost">عرض</button>'],
          ['3','فرع العليا','دجاج مجمد (70 كجم)','1,260 ر.س','10/03/2026','10/03/2026',badge('تم التسليم','success'),'<button class="btn btn-sm btn-ghost">عرض</button>']
        ]
      )
    );
}

function buildSupRejected() {
  return pageHeader('الطلبات المرفوضة', 'الطلبات التي تم رفضها') +
    alertBox('success', 'لا توجد طلبات مرفوضة هذا الشهر') +
    card('سجل الطلبات المرفوضة',
      dataTable(
        ['#','الفرع','الأصناف','سبب الرفض','التاريخ'],
        []
      )
    );
}

function buildSupItems() {
  return pageHeader('الأصناف والأسعار', 'قائمة أصنافك وأسعارك المعتمدة') +
    card('قائمة الأصناف',
      dataTable(
        ['#','الصنف','الوحدة','سعر الوحدة','الحد الأدنى للطلب','المخزون المتاح','الحالة','إجراءات'],
        [
          ['1','دجاج مجمد كامل','كجم','18 ر.س','20 كجم','5,000 كجم',badge('متوفر','success'),'<button class="btn btn-sm btn-ghost">تعديل السعر</button>'],
          ['2','دجاج مجمد قطع','كجم','22 ر.س','10 كجم','3,000 كجم',badge('متوفر','success'),'<button class="btn btn-sm btn-ghost">تعديل السعر</button>'],
          ['3','دجاج طازج','كجم','25 ر.س','10 كجم','1,000 كجم',badge('محدود','warning'),'<button class="btn btn-sm btn-ghost">تعديل السعر</button>']
        ]
      )
    );
}

function buildSupReports() {
  return pageHeader('التقارير', 'تقارير مبيعاتك وأدائك') +
    filterBar(
      '<span class="filter-label">الفترة:</span>' +
      '<select class="filter-select"><option>مارس 2026</option></select>' +
      '<button class="btn btn-sm btn-primary">تطبيق</button>' +
      '<div class="filter-divider"></div>' +
      '<button class="btn btn-sm btn-ghost">📥 Excel</button>'
    ) +
    '<div class="kpi-grid">' +
    kpiCard('إجمالي الطلبات', '45', 'هذا الشهر', 'blue', '📋') +
    kpiCard('إجمالي المبالغ', '85,000 ر.س', 'هذا الشهر', 'green', '💰', '+12%') +
    kpiCard('معدل الالتزام', '98%', 'بالمواعيد', 'teal', '⏱️') +
    kpiCard('طلبات بفروق', '3', 'تحتاج تسوية', 'orange', '⚠️') +
    '</div>' +
    card('📊 ملخص الأداء',
      dataTable(
        ['الصنف','الكمية المباعة','الإجمالي','عدد الطلبات'],
        [
          ['دجاج مجمد كامل','2,500 كجم','45,000 ر.س','25 طلب'],
          ['دجاج مجمد قطع','1,200 كجم','26,400 ر.س','15 طلب'],
          ['دجاج طازج','540 كجم','13,500 ر.س','5 طلبات']
        ]
      )
    );
}

// ══════════════════════════════════════════════════════════════
//  EXPOSE GLOBAL FUNCTIONS
// ══════════════════════════════════════════════════════════════
window.enterApp           = enterApp;
window.goTo               = goTo;
window.logout             = logout;
window.switchTab          = switchTab;
window.openModal          = openModal;
window.showAppsBreakdown  = showAppsBreakdown;
window.showExpenseDetail  = showExpenseDetail;
window.showPurchaseDetail = showPurchaseDetail;
window.showInventoryDetail= showInventoryDetail;
window.showWasteDetail    = showWasteDetail;
window.showEmployeeHistory= showEmployeeHistory;
window.showCustodyHistory = showCustodyHistory;
window.showOpDetail       = showOpDetail;
window.showAddUserModal   = showAddUserModal;
window.lookupEmployee     = lookupEmployee;

// ══════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  // Make sure app is hidden and role selector is visible
  var app = document.getElementById('app');
  var selector = document.getElementById('role-selector');
  if (app) app.style.display = 'none';
  if (selector) selector.style.display = 'flex';
});
