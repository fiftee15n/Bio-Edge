import React from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

export const StudentAnalyticsPage: React.FC = () => {
  const { tests, papers } = useCourseData();

  const completedTests = tests.filter(t => t.status === 'Completed');
  const avgScore = 86.5;
  const highestScore = 95;
  const lowestScore = 78;

  const chapterAnalytics = [
    { name: "Cell Biology & Division", score: 92, status: "Excellent" },
    { name: "Cell Chemistry (Biomolecules)", score: 85, status: "Strong" },
    { name: "Microorganisms & Viruses", score: 80, status: "Good" },
    { name: "Animal Diversity & Phyla", score: 88, status: "Strong" },
    { name: "Human Digestion & Absorption", score: 84, status: "Good" },
    { name: "Human Circulation & Cardiac System", score: 76, status: "Needs Practice" },
    { name: "Genetics & Mendelian Laws", score: 90, status: "Excellent" },
    { name: "Plant Physiology & Photosynthesis", score: 74, status: "Needs Practice" }
  ];

  return (
    <div className="student-analytics-page">
      {/* Header */}
      <div className="analytics-header-card bio-card">
        <div>
          <span className="badge badge-green">Diagnostic Analytics</span>
          <h1 className="analytics-title">Academic Performance & Mastery</h1>
          <p className="analytics-sub">
            Track your strengths, paper-wise accuracy, and chapter weak spots calculated from all practice tests.
          </p>
        </div>
      </div>

      {/* 19. Overall Performance Top Stats */}
      <div className="analytics-stats-grid">
        <div className="a-stat-card bio-card">
          <div className="a-stat-header">
            <span className="a-stat-label">Average Score</span>
            <TrendingUp size={18} className="a-icon green" />
          </div>
          <strong className="a-stat-value">{avgScore}%</strong>
          <span className="a-stat-sub">Across all completed assessments</span>
        </div>

        <div className="a-stat-card bio-card">
          <div className="a-stat-header">
            <span className="a-stat-label">Highest Score</span>
            <Award size={18} className="a-icon amber" />
          </div>
          <strong className="a-stat-value">{highestScore}%</strong>
          <span className="a-stat-sub">Chapter 01 Practice Test</span>
        </div>

        <div className="a-stat-card bio-card">
          <div className="a-stat-header">
            <span className="a-stat-label">Tests Completed</span>
            <Target size={18} className="a-icon dark" />
          </div>
          <strong className="a-stat-value">{completedTests.length} Tests</strong>
          <span className="a-stat-sub">{Math.max(0, tests.length - completedTests.length)} Tests Pending</span>
        </div>

        <div className="a-stat-card bio-card">
          <div className="a-stat-header">
            <span className="a-stat-label">Batch Percentile</span>
            <Sparkles size={18} className="a-icon green" />
          </div>
          <strong className="a-stat-value">Top 15%</strong>
          <span className="a-stat-sub">Among 17 Active Students</span>
        </div>
      </div>

      {/* 19. Paper-wise Breakdown */}
      <div className="paper-analytics-grid">
        <div className="paper-a-card bio-card">
          <div className="p-a-head">
            <BookOpen size={18} className="p-a-icon" />
            <h3 className="p-a-title">Biology First Paper (Botany & Cell)</h3>
          </div>
          <div className="p-a-stat-row">
            <span className="p-a-label">Average Mastery</span>
            <strong className="p-a-score">88.0%</strong>
          </div>
          <ProgressBar progress={88} height={8} />
          <div className="p-a-details">
            <div className="p-a-detail-item">
              <span>MCQ Accuracy:</span>
              <strong>89%</strong>
            </div>
            <div className="p-a-detail-item">
              <span>CQ Written Score:</span>
              <strong>87%</strong>
            </div>
          </div>
        </div>

        <div className="paper-a-card bio-card">
          <div className="p-a-head">
            <BookOpen size={18} className="p-a-icon" />
            <h3 className="p-a-title">Biology Second Paper (Zoology & Physiology)</h3>
          </div>
          <div className="p-a-stat-row">
            <span className="p-a-label">Average Mastery</span>
            <strong className="p-a-score">85.0%</strong>
          </div>
          <ProgressBar progress={85} height={8} />
          <div className="p-a-details">
            <div className="p-a-detail-item">
              <span>MCQ Accuracy:</span>
              <strong>86%</strong>
            </div>
            <div className="p-a-detail-item">
              <span>CQ Written Score:</span>
              <strong>84%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 19. Chapter-wise Performance Table/Bars */}
      <div className="chapter-analytics-card bio-card">
        <div className="ch-a-card-header">
          <div>
            <h3 className="ch-a-title">Chapter-wise Accuracy Breakdown</h3>
            <p className="ch-a-sub">Identify chapters requiring additional revision and diagram practice</p>
          </div>
        </div>

        <div className="ch-analytics-list">
          {chapterAnalytics.map((item, idx) => (
            <div key={idx} className="ch-a-row">
              <div className="ch-a-info">
                <span className="ch-a-name">{item.name}</span>
                <span className={`badge ${item.score >= 85 ? 'badge-green' : item.score >= 80 ? 'badge-amber' : 'badge-red'}`}>
                  {item.status} ({item.score}%)
                </span>
              </div>
              <ProgressBar 
                progress={item.score} 
                height={7} 
                variant={item.score >= 85 ? 'primary' : 'dark'} 
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .student-analytics-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .analytics-header-card {
          padding: 2.25rem;
        }
        .analytics-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .analytics-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .analytics-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .a-stat-card {
          padding: 1.75rem;
        }
        .a-stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .a-stat-label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .a-icon.green { color: var(--primary-green); }
        .a-icon.amber { color: var(--warning); }
        .a-icon.dark { color: var(--dark-green); }
        .a-stat-value {
          font-size: 2rem;
          color: var(--dark-green);
          display: block;
          font-family: var(--font-heading);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .a-stat-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .paper-analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .paper-a-card {
          padding: 2rem;
        }
        .p-a-head {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .p-a-icon {
          color: var(--primary-green);
        }
        .p-a-title {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .p-a-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.4rem;
        }
        .p-a-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .p-a-score {
          font-size: 1.35rem;
          color: var(--dark-green);
        }
        .p-a-details {
          display: flex;
          justify-content: space-between;
          margin-top: 1.25rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.85rem;
        }
        .p-a-detail-item {
          display: flex;
          gap: 0.4rem;
        }
        .p-a-detail-item strong {
          color: var(--dark-green);
        }

        .chapter-analytics-card {
          padding: 2.25rem;
        }
        .ch-a-card-header {
          margin-bottom: 1.75rem;
        }
        .ch-a-title {
          font-size: 1.25rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }
        .ch-a-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .ch-analytics-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .ch-a-row {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .ch-a-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ch-a-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .paper-analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
