import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { mathematicalSymbols } from '@/lib/data';
import VirtualizedList, { useOptimizedSearch } from '@/components/VirtualizedList';
import LearningProgress from '@/components/LearningProgress';
import MathFormulaEditor from '@/components/MathFormulaEditor';

interface Symbol {
  id: number;
  symbol: string;
  name: string;
  category: string;
  meaning: string;
  example: string;
  latex: string;
}

export default function MathematicalSymbolsOptimized() {
  const [symbols] = useState<Symbol[]>(mathematicalSymbols);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Symbol[]>([]);
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 使用优化的搜索 Hook
  const { filteredItems: searchFilteredSymbols } = useOptimizedSearch(
    symbols,
    searchQuery,
    ['name', 'meaning', 'latex', 'symbol']
  );

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(symbols.map((symbol: Symbol) => symbol.category)));
    return ['all', ...cats];
  }, [symbols]);

  // 过滤符号（搜索 + 分类）
  const filteredSymbols = useMemo(() => {
    return searchFilteredSymbols.filter((symbol: Symbol) => {
      const matchesCategory = activeCategory === 'all' || symbol.category === activeCategory;
      return matchesCategory;
    });
  }, [searchFilteredSymbols, activeCategory]);

  // 处理符号点击
  const handleSymbolClick = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
    
    // 添加到最近查看
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s.id !== symbol.id);
      return [symbol, ...filtered].slice(0, 5);
    });

    // 更新学习进度
    setCurrentStep(prev => prev + 1);
  };

  // 复制LaTeX代码
  const copyLatex = (latex: string) => {
    navigator.clipboard.writeText(latex).then(() => {
      toast.success('LaTeX代码已复制到剪贴板');
    });
  };

  // 渲染符号项
  const renderSymbolItem = (symbol: Symbol, index: number) => (
    <div className="flex items-center p-4 transition-colors border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex items-center flex-1">
        <span className="mr-4 font-mono text-2xl text-gray-900 dark:text-white">
          {symbol.symbol}
        </span>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {symbol.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {symbol.meaning}
          </div>
          <span className="inline-flex px-2 mt-1 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
            {symbol.category}
          </span>
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
            数学符号大全 (优化版)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            全面的数学符号解释，包含名称、含义和使用示例
          </p>
        </motion.div>

        {/* 学习进度 */}
        <LearningProgress
          topicId="mathematical-symbols"
          topicTitle="数学符号学习"
          totalSteps={symbols.length}
          currentStep={currentStep}
          onProgressUpdate={(progress) => {
            console.log('学习进度更新:', progress);
          }}
        />

        {/* 搜索和筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="text-gray-400 fa-solid fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="搜索符号、名称或含义..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-3 pl-10 pr-4 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
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
                </button>
              ))}
            </div>

            {/* 工具按钮 */}
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFormulaEditor(!showFormulaEditor)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  showFormulaEditor
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
              >
                <i className="mr-2 fa-solid fa-calculator"></i>
                公式编辑器
              </button>
            </div>
          </div>
        </motion.div>

        {/* 公式编辑器 */}
        {showFormulaEditor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <MathFormulaEditor
              onFormulaChange={(formula, rendered) => {
                console.log('公式变化:', formula, rendered);
              }}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 符号列表 - 使用虚拟滚动 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    符号列表 ({filteredSymbols.length})
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-rocket"></i>
                    <span>虚拟滚动优化</span>
                  </div>
                </div>
              </div>
              
              {filteredSymbols.length > 0 ? (
                <VirtualizedList
                  items={filteredSymbols}
                  itemHeight={80}
                  containerHeight={600}
                  renderItem={renderSymbolItem}
                  className="border-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <i className="mb-4 text-5xl text-gray-400 fa-solid fa-search"></i>
                  <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">未找到符号</h3>
                  <p className="max-w-md text-gray-500 dark:text-gray-400">
                    没有找到匹配"{searchQuery}"的符号，请尝试其他搜索词或浏览全部符号
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    查看全部符号
                  </button>
                </div>
              )}
              
              {filteredSymbols.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    共 {filteredSymbols.length} 个符号
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const exportData = filteredSymbols.map((s: Symbol) => `${s.symbol}\t${s.name}\t${s.latex}`).join('\n');
                        navigator.clipboard.writeText(exportData).then(() => {
                          toast.success('符号列表已复制');
                        });
                      }}
                      className="px-3 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <i className="mr-1 fa-solid fa-download"></i> 导出列表
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 符号详情 */}
            {selectedSymbol && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      符号详情
                    </h3>
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

            {/* 最近查看 */}
            {recentlyViewed.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
              >
                <div className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    最近查看
                  </h3>
                  <div className="space-y-2">
                    {recentlyViewed.map((symbol: Symbol) => (
                      <button
                        key={symbol.id}
                        onClick={() => handleSymbolClick(symbol)}
                        className="flex items-center w-full p-2 text-left transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="mr-3 font-mono text-xl text-gray-900 dark:text-white">
                          {symbol.symbol}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {symbol.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate dark:text-gray-400">
                            {symbol.category}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 快速操作 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
            >
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  快速操作
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="flex items-center w-full p-2 text-left transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="mr-3 text-blue-600 fa-solid fa-refresh dark:text-blue-400"></i>
                    <span className="text-sm text-gray-900 dark:text-white">重置筛选</span>
                  </button>
                  <button
                    onClick={() => {
                      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                      handleSymbolClick(randomSymbol);
                    }}
                    className="flex items-center w-full p-2 text-left transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="mr-3 text-green-600 fa-solid fa-random dark:text-green-400"></i>
                    <span className="text-sm text-gray-900 dark:text-white">随机符号</span>
                  </button>
                  <button
                    onClick={() => setShowFormulaEditor(!showFormulaEditor)}
                    className="flex items-center w-full p-2 text-left transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <i className="mr-3 text-purple-600 fa-solid fa-calculator dark:text-purple-400"></i>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {showFormulaEditor ? '隐藏' : '显示'}公式编辑器
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* 学习统计 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white shadow-lg dark:bg-gray-800 rounded-xl"
            >
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  学习统计
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {recentlyViewed.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">已查看符号</div>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Math.round((recentlyViewed.length / symbols.length) * 100)}%
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">完成进度</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}