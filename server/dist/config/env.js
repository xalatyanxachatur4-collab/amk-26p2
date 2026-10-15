import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const envSchema = z.object({
    PORT: z.string().default('3001').transform((val) => parseInt(val, 10)),
    AI_PROVIDER: z.enum(['gemini', 'openai', 'anthropic', 'mock']).default('gemini'),
    AI_MODEL: z.string().default('gemini-1.5-flash'),
    AI_API_KEY: z.string().optional().default(''),
    CLIENT_URL: z.string().default('http://localhost:5173'),
    NODE_ENV: z.string().default('development'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
}
export const env = parsed.data;
