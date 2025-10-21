import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { aiMathematicsTopics } from '@/lib/data';

export default function AIMathematics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [favoriteTopics, setFavoriteTopics] = useState<number[]>([]);

  // 从数据中提取分类
  const categories = ['全部', ...Array.from(new Set(aiMathematicsTopics.map(topic => topic.category)))];

  const filteredTopics = useMemo(() => {
    return aiMathematicsTopics.filter(topic => {
      const matchesSearch = !searchQuery || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.keyConcepts.some(concept => concept.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === '全部' || topic.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (topicId: number) => {
    setFavoriteTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
    toast.success(favoriteTopics.includes(topicId) ? '已取消收藏' : '已添加到收藏');
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            AI 数学基础
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-600 dark:text-gray-300">
            掌握人工智能背后的数学原理，从线性代数到深度学习的数学基础
          </p>
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
              <i className="mr-2 fa-solid fa-brain"></i>
              {aiMathematicsTopics.length} 个AI数学主题
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
              placeholder="搜索AI数学主题、概念或分类..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-4 pl-10 pr-4 text-lg bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-purple-900/30'
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
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredTopics.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">匹配主题</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{aiMathematicsTopics.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">总主题数</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{favoriteTopics.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">收藏主题</div>
            </div>
          </div>
        </motion.div>

        {/* AI数学主题列表 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic, index) => (
            <motion.div 
              key={topic.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                {/* 主题头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
                        {topic.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(topic.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favoriteTopics.includes(topic.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <i className={`fa-${favoriteTopics.includes(topic.id) ? 'solid' : 'regular'} fa-heart`}></i>
                  </button>
                </div>
                
                {/* 主题描述 */}
                <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {topic.description}
                </p>

                {/* 核心概念 */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <i className="mr-2 fa-solid fa-key"></i>
                    核心概念
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {topic.keyConcepts.slice(0, 3).map((concept, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200"
                      >
                        {concept}
                      </span>
                    ))}
                    {topic.keyConcepts.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        +{topic.keyConcepts.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* 应用场景 */}
                <div className="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <i className="mr-2 fa-solid fa-lightbulb"></i>
                    应用场景
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {topic.applicationScenario}
                  </p>
                </div>
                
                {/* 底部操作 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      <i className="mr-1 fa-solid fa-graduation-cap"></i>
                      学习资源
                    </span>
                  </div>
                  
                  <a 
                    href={topic.learningResourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 border border-transparent rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    开始学习
                    <i className="ml-2 text-xs fa-solid fa-external-link"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTopics.length === 0 && (
          <motion.div 
            className="py-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="mb-4 text-6xl text-gray-400 fa-solid fa-search"></i>
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">未找到匹配的AI数学主题</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              请尝试调整搜索条件或筛选选项
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
              }}
              className="px-6 py-3 text-sm font-medium text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
            >
              重置筛选条件
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}