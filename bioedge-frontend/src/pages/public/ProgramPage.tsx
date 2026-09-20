import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  FileText, 
  Award, 
  ChevronDown, 
  Phone, 
  GraduationCap,
  ChevronUp
} from 'lucide-react';

export const ProgramPage: React.FC = () => {
  const { course, papers, availableSeats } = useCourseData();
  const { isBangla, toBnNum } = useLanguage();
  const [selectedPaperId, setSelectedPaperId] = useState<string>('first-paper');
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({
    'c1-01': true,
    'c2-01': true
  });

  const activePaper = papers.find(p => p.id === selectedPaperId) || papers[0];

  const toggleChapter = (id: string) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    activePaper.chapters.forEach(ch => {
      all[ch.id] = true;
    });
    setExpandedChapterIds(all);
  };

  const collapseAll = () => {
    setExpandedChapterIds({});
  };

  const milestones = [
    {
      month: isBangla ? '১ম মাস' : 'Month 01',
      title: isBangla ? 'কোষ জীববিজ্ঞান ও শ্রেণিবিন্যাস' : 'Cell Biology & Diversity',
      duration: isBangla ? 'সপ্তাহ ০১–০৪' : 'Weeks 01–04',
      classes: isBangla ? '১২টি ক্লাস' : '12 Classes',
      topics: isBangla 
        ? 'কোষের গঠন, কোষ বিভাজন (মাইটোসিস/মায়োসিস), কোষ রসায়নের জৈব অণুসমূহ ও প্রাণীর শ্রেণিবিন্যাসের ভিত্তি।' 
        : 'Cell structure, division (mitosis/meiosis), biomolecules & animal taxonomy.',
      milestone: isBangla ? 'মাইলস্টোন পরীক্ষা ০১' : 'Milestone Exam 01',
      accent: 'green'
    },
    {
      month: isBangla ? '২য় মাস' : 'Month 02',
      title: isBangla ? 'শারীরতত্ত্ব ও অত্যাবশ্যকীয় অঙ্গতন্ত্র' : 'Physiology & Vital Systems',
      duration: isBangla ? 'সপ্তাহ ০৫–০৮' : 'Weeks 05–08',
      classes: isBangla ? '১২টি ক্লাস' : '12 Classes',
      topics: isBangla 
        ? 'সালোকসংশ্লেষণ, শ্বসন, মানব শারীরতত্ত্ব: পরিপাক ও শোষণ, রক্ত ও সঞ্চালন, এবং বর্জ্য নিষ্কাশন।' 
        : 'Photosynthesis, respiration, human digestion, circulation, and excretion.',
      milestone: isBangla ? 'মাইলস্টোন পরীক্ষা ০২' : 'Milestone Exam 02',
      accent: 'green'
    },
    {
      month: isBangla ? '৩য় মাস' : 'Month 03',
      title: isBangla ? 'জিনতত্ত্ব, প্রজনন ও জীবপ্রযুক্তি' : 'Genetics, Reproduction & Biotech',
      duration: isBangla ? 'সপ্তাহ ০৯–১২' : 'Weeks 09–12',
      classes: isBangla ? '১২টি ক্লাস' : '12 Classes',
      topics: isBangla 
        ? 'মেন্ডেলীয় জিনতত্ত্ব, বংশগতীয় রোগ, উদ্ভিদ প্রজনন, টিস্যু কালচার ও রিকম্বিনেন্ট ডিএনএ প্রযুক্তি।' 
        : 'Mendelian genetics, gene disorders, plant tissue culture & genetic engineering.',
      milestone: isBangla ? 'মাইলস্টোন পরীক্ষা ০৩' : 'Milestone Exam 03',
      accent: 'green'
    },
    {
      month: isBangla ? '৪র্থ মাস' : 'Month 04',
      title: isBangla ? 'বাস্তুতন্ত্র ও পূর্ণাঙ্গ বোর্ড মহড়া' : 'Ecology & Board Rehearsals',
      duration: isBangla ? 'সপ্তাহ ১৩–১৬' : 'Weeks 13–16',
      classes: isBangla ? '১২টি ক্লাস' : '12 Classes',
      topics: isBangla 
        ? 'বাস্তুতন্ত্র, জীববৈচিত্র্য সংরক্ষণ, সময় নিয়ন্ত্রিত পূর্ণাঙ্গ বোর্ড সিমুলেশন ও দ্রুত সিকিউ ড্রিল।' 
        : 'Ecosystems, biodiversity conservation, timed Board simulations & CQ drills.',
      milestone: isBangla ? 'গ্র্যান্ড বোর্ড সিমুলেশন' : 'Grand Board Simulation',
      accent: 'amber'
    }
  ];

  return (
    <div className="program-structure-page">
      <div className="container">
        
        {/* ====================================================================
           1. AIRY HERO HEADER
           ==================================================================== */}
        <section className="prog-hero-header text-center">
          <span className="section-pill">
            <Layers size={14} /> {isBangla ? 'কারিকুলাম ও রূপরেখা' : 'Curriculum Architecture'}
          </span>
          <h1 className="prog-hero-title">
            {isBangla ? 'একাডেমিক কোর্স কাঠামো ও রূপরেখা' : 'Program Academic Structure'}
          </h1>
          <p className="prog-hero-desc">
            {isBangla 
              ? 'এইচএসসি জীববিজ্ঞান ১ম পত্র (উদ্ভিদবিজ্ঞান) ও ২য় পত্র (প্রাণিবিজ্ঞান)-এর সম্পূর্ণ ২৪টি অধ্যায় নিয়ে গঠিত একটি সমন্বিত ৪ মাসের একাডেমিক ব্লুপ্রিন্ট; যাতে রয়েছে লাইভ ইন্টারঅ্যাক্টিভ ক্লাস এবং প্রতিটি লাইনের নিখুঁত সিকিউ (CQ) মূল্যায়ন।' 
              : 'A comprehensive, high-yield 4-month blueprint encompassing all 24 chapters of HSC Biology 1st Paper (Botany) and 2nd Paper (Zoology) with interactive masterclasses and line-by-line CQ evaluations.'}
          </p>

          {/* 4 Essential Metric Badges */}
          <div className="prog-metrics-ribbon">
            <div className="ribbon-item">
              <Clock size={16} className="ribbon-icon" />
              <span><strong>{isBangla ? '৪ মাস' : '4 Months'}</strong> ({isBangla ? '১৬ সপ্তাহ' : '16 Weeks'})</span>
            </div>
            <div className="ribbon-item">
              <Calendar size={16} className="ribbon-icon" />
              <span><strong>{isBangla ? '৪৮টি ক্লাস' : '48 Classes'}</strong> ({isBangla ? 'প্রতিটি ৯০ মি.' : '90m each'})</span>
            </div>
            <div className="ribbon-item">
              <BookOpen size={16} className="ribbon-icon" />
              <span><strong>{isBangla ? '২৪টি অধ্যায়' : '24 Chapters'}</strong> ({isBangla ? 'উদ্ভিদ + প্রাণিবিজ্ঞান' : 'Botany + Zoology'})</span>
            </div>
            <div className="ribbon-item highlight">
              <ShieldCheck size={16} className="ribbon-icon" />
              <span><strong>{isBangla ? 'সিকিউ খাতা মূল্যায়ন' : 'CQ Grading'}</strong> ({isBangla ? 'শিক্ষকের সরাসরি ফিডব্যাক' : 'Examiner Feedback'})</span>
            </div>
          </div>
        </section>

        {/* ====================================================================
           2. 4-MONTH PROGRESSIVE MILESTONES (MINIMAL ROADMAP)
           ==================================================================== */}
        <section className="prog-section">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <Sparkles size={14} /> {isBangla ? 'অগ্রগতি মডেল' : 'Progression Model'}
            </span>
            <h2 className="clean-section-title">{isBangla ? '৪ মাসের মাইলস্টোন রোডম্যাপ' : '4-Month Milestone Roadmap'}</h2>
            <p className="clean-section-desc">
              {isBangla 
                ? 'পুরো পাঠ্যক্রমটি চারটি ধারাবাহিক মাসিক ধাপে বিন্যস্ত, যা নিশ্চিত করে প্রতিটি অধ্যায় নিবিড়ভাবে অনুশীলনের পর বোর্ড স্ট্যান্ডার্ড মূল্যায়নের মুখোমুখি হওয়া।' 
                : 'The syllabus is organized into four progressive monthly phases, ensuring every chapter is taught conceptually before undergoing rigorous examination.'}
            </p>
          </div>

          <div className="prog-milestones-grid">
            {milestones.map((m, idx) => (
              <div key={idx} className={`prog-milestone-card ${m.accent === 'amber' ? 'amber-accent' : ''}`}>
                <div className="milestone-card-top">
                  <span className="milestone-month-tag">{m.month}</span>
                  <span className="milestone-classes-count">{m.classes}</span>
                </div>
                <h3 className="milestone-card-title">{m.title}</h3>
                <span className="milestone-duration-tag">{m.duration}</span>
                <p className="milestone-topics-text">{m.topics}</p>
                <div className="milestone-exam-tag">
                  <Award size={14} />
                  <span>{m.milestone}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
           3. DETAILED 24-CHAPTER SYLLABUS BREAKDOWN (#structure)
           ==================================================================== */}
        <section className="prog-section" id="structure">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <BookOpen size={14} /> {isBangla ? 'সম্পূর্ণ সিলেবাস অন্বেষণ' : 'Full Syllabus Explorer'}
            </span>
            <h2 className="clean-section-title">{isBangla ? 'অধ্যায়ভিত্তিক বিস্তারিত বিষয়বস্তুর বিশ্লেষণ' : 'Detailed Chapter-by-Chapter Breakdown'}</h2>
            <p className="clean-section-desc">
              {isBangla 
                ? 'এইচএসসি জীববিজ্ঞানের উভয় পত্রের অধ্যায়ের বিষয়সমূহ ও লেকচার রূপরেখা দেখুন। যেকোনো অধ্যায়ে ক্লিক করে এর বিস্তারিত টপিক পর্যালোচনা করুন।' 
                : 'Explore chapter topics and lecture contents for both HSC Biology papers. Click on any chapter to expand or review its covered concepts.'}
            </p>
          </div>

          {/* Paper Switcher Tabs & Expansion Controls */}
          <div className="syllabus-controls-bar">
            <div className="paper-switcher-pills">
              {papers.map((p) => {
                const isBotany = p.id === 'first-paper';
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPaperId(p.id)}
                    className={`paper-pill-btn ${selectedPaperId === p.id ? 'active' : ''}`}
                  >
                    <BookOpen size={16} />
                    <span>
                      {isBotany 
                        ? (isBangla ? '১ম পত্র — উদ্ভিদবিজ্ঞান (১২টি অধ্যায়)' : '1st Paper — Botany (12 Chapters)')
                        : (isBangla ? '২য় পত্র — প্রাণিবিজ্ঞান (১২টি অধ্যায়)' : '2nd Paper — Zoology (12 Chapters)')}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="syllabus-toggle-actions">
              <button type="button" onClick={expandAll} className="btn-text-action">
                {isBangla ? 'সব উন্মুক্ত করুন' : 'Expand All'}
              </button>
              <span className="action-divider">•</span>
              <button type="button" onClick={collapseAll} className="btn-text-action">
                {isBangla ? 'সব বন্ধ করুন' : 'Collapse All'}
              </button>
            </div>
          </div>

          {/* Chapters Accordion Cards */}
          <div className="chapters-accordion-stack">
            {activePaper.chapters.map((ch) => {
              const isExpanded = !!expandedChapterIds[ch.id];
              const topicsList = ch.topics || [];

              return (
                <div 
                  key={ch.id} 
                  className={`chapter-accordion-card bio-card ${isExpanded ? 'is-open' : ''}`}
                >
                  <div 
                    className="chapter-card-header" 
                    onClick={() => toggleChapter(ch.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ch-header-left">
                      <span className="ch-number-badge">{isBangla ? `অধ্যায় ${ch.numberBn || toBnNum(parseInt(ch.number, 10))}` : `Chapter ${ch.number}`}</span>
                      <h3 className="ch-title">{isBangla ? (ch.nameBn || ch.name) : (ch.nameEn || ch.name)}</h3>
                    </div>

                    <div className="ch-header-right">
                      <span className="ch-topics-count">
                        {toBnNum(topicsList.length)} {isBangla ? 'টি বিষয়' : 'Core Topics'}
                      </span>
                      <div className="ch-chevron-box">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="chapter-card-body">
                      <div className="chapter-topics-grid">
                        {topicsList.map((t, idx) => (
                          <div key={t.id || idx} className="topic-badge-item">
                            <CheckCircle2 size={15} className="topic-check-icon" />
                            <span className="topic-text">{isBangla ? (t.titleBn || t.title) : (t.titleEn || t.title)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
           4. INCLUDED STUDY MATERIALS & GUIDES
           ==================================================================== */}
        <section className="prog-section">
          <div className="clean-section-header text-center">
            <span className="section-pill">
              <FileText size={14} /> {isBangla ? 'অধ্যয়ন সহায়িকা ও উপকরণ' : 'Academic Tooling'}
            </span>
            <h2 className="clean-section-title">{isBangla ? 'কোর্সের সাথে অন্তর্ভুক্ত স্টাডি ম্যাটেরিয়ালস' : 'Included Study Materials & Guides'}</h2>
            <p className="clean-section-desc">
              {isBangla 
                ? 'ভর্তি হওয়া প্রতিটি শিক্ষার্থী বোর্ড পরীক্ষার চূড়ান্ত প্রস্তুতির জন্য পাবেন প্রয়োজনীয় ডিজিটাল ও প্রিন্ট উপযোগী বিশেষ স্টাডি গাইড।' 
                : 'Every enrolled student receives comprehensive physical and digital study companions designed for effortless Board revision.'}
            </p>
          </div>

          <div className="materials-triad-grid">
            <div className="material-card bio-card">
              <div className="mat-icon-box green">
                <FileText size={24} />
              </div>
              <h3 className="mat-title">{isBangla ? '৮০+ বায়োলজি ডায়াগ্রাম ব্লুপ্রিন্ট নোটবুক' : '80+ Diagram Blueprint Notebook'}</h3>
              <p className="mat-desc">
                {isBangla 
                  ? 'এইচএসসি পরীক্ষায় বায়োলজি চিত্রে সম্পূর্ণ নম্বর নিশ্চিত করার জন্য স্পষ্ট, কালার-কোডেড ও ধাপে ধাপে আঁকার গাইডসহ বাংলা ও ইংরেজি নির্ভুল লেবেলিং।' 
                  : 'Vector-sharp, color-coded diagrams with step-by-step drafting lines and precise English/Bangla labeling keys for full diagram marks.'}
              </p>
              <div className="mat-feature-tag">
                <CheckCircle2 size={14} /> {isBangla ? 'ফুল এইচডি প্রিন্টযোগ্য পিডিএফ' : 'Full HD Printable PDF'}
              </div>
            </div>

            <div className="material-card bio-card">
              <div className="mat-icon-box amber">
                <Award size={24} />
              </div>
              <h3 className="mat-title">{isBangla ? 'সিকিউ (CQ) মডেল উত্তর রিপোজিটরি' : 'CQ Model Answer Repository'}</h3>
              <p className="mat-desc">
                {isBangla 
                  ? 'সর্বশেষ এনসিটিবি বোর্ড মূল্যায়ন রুব্রিক অনুসারে প্রণীত এ+ মানের লিখিত মডেল উত্তর এবং পরীক্ষকদের পছন্দের কাঠামোগত টিপস।' 
                  : 'Top-tier \'A+\' written model answers structured according to the latest NCTB board rubric standards with examiner commentary.'}
              </p>
              <div className="mat-feature-tag">
                <CheckCircle2 size={14} /> {isBangla ? '২৪টি অধ্যায়ের পূর্ণাঙ্গ উত্তরমালা' : '24 Chapter Answer Keys'}
              </div>
            </div>

            <div className="material-card bio-card">
              <div className="mat-icon-box green">
                <GraduationCap size={24} />
              </div>
              <h3 className="mat-title">{isBangla ? '১,৫০০+ প্রশ্নব্যাংক ও সমাধান' : '1,500+ Curated Question Bank'}</h3>
              <p className="mat-desc">
                {isBangla 
                  ? 'বেসিক, প্রয়োগমূলক ও উচ্চতর চিন্তন দক্ষতায় বিভক্ত সমৃদ্ধ বহুনির্বাচনী প্রশ্নব্যাংক এবং প্রতিটি প্রশ্নের তাৎক্ষণিক ব্যাখ্যা।' 
                  : 'Exhaustive multiple-choice bank categorized into Fundamental, Application, and Olympiad-level thinking with instant explanations.'}
              </p>
              <div className="mat-feature-tag">
                <CheckCircle2 size={14} /> {isBangla ? 'সিবিটি অনলাইন প্র্যাকটিস পোর্টাল' : 'CBT Practice Portal'}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
           5. MINIMALIST ADMISSION CTA BANNER
           ==================================================================== */}
        <section className="prog-cta-section text-center">
          <div className="prog-cta-box">
            <span className="badge badge-green" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              {isBangla ? `সীমিত ৩০ জনের ব্যাচ • ${toBnNum(availableSeats)}টি আসন বাকি` : `Limited 30-Seat Cohort • ${availableSeats} Seats Left`}
            </span>
            <h2 className="prog-cta-title">
              {isBangla ? 'আফরোজ়া তাহমিনার সাথে এইচএসসি বায়োলজিতে পূর্ণাঙ্গ দক্ষতা অর্জনে আপনি কি প্রস্তুত?' : 'Ready to Master HSC Biology with Afroza Tahmina?'}
            </h2>
            <p className="prog-cta-sub">
              {isBangla 
                ? 'আসন্ন আলফা ব্যাচে আপনার আসনটি নিশ্চিত করুন এবং আজ থেকেই গভীর ধারণাগত জীববিজ্ঞান প্রস্তুতি শুরু করুন।' 
                : 'Secure your place in the upcoming Alpha Cohort and start building true conceptual mastery today.'}
            </p>

            <div className="prog-cta-actions">
              <Link to="/enroll?course=alpha-cohort" className="btn btn-primary btn-lg">
                {isBangla ? 'আলফা ব্যাচে ভর্তি হোন' : 'Enroll in Alpha Cohort'} <ArrowRight size={18} />
              </Link>
              <a 
                href={isBangla ? "https://wa.me/8801700000000?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%AC%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%8B%20%E0%A6%8F%E0%A6%9C%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%97%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%AE%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87" : "https://wa.me/8801700000000?text=Hello%20Bio%20Edge%20Team,%20I%20have%20questions%20about%20the%20program%20structure"} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline btn-lg"
              >
                <Phone size={16} /> {isBangla ? 'হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Inquire via WhatsApp'}
              </a>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        /* ==========================================================================
           PROGRAM STRUCTURE PAGE STYLES (CLEAN & MINIMALIST)
           ========================================================================== */
        .program-structure-page {
          background: #FAFCFA;
          min-height: calc(100vh - 72px);
          padding: 3.5rem 0 6rem;
        }

        /* 1. Hero Header */
        .prog-hero-header {
          margin-bottom: 3.75rem;
        }

        .prog-hero-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.2;
          margin: 0.5rem 0 1rem;
        }

        .prog-hero-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 680px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        /* Metrics Ribbon */
        .prog-metrics-ribbon {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 0.5rem 1.25rem;
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem;
        }

        .ribbon-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .ribbon-item strong {
          color: var(--dark-green);
        }

        .ribbon-icon {
          color: var(--primary-green);
        }

        .ribbon-item.highlight strong {
          color: var(--primary-green);
        }

        /* Section Containers */
        .prog-section {
          margin-bottom: 4.5rem;
        }

        /* Clean Section Headers */
        .clean-section-header {
          margin-bottom: 2.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(41, 78, 54, 0.12);
          margin-bottom: 0.35rem;
        }

        .clean-section-title {
          font-size: clamp(1.75rem, 3.2vw, 2.3rem);
          font-weight: 800;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.6rem;
          text-align: center;
          width: 100%;
        }

        .clean-section-desc {
          font-size: 1.02rem;
          color: var(--text-muted);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
          text-align: center;
        }

        /* 2. Milestones Grid */
        .prog-milestones-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .prog-milestone-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          padding: 1.75rem 1.35rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .prog-milestone-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(49, 91, 61, 0.08);
          border-color: var(--primary-green);
        }

        .milestone-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .milestone-month-tag {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .milestone-classes-count {
          font-size: 0.76rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .milestone-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--dark-green);
          line-height: 1.3;
          margin-bottom: 0.35rem;
        }

        .milestone-duration-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-bottom: 0.85rem;
          display: block;
        }

        .milestone-topics-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          flex-grow: 1;
          margin-bottom: 1.25rem;
        }

        .milestone-exam-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green-subtle);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(49, 91, 61, 0.08);
        }

        .prog-milestone-card.amber-accent .milestone-month-tag {
          background: #FEF7E6;
          color: #B45309;
        }

        .prog-milestone-card.amber-accent .milestone-exam-tag {
          background: #FEF7E6;
          color: #B45309;
          border-color: rgba(180, 83, 9, 0.15);
        }

        /* 3. Controls Bar */
        .syllabus-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .paper-switcher-pills {
          display: inline-flex;
          background: #EEF4F0;
          padding: 4px;
          border-radius: var(--radius-full);
          gap: 4px;
        }

        .paper-pill-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.35rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .paper-pill-btn:hover {
          color: var(--dark-green);
        }

        .paper-pill-btn.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .syllabus-toggle-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .btn-text-action {
          background: none;
          border: none;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary-green);
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }

        .btn-text-action:hover {
          color: var(--dark-green);
          text-decoration: underline;
        }

        .action-divider {
          color: var(--border-color);
          font-size: 0.8rem;
        }

        /* Chapters Accordion Stack */
        .chapters-accordion-stack {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .chapter-accordion-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid var(--border-color);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .chapter-accordion-card:hover {
          border-color: rgba(49, 91, 61, 0.3);
        }

        .chapter-accordion-card.is-open {
          border-color: var(--dark-green);
          box-shadow: 0 6px 20px rgba(49, 91, 61, 0.05);
        }

        .chapter-card-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          user-select: none;
          gap: 1rem;
        }

        .ch-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .ch-number-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-sm);
        }

        .ch-title {
          font-size: 1.12rem;
          font-weight: 700;
          color: var(--dark-green);
          margin: 0;
        }

        .ch-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ch-topics-count {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .ch-chevron-box {
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chapter-card-body {
          padding: 0 1.5rem 1.5rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }

        .chapter-topics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .topic-badge-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: var(--light-green-subtle);
          border: 1px solid rgba(49, 91, 61, 0.08);
          padding: 0.65rem 0.95rem;
          border-radius: var(--radius-md);
        }

        .topic-check-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .topic-text {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.4;
        }

        /* 4. Materials Triad Grid */
        .materials-triad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .material-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 2.25rem 1.75rem;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .material-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(49, 91, 61, 0.08);
          border-color: var(--primary-green);
        }

        .mat-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .mat-icon-box.green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .mat-icon-box.amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .mat-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }

        .mat-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          flex-grow: 1;
          margin-bottom: 1.25rem;
        }

        .mat-feature-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green-subtle);
          padding: 5px 10px;
          border-radius: var(--radius-sm);
          align-self: flex-start;
        }

        /* 5. CTA Section */
        .prog-cta-box {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5FAF6 100%);
          border: 1.5px solid rgba(49, 91, 61, 0.15);
          border-radius: 28px;
          padding: 3.5rem 2rem;
          max-width: 840px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(22, 51, 32, 0.05);
        }

        .prog-cta-title {
          font-size: clamp(1.8rem, 3.5vw, 2.35rem);
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .prog-cta-sub {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 580px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .prog-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* ==========================================================================
           RESPONSIVE DESIGN BREAKPOINTS
           ========================================================================== */
        @media (max-width: 992px) {
          .prog-milestones-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          .materials-triad-grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .program-structure-page {
            padding: 2.5rem 0 4.5rem;
          }
          .prog-metrics-ribbon {
            border-radius: var(--radius-lg);
            gap: 0.75rem;
            padding: 0.75rem 1rem;
          }
          .syllabus-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .paper-switcher-pills {
            width: 100%;
            flex-direction: column;
            border-radius: var(--radius-lg);
          }
          .paper-pill-btn {
            justify-content: center;
            border-radius: var(--radius-md);
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }
          .chapter-topics-grid {
            grid-template-columns: 1fr;
          }
          .chapter-card-header {
            padding: 1rem 1.15rem;
          }
          .chapter-card-body {
            padding: 0 1.15rem 1.15rem;
          }
          .prog-cta-box {
            padding: 2.25rem 1.25rem;
            border-radius: var(--radius-xl);
          }
          .prog-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .prog-cta-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .prog-milestones-grid {
            grid-template-columns: 1fr;
          }
          .ch-header-left {
            gap: 0.5rem;
          }
          .ch-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};
