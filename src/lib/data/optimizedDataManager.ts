import { Website } from './types';
import { mathematicsWebsites } from './websites';
import { modernMathResources } from './modernMathResources';
import { advancedMathTools } from './advancedMathTools';
import { mathCommunities } from './mathCommunities';
import { chineseMathResources } from './chineseMathResources';
import { emergingMathFields } from './emergingMathFields';

// 性能优化的数据管理器
class OptimizedMathResourceManager {
  private static instance: OptimizedMathResourceManager;
  private cachedData: Map<string, any> = new Map();
  private allWebsites: Website[] | null = null;
  private resourceStats: any | null = null;

  private constructor() {}

  static getInstance(): OptimizedMathResourceManager {
    if (!OptimizedMathResourceManager.instance) {
      OptimizedMathResourceManager.instance = new OptimizedMathResourceManager();
    }
    return OptimizedMathResourceManager.instance;
  }

  // 懒加载所有网站数据
  getAllWebsites(): Website[] {
    if (this.allWebsites) {
      return this.allWebsites;
    }

    const cacheKey = 'allWebsites';
    if (this.cachedData.has(cacheKey)) {
      this.allWebsites = this.cachedData.get(cacheKey);
      return this.allWebsites!;
    }

    // 合并所有资源，使用 Set 去重
    const websiteMap = new Map<number, Website>();
    
    [
      ...mathematicsWebsites,
      ...modernMathResources,
      ...advancedMathTools,
      ...mathCommunities,
      ...chineseMathResources,
      ...emergingMathFields
    ].forEach(website => {
      websiteMap.set(website.id, website);
    });

    this.allWebsites = Array.from(websiteMap.values());
    this.cachedData.set(cacheKey, this.allWebsites);
    
    return this.allWebsites;
  }

  // 缓存的资源统计
  getResourceStats() {
    if (this.resourceStats) {
      return this.resourceStats;
    }

    const cacheKey = 'resourceStats';
    if (this.cachedData.has(cacheKey)) {
      this.resourceStats = this.cachedData.get(cacheKey);
      return this.resourceStats;
    }

    const websites = this.getAllWebsites();
    
    // 使用 Map 优化类别统计
    const categoryMap = new Map<string, { count: number; totalRating: number }>();
    
    websites.forEach(website => {
      const category = website.category;
      if (categoryMap.has(category)) {
        const stats = categoryMap.get(category)!;
        stats.count++;
        stats.totalRating += website.rating;
      } else {
        categoryMap.set(category, { count: 1, totalRating: website.rating });
      }
    });

    const categoryStats = Array.from(categoryMap.entries())
      .map(([name, stats]) => ({
        name,
        count: stats.count,
        avgRating: Number((stats.totalRating / stats.count).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count);

    const totalRating = websites.reduce((sum, w) => sum + w.rating, 0);
    
    this.resourceStats = {
      totalResources: websites.length,
      totalCategories: categoryMap.size,
      averageRating: Number((totalRating / websites.length).toFixed(1)),
      categoryStats
    };

    this.cachedData.set(cacheKey, this.resourceStats);
    return this.resourceStats;
  }

  // 优化的过滤方法
  getFilteredWebsites(filters: {
    category?: string;
    minRating?: number;
    searchQuery?: string;
    section?: string;
  }): Website[] {
    const cacheKey = JSON.stringify(filters);
    if (this.cachedData.has(cacheKey)) {
      return this.cachedData.get(cacheKey);
    }

    let websites = this.getAllWebsites();

    // 按模块过滤
    if (filters.section && filters.section !== 'all') {
      switch (filters.section) {
        case 'original':
          websites = mathematicsWebsites;
          break;
        case 'modern':
          websites = modernMathResources;
          break;
        case 'advanced':
          websites = advancedMathTools;
          break;
        case 'communities':
          websites = mathCommunities;
          break;
        case 'chinese':
          websites = chineseMathResources;
          break;
        case 'emerging':
          websites = emergingMathFields;
          break;
      }
    }

    // 应用过滤器
    const filtered = websites.filter(website => {
      if (filters.category && filters.category !== 'all' && website.category !== filters.category) {
        return false;
      }
      if (filters.minRating && website.rating < filters.minRating) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          website.name.toLowerCase().includes(query) ||
          website.description.toLowerCase().includes(query) ||
          website.category.toLowerCase().includes(query)
        );
      }
      return true;
    }).sort((a, b) => b.rating - a.rating);

    // 缓存结果（限制缓存大小）
    if (this.cachedData.size > 100) {
      const firstKey = this.cachedData.keys().next().value;
      this.cachedData.delete(firstKey);
    }
    this.cachedData.set(cacheKey, filtered);

    return filtered;
  }

  // 获取推荐资源
  getRecommendations(userLevel: string, limit: number = 12): Website[] {
    const cacheKey = `recommendations_${userLevel}_${limit}`;
    if (this.cachedData.has(cacheKey)) {
      return this.cachedData.get(cacheKey);
    }

    const websites = this.getAllWebsites();
    
    // 根据用户水平推荐
    const levelCategories = {
      beginner: ['基础数学', '在线课程', '教育平台', '数学游戏'],
      intermediate: ['数学工具', '可视化', '练习平台', '参考资料'],
      advanced: ['专业软件', '学术期刊', '研究工具', '高级课程'],
      professional: ['学术论文', '研究社区', '专业期刊', '会议资源']
    };

    const preferredCategories = levelCategories[userLevel as keyof typeof levelCategories] || [];
    
    const recommendations = websites
      .filter(website => 
        preferredCategories.some(cat => 
          website.category.includes(cat) || 
          website.description.toLowerCase().includes(cat.toLowerCase())
        ) || website.rating >= 4.5
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    this.cachedData.set(cacheKey, recommendations);
    return recommendations;
  }

  // 清除缓存
  clearCache(): void {
    this.cachedData.clear();
    this.allWebsites = null;
    this.resourceStats = null;
  }

  // 获取缓存统计
  getCacheStats() {
    return {
      cacheSize: this.cachedData.size,
      hasWebsitesCache: !!this.allWebsites,
      hasStatsCache: !!this.resourceStats
    };
  }
}

export const optimizedResourceManager = OptimizedMathResourceManager.getInstance();