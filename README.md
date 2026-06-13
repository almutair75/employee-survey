# Odoo Usage Evaluation Survey
## استبيان تقييم استخدام نظام Odoo

A bilingual (Arabic/English) survey web app for internal Odoo system evaluation, with a management dashboard.

---

## ⚠️ Important Notice — Data Storage

> **GitHub Pages does NOT store data.** It only serves static HTML/CSS/JS files.
> 
> - **Demo Mode** uses `localStorage` (data lives in the browser only, not shared between users).
> - **Production Mode** requires connecting to Firebase Firestore or Supabase for real shared storage.

---

## 📁 Project Structure

```
odoo-survey/
├── index.html          # Survey (Language selection + Form + Thank you)
├── dashboard.html      # Management dashboard
├── print-note.html     # Employee note print page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Survey logic
│   └── dashboard.js    # Dashboard logic + charts
└── README.md
```

---

## 🚀 Running Locally

No build tools needed. Just open in a browser:

```bash
# Option 1: Simply open index.html in your browser
open index.html

# Option 2: Use a local server (recommended to avoid CORS issues)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## 🌐 Publishing on GitHub Pages

1. Create a new GitHub repository
2. Push all project files to the `main` branch
3. Go to **Repository → Settings → Pages**
4. Set source to `main` branch / `/ (root)`
5. Your site will be live at: `https://your-username.github.io/your-repo-name/`

```bash
git init
git add .
git commit -m "Initial commit: Odoo Survey"
git remote add origin https://github.com/YOUR-USERNAME/odoo-survey.git
git push -u origin main
```

---

## 🧪 Demo Mode

Demo Mode is active by default. It uses `localStorage` for storage.

- Survey responses are saved to `localStorage` key: `odoo_survey_responses`
- Dashboard reads from the same key
- **Data is browser-local — not shared between users or devices**
- A set of 7 sample responses is automatically seeded on first load

**Dashboard login (Demo):**
- URL: `dashboard.html`
- Password: `admin123`

To change the demo password, edit `js/dashboard.js`:
```javascript
const DASH_CONFIG = {
  demoPassword: 'admin123',  // ← change this
  mode: 'demo',
};
```

---

## 🔥 Connecting Firebase Firestore

### 1. Create Firebase project

Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project.

### 2. Add Firestore Database

Enable Firestore in **Native mode**.

### 3. Install Firebase SDK (CDN)

Add to `index.html` and `dashboard.html` before the closing `</body>`:

```html
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";

  const app = initializeApp({
    apiKey:            "FIREBASE_API_KEY_HERE",
    authDomain:        "FIREBASE_AUTH_DOMAIN_HERE",
    projectId:         "FIREBASE_PROJECT_ID_HERE",
    storageBucket:     "FIREBASE_STORAGE_BUCKET_HERE",
    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID_HERE",
    appId:             "FIREBASE_APP_ID_HERE",
  });

  window.db = getFirestore(app);
  window.firestoreAdd = addDoc;
  window.firestoreCollection = collection;
</script>
```

### 4. Update `js/app.js`

In the `Storage.save()` function, replace the Firebase block:

```javascript
if (CONFIG.mode === 'firebase') {
  await addDoc(collection(window.db, CONFIG.firebase.collection), data);
  return { success: true };
}
```

Set mode in `CONFIG`:
```javascript
const CONFIG = {
  mode: 'firebase',
  firebase: {
    collection: 'survey_responses',
    // ... your Firebase config
  }
};
```

### Required Firestore Collection

**Collection:** `survey_responses`

Each document contains:
```json
{
  "id":          "resp_1234567890",
  "timestamp":   "2024-01-15T10:30:00.000Z",
  "language":    "ar",
  "name":        "Ahmed Al-Mutairi",
  "department":  "Sales",
  "usage":       "daily",
  "ratings": {
    "q0": 4, "q1": 3, "q2": 5, "q3": 4,
    "q4": 3, "q5": 4, "q6": 2, "q7": 4
  },
  "avgRating":   3.62,
  "problems":    "System slowness during reports",
  "positives":   "Good inventory tracking",
  "suggestions": "Better mobile support",
  "extra":       ""
}
```

**Firestore Rules (development):**
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /survey_responses/{doc} {
      allow read: if request.auth != null;
      allow write: if true;  // restrict in production
    }
  }
}
```

---

## 🟢 Connecting Supabase

### 1. Create Supabase project

Go to [app.supabase.com](https://app.supabase.com) and create a project.

### 2. Create the table

Run in the **SQL Editor**:

```sql
CREATE TABLE survey_responses (
  id              TEXT PRIMARY KEY,
  timestamp       TIMESTAMPTZ DEFAULT now(),
  language        TEXT,
  name            TEXT NOT NULL,
  department      TEXT,
  usage           TEXT,
  ratings         JSONB,
  avg_rating      NUMERIC(4,2),
  problems        TEXT,
  positives       TEXT,
  suggestions     TEXT,
  extra           TEXT
);
```

### 3. Add Supabase SDK

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script>
  window._supabase = supabase.createClient(
    'SUPABASE_URL_HERE',
    'SUPABASE_ANON_KEY_HERE'
  );
</script>
```

### 4. Update `js/app.js`

```javascript
if (CONFIG.mode === 'supabase') {
  const { error } = await window._supabase
    .from('survey_responses')
    .insert([{ ...data, avg_rating: data.avgRating }]);
  if (error) throw error;
  return { success: true };
}
```

Set mode:
```javascript
const CONFIG = { mode: 'supabase', ... };
```

---

## 🔐 Authentication (Production)

Current dashboard login is **demo-only** (client-side password check).

For production:
- **Firebase**: Use `firebase/auth` with email/password or Google SSO
- **Supabase**: Use `supabase.auth.signInWithPassword()` with RLS policies

---

## 📊 Features

- ✅ Bilingual Arabic/English with RTL/LTR switching
- ✅ Language preserved during language toggle
- ✅ Progress indicator
- ✅ Form validation
- ✅ Rating system (1–5) with color indicators
- ✅ Management dashboard with Bar + Doughnut charts
- ✅ Filter by department, date, rating, employee name
- ✅ Response detail modal
- ✅ Comments viewer with tabs
- ✅ Print individual notes
- ✅ Export to CSV
- ✅ Demo data seeding
- ✅ Mobile responsive

---

## 🛠 Tech Stack

- HTML5, CSS3, Vanilla JavaScript (no framework)
- [Chart.js](https://www.chartjs.org/) for charts
- [Bootstrap Icons](https://icons.getbootstrap.com/) for icons
- [Google Fonts](https://fonts.google.com/) — Cairo + Inter
- Storage: localStorage (demo) → Firebase/Supabase (production)

---

*Odoo Usage Evaluation Survey · Built for internal HR & IT assessment*
