export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { messages = [], language = 'ru', systemContext, userLevel = 'intermediate' } = body;
    const lastUserMsg = messages[messages.length - 1]?.content || '';

    const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not configured on Vercel');
      return res.status(200).json({
        reply: language === 'hy'
          ? 'Ողջույն: AI օգնականը կարգավորման փուլում է: Խնդրում ենք համոզվել, որ GEMINI_API_KEY պարամետրը ակտիվ է Vercel-ի կարգավորումներում:'
          : language === 'ru'
          ? 'Здравствуйте! Переменная GEMINI_API_KEY не найдена в Vercel Environment Variables. Пожалуйста, убедитесь, что добавили GEMINI_API_KEY в панели Vercel (Settings → Environment Variables) и выполнили Redeploy.'
          : 'Hello! The GEMINI_API_KEY environment variable is not configured in Vercel Environment Variables.',
        provider: 'configuration-required',
        model: 'engineering-tutor-v1',
      });
    }

    const systemInstruction = `You are the Automotive Engineering Explorer AI Tutor — an expert automotive systems engineer, educator, and technical specialist.

CRITICAL MANDATORY INSTRUCTION — STRICT AUTOMOTIVE DOMAIN ONLY:
1. You must EXCLUSIVELY answer questions directly related to automobiles, vehicles, automotive engineering, mechanical engineering in cars, thermodynamics of engines (internal combustion engines & electric powertrains), transmissions and gearboxes (manual, automatic, planetary, and EV single-speed reducers), differentials and drivetrains, suspensions, steering systems, braking systems (hydraulic, regenerative, and ABS), automotive electrical and electronic systems (ECUs, CAN bus, sensors, high-voltage battery packs, inverters), vehicle chassis architecture, passive safety structures (crumple zones, monocoques), automotive aerodynamics, and car manufacturing history (including historical factories such as ErAZ and global automotive brands).
2. IF the user asks ANY question that is NOT directly related to automobiles, vehicles, or automotive engineering (such as cooking recipes, non-automotive programming, politics, religion, entertainment, dating, medical advice, non-automotive homework, gaming, etc.):
   YOU MUST POLITELY AND FIRMLY DECLINE TO ANSWER.
   Politely state that you are specialized strictly in automotive engineering and car mechanics, and warmly invite the user to ask any question regarding automotive systems, engines, transmissions, chassis, or vehicle physics instead.
3. Language: Always respond fluently and naturally in the requested language (Russian if 'ru', Armenian if 'hy', English if 'en'). Maintain standard professional automotive technical terminology in that language.
4. Explanations: Provide clear, technically rigorous, and physically grounded explanations.
${systemContext ? `\n[Current Context]: ${systemContext}` : ''}`;

    const formattedContents = messages
      .filter((m: any) => m.content && m.content.trim().length > 0)
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

    while (formattedContents.length > 0 && formattedContents[0].role !== 'user') {
      formattedContents.shift();
    }

    if (formattedContents.length === 0) {
      formattedContents.push({ role: 'user', parts: [{ text: lastUserMsg || 'Hello' }] });
    }

    const candidateModels = ['gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    for (const model of candidateModels) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemInstruction }] },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 1500,
                topP: 0.95,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data: any = await geminiRes.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && candidateText.trim().length > 0) {
            return res.status(200).json({
              reply: candidateText.trim(),
              provider: 'gemini',
              model,
            });
          }
        }
      } catch (e) {
        // try next model
      }
    }

    // Fallback response if API call fails
    return res.status(200).json({
      reply: language === 'hy'
        ? 'Շնորհակալություն հարցի համար: Կապի խնդրի պատճառով հարցումը չհաջողվեց: Խնդրում ենք կրկնել մի քանի վայրկյանից:'
        : language === 'ru'
        ? 'Спасибо за вопрос! Произошла задержка ответа от Gemini API. Пожалуйста, повторите запрос через несколько секунд.'
        : 'Thank you for your question! There was a momentary delay from the Gemini API. Please retry in a few seconds.',
      provider: 'fallback',
      model: 'engineering-tutor-v1',
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
}
