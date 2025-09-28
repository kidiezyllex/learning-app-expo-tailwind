import { createContext, ReactNode, useContext, useState } from 'react';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  currentHomeScreen: string;
  setCurrentHomeScreen: (screenId: string) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (chapterId: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (lessonId: string | null) => void;
  currentResultScreen: string | null;
  setCurrentResultScreen: (screenId: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [currentHomeScreen, setCurrentHomeScreen] = useState("home");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [currentResultScreen, setCurrentResultScreen] = useState<string | null>(null);

  return (
    <NavigationContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      currentHomeScreen,
      setCurrentHomeScreen,
      selectedChapterId,
      setSelectedChapterId,
      selectedLessonId,
      setSelectedLessonId,
      currentResultScreen,
      setCurrentResultScreen
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useAppNavigation must be used within a NavigationProvider');
  }
  return context;
}
