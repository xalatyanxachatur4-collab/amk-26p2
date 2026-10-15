import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { chatRouter } from './routes/chat.js';
import { systemsRouter } from './routes/systems.js';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();
// Middlewares
app.use(cors({
    origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Automotive Engineering Explorer API',
        version: '1.0.0',
        aiConfigured: Boolean(env.AI_API_KEY && env.AI_API_KEY.length > 5 && env.AI_API_KEY !== 'your_gemini_or_openai_api_key_here'),
        aiProvider: env.AI_PROVIDER,
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use('/api/chat', chatRouter);
app.use('/api/systems', systemsRouter);
// Error handling
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
