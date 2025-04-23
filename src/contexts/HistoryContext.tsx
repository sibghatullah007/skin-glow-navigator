
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AnalysisResult {
  id: string;
  date: string;
  skinType: string;
  concerns: string[];
  recommendations: string[];
  imageUrl?: string;
}

interface HistoryContextType {
  history: AnalysisResult[];
  addToHistory: (result: Omit<AnalysisResult, 'id' | 'date'>) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load history from localStorage on app start
  useEffect(() => {
    const storedHistory = localStorage.getItem('analysisHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Add a new analysis result to history
  const addToHistory = (result: Omit<AnalysisResult, 'id' | 'date'>) => {
    const newResult: AnalysisResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    
    const updatedHistory = [newResult, ...history];
    localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  // Clear all history
  const clearHistory = () => {
    localStorage.removeItem('analysisHistory');
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
