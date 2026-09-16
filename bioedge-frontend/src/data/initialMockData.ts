import {
  CourseData,
  TeacherData,
  Paper,
  ClassSession,
  Test,
  Student,
  FeedbackItem,
  NotificationItem,
  FAQItem,
  EnrollmentRecord
} from '../types';

export const initialCourseData: CourseData = {
  id: "hsc-bio-intensive-2026",
  title: "HSC Biology Intensive Program",
  subtitle: "1st Paper & 2nd Paper • 4 Months • 48 Intensive Classes • Weekly 3 Classes • Focus: Concept • Practice • Exam • Revision • Confidence",
  description: "A comprehensive 4-month academic blueprint encompassing all 24 chapters of HSC Biology 1st Paper (Botany) & 2nd Paper (Zoology). 48 Intensive classes, weekly assessments, 3 monthly milestone exams, and full-length Board model tests.",
  duration: "4 Months",
  totalClasses: 48,
  seatLimit: 20,
  monthlyFee: 3500,
  fullCourseFee: 12500,
  status: "Active",
  batchName: "Batch 01 - Intensive Cohort",
  startDate: "2026-10-01",
  classDays: "Sun, Tue, Thu (7:00 PM - 8:30 PM)",
  whyLimitedSeats: "The program strictly limits cohort capacity to 15–20 students to ensure every student receives personalized line-by-line CQ evaluation, real-time doubt clearing, and continuous academic mentorship."
};

export const initialTeacherData: TeacherData = {
  id: "teacher-afroza",
  name: "Afroza Tahmina",
  designation: "Senior Faculty & HEC Biology Specialist",
  institution: "Dhaka Higher Secondary & National Biology Olympiad Mentor",
  experience: "12+ Years Teaching Experience",
  specialization: "HEC Biology 1st Paper (Cellular & Plant Genetics) & 2nd Paper (Human Physiology & Animal Diversity)",
  bio: "Passionate educator with over a decade of experience guiding thousands of students to achieve GPA 5.00 / A+ in Board Exams and top ranks in Medical & University Admissions. Pioneer of simplified conceptual diagramming and structured CQ answer templates.",
  contactNumber: "+880 1712-345678",
  email: "afroza.tahmina@bioedge.edu",
  quote: "Biology is not about rote memorization—it is the elegant logic of living systems. When you grasp the core mechanisms, scoring high marks becomes second nature.",
  rating: "4.98 / 5.0",
  totalStudentsTaught: "4,500+"
};

export const initialPapers: Paper[] = [
  {
    id: "first-paper",
    name: "Biology First Paper",
    code: "HEC-BIO-101",
    description: "Botany, Cellular Biology, Plant Physiology, Genetics & Biotechnology",
    totalChapters: 12,
    completedChapters: 4,
    chapters: [
      {
        id: "c1-01",
        number: "01",
        name: "Cell and Its Structure",
        paperId: "first-paper",
        progress: 100,
        status: "Completed",
        topics: [
          { id: "t1-1", title: "Cell Wall & Plasma Membrane (Fluid Mosaic Model)", status: "Completed", classNum: 1 },
          { id: "t1-2", title: "Cytoplasmic Organelles: Mitochondria & Plastids", status: "Completed", classNum: 2 },
          { id: "t1-3", title: "Ribosomes, Endoplasmic Reticulum & Golgi Body", status: "Completed", classNum: 3 },
          { id: "t1-4", title: "Nucleus, Chromatin & Nucleic Acids (DNA/RNA Structure)", status: "Completed", classNum: 4 }
        ]
      },
      {
        id: "c1-02",
        number: "02",
        name: "Cell Division",
        paperId: "first-paper",
        progress: 100,
        status: "Completed",
        topics: [
          { id: "t2-1", title: "Amitosis & Mitosis Stages (Prophase to Telophase)", status: "Completed", classNum: 5 },
          { id: "t2-2", title: "Significance of Mitosis & Uncontrolled Mitosis (Tumors)", status: "Completed", classNum: 6 },
          { id: "t2-3", title: "Meiosis I & II Phases & Synapsis", status: "Completed", classNum: 7 },
          { id: "t2-4", title: "Crossing Over Mechanism & Genetic Variation", status: "Completed", classNum: 8 }
        ]
      },
      {
        id: "c1-03",
        number: "03",
        name: "Cell Chemistry (Biomolecules)",
        paperId: "first-paper",
        progress: 100,
        status: "Completed",
        topics: [
          { id: "t3-1", title: "Carbohydrates: Monosaccharides, Disaccharides & Polysaccharides", status: "Completed", classNum: 9 },
          { id: "t3-2", title: "Amino Acids & Protein Folding Structures", status: "Completed", classNum: 10 },
          { id: "t3-3", title: "Lipids Classification & Biological Significance", status: "Completed", classNum: 11 },
          { id: "t3-4", title: "Enzymes: Mechanism of Action, Coenzymes & Inhibitors", status: "Completed", classNum: 12 }
        ]
      },
      {
        id: "c1-04",
        number: "04",
        name: "Microorganisms",
        paperId: "first-paper",
        progress: 80,
        status: "In Progress",
        topics: [
          { id: "t4-1", title: "Virus Structure, T2 Bacteriophage & Lytic Cycle", status: "Completed", classNum: 13 },
          { id: "t4-2", title: "Lysogenic Cycle, Hepatitis B & Dengue Pathogenesis", status: "Completed", classNum: 14 },
          { id: "t4-3", title: "Bacteria Morphology, Gram Staining & Reproduction", status: "In Progress", classNum: 15 },
          { id: "t4-4", title: "Malaria Parasite (Plasmodium vivax) Life Cycle", status: "Not Started", classNum: 16 }
        ]
      },
      {
        id: "c1-05",
        number: "05",
        name: "Algae and Fungi",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t5-1", title: "Spirogyra Morphology & Scalariform Conjugation", status: "Not Started", classNum: 17 },
          { id: "t5-2", title: "Agaricus (Mushroom) Anatomy & Basidiospores", status: "Not Started", classNum: 18 },
          { id: "t5-3", title: "Phytophthora infestans (Late Blight) & Lichen Symbiosis", status: "Not Started", classNum: 19 }
        ]
      },
      {
        id: "c1-06",
        number: "06",
        name: "Bryophytes and Pteridophytes",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t6-1", title: "Riccia Morphology & Alternation of Generation", status: "Not Started", classNum: 20 },
          { id: "t6-2", title: "Pteris (Fern) Sporophyte & Gametophyte (Prothallus)", status: "Not Started", classNum: 21 }
        ]
      },
      {
        id: "c1-07",
        number: "07",
        name: "Gymnosperms and Angiosperms",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t7-1", title: "Cycas Characteristics, Coralloid Root & Microsporophyll", status: "Not Started", classNum: 22 },
          { id: "t7-2", title: "Floral Formula, Floral Diagram & Poaceae vs Malvaceae", status: "Not Started", classNum: 23 }
        ]
      },
      {
        id: "c1-08",
        number: "08",
        name: "Tissue and Tissue System",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t8-1", title: "Meristematic Tissue Types & Functional Anatomy", status: "Not Started", classNum: 24 },
          { id: "t8-2", title: "Epidermal, Ground & Vascular Tissue Systems (Stomata & Xylem)", status: "Not Started", classNum: 25 }
        ]
      },
      {
        id: "c1-09",
        number: "09",
        name: "Plant Physiology",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t9-1", title: "Water & Active Mineral Absorption Mechanisms", status: "Not Started", classNum: 26 },
          { id: "t9-2", title: "Photosynthesis: Light Reaction & Photophosphorylation", status: "Not Started", classNum: 27 },
          { id: "t9-3", title: "Calvin (C3) & Hatch-Slack (C4) Cycles Comparison", status: "Not Started", classNum: 28 },
          { id: "t9-4", title: "Respiration: Glycolysis, Krebs Cycle & ETS Yields", status: "Not Started", classNum: 29 }
        ]
      },
      {
        id: "c1-10",
        number: "10",
        name: "Plant Reproduction",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t10-1", title: "Microsporogenesis & Megasporogenesis Development", status: "Not Started", classNum: 30 },
          { id: "t10-2", title: "Double Fertilization & Endosperm Formation", status: "Not Started", classNum: 31 }
        ]
      },
      {
        id: "c1-11",
        number: "11",
        name: "Biotechnology",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t11-1", title: "Plant Tissue Culture Techniques & Micropropagation", status: "Not Started", classNum: 32 },
          { id: "t11-2", title: "Recombinant DNA Technology, Plasmids & Restriction Enzymes", status: "Not Started", classNum: 33 }
        ]
      },
      {
        id: "c1-12",
        number: "12",
        name: "Ecosystem and Environment",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t12-1", title: "Ecosystem Components, Trophic Pyramids & Nutrient Cycles", status: "Not Started", classNum: 34 },
          { id: "t12-2", title: "Biodiversity Conservation & Climate Change Impacts", status: "Not Started", classNum: 35 }
        ]
      }
    ]
  },
  {
    id: "second-paper",
    name: "Biology Second Paper",
    code: "HEC-BIO-102",
    description: "Zoology, Animal Taxonomy, Human Physiology, Genetics & Evolution",
    totalChapters: 12,
    completedChapters: 3,
    chapters: [
      {
        id: "c2-01",
        number: "01",
        name: "Animal Diversity & Classification",
        paperId: "second-paper",
        progress: 100,
        status: "Completed",
        topics: [
          { id: "t21-1", title: "Basis of Classification: Symmetry, Germ Layers, Coelom & Metamerism", status: "Completed", classNum: 36 },
          { id: "t21-2", title: "Major Non-Chordate Phyla (Porifera to Echinodermata)", status: "Completed", classNum: 37 },
          { id: "t21-3", title: "Phylum Chordata & Vertebrate Classes Overview", status: "Completed", classNum: 38 }
        ]
      },
      {
        id: "c2-02",
        number: "02",
        name: "Animal Identification & Morphology",
        paperId: "second-paper",
        progress: 100,
        status: "Completed",
        topics: [
          { id: "t22-1", title: "Hydra: Anatomy, Nematocysts, Locomotion & Budding", status: "Completed", classNum: 39 },
          { id: "t22-2", title: "Grasshopper: Mouthparts, Digestive & Circulatory System", status: "Completed", classNum: 40 },
          { id: "t22-3", title: "Rohu Fish: Operculum, Gills, Lateral Line & Swim Bladder", status: "Completed", classNum: 41 }
        ]
      },
      {
        id: "c2-03",
        number: "03",
        name: "Human Physiology: Digestion & Absorption",
        paperId: "second-paper",
        progress: 90,
        status: "In Progress",
        topics: [
          { id: "t23-1", title: "Digestive Tract Anatomy & Dental Formula", status: "Completed", classNum: 42 },
          { id: "t23-2", title: "Chemical Digestion of Carbohydrates, Proteins & Lipids", status: "Completed", classNum: 43 },
          { id: "t23-3", title: "Liver Architecture, Bile Secretion & Metabolic Functions", status: "Completed", classNum: 44 },
          { id: "t23-4", title: "Nutrient Absorption in Villi & Gastrointestinal Hormones", status: "In Progress", classNum: 45 }
        ]
      },
      {
        id: "c2-04",
        number: "04",
        name: "Human Physiology: Blood & Circulation",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t24-1", title: "Blood Plasma & Formed Elements (RBC, WBC, Platelets)", status: "Not Started", classNum: 46 },
          { id: "t24-2", title: "Cardiac Cycle, Conductive System (SA/AV Node) & ECG", status: "Not Started", classNum: 47 },
          { id: "t24-3", title: "Blood Pressure Regulation, Coronary Circulation & Angioplasty", status: "Not Started", classNum: 48 }
        ]
      },
      {
        id: "c2-05",
        number: "05",
        name: "Human Physiology: Respiration & Gas Exchange",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t25-1", title: "Human Respiratory Tract & Alveolar Microstructure", status: "Not Started" },
          { id: "t25-2", title: "Inspiration/Expiration Mechanism & Lung Volumes", status: "Not Started" },
          { id: "t25-3", title: "Oxygen & Carbon Dioxide Transport in Blood", status: "Not Started" }
        ]
      },
      {
        id: "c2-06",
        number: "06",
        name: "Human Physiology: Excretion & Osmoregulation",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t26-1", title: "Kidney Anatomy & Microscopic Structure of Nephron", status: "Not Started" },
          { id: "t26-2", title: "Ultrafiltration, Reabsorption & Countercurrent Mechanism", status: "Not Started" },
          { id: "t26-3", title: "Renin-Angiotensin System & Hemodialysis", status: "Not Started" }
        ]
      },
      {
        id: "c2-07",
        number: "07",
        name: "Human Physiology: Locomotion & Movement",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t27-1", title: "Human Skeleton: Axial & Appendicular Divisions", status: "Not Started" },
          { id: "t27-2", title: "Synovial Joints & Sliding Filament Theory of Muscle Contraction", status: "Not Started" }
        ]
      },
      {
        id: "c2-08",
        number: "08",
        name: "Human Physiology: Coordination & Endocrine",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t28-1", title: "Brain Divisions, Spinal Cord & Reflex Action", status: "Not Started" },
          { id: "t28-2", title: "Major Endocrine Glands (Pituitary, Thyroid, Adrenal & Pancreas)", status: "Not Started" }
        ]
      },
      {
        id: "c2-09",
        number: "09",
        name: "Human Reproduction & Embryology",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t29-1", title: "Male & Female Reproductive System Anatomy", status: "Not Started" },
          { id: "t29-2", title: "Spermatogenesis, Oogenesis & Menstrual Hormonal Cycle", status: "Not Started" },
          { id: "t29-3", title: "Fertilization, Blastocyst Formation & Placental Functions", status: "Not Started" }
        ]
      },
      {
        id: "c2-10",
        number: "10",
        name: "Human Body Immunity & Defense",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t30-1", title: "First & Second Lines of Non-specific Defense", status: "Not Started" },
          { id: "t30-2", title: "Specific Immunity: B-Cells, T-Cells & Antibody Architecture", status: "Not Started" },
          { id: "t30-3", title: "Vaccination Types & Immunological Memory", status: "Not Started" }
        ]
      },
      {
        id: "c2-11",
        number: "11",
        name: "Genetics and Evolution",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t31-1", title: "Mendel's Monohybrid & Dihybrid Cross Laws", status: "Not Started" },
          { id: "t31-2", title: "Exceptions: Incomplete Dominance, Epistasis & Lethal Genes", status: "Not Started" },
          { id: "t31-3", title: "Sex-Linked Inheritance: Hemophilia & Color Blindness", status: "Not Started" },
          { id: "t31-4", title: "Darwinian Natural Selection & Speciation Evidence", status: "Not Started" }
        ]
      },
      {
        id: "c2-12",
        number: "12",
        name: "Animal Behavior",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t32-1", title: "Innate Behavior: Taxes, Reflexes & Fixed Action Patterns (FAP)", status: "Not Started" },
          { id: "t32-2", title: "Learned Behavior: Habituation, Imprinting & Conditioning", status: "Not Started" }
        ]
      }
    ]
  }
];

export const initialClasses: ClassSession[] = [
  {
    id: "cls-18",
    classNumber: 18,
    title: "Class 18: Agaricus (Mushroom) Anatomy & Basidiospore Life Cycle",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 05",
    chapterName: "Algae and Fungi",
    topic: "Agaricus Structure, Gills & Spore Formation",
    date: "2026-09-17",
    time: "7:00 PM – 8:30 PM",
    day: "Thursday",
    status: "Upcoming",
    isNext: true,
    teacher: "Afroza Tahmina",
    meetLink: "https://meet.bioedge.edu/live-cls-18",
    materials: "Chapter 05 Handout PDF + Colored Diagram Notes"
  },
  {
    id: "cls-17",
    classNumber: 17,
    title: "Class 17: Spirogyra Morphology & Scalariform Conjugation",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 05",
    chapterName: "Algae and Fungi",
    topic: "Spirogyra Chloroplast Spiral Anatomy & Zygospore",
    date: "2026-09-15",
    time: "7:00 PM – 8:30 PM",
    day: "Tuesday",
    status: "Completed",
    isNext: false,
    teacher: "Afroza Tahmina",
    meetLink: "https://meet.bioedge.edu/live-cls-17",
    materials: "Class 17 Board Notes & Lecture Recording"
  },
  {
    id: "cls-16",
    classNumber: 16,
    title: "Class 16: Malaria Parasite (Plasmodium) Life Cycle & Vector Control",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 04",
    chapterName: "Microorganisms",
    topic: "Schizogony in Liver & Erythrocytes, Sporogony in Mosquito",
    date: "2026-09-13",
    time: "7:00 PM – 8:30 PM",
    day: "Sunday",
    status: "Completed",
    isNext: false,
    teacher: "Afroza Tahmina",
    materials: "Class 16 Summary PDF"
  },
  {
    id: "cls-15",
    classNumber: 15,
    title: "Class 15: Bacterial Morphology, Gram Staining & Transformation",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 04",
    chapterName: "Microorganisms",
    topic: "Peptidoglycan Cell Wall & Binary Fission",
    date: "2026-09-10",
    time: "7:00 PM – 8:30 PM",
    day: "Thursday",
    status: "Completed",
    isNext: false,
    teacher: "Afroza Tahmina",
    materials: "Class 15 Handout & Quiz"
  },
  {
    id: "cls-14",
    classNumber: 14,
    title: "Class 14: Lysogenic Cycle, Hepatitis B & Dengue Pathogenesis",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 04",
    chapterName: "Microorganisms",
    topic: "Prophage Integration & NS1 Viral Antigen",
    date: "2026-09-08",
    time: "7:00 PM – 8:30 PM",
    day: "Tuesday",
    status: "Completed",
    isNext: false,
    teacher: "Afroza Tahmina"
  },
  {
    id: "cls-19",
    classNumber: 19,
    title: "Class 19: Phytophthora infestans & Lichen Symbiotic Thallus",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 05",
    chapterName: "Algae and Fungi",
    topic: "Late Blight of Potato & Mycobiont/Phycobiont Synergy",
    date: "2026-09-20",
    time: "7:00 PM – 8:30 PM",
    day: "Sunday",
    status: "Upcoming",
    isNext: false,
    teacher: "Afroza Tahmina"
  },
  {
    id: "cls-20",
    classNumber: 20,
    title: "Class 20: Riccia Morphology & Amphibious Adaptations",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "Chapter 06",
    chapterName: "Bryophytes and Pteridophytes",
    topic: "Thalloid Structure, Rhizoids & Sporogonium",
    date: "2026-09-22",
    time: "7:00 PM – 8:30 PM",
    day: "Tuesday",
    status: "Upcoming",
    isNext: false,
    teacher: "Afroza Tahmina"
  }
];

export const initialTests: Test[] = [
  {
    id: "test-01",
    title: "Chapter 03 MCQ Practice: Cell Chemistry & Biomolecules",
    type: "MCQ",
    category: "Chapter Practice",
    paper: "Biology First Paper",
    chapterId: "c1-03",
    chapterName: "Chapter 03: Cell Chemistry",
    durationMinutes: 20,
    totalQuestions: 20,
    totalMarks: 20,
    status: "Completed",
    score: 18,
    submittedAt: "2026-09-09 20:45",
    questions: [
      {
        id: "q-1",
        question: "Which of the following bonds connects monosaccharide subunits in a cellulose polymer?",
        options: [
          "Alpha 1,4-Glycosidic bond",
          "Beta 1,4-Glycosidic bond",
          "Alpha 1,6-Glycosidic bond",
          "Beta 1,6-Phosphodiester bond"
        ],
        correctAnswer: 1,
        selectedAnswer: 1,
        explanation: "Cellulose consists of unbranched D-glucose units connected specifically by beta-1,4-glycosidic bonds, making it resistant to human amylase.",
        marks: 1
      },
      {
        id: "q-2",
        question: "During protein synthesis, which secondary structure is stabilized by intrachain hydrogen bonds between every 4th amino acid peptide bond?",
        options: [
          "Beta-pleated sheet",
          "Alpha-helix",
          "Collagen triple helix",
          "Random coil"
        ],
        correctAnswer: 1,
        selectedAnswer: 1,
        explanation: "The alpha-helix structure is stabilized by intrachain hydrogen bonding between the carbonyl oxygen of residue n and the amide hydrogen of residue n+4.",
        marks: 1
      },
      {
        id: "q-3",
        question: "Which of the following describes the non-protein organic cofactor tightly bound to an active enzyme?",
        options: [
          "Coenzyme",
          "Apoenzyme",
          "Prosthetic group",
          "Zymogen"
        ],
        correctAnswer: 2,
        selectedAnswer: 2,
        explanation: "A prosthetic group is an organic non-protein component covalently or firmly bound to the apoenzyme (e.g. Heme in catalase).",
        marks: 1
      },
      {
        id: "q-4",
        question: "What is the primary lipid component of the myelin sheath in human nerve axons?",
        options: [
          "Phosphatidylcholine",
          "Sphingomyelin",
          "Cholesterol ester",
          "Triacylglycerol"
        ],
        correctAnswer: 1,
        selectedAnswer: 0,
        explanation: "Sphingomyelin is a specialized sphingophospholipid abundant in myelin sheaths insulating peripheral nerves.",
        marks: 1
      },
      {
        id: "q-5",
        question: "Which enzyme catalyzes the conversion of Fructose-6-phosphate to Fructose-1,6-bisphosphate in glycolysis?",
        options: [
          "Hexokinase",
          "Phosphofructokinase-1 (PFK-1)",
          "Aldolase",
          "Phosphoglucose isomerase"
        ],
        correctAnswer: 1,
        selectedAnswer: 1,
        explanation: "PFK-1 is the key rate-limiting, committed enzyme in the glycolytic pathway requiring ATP.",
        marks: 1
      }
    ]
  },
  {
    id: "test-02",
    title: "Chapter 04 MCQ Intensive: Viruses & Bacterial Genetics",
    type: "MCQ",
    category: "Chapter Practice",
    paper: "Biology First Paper",
    chapterId: "c1-04",
    chapterName: "Chapter 04: Microorganisms",
    durationMinutes: 20,
    totalQuestions: 15,
    totalMarks: 15,
    status: "Available",
    score: null,
    questions: [
      {
        id: "q-201",
        question: "Which structural protein forms the contractible sheath of the T2 Bacteriophage tail?",
        options: [
          "Capsid protomer",
          "Actin-like contractile protein",
          "Lysozyme baseplate",
          "Reverse transcriptase"
        ],
        correctAnswer: 1,
        explanation: "The tail sheath of T2 phage contracts using ATP-derived energy to inject viral double-stranded DNA across the E. coli peptidoglycan wall.",
        marks: 1
      },
      {
        id: "q-202",
        question: "In the Plasmodium life cycle, where does the exflagellation of microgametocytes take place?",
        options: [
          "Human liver sinusoid",
          "Human red blood cell",
          "Mosquito stomach (midgut lumen)",
          "Mosquito salivary gland"
        ],
        correctAnswer: 2,
        explanation: "Exflagellation produces 4-8 whip-like flagellated microgametes inside the stomach lumen of the female Anopheles mosquito.",
        marks: 1
      },
      {
        id: "q-203",
        question: "Which component is characteristic of Gram-positive bacterial cell walls but absent in Gram-negative bacteria?",
        options: [
          "Lipopolysaccharide (LPS)",
          "Teichoic acid",
          "Periplasmic space",
          "Outer membrane"
        ],
        correctAnswer: 1,
        explanation: "Teichoic acid and lipoteichoic acid are polyol phosphate polymers embedded in the thick peptidoglycan layer of Gram-positive bacteria.",
        marks: 1
      },
      {
        id: "q-204",
        question: "Which type of hepatitis virus possesses a partially double-stranded circular DNA genome?",
        options: [
          "Hepatitis A Virus (HAV)",
          "Hepatitis B Virus (HBV)",
          "Hepatitis C Virus (HCV)",
          "Hepatitis E Virus (HEV)"
        ],
        correctAnswer: 1,
        explanation: "HBV is a Hepadnavirus with a relaxed circular partially double-stranded DNA genome that utilizes reverse transcription.",
        marks: 1
      }
    ]
  },
  {
    id: "test-03",
    title: "CQ Written Practice: Cell Division & Genetic Crossover",
    type: "CQ",
    category: "CQ/SQ Practice",
    paper: "Biology First Paper",
    chapterId: "c1-02",
    chapterName: "Chapter 02: Cell Division",
    durationMinutes: 30,
    totalQuestions: 2,
    totalMarks: 20,
    status: "Completed",
    score: 17,
    teacherFeedback: "Excellent structural clarity in drawing the pachytene tetrad and chiasma! Add labels for non-sister chromatids next time.",
    submittedAt: "2026-09-04 18:20"
  },
  {
    id: "test-04",
    title: "Full Syllabus Model Test 01: First Paper Comprehensive",
    type: "Model Test",
    category: "Full Syllabus Model Tests",
    paper: "Biology First Paper",
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 50,
    status: "Upcoming",
    scheduledDate: "2026-10-15 10:00 AM"
  },
  {
    id: "test-05",
    title: "Full Syllabus Model Test 02: Second Paper Comprehensive",
    type: "Model Test",
    category: "Full Syllabus Model Tests",
    paper: "Biology Second Paper",
    durationMinutes: 60,
    totalQuestions: 50,
    totalMarks: 50,
    status: "Upcoming",
    scheduledDate: "2026-10-25 10:00 AM"
  }
];

export const initialStudents: Student[] = [
  {
    id: "std-001",
    name: "Tariqul Islam",
    studentId: "BE-2026-001",
    email: "tariqul@gmail.com",
    phone: "+880 1819-112233",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-15",
    status: "Active",
    courseProgress: 72,
    averageScore: 86.5,
    classesAttended: 32,
    testsCompleted: 12,
    paper1Score: 88,
    paper2Score: 85,
    lastActive: "Today at 3:15 PM"
  },
  {
    id: "std-002",
    name: "Nusrat Jahan Fariha",
    studentId: "BE-2026-002",
    email: "fariha.bio@gmail.com",
    phone: "+880 1711-445566",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-16",
    status: "Active",
    courseProgress: 78,
    averageScore: 92.0,
    classesAttended: 34,
    testsCompleted: 14,
    paper1Score: 94,
    paper2Score: 90,
    lastActive: "Yesterday"
  },
  {
    id: "std-003",
    name: "Shahriar Hassan",
    studentId: "BE-2026-003",
    email: "shahriar.h@gmail.com",
    phone: "+880 1912-778899",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-18",
    status: "Active",
    courseProgress: 65,
    averageScore: 78.4,
    classesAttended: 29,
    testsCompleted: 10,
    paper1Score: 80,
    paper2Score: 76,
    lastActive: "2 days ago"
  },
  {
    id: "std-004",
    name: "Anika Tabassum",
    studentId: "BE-2026-004",
    email: "anika.tabassum@gmail.com",
    phone: "+880 1610-334455",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-20",
    status: "Active",
    courseProgress: 84,
    averageScore: 94.2,
    classesAttended: 35,
    testsCompleted: 15,
    paper1Score: 96,
    paper2Score: 92,
    lastActive: "Today at 5:00 PM"
  },
  {
    id: "std-005",
    name: "Mahir Faisal",
    studentId: "BE-2026-005",
    email: "mahir.faisal@gmail.com",
    phone: "+880 1521-998877",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-22",
    status: "Active",
    courseProgress: 58,
    averageScore: 71.0,
    classesAttended: 26,
    testsCompleted: 8,
    paper1Score: 74,
    paper2Score: 68,
    lastActive: "3 days ago"
  },
  {
    id: "std-006",
    name: "Sumiya Akter",
    studentId: "BE-2026-006",
    email: "sumiya.akter@gmail.com",
    phone: "+880 1733-123456",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-25",
    status: "Active",
    courseProgress: 75,
    averageScore: 87.0,
    classesAttended: 33,
    testsCompleted: 13,
    paper1Score: 89,
    paper2Score: 85,
    lastActive: "Today"
  },
  {
    id: "std-007",
    name: "Rifat Bin Alam",
    studentId: "BE-2026-007",
    email: "rifat.alam@gmail.com",
    phone: "+880 1844-654321",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-08-28",
    status: "Active",
    courseProgress: 70,
    averageScore: 83.2,
    classesAttended: 31,
    testsCompleted: 11,
    paper1Score: 85,
    paper2Score: 81,
    lastActive: "Yesterday"
  },
  {
    id: "std-008",
    name: "Tahmina Chowdhury",
    studentId: "BE-2026-008",
    email: "tahmina.c@gmail.com",
    phone: "+880 1955-987654",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-01",
    status: "Active",
    courseProgress: 81,
    averageScore: 91.5,
    classesAttended: 35,
    testsCompleted: 14,
    paper1Score: 93,
    paper2Score: 90,
    lastActive: "Today"
  },
  {
    id: "std-009",
    name: "Sabbir Ahmed",
    studentId: "BE-2026-009",
    email: "sabbir.ahmed@gmail.com",
    phone: "+880 1766-321654",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-02",
    status: "Active",
    courseProgress: 68,
    averageScore: 79.5,
    classesAttended: 30,
    testsCompleted: 10,
    paper1Score: 81,
    paper2Score: 78,
    lastActive: "4 days ago"
  },
  {
    id: "std-010",
    name: "Lamia Rahman",
    studentId: "BE-2026-010",
    email: "lamia.r@gmail.com",
    phone: "+880 1677-789123",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-03",
    status: "Active",
    courseProgress: 74,
    averageScore: 85.0,
    classesAttended: 32,
    testsCompleted: 12,
    paper1Score: 87,
    paper2Score: 83,
    lastActive: "Today"
  },
  {
    id: "std-011",
    name: "Kazi Tanvir",
    studentId: "BE-2026-011",
    email: "tanvir.k@gmail.com",
    phone: "+880 1588-456789",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-04",
    status: "Active",
    courseProgress: 62,
    averageScore: 75.0,
    classesAttended: 28,
    testsCompleted: 9,
    paper1Score: 76,
    paper2Score: 74,
    lastActive: "2 days ago"
  },
  {
    id: "std-012",
    name: "Sadia Sultana",
    studentId: "BE-2026-012",
    email: "sadia.s@gmail.com",
    phone: "+880 1799-159357",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-05",
    status: "Active",
    courseProgress: 88,
    averageScore: 96.0,
    classesAttended: 36,
    testsCompleted: 16,
    paper1Score: 97,
    paper2Score: 95,
    lastActive: "Today"
  },
  {
    id: "std-013",
    name: "Abrar Fahim",
    studentId: "BE-2026-013",
    email: "abrar.fahim@gmail.com",
    phone: "+880 1833-753951",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-06",
    status: "Active",
    courseProgress: 66,
    averageScore: 77.5,
    classesAttended: 29,
    testsCompleted: 10,
    paper1Score: 79,
    paper2Score: 76,
    lastActive: "Yesterday"
  },
  {
    id: "std-014",
    name: "Zerin Tasnim",
    studentId: "BE-2026-014",
    email: "zerin.t@gmail.com",
    phone: "+880 1944-852963",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-07",
    status: "Active",
    courseProgress: 76,
    averageScore: 89.0,
    classesAttended: 33,
    testsCompleted: 13,
    paper1Score: 91,
    paper2Score: 87,
    lastActive: "Today"
  },
  {
    id: "std-015",
    name: "Ishraq Hossain",
    studentId: "BE-2026-015",
    email: "ishraq.h@gmail.com",
    phone: "+880 1622-147258",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-08",
    status: "Active",
    courseProgress: 70,
    averageScore: 82.0,
    classesAttended: 31,
    testsCompleted: 11,
    paper1Score: 84,
    paper2Score: 80,
    lastActive: "Yesterday"
  },
  {
    id: "std-016",
    name: "Farhana Parveen",
    studentId: "BE-2026-016",
    email: "farhana.p@gmail.com",
    phone: "+880 1755-369258",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-09",
    status: "Active",
    courseProgress: 82,
    averageScore: 90.5,
    classesAttended: 35,
    testsCompleted: 14,
    paper1Score: 92,
    paper2Score: 89,
    lastActive: "Today"
  },
  {
    id: "std-017",
    name: "Nabil Mostafa",
    studentId: "BE-2026-017",
    email: "nabil.m@gmail.com",
    phone: "+880 1866-951753",
    batch: "Alpha Cohort",
    enrollmentDate: "2026-09-10",
    status: "Active",
    courseProgress: 69,
    averageScore: 80.0,
    classesAttended: 30,
    testsCompleted: 11,
    paper1Score: 82,
    paper2Score: 78,
    lastActive: "2 days ago"
  }
];

export const initialFeedbacks: FeedbackItem[] = [
  {
    id: "fb-1",
    studentId: "std-001",
    studentName: "Tariqul Islam",
    teacherName: "Afroza Tahmina",
    category: "MCQ",
    title: "MCQ Accuracy Improvement on Cell Chemistry",
    message: "Your MCQ accuracy on biomolecules has reached 85%, which is excellent. However, make sure to review the differences between alpha and beta glycosidic bonds and prosthetic groups.",
    attachedTo: "Chapter 03 MCQ Practice",
    date: "2026-09-10",
    unread: false
  },
  {
    id: "fb-2",
    studentId: "std-001",
    studentName: "Tariqul Islam",
    teacherName: "Afroza Tahmina",
    category: "Diagram",
    title: "Focus on Prophase-I Meiotic Synapsis Diagrams",
    message: "Your written answers in the CQ practice are very well articulated. Ensure the chiasmata intersection points in your Pachytene diagram are sharp and accurately labelled.",
    attachedTo: "Chapter 02 CQ Practice",
    date: "2026-09-05",
    unread: false
  },
  {
    id: "fb-3",
    studentId: "std-001",
    studentName: "Tariqul Islam",
    teacherName: "Afroza Tahmina",
    category: "Exam Strategy",
    title: "Time Management in Model Tests",
    message: "You took 14 minutes for the 20-question test. In the final Board Model Test, target 1 minute per question so you have a full 5 minutes for rechecking.",
    attachedTo: "Overall Progress",
    date: "2026-08-28",
    unread: false
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Upcoming Live Class Tomorrow",
    message: "Class 18: Agaricus (Mushroom) Anatomy & Basidiospores is scheduled for Thursday, 7:00 PM.",
    type: "class",
    read: false,
    date: "2 hours ago"
  },
  {
    id: "notif-2",
    title: "New Practice Test Available",
    message: "Chapter 04 MCQ Intensive: Viruses & Bacterial Genetics is now open for practice.",
    type: "test",
    read: false,
    date: "1 day ago"
  },
  {
    id: "notif-3",
    title: "Teacher Feedback Added",
    message: "Afroza Tahmina posted feedback on your recent Chapter 03 test.",
    type: "feedback",
    read: true,
    date: "2 days ago"
  },
  {
    id: "notif-4",
    title: "Study Material Uploaded",
    message: "Chapter 05 Comprehensive Handout & Diagram Guide PDF is now available in your Course section.",
    type: "material",
    read: true,
    date: "3 days ago"
  }
];

export const initialFAQs: FAQItem[] = [
  {
    q: "Who is this program designed for?",
    a: "This intensive program is designed specifically for Higher Secondary (HEC) students targeting an A+ / GPA 5.00 in Biology First and Second Paper, as well as students aspiring for top medical and university biology admissions."
  },
  {
    q: "Why is the batch size limited to only 15–20 students?",
    a: "We intentionally cap our cohort at 15–20 students to preserve individual attention. Afroza Tahmina personally reviews each student's written CQ answers, evaluates MCQ speed patterns, and delivers tailored one-on-one feedback."
  },
  {
    q: "What if I miss a live scheduled class?",
    a: "Every live class recording is uploaded to the student portal within 2 hours along with lecture notes, high-resolution annotated board diagrams, and supplementary practice worksheets."
  },
  {
    q: "How are the practice tests and model tests structured?",
    a: "The program incorporates chapter-wise MCQ tests, written CQ/SQ test assessments with manual teacher evaluation, board question solve sessions, and full-syllabus timed model tests modeled after the latest board exam standards."
  },
  {
    q: "Can I pay monthly or do I have to pay for the full 4 months upfront?",
    a: "We offer both flexible monthly installments and a discounted full course package. Both options can be selected directly through the online enrollment portal."
  }
];

export const initialEnrollments: EnrollmentRecord[] = [
  {
    id: "enr-001",
    name: "Tariqul Islam",
    email: "tariqul@gmail.com",
    schoolCollege: "Notre Dame College, Dhaka",
    whatsappNumber: "01711223344",
    paymentNumber: "01711223344",
    transactionId: "9K8J7H6G5F",
    amount: "12500",
    paymentMethod: "bKash",
    courseKey: "alpha-cohort",
    courseTitle: "Alpha Cohort (HSC Biology Intensive)",
    plan: "full",
    submittedAt: "2026-09-14T10:30:00Z",
    status: "Approved",
    reviewedAt: "2026-09-14T11:15:00Z",
    reviewedBy: "admin.nioedge@gmail.com",
    notes: "Verified payment via bKash statement. Full cohort seat confirmed."
  },
  {
    id: "enr-002",
    name: "Sumaiya Akter",
    email: "sumaiya.akter@gmail.com",
    schoolCollege: "Viqarunnisa Noon School & College",
    whatsappNumber: "01822334455",
    paymentNumber: "01822334455",
    transactionId: "8A7B6C5D4E",
    amount: "12500",
    paymentMethod: "Nagad",
    courseKey: "alpha-cohort",
    courseTitle: "Alpha Cohort (HSC Biology Intensive)",
    plan: "full",
    submittedAt: "2026-09-16T18:45:00Z",
    status: "Pending",
    notes: "Applied for Alpha Cohort full course. Awaiting transaction verification."
  },
  {
    id: "enr-003",
    name: "Mehedi Hasan",
    email: "mehedi.hasan@gmail.com",
    schoolCollege: "Dhaka Residential Model College",
    whatsappNumber: "01933445566",
    paymentNumber: "01933445566",
    transactionId: "7M6N5B4V3C",
    amount: "2200",
    paymentMethod: "bKash",
    courseKey: "ssc-2027",
    courseTitle: "SSC 2027 Model Test Package",
    plan: "full",
    submittedAt: "2026-09-16T21:10:00Z",
    status: "Pending",
    notes: "Submitted for 20 Model Tests batch. TrxID needs cross-check."
  },
  {
    id: "enr-004",
    name: "Rafiqul Alam",
    email: "rafiqul.alam@gmail.com",
    schoolCollege: "Ideal School and College, Motijheel",
    whatsappNumber: "01544556677",
    paymentNumber: "01544556677",
    transactionId: "CASH",
    amount: "2200",
    paymentMethod: "Cash",
    courseKey: "ssc-2027",
    courseTitle: "SSC 2027 Model Test Package",
    plan: "full",
    submittedAt: "2026-09-15T14:20:00Z",
    status: "Approved",
    reviewedAt: "2026-09-15T15:00:00Z",
    reviewedBy: "admin.nioedge@gmail.com",
    notes: "Paid cash in person at Dhaka academic counseling desk."
  },
  {
    id: "enr-005",
    name: "Tasnim Jahan",
    email: "tasnim.jahan@gmail.com",
    schoolCollege: "Holy Cross College, Dhaka",
    whatsappNumber: "01655667788",
    paymentNumber: "01655667788",
    transactionId: "5X4Y3Z2W1V",
    amount: "3500",
    paymentMethod: "Rocket",
    courseKey: "alpha-cohort",
    courseTitle: "Alpha Cohort (HSC Biology Intensive)",
    plan: "monthly",
    submittedAt: "2026-09-17T02:15:00Z",
    status: "Pending",
    notes: "First monthly installment. Awaiting Rocket Trx verification."
  }
];

