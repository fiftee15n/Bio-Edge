import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CourseData,
  TeacherData,
  Paper,
  Chapter,
  Topic,
  ClassSession,
  Test,
  Student,
  FeedbackItem,
  NotificationItem,
  FAQItem,
  EnrollmentRecord
} from '../types';
import {
  initialCourseData,
  initialTeacherData,
  initialPapers,
  initialClasses,
  initialTests,
  initialStudents,
  initialFeedbacks,
  initialNotifications,
  initialFAQs,
  initialEnrollments
} from '../data/initialMockData';

interface CourseDataContextType {
  course: CourseData;
  teacher: TeacherData;
  papers: Paper[];
  classes: ClassSession[];
  tests: Test[];
  students: Student[];
  feedbacks: FeedbackItem[];
  notifications: NotificationItem[];
  faqs: FAQItem[];
  activeStudentsCount: number;
  availableSeats: number;
  completedClassesCount: number;
  totalClassesCount: number;
  overallProgressPercentage: number;
  nextClass: ClassSession;
  updateCourse: (data: Partial<CourseData>) => void;
  updateTeacher: (data: Partial<TeacherData>) => void;
  addChapter: (paperId: string, chapterData: Partial<Chapter>) => void;
  updateChapter: (paperId: string, chapterId: string, chapterData: Partial<Chapter>) => void;
  deleteChapter: (paperId: string, chapterId: string) => void;
  addTopic: (paperId: string, chapterId: string, topicTitle: string) => void;
  toggleTopicStatus: (paperId: string, chapterId: string, topicId: string) => void;
  addClass: (classData: Partial<ClassSession>) => void;
  updateClass: (classId: string, classData: Partial<ClassSession>) => void;
  deleteClass: (classId: string) => void;
  addTest: (testData: Partial<Test>) => void;
  updateTest: (testId: string, testData: Partial<Test>) => void;
  submitTestAttempt: (testId: string, studentAnswers: Record<string, number>, calculatedScore: number) => void;
  addFeedback: (feedbackData: Partial<FeedbackItem>) => void;
  addNotification: (notifData: Partial<NotificationItem>) => void;
  markNotificationRead: (notifId: string) => void;
  updateStudentStatus: (studentId: string, status: 'Active' | 'Inactive' | 'Pending' | 'Completed' | string) => void;
  enrollStudent: (studentData: Partial<Student>) => Student;
  enrollments: EnrollmentRecord[];
  pendingEnrollmentsCount: number;
  addEnrollment: (record: Partial<EnrollmentRecord>) => EnrollmentRecord;
  approveEnrollment: (enrollmentId: string, notes?: string) => void;
  rejectEnrollment: (enrollmentId: string, reason?: string) => void;
  revokeEnrollment: (enrollmentId: string) => void;
  getEnrollmentsForStudent: (email: string) => EnrollmentRecord[];
  hasAccessToCourse: (email: string, courseKey: string) => boolean;
  resetToDefaultData: () => void;
}

const CourseDataContext = createContext<CourseDataContextType>({} as CourseDataContextType);

export const CourseDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getStored = <T,>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(`bioedge_${key}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return fallback;
      }
    }
    return fallback;
  };

  const [course, setCourse] = useState<CourseData>(() => getStored('course', initialCourseData));
  const [teacher, setTeacher] = useState<TeacherData>(() => getStored('teacher', initialTeacherData));
  const [papers, setPapers] = useState<Paper[]>(() => getStored('papers', initialPapers));
  const [classes, setClasses] = useState<ClassSession[]>(() => getStored('classes', initialClasses));
  const [tests, setTests] = useState<Test[]>(() => getStored('tests', initialTests));
  const [students, setStudents] = useState<Student[]>(() => getStored('students', initialStudents));
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => getStored('feedbacks', initialFeedbacks));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => getStored('notifications', initialNotifications));
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() => getStored('enrollments', initialEnrollments));

  // Sync to local storage
  useEffect(() => { localStorage.setItem('bioedge_course', JSON.stringify(course)); }, [course]);
  useEffect(() => { localStorage.setItem('bioedge_teacher', JSON.stringify(teacher)); }, [teacher]);
  useEffect(() => { localStorage.setItem('bioedge_papers', JSON.stringify(papers)); }, [papers]);
  useEffect(() => { localStorage.setItem('bioedge_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('bioedge_tests', JSON.stringify(tests)); }, [tests]);
  useEffect(() => { localStorage.setItem('bioedge_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('bioedge_feedbacks', JSON.stringify(feedbacks)); }, [feedbacks]);
  useEffect(() => { localStorage.setItem('bioedge_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('bioedge_enrollments', JSON.stringify(enrollments)); }, [enrollments]);

  // Derived Dynamic Properties
  const pendingEnrollmentsCount = enrollments.filter(e => e.status === 'Pending').length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;
  const availableSeats = Math.max(0, course.seatLimit - activeStudentsCount);
  const completedClassesCount = classes.filter(c => c.status === 'Completed').length;
  const totalClassesCount = classes.length;
  const overallProgressPercentage = totalClassesCount > 0 ? Math.round((completedClassesCount / totalClassesCount) * 100) : 0;
  const nextClass = classes.find(c => c.status === 'Upcoming') || classes[0];

  // Course & Teacher Updaters
  const updateCourse = (updatedFields: Partial<CourseData>) => {
    setCourse(prev => ({ ...prev, ...updatedFields }));
  };

  const updateTeacher = (updatedFields: Partial<TeacherData>) => {
    setTeacher(prev => ({ ...prev, ...updatedFields }));
  };

  // Chapter & Topic Operations
  const addChapter = (paperId: string, chapterData: Partial<Chapter>) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        const newChapter: Chapter = {
          id: `c-${Date.now()}`,
          number: String(paper.chapters.length + 1).padStart(2, '0'),
          progress: 0,
          status: 'Not Started',
          topics: [],
          name: chapterData.name || 'New Chapter',
          ...chapterData,
          paperId
        };
        return {
          ...paper,
          totalChapters: paper.totalChapters + 1,
          chapters: [...paper.chapters, newChapter]
        };
      }
      return paper;
    }));
  };

  const updateChapter = (paperId: string, chapterId: string, chapterData: Partial<Chapter>) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          chapters: paper.chapters.map(ch => ch.id === chapterId ? { ...ch, ...chapterData } : ch)
        };
      }
      return paper;
    }));
  };

  const deleteChapter = (paperId: string, chapterId: string) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          totalChapters: Math.max(0, paper.totalChapters - 1),
          chapters: paper.chapters.filter(ch => ch.id !== chapterId)
        };
      }
      return paper;
    }));
  };

  const addTopic = (paperId: string, chapterId: string, topicTitle: string) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          chapters: paper.chapters.map(ch => {
            if (ch.id === chapterId) {
              const newTopic: Topic = {
                id: `t-${Date.now()}`,
                title: topicTitle,
                status: 'Not Started'
              };
              return {
                ...ch,
                topics: [...(ch.topics || []), newTopic]
              };
            }
            return ch;
          })
        };
      }
      return paper;
    }));
  };

  const toggleTopicStatus = (paperId: string, chapterId: string, topicId: string) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          chapters: paper.chapters.map(ch => {
            if (ch.id === chapterId) {
              const updatedTopics = ch.topics.map(top => {
                if (top.id === topicId) {
                  const nextStatus = top.status === 'Completed' ? 'Not Started' : 'Completed';
                  return { ...top, status: nextStatus as Topic['status'] };
                }
                return top;
              });
              const completedCount = updatedTopics.filter(t => t.status === 'Completed').length;
              const progress = updatedTopics.length > 0 ? Math.round((completedCount / updatedTopics.length) * 100) : 0;
              const chStatus = progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started';
              return {
                ...ch,
                topics: updatedTopics,
                progress,
                status: chStatus as Chapter['status']
              };
            }
            return ch;
          })
        };
      }
      return paper;
    }));
  };

  // Class Management
  const addClass = (classData: Partial<ClassSession>) => {
    const newClass: ClassSession = {
      id: `cls-${Date.now()}`,
      classNumber: classes.length + 1,
      title: classData.title || 'New Class',
      paper: classData.paper || 'Biology First Paper',
      chapter: classData.chapter || 'Chapter 01',
      chapterName: classData.chapterName || 'Cell and Its Structure',
      topic: classData.topic || 'Class Discussion',
      date: classData.date || new Date().toISOString().split('T')[0],
      time: classData.time || '7:00 PM – 8:30 PM',
      day: classData.day || 'Sunday',
      status: 'Upcoming',
      teacher: teacher.name,
      ...classData
    };
    setClasses(prev => [newClass, ...prev]);
  };

  const updateClass = (classId: string, classData: Partial<ClassSession>) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, ...classData } : c));
  };

  const deleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
  };

  // Test Management
  const addTest = (testData: Partial<Test>) => {
    const newTest: Test = {
      id: `test-${Date.now()}`,
      title: testData.title || 'New Test',
      type: testData.type || 'MCQ',
      category: testData.category || 'Chapter Practice',
      paper: testData.paper || 'Biology First Paper',
      durationMinutes: testData.durationMinutes || 20,
      totalQuestions: testData.totalQuestions || 15,
      totalMarks: testData.totalMarks || 15,
      status: 'Available',
      score: null,
      ...testData
    };
    setTests(prev => [newTest, ...prev]);
  };

  const updateTest = (testId: string, testData: Partial<Test>) => {
    setTests(prev => prev.map(t => t.id === testId ? { ...t, ...testData } : t));
  };

  const submitTestAttempt = (testId: string, studentAnswers: Record<string, number>, calculatedScore: number) => {
    setTests(prev => prev.map(t => {
      if (t.id === testId) {
        const updatedQuestions = t.questions ? t.questions.map(q => ({
          ...q,
          selectedAnswer: studentAnswers[q.id] !== undefined ? studentAnswers[q.id] : null
        })) : [];

        return {
          ...t,
          status: 'Completed',
          score: calculatedScore,
          submittedAt: new Date().toLocaleString(),
          questions: updatedQuestions.length > 0 ? updatedQuestions : t.questions
        };
      }
      return t;
    }));

    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      studentId: "std-001",
      studentName: "Tariqul Islam",
      teacherName: teacher.name,
      category: "MCQ",
      title: "Automated Test Evaluation",
      message: `Completed test attempt with score ${calculatedScore}. Good consistency!`,
      attachedTo: `Test: ${testId}`,
      date: new Date().toISOString().split('T')[0],
      unread: true
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  // Feedback Management
  const addFeedback = (feedbackData: Partial<FeedbackItem>) => {
    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      teacherName: teacher.name,
      category: feedbackData.category || 'Concept',
      title: feedbackData.title || 'Feedback',
      message: feedbackData.message || '',
      attachedTo: feedbackData.attachedTo || 'General',
      date: new Date().toISOString().split('T')[0],
      unread: true,
      ...feedbackData
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  // Notification Management
  const addNotification = (notifData: Partial<NotificationItem>) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: notifData.title || 'Notification',
      message: notifData.message || '',
      type: notifData.type || 'class',
      read: false,
      date: 'Just now',
      ...notifData
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  // Student & Enrollment Management
  const updateStudentStatus = (studentId: string, status: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: status as Student['status'] } : s));
  };

  const enrollStudent = (studentData: Partial<Student>): Student => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: studentData.name || 'Student',
      studentId: `BE-2026-${String(students.length + 1).padStart(3, '0')}`,
      email: studentData.email || 'student@gmail.com',
      phone: studentData.phone || '01XXXXXXXXX',
      batch: course.batchName || 'Alpha Cohort',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      courseProgress: 0,
      averageScore: 0,
      classesAttended: 0,
      testsCompleted: 0,
      lastActive: 'Just registered',
      ...studentData
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setCourse(initialCourseData);
    setTeacher(initialTeacherData);
    setPapers(initialPapers);
    setClasses(initialClasses);
    setTests(initialTests);
    setStudents(initialStudents);
    setFeedbacks(initialFeedbacks);
    setNotifications(initialNotifications);
    setEnrollments(initialEnrollments);
  };

  // Admin Enrollment Management
  const addEnrollment = (record: Partial<EnrollmentRecord>): EnrollmentRecord => {
    const newRecord: EnrollmentRecord = {
      id: `enr-${Date.now()}`,
      name: record.name || 'Student',
      email: record.email || '',
      schoolCollege: record.schoolCollege || '',
      whatsappNumber: record.whatsappNumber || '',
      paymentNumber: record.paymentNumber || '',
      transactionId: record.transactionId || '',
      amount: record.amount || '0',
      paymentMethod: record.paymentMethod || 'bKash',
      courseKey: record.courseKey || 'alpha-cohort',
      courseTitle: record.courseTitle || 'Alpha Cohort (HSC Biology Intensive)',
      plan: record.plan || 'full',
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      notes: record.notes || 'Submitted online. Pending administrator payment verification.'
    };
    setEnrollments(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const approveEnrollment = (enrollmentId: string, notes?: string) => {
    let approvedCourseKey = '';
    let studentEmail = '';
    let studentName = '';
    let courseTitle = '';

    setEnrollments(prev => prev.map(item => {
      if (item.id === enrollmentId) {
        approvedCourseKey = item.courseKey;
        studentEmail = item.email;
        studentName = item.name;
        courseTitle = item.courseTitle;
        return {
          ...item,
          status: 'Approved',
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'admin.bioedge@gmail.com',
          notes: notes || item.notes || 'Payment verified. Full access granted by Admin.'
        };
      }
      return item;
    }));

    if (studentEmail) {
      // Activate student in roster
      setStudents(prev => {
        const exists = prev.find(s => s.email.toLowerCase() === studentEmail.toLowerCase());
        if (exists) {
          return prev.map(s => s.email.toLowerCase() === studentEmail.toLowerCase() ? {
            ...s,
            status: 'Active',
            batch: approvedCourseKey === 'ssc-2027' ? 'SSC 2027' : 'Alpha Cohort'
          } : s);
        } else {
          const newStudent: Student = {
            id: `std-${Date.now()}`,
            name: studentName,
            studentId: `BE-2026-${String(prev.length + 1).padStart(3, '0')}`,
            email: studentEmail,
            phone: '01XXXXXXXXX',
            batch: approvedCourseKey === 'ssc-2027' ? 'SSC 2027' : 'Alpha Cohort',
            enrollmentDate: new Date().toISOString().split('T')[0],
            status: 'Active',
            courseProgress: 0,
            averageScore: 0,
            classesAttended: 0,
            testsCompleted: 0,
            lastActive: 'Active now'
          };
          return [...prev, newStudent];
        }
      });

      // Update current logged-in user in localStorage if matching email
      try {
        const storedUser = localStorage.getItem('bioedge_auth_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed.email && parsed.email.toLowerCase() === studentEmail.toLowerCase()) {
            const existingCourses: string[] = parsed.enrolledCourses || [];
            if (!existingCourses.includes(approvedCourseKey)) {
              existingCourses.push(approvedCourseKey);
            }
            parsed.enrolledCourses = existingCourses;
            parsed.status = 'Active';
            localStorage.setItem('bioedge_auth_user', JSON.stringify(parsed));
          }
        }
      } catch (e) {}

      // Add student notification
      addNotification({
        title: 'Course Access Granted 🎉',
        message: `Admin verified your enrollment! You now have full access to ${courseTitle || 'your course'}.`,
        type: 'material'
      });
    }
  };

  const rejectEnrollment = (enrollmentId: string, reason?: string) => {
    setEnrollments(prev => prev.map(item => {
      if (item.id === enrollmentId) {
        return {
          ...item,
          status: 'Rejected',
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'admin.bioedge@gmail.com',
          notes: reason || 'Application rejected or payment verification failed.'
        };
      }
      return item;
    }));
  };

  const revokeEnrollment = (enrollmentId: string) => {
    setEnrollments(prev => prev.map(item => {
      if (item.id === enrollmentId) {
        return {
          ...item,
          status: 'Pending',
          notes: 'Access revoked for re-verification.'
        };
      }
      return item;
    }));
  };

  const getEnrollmentsForStudent = (email: string): EnrollmentRecord[] => {
    if (!email) return [];
    return enrollments.filter(e => e.email.toLowerCase() === email.toLowerCase());
  };

  const hasAccessToCourse = (email: string, courseKey: string): boolean => {
    if (!email) return false;
    const approved = enrollments.some(e => 
      e.email.toLowerCase() === email.toLowerCase() && 
      e.courseKey === courseKey && 
      e.status === 'Approved'
    );
    if (approved) return true;

    // Tariqul default demo access to Alpha Cohort
    if (email.toLowerCase() === 'tariqul@gmail.com' && courseKey === 'alpha-cohort') {
      return true;
    }
    return false;
  };

  return (
    <CourseDataContext.Provider
      value={{
        course,
        teacher,
        papers,
        classes,
        tests,
        students,
        feedbacks,
        notifications,
        faqs,
        activeStudentsCount,
        availableSeats,
        completedClassesCount,
        totalClassesCount,
        overallProgressPercentage,
        nextClass,
        updateCourse,
        updateTeacher,
        addChapter,
        updateChapter,
        deleteChapter,
        addTopic,
        toggleTopicStatus,
        addClass,
        updateClass,
        deleteClass,
        addTest,
        updateTest,
        submitTestAttempt,
        addFeedback,
        addNotification,
        markNotificationRead,
        updateStudentStatus,
        enrollStudent,
        enrollments,
        pendingEnrollmentsCount,
        addEnrollment,
        approveEnrollment,
        rejectEnrollment,
        revokeEnrollment,
        getEnrollmentsForStudent,
        hasAccessToCourse,
        resetToDefaultData
      }}
    >
      {children}
    </CourseDataContext.Provider>
  );
};

export const useCourseData = () => useContext(CourseDataContext);
