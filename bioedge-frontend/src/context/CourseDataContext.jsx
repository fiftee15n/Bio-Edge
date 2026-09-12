import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCourseData,
  initialTeacherData,
  initialPapers,
  initialClasses,
  initialTests,
  initialStudents,
  initialFeedbacks,
  initialNotifications,
  initialFAQs
} from '../data/initialMockData';

const CourseDataContext = createContext();

export const CourseDataProvider = ({ children }) => {
  const getStored = (key, fallback) => {
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

  const [course, setCourse] = useState(() => getStored('course', initialCourseData));
  const [teacher, setTeacher] = useState(() => getStored('teacher', initialTeacherData));
  const [papers, setPapers] = useState(() => getStored('papers', initialPapers));
  const [classes, setClasses] = useState(() => getStored('classes', initialClasses));
  const [tests, setTests] = useState(() => getStored('tests', initialTests));
  const [students, setStudents] = useState(() => getStored('students', initialStudents));
  const [feedbacks, setFeedbacks] = useState(() => getStored('feedbacks', initialFeedbacks));
  const [notifications, setNotifications] = useState(() => getStored('notifications', initialNotifications));
  const [faqs] = useState(initialFAQs);

  // Sync to local storage
  useEffect(() => { localStorage.setItem('bioedge_course', JSON.stringify(course)); }, [course]);
  useEffect(() => { localStorage.setItem('bioedge_teacher', JSON.stringify(teacher)); }, [teacher]);
  useEffect(() => { localStorage.setItem('bioedge_papers', JSON.stringify(papers)); }, [papers]);
  useEffect(() => { localStorage.setItem('bioedge_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('bioedge_tests', JSON.stringify(tests)); }, [tests]);
  useEffect(() => { localStorage.setItem('bioedge_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('bioedge_feedbacks', JSON.stringify(feedbacks)); }, [feedbacks]);
  useEffect(() => { localStorage.setItem('bioedge_notifications', JSON.stringify(notifications)); }, [notifications]);

  // Derived Dynamic Properties
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;
  const availableSeats = Math.max(0, course.seatLimit - activeStudentsCount);
  const completedClassesCount = classes.filter(c => c.status === 'Completed').length;
  const totalClassesCount = classes.length;
  const overallProgressPercentage = totalClassesCount > 0 ? Math.round((completedClassesCount / totalClassesCount) * 100) : 0;
  const nextClass = classes.find(c => c.status === 'Upcoming') || classes[0];

  // Course & Teacher Updaters
  const updateCourse = (updatedFields) => {
    setCourse(prev => ({ ...prev, ...updatedFields }));
  };

  const updateTeacher = (updatedFields) => {
    setTeacher(prev => ({ ...prev, ...updatedFields }));
  };

  // Chapter & Topic Operations
  const addChapter = (paperId, chapterData) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        const newChapter = {
          id: `c-${Date.now()}`,
          number: String(paper.chapters.length + 1).padStart(2, '0'),
          progress: 0,
          status: 'Not Started',
          topics: [],
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

  const updateChapter = (paperId, chapterId, chapterData) => {
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

  const deleteChapter = (paperId, chapterId) => {
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

  const addTopic = (paperId, chapterId, topicTitle) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          chapters: paper.chapters.map(ch => {
            if (ch.id === chapterId) {
              const newTopic = {
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

  const toggleTopicStatus = (paperId, chapterId, topicId) => {
    setPapers(prevPapers => prevPapers.map(paper => {
      if (paper.id === paperId) {
        return {
          ...paper,
          chapters: paper.chapters.map(ch => {
            if (ch.id === chapterId) {
              const updatedTopics = ch.topics.map(top => {
                if (top.id === topicId) {
                  const nextStatus = top.status === 'Completed' ? 'Not Started' : 'Completed';
                  return { ...top, status: nextStatus };
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
                status: chStatus
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
  const addClass = (classData) => {
    const newClass = {
      id: `cls-${Date.now()}`,
      classNumber: classes.length + 1,
      status: 'Upcoming',
      teacher: teacher.name,
      ...classData
    };
    setClasses(prev => [newClass, ...prev]);
  };

  const updateClass = (classId, classData) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, ...classData } : c));
  };

  const deleteClass = (classId) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
  };

  // Test Management
  const addTest = (testData) => {
    const newTest = {
      id: `test-${Date.now()}`,
      status: 'Available',
      score: null,
      ...testData
    };
    setTests(prev => [newTest, ...prev]);
  };

  const updateTest = (testId, testData) => {
    setTests(prev => prev.map(t => t.id === testId ? { ...t, ...testData } : t));
  };

  const submitTestAttempt = (testId, studentAnswers, calculatedScore) => {
    setTests(prev => prev.map(t => {
      if (t.id === testId) {
        const updatedQuestions = t.questions ? t.questions.map((q, idx) => ({
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

    // Trigger dynamic feedback creation
    const newFeedback = {
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
  const addFeedback = (feedbackData) => {
    const newFeedback = {
      id: `fb-${Date.now()}`,
      teacherName: teacher.name,
      date: new Date().toISOString().split('T')[0],
      unread: true,
      ...feedbackData
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  // Notification Management
  const addNotification = (notifData) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      read: false,
      date: 'Just now',
      ...notifData
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  // Student & Enrollment Management
  const updateStudentStatus = (studentId, status) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
  };

  const enrollStudent = (studentData) => {
    const newStudent = {
      id: `std-${Date.now()}`,
      studentId: `BE-2026-${String(students.length + 1).padStart(3, '0')}`,
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
        resetToDefaultData
      }}
    >
      {children}
    </CourseDataContext.Provider>
  );
};

export const useCourseData = () => useContext(CourseDataContext);
