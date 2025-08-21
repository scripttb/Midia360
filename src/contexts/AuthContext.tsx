import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('midia360_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on email
    let mockUser: User;
    
    if (email === 'superadmin@midia360.ao') {
      mockUser = {
        id: '1',
        name: 'Super Admin',
        email: 'superadmin@midia360.ao',
        role: 'super_admin',
        createdAt: new Date(),
      };
    } else if (email === 'admin@empresa.ao') {
      mockUser = {
        id: '2',
        name: 'João Silva',
        email: 'admin@empresa.ao',
        role: 'tenant_owner',
        tenantId: 'tenant_1',
        createdAt: new Date(),
      };
    } else if (email === 'gerente@empresa.ao') {
      mockUser = {
        id: '3',
        name: 'Maria Santos',
        email: 'gerente@empresa.ao',
        role: 'manager',
        tenantId: 'tenant_1',
        createdAt: new Date(),
      };
    } else {
      mockUser = {
        id: '4',
        name: 'Carlos Mendes',
        email: 'comercial@empresa.ao',
        role: 'sales',
        tenantId: 'tenant_1',
        createdAt: new Date(),
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('midia360_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('midia360_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
