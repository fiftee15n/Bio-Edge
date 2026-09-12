export interface SyllabusClassItem {
  classNumber: number;
  classLabel: string;
  chapter: string;
  title: string;
  isTest?: boolean;
  isExam?: boolean;
  isRevision?: boolean;
  badge?: string;
}

export interface MonthCurriculum {
  monthNumber: number;
  monthId: string;
  title: string;
  subtitle: string;
  classesPerWeek: number;
  totalClasses: number;
  classRange: string;
  botanyClasses: SyllabusClassItem[];
  zoologyClasses: SyllabusClassItem[];
  monthlyExam: {
    title: string;
    botanySyllabus: string;
    zoologySyllabus: string;
    description: string;
  };
}

export const HSC_BIOLOGY_CURRICULUM: MonthCurriculum[] = [
  {
    monthNumber: 1,
    monthId: "month-1",
    title: "MONTH 1 — Foundation & Cell Biology",
    subtitle: "3 Classes per Week — Total 12 Classes • Core cellular architecture & animal classification foundation",
    classesPerWeek: 3,
    totalClasses: 12,
    classRange: "Classes 01 – 12",
    botanyClasses: [
      { classNumber: 1, classLabel: "Class 01", chapter: "Ch 1", title: "Cell & Its Structure — Part 1 (Plasma membrane, cell wall, fluid mosaic model)" },
      { classNumber: 2, classLabel: "Class 02", chapter: "Ch 1", title: "Cell & Its Structure — Part 2 (Mitochondria, chloroplast & organelles)" },
      { classNumber: 3, classLabel: "Class 03", chapter: "Ch 1", title: "Cell & Its Structure — Part 3 (Nucleus, DNA/RNA & CQ practice drills)" },
      { classNumber: 4, classLabel: "Class 04", chapter: "Ch 2", title: "Cell Division (Mitosis stages, prophase to telophase mechanisms)" },
      { classNumber: 5, classLabel: "Class 05", chapter: "Ch 2", title: "Cell Division (Meiosis I & II, synapsis & crossing over)" },
      { classNumber: 6, classLabel: "Class 06", chapter: "Ch 2", title: "Mitosis vs Meiosis Comparison & Evolutionary Significance" },
      { classNumber: 7, classLabel: "Class 07", chapter: "Ch 1–2", title: "Ch 1–2 Combined Conceptual Review & Diagram Masterclass" },
      { classNumber: 8, classLabel: "Class 08", chapter: "Ch 1–2", title: "Creative Question (CQ) Framework & Answering Techniques" },
      { classNumber: 9, classLabel: "Class 09", chapter: "Ch 1–2", title: "Test: Ch 1–2 (MCQ + CQ + Diagram Evaluation)", isTest: true, badge: "Chapter Test" },
      { classNumber: 10, classLabel: "Class 10", chapter: "Ch 1–2", title: "Test Paper Evaluation, Error Analysis & Doubt Clearing" },
      { classNumber: 11, classLabel: "Class 11", chapter: "Ch 1–2", title: "High-Yield Board Question Solving & Diagram Speed Practice" },
      { classNumber: 12, classLabel: "Class 12", chapter: "Ch 1–2", title: "Monthly Exam 01 (1st Paper: Ch 1–2 Comprehensive)", isExam: true, badge: "Monthly Exam" }
    ],
    zoologyClasses: [
      { classNumber: 1, classLabel: "Class 01", chapter: "Ch 1", title: "Animal Diversity & Classification — Part 1 (Basis of classification, coelom, symmetry)" },
      { classNumber: 2, classLabel: "Class 02", chapter: "Ch 1", title: "Animal Diversity & Classification — Part 2 (Major non-chordate & chordate phyla)" },
      { classNumber: 3, classLabel: "Class 03", chapter: "Ch 2", title: "Introduction to Animals (Hydra: Anatomy, nematocysts, locomotion & budding)" },
      { classNumber: 4, classLabel: "Class 04", chapter: "Ch 2", title: "Introduction to Animals (Grasshopper: Morphology, mouthparts & organ systems)" },
      { classNumber: 5, classLabel: "Class 05", chapter: "Ch 2", title: "Introduction to Animals (Rohu Fish: Gills, lateral line & swim bladder)" },
      { classNumber: 6, classLabel: "Class 06", chapter: "Ch 2", title: "Comparative Morphology of Type Animals & High-Frequency CQ Drills" },
      { classNumber: 7, classLabel: "Class 07", chapter: "Ch 3", title: "Digestion & Absorption — Part 1 (Digestive tract anatomy & mechanical digestion)" },
      { classNumber: 8, classLabel: "Class 08", chapter: "Ch 3", title: "Digestion & Absorption — Part 2 (Enzymatic digestion of carbs, proteins & lipids)" },
      { classNumber: 9, classLabel: "Class 09", chapter: "Ch 3", title: "Test: Ch 3 (Digestion & Absorption Assessment)", isTest: true, badge: "Chapter Test" },
      { classNumber: 10, classLabel: "Class 10", chapter: "Ch 4", title: "Blood & Circulation — Part 1 (Blood plasma, RBC, WBC & platelets biochemistry)" },
      { classNumber: 11, classLabel: "Class 11", chapter: "Ch 4", title: "Blood & Circulation — Part 2 (Heart structure, cardiac cycle timing & SA node)" },
      { classNumber: 12, classLabel: "Class 12", chapter: "Ch 1–2", title: "Monthly Exam 01 (2nd Paper: Ch 1–2 Comprehensive)", isExam: true, badge: "Monthly Exam" }
    ],
    monthlyExam: {
      title: "Monthly Exam 01",
      botanySyllabus: "1st Paper: Chapter 1 (Cell Structure) & Chapter 2 (Cell Division)",
      zoologySyllabus: "2nd Paper: Chapter 1 (Animal Diversity) & Chapter 2 (Type Animals)",
      description: "Timed 50-mark board standard examination featuring 25 MCQs and 2 Structured CQs with full diagram evaluation."
    }
  },
  {
    monthNumber: 2,
    monthId: "month-2",
    title: "MONTH 2 — Cell Chemistry + Human Physiology I",
    subtitle: "3 Classes per Week — Total 12 Classes • Biomolecules, microbiology, circulation, respiration & excretion",
    classesPerWeek: 3,
    totalClasses: 12,
    classRange: "Classes 13 – 24",
    botanyClasses: [
      { classNumber: 13, classLabel: "Class 13", chapter: "Ch 3", title: "Cell Chemistry — Part 1 (Carbohydrates: Monosaccharides, disaccharides, polysaccharides)" },
      { classNumber: 14, classLabel: "Class 14", chapter: "Ch 3", title: "Cell Chemistry — Part 2 (Amino acids, peptide bonds & lipid classification)" },
      { classNumber: 15, classLabel: "Class 15", chapter: "Ch 3", title: "Cell Chemistry — Part 3 (Nucleic acids DNA/RNA, ATP energy & enzyme kinetics)" },
      { classNumber: 16, classLabel: "Class 16", chapter: "Ch 4", title: "Microorganisms (Virus morphology, T2 bacteriophage & lytic/lysogenic cycles)" },
      { classNumber: 17, classLabel: "Class 17", chapter: "Ch 4", title: "Microorganisms (Bacteria classification, Gram stain & binary fission)" },
      { classNumber: 18, classLabel: "Class 18", chapter: "Ch 4", title: "Microorganisms (Malaria parasite Plasmodium life cycle & pathogenesis)" },
      { classNumber: 19, classLabel: "Class 19", chapter: "Ch 5", title: "Algae & Fungi (Spirogyra conjugation, Agaricus mushroom anatomy & lichens)" },
      { classNumber: 20, classLabel: "Class 20", chapter: "Ch 6", title: "Bryophyta & Pteridophyta (Riccia & Pteris alternation of generations)" },
      { classNumber: 21, classLabel: "Class 21", chapter: "Ch 3–6", title: "Test: Ch 3–6 (MCQ + CQ + Biochemical Pathways)", isTest: true, badge: "Chapter Test" },
      { classNumber: 22, classLabel: "Class 22", chapter: "Ch 7", title: "Gymnosperm & Angiosperm (Cycas coralloid roots & microsporophylls)" },
      { classNumber: 23, classLabel: "Class 23", chapter: "Ch 7", title: "Angiosperm (Floral formula, floral diagram, Poaceae & Malvaceae families)" },
      { classNumber: 24, classLabel: "Class 24", chapter: "Ch 3–7", title: "Monthly Exam 02 (1st Paper: Ch 3–6 + 7 Complete)", isExam: true, badge: "Monthly Exam" }
    ],
    zoologyClasses: [
      { classNumber: 13, classLabel: "Class 13", chapter: "Ch 4", title: "Blood & Circulation — Part 3 (Blood pressure regulation, ECG & cardiac output)" },
      { classNumber: 14, classLabel: "Class 14", chapter: "Ch 4", title: "Blood & Circulation — Part 4 (Coronary circulation, angioplasty & bypass surgery)" },
      { classNumber: 15, classLabel: "Class 15", chapter: "Ch 4", title: "Test: Ch 4 (Blood & Cardiovascular Physiology)", isTest: true, badge: "Chapter Test" },
      { classNumber: 16, classLabel: "Class 16", chapter: "Ch 5", title: "Respiration & Gas Exchange — Part 1 (Respiratory tract, alveoli & lung mechanism)" },
      { classNumber: 17, classLabel: "Class 17", chapter: "Ch 5", title: "Respiration & Gas Exchange — Part 2 (Oxygen & CO2 transport curves in blood)" },
      { classNumber: 18, classLabel: "Class 18", chapter: "Ch 5", title: "Test: Ch 5 (Respiratory Physiology & Gas Transport)", isTest: true, badge: "Chapter Test" },
      { classNumber: 19, classLabel: "Class 19", chapter: "Ch 6", title: "Excretion & Osmoregulation — Part 1 (Nephron ultrastructure & ultrafiltration)" },
      { classNumber: 20, classLabel: "Class 20", chapter: "Ch 6", title: "Excretion & Osmoregulation — Part 2 (Countercurrent mechanism, RAAS & dialysis)" },
      { classNumber: 21, classLabel: "Class 21", chapter: "Ch 6", title: "Test: Ch 6 (Renal Physiology & Nephron Mechanisms)", isTest: true, badge: "Chapter Test" },
      { classNumber: 22, classLabel: "Class 22", chapter: "Ch 7", title: "Locomotion & Movement — Part 1 (Human skeleton axial & appendicular bones)" },
      { classNumber: 23, classLabel: "Class 23", chapter: "Ch 7", title: "Locomotion & Movement — Part 2 (Synovial joints & sliding filament theory)" },
      { classNumber: 24, classLabel: "Class 24", chapter: "Ch 3–7", title: "Monthly Exam 02 (2nd Paper: Ch 3–7 Complete)", isExam: true, badge: "Monthly Exam" }
    ],
    monthlyExam: {
      title: "Monthly Exam 02",
      botanySyllabus: "1st Paper: Chapter 3 (Biomolecules), Ch 4 (Microorganisms), Ch 5 (Algae/Fungi), Ch 6 (Bryo/Pterido) & Ch 7 (Gymno/Angio)",
      zoologySyllabus: "2nd Paper: Chapter 3 (Digestion), Ch 4 (Circulation), Ch 5 (Respiration), Ch 6 (Excretion) & Ch 7 (Locomotion)",
      description: "Comprehensive mid-term evaluation testing biochemical pathways, human physiological cycles, and CQ answer precision."
    }
  },
  {
    monthNumber: 3,
    monthId: "month-3",
    title: "MONTH 3 — Plant Physiology + Advanced Zoology",
    subtitle: "3 Classes per Week — Total 12 Classes • Photosynthesis, respiration, genetics, endocrine, immunity & behavior",
    classesPerWeek: 3,
    totalClasses: 12,
    classRange: "Classes 25 – 36",
    botanyClasses: [
      { classNumber: 25, classLabel: "Class 25", chapter: "Ch 8", title: "Tissue & Tissue System — Part 1 (Meristematic tissue types & vascular bundles)" },
      { classNumber: 26, classLabel: "Class 26", chapter: "Ch 8", title: "Tissue & Tissue System — Part 2 (Stomatal mechanism, epidermis & ground tissue)" },
      { classNumber: 27, classLabel: "Class 27", chapter: "Ch 9", title: "Plant Physiology — Part 1 (Water & mineral absorption, active/passive transport)" },
      { classNumber: 28, classLabel: "Class 28", chapter: "Ch 9", title: "Plant Physiology — Part 2 (Plant nutrition, macro/micro elements & deficiency)" },
      { classNumber: 29, classLabel: "Class 29", chapter: "Ch 9", title: "Plant Physiology — Part 3 (Photosynthesis: Light reaction, C3 Calvin & C4 Hatch-Slack)" },
      { classNumber: 30, classLabel: "Class 30", chapter: "Ch 9", title: "Plant Physiology — Part 4 (Respiration: Glycolysis, Krebs cycle, ETS & plant hormones)" },
      { classNumber: 31, classLabel: "Class 31", chapter: "Ch 10", title: "Plant Reproduction — Part 1 (Microsporogenesis, megasporogenesis & pollination)" },
      { classNumber: 32, classLabel: "Class 32", chapter: "Ch 10", title: "Plant Reproduction — Part 2 (Double fertilization, endosperm & apomixis)" },
      { classNumber: 33, classLabel: "Class 33", chapter: "Ch 8–10", title: "Test: Ch 8–10 (Physiological Cycles & Plant Reproduction)", isTest: true, badge: "Chapter Test" },
      { classNumber: 34, classLabel: "Class 34", chapter: "Ch 11", title: "Biotechnology — Part 1 (Plant tissue culture, explant & micropropagation)" },
      { classNumber: 35, classLabel: "Class 35", chapter: "Ch 11", title: "Biotechnology — Part 2 (Recombinant DNA technology, restriction enzymes & PCR)" },
      { classNumber: 36, classLabel: "Class 36", chapter: "Ch 8–11", title: "Monthly Exam 03 (1st Paper: Ch 8–11 Comprehensive)", isExam: true, badge: "Monthly Exam" }
    ],
    zoologyClasses: [
      { classNumber: 25, classLabel: "Class 25", chapter: "Ch 8", title: "Coordination & Control — Part 1 (Nervous system: Brain divisions, neuron & reflex arc)" },
      { classNumber: 26, classLabel: "Class 26", chapter: "Ch 8", title: "Coordination & Control — Part 2 (Endocrine system: Pituitary, thyroid, adrenal hormones)" },
      { classNumber: 27, classLabel: "Class 27", chapter: "Ch 9", title: "Continuity of Human Life — Part 1 (Spermatogenesis, oogenesis & reproductive anatomy)" },
      { classNumber: 28, classLabel: "Class 28", chapter: "Ch 9", title: "Continuity of Human Life — Part 2 (Fertilization, blastocyst, placenta & pregnancy hormones)" },
      { classNumber: 29, classLabel: "Class 29", chapter: "Ch 10", title: "Immunity & Defense — Part 1 (Lines of defense, phagocytosis & inflammatory response)" },
      { classNumber: 30, classLabel: "Class 30", chapter: "Ch 10", title: "Immunity & Defense — Part 2 (Humoral & cell-mediated immunity, antibody structure & vaccines)" },
      { classNumber: 31, classLabel: "Class 31", chapter: "Ch 11", title: "Genetics & Evolution — Part 1 (Mendel's 1st & 2nd Laws, monohybrid/dihybrid crosses)" },
      { classNumber: 32, classLabel: "Class 32", chapter: "Ch 11", title: "Genetics & Evolution — Part 2 (Exceptions to Mendelism: Incomplete dominance, epistasis, lethal gene)" },
      { classNumber: 33, classLabel: "Class 33", chapter: "Ch 11", title: "Genetics & Evolution — Part 3 (Sex-linked inheritance, color blindness, hemophilia & Darwinism)" },
      { classNumber: 34, classLabel: "Class 34", chapter: "Ch 12", title: "Animal Behaviour — Part 1 (Innate behavior: Reflexes, taxes, kinesis & FAP)" },
      { classNumber: 35, classLabel: "Class 35", chapter: "Ch 12", title: "Animal Behaviour — Part 2 (Learned behavior: Habituation, imprinting, conditioning & altruism)" },
      { classNumber: 36, classLabel: "Class 36", chapter: "Ch 8–12", title: "Monthly Exam 03 (2nd Paper: Ch 8–12 Comprehensive)", isExam: true, badge: "Monthly Exam" }
    ],
    monthlyExam: {
      title: "Monthly Exam 03",
      botanySyllabus: "1st Paper: Chapter 8 (Tissue System), Ch 9 (Plant Physiology), Ch 10 (Plant Reproduction) & Ch 11 (Biotechnology)",
      zoologySyllabus: "2nd Paper: Chapter 8 (Coordination), Ch 9 (Reproduction), Ch 10 (Immunity), Ch 11 (Genetics & Evolution) & Ch 12 (Behaviour)",
      description: "Advanced assessment testing analytical genetics crosses, plant metabolism, and complex physiological regulation."
    }
  },
  {
    monthNumber: 4,
    monthId: "month-4",
    title: "MONTH 4 — Final Revision & Exam Preparation",
    subtitle: "3 Classes per Week — Total 12 Classes • Complete 24-chapter revision, MCQ marathons & Board model tests",
    classesPerWeek: 3,
    totalClasses: 12,
    classRange: "Classes 37 – 48",
    botanyClasses: [
      { classNumber: 37, classLabel: "Class 37", chapter: "Ch 1–6", title: "Revision: Ch 1–6 (MCQ + CQ + Core Diagrams Rapid Recap)", isRevision: true, badge: "Grand Revision" },
      { classNumber: 38, classLabel: "Class 38", chapter: "Ch 7–12", title: "Revision: Ch 7–12 (MCQ + CQ + Core Diagrams Rapid Recap)", isRevision: true, badge: "Grand Revision" },
      { classNumber: 39, classLabel: "Class 39", chapter: "Full 1st Paper", title: "Full Model Test — 01 (1st Paper Botany Board Standard)", isExam: true, badge: "Model Test 01" },
      { classNumber: 40, classLabel: "Class 40", chapter: "Ch 1–12", title: "MCQ Marathon (Top 200 Most Important High-Yield Questions)", isRevision: true, badge: "MCQ Marathon" },
      { classNumber: 41, classLabel: "Class 41", chapter: "Ch 1–12", title: "Important CQ Writing Practice & Time-Management Framework", isRevision: true, badge: "CQ Drill" },
      { classNumber: 42, classLabel: "Class 42", chapter: "Board Papers", title: "Board Question Solutions (Top 10-Year Repeated Scenarios)", isRevision: true, badge: "Board Solutions" },
      { classNumber: 43, classLabel: "Class 43", chapter: "Full 1st Paper", title: "Full Model Test — 02 (1st Paper Botany Timed Simulation)", isExam: true, badge: "Model Test 02" },
      { classNumber: 44, classLabel: "Class 44", chapter: "All Chapters", title: "Weak Topic Revision & Individual Doubt Clearing Clinic", isRevision: true, badge: "Doubt Clinic" },
      { classNumber: 45, classLabel: "Class 45", chapter: "1st + 2nd Paper", title: "Full Biology Model Test — 01 (Combined Board Simulation)", isExam: true, badge: "Full Biology Test 01" },
      { classNumber: 46, classLabel: "Class 46", chapter: "1st + 2nd Paper", title: "Full Biology Model Test — 02 (Combined Board Simulation)", isExam: true, badge: "Full Biology Test 02" },
      { classNumber: 47, classLabel: "Class 47", chapter: "All Chapters", title: "Grand Final Revision: All 80+ Biology Board Diagrams", isRevision: true, badge: "Diagram Blitz" },
      { classNumber: 48, classLabel: "Class 48", chapter: "Exam Ready", title: "Grand Final Revision (Exam Strategy & Confidence Building)", isRevision: true, badge: "Final Masterclass" }
    ],
    zoologyClasses: [
      { classNumber: 37, classLabel: "Class 37", chapter: "Ch 1–6", title: "Revision: Ch 1–6 (MCQ + CQ + Core Diagrams Rapid Recap)", isRevision: true, badge: "Grand Revision" },
      { classNumber: 38, classLabel: "Class 38", chapter: "Ch 7–12", title: "Revision: Ch 7–12 (MCQ + CQ + Core Diagrams Rapid Recap)", isRevision: true, badge: "Grand Revision" },
      { classNumber: 39, classLabel: "Class 39", chapter: "Full 2nd Paper", title: "Full Model Test — 01 (2nd Paper Zoology Board Standard)", isExam: true, badge: "Model Test 01" },
      { classNumber: 40, classLabel: "Class 40", chapter: "Ch 1–12", title: "MCQ Marathon (Top 200 Most Important High-Yield Questions)", isRevision: true, badge: "MCQ Marathon" },
      { classNumber: 41, classLabel: "Class 41", chapter: "Ch 1–12", title: "Important CQ Writing Practice & Time-Management Framework", isRevision: true, badge: "CQ Drill" },
      { classNumber: 42, classLabel: "Class 42", chapter: "Board Papers", title: "Board Question Solutions (Top 10-Year Repeated Scenarios)", isRevision: true, badge: "Board Solutions" },
      { classNumber: 43, classLabel: "Class 43", chapter: "Full 2nd Paper", title: "Full Model Test — 02 (2nd Paper Zoology Timed Simulation)", isExam: true, badge: "Model Test 02" },
      { classNumber: 44, classLabel: "Class 44", chapter: "All Chapters", title: "Weak Topic Revision & Individual Doubt Clearing Clinic", isRevision: true, badge: "Doubt Clinic" },
      { classNumber: 45, classLabel: "Class 45", chapter: "1st + 2nd Paper", title: "Full Biology Model Test — 01 (Combined Board Simulation)", isExam: true, badge: "Full Biology Test 01" },
      { classNumber: 46, classLabel: "Class 46", chapter: "1st + 2nd Paper", title: "Full Biology Model Test — 02 (Combined Board Simulation)", isExam: true, badge: "Full Biology Test 02" },
      { classNumber: 47, classLabel: "Class 47", chapter: "All Chapters", title: "Grand Final Revision: All 80+ Biology Board Diagrams", isRevision: true, badge: "Diagram Blitz" },
      { classNumber: 48, classLabel: "Class 48", chapter: "Exam Ready", title: "Grand Final Revision (Exam Strategy & Confidence Building)", isRevision: true, badge: "Final Masterclass" }
    ],
    monthlyExam: {
      title: "Final Board Model Test Series",
      botanySyllabus: "Complete 1st Paper (Chapters 1–12)",
      zoologySyllabus: "Complete 2nd Paper (Chapters 1–12)",
      description: "Full-scale timed board simulations with real-time ranking, line-by-line CQ evaluation, and final exam confidence coaching."
    }
  }
];
