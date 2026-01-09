# 🎓 EduDisha – A Smart Academic & Skill Exchange Platform for GTU Students

EduDisha is a centralized EdTech web platform designed specifically for **GTU engineering students**.  
It simplifies academic organization, improves access to scholarships, and enables **peer-to-peer skill exchange without money**, powered by **Google technologies**.

---

## 🚀 Problem Statement

GTU students currently face:
- Scattered academic resources across multiple platforms
- Poor visibility of scholarship opportunities
- No structured way to exchange skills peer-to-peer
- Heavy dependency on paid courses and external platforms

Existing solutions solve **parts** of the problem, but **no single platform addresses all of them together**, especially in a GTU-specific context.

---

## 💡 Our Solution – EduDisha

EduDisha brings everything under **one intelligent dashboard**:
1. Academic organization
2. Scholarship discovery
3. Skill exchange via Google Meet

All tailored specifically for **GTU students**.

---

## ✨ Core Features

### 📚 Academic Organization
- Subject-wise notes and resources
- Exam schedule & deadline tracking
- Syllabus progress tracker
- Study planner dashboard

### 🎓 Scholarship Hub
- Centralized list of **GTU & Government scholarships**
- Direct links to official application forms
- Eligibility guidance (basic)

### 🔁 Skill Exchange (No Money)
- Teach what you know
- Learn what you need
- Peer-to-peer skill matching
- Live sessions conducted via **Google Meet**

---

## 🧠 Skill Exchange Flow

1. Student logs in using Google (Firebase Auth)
2. Student fills a short skill form:
   - Skills they can teach
   - Skills they want to learn
3. Platform verifies teaching eligibility (basic checks)
4. Matching happens between peers
5. Learning session conducted on **Google Meet**

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS

### Backend & Cloud (Google Technologies)
- **Firebase Authentication** (Google Sign-In)
- **Firestore Database**
- **Firebase Hosting**
- **Google Meet** (for live skill exchange)
- **Google Calendar API** (future scope)

---

## 🏗️ Technical Architecture

User
└── Google Login (Firebase Auth)
└── User Profile (Firestore)
├── Academic Dashboard
├── Scholarship Links
└── Skill Exchange Module
└── Google Meet Sessions

---

## 🧪 MVP Scope

✔ Google Login  
✔ Skill preference onboarding form  
✔ Academic dashboard (basic)  
✔ Scholarship links page  
✔ Skill exchange using Google Meet  

---

## 🌍 Impact

- Reduces academic stress through better organization
- Improves awareness of scholarships
- Promotes collaborative learning culture
- Makes skill learning accessible without financial barriers

---

## 🔮 Future Scope

- AI-based skill matching
- Google Calendar integration for sessions & exams
- Rating & feedback system for skill exchange
- GTU syllabus-aware smart planner
- Admin dashboard for moderation

---

## 🧑‍💻 Team

Built with ❤️ by students for students  
GDG Hackfest Project – **EduDisha**

---

## 📌 Note

This project is currently an MVP developed for hackathon purposes.  
All data used is either demo or sourced from official public portals.

---
