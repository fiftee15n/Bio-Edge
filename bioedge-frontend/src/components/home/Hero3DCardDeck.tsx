import React, { useState } from 'react';
import { Sparkles, Eye, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardItem {
  id: string;
  title: string;
  paper: 'Paper 1 (Botany)' | 'Paper 2 (Zoology)';
  chapter: string;
  tag: string;
  tagColor: string;
  tagPosition: { top: string; left: string };
  image: string;
  description: string;
  cqHotspots: string[];
  boardWeightage: string;
  fanRotation: number;
  fanTranslateY: number;
  fanTranslateX: number;
}

const CARDS_DATA: CardItem[] = [
  {
    id: 'genetics',
    title: 'Molecular Genetics & DNA',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 8 • Cell Chemistry & Genetics',
    tag: '@genetics_mastery',
    tagColor: '#3B82F6', // Vibrant Blue
    tagPosition: { top: '-28px', left: '10%' },
    image: '/assets/3d/bio_dna_3d.jpg',
    description: 'Master DNA replication, transcription, translation & Watson-Crick double helix models with full CQ marks guarantee.',
    cqHotspots: ['Watson-Crick Double Helix Structure', 'Semi-conservative DNA Replication', 'tRNA cloverleaf model'],
    boardWeightage: '12-14 Marks in Board Exam',
    fanRotation: -14,
    fanTranslateY: 28,
    fanTranslateX: -40,
  },
  {
    id: 'cell',
    title: 'Plant Cell & Organelles',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 1 • Cell & Structure',
    tag: '@botany_core',
    tagColor: '#10B981', // Emerald
    tagPosition: { top: '-36px', left: '45%' },
    image: '/assets/3d/bio_cell_3d.jpg',
    description: 'Detailed 3D cross-sections of chloroplasts, mitochondria, fluid mosaic membrane model and cell wall biochemistry.',
    cqHotspots: ['Fluid Mosaic Membrane Model', 'Chloroplast Thylakoid Stroma', 'Mitochondria Cristae ATP synthesis'],
    boardWeightage: '15 Marks in Board Exam',
    fanRotation: -6,
    fanTranslateY: 6,
    fanTranslateX: -15,
  },
  {
    id: 'microscope',
    title: 'Biotechnology & Practical Lab',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 11 • Biotechnology & Lab',
    tag: '@cq_topper',
    tagColor: '#F59E0B', // Amber Gold
    tagPosition: { top: '-30px', left: '30%' },
    image: '/assets/3d/bio_microscope_3d.jpg',
    description: 'Recombinant DNA technology, tissue culture, plasmid vectors, PCR protocols and practical lab slide preparation.',
    cqHotspots: ['Recombinant DNA Steps & Restriction Enzymes', 'Tissue Culture Explant Culture', 'Plasmid pBR322 vector'],
    boardWeightage: '10-12 Marks in Board Exam',
    fanRotation: 6,
    fanTranslateY: 8,
    fanTranslateX: 15,
  },
  {
    id: 'heart',
    title: 'Human Cardiovascular System',
    paper: 'Paper 2 (Zoology)',
    chapter: 'Chapter 4 • Human Physiology: Circulation',
    tag: '@zoology_heart',
    tagColor: '#EF4444', // Coral Red
    tagPosition: { top: '-32px', left: '60%' },
    image: '/assets/3d/bio_heart_3d.jpg',
    description: 'Cardiac cycle, conductive system of heart, coronary circulation, blood pressure regulation & pacemaker mechanisms.',
    cqHotspots: ['Cardiac Cycle Timing & Pressure Curve', 'SA Node to Purkinje Fibers', 'Coronary Angioplasty & Bypass'],
    boardWeightage: '15 Marks in Board Exam',
    fanRotation: 15,
    fanTranslateY: 30,
    fanTranslateX: 40,
  },
];

export const Hero3DCardDeck: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>('cell');
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'botany' | 'zoology'>('all');

  const filteredCards = CARDS_DATA.filter(c => {
    if (activeFilter === 'botany') return c.paper.includes('Botany');
    if (activeFilter === 'zoology') return c.paper.includes('Zoology');
    return true;
  });

  return (
    <div className="hero-3d-deck-container">
      {/* Interactive Filter Pills Inspired by Pinterest Segmented Controls */}
      <div className="deck-controls-row">
        <div className="segmented-pill-group">
          <button 
            type="button"
            className={`segmented-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All 3D Modules
          </button>
          <button 
            type="button"
            className={`segmented-pill ${activeFilter === 'botany' ? 'active' : ''}`}
            onClick={() => setActiveFilter('botany')}
          >
            🌿 Botany (Paper 1)
          </button>
          <button 
            type="button"
            className={`segmented-pill ${activeFilter === 'zoology' ? 'active' : ''}`}
            onClick={() => setActiveFilter('zoology')}
          >
            🫀 Zoology (Paper 2)
          </button>
        </div>
      </div>

      {/* 3D Fan Stage */}
      <div className="deck-3d-stage">
        <div className="deck-cards-fan">
          {filteredCards.map((card, idx) => {
            const isHovered = hoveredCardId === card.id;
            
            // Calculate 3D transformation
            let rotateZ = card.fanRotation;
            let translateY = card.fanTranslateY;
            let scale = 1;
            let zIndex = 5 + idx;

            if (isHovered) {
              rotateZ = 0;
              translateY = -24;
              scale = 1.08;
              zIndex = 25;
            } else if (hoveredCardId !== null) {
              // Dim / spread out slightly when another card is hovered
              scale = 0.95;
            }

            return (
              <div
                key={card.id}
                className={`deck-3d-card-wrapper ${isHovered ? 'is-active' : ''}`}
                style={{
                  transform: `translateX(${card.fanTranslateX}px) translateY(${translateY}px) rotate(${rotateZ}deg) scale(${scale})`,
                  zIndex: zIndex,
                }}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => setSelectedCard(card)}
              >
                {/* 3D Floating Speech Bubble / Tag Badge */}
                <div 
                  className="floating-3d-speech-bubble"
                  style={{
                    backgroundColor: card.tagColor,
                    transform: isHovered ? 'translateY(-8px) scale(1.1)' : 'translateY(0) scale(1)',
                  }}
                >
                  <span>{card.tag}</span>
                  <div className="speech-bubble-tail" style={{ borderTopColor: card.tagColor }}></div>
                </div>

                {/* Card Face */}
                <div className="deck-card-inner bio-clay-card">
                  <div className="card-image-box">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="card-3d-img"
                      loading="eager"
                    />
                    <div className="card-overlay-badge">
                      <span>{card.paper}</span>
                    </div>
                  </div>

                  <div className="card-info-box">
                    <h4 className="card-item-title">{card.title}</h4>
                    <p className="card-item-chapter">{card.chapter}</p>
                    
                    <div className="card-quick-footer">
                      <span className="weightage-pill">{card.boardWeightage}</span>
                      <button 
                        type="button" 
                        className="btn-quick-preview"
                        aria-label="Inspect 3D Chapter"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter 3D Inspection Modal */}
      {selectedCard && (
        <div className="modal-backdrop-blur" onClick={() => setSelectedCard(null)}>
          <div className="modal-3d-dialog bio-clay-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedCard(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-3d-grid">
              <div className="modal-3d-preview-col">
                <img 
                  src={selectedCard.image} 
                  alt={selectedCard.title} 
                  className="modal-hero-3d-img"
                />
                <div className="floating-preview-tag" style={{ backgroundColor: selectedCard.tagColor }}>
                  <Sparkles size={14} /> {selectedCard.tag}
                </div>
              </div>

              <div className="modal-3d-content-col">
                <span className="badge badge-green">{selectedCard.paper}</span>
                <h3 className="modal-3d-title">{selectedCard.title}</h3>
                <p className="modal-3d-chapter">{selectedCard.chapter}</p>
                <p className="modal-3d-desc">{selectedCard.description}</p>

                <div className="cq-hotspots-box">
                  <h4>Key High-Yield CQ Topics (Board & Medical):</h4>
                  <ul>
                    {selectedCard.cqHotspots.map((topic, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="text-emerald" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-3d-actions">
                  <Link 
                    to="/program" 
                    className="btn btn-primary"
                    onClick={() => setSelectedCard(null)}
                  >
                    View Full Syllabus <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/enroll" 
                    className="btn btn-secondary"
                    onClick={() => setSelectedCard(null)}
                  >
                    Enroll in Batch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
