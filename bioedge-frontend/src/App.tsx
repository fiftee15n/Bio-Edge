import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseDataProvider } from './context/CourseDataContext';

// Public Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { BackToTop } from './components/common/BackToTop';
import { PageTransition } from './components/common/PageTransition';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ProgramPage } from './pages/public/ProgramPage';
import { CoursesPage } from './pages/public/CoursesPage';
import { CourseDetailsPage } from './pages/public/CourseDetailsPage';
import { SscModelTestPage } from './pages/public/SscModelTestPage';
import { ContactPage } from './pages/public/ContactPage';
import { EnrollPage } from './pages/public/EnrollPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Student Portal Layout & Pages
import { StudentLayout } from './components/student/StudentLayout';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCoursePage } from './pages/student/StudentCoursePage';
import { StudentChapterDetailsPage } from './pages/student/StudentChapterDetailsPage';
import { StudentClassesPage } from './pages/student/StudentClassesPage';
import { StudentPracticePage } from './pages/student/StudentPracticePage';
import { StudentTestRunnerPage } from './pages/student/StudentTestRunnerPage';
import { StudentModelTestsPage } from './pages/student/StudentModelTestsPage';
import { StudentResultsPage } from './pages/student/StudentResultsPage';
import { StudentAnalyticsPage } from './pages/student/StudentAnalyticsPage';
import { StudentFeedbackPage } from './pages/student/StudentFeedbackPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Teacher Management Layout & Pages
import { TeacherLayout } from './components/teacher/TeacherLayout';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherStudentsPage } from './pages/teacher/TeacherStudentsPage';
import { TeacherStudentDetailPage } from './pages/teacher/TeacherStudentDetailPage';
import { TeacherCoursePage } from './pages/teacher/TeacherCoursePage';
import { TeacherChaptersPage } from './pages/teacher/TeacherChaptersPage';
import { TeacherClassesPage } from './pages/teacher/TeacherClassesPage';
import { TeacherSchedulePage } from './pages/teacher/TeacherSchedulePage';
import { TeacherTestsPage } from './pages/teacher/TeacherTestsPage';
import { TeacherTestCreatePage } from './pages/teacher/TeacherTestCreatePage';
import { TeacherQuestionsPage } from './pages/teacher/TeacherQuestionsPage';
import { TeacherModelTestsPage } from './pages/teacher/TeacherModelTestsPage';
import { TeacherResultsPage } from './pages/teacher/TeacherResultsPage';
import { TeacherFeedbackPage } from './pages/teacher/TeacherFeedbackPage';
import { TeacherAnalyticsPage } from './pages/teacher/TeacherAnalyticsPage';
import { TeacherPricingPage } from './pages/teacher/TeacherPricingPage';
import { TeacherProfilePage } from './pages/teacher/TeacherProfilePage';

// Admin Portal Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEnrollmentsPage } from './pages/admin/AdminEnrollmentsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';

const PublicLayout: React.FC = () => {
  return (
    <div className="public-site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <CourseDataProvider>
        <BrowserRouter>
          <SmoothScrollProvider>
            <ScrollToTop />
            <BackToTop />
            <Routes>
              {/* Public Pages */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/program" element={<ProgramPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/course-details" element={<CourseDetailsPage />} />
                <Route path="/courses/details" element={<CourseDetailsPage />} />
                <Route path="/courses/alpha-cohort" element={<CourseDetailsPage />} />
                <Route path="/courses/ssc-2027-model-test" element={<SscModelTestPage />} />
                <Route path="/courses/:slug" element={<CourseDetailsPage />} />
                <Route path="/schedule" element={<Navigate to="/program" replace />} />
                <Route path="/pricing" element={<Navigate to="/courses" replace />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Authenticated Student Portal */}
              <Route path="/student" element={<StudentLayout />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="course" element={<StudentCoursePage />} />
                <Route path="chapter/:id" element={<StudentChapterDetailsPage />} />
                <Route path="classes" element={<StudentClassesPage />} />
                <Route path="practice" element={<StudentPracticePage />} />
                <Route path="practice/:id" element={<StudentTestRunnerPage />} />
                <Route path="model-tests" element={<StudentModelTestsPage />} />
                <Route path="results" element={<StudentResultsPage />} />
                <Route path="analytics" element={<StudentAnalyticsPage />} />
                <Route path="feedback" element={<StudentFeedbackPage />} />
                <Route path="notifications" element={<StudentNotificationsPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
              </Route>

              {/* Authenticated Teacher Management Portal */}
              <Route path="/teacher" element={<TeacherLayout />}>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="students" element={<TeacherStudentsPage />} />
                <Route path="students/:id" element={<TeacherStudentDetailPage />} />
                <Route path="course" element={<TeacherCoursePage />} />
                <Route path="chapters" element={<TeacherChaptersPage />} />
                <Route path="classes" element={<TeacherClassesPage />} />
                <Route path="schedule" element={<TeacherSchedulePage />} />
                <Route path="tests" element={<TeacherTestsPage />} />
                <Route path="tests/create" element={<TeacherTestCreatePage />} />
                <Route path="questions" element={<TeacherQuestionsPage />} />
                <Route path="model-tests" element={<TeacherModelTestsPage />} />
                <Route path="results" element={<TeacherResultsPage />} />
                <Route path="feedback" element={<TeacherFeedbackPage />} />
                <Route path="analytics" element={<TeacherAnalyticsPage />} />
                <Route path="pricing" element={<TeacherPricingPage />} />
                <Route path="profile" element={<TeacherProfilePage />} />
                <Route path="settings" element={<TeacherCoursePage />} />
              </Route>

              {/* Dedicated Admin Login */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Authenticated Admin Management Portal */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="enrollments" element={<AdminEnrollmentsPage />} />
                <Route path="students" element={<AdminStudentsPage />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SmoothScrollProvider>
        </BrowserRouter>
      </CourseDataProvider>
    </AuthProvider>
  );
}
