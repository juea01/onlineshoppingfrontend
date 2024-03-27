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
  Security_Performance = 'SecurityPerformance',
  Networking_Database = 'NetworkingDb',
  ArtificialIntelligence = 'AI',
  GeneralKnowledge = 'GI'

}

/**
 * This can be used to navigate to particluar component with this.router.navigate().
 * TODO: Need to get all navigation literal here
 */
export enum ComponentLiteralNavName{
  CompArticle = 'article',
  CompArticleDetail = 'articleDetail',
  CompStore = 'store',
  CompCaseStudy = 'casestudy',
  CompSearch = 'search',
  CompSearchAndParamSearchString = 'search/:searchString',
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

