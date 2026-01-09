import api from './api';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/firebase/config';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'student' | 'admin';
  university?: string;
  semester?: string;
  branch?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);
      
      // Exchange custom token for ID token using Firebase Client SDK
      if (response.data.token) {
        const userCredential = await signInWithCustomToken(auth, response.data.token);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
        response.data.token = idToken;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await api.post('/auth/login', data);
      
      // Exchange custom token for ID token
      if (response.data.token) {
        const userCredential = await signInWithCustomToken(auth, response.data.token);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
        response.data.token = idToken;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  googleAuth: async (googleToken: string) => {
    try {
      const response = await api.post('/auth/google', { token: googleToken });
      
      // Exchange custom token for ID token
      if (response.data.token) {
        const userCredential = await signInWithCustomToken(auth, response.data.token);
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
        response.data.token = idToken;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Google auth error:', error.response?.data || error.message);
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('Get me error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};
