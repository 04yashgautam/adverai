export interface Metric {
  title: string;
  value_key: string;
  format?: "number" | "currency" | "percentage";
}

export interface Visualization {
  type: string;
  title: string;
  x_key?: string;
  y_keys?: string[];
  value_key?: string;
}

export interface AIResponse {
  metrics?: Metric[];
  visualizations: Visualization[];
  data?: Record<string, number | string>[];
  summary?: string;
  line_chart_data?: { date: string; impressions: number }[];
}

// export async function getAIResponse(prompt: string): Promise<AIResponse> {
//   // Example response using the prompt
//   console.log(`Received prompt: ${prompt}`);
//   return {
//     metrics: [],
//     visualizations: [], // Ensure this property is included
//     data: [],
//     summary: "Example summary",
//     line_chart_data: [],
//   };
// }