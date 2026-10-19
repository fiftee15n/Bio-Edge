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

  const completedTests = tests.filter(t => t.status === 'Completed' && t.score !== undefined && t.score !== null);
  const totalScore = completedTests.reduce((acc, t) => acc + (t.score || 0), 0);
  const totalPossible = completedTests.reduce((acc, t) => acc + (t.totalMarks || 1), 0);
  const avgScore = completedTests.length > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
  const highestScore = completedTests.length > 0 
    ? Math.max(...completedTests.map(t => Math.round(((t.score || 0) / (t.totalMarks || 1)) * 100))) 
    : 0;

  const paper1 = papers.find(p => p.id === 'paper-1');
  const paper2 = papers.find(p => p.id === 'paper-2');

  const p1Progress = paper1 && paper1.totalChapters > 0 
    ? Math.round((paper1.completedChapters / paper1.totalChapters) * 100) 
    : 0;
  const p2Progress = paper2 && paper2.totalChapters > 0 
    ? Math.round((paper2.completedChapters / paper2.totalChapters) * 100) 
    : 0;

  const allChapters = [...(paper1?.chapters || []), ...(paper2?.chapters || [])];

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
          <span className="a-stat-sub">
            {completedTests.length > 0 ? 'Across all completed assessments' : 'No tests submitted yet'}
          </span>
        </div>

        <div className="a-stat-card bio-card">
          <div className="a-stat-header">
            <span className="a-stat-label">Highest Score</span>
            <Award size={18} className="a-icon amber" />
          </div>
          <strong className="a-stat-value">{highestScore}%</strong>
          <span className="a-stat-sub">
            {completedTests.length > 0 ? 'Personal best mark' : 'Will update upon completion'}
          </span>
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
            <span className="a-stat-label">Cohort Standing</span>
            <Sparkles size={18} className="a-icon green" />
          </div>
          <strong className="a-stat-value">
            {completedTests.length > 0 ? `${avgScore >= 80 ? 'Top Tier' : 'In Progress'}` : 'New Student'}
          </strong>
          <span className="a-stat-sub">
            {completedTests.length > 0 ? 'Based on test results' : 'Complete tests to generate rank'}
          </span>
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
            <span className="p-a-label">Syllabus Progress</span>
            <strong className="p-a-score">{p1Progress}%</strong>
          </div>
          <ProgressBar progress={p1Progress} height={8} />
          <div className="p-a-details">
            <div className="p-a-detail-item">
              <span>Chapters:</span>
              <strong>{paper1?.chapters.length || 0} Modules</strong>
            </div>
            <div className="p-a-detail-item">
              <span>Status:</span>
              <strong>{p1Progress === 100 ? 'Completed' : p1Progress > 0 ? 'In Progress' : 'Not Started'}</strong>
            </div>
          </div>
        </div>

        <div className="paper-a-card bio-card">
          <div className="p-a-head">
            <BookOpen size={18} className="p-a-icon" />
            <h3 className="p-a-title">Biology Second Paper (Zoology & Physiology)</h3>
          </div>
          <div className="p-a-stat-row">
            <span className="p-a-label">Syllabus Progress</span>
            <strong className="p-a-score">{p2Progress}%</strong>
          </div>
          <ProgressBar progress={p2Progress} height={8} />
          <div className="p-a-details">
            <div className="p-a-detail-item">
              <span>Chapters:</span>
              <strong>{paper2?.chapters.length || 0} Modules</strong>
            </div>
            <div className="p-a-detail-item">
              <span>Status:</span>
              <strong>{p2Progress === 100 ? 'Completed' : p2Progress > 0 ? 'In Progress' : 'Not Started'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 19. Chapter-wise Performance Table/Bars */}
      <div className="chapter-analytics-card bio-card">
        <div className="ch-a-card-header">
          <div>
            <h3 className="ch-a-title">Chapter-wise Syllabus & Mastery Breakdown</h3>
            <p className="ch-a-sub">Track your progress and mastery across all assigned curriculum chapters</p>
          </div>
        </div>

        <div className="ch-analytics-list">
          {allChapters.map((item) => (
            <div key={item.id} className="ch-a-row">
              <div className="ch-a-info">
                <span className="ch-a-name">{item.number}: {item.nameEn || item.name}</span>
                <span className={`badge ${item.progress >= 85 ? 'badge-green' : item.progress > 0 ? 'badge-amber' : 'badge-dark'}`}>
                  {item.status} ({item.progress}%)
                </span>
              </div>
              <ProgressBar 
                progress={item.progress} 
                height={7} 
                variant={item.progress >= 85 ? 'primary' : 'dark'} 
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

        @media (max-width: 600px) {
          .analytics-header-card {
            padding: 1.25rem 1rem;
          }
          .analytics-stats-grid {
            grid-template-columns: 1fr;
          }
          .a-stat-card,
          .paper-a-card,
          .chapter-analytics-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
