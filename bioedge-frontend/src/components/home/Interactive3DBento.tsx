import React, { useState } from 'react';
import { 
  Activity, 
  Dna, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  HelpCircle,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Interactive3DBento: React.FC = () => {
  // Organelle click state
  const [activeOrganelle, setActiveOrganelle] = useState<{
    name: string;
    function: string;
    boardTip: string;
  }>({
    name: 'Chloroplast (হরিৎকণিকা)',
    function: 'Sites of photosynthesis containing thylakoid grana stacks (Light reaction) and stroma (Dark reaction Calvin cycle).',
    boardTip: 'Must draw grana, stroma lamellae and double membrane in CQ 4-mark questions.',
  });

  // DNA Matcher State
  const [selectedBase, setSelectedBase] = useState<'A' | 'T' | 'G' | 'C' | null>(null);
  const [dnaFeedback, setDnaFeedback] = useState<string>('Select a nitrogenous base to pair correctly according to Chargaff’s rule:');

  const handleBasePair = (base: 'A' | 'T' | 'G' | 'C') => {
    setSelectedBase(base);
    if (base === 'A') {
      setDnaFeedback('✅ Correct! Adenine (A) forms 2 Hydrogen bonds with Thymine (T). [A = T]');
    } else if (base === 'T') {
      setDnaFeedback('✅ Correct! Thymine (T) forms 2 Hydrogen bonds with Adenine (A). [T = A]');
    } else if (base === 'G') {
      setDnaFeedback('✅ Correct! Guanine (G) forms 3 Hydrogen bonds with Cytosine (C). [G ≡ C]');
    } else if (base === 'C') {
      setDnaFeedback('✅ Correct! Cytosine (C) forms 3 Hydrogen bonds with Guanine (G). [C ≡ G]');
    }
  };

  return (
    <section className="interactive-3d-bento-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="inline-floating-badge">
            <Sparkles size={16} />
            <span>Multi-Dimensional Biology</span>
          </div>
          <h2 className="section-title">
            Every biological concept tells a story.
          </h2>
          <p className="section-subtitle">
            Experience HSC Botany and Zoology through immersive 3D clay visual models, interactive simulations, and structured CQ breakdown.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-3d-grid">
          {/* Main Large Bento: 3D Plant Cell Explorer */}
          <div className="bento-card bento-hero-col bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-green">3D Interactive Model</span>
                <h3 className="bento-title">Plant Cell Ultrastructure</h3>
              </div>
              <div className="live-pill">
                <span className="live-dot"></span> Interactive
              </div>
            </div>

            <div className="bento-cell-explorer-wrapper">
              <div className="cell-visual-container">
                <img 
                  src="/assets/3d/bio_cell_3d.jpg" 
                  alt="3D Plant Cell" 
                  className="bento-3d-image"
                />

                {/* Interactive Hotspot Buttons */}
                <button
                  type="button"
                  className="organelle-hotspot hotspot-chloroplast"
                  onClick={() => setActiveOrganelle({
                    name: 'Chloroplast (হরিৎকণিকা)',
                    function: 'Thylakoids capture photon energy via Chlorophyll-a to generate ATP and NADPH2 for carbon fixation.',
                    boardTip: 'Common CQ: Draw and label the ultrastructure of chloroplast with 6 key parts.',
                  })}
                  title="Chloroplast"
                >
                  🌿
                </button>

                <button
                  type="button"
                  className="organelle-hotspot hotspot-nucleus"
                  onClick={() => setActiveOrganelle({
                    name: 'Nucleus & Chromatin (কেন্দ্রিকা)',
                    function: 'Contains the genome, nucleolus for rRNA transcription, and nuclear pores for RNA export.',
                    boardTip: 'High yield: Differentiate between euchromatin and heterochromatin.',
                  })}
                  title="Nucleus"
                >
                  🧬
                </button>

                <button
                  type="button"
                  className="organelle-hotspot hotspot-mitochondria"
                  onClick={() => setActiveOrganelle({
                    name: 'Mitochondria (মাইটোকনড্রিয়া)',
                    function: 'Cellular power house; Krebs cycle in matrix, oxidative phosphorylation via F0-F1 ATP synthase in cristae.',
                    boardTip: 'Must know: Chemiosmosis hypothesis and Cristae surface area multiplication.',
                  })}
                  title="Mitochondria"
                >
                  ⚡
                </button>
              </div>

              {/* Organelle Live Inspector Panel */}
              <div className="organelle-inspector-panel">
                <div className="inspector-badge">
                  <Layers size={14} /> Active Selection
                </div>
                <h4 className="organelle-name">{activeOrganelle.name}</h4>
                <p className="organelle-func">{activeOrganelle.function}</p>
                <div className="organelle-board-tip">
                  <strong>💡 Board Exam Tip:</strong> {activeOrganelle.boardTip}
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 3D Heart Cardiac Rhythm */}
          <div className="bento-card bento-side-top bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-red">Human Physiology</span>
                <h3 className="bento-title">Cardiac Cycle & Pacemaker</h3>
              </div>
              <Activity size={20} className="text-coral" />
            </div>

            <div className="cardiac-sim-content">
              <div className="cardiac-image-frame">
                <img 
                  src="/assets/3d/bio_heart_3d.jpg" 
                  alt="3D Heart Anatomy" 
                  className="cardiac-3d-thumb"
                />
                <div className="heartbeat-pulse-badge">
                  <span className="pulse-heart-icon">❤️</span> 72 BPM Normal Rhythm
                </div>
              </div>

              <div className="cardiac-phase-stats">
                <div className="phase-row">
                  <span>Atrial Systole</span>
                  <strong>0.1 sec</strong>
                </div>
                <div className="phase-row">
                  <span>Ventricular Systole</span>
                  <strong>0.3 sec</strong>
                </div>
                <div className="phase-row">
                  <span>Joint Diastole</span>
                  <strong>0.4 sec</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Chargaff DNA Base Pairing Mini-Sim */}
          <div className="bento-card bento-side-bottom bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-blue">Interactive Logic</span>
                <h3 className="bento-title">DNA Watson-Crick Base Pairing</h3>
              </div>
              <Dna size={20} className="text-blue" />
            </div>

            <p className="sim-prompt-text">{dnaFeedback}</p>

            <div className="dna-base-buttons">
              {(['A', 'T', 'G', 'C'] as const).map((base) => (
                <button
                  key={base}
                  type="button"
                  className={`dna-base-btn ${selectedBase === base ? 'selected' : ''}`}
                  onClick={() => handleBasePair(base)}
                >
                  <span className="base-letter">{base}</span>
                  <span className="base-name">
                    {base === 'A' ? 'Adenine' : base === 'T' ? 'Thymine' : base === 'G' ? 'Guanine' : 'Cytosine'}
                  </span>
                </button>
              ))}
            </div>

            <div className="bento-action-link">
              <Link to="/program" className="inline-action-link">
                Explore full 48-class syllabus <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
