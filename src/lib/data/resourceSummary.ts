// 数学资源汇总 - 2025年最新收集的优质数学学习资源
import { modernMathResources } from './modernMathResources';
import { advancedMathTools } from './advancedMathTools';
import { mathCommunities } from './mathCommunities';
import { chineseMathResources } from './chineseMathResources';
import { emergingMathFields } from './emergingMathFields';

// 资源统计信息
export const resourceStats = {
  totalResources: 
    modernMathResources.length + 
    advancedMathTools.length + 
    mathCommunities.length + 
    chineseMathResources.length + 
    emergingMathFields.length,
  
  categories: {
    modernMathResources: {
      count: modernMathResources.length,
      description: "现代数学学习资源，包括AI工具、互动平台、移动应用等"
    },
    advancedMathTools: {
      count: advancedMathTools.length,
      description: "高级数学工具与软件，专业级数学计算平台"
    },
    mathCommunities: {
      count: mathCommunities.length,
      description: "数学社区与学术资源，全球数学学习与研究社区"
    },
    chineseMathResources: {
      count: chineseMathResources.length,
      description: "中文数学学习资源，专为中文用户收集的优质资源"
    },
    emergingMathFields: {
      count: emergingMathFields.length,
      description: "新兴数学领域资源，前沿数学研究方向和应用"
    }
  }
};

// 按类别分组的所有资源
export const allNewResources = {
  modernMathResources,
  advancedMathTools,
  mathCommunities,
  chineseMathResources,
  emergingMathFields
};

// 资源亮点推荐
export const featuredResources = [
  {
    name: "Photomath",
    category: "AI工具",
    reason: "AI驱动的数学解题应用，支持拍照识别，是现代数学学习的革命性工具"
  },
  {
    name: "Brilliant",
    category: "互动学习",
    reason: "通过互动式问题培养数学思维，注重问题解决能力的培养"
  },
  {
    name: "SageMath",
    category: "开源软件",
    reason: "功能强大的开源数学软件系统，集成众多数学库"
  },
  {
    name: "arXiv Mathematics",
    category: "学术资源",
    reason: "最新数学研究论文的权威发布平台，完全开放获取"
  },
  {
    name: "中国大学MOOC",
    category: "中文资源",
    reason: "国家智慧教育平台，提供985/211高校的优质数学课程"
  },
  {
    name: "Mathematics for Machine Learning",
    category: "新兴领域",
    reason: "机器学习时代必备的数学基础教材"
  }
];

// 学习路径建议
export const learningPathSuggestions = {
  beginner: {
    title: "数学入门者",
    resources: [
      "Khan Academy App",
      "GeoGebra 中文版",
      "我爱数学网",
      "Mathigon Polypad"
    ]
  },
  intermediate: {
    title: "数学进阶者", 
    resources: [
      "Brilliant",
      "3Blue1Brown 可视化",
      "网易公开课 - 数学",
      "Desmos Classroom Activities"
    ]
  },
  advanced: {
    title: "高级学习者",
    resources: [
      "MIT OpenCourseWare Mathematics",
      "Wolfram Alpha",
      "Mathematics Stack Exchange",
      "Coursera 数学课程"
    ]
  },
  professional: {
    title: "专业研究者",
    resources: [
      "arXiv Mathematics",
      "MathOverflow",
      "SageMath",
      "Lean Prover Community"
    ]
  },
  emerging: {
    title: "前沿探索者",
    resources: [
      "Mathematics for Machine Learning",
      "Quantum Computing: An Applied Approach",
      "Network Science",
      "Topological Data Analysis"
    ]
  }
};

export default {
  resourceStats,
  allNewResources,
  featuredResources,
  learningPathSuggestions
};