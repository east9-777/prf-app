export type UserRole = 'usuario' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject?: string;
  topicId?: string;
}

export interface Simulado {
  id: string;
  title: string;
  description: string;
  subject: string;
  timeLimit: number; // minutes
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

export type ProgressMap = Record<string, boolean>;
