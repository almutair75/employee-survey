/* =============================================
   ODOO SURVEY — dashboard.js v2
   ============================================= */

const DASH_CONFIG = { demoPassword: 'Majed@2026', mode: 'firebase' };

/* ── Question labels per language ── */
const Q_META = [
  { key:'q0',  typeAr:'standard',    typeEn:'standard' },
  { key:'q1',  typeAr:'standard',    typeEn:'standard' },
  { key:'q2',  typeAr:'standard',    typeEn:'standard' },
  { key:'q3',  typeAr:'standard',    typeEn:'standard' },
  { key:'q4',  typeAr:'standard',    typeEn:'standard' },
  { key:'q5',  typeAr:'standard',    typeEn:'standard' },
  { key:'q6',  typeAr:'problem',     typeEn:'problem'  },
  { key:'q7',  typeAr:'standard',    typeEn:'standard' },
  { key:'q8',  typeAr:'knowledge',   typeEn:'knowledge'},
  { key:'q9',  typeAr:'success',     typeEn:'success'  },
  { key:'q10', typeAr:'development', typeEn:'development'},
  { key:'q11', typeAr:'alternative', typeEn:'alternative'},
];

const DT = {
  ar: {
    title: 'لوحة نتائج الاستبيان',
    subtitle: 'تقييم استخدام نظام Odoo — عرض الإدارة',
    exportCsv: 'تصدير CSV',
    print: 'طباعة التقرير',
    exit: 'خروج',
    logout: 'تسجيل خروج',
    filters: 'الفلاتر',
    dept: 'القسم',
    allDepts: 'كل الأقسام',
    dateFrom: 'من تاريخ',
    dateTo: 'إلى تاريخ',
    minRating: 'أدنى تقييم',
    anyRating: 'أي تقييم',
    employee: 'الموظف',
    searchName: 'بحث بالاسم...',
    clear: 'مسح',
    totalResp: 'إجمالي الردود',
    submissions: 'استبيان مُرسل',
    overallSat: 'متوسط الرضا العام',
    avgScore: 'متوسط التقييم / 5',
    departments: 'الأقسام',
    uniqueDepts: 'قسم مشارك',
    latestResp: 'آخر رد',
    recentSub: 'آخر إرسال',
    chartBarTitle: 'متوسط التقييم لكل سؤال',
    chartBarSub: 'متوسط الدرجة لكل محور تقييم',
    chartDonutTitle: 'توزيع مستوى الاستخدام',
    chartDonutSub: 'نسبة الاستخدام بين الموظفين',
    allRespTitle: 'جميع الردود',
    respFound: 'رد موجود',
    respsFound: 'ردود موجودة',
    colNum: '#',
    colName: 'اسم الموظف',
    colDept: 'القسم',
    colDate: 'تاريخ الإرسال',
    colUsage: 'الاستخدام',
    colScore: 'متوسط التقييم',
    colActions: 'الإجراءات',
    viewBtn: 'عرض',
    commentsTitle: 'ملاحظات واقتراحات الموظفين',
    commentsSub: 'الملاحظات النصية من الاستبيانات',
    tabProblems: 'المشاكل',
    tabSuggestions: 'الاقتراحات',
    tabNotes: 'الملاحظات التفصيلية',
    noComments: 'لا توجد تعليقات في هذا التصنيف.',
    noData: 'لا توجد بيانات بعد. شارك رابط الاستبيان مع الموظفين.',
    printNote: 'طباعة الملاحظة',
    printFull: 'طباعة التقرير الكامل',
    detailTitle: 'تفاصيل الرد',
    lblName: 'اسم الموظف', lblDept: 'القسم', lblDate: 'تاريخ الإرسال',
    lblUsage: 'مستوى الاستخدام', lblAvg: 'متوسط التقييم', lblLang: 'اللغة',
    ratingBreakdown: 'تفاصيل التقييم',
    lblProblems: 'المشاكل المذكورة', lblSuggestions: 'الاقتراحات',
    langAr: 'عربي', langEn: 'إنجليزي',
    loginTitle: 'لوحة تحكم الإدارة',
    loginSub: 'تسجيل الدخول للوصول إلى نتائج الاستبيان',
    loginPwLabel: 'كلمة المرور',
    loginPwPlaceholder: 'أدخل كلمة المرور',
    loginBtn: 'دخول',
    loginHint: 'للوصول تواصل مع مدير النظام',
    loginErr: 'كلمة المرور غير صحيحة',
    exportSuccess: 'تم تصدير CSV بنجاح ✓',
    exportEmpty: 'لا توجد بيانات للتصدير',
    qLabels: [
      'سهولة استخدام نظام Odoo',
      'وضوح الشاشات والقوائم',
      'سرعة النظام أثناء العمل',
      'دقة البيانات والمعلومات',
      'سهولة الوصول للطلبات/المنتجات/التقارير',
      'توافق النظام مع طريقة العمل اليومية',
      'مستوى المشاكل أو الأخطاء',
      'الرضا العام عن نظام Odoo',
      'مدى الإلمام والمعرفة بالنظام',
      'هل النظام ناجح في الشركة؟',
      'هل النظام يحتاج تطوير؟',
      'هل تري ضرورة البحث عن بديل؟',
    ],
    scaleLabels: {
      standard:    { 1:'ضعيف جداً', 2:'ضعيف', 3:'متوسط', 4:'جيد', 5:'ممتاز' },
      problem:     { 1:'كثيرة جداً', 2:'كثيرة', 3:'متوسطة', 4:'قليلة', 5:'لا توجد' },
      knowledge:   { 1:'مبتدئ', 2:'أساسي', 3:'متوسط', 4:'جيد', 5:'خبير' },
      success:     { 1:'فاشل', 2:'ضعيف', 3:'مقبول', 4:'جيد', 5:'ناجح جداً' },
      development: { 1:'لا يحتاج', 2:'بسيط', 3:'متوسط', 4:'كبير', 5:'جذري' },
      alternative: { 1:'لا داعي', 2:'ربما', 3:'محايد', 4:'يُنصح', 5:'ضرورة قصوى' },
    },
    usageLabels: { daily:'يومياً', weekly:'عدة مرات/أسبوع', rarely:'نادراً', little:'لا يستخدم كثيراً' },
  },
  en: {
    title: 'Survey Results Dashboard',
    subtitle: 'Odoo Usage Evaluation — Management View',
    exportCsv: 'Export CSV',
    print: 'Print Report',
    exit: 'Exit',
    logout: 'Logout',
    filters: 'Filters',
    dept: 'Department',
    allDepts: 'All Departments',
    dateFrom: 'Date From',
    dateTo: 'Date To',
    minRating: 'Min Rating',
    anyRating: 'Any Rating',
    employee: 'Employee',
    searchName: 'Search name...',
    clear: 'Clear',
    totalResp: 'Total Responses',
    submissions: 'survey submissions',
    overallSat: 'Overall Satisfaction',
    avgScore: 'average score / 5',
    departments: 'Departments',
    uniqueDepts: 'departments participated',
    latestResp: 'Latest Response',
    recentSub: 'most recent submission',
    chartBarTitle: 'Average Score by Question',
    chartBarSub: 'Average score per evaluation dimension',
    chartDonutTitle: 'Usage Frequency Distribution',
    chartDonutSub: 'Usage level among employees',
    allRespTitle: 'All Responses',
    respFound: 'response found',
    respsFound: 'responses found',
    colNum: '#',
    colName: 'Employee Name',
    colDept: 'Department',
    colDate: 'Submission Date',
    colUsage: 'Usage',
    colScore: 'Avg. Score',
    colActions: 'Actions',
    viewBtn: 'View',
    commentsTitle: 'Employee Comments & Suggestions',
    commentsSub: 'Text responses from survey submissions',
    tabProblems: 'Problems',
    tabSuggestions: 'Suggestions',
    tabNotes: 'Detailed Notes',
    noComments: 'No comments in this category.',
    noData: 'No responses yet. Share the survey link with employees.',
    printNote: 'Print Note',
    printFull: 'Print Full Report',
    detailTitle: 'Response Detail',
    lblName: 'Employee Name', lblDept: 'Department', lblDate: 'Submission Date',
    lblUsage: 'Usage Frequency', lblAvg: 'Average Score', lblLang: 'Language',
    ratingBreakdown: 'Rating Breakdown',
    lblProblems: 'Reported Problems', lblSuggestions: 'Suggestions',
    langAr: 'Arabic', langEn: 'English',
    loginTitle: 'Management Dashboard',
    loginSub: 'Sign in to access survey results',
    loginPwLabel: 'Password',
    loginPwPlaceholder: 'Enter password',
    loginBtn: 'Sign In',
    loginHint: 'Contact system administrator for access',
    loginErr: 'Incorrect password',
    exportSuccess: 'CSV exported successfully ✓',
    exportEmpty: 'No data to export',
    qLabels: [
      'Ease of use of Odoo',
      'Clarity of screens and menus',
      'System speed during work',
      'Accuracy of data and information',
      'Ease of accessing orders/products/reports',
      'Alignment with daily workflow',
      'Level of problems or errors',
      'Overall satisfaction with Odoo',
      'Familiarity and knowledge of Odoo',
      'Is Odoo successful in the company?',
      'Does the system need development?',
      'Need to look for an alternative system?',
    ],
    scaleLabels: {
      standard:    { 1:'Very Poor', 2:'Poor', 3:'Average', 4:'Good', 5:'Excellent' },
      problem:     { 1:'Very Many', 2:'Many', 3:'Moderate', 4:'Few', 5:'None' },
      knowledge:   { 1:'Beginner', 2:'Basic', 3:'Intermediate', 4:'Good', 5:'Expert' },
      success:     { 1:'Failure', 2:'Poor', 3:'Acceptable', 4:'Good', 5:'Very Successful' },
      development: { 1:'Not Needed', 2:'Minor', 3:'Moderate', 4:'Major', 5:'Radical' },
      alternative: { 1:'Not Needed', 2:'Maybe', 3:'Neutral', 4:'Recommended', 5:'Critical' },
    },
    usageLabels: { daily:'Daily', weekly:'Several times/week', rarely:'Rarely', little:"Doesn't use much" },
  },
};

/* ── STATE ── */
let dashLang = 'ar';   // ← افتراضي عربي
let allResponses = [];
let filteredResponses = [];
let barChart = null;
let doughnutChart = null;

/* ── AUTH ── */
function doLogin() {
  const pw = document.getElementById('login-pw').value;
  if (pw === DASH_CONFIG.demoPassword) {
    sessionStorage.setItem('dash_auth','1');
    document.getElementById('dashboard-login').style.display = 'none';
    document.getElementById('dashboard-app').classList.add('active');
    init();
  } else {
    const t = DT[dashLang];
    const err = document.getElementById('login-err');
    err.textContent = t.loginErr;
    err.classList.add('show');
    document.getElementById('login-pw').classList.add('invalid');
  }
}
function doLogout() { sessionStorage.removeItem('dash_auth'); location.reload(); }

/* ── LANG TOGGLE ── */
function toggleDashLang() {
  dashLang = dashLang === 'en' ? 'ar' : 'en';
  applyDashLang();
  renderAll();
}

function applyDashLang() {
  const t = DT[dashLang];
  const isAr = dashLang === 'ar';
  document.body.classList.toggle('dash-rtl', isAr);
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

  // Update all text elements
  setTxt('dash-title', t.title);
  setTxt('dash-subtitle', t.subtitle);
  setTxt('dash-lang-label', isAr ? 'English' : 'العربية');
  setTxt('btn-export-label', t.exportCsv);
  setTxt('btn-print-label', t.print);
  setTxt('btn-print-all-label', dashLang==='ar' ? 'تقرير PDF شامل' : 'Full PDF Report');
  setTxt('btn-exit-label', t.exit);
  setTxt('filters-label-txt', t.filters);
  setTxt('filter-dept-label', t.dept);
  setTxt('filter-date-from-label', t.dateFrom);
  setTxt('filter-date-to-label', t.dateTo);
  setTxt('filter-rating-label', t.minRating);
  setTxt('filter-emp-label', t.employee);
  setTxt('btn-clear-label', t.clear);
  setTxt('kpi-total-label', t.totalResp);
  setTxt('kpi-total-sub', t.submissions);
  setTxt('kpi-avg-label', t.overallSat);
  setTxt('kpi-avg-sub', t.avgScore);
  setTxt('kpi-depts-label', t.departments);
  setTxt('kpi-depts-sub', t.uniqueDepts);
  setTxt('kpi-latest-label', t.latestResp);
  setTxt('kpi-latest-sub', t.recentSub);
  setTxt('chart-bar-title', t.chartBarTitle);
  setTxt('chart-bar-sub', t.chartBarSub);
  setTxt('chart-donut-title', t.chartDonutTitle);
  setTxt('chart-donut-sub', t.chartDonutSub);
  setTxt('all-resp-title', t.allRespTitle);
  setTxt('tab-problems-label', t.tabProblems);
  setTxt('tab-suggestions-label', t.tabSuggestions);
  setTxt('tab-notes-label', t.tabNotes);
  setTxt('comments-title', t.commentsTitle);
  setTxt('comments-sub', t.commentsSub);

  // Future section — updated by renderFutureSection() but set titles here too
  setTxt('future-section-title',
    dashLang==='ar' ? 'رأي الموظفين في النظام ومستقبله' : 'Employee Opinion on System Future');
  setTxt('future-section-sub',
    dashLang==='ar'
      ? 'هذه الأسئلة تعكس رأي الموظفين الاستراتيجي — تُقرأ باتجاهها الخاص'
      : "These questions reflect employees' strategic opinion — each has its own scale direction");
  setTxt('chart-bar-title',
    dashLang==='ar' ? 'التقييم التشغيلي للنظام' : 'Operational System Evaluation');
  setTxt('chart-bar-sub',
    dashLang==='ar' ? 'متوسط التقييم للأسئلة التشغيلية الثمانية' : 'Average score for the 8 operational questions');
  setTxt('chart-donut-title',
    dashLang==='ar' ? 'توزيع مستوى الاستخدام' : 'Usage Frequency Distribution');
  setTxt('chart-donut-sub',
    dashLang==='ar' ? 'نسبة الاستخدام بين الموظفين' : 'Usage level among employees');

  // Table headers
  setTxt('th-num', t.colNum);
  setTxt('th-name', t.colName);
  setTxt('th-dept', t.colDept);
  setTxt('th-date', t.colDate);
  setTxt('th-usage', t.colUsage);
  setTxt('th-score', t.colScore);
  setTxt('th-actions', t.colActions);

  // Filter placeholders
  const deptSel = document.getElementById('filter-dept');
  if (deptSel && deptSel.options[0]) deptSel.options[0].text = t.allDepts;
  const ratingSel = document.getElementById('filter-rating');
  if (ratingSel && ratingSel.options[0]) ratingSel.options[0].text = t.anyRating;
  const nameInput = document.getElementById('filter-name');
  if (nameInput) nameInput.placeholder = t.searchName;
}

function setTxt(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }

/* ── DATA ── */
const FB_CFG = {
  apiKey: "AIzaSyAK2-UBMDtyvkPGRGXJLXIq311U4N32fVo",
  authDomain: "employee-survey-7a907.firebaseapp.com",
  projectId: "employee-survey-7a907",
  storageBucket: "employee-survey-7a907.firebasestorage.app",
  messagingSenderId: "936069019815",
  appId: "1:936069019815:web:b63cb3a565e57f3ec4c382"
};

function getDB() {
  const app = firebase.apps.find(a=>a.name==='dash') || firebase.initializeApp(FB_CFG,'dash');
  return firebase.firestore(app);
}

async function loadData() {
  if (DASH_CONFIG.mode === 'demo') {
    return JSON.parse(localStorage.getItem('odoo_survey_responses') || '[]');
  }
  if (DASH_CONFIG.mode === 'firebase') {
    try {
      const db   = getDB();
      const snap = await db.collection('survey_responses').orderBy('timestamp','desc').get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Firebase load error:', err);
      return [];
    }
  }
  return [];
}

/* ── INIT ── */
async function init() {
  allResponses = await loadData();
  filteredResponses = [...allResponses];
  applyDashLang();
  populateFilters();
  renderAll();
}

function populateFilters() {
  const t = DT[dashLang];
  const sel = document.getElementById('filter-dept');
  // Clear existing options except first
  while (sel.options.length > 1) sel.remove(1);
  const depts = [...new Set(allResponses.map(r => r.department).filter(Boolean))].sort();
  depts.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    sel.appendChild(opt);
  });

  // Populate employee filter
  const empSel = document.getElementById('filter-employee');
  while (empSel.options.length > 1) empSel.remove(1);
  const names = [...new Set(allResponses.map(r => r.name).filter(Boolean))].sort();
  names.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n; opt.textContent = n;
    empSel.appendChild(opt);
  });
}

/* ── FILTERS ── */
function applyFilters() {
  const dept = document.getElementById('filter-dept').value;
  const dateFrom = document.getElementById('filter-date-from').value;
  const dateTo = document.getElementById('filter-date-to').value;
  const minRating = parseFloat(document.getElementById('filter-rating').value) || 0;
  const empName = document.getElementById('filter-employee').value;
  const nameSearch = document.getElementById('filter-name').value.trim().toLowerCase();

  filteredResponses = allResponses.filter(r => {
    if (dept && r.department !== dept) return false;
    if (dateFrom && r.timestamp < dateFrom) return false;
    if (dateTo && r.timestamp.slice(0,10) > dateTo) return false;
    if (minRating && r.avgRating < minRating) return false;
    if (empName && r.name !== empName) return false;
    if (nameSearch && !r.name.toLowerCase().includes(nameSearch)) return false;
    return true;
  });
  renderAll();
}

function clearFilters() {
  ['filter-dept','filter-date-from','filter-date-to','filter-rating','filter-employee'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('filter-name').value = '';
  filteredResponses = [...allResponses];
  renderAll();
}

/* ── RENDER ALL ── */
function renderAll() {
  renderKPIs();
  renderOperationalChart();
  renderDoughnutChart();
  renderFutureSection();
  renderTable();
  renderComments();
}

/* ── KPIs ── */
function renderKPIs() {
  const t = DT[dashLang];
  const total = filteredResponses.length;
  setTxt('kpi-total', total);
  const depts = new Set(filteredResponses.map(r => r.department).filter(Boolean));
  setTxt('kpi-depts', depts.size);
  if (!total) { setTxt('kpi-avg','—'); setTxt('kpi-latest','—'); return; }

  // avg only from operational questions q0–q7 (exclude q6 inversion here, show raw avg)
  const opKeys = ['q0','q1','q2','q3','q4','q5','q6','q7'];
  let opSum = 0, opCount = 0;
  filteredResponses.forEach(r => {
    opKeys.forEach(k => { if (r.ratings?.[k]) { opSum += r.ratings[k]; opCount++; } });
  });
  const opAvg = opCount ? opSum / opCount : 0;
  setTxt('kpi-avg', opAvg.toFixed(2) + ' / 5');

  const latest = filteredResponses.reduce((a,b)=>new Date(a.timestamp)>new Date(b.timestamp)?a:b);
  setTxt('kpi-latest', new Date(latest.timestamp).toLocaleDateString(dashLang==='ar'?'ar-SA':'en-GB'));
}

/* ── OPERATIONAL BAR CHART (q0–q5, q7 only — standard questions) ── */
function renderOperationalChart() {
  const t = DT[dashLang];
  const ctx = document.getElementById('chart-bar').getContext('2d');

  // Only standard questions — exclude q6 (problems)
  const stdMeta   = Q_META.filter(q => q.key !== 'q6').slice(0, 7); // q0–q5, q7
  const stdLabels = [
    ...t.qLabels.slice(0, 6),   // q0–q5
    t.qLabels[7],                // q7 (skip q6)
  ];

  const respCount = filteredResponses.length;
  const countSuffix = dashLang === 'ar' ? `${respCount} موظف` : `${respCount} resp.`;

  const avgs = stdMeta.map(q => {
    const vals = filteredResponses.map(r => r.ratings?.[q.key]).filter(v => v != null);
    return vals.length ? +(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2) : 0;
  });

  const shortLabels = stdLabels.map(l => {
    const words = l.split(' ');
    const lines = [];
    let line = '';
    words.forEach(w => {
      if ((line+' '+w).trim().length > 16) { lines.push(line.trim()); line = w; }
      else line = (line+' '+w).trim();
    });
    if (line) lines.push(line);
    lines.push(countSuffix);
    return lines;
  });

  const colors = avgs.map(v =>
    v>=4?'#10b981': v>=3?'#1a56db': v>=2?'#f97316':'#ef4444'
  );

  if (barChart) barChart.destroy();
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: shortLabels,
      datasets: [{
        label: dashLang==='ar' ? 'مستوى التقييم' : 'Score Level',
        data: avgs,
        backgroundColor: colors,
        borderRadius: 6, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          title: items => stdLabels[items[0].dataIndex],
          label: item => ` ${dashLang==='ar'?'المتوسط':'Avg'}: ${item.raw}/5`,
          afterLabel: () => ` ${dashLang==='ar'?'عدد الردود':'Responses'}: ${respCount}`,
        }},
      },
      scales: {
        y: {
          min: 0, max: 5,
          ticks: { stepSize:1, font:{size:11}, callback: v => {
            const lb = dashLang==='ar'
              ? {0:'',1:'ضعيف جداً',2:'ضعيف',3:'متوسط',4:'جيد',5:'ممتاز'}
              : {0:'',1:'Very Poor',2:'Poor',3:'Average',4:'Good',5:'Excellent'};
            return lb[v]||v;
          }},
          grid: { color:'#f0f0f0' },
        },
        x: { ticks:{ font:{size:9}, maxRotation:0 }, grid:{display:false} },
      },
    },
  });

  // Hide the old note — no longer needed
  const noteEl = document.getElementById('chart-bar-note');
  if (noteEl) noteEl.style.display = 'none';

  // Build print-friendly horizontal bars
  const printBars = document.getElementById('print-bars-operational');
  if (printBars) {
    printBars.innerHTML = stdLabels.map((label, i) => {
      const v = avgs[i];
      const pct = (v / 5) * 100;
      const color = v>=4?'#10b981': v>=3?'#1a56db': v>=2?'#f97316':'#ef4444';
      const scLbl = dashLang==='ar'
        ? {1:'ضعيف جداً',2:'ضعيف',3:'متوسط',4:'جيد',5:'ممتاز'}
        : {1:'Very Poor',2:'Poor',3:'Average',4:'Good',5:'Excellent'};
      const lbl = scLbl[Math.round(v)] || '';
      return `<div class="print-bar-row">
        <div class="print-bar-label">${label}</div>
        <div class="print-bar-track">
          <div class="print-bar-fill" style="width:${pct.toFixed(0)}%;background:${color};"></div>
        </div>
        <div class="print-bar-val" style="color:${color};">${v.toFixed(1)}/5 ${lbl}</div>
      </div>`;
    }).join('');
  }

  // Render the problems chart separately
  renderProblemsChart();
}

/* ── PROBLEMS CHART (q6) — separate reversed chart ── */
let problemsChart = null;
function renderProblemsChart() {
  const t = DT[dashLang];
  const container = document.getElementById('problems-chart-section');
  if (!container) return;

  // q6: 1=كثيرة جداً (bad), 5=لا توجد (good)
  // For display: show raw values but label them correctly
  const vals = filteredResponses.map(r => r.ratings?.['q6']).filter(v => v != null);
  if (!vals.length) { container.style.display = 'none'; return; }
  container.style.display = 'block';

  const counts = {1:0, 2:0, 3:0, 4:0, 5:0};
  vals.forEach(v => counts[v]++);

  const probLabels = dashLang === 'ar'
    ? ['1 — كثيرة جداً','2 — كثيرة','3 — متوسطة','4 — قليلة','5 — لا توجد']
    : ['1 — Very Many','2 — Many','3 — Moderate','4 — Few','5 — None'];

  const probColors = ['#ef4444','#f97316','#eab308','#22c55e','#10b981'];

  const ctx2 = document.getElementById('chart-problems').getContext('2d');
  if (problemsChart) problemsChart.destroy();
  problemsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: probLabels,
      datasets: [{
        label: dashLang==='ar' ? 'عدد الموظفين' : 'Employees',
        data: Object.values(counts),
        backgroundColor: probColors,
        borderRadius: 6, borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: {
          label: item => ` ${dashLang==='ar'?'عدد الموظفين':'Employees'}: ${item.raw}`,
        }},
      },
      scales: {
        y: { beginAtZero:true, ticks:{stepSize:1,font:{size:11}}, grid:{color:'#f0f0f0'} },
        x: { ticks:{font:{size:10}}, grid:{display:false} },
      },
    },
  });
}

/* ── DOUGHNUT ── */
function renderDoughnutChart() {
  const t = DT[dashLang];
  const ctx = document.getElementById('chart-doughnut').getContext('2d');
  const counts = {daily:0,weekly:0,rarely:0,little:0};
  filteredResponses.forEach(r=>{if(r.usage&&counts[r.usage]!==undefined)counts[r.usage]++;});
  const total = filteredResponses.length;

  if (doughnutChart) doughnutChart.destroy();

  // Labels include count and percentage
  const labels = Object.entries(counts).map(([k, v]) => {
    const pct = total ? Math.round((v/total)*100) : 0;
    return `${t.usageLabels[k]} (${v} — ${pct}%)`;
  });

  doughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets:[{
        data: Object.values(counts),
        backgroundColor:['#1a56db','#0891b2','#10b981','#9ca3af'],
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '60%',
      plugins:{
        legend:{
          position: 'bottom',
          labels: { font:{ size:11 }, padding:10, boxWidth:14 },
        },
        tooltip: {
          callbacks: {
            label: item => {
              const v = item.raw;
              const pct = total ? Math.round((v/total)*100) : 0;
              return ` ${v} ${dashLang==='ar'?'موظف':'employees'} (${pct}%)`;
            },
          },
        },
      },
    },
  });

  // Build print-friendly usage bars
  const printUsage = document.getElementById('print-bars-usage');
  if (printUsage) {
    const usageColors = {daily:'#1a56db',weekly:'#0891b2',rarely:'#10b981',little:'#9ca3af'};
    printUsage.innerHTML = Object.entries(counts).map(([k,v]) => {
      const pct = total ? (v/total*100).toFixed(0) : 0;
      const w   = total ? (v/total*100).toFixed(1) : 0;
      return `<div class="print-usage-row">
        <div class="print-usage-label">${t.usageLabels[k]}</div>
        <div class="print-usage-track">
          <div class="print-usage-fill" style="width:${w}%;background:${usageColors[k]};"></div>
        </div>
        <div class="print-usage-val">${v} (${pct}%)</div>
      </div>`;
    }).join('');
  }
}

/* ── FUTURE SECTION (q8–q11) ── */
// These 4 questions show employee opinion about system future
// Displayed as horizontal gauge cards, NOT merged into the operational bar chart
let futureChart = null;

function renderFutureSection() {
  const t = DT[dashLang];
  const futureKeys = ['q8','q9','q10','q11'];
  const futureLabels = t.qLabels.slice(8); // last 4

  // Update section title
  setTxt('future-section-title',
    dashLang==='ar' ? 'رأي الموظفين في النظام ومستقبله' : 'Employee Opinion on System Future');
  setTxt('future-section-sub',
    dashLang==='ar'
      ? 'هذه الأسئلة تعكس رأي الموظفين الاستراتيجي في النظام — تُقرأ باتجاهها الخاص'
      : 'These questions reflect employees\' strategic opinion — each has its own scale direction');

  const container = document.getElementById('future-cards');
  if (!container) return;

  // Colors and icons per question type
  const qMeta = [
    { icon:'bi-mortarboard', color:'#7c3aed', bg:'#f5f3ff', label_dir:'higher_better',
      note: dashLang==='ar'?'الأعلى = إلمام أكبر بالنظام':'Higher = more system knowledge' },
    { icon:'bi-patch-check', color:'#059669', bg:'#f0fdf4', label_dir:'higher_better',
      note: dashLang==='ar'?'الأعلى = النظام ناجح أكثر':'Higher = system more successful' },
    { icon:'bi-tools', color:'#d97706', bg:'#fffbeb', label_dir:'higher_worse',
      note: dashLang==='ar'?'الأعلى = النظام يحتاج تطوير أكثر ⚠️':'Higher = more development needed ⚠️' },
    { icon:'bi-arrow-repeat', color:'#dc2626', bg:'#fef2f2', label_dir:'higher_worse',
      note: dashLang==='ar'?'الأعلى = الحاجة للبديل أكبر ⚠️':'Higher = stronger need for alternative ⚠️' },
  ];

  const futureQ = Q_META.slice(8);
  const avgs = futureQ.map(q => {
    const vals = filteredResponses.map(r=>r.ratings?.[q.key]).filter(v=>v!=null);
    return vals.length ? +(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2) : null;
  });

  const scaleTypes = ['knowledge','success','development','alternative'];

  container.innerHTML = futureLabels.map((label, i) => {
    const avg = avgs[i];
    const m = qMeta[i];
    const pct = avg ? (avg / 5) * 100 : 0;
    const scaleLabel = avg ? (t.scaleLabels[scaleTypes[i]]?.[Math.round(avg)] || '') : '—';
    const isWorse = m.label_dir === 'higher_worse';
    // Color bar red if high+worse, green if high+better
    const barColor = avg
      ? (isWorse
          ? (avg >= 4 ? '#ef4444' : avg >= 3 ? '#f97316' : avg >= 2 ? '#eab308' : '#10b981')
          : (avg >= 4 ? '#10b981' : avg >= 3 ? '#1a56db' : avg >= 2 ? '#f97316' : '#ef4444'))
      : '#e5e7eb';

    return `
      <div class="future-card">
        <div class="future-card-icon" style="background:${m.bg};color:${m.color};">
          <i class="bi ${m.icon}"></i>
        </div>
        <div class="future-card-body">
          <div class="future-card-label">${label}</div>
          <div class="future-card-note">${m.note}</div>
          <div class="future-gauge">
            <div class="future-gauge-track">
              <div class="future-gauge-fill" style="width:${pct}%;background:${barColor};"></div>
            </div>
            <div class="future-gauge-labels">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
          </div>
        </div>
        <div class="future-card-score" style="color:${barColor};">
          <div class="future-score-num">${avg ? avg.toFixed(1) : '—'}</div>
          <div class="future-score-lbl">${scaleLabel}</div>
        </div>
      </div>`;
  }).join('');
}

/* ── TABLE ── */
function renderTable() {
  const t = DT[dashLang];
  const tbody = document.getElementById('responses-tbody');
  const empty = document.getElementById('empty-responses');
  const sub = document.getElementById('table-count-sub');
  const count = filteredResponses.length;
  sub.textContent = count + ' ' + (count===1?t.respFound:t.respsFound);

  if (!count) { tbody.innerHTML=''; empty.style.display='block'; return; }
  empty.style.display='none';

  tbody.innerHTML = filteredResponses
    .slice().sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp))
    .map((r,i)=>{
      const avg=r.avgRating||0;
      const pct=(avg/5)*100;
      const bc=avg>=4?'badge-green':avg>=3?'badge-blue':avg>=2?'badge-amber':'badge-red';
      const date=new Date(r.timestamp).toLocaleDateString(dashLang==='ar'?'ar-SA':'en-GB');
      const initials=(r.name||'?').split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
      const usageTxt=t.usageLabels[r.usage]||r.usage||'—';
      return `<tr>
        <td style="color:var(--text-muted);font-size:0.78rem;">${i+1}</td>
        <td><div style="display:flex;align-items:center;gap:0.5rem;">
          <span class="avatar-initials">${initials}</span>
          <span style="font-weight:600;">${esc(r.name||'—')}</span>
        </div></td>
        <td><span class="badge badge-gray">${esc(r.department||'—')}</span></td>
        <td style="font-size:0.82rem;color:var(--text-muted);">${date}</td>
        <td><span class="badge badge-blue">${esc(usageTxt)}</span></td>
        <td><div class="score-bar">
          <div class="score-bar-track"><div class="score-bar-fill" style="width:${pct}%"></div></div>
          <span class="badge ${bc}">${avg.toFixed(1)}</span>
        </div></td>
        <td style="display:flex;gap:0.35rem;">
          <button class="btn-xs" onclick="showDetail('${r.id}')">
            <i class="bi bi-eye"></i> ${t.viewBtn}
          </button>
          <button class="btn-xs" style="color:var(--danger);border-color:#fca5a5;"
            onclick="confirmDelete('${r.id}','${esc(r.name)}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>`;
    }).join('');
}

/* ── COMMENTS ── */
function renderComments() {
  const t = DT[dashLang];

  // Problems tab
  const probPanel = document.getElementById('tab-problems');
  const probs = filteredResponses.filter(r=>r.problems);
  probPanel.innerHTML = probs.length ? probs.map(r=>noteCard(r,'problems',r.problems,t)).join('') :
    `<div class="empty-state"><i class="bi bi-chat-square"></i><p>${t.noComments}</p></div>`;

  // Suggestions tab
  const sugPanel = document.getElementById('tab-suggestions');
  const sugs = filteredResponses.filter(r=>r.suggestions);
  sugPanel.innerHTML = sugs.length ? sugs.map(r=>noteCard(r,'suggestions',r.suggestions,t)).join('') :
    `<div class="empty-state"><i class="bi bi-lightbulb"></i><p>${t.noComments}</p></div>`;

  // Detailed notes tab — show all per-question notes
  const notesPanel = document.getElementById('tab-notes');
  const notesHtml = filteredResponses.filter(r=>r.notes&&Object.values(r.notes).some(v=>v)).map(r=>{
    const date = new Date(r.timestamp).toLocaleDateString(dashLang==='ar'?'ar-SA':'en-GB');
    const noteItems = Q_META.map((q,i)=>{
      const noteKey = 'note_' + q.key;
      const noteVal = r.notes?.[noteKey];
      if (!noteVal) return '';
      return `<div style="margin-bottom:0.5rem;">
        <div style="font-size:0.72rem;font-weight:700;color:var(--primary);margin-bottom:0.2rem;">${t.qLabels[i]}</div>
        <div style="font-size:0.83rem;color:var(--text-secondary);">${esc(noteVal)}</div>
      </div>`;
    }).filter(Boolean).join('');
    if (!noteItems) return '';
    return `<div class="note-item">
      <div class="note-meta">
        <span class="note-author">${esc(r.name)}</span>
        <span class="note-dept">${esc(r.department)}</span>
        <span style="font-size:0.72rem;color:var(--text-muted);margin-inline-start:auto;">${date}</span>
      </div>
      ${noteItems}
      <div class="note-actions">
        <button class="btn-xs" onclick="showDetail('${r.id}')"><i class="bi bi-eye"></i> ${t.viewBtn}</button>
        <button class="btn-xs" onclick="printFullReport('${r.id}')"><i class="bi bi-printer"></i> ${t.printFull}</button>
      </div>
    </div>`;
  }).filter(Boolean).join('');
  notesPanel.innerHTML = notesHtml || `<div class="empty-state"><i class="bi bi-journal-text"></i><p>${t.noComments}</p></div>`;
}

function noteCard(r, field, content, t) {
  const date = new Date(r.timestamp).toLocaleDateString(dashLang==='ar'?'ar-SA':'en-GB');
  return `<div class="note-item">
    <div class="note-meta">
      <span class="note-author">${esc(r.name)}</span>
      <span class="note-dept">${esc(r.department)}</span>
      <span style="font-size:0.72rem;color:var(--text-muted);margin-inline-start:auto;">${date}</span>
    </div>
    <div class="note-text">${esc(content)}</div>
    <div class="note-actions">
      <button class="btn-xs" onclick="printNote('${r.id}','${field}')">
        <i class="bi bi-printer"></i> ${t.printNote}
      </button>
      <button class="btn-xs" onclick="printFullReport('${r.id}')">
        <i class="bi bi-printer"></i> ${t.printFull}
      </button>
    </div>
  </div>`;
}

/* ── TABS ── */
function switchTab(name, btn) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+name).classList.add('active');
}

/* ── DETAIL MODAL ── */
function showDetail(id) {
  const t = DT[dashLang];
  const r = allResponses.find(x=>x.id===id);
  if (!r) return;
  const date = new Date(r.timestamp).toLocaleString(dashLang==='ar'?'ar-SA':'en-GB');
  const avg = (r.avgRating||0).toFixed(2);
  const isAr = dashLang === 'ar';

  const ratingsHtml = Q_META.map((q,i)=>{
    const val = r.ratings?.[q.key];
    if (!val) return '';
    const pct=(val/5)*100;
    const scaleType = q.typeAr;
    const valLabel = t.scaleLabels[scaleType]?.[val]||val;
    const noteKey = 'note_'+q.key;
    const noteVal = r.notes?.[noteKey];
    return `<div class="rating-row-item" style="flex-wrap:wrap;gap:0.5rem;">
      <span class="rating-row-label">${t.qLabels[i]}</span>
      <div class="score-bar" style="width:100px;flex-shrink:0;">
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <span class="rating-row-val"><strong>${val}</strong>/5 <span style="font-size:0.7rem;color:var(--text-muted);">${valLabel}</span></span>
      ${noteVal?`<div style="width:100%;font-size:0.78rem;color:var(--text-muted);background:var(--bg);padding:0.4rem 0.6rem;border-radius:6px;margin-top:0.2rem;">${esc(noteVal)}</div>`:''}
    </div>`;
  }).filter(Boolean).join('');

  const box = document.querySelector('.modal-box');
  if (box) box.classList.toggle('rtl-modal', isAr);

  document.getElementById('modal-body-content').innerHTML = `
    <div class="detail-row">
      <div class="detail-item"><div class="detail-label">${t.lblName}</div><div class="detail-value">${esc(r.name)}</div></div>
      <div class="detail-item"><div class="detail-label">${t.lblDept}</div><div class="detail-value">${esc(r.department)}</div></div>
      <div class="detail-item"><div class="detail-label">${t.lblDate}</div><div class="detail-value">${date}</div></div>
      <div class="detail-item"><div class="detail-label">${t.lblUsage}</div><div class="detail-value">${t.usageLabels[r.usage]||r.usage}</div></div>
      <div class="detail-item"><div class="detail-label">${t.lblAvg}</div><div class="detail-value"><strong>${avg} / 5</strong></div></div>
      <div class="detail-item"><div class="detail-label">${t.lblLang}</div><div class="detail-value">${r.language==='ar'?t.langAr:t.langEn}</div></div>
    </div>
    <div class="rating-breakdown"><h4>${t.ratingBreakdown}</h4>${ratingsHtml}</div>
    ${r.problems?`<div style="margin-top:1rem;"><div class="detail-label" style="margin-bottom:0.3rem;">${t.lblProblems}</div><div style="font-size:0.88rem;color:var(--text-secondary);background:var(--bg);padding:0.75rem;border-radius:8px;">${esc(r.problems)}</div></div>`:''}
    ${r.suggestions?`<div style="margin-top:0.75rem;"><div class="detail-label" style="margin-bottom:0.3rem;">${t.lblSuggestions}</div><div style="font-size:0.88rem;color:var(--text-secondary);background:var(--bg);padding:0.75rem;border-radius:8px;">${esc(r.suggestions)}</div></div>`:''}
    <div style="margin-top:1.25rem;display:flex;gap:0.5rem;flex-wrap:wrap;">
      ${r.problems?`<button class="btn-xs" onclick="printNote('${r.id}','problems')"><i class="bi bi-printer"></i> ${t.printNote}</button>`:''}
      <button class="btn-xs" onclick="printFullReport('${r.id}')"><i class="bi bi-printer"></i> ${t.printFull}</button>
    </div>`;

  document.getElementById('detail-modal').classList.add('open');
}

function closeDetailModal() { document.getElementById('detail-modal').classList.remove('open'); }
function closeModal(e) { if(e.target===document.getElementById('detail-modal'))closeDetailModal(); }

/* ── PRINT NOTE ── */
function printNote(id, field) {
  const params = new URLSearchParams({id, field, lang: dashLang});
  window.open('print-note.html?'+params.toString(),'_blank');
}

/* ── PRINT FULL REPORT ── */
function printFullReport(id) {
  const params = new URLSearchParams({id, full:'1', lang: dashLang});
  window.open('print-note.html?'+params.toString(),'_blank');
}

/* ── PRINT ALL REPORT ── */
function openPrintReport() {
  const dept = document.getElementById('filter-dept').value;
  const params = new URLSearchParams({ lang: dashLang });
  if (dept) params.set('dept', dept);
  // Note: dates not passed to avoid format mismatch — user can filter in print page
  window.open('print-report.html?' + params.toString(), '_blank');
}

/* ── EXPORT CSV ── */
function exportCSV() {
  const t = DT[dashLang];
  if (!filteredResponses.length) { showToast(t.exportEmpty,'error'); return; }
  const headers = ['ID','Name','Department','Date','Language','Usage',
    ...t.qLabels.map(l=>`Score: ${l}`),
    'Avg Score','Problems','Suggestions',
    ...Q_META.map((_,i)=>`Note Q${i+1}`),
  ];
  const rows = filteredResponses.map(r=>[
    r.id, r.name, r.department,
    new Date(r.timestamp).toLocaleDateString('en-GB'),
    r.language==='ar'?'Arabic':'English',
    t.usageLabels[r.usage]||r.usage,
    ...Q_META.map(q=>r.ratings?.[q.key]??''),
    r.avgRating, r.problems||'', r.suggestions||'',
    ...Q_META.map(q=>r.notes?.['note_'+q.key]||''),
  ].map(v=>`"${String(v||'').replace(/"/g,'""')}"`));

  const csv=[headers.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`odoo_survey_${new Date().toISOString().slice(0,10)}.csv`; a.click();
  URL.revokeObjectURL(url);
  showToast(t.exportSuccess,'success');
}

/* ── DELETE RESPONSE ── */
function confirmDelete(id, name) {
  const t = DT[dashLang];
  const msg = dashLang === 'ar'
    ? `هل أنت متأكد من حذف رد "${name}"؟\nلا يمكن التراجع عن هذا الإجراء.`
    : `Are you sure you want to delete "${name}"'s response?\nThis cannot be undone.`;
  if (!confirm(msg)) return;
  deleteResponse(id, name);
}

async function deleteResponse(id, name) {
  const t = DT[dashLang];
  try {
    if (DASH_CONFIG.mode === 'firebase') {
      const db = getDB();
      await db.collection('survey_responses').doc(id).delete();
    } else {
      const all = JSON.parse(localStorage.getItem('odoo_survey_responses') || '[]');
      localStorage.setItem('odoo_survey_responses', JSON.stringify(all.filter(r => r.id !== id)));
    }
    // Remove from local state and re-render
    allResponses = allResponses.filter(r => r.id !== id);
    filteredResponses = filteredResponses.filter(r => r.id !== id);
    renderAll();
    populateFilters();
    showToast(
      dashLang === 'ar' ? `تم حذف رد "${name}" بنجاح ✓` : `"${name}"'s response deleted ✓`,
      'success'
    );
  } catch (err) {
    console.error('Delete error:', err);
    showToast(
      dashLang === 'ar' ? 'حدث خطأ أثناء الحذف' : 'Error deleting response',
      'error'
    );
  }
}

/* ── HELPERS ── */
function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
let toastTimer;
function showToast(msg,type='') {
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg; t.className='toast show '+type;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.className='toast',3500);
}

/* ── SEED DEMO DATA ── */
function seedDemoData() {
  const depts=['المحاسبة والمالية','المبيعات','المشتريات','المستودعات والمخازن','الإنتاج'];
  const names=['أحمد المطيري','سارة الغامدي','خالد بن صالح','نورة الحربي','فهد الدوسري','مريم الشهري','عمر القحطاني'];
  const usages=['daily','weekly','weekly','rarely','daily','daily','little'];
  const data=[];
  names.forEach((name,i)=>{
    const ratingsObj={};
    let sum=0;
    Q_META.forEach((q,qi)=>{
      const v=Math.floor(Math.random()*3)+3;
      ratingsObj[q.key]=v; sum+=v;
    });
    const avg=+(sum/Q_META.length).toFixed(2);
    const daysAgo=Math.floor(Math.random()*30);
    const ts=new Date(Date.now()-daysAgo*86400000).toISOString();
    const notesObj={};
    Q_META.forEach((q,qi)=>{
      if(qi===6) notesObj['note_'+q.key]='النظام يتوقف أحياناً عند استخراج التقارير الكبيرة.';
      else if(qi===0&&i%3===0) notesObj['note_'+q.key]='الواجهة مقبولة لكن تحتاج تبسيط أكثر.';
    });
    data.push({
      id:'resp_demo_'+i, timestamp:ts, language:'ar',
      name, department:depts[i%depts.length], usage:usages[i%usages.length],
      ratings:ratingsObj, avgRating:avg, notes:notesObj,
      problems:i%3===0?'بطء النظام عند استخراج التقارير الكبيرة في نهاية الشهر.':'',
      suggestions:i%2===0?'إضافة واجهة جوال وتحسين دعم اللغة العربية في التقارير.':'',
    });
  });
  localStorage.setItem('odoo_survey_responses',JSON.stringify(data));
}

/* ── AUTO INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  if(!localStorage.getItem('odoo_survey_responses')) seedDemoData();
  if(sessionStorage.getItem('dash_auth')){
    document.getElementById('dashboard-login').style.display='none';
    document.getElementById('dashboard-app').classList.add('active');
    init();
  }
});
