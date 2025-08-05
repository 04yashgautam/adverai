import axios from "axios";

export interface AIResponse {
  // Define the structure of your AI response here. 
  // For example:
  // query: string;
  // chart_data: any;
  // summary: string;
  // Add other fields as per your backend response.
  query: string;
  chart_data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
    }[];
  };
  summary: string;
}

export const getAIResponse = async (prompt: string): Promise<AIResponse> => {
  const res = await axios.post<AIResponse>("http://localhost:8000/query", { user_prompt: prompt });
  return res.data;
};