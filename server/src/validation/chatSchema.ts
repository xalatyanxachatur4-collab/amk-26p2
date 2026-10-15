import { z } from 'zod';

export const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message cannot be empty').max(3000, 'Message is too long'),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1, 'At least one message is required'),
  language: z.enum(['en', 'hy', 'ru']).default('en'),
  systemContext: z.string().optional(),
  userLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatMessage = z.infer<typeof messageSchema>;
