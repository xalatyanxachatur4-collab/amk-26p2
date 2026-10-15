import { QuizQuestion, LocalizedString } from '../types/automotive.js';

export interface MatchingItem {
  id: string;
  component: LocalizedString;
  function: LocalizedString;
}

export const componentMatchingItems: MatchingItem[] = [
  {
    id: 'm1',
    component: { en: 'Crankshaft', hy: 'Ծնկաձև լիսեռ', ru: 'Коленчатый вал' },
    function: {
      en: 'Converts reciprocating piston motion into continuous rotational torque',
      hy: 'Մխոցների գծային շարժումը վերածում է շարունակական պտտման',
      ru: 'Преобразует возвратно-поступательное движение поршней во вращательное',
    },
  },
  {
    id: 'm2',
    component: { en: 'Differential', hy: 'Դիֆերենցիալ', ru: 'Дифференциал' },
    function: {
      en: 'Allows driven wheels on the same axle to rotate at different speeds in turns',
      hy: 'Թույլ է տալիս տանող անիվներին պտտվել տարբեր արագությամբ շրջադարձերում',
      ru: 'Позволяет колесам одной оси вращаться с разной скоростью в поворотах',
    },
  },
  {
    id: 'm3',
    component: { en: 'Shock Absorber (Damper)', hy: 'Հիդրավլիկ մեղմիչ (Ամորտիզատոր)', ru: 'Амортизатор' },
    function: {
      en: 'Dissipates spring oscillations into thermal heat through fluid restriction',
      hy: 'Մարում է զսպանակի տատանումները՝ դրանք վերածելով ջերմության',
      ru: 'Гасит колебания пружин, преобразуя кинетическую энергию в теплоту',
    },
  },
  {
    id: 'm4',
    component: { en: 'Brake Master Cylinder', hy: 'Արգելակային գլխավոր գլան', ru: 'Главный тормозной цилиндр' },
    function: {
      en: 'Converts mechanical foot pedal force into pressurized hydraulic fluid flow',
      hy: 'Ոտնակի սեղմման ուժը վերածում է բարձր հիդրավլիկ ճնշման',
      ru: 'Преобразует усилие нажатия на педаль в гидравлическое давление',
    },
  },
  {
    id: 'm5',
    component: { en: 'Rack and Pinion', hy: 'Ղեկային ատամնաձողային մեխանիզմ', ru: 'Рулевая рейка' },
    function: {
      en: 'Translates rotational steering wheel input into transverse linear knuckle displacement',
      hy: 'Ղեկանիվի պտույտը վերածում է անիվների շրջման գծային շարժման',
      ru: 'Преобразует вращение руля в поперечное перемещение тяг поворотных кулаков',
    },
  },
  {
    id: 'm6',
    component: { en: 'CAN-Bus Network', hy: 'CAN ավտոմոբիլային ցանց', ru: 'Шина CAN' },
    function: {
      en: 'Transmits digital telemetry and commands between ECUs over differential two-wire pairs',
      hy: 'Թվային տեղեկատվություն է փոխանակում բլոկների միջև երկու լարով',
      ru: 'Обеспечивает скоростной цифровой обмен данными между блоками управления',
    },
  },
];

export const masterQuizQuestions: QuizQuestion[] = [
  {
    id: 'mq-1',
    question: {
      en: 'What happens to hydraulic fluid pressure throughout an enclosed brake circuit according to Pascal\'s Principle?',
      hy: 'Ի՞նչ է տեղի ունենում հեղուկի ճնշման հետ փակ արգելակային համակարգում՝ ըստ Պասկալի օրենքի:',
      ru: 'Что происходит с давлением тормозной жидкости в замкнутом контуре по закону Паскаля?',
    },
    options: [
      { text: { en: 'Pressure decreases with distance from the pedal', hy: 'Ճնշումը նվազում է ոտնակից հեռանալուն զուգընթաց', ru: 'Давление падает по мере удаления от педали' }, isCorrect: false },
      { text: { en: 'Pressure is transmitted undiminished and equally in all directions against container walls and pistons', hy: 'Ճնշումը հաղորդվում է անփոփոխ և հավասարապես բոլոր ուղղություններով', ru: 'Давление передается одинаково и без потерь во всех направлениях ко всем поршням' }, isCorrect: true },
      { text: { en: 'Pressure converts directly into mechanical electricity', hy: 'Ճնշումը վերածվում է էլեկտրաէներգիայի', ru: 'Давление превращается в электрический ток' }, isCorrect: false },
      { text: { en: 'Pressure only exists inside the front calipers', hy: 'Ճնշում գոյանում է միայն առջևի սուպորտներում', ru: 'Давление действует только на переднюю ось' }, isCorrect: false },
    ],
    explanation: {
      en: 'Pascal\'s Law states that pressure applied to an enclosed incompressible fluid is transmitted undiminished to every portion of the fluid and the walls of the containing vessel.',
      hy: 'Պասկալի օրենքի համաձայն՝ անսեղմելի հեղուկին հաղորդված ճնշումը տարածվում է բոլոր ուղղություններով անփոփոխ:',
      ru: 'Закон Паскаля гласит: давление, производимое на несжимаемую жидкость, передается в любую точку без изменений.',
    },
    difficulty: 'beginner',
  },
  {
    id: 'mq-2',
    question: {
      en: 'Which stroke in a 4-stroke internal combustion engine draws the air-fuel mixture into the combustion chamber?',
      hy: 'Քառատակտ շարժիչի ո՞ր տակտն է օդավառելիքային խառնուրդը ներս քաշում գլանի մեջ:',
      ru: 'Какой такт 4-тактного ДВС засасывает топливно-воздушную смесь в цилиндр?',
    },
    options: [
      { text: { en: 'Intake Stroke', hy: 'Ներծծման տակտ', ru: 'Такт впуска' }, isCorrect: true },
      { text: { en: 'Compression Stroke', hy: 'Սեղմման տակտ', ru: 'Такт сжатия' }, isCorrect: false },
      { text: { en: 'Combustion Stroke', hy: 'Այրման տակտ', ru: 'Рабочий ход' }, isCorrect: false },
      { text: { en: 'Exhaust Stroke', hy: 'Արտանետման տակտ', ru: 'Такт выпуска' }, isCorrect: false },
    ],
    explanation: {
      en: 'The intake stroke descends the piston while the intake poppet valve is open, creating a vacuum in the cylinder bore.',
      hy: 'Ներծծման տակտում մխոցն իջնում է ներքև, և բացված փականով խառնուրդը լցվում է գլան:',
      ru: 'При ходе впуска поршень опускается при открытом впускном клапане, создавая разрежение.',
    },
    difficulty: 'beginner',
  },
  {
    id: 'mq-3',
    question: {
      en: 'In an open mechanical differential, what is the consequence if one drive wheel encounters frictionless black ice while the other has high asphalt grip?',
      hy: 'Ի՞նչ տեղի կունենա բաց դիֆերենցիալի դեպքում, եթե անիվներից մեկը հայտնվի սառույցի վրա, իսկ մյուսը՝ չոր ասֆալտի:',
      ru: 'Что произойдет со свободным дифференциалом, если одно колесо попадет на лед, а второе — на сухой асфальт?',
    },
    options: [
      { text: { en: 'Both wheels will spin at exactly equal speeds', hy: 'Երկու անիվները կպտտվեն նույն արագությամբ', ru: 'Оба колеса продолжат вращаться синхронно' }, isCorrect: false },
      { text: { en: 'The slipping wheel on ice will spin at double speed while the wheel on asphalt receives near zero torque, stranding the car', hy: 'Սառույցի վրայի անիվը կսկսի անզուսպ պտտվել, իսկ ասֆալտի անիվը քարշուժ չի ստանա, և մեքենան տեղից չի շարժվի', ru: 'Колесо на льду будет бешено буксовать с удвоенной скоростью, а колесо на асфальте остановится без тяги' }, isCorrect: true },
      { text: { en: 'The differential immediately locks mechanically without electronics', hy: 'Դիֆերենցիալը ինքն իրեն կկողպվի', ru: 'Дифференциал мгновенно заблокируется сам' }, isCorrect: false },
      { text: { en: 'The engine will stall immediately', hy: 'Շարժիչը կհանգչի', ru: 'Двигатель заглохнет' }, isCorrect: false },
    ],
    explanation: {
      en: 'An open differential splits torque 50/50. The torque delivered to the high-traction wheel is limited to the tiny amount of friction torque the slipping wheel can support.',
      hy: 'Բաց դիֆերենցիալը մոմենտը բաշխում է 50/50 հարաբերությամբ. եթե մի անիվը զուրկ է կառչումից, մյուս անիվը ևս չի կարող զարգացնել անհրաժեշտ մոմենտ:',
      ru: 'Свободный дифференциал делит крутящий момент поровну: суммарная тяга ограничена колесом с наименьшим сцеплением.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-4',
    question: {
      en: 'What fundamental kinematic geometry requirement explains why a vehicle\'s inner steering wheel must turn at a steeper angle than the outer wheel?',
      hy: 'Ո՞ր հիմնարար կինեմատիկական պահանջն է բացատրում, թե ինչու շրջադարձի ներսի անիվը պետք է շրջվի ավելի մեծ անկյունով:',
      ru: 'Какое кинематическое требование объясняет необходимость поворота внутреннего колеса на больший угол, чем наружного?',
    },
    options: [
      { text: { en: 'Bernoulli Manifold Principle', hy: 'Բեռնուլիի օրենքը', ru: 'Закон Бернулли' }, isCorrect: false },
      { text: { en: 'Ackermann Steering Principle (concentric turning radii intersecting at rear axle center line)', hy: 'Ակերմանի ղեկային երկրաչափությունը (բոլոր անիվների առանցքները պետք է հատվեն շրջադարձի միևնույն կենտրոնում)', ru: 'Принцип Аккермана (оси всех колес должны пересекаться в едином центре кривизны поворота)' }, isCorrect: true },
      { text: { en: 'Hooke\'s Law of elasticity', hy: 'Հուկի առաձգականության օրենքը', ru: 'Закон Гука' }, isCorrect: false },
      { text: { en: 'Faraday\'s law of induction', hy: 'Ֆարադեյի էլեկտրամագնիսական օրենքը', ru: 'Закон Фарадея' }, isCorrect: false },
    ],
    explanation: {
      en: 'Without Ackermann geometry, the tires would fight each other, scrubbing sideways across the asphalt and causing extreme wear.',
      hy: 'Առանց Ակերմանի սկզբունքի անվադողերը կսահեին ասֆալտի վրայով՝ առաջացնելով ծայրահեղ մաշվածություն:',
      ru: 'Геометрия Аккермана исключает боковой снос шин при движении по окружности.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-5',
    question: {
      en: 'Why does an impact that crumples the front steel rails of a vehicle protect passengers better than an unyielding, infinitely rigid bumper?',
      hy: 'Ինչո՞ւ է մեքենայի առջևի թիթեղների ծալվելը ավելի լավ պաշտպանում ուղևորներին, քան բացարձակ կոշտ, չդեֆորմացվող թափքը:',
      ru: 'Почему сминаемые лонжероны кузова защищают людей лучше, чем абсолютно несминаемый жесткий бампер?',
    },
    options: [
      { text: { en: 'It makes the car bounce back into oncoming traffic', hy: 'Մեքենային հետ է նետում', ru: 'Они заставляют машину отскакивать назад' }, isCorrect: false },
      { text: { en: 'Plastic deformation absorbs kinetic energy and increases deceleration time (Δt), drastically reducing peak impact G-force on human occupants', hy: 'Դեֆորմացիան կլանում է կինետիկ էներգիան և մեծացնում կանգառի ժամանակը (Δt)՝ կտրուկ նվազեցնելով ծանրաբեռնվածությունը (G-force) մարդու օրգանների վրա', ru: 'Пластическая деформация поглощает энергию и увеличивает время замедления (Δt), многократно снижая пиковую перегрузку (G) на пассажиров' }, isCorrect: true },
      { text: { en: 'It reduces the weight of the vehicle during the accident', hy: 'Նվազեցնում է մեքենայի քաշը', ru: 'Снижает массу автомобиля в момент удара' }, isCorrect: false },
      { text: { en: 'It redirects impact energy into the radio antennas', hy: 'Էներգիան ուղղում է անտենայի վրա', ru: 'Перенаправляет энергию в антенны' }, isCorrect: false },
    ],
    explanation: {
      en: 'According to impulse-momentum theorem (F = m·Δv / Δt), extending the duration of the crash from 20ms to 100ms cuts the peak deceleration force by up to 80%, preserving life.',
      hy: 'Կանգառի ժամանակի (Δt) ավելացման շնորհիվ հարվածի մահացու ուժը նվազում է մինչև 80%-ով:',
      ru: 'По теореме об импульсе (F = m·Δv / Δt), увеличение времени торможения кратно снижает действующую на человека силу.',
    },
    difficulty: 'advanced',
  },
];
