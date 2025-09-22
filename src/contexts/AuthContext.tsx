import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signUp: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getStoredUsers = (): StoredUser[] => {
    const users = localStorage.getItem('registered-users');
    return users ? JSON.parse(users) : [];
  };

  const saveStoredUsers = (users: StoredUser[]) => {
    localStorage.setItem('registered-users', JSON.stringify(users));
  };

  const login = (email: string, password: string) => {
    const storedUsers = getStoredUsers();
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signUp = (email: string, password: string, name: string) => {
    const storedUsers = getStoredUsers();
    
  
    if (storedUsers.find(u => u.email === email)) {
      return false;
    }
    
    
    const newUser: StoredUser = { email, password, name };
    const updatedUsers = [...storedUsers, newUser];
    saveStoredUsers(updatedUsers);
    

    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('auth-user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
  };

  const value = {
    user,
    login,
    signUp,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};