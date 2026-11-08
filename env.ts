import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for .env in current working directory and parent paths
const candidateEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
];

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

// Fallback to default dotenv loading
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001').transform((val) => parseInt(val, 10)),
  AI_PROVIDER: z.enum(['gemini', 'openai', 'anthropic', 'mock']).default('gemini'),
  AI_MODEL: z.string().default('gemini-3.5-flash-lite'),
  AI_API_KEY: z.string().optional().default(''),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  NODE_ENV: z.string().default('development'),
});

const rawEnv = {
  ...process.env,
  AI_API_KEY: process.env.GEMINI_API_KEY || process.env.AI_API_KEY || '',
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
