# **SkillForge: AI-Powered Learning & Verified Opportunity Platform**

SkillForge is a revolutionary AI-powered ecosystem designed to bridge the gap between skill development and verified career opportunities in India's startup market. By integrating personalized learning with continuous skill verification ("Skill CIBIL Score"), it ensures that learners are not just educated, but job-ready and verified.

## **📂 Project Structure**

Following the architecture shown in the workspace, the project is organized into a decoupled Monorepo:

.  
├── Frontend/                 \# React 18 \+ Vite \+ TypeScript Application  
│   ├── src/                  \# Application source code  
│   ├── public/               \# Static assets (logos, fonts, icons)  
│   ├── index.html            \# Entry HTML file  
│   ├── package.json          \# Node dependencies & scripts  
│   ├── tailwind.config.js    \# "Rollin" theme & color definitions  
│   └── vite.config.js        \# Vite build configuration  
├── skillforge/               \# Django 4.2 Backend (Core API)  
│   ├── ai\_engine/            \# LangChain & GPT-4 logic (The Startup Architect)  
│   ├── apps/                 \# Modular business logic (Learning, Verification, Market)  
│   ├── requirements.txt      \# Python backend dependencies  
│   └── manage.py             \# Django management script  
└── README.md                 \# Project documentation

## **🚀 Key Features**

### **1\. Learning Ecosystem (AI-Adaptive)**

* **Startup Architect AI:** A 24/7 mentor powered by LangChain and GPT-4 that uses Socratic questioning to guide learners through roadblocks.  
* **Adaptive Roadmaps:** Interactive graphs built with **React Flow** that adjust in real-time based on your learning velocity.  
* **Gamified XP:** Progress tracking with Duolingo-style streaks and 3D animated rewards.

### **2\. Verification Ecosystem (Living Credentials)**

* **Skill CIBIL Score:** A real-time trust metric that updates based on project performance and verified assessments.  
* **Portfolio Auth:** AI-powered plagiarism detection for code and reverse image search for design work.

### **3\. Opportunity Marketplace**

* **Semantic Matching:** Intelligent job matching using vector embeddings to pair the right talent with the right startup project.

## **🎨 Visual Identity ("Rollin" Style)**

The UI/UX is built on the **"Engagement Meets Authority"** philosophy, inspired by the chunky, high-contrast aesthetic of the Rollin bakery brand.

* **Colors:** Light Mode uses \#FDF8F1 (Cream) and \#2D1B14 (Espresso) with vibrant blue/yellow accents.  
* **Typography:** Bold, chunky rounded headings (Bricolage Grotesque) at weight 900\.  
* **Components:** Pill-shaped cards (rounded-\[3rem\]) with thick "sticker-style" borders and bouncy Framer Motion micro-animations.

## **🛠️ Technical Stack**

**Frontend:**

* **Core:** React 18, TypeScript, Vite  
* **Styling:** Tailwind CSS, Shadcn/ui  
* **Animation:** Framer Motion, Lenis (Smooth Scroll)  
* **State:** Zustand, React Query

**Backend:**

* **Framework:** Django 4.2, Django REST Framework  
* **Real-time:** Django Channels, Socket.io  
* **Task Queue:** Celery, Redis  
* **Database:** PostgreSQL 15, MongoDB (Portfolios)

**AI/ML:**

* **Orchestration:** LangChain  
* **LLM:** OpenAI GPT-4  
* **Matching:** Semantic Similarity (Vector Embeddings)

## **🏁 Getting Started**

### **Backend Setup**

1. Navigate to /skillforge  
2. Create a virtual environment: python \-m venv venv  
3. Install dependencies: pip install \-r requirements.txt  
4. Run migrations: python manage.py migrate  
5. Start server: python manage.py runserver

### **Frontend Setup**

1. Navigate to /Frontend  
2. Install dependencies: npm install  
3. Start dev server: npm run dev

## **🛡️ License**

Copyright © 2026 SkillForge Team. All rights reserved.

