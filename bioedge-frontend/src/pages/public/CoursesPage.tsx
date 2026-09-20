import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  ArrowRight, 
  GraduationCap, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Award, 
  Zap
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';
import { useLanguage } from '../../context/LanguageContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();
  const { t, isBangla, toBnNum } = useLanguage();

  return (
    <div className="courses-hub-page">
      <div className="container">
        
        {/* Header with Optimal Breathing Room */}
        <div className="courses-page-header text-center">
          <span className="section-pill">
            <Sparkles size={14} /> {t.courses.badge}
          </span>
          <h1 className="section-title">{t.courses.title}</h1>
          <p className="section-subtitle">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Balanced Minimalist Cards Grid */}
        <div className="courses-cards-container">
          <div className="courses-minimal-grid">
            
            {/* COURSE 1: Alpha Cohort */}
            <div className="course-minimal-card bio-card">
              <div className="c-card-top">
                <div className="c-icon-badge-row">
                  <div className="c-card-icon green">
                    <GraduationCap size={26} />
                  </div>
                  <div className="c-status-wrap">
                    <span className="badge badge-green">{isBangla ? 'এইচএসসি ২০২৬ / ২০২৭' : 'HSC 2026 / 2027'}</span>
                    <span className="c-live-seats">
                      <span className="pulse-dot"></span>
                      {toBnNum(availableSeats)} {t.courses.seatsLeft}
                    </span>
                  </div>
                </div>

                <div className="c-title-box">
                  <h2 className="c-course-title">
                    {t.courses.alphaTitle}
                  </h2>
                </div>

                <p className="c-course-desc">
                  {t.courses.alphaDesc}
                </p>

                {/* Minimal Spec Badges */}
                <div className="c-specs-row">
                  <div className="c-spec-pill">
                    <Clock size={14} />
                    <span>{t.courses.fourMonths}</span>
                  </div>
                  <div className="c-spec-pill">
                    <Layers size={14} />
                    <span>{t.courses.chaptersCount}</span>
                  </div>
                  <div className="c-spec-pill">
                    <ShieldCheck size={14} />
                    <span>{t.courses.cqGrading}</span>
                  </div>
                </div>

                {/* Course Price Tag */}
                <div className="c-price-row">
                  <div className="c-price-main">
                    <span className="c-price-label">{t.courses.fee}</span>
                    <div className="c-price-value">
                      <span className="c-currency">৳</span>
                      <span className="c-amount">{toBnNum('12,500')}</span>
                      <span className="c-duration">{t.courses.fullCourse}</span>
                    </div>
                  </div>
                  <span className="c-price-installment">{t.courses.monthlyOption}</span>
                </div>
              </div>

              {/* CTA Buttons: Details & Enroll */}
              <div className="c-card-actions">
                <Link to="/courses/alpha-cohort" className="btn btn-outline c-cta-btn c-details-btn">
                  <Info size={16} /> {t.courses.detailsBtn}
                </Link>
                <Link to="/enroll?course=alpha-cohort" className="btn btn-primary c-cta-btn c-enroll-btn">
                  {t.courses.enrollBtn} <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* COURSE 2: SSC 2027 Model Test Package */}
            <div className="course-minimal-card bio-card">
              <div className="c-card-top">
                <div className="c-icon-badge-row">
                  <div className="c-card-icon amber">
                    <Target size={26} />
                  </div>
                  <div className="c-status-wrap">
                    <span className="badge badge-amber">{isBangla ? 'এসএসসি ২০২৭ এক্সক্লুসিভ' : 'SSC 2027 Exclusive'}</span>
                    <span className="c-batch-status">
                      <span className="amber-dot"></span>
                      {isBangla ? 'নতুন ব্যাচ' : 'New Batch'}
                    </span>
                  </div>
                </div>

                <div className="c-title-box">
                  <h2 className="c-course-title">
                    {t.courses.sscTitle}
                  </h2>
                </div>

                <p className="c-course-desc">
                  {t.courses.sscDesc}
                </p>

                {/* Minimal Spec Badges */}
                <div className="c-specs-row">
                  <div className="c-spec-pill">
                    <Award size={14} />
                    <span>{isBangla ? '২০টি মডেল টেস্ট' : '20 Model Tests'}</span>
                  </div>
                  <div className="c-spec-pill">
                    <Layers size={14} />
                    <span>{isBangla ? '১৪টি অধ্যায়' : '14 Chapters'}</span>
                  </div>
                  <div className="c-spec-pill">
                    <Zap size={14} />
                    <span>{isBangla ? '৮টি মাস্টারক্লাস' : '8 Masterclasses'}</span>
                  </div>
                </div>

                {/* Course Price Tag */}
                <div className="c-price-row amber">
                  <div className="c-price-main">
                    <span className="c-price-label">{t.courses.fee}</span>
                    <div className="c-price-value">
                      <span className="c-currency">৳</span>
                      <span className="c-amount">{toBnNum('2,200')}</span>
                      <span className="c-duration">{isBangla ? '/ সম্পূর্ণ প্যাকেজ' : '/ full package'}</span>
                    </div>
                  </div>
                  <span className="c-price-installment">{isBangla ? 'এককালীন' : 'one-time'}</span>
                </div>
              </div>

              {/* CTA Buttons: Details & Enroll */}
              <div className="c-card-actions">
                <Link to="/courses/ssc-2027-model-test" className="btn btn-outline c-cta-btn c-details-btn">
                  <Info size={16} /> {t.courses.detailsBtn}
                </Link>
                <Link to="/enroll?course=ssc-2027" className="btn btn-primary c-cta-btn c-enroll-btn">
                  {t.courses.enrollBtn} <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .courses-hub-page {
          background: linear-gradient(180deg, #FBFDFB 0%, #F5F9F6 100%);
          min-height: calc(100vh - 72px);
          padding: 5rem 0 6.5rem;
          display: flex;
          align-items: center;
        }

        .courses-page-header {
          margin-bottom: 4rem;
        }

        .courses-page-header .section-title {
          margin-top: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .courses-cards-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .courses-minimal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          align-items: stretch;
        }

        .course-minimal-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem 2.25rem;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(49, 91, 61, 0.14);
          box-shadow: 0 10px 30px rgba(22, 51, 32, 0.05);
          transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
          height: 100%;
        }

        .course-minimal-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-green);
          box-shadow: 0 20px 45px rgba(22, 51, 32, 0.11);
        }

        .c-card-top {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .c-icon-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }

        .c-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .c-card-icon.green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .c-card-icon.amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .c-status-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .c-live-seats {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }

        .c-batch-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #B45309;
          background: #FEF7E6;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .amber-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D97706;
        }

        .c-title-box {
          min-height: 56px;
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .c-course-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.28;
          margin: 0;
        }

        .c-course-desc {
          font-size: 0.92rem;
          color: #4A5568;
          line-height: 1.6;
          margin: 0 0 1.5rem;
          flex-grow: 1;
        }

        .c-specs-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.15rem;
        }

        .c-spec-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--light-green-subtle);
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--dark-green);
          border: 1px solid rgba(49, 91, 61, 0.08);
        }

        .c-spec-pill svg {
          color: var(--primary-green);
        }

        /* Prominent Course Price Row */
        .c-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F4FAF6;
          border: 1.5px solid rgba(49, 91, 61, 0.12);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.95rem;
          margin-bottom: 1.35rem;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .c-price-row.amber {
          background: #FEF9EE;
          border-color: rgba(217, 119, 6, 0.18);
        }

        .c-price-main {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
        }

        .c-price-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }

        .c-price-value {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .c-currency {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--dark-green);
        }

        .c-price-row.amber .c-currency {
          color: #B45309;
        }

        .c-amount {
          font-size: 1.45rem;
          font-weight: 900;
          color: var(--dark-green);
          line-height: 1;
        }

        .c-price-row.amber .c-amount {
          color: #B45309;
        }

        .c-duration {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-left: 2px;
        }

        .c-price-installment {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: #FFFFFF;
          padding: 3px 9px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(49, 91, 61, 0.15);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          white-space: nowrap;
        }

        .c-price-row.amber .c-price-installment {
          color: #B45309;
          border-color: rgba(217, 119, 6, 0.2);
        }

        .c-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .c-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .c-details-btn {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--dark-green);
        }

        .c-details-btn:hover {
          background: var(--light-green-subtle);
          border-color: var(--primary-green);
          transform: translateY(-1px);
        }

        .c-enroll-btn {
          background: var(--dark-green);
          color: #FFFFFF;
        }

        .c-enroll-btn:hover {
          background: var(--primary-green);
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .courses-minimal-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
          .courses-page-header {
            margin-bottom: 2.75rem;
          }
          .c-title-box {
            min-height: auto;
          }
        }

        @media (max-width: 480px) {
          .courses-hub-page {
            padding: 3.5rem 0 4.5rem;
          }
          .course-minimal-card {
            padding: 1.75rem 1.5rem;
          }
          .c-course-desc {
            font-size: 0.88rem;
            line-height: 1.55;
            margin-bottom: 1.25rem;
          }
          .c-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
