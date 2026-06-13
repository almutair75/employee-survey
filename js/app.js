/* =============================================
   ODOO EVALUATION SURVEY - app.js v2
   ============================================= */

const CONFIG = {
  mode: 'demo',
  firebase: {
    apiKey: 'FIREBASE_API_KEY_HERE',
    authDomain: 'FIREBASE_AUTH_DOMAIN_HERE',
    projectId: 'FIREBASE_PROJECT_ID_HERE',
    collection: 'survey_responses',
  },
  supabase: {
    url: 'SUPABASE_URL_HERE',
    anonKey: 'SUPABASE_ANON_KEY_HERE',
    table: 'survey_responses',
  },
};

/* ── RATING QUESTIONS CONFIG ─────────────────────────────────
   Each question has:
   - key: unique id
   - scaleType: 'standard' | 'problem' | 'knowledge' | 'yesno' | 'development' | 'alternative'
   - noteField: key for the note textarea
   ──────────────────────────────────────────────────────────── */
const RATING_QUESTIONS = [
  {
    key: 'q0',
    scaleType: 'standard',
    noteField: 'note_q0',
  },
  {
    key: 'q1',
    scaleType: 'standard',
    noteField: 'note_q1',
  },
  {
    key: 'q2',
    scaleType: 'standard',
    noteField: 'note_q2',
  },
  {
    key: 'q3',
    scaleType: 'standard',
    noteField: 'note_q3',
  },
  {
    key: 'q4',
    scaleType: 'standard',
    noteField: 'note_q4',
  },
  {
    key: 'q5',
    scaleType: 'standard',
    noteField: 'note_q5',
  },
  {
    key: 'q6',
    scaleType: 'problem',   // reversed: 1=كثيرة جداً, 5=لا توجد
    noteField: 'note_q6',
    hasProblemsBox: true,   // shows extra textarea for "أذكر المشكلة"
  },
  {
    key: 'q7',
    scaleType: 'standard',
    noteField: 'note_q7',
  },
  {
    key: 'q8',
    scaleType: 'knowledge', // 1=مبتدئ, 5=خبير
    noteField: 'note_q8',
  },
  {
    key: 'q9',
    scaleType: 'success',   // 1=فاشل, 5=ناجح جداً
    noteField: 'note_q9',
  },
  {
    key: 'q10',
    scaleType: 'development', // 1=لا يحتاج, 5=يحتاج تطوير جذري
    noteField: 'note_q10',
  },
  {
    key: 'q11',
    scaleType: 'alternative', // 1=لا داعي, 5=ضرورة قصوى
    noteField: 'note_q11',
  },
];

/* ── TRANSLATIONS ──────────────────────────── */
const T = {
  ar: {
    hdrTitle: 'استبيان تقييم نظام Odoo',
    hdrSub: 'تقييم تجربة الموظفين',
    langToggle: 'English',
    progressLabel: 'تقدم التعبئة',
    introTitle: 'مرحباً بك في استبيان تقييم نظام Odoo',
    introDesc: 'يهدف هذا الاستبيان إلى تقييم تجربتك مع نظام Odoo وتحديد فرص التحسين. تستغرق التعبئة حوالي 7 دقائق.',
    c1Title: 'معلومات الموظف', c1Sub: 'البيانات الأساسية',
    c2Title: 'مستوى الاستخدام', c2Sub: 'كم مرة تستخدم نظام Odoo؟',
    c3Title: 'أسئلة التقييم', c3Sub: 'قيّم كل جانب حسب مقياس التقييم المحدد لكل سؤال',
    c4Title: 'اقتراحات عامة', c4Sub: 'شاركنا اقتراحاتك لتحسين النظام',
    lblName: 'اسم الموظف', lblDept: 'القسم / الإدارة',
    deptPlaceholder: '-- اختر القسم --',
    depts: ['المحاسبة والمالية','المبيعات','المشتريات','المستودعات والمخازن','الإنتاج','خدمة العملاء','الموارد البشرية','تقنية المعلومات','الإدارة العليا','أخرى'],
    lblUsage: 'مدى استخدامك لنظام Odoo',
    uDaily: 'يومياً', uWeekly: 'عدة مرات في الأسبوع', uRarely: 'نادراً', uLittle: 'لا أستخدمه كثيراً',
    lblSuggestions: 'اقتراحاتك لتحسين النظام',
    hintSuggestions: '— اختياري —',
    submitLabel: 'إرسال الاستبيان',
    submitNote: 'بإرسال هذا الاستبيان، تؤكد أن إجاباتك صحيحة وصادقة.',
    noteLabel: 'ملاحظة إضافية على هذا السؤال',
    noteHint: '— اختياري —',
    problemsBoxLabel: 'اذكر أبرز المشكلة أو الخطأ الذي تواجهه',
    problemsBoxHint: '— اختياري ولكن مفضل —',
    errName: 'يرجى إدخال اسمك الكامل',
    errDept: 'يرجى اختيار القسم',
    errUsage: 'يرجى تحديد مستوى الاستخدام',
    errRating: 'يرجى تقييم جميع الأسئلة',
    successMsg: 'تم إرسال الاستبيان بنجاح! ✓',
    errSubmit: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مجدداً.',
    tyTitle: 'شكراً لمشاركتك!',
    tyDesc1: 'تم استلام ردودك بنجاح.',
    tyDesc2: 'ستُستخدم إجاباتك لتحسين تجربة استخدام نظام Odoo داخل الشركة.',
    tyDesc3: 'يمكنك إغلاق هذه الصفحة الآن.',
    tyNewLabel: 'تعبئة استبيان جديد',
    ratingQLabels: [
      'سهولة استخدام نظام Odoo',
      'وضوح الشاشات والقوائم',
      'سرعة النظام أثناء العمل',
      'دقة البيانات والمعلومات في النظام',
      'سهولة الوصول للطلبات أو المنتجات أو التقارير',
      'مدى توافق النظام مع طريقة عملك اليومية',
      'مستوى المشاكل أو الأخطاء التي تواجهك أثناء الاستخدام',
      'مدى رضاك العام عن نظام Odoo',
      'مدى إلمامك ومعرفتك بنظام Odoo',
      'هل تعتقد أن نظام Odoo ناجح في الشركة؟',
      'هل النظام يحتاج إلى تطوير وتحسين؟',
      'هل تري ضرورة البحث عن نظام بديل؟',
    ],
    ratingHints: [
      '1 = صعب الاستخدام جداً  •  5 = سهل جداً ومريح',
      '1 = الشاشات غير واضحة ومربكة  •  5 = واضحة جداً وسهلة الفهم',
      '1 = بطيء جداً ويعطل العمل  •  5 = سريع جداً ولا توجد تأخيرات',
      '1 = بيانات غير دقيقة وكثيرة الأخطاء  •  5 = دقيقة جداً ويمكن الاعتماد عليها',
      '1 = صعب الوصول ويستغرق وقتاً طويلاً  •  5 = وصول سريع وسهل لكل شيء',
      '1 = لا يتوافق مع طريقة عملي إطلاقاً  •  5 = يتوافق تماماً مع احتياجاتي اليومية',
      '1 = أواجه مشاكل وأخطاء كثيرة جداً  •  5 = لا أواجه مشاكل تقريباً',
      '1 = غير راضٍ إطلاقاً  •  5 = راضٍ تماماً عن النظام',
      '1 = مبتدئ — لا أعرف كيف أستخدمه  •  5 = خبير — أتقن استخدامه بالكامل',
      '1 = فاشل تماماً ولا يلبي الاحتياجات  •  5 = ناجح جداً ويحقق الأهداف',
      '1 = لا يحتاج تطوير على الإطلاق  •  5 = يحتاج تطوير جذري وشامل',
      '1 = لا داعي للبديل — النظام ممتاز  •  5 = ضرورة قصوى للبحث عن بديل',
    ],
    scaleLabels: {
      standard:    { 1:'ضعيف جداً', 2:'ضعيف', 3:'متوسط', 4:'جيد', 5:'ممتاز' },
      problem:     { 1:'كثيرة جداً', 2:'كثيرة', 3:'متوسطة', 4:'قليلة', 5:'لا توجد' },
      knowledge:   { 1:'مبتدئ', 2:'أساسي', 3:'متوسط', 4:'جيد', 5:'خبير' },
      success:     { 1:'فاشل', 2:'ضعيف', 3:'مقبول', 4:'جيد', 5:'ناجح جداً' },
      development: { 1:'لا يحتاج', 2:'تطوير بسيط', 3:'تطوير متوسط', 4:'تطوير كبير', 5:'تطوير جذري' },
      alternative: { 1:'لا داعي', 2:'ربما', 3:'محايد', 4:'يُنصح به', 5:'ضرورة قصوى' },
    },
  },

  en: {
    hdrTitle: 'Odoo Usage Evaluation Survey',
    hdrSub: 'Employee Experience Assessment',
    langToggle: 'العربية',
    progressLabel: 'Completion Progress',
    introTitle: 'Welcome to the Odoo Evaluation Survey',
    introDesc: 'This survey evaluates your experience with Odoo and identifies improvement opportunities. It takes about 7 minutes.',
    c1Title: 'Employee Information', c1Sub: 'Basic details',
    c2Title: 'Usage Level', c2Sub: 'How often do you use Odoo?',
    c3Title: 'Rating Questions', c3Sub: 'Rate each aspect according to its specific scale',
    c4Title: 'General Suggestions', c4Sub: 'Share your suggestions to improve the system',
    lblName: 'Employee Name', lblDept: 'Department',
    deptPlaceholder: '-- Select Department --',
    depts: ['Accounting & Finance','Sales','Purchasing','Warehouse & Inventory','Production','Customer Service','Human Resources','Information Technology','Senior Management','Other'],
    lblUsage: 'How often do you use Odoo',
    uDaily: 'Daily', uWeekly: 'Several times a week', uRarely: 'Rarely', uLittle: "Don't use it much",
    lblSuggestions: 'Your suggestions to improve the system',
    hintSuggestions: '— Optional —',
    submitLabel: 'Submit Survey',
    submitNote: 'By submitting, you confirm your answers are accurate and honest.',
    noteLabel: 'Additional note on this question',
    noteHint: '— Optional —',
    problemsBoxLabel: 'Describe the main problem or error you face',
    problemsBoxHint: '— Optional but preferred —',
    errName: 'Please enter your full name',
    errDept: 'Please select your department',
    errUsage: 'Please select your usage level',
    errRating: 'Please rate all questions',
    successMsg: 'Survey submitted successfully! ✓',
    errSubmit: 'An error occurred. Please try again.',
    tyTitle: 'Thank you for your participation!',
    tyDesc1: 'Your responses have been received successfully.',
    tyDesc2: 'Your feedback will be used to improve Odoo within the company.',
    tyDesc3: 'You may close this page now.',
    tyNewLabel: 'Fill a new survey',
    ratingQLabels: [
      'Ease of use of Odoo',
      'Clarity of screens and menus',
      'System speed during work',
      'Accuracy of data and information',
      'Ease of accessing orders, products, or reports',
      'Alignment of the system with your daily workflow',
      'Level of problems or errors you encounter',
      'Your overall satisfaction with Odoo',
      'Your familiarity and knowledge of Odoo',
      'Do you think Odoo is successful in the company?',
      'Does the system need development and improvement?',
      'Do you see a need to look for an alternative system?',
    ],
    ratingHints: [
      '1 = Very hard to use  •  5 = Very easy and comfortable',
      '1 = Screens are unclear and confusing  •  5 = Very clear and easy to understand',
      '1 = Very slow, disrupts work  •  5 = Very fast, no delays',
      '1 = Inaccurate data, many errors  •  5 = Very accurate and reliable',
      '1 = Hard to access, takes too long  •  5 = Fast and easy access to everything',
      '1 = Does not fit my workflow at all  •  5 = Perfectly fits my daily needs',
      '1 = I face many problems and errors  •  5 = Almost no problems at all',
      '1 = Not satisfied at all  •  5 = Completely satisfied',
      '1 = Beginner — don\'t know how to use it  •  5 = Expert — fully proficient',
      '1 = Complete failure, does not meet needs  •  5 = Very successful, achieves all goals',
      '1 = No development needed at all  •  5 = Radical and comprehensive development needed',
      '1 = No need for alternative — system is excellent  •  5 = Critical need to find alternative',
    ],
    scaleLabels: {
      standard:    { 1:'Very Poor', 2:'Poor', 3:'Average', 4:'Good', 5:'Excellent' },
      problem:     { 1:'Very Many', 2:'Many', 3:'Moderate', 4:'Few', 5:'None' },
      knowledge:   { 1:'Beginner', 2:'Basic', 3:'Intermediate', 4:'Good', 5:'Expert' },
      success:     { 1:'Failure', 2:'Poor', 3:'Acceptable', 4:'Good', 5:'Very Successful' },
      development: { 1:'Not Needed', 2:'Minor', 3:'Moderate', 4:'Major', 5:'Radical' },
      alternative: { 1:'Not Needed', 2:'Maybe', 3:'Neutral', 4:'Recommended', 5:'Critical' },
    },
  },
};

/* ── STATE ─────────────────────────── */
let currentLang = 'ar';
let ratings = {};
let notes = {};      // note_q0, note_q1, ...
let problemsText = '';

/* ── STORAGE ───────────────────────── */
const Storage = {
  async save(data) {
    if (CONFIG.mode === 'demo') {
      const all = JSON.parse(localStorage.getItem('odoo_survey_responses') || '[]');
      all.push(data);
      localStorage.setItem('odoo_survey_responses', JSON.stringify(all));
      return { success: true };
    }
    return { success: false, error: 'Not configured' };
  },
};

/* ── LANGUAGE ──────────────────────── */
function selectLanguage(lang) {
  currentLang = lang;
  document.getElementById('page-lang').style.display = 'none';
  document.getElementById('page-survey').style.display = 'block';
  applyLanguage(lang);
  buildRatingQuestions();
  updateProgress();
}

function toggleLanguage() {
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  currentLang = newLang;
  applyLanguage(newLang);
  buildRatingQuestions();
  restoreRatings();
}

function applyLanguage(lang) {
  const t = T[lang];
  document.body.className = lang === 'ar' ? 'lang-ar' : 'lang-en';
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);

  const map = {
    'hdr-title': t.hdrTitle, 'hdr-sub': t.hdrSub,
    'lang-toggle-label': t.langToggle, 'progress-label': t.progressLabel,
    'intro-title': t.introTitle, 'intro-desc': t.introDesc,
    'c1-title': t.c1Title, 'c1-sub': t.c1Sub,
    'c2-title': t.c2Title, 'c2-sub': t.c2Sub,
    'c3-title': t.c3Title, 'c3-sub': t.c3Sub,
    'c4-title': t.c4Title, 'c4-sub': t.c4Sub,
    'hint-suggestions': t.hintSuggestions,
    'submit-label': t.submitLabel, 'submit-note': t.submitNote,
    'ty-title': t.tyTitle, 'ty-desc1': t.tyDesc1,
    'ty-desc2': t.tyDesc2, 'ty-desc3': t.tyDesc3,
    'ty-new-label': t.tyNewLabel,
    'u-daily-lbl': t.uDaily, 'u-weekly-lbl': t.uWeekly,
    'u-rarely-lbl': t.uRarely, 'u-little-lbl': t.uLittle,
  };
  Object.entries(map).forEach(([id, val]) => setTxt(id, val));

  // Labels with required star
  setHtml('lbl-name', t.lblName + ' <span class="required-star">*</span>');
  setHtml('lbl-dept', t.lblDept + ' <span class="required-star">*</span>');
  setHtml('lbl-usage', t.lblUsage + ' <span class="required-star">*</span>');
  setHtml('lbl-suggestions', t.lblSuggestions);

  // Department options
  const deptEl = document.getElementById('f-dept');
  if (deptEl) {
    const cur = deptEl.value;
    deptEl.options[0].text = t.deptPlaceholder;
    t.depts.forEach((d, i) => {
      if (deptEl.options[i + 1]) { deptEl.options[i + 1].text = d; deptEl.options[i + 1].value = d; }
    });
    deptEl.value = cur;
  }

  document.title = lang === 'ar' ? 'استبيان تقييم نظام Odoo' : 'Odoo Usage Evaluation Survey';
}

function setTxt(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }
function setHtml(id, v) { const e = document.getElementById(id); if (e) e.innerHTML = v; }

/* ── BUILD RATING QUESTIONS ────────── */
function buildRatingQuestions() {
  const t = T[currentLang];
  const container = document.getElementById('rating-questions-container');
  if (!container) return;
  container.innerHTML = '';

  RATING_QUESTIONS.forEach((q, i) => {
    const label = t.ratingQLabels[i];
    const hint = t.ratingHints[i];
    const scaleLabels = t.scaleLabels[q.scaleType];
    const currentVal = ratings[q.key];

    const div = document.createElement('div');
    div.className = 'rating-question';
    div.innerHTML = `
      <div class="rating-q-header">
        <span class="rating-q-number">${i + 1}</span>
        <div style="flex:1;">
          <div class="rating-q-text">${label} <span class="required-star">*</span></div>
          <div class="rating-hint-text">${hint}</div>
        </div>
        <span class="rating-value-badge" id="rbadge-${q.key}">—</span>
      </div>
      <div class="rating-stars" id="rstar-${q.key}">
        ${[1,2,3,4,5].map(v => `
          <button type="button" class="star-btn${currentVal === v ? ' active' : ''}"
                  data-q="${q.key}" data-val="${v}" data-type="${q.scaleType}"
                  onclick="setRating('${q.key}','${q.scaleType}',${v})">
            <span class="star-num">${v}</span>
            <span class="star-lbl">${scaleLabels[v]}</span>
          </button>`).join('')}
      </div>
      ${q.hasProblemsBox ? `
        <div class="problems-box">
          <label class="problems-box-label">${t.problemsBoxLabel}</label>
          <span class="field-hint">${t.problemsBoxHint}</span>
          <textarea id="f-problems" class="form-textarea" rows="2"
            oninput="problemsText=this.value">${problemsText}</textarea>
        </div>` : ''}
      <div class="note-box">
        <label class="note-box-label">${t.noteLabel} <span class="field-hint-inline">${t.noteHint}</span></label>
        <textarea class="form-textarea note-textarea" rows="2" data-note="${q.noteField}"
          oninput="notes['${q.noteField}']=this.value">${notes[q.noteField] || ''}</textarea>
      </div>
    `;
    container.appendChild(div);

    if (currentVal) updateBadge(q.key, q.scaleType, currentVal);
  });
}

/* ── RATINGS ───────────────────────── */
function setRating(qKey, scaleType, val) {
  ratings[qKey] = val;
  document.querySelectorAll(`#rstar-${qKey} .star-btn`).forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
  });
  updateBadge(qKey, scaleType, val);
  updateProgress();
}

function updateBadge(qKey, scaleType, val) {
  const t = T[currentLang];
  const badge = document.getElementById(`rbadge-${qKey}`);
  if (badge && val) badge.textContent = `${val}/5 — ${t.scaleLabels[scaleType][val]}`;
}

function restoreRatings() {
  RATING_QUESTIONS.forEach(q => {
    if (ratings[q.key]) setRating(q.key, q.scaleType, ratings[q.key]);
  });
}

/* ── PROGRESS ──────────────────────── */
function updateProgress() {
  const total = 3 + RATING_QUESTIONS.length;
  let filled = 0;
  if (document.getElementById('f-name')?.value.trim()) filled++;
  if (document.getElementById('f-dept')?.value) filled++;
  if (document.querySelector('input[name="usage"]:checked')) filled++;
  filled += Object.keys(ratings).length;
  const pct = Math.min(100, Math.round((filled / total) * 100));
  const fill = document.getElementById('progress-fill');
  const pctEl = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

/* ── VALIDATION ────────────────────── */
function validate() {
  const t = T[currentLang];
  let valid = true;
  clearErrors();

  const name = document.getElementById('f-name');
  if (!name.value.trim()) { showError('f-name','err-name',t.errName); valid=false; }

  const dept = document.getElementById('f-dept');
  if (!dept.value) { showError('f-dept','err-dept',t.errDept); valid=false; }

  if (!document.querySelector('input[name="usage"]:checked')) {
    const e = document.getElementById('err-usage');
    if (e) { e.textContent = t.errUsage; e.classList.add('show'); }
    valid = false;
  }

  if (Object.keys(ratings).length < RATING_QUESTIONS.length) {
    showToast(t.errRating, 'error'); valid = false;
  }

  return valid;
}

function showError(fId, eId, msg) {
  document.getElementById(fId)?.classList.add('invalid');
  const e = document.getElementById(eId);
  if (e) { e.textContent = msg; e.classList.add('show'); }
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(e => { e.textContent=''; e.classList.remove('show'); });
  document.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(e => e.classList.remove('invalid'));
}

/* ── SUBMIT ────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('survey-form');
  if (!form) return;
  form.addEventListener('input', updateProgress);
  form.addEventListener('change', updateProgress);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const btn = document.getElementById('btn-submit');
    btn.disabled = true;
    btn.innerHTML = `<i class="bi bi-hourglass-split"></i> <span>${currentLang==='ar'?'جاري الإرسال...':'Submitting...'}</span>`;

    const deptEl = document.getElementById('f-dept');
    // Collect all note textareas
    const collectedNotes = {};
    document.querySelectorAll('.note-textarea').forEach(ta => {
      collectedNotes[ta.dataset.note] = ta.value.trim();
    });

    const payload = {
      id: 'resp_' + Date.now(),
      timestamp: new Date().toISOString(),
      language: currentLang,
      name: document.getElementById('f-name').value.trim(),
      department: deptEl.options[deptEl.selectedIndex].text,
      usage: document.querySelector('input[name="usage"]:checked')?.value || '',
      ratings: { ...ratings },
      avgRating: calcAvg(ratings),
      notes: collectedNotes,
      problems: document.getElementById('f-problems')?.value.trim() || '',
      suggestions: document.getElementById('f-suggestions')?.value.trim() || '',
    };

    try {
      const result = await Storage.save(payload);
      if (result.success !== false) {
        showThankyou();
      } else throw new Error(result.error);
    } catch (err) {
      console.error(err);
      showToast(T[currentLang].errSubmit, 'error');
      btn.disabled = false;
      btn.innerHTML = `<i class="bi bi-send"></i> <span>${T[currentLang].submitLabel}</span>`;
    }
  });
});

function calcAvg(r) {
  const vals = Object.values(r);
  if (!vals.length) return 0;
  return +(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2);
}

function showThankyou() {
  document.getElementById('page-survey').style.display = 'none';
  document.getElementById('page-thankyou').style.display = 'flex';
  window.scrollTo(0,0);
}

function resetSurvey() {
  ratings = {}; notes = {}; problemsText = '';
  document.getElementById('survey-form')?.reset();
  clearErrors();
  document.getElementById('page-thankyou').style.display = 'none';
  document.getElementById('page-lang').style.display = 'flex';
}

let toastTimeout;
function showToast(msg, type='') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(()=>t.className='toast', 3500);
}
