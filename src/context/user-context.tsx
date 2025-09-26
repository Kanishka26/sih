'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  prakriti?: 'Vata' | 'Pitta' | 'Kapha' | 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic';
  dietaryHabits: string[];
  allergies: string[];
  phoneNumber?: string;
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  healthGoals?: string[];
};

type UserContextType = {
  user: UserProfile | null;
  updateUser: (updates: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data for development
const mockUser: UserProfile = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  profilePicture: 'https://picsum.photos/200/200?random=1',
  age: 28,
  gender: 'female',
  prakriti: 'Vata-Pitta',
  dietaryHabits: ['Vegetarian', 'No spicy food', 'Prefers warm meals'],
  allergies: ['Nuts', 'Shellfish', 'Dairy (lactose intolerant)'],
  phoneNumber: '+91 98765 43210',
  height: 165,
  weight: 58,
  activityLevel: 'moderate',
  healthGoals: ['Weight management', 'Better digestion', 'Increased energy']
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged in state

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const login = (userData: UserProfile) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser, 
      isLoggedIn, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}