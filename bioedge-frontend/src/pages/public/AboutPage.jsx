import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  Target 
} from 'lucide-react';

export const AboutPage = () => {
  const { teacher } = useCourseData();

  return (
    <div className="about-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Faculty Profile</span>
          <h1 className="section-title">Meet Afroza Tahmina</h1>
          <p className="section-subtitle">
            Senior Biology Specialist, Mentor & Founder of Bio Edz Intensive Learning Programs.
          </p>
        </div>

        {/* Bio Spotlight */}
        <div className="about-spotlight-card bio-card">
          <div className="spotlight-grid">
            <div className="spotlight-visual">
              <div className="about-avatar-box">
                AT
              </div>
              <div className="about-quick-pill">
                <Sparkles size={16} />
                <span>12+ Years Excellence</span>
              </div>
            </div>

            <div className="spotlight-content">
              <span className="badge badge-green">Academic Leadership</span>
              <h2 className="faculty-name">{teacher.name}</h2>
              <p className="faculty-sub">{teacher.designation}</p>
              <p className="faculty-inst">{teacher.institution}</p>

              <div className="divider-line" />

              <p className="about-paragraph">
                Afroza Tahmina is one of the most respected and sought-after Biology educators for Higher Secondary (HEC) preparation in Bangladesh. With over a decade of classroom instruction, curriculum authoring, and Olympiad coaching, she has pioneered an intuitive visual-first pedagogy for mastering Botany, Zoology, and Human Physiology.
              </p>

              <p className="about-paragraph">
                Her method eliminates the tedious memorization trap by emphasizing biochemical logic, physiological feedback loops, and structured CQ answer architectures that examiners love.
              </p>

              <div className="quote-callout">
                <p>"{teacher.quote}"</p>
              </div>

              <div className="contact-details-row">
                <div className="c-item">
                  <Phone size={16} className="c-icon" />
                  <span>{teacher.contactNumber}</span>
                </div>
                <div className="c-item">
                  <Mail size={16} className="c-icon" />
                  <span>{teacher.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Principles */}
        <div className="principles-section">
          <div className="section-header text-center">
            <span className="section-pill">Pedagogy</span>
            <h2 className="section-title">The Bio Edz Teaching Philosophy</h2>
            <p className="section-subtitle">
              Three unyielding standards that define every class, assessment, and feedback note.
            </p>
          </div>

          <div className="principles-grid">
            <div className="principle-card bio-card">
              <div className="p-num">01</div>
              <h3 className="p-title">Concept-First Architecture</h3>
              <p className="p-desc">
                Biology is understood when its biochemical and evolutionary logic is revealed. We dissect mechanisms step-by-step before writing down notes.
              </p>
            </div>

            <div className="principle-card bio-card">
              <div className="p-num">02</div>
              <h3 className="p-title">Structured CQ Presentation</h3>
              <p className="p-desc">
                Knowing the answer is only half the battle. We teach students how to organize introductory definitions, comparative tables, and labeled diagrams for full marks.
              </p>
            </div>

            <div className="principle-card bio-card">
              <div className="p-num">03</div>
              <h3 className="p-title">Individualized Feedback Loops</h3>
              <p className="p-desc">
                We believe large batches dilute learning. Every student in our 15–20 member cohort receives personal diagnostic remarks after every test.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="about-cta-bar text-center">
          <Link to="/enroll" className="btn btn-primary btn-lg">
            Enroll in the Intensive Program <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        .about-spotlight-card {
          padding: 3.5rem;
          margin-bottom: 4rem;
        }
        .spotlight-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .spotlight-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-avatar-box {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          font-weight: 700;
          font-family: var(--font-heading);
          border: 6px solid var(--light-green);
          box-shadow: var(--shadow-lg);
          margin-bottom: 1.25rem;
        }
        .about-quick-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
        }
        .faculty-name {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-top: 0.5rem;
        }
        .faculty-sub {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-bottom: 0.2rem;
        }
        .faculty-inst {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .divider-line {
          height: 1px;
          background: var(--border-subtle);
          margin-bottom: 1.25rem;
        }
        .about-paragraph {
          font-size: 0.98rem;
          color: var(--text-dark);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .quote-callout {
          background: var(--light-green-subtle);
          border-left: 4px solid var(--dark-green);
          padding: 1rem 1.25rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--dark-green);
          font-weight: 500;
        }
        .contact-details-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .c-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-dark);
          font-weight: 500;
        }
        .c-icon {
          color: var(--primary-green);
        }

        .principles-section {
          margin-bottom: 4rem;
        }
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .principle-card {
          padding: 2rem;
        }
        .p-num {
          font-size: 2rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--primary-green);
          margin-bottom: 0.75rem;
        }
        .p-title {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .p-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .spotlight-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-spotlight-card {
            padding: 2rem;
          }
          .contact-details-row {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
