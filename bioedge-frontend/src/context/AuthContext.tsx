import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, email?: string, password?: string) => User;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bioedge_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
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

  const login = (role: UserRole, email?: string, password?: string): User => {
    if (role === 'teacher') {
      const teacherUser: User = {
        id: "teacher-afroza",
        name: "Afroza Tahmina",
        email: email || "afroza.tahmina@bioedge.edu",
        role: "teacher",
        designation: "Senior Faculty & HEC Biology Specialist"
      };
      setUser(teacherUser);
      return teacherUser;
    } else {
      const studentUser: User = {
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

  const switchRole = (newRole: UserRole) => {
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
