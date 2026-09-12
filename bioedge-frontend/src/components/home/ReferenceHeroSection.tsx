import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  ArrowUpRight, 
  Play, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  X,
  BookOpen
} from 'lucide-react';

export const ReferenceHeroSection: React.FC = () => {
  const { course, teacher, availableSeats, activeStudentsCount } = useCourseData();
  const [showDemoVideo, setShowDemoVideo] = useState<boolean>(false);

  return (
    <div className="ref-hero-wrapper">
      {/* Background Ambient Glow & Wave Light Lines */}
      <div className="ref-hero-bg-glow">
        <div className="ambient-radial-1"></div>
        <div className="ambient-radial-2"></div>
        <div className="ambient-light-arc"></div>
        {/* Subtle decorative crosshairs & lines from reference */}
        <div className="tech-crosshair top-left-crosshair"></div>
        <div className="tech-circuit-line">
          <span className="circuit-dot"></span>
        </div>
      </div>

      <div className="ref-hero-container">
        {/* Main 3-Column Grid */}
        <div className="ref-hero-grid">
          
          {/* ============================================================
              LEFT COLUMN: Stats, Sub-Badge & Teacher Card in Bottom Left
             ============================================================ */}
          <div className="ref-hero-left-col">
            {/* Top Sub-Badge */}
            <div className="ref-hero-mini-badge">
              <div className="mini-badge-icon">
                <GraduationCap size={16} />
              </div>
              <p className="mini-badge-text">
                A Smarter <strong>Way To Learn, Grow</strong> And Advance
              </p>
            </div>

            {/* Student Achiever Metric with Overlapping Avatars */}
            <div className="ref-hero-students-stat">
              <div className="avatars-overlap-row">
                <div className="stat-avatar av-1">TA</div>
                <div className="stat-avatar av-2">NJ</div>
                <div className="stat-avatar av-3">FK</div>
              </div>
              <div className="stat-number-block">
                <h3 className="stat-huge-number">500+</h3>
                <p className="stat-label-text">HSC Achievers Guided</p>
              </div>
            </div>

            {/* Bottom-Left Teacher Card (Floyd Miles style in reference -> Afroza Tahmina) */}
            <div className="ref-teacher-card bio-clay-card">
              <div className="teacher-card-top-header">
                <div>
                  <h2 className="teacher-stat-percent">94%</h2>
                  <p className="teacher-stat-sub">
                    Of students achieved A+ & Medical selection through guided learning
                  </p>
                </div>
                <Link to="/about" className="teacher-arrow-btn" aria-label="About Teacher">
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <div className="teacher-card-portrait-frame">
                <img 
                  src="/assets/hero/teacher_afroza_card.jpg" 
                  alt={teacher.name} 
                  className="teacher-portrait-img" 
                />
              </div>

              <div className="teacher-card-footer">
                <div className="teacher-name-title">{teacher.name}</div>
                <div className="teacher-exp-tag">{teacher.experience} Experience</div>
              </div>
            </div>
          </div>

          {/* ============================================================
              CENTER COLUMN: Smiling Student Portrait & Overlapping White Card (No background / No box / No card)
             ============================================================ */}
          <div className="ref-hero-center-col">
            {/* Center Student Main Visual - Pure transparent cutout */}
            <div className="center-student-frame">
              <img 
                src="/assets/hero/hero_student_transparent.png" 
                alt="Bio Edge Student" 
                className="center-student-img"
              />
              <div className="student-ambient-glow"></div>
            </div>

            {/* Overlapping White Bottom Card from Reference */}
            <div className="ref-bottom-white-card">
              <div className="card-left-action">
                <h3 className="card-cta-headline">
                  Ready To Develop Your Biology Edge?
                </h3>
                <Link to="/enroll" className="btn-dark-pill">
                  Start now
                </Link>
              </div>

              <div className="card-right-step">
                <span className="step-tag-pill">/ Step 1 /</span>
                <p className="step-desc-text">
                  Follow our guided intensive classes and start your journey toward Board GPA 5.0 and top Medical rank today.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: Big Headline & Interactive Video Demo
             ============================================================ */}
          <div className="ref-hero-right-col">
            {/* Massive Modern Bold Display Typography */}
            <div className="ref-hero-typography">
              <h1 className="hero-display-line">SMART</h1>
              <h1 className="hero-display-line">LEARNING</h1>
              <h1 className="hero-display-line">BIOLOGY</h1>
              <h1 className="hero-display-line glow-accent">FUTURE</h1>
            </div>

            {/* Video Demo Action Block at Bottom Right */}
            <div className="ref-video-demo-block">
              <div className="video-trigger-row">
                <button 
                  type="button"
                  className="btn-circle-play"
                  onClick={() => setShowDemoVideo(true)}
                  aria-label="Play Biology Demo Class"
                >
                  <Play size={18} fill="#FFFFFF" />
                </button>
                <div className="video-avatar-badge">
                  <img 
                    src="/assets/hero/teacher_afroza_card.jpg" 
                    alt="Instructor" 
                    className="video-instructor-thumb" 
                  />
                </div>
              </div>

              <p className="video-demo-caption">
                Improve Real-World Exam Skills <strong>Through Diagram Analysis</strong> And Guided CQ Instruction
              </p>

              <button 
                type="button"
                className="btn-view-demo-link"
                onClick={() => setShowDemoVideo(true)}
              >
                VIEW DEMO CLASS <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Video Demo Modal */}
      {showDemoVideo && (
        <div className="modal-backdrop-blur" onClick={() => setShowDemoVideo(false)}>
          <div className="demo-video-modal bio-clay-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn"
              onClick={() => setShowDemoVideo(false)}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            <div className="demo-modal-header">
              <span className="badge badge-green">Live Masterclass Preview</span>
              <h3>Cell Structure & Fluid Mosaic Membrane Analysis</h3>
              <p>Faculty: Afroza Tahmina • 4-Mark CQ Diagram Technique Breakdown</p>
            </div>

            <div className="demo-video-player-container">
              <iframe
                className="demo-video-iframe"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Afroza Tahmina Biology Masterclass"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="demo-modal-actions">
              <div className="demo-seats-note">
                <span className="live-dot"></span> Only {availableSeats} seats remaining in upcoming batch
              </div>
              <Link 
                to="/enroll" 
                className="btn btn-primary"
                onClick={() => setShowDemoVideo(false)}
              >
                Enroll in Full 48-Class Course <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
