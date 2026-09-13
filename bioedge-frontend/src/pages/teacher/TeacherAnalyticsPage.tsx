import React from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Award 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TeacherAnalyticsPage: React.FC = () => {
  const { students, tests, course } = useCourseData();

  const topStudents = [...students].sort((a, b) => b.averageScore - a.averageScore).slice(0, 3);
  const attentionStudents = [...students].sort((a, b) => a.averageScore - b.averageScore).slice(0, 3);

  const chapterDifficulty = [
    { chapter: "Chapter 09: Plant Physiology (C3/C4 & Respiration)", avgScore: 74, status: "High Difficulty" },
    { chapter: "Chapter 04: Human Physiology (Circulation & Cardiac Cycle)", avgScore: 76, status: "Medium Difficulty" },
    { chapter: "Chapter 04: Microorganisms (Viral & Bacterial Genetics)", avgScore: 80, status: "Moderate" },
    { chapter: "Chapter 03: Human Physiology (Digestion & Absorption)", avgScore: 84, status: "Good" },
    { chapter: "Chapter 03: Cell Chemistry (Biomolecules)", avgScore: 85, status: "Good" },
    { chapter: "Chapter 01: Animal Diversity & Classification", avgScore: 88, status: "Strong" },
    { chapter: "Chapter 01: Cell and Its Structure", avgScore: 92, status: "Excellent" }
  ];

  return (
    <div className="teacher-analytics-page">
      <div className="analytics-mgr-header bio-card">
        <div>
          <span className="badge badge-amber">Academic Intelligence</span>
          <h1 className="a-mgr-title">Batch Analytics & Weakness Heatmap</h1>
          <p className="a-mgr-sub">
            Identify chapter difficulties, monitor at-risk students, and analyze cohort grade distribution.
          </p>
        </div>
      </div>

      {/* KPI Top Grid */}
      <div className="analytics-kpi-grid">
        <div className="a-kpi-box bio-card">
          <span className="a-kpi-label">Cohort Average Score</span>
          <strong className="a-kpi-val">84.6%</strong>
          <span className="a-kpi-sub">Targeting Board GPA 5.00</span>
        </div>

        <div className="a-kpi-box bio-card">
          <span className="a-kpi-label">Test Submission Rate</span>
          <strong className="a-kpi-val">94.2%</strong>
          <span className="a-kpi-sub">High Cohort Discipline</span>
        </div>

        <div className="a-kpi-box bio-card">
          <span className="a-kpi-label">Syllabus Completion</span>
          <strong className="a-kpi-val">66.7%</strong>
          <span className="a-kpi-sub">32 of 48 Classes Completed</span>
        </div>

        <div className="a-kpi-box bio-card">
          <span className="a-kpi-label">Students Needing Attention</span>
          <strong className="a-kpi-val highlight">3 Students</strong>
          <span className="a-kpi-sub">Average score below 75%</span>
        </div>
      </div>

      {/* Two Column Grid: Top vs Needs Attention & Chapter Difficulty */}
      <div className="analytics-split-grid">
        {/* Left Column: Student Performance Tiers */}
        <div className="performance-tiers-column">
          {/* Top Performers */}
          <div className="tier-card bio-card">
            <div className="tier-head">
              <Award size={18} className="tier-icon green" />
              <h3 className="section-title-sm">Top Performers in Cohort</h3>
            </div>
            <div className="tier-list">
              {topStudents.map((std, idx) => (
                <div key={std.id} className="tier-row">
                  <span className="tier-rank-badge">#{idx + 1}</span>
                  <div className="tier-meta">
                    <strong>{std.name}</strong>
                    <span>{std.studentId} • {std.courseProgress}% progress</span>
                  </div>
                  <strong className="tier-score green-score">{std.averageScore}%</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Students Needing Attention */}
          <div className="tier-card bio-card mt-3">
            <div className="tier-head">
              <AlertTriangle size={18} className="tier-icon amber" />
              <h3 className="section-title-sm">Students Needing Attention</h3>
            </div>
            <div className="tier-list">
              {attentionStudents.map((std) => (
                <div key={std.id} className="tier-row">
                  <div className="tier-meta">
                    <strong>{std.name}</strong>
                    <span>{std.studentId} • Needs diagram coaching</span>
                  </div>
                  <strong className="tier-score amber-score">{std.averageScore}%</strong>
                  <Link to={`/teacher/students/${std.id}`} className="btn btn-outline btn-sm">
                    Feedback
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chapter Difficulty Heatmap */}
        <div className="chapter-difficulty-card bio-card">
          <h3 className="section-title-sm mb-2">Chapter Difficulty Distribution</h3>
          <p className="diff-sub">Based on average score across all student test submissions</p>

          <div className="difficulty-bars-list">
            {chapterDifficulty.map((item, idx) => (
              <div key={idx} className="diff-bar-item">
                <div className="diff-bar-head">
                  <span className="diff-ch-name">{item.chapter}</span>
                  <span className={`badge ${item.avgScore < 78 ? 'badge-red' : item.avgScore < 85 ? 'badge-amber' : 'badge-green'}`}>
                    {item.avgScore}% • {item.status}
                  </span>
                </div>
                <ProgressBar 
                  progress={item.avgScore} 
                  height={7} 
                  variant={item.avgScore < 78 ? 'dark' : 'primary'} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .teacher-analytics-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .analytics-mgr-header {
          padding: 2rem;
        }
        .a-mgr-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .a-mgr-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .analytics-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .a-kpi-box {
          padding: 1.75rem;
        }
        .a-kpi-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.35rem;
        }
        .a-kpi-val {
          font-size: 1.85rem;
          color: var(--dark-green);
          display: block;
          font-family: var(--font-heading);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .a-kpi-val.highlight {
          color: #B45309;
        }
        .a-kpi-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .analytics-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.75rem;
        }
        .tier-card, .chapter-difficulty-card {
          padding: 2rem;
        }
        .section-title-sm {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .tier-head {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .tier-icon.green { color: var(--primary-green); }
        .tier-icon.amber { color: #B45309; }

        .tier-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .tier-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
        }
        .tier-rank-badge {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--dark-green);
          background: var(--light-green);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tier-meta {
          flex: 1;
        }
        .tier-meta strong {
          display: block;
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .tier-meta span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .tier-score {
          font-size: 1.05rem;
        }
        .green-score { color: #16A34A; }
        .amber-score { color: #B45309; }
        .mt-3 { margin-top: 1.5rem; }

        .diff-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .difficulty-bars-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .diff-bar-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .diff-bar-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .diff-ch-name {
          font-weight: 600;
          color: var(--text-dark);
        }

        @media (max-width: 850px) {
          .analytics-split-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .analytics-mgr-header, .tier-card, .chapter-difficulty-card, .a-kpi-box {
            padding: 1.25rem 1rem !important;
          }
          .a-mgr-title {
            font-size: 1.35rem;
          }
          .analytics-kpi-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem;
          }
          .a-kpi-val {
            font-size: 1.45rem;
          }
          .diff-bar-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
          }
        }
        @media (max-width: 480px) {
          .analytics-kpi-grid {
            grid-template-columns: 1fr;
          }
          .tier-row {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .tier-score {
            width: 100%;
            text-align: right;
          }
        }
      `}</style>
    </div>
  );
};
