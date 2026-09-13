const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  import.meta.env.VITE_API_URL || 
  'http://localhost:5000/api';

/**
 * Generic API helper for Bio Edge backend
 */
async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('bioedge_jwt_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: 'Network error or backend is not reachable.'
    };
  }
}

export const api = {
  // Auth API
  auth: {
    register: (data: {
      name: string;
      email: string;
      password?: string;
      confirmPassword?: string;
      phone?: string;
      institution?: string;
      examYear?: string;
      targetCourse?: string;
    }) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    verifyEmail: (data: { email: string; code: string }) =>
      request('/auth/verify-email', { method: 'POST', body: JSON.stringify(data) }),

    resendCode: (email: string) =>
      request('/auth/resend-code', { method: 'POST', body: JSON.stringify({ email }) }),

    login: (data: { email: string; password?: string; role?: string }) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

    googleLogin: (data: { email: string; name?: string; googleId?: string; avatar?: string }) =>
      request('/auth/google', { method: 'POST', body: JSON.stringify(data) }),

    getMe: () => request('/auth/me')
  },

  // Courses API
  courses: {
    getAll: () => request('/courses'),
    getBySlug: (slug: string) => request(`/courses/${slug}`),
    getTeacher: () => request('/courses/public/teacher')
  },

  // Enrollment API
  enrollments: {
    create: (data: {
      courseId: string;
      plan: string;
      paymentMethod?: string;
      transactionId?: string;
    }) => request('/enrollments', { method: 'POST', body: JSON.stringify(data) }),

    getMyEnrollments: () => request('/enrollments/my')
  }
};
