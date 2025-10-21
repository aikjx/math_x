import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { practicalApplications } from '@/lib/data';

export default function PracticalMathematics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [favoriteApplications, setFavoriteApplications] = useState<number[]>([]);

  // 从数据中提取分类
  const categories = ['全部', ...Array.from(new Set(practicalApplications.map(app => app.category)))];

  const filteredApplications = useMemo(() => {
    return practicalApplications.filter(app => {
      const matchesSearch = !searchQuery || 
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.mathFields.some(field => field.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '全部' || app.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (appId: number) => {
    setFavoriteApplications(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
    toast.success(favoriteApplications.includes(appId) ? '已取消收藏' : '已添加到收藏');
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            数学实际应用
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-600 dark:text-gray-300">
            探索数学在现实世界中的精彩应用，从天气预报到金融建模，数学无处不在
          </p>
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
              <i className="mr-2 fa-solid fa-lightbulb"></i>
              {practicalApplications.length} 个实际应用案例
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
              placeholder="搜索应用案例、数学领域或分类..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-4 pl-10 pr-4 text-lg bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-green-900/30'
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
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filteredApplications.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">匹配案例</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{practicalApplications.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">总案例数</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{favoriteApplications.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">收藏案例</div>
            </div>
          </div>
        </motion.div>

        {/* 应用案例列表 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredApplications.map((app, index) => (
            <motion.div 
              key={app.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* 图片区域 */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-green-400 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="text-6xl text-white opacity-50 fa-solid fa-calculator"></i>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(app.id)}
                    className={`p-2 rounded-full bg-white/20 backdrop-blur-sm transition-colors ${
                      favoriteApplications.includes(app.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-white hover:text-red-500'
                    }`}
                  >
                    <i className={`fa-${favoriteApplications.includes(app.id) ? 'solid' : 'regular'} fa-heart`}></i>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* 标题和分类 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {app.title}
                    </h3>
                    <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                      {app.category}
                    </span>
                  </div>
                </div>

                {/* 描述 */}
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {app.description}
                </p>

                {/* 实际案例 */}
                <div className="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <i className="mr-2 fa-solid fa-lightbulb"></i>
                    实际案例
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {app.realWorldExample}
                  </p>
                </div>

                {/* 数学领域标签 */}
                <div className="flex flex-wrap gap-2">
                  {app.mathFields.map((field, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredApplications.length === 0 && (
          <motion.div 
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="mb-4 text-6xl text-gray-400 fa-solid fa-search"></i>
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">未找到匹配的应用案例</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              请尝试调整搜索条件或筛选选项
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
              }}
              className="px-6 py-3 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}