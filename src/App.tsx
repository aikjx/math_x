import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { DataProvider } from './contexts/DataContext';
import NavigationItem from './components/NavigationItem';
import PerformanceMonitor from './components/PerformanceMonitor';
import MobileMenu from './components/MobileMenu';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { useTheme } from './hooks/useTheme';

// 页面组件懒加载
const Home = lazy(() => import('./pages/Home'));
const MathematicsResources = lazy(() => import('./pages/MathematicsResources'));
const MathematicalSymbols = lazy(() => import('./pages/MathematicalSymbols'));
const MathTools = lazy(() => import('./pages/MathTools'));
const PracticalMathematics = lazy(() => import('./pages/PracticalMathematics'));
const AIMathematics = lazy(() => import('./pages/AIMathematics'));
const MathematicsLearningPath = lazy(() => import('./pages/MathematicsLearningPath'));
const UnifiedFieldTheory = lazy(() => import('./pages/UnifiedFieldTheory'));
const Terms = lazy(() => import('./pages/Terms'));
const MathematicalSymbolsOptimized = lazy(() => import('./pages/MathematicalSymbolsOptimized'));
const AdvancedMathSymbols = lazy(() => import('./pages/AdvancedMathSymbols'));

// 页面加载占位组件
const PageLoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <LoadingSpinner 
        size="lg" 
        text="正在为您准备精彩内容..." 
        className="p-8"
      />
    </div>
  );
};

// 页面过渡动画组件
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // 路由切换时自动滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// 全局搜索组件
const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 根据搜索内容跳转到不同页面
      if (searchQuery.toLowerCase().includes('symbol') || searchQuery.toLowerCase().includes('符号')) {
        navigate(`/math-symbols?search=${encodeURIComponent(searchQuery)}`);
      } else if (searchQuery.toLowerCase().includes('tool') || searchQuery.toLowerCase().includes('工具')) {
        navigate(`/math-tools?search=${encodeURIComponent(searchQuery)}`);
      } else if (searchQuery.toLowerCase().includes('resource') || searchQuery.toLowerCase().includes('资源')) {
        navigate(`/math-resources?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/learning-path?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  }, [searchQuery, navigate]);
  
  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 transition-all duration-300 border border-gray-200 rounded-full shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700 hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🔍
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 z-50 w-80 mt-2"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-black/30"
              onClick={() => setIsOpen(false)}
            />
            <div className="p-4 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <form onSubmit={handleSearch} className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索数学符号、工具、资源..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full py-2 pl-9 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    🔍
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    搜索
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    取消
                  </button>
                </div>
              </form>
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">热门搜索</h4>
                <div className="flex flex-wrap gap-2">
                  {['微积分', '代数', '几何', '三角函数', '矩阵计算'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch(new Event('submit') as any);
                      }}
                      className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 主题切换按钮组件
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed z-50 p-3 transition-all duration-300 border border-gray-200 rounded-full shadow-lg top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:border-gray-700 hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.div>
    </motion.button>
  );
};

// 返回顶部按钮
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed z-50 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ⬆️
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// 导航菜单数据，包含更全面的分类和图标
const navigationItems = [
  { path: '/', icon: '🏠', label: '首页', color: 'from-blue-500 to-cyan-500' },
  { path: '/math-resources', icon: '📚', label: '学习资源', color: 'from-green-500 to-emerald-500' },
  { path: '/math-symbols', icon: '🔢', label: '数学符号', color: 'from-purple-500 to-pink-500' },
  { path: '/math-tools', icon: '🛠️', label: '数学工具', color: 'from-orange-500 to-red-500' },
  { path: '/practical-math', icon: '📊', label: '实用数学', color: 'from-teal-500 to-cyan-500' },
  { path: '/ai-math', icon: '🤖', label: 'AI数学', color: 'from-indigo-500 to-purple-500' },
  { path: '/learning-path', icon: '🎓', label: '学习路径', color: 'from-yellow-500 to-orange-500' },
  { path: '/unified-field-theory', icon: '⚛️', label: '统一场论', color: 'from-pink-500 to-rose-500' }
];

// 主应用组件
function App() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // 模拟应用初始化
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 关闭移动端菜单的处理函数
  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // 加载屏幕
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <LoadingSpinner 
            size="lg" 
            text="数学学习平台正在加载中..." 
            className="p-8"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <DataProvider>
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
          {/* 移动端菜单 */}
          <MobileMenu
            isOpen={showMobileMenu}
            onClose={handleCloseMobileMenu}
            navigationItems={navigationItems}
          />
          
          {/* 主题切换按钮 */}
          <ThemeToggle />
          
          {/* 返回顶部按钮 */}
          <BackToTop />
          
          {/* 性能监控 */}
          <PerformanceMonitor
            isVisible={showPerformanceMonitor}
            onToggle={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
          />

          {/* 导航栏 */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-40 border-b border-gray-200 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm dark:border-gray-700"
          >
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <span className="text-xl text-white">✨</span>
                  </div>
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Math Star
                  </span>
                </motion.div>

                {/* 桌面端导航菜单和搜索 */}
                <div className="hidden items-center space-x-4 md:flex">
                  <div className="flex space-x-1">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <NavigationItem {...item} />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* 全局搜索 */}
                  <GlobalSearch />
                </div>

                {/* 移动端菜单按钮 */}
                <div className="flex items-center space-x-3 md:hidden">
                  <GlobalSearch />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <motion.span
                      animate={{ rotate: showMobileMenu ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xl"
                    >
                      {showMobileMenu ? '✕' : '☰'}
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.nav>

          {/* 主要内容区域 */}
          <main className="relative">
            <PageTransition>
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/math-resources" element={<MathematicsResources />} />
                  <Route path="/math-symbols" element={<MathematicalSymbols />} />
                  <Route path="/math-tools" element={<MathTools />} />
                  <Route path="/practical-math" element={<PracticalMathematics />} />
                  <Route path="/ai-math" element={<AIMathematics />} />
                  <Route path="/learning-path" element={<MathematicsLearningPath />} />
                  <Route path="/unified-field-theory" element={<UnifiedFieldTheory />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </main>

          {/* 页脚 */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
          >
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {/* 项目信息 */}
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4 space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                      <i className="text-xl text-white fa-solid fa-calculator"></i>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      数学学习平台
                    </span>
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    全面的数学学习平台，提供丰富的学习资源、实用工具和AI辅助，
                    帮助你从基础到高级，系统掌握数学知识。
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                      <i className="mr-2 fa-solid fa-gift"></i>
                      完全免费使用
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      <i className="mr-2 fa-brands fa-osi"></i>
                      MIT 开源项目
                    </span>
                  </div>
                </div>

                {/* 快速链接 */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    快速链接
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/" className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        首页
                      </a>
                    </li>
                    <li>
                      <a href="/math-symbols" className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        数学符号
                      </a>
                    </li>
                    <li>
                      <a href="/math-tools" className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        数学工具
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        法律条款
                      </a>
                    </li>
                  </ul>
                </div>

                {/* 社交媒体 */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    关注我们
                  </h3>
                  <div className="flex space-x-4">
                    <motion.a
                      href="https://github.com/aikjx/math"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-600"
                    >
                      <i className="fa-brands fa-github"></i>
                    </motion.a>
                    <motion.a
                      href="https://x.com/aikjxcom"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </motion.a>
                    <motion.a
                      href="https://www.youtube.com/@aikjx"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* 版权信息 */}
              <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    © 2025 数学学习平台. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <a
                      href="https://github.com/aikjx/math/blob/main/LICENSE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      MIT License
                    </a>
                    <span className="text-gray-400">•</span>
                    <a
                      href="/terms"
                      className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      法律条款
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.footer>

          {/* Toast 通知 */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: theme === 'dark' ? '#374151' : '#ffffff',
                color: theme === 'dark' ? '#ffffff' : '#000000',
                border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
          
          {/* 性能提示 */}
          <motion.div
            className="fixed bottom-4 left-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-lg opacity-80 hover:opacity-100 transition-opacity"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.8 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            💡 所有功能完全免费使用
          </motion.div>
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;