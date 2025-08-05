
import React, { useState } from "react";
import { AIContext } from "./AIContextDefinition"; // Ensure the file './AIContextDefinition.ts' exists in the same directory
import type { AIResponse } from "@/types/AIResponse";

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  return (
    <AIContext.Provider value={{ aiResponse, setAiResponse, globalLoading, setGlobalLoading }}>
      {children}
    </AIContext.Provider>
  );
};
