'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SceneContextType {
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
  systemLogs: string[];
  addSystemLog: (log: string) => void;
  cameraMode: 'home' | 'projects';
  setCameraMode: (mode: 'home' | 'projects') => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [cameraMode, setCameraMode] = useState<'home' | 'projects'>('home');

  const addSystemLog = (log: string) => {
    setSystemLogs(prev => [...prev.slice(-20), log]);
  };

  return (
    <SceneContext.Provider value={{
      hoveredNodeId,
      setHoveredNodeId,
      systemLogs,
      addSystemLog,
      cameraMode,
      setCameraMode
    }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useScene must be used within SceneProvider');
  return context;
}
