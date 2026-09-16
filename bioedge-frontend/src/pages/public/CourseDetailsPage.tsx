import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Layers, 
  Target, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  ChevronDown, 
  Sparkles, 
  Award, 
  FileText, 
  Video,
  PenTool,
  CheckCircle2 
} from 'lucide-react';

export const CourseDetailsPage: React.FC = () => {
  const { availableSeats } = useCourseData();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // 4 Essential FAQs
  const essentialFaqs = [
    {
      q: 'What is the live class routine and schedule?',
      a: 'Live classes take place 3 days a week: Sunday, Tuesday, and Thursday from 8:00 PM to 9:30 PM. Each session is 90 minutes with live concept lectures, diagram demonstrations, and real-time doubt clearing.'
    },
    {
      q: 'What happens if I miss a live class?',
      a: 'Every single lecture is recorded in Full HD (1080p) and uploaded to your Student Portal within 2 hours. You get timestamped topic markers, PDF lecture slides, and practice CQ questions with unlimited playback until your final Board Exams.'
    },
    {
      q: 'How does handwritten Creative Question (CQ) evaluation work?',
      a: 'After completing your weekly test, you take clear photos of your handwritten answer script and submit them via the portal. Afroza Tahmina and senior academic mentors review each paper with red-pen annotations, rubric grading, and personalized improvement tips.'
    },
    {
      q: 'What payment methods are supported?',
      a: 'You can pay using bKash, Nagad, Rocket, or direct bank transfer. Both the full course discount (৳12,500) and the monthly installment plan (৳3,500/month) are available upon checkout.'
    }
  ];

  return (
    <div className="course-clean-page">
      <div className="container">

        {/* Back Link */}
        <div className="clean-back-nav">
          <Link to="/courses" className="clean-back-link">
            <ArrowLeft size={16} /> Back to All Courses
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="clean-hero-card">
          <div className="hero-pill-row">
            <span className="hero-status-tag">
              <GraduationCap size={15} /> HSC 2026 / 2027 Intensive
            </span>
            <span className="hero-seats-badge">
              <span className="live-dot"></span>
              {availableSeats} Seats Remaining in Alpha Batch
            </span>
          </div>

          <h1 className="clean-hero-title">
            Alpha Cohort: <span className="highlight-text">4-Month Biology Crash Course</span>
          </h1>

          <p className="clean-hero-tagline">
            A comprehensive, high-yield academic track covering all 24 chapters across HSC Biology 1st Paper (Botany) & 2nd Paper (Zoology) with interactive live classes, line-by-line handwritten CQ evaluations, and Board exam drills.
          </p>

          {/* Key Metrics Bar */}
          <div className="clean-metrics-grid">
            <div className="metric-box">
              <Clock size={20} className="metric-icon" />
              <div>
                <strong>4 Months</strong>
                <span>16 Structured Weeks</span>
              </div>
            </div>
            <div className="metric-box">
              <BookOpen size={20} className="metric-icon" />
              <div>
                <strong>48 Live Classes</strong>
                <span>3 Sessions / Week</span>
              </div>
            </div>
            <div className="metric-box">
              <Layers size={20} className="metric-icon" />
              <div>
                <strong>24 Chapters</strong>
                <span>Full Botany & Zoology</span>
              </div>
            </div>
            <div className="metric-box">
              <ShieldCheck size={20} className="metric-icon" />
              <div>
                <strong>CQ Grading</strong>
                <span>Line-by-Line Examiner Feedback</span>
              </div>
            </div>
          </div>

          {/* Quick Action Row */}
          <div className="clean-hero-actions">
            <Link to="/enroll?course=alpha-cohort" className="btn btn-primary btn-lg hero-cta-btn">
              Enroll in Alpha Cohort <ArrowRight size={18} />
            </Link>
            <a 
              href="https://wa.me/8801700000000?text=Hello%20Bio%20Edge%20Team,%20I%20want%20to%20know%20more%20about%20the%20HSC%20Alpha%20Cohort" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-outline btn-lg whatsapp-cta-btn"
            >
              <Phone size={16} /> Inquire via WhatsApp
            </a>
          </div>
        </section>

        {/* SECTION 1: 4 CORE FEATURES (WHY ALPHA COHORT?) */}
        <section className="clean-section">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <Sparkles size={14} /> High-Yield Preparation
            </span>
            <h2 className="clean-section-title">What Makes Alpha Cohort Effective</h2>
            <p className="clean-section-desc">
              Designed to replace rote memorization with deep conceptual clarity, fast diagramming, and structured exam writing.
            </p>
          </div>

          <div className="features-quad-grid">
            <div className="feature-quad-card">
              <div className="feature-icon-circle green">
                <Video size={22} />
              </div>
              <h3 className="feature-card-title">Live Conceptual Lectures</h3>
              <p className="feature-card-desc">
                48 interactive 90-minute masterclasses breaking down convoluted biological systems into intuitive mental models with 3D models and clear logic.
              </p>
            </div>

            <div className="feature-quad-card">
              <div className="feature-icon-circle amber">
                <PenTool size={22} />
              </div>
              <h3 className="feature-card-title">Handwritten CQ Script Grading</h3>
              <p className="feature-card-desc">
                Submit photos of your written answer scripts. Evaluators annotate mistakes with red-pen notes, rubric marks, and keyword suggestions.
              </p>
            </div>

            <div className="feature-quad-card">
              <div className="feature-icon-circle green">
                <Target size={22} />
              </div>
              <h3 className="feature-card-title">Diagram Speed & Labeling</h3>
              <p className="feature-card-desc">
                Master 80+ essential board diagrams with step-by-step drawing techniques, accurate labeling, and time attack drills under 3 minutes.
              </p>
            </div>

            <div className="feature-quad-card">
              <div className="feature-icon-circle amber">
                <FileText size={22} />
              </div>
              <h3 className="feature-card-title">1080p Recordings & Notes</h3>
              <p className="feature-card-desc">
                Every live class is archived in Full HD within 2 hours with timestamped markers and annotated lecture PDF notebooks accessible until board exams.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-MONTH MILESTONE ROADMAP */}
        <section className="clean-section">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <Layers size={14} /> Structured Curriculum
            </span>
            <h2 className="clean-section-title">4-Month Progressive Roadmap</h2>
            <p className="clean-section-desc">
              All 24 chapters of Botany and Zoology organized into four progressive monthly milestones.
            </p>
          </div>

          <div className="roadmap-cards-grid">
            <div className="roadmap-step-card">
              <div className="step-header">
                <span className="step-month-badge">Month 01</span>
                <span className="step-classes-count">12 Classes</span>
              </div>
              <h3 className="step-title">Cell Biology & Diversity</h3>
              <p className="step-desc">
                Cell structure & function, cellular division, animal classification & characteristics.
              </p>
              <div className="step-footer-tag">
                <CheckCircle2 size={14} /> Milestone Exam 01
              </div>
            </div>

            <div className="roadmap-step-card">
              <div className="step-header">
                <span className="step-month-badge">Month 02</span>
                <span className="step-classes-count">12 Classes</span>
              </div>
              <h3 className="step-title">Plant & Human Physiology</h3>
              <p className="step-desc">
                Photosynthesis, cellular respiration, human digestion, circulation, and gas exchange.
              </p>
              <div className="step-footer-tag">
                <CheckCircle2 size={14} /> Milestone Exam 02
              </div>
            </div>

            <div className="roadmap-step-card">
              <div className="step-header">
                <span className="step-month-badge">Month 03</span>
                <span className="step-classes-count">12 Classes</span>
              </div>
              <h3 className="step-title">Genetics & Biotechnology</h3>
              <p className="step-desc">
                Mendelian genetics, genetic disorders, molecular biology, plant breeding, and biotechnology.
              </p>
              <div className="step-footer-tag">
                <CheckCircle2 size={14} /> Milestone Exam 03
              </div>
            </div>

            <div className="roadmap-step-card">
              <div className="step-header">
                <span className="step-month-badge">Month 04</span>
                <span className="step-classes-count">12 Classes</span>
              </div>
              <h3 className="step-title">Ecology & Board Rehearsals</h3>
              <p className="step-desc">
                Ecosystem dynamics, conservation, full-length timed board model tests, and time drills.
              </p>
              <div className="step-footer-tag final">
                <Award size={14} /> Full Board Simulation
              </div>
            </div>
          </div>

          {/* Link to Full Detailed Curriculum */}
          <div className="roadmap-full-link-box text-center">
            <Link to="/program" className="roadmap-detail-btn">
              View Detailed Class-by-Class Syllabus & Explorer <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* SECTION 3: INSTRUCTOR SPOTLIGHT */}
        <section className="clean-section">
          <div className="instructor-clean-card">
            <div className="ins-clean-photo-wrap">
              <img 
                src="/assets/hero/teacher_afroza_card.jpg" 
                alt="Afroza Tahmina" 
                className="ins-clean-photo" 
              />
            </div>
            <div className="ins-clean-content">
              <span className="ins-clean-tag">Lead Instructor & Mentor</span>
              <h2 className="ins-clean-name">Afroza Tahmina</h2>
              <p className="ins-clean-role">Senior Biology Specialist • B.Sc & M.Sc in Botany</p>
              <p className="ins-clean-bio">
                With over 12+ years of teaching excellence, Afroza Tahmina has guided more than 5,000 students to secure GPA 5.0 in Board Examinations and earn top admissions to Dhaka Medical College and leading medical institutions.
              </p>
              <blockquote className="ins-clean-quote">
                “Biology is not about memorization—it is the elegant logic of living systems. When you understand the mechanisms, high marks follow naturally.”
              </blockquote>
              <div className="ins-clean-stats-row">
                <div className="stat-item">
                  <strong>12+</strong>
                  <span>Years Teaching</span>
                </div>
                <div className="stat-item">
                  <strong>5,000+</strong>
                  <span>Students Guided</span>
                </div>
                <div className="stat-item">
                  <strong>98.4%</strong>
                  <span>A+ Rate in Biology</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TUITION & ENROLLMENT (2 SIDE-BY-SIDE CARDS) */}
        <section className="clean-section" id="enroll">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <Award size={14} /> Transparent Pricing
            </span>
            <h2 className="clean-section-title">Tuition & Enrollment Plans</h2>
            <p className="clean-section-desc">
              Choose the payment option that works best for you. No hidden charges.
            </p>
          </div>

          <div className="pricing-clean-grid">
            
            {/* PLAN 1: FULL COURSE (RECOMMENDED) */}
            <div className="pricing-clean-card recommended">
              <div className="pricing-rec-badge">Best Value • Save ৳1,500</div>
              <h3 className="plan-name">Full 4-Month Program</h3>
              <div className="plan-price-row">
                <span className="currency">৳</span>
                <span className="amount">12,500</span>
                <span className="period">/ complete 4 months</span>
              </div>
              <p className="plan-savings-note">One-time payment covering all 48 classes and assessments</p>

              <ul className="plan-perks-list">
                <li><Check size={16} /> All 48 Live Masterclasses & Recordings</li>
                <li><Check size={16} /> Complete 24 Botany & Zoology Chapters</li>
                <li><Check size={16} /> 80+ Diagram Blueprint Notebook PDF</li>
                <li><Check size={16} /> Weekly Line-by-Line CQ Script Evaluation</li>
                <li><Check size={16} /> 24/7 Doubt-Clearing Student Portal Access</li>
              </ul>

              <Link to="/enroll?course=alpha-cohort&plan=full" className="btn btn-primary btn-lg btn-block plan-enroll-btn">
                Enroll in Full Program <ArrowRight size={18} />
              </Link>
            </div>

            {/* PLAN 2: MONTHLY INSTALLMENT */}
            <div className="pricing-clean-card">
              <h3 className="plan-name">Monthly Installment Plan</h3>
              <div className="plan-price-row">
                <span className="currency">৳</span>
                <span className="amount">3,500</span>
                <span className="period">/ month (4 installments)</span>
              </div>
              <p className="plan-savings-note">Pay month-by-month as you progress through each milestone</p>

              <ul className="plan-perks-list">
                <li><Check size={16} /> 12 Live Classes per month</li>
                <li><Check size={16} /> Monthly Chapter Exam & Evaluation</li>
                <li><Check size={16} /> Full 1080p Recording Access</li>
                <li><Check size={16} /> Lecture slides and notes included</li>
                <li><Check size={16} /> Cancel or pause anytime before next month</li>
              </ul>

              <Link to="/enroll?course=alpha-cohort&plan=monthly" className="btn btn-outline btn-lg btn-block plan-enroll-btn">
                Choose Monthly Plan <ArrowRight size={18} />
              </Link>
            </div>

          </div>

          <div className="pricing-footer-note text-center">
            <span className="guarantee-text">
              <ShieldCheck size={18} className="shield-icon" />
              <strong>7-Day Money-Back Guarantee:</strong> Attend the first week risk-free. If not completely satisfied, receive a full refund.
            </span>
          </div>
        </section>

        {/* SECTION 5: ESSENTIAL FAQS */}
        <section className="clean-section">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <BookOpen size={14} /> Clarifications
            </span>
            <h2 className="clean-section-title">Frequently Asked Questions</h2>
          </div>

          <div className="clean-faq-stack">
            {essentialFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`clean-faq-item ${expandedFaq === idx ? 'expanded' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <div className="faq-question-bar">
                  <span className="faq-q-text">{faq.q}</span>
                  <ChevronDown size={18} className={`faq-chevron ${expandedFaq === idx ? 'rotate' : ''}`} />
                </div>
                {expandedFaq === idx && (
                  <div className="faq-answer-box">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      <style>{`
        /* Clean Course Details Page Styles */
        .course-clean-page {
          background: #FAFCFA;
          min-height: calc(100vh - 72px);
          padding: 2rem 0 5rem;
        }

        .clean-back-nav {
          margin-bottom: 1.5rem;
        }

        .clean-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--primary-green);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .clean-back-link:hover {
          color: var(--dark-green);
        }

        /* Hero Card */
        .clean-hero-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(49, 91, 61, 0.12);
          box-shadow: 0 10px 30px rgba(22, 51, 32, 0.05);
          padding: 3rem 2.5rem;
          margin-bottom: 3.5rem;
        }

        .hero-pill-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .hero-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .hero-seats-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--dark-green);
          background: rgba(16, 185, 129, 0.12);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--success);
        }

        .clean-hero-title {
          font-size: clamp(1.8rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .clean-hero-title .highlight-text {
          color: var(--primary-green);
        }

        .clean-hero-tagline {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 820px;
          margin-bottom: 2rem;
        }

        /* Metrics Grid */
        .clean-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 2rem;
        }

        .metric-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .metric-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .metric-box strong {
          display: block;
          font-size: 1.05rem;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .metric-box span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Hero Actions */
        .clean-hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.9rem 1.85rem;
          font-weight: 700;
          font-size: 1.05rem;
          border-radius: var(--radius-md);
        }

        .whatsapp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.4rem;
          font-weight: 600;
          color: #059669;
          border-color: rgba(5, 150, 105, 0.35);
          background: #FFFFFF;
        }

        .whatsapp-cta-btn:hover {
          background: #ECFDF5;
          border-color: #059669;
        }

        /* General Section Spacing */
        .clean-section {
          margin-bottom: 4.5rem;
        }

        .clean-section-header {
          margin-bottom: 2.75rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(41, 78, 54, 0.12);
          margin-bottom: 0.35rem;
        }

        .clean-section-title {
          font-size: clamp(1.75rem, 3.2vw, 2.3rem);
          font-weight: 800;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.6rem;
          text-align: center;
          width: 100%;
        }

        .clean-section-desc {
          font-size: 1.02rem;
          color: var(--text-muted);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
          text-align: center;
        }

        /* Features 4-Grid */
        .features-quad-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        .feature-quad-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 2rem 1.75rem;
          border: 1px solid rgba(49, 91, 61, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .feature-quad-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(22, 51, 32, 0.07);
        }

        .feature-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .feature-icon-circle.green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .feature-icon-circle.amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .feature-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }

        .feature-card-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* 4-Month Roadmap */
        .roadmap-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .roadmap-step-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid rgba(49, 91, 61, 0.1);
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .step-month-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .step-classes-count {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .step-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          flex-grow: 1;
          margin-bottom: 1.25rem;
        }

        .step-footer-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green-subtle);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
        }

        .step-footer-tag.final {
          color: #B45309;
          background: #FEF7E6;
        }

        .roadmap-full-link-box {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .roadmap-detail-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark-green);
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }

        .roadmap-detail-btn:hover {
          color: var(--dark-green);
          background: var(--light-green-subtle);
          border-color: var(--primary-green);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(49, 91, 61, 0.12);
        }

        /* Instructor Clean Card */
        .instructor-clean-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(49, 91, 61, 0.12);
          box-shadow: 0 10px 30px rgba(22, 51, 32, 0.04);
          padding: 2.75rem 2.5rem;
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .ins-clean-photo-wrap {
          width: 170px;
          height: 170px;
          border-radius: 24px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(49, 91, 61, 0.15);
          border: 3px solid #FFFFFF;
        }

        .ins-clean-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
        }

        .ins-clean-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .ins-clean-name {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }

        .ins-clean-role {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .ins-clean-bio {
          font-size: 0.95rem;
          color: var(--text-dark);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .ins-clean-quote {
          font-style: italic;
          font-size: 0.92rem;
          color: var(--dark-green);
          background: var(--light-green-subtle);
          padding: 0.85rem 1.15rem;
          border-left: 3px solid var(--primary-green);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          margin: 0 0 1.5rem 0;
        }

        .ins-clean-stats-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .stat-item strong {
          display: block;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1.1;
        }

        .stat-item span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Tuition Grid */
        .pricing-clean-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 920px;
          margin: 0 auto 1.75rem;
        }

        .pricing-clean-card {
          background: #FFFFFF;
          border-radius: 22px;
          border: 1px solid var(--border-color);
          padding: 2.5rem 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease;
        }

        .pricing-clean-card:hover {
          transform: translateY(-3px);
        }

        .pricing-clean-card.recommended {
          border: 2px solid var(--dark-green);
          box-shadow: 0 12px 36px rgba(49, 91, 61, 0.1);
        }

        .pricing-rec-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 14px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .plan-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .plan-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.35rem;
        }

        .plan-price-row .currency {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .plan-price-row .amount {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1;
        }

        .plan-price-row .period {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-left: 0.25rem;
        }

        .plan-savings-note {
          font-size: 0.82rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-bottom: 1.75rem;
        }

        .plan-perks-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-grow: 1;
        }

        .plan-perks-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-dark);
        }

        .plan-perks-list li svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .plan-enroll-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
          padding: 0.85rem;
        }

        .pricing-footer-note {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          text-align: center;
        }

        .guarantee-text {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-muted);
          background: #F4FAF6;
          border: 1px solid rgba(49, 91, 61, 0.12);
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-full);
        }

        .shield-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* FAQ Stack */
        .clean-faq-stack {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .clean-faq-item {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clean-faq-item.expanded {
          border-color: var(--dark-green);
          box-shadow: 0 4px 16px rgba(49, 91, 61, 0.06);
        }

        .faq-question-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-q-text {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .faq-chevron {
          color: var(--text-muted);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer-box {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
        }

        .faq-answer-box p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* ==========================================================================
           RESPONSIVE BREAKPOINTS (TABLETS & MOBILE)
           ========================================================================== */

        @media (max-width: 992px) {
          .clean-hero-card {
            padding: 2.25rem 1.75rem;
          }
          .clean-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .roadmap-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .pricing-clean-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }

        @media (max-width: 768px) {
          .course-clean-page {
            padding: 1.5rem 0 3.5rem;
          }
          .clean-hero-card {
            padding: 1.75rem 1.25rem;
            border-radius: 20px;
            margin-bottom: 2.5rem;
          }
          .clean-hero-title {
            font-size: clamp(1.5rem, 5.5vw, 1.85rem);
          }
          .clean-hero-tagline {
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
          }
          .clean-hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .clean-hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
          .features-quad-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .instructor-clean-card {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1.5rem;
            gap: 1.5rem;
          }
          .ins-clean-photo-wrap {
            width: 130px;
            height: 130px;
            margin: 0 auto;
          }
          .ins-clean-bio {
            text-align: left;
            font-size: 0.9rem;
          }
          .ins-clean-quote {
            text-align: left;
          }
          .ins-clean-stats-row {
            justify-content: center;
            gap: 1.5rem;
          }
        }

        @media (max-width: 580px) {
          .clean-metrics-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
          .metric-box {
            background: rgba(49, 91, 61, 0.04);
            padding: 0.75rem 1rem;
            border-radius: 12px;
          }
          .roadmap-cards-grid {
            grid-template-columns: 1fr;
          }
          .pricing-clean-card {
            padding: 2rem 1.25rem;
          }
          .ins-clean-stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          .stat-item strong {
            font-size: 1.2rem;
          }
          .stat-item span {
            font-size: 0.7rem;
          }
          .clean-faq-item {
            padding: 1rem 1.15rem;
          }
          .faq-q-text {
            font-size: 0.92rem;
          }
        }
      `}</style>
    </div>
  );
};
