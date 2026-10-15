import { Router, Request, Response, NextFunction } from 'express';
import { chatRequestSchema } from '../validation/chatSchema.js';
import { generateChatResponse } from '../services/aiService.js';

export const chatRouter = Router();

// Simple in-memory rate limiting map: ip -> timestamps
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

chatRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a moment before sending more questions.',
      });
    }

    timestamps.push(now);
    requestLog.set(ip, timestamps);

    const validationResult = chatRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request payload',
        details: validationResult.error.format(),
      });
    }

    const chatResponse = await generateChatResponse(validationResult.data);
    return res.json(chatResponse);
  } catch (error) {
    next(error);
  }
});
