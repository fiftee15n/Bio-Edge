# Bio Edz by Afroza Tahmina - Premium HEC Biology Intensive Program

A modern, clean, minimalist and highly user-friendly educational web platform and management system for **Bio Edz by Afroza Tahmina**.

---

## 📁 Repository Structure

```
Bio-Edge/
├── bioedge-frontend/        # React + Vite Frontend SPA (Public site, Student Portal, Teacher Portal)
│   ├── src/
│   │   ├── components/      # Common, Student, and Teacher UI components
│   │   ├── context/         # AuthContext & reactive CourseDataContext (LocalStorage backed)
│   │   ├── data/            # Comprehensive HEC Biology curriculum mock data
│   │   ├── pages/           # Public, Student, and Teacher pages
│   │   ├── App.jsx          # Routing configuration
│   │   └── index.css        # Core design system & color tokens
│   ├── package.json
│   └── vite.config.js
│
├── bioedge-backend/         # Express / Node.js Backend API & Database Scaffolding
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── Bio Edz by Afroza Tahmina.md  # Complete Product Specification Document
└── README.md
```

---

## 🚀 Getting Started

### 1. Frontend Setup (`bioedge-frontend`)

```bash
cd bioedge-frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173/`.

### 2. Backend Setup (`bioedge-backend`)

```bash
cd bioedge-backend
npm install
npm start
```
The backend API server will start on `http://localhost:5000/`.

---

## 🌟 Key Features

### Public Website
- **Hero & Dynamic Seats**: Real-time seat counter (`Only X seats remaining`) based on cohort capacity.
- **Curriculum Explorer**: Interactive First Paper & Second Paper chapter and topic browser.
- **Teacher Profile**: Spotlight on Afroza Tahmina's background and pedagogical philosophy.
- **Online Admission**: 3-step enrollment wizard with automated admission confirmation.
- **Role-based Authentication**: Quick demo login for both Student and Teacher roles.

### Student Portal (`/student/*`)
- **Dashboard**: Overall course progress, Next Class card with Google Meet link, schedule timeline.
- **My Course**: Topic checklist with interactive completion toggles.
- **Practice & Test Runner**: Distraction-free timed MCQ runner with question navigator and submit modal.
- **Results & Analytics**: Detailed performance reports, paper comparisons, and teacher explanation review.
- **Feedback & Notifications**: Categorized teacher feedback notes (*MCQ*, *Written*, *Diagram*, *Exam Strategy*).

### Teacher Management Portal (`/teacher/*`)
- **Overview KPIs**: Real-time batch statistics (enrolled students, available seats, batch average score).
- **Student Roster**: Filterable student table and individual academic dossiers.
- **Curriculum Manager**: Add/edit/delete First & Second Paper chapters and topics.
- **Class Scheduler**: Schedule live sessions and update meet links.
- **Assessment Engine**: Create MCQ/CQ tests and manage the Question Bank.
- **Evaluation Center**: Manual score grading for written answer scripts.
- **Pricing & Capacity**: Configure cohort seat thresholds and tuition prices with instant site-wide reflection.

---

## 📜 License & Copyright
© 2026 Bio Edz by Afroza Tahmina. All rights reserved.
