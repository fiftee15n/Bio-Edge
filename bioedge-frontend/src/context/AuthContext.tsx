import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthResponse } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (data: {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    institution?: string;
    examYear?: string;
    targetCourse?: string;
  }) => Promise<AuthResponse>;
  verifyEmail: (email: string, code: string) => Promise<AuthResponse>;
  resendVerificationCode: (email: string) => Promise<AuthResponse>;
  login: (email?: string, password?: string, role?: UserRole) => Promise<AuthResponse>;
  loginWithGoogle: (data?: { email?: string; name?: string; avatar?: string }) => Promise<AuthResponse>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
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
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('bioedge_jwt_token') || null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('bioedge_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bioedge_auth_user');
    }

    if (token) {
      localStorage.setItem('bioedge_jwt_token', token);
    } else {
      localStorage.removeItem('bioedge_jwt_token');
    }
  }, [user, token]);

  // Check token on initial load
  useEffect(() => {
    const verifyStoredSession = async () => {
      const storedToken = localStorage.getItem('bioedge_jwt_token');
      if (storedToken) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (err) {
          console.error('Error verifying token session:', err);
        }
      }
    };

    verifyStoredSession();
  }, []);

  /**
   * Register with Email & Password
   */
  const register = async (data: {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    institution?: string;
    examYear?: string;
    targetCourse?: string;
  }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await api.auth.register(data);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify Email using 6-digit OTP code
   */
  const verifyEmail = async (email: string, code: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await api.auth.verifyEmail({ email, code });
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resend Verification Code
   */
  const resendVerificationCode = async (email: string): Promise<AuthResponse> => {
    return await api.auth.resendCode(email);
  };

  /**
   * Email & Password Login
   */
  const login = async (
    email?: string,
    password?: string,
    role?: UserRole
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      if (!email || !password) {
        return {
          success: false,
          message: 'Please provide both email and password.'
        };
      }

      const res = await api.auth.login({
        email,
        password,
        role
      });

      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
      } else if (res.unverified) {
        // Unverified email requiring OTP
        return {
          success: false,
          requiresVerification: true,
          email,
          message: res.message,
          verificationCode: res.verificationCode
        };
      }

      return res;
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Login failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Continue with Google Authentication
   */
  const loginWithGoogle = async (customData?: { email?: string; name?: string; avatar?: string }): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const googleData = {
        email: customData?.email || `google_student_${Math.floor(100 + Math.random() * 900)}@gmail.com`,
        name: customData?.name || "Sadia Rahman (Google)",
        avatar: customData?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        googleId: `gid_${Date.now()}`
      };

      const res = await api.auth.googleLogin(googleData);
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bioedge_auth_user');
    localStorage.removeItem('bioedge_jwt_token');
  };

  /**
   * Quick Role Switcher for instant testing
   */
  const switchRole = (newRole: UserRole) => {
    if (newRole === 'teacher') {
      login('afroza.tahmina@bioedge.edu', 'teacher123', 'teacher');
    } else if (newRole === 'student') {
      login('tariqul@gmail.com', 'student123', 'student');
    } else {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        register,
        verifyEmail,
        resendVerificationCode,
        login,
        loginWithGoogle,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
