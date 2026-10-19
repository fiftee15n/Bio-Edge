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
    completedChapters: 0,
    chapters: [
      {
        id: "c1-01",
        number: "01",
        numberBn: "১",
        name: "কোষ ও এর গঠন",
        nameBn: "কোষ ও এর গঠন",
        nameEn: "Cell and Its Structure",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t1-1", title: "কোষ প্রাচীর ও প্লাজমামেনব্রেন (ফ্লুইড মোজাইক মডেল)", titleBn: "কোষ প্রাচীর ও প্লাজমামেনব্রেন (ফ্লুইড মোজাইক মডেল)", titleEn: "Cell Wall & Plasma Membrane (Fluid Mosaic Model)", status: "Not Started", classNum: 1 },
          { id: "t1-2", title: "সাইটোপ্লাজমীয় অঙ্গাণু: মাইটোকনড্রিয়া ও প্লাস্টিড", titleBn: "সাইটোপ্লাজমীয় অঙ্গাণু: মাইটোকনড্রিয়া ও প্লাস্টিড", titleEn: "Cytoplasmic Organelles: Mitochondria & Plastids", status: "Not Started", classNum: 2 },
          { id: "t1-3", title: "রাইবোজোম, এন্ডোপ্লাজমিক রেটিকুলাম ও গলগি বডি", titleBn: "রাইবোজোম, এন্ডোপ্লাজমিক রেটিকুলাম ও গলগি বডি", titleEn: "Ribosomes, Endoplasmic Reticulum & Golgi Body", status: "Not Started", classNum: 3 },
          { id: "t1-4", title: "নিউক্লিয়াস, ক্রোমাটিন ও নিউক্লিক অ্যাসিড (ডিএনএ/আরএনএ)", titleBn: "নিউক্লিয়াস, ক্রোমাটিন ও নিউক্লিক অ্যাসিড (ডিএনএ/আরএনএ)", titleEn: "Nucleus, Chromatin & Nucleic Acids (DNA/RNA Structure)", status: "Not Started", classNum: 4 }
        ]
      },
      {
        id: "c1-02",
        number: "02",
        numberBn: "২",
        name: "কোষ বিভাজন",
        nameBn: "কোষ বিভাজন",
        nameEn: "Cell Division",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t2-1", title: "অ্যামাইটোসিস ও মাইটোসিসের ধাপসমূহ (প্রোফেজ থেকে টেলোফেজ)", titleBn: "অ্যামাইটোসিস ও মাইটোসিসের ধাপসমূহ (প্রোফেজ থেকে টেলোফেজ)", titleEn: "Amitosis & Mitosis Stages (Prophase to Telophase)", status: "Not Started", classNum: 5 },
          { id: "t2-2", title: "মাইটোসিসের তাৎপর্য ও অনিয়ন্ত্রিত মাইটোসিস (টিউমার/ক্যান্সার)", titleBn: "মাইটোসিসের তাৎপর্য ও অনিয়ন্ত্রিত মাইটোসিস (টিউমার/ক্যান্সার)", titleEn: "Significance of Mitosis & Uncontrolled Mitosis (Tumors)", status: "Not Started", classNum: 6 },
          { id: "t2-3", title: "মায়োসিস ১ ও ২ এর ধাপসমূহ এবং সিন্যাপসিস", titleBn: "মায়োসিস ১ ও ২ এর ধাপসমূহ এবং সিন্যাপসিস", titleEn: "Meiosis I & II Phases & Synapsis", status: "Not Started", classNum: 7 },
          { id: "t2-4", title: "ক্রসিং ওভার কৌশল ও জিনগত বৈচিত্র্য", titleBn: "ক্রসিং ওভার কৌশল ও জিনগত বৈচিত্র্য", titleEn: "Crossing Over Mechanism & Genetic Variation", status: "Not Started", classNum: 8 }
        ]
      },
      {
        id: "c1-03",
        number: "03",
        numberBn: "৩",
        name: "কোষ রসায়ন",
        nameBn: "কোষ রসায়ন",
        nameEn: "Cell Chemistry (Biomolecules)",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t3-1", title: "কার্বোহাইড্রেট: মনোস্যাকারাইড, ডাইস্যাকারাইড ও পলিস্যাকারাইড", titleBn: "কার্বোহাইড্রেট: মনোস্যাকারাইড, ডাইস্যাকারাইড ও পলিস্যাকারাইড", titleEn: "Carbohydrates: Monosaccharides, Disaccharides & Polysaccharides", status: "Not Started", classNum: 9 },
          { id: "t3-2", title: "অ্যামিনো অ্যাসিড ও প্রোটিনের বিভিন্ন গঠন", titleBn: "অ্যামিনো অ্যাসিড ও প্রোটিনের বিভিন্ন গঠন", titleEn: "Amino Acids & Protein Folding Structures", status: "Not Started", classNum: 10 },
          { id: "t3-3", title: "লিপিডের শ্রেণিবিন্যাস ও জৈবিক গুরুত্ব", titleBn: "লিপিডের শ্রেণিবিন্যাস ও জৈবিক গুরুত্ব", titleEn: "Lipids Classification & Biological Significance", status: "Not Started", classNum: 11 },
          { id: "t3-4", title: "এনজাইম: ক্রিয়া কৌশল, কো-এনজাইম ও ইনহিবিটর", titleBn: "এনজাইম: ক্রিয়া কৌশল, কো-এনজাইম ও ইনহিবিটর", titleEn: "Enzymes: Mechanism of Action, Coenzymes & Inhibitors", status: "Not Started", classNum: 12 }
        ]
      },
      {
        id: "c1-04",
        number: "04",
        numberBn: "৪",
        name: "অণুজীব",
        nameBn: "অণুজীব",
        nameEn: "Microorganisms",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t4-1", title: "ভাইরাসের গঠন, টি২ ব্যাকটেরিওফাজ ও লাইটিক চক্র", titleBn: "ভাইরাসের গঠন, টি২ ব্যাকটেরিওফাজ ও লাইটিক চক্র", titleEn: "Virus Structure, T2 Bacteriophage & Lytic Cycle", status: "Not Started", classNum: 13 },
          { id: "t4-2", title: "লাইসোজেনিক চক্র, হেপাটাইটিস বি ও ডেঙ্গু রোগতত্ত্ব", titleBn: "লাইসোজেনিক চক্র, হেপাটাইটিস বি ও ডেঙ্গু রোগতত্ত্ব", titleEn: "Lysogenic Cycle, Hepatitis B & Dengue Pathogenesis", status: "Not Started", classNum: 14 },
          { id: "t4-3", title: "ব্যাকটেরিয়ার গঠন, গ্রাম স্টেইনিং ও জনন প্রক্রিয়া", titleBn: "ব্যাকটেরিয়ার গঠন, গ্রাম স্টেইনিং ও জনন প্রক্রিয়া", titleEn: "Bacteria Morphology, Gram Staining & Reproduction", status: "Not Started", classNum: 15 },
          { id: "t4-4", title: "ম্যালেরিয়া পরজীবী (প্লাজমোডিয়াম)-এর জীবনচক্র", titleBn: "ম্যালেরিয়া পরজীবী (প্লাজমোডিয়াম)-এর জীবনচক্র", titleEn: "Malaria Parasite (Plasmodium vivax) Life Cycle", status: "Not Started", classNum: 16 }
        ]
      },
      {
        id: "c1-05",
        number: "05",
        numberBn: "৫",
        name: "শৈবাল ও ছত্রাক",
        nameBn: "শৈবাল ও ছত্রাক",
        nameEn: "Algae and Fungi",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t5-1", title: "স্পাইরোগাইরার গঠন ও মই-সদৃশ কনজুগেশন", titleBn: "স্পাইরোগাইরার গঠন ও মই-সদৃশ কনজুগেশন", titleEn: "Spirogyra Morphology & Scalariform Conjugation", status: "Not Started", classNum: 17 },
          { id: "t5-2", title: "অ্যাগারিকাস (মাশরুম)-এর দৈহিক গঠন ও বেসিডিওস্পোর", titleBn: "অ্যাগারিকাস (মাশরুম)-এর দৈহিক গঠন ও বেসিডিওস্পোর", titleEn: "Agaricus (Mushroom) Anatomy & Basidiospores", status: "Not Started", classNum: 18 },
          { id: "t5-3", title: "আলুর বিলম্বিত ধসা রোগ (ফাইটোপথোরা) ও লাইকেন", titleBn: "আলুর বিলম্বিত ধসা রোগ (ফাইটোপথোরা) ও লাইকেন", titleEn: "Phytophthora infestans (Late Blight) & Lichen Symbiosis", status: "Not Started", classNum: 19 }
        ]
      },
      {
        id: "c1-06",
        number: "06",
        numberBn: "৬",
        name: "ব্রায়োফাইটা ও টেরিডোফাইটা",
        nameBn: "ব্রায়োফাইটা ও টেরিডোফাইটা",
        nameEn: "Bryophytes and Pteridophytes",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t6-1", title: "রিকসিয়া-র দৈহিক গঠন ও জনুক্রম", titleBn: "রিকসিয়া-র দৈহিক গঠন ও জনুক্রম", titleEn: "Riccia Morphology & Alternation of Generation", status: "Not Started", classNum: 20 },
          { id: "t6-2", title: "টেরিস (ফার্ন)-এর রেণুধর ও লিঙ্গধর (প্রোথ্যালাস) উদ্ভিদ", titleBn: "টেরিস (ফার্ন)-এর রেণুধর ও লিঙ্গধর (প্রোথ্যালাস) উদ্ভিদ", titleEn: "Pteris (Fern) Sporophyte & Gametophyte (Prothallus)", status: "Not Started", classNum: 21 }
        ]
      },
      {
        id: "c1-07",
        number: "07",
        numberBn: "৭",
        name: "নগ্নবীজী ও আবৃতবীজী উদ্ভিদ",
        nameBn: "নগ্নবীজী ও আবৃতবীজী উদ্ভিদ",
        nameEn: "Gymnosperms and Angiosperms",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t7-1", title: "সাইকাস-এর বৈশিষ্ট্য, কোরালয়েড মূল ও পুংরেণুপত্র", titleBn: "সাইকাস-এর বৈশিষ্ট্য, কোরালয়েড মূল ও পুংরেণুপত্র", titleEn: "Cycas Characteristics, Coralloid Root & Microsporophyll", status: "Not Started", classNum: 22 },
          { id: "t7-2", title: "পুষ্পপ্রতীক, পুষ্পসংকেত এবং পোয়াসি ও মালভেসি গোত্র", titleBn: "পুষ্পপ্রতীক, পুষ্পসংকেত এবং পোয়াসি ও মালভেসি গোত্র", titleEn: "Floral Formula, Floral Diagram & Poaceae vs Malvaceae", status: "Not Started", classNum: 23 }
        ]
      },
      {
        id: "c1-08",
        number: "08",
        numberBn: "৮",
        name: "টিস্যু ও টিস্যুতন্ত্র",
        nameBn: "টিস্যু ও টিস্যুতন্ত্র",
        nameEn: "Tissue and Tissue System",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t8-1", title: "ভাজক টিস্যুর প্রকারভেদ ও অভ্যন্তরীণ গঠন", titleBn: "ভাজক টিস্যুর প্রকারভেদ ও অভ্যন্তরীণ গঠন", titleEn: "Meristematic Tissue Types & Functional Anatomy", status: "Not Started", classNum: 24 },
          { id: "t8-2", title: "ত্বকীয়, ভিত্তি ও সংবহন টিস্যুতন্ত্র (পত্ররন্ধ্র ও জাইলেম)", titleBn: "ত্বকীয়, ভিত্তি ও সংবহন টিস্যুতন্ত্র (পত্ররন্ধ্র ও জাইলেম)", titleEn: "Epidermal, Ground & Vascular Tissue Systems (Stomata & Xylem)", status: "Not Started", classNum: 25 }
        ]
      },
      {
        id: "c1-09",
        number: "09",
        numberBn: "৯",
        name: "উদ্ভিদ শারীরতত্ত্ব",
        nameBn: "উদ্ভিদ শারীরতত্ত্ব",
        nameEn: "Plant Physiology",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t9-1", title: "পানি ও খনিজ লবণ পরিশোষণ কৌশল", titleBn: "পানি ও খনিজ লবণ পরিশোষণ কৌশল", titleEn: "Water & Active Mineral Absorption Mechanisms", status: "Not Started", classNum: 26 },
          { id: "t9-2", title: "সালোকসংশ্লেষণ: আলোক পর্যায় ও ফটোফসফোরাইলেশন", titleBn: "সালোকসংশ্লেষণ: আলোক পর্যায় ও ফটোফসফোরাইলেশন", titleEn: "Photosynthesis: Light Reaction & Photophosphorylation", status: "Not Started", classNum: 27 },
          { id: "t9-3", title: "ক্যালভিন চক্র (সি৩) ও হ্যাচ-স্ল্যাক চক্র (সি৪)-এর তুলনা", titleBn: "ক্যালভিন চক্র (সি৩) ও হ্যাচ-স্ল্যাক চক্র (সি৪)-এর তুলনা", titleEn: "Calvin (C3) & Hatch-Slack (C4) Cycles Comparison", status: "Not Started", classNum: 28 },
          { id: "t9-4", title: "শ্বসন: গ্লাইকোলাইসিস, ক্রেবস চক্র ও ইটিএস", titleBn: "শ্বসন: গ্লাইকোলাইসিস, ক্রেবস চক্র ও ইটিএস", titleEn: "Respiration: Glycolysis, Krebs Cycle & ETS Yields", status: "Not Started", classNum: 29 }
        ]
      },
      {
        id: "c1-10",
        number: "10",
        numberBn: "১০",
        name: "উদ্ভিদ প্রজনন",
        nameBn: "উদ্ভিদ প্রজনন",
        nameEn: "Plant Reproduction",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t10-1", title: "পুং ও স্ত্রী গ্যামেটোফাইটের উৎপত্তি ও পরিস্ফুটন", titleBn: "পুং ও স্ত্রী গ্যামেটোফাইটের উৎপত্তি ও পরিস্ফুটন", titleEn: "Microsporogenesis & Megasporogenesis Development", status: "Not Started", classNum: 30 },
          { id: "t10-2", title: "দ্বি-নিষেক ও শস্য (এন্ডোস্পার্ম) গঠন", titleBn: "দ্বি-নিষেক ও শস্য (এন্ডোস্পার্ম) গঠন", titleEn: "Double Fertilization & Endosperm Formation", status: "Not Started", classNum: 31 }
        ]
      },
      {
        id: "c1-11",
        number: "11",
        numberBn: "১১",
        name: "জীবপ্রযুক্তি",
        nameBn: "জীবপ্রযুক্তি",
        nameEn: "Biotechnology",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t11-1", title: "উদ্ভিদ টিস্যু কালচার প্রযুক্তি ও মাইক্রোপ্রোপাগেশন", titleBn: "উদ্ভিদ টিস্যু কালচার প্রযুক্তি ও মাইক্রোপ্রোপাগেশন", titleEn: "Plant Tissue Culture Techniques & Micropropagation", status: "Not Started", classNum: 32 },
          { id: "t11-2", title: "রিকম্বিনেন্ট ডিএনএ প্রযুক্তি, প্লাজমিড ও রেস্ট্রিকশন এনজাইম", titleBn: "রিকম্বিনেন্ট ডিএনএ প্রযুক্তি, প্লাজমিড ও রেস্ট্রিকশন এনজাইম", titleEn: "Recombinant DNA Technology, Plasmids & Restriction Enzymes", status: "Not Started", classNum: 33 }
        ]
      },
      {
        id: "c1-12",
        number: "12",
        numberBn: "১২",
        name: "জীবের পরিবেশ, বিস্তার ও সংরক্ষণ",
        nameBn: "জীবের পরিবেশ, বিস্তার ও সংরক্ষণ",
        nameEn: "Organisms Environment, Distribution and Conservation",
        paperId: "first-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t12-1", title: "বাস্তুতন্ত্রের উপাদান, ট্রফিক পিরামিড ও পুষ্টি প্রবাহ", titleBn: "বাস্তুতন্ত্রের উপাদান, ট্রফিক পিরামিড ও পুষ্টি প্রবাহ", titleEn: "Ecosystem Components, Trophic Pyramids & Nutrient Cycles", status: "Not Started", classNum: 34 },
          { id: "t12-2", title: "জীববৈচিত্র্য সংরক্ষণ ও জলবায়ু পরিবর্তনের প্রভাব", titleBn: "জীববৈচিত্র্য সংরক্ষণ ও জলবায়ু পরিবর্তনের প্রভাব", titleEn: "Biodiversity Conservation & Climate Change Impacts", status: "Not Started", classNum: 35 }
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
    completedChapters: 0,
    chapters: [
      {
        id: "c2-01",
        number: "01",
        numberBn: "১",
        name: "প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস",
        nameBn: "প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস",
        nameEn: "Animal Diversity & Classification",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t21-1", title: "শ্রেণিবিন্যাসের ভিত্তি: প্রতিসাম্যতা, ভ্রূণস্তর, সিলোম ও খণ্ডকায়ন", titleBn: "শ্রেণিবিন্যাসের ভিত্তি: প্রতিসাম্যতা, ভ্রূণস্তর, সিলোম ও খণ্ডকায়ন", titleEn: "Basis of Classification: Symmetry, Germ Layers, Coelom & Metamerism", status: "Not Started", classNum: 36 },
          { id: "t21-2", title: "প্রধান নন-কর্ডাটা পর্বসমূহ (পরিফেরা থেকে একাইনোডার্মাটা)", titleBn: "প্রধান নন-কর্ডাটা পর্বসমূহ (পরিফেরা থেকে একাইনোডার্মাটা)", titleEn: "Major Non-Chordate Phyla (Porifera to Echinodermata)", status: "Not Started", classNum: 37 },
          { id: "t21-3", title: "কর্ডাটা পর্ব ও মেরুদণ্ডী শ্রেণির বৈশিষ্ট্য", titleBn: "কর্ডাটা পর্ব ও মেরুদণ্ডী শ্রেণির বৈশিষ্ট্য", titleEn: "Phylum Chordata & Vertebrate Classes Overview", status: "Not Started", classNum: 38 }
        ]
      },
      {
        id: "c2-02",
        number: "02",
        numberBn: "২",
        name: "প্রাণীর পরিচিতি",
        nameBn: "প্রাণীর পরিচিতি",
        nameEn: "Animal Identification & Morphology",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t22-1", title: "হাইড্রা: দৈহিক গঠন, নেমাটোসিস্ট, চলন ও মুকুলোদগম", titleBn: "হাইড্রা: দৈহিক গঠন, নেমাটোসিস্ট, চলন ও মুকুলোদগম", titleEn: "Hydra: Anatomy, Nematocysts, Locomotion & Budding", status: "Not Started", classNum: 39 },
          { id: "t22-2", title: "ঘাসফড়িং: মুখোপাঙ্গ, পৌষ্টিক ও সংবহনতন্ত্র", titleBn: "ঘাসফড়িং: মুখোপাঙ্গ, পৌষ্টিক ও সংবহনতন্ত্র", titleEn: "Grasshopper: Mouthparts, Digestive & Circulatory System", status: "Not Started", classNum: 40 },
          { id: "t22-3", title: "রুই মাছ: কানকো, ফুলকা, পার্শ্বরেখা ও পটকা", titleBn: "রুই মাছ: কানকো, ফুলকা, পার্শ্বরেখা ও পটকা", titleEn: "Rohu Fish: Operculum, Gills, Lateral Line & Swim Bladder", status: "Not Started", classNum: 41 }
        ]
      },
      {
        id: "c2-03",
        number: "03",
        numberBn: "৩",
        name: "মানব শারীরতত্ত্ব: পরিপাক ও শোষণ",
        nameBn: "মানব শারীরতত্ত্ব: পরিপাক ও শোষণ",
        nameEn: "Human Physiology: Digestion & Absorption",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t23-1", title: "পরিপাকনালীর গঠন ও দন্ত সংকেত", titleBn: "পরিপাকনালীর গঠন ও দন্ত সংকেত", titleEn: "Digestive Tract Anatomy & Dental Formula", status: "Not Started", classNum: 42 },
          { id: "t23-2", title: "কার্বোহাইড্রেট, প্রোটিন ও লিপিডের রাসায়নিক পরিপাক", titleBn: "কার্বোহাইড্রেট, প্রোটিন ও লিপিডের রাসায়নিক পরিপাক", titleEn: "Chemical Digestion of Carbohydrates, Proteins & Lipids", status: "Not Started", classNum: 43 },
          { id: "t23-3", title: "যকৃৎ-এর গঠন, পিত্তরস ও বিপাকীয় ভূমিকা", titleBn: "যকৃৎ-এর গঠন, পিত্তরস ও বিপাকীয় ভূমিকা", titleEn: "Liver Architecture, Bile Secretion & Metabolic Functions", status: "Not Started", classNum: 44 },
          { id: "t23-4", title: "ভিলাই দ্বারা খাদ্য উপাদান শোষণ ও পরিপাকীয় হরমোন", titleBn: "ভিলাই দ্বারা খাদ্য উপাদান শোষণ ও পরিপাকীয় হরমোন", titleEn: "Nutrient Absorption in Villi & Gastrointestinal Hormones", status: "Not Started", classNum: 45 }
        ]
      },
      {
        id: "c2-04",
        number: "04",
        numberBn: "৪",
        name: "মানব শারীরতত্ত্ব: রক্ত ও সঞ্চালন",
        nameBn: "মানব শারীরতত্ত্ব: রক্ত ও সঞ্চালন",
        nameEn: "Human Physiology: Blood & Circulation",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t24-1", title: "রক্তরস ও রক্তকণিকা (লোহিত, শ্বেত ও অণুচক্রিকা)", titleBn: "রক্তরস ও রক্তকণিকা (লোহিত, শ্বেত ও অণুচক্রিকা)", titleEn: "Blood Plasma & Formed Elements (RBC, WBC, Platelets)", status: "Not Started", classNum: 46 },
          { id: "t24-2", title: "কার্ডিয়াক চক্র, সংবহনতন্ত্র (এসএ/এভি নোড) ও ইসিজি", titleBn: "কার্ডিয়াক চক্র, সংবহনতন্ত্র (এসএ/এভি নোড) ও ইসিজি", titleEn: "Cardiac Cycle, Conductive System (SA/AV Node) & ECG", status: "Not Started", classNum: 47 },
          { id: "t24-3", title: "রক্তচাপ নিয়ন্ত্রণ, করোনারি সংবহন ও এনজিওপ্লাস্টি", titleBn: "রক্তচাপ নিয়ন্ত্রণ, করোনারি সংবহন ও এনজিওপ্লাস্টি", titleEn: "Blood Pressure Regulation, Coronary Circulation & Angioplasty", status: "Not Started", classNum: 48 }
        ]
      },
      {
        id: "c2-05",
        number: "05",
        numberBn: "৫",
        name: "মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া",
        nameBn: "মানব শারীরতত্ত্ব: শ্বসন ও শ্বাসক্রিয়া",
        nameEn: "Human Physiology: Respiration & Gas Exchange",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t25-1", title: "মানুষের শ্বসনতন্ত্র ও অ্যালভিওলাসের সূক্ষ্ম গঠন", titleBn: "মানুষের শ্বসনতন্ত্র ও অ্যালভিওলাসের সূক্ষ্ম গঠন", titleEn: "Human Respiratory Tract & Alveolar Microstructure", status: "Not Started" },
          { id: "t25-2", title: "প্রশ্বাস-নিঃশ্বাস প্রক্রিয়া ও ফুসফুসের ধারণক্ষমতা", titleBn: "প্রশ্বাস-নিঃশ্বাস প্রক্রিয়া ও ফুসফুসের ধারণক্ষমতা", titleEn: "Inspiration/Expiration Mechanism & Lung Volumes", status: "Not Started" },
          { id: "t25-3", title: "রক্তে অক্সিজেন ও কার্বন ডাই-অক্সাইড পরিবহন", titleBn: "রক্তে অক্সিজেন ও কার্বন ডাই-অক্সাইড পরিবহন", titleEn: "Oxygen & Carbon Dioxide Transport in Blood", status: "Not Started" }
        ]
      },
      {
        id: "c2-06",
        number: "06",
        numberBn: "৬",
        name: "মানব শারীরতত্ত্ব: বর্জ্য নিষ্কাশন",
        nameBn: "মানব শারীরতত্ত্ব: বর্জ্য নিষ্কাশন",
        nameEn: "Human Physiology: Excretion & Osmoregulation",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t26-1", title: "বৃক্কের গঠন ও নেফ্রনের আণুবীক্ষণিক গঠন", titleBn: "বৃক্কের গঠন ও নেফ্রনের আণুবীক্ষণিক গঠন", titleEn: "Kidney Anatomy & Microscopic Structure of Nephron", status: "Not Started" },
          { id: "t26-2", title: "আল্ট্রাফিল্ট্রেশন, পুনঃশোষণ ও কাউন্টার-কারেন্ট কৌশল", titleBn: "আল্ট্রাফিল্ট্রেশন, পুনঃশোষণ ও কাউন্টার-কারেন্ট কৌশল", titleEn: "Ultrafiltration, Reabsorption & Countercurrent Mechanism", status: "Not Started" },
          { id: "t26-3", title: "রেনিন-অ্যাঞ্জিওটেনসিন সিস্টেম ও হেমোডায়ালাইসিস", titleBn: "রেনিন-অ্যাঞ্জিওটেনসিন সিস্টেম ও হেমোডায়ালাইসিস", titleEn: "Renin-Angiotensin System & Hemodialysis", status: "Not Started" }
        ]
      },
      {
        id: "c2-07",
        number: "07",
        numberBn: "৭",
        name: "চলন ও অঙ্গচালনা",
        nameBn: "চলন ও অঙ্গচালনা",
        nameEn: "Human Physiology: Locomotion & Movement",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t27-1", title: "মানব কঙ্কালতন্ত্র: অক্ষীয় ও উপাঙ্গীয় কঙ্কাল", titleBn: "মানব কঙ্কালতন্ত্র: অক্ষীয় ও উপাঙ্গীয় কঙ্কাল", titleEn: "Human Skeleton: Axial & Appendicular Divisions", status: "Not Started" },
          { id: "t27-2", title: "সাইনোভিয়াল অস্থিসন্ধি ও পেশি সংকোচনের স্লাইডিং ফিলামেন্ট তত্ত্ব", titleBn: "সাইনোভিয়াল অস্থিসন্ধি ও পেশি সংকোচনের স্লাইডিং ফিলামেন্ট তত্ত্ব", titleEn: "Synovial Joints & Sliding Filament Theory of Muscle Contraction", status: "Not Started" }
        ]
      },
      {
        id: "c2-08",
        number: "08",
        numberBn: "৮",
        name: "সমন্বয় ও নিয়ন্ত্রণ",
        nameBn: "সমন্বয় ও নিয়ন্ত্রণ",
        nameEn: "Human Physiology: Coordination & Endocrine",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t28-1", title: "মস্তিষ্কের অংশসমূহ, সুষুম্নাকাণ্ড ও প্রতিবর্ত ক্রিয়া", titleBn: "মস্তিষ্কের অংশসমূহ, সুষুম্নাকাণ্ড ও প্রতিবর্ত ক্রিয়া", titleEn: "Brain Divisions, Spinal Cord & Reflex Action", status: "Not Started" },
          { id: "t28-2", title: "প্রধান অন্তঃক্ষরা গ্রন্থিসমূহ (পিটুইটারি, থাইরয়েড, অ্যাড্রেনাল ও অগ্ন্যাশয়)", titleBn: "প্রধান অন্তঃক্ষরা গ্রন্থিসমূহ (পিটুইটারি, থাইরয়েড, অ্যাড্রেনাল ও অগ্ন্যাশয়)", titleEn: "Major Endocrine Glands (Pituitary, Thyroid, Adrenal & Pancreas)", status: "Not Started" }
        ]
      },
      {
        id: "c2-09",
        number: "09",
        numberBn: "৯",
        name: "মানব জীবনের ধারাবাহিকতা",
        nameBn: "মানব জীবনের ধারাবাহিকতা",
        nameEn: "Human Reproduction & Embryology",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t29-1", title: "পুরুষ ও স্ত্রী প্রজননতন্ত্রের অন্তর্গঠন", titleBn: "পুরুষ ও স্ত্রী প্রজননতন্ত্রের অন্তর্গঠন", titleEn: "Male & Female Reproductive System Anatomy", status: "Not Started" },
          { id: "t29-2", title: "স্পার্মাটোজেনেসিস, ওওজেনেসিস ও ঋতুচক্র", titleBn: "স্পার্মাটোজেনেসিস, ওওজেনেসিস ও ঋতুচক্র", titleEn: "Spermatogenesis, Oogenesis & Menstrual Hormonal Cycle", status: "Not Started" },
          { id: "t29-3", title: "নিষেক, ব্লাস্টোসিস্ট গঠন ও অমরার কাজ", titleBn: "নিষেক, ব্লাস্টোসিস্ট গঠন ও অমরার কাজ", titleEn: "Fertilization, Blastocyst Formation & Placental Functions", status: "Not Started" }
        ]
      },
      {
        id: "c2-10",
        number: "10",
        numberBn: "১০",
        name: "মানবদেহের প্রতিরক্ষা",
        nameBn: "মানবদেহের প্রতিরক্ষা",
        nameEn: "Human Body Immunity & Defense",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t30-1", title: "দেহের প্রথম ও দ্বিতীয় প্রতিরক্ষা স্তর (অনির্দিষ্ট)", titleBn: "দেহের প্রথম ও দ্বিতীয় প্রতিরক্ষা স্তর (অনির্দিষ্ট)", titleEn: "First & Second Lines of Non-specific Defense", status: "Not Started" },
          { id: "t30-2", title: "নির্দিষ্ট প্রতিরক্ষা: বি-কোষ, টি-কোষ ও অ্যান্টিবডির গঠন", titleBn: "নির্দিষ্ট প্রতিরক্ষা: বি-কোষ, টি-কোষ ও অ্যান্টিবডির গঠন", titleEn: "Specific Immunity: B-Cells, T-Cells & Antibody Architecture", status: "Not Started" },
          { id: "t30-3", title: "টিকা বা ভ্যাকসিনের প্রকারভেদ ও স্মৃতি কোষ", titleBn: "টিকা বা ভ্যাকসিনের প্রকারভেদ ও স্মৃতি কোষ", titleEn: "Vaccination Types & Immunological Memory", status: "Not Started" }
        ]
      },
      {
        id: "c2-11",
        number: "11",
        numberBn: "১১",
        name: "জিনতত্ত্ব ও বিবর্তন",
        nameBn: "জিনতত্ত্ব ও বিবর্তন",
        nameEn: "Genetics and Evolution",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t31-1", title: "মেন্ডেলের প্রথম ও দ্বিতীয় সূত্র (একসংকর ও দ্বিসংকর ক্রসিং)", titleBn: "মেন্ডেলের প্রথম ও দ্বিতীয় সূত্র (একসংকর ও দ্বিসংকর ক্রসিং)", titleEn: "Mendel's Monohybrid & Dihybrid Cross Laws", status: "Not Started" },
          { id: "t31-2", title: "মেন্ডেলীয় ব্যতিক্রম: অসম্পূর্ণ প্রকটতা, এপিস্ট্যাসিস ও লিথাল জিন", titleBn: "মেন্ডেলীয় ব্যতিক্রম: অসম্পূর্ণ প্রকটতা, এপিস্ট্যাসিস ও লিথাল জিন", titleEn: "Exceptions: Incomplete Dominance, Epistasis & Lethal Genes", status: "Not Started" },
          { id: "t31-3", title: "সেক্স-লিঙ্কড বংশগতি: হিমোফিলিয়া ও বর্ণান্ধতা", titleBn: "সেক্স-লিঙ্কড বংশগতি: হিমোফিলিয়া ও বর্ণান্ধতা", titleEn: "Sex-Linked Inheritance: Hemophilia & Color Blindness", status: "Not Started" },
          { id: "t31-4", title: "ডারউইনের প্রাকৃতিক নির্বাচন মতবাদ ও বিবর্তনীয় প্রমাণ", titleBn: "ডারউইনের প্রাকৃতিক নির্বাচন মতবাদ ও বিবর্তনীয় প্রমাণ", titleEn: "Darwinian Natural Selection & Speciation Evidence", status: "Not Started" }
        ]
      },
      {
        id: "c2-12",
        number: "12",
        numberBn: "১২",
        name: "প্রাণীর আচরণ",
        nameBn: "প্রাণীর আচরণ",
        nameEn: "Animal Behavior",
        paperId: "second-paper",
        progress: 0,
        status: "Not Started",
        topics: [
          { id: "t32-1", title: "সহজাত আচরণ: ট্যাক্সিস, রিফ্লেক্স ও নির্দিষ্ট কর্মপদ্ধতি (FAP)", titleBn: "সহজাত আচরণ: ট্যাক্সিস, রিফ্লেক্স ও নির্দিষ্ট কর্মপদ্ধতি (FAP)", titleEn: "Innate Behavior: Taxes, Reflexes & Fixed Action Patterns (FAP)", status: "Not Started" },
          { id: "t32-2", title: "শিক্ষালব্ধ আচরণ: অভ্যাসগত, অনুকরণ ও সাপেক্ষ প্রতিবর্ত", titleBn: "শিক্ষালব্ধ আচরণ: অভ্যাসগত, অনুকরণ ও সাপেক্ষ প্রতিবর্ত", titleEn: "Learned Behavior: Habituation, Imprinting & Conditioning", status: "Not Started" }
        ]
      }
    ]
  }
];

export const initialClasses: ClassSession[] = [
  {
    id: "cls-01",
    classNumber: 1,
    title: "Class 01: Cell Wall, Plasma Membrane & Fluid Mosaic Model",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "অধ্যায় ১",
    chapterName: "কোষ ও এর গঠন",
    topic: "Cell Wall & Plasma Membrane (Fluid Mosaic Model)",
    date: "Upcoming Sunday",
    time: "7:00 PM – 8:30 PM",
    day: "Sunday",
    status: "Upcoming",
    isNext: true,
    teacher: "Afroza Tahmina",
    meetLink: "https://meet.google.com/bio-edge-live",
    materials: "Chapter 01 Handout PDF + Lecture Slide Deck"
  },
  {
    id: "cls-02",
    classNumber: 2,
    title: "Class 02: Cytoplasmic Organelles (Mitochondria & Plastids)",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "অধ্যায় ১",
    chapterName: "কোষ ও এর গঠন",
    topic: "Cytoplasmic Organelles: Mitochondria & Plastids",
    date: "Upcoming Tuesday",
    time: "7:00 PM – 8:30 PM",
    day: "Tuesday",
    status: "Upcoming",
    isNext: false,
    teacher: "Afroza Tahmina",
    meetLink: "https://meet.google.com/bio-edge-live",
    materials: "Class 02 Diagram Sheet"
  },
  {
    id: "cls-03",
    classNumber: 3,
    title: "Class 03: Ribosomes, Endoplasmic Reticulum & Golgi Apparatus",
    paper: "Biology First Paper",
    paperId: "first-paper",
    chapter: "অধ্যায় ১",
    chapterName: "কোষ ও এর গঠন",
    topic: "Ribosomes, Endoplasmic Reticulum & Golgi Body",
    date: "Upcoming Thursday",
    time: "7:00 PM – 8:30 PM",
    day: "Thursday",
    status: "Upcoming",
    isNext: false,
    teacher: "Afroza Tahmina",
    meetLink: "https://meet.google.com/bio-edge-live"
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
    chapterName: "অধ্যায় ৩: কোষ রসায়ন",
    durationMinutes: 20,
    totalQuestions: 20,
    totalMarks: 20,
    status: "Upcoming",
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
    chapterName: "অধ্যায় ৪: অণুজীব",
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
    status: "Upcoming"
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

export const initialStudents: Student[] = [];

export const initialFeedbacks: FeedbackItem[] = [];

export const initialNotifications: NotificationItem[] = [];

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

export const initialEnrollments: EnrollmentRecord[] = [];
