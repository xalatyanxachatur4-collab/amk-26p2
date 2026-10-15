export type SystemId =
  | 'engine'
  | 'transmission'
  | 'suspension'
  | 'brakes'
  | 'steering'
  | 'electrical'
  | 'body';

export interface LocalizedString {
  en: string;
  hy: string;
  ru: string;
}

export interface SystemComponent {
  id: string;
  name: LocalizedString;
  function: LocalizedString;
  location?: LocalizedString;
  material?: LocalizedString;
  principle?: LocalizedString;
}

export interface OperatingStep {
  step: number;
  title: LocalizedString;
  description: LocalizedString;
  keyPhysics?: LocalizedString;
}

export interface EngineeringConcept {
  title: LocalizedString;
  explanation: LocalizedString;
  formula?: string;
  relevance: LocalizedString;
}

export interface FailureSymptom {
  symptom: LocalizedString;
  probableCause: LocalizedString;
  diagnosticAdvice: LocalizedString;
}

export interface QuizQuestion {
  id: string;
  question: LocalizedString;
  options: {
    text: LocalizedString;
    isCorrect: boolean;
  }[];
  explanation: LocalizedString;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SystemData {
  id: SystemId;
  name: LocalizedString;
  subtitle: LocalizedString;
  category: LocalizedString;
  iconName: string;
  introduction: LocalizedString;
  primaryPurpose: LocalizedString;
  components: SystemComponent[];
  operatingSequence: OperatingStep[];
  engineeringConcepts: EngineeringConcept[];
  failureSymptoms: FailureSymptom[];
  maintenanceNotes: LocalizedString[];
  safetyNotes: LocalizedString[];
  relatedSystems: { id: SystemId; name: LocalizedString; relationship: LocalizedString }[];
  quizQuestions: QuizQuestion[];
}

export type PowertrainType = 'ice' | 'hybrid' | 'ev';

export interface VehicleComponentTarget {
  id: string;
  systemId: SystemId;
  name: LocalizedString;
  description: LocalizedString;
  powerFlow: LocalizedString;
  position3D: [number, number, number];
}
