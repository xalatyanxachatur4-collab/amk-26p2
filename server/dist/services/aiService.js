import { env } from '../config/env.js';
const SYSTEM_INSTRUCTION_BASE = `You are the Automotive Engineering Explorer AI Tutor, a senior automotive systems engineer, educator, and technical author.
Your mission is to provide technically accurate, intuitive, and pedagogically clear explanations of automotive engineering concepts.

Core principles:
1. Accuracy: Explain mechanical, thermodynamic, fluid-dynamic, and electrical principles with technical precision (e.g., stoichiometric ratio, Pascal's principle in hydraulics, Otto vs. Atkinson cycle, Ackermann steering geometry, flux density in motors).
2. Language: Always respond in the requested language (Armenian if 'hy', Russian if 'ru', English if 'en'), matching the technical vocabulary used in standard engineering literature.
3. Pedagogy: Break complex mechanics into clear sequential stages. Adapt explanation depth to the user's requested level.
4. Safety & Ethics: Emphasize that educational diagrams and text are conceptual models. For safety-critical systems (braking, steering, airbags, fuel systems, and high-voltage EV battery/inverter circuits), explicitly advise that maintenance should be performed by qualified technicians with certified safety gear. Never pretend to diagnose a specific physical vehicle or predict crash outcomes.
5. Honesty: If a concept depends on vehicle configuration (e.g., FWD transverse vs RWD longitudinal, or multi-link vs torsion beam), state these distinctions clearly.`;
export async function generateChatResponse(request) {
    const { messages, language, systemContext, userLevel } = request;
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const apiKey = env.AI_API_KEY?.trim();
    const isKeyConfigured = apiKey && apiKey !== 'your_gemini_or_openai_api_key_here' && apiKey.length > 5;
    const contextPrompt = systemContext ? `\n[Current Learning Topic Context]: User is inspecting: ${systemContext}` : '';
    const levelPrompt = `\n[User Level]: ${userLevel}`;
    const languagePrompt = `\n[Required Response Language]: ${language === 'hy' ? 'Armenian (Հայերեն)' : language === 'ru' ? 'Russian (Русский)' : 'English'}`;
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}${contextPrompt}${levelPrompt}${languagePrompt}`;
    // If a real API key is configured, call the LLM API
    if (isKeyConfigured) {
        try {
            if (env.AI_PROVIDER === 'gemini') {
                const response = await fetchWithTimeout(`https://generativelanguage.googleapis.com/v1beta/models/${env.AI_MODEL}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [{ text: `${fullSystemInstruction}\n\nUser Question:\n${lastUserMsg}` }],
                            },
                        ],
                        generationConfig: {
                            temperature: 0.4,
                            maxOutputTokens: 1024,
                        },
                    }),
                }, 15000);
                if (!response.ok) {
                    const errText = await response.text();
                    console.warn(`Gemini API error (${response.status}):`, errText);
                    throw new Error(`Gemini API responded with status ${response.status}`);
                }
                const data = (await response.json());
                const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (candidateText) {
                    return { reply: candidateText, provider: 'gemini', model: env.AI_MODEL };
                }
            }
            else if (env.AI_PROVIDER === 'openai') {
                const response = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
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
                        temperature: 0.5,
                        max_tokens: 1000,
                    }),
                }, 15000);
                if (!response.ok) {
                    const errText = await response.text();
                    console.warn(`OpenAI API error (${response.status}):`, errText);
                    throw new Error(`OpenAI API responded with status ${response.status}`);
                }
                const data = (await response.json());
                const candidateText = data?.choices?.[0]?.message?.content;
                if (candidateText) {
                    return { reply: candidateText, provider: 'openai', model: env.AI_MODEL };
                }
            }
        }
        catch (apiError) {
            console.warn('External AI call failed or timed out, using engineering tutor fallback:', apiError.message);
            // Fall through to tutor fallback
        }
    }
    // Engineering Knowledge Fallback Engine when external API key is not configured or offline
    const fallbackReply = generateOfflineTutorReply(lastUserMsg, language, systemContext);
    return {
        reply: fallbackReply,
        provider: isKeyConfigured ? 'fallback' : 'local-educational-engine',
        model: 'engineering-tutor-v1',
    };
}
async function fetchWithTimeout(url, options, timeoutMs) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        return res;
    }
    finally {
        clearTimeout(id);
    }
}
function generateOfflineTutorReply(prompt, lang, context) {
    const lower = prompt.toLowerCase();
    // Multi-lingual offline engineering knowledge base
    if (lang === 'hy') {
        if (lower.includes('stroke') || lower.includes('քառատակտ') || lower.includes('շարժիչ') || lower.includes('engine')) {
            return `**Ներքին այրման շարժիչի քառատակտ ցիկլը (Օտտոյի ցիկլ).**\n\n1. **Ներծծման տակտ (Intake):** Մխոցն իջնում է ՎՄԿ-ից (վերին մեռյալ կետ) դեպի ՆՄԿ: Բացվում է ներծծման փականը, գլանում ստեղծվում է նոսրացում (վակուում), և լցվում է օդավառելիքային խառնուրդը:\n2. **Սեղմման տակտ (Compression):** Բոլոր փականները փակ են: Մխոցը բարձրանում է՝ սեղմելով խառնուրդը, ինչի շնորհիվ բարձրանում են ճնշումն ու ջերմաստիճանը:\n3. **Աշխատանքային տակտ (Power / Combustion):** Բռնկման մոմիկը կայծ է տալիս (կամ դիզելում տեղի է ունենում ինքնաբռնկում): Գազերի ակնթարթային ընդարձակումը մխոցին հսկայական ուժով հրում է ներքև՝ պտտելով ծնկաձև լիսեռը:\n4. **Արտանետման տակտ (Exhaust):** Բացվում է արտանետման փականը, մխոցը բարձրանում է և այրված գազերը մղում արտանետման համակարգ:\n\n*Կարգավորման ցուցում:* Իրական AI մոդելին (Gemini/OpenAI) միանալու համար սերվերի \`.env\` ֆայլում նշեք ձեր \`AI_API_KEY\`-ը:`;
        }
        if (lower.includes('torque') || lower.includes('power') || lower.includes('ոլորող') || lower.includes('հզորություն')) {
            return `**Ոլորող մոմենտ (Torque) ընդդեմ Հզորության (Power).**\n\n• **Ոլորող մոմենտ (Նյուտոն-մետր, Ն·մ):** Շրջադարձային մեխանիկական ուժի չափն է ($F \\times r$): Այն որոշում է ավտոմեքենայի արագացման հնարավորությունը ցածր պտույտներում և քարշուժը:\n• **Հզորություն (Կիլովատ կամ Ձիաուժ):** Աշխատանք կատարելու արագությունն է ժամանակի միավորում ($P = \\text{Torque} \\times \\omega$): Այն որոշում է մեքենայի առավելագույն հնարավոր արագությունը:\n\n*Պարզ օրինակ.* Ոլորող մոմենտը ցույց է տալիս, թե որքան ծանրություն կարող եք տեղաշարժել, իսկ հզորությունը՝ թե որքան արագ կարող եք դա անել:`;
        }
        if (lower.includes('differential') || lower.includes('դիֆերենցիալ')) {
            return `**Դիֆերենցիալի աշխատանքի սկզբունքը.**\n\nԵրբ ավտոմեքենան շրջադարձ է կատարում, արտաքին անիվը պետք է անցնի ավելի երկար ճանապարհ, քան ներքինը: Եթե անիվները կոշտ միացված լինեին, անիվներից մեկը կսահեր:\n\nԴիֆերենցիալի արբանյակային (մոլորակային) ատամնանիվները թույլ են տալիս ձախ և աջ կիսալիսեռներին պտտվել տարբեր անկյունային արագություններով՝ միաժամանակ շարունակելով փոխանցել շարժիչի քարշուժը:`;
        }
        return `Ողջույն: Ես **Automotive Engineering Explorer**-ի ինժեներական AI օգնականն եմ: Պատրաստ եմ բացատրել ավտոմեքենայի ցանկացած համակարգի (շարժիչ, փոխանցման տուփ, կախոց, արգելակներ, ղեկային կառավարում, էլեկտրոնիկա կամ թափք) ֆիզիկական և տեխնիկական սկզբունքները:\n\n${context ? `Ներկայումս դուք ուսումնասիրում եք **${context}** բաժինը:` : ''}\n\n*Հուշում:* Լիարժեք առցանց LLM մոդել ակտիվացնելու համար կարգավորեք \`AI_API_KEY\` պարամետրը սերվերի \`.env\` ֆայլում:`;
    }
    if (lang === 'ru') {
        if (lower.includes('четырехтакт') || lower.includes('цикл') || lower.includes('двигател') || lower.includes('stroke')) {
            return `**Четырехтактный цикл работы ДВС (цикл Отто):**\n\n1. **Впуск (Intake):** Поршень опускается от ВМТ (верхней мертвой точки) к НМТ. Открывается впускной клапан, в цилиндре создается разрежение, заполняющее камеру топливно-воздушной смесью.\n2. **Сжатие (Compression):** Клапаны закрыты. Поршень поднимается вверх, сжимая смесь, что многократно повышает ее температуру и давление.\n3. **Рабочий ход (Power / Combustion):** Свеча зажигания воспламеняет смесь (в дизеле — самовоспламенение от сжатия). Расширяющиеся газы толкают поршень вниз с максимальным усилием, вращая коленчатый вал.\n4. **Выпуск (Exhaust):** Открывается выпускной клапан, поднимающийся поршень выталкивает отработавшие газы в выхлопную систему.\n\n*Примечание:* Для подключения внешнего LLM-сервиса (Gemini/OpenAI) настройте ключ \`AI_API_KEY\` в файле \`.env\`.`;
        }
        if (lower.includes('момент') || lower.includes('мощност') || lower.includes('torque') || lower.includes('power')) {
            return `**Крутящий момент против Мощности:**\n\n• **Крутящий момент (Н·м):** Сила вращения, приложенная к рычагу ($M = F \\times r$). Отвечает за приемистость, тягу на низких оборотах и способность разгонять массу автомобиля.\n• **Мощность (кВт или л.с.):** Скорость выполнения механической работы в единицу времени ($P = M \\times \\omega$). Определяет максимальную скорость автомобиля и динамику на высоких оборотах.\n\n*Простая аналогия:* Крутящий момент показывает, насколько тяжелый груз двигатель может сдвинуть, а мощность — с какой скоростью он может его нести.`;
        }
        if (lower.includes('дифференциал') || lower.includes('differential')) {
            return `**Принцип работы межколесного дифференциала:**\n\nВ повороте наружное колесо автомобиля проходит дугу большего радиуса, чем внутреннее. Дифференциал с помощью конических сателлитов перераспределяет угловые скорости между полуосями, позволяя колесам вращаться с разной скоростью без пробуксовки и скручивания привода.`;
        }
        return `Здравствуйте! Я инженерный ассистент **Automotive Engineering Explorer**.\n\nЯ помогу вам разобраться в устройстве и принципах работы автомобильных систем: ДВС и электроприводов, трансмиссии, подвески, тормозов, рулевого управления, электроники и силовой структуры кузова.\n\n${context ? `Текущий изучаемый раздел: **${context}**.` : ''}\n\n*Примечание разработчика:* Чтобы активировать онлайн-генерацию ответов через Gemini или OpenAI, укажите ваш \`AI_API_KEY\` в конфигурационном файле \`.env\`.`;
    }
    // English (default)
    if (lower.includes('four-stroke') || lower.includes('stroke') || lower.includes('engine') || lower.includes('cycle')) {
        return `**The Four-Stroke Internal Combustion Cycle (Otto Cycle):**\n\n1. **Intake Stroke:** The intake valve opens as the piston descends from Top Dead Center (TDC) to Bottom Dead Center (BDC). The expanding cylinder volume creates negative pressure (vacuum), drawing in the stoichiometric air-fuel mixture.\n2. **Compression Stroke:** Both intake and exhaust valves close hermetically. The piston ascends toward TDC, compressing the trapped charge. This raises its thermodynamic pressure and temperature, preparing it for rapid, efficient flame propagation.\n3. **Power (Combustion) Stroke:** Near TDC, the spark plug fires (or diesel fuel self-ignites via compression heat). The explosive chemical combustion creates high-pressure gas expansion ($P > 60\\text{ bar}$), driving the piston downward with immense force and converting linear thrust into crankshaft rotational torque.\n4. **Exhaust Stroke:** The exhaust valve opens near BDC. The piston travels upward, mechanically expelling the post-combustion exhaust gases through the manifold toward the catalytic converter and exhaust system.\n\n*Configuration note:* To query a live external LLM (Google Gemini or OpenAI), configure \`AI_API_KEY\` in your \`.env\` file.`;
    }
    if (lower.includes('torque') || lower.includes('power')) {
        return `**Torque vs. Horsepower / Power:**\n\n• **Torque ($\\text{N}\\cdot\\text{m}$ or $\\text{lb}\\cdot\\text{ft}$):** Rotational force produced by the engine at the crankshaft ($T = F \\times r$). Torque dictates tractive effort, low-RPM pulling capability, and how quickly the vehicle launches from a standstill.\n• **Power ($\\text{kW}$ or $\\text{HP}$):** The rate at which mechanical work is performed over time ($P = \\text{Torque} \\times \\text{RPM} / 9549$). Power determines top-end acceleration and maximum achievable vehicle speed.\n\n*Engineering rule of thumb:* "Torque gets you moving; Horsepower keeps you fast." In electric vehicles, maximum torque is available instantly from 0 RPM, unlike internal combustion engines which require reaching their volumetric efficiency torque band.`;
    }
    if (lower.includes('abs') || lower.includes('brake') || lower.includes('slip')) {
        return `**Anti-Lock Braking System (ABS) Engineering Principle:**\n\nWhen a tire locks up (100% wheel slip), sliding friction is significantly lower than peak static friction, and lateral steering grip drops to zero. \n\nABS prevents this through a rapid closed-loop hydraulic control:\n1. **Speed Sensors:** Reluctance or Hall-effect sensors on each wheel hub measure angular velocity.\n2. **ECU Threshold Detection:** If deceleration indicates impending lockup, the ABS ECU triggers hydraulic valves.\n3. **Pressure Modulation:** The modulator rapidly alternates between **Pressure Hold**, **Pressure Release**, and **Pressure Reapply** up to 15–20 times per second.\n\n*Result:* The tire remains in the optimal 10–20% slip zone, maintaining both directional steering control and minimizing stopping distance on most high-traction surfaces.`;
    }
    return `Welcome to the **Automotive Engineering Explorer AI Assistant**.\n\nI can explain the thermodynamics of internal combustion and electric powertrains, gear ratios, hydraulic suspension damping, ABS kinematics, Ackermann steering geometry, CAN-bus communications, and crash-energy management.\n\n${context ? `You are currently viewing: **${context}**.` : ''}\n\n*Configuration note:* To enable live dynamic responses via Google Gemini or OpenAI, supply your \`AI_API_KEY\` in the \`.env\` configuration file.`;
}
