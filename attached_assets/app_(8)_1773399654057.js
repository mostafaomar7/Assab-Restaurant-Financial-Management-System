// ══════════════════════════════════════════════════════════════
//  ASAB Prototype — Navigation & Role Logic
// ══════════════════════════════════════════════════════════════

const ROLES = {
  admin: {
    name: 'عبدالله الأحمد',
    avatar: 'عب',
    label: 'الإداري الرئيسي',
    nav: [
      { section: 'الرئيسية' },
      { id: 'admin-overview', icon: '📊', label: 'نظرة عامة' },
      { section: 'الإدارة' },
      { id: 'admin-users', icon: '👥', label: 'المستخدمون', badge: '3' },
      { id: 'admin-restaurants', icon: '🏪', label: 'المطاعم والفروع' },
      { id: 'admin-subscriptions', icon: '💳', label: 'الاشتراكات', badge: '2', badgeColor: 'yellow' },
      { id: 'admin-permissions', icon: '🔐', label: 'الصلاحيات' },
      { section: 'التقارير' },
      { id: 'admin-reports-manager', icon: '📈', label: 'مدير التقارير' },
      { id: 'admin-audit-log', icon: '📋', label: 'سجل النشاطات' },
      { section: 'النظام' },
      { id: 'admin-settings', icon: '⚙️', label: 'إعدادات النظام' },
    ]
  },
  head: {
    name: 'خالد العمري',
    avatar: 'خع',
    label: 'رئيس الحسابات',
    nav: [
      { section: 'الرئيسية' },
      { id: 'head-overview', icon: '📊', label: 'لوحة التحكم' },
      { section: 'المراجعة' },
      { id: 'head-pending', icon: '⏳', label: 'بانتظار الاعتماد', badge: '125' },
      { id: 'head-approved', icon: '✅', label: 'المعتمدة' },
      { id: 'head-rejected', icon: '❌', label: 'المرفوضة' },
      { section: 'الموديولات' },
      { id: 'head-sales', icon: '💰', label: 'المبيعات' },
      { id: 'head-expenses', icon: '💸', label: 'المصروفات' },
      { id: 'head-purchases', icon: '🛒', label: 'المشتريات' },
      { id: 'head-inventory', icon: '📦', label: 'المخزون' },
      { id: 'head-shifts', icon: '⏰', label: 'الشفتات' },
      { id: 'head-employees', icon: '👤', label: 'كشف حساب الموظفين' },
      { id: 'head-custody', icon: '💼', label: 'العهد النقدية' },
      { section: 'الإدارة' },
      { id: 'head-accountants', icon: '👥', label: 'أداء المحاسبين' },
      { id: 'head-erp-export', icon: '🔗', label: 'التصدير لـ ERP' },
      { id: 'head-reports', icon: '📈', label: 'التقارير' },
    ]
  },
  accountant: {
    name: 'أحمد محمد',
    avatar: 'أم',
    label: 'محاسب — الفروع 1-50',
    nav: [
      { section: 'الرئيسية' },
      { id: 'acc-overview', icon: '📊', label: 'لوحة التحكم' },
      { section: 'العمليات' },
      { id: 'acc-pending', icon: '⏳', label: 'العمليات المعلقة', badge: '13' },
      { id: 'acc-approved', icon: '✅', label: 'الموافق عليها' },
      { id: 'acc-rejected', icon: '❌', label: 'المرفوضة' },
      { section: 'الموديولات' },
      { id: 'acc-sales', icon: '💰', label: 'المبيعات' },
      { id: 'acc-expenses', icon: '💸', label: 'المصروفات' },
      { id: 'acc-purchases', icon: '🛒', label: 'المشتريات' },
      { id: 'acc-inventory', icon: '📦', label: 'المخزون' },
      { id: 'acc-waste', icon: '🗑️', label: 'الهدر والتالف' },
      { id: 'acc-shifts', icon: '⏰', label: 'الشفتات' },
      { id: 'acc-employees', icon: '👤', label: 'كشف حساب الموظفين' },
      { id: 'acc-custody', icon: '💼', label: 'العهد النقدية' },
      { section: 'التقارير' },
      { id: 'acc-reports', icon: '📈', label: 'التقارير' },
    ]
  },
  branch: {
    name: 'أحمد محمد',
    avatar: 'أم',
    label: 'مدير فرع الرياض العليا',
    nav: [
      { section: 'الرئيسية' },
      { id: 'branch-overview', icon: '📊', label: 'نظرة عامة' },
      { section: 'إدارة البيانات' },
      { id: 'branch-employees', icon: '👥', label: 'الموظفون' },
      { id: 'branch-items', icon: '📦', label: 'الأصناف' },
      { id: 'branch-suppliers', icon: '🏢', label: 'الموردون' },
      { id: 'branch-upload', icon: '📤', label: 'رفع البيانات' },
      { section: 'الإعدادات' },
      { id: 'branch-settings', icon: '⚙️', label: 'إعدادات الفرع' },
    ]
  },
  procurement: {
    name: 'سعيد أحمد',
    avatar: 'سأ',
    label: 'مدير المشتريات',
    nav: [
      { section: 'الرئيسية' },
      { id: 'proc-overview', icon: '📊', label: 'لوحة التحكم' },
      { section: 'الطلبات' },
      { id: 'proc-new', icon: '📥', label: 'الطلبات الجديدة', badge: '45' },
      { id: 'proc-grouped', icon: '📦', label: 'الطلبات المجمعة' },
      { id: 'proc-sent', icon: '📤', label: 'المرسلة للموردين' },
      { section: 'الإدارة' },
      { id: 'proc-items', icon: '🍗', label: 'الأصناف' },
      { id: 'proc-suppliers', icon: '🏢', label: 'الموردون' },
      { id: 'proc-reports', icon: '📈', label: 'التقارير' },
    ]
  },
  supplier: {
    name: 'محمد العلي',
    avatar: 'مع',
    label: 'مورد — شركة الدواجن الوطنية',
    nav: [
      { section: 'الرئيسية' },
      { id: 'sup-overview', icon: '📊', label: 'لوحة التحكم' },
      { section: 'الطلبات' },
      { id: 'sup-new', icon: '📥', label: 'الطلبات الجديدة', badge: '3' },
      { id: 'sup-accepted', icon: '✅', label: 'المقبولة' },
      { id: 'sup-rejected', icon: '❌', label: 'المرفوضة' },
      { section: 'الكتالوج' },
      { id: 'sup-items', icon: '📦', label: 'الأصناف والأسعار' },
      { id: 'sup-reports', icon: '📈', label: 'تقارير المبيعات' },
    ]
  }
};

let currentRole = null;
let currentPage = null;

function enterApp(role) {
  currentRole = role;
  const roleData = ROLES[role];

  // Hide selector
  document.getElementById('role-selector').style.display = 'none';
  const app = document.getElementById('app');
  app.classList.add('active');

  // Set user info
  document.getElementById('user-avatar').textContent = roleData.avatar;
  document.getElementById('user-name').textContent = roleData.name;
  document.getElementById('user-role-label').textContent = roleData.label;

  // Build nav
  buildNav(roleData.nav);

  // Build pages
  buildPages(role);

  // Navigate to first page
  const firstPage = roleData.nav.find(n => n.id);
  if (firstPage) navigateTo(firstPage.id);
}

function buildNav(navItems) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  navItems.forEach(item => {
    if (item.section) {
      const label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = item.section;
      nav.appendChild(label);
    } else {
      const el = document.createElement('div');
      el.className = 'nav-item';
      el.id = 'nav-' + item.id;
      el.onclick = () => navigateTo(item.id);
      let badgeHtml = '';
      if (item.badge) {
        const cls = item.badgeColor === 'yellow' ? 'nav-badge yellow' : 'nav-badge';
        badgeHtml = `<span class="${cls}">${item.badge}</span>`;
      }
      el.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}${badgeHtml}`;
      nav.appendChild(el);
    }
  });
}

function navigateTo(pageId) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');

  // Update pages
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  const pageEl = document.getElementById('page-' + pageId);
  if (pageEl) pageEl.classList.add('active');

  // Update topbar
  const navData = ROLES[currentRole].nav.find(n => n.id === pageId);
  if (navData) {
    document.getElementById('topbar-title').textContent = navData.label;
    document.getElementById('topbar-subtitle').textContent = ROLES[currentRole].label;
  }

  currentPage = pageId;
}

function logout() {
  document.getElementById('role-selector').style.display = 'flex';
  document.getElementById('app').classList.remove('active');
  currentRole = null;
}

function switchTab(tabGroupId, tabId) {
  const group = document.getElementById(tabGroupId);
  if (!group) return;
  group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  group.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  const tab = group.querySelector(`[data-tab="${tabId}"]`);
  if (tab) tab.classList.add('active');
  const content = document.getElementById(tabGroupId + '-' + tabId);
  if (content) content.classList.add('active');
}

// ══════════════════════════════════════════════════════════════
//  PAGE BUILDER
// ══════════════════════════════════════════════════════════════
function buildPages(role) {
  const container = document.getElementById('pages-container');
  container.innerHTML = '';

  const builders = {
    admin: buildAdminPages,
    head: buildHeadPages,
    accountant: buildAccountantPages,
    branch: buildBranchPages,
    procurement: buildProcurementPages,
    supplier: buildSupplierPages,
  };

  if (builders[role]) builders[role](container);
}

// ─── HELPER: create page wrapper ───
function createPage(id, content) {
  return `<div class="page" id="page-${id}">${content}</div>`;
}

// ─── HELPER: page header ───
function pageHeader(title, desc, actions = '') {
  return `
  <div class="page-header">
    <div class="page-header-left">
      <div class="page-title">${title}</div>
      ${desc ? `<div class="page-desc">${desc}</div>` : ''}
    </div>
    <div class="page-header-right">${actions}</div>
  </div>`;
}

// ─── HELPER: KPI card ───
function kpiCard(label, value, sub, color, icon) {
  return `
  <div class="kpi-card ${color}">
    <div class="kpi-label">${label}</div>
    <div class="kpi-value">${value}</div>
    ${sub ? `<div class="kpi-sub">${sub}</div>` : ''}
    <div class="kpi-icon">${icon}</div>
  </div>`;
}

// ─── HELPER: card wrapper ───
function card(title, body, footer = '', headerActions = '') {
  return `
  <div class="card mb-20">
    <div class="card-header">
      <div class="card-title">${title}</div>
      ${headerActions}
    </div>
    <div class="card-body">${body}</div>
    ${footer ? `<div class="card-footer">${footer}</div>` : ''}
  </div>`;
}

// ─── HELPER: operation card ───
function opCard(type, branch, amount, time, status, attachments, statusClass) {
  const statusBadge = {
    'متطابق': 'badge-success',
    'يحتاج مراجعة': 'badge-warning',
    'فرق في الكمية': 'badge-danger',
    'مرفوض': 'badge-danger',
    'معتمد': 'badge-success',
  };
  return `
  <div class="op-card">
    <div class="op-card-header">
      <div class="op-card-title">
        <span>${type}</span>
        <span class="badge ${statusBadge[status] || 'badge-neutral'}">${status}</span>
      </div>
      <div class="op-amount">${amount}</div>
    </div>
    <div class="op-card-meta">
      <span>🏪 ${branch}</span>
      <span>⏰ ${time}</span>
      <span>📎 ${attachments} مرفقات</span>
    </div>
    <div class="op-card-actions">
      <button class="btn btn-ghost btn-sm" onclick="showDetail()">👁️ عرض التفاصيل</button>
      <button class="btn btn-success btn-sm">✅ موافقة</button>
      <button class="btn btn-danger btn-sm">❌ رفض</button>
      <button class="btn btn-ghost btn-sm">💬 طلب توضيح</button>
    </div>
  </div>`;
}

function showDetail() {
  alert('في النموذج الأولي: سيتم فتح نافذة تفاصيل العملية مع جميع المرفقات والبيانات.');
}

// ══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ══════════════════════════════════════════════════════════════
function buildAdminPages(container) {
  container.innerHTML += createPage('admin-overview', buildAdminOverview());
  container.innerHTML += createPage('admin-users', buildAdminUsers());
  container.innerHTML += createPage('admin-restaurants', buildAdminRestaurants());
  container.innerHTML += createPage('admin-subscriptions', buildAdminSubscriptions());
  container.innerHTML += createPage('admin-permissions', buildAdminPermissions());
  container.innerHTML += createPage('admin-reports-manager', buildAdminReportsManager());
  container.innerHTML += createPage('admin-audit-log', buildAdminAuditLog());
  container.innerHTML += createPage('admin-settings', buildAdminSettings());
}

function buildAdminOverview() {
  return `
  ${pageHeader('نظرة عامة على النظام', 'الإداري الرئيسي — وصول شامل لجميع مكونات النظام')}
  <div class="kpi-grid">
    ${kpiCard('المطاعم النشطة', '25', '<span class="up">↑ 2 هذا الشهر</span>', 'blue', '🏪')}
    ${kpiCard('الفروع النشطة', '100', '<span class="up">↑ 5 هذا الشهر</span>', 'green', '🏬')}
    ${kpiCard('إجمالي المستخدمين', '2,450', '<span class="up">↑ 12 هذا الأسبوع</span>', 'gold', '👥')}
    ${kpiCard('Uptime النظام', '99.9%', 'آخر 30 يوم', 'green', '⚡')}
    ${kpiCard('العمليات اليوم', '1,245', '<span class="up">↑ 8% عن أمس</span>', 'blue', '📋')}
    ${kpiCard('معدل الاعتماد', '90%', 'هذا الشهر', 'orange', '✅')}
  </div>

  <div class="grid-2 mb-20">
    ${card('📊 توزيع المستخدمين', `
      <div style="display:flex;gap:20px;align-items:center;">
        <div class="donut-chart"><div class="donut-label">100</div></div>
        <div style="flex:1;">
          <div class="info-row">
            <span class="label"><span class="status-dot dot-blue" style="margin-left:6px;"></span>محاسبون</span>
            <span class="value">20 مستخدم</span>
            <div style="flex:1;margin-right:12px;"><div class="progress-bar"><div class="progress-fill" style="width:20%"></div></div></div>
          </div>
          <div class="info-row">
            <span class="label"><span class="status-dot dot-yellow" style="margin-left:6px;"></span>رؤساء حسابات</span>
            <span class="value">4 مستخدمين</span>
            <div style="flex:1;margin-right:12px;"><div class="progress-bar"><div class="progress-fill orange" style="width:4%"></div></div></div>
          </div>
          <div class="info-row">
            <span class="label"><span class="status-dot dot-green" style="margin-left:6px;"></span>مدراء فروع</span>
            <span class="value">75 مستخدم</span>
            <div style="flex:1;margin-right:12px;"><div class="progress-bar"><div class="progress-fill green" style="width:75%"></div></div></div>
          </div>
          <div class="info-row">
            <span class="label"><span class="status-dot dot-red" style="margin-left:6px;"></span>موردون</span>
            <span class="value">50 مستخدم</span>
            <div style="flex:1;margin-right:12px;"><div class="progress-bar"><div class="progress-fill red" style="width:50%"></div></div></div>
          </div>
        </div>
      </div>
    `)}
    ${card('🔔 تنبيهات النظام', `
      <div class="alert alert-warning"><span class="alert-icon">⚠️</span><div><strong>اشتراك مطعم هرفي</strong> ينتهي خلال 32 يوماً — يحتاج تجديد</div></div>
      <div class="alert alert-danger"><span class="alert-icon">🔴</span><div><strong>مطعم كودو</strong> لم يرسل بيانات منذ 3 أيام — تحقق من الفروع</div></div>
      <div class="alert alert-info"><span class="alert-icon">ℹ️</span><div><strong>3 مستخدمين جدد</strong> في انتظار تفعيل الحساب</div></div>
      <div class="alert alert-success"><span class="alert-icon">✅</span><div><strong>تصدير ERP</strong> اكتمل بنجاح — 145 عملية تم ترحيلها</div></div>
    `)}
  </div>

  <div class="grid-2 mb-20">
    ${card('📈 أداء العمليات — هذا الشهر', `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span class="text-sm text-muted">المبيعات</span>
          <span class="text-sm font-bold">450 عملية</span>
        </div>
        <div class="progress-bar"><div class="progress-fill green" style="width:90%"></div></div>
      </div>
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span class="text-sm text-muted">المصروفات</span>
          <span class="text-sm font-bold">380 عملية</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:76%"></div></div>
      </div>
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span class="text-sm text-muted">المشتريات</span>
          <span class="text-sm font-bold">290 عملية</span>
        </div>
        <div class="progress-bar"><div class="progress-fill orange" style="width:58%"></div></div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span class="text-sm text-muted">المخزون</span>
          <span class="text-sm font-bold">125 عملية</span>
        </div>
        <div class="progress-bar"><div class="progress-fill red" style="width:25%"></div></div>
      </div>
    `)}
    ${card('🏪 أنشط المطاعم', `
      <div class="table-wrap">
        <table>
          <thead><tr><th>المطعم</th><th>الفروع</th><th>العمليات</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr><td class="td-bold">مطعم البيك</td><td>50</td><td>450</td><td><span class="badge badge-success">نشط</span></td></tr>
            <tr><td class="td-bold">مطعم هرفي</td><td>12</td><td>180</td><td><span class="badge badge-success">نشط</span></td></tr>
            <tr><td class="td-bold">مطعم كودو</td><td>8</td><td>95</td><td><span class="badge badge-warning">تنبيه</span></td></tr>
            <tr><td class="td-bold">مطعم ماكدونالدز</td><td>15</td><td>220</td><td><span class="badge badge-success">نشط</span></td></tr>
            <tr><td class="td-bold">مطعم برجر كينج</td><td>10</td><td>150</td><td><span class="badge badge-success">نشط</span></td></tr>
          </tbody>
        </table>
      </div>
    `)}
  </div>`;
}

function buildAdminUsers() {
  return `
  ${pageHeader('إدارة المستخدمين', 'إضافة وتعديل وإدارة صلاحيات جميع المستخدمين',
    `<button class="btn btn-primary">➕ إضافة مستخدم</button>`)}
  
  <div class="filter-bar">
    <label>الدور:</label>
    <select class="filter-select">
      <option>الكل</option><option>محاسب</option><option>رئيس حسابات</option>
      <option>مدير فرع</option><option>مدير مشتريات</option><option>مورد</option>
    </select>
    <label>المطعم:</label>
    <select class="filter-select"><option>الكل</option><option>مطعم البيك</option><option>مطعم هرفي</option></select>
    <label>الحالة:</label>
    <select class="filter-select"><option>الكل</option><option>نشط</option><option>موقوف</option></select>
    <div class="filter-divider"></div>
    <input class="filter-input" placeholder="🔍 بحث بالاسم أو البريد..." style="flex:1;min-width:200px;">
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">📋 قائمة المستخدمين (100 مستخدم)</div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost btn-sm">📥 تصدير Excel</button>
      </div>
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>المستخدم</th><th>الدور</th><th>المطعم/الفرع</th>
              <th>الموديولات</th><th>الفروع المخصصة</th><th>آخر دخول</th>
              <th>الحالة</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="avatar-sm">أم</div>
                  <div><div class="td-bold">أحمد محمد</div><div class="text-xs text-muted">ahmed@asab.sa</div></div>
                </div>
              </td>
              <td><span class="badge badge-info">محاسب</span></td>
              <td>مطعم البيك</td>
              <td><span class="chip">مبيعات</span> <span class="chip">مصروفات</span></td>
              <td>الفروع 1-50</td>
              <td class="text-sm text-muted">منذ ساعة</td>
              <td><span class="badge badge-success"><span class="status-dot dot-green"></span> نشط</span></td>
              <td>
                <button class="btn btn-ghost btn-xs">✏️ تعديل</button>
                <button class="btn btn-ghost btn-xs">🔐 صلاحيات</button>
              </td>
            </tr>
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="avatar-sm" style="background:var(--warning);">خع</div>
                  <div><div class="td-bold">خالد العمري</div><div class="text-xs text-muted">khaled@asab.sa</div></div>
                </div>
              </td>
              <td><span class="badge badge-warning">رئيس حسابات</span></td>
              <td>مطعم البيك</td>
              <td><span class="chip">جميع الموديولات</span></td>
              <td>جميع الفروع</td>
              <td class="text-sm text-muted">منذ 30 دقيقة</td>
              <td><span class="badge badge-success"><span class="status-dot dot-green"></span> نشط</span></td>
              <td>
                <button class="btn btn-ghost btn-xs">✏️ تعديل</button>
                <button class="btn btn-ghost btn-xs">🔐 صلاحيات</button>
              </td>
            </tr>
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="avatar-sm" style="background:var(--success);">فن</div>
                  <div><div class="td-bold">فاطمة النجار</div><div class="text-xs text-muted">fatima@asab.sa</div></div>
                </div>
              </td>
              <td><span class="badge badge-info">محاسب</span></td>
              <td>مطعم هرفي</td>
              <td><span class="chip">مشتريات</span> <span class="chip">مخزون</span></td>
              <td>جميع الفروع</td>
              <td class="text-sm text-muted">منذ 2 ساعة</td>
              <td><span class="badge badge-success"><span class="status-dot dot-green"></span> نشط</span></td>
              <td>
                <button class="btn btn-ghost btn-xs">✏️ تعديل</button>
                <button class="btn btn-ghost btn-xs">🔐 صلاحيات</button>
              </td>
            </tr>
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:8px;">
                  <div class="avatar-sm" style="background:var(--danger);">سم</div>
                  <div><div class="td-bold">سالم المطيري</div><div class="text-xs text-muted">salem@asab.sa</div></div>
                </div>
              </td>
              <td><span class="badge badge-primary">مدير فرع</span></td>
              <td>فرع الرياض العليا</td>
              <td>—</td>
              <td>فرع واحد</td>
              <td class="text-sm text-muted">منذ 5 ساعات</td>
              <td><span class="badge badge-neutral"><span class="status-dot dot-yellow"></span> غير نشط</span></td>
              <td>
                <button class="btn btn-ghost btn-xs">✏️ تعديل</button>
                <button class="btn btn-success btn-xs">🔓 تفعيل</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <span class="text-sm text-muted">عرض 4 من 100 مستخدم</span>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost btn-sm">السابق</button>
        <button class="btn btn-primary btn-sm">التالي</button>
      </div>
    </div>
  </div>

  <!-- Add User Form -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">➕ إضافة مستخدم جديد</div>
    </div>
    <div class="card-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">الاسم الكامل *</label>
          <input class="form-input" placeholder="أدخل الاسم الكامل">
        </div>
        <div class="form-group">
          <label class="form-label">البريد الإلكتروني *</label>
          <input class="form-input" type="email" placeholder="user@example.com">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">رقم الهاتف</label>
          <input class="form-input" placeholder="+966 5x xxx xxxx">
        </div>
        <div class="form-group">
          <label class="form-label">الدور *</label>
          <select class="form-select">
            <option>اختر الدور</option>
            <option>محاسب</option><option>رئيس حسابات</option>
            <option>مدير فرع</option><option>مدير مشتريات</option><option>مورد</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">المطعم/الشركة</label>
          <select class="form-select">
            <option>اختر المطعم</option>
            <option>مطعم البيك</option><option>مطعم هرفي</option><option>مطعم كودو</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">رئيس الحسابات المسؤول</label>
          <select class="form-select">
            <option>اختر رئيس الحسابات</option>
            <option>خالد العمري</option><option>محمد السعيد</option>
          </select>
        </div>
      </div>
      <div class="section-divider"><span>تخصيص الصلاحيات</span></div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">الموديولات المخصصة (أفقي)</label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;">
            ${['المبيعات','المصروفات','المشتريات','المخزون','الأصول','الشفتات','كشف الموظفين','العهد النقدية'].map(m =>
              `<label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;">
                <input type="checkbox"> ${m}
              </label>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">الفروع المخصصة (رأسي)</label>
          <select class="form-select">
            <option>جميع الفروع</option>
            <option>الفروع 1-20</option><option>الفروع 21-40</option>
            <option>الفروع 41-60</option><option>تخصيص يدوي</option>
          </select>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:8px;">
        <button class="btn btn-primary">💾 حفظ وإرسال بيانات الدخول</button>
        <button class="btn btn-ghost">إلغاء</button>
      </div>
    </div>
  </div>`;
}

function buildAdminRestaurants() {
  return `
  ${pageHeader('المطاعم والفروع', 'إدارة جميع المطاعم والفروع المسجلة في النظام',
    `<button class="btn btn-primary">➕ إضافة مطعم</button>`)}
  
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي المطاعم', '25', 'مطعم مسجل', 'blue', '🏪')}
    ${kpiCard('إجمالي الفروع', '100', 'فرع نشط', 'green', '🏬')}
    ${kpiCard('فروع بدون بيانات', '3', 'تحتاج متابعة', 'red', '⚠️')}
    ${kpiCard('متوسط الفروع/مطعم', '4', 'فروع لكل مطعم', 'gold', '📊')}
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">🏪 قائمة المطاعم</div>
      <input class="filter-input" placeholder="🔍 بحث..." style="width:220px;">
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المطعم</th><th>عدد الفروع</th><th>المحاسبون</th><th>رئيس الحسابات</th><th>آخر نشاط</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td><div class="td-bold">🍗 مطعم البيك</div><div class="text-xs text-muted">50 فرع في 5 مدن</div></td>
              <td>50</td><td>10</td><td>خالد العمري</td>
              <td class="text-sm text-muted">منذ 5 دقائق</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">عرض</button> <button class="btn btn-ghost btn-xs">تعديل</button></td>
            </tr>
            <tr>
              <td><div class="td-bold">🥩 مطعم هرفي</div><div class="text-xs text-muted">12 فرع في 3 مدن</div></td>
              <td>12</td><td>3</td><td>محمد السعيد</td>
              <td class="text-sm text-muted">منذ ساعة</td>
              <td><span class="badge badge-warning">تنبيه اشتراك</span></td>
              <td><button class="btn btn-ghost btn-xs">عرض</button> <button class="btn btn-ghost btn-xs">تعديل</button></td>
            </tr>
            <tr>
              <td><div class="td-bold">🍔 مطعم كودو</div><div class="text-xs text-muted">8 فروع في مدينتين</div></td>
              <td>8</td><td>2</td><td>سارة الأحمد</td>
              <td class="text-sm text-muted">منذ 3 أيام</td>
              <td><span class="badge badge-danger">بيانات متأخرة</span></td>
              <td><button class="btn btn-ghost btn-xs">عرض</button> <button class="btn btn-danger btn-xs">تنبيه</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildAdminSubscriptions() {
  return `
  ${pageHeader('إدارة الاشتراكات', 'متابعة اشتراكات جميع المطاعم والفواتير',
    `<button class="btn btn-primary">➕ إضافة اشتراك</button>`)}
  
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('الاشتراكات النشطة', '23', 'من أصل 25', 'green', '✅')}
    ${kpiCard('تنتهي قريباً', '2', 'خلال 30 يوم', 'orange', '⏰')}
    ${kpiCard('الإيراد الشهري', '185,000 ر.س', 'هذا الشهر', 'blue', '💰')}
    ${kpiCard('متأخرة الدفع', '0', 'لا توجد', 'green', '💳')}
  </div>

  <div class="card">
    <div class="card-header"><div class="card-title">📋 قائمة الاشتراكات</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المطعم</th><th>الباقة</th><th>الفروع</th><th>القيمة الشهرية</th><th>تاريخ الانتهاء</th><th>الأيام المتبقية</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">مطعم البيك</td>
              <td><span class="badge badge-primary">مؤسسية</span></td>
              <td>50 فرع</td>
              <td class="td-bold">10,000 ر.س</td>
              <td>30 ديسمبر 2026</td>
              <td><span class="badge badge-success">291 يوم</span></td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">⚙️ إعدادات</button></td>
            </tr>
            <tr>
              <td class="td-bold">مطعم هرفي</td>
              <td><span class="badge badge-info">متقدمة</span></td>
              <td>12 فرع</td>
              <td class="td-bold">5,000 ر.س</td>
              <td>15 أبريل 2026</td>
              <td><span class="badge badge-warning">33 يوم</span></td>
              <td><span class="badge badge-warning">تنبيه</span></td>
              <td><button class="btn btn-accent btn-xs">🔄 تجديد</button></td>
            </tr>
            <tr>
              <td class="td-bold">مطعم كودو</td>
              <td><span class="badge badge-neutral">أساسية</span></td>
              <td>8 فروع</td>
              <td class="td-bold">2,500 ر.س</td>
              <td>20 أبريل 2026</td>
              <td><span class="badge badge-warning">38 يوم</span></td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">⚙️ إعدادات</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildAdminPermissions() {
  return `
  ${pageHeader('إدارة الصلاحيات', 'تحديد وتعديل صلاحيات كل دور في النظام')}
  
  <div class="card mb-20">
    <div class="card-header"><div class="card-title">🔐 مصفوفة الصلاحيات</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table class="perm-matrix">
          <thead>
            <tr>
              <th>الوظيفة</th>
              <th>المحاسب</th>
              <th>رئيس الحسابات</th>
              <th>الأدمن</th>
              <th>مدير الفرع</th>
              <th>مدير المشتريات</th>
              <th>المورد</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="td-bold">عرض العمليات</td><td><span class="perm-partial">◑</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">الموافقة على العمليات</td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">الاعتماد النهائي</td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">الترحيل لـ ERP</td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">إدارة المستخدمين</td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">إدارة الاشتراكات</td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">رفع بيانات الفرع</td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">إدارة المشتريات</td><td><span class="perm-cross">✗</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">إدارة الأصناف والأسعار</td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-check">✓</span></td></tr>
            <tr><td class="td-bold">مدير التقارير</td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
            <tr><td class="td-bold">سجل النشاطات</td><td><span class="perm-cross">✗</span></td><td><span class="perm-partial">◑</span></td><td><span class="perm-check">✓</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td><td><span class="perm-cross">✗</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div style="display:flex;gap:16px;font-size:12px;">
        <span><span class="perm-check">✓</span> صلاحية كاملة</span>
        <span><span class="perm-partial">◑</span> صلاحية جزئية</span>
        <span><span class="perm-cross">✗</span> لا صلاحية</span>
      </div>
    </div>
  </div>`;
}

function buildAdminReportsManager() {
  return `
  ${pageHeader('مدير التقارير', 'استيراد التقارير من ERP، مراجعتها، وإرسالها لأصحاب المطاعم')}
  
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('تقارير جاهزة للإرسال', '25', 'لشهر مارس 2026', 'blue', '📊')}
    ${kpiCard('تم الإرسال', '18', 'هذا الشهر', 'green', '📧')}
    ${kpiCard('بانتظار الاعتماد', '7', 'تحتاج مراجعة', 'orange', '⏳')}
    ${kpiCard('لم يُستلم', '3', 'مطاعم لم تؤكد', 'red', '❓')}
  </div>

  <div id="reports-tabs" class="mb-20">
    <div class="tabs">
      <div class="tab active" data-tab="upload" onclick="switchTab('reports-tabs','upload')">📤 رفع التقارير</div>
      <div class="tab" data-tab="preview" onclick="switchTab('reports-tabs','preview')">👁️ معاينة التقارير</div>
      <div class="tab" data-tab="send" onclick="switchTab('reports-tabs','send')">📧 إرسال التقارير</div>
      <div class="tab" data-tab="history" onclick="switchTab('reports-tabs','history')">📋 سجل الإرسال</div>
    </div>

    <div id="reports-tabs-upload" class="tab-content active">
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">📤 رفع تقرير من ERP</div></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">المطعم *</label>
              <select class="form-select"><option>اختر المطعم</option><option>مطعم البيك</option><option>مطعم هرفي</option></select>
            </div>
            <div class="form-group">
              <label class="form-label">الفترة الزمنية *</label>
              <select class="form-select"><option>مارس 2026</option><option>فبراير 2026</option></select>
            </div>
            <div class="form-group">
              <label class="form-label">نوع التقرير *</label>
              <select class="form-select"><option>قائمة الدخل P&L</option><option>الميزانية العمومية</option><option>تقرير المبيعات</option></select>
            </div>
            <div class="upload-zone">
              <div class="upload-icon">📄</div>
              <div class="upload-text">اسحب ملف Excel هنا أو انقر للاختيار</div>
              <div class="upload-hint">يدعم: .xlsx, .xls — مُصدر مباشرة من ERP</div>
            </div>
            <div style="display:flex;gap:10px;margin-top:16px;">
              <button class="btn btn-primary">⬆️ رفع الآن</button>
              <button class="btn btn-ghost">📥 تحميل نموذج</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📋 التقارير المرفوعة مؤخراً</div></div>
          <div class="card-body" style="padding:0;">
            <div class="table-wrap">
              <table>
                <thead><tr><th>المطعم</th><th>الفترة</th><th>النوع</th><th>الحالة</th></tr></thead>
                <tbody>
                  <tr><td class="td-bold">البيك</td><td>مارس 2026</td><td>P&L</td><td><span class="badge badge-success">معتمد</span></td></tr>
                  <tr><td class="td-bold">هرفي</td><td>مارس 2026</td><td>P&L</td><td><span class="badge badge-warning">بانتظار</span></td></tr>
                  <tr><td class="td-bold">كودو</td><td>مارس 2026</td><td>P&L</td><td><span class="badge badge-info">مرفوع</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="reports-tabs-preview" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📊 معاينة التقرير — قائمة الدخل P&L</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span class="chip">🏪 مطعم البيك</span>
            <span class="chip">📅 مارس 2026</span>
            <span class="badge badge-success">معتمد</span>
          </div>
        </div>
        <div class="card-body">
          <div class="grid-2">
            <div>
              <div class="section-divider"><span>الإيرادات</span></div>
              <div class="info-row"><span class="label">💰 مبيعات نقدية</span><span class="value">850,000 ر.س</span></div>
              <div class="info-row"><span class="label">💳 مبيعات بطاقة</span><span class="value">950,000 ر.س</span></div>
              <div class="info-row"><span class="label">📱 مبيعات تطبيقات</span><span class="value">700,000 ر.س</span></div>
              <div class="info-row" style="background:var(--surface-2);border-radius:6px;padding:10px;"><span class="label font-bold">📊 إجمالي الإيرادات</span><span class="value" style="font-size:18px;color:var(--success);">2,500,000 ر.س</span></div>
              <div class="section-divider"><span>تكلفة المبيعات</span></div>
              <div class="info-row"><span class="label">🛒 مواد خام</span><span class="value">900,000 ر.س</span></div>
              <div class="info-row"><span class="label">📦 مخزون</span><span class="value">150,000 ر.س</span></div>
              <div class="info-row" style="background:var(--surface-2);border-radius:6px;padding:10px;"><span class="label font-bold">📊 إجمالي التكلفة</span><span class="value" style="font-size:18px;color:var(--danger);">1,050,000 ر.س</span></div>
            </div>
            <div>
              <div class="section-divider"><span>المصروفات التشغيلية</span></div>
              <div class="info-row"><span class="label">👥 رواتب</span><span class="value">450,000 ر.س</span></div>
              <div class="info-row"><span class="label">🏢 إيجارات</span><span class="value">200,000 ر.س</span></div>
              <div class="info-row"><span class="label">⚡ كهرباء وماء</span><span class="value">100,000 ر.س</span></div>
              <div class="info-row" style="background:var(--surface-2);border-radius:6px;padding:10px;"><span class="label font-bold">📊 إجمالي المصروفات</span><span class="value" style="font-size:18px;color:var(--warning);">750,000 ر.س</span></div>
              <div class="section-divider"><span>النتيجة</span></div>
              <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #bbf7d0;border-radius:10px;padding:20px;text-align:center;">
                <div class="text-sm text-muted">مجمل الربح</div>
                <div style="font-size:24px;font-weight:800;color:var(--success);">1,450,000 ر.س</div>
                <div class="text-sm text-muted">هامش 58%</div>
                <div class="divider"></div>
                <div class="text-sm text-muted">صافي الربح</div>
                <div style="font-size:28px;font-weight:800;color:var(--primary);">700,000 ر.س</div>
                <div class="text-sm text-muted">هامش 28%</div>
              </div>
            </div>
          </div>
          <div class="form-group mt-16">
            <label class="form-label">💬 ملاحظات داخلية</label>
            <textarea class="form-textarea" placeholder="أضف ملاحظاتك هنا..."></textarea>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-success">✅ اعتماد التقرير</button>
            <button class="btn btn-primary">📧 إرسال</button>
            <button class="btn btn-ghost">📥 تحميل PDF</button>
          </div>
        </div>
      </div>
    </div>

    <div id="reports-tabs-send" class="tab-content">
      <div class="card">
        <div class="card-header">
          <div class="card-title">📧 إرسال التقارير لأصحاب المطاعم</div>
        </div>
        <div class="card-body">
          <div class="filter-bar" style="margin-bottom:16px;">
            <label>الفترة:</label>
            <select class="filter-select"><option>مارس 2026</option></select>
            <label>نوع التقرير:</label>
            <select class="filter-select"><option>قائمة الدخل P&L</option></select>
            <label>المطعم:</label>
            <select class="filter-select"><option>الكل</option></select>
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
            <input type="checkbox" id="select-all"> <label for="select-all" style="font-size:13px;font-weight:600;">تحديد الكل (25 تقرير)</label>
          </div>
          ${['مطعم البيك','مطعم هرفي','مطعم كودو','مطعم ماكدونالدز','مطعم برجر كينج'].map(r => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <input type="checkbox" checked>
                <div>
                  <div class="font-semibold" style="font-size:13px;">${r} — قائمة الدخل — مارس 2026</div>
                  <div class="text-xs text-muted">✅ معتمد | 📅 13 مارس 2026</div>
                </div>
              </div>
              <button class="btn btn-ghost btn-xs">👁️ معاينة</button>
            </div>`).join('')}
          <div class="divider"></div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">طريقة الإرسال</label>
              <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="method" checked> بريد إلكتروني + إشعار في التطبيق</label>
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="method"> بريد إلكتروني فقط</label>
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="method"> إشعار في التطبيق فقط</label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">صيغة الملف</label>
              <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="format" checked> PDF</label>
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="format"> Excel</label>
                <label style="display:flex;align-items:center;gap:8px;font-size:13px;"><input type="radio" name="format"> كلاهما</label>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <button class="btn btn-primary">📧 إرسال المحدد (3 تقارير)</button>
            <button class="btn btn-accent">📧 إرسال الكل (25 تقرير)</button>
          </div>
        </div>
      </div>
    </div>

    <div id="reports-tabs-history" class="tab-content">
      <div class="card">
        <div class="card-header"><div class="card-title">📋 سجل الإرسال</div></div>
        <div class="card-body" style="padding:0;">
          <div class="table-wrap">
            <table>
              <thead><tr><th>المطعم</th><th>التقرير</th><th>تاريخ الإرسال</th><th>المستلم</th><th>الحالة</th></tr></thead>
              <tbody>
                <tr><td class="td-bold">مطعم البيك</td><td>P&L مارس 2026</td><td>13 مارس 2026 10:30</td><td>owner@albik.com</td><td><span class="badge badge-success">تم الاستلام</span></td></tr>
                <tr><td class="td-bold">مطعم هرفي</td><td>P&L مارس 2026</td><td>13 مارس 2026 10:31</td><td>info@herfy.com</td><td><span class="badge badge-warning">لم يُفتح</span></td></tr>
                <tr><td class="td-bold">مطعم كودو</td><td>P&L فبراير 2026</td><td>10 مارس 2026 09:00</td><td>cfo@kudu.com</td><td><span class="badge badge-success">تم الاستلام</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function buildAdminAuditLog() {
  return `
  ${pageHeader('سجل النشاطات', 'تتبع جميع الأحداث والتغييرات في النظام')}
  <div class="filter-bar">
    <label>المستخدم:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>النوع:</label>
    <select class="filter-select"><option>الكل</option><option>تسجيل دخول</option><option>موافقة</option><option>رفض</option><option>تعديل</option></select>
    <label>التاريخ:</label>
    <input class="filter-input" type="date" value="2026-03-13">
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الوقت</th><th>المستخدم</th><th>الإجراء</th><th>التفاصيل</th><th>IP</th></tr></thead>
          <tbody>
            <tr><td class="text-sm text-muted">10:45:23</td><td class="td-bold">خالد العمري</td><td><span class="badge badge-success">اعتماد</span></td><td>اعتماد 15 عملية مبيعات — مطعم البيك</td><td class="text-sm text-muted">192.168.1.5</td></tr>
            <tr><td class="text-sm text-muted">10:32:11</td><td class="td-bold">أحمد محمد</td><td><span class="badge badge-info">موافقة</span></td><td>موافقة على مصروف إيجار — فرع الرياض</td><td class="text-sm text-muted">192.168.1.12</td></tr>
            <tr><td class="text-sm text-muted">10:15:44</td><td class="td-bold">عبدالله الأحمد</td><td><span class="badge badge-warning">تعديل</span></td><td>تعديل صلاحيات المحاسب فاطمة النجار</td><td class="text-sm text-muted">192.168.1.1</td></tr>
            <tr><td class="text-sm text-muted">09:58:02</td><td class="td-bold">أحمد محمد</td><td><span class="badge badge-danger">رفض</span></td><td>رفض مشتريات — فرع مكة — فرق في الكمية</td><td class="text-sm text-muted">192.168.1.12</td></tr>
            <tr><td class="text-sm text-muted">09:30:00</td><td class="td-bold">عبدالله الأحمد</td><td><span class="badge badge-primary">ترحيل ERP</span></td><td>ترحيل 145 عملية معتمدة إلى نظام ERP</td><td class="text-sm text-muted">192.168.1.1</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildAdminSettings() {
  return `
  ${pageHeader('إعدادات النظام', 'الإعدادات العامة لنظام عصب')}
  <div class="grid-2">
    ${card('⚙️ إعدادات عامة', `
      <div class="form-group"><label class="form-label">اسم النظام</label><input class="form-input" value="نظام عصب ASAB"></div>
      <div class="form-group"><label class="form-label">المنطقة الزمنية</label><select class="form-select"><option>Asia/Riyadh (GMT+3)</option></select></div>
      <div class="form-group"><label class="form-label">العملة الافتراضية</label><select class="form-select"><option>ريال سعودي (SAR)</option></select></div>
      <div class="form-group"><label class="form-label">اللغة</label><select class="form-select"><option>العربية</option></select></div>
      <button class="btn btn-primary">💾 حفظ الإعدادات</button>
    `)}
    ${card('🔗 إعدادات ERP', `
      <div class="alert alert-info"><span class="alert-icon">ℹ️</span>التكامل التلقائي مع ERP متاح في المرحلة المتقدمة</div>
      <div class="form-group"><label class="form-label">نوع نظام ERP</label><select class="form-select"><option>يدوي (Excel)</option><option>SAP</option><option>Oracle</option><option>Microsoft Dynamics</option></select></div>
      <div class="form-group"><label class="form-label">رابط API (مستقبلي)</label><input class="form-input" placeholder="https://erp.example.com/api" disabled></div>
      <div class="form-group"><label class="form-label">تكرار التصدير التلقائي</label><select class="form-select"><option>يدوي</option><option>يومي</option><option>أسبوعي</option></select></div>
      <button class="btn btn-ghost">💾 حفظ</button>
    `)}
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  HEAD ACCOUNTANT PAGES
// ══════════════════════════════════════════════════════════════
function buildHeadPages(container) {
  container.innerHTML += createPage('head-overview', buildHeadOverview());
  container.innerHTML += createPage('head-pending', buildHeadPending());
  container.innerHTML += createPage('head-approved', buildHeadApproved());
  container.innerHTML += createPage('head-rejected', buildHeadRejected());
  container.innerHTML += createPage('head-sales', buildModuleSales('head'));
  container.innerHTML += createPage('head-expenses', buildModuleExpenses('head'));
  container.innerHTML += createPage('head-purchases', buildModulePurchases('head'));
  container.innerHTML += createPage('head-inventory', buildModuleInventory('head'));
  container.innerHTML += createPage('head-shifts', buildModuleShifts());
  container.innerHTML += createPage('head-employees', buildModuleEmployees());
  container.innerHTML += createPage('head-custody', buildModuleCustody());
  container.innerHTML += createPage('head-accountants', buildHeadAccountants());
  container.innerHTML += createPage('head-erp-export', buildHeadERPExport());
  container.innerHTML += createPage('head-reports', buildHeadReports());
}

function buildHeadOverview() {
  return `
  ${pageHeader('لوحة رئيس الحسابات', 'مراجعة نهائية واعتماد العمليات — الترحيل لـ ERP')}
  <div class="kpi-grid">
    ${kpiCard('إجمالي العمليات', '1,245', 'هذا الشهر', 'blue', '📋')}
    ${kpiCard('المعتمدة نهائياً', '1,120', '<span class="up">↑ 90%</span>', 'green', '✅')}
    ${kpiCard('بانتظار الاعتماد', '125', 'من 5 محاسبين', 'orange', '⏳')}
    ${kpiCard('معدل الاعتماد', '90%', 'هذا الشهر', 'gold', '📊')}
    ${kpiCard('المحاسبون التابعون', '5', 'محاسبين نشطين', 'blue', '👥')}
    ${kpiCard('الفروع المغطاة', '100', 'فرع', 'green', '🏪')}
  </div>

  <div class="grid-2 mb-20">
    ${card('👥 أداء المحاسبين', `
      ${[
        {name:'أحمد محمد', ops:250, approved:230, rate:92, time:'4.5 دقيقة', status:'ممتاز', color:'green'},
        {name:'محمد عبدالله', ops:230, approved:200, rate:87, time:'5.2 دقيقة', status:'جيد جداً', color:'yellow'},
        {name:'فاطمة النجار', ops:210, approved:195, rate:93, time:'4.1 دقيقة', status:'ممتاز', color:'green'},
        {name:'خالد السالم', ops:180, approved:155, rate:86, time:'5.8 دقيقة', status:'جيد', color:'yellow'},
        {name:'نورة الأحمد', ops:375, approved:340, rate:91, time:'4.8 دقيقة', status:'ممتاز', color:'green'},
      ].map(a => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
          <div class="avatar-sm" style="background:var(--primary-light);">${a.name.slice(0,2)}</div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span class="font-semibold" style="font-size:13px;">${a.name}</span>
              <span class="badge badge-${a.color === 'green' ? 'success' : 'warning'}">${a.status}</span>
            </div>
            <div style="display:flex;gap:12px;font-size:11px;color:var(--text-muted);margin-bottom:5px;">
              <span>${a.ops} عملية</span>
              <span>${a.approved} معتمدة</span>
              <span>⏱️ ${a.time}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill ${a.color}" style="width:${a.rate}%"></div></div>
          </div>
          <div style="font-size:15px;font-weight:700;color:var(--text-primary);width:40px;text-align:center;">${a.rate}%</div>
        </div>`).join('')}
    `)}
    ${card('📊 توزيع العمليات بالموديول', `
      ${[
        {name:'المبيعات', count:450, pct:36, color:'green'},
        {name:'المصروفات', count:380, pct:31, color:''},
        {name:'المشتريات', count:290, pct:23, color:'orange'},
        {name:'المخزون', count:125, pct:10, color:'red'},
      ].map(m => `
        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span class="font-semibold" style="font-size:13px;">${m.name}</span>
            <span class="text-sm text-muted">${m.count} عملية (${m.pct}%)</span>
          </div>
          <div class="progress-bar"><div class="progress-fill ${m.color}" style="width:${m.pct * 2.5}%"></div></div>
        </div>`).join('')}
      <div class="divider"></div>
      <div class="alert alert-warning" style="margin-bottom:0;">
        <span class="alert-icon">⚠️</span>
        <div><strong>125 عملية</strong> في انتظار اعتمادك النهائي</div>
      </div>
    `)}
  </div>`;
}

function buildHeadPending() {
  return `
  ${pageHeader('العمليات بانتظار الاعتماد النهائي', '125 عملية معتمدة من المحاسبين — تحتاج اعتمادك',
    `<button class="btn btn-success">✅ اعتماد الكل</button>
     <button class="btn btn-primary">🔗 ترحيل لـ ERP</button>`)}
  
  <div class="filter-bar">
    <label>الموديول:</label>
    <select class="filter-select"><option>الكل</option><option>المبيعات</option><option>المصروفات</option><option>المشتريات</option><option>المخزون</option></select>
    <label>المحاسب:</label>
    <select class="filter-select"><option>الكل</option><option>أحمد محمد</option><option>محمد عبدالله</option><option>فاطمة النجار</option></select>
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>التاريخ:</label>
    <select class="filter-select"><option>اليوم</option><option>هذا الأسبوع</option><option>هذا الشهر</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>

  <div class="card mb-20">
    <div class="card-header">
      <div class="card-title">💰 مبيعات — 15 عملية من المحاسب أحمد محمد</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span class="chip">💰 285,430 ر.س</span>
        <button class="btn btn-success btn-sm">✅ اعتماد المجموعة</button>
        <button class="btn btn-ghost btn-sm">👁️ عرض التفاصيل</button>
      </div>
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الفرع</th><th>التاريخ</th><th>المبلغ</th><th>الحالة</th><th>المحاسب</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض — العليا</td>
              <td class="text-sm text-muted">13 مارس 2026</td>
              <td class="td-bold">18,340 ر.س</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td>أحمد محمد</td>
              <td>
                <button class="btn btn-success btn-xs">✅ اعتماد</button>
                <button class="btn btn-danger btn-xs">❌ رفض</button>
                <button class="btn btn-ghost btn-xs">👁️</button>
              </td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة — الحمراء</td>
              <td class="text-sm text-muted">13 مارس 2026</td>
              <td class="td-bold">22,100 ر.س</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td>أحمد محمد</td>
              <td>
                <button class="btn btn-success btn-xs">✅ اعتماد</button>
                <button class="btn btn-danger btn-xs">❌ رفض</button>
                <button class="btn btn-ghost btn-xs">👁️</button>
              </td>
            </tr>
            <tr>
              <td class="td-bold">فرع مكة</td>
              <td class="text-sm text-muted">13 مارس 2026</td>
              <td class="td-bold">15,890 ر.س</td>
              <td><span class="badge badge-warning">يحتاج مراجعة</span></td>
              <td>أحمد محمد</td>
              <td>
                <button class="btn btn-success btn-xs">✅ اعتماد</button>
                <button class="btn btn-danger btn-xs">❌ رفض</button>
                <button class="btn btn-ghost btn-xs">👁️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">💸 مصروفات — 22 عملية من المحاسب محمد عبدالله</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span class="chip">💰 145,200 ر.س</span>
        <button class="btn btn-success btn-sm">✅ اعتماد المجموعة</button>
      </div>
    </div>
    <div class="card-body">
      <div class="alert alert-info">
        <span class="alert-icon">ℹ️</span>
        <div>22 عملية مصروفات معتمدة من المحاسب محمد عبدالله — انقر "عرض التفاصيل" للمراجعة الكاملة</div>
      </div>
      <button class="btn btn-ghost btn-sm">👁️ عرض جميع العمليات</button>
    </div>
  </div>`;
}

function buildHeadApproved() {
  return `
  ${pageHeader('العمليات المعتمدة', 'جميع العمليات التي تم اعتمادها نهائياً')}
  <div class="filter-bar">
    <label>الفترة:</label>
    <select class="filter-select"><option>هذا الشهر</option><option>الشهر الماضي</option></select>
    <label>الموديول:</label>
    <select class="filter-select"><option>الكل</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
    <div class="filter-divider"></div>
    <button class="btn btn-ghost btn-sm">📥 تصدير Excel</button>
    <button class="btn btn-primary btn-sm">🔗 ترحيل لـ ERP</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الموديول</th><th>الفرع</th><th>المبلغ</th><th>المحاسب</th><th>تاريخ الاعتماد</th><th>حالة ERP</th></tr></thead>
          <tbody>
            <tr><td><span class="badge badge-success">مبيعات</span></td><td>فرع الرياض</td><td class="td-bold">18,340 ر.س</td><td>أحمد محمد</td><td>13 مارس 2026</td><td><span class="badge badge-info">بانتظار الترحيل</span></td></tr>
            <tr><td><span class="badge badge-warning">مصروفات</span></td><td>فرع جدة</td><td class="td-bold">12,500 ر.س</td><td>محمد عبدالله</td><td>13 مارس 2026</td><td><span class="badge badge-success">تم الترحيل</span></td></tr>
            <tr><td><span class="badge badge-info">مشتريات</span></td><td>فرع مكة</td><td class="td-bold">8,200 ر.س</td><td>فاطمة النجار</td><td>12 مارس 2026</td><td><span class="badge badge-success">تم الترحيل</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildHeadRejected() {
  return `
  ${pageHeader('العمليات المرفوضة', 'العمليات التي تم رفضها وأسباب الرفض')}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الموديول</th><th>الفرع</th><th>المبلغ</th><th>المحاسب</th><th>سبب الرفض</th><th>التاريخ</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr>
              <td><span class="badge badge-warning">مصروفات</span></td>
              <td>فرع الدمام</td>
              <td class="td-bold">5,400 ر.س</td>
              <td>خالد السالم</td>
              <td class="text-danger">فاتورة غير واضحة — يحتاج إعادة رفع</td>
              <td>12 مارس 2026</td>
              <td><span class="badge badge-danger">مرفوض — بانتظار التصحيح</span></td>
            </tr>
            <tr>
              <td><span class="badge badge-info">مشتريات</span></td>
              <td>فرع الطائف</td>
              <td class="td-bold">3,200 ر.س</td>
              <td>نورة الأحمد</td>
              <td class="text-danger">فرق في الكمية بين الفاتورة والاستلام</td>
              <td>11 مارس 2026</td>
              <td><span class="badge badge-warning">أُعيد للفرع</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildHeadAccountants() {
  return `
  ${pageHeader('أداء المحاسبين', 'متابعة تفصيلية لأداء المحاسبين التابعين')}
  <div class="kpi-grid" style="grid-template-columns:repeat(5,1fr);">
    ${kpiCard('إجمالي المحاسبين', '5', 'محاسبين نشطين', 'blue', '👥')}
    ${kpiCard('متوسط معدل الاعتماد', '90%', 'هذا الشهر', 'green', '📊')}
    ${kpiCard('متوسط وقت المراجعة', '4.9 دقيقة', 'لكل عملية', 'gold', '⏱️')}
    ${kpiCard('إجمالي العمليات', '1,245', 'هذا الشهر', 'blue', '📋')}
    ${kpiCard('العمليات المعلقة', '125', 'بانتظار الاعتماد', 'orange', '⏳')}
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">👥 تفاصيل أداء المحاسبين</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المحاسب</th><th>الموديولات</th><th>الفروع</th><th>العمليات</th><th>المعتمدة</th><th>معدل الاعتماد</th><th>متوسط الوقت</th><th>الأداء</th><th>إجراءات</th></tr></thead>
          <tbody>
            ${[
              {name:'أحمد محمد',modules:'مبيعات، مصروفات',branches:'1-50',ops:250,approved:230,rate:92,time:'4.5',status:'ممتاز',color:'success'},
              {name:'محمد عبدالله',modules:'مصروفات',branches:'جميع',ops:230,approved:200,rate:87,time:'5.2',status:'جيد جداً',color:'warning'},
              {name:'فاطمة النجار',modules:'مشتريات، مخزون',branches:'جميع',ops:210,approved:195,rate:93,time:'4.1',status:'ممتاز',color:'success'},
              {name:'خالد السالم',modules:'مبيعات',branches:'51-100',ops:180,approved:155,rate:86,time:'5.8',status:'جيد',color:'warning'},
              {name:'نورة الأحمد',modules:'جميع الموديولات',branches:'1-100',ops:375,approved:340,rate:91,time:'4.8',status:'ممتاز',color:'success'},
            ].map(a => `
              <tr>
                <td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar-sm">${a.name.slice(0,2)}</div><span class="td-bold">${a.name}</span></div></td>
                <td class="text-sm">${a.modules}</td>
                <td class="text-sm">الفروع ${a.branches}</td>
                <td>${a.ops}</td>
                <td>${a.approved}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div class="progress-bar" style="width:60px;"><div class="progress-fill ${a.color === 'success' ? 'green' : 'orange'}" style="width:${a.rate}%"></div></div>
                    <span class="font-bold">${a.rate}%</span>
                  </div>
                </td>
                <td class="text-sm">${a.time} دقيقة</td>
                <td><span class="badge badge-${a.color}">${a.status}</span></td>
                <td><button class="btn btn-ghost btn-xs">👁️ تفاصيل</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildHeadERPExport() {
  return `
  ${pageHeader('التصدير لـ ERP', 'تصدير العمليات المعتمدة نهائياً إلى نظام ERP')}
  
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('جاهزة للتصدير', '145', 'عملية معتمدة', 'blue', '📤')}
    ${kpiCard('تم تصديرها', '1,100', 'هذا الشهر', 'green', '✅')}
    ${kpiCard('إجمالي المبلغ', '425,600 ر.س', 'جاهز للتصدير', 'gold', '💰')}
    ${kpiCard('آخر تصدير', 'قبل 3 ساعات', '1,100 عملية', 'blue', '🕐')}
  </div>

  <div class="grid-2 mb-20">
    <div class="card">
      <div class="card-header"><div class="card-title">📤 تصدير العمليات</div></div>
      <div class="card-body">
        <div class="filter-bar" style="margin-bottom:16px;flex-direction:column;align-items:flex-start;">
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <div><label class="form-label">الفترة</label><select class="filter-select"><option>هذا الشهر</option></select></div>
            <div><label class="form-label">الموديول</label><select class="filter-select"><option>الكل</option></select></div>
            <div><label class="form-label">المطعم</label><select class="filter-select"><option>الكل</option></select></div>
          </div>
        </div>
        <div class="alert alert-info">
          <span class="alert-icon">📊</span>
          <div>
            <strong>ملخص التصدير:</strong><br>
            • مطعم البيك: 45 عملية<br>
            • مطعم هرفي: 38 عملية<br>
            • مطعم كودو: 32 عملية<br>
            • مطاعم أخرى: 30 عملية<br>
            <strong>إجمالي المبلغ: 425,600 ر.س</strong>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">صيغة التصدير</label>
          <div style="display:flex;gap:16px;margin-top:6px;">
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="radio" name="exp" checked> Excel (.xlsx)</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="radio" name="exp"> CSV</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:13px;"><input type="radio" name="exp"> JSON (API)</label>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn btn-primary">📥 تحميل Excel (145 عملية)</button>
          <button class="btn btn-ghost" disabled>🔗 ترحيل لـ ERP (قريباً)</button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">📋 سجل التصدير</div></div>
      <div class="card-body" style="padding:0;">
        <div class="table-wrap">
          <table>
            <thead><tr><th>التاريخ</th><th>العمليات</th><th>المبلغ</th><th>الحالة</th></tr></thead>
            <tbody>
              <tr><td>13 مارس 10:00</td><td>145</td><td>425,600 ر.س</td><td><span class="badge badge-info">جاهز</span></td></tr>
              <tr><td>12 مارس 09:30</td><td>320</td><td>890,200 ر.س</td><td><span class="badge badge-success">تم التصدير</span></td></tr>
              <tr><td>11 مارس 10:15</td><td>280</td><td>720,500 ر.س</td><td><span class="badge badge-success">تم التصدير</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}

function buildHeadReports() {
  return `
  ${pageHeader('التقارير والإحصائيات', 'تقارير شاملة لجميع العمليات والأداء')}
  <div class="filter-bar">
    <label>الفترة:</label>
    <select class="filter-select"><option>هذا الشهر</option><option>الشهر الماضي</option><option>هذا الربع</option></select>
    <label>المطعم:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الموديول:</label>
    <select class="filter-select"><option>الكل</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
    <div class="filter-divider"></div>
    <button class="btn btn-ghost btn-sm">📥 تصدير PDF</button>
    <button class="btn btn-ghost btn-sm">📊 تصدير Excel</button>
  </div>
  <div class="grid-2 mb-20">
    ${card('📊 ملخص الشهر', `
      <div class="info-row"><span class="label">إجمالي العمليات</span><span class="value">1,245</span></div>
      <div class="info-row"><span class="label">المعتمدة</span><span class="value text-success">1,120 (90%)</span></div>
      <div class="info-row"><span class="label">المرفوضة</span><span class="value text-danger">85 (7%)</span></div>
      <div class="info-row"><span class="label">المعلقة</span><span class="value text-warning">40 (3%)</span></div>
      <div class="info-row"><span class="label">إجمالي المبالغ المعتمدة</span><span class="value">4,250,000 ر.س</span></div>
      <div class="info-row"><span class="label">متوسط وقت المراجعة</span><span class="value">4.9 دقيقة</span></div>
    `)}
    ${card('📈 اتجاهات الأداء', `
      <div style="margin-bottom:8px;font-size:12px;color:var(--text-muted);">معدل الاعتماد اليومي — آخر 7 أيام</div>
      <div class="bar-chart">
        ${[88,91,87,93,90,89,92].map((v,i) => `<div class="bar-item ${i===6?'accent':''}" style="height:${v}%" title="${v}%"></div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--text-muted);">
        <span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span><span>السبت</span>
      </div>
    `)}
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  ACCOUNTANT PAGES
// ══════════════════════════════════════════════════════════════
function buildAccountantPages(container) {
  container.innerHTML += createPage('acc-overview', buildAccOverview());
  container.innerHTML += createPage('acc-pending', buildAccPending());
  container.innerHTML += createPage('acc-approved', buildAccApproved());
  container.innerHTML += createPage('acc-rejected', buildAccRejected());
  container.innerHTML += createPage('acc-sales', buildModuleSales('acc'));
  container.innerHTML += createPage('acc-expenses', buildModuleExpenses('acc'));
  container.innerHTML += createPage('acc-purchases', buildModulePurchases('acc'));
  container.innerHTML += createPage('acc-inventory', buildModuleInventory('acc'));
  container.innerHTML += createPage('acc-waste', buildModuleWaste());
  container.innerHTML += createPage('acc-shifts', buildModuleShifts());
  container.innerHTML += createPage('acc-employees', buildModuleEmployees());
  container.innerHTML += createPage('acc-custody', buildModuleCustody());
  container.innerHTML += createPage('acc-reports', buildAccReports());
}

function buildAccOverview() {
  return `
  ${pageHeader('لوحة تحكم المحاسب', 'أحمد محمد — الفروع 1-50 — موديولات: المبيعات، المصروفات')}
  <div class="kpi-grid">
    ${kpiCard('عمليات جديدة اليوم', '45', 'من الفروع المخصصة', 'blue', '📥')}
    ${kpiCard('موافق عليها', '32', '<span class="up">↑ 71%</span>', 'green', '✅')}
    ${kpiCard('معلقة', '13', 'تحتاج مراجعة', 'orange', '⏳')}
    ${kpiCard('معدل الموافقة', '71%', 'اليوم', 'gold', '📊')}
  </div>

  <div class="alert alert-warning mb-20">
    <span class="alert-icon">⚠️</span>
    <div><strong>13 عملية معلقة</strong> تحتاج مراجعتك — أقدمها منذ 5 ساعات</div>
  </div>

  <div class="grid-2 mb-20">
    ${card('📊 توزيع العمليات اليوم', `
      <div style="display:flex;gap:20px;align-items:center;">
        <div class="donut-chart"><div class="donut-label">45</div></div>
        <div style="flex:1;">
          <div class="info-row"><span class="label"><span class="status-dot dot-green" style="margin-left:6px;"></span>موافق عليها</span><span class="value text-success">32</span></div>
          <div class="info-row"><span class="label"><span class="status-dot dot-yellow" style="margin-left:6px;"></span>معلقة</span><span class="value text-warning">13</span></div>
          <div class="info-row"><span class="label"><span class="status-dot dot-red" style="margin-left:6px;"></span>مرفوضة</span><span class="value text-danger">0</span></div>
        </div>
      </div>
    `)}
    ${card('🏪 الفروع المخصصة', `
      <div class="info-row"><span class="label">نطاق الفروع</span><span class="value">الفروع 1 — 50</span></div>
      <div class="info-row"><span class="label">الموديولات</span><span class="value"><span class="chip">مبيعات</span> <span class="chip">مصروفات</span></span></div>
      <div class="info-row"><span class="label">رئيس الحسابات</span><span class="value">خالد العمري</span></div>
      <div class="info-row"><span class="label">متوسط وقت المراجعة</span><span class="value">4.5 دقيقة</span></div>
      <div class="info-row"><span class="label">أداء هذا الشهر</span><span class="value"><span class="badge badge-success">ممتاز — 92%</span></span></div>
    `)}
  </div>`;
}

function buildAccPending() {
  return `
  ${pageHeader('العمليات المعلقة', '13 عملية تنتظر مراجعتك وموافقتك')}
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الموديول:</label>
    <select class="filter-select"><option>الكل</option><option>مبيعات</option><option>مصروفات</option></select>
    <label>التاريخ:</label>
    <select class="filter-select"><option>اليوم</option><option>هذا الأسبوع</option></select>
    <label>الحالة:</label>
    <select class="filter-select"><option>الكل</option><option>متطابق</option><option>يحتاج مراجعة</option><option>فرق</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>

  ${opCard('💰 مبيعات', 'فرع الرياض — العليا', '18,340 ر.س', 'قبل ساعة', 'متطابق', 3, 'success')}
  ${opCard('💸 مصروفات', 'فرع جدة — الحمراء', '12,500 ر.س (إيجار)', 'قبل 3 ساعات', 'يحتاج مراجعة', 2, 'warning')}
  ${opCard('💰 مبيعات', 'فرع مكة', '22,100 ر.س', 'قبل 4 ساعات', 'متطابق', 4, 'success')}
  ${opCard('💸 مصروفات', 'فرع الدمام', '8,200 ر.س', 'قبل 5 ساعات', 'فرق في الكمية', 3, 'danger')}`;
}

function buildAccApproved() {
  return `
  ${pageHeader('العمليات الموافق عليها', 'العمليات التي تمت مراجعتها وإرسالها لرئيس الحسابات')}
  <div class="filter-bar">
    <label>الفترة:</label>
    <select class="filter-select"><option>اليوم</option><option>هذا الأسبوع</option></select>
    <label>الموديول:</label>
    <select class="filter-select"><option>الكل</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الموديول</th><th>الفرع</th><th>المبلغ</th><th>وقت المراجعة</th><th>حالة رئيس الحسابات</th></tr></thead>
          <tbody>
            <tr><td><span class="badge badge-success">مبيعات</span></td><td>فرع الرياض</td><td class="td-bold">18,340 ر.س</td><td>3.2 دقيقة</td><td><span class="badge badge-success">معتمد نهائياً</span></td></tr>
            <tr><td><span class="badge badge-warning">مصروفات</span></td><td>فرع جدة</td><td class="td-bold">5,600 ر.س</td><td>4.8 دقيقة</td><td><span class="badge badge-info">بانتظار الاعتماد</span></td></tr>
            <tr><td><span class="badge badge-success">مبيعات</span></td><td>فرع مكة</td><td class="td-bold">15,200 ر.س</td><td>2.9 دقيقة</td><td><span class="badge badge-success">معتمد نهائياً</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildAccRejected() {
  return `
  ${pageHeader('العمليات المرفوضة', 'العمليات التي تم رفضها مع أسباب الرفض')}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الموديول</th><th>الفرع</th><th>المبلغ</th><th>سبب الرفض</th><th>التاريخ</th><th>الحالة</th></tr></thead>
          <tbody>
            <tr>
              <td><span class="badge badge-warning">مصروفات</span></td>
              <td>فرع الطائف</td>
              <td class="td-bold">3,200 ر.س</td>
              <td class="text-danger">فاتورة غير مقروءة — يرجى إعادة الرفع</td>
              <td>12 مارس 2026</td>
              <td><span class="badge badge-warning">أُعيد للفرع</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildAccReports() {
  return `
  ${pageHeader('التقارير', 'تقارير العمليات للفروع المخصصة')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي العمليات', '250', 'هذا الشهر', 'blue', '📋')}
    ${kpiCard('المعتمدة', '230', '92%', 'green', '✅')}
    ${kpiCard('المرفوضة', '12', '5%', 'red', '❌')}
    ${kpiCard('المعلقة', '8', '3%', 'orange', '⏳')}
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">📊 تقرير الأداء الشهري</div></div>
    <div class="card-body">
      <div class="alert alert-success"><span class="alert-icon">✅</span><div>أداء ممتاز هذا الشهر — معدل الاعتماد 92% فوق المستهدف 85%</div></div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-ghost btn-sm">📥 تصدير PDF</button>
        <button class="btn btn-ghost btn-sm">📊 تصدير Excel</button>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  SHARED MODULES
// ══════════════════════════════════════════════════════════════
function buildModuleSales(role) {
  const isHead = role === 'head';
  return `
  ${pageHeader('موديول المبيعات', 'مطابقة المبيعات مع التحصيلات — مراجعة حرجة')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي المبيعات', '2,500,000 ر.س', 'هذا الشهر', 'blue', '💰')}
    ${kpiCard('مبيعات نقدية', '850,000 ر.س', '34%', 'green', '💵')}
    ${kpiCard('مبيعات بطاقة', '950,000 ر.س', '38%', 'gold', '💳')}
    ${kpiCard('مبيعات تطبيقات', '700,000 ر.س', '28%', 'blue', '📱')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>التاريخ:</label>
    <select class="filter-select"><option>اليوم</option><option>هذا الأسبوع</option><option>هذا الشهر</option></select>
    <label>الحالة:</label>
    <select class="filter-select"><option>الكل</option><option>متطابق</option><option>فرق</option><option>معلق</option></select>
    ${isHead ? '<label>المحاسب:</label><select class="filter-select"><option>الكل</option></select>' : ''}
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">💰 تفاصيل المبيعات</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الفرع</th><th>التاريخ</th>
              <th>مبيعات نقدية</th><th>مبيعات بطاقة</th><th>مبيعات تطبيقات</th>
              <th>الإجمالي</th><th>التحصيل الفعلي</th><th>الفرق</th>
              <th>الحالة</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض — العليا</td>
              <td>13 مارس</td>
              <td>5,200 ر.س</td><td>8,100 ر.س</td><td>5,040 ر.س</td>
              <td class="td-bold">18,340 ر.س</td>
              <td class="td-bold">18,340 ر.س</td>
              <td class="text-success font-bold">0 ر.س</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td>
                <button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button>
                <button class="btn btn-ghost btn-xs">👁️</button>
              </td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة — الحمراء</td>
              <td>13 مارس</td>
              <td>7,800 ر.س</td><td>9,200 ر.س</td><td>5,100 ر.س</td>
              <td class="td-bold">22,100 ر.س</td>
              <td class="td-bold">21,850 ر.س</td>
              <td class="text-danger font-bold">250 ر.س</td>
              <td><span class="badge badge-warning">فرق بسيط</span></td>
              <td>
                <button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button>
                <button class="btn btn-danger btn-xs">❌ رفض</button>
                <button class="btn btn-ghost btn-xs">👁️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleExpenses(role) {
  const isHead = role === 'head';
  return `
  ${pageHeader('موديول المصروفات', 'مراجعة واعتماد جميع المصروفات')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي المصروفات', '750,000 ر.س', 'هذا الشهر', 'red', '💸')}
    ${kpiCard('رواتب', '450,000 ر.س', '60%', 'orange', '👥')}
    ${kpiCard('إيجارات', '200,000 ر.س', '27%', 'blue', '🏢')}
    ${kpiCard('كهرباء وماء', '100,000 ر.س', '13%', 'gold', '⚡')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>نوع المصروف:</label>
    <select class="filter-select"><option>الكل</option><option>رواتب</option><option>إيجار</option><option>كهرباء</option><option>مشتريات</option><option>أخرى</option></select>
    <label>التاريخ:</label>
    <select class="filter-select"><option>هذا الشهر</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الفرع</th><th>نوع المصروف</th><th>المبلغ</th><th>التاريخ</th><th>المرفقات</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع جدة — الحمراء</td>
              <td>إيجار شهري</td>
              <td class="td-bold">12,500 ر.س</td>
              <td>1 مارس 2026</td>
              <td>📎 2 ملفات</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع الدمام</td>
              <td>كهرباء</td>
              <td class="td-bold">5,400 ر.س</td>
              <td>5 مارس 2026</td>
              <td>📎 1 ملف</td>
              <td><span class="badge badge-warning">يحتاج مراجعة</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button> <button class="btn btn-danger btn-xs">❌ رفض</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModulePurchases(role) {
  const isHead = role === 'head';
  return `
  ${pageHeader('موديول المشتريات', 'مطابقة أوامر الشراء مع الفواتير والاستلام')}
  <div class="kpi-grid" style="grid-template-columns:repeat(5,1fr);">
    ${kpiCard('إجمالي المشتريات', '1,050,000 ر.س', 'هذا الشهر', 'blue', '🛒')}
    ${kpiCard('متطابقة', '850,000 ر.س', '81%', 'green', '✅')}
    ${kpiCard('فرق في الكمية', '120,000 ر.س', '11%', 'orange', '⚠️')}
    ${kpiCard('فرق في السعر', '80,000 ر.س', '8%', 'red', '💰')}
    ${kpiCard('الموردون', '15', 'مورد نشط', 'gold', '🏢')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>المورد:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الحالة:</label>
    <select class="filter-select"><option>الكل</option><option>متطابق</option><option>فرق كمية</option><option>فرق سعر</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">🛒 عمليات المشتريات</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الفرع</th><th>المورد</th><th>الصنف</th>
              <th>الكمية المطلوبة</th><th>الكمية المستلمة</th>
              <th>سعر الوحدة</th><th>الإجمالي</th>
              <th>الفاتورة</th><th>الحالة</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض</td>
              <td>شركة الدواجن الوطنية</td>
              <td>دجاج مجمد</td>
              <td>100 كجم</td>
              <td class="text-success font-bold">100 كجم</td>
              <td>25 ر.س</td>
              <td class="td-bold">2,500 ر.س</td>
              <td>📎 فاتورة</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة</td>
              <td>مورد الخضروات</td>
              <td>طماطم</td>
              <td>50 كجم</td>
              <td class="text-danger font-bold">42 كجم</td>
              <td>8 ر.س</td>
              <td class="td-bold">336 ر.س</td>
              <td>📎 فاتورة</td>
              <td><span class="badge badge-danger">فرق في الكمية</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button> <button class="btn btn-danger btn-xs">❌ رفض</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleInventory(role) {
  const isHead = role === 'head';
  return `
  ${pageHeader('موديول المخزون', 'جرد المخزون وتتبع الفروق')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي الأصناف', '450', 'صنف مسجل', 'blue', '📦')}
    ${kpiCard('متطابق مع الدفتري', '380', '84%', 'green', '✅')}
    ${kpiCard('فروق موجبة', '35', 'زيادة في المخزون', 'gold', '↑')}
    ${kpiCard('فروق سالبة', '35', 'نقص في المخزون', 'red', '↓')}
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">📦 جرد المخزون</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الفرع</th><th>الصنف</th><th>الوحدة</th>
              <th>الكمية الدفترية</th><th>الكمية الفعلية</th>
              <th>الفرق</th><th>القيمة</th><th>الحالة</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض</td>
              <td>دجاج مجمد</td>
              <td>كجم</td>
              <td>500</td>
              <td>500</td>
              <td class="text-success font-bold">0</td>
              <td>12,500 ر.س</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة</td>
              <td>طماطم</td>
              <td>كجم</td>
              <td>200</td>
              <td>185</td>
              <td class="text-danger font-bold">-15</td>
              <td>120 ر.س</td>
              <td><span class="badge badge-danger">نقص</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button> <button class="btn btn-danger btn-xs">❌ رفض</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع مكة</td>
              <td>زيت نباتي</td>
              <td>لتر</td>
              <td>300</td>
              <td>320</td>
              <td class="text-warning font-bold">+20</td>
              <td>400 ر.س</td>
              <td><span class="badge badge-warning">زيادة</span></td>
              <td><button class="btn btn-success btn-xs">✅ ${isHead ? 'اعتماد' : 'موافقة'}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleWaste() {
  return `
  ${pageHeader('موديول الهدر والتالف', 'تسجيل ومراجعة الهدر والتالف في الفروع')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي الهدر', '45,000 ر.س', 'هذا الشهر', 'red', '🗑️')}
    ${kpiCard('نسبة الهدر', '1.8%', 'من إجمالي المبيعات', 'orange', '📊')}
    ${kpiCard('أعلى فرع هدراً', 'فرع الرياض', '12,000 ر.س', 'red', '⚠️')}
    ${kpiCard('عمليات الهدر', '125', 'عملية مسجلة', 'blue', '📋')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>نوع الهدر:</label>
    <select class="filter-select"><option>الكل</option><option>تالف</option><option>منتهي الصلاحية</option><option>خطأ في التحضير</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الفرع</th><th>الصنف</th><th>الكمية</th><th>السبب</th><th>القيمة</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض</td>
              <td>دجاج مجمد</td>
              <td>15 كجم</td>
              <td>منتهي الصلاحية</td>
              <td class="text-danger font-bold">375 ر.س</td>
              <td>12 مارس 2026</td>
              <td><span class="badge badge-warning">بانتظار المراجعة</span></td>
              <td><button class="btn btn-success btn-xs">✅ موافقة</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة</td>
              <td>خضروات</td>
              <td>8 كجم</td>
              <td>تالف</td>
              <td class="text-danger font-bold">64 ر.س</td>
              <td>11 مارس 2026</td>
              <td><span class="badge badge-success">معتمد</span></td>
              <td><button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleShifts() {
  return `
  ${pageHeader('موديول الشفتات', 'مراجعة تقارير الشفتات ومطابقة المبيعات')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('شفتات اليوم', '150', 'من 50 فرع', 'blue', '⏰')}
    ${kpiCard('متطابقة', '132', '88%', 'green', '✅')}
    ${kpiCard('فروق في الصندوق', '18', 'تحتاج مراجعة', 'orange', '💰')}
    ${kpiCard('إجمالي المبيعات', '450,000 ر.س', 'اليوم', 'gold', '💵')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الشفت:</label>
    <select class="filter-select"><option>الكل</option><option>صباحي</option><option>مسائي</option><option>ليلي</option></select>
    <label>التاريخ:</label>
    <input class="filter-input" type="date" value="2026-03-13">
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الفرع</th><th>الشفت</th><th>المدير</th>
              <th>مبيعات النظام</th><th>مبيعات الصندوق</th>
              <th>الفرق</th><th>الحالة</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض — العليا</td>
              <td><span class="badge badge-info">صباحي</span></td>
              <td>أحمد السالم</td>
              <td>18,340 ر.س</td>
              <td>18,340 ر.س</td>
              <td class="text-success font-bold">0 ر.س</td>
              <td><span class="badge badge-success">متطابق</span></td>
              <td><button class="btn btn-success btn-xs">✅ موافقة</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة — الحمراء</td>
              <td><span class="badge badge-warning">مسائي</span></td>
              <td>محمد العلي</td>
              <td>22,100 ر.س</td>
              <td>21,850 ر.س</td>
              <td class="text-danger font-bold">250 ر.س</td>
              <td><span class="badge badge-warning">فرق في الصندوق</span></td>
              <td><button class="btn btn-success btn-xs">✅ موافقة</button> <button class="btn btn-danger btn-xs">❌ رفض</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleEmployees() {
  return `
  ${pageHeader('كشف حساب الموظفين', 'مراجعة الرواتب والحضور والغياب')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي الموظفين', '1,250', 'في جميع الفروع', 'blue', '👥')}
    ${kpiCard('إجمالي الرواتب', '450,000 ر.س', 'هذا الشهر', 'red', '💰')}
    ${kpiCard('بدلات وحوافز', '85,000 ر.س', 'هذا الشهر', 'orange', '⭐')}
    ${kpiCard('خصومات', '12,000 ر.س', 'غياب وتأخر', 'gold', '📉')}
  </div>
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الشهر:</label>
    <select class="filter-select"><option>مارس 2026</option></select>
    <label>الوظيفة:</label>
    <select class="filter-select"><option>الكل</option><option>كاشير</option><option>طباخ</option><option>مدير</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الموظف</th><th>الفرع</th><th>الوظيفة</th>
              <th>أيام العمل</th><th>الغياب</th>
              <th>الراتب الأساسي</th><th>البدلات</th><th>الخصومات</th>
              <th>الصافي</th><th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-bold">محمد أحمد</td>
              <td>فرع الرياض</td>
              <td>كاشير</td>
              <td>26</td>
              <td>0</td>
              <td>3,000 ر.س</td>
              <td>500 ر.س</td>
              <td>0 ر.س</td>
              <td class="td-bold text-success">3,500 ر.س</td>
              <td><span class="badge badge-success">معتمد</span></td>
            </tr>
            <tr>
              <td class="td-bold">علي سالم</td>
              <td>فرع جدة</td>
              <td>طباخ</td>
              <td>24</td>
              <td>2</td>
              <td>3,500 ر.س</td>
              <td>300 ر.س</td>
              <td>280 ر.س</td>
              <td class="td-bold text-warning">3,520 ر.س</td>
              <td><span class="badge badge-warning">بانتظار المراجعة</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildModuleCustody() {
  return `
  ${pageHeader('العهد النقدية', 'متابعة العهد النقدية وتسوياتها')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي العهد', '125,000 ر.س', 'جميع الفروع', 'blue', '💼')}
    ${kpiCard('مسوّاة', '95,000 ر.س', '76%', 'green', '✅')}
    ${kpiCard('غير مسوّاة', '30,000 ر.س', '24%', 'orange', '⏳')}
    ${kpiCard('متأخرة', '5,000 ر.س', 'تحتاج متابعة', 'red', '⚠️')}
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الفرع</th><th>المسؤول</th><th>المبلغ</th><th>تاريخ الصرف</th><th>الغرض</th><th>حالة التسوية</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">فرع الرياض</td>
              <td>أحمد السالم</td>
              <td class="td-bold">5,000 ر.س</td>
              <td>1 مارس 2026</td>
              <td>مصاريف تشغيلية</td>
              <td><span class="badge badge-success">مسوّاة</span></td>
              <td><button class="btn btn-ghost btn-xs">👁️ تفاصيل</button></td>
            </tr>
            <tr>
              <td class="td-bold">فرع جدة</td>
              <td>محمد العلي</td>
              <td class="td-bold">8,000 ر.س</td>
              <td>5 مارس 2026</td>
              <td>مشتريات طارئة</td>
              <td><span class="badge badge-warning">غير مسوّاة</span></td>
              <td><button class="btn btn-success btn-xs">✅ تسوية</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  BRANCH MANAGER PAGES
// ══════════════════════════════════════════════════════════════
function buildBranchPages(container) {
  container.innerHTML += createPage('branch-overview', buildBranchOverview());
  container.innerHTML += createPage('branch-employees', buildBranchEmployees());
  container.innerHTML += createPage('branch-items', buildBranchItems());
  container.innerHTML += createPage('branch-suppliers', buildBranchSuppliers());
  container.innerHTML += createPage('branch-upload', buildBranchUpload());
  container.innerHTML += createPage('branch-settings', buildBranchSettings());
}

function buildBranchOverview() {
  return `
  ${pageHeader('نظرة عامة — فرع الرياض العليا', 'مدير الفرع — إدارة البيانات والرفع')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('الموظفون', '45', 'موظف نشط', 'blue', '👥')}
    ${kpiCard('الأصناف', '120', 'صنف مسجل', 'green', '📦')}
    ${kpiCard('الموردون', '8', 'موردين نشطين', 'gold', '🏢')}
    ${kpiCard('آخر رفع بيانات', 'منذ 2 ساعة', 'مبيعات اليوم', 'blue', '📤')}
  </div>

  <div class="alert alert-info mb-20">
    <span class="alert-icon">ℹ️</span>
    <div><strong>تذكير:</strong> يجب رفع بيانات المبيعات يومياً قبل الساعة 11 مساءً</div>
  </div>

  <div class="grid-2 mb-20">
    ${card('📊 حالة البيانات المرفوعة', `
      <div class="info-row"><span class="label">مبيعات اليوم</span><span class="value"><span class="badge badge-success">✅ مرفوعة</span></span></div>
      <div class="info-row"><span class="label">مصروفات هذا الأسبوع</span><span class="value"><span class="badge badge-success">✅ مرفوعة</span></span></div>
      <div class="info-row"><span class="label">مشتريات هذا الأسبوع</span><span class="value"><span class="badge badge-warning">⏳ بانتظار الموافقة</span></span></div>
      <div class="info-row"><span class="label">جرد المخزون</span><span class="value"><span class="badge badge-danger">❌ لم يُرفع بعد</span></span></div>
      <div class="info-row"><span class="label">كشف الموظفين</span><span class="value"><span class="badge badge-success">✅ مرفوع</span></span></div>
      <div style="margin-top:12px;">
        <button class="btn btn-primary btn-sm">📤 رفع البيانات المتبقية</button>
      </div>
    `)}
    ${card('🔔 آخر الإشعارات', `
      <ul class="timeline">
        <li class="timeline-item">
          <div class="timeline-dot green">✅</div>
          <div class="timeline-content">
            <div class="time">منذ ساعتين</div>
            <div class="text">تمت الموافقة على <strong>مبيعات أمس</strong> من المحاسب</div>
          </div>
        </li>
        <li class="timeline-item">
          <div class="timeline-dot yellow">⚠️</div>
          <div class="timeline-content">
            <div class="time">منذ 5 ساعات</div>
            <div class="text">طلب توضيح حول <strong>مشتريات 10 مارس</strong> — فرق في الكمية</div>
          </div>
        </li>
        <li class="timeline-item">
          <div class="timeline-dot red">❌</div>
          <div class="timeline-content">
            <div class="time">أمس</div>
            <div class="text">تم رفض <strong>مصروف الكهرباء</strong> — الفاتورة غير واضحة</div>
          </div>
        </li>
      </ul>
    `)}
  </div>`;
}

function buildBranchEmployees() {
  return `
  ${pageHeader('إدارة الموظفين', 'إضافة وتعديل بيانات موظفي الفرع',
    `<button class="btn btn-primary">➕ إضافة موظف</button>`)}
  <div class="filter-bar">
    <label>الوظيفة:</label>
    <select class="filter-select"><option>الكل</option><option>كاشير</option><option>طباخ</option><option>مدير شفت</option></select>
    <label>الحالة:</label>
    <select class="filter-select"><option>الكل</option><option>نشط</option><option>إجازة</option></select>
    <input class="filter-input" placeholder="🔍 بحث بالاسم..." style="flex:1;min-width:180px;">
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الموظف</th><th>الوظيفة</th><th>رقم الهوية</th><th>الراتب</th><th>تاريخ التعيين</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar-sm">مأ</div><span class="td-bold">محمد أحمد</span></div></td>
              <td>كاشير</td>
              <td class="text-sm text-muted">1234567890</td>
              <td>3,000 ر.س</td>
              <td class="text-sm text-muted">1 يناير 2025</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
            <tr>
              <td><div style="display:flex;align-items:center;gap:8px;"><div class="avatar-sm" style="background:var(--success);">عس</div><span class="td-bold">علي سالم</span></div></td>
              <td>طباخ</td>
              <td class="text-sm text-muted">0987654321</td>
              <td>3,500 ر.س</td>
              <td class="text-sm text-muted">15 مارس 2024</td>
              <td><span class="badge badge-warning">إجازة</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="card mt-20">
    <div class="card-header"><div class="card-title">➕ إضافة موظف جديد</div></div>
    <div class="card-body">
      <div class="form-row">
        <div class="form-group"><label class="form-label">الاسم الكامل *</label><input class="form-input" placeholder="اسم الموظف"></div>
        <div class="form-group"><label class="form-label">رقم الهوية/الإقامة *</label><input class="form-input" placeholder="10 أرقام"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">الوظيفة *</label><select class="form-select"><option>كاشير</option><option>طباخ</option><option>مدير شفت</option><option>نادل</option></select></div>
        <div class="form-group"><label class="form-label">الراتب الأساسي *</label><input class="form-input" type="number" placeholder="0.00 ر.س"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">رقم الهاتف</label><input class="form-input" placeholder="+966 5x xxx xxxx"></div>
        <div class="form-group"><label class="form-label">تاريخ التعيين</label><input class="form-input" type="date"></div>
      </div>
      <button class="btn btn-primary">💾 حفظ الموظف</button>
    </div>
  </div>`;
}

function buildBranchItems() {
  return `
  ${pageHeader('إدارة الأصناف', 'الأصناف المستخدمة في الفرع',
    `<button class="btn btn-primary">➕ إضافة صنف</button>`)}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الفئة</th><th>الوحدة</th><th>سعر الشراء</th><th>المورد</th><th>الحد الأدنى</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">دجاج مجمد</td>
              <td><span class="badge badge-info">بروتين</span></td>
              <td>كجم</td>
              <td>25 ر.س</td>
              <td>شركة الدواجن الوطنية</td>
              <td>50 كجم</td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button> <button class="btn btn-ghost btn-xs">🗑️</button></td>
            </tr>
            <tr>
              <td class="td-bold">طماطم</td>
              <td><span class="badge badge-success">خضروات</span></td>
              <td>كجم</td>
              <td>8 ر.س</td>
              <td>مورد الخضروات</td>
              <td>20 كجم</td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button> <button class="btn btn-ghost btn-xs">🗑️</button></td>
            </tr>
            <tr>
              <td class="td-bold">زيت نباتي</td>
              <td><span class="badge badge-warning">زيوت</span></td>
              <td>لتر</td>
              <td>20 ر.س</td>
              <td>مورد المواد الغذائية</td>
              <td>30 لتر</td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button> <button class="btn btn-ghost btn-xs">🗑️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildBranchSuppliers() {
  return `
  ${pageHeader('إدارة الموردين', 'الموردون المرتبطون بهذا الفرع',
    `<button class="btn btn-primary">➕ إضافة مورد</button>`)}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المورد</th><th>الفئة</th><th>جهة الاتصال</th><th>الأصناف</th><th>آخر توريد</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">شركة الدواجن الوطنية</td>
              <td><span class="badge badge-info">بروتين</span></td>
              <td class="text-sm text-muted">0501234567</td>
              <td>3 أصناف</td>
              <td class="text-sm text-muted">10 مارس 2026</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button></td>
            </tr>
            <tr>
              <td class="td-bold">مورد الخضروات الطازجة</td>
              <td><span class="badge badge-success">خضروات</span></td>
              <td class="text-sm text-muted">0559876543</td>
              <td>8 أصناف</td>
              <td class="text-sm text-muted">12 مارس 2026</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildBranchUpload() {
  return `
  ${pageHeader('رفع البيانات', 'رفع البيانات اليومية والأسبوعية للمحاسب')}
  
  <div class="alert alert-info mb-20">
    <span class="alert-icon">ℹ️</span>
    <div>
      <strong>تعليمات الرفع:</strong> يجب رفع البيانات بصيغة Excel أو PDF. الملفات المدعومة: .xlsx, .xls, .pdf, .jpg, .png
    </div>
  </div>

  <div id="upload-tabs">
    <div class="tabs">
      <div class="tab active" data-tab="sales" onclick="switchTab('upload-tabs','sales')">💰 المبيعات</div>
      <div class="tab" data-tab="expenses" onclick="switchTab('upload-tabs','expenses')">💸 المصروفات</div>
      <div class="tab" data-tab="purchases" onclick="switchTab('upload-tabs','purchases')">🛒 المشتريات</div>
      <div class="tab" data-tab="inventory" onclick="switchTab('upload-tabs','inventory')">📦 المخزون</div>
      <div class="tab" data-tab="waste" onclick="switchTab('upload-tabs','waste')">🗑️ الهدر</div>
      <div class="tab" data-tab="shifts" onclick="switchTab('upload-tabs','shifts')">⏰ الشفتات</div>
    </div>

    <div id="upload-tabs-sales" class="tab-content active">
      ${buildUploadForm('المبيعات', '💰', 'يومي', ['تقرير المبيعات من نظام الكاشير', 'تقرير التحصيل النقدي', 'تقرير البطاقة البنكية', 'تقرير تطبيقات التوصيل'])}
    </div>
    <div id="upload-tabs-expenses" class="tab-content">
      ${buildUploadForm('المصروفات', '💸', 'أسبوعي/شهري', ['فواتير الإيجار', 'فواتير الكهرباء والماء', 'إيصالات المصروفات الأخرى'])}
    </div>
    <div id="upload-tabs-purchases" class="tab-content">
      ${buildUploadForm('المشتريات', '🛒', 'عند الاستلام', ['أمر الشراء', 'فاتورة المورد', 'إيصال الاستلام', 'صورة البضاعة المستلمة'])}
    </div>
    <div id="upload-tabs-inventory" class="tab-content">
      ${buildUploadForm('المخزون', '📦', 'أسبوعي', ['ورقة الجرد الموقعة', 'صور المخزون (اختياري)'])}
    </div>
    <div id="upload-tabs-waste" class="tab-content">
      ${buildUploadForm('الهدر والتالف', '🗑️', 'عند الحدوث', ['نموذج الهدر الموقع', 'صور البضاعة التالفة'])}
    </div>
    <div id="upload-tabs-shifts" class="tab-content">
      ${buildUploadForm('الشفتات', '⏰', 'يومي', ['تقرير إغلاق الشفت', 'تقرير الحضور والانصراف'])}
    </div>
  </div>`;
}

function buildUploadForm(type, icon, freq, docs) {
  return `
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-title">${icon} رفع بيانات ${type}</div></div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">التاريخ *</label>
          <input class="form-input" type="date" value="2026-03-13">
        </div>
        <div class="form-group">
          <label class="form-label">ملاحظات</label>
          <textarea class="form-textarea" placeholder="أي ملاحظات إضافية..."></textarea>
        </div>
        <div class="upload-zone">
          <div class="upload-icon">${icon}</div>
          <div class="upload-text">اسحب الملفات هنا أو انقر للاختيار</div>
          <div class="upload-hint">يدعم: PDF, Excel, صور — الحد الأقصى 10 ملفات</div>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn btn-primary">📤 رفع البيانات</button>
          <button class="btn btn-ghost">📥 تحميل النموذج</button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">📋 المستندات المطلوبة</div></div>
      <div class="card-body">
        <div class="alert alert-info" style="margin-bottom:12px;">
          <span class="alert-icon">📅</span>
          <div>تكرار الرفع: <strong>${freq}</strong></div>
        </div>
        ${docs.map((d,i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;">
            <span style="width:24px;height:24px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">${i+1}</span>
            <span style="font-size:13px;">${d}</span>
            <span class="badge badge-danger" style="margin-right:auto;">مطلوب</span>
          </div>`).join('')}
        <div class="divider"></div>
        <div style="font-size:12px;color:var(--text-muted);">
          <strong>آخر رفع:</strong> 12 مارس 2026 — 10:30 ص<br>
          <strong>الحالة:</strong> <span class="text-success">تمت الموافقة</span>
        </div>
      </div>
    </div>
  </div>`;
}

function buildBranchSettings() {
  return `
  ${pageHeader('إعدادات الفرع', 'معلومات وإعدادات فرع الرياض العليا')}
  <div class="grid-2">
    ${card('🏪 معلومات الفرع', `
      <div class="form-group"><label class="form-label">اسم الفرع</label><input class="form-input" value="فرع الرياض — العليا"></div>
      <div class="form-group"><label class="form-label">المدينة</label><select class="form-select"><option>الرياض</option></select></div>
      <div class="form-group"><label class="form-label">العنوان</label><input class="form-input" value="حي العليا، شارع العليا العام"></div>
      <div class="form-group"><label class="form-label">رقم الهاتف</label><input class="form-input" value="+966 11 xxx xxxx"></div>
      <button class="btn btn-primary">💾 حفظ</button>
    `)}
    ${card('📊 إحصائيات الفرع', `
      <div class="info-row"><span class="label">رقم الفرع</span><span class="value">FR-001</span></div>
      <div class="info-row"><span class="label">تاريخ الافتتاح</span><span class="value">1 يناير 2020</span></div>
      <div class="info-row"><span class="label">المحاسب المسؤول</span><span class="value">أحمد محمد</span></div>
      <div class="info-row"><span class="label">رئيس الحسابات</span><span class="value">خالد العمري</span></div>
      <div class="info-row"><span class="label">عدد الموظفين</span><span class="value">45 موظف</span></div>
      <div class="info-row"><span class="label">الطاقة الاستيعابية</span><span class="value">120 طاولة</span></div>
    `)}
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  PROCUREMENT PAGES
// ══════════════════════════════════════════════════════════════
function buildProcurementPages(container) {
  container.innerHTML += createPage('proc-overview', buildProcOverview());
  container.innerHTML += createPage('proc-new', buildProcNew());
  container.innerHTML += createPage('proc-grouped', buildProcGrouped());
  container.innerHTML += createPage('proc-sent', buildProcSent());
  container.innerHTML += createPage('proc-items', buildProcItems());
  container.innerHTML += createPage('proc-suppliers', buildProcSuppliers());
  container.innerHTML += createPage('proc-reports', buildProcReports());
}

function buildProcOverview() {
  return `
  ${pageHeader('لوحة تحكم المشتريات', 'إدارة مركزية لمشتريات جميع الفروع')}
  <div class="kpi-grid">
    ${kpiCard('طلبات جديدة', '45', 'من 30 فرع', 'blue', '📥')}
    ${kpiCard('طلبات مجمعة', '8', 'جاهزة للإرسال', 'gold', '📦')}
    ${kpiCard('مرسلة للموردين', '12', 'بانتظار التأكيد', 'orange', '📤')}
    ${kpiCard('إجمالي قيمة الطلبات', '285,000 ر.س', 'هذا الأسبوع', 'green', '💰')}
  </div>
  <div class="grid-2 mb-20">
    ${card('📊 توزيع الطلبات بالمورد', `
      ${[
        {name:'شركة الدواجن الوطنية', count:18, pct:40},
        {name:'مورد الخضروات الطازجة', count:12, pct:27},
        {name:'مورد المواد الغذائية', count:9, pct:20},
        {name:'موردون آخرون', count:6, pct:13},
      ].map(s => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:13px;">${s.name}</span>
            <span class="text-sm text-muted">${s.count} طلب (${s.pct}%)</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${s.pct * 2}%"></div></div>
        </div>`).join('')}
    `)}
    ${card('⚡ إجراءات سريعة', `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary w-full" onclick="navigateTo('proc-new')">📥 مراجعة الطلبات الجديدة (45)</button>
        <button class="btn btn-accent w-full" onclick="navigateTo('proc-grouped')">📦 إرسال الطلبات المجمعة (8)</button>
        <button class="btn btn-ghost w-full" onclick="navigateTo('proc-suppliers')">🏢 إدارة الموردين</button>
        <button class="btn btn-ghost w-full" onclick="navigateTo('proc-items')">📦 إدارة الأصناف</button>
      </div>
    `)}
  </div>`;
}

function buildProcNew() {
  return `
  ${pageHeader('الطلبات الجديدة', '45 طلب شراء من الفروع — بانتظار المراجعة والتجميع',
    `<button class="btn btn-primary">📦 تجميع المحدد</button>`)}
  <div class="filter-bar">
    <label>الفرع:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>المورد:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>الصنف:</label>
    <select class="filter-select"><option>الكل</option></select>
    <label>التاريخ المطلوب:</label>
    <select class="filter-select"><option>الكل</option><option>اليوم</option><option>غداً</option></select>
    <button class="btn btn-primary btn-sm">تطبيق</button>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-title">📥 طلبات الشراء الواردة</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input type="checkbox" id="sel-all-proc"> <label for="sel-all-proc" style="font-size:12px;">تحديد الكل</label>
        <button class="btn btn-primary btn-sm">📦 تجميع المحدد</button>
      </div>
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>الفرع</th><th>الصنف</th><th>الكمية</th><th>الوحدة</th>
              <th>المورد المقترح</th><th>التاريخ المطلوب</th><th>الأولوية</th><th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${[
              {branch:'فرع الرياض',item:'دجاج مجمد',qty:200,unit:'كجم',supplier:'شركة الدواجن',date:'14 مارس',priority:'عالية',color:'danger'},
              {branch:'فرع جدة',item:'دجاج مجمد',qty:150,unit:'كجم',supplier:'شركة الدواجن',date:'14 مارس',priority:'عالية',color:'danger'},
              {branch:'فرع مكة',item:'طماطم',qty:80,unit:'كجم',supplier:'مورد الخضروات',date:'14 مارس',priority:'متوسطة',color:'warning'},
              {branch:'فرع الدمام',item:'زيت نباتي',qty:50,unit:'لتر',supplier:'مورد المواد',date:'15 مارس',priority:'منخفضة',color:'neutral'},
              {branch:'فرع الطائف',item:'دجاج مجمد',qty:100,unit:'كجم',supplier:'شركة الدواجن',date:'15 مارس',priority:'متوسطة',color:'warning'},
            ].map(r => `
              <tr>
                <td><input type="checkbox"></td>
                <td class="td-bold">${r.branch}</td>
                <td>${r.item}</td>
                <td class="font-bold">${r.qty}</td>
                <td>${r.unit}</td>
                <td>${r.supplier}</td>
                <td class="text-sm text-muted">${r.date}</td>
                <td><span class="badge badge-${r.color}">${r.priority}</span></td>
                <td><button class="btn btn-ghost btn-xs">👁️</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildProcGrouped() {
  return `
  ${pageHeader('الطلبات المجمعة', 'طلبات مجمعة حسب المورد — جاهزة للإرسال',
    `<button class="btn btn-primary">📤 إرسال الكل للموردين</button>`)}
  
  <div class="card mb-20">
    <div class="card-header">
      <div class="card-title">🐔 شركة الدواجن الوطنية — 3 طلبات مجمعة</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span class="chip">💰 11,250 ر.س</span>
        <button class="btn btn-primary btn-sm">📤 إرسال للمورد</button>
        <button class="btn btn-ghost btn-sm">✏️ تعديل</button>
      </div>
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الفروع</th><th>الكمية الإجمالية</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">دجاج مجمد</td>
              <td>الرياض + جدة + الطائف</td>
              <td class="font-bold">450 كجم</td>
              <td>25 ر.س</td>
              <td class="td-bold">11,250 ر.س</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">🥬 مورد الخضروات الطازجة — 2 طلبات مجمعة</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span class="chip">💰 640 ر.س</span>
        <button class="btn btn-primary btn-sm">📤 إرسال للمورد</button>
      </div>
    </div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الفروع</th><th>الكمية الإجمالية</th><th>سعر الوحدة</th><th>الإجمالي</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">طماطم</td>
              <td>مكة + الدمام</td>
              <td class="font-bold">80 كجم</td>
              <td>8 ر.س</td>
              <td class="td-bold">640 ر.س</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildProcSent() {
  return `
  ${pageHeader('الطلبات المرسلة للموردين', 'متابعة حالة الطلبات المرسلة')}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المورد</th><th>الأصناف</th><th>القيمة</th><th>تاريخ الإرسال</th><th>تاريخ التسليم</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">شركة الدواجن الوطنية</td>
              <td>دجاج مجمد — 450 كجم</td>
              <td class="td-bold">11,250 ر.س</td>
              <td>12 مارس 2026</td>
              <td>14 مارس 2026</td>
              <td><span class="badge badge-info">قيد التنفيذ</span></td>
              <td><button class="btn btn-ghost btn-xs">👁️ تتبع</button></td>
            </tr>
            <tr>
              <td class="td-bold">مورد الخضروات</td>
              <td>طماطم — 80 كجم</td>
              <td class="td-bold">640 ر.س</td>
              <td>11 مارس 2026</td>
              <td>12 مارس 2026</td>
              <td><span class="badge badge-success">تم التسليم</span></td>
              <td><button class="btn btn-ghost btn-xs">👁️ تفاصيل</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildProcItems() {
  return `
  ${pageHeader('إدارة الأصناف', 'الأصناف المركزية لجميع الفروع',
    `<button class="btn btn-primary">➕ إضافة صنف</button>`)}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الفئة</th><th>الوحدة</th><th>المورد الافتراضي</th><th>آخر سعر</th><th>الفروع الطالبة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr><td class="td-bold">دجاج مجمد</td><td><span class="badge badge-info">بروتين</span></td><td>كجم</td><td>شركة الدواجن الوطنية</td><td>25 ر.س</td><td>45 فرع</td><td><button class="btn btn-ghost btn-xs">✏️</button></td></tr>
            <tr><td class="td-bold">طماطم</td><td><span class="badge badge-success">خضروات</span></td><td>كجم</td><td>مورد الخضروات</td><td>8 ر.س</td><td>38 فرع</td><td><button class="btn btn-ghost btn-xs">✏️</button></td></tr>
            <tr><td class="td-bold">زيت نباتي</td><td><span class="badge badge-warning">زيوت</span></td><td>لتر</td><td>مورد المواد الغذائية</td><td>20 ر.س</td><td>50 فرع</td><td><button class="btn btn-ghost btn-xs">✏️</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildProcSuppliers() {
  return `
  ${pageHeader('إدارة الموردين', 'الموردون المعتمدون في النظام',
    `<button class="btn btn-primary">➕ إضافة مورد</button>`)}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>المورد</th><th>الفئة</th><th>الأصناف</th><th>الفروع المخدومة</th><th>إجمالي الطلبات</th><th>التقييم</th><th>الحالة</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">شركة الدواجن الوطنية</td>
              <td><span class="badge badge-info">بروتين</span></td>
              <td>5 أصناف</td>
              <td>50 فرع</td>
              <td>285,000 ر.س</td>
              <td>⭐⭐⭐⭐⭐</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
            <tr>
              <td class="td-bold">مورد الخضروات الطازجة</td>
              <td><span class="badge badge-success">خضروات</span></td>
              <td>12 صنف</td>
              <td>45 فرع</td>
              <td>95,000 ر.س</td>
              <td>⭐⭐⭐⭐</td>
              <td><span class="badge badge-success">نشط</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️</button> <button class="btn btn-ghost btn-xs">👁️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildProcReports() {
  return `
  ${pageHeader('تقارير المشتريات', 'تحليل المشتريات والموردين')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي المشتريات', '1,050,000 ر.س', 'هذا الشهر', 'blue', '🛒')}
    ${kpiCard('عدد الطلبات', '380', 'هذا الشهر', 'green', '📋')}
    ${kpiCard('متوسط قيمة الطلب', '2,763 ر.س', 'هذا الشهر', 'gold', '💰')}
    ${kpiCard('الموردون النشطون', '15', 'مورد', 'blue', '🏢')}
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">📊 أكثر الأصناف طلباً</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الكمية الإجمالية</th><th>القيمة</th><th>نسبة من الإجمالي</th></tr></thead>
          <tbody>
            <tr><td class="td-bold">دجاج مجمد</td><td>18,000 كجم</td><td class="td-bold">450,000 ر.س</td><td><div class="progress-bar" style="width:120px;"><div class="progress-fill green" style="width:43%"></div></div> 43%</td></tr>
            <tr><td class="td-bold">زيت نباتي</td><td>5,000 لتر</td><td class="td-bold">100,000 ر.س</td><td><div class="progress-bar" style="width:120px;"><div class="progress-fill" style="width:10%"></div></div> 10%</td></tr>
            <tr><td class="td-bold">طماطم</td><td>8,000 كجم</td><td class="td-bold">64,000 ر.س</td><td><div class="progress-bar" style="width:120px;"><div class="progress-fill orange" style="width:6%"></div></div> 6%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════════
//  SUPPLIER PAGES
// ══════════════════════════════════════════════════════════════
function buildSupplierPages(container) {
  container.innerHTML += createPage('sup-overview', buildSupOverview());
  container.innerHTML += createPage('sup-new', buildSupNew());
  container.innerHTML += createPage('sup-accepted', buildSupAccepted());
  container.innerHTML += createPage('sup-rejected', buildSupRejected());
  container.innerHTML += createPage('sup-items', buildSupItems());
  container.innerHTML += createPage('sup-reports', buildSupReports());
}

function buildSupOverview() {
  return `
  ${pageHeader('لوحة تحكم المورد', 'شركة الدواجن الوطنية — استلام ومتابعة الطلبات')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('طلبات جديدة', '3', 'بانتظار ردك', 'blue', '📥')}
    ${kpiCard('طلبات مقبولة', '12', 'هذا الأسبوع', 'green', '✅')}
    ${kpiCard('إجمالي المبيعات', '285,000 ر.س', 'هذا الشهر', 'gold', '💰')}
    ${kpiCard('الفروع المخدومة', '50', 'فرع', 'blue', '🏪')}
  </div>
  <div class="alert alert-warning mb-20">
    <span class="alert-icon">📥</span>
    <div><strong>3 طلبات جديدة</strong> من مدير المشتريات — يرجى الرد خلال 24 ساعة</div>
  </div>
  <div class="grid-2 mb-20">
    ${card('📊 ملخص الأداء', `
      <div class="info-row"><span class="label">معدل القبول</span><span class="value text-success">95%</span></div>
      <div class="info-row"><span class="label">متوسط وقت الاستجابة</span><span class="value">4 ساعات</span></div>
      <div class="info-row"><span class="label">معدل التسليم في الوقت</span><span class="value text-success">98%</span></div>
      <div class="info-row"><span class="label">التقييم العام</span><span class="value">⭐⭐⭐⭐⭐ (4.9/5)</span></div>
    `)}
    ${card('⚡ إجراءات سريعة', `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary w-full" onclick="navigateTo('sup-new')">📥 مراجعة الطلبات الجديدة (3)</button>
        <button class="btn btn-ghost w-full" onclick="navigateTo('sup-items')">📦 تحديث الأصناف والأسعار</button>
        <button class="btn btn-ghost w-full" onclick="navigateTo('sup-reports')">📊 تقارير المبيعات</button>
      </div>
    `)}
  </div>`;
}

function buildSupNew() {
  return `
  ${pageHeader('الطلبات الجديدة', '3 طلبات جديدة من مدير المشتريات')}
  
  ${[
    {id:'PO-2026-0145', items:'دجاج مجمد — 450 كجم', value:'11,250 ر.س', date:'14 مارس 2026', branches:'فرع الرياض + جدة + الطائف'},
    {id:'PO-2026-0146', items:'دجاج مجمد — 200 كجم', value:'5,000 ر.س', date:'15 مارس 2026', branches:'فرع مكة + الدمام'},
    {id:'PO-2026-0147', items:'دجاج مجمد — 100 كجم', value:'2,500 ر.س', date:'16 مارس 2026', branches:'فرع الطائف'},
  ].map(order => `
    <div class="op-card">
      <div class="op-card-header">
        <div class="op-card-title">
          <span>📦 ${order.id}</span>
          <span class="badge badge-info">جديد</span>
        </div>
        <div class="op-amount">${order.value}</div>
      </div>
      <div class="op-card-meta">
        <span>📦 ${order.items}</span>
        <span>📅 التسليم: ${order.date}</span>
        <span>🏪 ${order.branches}</span>
      </div>
      <div class="op-card-actions">
        <button class="btn btn-success btn-sm">✅ قبول الطلب</button>
        <button class="btn btn-danger btn-sm">❌ رفض</button>
        <button class="btn btn-ghost btn-sm">💬 طلب تعديل</button>
        <button class="btn btn-ghost btn-sm">👁️ تفاصيل</button>
      </div>
    </div>`).join('')}`;
}

function buildSupAccepted() {
  return `
  ${pageHeader('الطلبات المقبولة', 'الطلبات التي تم قبولها وجدولة تسليمها')}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>رقم الطلب</th><th>الأصناف</th><th>القيمة</th><th>تاريخ القبول</th><th>تاريخ التسليم</th><th>حالة التسليم</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">PO-2026-0140</td>
              <td>دجاج مجمد — 300 كجم</td>
              <td class="td-bold">7,500 ر.س</td>
              <td>10 مارس 2026</td>
              <td>12 مارس 2026</td>
              <td><span class="badge badge-success">تم التسليم</span></td>
            </tr>
            <tr>
              <td class="td-bold">PO-2026-0141</td>
              <td>دجاج مجمد — 500 كجم</td>
              <td class="td-bold">12,500 ر.س</td>
              <td>11 مارس 2026</td>
              <td>13 مارس 2026</td>
              <td><span class="badge badge-info">قيد التسليم</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildSupRejected() {
  return `
  ${pageHeader('الطلبات المرفوضة', 'الطلبات التي تم رفضها مع الأسباب')}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>رقم الطلب</th><th>الأصناف</th><th>سبب الرفض</th><th>التاريخ</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">PO-2026-0138</td>
              <td>دجاج مجمد — 1000 كجم</td>
              <td class="text-danger">الكمية تتجاوز طاقتنا الحالية</td>
              <td>8 مارس 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildSupItems() {
  return `
  ${pageHeader('الأصناف والأسعار', 'إدارة كتالوج الأصناف والأسعار',
    `<button class="btn btn-primary">➕ إضافة صنف</button>`)}
  <div class="card">
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الصنف</th><th>الوصف</th><th>الوحدة</th><th>سعر الوحدة</th><th>الحد الأدنى للطلب</th><th>التوفر</th><th>إجراءات</th></tr></thead>
          <tbody>
            <tr>
              <td class="td-bold">دجاج مجمد (كامل)</td>
              <td class="text-sm text-muted">دجاج مجمد كامل — درجة أولى</td>
              <td>كجم</td>
              <td class="td-bold">25 ر.س</td>
              <td>50 كجم</td>
              <td><span class="badge badge-success">متوفر</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل السعر</button></td>
            </tr>
            <tr>
              <td class="td-bold">دجاج مجمد (قطع)</td>
              <td class="text-sm text-muted">قطع دجاج مجمدة — صدور وأفخاذ</td>
              <td>كجم</td>
              <td class="td-bold">32 ر.س</td>
              <td>30 كجم</td>
              <td><span class="badge badge-success">متوفر</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل السعر</button></td>
            </tr>
            <tr>
              <td class="td-bold">دجاج طازج</td>
              <td class="text-sm text-muted">دجاج طازج يومي</td>
              <td>كجم</td>
              <td class="td-bold">35 ر.س</td>
              <td>20 كجم</td>
              <td><span class="badge badge-warning">محدود</span></td>
              <td><button class="btn btn-ghost btn-xs">✏️ تعديل السعر</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function buildSupReports() {
  return `
  ${pageHeader('تقارير المبيعات', 'تحليل مبيعاتك للفروع')}
  <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr);">
    ${kpiCard('إجمالي المبيعات', '285,000 ر.س', 'هذا الشهر', 'blue', '💰')}
    ${kpiCard('عدد الطلبات', '45', 'هذا الشهر', 'green', '📋')}
    ${kpiCard('أكثر فرع طلباً', 'فرع الرياض', '85,000 ر.س', 'gold', '🏪')}
    ${kpiCard('أكثر صنف مبيعاً', 'دجاج مجمد', '250,000 ر.س', 'blue', '🐔')}
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">📊 المبيعات حسب الفرع</div></div>
    <div class="card-body" style="padding:0;">
      <div class="table-wrap">
        <table>
          <thead><tr><th>الفرع</th><th>عدد الطلبات</th><th>الكمية</th><th>القيمة</th><th>نسبة من الإجمالي</th></tr></thead>
          <tbody>
            <tr><td class="td-bold">فرع الرياض — العليا</td><td>12</td><td>3,400 كجم</td><td class="td-bold">85,000 ر.س</td><td>30%</td></tr>
            <tr><td class="td-bold">فرع جدة — الحمراء</td><td>10</td><td>2,800 كجم</td><td class="td-bold">70,000 ر.س</td><td>25%</td></tr>
            <tr><td class="td-bold">فرع مكة</td><td>8</td><td>2,000 كجم</td><td class="td-bold">50,000 ر.س</td><td>18%</td></tr>
            <tr><td class="td-bold">فروع أخرى</td><td>15</td><td>3,200 كجم</td><td class="td-bold">80,000 ر.س</td><td>27%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
