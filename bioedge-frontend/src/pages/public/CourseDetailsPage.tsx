import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { SyllabusCurriculumExplorer } from '../../components/home/SyllabusCurriculumExplorer';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Target, 
  Sparkles, 
  FileText, 
  Phone, 
  GraduationCap, 
  Check, 
  ChevronDown, 
  PlayCircle, 
  ArrowLeft 
} from 'lucide-react';

export const CourseDetailsPage: React.FC = () => {
  const { course, papers, availableSeats } = useCourseData();

  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'methodology' | 'schedule' | 'instructor' | 'tuition' | 'faq'>('overview');
  const [selectedPaperId, setSelectedPaperId] = useState<string>('first-paper');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const activePaper = papers.find(p => p.id === selectedPaperId) || papers[0];

  // Alpha Cohort FAQs
  const alphaFaqs = [
    {
      q: 'Is this 4-month crash course suitable for both HSC 2026 and HSC 2027 students?',
      a: 'Yes! The Alpha Cohort is meticulously planned to build deep conceptual clarity from the ground up for HSC 2026 students who need high-yield crash revision, as well as HSC 2027 students who want to master both 1st & 2nd Paper ahead of college tests.'
    },
    {
      q: 'How are the 48 classes structured across the 4 months?',
      a: 'There are 3 live classes per week (90 minutes each). Month 1 covers Cell Biology & Animal Diversity; Month 2 covers Plant Physiology & Human Physiology; Month 3 covers Genetics, Reproduction & Biotech; and Month 4 covers Ecology, Mega Revisions, and Board Model Tests.'
    },
    {
      q: 'What happens if I miss a live class?',
      a: 'Every single live lecture is recorded in high-definition (1080p) and uploaded to your Student Portal within 2 hours with timestamped topic markers, lecture slides PDF, and practice CQ questions.'
    },
    {
      q: 'How are Creative Question (CQ) answer scripts graded?',
      a: 'Students submit handwritten answer scripts via the Student Portal. Afroza Tahmina and her senior academic evaluators review each script line-by-line, providing numerical rubrics, diagram correction marks, and customized feedback.'
    },
    {
      q: 'What payment options are available?',
      a: 'You can pay the full course fee of ৳12,500 (saving ৳1,500) or choose the monthly installment plan of ৳3,500 per month via bKash, Nagad, Rocket, or direct bank transfer.'
    }
  ];

  return (
    <div className="course-details-page-wrapper section-padding">
      <div className="container">
        
        {/* Back Link to Courses */}
        <div className="details-back-nav">
          <Link to="/courses" className="back-courses-link">
            <ArrowLeft size={16} /> Back to All Courses
          </Link>
        </div>

        {/* Hero Section: HSC Alpha Cohort (Full Width) */}
        <div className="course-details-hero bio-card">
          <div className="hero-badge-row">
            <span className="badge badge-green">
              <GraduationCap size={14} /> Flagship 4-Month Intensive
            </span>
            <span className="batch-status-pill">
              <span className="dot"></span>
              {availableSeats} Seats Remaining in Alpha Batch
            </span>
          </div>

          <h1 className="course-hero-title">
            Alpha Cohort: <span className="highlight-text">4-Month Biology Crash Course</span>
          </h1>

          <p className="course-hero-desc">
            An elite 4-month academic journey covering all 24 chapters across HSC Biology 1st Paper (Botany) & 2nd Paper (Zoology). Combines 3D visualization, 48 live classes, weekly CQ grading, and comprehensive board rehearsals.
          </p>

          {/* Quick Metrics Bar */}
          <div className="course-metrics-bar">
            <div className="metric-cell">
              <Clock size={20} className="metric-icon" />
              <div>
                <strong>4 Months</strong>
                <span>16 Intensive Weeks</span>
              </div>
            </div>
            <div className="metric-cell">
              <BookOpen size={20} className="metric-icon" />
              <div>
                <strong>48 Live Classes</strong>
                <span>3 Sessions / Week</span>
              </div>
            </div>
            <div className="metric-cell">
              <Target size={20} className="metric-icon" />
              <div>
                <strong>24 Chapters</strong>
                <span>Botany + Zoology</span>
              </div>
            </div>
            <div className="metric-cell">
              <Users size={20} className="metric-icon" />
              <div>
                <strong>15–20 Limit</strong>
                <span>Personalized Mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout Grid with Right-Side Pricing Card */}
        <div className="course-content-layout-grid">
          
          {/* Left Column: Tabbed Content Details */}
          <div className="course-main-column">
            
            {/* Navigation Tabs */}
            <div className="details-tab-nav">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview & Outcomes
              </button>
              <button 
                className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveTab('curriculum')}
              >
                48-Class Curriculum
              </button>
              <button 
                className={`tab-btn ${activeTab === 'methodology' ? 'active' : ''}`}
                onClick={() => setActiveTab('methodology')}
              >
                Pedagogy & Evaluation
              </button>
              <button 
                className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
              >
                Routine & Timeline
              </button>
              <button 
                className={`tab-btn ${activeTab === 'instructor' ? 'active' : ''}`}
                onClick={() => setActiveTab('instructor')}
              >
                Instructor
              </button>
              <button 
                className={`tab-btn ${activeTab === 'tuition' ? 'active' : ''}`}
                onClick={() => setActiveTab('tuition')}
              >
                Tuition & Fees
              </button>
              <button 
                className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQs
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Course Overview & Target Outcomes</h2>
                <p className="tab-body-lead">
                  The Alpha Cohort is an intensively structured 4-month biology immersion designed specifically for students who demand perfection in their HSC Board Exams and Medical Admission Aspirations.
                </p>

                <h3 className="subsection-title">What You Will Achieve</h3>
                <div className="outcomes-grid">
                  <div className="outcome-item">
                    <CheckCircle2 size={18} className="outcome-icon" />
                    <div>
                      <strong>100% Syllabus Mastery</strong>
                      <p>Deep theoretical clarity across all 24 chapters of Botany and Zoology.</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <CheckCircle2 size={18} className="outcome-icon" />
                    <div>
                      <strong>Flawless CQ Writing Technique</strong>
                      <p>Learn the exact 4-step structure to score full 4/4 marks in analytical and synthesis questions.</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <CheckCircle2 size={18} className="outcome-icon" />
                    <div>
                      <strong>Diagram Speed & Accuracy</strong>
                      <p>Master 80+ essential HSC diagrams under 3 minutes with proper labeling standards.</p>
                    </div>
                  </div>
                  <div className="outcome-item">
                    <CheckCircle2 size={18} className="outcome-icon" />
                    <div>
                      <strong>Unshakable MCQ Precision</strong>
                      <p>Eliminate trap answers and achieve 95%+ accuracy under strict time limits.</p>
                    </div>
                  </div>
                </div>

                <div className="highlight-callout-box">
                  <h4>Who Should Enroll in the Alpha Cohort?</h4>
                  <ul>
                    <li><strong>HSC 2026 Students:</strong> Seeking a structured, high-yield crash course to revise and master both 1st & 2nd paper before final exams.</li>
                    <li><strong>HSC 2027 Students:</strong> Aiming to get 6 months ahead of college syllabus and build solid medical admission foundations.</li>
                    <li><strong>Students struggling with diagrams and CQ structure:</strong> Who need line-by-line feedback on their written scripts.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: CURRICULUM */}
            {activeTab === 'curriculum' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Comprehensive 4-Month 48-Class Syllabus</h2>
                <p className="tab-body-lead">
                  Explore the complete class-by-class schedule divided into Botany (1st Paper) and Zoology (2nd Paper) with weekly CQ tests and monthly milestone exams.
                </p>

                <div style={{ marginBottom: '2.5rem' }}>
                  <SyllabusCurriculumExplorer />
                </div>

                <div className="syllabus-explorer-block">
                  <div className="syllabus-header-row">
                    <h3 className="subsection-title">Detailed Chapter Topics</h3>
                    <div className="paper-switcher-btn-group">
                      {papers.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPaperId(p.id)}
                          className={`paper-switcher-btn ${selectedPaperId === p.id ? 'active' : ''}`}
                        >
                          <BookOpen size={16} />
                          <span>{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="chapters-stack">
                    {activePaper.chapters.map((ch) => (
                      <div key={ch.id} className="chapter-accordion-item">
                        <div className="ch-acc-header">
                          <span className="ch-num-badge">Chapter {ch.number}</span>
                          <strong className="ch-title">{ch.name}</strong>
                          <span className="ch-count-badge">{(ch.topics || []).length} Topics</span>
                        </div>
                        <div className="ch-topics-list">
                          {(ch.topics || []).map((t, idx) => (
                            <div key={idx} className="topic-line">
                              <Check size={14} className="topic-icon" />
                              <span>{t.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: METHODOLOGY */}
            {activeTab === 'methodology' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Teaching Methodology & 5 Core Pillars</h2>
                <p className="tab-body-lead">
                  At Bio Edge, we replace rote memorization with multi-dimensional conceptual understanding and active recall.
                </p>

                <div className="pillars-cards-grid">
                  <div className="pillar-item-card">
                    <div className="pillar-icon-box green">
                      <Sparkles size={24} />
                    </div>
                    <h4>1. Concept Clarity</h4>
                    <p>Visual 3D representations of cellular organelles, biochemical cycles, and human anatomical systems so you never forget mechanisms.</p>
                  </div>

                  <div className="pillar-item-card">
                    <div className="pillar-icon-box amber">
                      <FileText size={24} />
                    </div>
                    <h4>2. Active CQ Practice</h4>
                    <p>Writing actual board-standard CQ responses under timed conditions with model answers and keyword highlighting.</p>
                  </div>

                  <div className="pillar-item-card">
                    <div className="pillar-icon-box green">
                      <Target size={24} />
                    </div>
                    <h4>3. Rigorous Exam Evaluation</h4>
                    <p>Individualized grading of answer scripts with margin annotations, diagram accuracy marks, and score progression graphs.</p>
                  </div>

                  <div className="pillar-item-card">
                    <div className="pillar-icon-box amber">
                      <Layers size={24} />
                    </div>
                    <h4>4. Spaced Revision</h4>
                    <p>Scheduled spaced repetition drills and quick-fire flashcards to maintain long-term memory through board exams.</p>
                  </div>
                </div>

                <div className="evaluation-breakdown-card">
                  <div className="ev-header">
                    <ShieldCheck size={24} className="ev-icon" />
                    <div>
                      <h3>Line-by-Line Script Evaluation Process</h3>
                      <p>How Afroza Tahmina evaluates every written submission:</p>
                    </div>
                  </div>
                  <div className="ev-steps-list">
                    <div className="ev-step">
                      <span className="step-num">1</span>
                      <div>
                        <strong>Step 1: Submission via Portal</strong>
                        <p>Student completes exam and uploads clear photos of handwritten pages within the designated submission window.</p>
                      </div>
                    </div>
                    <div className="ev-step">
                      <span className="step-num">2</span>
                      <div>
                        <strong>Step 2: Rubric-Based Correction</strong>
                        <p>Evaluator annotates mistakes in red, suggests missing biological terms, and grades based on official board rubrics.</p>
                      </div>
                    </div>
                    <div className="ev-step">
                      <span className="step-num">3</span>
                      <div>
                        <strong>Step 3: Diagram Scoring</strong>
                        <p>Diagrams are scored on proportion, arrow placement, correct spelling of labels, and underline conventions.</p>
                      </div>
                    </div>
                    <div className="ev-step">
                      <span className="step-num">4</span>
                      <div>
                        <strong>Step 4: Live Masterclass Debrief</strong>
                        <p>Afroza Tahmina hosts a live session reviewing common pitfalls and showing exemplary student answers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SCHEDULE */}
            {activeTab === 'schedule' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Weekly Routine & Academic Timeline</h2>
                <p className="tab-body-lead">
                  Designed to integrate seamlessly with your regular college routines.
                </p>

                <div className="schedule-timeline-grid">
                  <div className="timeline-day-card">
                    <div className="t-day-header">
                      <Calendar size={18} />
                      <strong>Sunday</strong>
                      <span className="t-badge">Class Day</span>
                    </div>
                    <div className="t-day-body">
                      <span className="t-time">8:00 PM – 9:30 PM</span>
                      <strong className="t-class-title">1st Paper (Botany) Live Masterclass</strong>
                      <p className="t-sub">Concept breakdown + 3D Visual Demo + CQ Analysis</p>
                    </div>
                  </div>

                  <div className="timeline-day-card">
                    <div className="t-day-header">
                      <Calendar size={18} />
                      <strong>Tuesday</strong>
                      <span className="t-badge">Class Day</span>
                    </div>
                    <div className="t-day-body">
                      <span className="t-time">8:00 PM – 9:30 PM</span>
                      <strong className="t-class-title">2nd Paper (Zoology) Live Masterclass</strong>
                      <p className="t-sub">Anatomy breakdown + Diagram Workshop + Practice</p>
                    </div>
                  </div>

                  <div className="timeline-day-card">
                    <div className="t-day-header">
                      <Calendar size={18} />
                      <strong>Thursday</strong>
                      <span className="t-badge">Class Day</span>
                    </div>
                    <div className="t-day-body">
                      <span className="t-time">8:00 PM – 9:30 PM</span>
                      <strong className="t-class-title">Problem Solving & CQ Writing Workshop</strong>
                      <p className="t-sub">Board question analysis + Timed drills</p>
                    </div>
                  </div>

                  <div className="timeline-day-card exam-day">
                    <div className="t-day-header">
                      <Target size={18} />
                      <strong>Friday / Saturday</strong>
                      <span className="t-badge red">Exam Window</span>
                    </div>
                    <div className="t-day-body">
                      <span className="t-time">Anytime (24-Hour Portal Window)</span>
                      <strong className="t-class-title">Weekly Chapter Exam (MCQ + Written CQ)</strong>
                      <p className="t-sub">Automated MCQ score + Evaluated handwritten CQ upload</p>
                    </div>
                  </div>
                </div>

                <div className="recording-policy-note">
                  <PlayCircle size={20} className="r-icon" />
                  <div>
                    <strong>Full Recording Access Policy</strong>
                    <p>All live sessions are uploaded within 2 hours in 1080p Full HD with timestamps. Access is guaranteed until your final board exams.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: INSTRUCTOR */}
            {activeTab === 'instructor' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Meet Your Instructor: Afroza Tahmina</h2>
                <div className="instructor-profile-card">
                  <div className="ins-bio-text">
                    <div className="ins-pill">Lead Biology Specialist</div>
                    <h3 className="ins-name">Afroza Tahmina</h3>
                    <p className="ins-role">B.Sc & M.Sc in Botany | 12+ Years Teaching Experience</p>
                    <p className="ins-desc">
                      Afroza Tahmina has trained over 5,000+ HSC students, helping hundreds achieve GPA 5.00 in Board examinations and gain top admissions to Dhaka Medical College, DMC, SSMC, and leading public medical colleges.
                    </p>
                    <p className="ins-desc">
                      Her unique visual methodology breaks down convoluted biological mechanisms into intuitive mental models, ensuring students retain every concept with zero confusion.
                    </p>

                    <div className="ins-stats-row">
                      <div className="ins-stat">
                        <strong>5,000+</strong>
                        <span>Students Mentored</span>
                      </div>
                      <div className="ins-stat">
                        <strong>98.4%</strong>
                        <span>GPA 5.00 Rate in Bio</span>
                      </div>
                      <div className="ins-stat">
                        <strong>12+</strong>
                        <span>Years Experience</span>
                      </div>
                      <div className="ins-stat">
                        <strong>80+</strong>
                        <span>Diagram Blueprints</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: TUITION */}
            {activeTab === 'tuition' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Tuition & Enrollment Options</h2>
                <p className="tab-body-lead">
                  Transparent pricing with flexible options to suit your preparation needs.
                </p>

                <div className="tuition-pricing-grid">
                  <div className="t-price-box recommended">
                    <div className="t-rec-badge">Recommended • Best Value</div>
                    <h3>Full 4-Month Course</h3>
                    <div className="t-price-val">
                      <span className="cur">৳</span>
                      <span className="num">12,500</span>
                      <span className="per">/ complete 4 months</span>
                    </div>
                    <p className="t-savings">Save ৳1,500 compared to monthly installments</p>

                    <ul className="t-perks-list">
                      <li><Check size={16} /> All 48 Live Interactive Sessions</li>
                      <li><Check size={16} /> All 24 Botany & Zoology Chapters</li>
                      <li><Check size={16} /> 80+ Annotated Diagram Notebook PDF</li>
                      <li><Check size={16} /> Weekly Line-by-Line CQ Evaluation</li>
                      <li><Check size={16} /> 24/7 Doubt-Clearing Student Portal</li>
                    </ul>

                    <Link to="/enroll?course=alpha-cohort&plan=full" className="btn btn-primary btn-block">
                      Enroll in Full Program <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="t-price-box">
                    <h3>Monthly Installment</h3>
                    <div className="t-price-val">
                      <span className="cur">৳</span>
                      <span className="num">3,500</span>
                      <span className="per">/ month (4 installments)</span>
                    </div>
                    <p className="t-savings">Pay month-by-month per 12 live classes</p>

                    <ul className="t-perks-list">
                      <li><Check size={16} /> 12 Live Classes per month</li>
                      <li><Check size={16} /> Monthly Chapter Exam & Evaluation</li>
                      <li><Check size={16} /> Full Portal & Recording Access</li>
                      <li><Check size={16} /> Pay as you progress</li>
                    </ul>

                    <Link to="/enroll?course=alpha-cohort&plan=monthly" className="btn btn-outline btn-block">
                      Choose Monthly Plan <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: FAQ */}
            {activeTab === 'faq' && (
              <div className="tab-pane-card bio-card">
                <h2 className="tab-section-title">Frequently Asked Questions</h2>
                <div className="faq-accordion-stack">
                  {alphaFaqs.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`faq-item-card ${expandedFaq === idx ? 'expanded' : ''}`}
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    >
                      <div className="faq-q-row">
                        <strong>{item.q}</strong>
                        <ChevronDown size={18} className={`faq-chevron ${expandedFaq === idx ? 'rotate' : ''}`} />
                      </div>
                      {expandedFaq === idx && (
                        <div className="faq-a-body">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Quick Action Pricing Card */}
          <div className="course-sidebar-column">
            <div className="sticky-enroll-card bio-card">
              
              <div className="s-card-top">
                <span className="s-card-label">Tuition Fee:</span>
                <div className="s-price-wrap">
                  <span className="cur">৳</span>
                  <span className="num">12,500</span>
                  <span className="period">/ full 4 mo</span>
                </div>
                <span className="s-or-sub">or ৳3,500 per month</span>
              </div>

              <div className="s-seats-banner">
                <span className="pulse-dot"></span>
                <span>{availableSeats} Seats Left in Alpha Batch</span>
              </div>

              <div className="s-actions-list">
                <Link 
                  to="/enroll?course=alpha-cohort"
                  className="btn btn-primary btn-lg btn-block s-enroll-btn"
                >
                  Enroll Now <ArrowRight size={18} />
                </Link>

                <a 
                  href="https://wa.me/8801700000000?text=Hello%20Bio%20Edge%20Team,%20I%20want%20to%20know%20more%20about%20the%20HSC%20Alpha%20Cohort"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-block whatsapp-btn"
                >
                  <Phone size={16} /> Inquire via WhatsApp
                </a>
              </div>

              <div className="s-divider" />

              <div className="s-includes-block">
                <strong className="s-inc-title">Alpha Cohort Includes:</strong>
                <ul className="s-inc-list">
                  <li><BookOpen size={16} /> 48 Live Interactive Classes</li>
                  <li><Layers size={16} /> 24 Botany & Zoology Chapters</li>
                  <li><FileText size={16} /> Handwritten CQ Paper Grading</li>
                  <li><PlayCircle size={16} /> Unlimited 1080p Recording Access</li>
                  <li><ShieldCheck size={16} /> 80+ Annotated Diagrams Notebook</li>
                </ul>
              </div>

              <div className="s-money-back-note">
                <ShieldCheck size={18} className="shield-icon" />
                <span>7-Day Money-Back Guarantee if not fully satisfied.</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      <style>{`
        .details-back-nav {
          margin-bottom: 1.5rem;
        }

        .back-courses-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--primary-green);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .back-courses-link:hover {
          color: var(--dark-green);
        }

        /* Hero */
        .course-details-hero {
          padding: 3rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5FAF6 100%);
          border: 1px solid var(--border-color);
          margin-bottom: 2.5rem;
          width: 100%;
        }

        .hero-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .batch-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .batch-status-pill .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }

        .course-hero-title {
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .course-hero-title .highlight-text {
          color: var(--primary-green);
        }

        .course-hero-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 880px;
          margin-bottom: 2rem;
        }

        .course-metrics-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .metric-cell {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .metric-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .metric-cell strong {
          display: block;
          font-size: 1.05rem;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .metric-cell span {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* 2-Column Layout Grid with Sticky Right Sidebar */
        .course-content-layout-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.25rem;
          align-items: start;
          width: 100%;
        }

        /* Tab Navigation */
        .details-tab-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid var(--border-subtle);
        }

        .tab-btn {
          padding: 0.75rem 1.15rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          border-radius: var(--radius-md) var(--radius-md) 0 0;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
        }

        .tab-btn:hover {
          color: var(--dark-green);
        }

        .tab-btn.active {
          color: var(--dark-green);
          border-bottom-color: var(--dark-green);
          background: rgba(49, 91, 61, 0.05);
        }

        /* Tab Panes */
        .tab-pane-card {
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .tab-section-title {
          font-size: 1.6rem;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .tab-body-lead {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .subsection-title {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 1.25rem;
        }

        /* Outcomes */
        .outcomes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .outcome-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--light-green-subtle);
          padding: 1.15rem;
          border-radius: var(--radius-md);
        }

        .outcome-icon {
          color: var(--primary-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .outcome-item strong {
          display: block;
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }

        .outcome-item p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        .highlight-callout-box {
          background: #FDFBF7;
          border-left: 4px solid var(--primary-green);
          padding: 1.5rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }

        .highlight-callout-box h4 {
          font-size: 1.05rem;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .highlight-callout-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--text-dark);
        }

        /* Curriculum */
        .syllabus-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .chapters-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chapter-accordion-item {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          background: #FAFCFA;
        }

        .ch-acc-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .ch-num-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .ch-title {
          font-size: 1rem;
          color: var(--dark-green);
          flex: 1;
        }

        .ch-count-badge {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .ch-topics-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .topic-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-dark);
        }

        .topic-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* Methodology */
        .pillars-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .pillar-item-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .pillar-icon-box.green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .pillar-icon-box.amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .pillar-item-card h4 {
          font-size: 1.1rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }

        .pillar-item-card p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        .evaluation-breakdown-card {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
        }

        .ev-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .ev-icon {
          color: var(--primary-green);
        }

        .ev-header h3 {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 0.2rem;
        }

        .ev-header p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
        }

        .ev-steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ev-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
          flex-shrink: 0;
        }

        .ev-step strong {
          display: block;
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.2rem;
        }

        .ev-step p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        /* Schedule */
        .schedule-timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .timeline-day-card {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          background: #FAFCFA;
        }

        .timeline-day-card.exam-day {
          background: #FFFBFB;
          border-color: #FECACA;
        }

        .t-day-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          color: var(--dark-green);
        }

        .t-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 2px 7px;
          border-radius: var(--radius-full);
          margin-left: auto;
        }

        .t-badge.red {
          color: #DC2626;
          background: #FEE2E2;
        }

        .t-time {
          display: block;
          font-size: 0.78rem;
          color: var(--primary-green);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .t-class-title {
          display: block;
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }

        .t-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
        }

        .recording-policy-note {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--light-green-subtle);
          padding: 1.25rem;
          border-radius: var(--radius-md);
        }

        .r-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .recording-policy-note strong {
          display: block;
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.2rem;
        }

        .recording-policy-note p {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0;
        }

        /* Instructor Profile */
        .instructor-profile-card {
          background: var(--light-green-subtle);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
        }

        .ins-pill {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary-green);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .ins-name {
          font-size: 1.8rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }

        .ins-role {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .ins-desc {
          font-size: 0.92rem;
          color: var(--text-dark);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .ins-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(49, 91, 61, 0.15);
        }

        .ins-stat strong {
          display: block;
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
        }

        .ins-stat span {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        /* Tuition */
        .tuition-pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .t-price-box {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          background: #FFFFFF;
          position: relative;
        }

        .t-price-box.recommended {
          border: 2px solid var(--dark-green);
          box-shadow: 0 8px 30px rgba(49, 91, 61, 0.1);
        }

        .t-rec-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .t-price-box h3 {
          font-size: 1.25rem;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .t-price-val {
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
          margin-bottom: 0.35rem;
        }

        .t-price-val .cur {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .t-price-val .num {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
        }

        .t-price-val .per {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-left: 0.35rem;
        }

        .t-savings {
          font-size: 0.78rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .t-perks-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.75rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-dark);
        }

        .t-perks-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .t-perks-list li svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* FAQ */
        .faq-accordion-stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item-card {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          background: #FAFCFA;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .faq-item-card.expanded {
          border-color: var(--dark-green);
          background: var(--light-green-subtle);
        }

        .faq-q-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--dark-green);
        }

        .faq-chevron {
          transition: transform 0.2s ease;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-a-body {
          padding-top: 0.75rem;
          margin-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.88rem;
          color: var(--text-dark);
          line-height: 1.55;
        }

        /* Sticky Right-Side Pricing Card */
        .course-sidebar-column {
          padding-top: 76px;
        }

        .sticky-enroll-card {
          position: sticky;
          top: 90px;
          padding: 1.85rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: 0 12px 36px rgba(41, 78, 54, 0.08);
        }

        .s-card-top {
          margin-bottom: 1.25rem;
        }

        .s-card-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
          display: block;
        }

        .s-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
        }

        .s-price-wrap .cur {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .s-price-wrap .num {
          font-size: 2.25rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1.1;
        }

        .s-price-wrap .period {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-left: 0.25rem;
        }

        .s-or-sub {
          display: block;
          font-size: 0.76rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-top: 0.2rem;
        }

        .s-seats-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 1.25rem;
        }

        .s-actions-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .s-enroll-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.85rem 1.25rem;
        }

        .whatsapp-btn {
          color: #059669;
          border-color: rgba(5, 150, 105, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.75rem 1rem;
        }

        .whatsapp-btn:hover {
          background: #ECFDF5;
          border-color: #059669;
        }

        .s-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 1.5rem 0;
        }

        .s-inc-title {
          font-size: 0.85rem;
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.75rem;
        }

        .s-inc-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: var(--text-dark);
        }

        .s-inc-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .s-inc-list li svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .s-money-back-note {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .shield-icon {
          color: var(--primary-green);
          flex-shrink: 0;
          margin-top: 1px;
        }

        @media (max-width: 992px) {
          .course-content-layout-grid {
            grid-template-columns: 1fr;
          }
          .course-sidebar-column {
            padding-top: 0;
          }
          .course-metrics-bar {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          .outcomes-grid {
            grid-template-columns: 1fr;
          }
          .pillars-cards-grid {
            grid-template-columns: 1fr;
          }
          .schedule-timeline-grid {
            grid-template-columns: 1fr;
          }
          .tuition-pricing-grid {
            grid-template-columns: 1fr;
          }
          .ins-stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .course-details-hero {
            padding: 1.75rem 1.5rem;
          }
          .course-hero-title {
            font-size: 1.85rem;
          }
          .tab-pane-card {
            padding: 1.75rem 1.5rem;
          }
          .ch-topics-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
