// 统一的类型定义文件
export interface Website {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  rating: number;
}

export interface MathematicalSymbolExtended {
  id: number;
  symbol: string;
  name: string;
  category: string;
  meaning: string;
  example: string;
  latex: string;
}

export interface PracticalApplication {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  realWorldExample: string;
  mathFields: string[];
  formula?: string;
  formulaExplanation?: string;
  exampleCalculation?: string;
  reasoningSteps?: string[];
}

export interface AIMathematicsTopic {
  id: number;
  title: string;
  category: string;
  description: string;
  keyConcepts: string[];
  applicationScenario: string;
  learningResourceUrl: string;
}

export interface LearningPath {
  id: number;
  title: string;
  educationStage: string;
  shortTitle: string;
  description: string;
  estimatedHours: number;
  difficulty: string;
  learningObjectives: string[];
  coreTopics: Array<{
    title: string;
    description: string;
    keyPoints: string[];
  }>;
  recommendedResources: Array<{
    name: string;
    type: string;
    description: string;
    url: string;
  }>;
  keyChallenges?: Array<{
    challenge: string;
    solution: string;
  }>;
  assessmentMethods?: Array<{
    type: string;
    description: string;
  }>;
  applicationCases?: string[];
}