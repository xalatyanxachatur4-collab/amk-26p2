import { LocalizedString } from '../types/automotive.js';

export interface TimelineEvent {
  id: string;
  year: string;
  category: 'ice' | 'ev' | 'both';
  title: LocalizedString;
  pioneers: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  highlight: LocalizedString;
  impactBadge: LocalizedString;
}

export interface CountryPhilosophy {
  id: string;
  countryName: LocalizedString;
  flag: string;
  coreFocus: LocalizedString;
  philosophyTitle: LocalizedString;
  philosophyDescription: LocalizedString;
  famousFor: LocalizedString[];
  iconicBrands: string[];
  engineeringHeritage: LocalizedString;
}

export interface ProductionStatistic {
  country: LocalizedString;
  flag: string;
  annualVolume: string; // e.g. "30.2M"
  sharePercent: number; // e.g. 32.5
  topBrands: string;
  specialization: LocalizedString;
}

export interface TopManufacturer {
  rank: number;
  name: string;
  annualSales: string; // e.g. "11.2M"
  headquarters: string;
  flag: string;
  notableBrands: string[];
  keyStrength: LocalizedString;
}

export interface ProductionMilestone {
  year: string;
  globalOutput: string;
  evShare: string;
  keyTrend: LocalizedString;
}

export interface HistoryData {
  timelineEvents: TimelineEvent[];
  countries: CountryPhilosophy[];
  erazStory: {
    title: LocalizedString;
    subtitle: LocalizedString;
    foundedYear: string;
    city: LocalizedString;
    mainModel: string;
    description: LocalizedString;
    evInnovationTitle: LocalizedString;
    evInnovationStory: LocalizedString;
    technicalHighlights: {
      label: LocalizedString;
      detail: LocalizedString;
    }[];
    historicalLegacy: LocalizedString;
  };
  statistics: {
    annualProductionLeaders: ProductionStatistic[];
    topManufacturers: TopManufacturer[];
    productionMilestones: ProductionMilestone[];
    evGrowthTrend: {
      year: string;
      share: number;
      label: string;
    }[];
  };
}

export const historyData: HistoryData = {
  timelineEvents: [
    {
      id: 'early-ev-birth',
      year: '1832–1839',
      category: 'ev',
      title: {
        en: 'The First Electric Carriages',
        hy: 'Առաջին էլեկտրական կառքերը',
        ru: 'Первые электрические повозки в мире',
      },
      pioneers: {
        en: 'Robert Anderson (Scotland) & Thomas Davenport (USA)',
        hy: 'Ռոբերտ Անդերսոն (Շոտլանդիա) և Թոմաս Դևենպորտ (ԱՄՆ)',
        ru: 'Роберт Андерсон (Шотландия) и Томас Дэвенпорт (США)',
      },
      location: {
        en: 'Scotland / USA',
        hy: 'Շոտլանդիա / ԱՄՆ',
        ru: 'Шотландия / США',
      },
      description: {
        en: 'Crude non-rechargeable electric carriages using primary battery galvanic cells were developed decades before practical gasoline engines existed, proving electric propulsion was mechanically feasible.',
        hy: 'Չվերալիցքավորվող առաջնային մարտկոցներով առաջին էլեկտրական կառքերը ստեղծվեցին բենզինային շարժիչներից տասնամյակներ առաջ՝ ապացուցելով էլեկտրական քարշի հնարավորությունը:',
        ru: 'Первые электрические повозки на первичных гальванических элементах появились за десятилетия до бензиновых двигателей, доказав практическую возможность движения на электротяге.',
      },
      highlight: {
        en: 'Preceded gasoline internal combustion vehicles by over 40 years.',
        hy: 'Ավելի քան 40 տարով առաջ էր բենզինային ներքին այրման շարժիչից:',
        ru: 'Появились более чем на 40 лет раньше бензиновых автомобилей.',
      },
      impactBadge: {
        en: 'EV Origin',
        hy: 'Էլեկտրամոբիլի ծնունդ',
        ru: 'Зарождение EV',
      },
    },
    {
      id: 'benz-patent-motorwagen',
      year: '1886',
      category: 'ice',
      title: {
        en: 'Birth of the Modern ICE Automobile',
        hy: 'ՆԱՇ ավտոմեքենայի ծնունդը (Benz)',
        ru: 'Рождение автомобиля с ДВС: Benz Patent-Motorwagen',
      },
      pioneers: {
        en: 'Karl Benz',
        hy: 'Կարլ Բենց',
        ru: 'Карл Бенц',
      },
      location: {
        en: 'Mannheim, Germany',
        hy: 'Մանհայմ, Գերմանիա',
        ru: 'Мангейм, Германия',
      },
      description: {
        en: 'Karl Benz filed patent DRP-37435 for a three-wheeled vehicle powered by a high-speed four-stroke horizontal single-cylinder engine (0.75 hp). Widely recognized as the birth year of the production automobile.',
        hy: 'Կարլ Բենցը արտոնագրեց (DRP-37435) առաջին եռանիվ մեքենան՝ հորիզոնական 1-գլանանի 4-տակտ շարժիչով (0.75 ձ.ու.), որը համարվում է ժամանակակից ավտոմոբիլի ծնունդը:',
        ru: 'Карл Бенц получил патент DRP-37435 на трехколесную повозку с горизонтальным 4-тактным 1-цилиндровым двигателем мощностью 0.75 л.с. Официальная дата рождения автомобиля.',
      },
      highlight: {
        en: 'Patent DRP-37435 established the mechanical layout of the automobile.',
        hy: 'DRP-37435 արտոնագիրը դրեց համաշխարհային ավտոարդյունաբերության հիմքը:',
        ru: 'Патент DRP-37435 заложил архитектуру всего мирового автостроения.',
      },
      impactBadge: {
        en: 'ICE Genesis',
        hy: 'ՆԱՇ հիմք',
        ru: 'Начало ДВС',
      },
    },
    {
      id: 'bertha-benz-historic-trip',
      year: '1888',
      category: 'ice',
      title: {
        en: 'First Long-Distance Road Trip in History',
        hy: 'Պատմության առաջին միջքաղաքային երթը (Բերտա Բենց)',
        ru: 'Первый в истории автопробег Берты Бенц (106 км)',
      },
      pioneers: {
        en: 'Bertha Benz',
        hy: 'Բերտա Բենց',
        ru: 'Берта Бенц',
      },
      location: {
        en: 'Mannheim to Pforzheim, Germany',
        hy: 'Մանհայմից Պֆորցհայմ, Գերմանիա',
        ru: 'Мангейм — Пфорцхайм, Германия',
      },
      description: {
        en: 'Without informing her husband, Bertha Benz drove 106 km with her teenage sons, solving technical issues en route with a hatpin and inventing brake linings. She proved to a skeptical world that the automobile was practical.',
        hy: 'Առանց ամուսնուն տեղյակ պահելու, Բերտա Բենցը տղաների հետ անցավ 106 կմ՝ ճանապարհին հորինելով արգելակման կոճղակները և ապացուցելով մեքենայի հուսալիությունը:',
        ru: 'Берта Бенц без ведома мужа преодолела 106 км с сыновьями, изобрела на ходу тормозные накладки и доказала скептическому миру надежность и будущее автомобиля.',
      },
      highlight: {
        en: 'World\'s first marketing and real-world durability demonstration.',
        hy: 'Աշխարհի առաջին գործնական ճանապարհային փորձարկումը:',
        ru: 'Первое в мире дорожное испытание на надежность.',
      },
      impactBadge: {
        en: 'Durability Milestone',
        hy: 'Գործնական փորձարկում',
        ru: 'Практический прорыв',
      },
    },
    {
      id: 'golden-age-of-early-evs',
      year: '1899–1905',
      category: 'ev',
      title: {
        en: 'Golden Age of Early Electric Cars (38% Market Share)',
        hy: 'Վաղ էլեկտրամոբիլների ոսկե դարաշրջանը (38% շուկա)',
        ru: 'Золотой век ранних электромобилей: 38% рынка США',
      },
      pioneers: {
        en: 'Camille Jenatzy, Pope Manufacturing, Baker Electric',
        hy: 'Կամիլ Ժենատցի, Pope Manufacturing, Baker Electric',
        ru: 'Камиль Женатци, Baker Electric, Columbia Automobile',
      },
      location: {
        en: 'USA, Belgium, France',
        hy: 'ԱՄՆ, Բելգիա, Ֆրանսիա',
        ru: 'США, Бельгия, Франция',
      },
      description: {
        en: 'In 1900, 38% of US cars were electric, 40% steam-powered, and only 22% gasoline. In 1899, the rocket-shaped EV "La Jamais Contente" was the first vehicle to break 100 km/h (105.9 km/h). EVs were favored for silence and instant clean starting.',
        hy: '1900 թ.-ին ԱՄՆ-ում մեքենաների 38%-ը էլեկտրական էին: 1899-ին "La Jamais Contente" էլեկտրամեքենան առաջինն անցավ 100 կմ/ժ արագության շեմը (105.9 կմ/ժ): Դրանք նախընտրում էին լռության և մաքրության համար:',
        ru: 'В 1900 г. в США 38% авто были электрическими и лишь 22% бензиновыми! В 1899 г. электромобиль "La Jamais Contente" первым в истории преодолел 100 км/ч (105.9 км/ч). Электрокары ценили за тишину и отсутствие опасной заводной рукоятки.',
      },
      highlight: {
        en: 'First vehicle in history to exceed 100 km/h was an electric car.',
        hy: 'Պատմության մեջ առաջինը 100 կմ/ժ-ն անցած մեքենան էլեկտրամոբիլ էր:',
        ru: 'Первым в истории рубеж 100 км/ч взял именно электромобиль.',
      },
      impactBadge: {
        en: 'Speed Record & EV Peak',
        hy: 'Արագության ռեկորդ',
        ru: 'Пик популярности EV',
      },
    },
    {
      id: 'ford-model-t-assembly',
      year: '1908–1913',
      category: 'ice',
      title: {
        en: 'Ford Model T & The Moving Assembly Line',
        hy: 'Ford Model T և առաջին կոնվեյերային արտադրությունը',
        ru: 'Ford Model T и триумф движущегося конвейера',
      },
      pioneers: {
        en: 'Henry Ford',
        hy: 'Հենրի Ֆորդ',
        ru: 'Генри Форд',
      },
      location: {
        en: 'Detroit, Michigan, USA',
        hy: 'Դետրոյթ, Միչիգան, ԱՄՆ',
        ru: 'Детройт, Мичиган, США',
      },
      description: {
        en: 'Henry Ford introduced moving assembly line mass production in 1913. Assembly time plunged from 12 hours to 93 minutes, driving car prices down from $850 to under $300, transforming the automobile into an everyday commodity.',
        hy: 'Հենրի Ֆորդը ներդրեց կոնվեյերը: Մեքենայի հավաքման ժամանակը 12 ժամից կրճատվեց մինչև 93 րոպե, իսկ գինը նվազեց $850-ից մինչև $300՝ մեքենան դարձնելով համընդհանուր հասանելի:',
        ru: 'Генри Форд внедрил движущийся сборочный конвейер. Время сборки авто упало с 12 часов до 93 минут, а цена снизилась с $850 до $300, сделав автомобиль доступным для каждого рабочего.',
      },
      highlight: {
        en: 'Reduced assembly time by 87% and established the modern automotive industry.',
        hy: 'Հավաքման ժամանակը կրճատեց 87%-ով և ստեղծեց մասսայական ավտոարդյունաբերությունը:',
        ru: 'Сократил время сборки на 87% и заложил основу массового автопрома.',
      },
      impactBadge: {
        en: 'Mass Production',
        hy: 'Կոնվեյերային հեղափոխություն',
        ru: 'Массовое производство',
      },
    },
    {
      id: 'kettering-starter-ice-dominance',
      year: '1912',
      category: 'both',
      title: {
        en: 'Electric Starter & Fall of Early EVs',
        hy: 'Էլեկտրական ստարտեր և ՆԱՇ-ի գերիշխանություն',
        ru: 'Электрический стартер Чарльза Кеттеринга: победа бензина',
      },
      pioneers: {
        en: 'Charles F. Kettering (Cadillac / Delco)',
        hy: 'Չարլզ Քեթերինգ (Cadillac / Delco)',
        ru: 'Чарльз Кеттеринг (Cadillac / Delco)',
      },
      location: {
        en: 'Dayton, Ohio, USA',
        hy: 'Դեյթոն, Օհայո, ԱՄՆ',
        ru: 'Дейтон, Огайо, США',
      },
      description: {
        en: 'The electric starter eliminated dangerous hand-cranking of gasoline engines. Combined with vast crude oil discoveries in Texas and highway expansions, gasoline ICE cars decisively outcompeted early limited-range battery vehicles for nearly a century.',
        hy: 'Էլեկտրական ստարտերը վերացրեց բենզինային շարժիչը ձեռքով պտտելու վտանգը: Էժան նավթի և մայրուղիների հետ միասին բենզինային մեքենաները գրեթե մեկ դար դուրս մղեցին էլեկտրամոբիլներին:',
        ru: 'Электростартер устранил опасный ручной пуск рукояткой. В сочетании с открытием дешевой нефти в Техасе и строительством шоссе бензиновые авто вытеснили ранние электрокары почти на целый век.',
      },
      highlight: {
        en: 'Overcame the primary barrier that made gasoline engines inaccessible to many.',
        hy: 'Վերացրեց ՆԱՇ շարժիչների հիմնական անհարմարությունը:',
        ru: 'Устранил главное неудобство бензиновых моторов, определив развитие XX века.',
      },
      impactBadge: {
        en: 'Turning Point',
        hy: 'Շրջադարձային պահ',
        ru: 'Переломный момент',
      },
    },
    {
      id: 'eraz-ev-innovation-1970s',
      year: '1970–1978',
      category: 'ev',
      title: {
        en: 'ErAZ Electric Van & Armenian EV Motor Innovation',
        hy: 'ԵրԱԶ էլեկտրաֆուրգոն և հայկական էլեկտրաշարժիչներ',
        ru: 'Электрофургоны ЕрАЗ и ереванские тяговые электромоторы',
      },
      pioneers: {
        en: 'ErAZ (Yerevan Auto Plant) & ArmElektroMash Engineers',
        hy: 'ԵրԱԶ գործարան և «Հայէլեկտրամեքենա»-ի ինժեներներ',
        ru: 'Конструкторы завода ЕрАЗ и инженеры «Армэлектромаш»',
      },
      location: {
        en: 'Yerevan, Armenia',
        hy: 'Երևան, Հայաստան',
        ru: 'Ереван, Армения',
      },
      description: {
        en: 'In Yerevan, Armenia, ErAZ engineers developed experimental electric commercial delivery vans (ErAZ-762VE). Paired with advanced traction motors and thyristor-pulse control from Yerevan research institutes, Armenia pioneered low-emission urban electric transport decades ahead of the global trend.',
        hy: 'Երևանի ավտոգործարանում ստեղծվեցին փորձարարական ԵրԱԶ-762ՎԷ էլեկտրաֆուրգոնները: Երևանի ինստիտուտների ստեղծած թիրիստորային կառավարմամբ և քարշային էլեկտրաշարժիչներով Հայաստանը տասնամյակներով առաջ անցավ էկոլոգիական քաղաքային տրանսպորտում:',
        ru: 'В Ереване на заводе ЕрАЗ были разработаны экспериментальные развозные электрофургоны ЕрАЗ-762ВЭ. С тяговыми электромоторами и тиристорно-импульсным управлением (совместно с институтами Еревана) Армения опередила мировой тренд городской электрификации на десятилетия.',
      },
      highlight: {
        en: 'Armenian engineers built working urban delivery EVs with regenerative braking prototypes.',
        hy: 'Հայ ինժեներները ստեղծեցին քաղաքային աշխատող էլեկտրամեքենաներ՝ ռեկուպերատիվ արգելակմամբ:',
        ru: 'Инженеры создали реальные прототипы городских электрофургонов с рекуперацией энергии.',
      },
      impactBadge: {
        en: 'Armenian Innovation',
        hy: 'Հայկական նորարարություն',
        ru: 'Ереванский прорыв',
      },
    },
    {
      id: 'toyota-prius-hybrid-revolution',
      year: '1997',
      category: 'both',
      title: {
        en: 'Toyota Prius & The Mass Hybrid Revolution',
        hy: 'Toyota Prius և հիբրիդային հեղափոխությունը',
        ru: 'Toyota Prius: Первая в мире массовая гибридная революция',
      },
      pioneers: {
        en: 'Takeshi Uchiyamada & Toyota Motor Corporation',
        hy: 'Տակեշի Ուչիյամադա և Toyota Motor Corporation',
        ru: 'Такэси Утиямада и инженеры Toyota',
      },
      location: {
        en: 'Toyota City, Japan',
        hy: 'Տոյոտա քաղաք, Ճապոնիա',
        ru: 'Тоёта, Япония',
      },
      description: {
        en: 'Toyota launched the first mass-produced hybrid passenger car, coupling an efficient Atkinson-cycle gasoline engine with an electric motor-generator through an innovative planetary power-split device, cutting emissions in half.',
        hy: 'Toyota-ն թողարկեց առաջին մասսայական հիբրիդային ավտոմեքենան, որը համատեղում էր Ատկինսոնի ցիկլով բենզինային շարժիչը և էլեկտրաշարժիչը՝ կրկնակի կրճատելով վառելիքի ծախսն ու արտանետումները:',
        ru: 'Toyota выпустила первый в мире серийный гибрид, объединивший экономичный ДВС цикла Аткинсона и электромотор-генератор через планетарный делитель мощности, снизив расход и выбросы в два раза.',
      },
      highlight: {
        en: 'Over 5 million units sold, proving electrification viability to global buyers.',
        hy: 'Վաճառվեց ավելի քան 5 մլն օրինակ՝ ապացուցելով էլեկտրաֆիկացման հուսալիությունը:',
        ru: 'Продано свыше 5 млн авто, доказавших надежность электротяги обычным водителям.',
      },
      impactBadge: {
        en: 'Hybrid Pioneer',
        hy: 'Հիբրիդի առաջատար',
        ru: 'Гибридный прорыв',
      },
    },
    {
      id: 'tesla-modern-ev-renaissance',
      year: '2008–2012',
      category: 'ev',
      title: {
        en: 'Tesla Roadster & Model S: The Modern EV Renaissance',
        hy: 'Tesla Roadster և Model S: Ժամանակակից EV վերածնունդ',
        ru: 'Tesla Roadster и Model S: Ренессанс современного электрокара',
      },
      pioneers: {
        en: 'Martin Eberhard, Marc Tarpenning, JB Straubel, Elon Musk',
        hy: 'Մարտին Էբերհարդ, Մարկ Տարպենինգ, Ջեյ Բի Ստրաուբել, Իլոն Մասկ',
        ru: 'Мартин Эберхард, Марк Тарпеннинг, Джей Би Штробель, Илон Маск',
      },
      location: {
        en: 'Silicon Valley & Fremont, California, USA',
        hy: 'Սիլիկոնյան հովիտ, Կալիֆոռնիա, ԱՄՆ',
        ru: 'Кремниевая долина, Калифорния, США',
      },
      description: {
        en: 'Utilizing lithium-ion laptop cells, high-torque AC induction motors, and liquid cooling, Tesla proved electric cars could outperform luxury supercars in acceleration, range, software updates, and safety.',
        hy: 'Լիթիում-իոնային մարտկոցների, հզոր էլեկտրաշարժիչների և հեղուկ հովացման շնորհիվ Tesla-ն ապացուցեց, որ էլեկտրամոբիլը կարող է գերազանցել սուպերքարերին արագացմամբ, ինտելեկտով և անվտանգությամբ:',
        ru: 'Используя литий-ионные ячейки, мощные электромоторы и жидкостное термостатирование, Tesla доказала, что электромобиль может превосходить суперкары в динамике, запасе хода и технологиях.',
      },
      highlight: {
        en: 'Accelerated global automaker electrification transitions by 10 to 15 years.',
        hy: 'Արագացրեց համաշխարհային ավտոարտադրության էլեկտրաֆիկացումը 10-15 տարով:',
        ru: 'Ускорила переход мирового автопрома на электричество на 10–15 лет.',
      },
      impactBadge: {
        en: 'EV Revolution',
        hy: 'Էլեկտրական հեղափոխություն',
        ru: 'EV революция',
      },
    },
    {
      id: 'current-ev-scale-era',
      year: '2020s–Present',
      category: 'ev',
      title: {
        en: '800V Architecture, Blade Batteries & Global Scale',
        hy: '800V ճարտարապետություն, Blade մարտկոցներ և համաշխարհային մասշտաբ',
        ru: 'Эра 800V платформ, Blade-батарей и мирового масштаба',
      },
      pioneers: {
        en: 'BYD, Porsche, Hyundai E-GMP, CATL',
        hy: 'BYD, Porsche, Hyundai E-GMP, CATL',
        ru: 'BYD, Porsche, Hyundai E-GMP, CATL',
      },
      location: {
        en: 'Global (China, Europe, Korea, USA)',
        hy: 'Համաշխարհային (Չինաստան, Եվրոպա, Կորեա, ԱՄՆ)',
        ru: 'Глобально (Китай, Европа, Южная Корея, США)',
      },
      description: {
        en: 'Silicon carbide (SiC) inverters, cell-to-body structural batteries, and 800-volt high-speed charging architectures enable 10-to-80% recharges in under 15 minutes. Global EV sales surpassed 20% of all new vehicles.',
        hy: 'Սիլիցիումի կարբիդային (SiC) ինվերտորները, Blade կառուցվածքային մարտկոցները և 800V արագ լիցքավորումը հնարավորություն տվեցին մեքենան լիցքավորել 15 րոպեում: EV-ները գերազանցեցին համաշխարհային վաճառքի 20%-ը:',
        ru: 'Карбидокремниевые (SiC) инверторы, структурные LFP-батареи и 800-вольтовая архитектура позволили заряжать авто за 15 минут, а доля электромобилей в мировых продажах превысила 20%.',
      },
      highlight: {
        en: 'Parity in total cost of ownership achieved across major automotive segments.',
        hy: 'Հասավ ավտոմեքենայի տիրապետման ծախսերի հավասարությանը ՆԱՇ-ի հետ:',
        ru: 'Достигнут паритет стоимости владения с классическими ДВС.',
      },
      impactBadge: {
        en: 'Global Dominance',
        hy: 'Գլոբալ մասշտաբ',
        ru: 'Мировой масштаб',
      },
    },
  ],

  countries: [
    {
      id: 'germany',
      countryName: {
        en: 'Germany',
        hy: 'Գերմանիա',
        ru: 'Германия',
      },
      flag: '🇩🇪',
      coreFocus: {
        en: 'Engineering Precision & Autobahn High-Speed Mastery',
        hy: 'Ինժեներական ճշգրտություն և ավտոբանի բարձր արագություններ',
        ru: 'Инженерная точность и устойчивость на автобане',
      },
      philosophyTitle: {
        en: 'Vorsprung durch Technik: Mechanical Perfection',
        hy: 'Կատարյալ մեխանիկա և բարձր ճշգրտություն',
        ru: 'Механическое совершенство и безопасность на пределе',
      },
      philosophyDescription: {
        en: 'German engineering prioritizes high-speed directional stability on unrestricted Autobahns, rigorous mechanical tolerances, chassis rigidity, and state-of-the-art active safety innovations (ABS, ESP pioneered by Bosch & Mercedes).',
        hy: 'Գերմանական ինժեներիան կենտրոնացած է ավտոբանների վրա գերարագ կայունության, կոշտ շասսիի և ակտիվ անվտանգության համակարգերի (ABS, ESP) կատարելագործման վրա:',
        ru: 'Немецкая школа ставит во главу угла стабильность на безлимитных автобанах при скоростях свыше 200 км/ч, жесткость кузова на кручение, прецизионную механику и инновации безопасности (ABS и ESP созданы здесь совместно с Bosch).',
      },
      famousFor: [
        {
          en: 'Inventing the modern automobile (Benz & Daimler, 1886)',
          hy: 'Ավտոմեքենայի գյուտը (Բենց և Դայմլեր, 1886)',
          ru: 'Изобретение автомобиля (Бенц и Даймлер, 1886)',
        },
        {
          en: 'World-leading luxury, chassis balance, and Autobahn endurance',
          hy: 'Պրեմիում դասի առաջատարություն և հուսալիություն',
          ru: 'Мировой эталон премиум-класса, управляемости и автобанов',
        },
        {
          en: 'Legendary boxer engines (Porsche) and Quattro AWD (Audi)',
          hy: 'Բոքսեր շարժիչներ (Porsche) և Quattro լիաքարշ (Audi)',
          ru: 'Оппозитные моторы (Porsche) и полный привод Quattro (Audi)',
        },
      ],
      iconicBrands: ['Mercedes-Benz', 'BMW', 'Porsche', 'Audi', 'Volkswagen'],
      engineeringHeritage: {
        en: 'Birthplace of both the internal combustion engine (Otto, Diesel, Benz) and pioneering automotive safety systems.',
        hy: 'Ներքին այրման շարժիչի (Օտտո, Դիզել, Բենց) և ավտոանվտանգության հայրենիքը:',
        ru: 'Родина бензинового мотора (Отто, Бенц), дизеля (Рудольф Дизель) и передовой автобезопасности.',
      },
    },
    {
      id: 'japan',
      countryName: {
        en: 'Japan',
        hy: 'Ճապոնիա',
        ru: 'Япония',
      },
      flag: '🇯🇵',
      coreFocus: {
        en: 'Kaizen Reliability, Fuel Efficiency & Hybrid Mastery',
        hy: 'Կայձեն հուսալիություն, խնայողություն և հիբրիդներ',
        ru: 'Философия «Кайдзен», безотказность и гибридные технологии',
      },
      philosophyTitle: {
        en: 'Monozukuri: Relentless Elimination of Waste & Flaws',
        hy: 'Կատարյալ հուսալիություն և ռեսուրսների խնայողություն',
        ru: 'Бережливое производство (TPS) и эталонная долговечность',
      },
      philosophyDescription: {
        en: 'Japanese automakers revolutionized world manufacturing with the Toyota Production System (Lean / TPS). Focus is on microscopic defect prevention, longevity surpassing hundreds of thousands of kilometers, and world dominance in hybrid systems.',
        hy: 'Ճապոնական արտադրողները հեղափոխեցին աշխարհը Toyota Production System (TPS)-ով: Ուշադրությունը դարձվում է անթերի հուսալիությանը, վառելիքի խնայողությանը և հիբրիդային տեխնոլոգիաներին:',
        ru: 'Японские автостроители изменили мир благодаря Toyota Production System (TPS / Lean). Фокус на устранении малейших дефектов, колоссальном ресурсе узлов (500 000+ км) и абсолютном лидерстве в гибридных силовых установках.',
      },
      famousFor: [
        {
          en: 'Unrivaled reliability ratings across global durability tests',
          hy: 'Բացարձակ հուսալիության ցուցանիշներ աշխարհում',
          ru: 'Абсолютное лидерство в мировых рейтингах безотказности',
        },
        {
          en: 'Pioneering mass hybridization (Toyota Hybrid Synergy Drive)',
          hy: 'Զանգվածային հիբրիդացման ստեղծում (Toyota HSD)',
          ru: 'Создание первого в мире серийного гибрида (Toyota HSD)',
        },
        {
          en: 'Iconic sports cars with high-rev VTEC, Boxer AWD & Rotary engines',
          hy: 'VTEC, Boxer լիաքարշ և ռոտորային լեգենդար շարժիչներ',
          ru: 'Оборотистые моторы VTEC, симметричный полный привод и роторные моторы Wankel',
        },
      ],
      iconicBrands: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Lexus'],
      engineeringHeritage: {
        en: 'Creator of the world’s best-selling car in history (Toyota Corolla, over 50 million units sold).',
        hy: 'Պատմության ամենավաճառվող ավտոմեքենայի հայրենիքը (Toyota Corolla, >50 մլն օրինակ):',
        ru: 'Создатели самого продаваемого автомобиля в истории человечества (Toyota Corolla, >50 млн экземпляров).',
      },
    },
    {
      id: 'usa',
      countryName: {
        en: 'United States',
        hy: 'ԱՄՆ',
        ru: 'США',
      },
      flag: '🇺🇸',
      coreFocus: {
        en: 'Mass Automation, V8 Highway Power & Software EV Revolution',
        hy: 'Կոնվեյերային մասսայականություն, հզոր V8 և EV ծրագրային ապահովում',
        ru: 'Массовый конвейер, мощные двигатели V8 и цифровая EV-революция',
      },
      philosophyTitle: {
        en: 'Freedom of the Open Highway & Disruptive Scale',
        hy: 'Մայրուղային հարմարավետություն և հզոր շարժիչներ',
        ru: 'Простор хайвеев, неукротимая тяга и софтверное лидерство',
      },
      philosophyDescription: {
        en: 'American automotive culture is shaped by vast geographic distances, wide highways, and cheap fuel, fostering high-displacement V8 engines, muscular pickups, maximum cabin spaciousness, and the recent software-defined EV movement spearheaded by Tesla.',
        hy: 'Ամերիկյան ավտոմշակույթը ձևավորվել է հսկայական հեռավորություններով և լայն մայրուղիներով՝ առաջ բերելով հզոր V8 շարժիչներ, պիկապներ, ընդարձակ սրահներ և ժամանակակից Tesla ծրագրային հեղափոխությունը:',
        ru: 'Американский автопром рожден бескрайними хайвеями: просторные кузова, легендарные атмосферные V8 (Muscle Cars), сверхпрочные рамные пикапы и новейшая революция софтверных электромобилей и автопилота (Tesla).',
      },
      famousFor: [
        {
          en: 'Invention of the moving assembly line (Ford, 1913)',
          hy: 'Կոնվեյերային արտադրության ներդրում (Ֆորդ, 1913)',
          ru: 'Изобретение движущегося сборочного конвейера (Ford, 1913)',
        },
        {
          en: 'Golden age of Muscle Cars (Mustang, Corvette, Camaro, Charger)',
          hy: 'Լեգենդար Muscle Car-երի դարաշրջան (Mustang, Corvette)',
          ru: 'Эпоха Muscle Cars с ревущими моторами Small-Block / HEMI V8',
        },
        {
          en: 'Modern EV renaissance and over-the-air software cars (Tesla)',
          hy: 'Ժամանակակից EV-ների և ծրագրային թարմացումների առաջատար (Tesla)',
          ru: 'Современный ренессанс электрокаров и обновления по воздуху (Tesla)',
        },
      ],
      iconicBrands: ['Ford', 'Chevrolet', 'Cadillac', 'Dodge', 'Jeep', 'Tesla'],
      engineeringHeritage: {
        en: 'Democratized automobile ownership globally through production-line economies of scale.',
        hy: 'Ավտոմեքենան դարձրեց համաշխարհային մատչելի ապրանք շնորհիվ կոնվեյերի:',
        ru: 'Сделали автомобиль доступным для широких слоев населения во всем мире благодаря конвейеру.',
      },
    },
    {
      id: 'italy',
      countryName: {
        en: 'Italy',
        hy: 'Իտալիա',
        ru: 'Италия',
      },
      flag: '🇮🇹',
      coreFocus: {
        en: 'Passionate Styling, Aerodynamic Art & Supercar Dynamics',
        hy: 'Կրքոտ դիզայն, աերոդինամիկա և սուպերքարերի հզորություն',
        ru: 'Страстный кузовной дизайн, аэродинамика и суперкары',
      },
      philosophyTitle: {
        en: 'La Bella Macchina: Automotive Art Meets Track Glory',
        hy: 'Ավտոմեքենան որպես արվեստի գործ և մրցարշավային կիրք',
        ru: 'Автомобиль как скульптура и триумф Формулы-1',
      },
      philosophyDescription: {
        en: 'Italian automotive engineering treats the automobile as an emotional masterpiece. Italy is home to the world’s greatest design houses (Pininfarina, Bertone, Italdesign) and undisputed masters of high-revving naturally aspirated V12 engines and Formula 1 racing legacy.',
        hy: 'Իտալական ինժեներիան ավտոմեքենային մոտենում է որպես արվեստի գործի: Այստեղ են աշխարհի մեծագույն դիզայներական տները (Pininfarina, Bertone) և Ֆորմուլա 1-ի ու V12 շարժիչների անգերազանցելի վարպետները:',
        ru: 'Итальянская инженерная школа относится к авто как к произведению высокого искусства. Здесь родились величайшие кузовные ателье (Pininfarina, Bertone, Italdesign), ревущие безнаддувные моторы V12 и легенда Scuderia Ferrari в Формуле-1.',
      },
      famousFor: [
        {
          en: 'World’s most iconic exotic supercars (Ferrari, Lamborghini, Pagani)',
          hy: 'Աշխարհի ամենահայտնի սուպերքարերը (Ferrari, Lamborghini)',
          ru: 'Самые желанные и быстрые суперкары планеты (Ferrari, Lamborghini)',
        },
        {
          en: 'Legendary coachbuilders and timeless aesthetic styling',
          hy: 'Լեգենդար դիզայներական ատելյեներ և ոճ',
          ru: 'Кузовной дизайн и непревзойденное эстетическое чутье',
        },
        {
          en: 'Genius compact city vehicles (Classic Fiat 500)',
          hy: 'Հանճարեղ կոմպակտ քաղաքային մեքենաներ (Fiat 500)',
          ru: 'Гениальные компактные городские авто (культовый Fiat 500)',
        },
      ],
      iconicBrands: ['Ferrari', 'Lamborghini', 'Maserati', 'Alfa Romeo', 'Fiat', 'Pagani'],
      engineeringHeritage: {
        en: 'Scuderia Ferrari remains the oldest and most successful racing team in Formula 1 history.',
        hy: 'Ferrari-ն հանդիսանում է Ֆորմուլա 1-ի պատմության ամենահին և տիտղոսակիր թիմը:',
        ru: 'Scuderia Ferrari — старейшая и самая титулованная гоночная команда в истории Formula 1.',
      },
    },
    {
      id: 'united-kingdom',
      countryName: {
        en: 'United Kingdom',
        hy: 'Միացյալ Թագավորություն',
        ru: 'Великобритания',
      },
      flag: '🇬🇧',
      coreFocus: {
        en: 'Aristocratic Bespoke Luxury, Handcrafted Heritage & GT',
        hy: 'Արիստոկրատական շքեղություն, ձեռքի աշխատանք և Grand Tourer',
        ru: 'Аристократическая роскошь, ручная отделка и Grand Tourer',
      },
      philosophyTitle: {
        en: 'Bespoke Craftsmanship & Effortless Power',
        hy: 'Անգերազանցելի հարմարավետություն և ազնվական ոճ',
        ru: 'Индивидуальное мастерство и благородная мощь',
      },
      philosophyDescription: {
        en: 'British automotive design blends royal luxury, Connolly leather, polished walnut veneers, and whisper-quiet V12 powertrains with razor-sharp Formula 1 composite engineering (Motorsport Valley in Oxfordshire).',
        hy: 'Բրիտանական ավտոարտադրությունը միավորում է թագավորական շքեղությունը, բնական կաշին, փայտի նուրբ մշակումը և Ֆորմուլա 1-ի առաջադեմ կոմպոզիտային տեխնոլոգիաները:',
        ru: 'Британская школа сочетает королевский комфорт, ручную обшивку тончайшей кожей, панели из ценных пород дерева, шепот моторов V12 и сверхлегкие карбоновые шасси («Долина автоспорта» вокруг Сильверстоуна).',
      },
      famousFor: [
        {
          en: 'Pinnacle of luxury personal transport (Rolls-Royce, Bentley)',
          hy: 'Շքեղության գագաթնակետը (Rolls-Royce, Bentley)',
          ru: 'Вершина мирового люкса и статуса (Rolls-Royce, Bentley)',
        },
        {
          en: 'Legendary off-road luxury capability (Range Rover)',
          hy: 'Լեգենդար շքեղ ամենագնացներ (Range Rover)',
          ru: 'Культовые аристократические внедорожники (Range Rover)',
        },
        {
          en: 'Supercar aerodynamic composite breakthroughs (McLaren)',
          hy: 'Սուպերքարերի կոմպոզիտային թեթև շասսիներ (McLaren)',
          ru: 'Карбоновые монококи и аэродинамика суперкаров (McLaren)',
        },
      ],
      iconicBrands: ['Rolls-Royce', 'Bentley', 'Aston Martin', 'Land Rover', 'Jaguar', 'McLaren'],
      engineeringHeritage: {
        en: 'Pioneered the carbon-fiber composite monocoque chassis in Formula 1 and production supercars.',
        hy: 'Ֆորմուլա 1-ում և սուպերքարերում առաջինն օգտագործեց ածխածնային (կարբոնե) մոնոկոկը:',
        ru: 'Пионеры применения углепластиковых монококов в автоспорте и серийных гиперкарах.',
      },
    },
    {
      id: 'france',
      countryName: {
        en: 'France',
        hy: 'Ֆրանսիա',
        ru: 'Франция',
      },
      flag: '🇫🇷',
      coreFocus: {
        en: 'Avant-Garde Ride Comfort, Hydropneumatics & Compact Efficiency',
        hy: 'Նորարարական հարմարավետություն, հիդրոպնևմատիկա և կոմպակտություն',
        ru: 'Авангардный комфорт, гидропневматическая подвеска и эргономика',
      },
      philosophyTitle: {
        en: 'L\'Innovation Audacieuse: The "Magic Carpet" Ride',
        hy: 'Համարձակ նորարարություն և անգերազանցելի փափուկ ընթացք',
        ru: 'Смелый авангард и эффект «ковра-самолета»',
      },
      philosophyDescription: {
        en: 'French automotive designers are renowned for daring technical non-conformity. They invented the legendary hydropneumatic self-leveling suspension (Citroën DS), front-wheel-drive mass architecture (Traction Avant), and efficient urban family cars.',
        hy: 'Ֆրանսիացի ինժեներները հայտնի են համարձակ լուծումներով: Նրանք ստեղծեցին ինքնահարթեցվող հիդրոպնևմատիկ կախոցը (Citroën DS), առաջնաքարշ սխեման (Traction Avant) և կոմպակտ հեչբեքերը:',
        ru: 'Французские инженеры всегда шли своим неповторимым путем. Они подарили миру гидропневматическую подвеску («ковер-самолет» Citroën DS), переднеприводную компоновку (Traction Avant) и непревзойденную энергоемкость подвески на плохих дорогах.',
      },
      famousFor: [
        {
          en: 'Hydropneumatic suspension innovation (Citroën DS "Goddess")',
          hy: 'Հիդրոպնևմատիկ կախոցի գյուտը (լեգենդար Citroën DS)',
          ru: 'Изобретение самовыравнивающейся гидропневматики (Citroën DS)',
        },
        {
          en: 'Dominant World Rally Championship (WRC) and Dakar history',
          hy: 'Բազմաթիվ հաղթանակներ WRC ռալլիում և Դակարում',
          ru: 'Многократные триумфы в ралли WRC (Peugeot, Citroën) и марафоне Дакар',
        },
        {
          en: 'Ultra-efficient city cars and hot hatches (Peugeot 205 GTi)',
          hy: 'Գերխնայող քաղաքային հեչբեքեր (Peugeot, Renault)',
          ru: 'Эталонные легкие горячие хэтчбеки с отточенной управляемостью',
        },
      ],
      iconicBrands: ['Citroën', 'Peugeot', 'Renault', 'Alpine', 'Bugatti'],
      engineeringHeritage: {
        en: 'Organized the first motor race in history (Paris-Rouen, 1894).',
        hy: 'Կազմակերպել են ավտոմրցարշավի պատմության առաջին մրցումը (Փարիզ-Ռուան, 1894):',
        ru: 'Организовали первые в истории официальные автогонки (Париж — Руан, 1894).',
      },
    },
    {
      id: 'south-korea',
      countryName: {
        en: 'South Korea',
        hy: 'Հարավային Կորեա',
        ru: 'Южная Корея',
      },
      flag: '🇰🇷',
      coreFocus: {
        en: 'Rapid Technological Leap, 800V EV Architecture & Value Mastery',
        hy: 'Արագ տեխնոլոգիական թռիչք, 800V EV հարթակներ և որակ',
        ru: 'Стремительный технологический рывок, 800V платформы и оснащение',
      },
      philosophyTitle: {
        en: 'Speed of Execution & High-Tech Democratization',
        hy: 'Բարձր տեխնոլոգիաների արագ ներդրում և գերազանց որակ',
        ru: 'Высочайшая скорость инноваций и богатое оснащение',
      },
      philosophyDescription: {
        en: 'South Korea completed in three decades what took other nations a century. Evolving from licensed assembly to world-class design, industry-leading warranties, and cutting-edge 800V modular EV platforms (E-GMP with bidirectional V2L charging).',
        hy: 'Հարավային Կորեան 30 տարում անցավ այն ճանապարհը, ինչ մյուսները՝ 100 տարում: Պարզ հավաքումից հասան համաշխարհային դիզայնի, լավագույն երաշխիքների և 800V արագ լիցքավորվող EV հարթակների:',
        ru: 'Южная Корея прошла за 30 лет путь, на который у других ушел век. От лицензионных копий до мирового топ-3 по продажам, рекордных гарантий, премиум-бренда Genesis и передовой 800-вольтовой платформы E-GMP с двунаправленной зарядкой V2L.',
      },
      famousFor: [
        {
          en: 'World-first mainstream 800V ultra-fast charging platforms (E-GMP)',
          hy: '800V գերարագ լիցքավորման համակարգեր զանգվածային EV-ներում',
          ru: 'Первая массовая 800-вольтовая платформа сверхбыстрой зарядки (E-GMP)',
        },
        {
          en: 'Top rankings in initial quality and comprehensive warranty coverage',
          hy: 'Առաջատար դիրքեր որակի և երկարատև երաշխիքի ոլորտում',
          ru: 'Лидерство в рейтингах первичного качества J.D. Power и заводской гарантии',
        },
        {
          en: 'Rapid rise of Genesis into a bona-fide global luxury contender',
          hy: 'Genesis պրեմիում ապրանքանիշի հաջող մուտքը շուկա',
          ru: 'Успешное создание премиального бренда Genesis мирового уровня',
        },
      ],
      iconicBrands: ['Hyundai', 'Kia', 'Genesis'],
      engineeringHeritage: {
        en: 'Now the third-largest automobile manufacturing conglomerate in the entire world.',
        hy: 'Այժմ հանդիսանում է աշխարհի 3-րդ խոշորագույն ավտոարտադրող խումբը:',
        ru: 'Hyundai-Kia входит в тройку крупнейших автопроизводителей всей планеты.',
      },
    },
    {
      id: 'china',
      countryName: {
        en: 'China',
        hy: 'Չինաստան',
        ru: 'Китай',
      },
      flag: '🇨🇳',
      coreFocus: {
        en: 'Global Production Giant, Battery Supremacy & Software Ecosystems',
        hy: 'Համաշխարհային արտադրության գիգանտ, մարտկոցներ և սմարթ-էկոհամակարգեր',
        ru: 'Мировой гигант автопроизводства, батареи Blade и софт',
      },
      philosophyTitle: {
        en: 'The Speed of Software: Vertical Integration & Battery Scale',
        hy: 'Արագություն, ուղղահայաց ինտեգրում և մարտկոցների հզորություն',
        ru: 'Вертикальная интеграция, доступность и цифровые экосистемы',
      },
      philosophyDescription: {
        en: 'China manufactures over 30 million vehicles per year—one-third of global output. By dominating lithium-iron-phosphate (LFP) battery chemistry, cell-to-body integration, and automotive operating systems, China is the undisputed volume leader of the EV era.',
        hy: 'Չինաստանն արտադրում է տարեկան ավելի քան 30 մլն մեքենա՝ համաշխարհային ծավալի մեկ երրորդը: Տիրապետելով LFP մարտկոցների և սմարթ-սրահների տեխնոլոգիաներին՝ այն գլխավորում է EV դարաշրջանը:',
        ru: 'Китай выпускает более 30 миллионов автомобилей в год — треть всего мирового производства! Благодаря контролю над добычей лития, производству безопасных LFP/Blade-батарей и умным операционным системам Китай стал лидером экспорта электромобилей.',
      },
      famousFor: [
        {
          en: 'World’s #1 vehicle producer and vehicle exporter globally',
          hy: 'Աշխարհի թիվ 1 ավտոարտադրողն ու արտահանողը',
          ru: 'Производитель и экспортер №1 в мире по общему объему автомобилей',
        },
        {
          en: 'Pioneered safe, puncture-proof Blade LFP battery technology (BYD)',
          hy: 'Անվտանգ Blade LFP մարտկոցների ստեղծում (BYD)',
          ru: 'Создание безопасных пластинчатых батарей Blade LFP (BYD)',
        },
        {
          en: 'Smartphone integration and cockpit AI systems (NIO, Xiaomi, Zeekr)',
          hy: 'Սմարթֆոնների և AI-ի ինտեգրում մեքենայի սրահում',
          ru: 'Глубокая интеграция смартфонов, автопилота и умных цифровых салонов',
        },
      ],
      iconicBrands: ['BYD', 'Geely', 'Zeekr', 'NIO', 'XPeng', 'Xiaomi Auto', 'Chery'],
      engineeringHeritage: {
        en: 'Surpassed all other nations in EV adoption, manufacturing more electric cars than the rest of the world combined.',
        hy: 'Արտադրում է ավելի շատ էլեկտրամոբիլ, քան մնացած ամբողջ աշխարհը միասին վերցրած:',
        ru: 'Производит и продает больше электромобилей, чем весь остальной мир вместе взятый.',
      },
    },
  ],

  erazStory: {
    title: {
      en: 'ErAZ (Yerevan Auto Plant): Armenia\'s Automotive & Electric Heritage',
      hy: 'ԵրԱԶ (Երևանի ավտոմոբիլային գործարան). Հայաստանի ավտոմոբիլային և էլեկտրական ժառանգությունը',
      ru: 'ЕрАЗ (Ереванский автозавод): Автомобильное и электрическое наследие Армении',
    },
    subtitle: {
      en: 'From the iconic ErAZ-762 delivery van to visionary electric motor prototypes of the 1970s',
      hy: 'Լեգենդար ԵրԱԶ-762 ֆուրգոնից մինչև 1970-ականների փորձարարական էլեկտրաշարժիչներն ու էլեկտրաֆուրգոնները',
      ru: 'От легендарного фургона ЕрАЗ-762 до передовых ереванских электромобилей 1970-х годов',
    },
    foundedYear: '1964',
    city: {
      en: 'Yerevan, Armenia',
      hy: 'Երևան, Հայաստան',
      ru: 'Ереван, Армения',
    },
    mainModel: 'ErAZ-762 / ErAZ-762VE',
    description: {
      en: 'Established in 1964 by decree of the Armenian SSR Council of Ministers, the Yerevan Automobile Plant (ErAZ) began assembly in 1966. Its cab-over van, the ErAZ-762 (affectionately nicknamed "Erazik" / "Dream"), became one of the most ubiquitous delivery, postal, and emergency service vehicles across the Soviet Union, producing hundreds of thousands of commercial vehicles.',
      hy: 'Հիմնադրվել է 1964 թվականին ՀԽՍՀ Մինիստրների խորհրդի որոշմամբ: 1966-ին արտադրվեցին առաջին ԵրԱԶ-762 ֆուրգոնները: Հայտնի «Երազիկ»-ը դարձավ անփոխարինելի փոստային, շտապօգնության և առևտրային փոխադրամիջոց՝ արտադրվելով հարյուր հազարավոր օրինակներով:',
      ru: 'Основанный в 1964 году постановлением Совета Министров Армянской ССР, Ереванский автомобильный завод начал выпуск в 1966 году. Фургон бескапотной компоновки ЕрАЗ-762 (ласково прозванный «Еразик», от арм. «ераз» — мечта) стал незаменимым развозным, почтовым и медицинским автомобилем, выпущенным тиражом в сотни тысяч экземпляров.',
    },
    evInnovationTitle: {
      en: 'Armenia\'s 1970s Electric Vehicle Program & Traction Motors',
      hy: 'Հայաստանի 1970-ականների էլեկտրամոբիլային ծրագիրը և քարշային էլեկտրաշարժիչները',
      ru: 'Ереванский прорыв 1970-х: Электрофургоны и тяговые электродвигатели',
    },
    evInnovationStory: {
      en: 'Few know that in the 1970s, Yerevan was a premier center for Soviet electric vehicle experimentation. Engineers at ErAZ created the ErAZ-762VE electric van. In collaboration with the famous Yerevan plant "ArmElektroMash" and the All-Union Research Institute of Electric Vehicles (VNIIETO), Armenian scientists built specialized DC traction motors and thyristor-pulse speed controllers that eliminated mechanical clutch wear and enabled early regenerative braking.',
      hy: 'Քչերը գիտեն, որ 1970-ականներին Երևանը հանդիսանում էր էլեկտրամոբիլների ստեղծման գլխավոր կենտրոններից մեկը: ԵրԱԶ-ի կոնստրուկտորները մշակեցին ԵրԱԶ-762ՎԷ էլեկտրաֆուրգոնը: Երևանի «Հայէլեկտրամեքենա» գործարանի և գիտահետազոտական ինստիտուտների հետ համատեղ ստեղծվեցին հատուկ քարշային էլեկտրաշարժիչներ և թիրիստորային կառավարման համակարգեր:',
      ru: 'Мало кто знает, что в 1970-х годах Ереван был одним из передовых центров разработки советского электротранспорта. Конструкторы завода ЕрАЗ разработали опытный электрический фургон ЕрАЗ-762ВЭ. В тесном сотрудничестве с флагманом электротехники заводом «Армэлектромаш» и институтом ВНИИЭТО армянские инженеры спроектировали тяговые электродвигатели постоянного тока и тиристорно-импульсную систему регулирования скорости без механического сцепления.',
    },
    technicalHighlights: [
      {
        label: {
          en: 'Underfloor Battery Placement',
          hy: 'Մարտկոցների տեղադրում հատակի տակ',
          ru: 'Батарейный блок под полом',
        },
        detail: {
          en: 'Traction lead-acid battery packs were installed between the frame rails below cargo floor, lowering the vehicle center of gravity—a concept echoed in modern EV "skateboard" architecture.',
          hy: 'Մարտկոցները տեղադրված էին բեռնախցիկի հատակի տակ՝ ապահովելով ծանրության ցածր կենտրոն (ինչպես ժամանակակից skateboard հարթակներում):',
          ru: 'Тяговые батареи размещались в базе под полом кузова, обеспечивая низкий центр тяжести — принцип, используемый сегодня в современных платформах-скейтбордах.',
        },
      },
      {
        label: {
          en: 'ArmElektroMash Traction Motor',
          hy: '«Հայէլեկտրամեքենա» քարշային շարժիչ',
          ru: 'Тяговый электромотор «Армэлектромаш»',
        },
        detail: {
          en: 'Custom-wound DC traction electric motor developed in Yerevan, delivering high low-end torque for stop-and-go city delivery duty cycles without engine idle emissions.',
          hy: 'Երևանում նախագծված քարշային էլեկտրաշարժիչը քաղաքային առաքումների ժամանակ ապահովում էր հզոր ոլորող մոմենտ՝ առանց արտանետումների:',
          ru: 'Специальный тяговый электродвигатель постоянного тока ереванской разработки обеспечивал максимальный крутящий момент с нулевых оборотов для городских развозных маршрутов.',
        },
      },
      {
        label: {
          en: 'Thyristor-Pulse Smooth Control',
          hy: 'Թիրիստորա-իմպուլսային հարթ կառավարում',
          ru: 'Тиристорно-импульсное управление',
        },
        detail: {
          en: 'State-of-the-art solid-state thyristor power electronics enabled step-free speed modulation and experimental energy recovery during braking.',
          hy: 'Կիսահաղորդչային թիրիստորային բլոկը ապահովում էր արագության սահուն փոփոխություն և էներգիայի վերականգնում (ռեկուպերացիա) արգելակելիս:',
          ru: 'Передовая полупроводниковая тиристорная схема обеспечивала плавное бесступенчатое регулирование оборотов и рекуперативное подтормаживание.',
        },
      },
      {
        label: {
          en: 'Urban Clean Air Trial',
          hy: 'Քաղաքային փորձարկումներ',
          ru: 'Городские испытания без выхлопа',
        },
        detail: {
          en: 'Trial fleets operated routes in Yerevan and Moscow delivering fresh bakery and dairy goods cleanly and quietly before dawn.',
          hy: 'Փորձնական էլեկտրաֆուրգոնները հաջողությամբ առաքում էին թարմ հաց և կաթնամթերք Երևանում և Մոսկվայում՝ առանց աղմուկի և ծխի:',
          ru: 'Опытные партии электрофургонов доставляли хлеб и продукты в Ереване и Москве, не создавая шума и загазованности в утренние часы.',
        },
      },
    ],
    historicalLegacy: {
      en: 'The Yerevan automotive story proves Armenia had deep roots in power electronics and electric motor engineering, foreshadowing the 21st-century global automotive transition to electromobility.',
      hy: 'ԵրԱԶ-ի պատմությունը ապացուցում է, որ Հայաստանը դեռ 50 տարի առաջ առաջատար գիտական ներուժ ուներ էլեկտրաշարժիչների և ուժային էլեկտրոնիկայի ոլորտում:',
      ru: 'История ЕрАЗа и института ВНИИЭТО наглядно подтверждает, что в Армении еще полвека назад существовала мощная инженерная школа тягового электропривода, предвосхитившая современный бум электротранспорта.',
    },
  },

  statistics: {
    annualProductionLeaders: [
      {
        country: { en: 'China', hy: 'Չինաստան', ru: 'Китай' },
        flag: '🇨🇳',
        annualVolume: '30.2M',
        sharePercent: 32.5,
        topBrands: 'BYD, Geely, SAIC, Chery, Changan',
        specialization: {
          en: 'Global manufacturing scale, LFP Blade batteries, rapid tech iteration',
          hy: 'Համաշխարհային մասշտաբ, LFP մարտկոցներ, արագ զարգացում',
          ru: 'Мировой гигант производства, LFP Blade батареи, быстрая смена моделей',
        },
      },
      {
        country: { en: 'United States', hy: 'ԱՄՆ', ru: 'США' },
        flag: '🇺🇸',
        annualVolume: '10.6M',
        sharePercent: 11.4,
        topBrands: 'Ford, GM (Chevrolet/Cadillac), Tesla, Stellantis US',
        specialization: {
          en: 'Pickups, luxury SUVs, muscle cars, software-defined EVs',
          hy: 'Պիկապներ, շքեղ ամենագնացներ, Tesla ծրագրային ապահովում',
          ru: 'Пикапы, рамные внедорожники, V8 Muscle Cars, софтверные EV (Tesla)',
        },
      },
      {
        country: { en: 'Japan', hy: 'Ճապոնիա', ru: 'Япония' },
        flag: '🇯🇵',
        annualVolume: '9.0M',
        sharePercent: 9.7,
        topBrands: 'Toyota, Honda, Nissan, Suzuki, Mazda, Subaru',
        specialization: {
          en: 'Unmatched durability (Kaizen/TPS), hybrid drivetrains, compact kei-cars',
          hy: 'Կայձեն հուսալիություն, հիբրիդային համակարգեր, կոմպակտ քեյ-քարեր',
          ru: 'Бережливое производство TPS, абсолютная надежность, гибриды',
        },
      },
      {
        country: { en: 'India', hy: 'Հնդկաստան', ru: 'Индия' },
        flag: '🇮🇳',
        annualVolume: '5.8M',
        sharePercent: 6.2,
        topBrands: 'Maruti Suzuki, Tata Motors, Mahindra, Hyundai India',
        specialization: {
          en: 'Ultra-cost-efficient compact cars, rugged SUVs, fast-growing domestic market',
          hy: 'Մատչելի կոմպակտ մեքենաներ, ամենագնացներ, արագ աճող շուկա',
          ru: 'Доступные компактные авто, выносливые внедорожники, взрывной рост',
        },
      },
      {
        country: { en: 'South Korea', hy: 'Հարավային Կորեա', ru: 'Южная Корея' },
        flag: '🇰🇷',
        annualVolume: '4.2M',
        sharePercent: 4.5,
        topBrands: 'Hyundai, Kia, Genesis',
        specialization: {
          en: '800V E-GMP platform, modern styling, class-leading electronics and warranty',
          hy: '800V E-GMP հարթակ, առաջադեմ էլեկտրոնիկա և երաշխիքներ',
          ru: '800V платформы E-GMP, передовой дизайн, оснащение и высокая надежность',
        },
      },
      {
        country: { en: 'Germany', hy: 'Գերմանիա', ru: 'Германия' },
        flag: '🇩🇪',
        annualVolume: '4.1M',
        sharePercent: 4.4,
        topBrands: 'Volkswagen Group, BMW Group, Mercedes-Benz, Porsche',
        specialization: {
          en: 'Autobahn high-speed dynamics, premium luxury, complex powertrain engineering',
          hy: 'Ավտոբանի արագություններ, պրեմիում դաս, բարձր ինժեներիա',
          ru: 'Премиум-класс, эталонная управляемость на автобане, сложное моторостроение',
        },
      },
      {
        country: { en: 'Mexico', hy: 'Մեքսիկա', ru: 'Мексика' },
        flag: '🇲🇽',
        annualVolume: '4.0M',
        sharePercent: 4.3,
        topBrands: 'GM, Nissan, Stellantis, Ford, VW Mexico',
        specialization: {
          en: 'Major North American assembly and powertrain export powerhouse',
          hy: 'Հյուսիսային Ամերիկայի խոշորագույն հավաքման և արտահանման կենտրոն',
          ru: 'Крупнейший центр сборки и экспорта силовых агрегатов в Северной Америке',
        },
      },
    ],

    topManufacturers: [
      {
        rank: 1,
        name: 'Toyota Motor Corporation',
        annualSales: '11.2M',
        headquarters: 'Toyota City, Japan',
        flag: '🇯🇵',
        notableBrands: ['Toyota', 'Lexus', 'Daihatsu', 'Hino'],
        keyStrength: {
          en: 'TPS lean manufacturing, benchmark durability, hybrid leadership',
          hy: 'TPS արտադրություն, բացարձակ հուսալիություն, հիբրիդների առաջատար',
          ru: 'Система TPS, эталонный ресурс узлов, мировое лидерство в гибридах',
        },
      },
      {
        rank: 2,
        name: 'Volkswagen Group',
        annualSales: '9.2M',
        headquarters: 'Wolfsburg, Germany',
        flag: '🇩🇪',
        notableBrands: ['Volkswagen', 'Audi', 'Porsche', 'Škoda', 'SEAT', 'Bentley', 'Lamborghini'],
        keyStrength: {
          en: 'Modular platform strategy (MQB / MEB), broad market spectrum from city cars to hypercars',
          hy: 'Մոդուլային հարթակներ (MQB/MEB), քաղաքային մեքենաներից մինչև հիպերքարեր',
          ru: 'Модульные платформы MQB/MEB/PPE, спектр от народных авто до гиперкаров',
        },
      },
      {
        rank: 3,
        name: 'Hyundai Motor Group',
        annualSales: '7.3M',
        headquarters: 'Seoul, South Korea',
        flag: '🇰🇷',
        notableBrands: ['Hyundai', 'Kia', 'Genesis'],
        keyStrength: {
          en: 'Bold design, 800V E-GMP EV platform, exceptional value-for-money and warranty',
          hy: 'Համարձակ դիզայն, 800V E-GMP հարթակ, բարձր որակ և երաշխիքներ',
          ru: 'Смелый дизайн, 800V платформа E-GMP, лучшее соотношение цены и оснащения',
        },
      },
      {
        rank: 4,
        name: 'Stellantis N.V.',
        annualSales: '6.4M',
        headquarters: 'Amsterdam, Netherlands (Multinational)',
        flag: '🇪🇺',
        notableBrands: ['Peugeot', 'Jeep', 'Fiat', 'Ram', 'Citroën', 'Alfa Romeo', 'Dodge', 'Maserati'],
        keyStrength: {
          en: 'Deep transatlantic brand portfolio, rugged 4x4 trucks and European urban efficiency',
          hy: 'Տրանսատլանտյան բրենդներ, 4x4 պիկապներ և եվրոպական քաղաքային մեքենաներ',
          ru: 'Глобальный портфель брендов: от американских пикапов 4x4 до европейских компактов',
        },
      },
      {
        rank: 5,
        name: 'General Motors',
        annualSales: '6.2M',
        headquarters: 'Detroit, Michigan, USA',
        flag: '🇺🇸',
        notableBrands: ['Chevrolet', 'GMC', 'Cadillac', 'Buick'],
        keyStrength: {
          en: 'High-margin full-size trucks, Ultium modular EV battery platform, iconic Corvette sports car',
          hy: 'Լիաչափ պիկապներ, Ultium մոդուլային մարտկոցներ, լեգենդար Corvette',
          ru: 'Рамные пикапы и внедорожники, модульная платформа Ultium, культовый Corvette',
        },
      },
      {
        rank: 6,
        name: 'BYD Group',
        annualSales: '3.6M',
        headquarters: 'Shenzhen, China',
        flag: '🇨🇳',
        notableBrands: ['BYD (Dynasty & Ocean Series)', 'Denza', 'Yangwang', 'Fangchengbao'],
        keyStrength: {
          en: '100% electrified lineup, in-house Blade LFP battery production, unmatched cost efficiency',
          hy: 'Ամբողջությամբ էլեկտրաֆիկացված շարք, Blade LFP մարտկոցների սեփական արտադրություն',
          ru: 'Полностью электрифицированный ряд (EV+DM-i PHEV), батареи Blade LFP, феноменальный рост',
        },
      },
    ],

    productionMilestones: [
      {
        year: '1900',
        globalOutput: '~10,000',
        evShare: '38%',
        keyTrend: {
          en: 'Bespoke handcrafting; steam and electric cars lead over early crank-started gasoline',
          hy: 'Ձեռքի աշխատանք. գոլորշու և էլեկտրական մեքենաները գերազանցում են բենզինայինին',
          ru: 'Ручная штучная сборка; паровые и электрические авто превосходят бензиновые',
        },
      },
      {
        year: '1950',
        globalOutput: '10,500,000',
        evShare: '<0.1%',
        keyTrend: {
          en: 'Post-war boom; American Big Three dominate with over 75% of global motor production',
          hy: 'Հետպատերազմյան վերելք. ԱՄՆ-ն արտադրում է համաշխարհային մեքենաների 75%-ը',
          ru: 'Послевоенный бум; «Большая тройка» США производит более 75% всех авто мира',
        },
      },
      {
        year: '1980',
        globalOutput: '38,500,000',
        evShare: '<0.1%',
        keyTrend: {
          en: 'Oil crises trigger dramatic rise of fuel-efficient Japanese compact cars and front-wheel drive',
          hy: 'Նավթային ճգնաժամերը խթանում են ճապոնական խնայող մեքենաների վերելքը',
          ru: 'Нефтяные кризисы вызывают стремительный взлет экономичных японских авто',
        },
      },
      {
        year: '2000',
        globalOutput: '58,300,000',
        evShare: '0.1%',
        keyTrend: {
          en: 'Global platform sharing; debut of production hybrids (Prius) and common-rail direct diesel',
          hy: 'Գլոբալ հարթակների կիրառում, առաջին հիբրիդների մուտքը շուկա',
          ru: 'Глобализация платформ, появление серийных гибридов и дизелей Common-Rail',
        },
      },
      {
        year: '2024–2026',
        globalOutput: '93,000,000+',
        evShare: '22–25%',
        keyTrend: {
          en: 'China produces 1-in-3 global vehicles; rapid electrification, SiC inverters & software-defined cars',
          hy: 'Չինաստանն արտադրում է յուրաքանչյուր 3-րդ մեքենան. էլեկտրաֆիկացման գլոբալ թռիչք',
          ru: 'Китай производит каждый 3-й автомобиль в мире; доля EV превысила 22%, кремний-карбидные инверторы',
        },
      },
    ],

    evGrowthTrend: [
      { year: '2015', share: 0.7, label: '0.7%' },
      { year: '2017', share: 1.4, label: '1.4%' },
      { year: '2019', share: 2.6, label: '2.6%' },
      { year: '2021', share: 8.3, label: '8.3%' },
      { year: '2023', share: 18.0, label: '18.0%' },
      { year: '2025/2026', share: 24.5, label: '~24.5%' },
    ],
  },
};
