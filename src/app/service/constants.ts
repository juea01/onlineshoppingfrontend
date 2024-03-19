export const PATH_USER_CODE_URL = 'usercode';
export const PATH_SUBSCRIPTION_CODE_URL = 'subcode';
export const PATH_PASSWORD_RESET_CODE_URL = 'passrescode';


//for Course level
export enum SkillLevelValue {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3
}

export enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum SubCategory{
  Java = 'Java',
  Machine_Learning = 'ML',
  JavaScript = 'JavaScript',
  HTML_CSS = 'HTML_CSS',
  Security = 'Security',
  Performance = 'Performance',
  ArtificialIntelligence = 'AI',
  GeneralKnowledge = 'GI'

}

export enum Category{
  BackendDevelopment = 'BackendDevelopment',
  FrontEndDevelopment = 'FrontEndDevelopment',
  CaseStudy  = 'CaseStudy'

}

export function getSkillLevelValue(skillLevel: string): number | undefined {
  const skillLevelValueKey = skillLevel as keyof SkillLevelValue;
  return SkillLevelValue[skillLevelValueKey];
}

