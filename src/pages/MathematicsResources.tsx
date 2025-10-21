import { useState, useMemo, useEffect } from 'react';
import WebsiteCard from '@/components/WebsiteCard';
import { 
  mathematicsWebsites, 
  modernMathResources, 
  advancedMathTools, 
  mathCommunities, 
  chineseMathResources, 
  emergingMathFields,
  MathResourceManager 
} from '@/lib/data';
import { cn } from '@/lib/utils';

export default function MathematicsResources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('all');

  // 切换tab时滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 监听activeSection变化，自动滚动到顶部
  useEffect(() => {
    scrollToTop();
  }, [activeSection]);

  // 监听activeCategory变化，自动滚动到顶部
  useEffect(() => {
    scrollToTop();
  }, [activeCategory]);
  
  // 合并所有资源
  const allResources = useMemo(() => MathResourceManager.getAllWebsites(), []);
  
  // 获取资源统计
  const resourceStats = useMemo(() => MathResourceManager.getResourceStats(), []);
  
  // 按分类过滤资源
  const filteredWebsites = useMemo(() => {
    let resources = allResources;
    
    // 按资源模块过滤
    if (activeSection !== 'all') {
      switch (activeSection) {
        case 'original':
          resources = mathematicsWebsites;
          break;
        case 'modern':
          resources = modernMathResources;
          break;
        case 'advanced':
          resources = advancedMathTools;
          break;
        case 'communities':
          resources = mathCommunities;
          break;
        case 'chinese':
          resources = chineseMathResources;
          break;
        case 'emerging':
          resources = emergingMathFields;
          break;
      }
    }
    
    // 按类别过滤
    if (activeCategory !== 'all') {
      resources = resources.filter(website => website.category === activeCategory);
    }
    
    return resources.sort((a, b) => b.rating - a.rating);
  }, [allResources, activeCategory, activeSection]);
  
  // 获取所有类别
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(allResources.map(website => website.category)))].sort(),
    [allResources]
  );
  
  // 资源模块选项
  const sections = [
    { id: 'all', name: '全部资源', count: allResources.length },
    { id: 'original', name: '经典网站', count: mathematicsWebsites.length },
    { id: 'modern', name: '现代工具', count: modernMathResources.length },
    { id: 'advanced', name: '专业软件', count: advancedMathTools.length },
    { id: 'communities', name: '学术社区', count: mathCommunities.length },
    { id: 'chinese', name: '中文资源', count: chineseMathResources.length },
    { id: 'emerging', name: '前沿领域', count: emergingMathFields.length }
  ];
  
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          数学学习资源大全
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          收集了 {resourceStats.totalResources} 个最新最好的数学学习资源，涵盖从基础到前沿的各个领域
        </p>
      </header>

      {/* 资源统计概览 */}
      <section className="mb-12">
        <div className="p-6 text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          <h2 className="mb-4 text-2xl font-bold">📊 资源统计</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{resourceStats.totalResources}</div>
              <div className="text-sm opacity-90">总资源数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{resourceStats.totalCategories}</div>
              <div className="text-sm opacity-90">资源类别</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{resourceStats.averageRating}</div>
              <div className="text-sm opacity-90">平均评分</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{sections.length - 1}</div>
              <div className="text-sm opacity-90">资源模块</div>
            </div>
          </div>
        </div>
      </section>

      {/* 资源模块选择 */}
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          🚀 资源模块
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setActiveCategory('all');
              }}
              className={cn(
                "p-4 rounded-lg text-center transition-all",
                activeSection === section.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md"
              )}
            >
              <div className="text-lg font-bold">{section.count}</div>
              <div className="text-sm">{section.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 类别过滤器 */}
      <section className="mb-8">
        <div className="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200 md:mb-0">
            📚 资源列表 ({filteredWebsites.length})
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 8).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === category 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {category === 'all' ? '全部类别' : category}
              </button>
            ))}
            {categories.length > 8 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                +{categories.length - 8} 更多...
              </div>
            )}
          </div>
        </div>

        {/* 提示信息 */}
        <div className="p-4 mb-8 border-l-4 border-blue-500 rounded-r-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="text-blue-500 fa-solid fa-info-circle"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {activeSection === 'all' 
                  ? '显示所有数学学习资源，包括经典网站、现代工具、专业软件、学术社区、中文资源和前沿领域'
                  : `当前显示：${sections.find(s => s.id === activeSection)?.name} - ${filteredWebsites.length} 个资源`
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* 资源卡片网格 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>

        {/* 空状态 */}
        {filteredWebsites.length === 0 && (
          <div className="py-12 text-center">
            <i className="mb-4 text-6xl text-gray-400 fa-solid fa-search"></i>
            <h3 className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-300">
              没有找到匹配的资源
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              尝试选择其他类别或资源模块
            </p>
          </div>
        )}
      </section>

      {/* 热门类别统计 */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          📈 热门资源类别
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resourceStats.categoryStats.slice(0, 9).map((category, index) => (
            <div 
              key={category.name} 
              className="p-4 transition-shadow bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-800 hover:shadow-lg"
              onClick={() => {
                setActiveCategory(category.name);
                setActiveSection('all');
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {category.name}
                </h3>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                  {category.count}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-yellow-500">★</span>
                <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                  {category.avgRating}
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  ({((category.count / resourceStats.totalResources) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
