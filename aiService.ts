import { env } from '../config/env.js';
import { ChatRequest } from '../validation/chatSchema.js';

const SYSTEM_INSTRUCTION_BASE = `You are the Automotive Engineering Explorer AI Tutor — an expert automotive systems engineer, educator, and technical specialist.

CRITICAL MANDATORY INSTRUCTION — STRICT AUTOMOTIVE DOMAIN ONLY:
1. You must EXCLUSIVELY answer questions directly related to automobiles, vehicles, automotive engineering, mechanical engineering in cars, thermodynamics of engines (internal combustion engines & electric powertrains), transmissions and gearboxes (manual, automatic, planetary, and EV single-speed reducers), differentials and drivetrains, suspensions, steering systems, braking systems (hydraulic, regenerative, and ABS), automotive electrical and electronic systems (ECUs, CAN bus, sensors, high-voltage battery packs, inverters), vehicle chassis architecture, passive safety structures (crumple zones, monocoques), automotive aerodynamics, and car manufacturing history (including historical factories such as ErAZ and global automotive brands).
2. IF the user asks ANY question that is NOT directly related to automobiles, vehicles, or automotive engineering (such as cooking recipes, non-automotive programming, politics, religion, entertainment, dating, medical advice, non-automotive homework, gaming, etc.):
   YOU MUST POLITELY AND FIRMLY DECLINE TO ANSWER.
   Politely state that you are specialized strictly in automotive engineering and car mechanics, and warmly invite the user to ask any question regarding automotive systems, engines, transmissions, chassis, or vehicle physics instead.
3. Language: Always respond fluently and naturally in the requested language (Russian if 'ru', Armenian if 'hy', English if 'en'). Maintain standard professional automotive technical terminology in that language.
4. Explanations: Provide clear, technically rigorous, and physically grounded explanations (e.g., thermodynamic cycles, torque vs. power, gear ratios, hydraulic pressure, viscous damping, magnetic flux, Ackermann kinematics). Use formatting like bold headers, bullet points, and clean paragraphs.
5. Safety: For safety-critical systems (brakes, steering, airbags, high-voltage 400V/800V EV batteries), clarify that maintenance and repairs must be handled by certified technicians following manufacturer safety procedures.`;

export async function generateChatResponse(request: ChatRequest): Promise<{ reply: string; provider: string; model: string }> {
  const { messages, language, systemContext, userLevel } = request;
  const lastUserMsg = messages[messages.length - 1]?.content || '';

  const apiKey = env.AI_API_KEY?.trim();
  const isKeyConfigured = Boolean(apiKey && apiKey !== 'your_gemini_or_openai_api_key_here' && apiKey.length > 5);

  const contextPrompt = systemContext ? `\n[Current Learning Topic Context]: User is inspecting: ${systemContext}` : '';
  const levelPrompt = `\n[User Technical Level]: ${userLevel}`;
  const languagePrompt = `\n[Required Response Language]: ${
    language === 'hy' ? 'Armenian (Հայերեն)' : language === 'ru' ? 'Russian (Русский)' : 'English'
  }`;

  const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}${contextPrompt}${levelPrompt}${languagePrompt}`;

  // If a real API key is configured, call the LLM API
  if (isKeyConfigured) {
    try {
      if (env.AI_PROVIDER === 'gemini') {
        const candidateModels = [
          env.AI_MODEL || 'gemini-3.5-flash-lite',
          'gemini-3.5-flash-lite',
          'gemini-3.8-flash',
          'gemini-flash-latest',
        ];

        // Format conversation history for Gemini (roles: 'user' and 'model')
        const formattedContents = messages
          .filter((m) => m.content && m.content.trim().length > 0)
          .map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          }));

        // Ensure the sequence starts with a user message
        while (formattedContents.length > 0 && formattedContents[0].role !== 'user') {
          formattedContents.shift();
        }

        if (formattedContents.length === 0) {
          formattedContents.push({
            role: 'user',
            parts: [{ text: lastUserMsg || 'Hello' }],
          });
        }

        // Try primary model, fallback to alternative if needed
        let lastError: Error | null = null;
        for (const model of candidateModels) {
          try {
            const response = await fetchWithTimeout(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: fullSystemInstruction }],
                  },
                  contents: formattedContents,
                  generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1500,
                    topP: 0.95,
                  },
                }),
              },
              18000
            );

            if (response.ok) {
              const data = (await response.json()) as any;
              const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidateText && candidateText.trim().length > 0) {
                return { reply: candidateText.trim(), provider: 'gemini', model };
              }
            } else {
              const errBody = await response.text();
              console.warn(`Gemini API error with model ${model} (${response.status}):`, errBody);
              lastError = new Error(`Gemini status ${response.status}: ${errBody}`);
            }
          } catch (modelErr: any) {
            console.warn(`Attempt with ${model} failed:`, modelErr.message);
            lastError = modelErr;
          }
        }

        if (lastError) {
          throw lastError;
        }
      } else if (env.AI_PROVIDER === 'openai') {
        const response = await fetchWithTimeout(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: env.AI_MODEL || 'gpt-4o-mini',
              messages: [
                { role: 'system', content: fullSystemInstruction },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
              ],
              temperature: 0.3,
              max_tokens: 1200,
            }),
          },
          18000
        );

        if (response.ok) {
          const data = (await response.json()) as any;
          const candidateText = data?.choices?.[0]?.message?.content;
          if (candidateText) {
            return { reply: candidateText.trim(), provider: 'openai', model: env.AI_MODEL };
          }
        }
      }
    } catch (apiError: any) {
      console.warn('External AI call failed or timed out, activating engineering tutor fallback:', apiError.message);
      // Fall through to offline educational knowledge engine
    }
  }

  // Engineering Knowledge Fallback Engine when external API key is offline or rate-limited
  const fallbackReply = generateOfflineTutorReply(lastUserMsg, language, systemContext);
  return {
    reply: fallbackReply,
    provider: isKeyConfigured ? 'fallback' : 'local-educational-engine',
    model: 'engineering-tutor-v1',
  };
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

function generateOfflineTutorReply(prompt: string, lang: 'en' | 'hy' | 'ru', context?: string): string {
  const lower = prompt.toLowerCase();

  // Non-automotive queries check in fallback mode as well
  const nonCarKeywords = [
    'борщ', 'рецепт', 'суп', 'пирог', 'торт', 'кулинар', 'погода', 'фильм', 'музык', 'политик', 'президент',
    'ճաշ', 'բաղադրատոմս', 'տորթ', 'եղանակ', 'քաղաքական', 'recipe', 'cooking', 'weather', 'movie', 'song', 'politics',
  ];

  const isNonCar = nonCarKeywords.some((w) => lower.includes(w));
  if (isNonCar) {
    if (lang === 'hy') {
      return 'Ողջույն: Որպես **Automotive Engineering Explorer**-ի մասնագիտացված ինժեներական օգնական՝ ես պատասխանում եմ **բացառապես ավտոմեքենաներին, դրանց կառուցվածքին, մեխանիզմներին և աշխատանքի սկզբունքներին** վերաբերող հարցերին:\n\nԽնդրում եմ հարց ուղղել ավտոմեքենայի համակարգերի (շարժիչներ, փոխանցման տուփեր, կախոց, արգելակներ, ղեկային կառավարում, էլեկտրոնիկա) վերաբերյալ:';
    }
    if (lang === 'ru') {
      return 'Здравствуйте! Как специализированный инженерный ассистент **Automotive Engineering Explorer**, я отвечаю **исключительно на вопросы об автомобилях, их устройстве, механизмах и физических принципах работы**.\n\nПожалуйста, задайте мне вопрос по автомобильной тематике: о работе ДВС или электромотора, устройстве КПП, подвеске, тормозах, рулевом механизме, электронике или кузове автомобиля.';
    }
    return 'Hello! As a dedicated **Automotive Engineering Explorer** AI assistant, I specialize **exclusively in automobiles, vehicle engineering, mechanisms, and physical principles of operation**.\n\nPlease ask any question related to automotive systems: internal combustion engines, electric powertrains, transmissions, suspension, brakes, steering, or chassis design.';
  }

  // Multi-lingual automotive engineering knowledge base
  if (lang === 'hy') {
    if (lower.includes('stroke') || lower.includes('քառատակտ') || lower.includes('շարժիչ') || lower.includes('engine')) {
      return `**Ներքին այրման շարժիչի քառատակտ ցիկլը (Օտտոյի ցիկլ).**\n\n1. **Ներծծման տակտ (Intake):** Մխոցն իջնում է ՎՄԿ-ից (վերին մեռյալ կետ) դեպի ՆՄԿ: Բացվում է ներծծման փականը, գլանում ստեղծվում է նոսրացում (վակուում), և լցվում է օդավառելիքային խառնուրդը:\n2. **Սեղմման տակտ (Compression):** Բոլոր փականները փակ են: Մխոցը բարձրանում է՝ սեղմելով խառնուրդը, ինչի շնորհիվ բարձրանում են ճնշումն ու ջերմաստիճանը:\n3. **Աշխատանքային տակտ (Power / Combustion):** Բռնկման մոմիկը կայծ է տալիս (կամ դիզելում տեղի է ունենում ինքնաբռնկում): Գազերի ակնթարթային ընդարձակումը մխոցին հսկայական ուժով հրում է ներքև՝ պտտելով ծնկաձև լիսեռը:\n4. **Արտանետման տակտ (Exhaust):** Բացվում է արտանետման փականը, մխոցը բարձրանում է և այրված գազերը մղում արտանետման համակարգ:`;
    }
    if (lower.includes('torque') || lower.includes('power') || lower.includes('ոլորող') || lower.includes('հզորություն')) {
      return `**Ոլորող մոմենտ (Torque) ընդդեմ Հզորության (Power).**\n\n• **Ոլորող մոմենտ (Նյուտոն-մետր, Ն·մ):** Շրջադարձային մեխանիկական ուժի չափն է ($F \\times r$): Այն որոշում է ավտոմեքենայի արագացման հնարավորությունը ցածր պտույտներում և քարշուժը:\n• **Հզորություն (Կիլովատ կամ Ձիաուժ):** Աշխատանք կատարելու արագությունն է ժամանակի միավորում ($P = \\text{Torque} \\times \\omega$): Այն որոշում է մեքենայի առավելագույն հնարավոր արագությունը:`;
    }
    if (lower.includes('differential') || lower.includes('դիֆերենցիալ')) {
      return `**Դիֆերենցիալի աշխատանքի սկզբունքը.**\n\nԵրբ ավտոմեքենան շրջադարձ է կատարում, արտաքին անիվը պետք է անցնի ավելի երկար ճանապարհ, քան ներքինը: Դիֆերենցիալի արբանյակային (մոլորակային) ատամնանիվները թույլ են տալիս ձախ և աջ կիսալիսեռներին պտտվել տարբեր անկյունային արագություններով՝ միաժամանակ շարունակելով փոխանցել շարժիչի քարշուժը:`;
    }
    return `Ողջույն: Ես **Automotive Engineering Explorer**-ի ինժեներական AI օգնականն եմ: Պատրաստ եմ բացատրել ավտոմեքենայի ցանկացած համակարգի (շարժիչ, փոխանցման տուփ, կախոց, արգելակներ, ղեկային կառավարում, էլեկտրոնիկա կամ թափք) ֆիզիկական և տեխնիկական սկզբունքները:\n\n${context ? `Ներկայումս դուք ուսումնասիրում եք **${context}** բաժինը:` : ''}`;
  }

  if (lang === 'ru') {
    if (lower.includes('четырехтакт') || lower.includes('цикл') || lower.includes('двигател') || lower.includes('stroke')) {
      return `**Четырехтактный цикл работы ДВС (цикл Отто):**\n\n1. **Впуск (Intake):** Поршень опускается от ВМТ (верхней мертвой точки) к НМТ. Открывается впускной клапан, в цилиндре создается разрежение, заполняющее камеру топливно-воздушной смесью.\n2. **Сжатие (Compression):** Клапаны закрыты. Поршень поднимается вверх, сжимая смесь, что многократно повышает ее температуру и давление.\n3. **Рабочий ход (Power / Combustion):** Свеча зажигания воспламеняет смесь (в дизеле — самовоспламенение от сжатия). Расширяющиеся газы толкают поршень вниз с максимальным усилием, вращая коленчатый вал.\n4. **Выпуск (Exhaust):** Открывается выпускной клапан, поднимающийся поршень выталкивает отработавшие газы в выхлопную систему.`;
    }
    if (lower.includes('момент') || lower.includes('мощност') || lower.includes('torque') || lower.includes('power')) {
      return `**Крутящий момент против Мощности:**\n\n• **Крутящий момент (Н·м):** Сила вращения, приложенная к плечу рычага ($M = F \\times r$). Отвечает за тягу с самых низов, динамику разгона и способность преодолевать сопротивление движению.\n• **Мощность (кВт или л.с.):** Скорость совершения механической работы в единицу времени ($P = M \\times \\omega$). Определяет максимальную скорость автомобиля и поддержание динамики на высоких оборотах.`;
    }
    if (lower.includes('дифференциал') || lower.includes('differential')) {
      return `**Принцип работы межколесного дифференциала:**\n\nВ повороте наружное колесо автомобиля проходит дугу большего радиуса, чем внутреннее. Свободный дифференциал с помощью конических сателлитов перераспределяет угловые скорости между полуосями, позволяя колесам одной оси вращаться с разной скоростью без пробуксовки и паразитных нагрузок в приводе.`;
    }
    return `Здравствуйте! Я инженерный ассистент **Automotive Engineering Explorer**.\n\nЯ помогу вам разобраться в устройстве и принципах работы автомобильных систем: ДВС и электроприводов, механических и автоматических трансмиссий, подвески, тормозов с ABS, рулевого управления, электроники и силовой структуры кузова.\n\n${context ? `Текущий изучаемый раздел: **${context}**.` : ''}`;
  }

  // English (default)
  if (lower.includes('four-stroke') || lower.includes('stroke') || lower.includes('engine') || lower.includes('cycle')) {
    return `**The Four-Stroke Internal Combustion Cycle (Otto Cycle):**\n\n1. **Intake Stroke:** The intake valve opens as the piston descends from Top Dead Center (TDC) to Bottom Dead Center (BDC). The expanding cylinder volume creates negative pressure (vacuum), drawing in the stoichiometric air-fuel mixture.\n2. **Compression Stroke:** Both intake and exhaust valves close hermetically. The piston ascends toward TDC, compressing the trapped charge. This raises its thermodynamic pressure and temperature, preparing it for rapid, efficient flame propagation.\n3. **Power (Combustion) Stroke:** Near TDC, the spark plug fires (or diesel fuel self-ignites via compression heat). The explosive chemical combustion creates high-pressure gas expansion, driving the piston downward with immense force and converting linear thrust into crankshaft rotational torque.\n4. **Exhaust Stroke:** The exhaust valve opens near BDC. The piston travels upward, mechanically expelling the post-combustion exhaust gases through the manifold toward the exhaust system.`;
  }

  if (lower.includes('torque') || lower.includes('power')) {
    return `**Torque vs. Horsepower / Power:**\n\n• **Torque (N·m or lb·ft):** Rotational force produced by the engine at the crankshaft ($T = F \\times r$). Torque dictates tractive effort, low-RPM pulling capability, and how quickly the vehicle launches from a standstill.\n• **Power (kW or HP):** The rate at which mechanical work is performed over time ($P = \\text{Torque} \\times \\text{RPM} / 9549$). Power determines top-end acceleration and maximum achievable vehicle speed.`;
  }

  if (lower.includes('abs') || lower.includes('brake') || lower.includes('slip')) {
    return `**Anti-Lock Braking System (ABS) Engineering Principle:**\n\nWhen a tire locks up (100% wheel slip), sliding friction is significantly lower than peak static friction, and lateral steering grip drops to zero. \n\nABS prevents this through a rapid closed-loop hydraulic control:\n1. **Speed Sensors:** Reluctance or Hall-effect sensors on each wheel hub measure angular velocity.\n2. **ECU Threshold Detection:** If deceleration indicates impending lockup, the ABS ECU triggers hydraulic solenoid valves.\n3. **Pressure Modulation:** The modulator rapidly alternates between Pressure Hold, Pressure Release, and Pressure Reapply up to 15–20 times per second to maintain optimal 15–20% tire slip.`;
  }

  return `Welcome to the **Automotive Engineering Explorer AI Assistant**.\n\nI can explain the thermodynamics of internal combustion and electric powertrains, gear ratios, hydraulic suspension damping, ABS kinematics, Ackermann steering geometry, CAN-bus communications, and crash-energy management.\n\n${context ? `You are currently viewing: **${context}**.` : ''}`;
}
