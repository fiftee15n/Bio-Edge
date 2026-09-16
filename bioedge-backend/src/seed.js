import bcrypt from 'bcryptjs';
import { CourseModel } from './models/courseModel.js';
import { UserModel } from './models/userModel.js';
import { TeacherModel } from './models/enrollmentModel.js';
import { initDatabase } from './config/database.js';

export async function seedDatabase() {
  initDatabase();

  console.log('🌱 Seeding database initial records...');

  // 1. Seed Teacher Profile
  TeacherModel.upsertProfile({
    id: 'teacher_afroza',
    name: 'Afroza Tahmina',
    designation: 'Senior Faculty & HEC Biology Specialist',
    institution: 'Former Senior Faculty at Premier Academic Institutions',
    experience: '8+ Years Teaching Excellence',
    specialization: 'HEC Biology 1st & 2nd Paper, Medical Admission Foundation, Diagram Mastery',
    bio: 'Dedicated to cultivating analytical clarity, conceptual depth, and disciplined written exam performance in Biology students.',
    phone: '+880 1712-345678',
    email: 'afroza.tahmina@bioedge.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  });

  // 2. Seed Courses
  CourseModel.upsertCourse({
    id: 'crs_alpha_cohort',
    slug: 'alpha-cohort',
    title: 'Alpha Cohort — 4-Month Crash Course',
    subtitle: 'Premium HSC Biology Intensive Program (1st & 2nd Paper)',
    description: 'A structured, focused and result-oriented Biology preparation program designed to build strong concepts, improve exam performance and prepare students for HSC Biology First and Second Paper.',
    duration: '4 Months',
    total_classes: 48,
    seat_limit: 20,
    enrolled_count: 14,
    full_fee: 12500,
    monthly_fee: 3500,
    discount_amount: 1500,
    metadata: {
      papers: ['Biology First Paper', 'Biology Second Paper'],
      batchType: 'Small Group Intensive (Max 20 Students)',
      classSchedule: '3 Days / Week (Thu, Fri, Sat @ 7:00 PM)',
      assessmentsCount: '24 Chapter Tests + 8 Full Model Tests',
      features: [
        '48 Live Intensive Conceptual Masterclasses',
        'Biology 1st & 2nd Paper Complete Syllabus Coverage',
        'Structured CQ / SQ Written Answer Script Evaluation',
        '24 Chapter-wise Speed & Accuracy MCQ Tests',
        '8 Full Syllabus Board Standard Model Tests',
        'Direct 1-on-1 Academic Feedback from Afroza Tahmina',
        'Complete Hand-drawn Biology Diagram Guides',
        'Exclusive Small Batch of Only 15–20 Students'
      ]
    },
    curriculum: {
      firstPaper: [
        {
          chapterNo: 1,
          title: 'Cell & Its Structure',
          topics: ['Cell Wall & Plasma Membrane', 'Cytoplasmic Organelles', 'Nucleus & Chromosomes', 'DNA & RNA Structure'],
          classes: 5
        },
        {
          chapterNo: 2,
          title: 'Cell Division',
          topics: ['Amitosis & Mitosis Stages', 'Meiosis & Crossing Over', 'Significance of Cell Division'],
          classes: 4
        },
        {
          chapterNo: 3,
          title: 'Cell Chemistry',
          topics: ['Carbohydrates & Lipids', 'Proteins & Amino Acids', 'Enzyme Kinetics & Action'],
          classes: 4
        },
        {
          chapterNo: 4,
          title: 'Microorganisms',
          topics: ['Virus Structure & Life Cycle', 'Bacteria Classification & Economic Importance', 'Malaria Parasite'],
          classes: 4
        },
        {
          chapterNo: 5,
          title: 'Plant Physiology',
          topics: ['Mineral Absorption', 'Photosynthesis (C3 & C4)', 'Respiration & Glycolysis'],
          classes: 5
        },
        {
          chapterNo: 6,
          title: 'Genetics & Biotechnology',
          topics: ['Mendelian Genetics & Deviations', 'Recombinant DNA & Genetic Engineering', 'Tissue Culture'],
          classes: 4
        }
      ],
      secondPaper: [
        {
          chapterNo: 1,
          title: 'Animal Diversity & Classification',
          topics: ['Basis of Classification', 'Non-Chordata Phyla Characteristics', 'Chordata Classes & Examples'],
          classes: 5
        },
        {
          chapterNo: 2,
          title: 'Animal Identity (Hydra & Grasshopper)',
          topics: ['Hydra Morphology & Nematocysts', 'Grasshopper Digestive & Circulatory System', 'Cockroach & Periplaneta Anatomy'],
          classes: 5
        },
        {
          chapterNo: 3,
          title: 'Human Digestion & Absorption',
          topics: ['Alimentary Canal Anatomy', 'Enzymatic Digestion of Food', 'Liver, Pancreas & Bile Secretion'],
          classes: 4
        },
        {
          chapterNo: 4,
          title: 'Human Blood & Circulation',
          topics: ['Blood Composition & Clotting', 'Heart Anatomy & Cardiac Cycle', 'Blood Pressure & ECG Interpretation'],
          classes: 4
        },
        {
          chapterNo: 5,
          title: 'Human Excretion & Osmoregulation',
          topics: ['Nephron Anatomy & Filtration', 'Urine Formation & Hormonal Control', 'Kidney Failure & Dialysis'],
          classes: 4
        }
      ]
    }
  });

  CourseModel.upsertCourse({
    id: 'crs_ssc_2027',
    slug: 'ssc-2027',
    title: 'SSC 2027 Model Test Package',
    subtitle: '20 Full Board Standard Tests & Handwritten Evaluation',
    description: 'A comprehensive, high-yield model test batch specifically structured for SSC 2027 examinees, featuring handwritten CQ evaluations, live doubt-clearing solution masterclasses, and top board problem analysis.',
    duration: '2.5 Months',
    total_classes: 20,
    seat_limit: 30,
    enrolled_count: 19,
    full_fee: 2200,
    monthly_fee: 2200,
    discount_amount: 800,
    metadata: {
      papers: ['SSC Biology (Class 9-10 Complete Textbook)'],
      batchType: 'Model Test & Board Preparation Batch',
      classSchedule: '2 Tests / Week + Weekly Solution Live Class',
      assessmentsCount: '20 Board Standard Full Model Tests',
      features: [
        '20 Board Standard Full Length Biology Model Tests',
        'Line-by-line Handwritten CQ Answer Script Checking',
        '8 Live Zoom Doubt Clearing & Question Analysis Sessions',
        '35+ Essential High-Yield Biology Diagram Sheets',
        'Top 10 Cadet & Leading Dhaka College Question Analysis',
        'Personalized Performance Analytics & Rank Leaderboard'
      ]
    },
    curriculum: {
      tests: [
        { testNo: 1, title: 'Chapter 1 & 2: Lessons of Life & Cells/Tissues', type: 'CQ + MCQ', marks: 50 },
        { testNo: 2, title: 'Chapter 3 & 4: Cell Division & Bioenergetics', type: 'CQ + MCQ', marks: 50 },
        { testNo: 3, title: 'Chapter 5 & 6: Food, Nutrition & Transport in Organisms', type: 'CQ + MCQ', marks: 50 },
        { testNo: 4, title: 'Chapter 7 & 8: Gaseous Exchange & Excretion', type: 'CQ + MCQ', marks: 50 },
        { testNo: 5, title: 'Paper 1 Half-Syllabus Model Test', type: 'Full Board Standard', marks: 75 },
        { testNo: 6, title: 'Full Syllabus Grand Board Model Test 01', type: 'Full Board Standard', marks: 75 },
        { testNo: 7, title: 'Full Syllabus Grand Board Model Test 02', type: 'Full Board Standard', marks: 75 }
      ]
    }
  });

  // 3. Seed Demo Users
  const studentPasswordHash = await bcrypt.hash('student123', 10);
  const teacherPasswordHash = await bcrypt.hash('teacher123', 10);

  // Student: Tariqul
  if (!UserModel.findByEmail('tariqul@gmail.com')) {
    UserModel.create({
      name: 'Tariqul Islam',
      email: 'tariqul@gmail.com',
      passwordHash: studentPasswordHash,
      role: 'student',
      phone: '01711223344',
      institution: 'Notre Dame College, Dhaka',
      examYear: 'HSC 2026',
      studentId: 'BE-2026-001',
      batch: 'Alpha Cohort',
      isVerified: 1
    });
  }

  // Teacher: Afroza Tahmina
  if (!UserModel.findByEmail('afroza.tahmina@bioedge.edu')) {
    UserModel.create({
      name: 'Afroza Tahmina',
      email: 'afroza.tahmina@bioedge.edu',
      passwordHash: teacherPasswordHash,
      role: 'teacher',
      phone: '+880 1712-345678',
      institution: 'Bio Edge Academic Faculty',
      examYear: '',
      studentId: 'BE-FAC-001',
      batch: 'Faculty',
      isVerified: 1
    });
  }

  // Admin: System Admin
  const adminPasswordHash = await bcrypt.hash('BioEdge98765', 10);
  if (!UserModel.findByEmail('admin.nioedge@gmail.com')) {
    UserModel.create({
      name: 'Bio Edge System Admin',
      email: 'admin.nioedge@gmail.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
      phone: '+880 1712-345678',
      institution: 'Bio Edge Administration',
      examYear: '',
      studentId: 'BE-ADM-001',
      batch: 'Administration',
      isVerified: 1
    });
  }

  console.log('✅ Seed data successfully populated in database.');
}

// Allow direct CLI execution: node src/seed.js
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => {
    console.log('Seed process complete.');
    process.exit(0);
  }).catch(err => {
    console.error('Seed process failed:', err);
    process.exit(1);
  });
}
