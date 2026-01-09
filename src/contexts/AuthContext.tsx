import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'admin';
  university?: string;
  semester?: string;
  branch?: string;
  verified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'admin';
  university?: string;
  semester?: string;
  branch?: string;
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

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('edudisha_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('edudisha_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'student',
        university: 'Gujarat Technological University',
        semester: 'Semester 5',
        branch: 'Computer Engineering',
        verified: true,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('edudisha_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: '2',
        email: 'student@gtu.edu.in',
        name: 'Aryan Sharma',
        role: 'student',
        university: 'Gujarat Technological University',
        semester: 'Semester 5',
        branch: 'IT Branch',
        verified: true,
        createdAt: new Date().toISOString(),
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
      };
      
      setUser(mockUser);
      localStorage.setItem('edudisha_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGitHub = async () => {
    setIsLoading(true);
    try {
      // Simulate GitHub OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: '3',
        email: 'developer@github.com',
        name: 'GitHub User',
        role: 'student',
        university: 'Gujarat Technological University',
        semester: 'Semester 6',
        branch: 'Computer Engineering',
        verified: true,
        createdAt: new Date().toISOString(),
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=github'
      };
      
      setUser(mockUser);
      localStorage.setItem('edudisha_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        university: userData.university,
        semester: userData.semester,
        branch: userData.branch,
        verified: false,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };
      
      setUser(newUser);
      localStorage.setItem('edudisha_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edudisha_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('edudisha_user', JSON.stringify(updatedUser));
  };

  const completeOnboarding = async (data: OnboardingData) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      onboardingCompleted: true,
      onboardingData: data,
      name: data.name || user.name
    };
    setUser(updatedUser);
    localStorage.setItem('edudisha_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
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