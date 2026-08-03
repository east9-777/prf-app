export type UserRole = "usuario" | "instrutor" | "administrador";

export interface User {
  id: string;
  username: string;
  photoURL: string;
  email: string;
  role: UserRole;
  createdAt: string;
  postCount: number;
  commentCount: number;
  likesReceived: number;
  savedPosts: string[];
  blockedUsers: string[];
  hiddenPosts: string[];
  isSuspended?: boolean;
  isBanned?: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  authorRole: UserRole;
  title: string;
  text?: string;
  imageURL?: string;
  createdAt: string;
  isPinned: boolean;
  type: "novidades" | "comunidade";
  likes: number;
  likedBy: string[];
  commentCount: number;
  savedBy: string[];
  reportedBy: string[];
  isHidden?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
  parentId?: string;
}

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
  type: "like" | "comment" | "reply" | "new_post" | "system";
  title: string;
  body: string;
  postId?: string;
  fromUserName?: string;
  fromUserPhoto?: string;
  createdAt: string;
  isRead: boolean;
}
