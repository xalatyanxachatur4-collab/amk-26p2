import { LocalizedString, SystemId } from '../types/automotive.js';

export interface GlossaryTerm {
  id: string;
  term: LocalizedString;
  category: LocalizedString;
  definition: LocalizedString;
  systemId?: SystemId;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'ackermann-steering',
    term: { en: 'Ackermann Steering Geometry', hy: 'Ակերմանի ղեկային երկրաչափություն', ru: 'Геометрия рулевого управления Аккермана' },
    category: { en: 'Chassis & Steering', hy: 'Շասսի և ղեկային', ru: 'Шасси и управление' },
    definition: {
      en: 'A geometric linkage arrangement where the inside front wheel turns at a sharper angle than the outside wheel to trace concentric circular radii during turns without lateral tire scrub.',
      hy: 'Երկրաչափական սկզբունք, որտեղ շրջադարձի ներսի անիվը շրջվում է ավելի մեծ անկյունով, քան դրսի անիվը՝ կանխելով անվադողի սահքը:',
      ru: 'Геометрическая схема трапеции, при которой внутреннее колесо в повороте отклоняется на больший угол, чем внешнее, исключая боковой снос шин.',
    },
    systemId: 'steering',
  },
  {
    id: 'anti-lock-braking-system',
    term: { en: 'Anti-lock Braking System (ABS)', hy: 'Արգելակման հակաարգելափակման համակարգ (ABS)', ru: 'Антиблокировочная система тормозов (ABS)' },
    category: { en: 'Safety & Control', hy: 'Անվտանգություն', ru: 'Безопасность' },
    definition: {
      en: 'An active electro-hydraulic braking control loop that modulates caliper fluid pressure 15–20 times per second to prevent wheel lockup, preserving directional steering grip.',
      hy: 'Էլեկտրահիդրավլիկ համակարգ, որը վայրկյանում բազմիցս թուլացնում և ավելացնում է արգելակային ճնշումը՝ կանխելով անիվների արգելափակումը և պահպանելով ղեկավարելիությունը:',
      ru: 'Электрогидравлическая система, импульсно сбрасывающая давление в тормозных механизмах для предотвращения юза и сохранения управляемости.',
    },
    systemId: 'brakes',
  },
  {
    id: 'can-bus',
    term: { en: 'Controller Area Network (CAN-Bus)', hy: 'CAN ավտոմոբիլային ցանց', ru: 'Шина CAN (Controller Area Network)' },
    category: { en: 'Electronics', hy: 'Էլեկտրոնիկա', ru: 'Электроника' },
    definition: {
      en: 'A robust differential two-wire serial broadcast protocol that allows electronic microcontrollers across the vehicle to communicate without dedicated individual wiring harnesses.',
      hy: 'Երկլարանի թվային շինա, որով ավտոմեքենայի բոլոր էլեկտրոնային բլոկները (ԷԿՈՒ) փոխանակում են տվյալներ բարձր արագությամբ և հուսալիությամբ:',
      ru: 'Специализированная помехозащищенная цифровая шина для скоростного обмена данными между всеми блоками управления автомобилем.',
    },
    systemId: 'electrical',
  },
  {
    id: 'camshaft',
    term: { en: 'Camshaft', hy: 'Բաշխիչ լիսեռ (ռասպրեդվալ)', ru: 'Распределительный вал (распредвал)' },
    category: { en: 'Powertrain', hy: 'Ուժային ագրեգատ', ru: 'Двигатель' },
    definition: {
      en: 'A shaft featuring calibrated egg-shaped lobes that rotate synchronously with the crankshaft to open poppet intake and exhaust valves.',
      hy: 'Լիսեռ՝ հատուկ կորագծային բռունցքներով, որը ծնկաձև լիսեռի հետ համաժամանակյա բացում և փակում է գլանի փականները:',
      ru: 'Вал с профилированными кулачками, управляющий фазами и высотой подъема впускных и выпускных клапанов.',
    },
    systemId: 'engine',
  },
  {
    id: 'crankshaft',
    term: { en: 'Crankshaft', hy: 'Ծնկաձև լիսեռ (կալենվալ)', ru: 'Коленчатый вал (коленвал)' },
    category: { en: 'Powertrain', hy: 'Ուժային ագրեգատ', ru: 'Двигатель' },
    definition: {
      en: 'The heavy rotating shaft with offset crankpins that converts the linear reciprocating motion of the pistons and connecting rods into continuous rotational torque.',
      hy: 'Շարժիչի հիմնական պտտվող լիսեռը, որը մխոցների գծային շարժումը վերածում է պտտական մեխանիկական մոմենտի:',
      ru: 'Вал кривошипно-шатунного механизма, преобразующий возвратно-поступательное движение поршней во вращение маховика.',
    },
    systemId: 'engine',
  },
  {
    id: 'differential',
    term: { en: 'Differential', hy: 'Դիֆերենցիալ', ru: 'Межколесный дифференциал' },
    category: { en: 'Drivetrain', hy: 'Տրանսմիսիա', ru: 'Трансмиссия' },
    definition: {
      en: 'A planetary bevel gear assembly that transmits engine drive torque equally to the left and right driving wheels while permitting them to spin at different angular speeds during cornering.',
      hy: 'Ատամնանիվային մեխանիզմ, որը քարշուժը հավասարապես փոխանցում է տանող անիվներին՝ միաժամանակ թույլ տալով նրանց պտտվել տարբեր արագություններով շրջադարձերում:',
      ru: 'Механический узел с коническими сателлитами, делящий крутящий момент между колесами и обеспечивающий их вращение с разной скоростью в поворотах.',
    },
    systemId: 'transmission',
  },
  {
    id: 'macpherson-strut',
    term: { en: 'MacPherson Strut Suspension', hy: 'ՄաքՖերսոնի տիպի կախոց', ru: 'Подвеска типа МакФерсон' },
    category: { en: 'Chassis', hy: 'Շասսի', ru: 'Шасси' },
    definition: {
      en: 'An independent front suspension design combining a telescopic hydraulic damper inside a coil spring as a single structural steering and load-bearing unit.',
      hy: 'Անկախ առջևի կախոցի կառուցվածք, որտեղ զսպանակը և մեղմիչը կազմում են մեկ ընդհանուր կրող հանգույց:',
      ru: 'Тип независимой подвески с амортизаторной стойкой внутри винтовой пружины, совмещающей функции демпфирования и направляющего аппарата.',
    },
    systemId: 'suspension',
  },
  {
    id: 'regenerative-braking',
    term: { en: 'Regenerative Braking', hy: 'Ռեգեներատիվ (վերականգնողական) արգելակում', ru: 'Рекуперативное торможение' },
    category: { en: 'Powertrain & Braking', hy: 'Էլեկտրամոբիլներ', ru: 'Электротяга' },
    definition: {
      en: 'An energy recovery mechanism where the electric traction motor is operated in reverse as an electric generator during deceleration, converting kinetic energy into battery electrical charge.',
      hy: 'Էներգիայի վերականգնման մեխանիզմ, որտեղ արգելակելիս էլեկտրաշարժիչը վերածվում է գեներատորի՝ կինետիկ էներգիան լիցքավորելով մարտկոցում:',
      ru: 'Режим замедления, при котором тяговый электромотор работает в генераторном режиме, подзаряжая высоковольтную батарею.',
    },
    systemId: 'brakes',
  },
  {
    id: 'stoichiometric-ratio',
    term: { en: 'Stoichiometric Air-Fuel Ratio (Lambda = 1.0)', hy: 'Ստեխիոմետրիկ օդավառելիքային հարաբերություն (Լամբդա = 1.0)', ru: 'Стехиометрический состав смеси (Лямбда = 1.0)' },
    category: { en: 'Powertrain', hy: 'Շարժիչ', ru: 'Двигатель' },
    definition: {
      en: 'The ideal chemical combustion mass ratio (14.7:1 air-to-gasoline by weight) where all fuel hydrocarbons and all oxygen molecules are completely combusted into CO2 and H2O.',
      hy: 'Քիմիական այրման կատարյալ զանգվածային հարաբերակցություն (14.7 կգ օդ 1 կգ բենզինի համար), որի դեպքում վառելիքը լիարժեք այրվում է:',
      ru: 'Теоретически идеальное массовое соотношение воздуха и бензина (14.7:1), обеспечивающее полное сгорание топлива и эффективную работу катализатора.',
    },
    systemId: 'engine',
  },
  {
    id: 'unibody-construction',
    term: { en: 'Unibody (Monocoque) Construction', hy: 'Կրող թափք (Մոնոկոկ)', ru: 'Несущий кузов (монокок)' },
    category: { en: 'Structure & Safety', hy: 'Թափք', ru: 'Кузов' },
    definition: {
      en: 'A structural vehicle design where the vehicle frame and body panels are integrated into a single unified load-bearing shell, maximizing torsional stiffness and passenger protection.',
      hy: 'Թափքի կառուցվածք, որտեղ թափքը և հիմնակմախքը ձուլված են մեկ միասնական կրող կառուցվածքի մեջ՝ ապահովելով մեծ կոշտություն և անվտանգություն:',
      ru: 'Пространственная конструкция, в которой кузовные панели и силовые элементы объединены в единый несущий силовой каркас.',
    },
    systemId: 'body',
  },
];
