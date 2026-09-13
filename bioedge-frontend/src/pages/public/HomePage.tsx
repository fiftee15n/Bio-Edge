import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { ReferenceHeroSection } from '../../components/home/ReferenceHeroSection';
import { Hero3DCardDeck } from '../../components/home/Hero3DCardDeck';
import { Interactive3DBento } from '../../components/home/Interactive3DBento';
import { CurvedAvatarMarquee } from '../../components/home/CurvedAvatarMarquee';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Users, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  Star, 
  GraduationCap, 
  Layers, 
  FileText, 
  PenTool, 
  Target, 
  TrendingUp, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    course, 
    teacher, 
    papers, 
    classes, 
    availableSeats, 
    activeStudentsCount, 
    faqs 
  } = useCourseData();

  const [activePaperTab, setActivePaperTab] = useState<string>('first-paper');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const selectedPaper = papers.find(p => p.id === activePaperTab) || papers[0];

  return (
    <div className="homepage-wrapper">
      {/* Reference Master Hero Section (Person in center, Teacher card bottom-left, Bio Edge Theme) */}
      <ReferenceHeroSection />

      {/* 3D Biological Concept Deck Showcase (Inspired by Pinterest 3D Design) */}
      <section className="section-padding bg-studio-glow" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, #EFF6F0 50%, #FFFFFF 100%)', paddingBottom: '3rem' }}>
        <div className="container text-center">
          <div className="inline-floating-badge">
            <Sparkles size={16} />
            <span>Interactive 3D Visual Experience</span>
          </div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            A place to master your biological concepts.
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto 1rem' }}>
            Explore high-yield HSC Botany & Zoology chapters in interactive 3D perspective cards. Hover to fan out, click to inspect key CQ hotspots.
          </p>

          <Hero3DCardDeck />
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="section-padding benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Core Pillars</span>
            <h2 className="section-title">Everything You Need for Biology Preparation</h2>
            <p className="section-subtitle">
              A comprehensive learning system built around deep conceptual clarity and structured exam performance.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Sparkles size={20} className="benefit-icon" />
                <h4 className="benefit-title">Concept Building</h4>
              </div>
              <p className="benefit-text">
                Build a deep, foundational understanding of cellular, botanical and physiological processes rather than relying solely on rote memorization.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <PenTool size={20} className="benefit-icon" />
                <h4 className="benefit-title">CQ / SQ Answer Writing</h4>
              </div>
              <p className="benefit-text">
                Master structured Creative Question (CQ) answer frameworks to achieve maximum marks on Board examination evaluation rubrics.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Target size={20} className="benefit-icon" />
                <h4 className="benefit-title">MCQ Speed & Accuracy</h4>
              </div>
              <p className="benefit-text">
                Regular timed MCQ practice sets designed to develop pattern recognition, eliminate negative bias, and maximize exam speed.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <FileText size={20} className="benefit-icon" />
                <h4 className="benefit-title">Board Question Analysis</h4>
              </div>
              <p className="benefit-text">
                Solve the most important past 10-year Board questions and critical Olympiad problem scenarios with step-by-step guidance.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Layers size={20} className="benefit-icon" />
                <h4 className="benefit-title">Important Biology Diagrams</h4>
              </div>
              <p className="benefit-text">
                Learn how to draw, label, and present accurate biological diagrams efficiently under strict examination time constraints.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <TrendingUp size={20} className="benefit-icon" />
                <h4 className="benefit-title">Regular Practice & Continuity</h4>
              </div>
              <p className="benefit-text">
                Maintain academic momentum through weekly scheduled homework, interactive quizzes, and structured chapter milestones.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <GraduationCap size={20} className="benefit-icon" />
                <h4 className="benefit-title">Personalized Teacher Feedback</h4>
              </div>
              <p className="benefit-text">
                Identify specific concept weaknesses and receive one-on-one written feedback directly from Afroza Tahmina.
              </p>
            </div>

            <div className="benefit-card bio-card">
              <div className="benefit-header">
                <Award size={20} className="benefit-icon" />
                <h4 className="benefit-title">Exam Strategy & Mark Maximization</h4>
              </div>
              <p className="benefit-text">
                Learn time management tricks, question selection prioritization, and revision techniques for top competitive scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Multi-Dimensional Biology */}
      <Interactive3DBento />

      {/* 4. Curriculum Explorer */}
      <section className="section-padding curriculum-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Curriculum Explorer</span>
            <h2 className="section-title">Complete HEC Biology Coverage</h2>
            <p className="section-subtitle">
              Dynamically managed curriculum covering all 24 chapters across First Paper & Second Paper.
            </p>
          </div>

          {/* Paper Tab Switcher */}
          <div className="paper-tabs-container">
            {papers.map((paper) => (
              <button
                key={paper.id}
                onClick={() => setActivePaperTab(paper.id)}
                className={`paper-tab-btn ${activePaperTab === paper.id ? 'active' : ''}`}
              >
                <BookOpen size={18} />
                <span>{paper.name}</span>
                <span className="paper-ch-count">{paper.chapters.length} Chapters</span>
              </button>
            ))}
          </div>

          {/* Chapters Grid */}
          <div className="chapters-display-grid">
            {selectedPaper.chapters.map((ch) => (
              <div key={ch.id} className="chapter-item-card bio-card">
                <div className="ch-header">
                  <span className="ch-num-badge">Chapter {ch.number}</span>
                  <span className="ch-topics-count">{(ch.topics || []).length} Topics</span>
                </div>
                <h4 className="ch-name">{ch.name}</h4>
                <div className="ch-topics-list">
                  {(ch.topics || []).slice(0, 3).map((t, idx) => (
                    <div key={idx} className="ch-topic-bullet">
                      <span className="topic-bullet-dot"></span>
                      <span>{t.title}</span>
                    </div>
                  ))}
                  {(ch.topics || []).length > 3 && (
                    <span className="more-topics-tag">
                      + {(ch.topics || []).length - 3} more sub-topics
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="curriculum-cta-row text-center">
            <Link to="/program" className="btn btn-outline">
              View Detailed Topic-by-Topic Syllabus <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6.6 Teacher Section */}
      <section className="section-padding teacher-profile-section">
        <div className="container">
          <div className="teacher-profile-card bio-card">
            <div className="teacher-grid">
              <div className="teacher-visual-box">
                <div className="teacher-avatar-large">
                  AT
                </div>
                <div className="teacher-quick-stats">
                  <div className="t-stat">
                    <strong>{teacher.experience}</strong>
                    <span>Experience</span>
                  </div>
                  <div className="t-stat">
                    <strong>{teacher.totalStudentsTaught}</strong>
                    <span>Students Mentored</span>
                  </div>
                  <div className="t-stat">
                    <strong>{teacher.rating}</strong>
                    <span>Rating</span>
                  </div>
                </div>
              </div>

              <div className="teacher-info-box">
                <span className="badge badge-green">Lead Faculty</span>
                <h2 className="teacher-name-heading">{teacher.name}</h2>
                <p className="teacher-institution-text">{teacher.institution}</p>
                <p className="teacher-specialization-text">
                  <strong>Specialization:</strong> {teacher.specialization}
                </p>
                <p className="teacher-bio-text">{teacher.bio}</p>

                <div className="teacher-quote-box">
                  <p>"{teacher.quote}"</p>
                </div>

                <div className="teacher-actions-row">
                  <Link to="/enroll" className="btn btn-primary">
                    Learn with Afroza Tahmina <ArrowRight size={16} />
                  </Link>
                  <Link to="/about" className="btn btn-outline">
                    Read Full Background
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Avatar Community Stage ("You will find yourself among us") */}
      <CurvedAvatarMarquee />

      {/* 6.7 Why Limited Seats? */}
      <section className="section-padding why-seats-section">
        <div className="container">
          <div className="why-seats-card bio-card">
            <div className="why-seats-content">
              <span className="section-pill">Batch Philosophy</span>
              <h2 className="why-seats-title">Why Only 15–20 Students?</h2>
              <p className="why-seats-desc">
                {course.whyLimitedSeats}
              </p>
              <div className="why-seats-points">
                <div className="seat-point">
                  <CheckCircle2 size={20} className="point-icon" />
                  <div>
                    <strong>Line-by-line CQ written review</strong>
                    <p>Every Creative Question answer is marked and annotated with improvement notes.</p>
                  </div>
                </div>
                <div className="seat-point">
                  <CheckCircle2 size={20} className="point-icon" />
                  <div>
                    <strong>Real-time doubt resolution in class</strong>
                    <p>No student gets left behind in a crowded room with hundreds of nameless participants.</p>
                  </div>
                </div>
                <div className="seat-point">
                  <CheckCircle2 size={20} className="point-icon" />
                  <div>
                    <strong>Personalized progress tracking</strong>
                    <p>Individualized test analytics to identify and eliminate specific chapter weak spots.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="why-seats-counter-box">
              <span className="counter-label">Current Cohort Status</span>
              <div className="seats-circle">
                <div className="seats-num">{availableSeats}</div>
                <div className="seats-caption">Seats Remaining</div>
              </div>
              <p className="counter-subtext">
                {activeStudentsCount} of {course.seatLimit} seats currently reserved
              </p>
              <Link to="/enroll" className="btn btn-primary btn-block">
                Claim Your Seat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 Schedule Preview */}
      <section className="section-padding schedule-preview-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Live Schedule</span>
            <h2 className="section-title">Upcoming Live Classes Preview</h2>
            <p className="section-subtitle">
              Classes are conducted systematically with structured discussion, concept breakdown, and practice.
            </p>
          </div>

          <div className="schedule-list-grid">
            {classes.slice(0, 4).map((cls) => (
              <div key={cls.id} className="schedule-preview-card bio-card">
                <div className="sched-top">
                  <span className={`badge ${cls.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                    {cls.status}
                  </span>
                  <span className="sched-day-time">{cls.day} • {cls.time}</span>
                </div>
                <div className="sched-body">
                  <span className="sched-paper-tag">{cls.paper}</span>
                  <h4 className="sched-title">{cls.title}</h4>
                  <p className="sched-topic">Topic: {cls.topic}</p>
                </div>
                <div className="sched-footer">
                  <span className="sched-teacher">Faculty: {cls.teacher}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/schedule" className="btn btn-outline">
              View Full 48-Class Schedule <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6.9 Assessment Section Flow */}
      <section className="section-padding assessment-flow-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Academic Cycle</span>
            <h2 className="section-title">The 5-Step Continuous Improvement System</h2>
            <p className="section-subtitle">
              How Bio Edge transforms understanding into top exam performance.
            </p>
          </div>

          <div className="flow-steps-grid">
            <div className="flow-step-card bio-card">
              <div className="step-num">01</div>
              <h4 className="step-title">Learn</h4>
              <p className="step-desc">Interactive live conceptual lecture with visual diagramming.</p>
            </div>
            <div className="flow-step-arrow">→</div>

            <div className="flow-step-card bio-card">
              <div className="step-num">02</div>
              <h4 className="step-title">Practice</h4>
              <p className="step-desc">Solve chapter worksheets, MCQ drills, and past board questions.</p>
            </div>
            <div className="flow-step-arrow">→</div>

            <div className="flow-step-card bio-card">
              <div className="step-num">03</div>
              <h4 className="step-title">Assess</h4>
              <p className="step-desc">Timed MCQ quizzes and written CQ test evaluations.</p>
            </div>
            <div className="flow-step-arrow">→</div>

            <div className="flow-step-card bio-card">
              <div className="step-num">04</div>
              <h4 className="step-title">Review</h4>
              <p className="step-desc">Receive teacher feedback and detailed question-by-question explanations.</p>
            </div>
            <div className="flow-step-arrow">→</div>

            <div className="flow-step-card bio-card">
              <div className="step-num">05</div>
              <h4 className="step-title">Improve</h4>
              <p className="step-desc">Target weak areas and master model test time management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.10 Pricing / Tuition */}
      <section className="section-padding pricing-section" id="pricing">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Transparent Tuition</span>
            <h2 className="section-title">Simple, Transparent Investment</h2>
            <p className="section-subtitle">
              Choose between flexible monthly installments or save with full program enrollment.
            </p>
          </div>

          <div className="pricing-cards-grid">
            {/* Monthly Fee Plan */}
            <div className="pricing-card bio-card">
              <div className="pricing-plan-name">Monthly Installment</div>
              <div className="pricing-amount">
                <span className="currency">৳</span>
                <span className="price-val">{course.monthlyFee.toLocaleString()}</span>
                <span className="price-period">/ month</span>
              </div>
              <p className="pricing-plan-desc">
                Pay per month as you progress through the 4-month intensive curriculum.
              </p>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} className="p-check" /> 12 Live Classes per Month</li>
                <li><CheckCircle2 size={16} className="p-check" /> Weekly Chapter Quizzes & MCQ Sets</li>
                <li><CheckCircle2 size={16} className="p-check" /> Personal Written CQ Feedback</li>
                <li><CheckCircle2 size={16} className="p-check" /> Access to Class Recordings</li>
              </ul>
              <Link to="/enroll?plan=monthly" className="btn btn-outline btn-block">
                Enroll Monthly
              </Link>
            </div>

            {/* Full Course Package */}
            <div className="pricing-card bio-card featured-pricing-card">
              <div className="pricing-badge-popular">Best Value • Save ৳1,500</div>
              <div className="pricing-plan-name">Full 4-Month Course</div>
              <div className="pricing-amount">
                <span className="currency">৳</span>
                <span className="price-val">{course.fullCourseFee.toLocaleString()}</span>
                <span className="price-period">/ complete course</span>
              </div>
              <p className="pricing-plan-desc">
                One-time upfront payment for complete 4-month coverage of First & Second Paper.
              </p>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} className="p-check" /> All 48 Intensive Live Classes</li>
                <li><CheckCircle2 size={16} className="p-check" /> All Chapter Tests & Question Bank</li>
                <li><CheckCircle2 size={16} className="p-check" /> Full Syllabus Board Model Tests</li>
                <li><CheckCircle2 size={16} className="p-check" /> 1-on-1 Academic Mentorship</li>
                <li><CheckCircle2 size={16} className="p-check" /> Printable Colored Diagram Notes PDF</li>
              </ul>
              <Link to="/enroll?plan=full" className="btn btn-primary btn-block">
                Enroll in Full Program
              </Link>
            </div>
          </div>

          <div className="seats-notice-bar bio-card">
            <div className="notice-left">
              <Users size={20} className="notice-icon" />
              <div>
                <strong>Strict Seat Cap: {course.seatLimit} Students Only</strong>
                <p>To preserve high-quality personal feedback, enrollment closes automatically when capacity is reached.</p>
              </div>
            </div>
            <div className="notice-right">
              <span className="remaining-tag">{availableSeats} seats remaining</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding faq-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-pill">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about the Premium HEC Biology Intensive Program.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item bio-card ${openFaqIndex === idx ? 'open' : ''}`}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
              >
                <div className="faq-question-row">
                  <h4 className="faq-q-text">{faq.q}</h4>
                  <div className="faq-chevron">
                    {openFaqIndex === idx ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </div>
                {openFaqIndex === idx && (
                  <div className="faq-answer-row">
                    <p className="faq-a-text">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 64. Final CTA Banner */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card bio-card">
            <div className="final-cta-content">
              <span className="final-pill">Enrollment Open</span>
              <h2 className="final-cta-heading">Ready to Take Biology Preparation Seriously?</h2>
              <p className="final-cta-desc">
                Join the Premium HEC Biology Intensive Program and follow a structured preparation journey designed around concepts, practice, assessment and performance.
              </p>
              <div className="final-cta-meta">
                <span className="badge badge-green">Only 15–20 Students</span>
                <span className="badge badge-amber">{availableSeats} Seats Left</span>
              </div>
              <div className="final-cta-actions">
                <Link to="/enroll" className="btn btn-primary btn-lg">
                  Enroll Now <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn btn-secondary btn-lg">
                  Contact Afroza Tahmina
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Styling */
        .hero-section {
          padding: 4.5rem 0 4rem;
          background: linear-gradient(180deg, #FFFFFF 0%, var(--bg-color) 100%);
          border-bottom: 1px solid var(--border-color);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--light-green);
          border: 1px solid rgba(49, 91, 61, 0.2);
          color: var(--dark-green);
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.25rem;
        }
        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-green);
        }
        .hero-headline {
          font-size: 3rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .hero-supporting-message {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-bottom: 1rem;
        }
        .hero-description {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin-bottom: 2rem;
          max-width: 580px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.25rem;
        }
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        .trust-icon {
          color: var(--primary-green);
        }

        /* Hero Preview Card */
        .hero-preview-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          padding: 2rem;
        }
        .card-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .live-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--primary-green);
          font-weight: 600;
        }
        .live-status .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary-green);
        }
        .spec-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
        }
        .spec-teacher {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .spec-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .spec-stat-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }
        .highlight-box {
          background: var(--light-green);
          border-color: rgba(49, 91, 61, 0.2);
        }
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }
        .stat-value {
          font-size: 1rem;
          color: var(--dark-green);
        }
        .hero-next-class-snippet {
          background: #FAFDFB;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .snippet-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--primary-green);
          margin-bottom: 0.5rem;
        }
        .snippet-details {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .snippet-class-num {
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .snippet-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.2;
        }
        .snippet-time {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Highlights Section */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .highlight-card {
          padding: 1.75rem;
        }
        .highlight-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .highlight-icon-accent {
          background: var(--warning-bg);
          color: var(--warning);
        }
        .highlight-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .highlight-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        /* Section Header */
        .section-header {
          margin-bottom: 1.75rem;
        }
        .text-center {
          text-align: center;
        }
        .section-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }
        .section-title {
          font-size: 1.95rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.4rem;
          line-height: 1.25;
        }
        .section-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.45;
        }

        /* Highlights Grid */
        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.15rem;
        }
        .highlight-card {
          padding: 1.15rem;
        }
        .highlight-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .highlight-icon-accent {
          background: var(--warning-bg);
          color: var(--warning);
        }
        .highlight-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.35rem;
        }
        .highlight-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* Benefits Grid (Core Pillars) */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .benefit-card {
          padding: 1.4rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .benefit-card:hover {
          transform: translateY(-3px);
          border-color: rgba(78, 134, 95, 0.3);
          box-shadow: var(--shadow-md);
        }
        .benefit-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }
        .benefit-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }
        .benefit-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.3;
        }
        .benefit-text {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Timeline Grid */
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .timeline-card {
          padding: 1.4rem;
          border-radius: var(--radius-lg);
          border-top: 4px solid var(--primary-green);
        }
        .month-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .month-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.45rem;
        }
        .month-desc {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          line-height: 1.45;
        }
        .month-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-dark);
        }
        .month-list li {
          position: relative;
          padding-left: 0.95rem;
        }
        .month-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary-green);
          font-weight: bold;
        }

        /* Curriculum Tabs */
        .paper-tabs-container {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }
        .paper-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.4rem;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-dark);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.2s ease;
        }
        .paper-tab-btn:hover {
          border-color: var(--primary-green);
          transform: translateY(-1px);
        }
        .paper-tab-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
          box-shadow: 0 4px 14px rgba(41, 78, 54, 0.15);
        }
        .paper-ch-count {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .paper-tab-btn:not(.active) .paper-ch-count {
          background: var(--light-green);
          color: var(--dark-green);
        }
        .chapters-display-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .chapter-item-card {
          padding: 1.35rem;
          border-radius: var(--radius-lg);
        }
        .ch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }
        .ch-num-badge {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .ch-topics-count {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .ch-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.65rem;
          line-height: 1.3;
        }
        .ch-topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .ch-topic-bullet {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .topic-bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary-green);
          opacity: 0.6;
        }
        .more-topics-tag {
          font-size: 0.74rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-top: 0.3rem;
        }

        /* Teacher Spotlight */
        .teacher-profile-card {
          background: #FFFFFF;
          padding: 2.75rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
        }
        .teacher-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .teacher-visual-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .teacher-avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--dark-green) 0%, #1A3423 100%);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
          margin-bottom: 1.25rem;
          border: 4px solid var(--light-green);
          box-shadow: 0 8px 24px rgba(41, 78, 54, 0.15);
        }
        .teacher-quick-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          width: 100%;
        }
        .t-stat {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.6rem 0.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }
        .t-stat strong {
          font-size: 0.92rem;
          color: var(--dark-green);
        }
        .t-stat span {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .teacher-name-heading {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-top: 0.4rem;
          margin-bottom: 0.25rem;
        }
        .teacher-institution-text {
          font-size: 0.95rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-bottom: 0.6rem;
        }
        .teacher-specialization-text {
          font-size: 0.88rem;
          color: var(--text-dark);
          margin-bottom: 0.85rem;
        }
        .teacher-bio-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }
        .teacher-quote-box {
          background: var(--light-green);
          border-left: 3px solid var(--primary-green);
          padding: 0.85rem 1.15rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 1.5rem;
          font-style: italic;
          font-size: 0.9rem;
          color: var(--dark-green);
        }
        .teacher-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Why Seats */
        .why-seats-card {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: 2.5rem;
          padding: 2.75rem;
          align-items: center;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, #FFFFFF 0%, #F8FAF8 100%);
        }
        .why-seats-title {
          font-size: 2rem;
          color: var(--dark-green);
          margin-top: 0.4rem;
          margin-bottom: 0.75rem;
        }
        .why-seats-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }
        .why-seats-points {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .seat-point {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .point-icon {
          color: var(--primary-green);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        .seat-point strong {
          font-size: 0.94rem;
          color: var(--text-dark);
        }
        .seat-point p {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
          line-height: 1.45;
        }
        .why-seats-counter-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }
        .counter-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--primary-green);
          margin-bottom: 1rem;
        }
        .seats-circle {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--dark-green) 0%, #1A3423 100%);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: 0 8px 24px rgba(41, 78, 54, 0.2);
        }
        .seats-num {
          font-size: 2.2rem;
          font-weight: 700;
          font-family: var(--font-heading);
          line-height: 1;
        }
        .seats-caption {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0.9;
        }
        .counter-subtext {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        /* Schedule Preview Grid */
        .schedule-list-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .schedule-preview-card {
          padding: 1.35rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sched-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }
        .sched-day-time {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .sched-paper-tag {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .sched-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-top: 0.3rem;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }
        .sched-topic {
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .sched-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.75rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Flow steps */
        .flow-steps-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .flow-step-card {
          flex: 1;
          min-width: 170px;
          padding: 1.35rem 1.15rem;
          text-align: center;
          border-radius: var(--radius-lg);
        }
        .step-num {
          font-size: 1.45rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--primary-green);
          margin-bottom: 0.4rem;
        }
        .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.4rem;
        }
        .step-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .flow-step-arrow {
          font-size: 1.35rem;
          color: var(--primary-green);
          font-weight: bold;
        }

        /* Pricing Section */
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
          max-width: 840px;
          margin: 0 auto 2rem;
        }
        .pricing-card {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .featured-pricing-card {
          border: 2px solid var(--dark-green);
          box-shadow: 0 12px 32px rgba(41, 78, 54, 0.12);
        }
        .pricing-badge-popular {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.3rem 0.95rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.03em;
          box-shadow: 0 4px 12px rgba(41, 78, 54, 0.2);
        }
        .pricing-plan-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .pricing-amount {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }
        .currency {
          font-size: 1.45rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .price-val {
          font-size: 2.6rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1;
        }
        .price-period {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .pricing-plan-desc {
          font-size: 0.86rem;
          color: var(--text-muted);
          margin-bottom: 1.35rem;
          min-height: 40px;
          line-height: 1.45;
        }
        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          flex: 1;
        }
        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.86rem;
          color: var(--text-dark);
        }
        .p-check {
          color: var(--primary-green);
          flex-shrink: 0;
        }
        .seats-notice-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--light-green);
          border: 1px solid rgba(41, 78, 54, 0.15);
          border-radius: var(--radius-lg);
          padding: 1.15rem 1.65rem;
          max-width: 840px;
          margin: 0 auto;
        }
        .notice-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .notice-icon {
          color: var(--dark-green);
          flex-shrink: 0;
        }
        .notice-left strong {
          color: var(--dark-green);
          font-size: 0.92rem;
        }
        .notice-left p {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }
        .remaining-tag {
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(41, 78, 54, 0.15);
        }

        /* FAQ */
        .faq-accordion-container {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .faq-item {
          padding: 1.15rem 1.65rem;
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .faq-item:hover {
          border-color: rgba(78, 134, 95, 0.35);
          transform: translateY(-1px);
        }
        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .faq-q-text {
          font-size: 1.02rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .faq-chevron {
          color: var(--primary-green);
          flex-shrink: 0;
        }
        .faq-answer-row {
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
        }
        .faq-a-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        /* Final CTA */
        .final-cta-section {
          padding: 3rem 0 5rem;
        }
        .final-cta-card {
          background: linear-gradient(135deg, #1C3825 0%, #112418 100%);
          color: #FFFFFF;
          padding: 3.75rem 2.25rem;
          text-align: center;
          border-radius: var(--radius-xl);
          box-shadow: 0 16px 44px rgba(17, 36, 24, 0.25);
        }
        .final-cta-content {
          max-width: 700px;
          margin: 0 auto;
        }
        .final-pill {
          display: inline-block;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.85rem;
        }
        .final-cta-heading {
          font-size: 2.35rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.95rem;
          line-height: 1.2;
        }
        .final-cta-desc {
          font-size: 1rem;
          color: #E2E8F0;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .final-cta-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .final-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .highlights-grid,
          .benefits-grid,
          .timeline-grid,
          .chapters-display-grid,
          .schedule-list-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .teacher-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .why-seats-card {
            grid-template-columns: 1fr;
          }
          .pricing-cards-grid {
            grid-template-columns: 1fr;
          }
          .flow-step-arrow {
            display: none;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-headline {
            font-size: 2.4rem;
          }
        }
        @media (max-width: 640px) {
          .highlights-grid,
          .benefits-grid,
          .timeline-grid,
          .chapters-display-grid,
          .schedule-list-grid,
          .pricing-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
          }
          .final-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .final-cta-actions .btn {
            width: 100%;
          }
          .final-cta-card {
            padding: 3rem 1.5rem;
          }
          .final-cta-heading {
            font-size: 1.85rem;
          }
          .seats-notice-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
