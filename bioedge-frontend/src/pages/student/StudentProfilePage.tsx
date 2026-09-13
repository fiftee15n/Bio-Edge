import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Award,
  GraduationCap
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { course } = useCourseData();

  return (
    <div className="student-profile-page">
      <div className="profile-hero-card bio-card">
        <div className="profile-hero-flex">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0) || 'S'}
          </div>

          <div className="profile-main-meta">
            <span className="badge badge-green">Student Profile</span>
            <h1 className="p-student-name">{user?.name || "Tariqul Islam"}</h1>
            <p className="p-student-id">Student ID: {user?.studentId || "BE-2026-001"}</p>
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        {/* Academic Enrollment Info */}
        <div className="profile-info-card bio-card">
          <h3 className="card-section-title">Enrolled Academic Program</h3>
          
          <div className="info-rows-list">
            <div className="info-row">
              <span className="info-label">Program:</span>
              <strong className="info-val">{course.title}</strong>
            </div>

            <div className="info-row">
              <span className="info-label">Batch:</span>
              <strong className="info-val">{user?.batch || "Alpha Cohort"}</strong>
            </div>

            <div className="info-row">
              <span className="info-label">Enrollment Status:</span>
              <span className="badge badge-green">{user?.status || "Active"}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Admission Date:</span>
              <span className="info-val">August 15, 2026</span>
            </div>

            <div className="info-row">
              <span className="info-label">Lead Faculty:</span>
              <span className="info-val">Afroza Tahmina</span>
            </div>
          </div>
        </div>

        {/* Contact & Credentials */}
        <div className="profile-info-card bio-card">
          <h3 className="card-section-title">Personal Details</h3>

          <div className="info-rows-list">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <strong className="info-val">{user?.email || "tariqul@gmail.com"}</strong>
            </div>

            <div className="info-row">
              <span className="info-label">Phone:</span>
              <strong className="info-val">+880 1819-112233</strong>
            </div>

            <div className="info-row">
              <span className="info-label">Institution:</span>
              <strong className="info-val">Notre Dame College, Dhaka</strong>
            </div>

            <div className="info-row">
              <span className="info-label">Target HSC Year:</span>
              <strong className="info-val">HSC 2026</strong>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .profile-hero-card {
          padding: 2.5rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FAFDFB 100%);
        }
        .profile-hero-flex {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .profile-avatar-large {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.25rem;
          font-weight: 700;
          font-family: var(--font-heading);
          border: 4px solid var(--light-green);
        }
        .p-student-name {
          font-size: 1.75rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.2rem;
        }
        .p-student-id {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .profile-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }
        .profile-info-card {
          padding: 2rem;
        }
        .card-section-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .info-rows-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
        }
        .info-label {
          color: var(--text-muted);
        }
        .info-val {
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .profile-details-grid {
            grid-template-columns: 1fr;
          }
          .profile-hero-flex {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .profile-hero-card {
            padding: 1.5rem 1rem;
          }
          .profile-info-card {
            padding: 1.25rem 1rem;
          }
          .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }
        }
      `}</style>
    </div>
  );
};
