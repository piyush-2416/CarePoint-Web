<div align="center">

# 🩺 CarePoint

### Your Health, Our Priority

*Doctors, medicines, emergency help, government schemes aur AI-powered safety tools — sab kuch ek jagah.*

![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?logo=google&logoColor=white)
![Auth](https://img.shields.io/badge/Auth-Secure%20Login-success)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

## 📸 Screenshots

> `screenshots/` folder bana kar apne screenshots yahan add karo.

| Home Page | Sidebar |
|-----------|---------|
| ![Home](screenshots/home.png) | ![Sidebar](screenshots/sidebar.png) |

---

## 📖 About

**CarePoint** ek healthcare web application hai jo logon ko ek hi platform par zaroori health services deti hai: doctors dhundna, medicines order karna, appointments book karna, emergency me turant madad lena, aur sarkari health schemes ki jaankari paana. **Google Gemini AI** ki madad se app situation ko analyze karke safety suggestions aur emergency plans bhi deta hai.

---

## ✨ Features

### 🧭 Main Menu
| Feature | Description |
|---------|-------------|
| 👨‍⚕️ **Doctors** | Best doctors dhundo, unki details dekho |
| 💊 **Medicines** | Dawaiyan online search aur order karo |
| 🚨 **Emergency** | Ambulance aur turant madad, 24x7 |
| 📅 **Appointments** | Doctor ke saath appointment book aur manage karo |
| 🏛️ **Govt. Schemes** | Sarkari health schemes ki jaankari |
| ℹ️ **About Us** | CarePoint ke baare me |

### 🤖 AI Features (Powered by Gemini)
- **🛡️ AI Safety Checker** — Abhi ki situation describe karo, AI batayega kitna risk hai aur kya karna chahiye.
- **🧭 AI Safety Planner** — Emergency ke liye pehle se personalized safety plan banao.

### 🧰 Personal Tools
- 📁 **My Documents** — Medical reports aur zaroori documents ek jagah
- 👥 **Emergency Contacts** — Apne trusted logon ko save karo
- 💬 **Help & Support** — Sawal ya problem ke liye support
- 😀 **Your Health-Tips** — Daily health tips
- 👤 **My Profile** — Apni profile aur settings manage karo

---

## 🚨 Emergency System

Emergency CarePoint ka sabse important part hai:

- Home page par hamesha visible **Emergency Services** banner
- One-tap **Call 112** button
- Ambulance aur turant madad ke liye quick access
- **Emergency Contacts** — saved logon ko jaldi contact karo
- **AI Safety Checker** se emergency situation ka quick assessment

> ⚠️ **Disclaimer:** CarePoint ke AI suggestions sirf guidance ke liye hain, professional medical advice ka replacement nahi. Serious emergency me turant **112** par call karo ya nearest hospital jao.

---

## 🔐 Authentication

- Secure **Sign Up / Login** system
- Protected routes (sirf logged-in users ke liye): Profile, Documents, Emergency Contacts, Appointments
- Session / token based user management
- Har user ka data (documents, contacts) private rehta hai

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Vite |
| **Styling** | CSS / Tailwind CSS *(jo use kiya ho rakho)* |
| **AI** | Google Gemini API |
| **Authentication** | *(Firebase Auth / JWT — jo use kiya ho likho)* |
| **Backend / Database** | *(Node.js + Express + MongoDB / Firebase — jo use kiya ho likho)* |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 ya usse upar
- npm ya yarn
- [Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Repository clone karo
git clone https://github.com/<your-username>/carepoint.git

# 2. Folder me jao
cd carepoint

# 3. Dependencies install karo
npm install

# 4. Environment file banao
cp .env.example .env

# 5. Development server start karo
npm run dev
```

App yahan khulega: **http://localhost:5173**

### Environment Variables

Root folder me `.env` file banao:

```env
# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Authentication (apne setup ke hisaab se badlo)
VITE_AUTH_API_URL=your_auth_api_url
# JWT_SECRET=your_jwt_secret        (backend)
# MONGODB_URI=your_database_uri     (backend)
```

> 🔒 `.env` file ko **kabhi GitHub par push mat karo**. `.gitignore` me `.env` add karna na bhoolo.

---

## 📂 Project Structure

```
carepoint/
├── public/
├── src/
│   ├── assets/
│   ├── components/      # Sidebar, Navbar, Cards, etc.
│   ├── pages/           # Home, Doctors, Medicines, Emergency...
│   ├── services/        # Gemini API aur auth logic
│   ├── context/         # Auth context
│   ├── App.jsx
│   └── main.jsx
├── screenshots/
├── .env.example
├── package.json
└── README.md
```

> Apne actual folder structure ke hisaab se update kar lena.

---

## 🗺️ Roadmap

- [x] Home page aur sidebar navigation
- [x] Emergency services section
- [x] AI Safety Checker & Planner (Gemini)
- [x] User authentication
- [ ] Online payment for medicines
- [ ] Live ambulance tracking
- [ ] Multi-language support (Hindi / English)
- [ ] Mobile app version

---

## 🤝 Contributing

Contributions welcome hain!

1. Repo ko **Fork** karo
2. Nayi branch banao: `git checkout -b feature/amazing-feature`
3. Changes commit karo: `git commit -m "Add amazing feature"`
4. Branch push karo: `git push origin feature/amazing-feature`
5. **Pull Request** open karo

---

## 📄 License

Ye project **MIT License** ke under hai. Details ke liye [LICENSE](LICENSE) file dekho.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-profile](https://linkedin.com/in/your-profile)

---

<div align="center">

⭐ Agar project pasand aaya to **star** zaroor do! ⭐

*Made with ❤️ for a healthier, safer India*

</div>
