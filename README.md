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

### 🤖 AI-Powered Assistant
- **Floating AI Chat Interface**: Always-accessible AI assistant powered by Gemini API
- **Smart Responses**: Context-aware help for academic queries, study tips, and platform navigation
- **Real-time Animations**: Smooth floating animations and neural network background patterns

### 🌐 Multilingual Support
- **Google Translate Integration**: Real-time translation between English, Hindi, and Gujarati
- **Floating Translation Widget**: Quick access translation tool available on all pages
- **Chat Translation**: Automatic translation in skill exchange conversations

### 📚 Academic Organization
- Subject-wise notes and resources
- Exam schedule & deadline tracking
- Syllabus progress tracker
- Study planner dashboard

### 🎓 Scholarship Hub
- Centralized list of **GTU & Government scholarships**
- Direct links to official application forms
- Eligibility guidance (basic)

### 🔁 Enhanced Skill Exchange (No Money)
- **Peer-to-Peer Chat System**: Real-time messaging with translation support
- **Personality-Based Matching**: Advanced onboarding questionnaire for better skill matching
- **Live Sessions**: Google Meet integration for skill exchange sessions
- **Comprehensive Onboarding**: 6-step questionnaire covering personality, interests, learning style, and goals

### 📊 Smart Dashboard
- **Personalized Analytics**: Study progress tracking and motivation cards
- **Daily Tasks**: AI-generated study recommendations
- **Upcoming Events**: Academic calendar integration
- **Subjects Overview**: Progress visualization across all subjects

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
- **React + TypeScript**: Type-safe component development
- **Vite**: Fast build system and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icon library

### AI & Translation
- **Google Gemini API**: AI assistant integration
- **Google Translate API**: Real-time translation service
- **Custom Translation Utility**: Language support for English, Hindi, Gujarati

### State Management & Routing
- **React Query**: Server state management
- **React Router**: Client-side routing
- **Custom Auth Context**: User authentication and onboarding state

### Backend & Cloud (Google Technologies)
- **Firebase Authentication** (Google Sign-In)
- **Firestore Database**
- **Firebase Hosting**
- **Google Meet** (for live skill exchange)
- **Google Calendar API** (future scope)

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **TypeScript**: Type checking and IntelliSense

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

### ✅ Implemented Features
- **Google Login**: Firebase Authentication integration
- **AI Assistant**: Floating chat interface with Gemini API
- **Translation Widget**: Real-time translation across 3 languages
- **Comprehensive Onboarding**: 6-step personality and skill assessment
- **Enhanced Skill Exchange**: Peer-to-peer chat with translation support
- **Smart Dashboard**: Personalized analytics and study planning
- **Academic Dashboard**: Subject tracking and progress visualization
- **Scholarship Links**: Centralized scholarship information
- **Modern UI/UX**: Advanced animations and AI-like aesthetics

### 🔄 Ready for Backend Integration
- Chat message persistence (Firestore)
- Real Google Translate API calls
- User profile management
- Skill matching algorithm

---

## 📋 Onboarding System

The comprehensive 6-step onboarding questionnaire captures:

1. **Personal Information**: Name, nickname, age group
2. **Interests & Personality**: Mood type, language style, humor level
3. **Learning Preferences**: Learning style, study habits, preferred study time
4. **Goals & Motivation**: Academic goals, motivation level
5. **Skills Assessment**: Teaching and learning preferences
6. **Profile Completion**: Final review and customization

This data enables **AI-powered skill matching** based on personality compatibility and learning styles.

---  

---

## 🌍 Impact

- Reduces academic stress through better organization
- Improves awareness of scholarships
- Promotes collaborative learning culture
- Makes skill learning accessible without financial barriers

---

## 🔮 Future Scope

### 🚀 Immediate Next Steps
- **Real API Integration**: Connect to actual Google Translate and Gemini APIs
- **Chat Persistence**: Store messages in Firestore with real-time updates
- **Advanced Matching**: Implement personality-based skill matching algorithm
- **WebSocket Support**: Real-time chat notifications

### 📈 Enhanced Features
- **AI-based Skill Matching**: Use onboarding data for intelligent peer pairing
- **Google Calendar Integration**: Sync sessions, exams, and study schedules
- **Rating & Feedback System**: Quality assurance for skill exchange sessions
- **GTU Syllabus Integration**: Smart planner with official syllabus data
- **Admin Dashboard**: Moderation tools and analytics

### 🎨 UI/UX Improvements
- **Mobile App**: React Native implementation
- **Dark Mode**: Complete theme system
- **Accessibility**: WCAG compliance and screen reader support
- **Progressive Web App**: Offline functionality and app-like experience

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or bun
- Git

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd EduDisha

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8084 in your browser
```

### Key Files Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── dashboard/      # Dashboard-specific components
│   └── AIAssistant.tsx # Floating AI chat
├── pages/              # Route components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utilities (translation, etc.)
└── data/               # Static data files
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

---

## 🧑‍💻 Team

Built with ❤️ by students for students  
GDG Hackfest Project – **EduDisha**

---

## 📌 Note

This project is currently an MVP developed for hackathon purposes.  
All data used is either demo or sourced from official public portals.

---
