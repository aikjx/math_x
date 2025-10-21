import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { mathematicalSymbols, type MathematicalSymbolExtended } from '@/lib/data';
import VirtualizedList from '@/components/VirtualizedList';
import LearningProgress from '@/components/LearningProgress';
import MathFormulaEditor from '@/components/MathFormulaEditor';
import SmartSearch from '@/components/SmartSearch';
import { LearningProgressChart } from '@/components/DataVisualization';
import SmartRecommendation from '@/components/SmartRecommendation';
import PerformanceMonitor from '@/components/PerformanceMonitor';

interface Symbol {
  id: number;
  symbol: string;
  name: string;
  category: string;
  meaning: string;
  example: string;
  latex: string;
}

// 转换函数，将MathematicalSymbolExtended转换为Symbol
const convertToSymbol = (item: MathematicalSymbolExtended): Symbol => ({
  id: item.id,
  symbol: item.symbol,
  name: item.name,
  category: item.category,
  meaning: item.description || '暂无描述',
  example: item.usage || '暂无示例',
  latex: item.latex
});

interface SearchResult {
  item: Symbol;
  score: number;
  matches: Array<{
    field: string;
    value: string;
    indices: [number, number][];
  }>;
}

export default function AdvancedMathSymbols() {
  const [symbols] = useState<Symbol[]>(mathematicalSymbols.map(convertToSymbol));
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Symbol[]>([]);
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showProgressChart, setShowProgressChart] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('list');

  // 搜索字段配置
  const searchFields = useMemo(() => [
    { key: 'name' as keyof Symbol, weight: 3, fuzzy: true },
    { key: 'meaning' as keyof Symbol, weight: 2, fuzzy: true },
    { key: 'symbol' as keyof Symbol, weight: 2, fuzzy: false },
    { key: 'latex' as keyof Symbol, weight: 1.5, fuzzy: false },
    { key: 'category' as keyof Symbol, weight: 1, fuzzy: false }
  ], []);

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(symbols.map((symbol: Symbol) => symbol.category)));
    return ['all', ...cats];
  }, [symbols]);

  // 处理搜索结果
  const handleSearch = useCallback((results: SearchResult[], query: string) => {
    setSearchResults(results);
    setCurrentQuery(query);
  }, []);

  // 获取显示的符号列表
  const displayedSymbols = useMemo(() => {
    let filteredSymbols = currentQuery ? searchResults.map(r => r.item) : symbols;
    
    if (activeCategory !== 'all') {
      filteredSymbols = filteredSymbols.filter((symbol: Symbol) => symbol.category === activeCategory);
    }
    
    return filteredSymbols;
  }, [symbols, searchResults, currentQuery, activeCategory]);

  // 处理符号点击
  const handleSymbolClick = useCallback((symbol: Symbol) => {
    setSelectedSymbol(symbol);
    
    // 添加到最近查看
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s.id !== symbol.id);
      return [symbol, ...filtered].slice(0, 10);
    });

    // 更新学习进度
    setCurrentStep(prev => prev + 1);
    
    toast.success(`已查看符号: ${symbol.name}`);
  }, []);

  // 复制LaTeX代码
  const copyLatex = useCallback((latex: string) => {
    navigator.clipboard.writeText(latex).then(() => {
      toast.success('LaTeX代码已复制到剪贴板');
    });
  }, []);

  // 模拟用户档案
  const userProfile = useMemo(() => ({
    completedItems: recentlyViewed.map(s => s.id.toString()),
    currentLevel: 'intermediate' as const,
    interests: ['代数', '几何', '微积分'],
    learningGoals: ['掌握基础符号', '理解高级概念'],
    timePreference: 30,
    weakAreas: ['统计学', '概率论'],
    strongAreas: ['代数', '几何']
  }), [recentlyViewed]);

  // 模拟推荐数据
  const recommendationItems = useMemo(() => 
    symbols.slice(0, 20).map(symbol => ({
      id: symbol.id.toString(),
      title: symbol.name,
      description: symbol.meaning,
      type: 'symbol' as const,
      difficulty: Math.random() > 0.6 ? 'advanced' as const : 
                 Math.random() > 0.3 ? 'intermediate' as const : 'beginner' as const,
      category: symbol.category,
      tags: [symbol.category, '数学符号'],
      relevanceScore: Math.random(),
      estimatedTime: Math.floor(Math.random() * 20) + 5,
      prerequisites: Math.random() > 0.7 ? [symbols[Math.floor(Math.random() * 5)].id.toString()] : undefined
    })), [symbols]);

  // 模拟学习进度数据
  const progressData = useMemo(() => [
    { topic: '基础符号', completed: recentlyViewed.length, total: 50, category: '基础' },
    { topic: '高级符号', completed: Math.floor(recentlyViewed.length * 0.6), total: 30, category: '进阶' },
    { topic: '专业符号', completed: Math.floor(recentlyViewed.length * 0.3), total: 20, category: '专业' }
  ], [recentlyViewed.length]);

  // 渲染符号项 - 列表模式
  const renderSymbolItem = useCallback((symbol: Symbol, index: number) => {
    const searchResult = searchResults.find(r => r.item.id === symbol.id);
    
    return (
      <div className="flex items-center p-4 transition-colors border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
        <div className="flex items-center flex-1">
          <span className="mr-4 font-mono text-2xl text-gray-900 dark:text-white">
            {symbol.symbol}
          </span>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {searchResult ? (
                <span dangerouslySetInnerHTML={{
                  __html: symbol.name.replace(
                    new RegExp(`(${currentQuery})`, 'gi'),
                    '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>'
                  )
                }} />
              ) : (
                symbol.name
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {searchResult ? (
                <span dangerouslySetInnerHTML={{
                  __html: symbol.meaning.replace(
                    new RegExp(`(${currentQuery})`, 'gi'),
                    '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>'
                  )
                }} />
              ) : (
                symbol.meaning
              )}
            </div>
            <span className="inline-flex px-2 mt-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
              {symbol.category}
            </span>
            {searchResult && (
              <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">
                匹配度: {Math.round(searchResult.score * 100)}%
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSymbolClick(symbol)}
            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
          >
            查看
          </button>
          <button
            onClick={() => copyLatex(symbol.latex)}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          >
            复制
          </button>
        </div>
      </div>
    );
  }, [searchResults, currentQuery, handleSymbolClick, copyLatex]);

  // 渲染符号项 - 网格模式
  const renderSymbolGrid = useCallback((symbol: Symbol, index: number) => (
    <motion.div
      key={symbol.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="text-center">
        <div className="mb-3 font-mono text-3xl text-gray-900 dark:text-white">
          {symbol.symbol}
        </div>
        <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
          {symbol.name}
        </h3>
        <p className="mb-3 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {symbol.meaning}
        </p>
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleSymbolClick(symbol)}
            className="px-3 py-1 text-xs text-green-600 border border-green-600 rounded hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20"
          >
            查看
          </button>
          <button
            onClick={() => copyLatex(symbol.latex)}
            className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
          >
            复制
          </button>
        </div>
      </div>
    </motion.div>
  ), [handleSymbolClick, copyLatex]);

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            高级数学符号平台
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            智能搜索 • 个性化推荐 • 数据可视化 • 性能监控
          </p>
        </motion.div>

        {/* 学习进度 */}
        <LearningProgress
          topicId="advanced-math-symbols"
          topicTitle="高级数学符号学习"
          totalSteps={symbols.length}
          currentStep={currentStep}
          onProgressUpdate={(progress) => {
            console.log('学习进度更新:', progress);
          }}
        />

        {/* 功能控制面板 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-4 mb-8 bg-white rounded-lg shadow-lg dark:bg-gray-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowRecommendations(!showRecommendations)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  showRecommendations
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <i className="mr-2 fa-solid fa-robot"></i>
                智能推荐
              </button>
              
              <button
                onClick={() => setShowProgressChart(!showProgressChart)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  showProgressChart
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <i className="mr-2 fa-solid fa-chart-bar"></i>
                进度图表
              </button>
              
              <button
                onClick={() => setShowFormulaEditor(!showFormulaEditor)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  showFormulaEditor
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <i className="mr-2 fa-solid fa-calculator"></i>
                公式编辑器
              </button>
            </div>

            {/* 视图模式切换 */}
            <div className="flex border border-gray-300 rounded-lg dark:border-gray-700">
              {(['list', 'grid', 'table'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 text-sm ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  } ${mode === 'list' ? 'rounded-l-lg' : mode === 'table' ? 'rounded-r-lg' : ''}`}
                >
                  <i className={`fa-solid ${
                    mode === 'list' ? 'fa-list' : 
                    mode === 'grid' ? 'fa-th' : 'fa-table'
                  }`}></i>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 智能搜索 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SmartSearch
            items={symbols}
            searchFields={searchFields}
            onSearch={handleSearch}
            placeholder="智能搜索数学符号..."
            className="max-w-2xl mx-auto"
            showSuggestions={true}
            maxSuggestions={8}
          />
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? '全部' : category}
                <span className="ml-2 text-xs opacity-75">
                  ({category === 'all' ? symbols.length : symbols.filter(s => s.category === category).length})
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 动态内容区域 */}
        <div className="space-y-8">
          {/* 智能推荐 */}
          <AnimatePresence>
            {showRecommendations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <SmartRecommendation
                  items={recommendationItems}
                  userProfile={userProfile}
                  maxRecommendations={6}
                  onItemClick={(item) => {
                    const symbol = symbols.find(s => s.id.toString() === item.id);
                    if (symbol) handleSymbolClick(symbol);
                  }}
                  onFeedback={(itemId, feedback) => {
                    toast.success(`反馈已记录: ${feedback}`);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 学习进度图表 */}
          <AnimatePresence>
            {showProgressChart && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <LearningProgressChart progressData={progressData} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 公式编辑器 */}
          <AnimatePresence>
            {showFormulaEditor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <MathFormulaEditor
                  onFormulaChange={(formula, rendered) => {
                    console.log('公式变化:', formula, rendered);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 符号列表/网格 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  符号{viewMode === 'list' ? '列表' : viewMode === 'grid' ? '网格' : '表格'} 
                  ({displayedSymbols.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <i className="fa-solid fa-rocket"></i>
                  <span>高级优化</span>
                  {currentQuery && (
                    <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-200">
                      搜索: {currentQuery}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {displayedSymbols.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {displayedSymbols.map((symbol, index) => renderSymbolGrid(symbol, index))}
                  </div>
                </div>
              ) : (
                <VirtualizedList
                  items={displayedSymbols}
                  itemHeight={80}
                  containerHeight={600}
                  renderItem={renderSymbolItem}
                  className="border-0"
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <i className="mb-4 text-5xl text-gray-400 fa-solid fa-search"></i>
                <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">未找到符号</h3>
                <p className="max-w-md text-center text-gray-500 dark:text-gray-400">
                  {currentQuery ? `没有找到匹配"${currentQuery}"的符号` : '当前分类下没有符号'}
                </p>
                <button
                  onClick={() => {
                    setCurrentQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  查看全部符号
                </button>
              </div>
            )}
          </motion.div>

          {/* 侧边栏信息 */}
          {selectedSymbol && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    符号详情
                  </h3>
                  <button
                    onClick={() => setSelectedSymbol(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gray-100 rounded-full dark:bg-gray-700">
                      <span className="font-mono text-3xl text-gray-900 dark:text-white">
                        {selectedSymbol.symbol}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedSymbol.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedSymbol.category}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">含义</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedSymbol.meaning}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">示例</h5>
                    <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {selectedSymbol.example}
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">LaTeX代码</h5>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-3 py-2 text-sm bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                        {selectedSymbol.latex}
                      </code>
                      <button
                        onClick={() => copyLatex(selectedSymbol.latex)}
                        className="px-3 py-2 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                      >
                        复制
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 性能监控 */}
      <PerformanceMonitor
        isVisible={showPerformanceMonitor}
        onToggle={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
      />
    </div>
  );
}