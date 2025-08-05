// context/AIContext.tsx
import React, { createContext, useState } from "react";

interface AIContextType {
  aiResponse: any;
  setAiResponse: (res: any) => void;
  globalLoading: boolean;
  setGlobalLoading: (val: boolean) => void;
}

export const AIContext = createContext<AIContextType>({
  aiResponse: null,
  setAiResponse: () => {},
  globalLoading: false,
  setGlobalLoading: () => {},
});

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <AIContext.Provider value={{ aiResponse, setAiResponse, globalLoading, setGlobalLoading }}>
      {children}
    </AIContext.Provider>
  );
};
