import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bioedge_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to student for seamless portal exploration, or null for public landing
    return {
      id: "std-001",
      name: "Tariqul Islam",
      email: "tariqul@gmail.com",
      role: "student",
      studentId: "BE-2026-001",
      batch: "Alpha Cohort",
      status: "Active"
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('bioedge_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bioedge_auth_user');
    }
  }, [user]);

  const login = (role, email, password) => {
    if (role === 'teacher') {
      const teacherUser = {
        id: "teacher-afroza",
        name: "Afroza Tahmina",
        email: email || "afroza.tahmina@bioedge.edu",
        role: "teacher",
        designation: "Senior Faculty & HEC Biology Specialist"
      };
      setUser(teacherUser);
      return teacherUser;
    } else {
      const studentUser = {
        id: "std-001",
        name: "Tariqul Islam",
        email: email || "tariqul@gmail.com",
        role: "student",
        studentId: "BE-2026-001",
        batch: "Alpha Cohort",
        status: "Active"
      };
      setUser(studentUser);
      return studentUser;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (newRole === 'teacher') {
      login('teacher');
    } else if (newRole === 'student') {
      login('student');
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
