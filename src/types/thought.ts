export interface Thought {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  posted_to_x: boolean;
  x_post_id: string | null;
  is_published: boolean;
}

export interface CreateThoughtInput {
  title: string;
  content: string;
  tags?: string[];
}

export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    first_name: string;
    username?: string;
  };
  chat: {
    id: number;
    type: string;
  };
  date: number;
  text?: string;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export interface ParsedThought {
  title: string;
  content: string;
  tags: string[];
}
