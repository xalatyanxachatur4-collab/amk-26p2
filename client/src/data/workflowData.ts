import { LocalizedString, PowertrainType } from '../types/automotive.js';

export interface WorkflowNode {
  id: string;
  name: LocalizedString;
  category: 'energy' | 'powertrain' | 'drivetrain' | 'chassis' | 'control' | 'auxiliary';
  description: LocalizedString;
  energyType: 'chemical' | 'electrical' | 'mechanical' | 'hydraulic' | 'frictional';
  x: number;
  y: number;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label: LocalizedString;
  flowType: 'power' | 'control' | 'feedback' | 'regeneration';
}

export interface PowertrainWorkflow {
  type: PowertrainType;
  title: LocalizedString;
  description: LocalizedString;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export const workflows: Record<PowertrainType, PowertrainWorkflow> = {
  ice: {
    type: 'ice',
    title: {
      en: 'Conventional Internal Combustion Engine (ICE)',
      hy: 'Ներքին այրման շարժիչով ավտոմեքենա (ՆԱՇ)',
      ru: 'Классический автомобиль с ДВС',
    },
    description: {
      en: 'Hydrocarbon chemical potential energy is converted into thermodynamic pressure and rotational torque, multiplied by a multi-speed transmission, distributed by differential bevel gears, and transformed into vehicle momentum at the tire contact patch.',
      hy: 'Վառելիքի քիմիական էներգիան վերածվում է ճնշման և ոլորող մոմենտի, բազմապատկվում փոխանցման տուփով, բաշխվում դիֆերենցիալով և անվադողի միջոցով շարժում մեքենան:',
      ru: 'Химическая энергия бензина/дизеля превращается в давление газов и крутящий момент, умножается в КПП и передается через дифференциал на колеса.',
    },
    nodes: [
      {
        id: 'fuel-tank',
        name: { en: 'Fuel Tank & Delivery', hy: 'Վառելիքի բաք և պոմպ', ru: 'Топливный бак и насос' },
        category: 'energy',
        description: { en: 'Stores liquid hydrocarbon chemical potential energy (gasoline/diesel).', hy: 'Պահպանում է վառելիքի քիմիական էներգիան:', ru: 'Хранилище жидкого углеводородного топлива.' },
        energyType: 'chemical',
        x: 60,
        y: 180,
      },
      {
        id: 'engine-block',
        name: { en: '4-Stroke Engine', hy: 'ՆԱՇ Շարժիչ', ru: 'ДВС (двигатель)' },
        category: 'powertrain',
        description: { en: 'Converts chemical deflagration into mechanical rotational torque.', hy: 'Վառելիքի այրումը վերածում է պտտական մեխանիկական մոմենտի:', ru: 'Преобразует сгорание топлива во вращение коленвала.' },
        energyType: 'mechanical',
        x: 230,
        y: 180,
      },
      {
        id: 'transmission-box',
        name: { en: 'Multi-Speed Gearbox', hy: 'Փոխանցման տուփ', ru: 'Коробка передач' },
        category: 'drivetrain',
        description: { en: 'Multiplies torque and adapts engine RPM to road speed.', hy: 'Բազմապատկում է ոլորող մոմենտը և համապատասխանեցնում արագությունը:', ru: 'Изменяет передаточные числа для умножения момента.' },
        energyType: 'mechanical',
        x: 410,
        y: 180,
      },
      {
        id: 'differential-unit',
        name: { en: 'Differential & Axles', hy: 'Դիֆերենցիալ և Կիսալիսեռներ', ru: 'Дифференциал и полуоси' },
        category: 'drivetrain',
        description: { en: 'Distributes torque equally while accommodating cornering speed deltas.', hy: 'Քարշուժը բաշխում է անիվներին՝ թույլ տալով տարբեր արագություններ:', ru: 'Передает момент на колеса с разной угловой скоростью.' },
        energyType: 'mechanical',
        x: 590,
        y: 180,
      },
      {
        id: 'drive-wheels',
        name: { en: 'Drive Wheels & Tires', hy: 'Տանող անիվներ և Անվադողեր', ru: 'Ведущие колеса и шины' },
        category: 'chassis',
        description: { en: 'Generates longitudinal tractive friction and lateral cornering forces against pavement.', hy: 'Ապահովում է շփումը ճանապարհի հետ և մեքենան առաջ մղում:', ru: 'Реализуют сцепление с асфальтом и толкают автомобиль вперед.' },
        energyType: 'frictional',
        x: 770,
        y: 180,
      },
      {
        id: 'ecu-unit',
        name: { en: 'Engine Control Unit (ECU)', hy: 'Շարժիչի ԷԿՈՒ', ru: 'ЭБУ двигателя' },
        category: 'control',
        description: { en: 'Calculates closed-loop fuel injector pulse widths and ignition timing.', hy: 'Կառավարում է վառելիքի ճշգրիտ ներարկումը և կայծը:', ru: 'Управляет впрыском и зажиганием в реальном времени.' },
        energyType: 'electrical',
        x: 230,
        y: 40,
      },
      {
        id: 'cooling-system',
        name: { en: 'Radiator & Cooling', hy: 'Հովացման համակարգ', ru: 'Система охлаждения' },
        category: 'auxiliary',
        description: { en: 'Regulates engine block operating temperature to ~90°C via ethylene-glycol circulation.', hy: 'Պահպանում է շարժիչի աշխատանքային ջերմաստիճանը (մոտ 90°C):', ru: 'Поддерживает рабочую температуру мотора ~90°C.' },
        energyType: 'hydraulic',
        x: 230,
        y: 310,
      },
    ],
    edges: [
      { from: 'fuel-tank', to: 'engine-block', label: { en: 'High-Pressure Fuel Supply', hy: 'Վառելիքի մատակարարում', ru: 'Подача топлива под давлением' }, flowType: 'power' },
      { from: 'engine-block', to: 'transmission-box', label: { en: 'Flywheel Rotational Torque', hy: 'Թափանիվի պտտող մոմենտ', ru: 'Крутящий момент маховика' }, flowType: 'power' },
      { from: 'transmission-box', to: 'differential-unit', label: { en: 'Multiplied Drive Torque', hy: 'Բազմապատկված քարշուժ', ru: 'Трансформированный момент' }, flowType: 'power' },
      { from: 'differential-unit', to: 'drive-wheels', label: { en: 'Half-Shaft Torque Output', hy: 'Կիսալիսեռների մոմենտ', ru: 'Тяга на полуосях' }, flowType: 'power' },
      { from: 'ecu-unit', to: 'engine-block', label: { en: 'Injector & Spark Command', hy: 'Կառավարման ազդանշան', ru: 'Импульсы форсунок и искра' }, flowType: 'control' },
      { from: 'engine-block', to: 'cooling-system', label: { en: 'Thermal Convection Loop', hy: 'Ջերմափոխանակություն', ru: 'Отвод тепла антифризом' }, flowType: 'power' },
    ],
  },
  hybrid: {
    type: 'hybrid',
    title: {
      en: 'Hybrid Powertrain (Series-Parallel Synergy)',
      hy: 'Հիբրիդային շարժահամակարգ (ՆԱՇ + Էլեկտրաշարժիչ)',
      ru: 'Гибридная силовая установка (ДВС + Электропривод)',
    },
    description: {
      en: 'Combines an ultra-efficient Atkinson-cycle gasoline engine with dual electric motor-generators and an epicyclic power split device, seamlessly blending electric launch torque with sustained gasoline efficiency and regenerative braking recovery.',
      hy: 'Միավորում է Ատկինսոնի ցիկլով բենզինային շարժիչը, էլեկտրական շարժիչ-գեներատորները և էներգիայի ռեգեներատիվ վերականգնումը:',
      ru: 'Объединяет бензиновый двигатель цикла Аткинсона, тяговые электромоторы и планетарный делитель мощности с рекуперацией энергии при торможении.',
    },
    nodes: [
      {
        id: 'hv-battery',
        name: { en: 'High-Voltage Hybrid Battery', hy: 'Բարձրավոլտ հիբրիդային մարտկոց', ru: 'Высоковольтная батарея' },
        category: 'energy',
        description: { en: 'Lithium-ion/NiMH buffer storing electrical energy.', hy: 'Էլեկտրաէներգիայի կուտակիչ:', ru: 'Накопитель электроэнергии для тяги.' },
        energyType: 'electrical',
        x: 60,
        y: 80,
      },
      {
        id: 'fuel-ice',
        name: { en: 'Gasoline Engine (Atkinson)', hy: 'Բենզինային շարժիչ (Ատկինսոն)', ru: 'Бензиновый мотор (цикл Аткинсона)' },
        category: 'powertrain',
        description: { en: 'Provides high-efficiency cruise power and charges battery via generator.', hy: 'Ապահովում է հիմնական քարշուժը և լիցքավորում մարտկոցը:', ru: 'Обеспечивает крейсерскую тягу и привод генератора.' },
        energyType: 'mechanical',
        x: 60,
        y: 260,
      },
      {
        id: 'inverter-unit',
        name: { en: 'Power Electronics Inverter', hy: 'Ուժային ինվերտոր', ru: 'Инвертор силовой электроники' },
        category: 'control',
        description: { en: 'Regulates bidirectional DC/AC power flow and motor torque.', hy: 'Կառավարում է հոսանքի երկկողմանի հոսքը մարտկոցի և շարժիչների միջև:', ru: 'Управляет двунаправленным потоком энергии DC/AC.' },
        energyType: 'electrical',
        x: 270,
        y: 80,
      },
      {
        id: 'power-split',
        name: { en: 'Planetary Power Split Device', hy: 'Մոլորակային բաշխիչ մեխանիզմ', ru: 'Планетарный делитель мощности' },
        category: 'drivetrain',
        description: { en: 'Continuously blends engine power and electric motor torque without physical step gears.', hy: 'Անընդհատ միաձուլում է շարժիչի և էլեկտրաշարժիչի պտտող մոմենտները:', ru: 'Бесступенчато объединяет тягу ДВС и электромотора.' },
        energyType: 'mechanical',
        x: 270,
        y: 260,
      },
      {
        id: 'final-drive',
        name: { en: 'Differential & Half-Shafts', hy: 'Դիֆերենցիալ և Լիսեռներ', ru: 'Дифференциал и приводы' },
        category: 'drivetrain',
        description: { en: 'Directs unified hybrid drive torque to wheels.', hy: 'Համակցված քարշուժը փոխանցում է անիվներին:', ru: 'Передает суммарный крутящий момент на колеса.' },
        energyType: 'mechanical',
        x: 520,
        y: 180,
      },
      {
        id: 'hybrid-wheels',
        name: { en: 'Road Wheels & Tires', hy: 'Անիվներ և Ռեգեներացիա', ru: 'Колеса и рекуперация' },
        category: 'chassis',
        description: { en: 'Propels car forward; drives motor in reverse during deceleration to recover electricity.', hy: 'Առաջ է մղում մեքենան, իսկ արգելակելիս վերականգնում է էներգիան:', ru: 'Движут автомобиль вперед и возвращают энергию при торможении.' },
        energyType: 'frictional',
        x: 750,
        y: 180,
      },
    ],
    edges: [
      { from: 'hv-battery', to: 'inverter-unit', label: { en: 'DC Current Discharge', hy: 'Մարտկոցի հոսանք', ru: 'Разряд постоянным током' }, flowType: 'power' },
      { from: 'inverter-unit', to: 'power-split', label: { en: '3-Phase AC Electric Drive', hy: 'Էլեկտրական քարշ', ru: 'Трехфазная электротяга' }, flowType: 'power' },
      { from: 'fuel-ice', to: 'power-split', label: { en: 'Combustion Mechanical Torque', hy: 'Շարժիչի մեխանիկական մոմենտ', ru: 'Тяга двигателя ДВС' }, flowType: 'power' },
      { from: 'power-split', to: 'final-drive', label: { en: 'Synergistic Output Torque', hy: 'Համակցված ոլորող մոմենտ', ru: 'Суммарный крутящий момент' }, flowType: 'power' },
      { from: 'final-drive', to: 'hybrid-wheels', label: { en: 'Tractive Driving Effort', hy: 'Քարշուժ անիվներին', ru: 'Тяговое усилие на колеса' }, flowType: 'power' },
      { from: 'hybrid-wheels', to: 'inverter-unit', label: { en: 'Regenerative Braking Deceleration', hy: 'Ռեգեներատիվ արգելակում', ru: 'Рекуперация при торможении' }, flowType: 'regeneration' },
      { from: 'inverter-unit', to: 'hv-battery', label: { en: 'Battery Fast Recharge Flow', hy: 'Մարտկոցի լիցքավորում', ru: 'Подзарядка батареи' }, flowType: 'regeneration' },
    ],
  },
  ev: {
    type: 'ev',
    title: {
      en: 'Battery Electric Vehicle (BEV)',
      hy: 'Մաքուր Էլեկտրամոբիլ (BEV)',
      ru: 'Чистый электромобиль (BEV)',
    },
    description: {
      en: 'Eliminates internal combustion entirely. High-voltage lithium-ion pack delivers massive DC electrical power to a Silicon-Carbide inverter, spinning synchronous AC traction motors through a compact single-speed reduction transmission.',
      hy: 'Ամբողջությամբ էլեկտրական. 400V-800V բարձրավոլտ մարտկոցը սնուցում է ինվերտորը և էլեկտրաշարժիչը՝ առանց բազմափոխանցում տուփի անհրաժեշտության:',
      ru: 'Полный отказ от ДВС. Высоковольтная тяговая батарея отдает ток инвертору, который питает тяговый электромотор с одноступенчатым редуктором.',
    },
    nodes: [
      {
        id: 'bev-battery',
        name: { en: '400V/800V Traction Battery Pack', hy: '400V/800V Քարշային մարտկոց', ru: 'Тяговая батарея 400В/800В' },
        category: 'energy',
        description: { en: 'Liquid-cooled lithium-ion cells with Battery Management System (BMS).', hy: 'Հեղուկով հովացվող մարտկոցի բլոկ՝ BMS կառավարմամբ:', ru: 'Литий-ионная батарея с жидкостным охлаждением и BMS.' },
        energyType: 'electrical',
        x: 60,
        y: 180,
      },
      {
        id: 'bev-inverter',
        name: { en: 'Traction Inverter & VCU', hy: 'Ուժային ինվերտոր և VCU', ru: 'Тяговый инвертор (SiC)' },
        category: 'control',
        description: { en: 'Inverts DC to variable AC with sub-millisecond throttle response.', hy: 'Փոխակերպում է հոսանքը ակնթարթային ճշգրտությամբ:', ru: 'Преобразует постоянный ток в трехфазный переменный.' },
        energyType: 'electrical',
        x: 270,
        y: 180,
      },
      {
        id: 'bev-motor',
        name: { en: 'Permanent Magnet AC Motor', hy: 'Սինխրոն էլեկտրաշարժիչ', ru: 'Тяговый электромотор' },
        category: 'powertrain',
        description: { en: 'Produces instantaneous peak torque from zero RPM up to 18,000 RPM.', hy: 'Ապահովում է առավելագույն մոմենտ 0-ից մինչև 18,000 պտ/րոպ:', ru: 'Развивает максимальную тягу с 0 об/мин до 18 000 об/мин.' },
        energyType: 'mechanical',
        x: 480,
        y: 180,
      },
      {
        id: 'bev-gearbox',
        name: { en: 'Single-Speed Reduction Gearbox', hy: 'Միափոխանցում ռեդուկտոր', ru: 'Одноступенчатый редуктор' },
        category: 'drivetrain',
        description: { en: 'Fixed gear reduction ratio (~9:1) multiplying motor torque without gear changes.', hy: 'Հաստատուն փոխանցման թվով ռեդուկտոր (~9:1):', ru: 'Фиксированный редуктор с коэффициентом замедления ~9:1.' },
        energyType: 'mechanical',
        x: 660,
        y: 180,
      },
      {
        id: 'bev-wheels',
        name: { en: 'Drive Wheels & Regenerative Drag', hy: 'Անիվներ և Ռեգեներացիա', ru: 'Колеса и рекуперация' },
        category: 'chassis',
        description: { en: 'Transfers torque to asphalt; acts as kinetic generator during one-pedal driving.', hy: 'Մեքենան առաջ է տանում, իսկ դանդաղելիս վերալիցքավորում է մարտկոցը:', ru: 'Движут автомобиль и обеспечивают режим управления в одну педаль.' },
        energyType: 'frictional',
        x: 850,
        y: 180,
      },
    ],
    edges: [
      { from: 'bev-battery', to: 'bev-inverter', label: { en: 'High-Voltage DC (400V/800V)', hy: 'Բարձրավոլտ հաստատուն հոսանք', ru: 'Высоковольтный постоянный ток' }, flowType: 'power' },
      { from: 'bev-inverter', to: 'bev-motor', label: { en: 'Variable Frequency 3-Phase AC', hy: 'Եռաֆազ փոփոխական հոսանք', ru: 'Трехфазный переменный ток' }, flowType: 'power' },
      { from: 'bev-motor', to: 'bev-gearbox', label: { en: 'High-RPM Rotor Shaft Torque', hy: 'Ռոտորի արագընթաց մոմենտ', ru: 'Крутящий момент ротора' }, flowType: 'power' },
      { from: 'bev-gearbox', to: 'bev-wheels', label: { en: 'Multiplied Wheel Tractive Force', hy: 'Բազմապատկված քարշուժ', ru: 'Тяговое усилие на колесах' }, flowType: 'power' },
      { from: 'bev-wheels', to: 'bev-motor', label: { en: 'Deceleration Kinetic Drive', hy: 'Կինետիկ էներգիա դանդաղելիս', ru: 'Вращение ротора при торможении' }, flowType: 'regeneration' },
      { from: 'bev-motor', to: 'bev-inverter', label: { en: 'Generator 3-Phase AC Flow', hy: 'Գեներացվող փոփոխական հոսանք', ru: 'Генераторный переменный ток' }, flowType: 'regeneration' },
      { from: 'bev-inverter', to: 'bev-battery', label: { en: 'Regenerative Battery Fast Charge', hy: 'Մարտկոցի լիցքավորման հոսանք', ru: 'Зарядный ток в батарею' }, flowType: 'regeneration' },
    ],
  },
};
