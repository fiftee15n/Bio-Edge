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
import { useLanguage } from '../../context/LanguageContext';

export const Interactive3DBento: React.FC = () => {
  const { t, isBangla } = useLanguage();

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
  const [dnaFeedback, setDnaFeedback] = useState<string>(
    isBangla 
      ? 'চারগাফের নিয়ম অনুযায়ী সঠিক নাইট্রোজেনাস বেস নির্বাচন করুন:' 
      : 'Select a nitrogenous base to pair correctly according to Chargaff’s rule:'
  );

  const handleBasePair = (base: 'A' | 'T' | 'G' | 'C') => {
    setSelectedBase(base);
    if (base === 'A') {
      setDnaFeedback(isBangla 
        ? '✅ সঠিক! অ্যাডেনিন (A) থাইমিনের (T) সাথে ২টি হাইড্রোজেন বন্ড গঠন করে। [A = T]' 
        : '✅ Correct! Adenine (A) forms 2 Hydrogen bonds with Thymine (T). [A = T]');
    } else if (base === 'T') {
      setDnaFeedback(isBangla 
        ? '✅ সঠিক! থাইমিন (T) অ্যাডেনিনের (A) সাথে ২টি হাইড্রোজেন বন্ড গঠন করে। [T = A]' 
        : '✅ Correct! Thymine (T) forms 2 Hydrogen bonds with Adenine (A). [T = A]');
    } else if (base === 'G') {
      setDnaFeedback(isBangla 
        ? '✅ সঠিক! গুয়ানিন (G) সাইটোসিনের (C) সাথে ৩টি হাইড্রোজেন বন্ড গঠন করে। [G ≡ C]' 
        : '✅ Correct! Guanine (G) forms 3 Hydrogen bonds with Cytosine (C). [G ≡ C]');
    } else if (base === 'C') {
      setDnaFeedback(isBangla 
        ? '✅ সঠিক! সাইটোসিন (C) গুয়ানিনের (G) সাথে ৩টি হাইড্রোজেন বন্ড গঠন করে। [C ≡ G]' 
        : '✅ Correct! Cytosine (C) forms 3 Hydrogen bonds with Guanine (G). [C ≡ G]');
    }
  };

  return (
    <section className="interactive-3d-bento-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="inline-floating-badge">
            <Sparkles size={16} />
            <span>{t.bento3d.badge}</span>
          </div>
          <h2 className="section-title">
            {t.bento3d.title}
          </h2>
          <p className="section-subtitle">
            {t.bento3d.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-3d-grid">
          {/* Main Large Bento: 3D Plant Cell Explorer */}
          <div className="bento-card bento-hero-col bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-green">{isBangla ? 'থ্রিডি ইন্টারেক্টিভ মডেল' : '3D Interactive Model'}</span>
                <h3 className="bento-title">{isBangla ? 'উদ্ভিদ কোষের সূক্ষ্ম গঠন' : 'Plant Cell Ultrastructure'}</h3>
              </div>
              <div className="live-pill">
                <span className="live-dot"></span> {isBangla ? 'ইন্টারেক্টিভ' : 'Interactive'}
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
                  <Layers size={14} /> {isBangla ? 'নির্বাচিত অঙ্গাণু' : 'Active Selection'}
                </div>
                <h4 className="organelle-name">{activeOrganelle.name}</h4>
                <p className="organelle-func">{activeOrganelle.function}</p>
                <div className="organelle-board-tip">
                  <strong>💡 {isBangla ? 'বোর্ড পরীক্ষার টিপ:' : 'Board Exam Tip:'}</strong> {activeOrganelle.boardTip}
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: 3D Heart Cardiac Rhythm */}
          <div className="bento-card bento-side-top bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-red">{isBangla ? 'মানব শারীরতত্ত্ব' : 'Human Physiology'}</span>
                <h3 className="bento-title">{isBangla ? 'কার্ডিয়াক চক্র ও পেসমেকার' : 'Cardiac Cycle & Pacemaker'}</h3>
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
                  <span className="pulse-heart-icon">❤️</span> {isBangla ? '৭২ বিপিএম স্বাভাবিক ছন্দ' : '72 BPM Normal Rhythm'}
                </div>
              </div>

              <div className="cardiac-phase-stats">
                <div className="phase-row">
                  <span>{isBangla ? 'অলিন্দ ডায়াস্টোল / সিস্টোল' : 'Atrial Systole'}</span>
                  <strong>{isBangla ? '০.১ সেকেন্ড' : '0.1 sec'}</strong>
                </div>
                <div className="phase-row">
                  <span>{isBangla ? 'নিলয় সিস্টোল' : 'Ventricular Systole'}</span>
                  <strong>{isBangla ? '০.৩ সেকেন্ড' : '0.3 sec'}</strong>
                </div>
                <div className="phase-row">
                  <span>{isBangla ? 'যৌথ ডায়াস্টোল' : 'Joint Diastole'}</span>
                  <strong>{isBangla ? '০.৪ সেকেন্ড' : '0.4 sec'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Chargaff DNA Base Pairing Mini-Sim */}
          <div className="bento-card bento-side-bottom bio-clay-card">
            <div className="bento-card-header">
              <div>
                <span className="badge badge-blue">{isBangla ? 'ইন্টারেক্টিভ লজিক' : 'Interactive Logic'}</span>
                <h3 className="bento-title">{isBangla ? 'ডিএনএ বেস পেয়ারিং সিমুলেশন' : 'DNA Watson-Crick Base Pairing'}</h3>
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
                    {base === 'A' 
                      ? (isBangla ? 'অ্যাডেনিন' : 'Adenine') 
                      : base === 'T' 
                      ? (isBangla ? 'থাইমিন' : 'Thymine') 
                      : base === 'G' 
                      ? (isBangla ? 'গুয়ানিন' : 'Guanine') 
                      : (isBangla ? 'সাইটোসিন' : 'Cytosine')}
                  </span>
                </button>
              ))}
            </div>

            <div className="bento-action-link">
              <Link to="/program" className="inline-action-link">
                {isBangla ? 'সম্পূর্ণ ৪৮ ক্লাসের সিলেবাস দেখুন' : 'Explore full 48-class syllabus'} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
