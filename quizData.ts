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
      en: "What happens to hydraulic fluid pressure throughout an enclosed brake circuit according to Pascal's Principle?",
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
      en: "Pascal's Law states that pressure applied to an enclosed incompressible fluid is transmitted undiminished to every portion of the fluid and the walls of the containing vessel.",
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
      { text: { en: 'Combustion Stroke', hy: 'Այրման տակտ (Աշխատանքային ընթացք)', ru: 'Рабочий ход (Сгорание)' }, isCorrect: false },
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
      en: "What fundamental kinematic geometry requirement explains why a vehicle's inner steering wheel must turn at a steeper angle than the outer wheel?",
      hy: 'Ո՞ր հիմնարար կինեմատիկական պահանջն է բացատրում, թե ինչու շրջադարձի ներսի անիվը պետք է շրջվի ավելի մեծ անկյունով:',
      ru: 'Какое кинематическое требование объясняет необходимость поворота внутреннего колеса на больший угол, чем наружного?',
    },
    options: [
      { text: { en: 'Bernoulli Manifold Principle', hy: 'Բեռնուլիի օրենքը', ru: 'Закон Бернулли' }, isCorrect: false },
      { text: { en: 'Ackermann Steering Principle (concentric turning radii intersecting at rear axle center line)', hy: 'Ակերմանի ղեկային երկրաչափությունը (բոլոր անիվների առանցքները պետք է հատվեն շրջադարձի միևնույն կենտրոնում)', ru: 'Принцип Аккермана (оси всех колес должны пересекаться в едином центре кривизны поворота)' }, isCorrect: true },
      { text: { en: "Hooke's Law of elasticity", hy: 'Հուկի առաձգականության օրենքը', ru: 'Закон Гука' }, isCorrect: false },
      { text: { en: "Faraday's law of induction", hy: 'Ֆարադեյի էլեկտրամագնիսական օրենքը', ru: 'Закон Фарадея' }, isCorrect: false },
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
  {
    id: 'mq-6',
    question: {
      en: 'Why is a charge air cooler (intercooler) placed between the turbocharger compressor and the engine intake manifold?',
      hy: 'Ինչո՞ւ է տուրբոմղիչի (տուրբինի) կոմպրեսորի և ներծծող կոլեկտորի միջև տեղադրվում միջանկյալ հովացուցիչ (ինտերկուլեր):',
      ru: 'Зачем между компрессором турбонагнетателя и впускным коллектором устанавливают промежуточный охладитель (интеркулер)?',
    },
    options: [
      { text: { en: 'Cooling compressed air increases its density and oxygen mass per volume, boosting power and preventing engine knock', hy: 'Սեղմված օդի հովացումը մեծացնում է դրա խտությունն ու թթվածնի պարունակությունը՝ կանխելով դետոնացիան և բարձրացնելով հզորությունը', ru: 'Охлаждение сжатого воздуха увеличивает его плотность и содержание кислорода, предотвращая детонацию и повышая мощность' }, isCorrect: true },
      { text: { en: 'To cool exhaust gases before they reach the atmosphere', hy: 'Արտանետվող գազերի ջերմաստիճանը իջեցնելու համար', ru: 'Для снижения температуры выхлопных газов перед выходом в атмосферу' }, isCorrect: false },
      { text: { en: 'To slow down crankshaft idle speed', hy: 'Ծնկաձև լիսեռի պտտման արագությունը դանդաղեցնելու համար', ru: 'Чтобы замедлить скорость вращения коленчатого вала на холостом ходу' }, isCorrect: false },
      { text: { en: 'To warm up engine oil during cold winter starts', hy: 'Ձմռանը շարժիչի յուղը տաքացնելու համար', ru: 'Для подогрева моторного масла в зимний период' }, isCorrect: false },
    ],
    explanation: {
      en: 'Compressing air raises its temperature up to 160°C and lowers density. The intercooler cools it back down, increasing oxygen charge density and reducing knock probability.',
      hy: 'Տուրբինում ադիաբատիկ սեղմման ժամանակ օդը տաքանում է մինչև 120–160°C և նոսրանում: Ինտերկուլերը հովացնում է այն՝ մեծացնելով թթվածնի զանգվածային խտությունը և կանխելով դետոնացիան:',
      ru: 'При адиабатическом сжатии в турбине воздух нагревается до 120–160°C и теряет плотность. Интеркулер охлаждает его, повышая массовую концентрацию кислорода в цилиндре и отодвигая порог детонации.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-7',
    question: {
      en: 'Why do most production electric vehicles (EVs) utilize a single-speed fixed reduction gear instead of a multi-ratio transmission?',
      hy: 'Ինչո՞ւ է սերիական էլեկտրամոբիլների մեծ մասում օգտագործվում մեկաստիճան իջեցնող ռեդուկտոր՝ բազմաստիճան փոխանցման տուփի փոխարեն:',
      ru: 'Почему в большинстве серийных электромобилей используется одноступенчатый понижающий редуктор вместо многоступенчатой КПП?',
    },
    options: [
      { text: { en: 'Multi-speed gears cannot withstand high electric voltage', hy: 'Փոխանցման տուփը պայթում է բարձր էլեկտրական լարումից', ru: 'Многоступенчатые шестерни разрушаются от высокого электрического напряжения' }, isCorrect: false },
      { text: { en: 'Electric traction motors produce peak torque from 0 RPM and maintain high efficiency across a wide range up to 18,000–20,000 RPM', hy: 'Էլեկտրաշարժիչը զարգացնում է առավելագույն մոմենտ 0 պտ/րոպ-ից և արդյունավետ պտտվում մինչև 18 000–20 000 պտ/րոպ երկու ուղղություններով', ru: 'Тяговый электромотор развивает максимальный крутящий момент с 0 об/мин и эффективно крутится до 18 000–20 000 об/мин в обоих направлениях' }, isCorrect: true },
      { text: { en: 'Safety regulations ban mechanical shifters on zero-emission vehicles', hy: 'Օրենքն արգելում է փոխանցման տուփ տեղադրել էկոլոգիական մեքենաների վրա', ru: 'Законодательство запрещает устанавливать коробки передач на экологичный транспорт' }, isCorrect: false },
      { text: { en: 'Electric vehicles contain no mechanical rotating shafts', hy: 'Էլեկտրամոբիլում ընդհանրապես չկան պտտվող մեխանիկական լիսեռներ', ru: 'В электромобилях вообще нет вращающихся механических валов' }, isCorrect: false },
    ],
    explanation: {
      en: 'The broad flat torque band and high RPM limit of electric motors eliminate the need for step-ratio shifting, saving mass and achieving >98% transmission efficiency.',
      hy: 'Պտտող մոմենտի լայն դիապազոնը և հակառակ պտտվելու ունակությունը ավելորդ են դարձնում բազմաթիվ ատամնանիվները: Մեկաստիճան ռեդուկտորն ապահովում է ավելի քան 98% ՕԳԳ:',
      ru: 'Широкая полка крутящего момента и способность вращаться в реверсном режиме делают многоступенчатую КПП избыточной. Одноступенчатый редуктор проще, легче и обеспечивает КПД свыше 98%.',
    },
    difficulty: 'beginner',
  },
  {
    id: 'mq-8',
    question: {
      en: 'What fundamental physical process occurs during regenerative braking in an electric or hybrid vehicle?',
      hy: 'Ի՞նչ ֆիզիկական գործընթաց է տեղի ունենում էլեկտրամոբիլում ռեկուպերատիվ արգելակման ժամանակ:',
      ru: 'Какой физический процесс происходит в электромобиле при рекуперативном торможении?',
    },
    options: [
      { text: { en: 'Friction brake pads generate heat that is directly piped as electricity into the battery', hy: 'Արգելակային կոճղակները շփման ջերմությունը պղնձե լարերով ուղղում են մարտկոց', ru: 'Тормозные колодки зажимают диски и передают тепловую энергию по медным проводам в аккумулятор' }, isCorrect: false },
      { text: { en: 'The traction motor operates as a generator, converting vehicle kinetic energy into electrical energy to recharge the high-voltage battery', hy: 'Էլեկտրաշարժիչն անցնում է գեներատորի ռեժիմի՝ մեքենայի կինետիկ էներգիան փոխակերպելով էլեկտրաէներգիայի և լիցքավորելով մարտկոցը', ru: 'Электромотор переходит в режим генератора, преобразуя кинетическую энергию автомобиля в электричество и заряжая тяговую батарею' }, isCorrect: true },
      { text: { en: 'Drive wheels are instantly reversed to force the vehicle backward', hy: 'Անիվները միանգամից սկսում են պտտվել հակառակ ուղղությամբ', ru: 'Колеса мгновенно начинают вращаться в противоположную сторону' }, isCorrect: false },
      { text: { en: 'Brake fluid is pumped backwards into the master cylinder reservoir', hy: 'Հեղուկը հետ է մղվում բաք հզոր պոմպի միջոցով', ru: 'Тормозная жидкость перекачивается обратно в расширительный бачок компрессором' }, isCorrect: false },
    ],
    explanation: {
      en: 'By adjusting inverter phase angles, the motor applies counter-electromotive torque to the wheels, harvesting kinetic energy back into battery chemical potential.',
      hy: 'Ինվերտորը փոխում է փուլերի կառավարումը՝ ստեղծելով հակազդող էլեկտրամագնիսական մոմենտ, իսկ արտադրված հոսանքը վերադարձվում է մարտկոց:',
      ru: 'Инвертор меняет управление фазами статора так, чтобы на валу ротора возник противодействующий электромагнитный момент. Вырабатываемый ток выпрямляется и возвращается в батарею.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-9',
    question: {
      en: 'What is the critical function of the stator (with one-way sprag clutch) in an automatic transmission hydrodynamic torque converter?',
      hy: 'Ո՞րն է ռեակտորի (ստատորի) հիմնական դերը ավտոմատ փոխանցման տուփի հիդրոտրանսֆորմատորում:',
      ru: 'Какова главная функция реактора (статора) с обгонной муфтой в гидротрансформаторе АКПП?',
    },
    options: [
      { text: { en: 'Redirect returning fluid flow onto the pump impeller vanes to amplify input engine torque by up to 2.0x–2.5x during vehicle launch', hy: 'Տուրբինից վերադարձող յուղի հոսքն ուղղել պոմպի թիակների վրա ճիշտ անկյունով՝ կրկնապատկելով պտտող մոմենտը տեղից շարժվելիս', ru: 'Перенаправлять возвращающийся от турбины поток масла на лопатки насоса под нужным углом, умножая крутящий момент до 2–2.5 раз при трогании' }, isCorrect: true },
      { text: { en: 'To completely stop crankshaft rotation between shifts', hy: 'Լիովին կանգնեցնել ծնկաձև լիսեռի պտույտը փոխանցումը փոխելիս', ru: 'Полностью останавливать вращение коленчатого вала при переключении передач' }, isCorrect: false },
      { text: { en: 'To mechanically filter debris and metal shavings from transmission oil', hy: 'Յուղի միջից մաքրել մետաղական մասնիկները', ru: 'Фильтровать механические частицы из трансмиссионного масла' }, isCorrect: false },
      { text: { en: 'To spray antifreeze coolant directly over the clutch pack', hy: 'Տաքացած անտիֆրիզը հովացնել ռադիատորում', ru: 'Охлаждать радиатор антифризом при перегреве' }, isCorrect: false },
    ],
    explanation: {
      en: 'Without the stator, fluid exiting the turbine would hit the impeller in reverse, opposing engine torque. The stator redirects fluid to assist impeller rotation, multiplying torque.',
      hy: 'Առանց ռեակտորի տուրբինից հետ եկող յուղը կդանդաղեցներ պոմպը: Ռեակտորը շրջում է հոսքի վեկտորը՝ ապահովելով մոմենտի հիդրոդինամիկ բազմապատկում:',
      ru: 'Без статора отраженное от турбины масло тормозило бы насосное колесо. Статор меняет вектор скорости струи, заставляя жидкость подталкивать насос, что дает гидродинамическое умножение момента.',
    },
    difficulty: 'advanced',
  },
  {
    id: 'mq-10',
    question: {
      en: 'In a planetary gearset, what mode is achieved when the sun gear is driven, the outer ring gear is held stationary by a brake band, and the output is taken from the planet carrier?',
      hy: 'Ի՞նչ տեղի կունենա մոլորակային (պլանետար) փոխանցման մեջ, եթե պտտել արևային ատամնանիվը, արգելակել պսակաձև ատամնանիվը, իսկ ելքը վերցնել արբանյակների կրիչից (վոդիլոյից):',
      ru: 'Что происходит в планетарной передаче, если вращать солнечную шестерню, заблокировать коронную шестерню тормозом, а выходной момент снимать с водила?',
    },
    options: [
      { text: { en: 'Reverse gear rotation', hy: 'Հետընթաց փոխանցում', ru: 'Передача заднего хода (реверс)' }, isCorrect: false },
      { text: { en: 'Forward gear reduction with increased output torque (typical 1st or 2nd forward speed)', hy: 'Իջեցնող (դանդաղեցնող) առաջընթաց փոխանցում՝ պտտող մոմենտի ավելացմամբ', ru: 'Понижающая передача переднего хода с увеличением крутящего момента (1-я или 2-я передача)' }, isCorrect: true },
      { text: { en: 'Overdrive gear ratio with reduced torque', hy: 'Բարձրացնող փոխանցում (օվերդրայվ)՝ մոմենտի նվազմամբ', ru: 'Повышающая передача (овердрайв) со снижением крутящего момента' }, isCorrect: false },
      { text: { en: 'Full mechanical lock-up preventing any shaft rotation', hy: 'Բոլոր ատամնանիվների կոշտ արգելափակում', ru: 'Полная механическая блокировка без вращения валов' }, isCorrect: false },
    ],
    explanation: {
      en: 'The planet pinions walk around the inside of the stationary ring gear, rotating the carrier in the same direction at a reduced rotational speed, multiplying output torque.',
      hy: 'Արբանյակները գլորվում են անշարժ պսակաձև ատամնանիվի ներսում՝ կրիչին հաղորդելով նույն ուղղության, բայց ավելի դանդաղ պտույտ (i > 1):',
      ru: 'Сателлиты обкатываются внутри неподвижной коронной шестерни, заставляя водило вращаться в том же направлении, но со значительно меньшей скоростью, умножая крутящий момент.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-11',
    question: {
      en: 'What dangerous vehicle dynamic behavior would occur on a coil-sprung vehicle if all four hydraulic dampers (shock absorbers) were completely removed?',
      hy: 'Ի՞նչ տեղի կունենա զսպանակավոր կախոցով մեքենայի հետ, եթե ամբողջությամբ հեռացվեն բոլոր չորս մեղմիչները (ամորտիզատորները):',
      ru: 'Что произойдет с поведением автомобиля на пружинной подвеске, если полностью снять все четыре амортизатора?',
    },
    options: [
      { text: { en: 'The suspension will instantly freeze solid like a solid steel beam', hy: 'Կախոցը կդառնա բացարձակ կոշտ', ru: 'Подвеска станет абсолютно жесткой как монолитный чугунный брусок' }, isCorrect: false },
      { text: { en: 'The chassis will oscillate continuously after bumps, causing tires to hop and repeatedly lose road contact', hy: 'Թափքը յուրաքանչյուր անհարթությունից հետո երկար կօրորվի, իսկ անիվները կթռչկոտեն՝ կորցնելով կառչումը ճանապարհի հետ', ru: 'Кузов будет непрерывно раскачиваться после каждой неровности, колеса начнут подскакивать и терять контакт с дорогой' }, isCorrect: true },
      { text: { en: 'The drive axles will be disconnected from the wheels', hy: 'Մեքենան չի կարողանա տեղից շարժվել', ru: 'Автомобиль вообще не сможет тронуться с места' }, isCorrect: false },
      { text: { en: 'The steering wheel will become locked in the straight-ahead position', hy: 'Ղեկանիվը կկողպվի կենտրոնում', ru: 'Рулевое колесо заблокируется в центральном положении' }, isCorrect: false },
    ],
    explanation: {
      en: 'Springs store kinetic impact energy but cannot dissipate it. Hydraulic dampers force viscous oil through orifice valves, turning kinetic oscillations into thermal energy to stop resonant bounce.',
      hy: 'Զսպանակները կուտակում են էներգիան, բայց չեն մարում այն: Ամորտիզատորները յուղի դիմադրության միջոցով տատանման էներգիան վերածում են ջերմության:',
      ru: 'Пружины запасают энергию удара, но не рассеивают её. Амортизаторы дросселируют масло через калиброванные клапаны, превращая энергию колебаний в тепло и гася резонанс.',
    },
    difficulty: 'beginner',
  },
  {
    id: 'mq-12',
    question: {
      en: 'What is the primary mechanical function of an anti-roll (sway) bar in an automotive suspension?',
      hy: 'Ո՞րն է լայնական կայունարարի (ստաբիլիզատորի) հիմնական դերը ավտոմեքենայի կախոցում:',
      ru: 'Какова главная задача стабилизатора поперечной устойчивости в подвеске автомобиля?',
    },
    options: [
      { text: { en: 'To permanently elevate ground clearance for off-road driving', hy: 'Մեծացնել մեքենայի բարձրությունը (քլիրենսը)', ru: 'Увеличивать дорожный просвет (клиренс) при движении по бездорожью' }, isCorrect: false },
      { text: { en: 'Resist lateral body lean (roll) during cornering by transferring upward suspension deflection to the opposite wheel via torsion', hy: 'Փոքրացնել թափքի կողաթեքումը (ռոլլը) շրջադարձերում՝ ոլորվող ձողի միջոցով բեռնվածությունը բաշխելով անիվների միջև', ru: 'Уменьшать крен кузова в поворотах за счет скручивания торсионного прутка, переносящего нагрузку между левым и правым колесами' }, isCorrect: true },
      { text: { en: 'To physically shield tires from road debris punctures', hy: 'Պաշտպանել անվադողերը ծակվելուց', ru: 'Предотвращать прокол шины острыми предметами' }, isCorrect: false },
      { text: { en: 'To transfer rotational drive torque from gearbox to hubs', hy: 'Փոխանցման տուփից պտտող մոմենտը տանել անիվներին', ru: 'Передавать крутящий момент от коробки передач к ступицам' }, isCorrect: false },
    ],
    explanation: {
      en: 'In a turn, centrifugal force induces body roll. The anti-roll bar twists elastically, pulling the unloaded inside wheel upward to counteract roll angle and optimize tire contact patches.',
      hy: 'Շրջադարձում թափքը թեքվում է: Կայունարարը ոլորվում է և հակազդում կողաթեքմանը՝ օգնելով անվադողերին հավասարաչափ հենվել ասֆալտին:',
      ru: 'В повороте кузов кренится наружу. Стабилизатор работает как упругий торсион: скручиваясь, он подтягивает разгруженное колесо, уменьшая крен и сохраняя пятно контакта шин.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-13',
    question: {
      en: 'How does an ABS (Anti-lock Braking System) hydraulic modulator prevent wheels from locking into an uncontrollable skid during panic braking?',
      hy: 'Ինչպե՞ս է ABS համակարգի հիդրավլիկ բլոկը կանխում անիվների արգելափակումը (սահքը) կտրուկ արգելակելիս:',
      ru: 'Каким образом гидравлический модулятор ABS предотвращает блокировку колес при экстренном торможении?',
    },
    options: [
      { text: { en: 'It completely cuts off all brake fluid until the car comes to a stop', hy: 'Ամբողջությամբ անջատում է արգելակները', ru: 'Полностью отключает тормоза на всех колесах до полной остановки автомобиля' }, isCorrect: false },
      { text: { en: 'Solenoid valves rapidly cycle pressure (release, hold, apply) up to 15–20 times per second, maintaining tires at optimal 15–20% longitudinal slip', hy: 'Էլեկտրամագնիսական փականները վայրկյանում 15–20 անգամ իջեցնում, պահում և նորից բարձրացնում են ճնշումը՝ պահպանելով ղեկավարելիությունը', ru: 'Соленоидные клапаны циклически сбрасывают, удерживают и восстанавливают давление в суппорте до 15–20 раз в секунду, удерживая оптимальное проскальзывание (15–20%)' }, isCorrect: true },
      { text: { en: 'It sprays lubricant between the brake pads and disc to reduce friction', hy: 'Յուղ է ցողում սկավառակի վրա շփումը քչացնելու համար', ru: 'Впрыскивает масло между диском и колодками для снижения трения' }, isCorrect: false },
      { text: { en: 'It automatically rotates the steering rack towards the direction of the spin', hy: 'Անիվներն ինքնուրույն շրջում է սահքի ուղղությամբ', ru: 'Резко выворачивает рулевые колеса в сторону заноса' }, isCorrect: false },
    ],
    explanation: {
      en: 'A locked skidding tire loses directional steering control. ABS pulsates caliper pressure rapidly at the threshold of adhesion, enabling steering evasion during maximum deceleration.',
      hy: 'Կողպված (չպտտվող) անիվը զրկվում է կողային կառչումից, և մեքենան դառնում է անկառավարելի: ABS-ը պահպանում է ղեկավարելիությունը և կրճատում արգելակման ճանապարհը:',
      ru: 'Заблокированное колесо теряет способность направлять автомобиль (сцепление падает в боковом направлении до нуля). ABS циклически модулирует давление, сохраняя управляемость при торможении в пол.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-14',
    question: {
      en: 'What causes dangerous "brake fade" during prolonged downhill mountain braking, and why are ventilated discs specified?',
      hy: 'Ի՞նչն է առաջացնում արգելակների «հոգնածությունը» (fade) լեռնային երկար իջվածքներում, և ինչո՞ւ են սկավառակները պատրաստվում օդափոխվող խոռոչներով:',
      ru: 'Что вызывает потерю эффективности («увядание» / brake fade) тормозов при затяжном спуске с горы, и зачем тормозные диски делают вентилируемыми?',
    },
    options: [
      { text: { en: 'Extreme heat causes friction material outgassing and fluid boiling; radial cooling vanes act as centrifugal pumps to shed thermal energy', hy: 'Գերտաքացումը (>600°C) հանգեցնում է կոճղակների գազագոյացմանը և հեղուկի եռմանը. օդափոխվող խոռոչները աշխատում են որպես հովացնող պոմպ', ru: 'Экстремальный перегрев (>600°C) вызывает газовыделение колодок и закипание тормозной жидкости; внутренние каналы диска работают как центробежный насос для охлаждения' }, isCorrect: true },
      { text: { en: 'Friction magnetizes the cast iron rotor, repelling the brake caliper pistons', hy: 'Սկավառակները մագնիսանում են և վանում կոճղակները', ru: 'Тормозные диски намагничиваются от трения и отталкивают колодки' }, isCorrect: false },
      { text: { en: 'Low atmospheric pressure in mountains squeezes hydraulic fluid out of fittings', hy: 'Լեռներում օդի ճնշումը նվազում է և դուրս մղում հեղուկը', ru: 'Атмосферное давление в горах падает и выдавливает тормозную жидкость' }, isCorrect: false },
      { text: { en: 'Wheel lug nuts loosen under vibration and pull the caliper off alignment', hy: 'Անիվի հեղույսները թուլանում են և հեռացնում սուպորտը', ru: 'Колесные болты ослабевают от вибрации и отдаляют суппорт' }, isCorrect: false },
    ],
    explanation: {
      en: 'Excessive temperature causes resin binders to vaporize, creating a gas cushion between pad and rotor, while boiling fluid absorbs pedal stroke. Radial internal vanes draw air from center to periphery.',
      hy: 'Բարձր ջերմաստիճանից կոճղակից գազեր են արտադրվում՝ ստեղծելով գազային բարձ, իսկ հեղուկը կարող է եռալ: Օդափոխվող սկավառակի ներքին թիակները դուրս են մղում տաք օդը:',
      ru: 'При перегреве связующие смолы накладки испаряются, создавая паровую подушку между диском и колодкой, а вскипевшая жидкость сжимается. Внутренние радиальные лопатки диска прокачивают холодный воздух наружу.',
    },
    difficulty: 'advanced',
  },
  {
    id: 'mq-15',
    question: {
      en: 'What is the essential vehicle dynamic purpose of incorporating positive Caster angle into front suspension geometry?',
      hy: 'Ո՞րն է առջևի անիվների պտտման առանցքի երկայնական դրական թեքության (կաստերի / Caster) հիմնական նպատակը:',
      ru: 'Для чего в геометрии передней подвески задается положительный продольный наклон оси поворота (кастер / Caster)?',
    },
    options: [
      { text: { en: 'Prevents engine oil from overheating during sharp turns', hy: 'Կանխում է շարժիչի յուղի տաքացումը', ru: 'Предотвращает перегрев моторного масла' }, isCorrect: false },
      { text: { en: 'Produces self-centering torque on the steering wheel and high-speed straight-line directional stability', hy: 'Ապահովում է ղեկանիվի ինքնուրույն վերադարձը կենտրոնական դիրք և մեքենայի կայունությունը մեծ արագություններում', ru: 'Обеспечивает механический самовозврат руля в нейтральное положение и курсовую устойчивость на высоких скоростях' }, isCorrect: true },
      { text: { en: 'Maximizes crankshaft angular velocity limits', hy: 'Բարձրացնում է ծնկաձև լիսեռի առավելագույն արագությունը', ru: 'Увеличивает максимальную скорость вращения коленвала' }, isCorrect: false },
      { text: { en: 'Allows the front wheels to turn in opposite directions during cruise', hy: 'Թույլ է տալիս առջևի անիվներին պտտվել հակառակ ուղղություններով', ru: 'Позволяет передним колесам вращаться в противоположные стороны при прямолинейном движении' }, isCorrect: false },
    ],
    explanation: {
      en: 'Positive caster projects the steering axis ahead of the tire contact patch. The resulting pneumatic trail generates self-aligning torque that centers the steering at speed.',
      hy: 'Դրական կաստերի շնորհիվ շրջադարձից հետո անիվներն ինքնուրույն ուղղվում են՝ ապահովելով մեքենայի ուղղագիծ և կայուն ընթացքը:',
      ru: 'Благодаря положительному кастеру точка контакта шины с дорогой отстает от оси поворота, создавая стабилизирующий момент, выравнивающий колеса как колесики тележки супермаркета.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-16',
    question: {
      en: 'Why does the automotive CAN-Bus (Controller Area Network) utilize a twisted wire pair (CAN-H and CAN-L) operating on differential voltage?',
      hy: 'Ինչո՞ւ է ավտոմոբիլային CAN-Bus ցանցն օգտագործում ոլորված զույգ լարեր (CAN-High և CAN-Low) և դիֆերենցիալ լարում:',
      ru: 'Почему автомобильная шина CAN-Bus использует витую пару проводов (CAN-High и CAN-Low) и дифференциальное напряжение?',
    },
    options: [
      { text: { en: 'One wire powers 12V accessories while the other delivers AC sound to the audio speakers', hy: 'Որպեսզի մի լարը հաստատուն հոսանք տանի, իսկ մյուսը՝ փոփոխական ձայնային ազդանշան', ru: 'Чтобы один провод питал потребители 12В, а второй передавал переменный ток для аудиодинамиков' }, isCorrect: false },
      { text: { en: 'Common-mode noise rejection: external electromagnetic interference affects both wires equally, preserving the differential voltage delta', hy: 'Էլեկտրամագնիսական խանգարումները չեզոքացնելու համար. արտաքին աղմուկը հավասար ազդում է երկու լարերի վրա, իսկ նրանց լարումների տարբերությունը չի փոխվում', ru: 'Для подавления электромагнитных помех: внешняя наводка действует на оба провода одинаково, и разность потенциалов между ними остается неизменной' }, isCorrect: true },
      { text: { en: 'The second wire is strictly an idle mechanical backup in case the first wire snaps', hy: 'Երկրորդ լարը պահուստային է միայն լարի կտրվելու դեպքի համար', ru: 'Второй провод нужен только как резервный на случай обрыва первого' }, isCorrect: false },
      { text: { en: 'To deliver 800V direct current directly into the LED headlamps', hy: 'Դեպի լուսարձակներ 800 Վոլտ բարձր լարում հաղորդելու համար', ru: 'Для подачи высокого напряжения 800 Вольт к фарам автомобиля' }, isCorrect: false },
    ],
    explanation: {
      en: 'High-voltage ignition coils and power inverters generate EMI. Because CAN receivers measure (VH - VL), common-mode induced voltage spikes on both wires cancel out completely.',
      hy: 'Մեքենայում բազմաթիվ սարքեր առաջացնում են էլեկտրական աղմուկ: CAN ընդունիչը չափում է լարումների տարբերությունը, ինչի շնորհիվ ազդանշանը մնում է անխաթար:',
      ru: 'В автомобиле генераторы, катушки зажигания и инверторы создают сильные помехи. Приемник CAN измеряет не напряжение относительно кузова, а разницу (V_CAN_H - V_CAN_L), нивелируя любые синфазные наводки.',
    },
    difficulty: 'advanced',
  },
  {
    id: 'mq-17',
    question: {
      en: 'Why is an active liquid thermal management system critical for high-voltage automotive lithium-ion battery packs?',
      hy: 'Ինչո՞ւ է էլեկտրամոբիլի լիթիում-իոնային քարշային մարտկոցին անհրաժեշտ ակտիվ հեղուկային ջերմակարգավորման համակարգ:',
      ru: 'Зачем тяговой литий-ионной батарее электромобиля необходима активная система жидкостного термостатирования (охлаждения и подогрева)?',
    },
    options: [
      { text: { en: 'Cools the EV exhaust tailpipe down to ambient room temperature', hy: 'Հովացնում է էլեկտրամոբիլի խլացուցիչը', ru: 'Охлаждает выхлопную трубу электромобиля до комнатной температуры' }, isCorrect: false },
      { text: { en: 'Prevents catastrophic thermal runaway during DC fast-charging and slows capacity degradation by maintaining cells within 20°C–35°C', hy: 'Կանխում է ջերմային անկառավարելի ինքնաբռնկումը (thermal runaway) և քայքայումը՝ պահպանելով բջիջների ջերմաստիճանը 20–35°C-ում', ru: 'Предотвращает тепловой разгон (самовозгорание) при быстрой зарядке и деградацию емкости, удерживая ячейки в оптимальном диапазоне 20–35°C' }, isCorrect: true },
      { text: { en: 'Melts brake pad dust during high-speed highway cruising', hy: 'Հալեցնում է արգելակային կոճղակները կայանելիս', ru: 'Растапливает пыль от тормозных колодок при движении по трассе' }, isCorrect: false },
      { text: { en: 'Replaces battery electrical ions with viscous engine oil lubricants', hy: 'Էլեկտրական հոսանքը փոխարինում է շարժիչի յուղով', ru: 'Заменяет электрический ток моторным маслом высокой вязкости' }, isCorrect: false },
    ],
    explanation: {
      en: 'Operating above 60°C triggers exothermic electrolyte decomposition and runaway; charging below freezing risks lithium dendrite short circuits. Liquid loops stabilize cell temperatures uniformly.',
      hy: 'Բարձր ջերմաստիճանում մարտկոցի բջիջները կարող են բռնկվել, իսկ ցրտին նվազում է հզորությունը: Հեղուկային հովացումն ու տաքացումը պաշտպանում են մարտկոցը:',
      ru: 'При температуре выше 50–60°C начинается разрушение электродов с риском лавинообразного терморазгона, а на морозе литий осаждается дендритами (риск КЗ). Жидкостной контур поддерживает безопасную температуру ячеек.',
    },
    difficulty: 'intermediate',
  },
  {
    id: 'mq-18',
    question: {
      en: 'How does the vehicle engine/motor power required to overcome aerodynamic drag scale as vehicle speed (v) increases?',
      hy: 'Ինչպե՞ս է աերոդինամիկ դիմադրությունը հաղթահարելու համար անհրաժեշտ հզորությունը կախված մեքենայի շարժման արագությունից (v):',
      ru: 'Как зависит мощность, необходимая для преодоления лобового аэродинамического сопротивления автомобиля, от скорости движения (v)?',
    },
    options: [
      { text: { en: 'Linearly (P ∝ v): doubling vehicle speed requires exactly twice the power', hy: 'Գծային համեմատական (P ∝ v). կրկնապատիկ արագությանը պետք է 2 անգամ ավելի հզորություն', ru: 'Линейно (P ∝ v): для удвоения скорости требуется ровно в 2 раза больше мощности' }, isCorrect: false },
      { text: { en: 'Proportionally to the cube of speed (P_aero ∝ v³): doubling vehicle speed requires an 8-fold increase in aerodynamic propulsion power', hy: 'Արագության խորանարդին համեմատական (P ∝ v³). արագության կրկնապատկումը պահանջում է հզորության 8 անգամ մեծացում', ru: 'Пропорционально кубу скорости (P_aero ∝ v³): удвоение скорости требует восьмикратного увеличения мощности' }, isCorrect: true },
      { text: { en: 'Power requirement is invariant and independent of vehicle speed', hy: 'Հզորությունն ընդհանրապես կախված չէ արագությունից', ru: 'Мощность вообще не зависит от скорости автомобиля' }, isCorrect: false },
      { text: { en: 'Inversely proportional (P ∝ 1/v): higher velocities diminish air resistance toward zero', hy: 'Հակադարձ համեմատական (P ∝ 1/v). արագության աճին զուգընթաց դիմադրությունը նվազում է', ru: 'Обратно пропорционально (P ∝ 1/v): чем выше скорость, тем меньше сопротивление воздуха' }, isCorrect: false },
    ],
    explanation: {
      en: 'Aerodynamic drag force scales quadratically (Fd = 0.5 · ρ · v² · Cd · A). Because mechanical power is force multiplied by velocity (P = F · v), required aerodynamic power climbs with v³.',
      hy: 'Դիմադրության ուժը կախված է արագության քառակուսուց (F ∝ v²), իսկ հզորությունը՝ P = F · v: Հետևաբար, հզորությունն աճում է խորանարդային կախվածությամբ (v³):',
      ru: 'Сила аэродинамического сопротивления пропорциональна квадрату скорости (F = 0.5 · ρ · v² · Cd · A). Поскольку мощность равна P = F · v, требуемая мощность растет как куб скорости (v³).',
    },
    difficulty: 'advanced',
  },
  {
    id: 'mq-19',
    question: {
      en: 'What notable automotive engineering milestone did the Yerevan Automobile Plant (ErAZ) in Armenia achieve in the 1970s?',
      hy: 'Էլեկտրամոբիլների պատմության ո՞ր նշանակալի նվաճումն է իրականացվել Երևանի ավտոմոբիլային գործարանում (ԵրԱԶ) 1970-ական թվականներին:',
      ru: 'Какое знаменательное достижение в истории электромобилестроения было создано на Ереванском автомобильном заводе (ЕрАЗ) в 1970-х годах?',
    },
    options: [
      { text: { en: "Building the world's first supersonic jet-powered land speed record vehicle", hy: 'Աշխարհում առաջին գերձայնային ռեակտիվ սուպերքարի ստեղծումը', ru: 'Создание первого в мире сверхзвукового реактивного суперкара' }, isCorrect: false },
      { text: { en: 'Development and production of the experimental ErAZ-3727 electric van prototypes featuring DC traction motors and pulsed thyristor control', hy: 'Քարշային էլեկտրաշարժիչներով և թիրիստորային կառավարմամբ ԵրԱԶ-3727 փորձարարական էլեկտրաֆուրգոնների մշակումն ու արտադրությունը', ru: 'Разработка и выпуск экспериментальных фургонов ЕрАЗ-3727 с тяговыми электродвигателями и тиристорным импульсным управлением' }, isCorrect: true },
      { text: { en: 'Invention of the first agricultural steam tractor in 1805', hy: '1805 թվականին առաջին շոգետրակտորի հայտնագործումը', ru: 'Изобретение первого парового трактора в 1805 году' }, isCorrect: false },
      { text: { en: 'Engineering liquid rocket booster engines for NASA Apollo missions', hy: '«Ապոլոն» տիեզերանավերի համար շարժիչների նախագծումը', ru: 'Разработка двигателей для космических кораблей «Аполлон»' }, isCorrect: false },
    ],
    explanation: {
      en: 'In the 1970s, ErAZ developed the ErAZ-3727 electric van prototypes in Yerevan, pairing DC traction motors with lead-acid battery packs for zero-emission urban postal and delivery trials.',
      hy: '1970-ականներին ԵրԱԶ-ի ինժեներները ստեղծեցին ԵրԱԶ-3727 էլեկտրաֆուրգոնը՝ 15–20 կՎտ հզորությամբ էլեկտրաշարժիչով, որը քաղաքային առաքման առաջադեմ նախագիծ էր:',
      ru: 'В 1970-х инженеры ЕрАЗ разработали фургон ЕрАЗ-3727 с электромотором постоянного тока мощностью 15–20 кВт и блоком аккумуляторов, опередив свое время в сфере городского экологичного коммерческого транспорта.',
    },
    difficulty: 'beginner',
  },
  {
    id: 'mq-20',
    question: {
      en: 'Why have modern passenger vehicles almost universally transitioned from body-on-frame (ladder chassis) to unibody (monocoque) construction?',
      hy: 'Ինչո՞ւ են ժամանակակից գրեթե բոլոր մարդատար ավտոմեքենաները շրջանակային (ռամայով) կառուցվածքից անցել կրող թափքի (մոնոկոկի):',
      ru: 'Почему практически все современные легковые автомобили перешли от рамной конструкции к несущему кузову (монококу)?',
    },
    options: [
      { text: { en: 'Ladder frames cannot be painted with metallic or pearlescent coats', hy: 'Ռամայով մեքենաներն արգելվում է ներկել մետալիկ գույնով', ru: 'Рамные автомобили запрещено красить в цвет металлик' }, isCorrect: false },
      { text: { en: 'Unibody construction provides vastly superior torsional rigidity at a lower mass while integrating engineered progressive crumple zones for occupant crash protection', hy: 'Կրող թափքն ապահովում է ոլորման զգալիորեն բարձր կոշտություն՝ ցածր քաշի պայմաններում, և թույլ է տալիս ստեղծել դեֆորմացվող անվտանգության գոտիներ', ru: 'Несущий кузов обеспечивает значительно более высокую торсионную жесткость при меньшей массе и позволяет формировать программируемые зоны деформации для пассивной безопасности' }, isCorrect: true },
      { text: { en: 'To physically prevent owners from mounting different diameter road wheels', hy: 'Որպեսզի հնարավոր չլինի տեղադրել տարբեր չափսի անիվներ', ru: 'Чтобы исключить возможность установки колес разного диаметра' }, isCorrect: false },
      { text: { en: 'Unibody hulls allow passenger automobiles to float buoyantly like motorboats', hy: 'Մոնոկոկը թույլ է տալիս մեքենային լողալ ջրի վրա ինչպես նավակ', ru: 'Монокок позволяет автомобилю плавать по поверхности воды как катер' }, isCorrect: false },
    ],
    explanation: {
      en: 'In a monocoque, the outer skin, floor pan, and pillars form an integrated structural shell. This eliminates the heavy ladder frame, dramatically improves handling dynamics, and channels impact loads safely around the survival cell.',
      hy: 'Մոնոկոկում թափքի բոլոր տարրերը կազմում են միասնական տարածական կմախք: Սա նվազեցնում է մեքենայի քաշը, լավացնում կառավարելիությունը և կլանում վթարի հարվածը:',
      ru: 'В монококе внешние панели, стойки крыши и пол работают как единая пространственная ферма. Это устраняет паразитный вес тяжелой лестничной рамы, улучшает управляемость и рассеивает энергию ударов в ДТП.',
    },
    difficulty: 'intermediate',
  },
];
