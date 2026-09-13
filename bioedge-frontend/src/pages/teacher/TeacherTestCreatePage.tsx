import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { FileCheck2, Plus, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const TeacherTestCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { addTest, papers } = useCourseData();

  const [formData, setFormData] = useState({
    title: '',
    paper: 'Biology First Paper',
    category: 'Chapter Practice' as 'Chapter Practice' | 'CQ/SQ Practice' | 'Full Syllabus Model Tests',
    chapterName: 'Chapter 05: Algae and Fungi',
    durationMinutes: 20,
    totalQuestions: 15,
    totalMarks: 15,
    type: 'MCQ' as 'MCQ' | 'CQ' | 'Model Test'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTest({
      ...formData,
      durationMinutes: Number(formData.durationMinutes),
      totalQuestions: Number(formData.totalQuestions),
      totalMarks: Number(formData.totalMarks),
      questions: [
        {
          id: `q-${Date.now()}-1`,
          question: "Which feature distinguishes Spirogyra chloroplasts from other Chlorophyta?",
          options: [
            "Spiral ribbon-shaped chloroplast with pyrenoids",
            "Cup-shaped chloroplast",
            "Discoid thylakoid stacks",
            "Reticulate network chloroplast"
          ],
          correctAnswer: 0,
          explanation: "Spirogyra possesses distinct spiral ribbon-like chloroplasts embedded with numerous proteinaceous pyrenoids for starch synthesis.",
          marks: 1
        },
        {
          id: `q-${Date.now()}-2`,
          question: "What type of sexual reproduction occurs in Spirogyra via lateral or scalariform conjugation tubes?",
          options: [
            "Isogamous conjugation",
            "Anisogamous aplanospore",
            "Oogamous archegonia",
            "Zoospore flagellation"
          ],
          correctAnswer: 0,
          explanation: "Spirogyra undergoes physiological anisogamy/morphological isogamy by forming scalariform conjugation bridges between adjacent filaments.",
          marks: 1
        }
      ]
    });

    alert('Assessment created and published to Student Practice portal!');
    navigate('/teacher/tests');
  };

  return (
    <div className="teacher-test-create-page">
      <div className="back-btn-row">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} /> Back to Tests
        </button>
      </div>

      <div className="create-test-card bio-card">
        <div className="card-top-head">
          <span className="badge badge-amber">Assessment Creator</span>
          <h1 className="create-title">Create New Biology Test</h1>
          <p className="create-sub">Configure test metadata, timer limits, marks, and associated syllabus chapters.</p>
        </div>

        <form onSubmit={handleSubmit} className="create-test-form">
          <div className="form-group">
            <label className="form-label">Test Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 05 Intensive MCQ: Algae, Fungi & Lichens"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Paper *</label>
              <select
                value={formData.paper}
                onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
                className="form-select"
              >
                <option value="Biology First Paper">Biology First Paper</option>
                <option value="Biology Second Paper">Biology Second Paper</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assessment Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Chapter Practice' | 'CQ/SQ Practice' | 'Full Syllabus Model Tests' })}
                className="form-select"
              >
                <option value="Chapter Practice">Chapter Practice</option>
                <option value="CQ/SQ Practice">CQ/SQ Practice</option>
                <option value="Full Syllabus Model Tests">Full Syllabus Model Tests</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Associated Chapter Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 05: Algae and Fungi"
              value={formData.chapterName}
              onChange={(e) => setFormData({ ...formData, chapterName: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Duration (Minutes)</label>
              <input
                type="number"
                min="5"
                max="180"
                required
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Questions</label>
              <input
                type="number"
                min="1"
                required
                value={formData.totalQuestions}
                onChange={(e) => setFormData({ ...formData, totalQuestions: Number(e.target.value) })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Marks</label>
              <input
                type="number"
                min="1"
                required
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions-row mt-4">
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              <Plus size={18} /> Publish Assessment to Students
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .teacher-test-create-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .create-test-card {
          padding: 3rem;
        }
        .card-top-head {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .create-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .create-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        .mt-4 {
          margin-top: 2rem;
        }
        @media (max-width: 768px) {
          .create-test-card {
            padding: 1.5rem;
          }
          .form-row-2, .form-row-3 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .create-test-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
