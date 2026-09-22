export type ChatProductOption = number | {
  id?: number;
  name?: string;
  price?: number;
  score?: number;
};

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  productOptions?: ChatProductOption[];
}

export interface ChatMessageRequest {
  message: string;
  conversation_delete?: boolean;
}

export interface ChatMessageResponse {
  Answers: string;
  Options?: ChatProductOption[];
}

export interface ChatError {
  message: string;
  code?: string;
}
