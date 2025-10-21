// 统一导出所有数据模块和类型
export * from './types';
export { mathTools } from './mathTools';
export { mathematicsWebsites } from './websites';
export { mathematicalSymbols, allMathematicalSymbols, completeMathematicalSymbols } from './symbols';
export { unifiedFieldSymbols } from './unifiedFieldSymbols';
export { practicalApplications } from './applications';
export { aiMathematicsTopics } from './aiMathematics';
export { learningPaths } from './learningPaths';

// 新增的丰富数学资源
export { modernMathResources } from './modernMathResources';
export { advancedMathTools } from './advancedMathTools';
export { mathCommunities } from './mathCommunities';
export { chineseMathResources } from './chineseMathResources';
export { emergingMathFields } from './emergingMathFields';

// 资源汇总
export { default as resourceSummary, resourceStats, allNewResources, featuredResources, learningPathSuggestions } from './resourceSummary';

// 数据管理器
export { MathResourceManager } from './dataManager';
