export type UserRole = 'student' | 'teacher' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  batch?: string;
  status?: string;
  phone?: string;
  institution?: string;
  examYear?: string;
  isVerified?: boolean;
  avatar?: string;
  designation?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  requiresVerification?: boolean;
  email?: string;
  verificationCode?: string;
}

export interface BackendCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  totalClasses: number;
  seatLimit: number;
  enrolledCount: number;
  availableSeats: number;
  fullFee: number;
  monthlyFee: number;
  discountAmount: number;
  curriculum?: any;
  metadata?: any;
}

export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  totalClasses: number;
  seatLimit: number;
  monthlyFee: number;
  fullCourseFee: number;
  status: string;
  batchName: string;
  startDate?: string;
  classDays?: string;
  whyLimitedSeats: string;
}

export interface TeacherData {
  id: string;
  name: string;
  designation: string;
  institution: string;
  experience: string;
  specialization: string;
  bio: string;
  contactNumber: string;
  email: string;
  quote: string;
  rating?: string;
  totalStudentsTaught?: string;
}

export interface Topic {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Not Started' | 'Locked';
  classNum?: number;
}

export interface Chapter {
  id: string;
  number: string;
  name: string;
  paperId: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
  description?: string;
  topics: Topic[];
}

export interface Paper {
  id: string;
  name: string;
  code: string;
  description: string;
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
}

export interface ClassSession {
  id: string;
  classNumber: number;
  title: string;
  paper: string;
  paperId?: string;
  chapter: string;
  chapterName: string;
  topic: string;
  date: string;
  time: string;
  day: string;
  status: 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled';
  isNext?: boolean;
  teacher: string;
  meetLink?: string;
  materials?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number | null;
  explanation?: string;
  marks?: number;
  testTitle?: string;
  paper?: string;
}

export interface Test {
  id: string;
  title: string;
  type: 'MCQ' | 'CQ' | 'Model Test';
  category: 'Chapter Practice' | 'CQ/SQ Practice' | 'Full Syllabus Model Tests';
  paper: string;
  chapterId?: string;
  chapterName?: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  status: 'Available' | 'Completed' | 'Upcoming';
  score?: number | null;
  submittedAt?: string;
  scheduledDate?: string;
  teacherFeedback?: string;
  questions?: Question[];
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  phone: string;
  batch: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed';
  courseProgress: number;
  averageScore: number;
  classesAttended?: number;
  testsCompleted?: number;
  paper1Score?: number;
  paper2Score?: number;
  lastActive: string;
  college?: string;
}

export interface FeedbackItem {
  id: string;
  studentId?: string;
  studentName?: string;
  teacherName?: string;
  category: string;
  title: string;
  message: string;
  attachedTo: string;
  date: string;
  unread?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'class' | 'test' | 'feedback' | 'material';
  read: boolean;
  date: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
