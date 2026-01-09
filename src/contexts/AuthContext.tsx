
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from '@/firebase/auth';
import { auth } from '@/firebase/config';
import { signInWithGoogle, signOutUser } from '@/firebase/auth';
import { createUserProfile, getUserProfile, updateUserProfile } from '@/firebase/profile';

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
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in.
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
            ...profile,
          } as User);
        } else {
          // Create a new profile for the user
          const newUserProfile = {
            role: 'student',
            university: 'Gujarat Technological University',
            semester: 'Semester 1',
            branch: 'Not specified',
            verified: false,
            createdAt: new Date().toISOString(),
          };
          await createUserProfile(firebaseUser.uid, newUserProfile);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
            ...newUserProfile,
          } as User);
        }
      } else {
        // User is signed out.
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // This will be implemented later
    console.log(email, password);
    throw new Error('Email/password login not implemented yet.');
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      throw new Error('Google login failed');
    } finally {
        // The onAuthStateChanged listener will handle setting the user and loading state
    }
  };

  const loginWithGitHub = async () => {
    // This will be implemented later
    throw new Error('GitHub login not implemented yet.');
  };

  const register = async (userData: any) => {
    // This will be implemented later
    console.log(userData);
    throw new Error('Registration not implemented yet.');
  };

  const logout = async () => {
    setIsLoading(true);
    try {
        await signOutUser();
    } catch(error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    await updateUserProfile(user.id, data);
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
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
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
