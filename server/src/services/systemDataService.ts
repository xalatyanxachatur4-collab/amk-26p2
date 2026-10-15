export interface SystemMetadata {
  id: string;
  name: { en: string; hy: string; ru: string };
  category: string;
  icon: string;
  shortDescription: { en: string; hy: string; ru: string };
  componentCount: number;
}

export const coreSystemsList: SystemMetadata[] = [
  {
    id: 'engine',
    name: {
      en: 'Engine and Powertrain',
      hy: 'Շարժիչ և ուժային ագրեգատ',
      ru: 'Двигатель и силовая установка',
    },
    category: 'Powertrain',
    icon: 'Flame',
    shortDescription: {
      en: 'Thermal & electrical energy conversion to mechanical rotational torque via thermodynamic cycles and electromagnetic flux.',
      hy: 'Ջերմային և էլեկտրական էներգիայի վերածումը պտտական մեխանիկական մոմենտի:',
      ru: 'Преобразование тепловой и электрической энергии в механический крутящий момент.',
    },
    componentCount: 14,
  },
  {
    id: 'transmission',
    name: {
      en: 'Transmission and Drivetrain',
      hy: 'Փոխանցման տուփ և տրանսմիսիա',
      ru: 'Трансмиссия и привод',
    },
    category: 'Drivetrain',
    icon: 'Cog',
    shortDescription: {
      en: 'Torque multiplication, gear ratio matching, and distribution to drive wheels via differential and drive-shafts.',
      hy: 'Ոլորող մոմենտի բազմապատկում, փոխանցման թվերի համապատասխանեցում և բաշխում:',
      ru: 'Трансформация крутящего момента, согласование передаточных чисел и распределение на колеса.',
    },
    componentCount: 12,
  },
  {
    id: 'suspension',
    name: {
      en: 'Suspension and Running Gear',
      hy: 'Կախոց և ընթացային մաս',
      ru: 'Подвеска и ходовая часть',
    },
    category: 'Chassis',
    icon: 'Activity',
    shortDescription: {
      en: 'Dynamic isolation of road roughness via springs and viscous dampers, preserving tire contact patch and chassis stability.',
      hy: 'Ճանապարհի անհարթությունների մեկուսացում զսպանակների և մեղմիչների (ամորտիզատոր) միջոցով:',
      ru: 'Демпфирование дорожных неровностей, сохранение пятна контакта шин и стабилизация кузова.',
    },
    componentCount: 11,
  },
  {
    id: 'brakes',
    name: {
      en: 'Braking System',
      hy: 'Արգելակային համակարգ',
      ru: 'Тормозная система',
    },
    category: 'Safety & Control',
    icon: 'Disc',
    shortDescription: {
      en: 'Conversion of kinetic vehicle energy into thermal dissipation via hydraulic caliper clamping, rotor friction, and ABS slip control.',
      hy: 'Մեքենայի կինետիկ էներգիայի վերածումը ջերմության հիդրավլիկ ճնշման և սկավառակային շփման միջոցով:',
      ru: 'Преобразование кинетической энергии в тепло через гидравлический привод, трение колодок и ABS.',
    },
    componentCount: 10,
  },
  {
    id: 'steering',
    name: {
      en: 'Steering System',
      hy: 'Ղեկային կառավարում',
      ru: 'Рулевое управление',
    },
    category: 'Safety & Control',
    icon: 'Compass',
    shortDescription: {
      en: 'Translating steering wheel angle to steerable knuckle deflection with Ackermann geometry and electric power assist.',
      hy: 'Ղեկանիվի պտույտի փոխակերպումը անիվների շրջադարձային անկյան՝ ըստ Ակերմանի երկրաչափության:',
      ru: 'Преобразование угла поворота руля в угловое отклонение колес с соблюдением геометрии Аккермана.',
    },
    componentCount: 9,
  },
  {
    id: 'electrical',
    name: {
      en: 'Electrical and Electronic Systems',
      hy: 'Էլեկտրական և էլեկտրոնային համակարգեր',
      ru: 'Электрические и электронные системы',
    },
    category: 'Electronics',
    icon: 'Zap',
    shortDescription: {
      en: 'Power distribution (12V low-voltage & 400V/800V high-voltage), CAN-bus telemetry, sensor-ECU-actuator closed loop, and starting logic.',
      hy: 'Էներգիայի բաշխում (12V և բարձրավոլտ), CAN ցանց, սենսոր-ԷԿՈՒ-ակտուատոր շղթա:',
      ru: 'Распределение питания (12В и высоковольтные батареи), цифровая шина CAN, контур датчик-ЭБУ-актуатор.',
    },
    componentCount: 13,
  },
  {
    id: 'body',
    name: {
      en: 'Vehicle Body and Structure',
      hy: 'Թափք և կոնստրուկցիա',
      ru: 'Кузов и несущая конструкция',
    },
    category: 'Structure & Safety',
    icon: 'Shield',
    shortDescription: {
      en: 'Rigid passenger safety cell, progressive crumple deformation zones, torsional rigidity, and aerodynamic optimization.',
      hy: 'Ուղևորների անվտանգության կոշտ պարկուճ, դեֆորմացիոն գոտիներ և աերոդինամիկա:',
      ru: 'Жесткая капсула безопасности салона, прогрессивные зоны запрограммированной деформации и аэродинамика.',
    },
    componentCount: 12,
  },
];
