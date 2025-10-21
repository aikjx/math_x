import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { mathTools } from '@/lib/data';

export default function MathTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [favoriteTools, setFavoriteTools] = useState<number[]>(() => {
    // 从localStorage读取收藏的工具
    const saved = localStorage.getItem('favoriteMathTools');
    return saved ? JSON.parse(saved) : [];
  });
  
  // 保存收藏到localStorage
  useEffect(() => {
    localStorage.setItem('favoriteMathTools', JSON.stringify(favoriteTools));
  }, [favoriteTools]);

  // 从 mathTools 数据中提取分类
  const categories = ['全部', ...Array.from(new Set(mathTools.map(tool => tool.category)))];

  const filteredTools = useMemo(() => {
    return mathTools.filter(tool => {
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '全部' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (toolId: number) => {
    setFavoriteTools(prev => {
      const isFavorite = prev.includes(toolId);
      const newFavorites = isFavorite 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      toast.success(isFavorite ? '已取消收藏' : '已添加到收藏', { 
        duration: 1500,
        style: {
          background: isFavorite ? '#EF4444' : '#10B981',
          color: 'white'
        }
      });
      return newFavorites;
    });
  };
  
  // 检查工具是否已收藏
  const isToolFavorite = (toolId: number) => {
    return favoriteTools.includes(toolId);
  };
  
  // 热门搜索词
  const popularSearches = [
    { term: '计算器', category: '计算工具' },
    { term: '单位转换', category: '转换工具' },
    { term: '解方程', category: '数学求解' },
    { term: '图表', category: '可视化工具' },
    { term: '统计', category: '统计分析' }
  ];
  
  // 快速跳转到热门搜索
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory('全部');
    // 滚动到结果区域
    setTimeout(() => {
      const resultsElement = document.getElementById('tool-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            数学工具集
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-600 dark:text-gray-300">
            精选实用数学工具，帮助你解决各种数学问题 - 从基础计算到高级研究
          </p>
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
              <i className="mr-2 fa-solid fa-tools"></i>
              {mathTools.length} 个数学工具
            </span>
          </div>
        </motion.header>

        {/* 搜索和筛选 */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* 搜索框 */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="text-gray-400 fa-solid fa-search"></i>
            </div>
            <input
              type="text"
              placeholder="搜索工具名称、描述或分类..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-4 pl-10 pr-12 text-lg bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i className="fa-solid fa-times-circle"></i>
              </button>
            )}
          </div>
          
          {/* 热门搜索推荐 */}
          {!searchQuery && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">热门搜索：</span>
              {popularSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(item.term)}
                  className="text-sm px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 transition-colors"
                >
                  {item.term}
                </button>
              ))}
            </div>
          )}

          {/* 分类筛选 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 统计信息 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">匹配工具</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mathTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">总工具数</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{favoriteTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">收藏工具</div>
            </div>
          </div>
        </motion.div>

        {/* 工具列表 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool, index) => (
            <motion.div 
              key={tool.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                {/* 工具头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                        免费
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(tool.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favoriteTools.includes(tool.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <i className={`fa-${favoriteTools.includes(tool.id) ? 'solid' : 'regular'} fa-heart`}></i>
                  </button>
                </div>
                
                {/* 工具描述 */}
                <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {tool.description}
                </p>
                
                {/* 底部操作 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <i className="mr-1 text-yellow-400 fa-solid fa-star"></i>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{tool.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    使用工具
                    <i className="ml-2 text-xs fa-solid fa-external-link"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTools.length === 0 && (
          <motion.div 
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="mb-4 text-6xl text-gray-400 fa-solid fa-search"></i>
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">未找到匹配的工具</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              请尝试调整搜索条件或筛选选项
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
              }}
              className="px-6 py-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}