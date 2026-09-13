import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardItem {
  id: string;
  title: string;
  paper: 'Paper 1 (Botany)' | 'Paper 2 (Zoology)';
  chapter: string;
  tag: string;
  tagColor: string;
  image: string;
  description: string;
  cqHotspots: string[];
  boardWeightage: string;
}

const CARDS_DATA: CardItem[] = [
  {
    id: 'heart',
    title: 'Human Cardiovascular System',
    paper: 'Paper 2 (Zoology)',
    chapter: 'Chapter 4 • Human Physiology: Circulation',
    tag: '@zoology_heart',
    tagColor: '#EF4444', // Coral Red
    image: '/assets/3d/bio_heart_3d.jpg',
    description: 'Cardiac cycle, conductive system of heart, coronary circulation, blood pressure regulation & pacemaker mechanisms.',
    cqHotspots: ['Cardiac Cycle Timing & Pressure Curve', 'SA Node to Purkinje Fibers', 'Coronary Angioplasty & Bypass'],
    boardWeightage: '15 Marks in Board Exam',
  },
  {
    id: 'microscope',
    title: 'Biotechnology & Practical Lab',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 11 • Biotechnology & Lab',
    tag: '@cq_topper',
    tagColor: '#F59E0B', // Amber Gold
    image: '/assets/3d/bio_microscope_3d.jpg',
    description: 'Recombinant DNA technology, tissue culture, plasmid vectors, PCR protocols and practical lab slide preparation.',
    cqHotspots: ['Recombinant DNA Steps & Restriction Enzymes', 'Tissue Culture Explant Culture', 'Plasmid pBR322 vector'],
    boardWeightage: '10-12 Marks in Board Exam',
  },
  {
    id: 'cell',
    title: 'Plant Cell & Organelles',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 1 • Cell & Structure',
    tag: '@botany_core',
    tagColor: '#10B981', // Emerald
    image: '/assets/3d/bio_cell_3d.jpg',
    description: 'Detailed 3D cross-sections of chloroplasts, mitochondria, fluid mosaic membrane model and cell wall biochemistry.',
    cqHotspots: ['Fluid Mosaic Membrane Model', 'Chloroplast Thylakoid Stroma', 'Mitochondria Cristae ATP synthesis'],
    boardWeightage: '15 Marks in Board Exam',
  },
  {
    id: 'genetics',
    title: 'Molecular Genetics & DNA',
    paper: 'Paper 1 (Botany)',
    chapter: 'Chapter 8 • Cell Chemistry & Genetics',
    tag: '@genetics_mastery',
    tagColor: '#3B82F6', // Vibrant Blue
    image: '/assets/3d/bio_dna_3d.jpg',
    description: 'Master DNA replication, transcription, translation & Watson-Crick double helix models with full CQ marks guarantee.',
    cqHotspots: ['Watson-Crick Double Helix Structure', 'Semi-conservative DNA Replication', 'tRNA cloverleaf model'],
    boardWeightage: '12-14 Marks in Board Exam',
  },
];

export const Hero3DCardDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'botany' | 'zoology'>('all');
  
  // Drag & Swipe physics state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const filteredCards = CARDS_DATA.filter(c => {
    if (activeFilter === 'botany') return c.paper.includes('Botany');
    if (activeFilter === 'zoology') return c.paper.includes('Zoology');
    return true;
  });

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  const totalCards = filteredCards.length;

  const handleNext = () => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    if (totalCards <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragX(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -45) {
      handleNext();
    } else if (dragX > 45) {
      handlePrev();
    }
    setDragX(0);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragX(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    setDragX(currentX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -45) {
      handleNext();
    } else if (dragX > 45) {
      handlePrev();
    }
    setDragX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragX(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCard) return; // Don't swap if modal is open
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalCards, selectedCard]);

  const handleCardClick = (idx: number, card: CardItem) => {
    if (Math.abs(dragX) > 10) return; // User was dragging, not clicking
    if (idx === activeIndex) {
      setSelectedCard(card);
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <div className="hero-3d-deck-container" ref={deckRef}>
      {/* Interactive Filter Pills */}
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

      {/* 3D Stage with Side Swap Buttons */}
      <div 
        className="deck-3d-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Swap Button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="deck-swap-nav-btn deck-swap-left"
          aria-label="Swap Left"
          title="Swap Left (Previous Concept)"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Swap Button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="deck-swap-nav-btn deck-swap-right"
          aria-label="Swap Right"
          title="Swap Right (Next Concept)"
        >
          <ChevronRight size={22} />
        </button>

        {/* 3D Interactive Card Fan Stack */}
        <div className="deck-cards-fan">
          {filteredCards.map((card, idx) => {
            const isActive = idx === activeIndex;
            
            // Calculate relative offset from active index
            const diff = (idx - activeIndex + totalCards) % totalCards;
            
            let translateX = 0;
            let translateY = 0;
            let rotateZ = 0;
            let scale = 1;
            let zIndex = 10;
            let opacity = 1;

            if (diff === 0) {
              // Active Front Card
              translateX = isDragging ? dragX : 0;
              translateY = isDragging ? -14 : -10;
              rotateZ = isDragging ? dragX * 0.08 : 0;
              scale = 1.05;
              zIndex = 35;
              opacity = 1;
            } else if (diff === 1) {
              // First Card to the Right
              translateX = 60 + (isDragging ? dragX * 0.3 : 0);
              translateY = 14;
              rotateZ = 8;
              scale = 0.94;
              zIndex = 24;
              opacity = 0.95;
            } else if (diff === 2) {
              // Card behind in stack
              translateX = 110 + (isDragging ? dragX * 0.15 : 0);
              translateY = 28;
              rotateZ = 15;
              scale = 0.88;
              zIndex = 14;
              opacity = 0.85;
            } else {
              // Card to the Left (diff === 3 or diff === totalCards - 1)
              translateX = -60 + (isDragging ? dragX * 0.3 : 0);
              translateY = 14;
              rotateZ = -8;
              scale = 0.94;
              zIndex = 24;
              opacity = 0.95;
            }

            return (
              <div
                key={card.id}
                className={`deck-3d-card-wrapper ${isActive ? 'is-active-front' : 'is-stacked-card'}`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateZ}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.4s ease, box-shadow 0.4s ease',
                  cursor: isDragging ? 'grabbing' : 'pointer',
                }}
                onClick={() => handleCardClick(idx, card)}
              >
                {/* 3D Floating Speech Bubble / Tag Badge */}
                <div 
                  className="floating-3d-speech-bubble"
                  style={{
                    backgroundColor: card.tagColor,
                    transform: isActive ? 'translateY(-8px) scale(1.08)' : 'translateY(0) scale(0.95)',
                    opacity: isActive ? 1 : 0.85,
                  }}
                >
                  <span>{card.tag}</span>
                  <div className="speech-bubble-tail" style={{ borderTopColor: card.tagColor }}></div>
                </div>

                {/* Card Face */}
                <div className={`deck-card-inner bio-clay-card ${isActive ? 'active-card-glow' : ''}`}>
                  <div className="card-image-box">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="card-3d-img"
                      loading="eager"
                      draggable={false}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCard(card);
                        }}
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

      {/* Interactive Swap Controls & Pagination Dots */}
      <div className="deck-swap-toolbar">
        <button
          type="button"
          onClick={handlePrev}
          className="btn-swap-pill"
          aria-label="Previous Concept"
        >
          <ChevronLeft size={16} />
          <span>Swap Left</span>
        </button>

        <div className="deck-dots-indicator">
          {filteredCards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`deck-dot ${i === activeIndex ? 'active' : ''}`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="btn-swap-pill"
          aria-label="Next Concept"
        >
          <span>Swap Right</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="deck-hint-pill">
        <MoveHorizontal size={14} />
        <span>Swipe or click arrows to swap cards left & right • Click active card to inspect</span>
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

      <style>{`
        .deck-3d-stage {
          position: relative;
          user-select: none;
          touch-action: pan-y;
        }

        .deck-swap-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--dark-green);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.9, 0.3, 1);
          z-index: 50;
        }

        .deck-swap-nav-btn:hover {
          background: var(--dark-green);
          color: #FFFFFF;
          transform: translateY(-50%) scale(1.12);
          box-shadow: 0 14px 28px -4px rgba(49, 91, 61, 0.35);
        }

        .deck-swap-left {
          left: max(5%, 15px);
        }

        .deck-swap-right {
          right: max(5%, 15px);
        }

        .active-card-glow {
          box-shadow: 0 24px 48px -12px rgba(49, 91, 61, 0.28), 0 0 0 1.5px rgba(49, 91, 61, 0.12);
        }

        .deck-swap-toolbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .btn-swap-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.95rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--dark-green);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
        }

        .btn-swap-pill:hover {
          background: var(--light-green);
          border-color: var(--primary-green);
          transform: translateY(-1px);
        }

        .deck-dots-indicator {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .deck-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #CBD5E1;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .deck-dot.active {
          width: 24px;
          border-radius: var(--radius-full);
          background: var(--dark-green);
        }

        .deck-hint-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(49, 91, 61, 0.08);
          color: var(--dark-green);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          margin-top: 1rem;
        }

        @media (max-width: 640px) {
          .deck-swap-left {
            left: 2px;
          }
          .deck-swap-right {
            right: 2px;
          }
          .deck-swap-nav-btn {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
};
