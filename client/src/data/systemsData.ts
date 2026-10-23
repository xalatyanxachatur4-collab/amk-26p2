import { SystemData } from '../types/automotive.js';

export const systemsData: Record<string, SystemData> = {
  engine: {
    id: 'engine',
    name: {
      en: 'Engine and Powertrain',
      hy: 'Շարժիչ և ուժային ագրեգատ',
      ru: 'Двигатель и силовая установка',
    },
    subtitle: {
      en: 'Thermodynamics of energy conversion into mechanical rotational torque',
      hy: 'Էներգիայի ջերմադինամիկական փոխակերպումը մեխանիկական պտտման',
      ru: 'Термодинамическое преобразование тепловой энергии во вращающий момент',
    },
    category: {
      en: 'Powertrain',
      hy: 'Ուժային ագրեգատ',
      ru: 'Силовая установка',
    },
    iconName: 'Flame',
    introduction: {
      en: 'The engine is the primary prime mover of the automobile. In internal combustion engine (ICE) vehicles, it converts the chemical energy stored in hydrocarbon fuel into mechanical work through controlled thermodynamic combustion. In electric vehicles (EVs), an electric traction motor converts electrical potential energy stored in a battery pack into electromagnetic flux torque with over 90% thermodynamic efficiency.',
      hy: 'Շարժիչը ավտոմեքենայի հիմնական շարժիչ ուժն է: Ներքին այրման շարժիչներում (ՆԱՇ) ածխաջրածնային վառելիքի քիմիական էներգիան վերածվում է մեխանիկական աշխատանքի՝ վերահսկվող այրման միջոցով: Էլեկտրամոբիլներում էլեկտրական քարշային շարժիչը մարտկոցի էլեկտրական էներգիան փոխակերպում է էլեկտրամագնիսական պտտող մոմենտի՝ ավելի քան 90% օգտակար գործողության գործակցով (ՕԳԳ):',
      ru: 'Двигатель является первичным источником механической энергии автомобиля. В автомобилях с ДВС химическая энергия углеводородного топлива преобразуется в механическую работу посредством термодинамического сгорания. В электромобилях тяговый электромотор преобразует электроэнергию аккумулятора в электромагнитный крутящий момент с КПД свыше 90%.',
    },
    primaryPurpose: {
      en: 'Generate usable rotational torque and angular velocity to overcome aerodynamic drag, rolling resistance, and vehicular inertia.',
      hy: 'Առաջացնել պտտող մոմենտ և անկյունային արագություն՝ հաղթահարելու աերոդինամիկ դիմադրությունը, գլորման դիմադրությունը և մեքենայի իներցիան:',
      ru: 'Создание крутящего момента и угловой скорости для преодоления аэродинамического сопротивления, трения качения и инерции массы.',
    },
    components: [
      {
        id: 'cylinder-block',
        name: { en: 'Cylinder Block & Crankcase', hy: 'Գլանների բլոկ և կարտեր', ru: 'Блок цилиндров и картер' },
        material: { en: 'Cast iron or Die-cast Aluminium Alloy (A356/A380)', hy: 'Թուջ կամ ալյումինե համաձուլվածք', ru: 'Серый чугун или алюминиевый сплав' },
        function: {
          en: 'Forms the structural core containing cylinders, coolant jackets, and oil galleries, housing the rotating crankshaft.',
          hy: 'Կազմում է շարժիչի հիմնական կմախքը, որտեղ տեղադրված են գլանները, հովացման և յուղման անցուղիները:',
          ru: 'Служит силовой основой двигателя, вмещает цилиндры, каналы охлаждения и смазки, постели коленвала.',
        },
      },
      {
        id: 'piston-assembly',
        name: { en: 'Piston & Rings Assembly', hy: 'Մխոց և օղակներ', ru: 'Поршень с кольцами' },
        material: { en: 'Forged aluminium alloy with molybdenum coating', hy: 'Դարբնոցային ալյումինե համաձուլվածք', ru: 'Кованый алюминиевый сплав с антифрикционным покрытием' },
        function: {
          en: 'Translates high-pressure expanding combustion gases into linear reciprocating mechanical force, sealed by compression and oil scraper rings.',
          hy: 'Ընդունում է այրման գազերի բարձր ճնշումը և այն վերածում գծային համընթաց շարժման:',
          ru: 'Воспринимает давление расширяющихся газов и передает усилие на шатун через поршневой палец.',
        },
      },
      {
        id: 'crankshaft',
        name: { en: 'Crankshaft', hy: 'Ծնկաձև լիսեռ', ru: 'Коленчатый вал' },
        material: { en: 'Forged chrome-molybdenum alloy steel (42CrMo4)', hy: 'Դարբնոցային լեգիրված պողպատ', ru: 'Кованая легированная сталь с индукционной закалкой шеек' },
        function: {
          en: 'Converts reciprocating linear piston motion into continuous rotational torque, counterweighted to balance first- and second-order harmonics.',
          hy: 'Մխոցների գծային շարժումը վերածում է շարունակական պտտման, հավասարակշռված է հակակշիռներով:',
          ru: 'Преобразует возвратно-поступательное движение поршней во вращательное движение маховика.',
        },
      },
      {
        id: 'camshaft',
        name: { en: 'Camshaft & Valvetrain', hy: 'Բաշխիչ լիսեռ և փականային մեխանիզմ', ru: 'Распределительный вал и ГРМ' },
        material: { en: 'Chilled cast iron or forged steel with induction-hardened lobes', hy: 'Կոփված թուջ կամ պողպատ', ru: 'Легированный чугун или сталь с поверхностной закалкой кулачков' },
        function: {
          en: 'Synchronously opens and closes intake and exhaust poppet valves with variable valve timing (VVT) and lift control.',
          hy: 'Ճշգրիտ համաժամանակյա բացում և փակում է ներծծման և արտանետման փականները:',
          ru: 'Управляет фазами газораспределения, синхронно открывая и закрывая впускные и выпускные клапаны.',
        },
      },
      {
        id: 'turbocharger',
        name: { en: 'Turbocharger / Forced Induction', hy: 'Տուրբոմղիչ (տուրբոկոմպրեսոր)', ru: 'Турбокомпрессор' },
        material: { en: 'Nickel-alloy Inconel turbine with billet aluminum compressor wheel', hy: 'Նիկել-ինկոնել համաձուլվածք և ալյումին', ru: 'Жаропрочный никелевый сплав Inconel и алюминий' },
        function: {
          en: 'Recovers enthalpy from exhaust gases to compress ambient intake air, increasing volumetric efficiency and air mass density in cylinders.',
          hy: 'Օգտագործում է արտանետվող գազերի էներգիան՝ մխոցներ մղվող օդը սեղմելու և հզորությունը բարձրացնելու համար:',
          ru: 'Использует энергию отработавших газов для нагнетания воздуха в цилиндры, повышая удельную мощность.',
        },
      },
      {
        id: 'electric-motor',
        name: { en: 'Permanent Magnet Synchronous Motor (EV)', hy: 'Մշտական մագնիսներով սինխրոն շարժիչ (ԷՄ)', ru: 'Синхронный электромотор на постоянных магнитах (EV)' },
        material: { en: 'Laminated silicon steel stator with Neodymium (NdFeB) rotor magnets', hy: 'Սիլիցիումային պողպատ և նեոդիմային մագնիսներ', ru: 'Электротехническая сталь и неодимовые магниты' },
        function: {
          en: 'Generates instantaneous maximum electromagnetic torque from zero RPM through sinusoidal 3-phase alternating current stator field rotation.',
          hy: 'Առաջացնում է ակնթարթային առավելագույն մոմենտ զրո պտույտից՝ եռաֆազ փոփոխական հոսանքի մագնիսական դաշտի միջոցով:',
          ru: 'Создает максимальный крутящий момент с нулевых оборотов за счет вращающегося поля статора.',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Intake Stroke', hy: 'Ներծծման տակտ', ru: 'Такт впуска' },
        description: {
          en: 'The intake valve opens as the piston descends from Top Dead Center (TDC) to Bottom Dead Center (BDC). Cylinder volume expands, creating a depression (vacuum) that draws in atmospheric air mixed with metered fuel.',
          hy: 'Ներծծման փականը բացվում է, մխոցն իջնում է ՎՄԿ-ից ՆՄԿ: Ծավալի մեծացման հետևանքով առաջացած նոսրացումը ներս է քաշում օդավառելիքային խառնուրդը:',
          ru: 'Впускной клапан открывается при ходе поршня от ВМТ к НМТ. Разрежение в цилиндре засасывает заряд топливно-воздушной смеси.',
        },
        keyPhysics: { en: 'Ideal Gas Law & Bernoulli Manifold Flow', hy: 'Իդեալական գազի օրենք և Բեռնուլիի հավասարում', ru: 'Уравнение состояния идеального газа и закон Бернулли' },
      },
      {
        step: 2,
        title: { en: 'Compression Stroke', hy: 'Սեղմման տակտ', ru: 'Такт сжатия' },
        description: {
          en: 'Both valves seal hermetically. The piston ascends toward TDC, compressing the trapped gaseous charge by a ratio typically between 9.5:1 and 14:1 (higher in Atkinson cycles). Pressure rises to 15-25 bar and temperature to 400-500°C.',
          hy: 'Բոլոր փականները կիպ փակվում են: Մխոցը բարձրանում է դեպի ՎՄԿ՝ սեղմելով խառնուրդը 10:1-ից մինչև 14:1 հարաբերակցությամբ, ինչը բարձրացնում է ճնշումն ու ջերմաստիճանը:',
          ru: 'Оба клапана закрыты. Поршень движется к ВМТ, сжимая заряд в 10–14 раз, нагревая смесь для оптимального воспламенения.',
        },
        keyPhysics: { en: 'Adiabatic Compression: PV^γ = const', hy: 'Ադիաբատ սեղմում. PV^γ = հաստատուն', ru: 'Адиабатическое сжатие: PV^γ = const' },
      },
      {
        step: 3,
        title: { en: 'Combustion & Power Stroke', hy: 'Այրման և աշխատանքային տակտ', ru: 'Рабочий ход (Сгорание и расширение)' },
        description: {
          en: 'Around 10-25° before TDC, the spark plug initiates flame front deflagration. Peak cylinder pressure surges past 60-120 bar, driving the piston downward with immense linear force transferred through the connecting rod to turn the crankshaft.',
          hy: 'ՎՄԿ-ից առաջ կայծը բռնկում է խառնուրդը: Գազերի ճնշումը թռիչքաձև հասնում է 60-120 բարի՝ մխոցը հզոր ուժով հրելով ներքև և պտտելով ծնկաձև լիսեռը:',
          ru: 'Искра воспламеняет заряд, давление взрывообразно нарастает до 80–120 бар, толкая поршень вниз и передавая вращающий момент на коленвал.',
        },
        keyPhysics: { en: 'First Law of Thermodynamics: Chemical to Kinetic Work', hy: 'Ջերմադինամիկայի 1-ին օրենք. Քիմիական էներգիայից մեխանիկական աշխատանք', ru: 'Первый закон термодинамики: преобразование энтальпии реакции в работу' },
      },
      {
        step: 4,
        title: { en: 'Exhaust Stroke', hy: 'Արտանետման տակտ', ru: 'Такт выпуска' },
        description: {
          en: 'The exhaust poppet valve opens near BDC as cylinder pressure begins blowdown. The piston travels upward, physically sweeping post-combustion gases out into the exhaust manifold toward emission catalytic reactors.',
          hy: 'Արտանետման փականը բացվում է: Մխոցը բարձրանում է՝ գլանից դուրս մղելով այրված գազերը դեպի արտանետման կոլեկտոր և կատալիզատոր:',
          ru: 'Выпускной клапан открывается, поршень поднимается к ВМТ и выталкивает отработавшие газы в систему нейтрализации.',
        },
        keyPhysics: { en: 'Sonic Blowdown & Scavenging Wave Dynamics', hy: 'Արտանետման ալիքային դինամիկա', ru: 'Волновая динамика очистки камеры сгорания' },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Torque vs. Power (Horsepower)', hy: 'Ոլորող մոմենտ ընդդեմ Հզորության', ru: 'Крутящий момент против Мощности' },
        explanation: {
          en: 'Torque represents the instantaneous rotational force produced at the crankshaft, responsible for overcoming vehicle inertia. Power is the rate of work done over time. As engine RPM increases, power climbs even if torque plateaus.',
          hy: 'Ոլորող մոմենտը շարժիչի պտտական ուժն է, որը պատասխանատու է քարշուժի և արագացման համար: Հզորությունը աշխատանք կատարելու արագությունն է ժամանակի ընթացքում:',
          ru: 'Крутящий момент — это сила вращения на плече рычага. Мощность — это скорость выполнения работы за единицу времени.',
        },
        formula: 'P (kW) = (Torque [N·m] × RPM) / 9549',
        relevance: {
          en: 'Determines acceleration curve vs top speed and transmission gear step spacing.',
          hy: 'Որոշում է արագացման դինամիկան և փոխանցման թվերի ճշգրիտ ընտրությունը:',
          ru: 'Определяет подбор передаточных чисел и характер разгонной динамики.',
        },
      },
      {
        title: { en: 'Volumetric Efficiency', hy: 'Ծավալային օգտակար գործակից (ՕԳԳ)', ru: 'Объемный КПД (Volumetric Efficiency)' },
        explanation: {
          en: 'The ratio of actual air mass inducted into the cylinder compared to the theoretical cylinder displacement at ambient temperature and pressure. Naturally aspirated engines achieve 80-95%, while turbocharged engines exceed 150-250%.',
          hy: 'Գլան լցվող օդի փաստացի զանգվածի հարաբերությունն է տեսական ծավալին: Տուրբոշարժիչներում այն գերազանցում է 150-200%-ը:',
          ru: 'Отношение массы фактически поступившего в цилиндр воздуха к теоретической вместимости объема цилиндра.',
        },
        formula: 'η_v = (2 × m_air_dot) / (ρ_air × V_d × N)',
        relevance: {
          en: 'Directly limits maximum stoichiometric fuel mass burned per cycle.',
          hy: 'Ուղղակիորեն սահմանափակում է ցիկլում այրվող վառելիքի առավելագույն քանակը:',
          ru: 'Прямо ограничивает максимальное количество топлива, сжигаемого за такт.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Engine misfire under load with flashing Check Engine Light', hy: 'Շարժիչի ընդհատումներ (троение) ծանրաբեռնվածության տակ', ru: 'Пропуски воспламенения под нагрузкой, мигающий Check Engine' },
        probableCause: { en: 'Degraded ignition coil pack, fouled spark plug gap, or clogged high-pressure direct fuel injector', hy: 'Բռնկման կոճի խափանում, մոմիկի մաշվածություն կամ ֆարսունկայի խցանում', ru: 'Пробой катушки зажигания, износ электродов свечи или загрязнение форсунки' },
        diagnosticAdvice: { en: 'Scan OBD-II mode 06 misfire counters (P0300-P0308) and test secondary coil resistance and fuel rail pressure.', hy: 'Ստուգել OBD-II սխալների կոդերը (P0301-P0308) և չափել բոցավառման կոճերի դիմադրությունը:', ru: 'Считать коды P0300–P0308, проверить счетчики пропусков в Mode $06 и давление в топливной рампе.' },
      },
      {
        symptom: { en: 'Metallic knocking or bottom-end tapping synchronized with engine speed', hy: 'Մետաղական թակոց շարժիչի ներքևի մասից', ru: 'Глухой ритмичный металлический стук в нижней части блока' },
        probableCause: { en: 'Connecting rod bearing spun or journal clearance excessive due to oil starvation', hy: 'Շատունային ներդիրների (շատունի վկլադիշների) մաշվածություն յուղաքաղցի պատճառով', ru: 'Проворот или критический износ шатунных вкладышей из-за масляного голодания' },
        diagnosticAdvice: { en: 'Immediately shut down engine; check engine oil for copper/lead glitter with magnetic drain plug and measure mechanical oil pressure.', hy: 'Անմիջապես անջատել շարժիչը, ստուգել յուղի ճնշումը և յուղում մետաղական փոշու առկայությունը:', ru: 'Немедленно заглушить мотор, замерить механическое давление масла и проверить фильтр на металлическую стружку.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Replace full-synthetic engine oil and high-efficiency filtration media at manufacturer intervals (typically 5,000–10,000 miles) to prevent hydrodynamic journal bearing wear and timing chain elongation.',
        hy: 'Պարբերաբար փոխել սինթետիկ յուղը և զտիչը (7,000-10,000 կմ), որպեսզի կանխվի ծնկաձև լիսեռի ներդիրների մաշվածությունը և շղթայի ձգումը:',
        ru: 'Регулярная замена синтетического моторного масла и фильтра (каждые 7 500–10 000 км) предотвращает износ шеек коленвала и вытягивание цепи ГРМ.',
      },
      {
        en: 'Inspect and replace timing belt / chain tensioners and water pump per schedule to prevent catastrophic interference engine piston-to-valve collisions.',
        hy: 'Ժամանակին փոխարինել գազաբաշխման մեխանիզմի (Ռեմեն/Շղթա) գոտին և ձգիչները՝ փականների և մխոցների բախումից խուսափելու համար:',
        ru: 'Своевременная замена ремня/цепи ГРМ с натяжителями исключает загиб клапанов при встрече с поршнями в двигателях интерференционного типа.',
      },
    ],
    safetyNotes: [
      {
        en: 'Pressurized Cooling System: Never remove the radiator cap or coolant expansion tank cap while the engine is hot. Boiling ethylene-glycol solution under 1.2–1.5 bar can cause severe thermal burns.',
        hy: 'Հովացման համակարգը գտնվում է ճնշման տակ. երբեք մի բացեք ռադիատորի կամ ընդարձակման բակի կափարիչը տաք շարժիչի դեպքում:',
        ru: 'Никогда не открывайте крышку радиатора или расширительного бачка на горячем двигателе: антифриз под давлением до 1.5 бар вызовет тяжелые ожоги.',
      },
      {
        en: 'Electric Vehicle High-Voltage Warning: Hybrid and EV powertrain components (orange cabling, inverter, high-voltage battery) operate between 350V and 800V DC. Electric shock is lethal; de-energization and lock-out/tag-out by certified personnel is strictly mandatory.',
        hy: 'Բարձրավոլտ էլեկտրական համակարգի նախազգուշացում. Էլեկտրամոբիլների նարնջագույն լարերը և ինվերտորը գործում են 400V-800V հաստատուն լարման տակ: Խստիվ արգելվում է ինքնուրույն դիպչել:',
        ru: 'Оранжевые высоковольтные кабели и инверторы электромобилей находятся под напряжением 400–800В. Прикосновение смертельно опасно.',
      },
    ],
    relatedSystems: [
      {
        id: 'transmission',
        name: { en: 'Transmission and Drivetrain', hy: 'Փոխանցման տուփ', ru: 'Трансмиссия' },
        relationship: {
          en: 'Receives crankshaft rotational torque via flywheel/clutch or torque converter, multiplying it through variable gear ratios.',
          hy: 'Ընդունում է շարժիչի պտտող մոմենտը և այն բազմապատկում տարբեր փոխանցման թվերով:',
          ru: 'Принимает крутящий момент через сцепление или гидротрансформатор и согласует обороты с колесами.',
        },
      },
      {
        id: 'electrical',
        name: { en: 'Electrical and Electronic Systems', hy: 'Էլեկտրական համակարգեր', ru: 'Электроника' },
        relationship: {
          en: 'Supplies high-pressure fuel injection pulses, spark discharge timing, and closed-loop lambda oxygen sensor air-fuel stoichiometry.',
          hy: 'Ապահովում է բռնկման կայծը, վառելիքի ճշգրիտ ներարկումը և սենսորների հետադարձ կապը:',
          ru: 'Управляет фазами впрыска, зажиганием и поддерживает стехиометрический состав смеси по датчикам кислорода.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-engine-1',
        question: {
          en: 'During which stroke of a four-stroke Otto cycle is useful positive mechanical work performed on the crankshaft?',
          hy: 'Օտտոյի քառատակտ ցիկլի ո՞ր տակտի ընթացքում է կատարվում օգտակար մեխանիկական աշխատանքը ծնկաձև լիսեռի վրա:',
          ru: 'На каком такте четырехтактного цикла Отто совершается полезная механическая работа?',
        },
        options: [
          { text: { en: 'Intake Stroke', hy: 'Ներծծման տակտ', ru: 'Такт впуска' }, isCorrect: false },
          { text: { en: 'Compression Stroke', hy: 'Սեղմման տակտ', ru: 'Такт сжатия' }, isCorrect: false },
          { text: { en: 'Power / Combustion Stroke', hy: 'Աշխատանքային տակտ (Այրում)', ru: 'Рабочий ход (сгорание)' }, isCorrect: true },
          { text: { en: 'Exhaust Stroke', hy: 'Արտանետման տակտ', ru: 'Такт выпуска' }, isCorrect: false },
        ],
        explanation: {
          en: 'During the power stroke, expanding combustion gases generate extreme pressure on the piston face, pushing it down and driving the crankshaft.',
          hy: 'Աշխատանքային տակտում այրման գազերի բարձր ճնշումը մխոցը հրում է ներքև՝ պտտելով ծնկաձև լիսեռը:',
          ru: 'В рабочем ходе расширение раскаленных газов толкает поршень вниз, производя механическую работу.',
        },
        difficulty: 'beginner',
      },
      {
        id: 'q-engine-2',
        question: {
          en: 'Why do electric traction motors provide instantaneous peak torque at zero RPM compared to internal combustion engines?',
          hy: 'Ինչո՞ւ են էլեկտրաշարժիչները 0 պտույտից ապահովում առավելագույն ոլորող մոմենտ՝ ի տարբերություն ՆԱՇ-ի:',
          ru: 'Почему тяговые электромоторы развивают максимальный крутящий момент прямо с 0 об/мин?',
        },
        options: [
          { text: { en: 'They use forced induction turbochargers', hy: 'Նրանք օգտագործում են տուրբոմղիչներ', ru: 'Они используют турбонаддув' }, isCorrect: false },
          { text: { en: 'Maximum magnetic flux interaction occurs immediately when full phase current is applied to the stator windings', hy: 'Առավելագույն մագնիսական հոսքի փոխազդեցությունը տեղի է ունենում անմիջապես ստատորի փաթույթներին հոսանք տալիս', ru: 'Максимальный магнитный поток создается сразу при подаче фазного тока в обмотки статора' }, isCorrect: true },
          { text: { en: 'They compress air to higher pressure than gasoline engines', hy: 'Նրանք օդն ավելի շատ են սեղմում', ru: 'Они сжимают воздух сильнее бензиновых моторов' }, isCorrect: false },
          { text: { en: 'Electric motors do not have any rotating parts', hy: 'Էլեկտրաշարժիչները չունեն պտտվող մասեր', ru: 'В электромоторах нет вращающихся деталей' }, isCorrect: false },
        ],
        explanation: {
          en: 'Electromagnetic torque is proportional to the stator magnetic flux and rotor current, which can be commanded instantly from standstill by the power inverter without waiting for volumetric airflow buildup.',
          hy: 'Էլեկտրամագնիսական մոմենտը կախված է մագնիսական դաշտի հոսքից և հոսանքի ուժից, որը ինվերտորը կարող է ապահովել վայրկյանի միլիերորդական մասում:',
          ru: 'Сила Лоренца в электромоторе возникает мгновенно при подаче тока инвертором и не зависит от наполнения цилиндров воздухом.',
        },
        difficulty: 'intermediate',
      },
    ],
  },

  transmission: {
    id: 'transmission',
    name: {
      en: 'Transmission and Drivetrain',
      hy: 'Փոխանցման տուփ և տրանսմիսիա',
      ru: 'Трансмиссия и привод',
    },
    subtitle: {
      en: 'Torque multiplication, speed ratios, and power distribution to driving wheels',
      hy: 'Ոլորող մոմենտի բազմապատկում և քարշուժի բաշխում տանող անիվներին',
      ru: 'Трансформация крутящего момента, передаточные числа и распределение тяги',
    },
    category: {
      en: 'Drivetrain',
      hy: 'Տրանսմիսիա',
      ru: 'Трансмиссия',
    },
    iconName: 'Cog',
    introduction: {
      en: 'The transmission and drivetrain bridge the power source and the driving road wheels. Because internal combustion engines produce usable torque only within a narrow operating RPM band (typically 1,500–6,500 RPM), the transmission employs selectable gear reduction ratios to match vehicle speed demands while multiplying torque to overcome vehicle inertia.',
      hy: 'Փոխանցման տուփն ու տրանսմիսիան կապող օղակ են շարժիչի և տանող անիվների միջև: Քանի որ ՆԱՇ-ը արդյունավետ է աշխատում պտույտների նեղ միջակայքում, փոխանցման տուփը փոխում է փոխանցման թվերը՝ բազմապատկելով մոմենտը տեղից շարժվելիս և ապահովելով տնտեսող աշխատանք մեծ արագություններում:',
      ru: 'Трансмиссия передает крутящий момент от двигателя к ведущим колесам. Поскольку ДВС выдает эффективную тягу в ограниченном диапазоне оборотов, коробка передач изменяет передаточные числа, умножая крутящий момент на старте и обеспечивая экономичность на трассе.',
    },
    primaryPurpose: {
      en: 'Adapt the engine or motor operating characteristics to vehicle road speed requirements and distribute tractive force through differentials.',
      hy: 'Հարմարեցնել շարժիչի աշխատանքը մեքենայի շարժման արագությանը և քարշուժը դիֆերենցիալների միջոցով բաշխել անիվներին:',
      ru: 'Преобразование крутящего момента и частоты вращения с последующим распределением на ведущие колеса через дифференциал.',
    },
    components: [
      {
        id: 'clutch-or-converter',
        name: { en: 'Clutch / Hydrodynamic Torque Converter', hy: 'Կցորդիչ (սցեպլենիե) կամ Հիդրոտրանսֆորմատոր', ru: 'Сцепление или Гидротрансформатор' },
        function: {
          en: 'Decouples engine rotation from the transmission during shifts or stops; torque converters fluidly multiply torque at low input speeds.',
          hy: 'Անջատում է շարժիչի պտույտը փոխանցման տուփից կանգառների և փոխանցումները փոխելու ժամանակ:',
          ru: 'Размыкает связь мотора с коробкой передач; гидротрансформатор обеспечивает плавное гидродинамическое умножение тяги.',
        },
      },
      {
        id: 'gearbox-geartrain',
        name: { en: 'Planetary or Helical Geartrain', hy: 'Ատամնանիվների հավաքակազմ', ru: 'Зубчатый редуктор (шестерни)' },
        function: {
          en: 'Provides discrete gear ratios (1st gear reduction ~4:1 up to overdrive ~0.65:1) to manipulate rotational velocity and torque inversely.',
          hy: 'Ապահովում է տարբեր փոխանցման թվեր՝ մոմենտը բազմապատկելու կամ բարձր արագություն ապահովելու համար:',
          ru: 'Обеспечивает фиксированные ступени передаточных чисел от тяговых до повышающих (овердрайв).',
        },
      },
      {
        id: 'differential',
        name: { en: 'Open / Limited-Slip Differential', hy: 'Դիֆերենցիալ', ru: 'Межколесный дифференциал' },
        function: {
          en: 'Splits incoming drive torque equally while allowing inner and outer drive wheels to rotate at different speeds through planetary bevel gears during turns.',
          hy: 'Շրջադարձերում թույլ է տալիս ձախ և աջ անիվներին պտտվել տարբեր արագություններով՝ միաժամանակ շարունակելով փոխանցել քարշուժը:',
          ru: 'Передает момент на колеса, позволяя им вращаться с разными угловыми скоростями на криволинейной траектории.',
        },
      },
      {
        id: 'driveshaft-halfshafts',
        name: { en: 'Driveshaft & Constant Velocity (CV) Axles', hy: 'Կարդանային լիսեռ և ՀԱԱԾ (ШРУС)', ru: 'Карданный вал и ШРУСы (полуоси)' },
        function: {
          en: 'Transfers rotational torque across angular deflections and suspension travel without angular velocity pulsations.',
          hy: 'Փոխանցում է պտտող մոմենտը անկյունային տատանումների և կախոցի աշխատանքի պայմաններում:',
          ru: 'Передает крутящий момент к ступицам колес при изменяющихся углах работы подвески без пульсаций скорости.',
        },
      },
      {
        id: 'ev-reducer',
        name: { en: 'EV Single-Speed Reduction Gearbox', hy: 'Էլեկտրամոբիլի ռեդուկտոր', ru: 'Одноступенчатый редуктор электромобиля' },
        function: {
          en: 'Compact compound helical reduction gearset (~9:1 ratio) stepping down high-speed EV motor rotation (up to 18,000 RPM) while multiplying drive torque with >98% mechanical efficiency and zero shift interruptions.',
          hy: 'Կոմպակտ կոսոզուբ ռեդուկտոր (~9:1), որը նվազեցնում է էլեկտրաշարժիչի բարձր պտույտները (մինչև 18000 պտ/ր)՝ բազմապատկելով մոմենտը 98% ՕԳԳ-ով:',
          ru: 'Компактный двухступенчатый цилиндрический косозубый редуктор (~9:1), согласующий сверхвысокие обороты электромотора (до 18 000 об/мин) с колесами с КПД >98% без разрыва потока мощности.',
        },
      },
      {
        id: 'planetary-gearset',
        name: { en: 'Automatic Epicyclic Planetary Gearset & Brake Bands', hy: 'Ավտոմատ պլանետար փոխանցման համակարգ', ru: 'Планетарный механизм и фрикционы АКПП' },
        function: {
          en: 'Sun, planet pinions, and ring gear controlled by hydraulic wet multi-plate clutch packs and brake bands to achieve underdrive, direct 1:1, overdrive, and reverse without physical gear disengagement.',
          hy: 'Արևային, սատելիտային և պսակաձև ատամնանիվներ, որոնք կառավարվում են հիդրավլիկ ֆրիկցիոններով՝ փոխելով փոխանցումներն առանց քարշուժի ընդհատման:',
          ru: 'Комплекс из солнечной, коронной шестерен и сателлитов на водиле, управляемый гидравлическими фрикционами и ленточными тормозами для переключения без разрыва потока мощности.',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: '1st Gear Acceleration', hy: '1-ին փոխանցում (Տեղից շարժվել)', ru: '1-я передача (Старт с места)' },
        description: {
          en: 'A high gear ratio (e.g. 4.0:1) multiplied by final drive (e.g. 3.8:1) yields total torque multiplication of ~15.2x, overcoming static friction and inertia.',
          hy: 'Մեծ փոխանցման թիվը (օր. 4.0:1) բազմապատկում է շարժիչի ոլորող մոմենտը ավելի քան 15 անգամ՝ հեշտությամբ տեղից շարժելով մեքենան:',
          ru: 'Высокое передаточное отношение многократно умножает крутящий момент, преодолевая силу тяжести и инерцию покоя.',
        },
      },
      {
        step: 2,
        title: { en: 'Direct & Overdrive Cruising', hy: 'Ուղիղ և Բարձրացնող փոխանցումներ', ru: 'Прямая и повышающая передачи (Трасса)' },
        description: {
          en: 'Higher gears reduce transmission ratio below 1.0:1 (overdrive). The engine spins at low, fuel-efficient RPM (1,400–2,000 RPM) at highway speeds.',
          hy: 'Բարձր փոխանցումներում փոխանցման թիվը 1-ից փոքր է: Շարժիչն աշխատում է ցածր պտույտներով՝ ապահովելով վառելիքի խնայողություն:',
          ru: 'На высших ступенях передаточное число меньше единицы, что снижает обороты мотора на шоссейных скоростях.',
        },
      },
      {
        step: 3,
        title: { en: 'Differential Cornering Dynamics', hy: 'Դիֆերենցիալի աշխատանքը շրջադարձում', ru: 'Работа дифференциала в повороте' },
        description: {
          en: 'In a curve, the outer wheel traces a larger arc. Differential bevel spider pinions orbit on their pins, feeding extra RPM to the outer half-shaft while subtracting equal RPM from the inner.',
          hy: 'Շրջադարձի ժամանակ դիֆերենցիալի արբանյակները պտտվում են իրենց առանցքի շուրջ՝ արտաքին անիվին հաղորդելով ավելի մեծ պտույտներ:',
          ru: 'Сателлиты дифференциала начинают вращаться на осях, перераспределяя скорость между полуосями без пробуксовки.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Gear Ratio & Conservation of Power', hy: 'Փոխանցման թիվ և Էներգիայի պահպանում', ru: 'Передаточное число и закон сохранения энергии' },
        explanation: {
          en: 'Ignoring friction losses, mechanical power is conserved: P = T1 × ω1 = T2 × ω2. If speed decreases by ratio R, output torque increases by exactly ratio R.',
          hy: 'Եթե անտեսենք շփման կորուստները, հզորությունը պահպանվում է: Եթե փոխանցման տուփը փոքրացնում է պտտման արագությունը, մոմենտը նույնքան անգամ մեծանում է:',
          ru: 'Без учета потерь мощность постоянна: при снижении угловой скорости в R раз крутящий момент возрастает ровно в R раз.',
        },
        formula: 'T_out = T_in × Ratio × Efficiency',
        relevance: {
          en: 'Fundamental basis of transmission engineering.',
          hy: 'Փոխանցման տուփի նախագծման հիմնարար օրենքն է:',
          ru: 'Фундаментальная основа расчета тягово-скоростных характеристик.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Slipping transmission during acceleration (engine revs flare without vehicle accelerating)', hy: 'Փոխանցման տուփի «սահք» (շարժիչի պտույտներն աճում են, բայց մեքենան չի արագանում)', ru: 'Пробуксовка трансмиссии при разгоне (обороты растут, машина не ускоряется)' },
        probableCause: { en: 'Worn manual clutch friction disc or degraded automatic transmission clutch friction plates and low line pressure', hy: 'Կցորդիչի մաշվածություն կամ ավտոմատ տուփում յուղի ցածր ճնշում և ֆրիկցիոնների մաշվածություն', ru: 'Износ диска сцепления МКПП либо износ пакетов фрикционов и низкое давление ATF в АКПП' },
        diagnosticAdvice: { en: 'Check transmission fluid level and smell for burnt aromatic smell; run stall test or clutch engagement point test.', hy: 'Ստուգել տրանսմիսիոն հեղուկի մակարդակը և հոտը, ստուգել կցորդիչի բռնման կետը:', ru: 'Проверить уровень и состояние ATF (наличие запаха гари), выполнить stall-test или диагностику гидроблока.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Service automatic transmission fluid (ATF/CVTF/DCTF) and internal magnets/filters every 40,000–60,000 miles to flush microscopic clutch wear debris and restore hydraulic anti-shudder friction modifiers.',
        hy: 'Փոխել տրանսմիսիոն հեղուկը (ATF) և զտիչները 60,000-80,000 կմ մեկ՝ կանխելու հիդրոբլոկի խցանումը:',
        ru: 'Замена трансмиссионной жидкости ATF/CVT и фильтров каждые 60 000 км предотвращает износ соленоидов гидроблока.',
      },
    ],
    safetyNotes: [
      {
        en: 'Never engage Park (P) or reverse gear while the vehicle is in forward motion; mechanical parking pawls can shear, leading to loss of holding ability.',
        hy: 'Երբեք մի միացրեք «Park» կամ հետընթաց ռեժիմը մեքենայի շարժման ընթացքում:',
        ru: 'Никогда не включайте режим «Паркинг» (P) или задний ход во время движения автомобиля вперед.',
      },
    ],
    relatedSystems: [
      {
        id: 'engine',
        name: { en: 'Engine and Powertrain', hy: 'Շարժիչ', ru: 'Двигатель' },
        relationship: {
          en: 'Supplies torque into the transmission input shaft.',
          hy: 'Մատակարարում է մոմենտ փոխանցման տուփի առաջնային լիսեռին:',
          ru: 'Подает крутящий момент на первичный вал коробки передач.',
        },
      },
      {
        id: 'suspension',
        name: { en: 'Suspension and Running Gear', hy: 'Կախոց', ru: 'Подвеска' },
        relationship: {
          en: 'Accommodates half-shaft articulation through CV joints as wheels travel vertically.',
          hy: 'Ապահովում է անիվների ուղղաձիգ տեղաշարժը առանց կիսալիսեռների վնասման:',
          ru: 'Обеспечивает подвижность полуосей через ШРУСы при ходах подвески.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-trans-1',
        question: {
          en: 'What primary mechanical problem does an open differential solve when a vehicle turns a corner?',
          hy: 'Ի՞նչ հիմնական մեխանիկական խնդիր է լուծում դիֆերենցիալը շրջադարձերում:',
          ru: 'Какую основную механическую проблему решает дифференциал в повороте?',
        },
        options: [
          { text: { en: 'It keeps the vehicle engine running at constant RPM', hy: 'Պահպանում է շարժիչի հաստատուն պտույտները', ru: 'Поддерживает постоянные обороты мотора' }, isCorrect: false },
          { text: { en: 'It allows the outer drive wheel to spin faster than the inner wheel without tire scrubbing or axle windup', hy: 'Թույլ է տալիս արտաքին անիվին պտտվել ավելի արագ, քան ներքինը՝ կանխելով անվադողի սահքը', ru: 'Позволяет внешнему колесу вращаться быстрее внутреннего без проскальзывания шин' }, isCorrect: true },
          { text: { en: 'It prevents the transmission oil from overheating', hy: 'Կանխում է յուղի գերտաքացումը', ru: 'Предотвращает перегрев масла' }, isCorrect: false },
          { text: { en: 'It automatically activates the parking brake', hy: 'Միացնում է ձեռքի արգելակը', ru: 'Автоматически активирует ручной тормоз' }, isCorrect: false },
        ],
        explanation: {
          en: 'Because the outer wheel travels a longer perimeter arc than the inner wheel during a turn, the differential bevel gears allow independent axle rotation speeds.',
          hy: 'Շրջադարձի ժամանակ արտաքին անիվն անցնում է ավելի մեծ աղեղ, ուստի դիֆերենցիալը հնարավորություն է տալիս անիվներին պտտվել տարբեր արագությամբ:',
          ru: 'В повороте внешнее колесо проходит большую дистанцию, и дифференциал уравнивает тягу при разных скоростях вращения.',
        },
        difficulty: 'beginner',
      },
    ],
  },

  suspension: {
    id: 'suspension',
    name: {
      en: 'Suspension and Running Gear',
      hy: 'Կախոց և ընթացային մաս',
      ru: 'Подвеска и ходовая часть',
    },
    subtitle: {
      en: 'Dynamic isolation of road irregularities and preservation of tire contact patch',
      hy: 'Ճանապարհի անհարթությունների մեկուսացում և անվադողի շփման կայունացում',
      ru: 'Демпфирование неровностей дороги и стабилизация пятна контакта шин',
    },
    category: {
      en: 'Chassis',
      hy: 'Շասսի (Ընթացային մաս)',
      ru: 'Шасси',
    },
    iconName: 'Activity',
    introduction: {
      en: 'The suspension system isolates the chassis and passengers from dynamic road roughness, vibrations, and shock impacts, while keeping the four tire contact patches firmly pressed against the pavement for traction, braking, and lateral cornering stability. It controls vehicular pitch, roll, and heave.',
      hy: 'Կախոցը մեկուսացնում է թափքը և ուղևորներին ճանապարհի հարվածներից և տատանումներից՝ միաժամանակ ապահովելով անվադողերի մշտական կառչումը ճանապարհի մակերևույթին:',
      ru: 'Подвеска гасит удары и вибрации от дорожного полотна, сохраняя стабильный контакт шин с асфальтом при ускорении, торможении и маневрировании, контролируя крен и тангаж кузова.',
    },
    primaryPurpose: {
      en: 'Maximize tire contact area, ensure ride comfort, and maintain directional handling predictability.',
      hy: 'Առավելագույնի հասցնել անվադողի շփման մակերեսը և ապահովել կառավարելիությունն ու հարմարավետությունը:',
      ru: 'Обеспечение постоянного пятна контакта колеса с дорогой, плавности хода и точности управления.',
    },
    components: [
      {
        id: 'springs',
        name: { en: 'Coil / Air Springs', hy: 'Պտուտակաձև զսպանակներ կամ Պնևմաբարձիկներ', ru: 'Винтовые пружины или пневмобаллоны' },
        function: {
          en: 'Stores kinetic impact energy elastically through Hooke\'s law deflection when wheels encounter bumps.',
          hy: 'Կլանում է ճանապարհի հարվածի էներգիան՝ սեղմվելով ըստ Հուկի օրենքի:',
          ru: 'Накапливает и смягчает энергию ударов за счет упругой деформации по закону Гука.',
        },
      },
      {
        id: 'shock-absorber',
        name: { en: 'Hydraulic Shock Absorbers (Dampers)', hy: 'Հիդրավլիկ մեղմիչներ (Ամորտիզատորներ)', ru: 'Гидравлические телескопические амортизаторы' },
        function: {
          en: 'Dissipates stored spring oscillatory energy into heat by forcing hydraulic fluid through calibrated orifice valves (velocity-dependent damping).',
          hy: 'Մարում է զսպանակի տատանումները՝ յուղը մղելով փոքր անցքերով և մեխանիկական էներգիան վերածելով ջերմության:',
          ru: 'Гасит колебания пружин за счет дросселирования масла через клапаны, переводя кинетическую энергию в тепло.',
        },
      },
      {
        id: 'control-arms',
        name: { en: 'Control Arms & Ball Joints', hy: 'Լծակներ (ռիչագ) և Գնդային հոդակապեր (շառավոյ)', ru: 'Рычаги подвески и шаровые опоры' },
        function: {
          en: 'Constrains wheel knuckle kinematic motion along desired degrees of freedom while maintaining camber and toe angles.',
          hy: 'Ուղղորդում է անիվի շարժման երկրաչափությունը՝ պահպանելով անվակամարի (կամբեր) անկյունները:',
          ru: 'Задают траекторию перемещения ступицы относительно кузова, сохраняя углы схода и развала.',
        },
      },
      {
        id: 'anti-roll-bar',
        name: { en: 'Anti-Roll (Sway) Bar', hy: 'Լայնական կայունարար (ստաբիլիզատոր)', ru: 'Стабилизатор поперечной устойчивости' },
        function: {
          en: 'Torsion spring that resists vehicular body roll during cornering by transferring upward load from the compressed outer wheel to the inner wheel.',
          hy: 'Ոլորման առաձգական ձող, որը նվազեցնում է մեքենայի թեքումը (կռեն) շրջադարձերում:',
          ru: 'Торсионная штанга, уменьшающая крен кузова в повороте за счет переноса нагрузки на противоположный борт.',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Bump Impact & Compression (Jounce)', hy: 'Հարված անհարթությանը և Սեղմում', ru: 'Наезд на неровность и сжатие (Ход сжатия)' },
        description: {
          en: 'As the tire hits a road crest, the wheel moves upward. The spring compresses, absorbing the shock force while the damper valving generates controlled compression damping.',
          hy: 'Անիվը բարձրանում է վերև. զսպանակը սեղմվում է՝ կլանելով հարվածը, իսկ մեղմիչը վերահսկում է սեղմման արագությունը:',
          ru: 'Колесо поднимается, пружина сжимается, поглощая энергию, а клапаны амортизатора ограничивают скорость сжатия.',
        },
      },
      {
        step: 2,
        title: { en: 'Rebound & Oscillation Decay', hy: 'Ետադարձ շարժում (Rebound)', ru: 'Ход отбоя и гашение колебаний' },
        description: {
          en: 'The stored energy in the compressed spring pushes the wheel back down. Rebound valving in the shock absorber provides higher hydraulic resistance, preventing the car from bouncing repeatedly.',
          hy: 'Զսպանակը բացվում է: Մեղմիչի ետադարձ փականները դանդաղեցնում են բացվելը՝ կանխելով մեքենայի երկարատև ճոճվելը:',
          ru: 'Пружина распрямляется. Клапаны отбоя создают повышенное гидравлическое сопротивление, предотвращая раскачку кузова.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Spring vs. Damper Distinction', hy: 'Զսպանակի և Մեղմիչի տարբերությունը', ru: 'Различие функций пружины и амортизатора' },
        explanation: {
          en: 'Springs support the static weight of the vehicle and store energy proportionally to displacement (F = -kx). Dampers do not support weight; they resist velocity (F = -c·v) and dissipate kinetic energy.',
          hy: 'Զսպանակը պահում է մեքենայի քաշը և կլանում է էներգիան (Հուկի օրենք): Մեղմիչը քաշ չի պահում. այն մարում է տատանումները (կախված արագությունից):',
          ru: 'Пружина держит вес кузова (F = -kx). Амортизатор гасит скорость перемещения штока (F = -c·v), превращая механическую энергию в тепло.',
        },
        formula: 'F_damping = -c · (dx/dt)',
        relevance: {
          en: 'Without dampers, a car on springs would bounce uncontrollably like a pogo stick.',
          hy: 'Առանց մեղմիչների մեքենան անընդհատ կցատկոտեր՝ կորցնելով կառավարումը:',
          ru: 'Без амортизаторов автомобиль раскачивался бы бесконечно с потерей сцепления шин.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Excessive nose-dive during braking and multi-cycle bouncy ride', hy: 'Մեքենայի «քթի» կտրուկ իջեցում արգելակելիս և երկարատև ճոճում', ru: 'Сильный «клевок» носом при торможении и затяжная раскачка на волнах' },
        probableCause: { en: 'Blown shock absorber hydraulic seals with visible oil weeping down the damper strut body', hy: 'Մեղմիչի (ամորտիզատորի) յուղի արտահոսք և ներքին փականների մաշվածություն', ru: 'Утечка масла через сальник штока амортизатора и износ клапанного узла' },
        diagnosticAdvice: { en: 'Inspect shock body for fluid coating and perform suspension bounce recovery test (chassis must settle within 1.5 oscillations).', hy: 'Զննել մեղմիչի մակերեսը յուղի հետքերի համար և կատարել մեքենայի ճոճման թեստ:', ru: 'Визуальный осмотр стойки на подтеки масла и проверка на стенде (вибростенд shock-tester).' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Inspect suspension rubber-metal bushings and ball joint dust boots at every oil change; torn boots cause rapid grit contamination and joint separation.',
        hy: 'Յուրաքանչյուր յուղի փոխման ժամանակ ստուգել ռետինե սայլենտբլոկները և գնդային հոդակապերի պաշտպանիչ ռետինները:',
        ru: 'Проверка сайлентблоков и пыльников шаровых опор каждые 15 000 км предотвращает люфты и разрушение шарниров.',
      },
    ],
    safetyNotes: [
      {
        en: 'Spring Compressor Hazard: Never unbolt a MacPherson strut top hat without a calibrated, heavy-duty coil spring compressor. Compressed automotive springs store up to 10,000 Newtons of force; sudden release can cause fatal blunt force trauma.',
        hy: 'Զսպանակների վտանգ. Երբեք մի քանդեք կախոցի ամորտիզատորի վերին հենակը առանց հատուկ զսպանակ սեղմող գործիքի: Պահեստավորված էներգիան մահացու վտանգավոր է:',
        ru: 'Смертельная опасность: никогда не откручивайте верхнюю гайку стойки МакФерсон без специальной стяжки пружины.',
      },
    ],
    relatedSystems: [
      {
        id: 'brakes',
        name: { en: 'Braking System', hy: 'Արգելակներ', ru: 'Тормоза' },
        relationship: {
          en: 'Brake calipers mount directly onto suspension steering knuckles.',
          hy: 'Արգելակային չափիչները տեղադրվում են անմիջապես կախոցի բռունցքի վրա:',
          ru: 'Тормозные суппорты крепятся непосредственно к поворотным кулакам подвески.',
        },
      },
      {
        id: 'steering',
        name: { en: 'Steering System', hy: 'Ղեկային կառավարում', ru: 'Рулевое управление' },
        relationship: {
          en: 'Suspension geometry (caster, kingpin inclination) establishes steering self-centering torque.',
          hy: 'Կախոցի անկյունները (կաստեր) ապահովում են ղեկի ինքնակամ վերադարձը կենտրոնական դիրք:',
          ru: 'Геометрия подвески (кастер, угол наклона шкворня) создает самовозврат руля в «ноль».',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-susp-1',
        question: {
          en: 'What is the primary physical role of a hydraulic shock absorber (damper)?',
          hy: 'Ո՞րն է հիդրավլիկ մեղմիչի (ամորտիզատորի) առաջնային ֆիզիկական դերը:',
          ru: 'Какова главная физическая задача гидравлического амортизатора?',
        },
        options: [
          { text: { en: 'To support the static weight of the vehicle body', hy: 'Պահել մեքենայի թափքի քաշը', ru: 'Удерживать статический вес кузова' }, isCorrect: false },
          { text: { en: 'To dissipate oscillatory spring kinetic energy into thermal heat via hydraulic fluid restriction', hy: 'Մարել զսպանակի տատանումների էներգիան՝ հեղուկի դիմադրության շնորհիվ այն վերածելով ջերմության', ru: 'Гасить колебания пружин, преобразуя кинетическую энергию в теплоту дросселированием жидкости' }, isCorrect: true },
          { text: { en: 'To increase the top speed of the car on straight roads', hy: 'Մեծացնել մեքենայի առավելագույն արագությունը', ru: 'Увеличивать максимальную скорость автомобиля' }, isCorrect: false },
          { text: { en: 'To mechanically lock the steering wheel', hy: 'Կողպել ղեկանիվը', ru: 'Блокировать руль' }, isCorrect: false },
        ],
        explanation: {
          en: 'Dampers do not hold weight; they dissipate motion energy into heat through calibrated fluid valves, settling the car after bumps.',
          hy: 'Ամորտիզատորը քաշ չի պահում, այն հեղուկի միջոցով մարում է ցատկոտումները:',
          ru: 'Амортизатор гасит кинетическую энергию колебаний пружины, переводя ее в тепло за счет сопротивления перетеканию масла.',
        },
        difficulty: 'beginner',
      },
    ],
  },

  brakes: {
    id: 'brakes',
    name: {
      en: 'Braking System',
      hy: 'Արգելակային համակարգ',
      ru: 'Тормозная система',
    },
    subtitle: {
      en: 'Conversion of kinetic vehicle momentum into thermal energy and ABS slip control',
      hy: 'Կինետիկ էներգիայի վերածումը ջերմության և ABS-ով անիվների սահքի կառավարում',
      ru: 'Преобразование кинетической энергии в теплоту и контроль скольжения шин через ABS',
    },
    category: {
      en: 'Safety & Control',
      hy: 'Անվտանգություն և կառավարում',
      ru: 'Безопасность и контроль',
    },
    iconName: 'Disc',
    introduction: {
      en: 'The braking system is the supreme active safety system of any road vehicle. It relies on Pascal\'s principle of fluid dynamics to hydraulically amplify pedal force, clamping friction pads against rotating cast-iron or carbon-ceramic brake rotors. This converts vehicular kinetic energy into intense thermal energy. In EVs, regenerative motor braking recovers up to 70% of deceleration energy back into the battery.',
      hy: 'Արգելակային համակարգը ավտոմեքենայի ամենակարևոր ակտիվ անվտանգության հանգույցն է: Օգտագործելով Պասկալի օրենքը՝ հիդրավլիկ ճնշումը սեղմում է արգելակման կոճղակները պտտվող սկավառակներին՝ կինետիկ էներգիան վերածելով ջերմության: Էլեկտրամոբիլներում ռեգեներատիվ արգելակումը էներգիայի զգալի մասը վերադարձնում է մարտկոց:',
      ru: 'Тормозная система — ключевой узел активной безопасности. По закону Паскаля гидравлический привод передает усилие с педали на тормозные суппорты, сжимая колодки на дисках и рассеивая кинетическую энергию в виде тепла. В электромобилях рекуперация возвращает часть энергии в батарею.',
    },
    primaryPurpose: {
      en: 'Controlled deceleration, emergency stopping, and stationary immobilization (parking brake).',
      hy: 'Մեքենայի վերահսկելի դանդաղեցում, վթարային արգելակում և անշարժացում կայանման ժամանակ:',
      ru: 'Безопасное замедление, экстренная остановка и удержание автомобиля на уклоне.',
    },
    components: [
      {
        id: 'master-cylinder',
        name: { en: 'Tandem Master Cylinder & Vacuum Booster', hy: 'Գլխավոր արգելակային գլան և Վակուումային ուժեղացուցիչ', ru: 'Главный тормозной цилиндр с вакуумным усилителем' },
        function: {
          en: 'Multiplies foot pedal mechanical effort using engine vacuum or electric pump, generating 60–150 bar of hydraulic brake line pressure across dual split safety circuits.',
          hy: 'Բազմապատկում է վարորդի ոտքի սեղմման ուժը և առաջացնում մինչև 100-150 բար հիդրավլիկ ճնշում երկկոնտուր համակարգում:',
          ru: 'Многократно увеличивает усилие нажатия на педаль и создает давление 60–150 бар в двух независимых контурах.',
        },
      },
      {
        id: 'brake-caliper',
        name: { en: 'Hydraulic Caliper & Friction Pads', hy: 'Արգելակային չափիչ (սուպորտ) և Կոճղակներ', ru: 'Тормозной суппорт и фрикционные колодки' },
        function: {
          en: 'Contains hydraulic pistons that force composite ceramic/metallic friction pads tightly against the rotor surface.',
          hy: 'Հիդրավլիկ մխոցներով սեղմում է կոճղակները պտտվող սկավառակին:',
          ru: 'Гидравлические поршни прижимают колодки к плоскости диска с усилием в несколько тонн.',
        },
      },
      {
        id: 'brake-rotor',
        name: { en: 'Vented Brake Rotors (Discs)', hy: 'Օդափոխվող արգելակային սկավառակներ', ru: 'Вентилируемые тормозные диски' },
        function: {
          en: 'Grey cast iron or carbon-ceramic spinning disc featuring directional internal cooling vanes to evacuate intense friction heat (300–800°C).',
          hy: 'Թուջե պտտվող սկավառակներ՝ ներքին օդափոխման անցուղիներով՝ շփման ջերմությունը (300-800°C) արագ հեռացնելու համար:',
          ru: 'Вращающийся диск с внутренними вентиляционными каналами для рассеивания тепловой энергии.',
        },
      },
      {
        id: 'abs-modulator',
        name: { en: 'ABS / ESC Electro-Hydraulic Modulator', hy: 'ABS / ESC հիդրոմոդուլյատոր', ru: 'Электрогидравлический блок ABS / ESC' },
        function: {
          en: 'Microprocessor-controlled solenoid valves and return pump that modulate hydraulic fluid pressure up to 20 times per second to prevent wheel lockup.',
          hy: 'Էլեկտրամագնիսական փականներ, որոնք վայրկյանում մինչև 20 անգամ թուլացնում և ավելացնում են ճնշումը՝ անիվի սահքը (բլոկավորումը) կանխելու համար:',
          ru: 'Высокочастотные электромагнитные клапаны, импульсно сбрасывающие и нагнетающие давление для исключения блокировки колес.',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Pedal Input & Booster Multiplication', hy: 'Ոտնակի սեղմում և Ուժեղացուցիչ', ru: 'Нажатие на педаль и усиление' },
        description: {
          en: 'Driver applies ~200 N of force to brake pedal. Mechanical leverage and vacuum/hydraulic brake booster amplify this to ~1,500 N, displacing the master cylinder pistons.',
          hy: 'Վարորդը սեղմում է ոտնակը, ուժեղացուցիչը բազմապատկում է ուժը՝ գլխավոր գլանում ստեղծելով բարձր հիդրավլիկ ճնշում:',
          ru: 'Водитель нажимает педаль, усилитель многократно повышает усилие на штоке главного тормозного цилиндра.',
        },
      },
      {
        step: 2,
        title: { en: 'Hydraulic Pressure Transfer (Pascal\'s Law)', hy: 'Ճնշման հաղորդում (Պասկալի օրենք)', ru: 'Гидравлическое давление (Закон Паскаля)' },
        description: {
          en: 'Brake fluid (DOT 4 / DOT 5.1 glycol ether) transfers pressure instantaneously across rigid steel lines and flexible rubber hoses into caliper pistons without volume compression.',
          hy: 'Արգելակային հեղուկը խողովակներով անմիջապես հաղորդում է ճնշումը բոլոր չորս անիվների սուպորտներին:',
          ru: 'Несжимаемая тормозная жидкость передает давление ко всем колесным суппортам одновременно.',
        },
      },
      {
        step: 3,
        title: { en: 'Frictional Clamping & Deceleration', hy: 'Շփում և Դանդաղեցում', ru: 'Трение и торможение' },
        description: {
          en: 'Caliper pistons push pads against the rotor. Kinetic energy (E_k = 0.5·m·v^2) transforms into surface thermal energy, slowing wheel angular velocity.',
          hy: 'Կոճղակները սեղմվում են սկավառակին. կինետիկ էներգիան վերածվում է ջերմության, և մեքենան արգելակում է:',
          ru: 'Колодки зажимают ротор, преобразуя кинетическую энергию движения в тепло и снижая скорость вращения колес.',
        },
      },
      {
        step: 4,
        title: { en: 'ABS Slip Prevention Cycle', hy: 'ABS-ի գործարկում (Անիվի արգելափակման կանխում)', ru: 'Срабатывание ABS (Антиблокировка)' },
        description: {
          en: 'If wheel speed sensors detect deceleration approaching 100% slip (lockup), the ABS ECU fires solenoid valves to hold, dump, and reapply hydraulic pressure 15–20 times per second, preserving steering capability.',
          hy: 'Եթե անիվը պատրաստվում է արգելափակվել (սահել), ABS-ը վայրկյանում 15-20 անգամ նվազեցնում և ավելացնում է ճնշումը՝ պահպանելով ղեկավարելիությունը:',
          ru: 'При угрозе блокировки колеса клапаны ABS циклически сбрасывают и восстанавливают давление, сохраняя курсовую управляемость.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Kinetic Energy Dissipation', hy: 'Կինետիկ էներգիայի ցրում', ru: 'Рассеивание кинетической энергии' },
        explanation: {
          en: 'Kinetic energy scales quadratically with velocity (v^2). Stopping a car from 100 km/h requires dissipating FOUR times more energy than stopping from 50 km/h.',
          hy: 'Կինետիկ էներգիան կախված է արագության քառակուսուց: 100 կմ/ժ արագությամբ մեքենան կանգնեցնելու համար պահանջվում է 4 անգամ ավելի շատ էներգիա, քան 50 կմ/ժ-ից:',
          ru: 'Энергия торможения зависит от квадрата скорости. Остановка со 100 км/ч требует поглотить в 4 раза больше энергии, чем с 50 км/ч.',
        },
        formula: 'E_k = 0.5 · m · v^2',
        relevance: {
          en: 'Explains high-speed brake fade when thermal capacity of rotors is exceeded.',
          hy: 'Բացատրում է, թե ինչու են արգելակները գերտաքանում մեծ արագություններից կտրուկ արգելակելիս:',
          ru: 'Объясняет явление перегрева и отказа тормозов (fade) при агрессивном замедлении.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Spongy, soft brake pedal that travels all the way to the floorboard', hy: 'Արգելակի ոտնակը դարձել է փափուկ («սպունգանման») և իջնում է մինչև հատակ', ru: 'Провалы и «ватная» педаль тормоза, уходящая в пол' },
        probableCause: { en: 'Air bubbles in hydraulic brake lines or boiling brake fluid containing excessive absorbed moisture (vapor lock)', hy: 'Օդ արգելակային համակարգում կամ խոնավությունից հեղուկի եռման կետի իջեցում (գոլորշային խցանում)', ru: 'Попадание воздуха в контур или закипание старой гигроскопичной тормозной жидкости (паровая пробка)' },
        diagnosticAdvice: { en: 'Immediately perform pressure brake bleeding and test brake fluid moisture content with boiling-point refractometer.', hy: 'Անհապաղ կատարել համակարգի օդահանում (прокачка) և փոխել արգելակային հեղուկը:', ru: 'Немедленная прокачка гидравлического контура и замена тормозной жидкости с проверкой тестером влаги.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Brake fluid is hygroscopic (absorbs atmospheric moisture through flexible rubber hoses). Replace glycol brake fluid every 2 years or 30,000 miles to prevent internal caliper corrosion and vapor lock.',
        hy: 'Արգելակային հեղուկը ներծծում է խոնավություն: Անհրաժեշտ է այն փոխարինել առնվազն 2 տարին մեկ անգամ:',
        ru: 'Тормозная жидкость гигроскопична: регулярная замена каждые 2 года предотвращает коррозию поршней и закипание.',
      },
    ],
    safetyNotes: [
      {
        en: 'CRITICAL SAFETY NOTICE: Braking systems are life-critical. Any brake repair, hydraulic line replacement, or caliper rebuild must strictly follow OEM specifications and be road-tested safely by certified mechanics.',
        hy: 'ԿԵՆՍԱԿԱՆ ԱՆՎՏԱՆԳՈՒԹՅԱՆ ԶԳՈՒՇԱՑՈՒՄ. Արգելակները կյանքի անվտանգության համակարգ են: Ցանկացած նորոգում պետք է կատարվի միայն սերտիֆիկացված մասնագետների կողմից:',
        ru: 'КРИТИЧЕСКИ ВАЖНО: Тормозная система отвечает за безопасность жизни. Любые работы должны проводиться строго по сервисному мануалу квалифицированными механиками.',
      },
    ],
    relatedSystems: [
      {
        id: 'suspension',
        name: { en: 'Suspension and Running Gear', hy: 'Կախոց', ru: 'Подвеска' },
        relationship: {
          en: 'Braking causes dynamic longitudinal weight transfer onto front suspension struts.',
          hy: 'Արգելակման պահին մեքենայի քաշի մեծ մասը տեղափոխվում է առջևի կախոցի վրա:',
          ru: 'При торможении происходит динамический перенос веса на переднюю ось.',
        },
      },
      {
        id: 'electrical',
        name: { en: 'Electrical and Electronic Systems', hy: 'Էլեկտրոնիկա', ru: 'Электроника' },
        relationship: {
          en: 'Wheel speed sensors feed high-frequency pulse trains into the ABS/ESC control module.',
          hy: 'Անիվների արագության սենսորները ազդանշաններ են ուղարկում ABS/ESC կառավարման բլոկին:',
          ru: 'Датчики скорости вращения колес передают данные в блок управления ABS/ESP.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-brake-1',
        question: {
          en: 'How does Anti-lock Braking System (ABS) preserve the driver\'s ability to steer the vehicle during emergency maximum braking?',
          hy: 'Ինչպե՞ս է ABS-ը պահպանում մեքենայի ղեկավարելիությունը վթարային կտրուկ արգելակման ժամանակ:',
          ru: 'Каким образом ABS сохраняет управляемость автомобиля при экстренном торможении в пол?',
        },
        options: [
          { text: { en: 'By increasing engine RPM to drive the front wheels forward', hy: 'Շարժիչի պտույտները բարձրացնելով', ru: 'Повышая обороты двигателя' }, isCorrect: false },
          { text: { en: 'By rapidly modulating hydraulic caliper pressure to prevent wheels from locking, keeping tires within optimal rolling slip zones', hy: 'Արգելակային ճնշումը արագորեն թուլացնելով և ավելացնելով, ինչը կանխում է անիվների սահքը (բլոկավորումը)', ru: 'Импульсно сбрасывая давление в суппортах, не давая колесам заблокироваться и сорваться в юз' }, isCorrect: true },
          { text: { en: 'By automatically shifting the transmission into neutral', hy: 'Փոխանցման տուփը չեզոք (N) դիրքի բերելով', ru: 'Переключая передачу в нейтраль' }, isCorrect: false },
          { text: { en: 'By spraying water onto the brake rotors to cool them down', hy: 'Սկավառակների վրա ջուր ցողելով', ru: 'Охлаждая диски водой' }, isCorrect: false },
        ],
        explanation: {
          en: 'A locked sliding tire has zero lateral grip and cannot steer. ABS prevents lockup, allowing the tires to generate lateral cornering forces while braking.',
          hy: 'Արգելափակված սահող անիվը զուրկ է կողային կառչումից և չի կարող մեքենան շրջել: ABS-ը կանխում է արգելափակումը:',
          ru: 'Заблокированное скользящее колесо теряет боковое сцепление. Предотвращая юз, ABS позволяет объезжать препятствия.',
        },
        difficulty: 'beginner',
      },
    ],
  },

  steering: {
    id: 'steering',
    name: {
      en: 'Steering System',
      hy: 'Ղեկային կառավարում',
      ru: 'Рулевое управление',
    },
    subtitle: {
      en: 'Translating steering handwheel input into articulated knuckle deflection with Ackermann geometry',
      hy: 'Ղեկանիվի պտույտի փոխակերպումը անիվների շրջադարձային անկյան՝ ըստ Ակերմանի երկրաչափության',
      ru: 'Преобразование угла поворота руля в угол поворота управляемых колес с учетом геометрии Аккермана',
    },
    category: {
      en: 'Safety & Control',
      hy: 'Անվտանգություն և կառավարում',
      ru: 'Безопасность и контроль',
    },
    iconName: 'Compass',
    introduction: {
      en: 'The steering system provides directional command over the path of the vehicle. Through a rack-and-pinion gear mechanism and steering column linkage, rotary handwheel input is translated into precise transverse linear motion. Electric Power Assisted Steering (EPAS) adds computer-controlled brushless motor torque assist.',
      hy: 'Ղեկային համակարգը ապահովում է ավտոմեքենայի շարժման ուղղության ճշգրիտ կառավարումը: Ատամնաձողային (ռեյկա) մեխանիզմի միջոցով ղեկանիվի պտույտը վերածվում է անիվների համաչափ շրջման:',
      ru: 'Рулевое управление задает траекторию движения автомобиля. Зубчатый реечный механизм преобразует вращение рулевого колеса в поперечное перемещение тяг. Электроусилитель (ЭУР) дозирует вспомогательный момент в зависимости от скорости.',
    },
    primaryPurpose: {
      en: 'Accurate directional heading control, road tactile feedback, and automatic dynamic self-centering.',
      hy: 'Շարժման ուղղության ճշգրիտ վերահսկողություն և ղեկի ինքնակամ վերադարձ ուղիղ դիրքի:',
      ru: 'Точное следование заданной траектории, информативная обратная связь и самовозврат руля в нейтраль.',
    },
    components: [
      {
        id: 'rack-and-pinion',
        name: { en: 'Rack and Pinion Gear Housing', hy: 'Ատամնաձողային մեխանիզմ (ղեկային ռեյկա)', ru: 'Рулевая рейка и шестерня' },
        function: {
          en: 'Helical pinion gear rotates against a transverse toothed gear rack, converting rotational steering wheel degrees into lateral linear millimeters.',
          hy: 'Ղեկանիվի պտույտի անկյունային շարժումը վերածում է գծային տեղաշարժի՝ հրելով կամ ձգելով անիվները:',
          ru: 'Шестерня вала входит в зацепление с зубчатой рейкой, преобразуя вращение в линейное смещение тяг.',
        },
      },
      {
        id: 'tie-rods',
        name: { en: 'Inner & Outer Tie Rods', hy: 'Ղեկային ձողեր և ծայրակալներ (տյագա, նակոնեչնիկ)', ru: 'Рулевые тяги и наконечники' },
        function: {
          en: 'Adjustable threaded linkages equipped with ball joints that transmit rack motion to the steering knuckle arms while adjusting front toe alignment.',
          hy: 'Փոխանցում են ատամնաձողի շարժումը շրջադարձային բռունցքներին և թույլ տալիս կարգավորել անվազուգամիտությունը (սխոդ-ռազվալ):',
          ru: 'Передают усилие от рейки на поворотные кулаки и служат для точной регулировки схождения колес.',
        },
      },
      {
        id: 'epas-motor',
        name: { en: 'Electric Power Steering Assist Motor (EPAS)', hy: 'Էլեկտրական ուժեղացուցիչի շարժիչ (ԷՈՒՂ)', ru: 'Электроусилитель рулевого управления (ЭУР)' },
        function: {
          en: 'ECU-driven brushless DC torque motor mounted on column or rack that applies assist torque inversely proportional to road speed.',
          hy: 'Էլեկտրաշարժիչ, որը թեթևացնում է ղեկի պտույտը կանգնած տեղում և ծանրացնում այն մեծ արագություններում:',
          ru: 'Бесщеточный электромотор, прикладывающий вспомогательный момент (максимальный на парковке, минимальный на трассе).',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Driver Rotary Input', hy: 'Ղեկանիվի պտույտ', ru: 'Поворот рулевого колеса' },
        description: {
          en: 'Driver applies torque to handwheel. The steering column collapses safely in impacts via universal joints while transmitting angle to the pinion.',
          hy: 'Վարորդը պտտում է ղեկանիվը. շարժումը լիսեռով փոխանցվում է ատամնանիվին:',
          ru: 'Вращение через травмобезопасную телескопическую колонку передается на шестерню рейки.',
        },
      },
      {
        step: 2,
        title: { en: 'Rack Translation & Knuckle Deflection', hy: 'Ատամնաձողի տեղաշարժ', ru: 'Перемещение рейки и поворот кулака' },
        description: {
          en: 'The pinion translates the rack left or right. Tie rods push one wheel outward while pulling the opposite wheel inward around its kingpin axis.',
          hy: 'Ատամնանիվը ձողը տեղաշարժում է աջ կամ ձախ. կապող ձողերը պտտում են անիվների բռունցքները:',
          ru: 'Рейка смещается вбок, увлекая за собой тяги и поворачивая ступицы колес.',
        },
      },
      {
        step: 3,
        title: { en: 'Ackermann Steering Geometry Execution', hy: 'Ակերմանի երկրաչափության իրականացում', ru: 'Реализация принципа Аккермана' },
        description: {
          en: 'Because turning steering knuckle arms angle inward toward the rear axle center, the INSIDE wheel turns through a sharper angle than the outside wheel, preventing scrub.',
          hy: 'Ակերմանի երկրաչափության շնորհիվ շրջադարձի ՆԵՐՍԻ անիվը շրջվում է ավելի մեծ անկյունով, քան ԴՐՍԻ անիվը:',
          ru: 'Внутреннее колесо поворачивается на больший угол, чем наружное, чтобы траектории описывали концентрические окружности.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Ackermann Steering Principle', hy: 'Ակերմանի երկրաչափության սկզբունքը', ru: 'Принцип геометрии рулевой трапеции Аккермана' },
        explanation: {
          en: 'When negotiating a curve, all four wheel rotation axes must intersect at a single shared instantaneous center of curvature. The inner wheel must turn at an angle theta_i greater than outer wheel angle theta_o.',
          hy: 'Շրջադարձի ժամանակ բոլոր չորս անիվների պտտման առանցքները պետք է հատվեն մեկ ընդհանուր կետում: Ուստի ներքին անիվը պետք է շրջվի ավելի շատ:',
          ru: 'Оси всех колес должны пересекаться в одной точке (центре поворота), поэтому угол поворота внутреннего колеса больше внешнего.',
        },
        formula: 'cot(θ_o) - cot(θ_i) = w / L',
        relevance: {
          en: 'Prevents destructive lateral tire scrubbing and tire squeal during low-speed parking turns.',
          hy: 'Կանխում է անվադողերի սահքը և մաշվածությունը ոլորաններում:',
          ru: 'Исключает поперечный снос и боковое проскальзывание шин в медленных крутых поворотах.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Significant steering free-play and clunking noise when wiggling steering wheel while parked', hy: 'Ղեկի ազատ ընթացք (լյուֆտ) և թակոցներ տեղում ղեկը շարժելիս', ru: 'Люфт рулевого колеса и стуки при покачивании на месте' },
        probableCause: { en: 'Worn tie rod ends, loose rack guide bushing, or degraded intermediate shaft universal joint', hy: 'Ղեկային ծայրակալների մաշվածություն կամ ռեյկայի ներքին վտուլկաների լյուֆտ', ru: 'Износ шаровых пальцев рулевых наконечников или втулки рулевой рейки' },
        diagnosticAdvice: { en: 'Place vehicle on lift, mechanically shake front wheels at 9 and 3 o\'clock positions, inspect boots for grease tears.', hy: 'Բարձրացնել մեքենան և ստուգել անիվների կողային լյուֆտը:', ru: 'Проверка люфтов в шарнирах тяг на подъемнике и проверка целостности пыльников рейки.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Perform precision 4-wheel laser alignment (toe, camber, caster) annually or after hitting deep potholes or curbing to prevent uneven tire shoulder wear.',
        hy: 'Տարին մեկ կամ անհարթություններին հարվածելուց հետո կատարել անիվների լազերային կարգավորում (սխոդ-ռազվալ):',
        ru: 'Проверка углов установки колес (сход-развал) раз в год или при уводе машины в сторону.',
      },
    ],
    safetyNotes: [
      {
        en: 'Never ignore steering looseness or excessive resistance; tie rod separation results in instantaneous loss of directional control and immediate wheel flop.',
        hy: 'Երբեք մի անտեսեք ղեկի լյուֆտը կամ դժվարությամբ պտտվելը. ղեկային ձողի անջատումը հանգեցնում է կառավարման ակնթարթային կորստի:',
        ru: 'Обрыв рулевого наконечника приводит к мгновенной потере управляемости на любой скорости.',
      },
    ],
    relatedSystems: [
      {
        id: 'suspension',
        name: { en: 'Suspension and Running Gear', hy: 'Կախոց', ru: 'Подвеска' },
        relationship: {
          en: 'Tie rods connect directly to suspension knuckle steering arms.',
          hy: 'Ղեկային ձողերը միանում են կախոցի շրջադարձային բռունցքներին:',
          ru: 'Тяги шарнирно соединены с поворотными кулаками подвески.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-steer-1',
        question: {
          en: 'Under the Ackermann steering principle, how do the turn angles of the front wheels compare during a left corner?',
          hy: 'Ըստ Ակերմանի սկզբունքի, ինչպե՞ս են տարբերվում անիվների շրջման անկյունները դեպի ձախ շրջադարձի ժամանակ:',
          ru: 'Согласно принципу Аккермана, как соотносятся углы поворота колес в левом повороте?',
        },
        options: [
          { text: { en: 'Both wheels turn at identical angles', hy: 'Երկու անիվները շրջվում են միևնույն անկյունով', ru: 'Оба колеса поворачиваются на одинаковый угол' }, isCorrect: false },
          { text: { en: 'The inside (left) wheel turns at a tighter/larger angle than the outside (right) wheel', hy: 'Ներսի (ձախ) անիվը շրջվում է ավելի մեծ անկյունով, քան դրսի (աջ) անիվը', ru: 'Внутреннее (левое) колесо поворачивается на больший угол, чем внешнее (правое)' }, isCorrect: true },
          { text: { en: 'The outside wheel turns at a larger angle', hy: 'Դրսի անիվն է ավելի շատ շրջվում', ru: 'Внешнее колесо поворачивается круче' }, isCorrect: false },
          { text: { en: 'The rear wheels turn in the opposite direction', hy: 'Հետևի անիվները պտտվում են հակառակ ուղղությամբ', ru: 'Задние колеса поворачиваются в противофазе' }, isCorrect: false },
        ],
        explanation: {
          en: 'Because the inner wheel traces a tighter circular radius, it must steer to a sharper angle so that its wheel spindle axis meets the outer wheel spindle at the turn center point.',
          hy: 'Քանի որ ներսի անիվը շրջվում է ավելի փոքր շառավղով, այն պետք է թեքվի ավելի մեծ անկյունով:',
          ru: 'Внутреннее колесо описывает окружность меньшего радиуса, поэтому угол его поворота всегда острее.',
        },
        difficulty: 'beginner',
      },
    ],
  },

  electrical: {
    id: 'electrical',
    name: {
      en: 'Electrical and Electronic Systems',
      hy: 'Էլեկտրական և էլեկտրոնային համակարգեր',
      ru: 'Электрические и электронные системы',
    },
    subtitle: {
      en: 'Power distribution, high-voltage battery architecture, CAN-bus communications, and ECU closed loops',
      hy: 'Էներգիայի բաշխում, բարձրավոլտ մարտկոցներ, CAN ցանց և ԷԿՈՒ-ի կառավարման շղթաներ',
      ru: 'Бортовая сеть, высоковольтные батареи, шина CAN и контуры управления ЭБУ',
    },
    category: {
      en: 'Electronics',
      hy: 'Էլեկտրոնիկա',
      ru: 'Электроника',
    },
    iconName: 'Zap',
    introduction: {
      en: 'Modern automobiles are sophisticated networked computers on wheels. Low-voltage 12V/48V circuits power lighting, infotainment, and microcontrollers, while electric vehicles employ 400V–800V high-voltage lithium-ion traction systems. Dozens of Electronic Control Units (ECUs) communicate over high-speed Controller Area Network (CAN-bus) serial protocols to execute real-time closed-loop sensor-actuator commands.',
      hy: 'Ժամանակակից ավտոմեքենաները իրական շարժական համակարգիչներ են: 12V/48V ցածրավոլտ ցանցը սնուցում է սենսորները և լուսավորությունը, իսկ էլեկտրամոբիլներում 400V-800V բարձրավոլտ մարտկոցները սնուցում են քարշային շարժիչները: Էլեկտրոնային կառավարման բլոկները (ԷԿՈՒ) միացված են CAN ցանցով:',
      ru: 'Современный автомобиль содержит десятки микропроцессорных блоков управления (ЭБУ), объединенных цифровой шиной CAN. Низковольтная сеть 12В/48В питает бортовые системы, а в электромобилях высоковольтная батарея 400–800В отдает энергию инверторам тяговых моторов.',
    },
    primaryPurpose: {
      en: 'Store, convert, and distribute electrical power, sense physical vehicle states, and coordinate safety and propulsion systems.',
      hy: 'Կուտակել և բաշխել էլեկտրաէներգիան, մշակել տվիչների տվյալները և համակարգել շարժիչի ու անվտանգության աշխատանքը:',
      ru: 'Выработка и распределение электроэнергии, опрос сотен датчиков и синхронное управление агрегатами.',
    },
    components: [
      {
        id: 'batteries',
        name: { en: '12V SLI / High-Voltage Traction Battery Pack', hy: '12V կուտակիչ / Բարձրավոլտ քարշային մարտկոց', ru: 'АКБ 12В / Высоковольтная тяговая батарея' },
        function: {
          en: '12V AGM battery powers baseline electronics and starter coils; EV lithium-ion pack (NMC/LFP, 400V–800V) stores bulk kilowatt-hours with liquid thermal conditioning.',
          hy: '12V մարտկոցը ապահովում է ստարտերը և էլեկտրոնիկան, իսկ էլեկտրամոբիլի լիթիում-իոնային բարձրավոլտ մարտկոցը պահպանում է հիմնական էներգիան:',
          ru: 'Свинцово-кислотная/AGM батарея 12В питает блоки ЭБУ, а литий-ионная батарея EV запасает энергию движения.',
        },
      },
      {
        id: 'inverter',
        name: { en: 'Traction Inverter (EV / Hybrid)', hy: 'Ուժային ինվերտոր (Էլեկտրամոբիլ / Հիբրիդ)', ru: 'Тяговый инвертор (EV)' },
        function: {
          en: 'Silicon Carbide (SiC) MOSFET semiconductors that invert DC battery voltage into variable-frequency 3-phase sinusoidal AC to drive traction motors.',
          hy: 'Փոխակերպում է մարտկոցի հաստատուն հոսանքը (DC) եռաֆազ փոփոխական հոսանքի (AC) շարժիչը պտտելու համար:',
          ru: 'Преобразует постоянный ток батареи (DC) в переменный трехфазный ток (AC) регулируемой частоты.',
        },
      },
      {
        id: 'ecu-network',
        name: { en: 'Engine / Vehicle Control Unit (ECU/VCU)', hy: 'Շարժիչի/Ավտոմեքենայի կառավարման բլոկ (ԷԿՈՒ)', ru: 'Электронный блок управления (ЭБУ / ECU)' },
        function: {
          en: 'Central embedded microcontroller running real-time operating systems, executing millions of calculations per second.',
          hy: 'Համակարգչային միկրոկոնտրոլեր, որը վայրկյանում կատարում է միլիոնավոր հաշվարկներ՝ ղեկավարելով բոլոր ագրեգատները:',
          ru: 'Микропроцессорный контроллер, вычисляющий в реальном времени миллисекундные параметры впрыска и зажигания.',
        },
      },
      {
        id: 'can-bus',
        name: { en: 'Controller Area Network (CAN-Bus)', hy: 'CAN ցանց (տվյալների փոխանցման ավտոմոբիլային շինա)', ru: 'Цифровая шина CAN (CAN-bus)' },
        function: {
          en: 'Robust differential two-wire (CAN-High & CAN-Low, 500 kbps to 5 Mbps CAN-FD) serial broadcast bus immune to electrical electromagnetic interference.',
          hy: 'Երկլարային թվային շինա, որով բոլոր բլոկները տեղեկատվություն են փոխանակում բարձր արագությամբ և հուսալիությամբ:',
          ru: 'Помехозащищенная витая пара для скоростного обмена цифровыми пакетами данных между всеми блоками.',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Ignition / Power-On Interlock', hy: 'Գործարկման նախապատրաստում', ru: 'Включение зажигания и опрос систем' },
        description: {
          en: 'Key transponder/smart fob validates immobilizer cryptography. Main relays close, waking body control modules and powering up fuel pump priming.',
          hy: 'Բանալու իմոբիլայզերը հաստատում է անվտանգությունը: Ռելեները միացնում են էլեկտրոնիկան և վառելիքի պոմպը:',
          ru: 'Иммобилайзер проверяет чип-ключ, главные реле подают питание на ЭБУ и бензонасос для создания рабочего давления.',
        },
      },
      {
        step: 2,
        title: { en: 'Starter Motor Engagement / EV Contactor Closure', hy: 'Ստարտերի գործարկում / Կոնտակտորների միացում', ru: 'Запуск стартера / Замыкание контакторов EV' },
        description: {
          en: 'In ICE: starter solenoid pushes pinion gear into flywheel ring gear, spinning the crankshaft to ~250 RPM. In EV: pre-charge resistor and high-voltage DC contactors close safely.',
          hy: 'ՆԱՇ-ում ստարտերը պտտում է թափանիվը: Էլեկտրամոբիլում բարձրավոլտ կոնտակտորները միացնում են քարշային մարտկոցը:',
          ru: 'В ДВС стартер раскручивает коленвал. В электромобиле замыкаются защитные контакторы высоковольтной батареи.',
        },
      },
      {
        step: 3,
        title: { en: 'Closed-Loop Control Execution', hy: 'Փակ կառավարման շղթայի աշխատանք', ru: 'Замкнутый контур регулирования' },
        description: {
          en: 'Sensors feed data (MAF, O2, throttle) -> ECU runs control algorithms -> Actuators adjust fuel/sparks -> Feedback sensor re-checks condition 100 times/second.',
          hy: 'Սենսորները տվյալներ են տալիս ԷԿՈՒ-ին, որն ակնթարթորեն ուղղում է խառնուրդի կազմը և հաղորդում ակտուատորներին:',
          ru: 'Датчики кислорода и расхода воздуха передают показания, ЭБУ корректирует впрыск по замкнутому циклу обратной связи.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Closed-Loop Feedback Control (PID)', hy: 'Փակ կառավարման շղթա (Հետադարձ կապ)', ru: 'Замкнутый контур регулирования (PID-регулятор)' },
        explanation: {
          en: 'The ECU continuously compares the target setpoint (e.g. stoichiometric lambda = 1.00) with actual sensor feedback, dynamically adjusting output to minimize error.',
          hy: 'ԷԿՈՒ-ն անընդհատ համեմատում է պահանջվող ցուցանիշը փաստացիի հետ և վերացնում սխալանքը:',
          ru: 'ЭБУ непрерывно сопоставляет заданное значение с реальным и вносит мгновенные поправки.',
        },
        formula: 'e(t) = Setpoint - Process_Value',
        relevance: {
          en: 'Found in fuel trimming, electronic stability control, and adaptive cruise.',
          hy: 'Կիրառվում է վառելիքի ճշգրտման, ESC կայունացման և կրուիզ-կոնտրոլի մեջ:',
          ru: 'Основа работы систем впрыска, курсовой устойчивости и климат-контроля.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Engine will not crank (rapid rhythmic clicking noise under hood)', hy: 'Շարժիչը չի պտտվում (լսվում են արագ չխկոցներ)', ru: 'Стартер не крутит мотор, слышны частые сухие щелчки под капотом' },
        probableCause: { en: 'Depleted 12V lead-acid battery voltage (<10.5V under starter solenoid load)', hy: '12V մարտկոցի լիցքաթափում կամ հոսանքահաղորդիչ սեղմակների (կլեմա) օքսիդացում', ru: 'Разряжен аккумулятор 12В или окислились силовые клеммы (напряжение под нагрузкой падает ниже 10В)' },
        diagnosticAdvice: { en: 'Measure resting battery voltage (>12.6V is 100%) and perform 100A carbon-pile load test.', hy: 'Չափել մարտկոցի լարումը մուլտիմետրով (նորման 12.6V է):', ru: 'Замерить напряжение покоя вольтметром и проверить АКБ нагрузочной вилкой.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Clean corrosion bloom from 12V battery terminal posts with sodium bicarbonate solution and coat with dielectric silicone grease.',
        hy: 'Մաքրել մարտկոցի բևեռները օքսիդացումից և պատել պաշտպանիչ քսուքով:',
        ru: 'Очистка клемм аккумулятора от окислов и смазка защитной токопроводящей пастой.',
      },
    ],
    safetyNotes: [
      {
        en: 'HIGH VOLTAGE ARC FLASH HAZARD: Do not probe orange high-voltage harnesses on hybrid or EV vehicles. 400V/800V DC can cause severe electrical arc flash and fatal electrocution. Disconnect the manual service disconnect (MSD) using Class 0 insulated gloves before any adjacent work.',
        hy: 'ԲԱՐՁՐ ԼԱՐՄԱՆ ՎՏԱՆԳ. Երբեք մի փորձեք ստուգել կամ կտրել էլեկտրամոբիլների նարնջագույն լարերը: 400V-800V հաստատուն լարումը մահացու է: Աշխատանքները թույլատրվում են միայն սերտիֆիկացված անձնակազմին հատուկ պաշտպանիչ հանդերձանքով:',
        ru: 'СМЕРТЕЛЬНАЯ ОПАСНОСТЬ: Оранжевые кабели электромобилей находятся под напряжением 400–800В. Прикосновение вызывает мгновенный летальный исход. Работы разрешены только обученному персоналу в диэлектрических перчатках.',
      },
    ],
    relatedSystems: [
      {
        id: 'engine',
        name: { en: 'Engine and Powertrain', hy: 'Շարժիչ', ru: 'Двигатель' },
        relationship: {
          en: 'Generates electrical charging power through alternator or converts battery energy into wheel torque.',
          hy: 'Գեներատորի միջոցով արտադրում է էլեկտրաէներգիա կամ սնուցում էլեկտրաշարժիչը:',
          ru: 'Вырабатывает ток через генератор или потребляет энергию для электротяги.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-elec-1',
        question: {
          en: 'What is the primary function of the Controller Area Network (CAN-Bus) in modern vehicles?',
          hy: 'Ո՞րն է CAN-ցանցի հիմնական գործառույթը ժամանակակից ավտոմեքենաներում:',
          ru: 'Какова основная функция цифровой шины CAN в современном автомобиле?',
        },
        options: [
          { text: { en: 'To circulate cooling fluid through the engine radiator', hy: 'Շրջանառել հովացնող հեղուկը ռադիատորով', ru: 'Циркулировать охлаждающую жидкость' }, isCorrect: false },
          { text: { en: 'To allow multiple electronic control units (ECUs) to communicate reliably over a two-wire differential broadcast network without dedicated wiring for every signal', hy: 'Թույլ տալ բոլոր էլեկտրոնային բլոկներին տեղեկատվություն փոխանակել ընդամենը 2 լարի միջոցով՝ խնայելով հարյուրավոր մետրեր լարեր', ru: 'Обеспечивать надежный обмен цифровыми данными между десятками ЭБУ по двухпроводной витой паре без лишней проводки' }, isCorrect: true },
          { text: { en: 'To supply spark voltage directly to the spark plugs', hy: 'Բռնկման կայծ մատակարարել մոմիկներին', ru: 'Подавать искру на свечи' }, isCorrect: false },
          { text: { en: 'To lock the passenger doors when rain is detected', hy: 'Անձրևի ժամանակ դռները փակել', ru: 'Блокировать двери при дожде' }, isCorrect: false },
        ],
        explanation: {
          en: 'CAN-bus eliminates thousands of feet of copper wire by allowing ECUs to broadcast packets (engine RPM, wheel speed, steering angle) across a shared differential serial bus.',
          hy: 'CAN ցանցը թույլ է տալիս բոլոր բլոկներին արագ և առանց խանգարումների հաղորդակցվել ընդամենը երկու լարով:',
          ru: 'Шина CAN избавляет от километров проводов, позволяя всем модулям считывать единые пакеты данных о скорости, оборотах и датчиках.',
        },
        difficulty: 'beginner',
      },
    ],
  },

  body: {
    id: 'body',
    name: {
      en: 'Vehicle Body and Structure',
      hy: 'Թափք և կոնստրուկցիա',
      ru: 'Кузов и несущая конструкция',
    },
    subtitle: {
      en: 'Rigid passenger safety cells, progressive crumple deformation zones, and aerodynamic body shells',
      hy: 'Ուղևորների անվտանգության կոշտ պարկուճ, դեֆորմացիոն գոտիներ և աերոդինամիկ թափք',
      ru: 'Жесткая капсула безопасности, прогрессивные зоны запрограммированной деформации и аэродинамика',
    },
    category: {
      en: 'Structure & Safety',
      hy: 'Կառուցվածք և անվտանգություն',
      ru: 'Конструкция и безопасность',
    },
    iconName: 'Shield',
    introduction: {
      en: 'The vehicle body and chassis provide the foundational structural envelope that mounts all mechanical running gear while safeguarding human occupants during impacts. Modern passenger vehicles utilize unibody (monocoque) architectures stamped from tailored blanks of high-strength and ultra-high-strength boron steels, engineered with progressive crumple zones that absorb kinetic collision energy before it enters the rigid passenger safety cell.',
      hy: 'Ավտոմեքենայի թափքը կրող հիմքն է, որի վրա տեղադրվում են բոլոր ագրեգատները, և որը պաշտպանում է ուղևորներին վթարների ժամանակ: Ժամանակակից ավտոմեքենաներն օգտագործում են կրող թափք (մոնոկոկ)՝ պատրաստված բարձրամուր պողպատից և ծրագրավորված դեֆորմացիոն գոտիներով:',
      ru: 'Кузов является несущей пространственной структурой автомобиля. Современные легковые автомобили имеют несущий кузов (монокок), изготовленный из высокопрочных и бористых сталей, сочетающий жесткую капсулу салона и энергопоглощающие сминаемые зоны спереди и сзади.',
    },
    primaryPurpose: {
      en: 'Structural rigidity, crash-energy management to protect occupants, and aerodynamic efficiency.',
      hy: 'Կառուցվածքային կոշտություն, վթարի հարվածային էներգիայի կլանում և աերոդինամիկություն:',
      ru: 'Обеспечение пассивной безопасности при столкновениях, жесткость на кручение и низкое аэродинамическое сопротивление.',
    },
    components: [
      {
        id: 'safety-cell',
        name: { en: 'Passenger Safety Cell (Rigid Cage)', hy: 'Ուղևորների անվտանգության կոշտ պարկուճ', ru: 'Пассажирская капсула безопасности' },
        function: {
          en: 'Constructed from hot-stamped boron and ultra-high-strength steels (A/B/C pillars, roof rails, sill beams) that resist intrusion to preserve survival space during rollover and side collisions.',
          hy: 'Պատրաստված է գերամուր բոր պարունակող պողպատից (սյուներ, տանիքի կողեր, շեմեր), որը թույլ չի տալիս սալոնի ճզմումը վթարների ժամանակ:',
          ru: 'Каркас из горячештампованной бористой стали (стойки A, B, C, пороги), предотвращающий деформацию салона при опрокидывании и боковых ударах.',
        },
      },
      {
        id: 'crumple-zones',
        name: { en: 'Front & Rear Crumple Zones', hy: 'Առջևի և հետևի դեֆորմացիոն գոտիներ', ru: 'Зоны программируемой деформации' },
        function: {
          en: 'Accordion-folding longitudinal steel frame rails designed to progressively buckle, transforming crash kinetic energy into mechanical deformation work.',
          hy: 'Հատուկ ծալվող երկայնական լանժերոններ, որոնք հարվածի ժամանակ ծալվում են ակորդեոնի պես՝ կլանելով հարվածի հսկայական էներգիան:',
          ru: 'Продольные лонжероны со специальными насечками, сминающиеся «гармошкой» и гасящие ударную нагрузку до салона.',
        },
      },
      {
        id: 'body-panels',
        name: { en: 'Aerodynamic Outer Skin Panels', hy: 'Թափքի արտաքին աերոդինամիկ պանելներ', ru: 'Внешние аэродинамические панели кузова' },
        function: {
          en: 'Stamped aluminum or steel hoods, fenders, doors, and polymer undertrays engineered to minimize drag coefficient (Cd ~ 0.22–0.30).',
          hy: 'Դռներ, կապոտ, թևեր և հատակի պաշտպանիչներ, որոնք նվազեցնում են օդի դիմադրությունը (Cd 0.22-0.30):',
          ru: 'Штампованные элементы оперения и аэродинамические щитки днища, снижающие коэффициент лобового сопротивления (Cd).',
        },
      },
    ],
    operatingSequence: [
      {
        step: 1,
        title: { en: 'Frontal Impact Initiation (0–30 ms)', hy: 'Հարվածի սկիզբ (0-30 միլիվայրկյան)', ru: 'Начало фронтального удара (0–30 мс)' },
        description: {
          en: 'Front bumper beam makes contact. Crash sensors trigger airbag squibs and pyrotechnic seatbelt pretensioners. Front crumple rails begin accordion buckling.',
          hy: 'Առջևի բամպերը դիպչում է խոչընդոտին: Սենսորներն ակնթարթորեն գործարկում են անվտանգության բարձիկները և ամրագոտիների պիրոփամփուշտները:',
          ru: 'Бампер принимает удар, датчики замедления активируют пиропатроны преднатяжителей ремней и подушки безопасности.',
        },
      },
      {
        step: 2,
        title: { en: 'Peak Energy Absorption (30–70 ms)', hy: 'Էներգիայի առավելագույն կլանում (30-70 մվ)', ru: 'Пиковое поглощение энергии (30–70 мс)' },
        description: {
          en: 'Longitudinal frame rails buckle progressively. Kinetic energy is dissipated through plastic deformation work, preventing shock spikes entering the passenger compartment.',
          hy: 'Երկայնական հեծանները ծալվում են՝ կլանելով կինետիկ էներգիան: Ուղևորների սրահը մնում է անվնաս:',
          ru: 'Лонжероны пластически деформируются, поглощая мегаджоули энергии и замедляя кузов без смертельных перегрузок для пассажиров.',
        },
      },
      {
        step: 3,
        title: { en: 'Safety Cell Integrity Maintained (70–120 ms)', hy: 'Սալոնի անվնաս պահպանում (70-120 մվ)', ru: 'Сохранение жизненного пространства (70–120 мс)' },
        description: {
          en: 'The rigid boron safety cage maintains door aperture dimensions, ensuring passenger cabin survival space is preserved and doors can be opened post-crash.',
          hy: 'Կոշտ պարկուճը պահպանում է դռների բացվածքը, ինչը թույլ է տալիս դուրս գալ վթարից հետո:',
          ru: 'Высокопрочная клетка салона выдерживает остаточные нагрузки, сохраняя дверные проемы открываемыми для эвакуации.',
        },
      },
    ],
    engineeringConcepts: [
      {
        title: { en: 'Crumple Zones vs. Rigid Safety Cage', hy: 'Դեֆորմացիոն գոտիներ ընդդեմ Կոշտ պարկուճի', ru: 'Зоны сминания против жесткой клетки безопасности' },
        explanation: {
          en: 'Counterintuitively, a car that does NOT deform in a crash is dangerous because rigid deceleration would transfer fatal G-forces to human organs. Crumple zones extend the crash time delta (dt), drastically reducing peak impact force (F = m · dv / dt).',
          hy: 'Եթե մեքենան չդեֆորմացվեր, վթարի հարվածի ահռելի արագացումը մահացու կլիներ մարդու օրգանների համար: Դեֆորմացիոն գոտիները մեծացնում են կանգառի ժամանակը (dt)՝ նվազեցնելով հարվածի ուժը:',
          ru: 'Абсолютно жесткий кузов смертелен: мгновенная остановка убивает перегрузкой. Сминаемые зоны растягивают время торможения (dt), снижая пиковую силу удара F = m·(dv/dt).',
        },
        formula: 'F_impact = (m · Δv) / Δt',
        relevance: {
          en: 'The foundation of modern passive vehicle safety engineering.',
          hy: 'Ժամանակակից պասիվ անվտանգության ճարտարագիտության հիմնարար օրենքն է:',
          ru: 'Фундаментальный принцип проектирования пассивной безопасности автомобилей.',
        },
      },
    ],
    failureSymptoms: [
      {
        symptom: { en: 'Crab-walking or asymmetrical diagonal tire tracking after a collision repair', hy: 'Մեքենայի «խեցգետնանման» շարժում (անհամաչափություն) վթարի վերանորոգումից հետո', ru: 'Движение автомобиля «боком» (нарушение соосности колес) после кузовного ремонта' },
        probableCause: { en: 'Permanent unibody frame rail plastic twist or suspension subframe mounting point misalignment', hy: 'Թափքի երկրաչափության (գեոմետրիայի) խախտում վթարի հետևանքով', ru: 'Нарушение диагоналей и геометрии контрольных точек несущего кузова после аварии' },
        diagnosticAdvice: { en: 'Perform precision 3D electronic laser measuring bench inspection against factory coordinate blueprint tolerances.', hy: 'Ստուգել թափքի գեոմետրիան հատուկ 3D լազերային ստենդի վրա ըստ գործարանային չափսերի:', ru: 'Проверка контрольных точек днища на лазерном стапеле по заводским картам допусков.' },
      },
    ],
    maintenanceNotes: [
      {
        en: 'Inspect underbody protective coatings and drain plugs annually; clear road salt and debris accumulation to prevent electrolytic galvanic corrosion of unibody sills.',
        hy: 'Տարեկան ստուգել հատակի հակակոռոզիոն շերտը և մաքրել աղերը:',
        ru: 'Регулярная мойка днища и проверка антикоррозийного покрытия порогов и скрытых полостей.',
      },
    ],
    safetyNotes: [
      {
        en: 'EDUCATIONAL MODEL NOTICE: Visual animations of vehicle crumple zones are simplified conceptual models designed to illustrate kinetic energy dissipation. They do not simulate specific vehicle crash safety ratings.',
        hy: 'ՈՒՍՈՒՄՆԱԿԱՆ ԶԳՈՒՇԱՑՈՒՄ. Թափքի դեֆորմացիայի սիմուլյացիաները կրթական մոդելներ են և նախատեսված են էներգիայի կլանումը բացատրելու համար:',
        ru: 'ОБРАЗОВАТЕЛЬНОЕ УВЕДОМЛЕНИЕ: Анимации зон деформации носят концептуальный обучающий характер и не являются физическим расчетом краш-теста конкретного автомобиля.',
      },
    ],
    relatedSystems: [
      {
        id: 'suspension',
        name: { en: 'Suspension and Running Gear', hy: 'Կախոց', ru: 'Подвеска' },
        relationship: {
          en: 'Subframes bolt directly to the unibody structure to isolate road vibration.',
          hy: 'Կախոցի ենթաշրջանակները (պադռամնիկ) ամրանում են թափքին:',
          ru: 'Подрамники подвески крепятся через сайлентблоки к силовой структуре кузова.',
        },
      },
    ],
    quizQuestions: [
      {
        id: 'q-body-1',
        question: {
          en: 'Why are modern vehicle front ends designed to deliberately crumple and deform during a severe frontal collision?',
          hy: 'Ինչո՞ւ են ժամանակակից մեքենաների առջևի մասերը նախագծվում այնպես, որ վթարի ժամանակ միտումնավոր ծալվեն և դեֆորմացվեն:',
          ru: 'Почему передняя часть современного автомобиля проектируется так, чтобы намеренно сминаться при аварии?',
        },
        options: [
          { text: { en: 'To make the replacement parts cheaper to manufacture', hy: 'Որպեսզի պահեստամասերն ավելի էժան լինեն', ru: 'Чтобы детали были дешевле' }, isCorrect: false },
          { text: { en: 'To absorb collision kinetic energy through plastic deformation, extending deceleration time (Δt) and reducing peak forces on passengers', hy: 'Կլանելու հարվածի կինետիկ էներգիան դեֆորմացիայի միջոցով՝ երկարացնելով կանգառի ժամանակը (Δt) և նվազեցնելով մահացու ծանրաբեռնվածությունը մարդկանց վրա', ru: 'Чтобы поглотить кинетическую энергию удара, растянуть время замедления (Δt) и снизить перегрузки на людей' }, isCorrect: true },
          { text: { en: 'To allow the engine to detach and propel the vehicle backwards', hy: 'Որպեսզի շարժիչը մեքենան հետ հրի', ru: 'Чтобы мотор отлетал назад' }, isCorrect: false },
          { text: { en: 'To ensure the airbags do not need to deploy', hy: 'Որպեսզի անվտանգության բարձիկները չբացվեն', ru: 'Чтобы не срабатывали подушки безопасности' }, isCorrect: false },
        ],
        explanation: {
          en: 'By converting kinetic energy into mechanical deformation work over a longer time span, peak deceleration forces are kept within human survivability thresholds.',
          hy: 'Կինետիկ էներգիան վերածվում է թիթեղի ծալման աշխատանքի՝ փրկելով մարդկանց կյանքը:',
          ru: 'Смятие лонжеронов гасит энергию удара и многократно уменьшает перегрузку (G-force), действующую на пассажиров.',
        },
        difficulty: 'beginner',
      },
    ],
  },
};
