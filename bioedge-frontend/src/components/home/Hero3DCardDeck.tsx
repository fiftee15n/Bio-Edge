import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface CardItem {
  id: string;
  title: string;
  paper: 'Paper 1 (Botany)' | 'Paper 2 (Zoology)' | '১ম পত্র (উদ্ভিদবিজ্ঞান)' | '২য় পত্র (প্রাণিবিজ্ঞান)';
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

const CARDS_DATA_BN: CardItem[] = [
  {
    id: 'heart',
    title: 'মানব রক্ত ও সংবহনতন্ত্র',
    paper: '২য় পত্র (প্রাণিবিজ্ঞান)',
    chapter: 'অধ্যায় ৪ • মানব শারীরতত্ত্ব: রক্ত ও সংবহন',
    tag: '@zoology_heart',
    tagColor: '#EF4444',
    image: '/assets/3d/bio_heart_3d.jpg',
    description: 'কার্ডিয়াক চক্র, হৃদপিণ্ডের সংবহনতন্ত্র, করোনারি সংবহন, রক্তচাপ নিয়ন্ত্রণ এবং পেসমেকার মেকানিজম।',
    cqHotspots: ['কার্ডিয়াক চক্রের সময়রেখা ও চাপ', 'এসএ নোড থেকে পুরকিঞ্জি ফাইবার', 'করোনারি এনজিওপ্লাস্টি ও বাইপাস সার্জারি'],
    boardWeightage: 'বোর্ড পরীক্ষায় ১৫ নম্বর',
  },
  {
    id: 'microscope',
    title: 'জীবপ্রযুক্তি ও ল্যাবরেটরি',
    paper: '১ম পত্র (উদ্ভিদবিজ্ঞান)',
    chapter: 'অধ্যায় ১১ • জীবপ্রযুক্তি',
    tag: '@cq_topper',
    tagColor: '#F59E0B',
    image: '/assets/3d/bio_microscope_3d.jpg',
    description: 'রিকম্বিনেন্ট ডিএনএ প্রযুক্তি, টিস্যু কালচার, প্লাজমিড ভেক্টর, পিসিআর পদ্ধতি ও ব্যবহারিক স্লাইড প্রস্তুতি।',
    cqHotspots: ['রিকম্বিনেন্ট ডিএনএ তৈরির ধাপসমূহ', 'টিস্যু কালচার এক্সপ্লান্ট কালচার', 'প্লাজমিড pBR322 ভেক্টর বৈশিষ্ট্য'],
    boardWeightage: 'বোর্ড পরীক্ষায় ১০-১২ নম্বর',
  },
  {
    id: 'cell',
    title: 'উদ্ভিদ কোষ ও কোষীয় অঙ্গাণু',
    paper: '১ম পত্র (উদ্ভিদবিজ্ঞান)',
    chapter: 'অধ্যায় ১ • কোষ ও এর গঠন',
    tag: '@botany_core',
    tagColor: '#10B981',
    image: '/assets/3d/bio_cell_3d.jpg',
    description: 'ক্লোরোপ্লাস্ট, মাইটোকন্ড্রিয়া, ফ্লুইড মোজাইক ঝিল্লি মডেল এবং কোষ প্রাচীরের রাসায়নিক গঠনের ত্রিমাত্রিক চিত্র।',
    cqHotspots: ['ফ্লুইড মোজাইক মেমব্রেন মডেল', 'ক্লোরোপ্লাস্ট থাইলাকয়েড ও স্ট্রোমা', 'মাইটোকন্ড্রিয়া ক্রিস্টি ও এটিপি সিন্থেসিস'],
    boardWeightage: 'বোর্ড পরীক্ষায় ১৫ নম্বর',
  },
  {
    id: 'genetics',
    title: 'আণবিক বংশগতি ও ডিএনএ',
    paper: '১ম পত্র (উদ্ভিদবিজ্ঞান)',
    chapter: 'অধ্যায় ৮ • কোষ রসায়ন ও বংশগতি',
    tag: '@genetics_mastery',
    tagColor: '#3B82F6',
    image: '/assets/3d/bio_dna_3d.jpg',
    description: 'ডিএনএ অনুলিপন, ট্রান্সক্রিপশন, ট্রান্সলেশন এবং ওয়াটসন-ক্রিক দ্বি-সূত্রক ডিএনএ মডেলের সম্পূর্ণ সিকিউ বিশ্লেষণ।',
    cqHotspots: ['ওয়াটসন-ক্রিক ডাবল হেলিক্স গঠন', 'অর্ধ-রক্ষণশীল ডিএনএ অনুলিপন পদ্ধতি', 'টি-আরএনএ ক্লোভার লিফ মডেল'],
    boardWeightage: 'বোর্ড পরীক্ষায় ১২-১৪ নম্বর',
  },
];

export const Hero3DCardDeck: React.FC = () => {
  const { isBangla } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'botany' | 'zoology'>('all');
  
  // Drag & Swipe physics state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const currentCards = isBangla ? CARDS_DATA_BN : CARDS_DATA;

  const filteredCards = currentCards.filter(c => {
    if (activeFilter === 'botany') return c.paper.includes('Botany') || c.paper.includes('উদ্ভিদবিজ্ঞান');
    if (activeFilter === 'zoology') return c.paper.includes('Zoology') || c.paper.includes('প্রাণিবিজ্ঞান');
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
  }, [selectedCard, totalCards]);

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
            {isBangla ? 'সব অধ্যায়' : 'All 3D Modules'}
          </button>
          <button 
            type="button"
            className={`segmented-pill ${activeFilter === 'botany' ? 'active' : ''}`}
            onClick={() => setActiveFilter('botany')}
          >
            {isBangla ? '🌿 ১ম পত্র (উদ্ভিদবিজ্ঞান)' : '🌿 Botany (Paper 1)'}
          </button>
          <button 
            type="button"
            className={`segmented-pill ${activeFilter === 'zoology' ? 'active' : ''}`}
            onClick={() => setActiveFilter('zoology')}
          >
            {isBangla ? '🫀 ২য় পত্র (প্রাণিবিজ্ঞান)' : '🫀 Zoology (Paper 2)'}
          </button>
        </div>
      </div>

      {/* 3D Stage */}
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

      {/* Interactive Swap Controls: Icon-only buttons with pagination dots */}
      <div className="deck-swap-toolbar">
        <button
          type="button"
          onClick={handlePrev}
          className="btn-swap-circle-icon"
          aria-label="Previous Concept"
          title="Swap Left"
        >
          <ChevronLeft size={20} />
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
          className="btn-swap-circle-icon"
          aria-label="Next Concept"
          title="Swap Right"
        >
          <ChevronRight size={20} />
        </button>
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
                  <h4>{isBangla ? 'গুরুত্বপূর্ণ সিকিউ (CQ) হটস্পটসমূহ:' : 'Key High-Yield CQ Topics (Board & Medical):'}</h4>
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
                    {isBangla ? 'সম্পূর্ণ সিলেবাস দেখুন' : 'View Full Syllabus'} <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/enroll" 
                    className="btn btn-secondary"
                    onClick={() => setSelectedCard(null)}
                  >
                    {isBangla ? 'ভর্তি হোন' : 'Enroll in Batch'}
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

        .active-card-glow {
          box-shadow: 0 24px 48px -12px rgba(49, 91, 61, 0.28), 0 0 0 1.5px rgba(49, 91, 61, 0.12);
        }

        .deck-swap-toolbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .btn-swap-circle-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          color: var(--dark-green);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.9, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .btn-swap-circle-icon:hover {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(49, 91, 61, 0.25);
        }

        .btn-swap-circle-icon:active {
          transform: scale(0.96);
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

        @media (max-width: 640px) {
          .deck-3d-stage {
            min-height: 310px;
          }
          .deck-cards-fan {
            height: 290px;
            max-width: 100%;
          }
          .deck-3d-card-wrapper {
            width: 205px !important;
            height: 285px !important;
          }
          .card-image-box {
            height: 145px !important;
          }
          .card-item-title {
            font-size: 0.88rem !important;
          }
          .card-item-chapter {
            font-size: 0.72rem !important;
          }
          .floating-3d-speech-bubble {
            top: -24px !important;
            font-size: 0.65rem !important;
            padding: 0.22rem 0.55rem !important;
          }
          .deck-swap-toolbar {
            margin-top: 1rem;
          }
        }

        @media (max-width: 768px) {
          .modal-3d-dialog {
            width: 95vw !important;
            max-height: 88vh !important;
            overflow-y: auto !important;
            padding: 1.25rem 1rem !important;
          }
          .modal-3d-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .modal-3d-actions .btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 400px) {
          .deck-3d-card-wrapper {
            width: 180px !important;
            height: 265px !important;
          }
          .card-image-box {
            height: 130px !important;
          }
        }
      `}</style>
    </div>
  );
};
