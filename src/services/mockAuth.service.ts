// Mock authentication service for development
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

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'nakuldesai2006@gmail.com',
    name: 'Raj Patel',
    role: 'student',
    university: 'GTU',
    semester: '5',
    branch: 'Computer Engineering',
    verified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'admin@edudisha.com',
    name: 'Admin User',
    role: 'admin',
    verified: true,
    createdAt: new Date().toISOString()
  }
];

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'nakuldesai2006@gmail.com': '123456',
  'admin@edudisha.com': 'admin123'
};

export const mockAuthService = {
  register: async (data: RegisterData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role || 'student',
      university: data.university,
      semester: data.semester,
      branch: data.branch,
      verified: true,
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    mockPasswords[data.email] = data.password;
    
    // Generate mock token
    const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
    localStorage.setItem('token', token);
    
    return {
      user: newUser,
      token
    };
  },

  login: async (data: LoginData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user
    const user = mockUsers.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check password
    if (mockPasswords[data.email] !== data.password) {
      throw new Error('Invalid email or password');
    }
    
    // Generate mock token
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
    localStorage.setItem('token', token);
    
    return {
      user,
      token
    };
  },

  googleAuth: async (googleToken: string) => {
    // Simulate Google auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, create a mock Google user
    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'google.user@gmail.com',
      name: 'Google User',
      role: 'student',
      verified: true,
      createdAt: new Date().toISOString()
    };
    
    const token = btoa(JSON.stringify({ userId: googleUser.id, email: googleUser.email }));
    localStorage.setItem('token', token);
    
    return {
      user: googleUser,
      token
    };
  },

  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    try {
      const decoded = JSON.parse(atob(token));
      const user = mockUsers.find(u => u.id === decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return { user };
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};