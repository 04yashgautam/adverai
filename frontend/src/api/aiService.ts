import axios from "axios";
import { AIResponse } from "../App";

export const getAIResponse = async (prompt: string): Promise<AIResponse> => {
  const res = await axios.post<AIResponse>("http://localhost:8000/ai", { prompt });
  return res.data;
};
