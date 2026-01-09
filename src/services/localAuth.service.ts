// Local authentication service - works entirely in browser storage
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

const USERS_KEY = 'edudisha_users';
const CURRENT_USER_KEY = 'edudisha_current_user';
const TOKEN_KEY = 'edudisha_token';

// Initialize with default users if none exist
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: '1',
        email: 'nakuldesai2006@gmail.com',
        name: 'Raj Patel',
        role: 'student' as const,
        university: 'GTU',
        semester: '5',
        branch: 'Computer Engineering',
        verified: true,
        createdAt: new Date().toISOString(),
        password: '123456'
      },
      {
        id: '2',
        email: 'admin@edudisha.com',
        name: 'Admin User',
        role: 'admin' as const,
        verified: true,
        createdAt: new Date().toISOString(),
        password: 'admin123'
      },
      {
        id: '3',
        email: 'student@gtu.edu',
        name: 'Student User',
        role: 'student' as const,
        university: 'GTU',
        semester: '6',
        branch: 'Information Technology',
        verified: true,
        createdAt: new Date().toISOString(),
        password: 'student123'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

const getUsers = () => {
  initializeUsers();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const generateToken = (user: User) => {
  const tokenData = {
    userId: user.id,
    email: user.email,
    role: user.role,
    timestamp: Date.now()
  };
  return btoa(JSON.stringify(tokenData));
};

const validateToken = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token));
    // Token is valid for 24 hours
    const isExpired = Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000;
    return !isExpired ? decoded : null;
  } catch {
    return null;
  }
};

export const localAuthService = {
  register: async (data: RegisterData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    
    // Check if user already exists
    const existingUser = users.find((user: any) => user.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role || 'student',
      university: data.university,
      semester: data.semester,
      branch: data.branch,
      verified: true,
      createdAt: new Date().toISOString(),
      password: data.password
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Create user object without password
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    // Generate token and save session
    const token = generateToken(userWithoutPassword);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
      user: userWithoutPassword,
      token
    };
  },

  login: async (data: LoginData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    
    // Find user by email
    const user = users.find((u: any) => u.email === data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check password
    if (user.password !== data.password) {
      throw new Error('Invalid email or password');
    }
    
    // Create user object without password
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    // Generate token and save session
    const token = generateToken(userWithoutPassword);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
      user: userWithoutPassword,
      token
    };
  },

  googleAuth: async (googleToken: string) => {
    // Simulate Google auth
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, create a mock Google user or use existing one
    const users = getUsers();
    let googleUser = users.find((u: any) => u.email === 'google.user@gmail.com');
    
    if (!googleUser) {
      googleUser = {
        id: 'google_' + Date.now(),
        email: 'google.user@gmail.com',
        name: 'Google User',
        role: 'student',
        university: 'GTU',
        semester: '5',
        branch: 'Computer Engineering',
        verified: true,
        createdAt: new Date().toISOString(),
        password: 'google_auth'
      };
      users.push(googleUser);
      saveUsers(users);
    }
    
    const userWithoutPassword = { ...googleUser };
    delete userWithoutPassword.password;
    
    const token = generateToken(userWithoutPassword);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
      user: userWithoutPassword,
      token
    };
  },

  getMe: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    
    if (!token || !currentUser) {
      throw new Error('No authentication found');
    }
    
    const tokenData = validateToken(token);
    if (!tokenData) {
      // Token expired, clear session
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(CURRENT_USER_KEY);
      throw new Error('Session expired');
    }
    
    return {
      user: JSON.parse(currentUser)
    };
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Helper method to get all users (for admin purposes)
  getAllUsers: async () => {
    const users = getUsers();
    return users.map((user: any) => {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    });
  }
};