
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (token: string) => {
    // The token is set as a cookie by the login API endpoint
    await fetchProfile(); // Re-fetch profile to update user state
    router.push('/');
     toast({
        title: "Login Successful",
        description: "Welcome back!",
    });
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout');
      setUser(null);
      router.push('/login');
       toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
    } catch (error) {
      console.error('Logout failed', error);
      toast({
        title: "Logout Failed",
        description: "Could not log out. Please try again.",
        variant: "destructive"
    });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
