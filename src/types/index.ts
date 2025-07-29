export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface RecognitionType {
  id: string;
  emoji: string;
  name: string;
}

export interface ApplausePost {
  id: string;
  author: User;
  recipient: User;
  recognitionType: RecognitionType;
  message: string;
  image?: string;
  createdAt: string;
}

export interface CreateApplauseDto {
  recipientId: string;
  recognitionTypeId: string;
  message: string;
  image?: string;
}

export interface Mission {
  id: string;
  title: string;
  points: number;
  completedBy: number;
  completedDate: string;
  image: string;
  post?: {
    author: User;
    timeAgo: string;
    action: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
