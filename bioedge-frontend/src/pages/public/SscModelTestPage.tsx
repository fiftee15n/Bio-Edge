import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  BookOpen, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Users, 
  ShieldCheck, 
  Star,
  Target,
  PenTool,
  HelpCircle,
  Layers
} from 'lucide-react';

export const SscModelTestPage: React.FC = () => {
  const modelTestsList = [
    { num: '01', title: 'Chapter 01 & 02 Model Test', topics: 'Life Lessons & Cells and Tissues of Plants and Animals', type: 'Paper 1 Standard', marks: '50 Marks' },
    { num: '02', title: 'Chapter 03 & 04 Model Test', topics: 'Cell Division & Bioenergetics (Photosynthesis/Respiration)', type: 'Paper 1 Standard', marks: '50 Marks' },
    { num: '03', title: 'Chapter 05 & 06 Model Test', topics: 'Food, Nutrition and Digestion & Transport in Organisms', type: 'Physiology Focus', marks: '50 Marks' },
    { num: '04', title: 'Chapter 07 & 08 Model Test', topics: 'Exchange of Gases & Excretory System', type: 'Human Systems', marks: '50 Marks' },
    { num: '05', title: 'Chapter 09 & 10 Model Test', topics: 'Firmness and Locomotion & Coordination', type: 'Nervous & Skeleton', marks: '50 Marks' },
    { num: '06', title: 'Chapter 11 & 12 Model Test', topics: 'Reproduction in Organisms & Heredity and Evolution', type: 'Genetics Focus', marks: '50 Marks' },
    { num: '07', title: 'Chapter 13 & 14 Model Test', topics: 'Environment of Life & Biotechnology', type: 'Ecology & Biotech', marks: '50 Marks' },
    { num: '08', title: 'First Half Comprehensive Test (Ch 1–7)', topics: 'All Chapter 1 to 7 Full Board Standard Evaluation', type: 'Half Syllabus', marks: '100 Marks' },
    { num: '09', title: 'Second Half Comprehensive Test (Ch 8–14)', topics: 'All Chapter 8 to 14 Full Board Standard Evaluation', type: 'Half Syllabus', marks: '100 Marks' },
    { num: '10', title: 'SSC Grand Board Model Test 01', topics: 'Full SSC Biology Syllabus (Timed Simulation)', type: 'Grand Simulation', marks: '100 Marks' },
    { num: '11', title: 'SSC Grand Board Model Test 02', topics: 'Full SSC Biology Syllabus (Timed Simulation)', type: 'Grand Simulation', marks: '100 Marks' },
    { num: '12', title: 'SSC Grand Board Model Test 03', topics: 'Full SSC Biology Syllabus (Timed Simulation)', type: 'Grand Simulation', marks: '100 Marks' },
    { num: '13', title: 'SSC Grand Board Model Test 04', topics: 'Full SSC Biology Syllabus (Timed Simulation)', type: 'Grand Simulation', marks: '100 Marks' },
    { num: '14', title: 'SSC Grand Board Model Test 05', topics: 'Full SSC Biology Syllabus (Timed Simulation)', type: 'Grand Simulation', marks: '100 Marks' },
    { num: '15', title: 'Top 100 MCQ Marathon Test', topics: 'High-Frequency Board Repeated MCQs', type: 'Speed & Accuracy', marks: '100 MCQs' },
    { num: '16', title: 'CQ Writing & Time Attack Drill', topics: 'Structured CQ 4-Mark Problem Scenarios', type: 'Answer Mastery', marks: '70 Marks' },
    { num: '17', title: 'Diagram & Labeling Master Test', topics: 'All 35+ Mandatory SSC Board Diagrams', type: 'Diagram Blitz', marks: '50 Marks' },
    { num: '18', title: 'Cadet College & Top School Paper 01', topics: 'Exclusive High-Difficulty Question Bank', type: 'Advanced Test', marks: '100 Marks' },
    { num: '19', title: 'Cadet College & Top School Paper 02', topics: 'Exclusive High-Difficulty Question Bank', type: 'Advanced Test', marks: '100 Marks' },
    { num: '20', title: 'Final Pre-Board Mega Simulation', topics: 'Final Rehearsal Before SSC 2027 Examination', type: 'Mega Final', marks: '100 Marks' },
  ];

  return (
    <div className="ssc-model-test-page">
      {/* Hero Banner */}
      <section className="ssc-hero-section">
        <div className="container">
          <div className="ssc-hero-grid">
            <div className="ssc-hero-content">
              <div className="inline-floating-badge" style={{ background: '#FEF7E6', color: '#B45309', borderColor: '#FDE68A' }}>
                <Sparkles size={16} />
                <span>SSC 2027 Batch Exclusive</span>
              </div>
              <h1 className="ssc-hero-title">
                SSC 2027 Biology Model Test Package
              </h1>
              <p className="ssc-hero-subtitle">
                20 Full-Length Board Standard Model Tests • Line-by-Line CQ Evaluation • Live Solution Masterclasses • 100% Exam Readiness.
              </p>
              
              <div className="ssc-hero-meta-row">
                <span className="ssc-meta-tag"><Calendar size={14} /> 20 Scheduled Tests</span>
                <span className="ssc-meta-tag"><Target size={14} /> Full SSC Syllabus (Ch 1–14)</span>
                <span className="ssc-meta-tag"><Award size={14} /> Afroza Tahmina's Review</span>
              </div>

              <div className="ssc-hero-cta-row">
                <Link to="/enroll?course=ssc-2027" className="btn btn-primary btn-lg">
                  Enroll in SSC Package (৳2,200) <ArrowRight size={18} />
                </Link>
                <a href="#test-schedule" className="btn btn-outline btn-lg">
                  View 20-Test Schedule
                </a>
              </div>
            </div>

            <div className="ssc-hero-card bio-card">
              <div className="ssc-card-header">
                <span className="badge badge-amber">Target: GPA 5.0 in Biology</span>
                <h3 className="ssc-card-title">Package Summary</h3>
              </div>
              <div className="ssc-stat-rows">
                <div className="ssc-stat-row">
                  <span className="label">Total Model Tests:</span>
                  <strong>20 Full Tests</strong>
                </div>
                <div className="ssc-stat-row">
                  <span className="label">Syllabus Covered:</span>
                  <strong>Chapters 01 to 14 (Full)</strong>
                </div>
                <div className="ssc-stat-row">
                  <span className="label">CQ Evaluation:</span>
                  <strong>Line-by-line Marked PDF</strong>
                </div>
                <div className="ssc-stat-row">
                  <span className="label">Live Solution Classes:</span>
                  <strong>8 Special Masterclasses</strong>
                </div>
                <div className="ssc-stat-row">
                  <span className="label">Tuition Fee:</span>
                  <strong className="text-price">৳2,200 <span className="old-price">৳3,000</span></strong>
                </div>
              </div>
              <Link to="/enroll?course=ssc-2027" className="btn btn-primary btn-block">
                Claim SSC 2027 Seat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of SSC Model Test Series */}
      <section className="section-padding bg-light-subtle">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Preparation Framework</span>
            <h2 className="section-title">Why Choose This Model Test Package?</h2>
            <p className="section-subtitle">
              Designed specifically to transform textbook knowledge into flawless board exam presentation and top GPA 5.0 results.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <PenTool size={22} className="benefit-icon" />
                <h4 className="benefit-title">Individual CQ Evaluation</h4>
              </div>
              <p className="benefit-text">
                Every written Creative Question answer is graded with red-pen annotations, rubric scoring, and specific feedback for mark maximization.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Target size={22} className="benefit-icon" />
                <h4 className="benefit-title">MCQ Speed & Negative Elimination</h4>
              </div>
              <p className="benefit-text">
                Timed 25-minute online CBT tests to hone rapid reading comprehension, eliminate confusing options, and build 25/25 accuracy.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Layers size={22} className="benefit-icon" />
                <h4 className="benefit-title">All 35+ Mandatory Diagrams</h4>
              </div>
              <p className="benefit-text">
                Learn precise drawing steps for Plant Cell, Nephron, Neuron, Chloroplast, Heart, and Flower reproductive organs under exam conditions.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Award size={22} className="benefit-icon" />
                <h4 className="benefit-title">Leaderboard & Rank Analytics</h4>
              </div>
              <p className="benefit-text">
                Compare your score against serious SSC examinees across Bangladesh and track weekly improvements across all 14 chapters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 20-Test Schedule Table */}
      <section className="section-padding" id="test-schedule">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Complete Schedule</span>
            <h2 className="section-title">20-Test Curriculum & Breakdown</h2>
            <p className="section-subtitle">
              Structured progressive schedule starting from chapter pairs to half-syllabus reviews and full 100-mark Board simulations.
            </p>
          </div>

          <div className="table-container">
            <table className="bio-table">
              <thead>
                <tr>
                  <th>Test #</th>
                  <th>Test Title</th>
                  <th>Chapters & Key Topics</th>
                  <th>Assessment Format</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {modelTestsList.map((test) => (
                  <tr key={test.num}>
                    <td>
                      <span className="badge badge-green">Test {test.num}</span>
                    </td>
                    <td>
                      <strong>{test.title}</strong>
                    </td>
                    <td>
                      <span className="text-muted">{test.topics}</span>
                    </td>
                    <td>
                      <span className="badge badge-gray">{test.type}</span>
                    </td>
                    <td>
                      <strong>{test.marks}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing & Admission Box */}
      <section className="section-padding bg-light-subtle">
        <div className="container">
          <div className="ssc-pricing-box bio-card text-center">
            <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Limited 30-Seat Cohort</span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-green)', marginBottom: '0.75rem' }}>
              Enroll in SSC 2027 Model Test Package
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 1.75rem' }}>
              One-time complete investment for all 20 Model Tests, line-by-line CQ evaluations, 8 solution masterclasses, and colored diagram notes PDF.
            </p>

            <div className="ssc-price-display">
              <span className="currency">৳</span>
              <span className="amount">2,200</span>
              <span className="regular-cut">৳3,000</span>
            </div>

            <div className="ssc-features-checklist">
              <span><CheckCircle2 size={16} className="text-green" /> 20 Full Board Standard Tests</span>
              <span><CheckCircle2 size={16} className="text-green" /> Annotated Written Feedback</span>
              <span><CheckCircle2 size={16} className="text-green" /> 8 Live Masterclasses</span>
              <span><CheckCircle2 size={16} className="text-green" /> High-Yield CQ Prediction Bank</span>
            </div>

            <Link to="/enroll?course=ssc-2027" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>
              Enroll in SSC 2027 Package Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ssc-hero-section {
          padding: 4rem 0 3.5rem;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAFCFA 100%);
          border-bottom: 1px solid var(--border-color);
        }

        .ssc-hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .ssc-hero-title {
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.2;
          margin: 0.85rem 0 0.75rem;
        }

        .ssc-hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .ssc-hero-meta-row {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .ssc-meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.82rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(41, 78, 54, 0.12);
        }

        .ssc-hero-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .ssc-hero-card {
          padding: 2.25rem;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
        }

        .ssc-card-header {
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }

        .ssc-card-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-top: 0.5rem;
        }

        .ssc-stat-rows {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }

        .ssc-stat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
          border-bottom: 1px dashed var(--border-subtle);
          padding-bottom: 0.5rem;
        }

        .ssc-stat-row .label {
          color: var(--text-muted);
        }

        .text-price {
          font-size: 1.25rem;
          color: var(--dark-green);
        }

        .old-price {
          font-size: 0.85rem;
          color: var(--text-light);
          text-decoration: line-through;
          margin-left: 4px;
        }

        .bg-light-subtle {
          background: #F9FCFA;
        }

        .ssc-pricing-box {
          padding: 3.5rem 2rem;
          max-width: 760px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        .ssc-price-display {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .ssc-price-display .currency {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .ssc-price-display .amount {
          font-size: 3.2rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1;
        }

        .ssc-price-display .regular-cut {
          font-size: 1.15rem;
          color: var(--text-light);
          text-decoration: line-through;
          margin-left: 8px;
        }

        .ssc-features-checklist {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          font-size: 0.88rem;
          color: var(--text-dark);
          font-weight: 600;
        }

        .text-green {
          color: var(--primary-green);
        }

        @media (max-width: 900px) {
          .ssc-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .ssc-hero-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
};
