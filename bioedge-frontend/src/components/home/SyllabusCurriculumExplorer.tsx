import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Clock, 
  FileText, 
  Target, 
  ChevronRight, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { HSC_BIOLOGY_CURRICULUM, MonthCurriculum } from '../../data/curriculumStructure';
import { useLanguage } from '../../context/LanguageContext';

export const SyllabusCurriculumExplorer: React.FC = () => {
  const { t, isBangla, toBnNum } = useLanguage();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);
  const [activePaperView, setActivePaperView] = useState<'both' | 'botany' | 'zoology'>('both');

  const currentMonth: MonthCurriculum = HSC_BIOLOGY_CURRICULUM[selectedMonthIndex];

  return (
    <section className="syllabus-explorer-section" id="structure">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="inline-floating-badge">
            <Sparkles size={16} />
            <span>{t.curriculumExplorer.badge}</span>
          </div>
          <h2 className="section-title">
            {t.curriculumExplorer.title}
          </h2>
          <p className="section-subtitle">
            {t.curriculumExplorer.subtitle}
          </p>

          {/* 5 Core Pillars Indicator */}
          <div className="five-pillars-row">
            <span className="pillar-tag"><span className="dot"></span> {t.curriculumExplorer.p1}</span>
            <span className="pillar-tag"><span className="dot"></span> {t.curriculumExplorer.p2}</span>
            <span className="pillar-tag"><span className="dot"></span> {t.curriculumExplorer.p3}</span>
            <span className="pillar-tag"><span className="dot"></span> {t.curriculumExplorer.p4}</span>
            <span className="pillar-tag"><span className="dot"></span> {t.curriculumExplorer.p5}</span>
          </div>
        </div>

        {/* 4-Month Navigation Tab Buttons */}
        <div className="month-tabs-nav">
          {HSC_BIOLOGY_CURRICULUM.map((m, idx) => (
            <button
              key={m.monthId}
              type="button"
              className={`month-tab-btn ${selectedMonthIndex === idx ? 'active' : ''}`}
              onClick={() => setSelectedMonthIndex(idx)}
            >
              <span className="m-num">{isBangla ? `${toBnNum(m.monthNumber)}ম মাস` : `Month 0${m.monthNumber}`}</span>
              <span className="m-title">{isBangla ? (m.titleBn ? m.titleBn.replace(/.*মাস — /, '') : m.title) : m.title.replace(/MONTH \d — /, '')}</span>
              <span className="m-badge">{toBnNum(m.totalClasses)} {isBangla ? 'টি ক্লাস' : 'Classes'}</span>
            </button>
          ))}
        </div>

        {/* Active Month Content View */}
        <div className="month-curriculum-panel bio-card">
          {/* Month Overview Banner */}
          <div className="month-panel-top">
            <div className="month-meta-info">
              <span className="month-badge-pill">{isBangla ? `${toBnNum(currentMonth.monthNumber)}ম মাস` : `Month ${currentMonth.monthNumber}`} • {isBangla ? (currentMonth.classRangeBn || currentMonth.classRange) : currentMonth.classRange}</span>
              <h3 className="month-panel-title">{isBangla ? (currentMonth.titleBn || currentMonth.title) : currentMonth.title}</h3>
              <p className="month-panel-desc">{isBangla ? (currentMonth.subtitleBn || currentMonth.subtitle) : currentMonth.subtitle}</p>
            </div>

            {/* Paper Filter Tabs */}
            <div className="paper-filter-toggles">
              <button
                type="button"
                className={`paper-filter-btn ${activePaperView === 'both' ? 'active' : ''}`}
                onClick={() => setActivePaperView('both')}
              >
                {isBangla ? 'উভয় পত্রের ক্লাসসমূহ' : 'Both Papers (Parallel)'}
              </button>
              <button
                type="button"
                className={`paper-filter-btn ${activePaperView === 'botany' ? 'active' : ''}`}
                onClick={() => setActivePaperView('botany')}
              >
                {isBangla ? '🌿 ১ম পত্র (উদ্ভিদবিজ্ঞান)' : '🌿 1st Paper (Botany)'}
              </button>
              <button
                type="button"
                className={`paper-filter-btn ${activePaperView === 'zoology' ? 'active' : ''}`}
                onClick={() => setActivePaperView('zoology')}
              >
                {isBangla ? '🧬 ২য় পত্র (প্রাণিবিজ্ঞান)' : '🧬 2nd Paper (Zoology)'}
              </button>
            </div>
          </div>

          {/* Parallel Classes Grid (Botany & Zoology) */}
          <div className={`curriculum-columns-grid ${activePaperView !== 'both' ? 'single-col' : ''}`}>
            {/* 1st Paper (Botany) Column */}
            {(activePaperView === 'both' || activePaperView === 'botany') && (
              <div className="curriculum-paper-col">
                <div className="paper-col-header botany-header">
                  <div className="paper-col-title-wrap">
                    <span className="paper-icon">🌿</span>
                    <div>
                      <h4 className="paper-col-title">{isBangla ? '১ম পত্র — উদ্ভিদবিজ্ঞান' : '1st Paper — Botany'}</h4>
                      <span className="paper-col-sub">{isBangla ? 'উদ্ভিদবিজ্ঞান ও কোষীয় শারীরতত্ত্ব' : 'Plant Science & Cellular Physiology'}</span>
                    </div>
                  </div>
                  <span className="classes-counter-pill">{toBnNum(currentMonth.botanyClasses.length)} {isBangla ? 'টি ক্লাস' : 'Classes'}</span>
                </div>

                <div className="classes-timeline-list">
                  {currentMonth.botanyClasses.map((cls) => (
                    <div 
                      key={`botany-${cls.classNumber}-${cls.title}`}
                      className={`class-timeline-item ${cls.isExam ? 'is-exam-item' : ''} ${cls.isTest ? 'is-test-item' : ''} ${cls.isRevision ? 'is-revision-item' : ''}`}
                    >
                      <div className="class-num-badge">
                        {isBangla ? `ক্লাস ${toBnNum(cls.classNumber)}` : cls.classLabel}
                      </div>
                      <div className="class-body-details">
                        <div className="class-top-meta">
                          <span className="class-ch-tag">
                            {isBangla ? cls.chapter.replace('Ch ', 'অধ্যায় ').replace('Full 1st Paper', '১ম পত্র সম্পূর্ণ').replace('Full 2nd Paper', '২য় পত্র সম্পূর্ণ').replace('1st + 2nd Paper', '১ম + ২য় পত্র').replace('Board Papers', 'বোর্ড পেপার').replace('All Chapters', 'সকল অধ্যায়').replace('Exam Ready', 'পরীক্ষা প্রস্তুতি') : cls.chapter}
                          </span>
                          {cls.badge && (
                            <span className={`class-badge-pill badge-${cls.isExam ? 'red' : cls.isTest ? 'amber' : 'green'}`}>
                              {isBangla 
                                ? (cls.badge === 'Chapter Test' ? 'অধ্যায় পরীক্ষা'
                                  : cls.badge === 'Monthly Exam' ? 'মাসিক পরীক্ষা'
                                  : cls.badge === 'Grand Revision' ? 'মহারিভিশন'
                                  : cls.badge === 'MCQ Marathon' ? 'এমসিকিউ ম্যারাথন'
                                  : cls.badge === 'CQ Drill' ? 'সিকিউ ড্রিল'
                                  : cls.badge === 'Board Solutions' ? 'বোর্ড সমাধান'
                                  : cls.badge === 'Doubt Clinic' ? 'ডাউট ক্লিয়ারিং'
                                  : cls.badge === 'Final Masterclass' ? 'ফাইনাল মাস্টারক্লাস'
                                  : cls.badge === 'Diagram Blitz' ? 'চিত্র অঙ্কন ড্রিল'
                                  : cls.badge.startsWith('Model Test') ? `মডেল টেস্ট ${toBnNum(cls.badge.replace('Model Test ', ''))}`
                                  : cls.badge.startsWith('Full Biology Test') ? `বায়োলজি টেস্ট ${toBnNum(cls.badge.replace('Full Biology Test ', ''))}`
                                  : cls.badge)
                                : cls.badge}
                            </span>
                          )}
                        </div>
                        <h5 className="class-title-text">{cls.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2nd Paper (Zoology) Column */}
            {(activePaperView === 'both' || activePaperView === 'zoology') && (
              <div className="curriculum-paper-col">
                <div className="paper-col-header zoology-header">
                  <div className="paper-col-title-wrap">
                    <span className="paper-icon">🧬</span>
                    <div>
                      <h4 className="paper-col-title">{isBangla ? '২য় পত্র — প্রাণিবিজ্ঞান' : '2nd Paper — Zoology'}</h4>
                      <span className="paper-col-sub">{isBangla ? 'প্রাণীর বিভিন্নতা ও মানব শারীরতত্ত্ব' : 'Animal Diversity & Human Physiology'}</span>
                    </div>
                  </div>
                  <span className="classes-counter-pill">{toBnNum(currentMonth.zoologyClasses.length)} {isBangla ? 'টি ক্লাস' : 'Classes'}</span>
                </div>

                <div className="classes-timeline-list">
                  {currentMonth.zoologyClasses.map((cls) => (
                    <div 
                      key={`zoology-${cls.classNumber}-${cls.title}`}
                      className={`class-timeline-item ${cls.isExam ? 'is-exam-item' : ''} ${cls.isTest ? 'is-test-item' : ''} ${cls.isRevision ? 'is-revision-item' : ''}`}
                    >
                      <div className="class-num-badge zoology-num">
                        {isBangla ? `ক্লাস ${toBnNum(cls.classNumber)}` : cls.classLabel}
                      </div>
                      <div className="class-body-details">
                        <div className="class-top-meta">
                          <span className="class-ch-tag zoology-tag">
                            {isBangla ? cls.chapter.replace('Ch ', 'অধ্যায় ').replace('Full 1st Paper', '১ম পত্র সম্পূর্ণ').replace('Full 2nd Paper', '২য় পত্র সম্পূর্ণ').replace('1st + 2nd Paper', '১ম + ২য় পত্র').replace('Board Papers', 'বোর্ড পেপার').replace('All Chapters', 'সকল অধ্যায়').replace('Exam Ready', 'পরীক্ষা প্রস্তুতি') : cls.chapter}
                          </span>
                          {cls.badge && (
                            <span className={`class-badge-pill badge-${cls.isExam ? 'red' : cls.isTest ? 'amber' : 'green'}`}>
                              {isBangla 
                                ? (cls.badge === 'Chapter Test' ? 'অধ্যায় পরীক্ষা'
                                  : cls.badge === 'Monthly Exam' ? 'মাসিক পরীক্ষা'
                                  : cls.badge === 'Grand Revision' ? 'মহারিভিশন'
                                  : cls.badge === 'MCQ Marathon' ? 'এমসিকিউ ম্যারাথন'
                                  : cls.badge === 'CQ Drill' ? 'সিকিউ ড্রিল'
                                  : cls.badge === 'Board Solutions' ? 'বোর্ড সমাধান'
                                  : cls.badge === 'Doubt Clinic' ? 'ডাউট ক্লিয়ারিং'
                                  : cls.badge === 'Final Masterclass' ? 'ফাইনাল মাস্টারক্লাস'
                                  : cls.badge === 'Diagram Blitz' ? 'চিত্র অঙ্কন ড্রিল'
                                  : cls.badge.startsWith('Model Test') ? `মডেল টেস্ট ${toBnNum(cls.badge.replace('Model Test ', ''))}`
                                  : cls.badge.startsWith('Full Biology Test') ? `বায়োলজি টেস্ট ${toBnNum(cls.badge.replace('Full Biology Test ', ''))}`
                                  : cls.badge)
                                : cls.badge}
                            </span>
                          )}
                        </div>
                        <h5 className="class-title-text">{cls.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Monthly Exam Milestone Banner */}
          <div className="monthly-exam-milestone-box">
            <div className="exam-milestone-left">
              <div className="exam-trophy-icon">
                <Award size={24} />
              </div>
              <div>
                <span className="exam-milestone-tag">{isBangla ? `${toBnNum(currentMonth.monthNumber)}ম মাসের মূল্যায়ন মাইলস্টোন` : `Month 0${currentMonth.monthNumber} Assessment Milestone`}</span>
                <h4 className="exam-milestone-title">{isBangla ? (currentMonth.monthlyExam.titleBn || currentMonth.monthlyExam.title) : currentMonth.monthlyExam.title}</h4>
                <p className="exam-milestone-desc">{isBangla ? (currentMonth.monthlyExam.descriptionBn || currentMonth.monthlyExam.description) : currentMonth.monthlyExam.description}</p>
              </div>
            </div>

            <div className="exam-milestone-syllabus-pills">
              <div className="syllabus-pill">
                <strong>{isBangla ? '১ম পত্র:' : '1st Paper:'}</strong> {isBangla ? (currentMonth.monthlyExam.botanySyllabusBn || currentMonth.monthlyExam.botanySyllabus) : currentMonth.monthlyExam.botanySyllabus}
              </div>
              <div className="syllabus-pill">
                <strong>{isBangla ? '২য় পত্র:' : '2nd Paper:'}</strong> {isBangla ? (currentMonth.monthlyExam.zoologySyllabusBn || currentMonth.monthlyExam.zoologySyllabus) : currentMonth.monthlyExam.zoologySyllabus}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="curriculum-footer-row text-center">
          <Link to="/program#structure" className="btn btn-outline">
            {isBangla ? 'সম্পূর্ণ প্রোগ্রাম রূপরেখা ও রুটিন দেখুন' : 'View Program Structure & Schedule'} <Calendar size={16} />
          </Link>
          <Link to="/enroll" className="btn btn-primary">
            {isBangla ? '৪৮টি ক্লাসের সম্পূর্ণ কোর্সে ভর্তি হোন' : 'Enroll in Full 48-Class Program'} <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .syllabus-explorer-section {
          padding: 3.75rem 0;
          background: #FAFCFA;
          scroll-margin-top: 85px;
        }

        .five-pillars-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .pillar-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--dark-green);
          box-shadow: 0 2px 6px rgba(41, 78, 54, 0.03);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .pillar-tag:hover {
          transform: translateY(-1px);
          border-color: var(--primary-green);
        }

        .pillar-tag .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary-green);
          box-shadow: 0 0 6px rgba(78, 134, 95, 0.4);
        }

        /* Month Navigation Tabs */
        .month-tabs-nav {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .month-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 1.15rem 1.25rem;
          border-radius: 18px;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          text-align: left;
          position: relative;
        }

        .month-tab-btn:hover {
          border-color: var(--primary-green);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .month-tab-btn.active {
          background: #FFFFFF;
          border-color: var(--dark-green);
          box-shadow: 0 8px 24px rgba(41, 78, 54, 0.08);
          border-width: 2px;
        }

        .month-tab-btn .m-num {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--primary-green);
          margin-bottom: 0.3rem;
        }

        .month-tab-btn .m-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.3;
          margin-bottom: 0.6rem;
        }

        .month-tab-btn.active .m-title {
          color: var(--dark-green);
        }

        .month-tab-btn .m-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--light-green);
          padding: 3px 9px;
          border-radius: var(--radius-full);
          margin-top: auto;
        }

        .month-tab-btn.active .m-badge {
          background: var(--dark-green);
          color: #FFFFFF;
        }

        /* Month Curriculum Panel */
        .month-curriculum-panel {
          background: #FFFFFF;
          padding: 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
        }

        .month-panel-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1.5rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .month-badge-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          margin-bottom: 0.4rem;
        }

        .month-panel-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.3rem;
        }

        .month-panel-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .paper-filter-toggles {
          display: flex;
          background: #EEF5F0;
          padding: 4px;
          border-radius: var(--radius-full);
          gap: 4px;
        }

        .paper-filter-btn {
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .paper-filter-btn:hover {
          color: var(--text-dark);
        }

        .paper-filter-btn.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        /* Curriculum Columns */
        .curriculum-columns-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
          margin-bottom: 1.75rem;
        }

        .curriculum-columns-grid.single-col {
          grid-template-columns: 1fr;
        }

        .curriculum-paper-col {
          display: flex;
          flex-direction: column;
          background: #FAFCFA;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.4rem;
        }

        .paper-col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1rem;
        }

        .paper-col-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .paper-icon {
          font-size: 1.4rem;
        }

        .paper-col-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .paper-col-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .classes-counter-pill {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--primary-green);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        /* Timeline Items */
        .classes-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .class-timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 0.75rem 0.95rem;
          border-radius: var(--radius-md);
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .class-timeline-item:hover {
          border-color: rgba(78, 134, 95, 0.35);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(41, 78, 54, 0.04);
        }

        .class-timeline-item.is-exam-item {
          background: #FEF5F5;
          border-color: #FED7D7;
        }

        .class-timeline-item.is-test-item {
          background: #FEF9EE;
          border-color: #FEE8B7;
        }

        .class-timeline-item.is-revision-item {
          background: #F4FAF5;
          border-color: #CDEFD7;
        }

        .class-num-badge {
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 7px;
          border-radius: 8px;
          flex-shrink: 0;
          font-family: var(--font-sans);
        }

        .class-num-badge.zoology-num {
          color: #1D4ED8;
          background: #EFF6FF;
        }

        .class-body-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .class-top-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .class-ch-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .class-ch-tag.zoology-tag {
          color: #2563EB;
        }

        .class-badge-pill {
          font-size: 0.64rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .badge-red {
          background: #DC2626;
          color: #FFFFFF;
        }

        .badge-amber {
          background: #D97706;
          color: #FFFFFF;
        }

        .badge-green {
          background: #16A34A;
          color: #FFFFFF;
        }

        .class-title-text {
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.35;
        }

        /* Monthly Exam Milestone Box */
        .monthly-exam-milestone-box {
          background: linear-gradient(135deg, #1C3825 0%, #112519 100%);
          color: #FFFFFF;
          border-radius: 20px;
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.75rem;
          flex-wrap: wrap;
          box-shadow: 0 8px 24px rgba(17, 37, 25, 0.2);
        }

        .exam-milestone-left {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          max-width: 540px;
        }

        .exam-trophy-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.2);
          color: #FBBF24;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(245, 158, 11, 0.35);
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
        }

        .exam-milestone-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #34D399;
          display: block;
          margin-bottom: 3px;
        }

        .exam-milestone-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .exam-milestone-desc {
          font-size: 0.82rem;
          color: #CBD5E1;
          margin-top: 3px;
        }

        .exam-milestone-syllabus-pills {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .syllabus-pill {
          font-size: 0.78rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          color: #E2E8F0;
        }

        .syllabus-pill strong {
          color: #34D399;
        }

        .curriculum-footer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2.25rem;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .month-tabs-nav {
            grid-template-columns: repeat(2, 1fr);
          }
          .curriculum-columns-grid {
            grid-template-columns: 1fr;
          }
          .monthly-exam-milestone-box {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 600px) {
          .month-tabs-nav {
            grid-template-columns: 1fr;
          }
          .curriculum-footer-row {
            flex-direction: column;
          }
          .curriculum-footer-row .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
