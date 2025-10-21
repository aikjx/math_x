import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { learningPaths } from '@/lib/data';
import TimeSpaceVisualization from '@/components/TimeSpaceVisualization';

// 骨架屏组件
const SkeletonCard = () => (
  <div className="p-6 bg-white shadow-lg rounded-xl animate-pulse dark:bg-gray-800">
    <div className="w-12 h-12 mb-4 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
    <div className="h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
    <div className="h-3 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
    <div className="h-8 bg-gray-300 rounded dark:bg-gray-700"></div>
  </div>
);

// 轮播消息组件
const AnnouncementCarousel = () => {
  const announcements = [
    "🎉 新增AI数学助手，帮助你解答复杂问题！",
    "📚 新增200+数学资源，覆盖从基础到高级课程",
    "⚡ 性能优化完成，网站加载速度提升60%",
    "✨ 全新UI设计，带来更好的学习体验"
  ];
  
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {announcements[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// 功能卡片组件
const FeatureCard = ({ icon, title, description, path, color = "from-blue-500 to-blue-600" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col h-full p-6 overflow-hidden border border-gray-200 rounded-xl shadow-md dark:border-gray-700 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 group"
    >
      <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${color} text-white`}>
        <span className="text-xl">{icon}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{description}</p>
      <Link 
        to={path} 
        className="inline-flex items-center self-start px-4 py-2 mt-auto text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        立即探索 <span className="ml-2">→</span>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const navigate = useNavigate();
  
  // 处理搜索
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchQuery.toLowerCase().includes('symbol') || searchQuery.toLowerCase().includes('符号')) {
        navigate(`/math-symbols?search=${encodeURIComponent(searchQuery)}`);
      } else if (searchQuery.toLowerCase().includes('tool') || searchQuery.toLowerCase().includes('工具')) {
        navigate(`/math-tools?search=${encodeURIComponent(searchQuery)}`);
      } else if (searchQuery.toLowerCase().includes('resource') || searchQuery.toLowerCase().includes('资源')) {
        navigate(`/mathematics-resources?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/learning-path?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  }, [searchQuery, navigate]);

  // 模拟加载完成
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 模拟进度数据
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // 初始化一些示例进度
      const initialProgress = {
        'basic-algebra': 75,
        'calculus': 45,
        'geometry': 60,
        'statistics': 30
      };
      setProgress(initialProgress);
      localStorage.setItem('learningProgress', JSON.stringify(initialProgress));
    }
  }, []);

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartLearning = (pathId: string) => {
    navigate(`/learning-path?id=${pathId}`);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      {/* 轮播公告 */}
      {showAnnouncement && (
        <div className="sticky top-0 z-50 w-full bg-white shadow-md dark:bg-gray-800">
          <div className="container px-4 py-2 mx-auto">
            <div className="flex items-center justify-between">
              <AnnouncementCarousel />
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="p-1 ml-2 text-gray-500 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-7xl">
        {/* 英雄区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-20 overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
        >
          {/* 动态装饰元素 */}
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
          
          <div className="container px-6 py-20 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl tracking-tight">
                <span className="block mb-2">探索数学的</span>
                <span className="relative inline-block">
                  <span className="relative z-10">奇妙世界</span>
                  <motion.span 
                    className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300 opacity-60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-5 py-2 mb-6 text-lg font-semibold text-green-800 bg-green-200 rounded-full dark:bg-green-900 dark:text-green-200">
                <i className="mr-2 fa-solid fa-gift"></i>
                完全免费使用，永久无广告
              </div>
              <p className="max-w-3xl mx-auto mb-10 text-xl text-blue-100 md:text-2xl">
                从基础概念到高级理论，我们提供全面的学习资源和工具，让数学学习变得简单高效
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                to="/math-symbols"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:-translate-y-1 shadow-lg"
              >
                <i className="mr-2 fa-solid fa-infinity"></i>
                探索数学符号
              </Link>
              <Link
                to="/math-tools"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-blue-600 transition-all duration-300 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 hover:-translate-y-1 shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
              >
                <i className="mr-2 fa-solid fa-calculator"></i>
                使用数学工具
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 公式可视化展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-16 overflow-hidden rounded-3xl shadow-xl"
        >
          <TimeSpaceVisualization className="w-full h-[400px]" />
        </motion.div>

        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              🔍
            </div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="搜索数学符号、工具、概念或学习路径..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-4 pl-12 pr-4 text-lg bg-white border-2 border-transparent rounded-xl shadow-lg focus:outline-none focus:border-blue-300 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center justify-center px-6 py-4 text-white bg-blue-600 rounded-r-xl hover:bg-blue-700 transition-colors"
              >
                搜索
              </button>
            </form>
          </div>
          
          {/* 快速搜索标签 */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['微积分', '线性代数', '几何', '三角函数', '概率统计'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery(tag);
                  handleSearch(new Event('submit'));
                }}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 功能特色 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-12 text-center">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 uppercase rounded-full bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
              功能特色
            </span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              全面的数学学习资源
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
              探索我们精心策划的数学工具、符号和学习路径，让数学学习变得简单高效
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="🔢"
              title="数学符号大全"
              description="查找并复制500+常用数学符号，了解它们的含义、用法和LaTeX代码。"
              path="/math-symbols"
              color="from-purple-500 to-pink-500"
            />

            <FeatureCard
              icon="🛠️"
              title="数学工具集"
              description="使用50+数学计算器、转换器和求解器，轻松解决复杂计算问题。"
              path="/math-tools"
              color="from-orange-500 to-red-500"
            />

            <FeatureCard
              icon="📊"
              title="实用数学应用"
              description="探索数学在日常生活、金融、科学和工程领域的实际应用案例。"
              path="/practical-mathematics"
              color="from-teal-500 to-cyan-500"
            />

            <FeatureCard
              icon="🤖"
              title="AI数学助手"
              description="利用人工智能解答数学问题，提供步骤详解和个性化学习建议。"
              path="/ai-math"
              color="from-indigo-500 to-purple-500"
            />

            <FeatureCard
              icon="📚"
              title="数学资源库"
              description="访问100+精选数学教程、视频和文献，覆盖从基础到高级的各个领域。"
              path="/mathematics-resources"
              color="from-green-500 to-emerald-500"
            />

            <FeatureCard
              icon="🎓"
              title="个性化学习路径"
              description="按照20+科学设计的学习路径循序渐进，高效掌握数学知识体系。"
              path="/learning-path"
              color="from-yellow-500 to-orange-500"
            />


          </div>
        </motion.div>

        {/* 学习路径 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-12 text-center">
            <span className="px-3 py-1 text-xs font-semibold text-green-600 uppercase rounded-full bg-green-100 dark:bg-green-900/30 dark:text-green-400">
              个性化学习
            </span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              推荐学习路径
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
              根据你的兴趣和水平，选择最适合你的学习路径，循序渐进掌握数学知识
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPaths.slice(0, 6).map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="overflow-hidden border border-gray-200 rounded-xl shadow-lg dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                      <i className="text-2xl text-white fa-solid fa-book"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {path.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>📊 {path.difficulty}</span>
                        <span>•</span>
                        <span>⏱️ {path.estimatedHours}小时</span>
                      </div>
                    </div>
                  </div>
                
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {path.description}
                  </p>
                  
                  {/* 进度条 */}
                  {progress[path.id.toString()] && (
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">学习进度</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {progress[path.id.toString()]}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress[path.id.toString()]}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 1.5 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {path.coreTopics && path.coreTopics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200"
                      >
                        {topic.title}
                      </span>
                    ))}
                    {path.coreTopics && path.coreTopics.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        +{path.coreTopics.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleStartLearning(path.id.toString())}
                    className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md"
                  >
                    {progress[path.id.toString()] ? '继续学习' : '开始学习'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredPaths.length > 6 && (
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/learning-path"
                className="inline-flex items-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1"
              >
                查看全部学习路径 <i className="ml-2 fa-solid fa-arrow-right"></i>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* 平台数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="py-16 mb-10 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
        >
          <div className="container px-6 mx-auto">
            <div className="mb-12 text-center">
              <span className="px-3 py-1 text-xs font-semibold text-indigo-600 uppercase rounded-full bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                平台概况
              </span>
              <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
                我们的数学资源
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-600 dark:text-gray-300">
                所有功能和资源完全免费开放使用，助你轻松学习数学
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center bg-white rounded-2xl shadow-lg dark:bg-gray-800"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                  🔤
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="mt-2 text-lg text-gray-600 dark:text-gray-300">数学符号</div>
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="mr-1 fa-solid fa-check-circle"></i> 免费使用
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center bg-white rounded-2xl shadow-lg dark:bg-gray-800"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-green-600 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                  🛠️
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="mt-2 text-lg text-gray-600 dark:text-gray-300">学习工具</div>
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="mr-1 fa-solid fa-check-circle"></i> 免费使用
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center bg-white rounded-2xl shadow-lg dark:bg-gray-800"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-purple-600 bg-purple-100 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
                  📚
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="mt-2 text-lg text-gray-600 dark:text-gray-300">学习资源</div>
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="mr-1 fa-solid fa-check-circle"></i> 免费使用
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 text-center bg-white rounded-2xl shadow-lg dark:bg-gray-800"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-red-600 bg-red-100 rounded-full dark:bg-red-900/30 dark:text-red-400">
                  🗺️
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">20+</div>
                <div className="mt-2 text-lg text-gray-600 dark:text-gray-300">学习路径</div>
                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <i className="mr-1 fa-solid fa-check-circle"></i> 免费使用
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}