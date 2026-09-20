import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../../components/common/Modal';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Layers,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const TeacherChaptersPage: React.FC = () => {
  const { 
    papers, 
    addChapter, 
    updateChapter, 
    deleteChapter, 
    addTopic 
  } = useCourseData();
  const { isBangla, toBnNum } = useLanguage();

  const [activePaperId, setActivePaperId] = useState<string>('first-paper');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newChapterName, setNewChapterName] = useState<string>('');
  const [newChapterDesc, setNewChapterDesc] = useState<string>('');
  const [topicInput, setTopicInput] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const activePaper = papers.find(p => p.id === activePaperId) || papers[0];

  const handleAddChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterName.trim()) return;

    addChapter(activePaperId, {
      name: newChapterName,
      description: newChapterDesc,
      topics: [
        { id: `t-${Date.now()}-1`, title: "Fundamental Concepts & Definitions", status: "Not Started" },
        { id: `t-${Date.now()}-2`, title: "Detailed Mechanism & Diagram Analysis", status: "Not Started" }
      ]
    });

    setNewChapterName('');
    setNewChapterDesc('');
    setIsAddModalOpen(false);
  };

  const handleAddTopicToChapter = (chapterId: string) => {
    if (!topicInput.trim()) return;
    addTopic(activePaperId, chapterId, topicInput);
    setTopicInput('');
    setSelectedChapterId(null);
  };

  return (
    <div className="teacher-chapters-page">
      {/* Header */}
      <div className="chapters-admin-header bio-card">
        <div>
          <span className="badge badge-amber">Curriculum Architecture</span>
          <h1 className="admin-ch-title">Curriculum Chapters & Topics</h1>
          <p className="admin-ch-sub">
            Add, update, or reorganize chapters and topics for First Paper and Second Paper.
          </p>
        </div>

        <div className="admin-ch-actions">
          <div className="paper-switcher-btn-group">
            {papers.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePaperId(p.id)}
                className={`paper-tab-select-btn ${activePaperId === p.id ? 'active' : ''}`}
              >
                <BookOpen size={16} />
                <span>{p.name}</span>
              </button>
            ))}
          </div>

          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add New Chapter
          </button>
        </div>
      </div>

      {/* Chapters Accordion / List */}
      <div className="chapters-admin-list">
        {activePaper.chapters.map((ch) => (
          <div key={ch.id} className="chapter-admin-card bio-card">
            <div className="ch-admin-top">
              <div className="ch-admin-meta">
                <span className="ch-badge">{isBangla ? `অধ্যায় ${ch.numberBn || toBnNum(parseInt(ch.number, 10))}` : `Chapter ${ch.number}`}</span>
                <h3 className="ch-admin-title">{isBangla ? (ch.nameBn || ch.name) : (ch.nameEn || ch.name)}</h3>
              </div>

              <div className="ch-admin-actions">
                <button
                  onClick={() => {
                    const newName = prompt('Update Chapter Name:', ch.nameBn || ch.name);
                    if (newName) updateChapter(activePaperId, ch.id, { name: newName, nameBn: newName });
                  }}
                  className="btn btn-ghost btn-sm"
                  title="Rename Chapter"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(isBangla ? `অধ্যায় ${ch.numberBn || toBnNum(parseInt(ch.number, 10))}: ${ch.nameBn || ch.name} মুছে ফেলবেন?` : `Delete Chapter ${ch.number}: ${ch.name}?`)) {
                      deleteChapter(activePaperId, ch.id);
                    }
                  }}
                  className="btn btn-ghost btn-sm delete-btn"
                  title="Delete Chapter"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Topics inside Chapter */}
            <div className="ch-admin-topics-block">
              <h4 className="topics-subheading">Curriculum Topics ({(ch.topics || []).length}):</h4>
              <div className="admin-topics-list">
                {(ch.topics || []).map((topic, tIdx) => (
                  <div key={topic.id || tIdx} className="admin-topic-row">
                    <span className="topic-dot"></span>
                    <span className="admin-topic-name">{topic.title}</span>
                    <span className={`badge ${topic.status === 'Completed' ? 'badge-green' : 'badge-gray'} ml-auto`}>
                      {topic.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add Topic Inline Row */}
              <div className="add-topic-inline-row">
                <input
                  type="text"
                  placeholder="Add new topic to this chapter..."
                  value={selectedChapterId === ch.id ? topicInput : ''}
                  onFocus={() => setSelectedChapterId(ch.id)}
                  onChange={(e) => {
                    setSelectedChapterId(ch.id);
                    setTopicInput(e.target.value);
                  }}
                  className="form-input add-topic-input"
                />
                <button
                  onClick={() => handleAddTopicToChapter(ch.id)}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={15} /> Add Topic
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Chapter Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add Chapter to ${activePaper.name}`}
        subtitle="Specify the chapter name and syllabus details."
      >
        <form onSubmit={handleAddChapterSubmit}>
          <div className="form-group">
            <label className="form-label">Chapter Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Molecular Genetics & Transcription"
              value={newChapterName}
              onChange={(e) => setNewChapterName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Scope</label>
            <textarea
              rows={3}
              placeholder="Brief summary of topics covered in this chapter..."
              value={newChapterDesc}
              onChange={(e) => setNewChapterDesc(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
            <Plus size={18} /> Create Chapter
          </button>
        </form>
      </Modal>

      <style>{`
        .teacher-chapters-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .chapters-admin-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .admin-ch-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .admin-ch-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .admin-ch-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .paper-switcher-btn-group {
          display: flex;
          gap: 0.5rem;
        }
        .paper-tab-select-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .paper-tab-select-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .chapters-admin-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .chapter-admin-card {
          padding: 1.75rem;
        }
        .ch-admin-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .ch-admin-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ch-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .ch-admin-title {
          font-size: 1.2rem;
          color: var(--dark-green);
        }
        .ch-admin-actions {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .delete-btn {
          color: var(--error);
        }
        .delete-btn:hover {
          background: var(--error-bg);
        }

        .topics-subheading {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }
        .admin-topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .admin-topic-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 0.85rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
        }
        .topic-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary-green);
        }
        .ml-auto {
          margin-left: auto;
        }

        .add-topic-inline-row {
          display: flex;
          gap: 0.75rem;
        }
        .add-topic-input {
          flex: 1;
          padding: 0.5rem 0.85rem;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .chapters-admin-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem 1rem;
          }
          .admin-ch-actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
          .paper-switcher-btn-group {
            width: 100%;
          }
          .paper-tab-select-btn {
            flex: 1;
            justify-content: center;
          }
          .ch-admin-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .chapter-admin-card {
            padding: 1.25rem 1rem;
          }
          .add-topic-inline-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
