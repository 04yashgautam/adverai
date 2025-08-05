import { createContext } from "react";
import type { AIResponse } from "@/types/AIResponse";

export interface AIContextType {
  aiResponse: AIResponse | null;
  setAiResponse: (res: AIResponse | null) => void;
  globalLoading: boolean;
  setGlobalLoading: (val: boolean) => void;
}

export const AIContext = createContext<AIContextType>({
  aiResponse: null,
  setAiResponse: () => {},
  globalLoading: false,
  setGlobalLoading: () => {},
});
