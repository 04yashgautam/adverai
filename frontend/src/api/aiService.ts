import axios from "axios";
import type { AIResponse } from "@/types/AIResponse";// Use the comprehensive AIResponse interface

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const getAIResponse = async (prompt: string): Promise<AIResponse> => {
  try {
    const res = await axios.post<AIResponse>(`${API_BASE_URL}/query`, { user_prompt: prompt });
    return res.data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response from the server.");
  }
};