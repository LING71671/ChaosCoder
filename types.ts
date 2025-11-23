export enum SupportedLanguage {
  JAVA = 'Java',
  PYTHON = 'Python',
  JAVASCRIPT = 'JavaScript',
  C = 'C',
  CPP = 'C++',
  GO = 'Go',
  RUST = 'Rust',
  HTML = 'HTML',
  CSHARP = 'C#',
  PHP = 'PHP',
  SWIFT = 'Swift',
  TYPESCRIPT = 'TypeScript',
}

export enum ChaosLevel {
  MILD = 'Mildly Annoying',
  MESSY = 'Disgusting',
  PURE_EVIL = 'Anti-Human'
}

export interface TransformationConfig {
  language: SupportedLanguage;
  level: ChaosLevel;
  features: string[];
}

export interface GeneratedResponse {
  code: string;
  explanation?: string;
}