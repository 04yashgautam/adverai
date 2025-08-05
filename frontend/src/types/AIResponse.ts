export interface ChartPoint {
  name: string;
  value: number;
}

export interface AIResponse {
  chartData: ChartPoint[];
  summary: string;
}
