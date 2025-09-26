
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type HealthLog = {
  date: string;
  foodIntake: string;
  symptoms: string;
  waterIntake: string;
  sleepHours: string;
  bowelMovement: string;
  energyLevel: string;
};

type HealthLogContextType = {
  pastLogs: HealthLog[];
  addLog: (log: HealthLog) => void;
};

const initialPastLogs: HealthLog[] = [
  {
    date: '2024-07-20',
    foodIntake: 'Oats with berries for breakfast, lentil soup for lunch, grilled vegetables for dinner.',
    symptoms: 'Felt energetic and clear-headed.',
    waterIntake: '2.5L',
    sleepHours: '8 hours',
    bowelMovement: 'Normal',
    energyLevel: '5/5',
  },
  {
    date: '2024-07-19',
    foodIntake: 'Rice with yogurt for lunch, kichdi for dinner.',
    symptoms: 'A bit of bloating in the evening.',
    waterIntake: '2L',
    sleepHours: '6.5 hours',
    bowelMovement: 'Normal',
    energyLevel: '3/5',
  },
  {
    date: '2024-07-18',
    foodIntake: 'Skipped breakfast. Had a heavy lunch with fried food.',
    symptoms: 'Felt sluggish and sleepy after lunch.',
    waterIntake: '1.5L',
    sleepHours: '7 hours',
    bowelMovement: 'Constipated',
    energyLevel: '2/5',
  },
];


const HealthLogContext = createContext<HealthLogContextType | undefined>(undefined);

export function HealthLogProvider({ children }: { children: ReactNode }) {
  const [pastLogs, setPastLogs] = useState<HealthLog[]>(initialPastLogs);

  const addLog = (log: HealthLog) => {
    setPastLogs((prevLogs) => [log, ...prevLogs]);
  };

  return (
    <HealthLogContext.Provider value={{ pastLogs, addLog }}>
      {children}
    </HealthLogContext.Provider>
  );
}

export function useHealthLog() {
  const context = useContext(HealthLogContext);
  if (context === undefined) {
    throw new Error('useHealthLog must be used within a HealthLogProvider');
  }
  return context;
}
