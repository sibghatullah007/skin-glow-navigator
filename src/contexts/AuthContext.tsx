
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  skinType?: 'oily' | 'dry' | 'combination' | 'normal';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call to authenticate
    // For demo purposes, let's simulate a successful login with a mock user
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      skinType: 'normal',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call to register the user
    // For demo purposes, let's simulate a successful registration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      skinType: 'normal',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile data
  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        signup, 
        logout,
        updateUserProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
