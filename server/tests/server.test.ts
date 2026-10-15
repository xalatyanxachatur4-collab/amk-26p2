import { describe, it, expect } from 'vitest';
import { generateChatResponse } from '../src/services/aiService.js';
import { coreSystemsList } from '../src/services/systemDataService.js';
import { chatRequestSchema } from '../src/validation/chatSchema.js';

describe('Server Services and Schemas', () => {
  it('should have 7 core systems defined', () => {
    expect(coreSystemsList).toHaveLength(7);
    const systemIds = coreSystemsList.map((s) => s.id);
    expect(systemIds).toContain('engine');
    expect(systemIds).toContain('transmission');
    expect(systemIds).toContain('suspension');
    expect(systemIds).toContain('brakes');
    expect(systemIds).toContain('steering');
    expect(systemIds).toContain('electrical');
    expect(systemIds).toContain('body');
  });

  it('should validate chat request payload correctly', () => {
    const validPayload = {
      messages: [{ role: 'user', content: 'How does ABS work?' }],
      language: 'en',
      systemContext: 'Braking System',
      userLevel: 'intermediate',
    };
    const result = chatRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('should reject invalid chat requests', () => {
    const invalidPayload = {
      messages: [],
    };
    const result = chatRequestSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('should generate educational response in offline mode', async () => {
    const response = await generateChatResponse({
      messages: [{ role: 'user', content: 'How does a four-stroke engine work?' }],
      language: 'en',
      systemContext: 'Engine and Powertrain',
      userLevel: 'intermediate',
    });

    expect(response.reply).toBeDefined();
    expect(response.reply).toContain('Intake Stroke');
    expect(response.reply).toContain('Compression Stroke');
    expect(response.reply).toContain('Power');
    expect(response.reply).toContain('Exhaust Stroke');
  });

  it('should generate multilingual educational response in Armenian', async () => {
    const response = await generateChatResponse({
      messages: [{ role: 'user', content: 'Ինչպես է աշխատում շարժիչը' }],
      language: 'hy',
      systemContext: 'Շարժիչ',
      userLevel: 'intermediate',
    });

    expect(response.reply).toBeDefined();
    expect(response.reply).toContain('Ներծծման տակտ');
  });
});
