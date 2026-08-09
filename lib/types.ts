export interface Topic {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Simulado {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

export interface SimuladoResult {
  simuladoId: string;
  simuladoTitle: string;
  completedAt: string;
  score: number;
  total: number;
  timeSpent: number;
  answers: number[];
}

export interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  subject?: string;
  notes?: string;
  color: string;
}

export interface Notification {
  id: string;
  type: "reminder" | "content_update" | "system";
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
}
