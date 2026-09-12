import React from 'react';
import { Award, Star, CheckCircle, Sparkles } from 'lucide-react';

interface StudentAchiever {
  id: string;
  name: string;
  college: string;
  target: string;
  rankBadge: string;
  hscResult: string;
  color: string;
  avatarBg: string;
  initials: string;
  quote: string;
}

const ACHIEVERS: StudentAchiever[] = [
  {
    id: 's1',
    name: 'Tanvir Ahmed',
    college: 'Notre Dame College',
    target: 'DMC (Dhaka Medical College)',
    rankBadge: 'DMC Rank 42',
    hscResult: 'Biology 98/100 (GPA 5.0)',
    color: '#10B981',
    avatarBg: 'linear-gradient(135deg, #10B981, #059669)',
    initials: 'TA',
    quote: 'Afroza Ma’am taught me how to structure 4-mark CQs with flawless labeled diagrams.',
  },
  {
    id: 's2',
    name: 'Nusrat Jahan',
    college: 'Viqarunnisa Noon School & College',
    target: 'SSMC (Sir Salimullah Medical)',
    rankBadge: 'SSMC Merit 18',
    hscResult: 'Biology 97/100 (GPA 5.0)',
    color: '#3B82F6',
    avatarBg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    initials: 'NJ',
    quote: 'Daily 25-MCQ mock tests removed all negative marking fears before the final board exam.',
  },
  {
    id: 's3',
    name: 'Farhan Kabir',
    college: 'Dhaka City College',
    target: 'BUET (Biomedical Eng.)',
    rankBadge: 'BUET BME Rank 11',
    hscResult: 'Biology 99/100 (GPA 5.0)',
    color: '#8B5CF6',
    avatarBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    initials: 'FK',
    quote: 'The 3D concept breakdowns for cell metabolism and genetics were unforgettable.',
  },
  {
    id: 's4',
    name: 'Sumaiya Akter',
    college: 'Holy Cross College',
    target: 'Shaheed Suhrawardy Medical',
    rankBadge: 'ShSMC Rank 29',
    hscResult: 'Biology 96/100 (GPA 5.0)',
    color: '#EC4899',
    avatarBg: 'linear-gradient(135deg, #EC4899, #DB2777)',
    initials: 'SA',
    quote: 'Only 20 students per batch meant Ma’am personally checked every single written CQ sheet.',
  },
  {
    id: 's5',
    name: 'Abrar Hasan',
    college: 'Rajuk Uttara Model College',
    target: 'Chittagong Medical College',
    rankBadge: 'CMC Rank 54',
    hscResult: 'Biology 98/100 (GPA 5.0)',
    color: '#F59E0B',
    avatarBg: 'linear-gradient(135deg, #F59E0B, #D97706)',
    initials: 'AH',
    quote: 'I went from scoring 65% in college pre-tests to an A+ in the final HSC Board examination.',
  },
  {
    id: 's6',
    name: 'Maliha Rahman',
    college: 'Ideal School & College',
    target: 'Dhaka Medical College',
    rankBadge: 'DMC Rank 89',
    hscResult: 'Biology 97/100 (GPA 5.0)',
    color: '#14B8A6',
    avatarBg: 'linear-gradient(135deg, #14B8A6, #0D9488)',
    initials: 'MR',
    quote: 'Afroza Ma’am’s chapter-wise lecture booklets are the gold standard for HSC Biology.',
  },
];

export const CurvedAvatarMarquee: React.FC = () => {
  return (
    <section className="curved-community-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="inline-floating-badge">
            <Sparkles size={16} />
            <span>Success Stories & Alumni</span>
          </div>
          <h2 className="section-title">
            You will find yourself among our top achievers.
          </h2>
          <p className="section-subtitle">
            Over 94% of our enrolled students secured GPA 5.0 in HSC Biology, with top ranks in Medical & Engineering admissions.
          </p>
        </div>

        {/* Curved Floating Cards Grid */}
        <div className="curved-avatar-stage">
          <div className="curved-cards-grid">
            {ACHIEVERS.map((student, idx) => (
              <div 
                key={student.id} 
                className={`curved-student-tile bio-clay-card tile-pos-${idx}`}
              >
                <div className="tile-top-row">
                  <div className="student-avatar-orb" style={{ background: student.avatarBg }}>
                    {student.initials}
                  </div>
                  <div className="student-badge-pill" style={{ borderColor: student.color, color: student.color }}>
                    <Award size={12} /> {student.rankBadge}
                  </div>
                </div>

                <div className="student-info-body">
                  <h4 className="student-name">{student.name}</h4>
                  <p className="student-college">{student.college}</p>
                  <p className="student-quote">"{student.quote}"</p>
                </div>

                <div className="tile-footer-score">
                  <span className="score-badge">
                    <CheckCircle size={14} className="text-emerald" /> {student.hscResult}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
