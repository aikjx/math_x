// 数据管理器 - 统一管理所有数学资源数据
import { Website, PracticalApplication, LearningPath } from './types';
import { mathematicsWebsites } from './websites';
import { mathTools } from './mathTools';
import { practicalApplications } from './applications';
import { learningPaths } from './learningPaths';
import { modernMathResources } from './modernMathResources';
import { advancedMathTools } from './advancedMathTools';
import { mathCommunities } from './mathCommunities';
import { chineseMathResources } from './chineseMathResources';
import { emergingMathFields } from './emergingMathFields';

// 数据分类管理
export class MathResourceManager {
  // 获取所有网站资源
  static getAllWebsites(): Website[] {
    return [
      ...mathematicsWebsites,
      ...mathTools,
      ...modernMathResources,
      ...advancedMathTools,
      ...mathCommunities,
      ...chineseMathResources,
      ...emergingMathFields
    ];
  }

  // 按类别获取资源
  static getResourcesByCategory(category: string): Website[] {
    const allResources = this.getAllWebsites();
    return allResources.filter(resource => 
      resource.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  // 获取高评分资源
  static getTopRatedResources(minRating: number = 4.5): Website[] {
    return this.getAllWebsites().filter(resource => resource.rating >= minRating);
  }

  // 搜索资源
  static searchResources(query: string): Website[] {
    const searchTerm = query.toLowerCase();
    return this.getAllWebsites().filter(resource =>
      resource.name.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm)
    );
  }

  // 获取资源统计信息
  static getResourceStats() {
    const allResources = this.getAllWebsites();
    const categories = [...new Set(allResources.map(r => r.category))];
    
    return {
      totalResources: allResources.length,
      totalCategories: categories.length,
      averageRating: (allResources.reduce((sum, r) => sum + r.rating, 0) / allResources.length).toFixed(2),
      categoryStats: categories.map(category => ({
        name: category,
        count: allResources.filter(r => r.category === category).length,
        avgRating: (allResources
          .filter(r => r.category === category)
          .reduce((sum, r) => sum + r.rating, 0) / 
          allResources.filter(r => r.category === category).length
        ).toFixed(2)
      })).sort((a, b) => b.count - a.count)
    };
  }

  // 获取推荐资源
  static getRecommendedResources(userLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional' = 'intermediate'): Website[] {
    const levelKeywords = {
      beginner: ['基础', '入门', '初级', 'Khan Academy', 'GeoGebra', '中文'],
      intermediate: ['进阶', '中级', 'Brilliant', '互动', '可视化'],
      advanced: ['高级', '专业', 'MIT', 'Stanford', '大学', '研究'],
      professional: ['学术', '研究', 'arXiv', 'MathOverflow', '论文', '期刊']
    };

    const keywords = levelKeywords[userLevel];
    const allResources = this.getAllWebsites();
    
    return allResources
      .filter(resource => 
        keywords.some(keyword => 
          resource.name.includes(keyword) || 
          resource.description.includes(keyword) ||
          resource.category.includes(keyword)
        )
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }

  // 获取新增资源概览
  static getNewResourcesOverview() {
    return {
      modernTools: {
        name: '现代数学工具',
        resources: modernMathResources,
        count: modernMathResources.length,
        description: 'AI驱动的学习工具、互动平台、移动应用等现代化数学学习资源'
      },
      advancedTools: {
        name: '专业数学软件',
        resources: advancedMathTools,
        count: advancedMathTools.length,
        description: '高级数学计算软件、符号计算系统、数值分析工具等专业级平台'
      },
      communities: {
        name: '数学学术社区',
        resources: mathCommunities,
        count: mathCommunities.length,
        description: '全球数学研究社区、学术期刊、问答平台和专业组织'
      },
      chineseResources: {
        name: '中文数学资源',
        resources: chineseMathResources,
        count: chineseMathResources.length,
        description: '专为中文用户收集的优质数学学习资源，包括课程、工具、社区等'
      },
      emergingFields: {
        name: '新兴数学领域',
        resources: emergingMathFields,
        count: emergingMathFields.length,
        description: '前沿数学研究方向，包括机器学习数学、量子计算、区块链数学等'
      }
    };
  }

  // 获取学习路径
  static getLearningPaths(): LearningPath[] {
    return learningPaths;
  }

  // 获取实际应用案例
  static getPracticalApplications(): PracticalApplication[] {
    return practicalApplications;
  }

  // 导出数据为JSON
  static exportData() {
    return {
      websites: this.getAllWebsites(),
      applications: this.getPracticalApplications(),
      learningPaths: this.getLearningPaths(),
      stats: this.getResourceStats(),
      newResources: this.getNewResourcesOverview(),
      exportDate: new Date().toISOString()
    };
  }
}

// 默认导出
export default MathResourceManager;