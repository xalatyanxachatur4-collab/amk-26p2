import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { chatRouter } from './routes/chat.js';
import { systemsRouter } from './routes/systems.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares - Allow any frontend origin (Vite local dev, phone IP, Cloudflare tunnel, or deployed domain)
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Automotive Engineering Explorer API',
    version: '1.0.0',
    aiConfigured: Boolean(env.AI_API_KEY && env.AI_API_KEY.length > 5 && env.AI_API_KEY !== 'your_gemini_or_openai_api_key_here'),
    aiProvider: env.AI_PROVIDER,
    aiModel: env.AI_MODEL,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/systems', systemsRouter);

// Serve static frontend files if client/dist exists (production fullstack mode)
const clientDistCandidates = [
  path.resolve(process.cwd(), 'client/dist'),
  path.resolve(__dirname, '../../client/dist'),
  path.resolve(__dirname, '../client/dist'),
];

const clientDistPath = clientDistCandidates.find((p) => fs.existsSync(p));

if (clientDistPath) {
  app.use(express.static(clientDistPath));
  // Single-Page Application (SPA) catch-all route for non-API requests
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global Error handling
app.use(errorHandler);

const PORT = env.PORT || 3001;

// Only listen if this file is run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Automotive Engineering Explorer API running on http://localhost:${PORT}`);
    console.log(`📡 AI Provider: ${env.AI_PROVIDER} (${env.AI_MODEL})`);
  });
}

export default app;
