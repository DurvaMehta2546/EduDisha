import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { localAuthService as authService, RegisterData } from '@/services/localAuth.service';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  avatar?: string | null;
  role: 'student' | 'admin';
  university?: string;
  semester?: string;
  branch?: string;
  verified: boolean;
  createdAt: string;
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user needs onboarding
  const needsOnboarding = user && !user.onboardingCompleted;

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getMe();
          setUser(response.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleToken: string) => {
    setIsLoading(true);
    try {
      const response = await authService.googleAuth(googleToken);
      setUser(response.user);
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error(error.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    throw new Error('GitHub login not implemented yet.');
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      // Update user in local storage
      const updatedUser = { ...user, ...data };
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('edudisha_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem('edudisha_users', JSON.stringify(users));
      }
      
      // Update current user
      localStorage.setItem('edudisha_current_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Profile update failed');
    }
  };

  const completeOnboarding = () => {
    if (!user) return;
    
    const updatedUser = { ...user, onboardingCompleted: true };
    
    // Update in local storage
    const users = JSON.parse(localStorage.getItem('edudisha_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], onboardingCompleted: true };
      localStorage.setItem('edudisha_users', JSON.stringify(users));
    }
    
    // Update current user
    localStorage.setItem('edudisha_current_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    needsOnboarding: !!needsOnboarding,
    login,
    loginWithGoogle,
    loginWithGitHub,
    register,
    logout,
    updateProfile,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
