'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('rentasan_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Mock delay
    const mockUser: User = { id: 'u1', name: 'Premium User', email, listings: [] };
    setUser(mockUser);
    localStorage.setItem('rentasan_user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const mockUser: User = { id: 'u' + Math.random().toString(36).substr(2, 5), name, email, listings: [] };
    setUser(mockUser);
    localStorage.setItem('rentasan_user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const mockUser: User = { id: 'ug1', name: 'Google User', email: 'google@example.com', listings: [] };
    setUser(mockUser);
    localStorage.setItem('rentasan_user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const loginWithPhone = async (phone: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const mockUser: User = { id: 'up1', name: 'Phone User', email: phone + '@phone.com', listings: [] };
    setUser(mockUser);
    localStorage.setItem('rentasan_user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentasan_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, loginWithPhone, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
