import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { mathematicalSymbols } from '@/lib/data';
import { toast } from 'sonner';

export default function MathematicalSymbols() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [favoriteSymbols, setFavoriteSymbols] = useState<number[]>(() => {
    // 从localStorage读取收藏的符号
    const saved = localStorage.getItem('favoriteMathSymbols');
    return saved ? JSON.parse(saved) : [];
  });
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [showLatex, setShowLatex] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<typeof mathematicalSymbols[0] | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // 保存收藏到localStorage
  useEffect(() => {
    localStorage.setItem('favoriteMathSymbols', JSON.stringify(favoriteSymbols));
  }, [favoriteSymbols]);
  
  // 生成符号预览的Latex代码
  const generatePreviewCode = (symbol: typeof mathematicalSymbols[0]) => {
    if (symbol.previewCode) return symbol.previewCode;
    if (symbol.latex) return symbol.latex;
    return symbol.name;
  };

  const categories = ['全部', ...Array.from(new Set(mathematicalSymbols.map(symbol => symbol.category)))];

  const filteredSymbols = useMemo(() => {
    return mathematicalSymbols.filter(symbol => {
      // 搜索逻辑
      const matchesSearch = !searchQuery || 
        symbol.symbol.includes(searchQuery) ||
        symbol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        symbol.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        symbol.latex.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 分类过滤
      const matchesCategory = selectedCategory === '全部' || symbol.category === selectedCategory;
      
      // 收藏过滤
      const matchesFavorite = !showFavoritesOnly || favoriteSymbols.includes(symbol.id);
      
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly, favoriteSymbols]);

  const toggleFavorite = (symbolId: number) => {
    setFavoriteSymbols(prev => {
      const isFavorite = prev.includes(symbolId);
      const newFavorites = isFavorite 
        ? prev.filter(id => id !== symbolId)
        : [...prev, symbolId];
      toast.success(isFavorite ? '已取消收藏' : '已添加到收藏');
      return newFavorites;
    });
  };
  
  // 检查符号是否已收藏
  const isSymbolFavorite = (symbolId: number) => {
    return favoriteSymbols.includes(symbolId);
  };

  const copyToClipboard = async (text: string, type: 'symbol' | 'latex') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSymbol(text);
      toast.success(`已复制${type === 'symbol' ? '符号' : 'LaTeX代码'}: ${text}`, { 
        duration: 1500,
        style: {
          background: type === 'symbol' ? '#10B981' : '#3B82F6',
          color: 'white'
        }
      });
      setTimeout(() => setCopiedSymbol(null), 2000);
    } catch (err) {
      toast.error('复制失败，请手动复制', {
        style: { background: '#EF4444', color: 'white' }
      });
    }
  };

  // 分类统计
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mathematicalSymbols.forEach(symbol => {
      counts[symbol.category] = (counts[symbol.category] || 0) + 1;
    });
    // 添加全部计数
    counts['全部'] = mathematicalSymbols.length;
    // 添加收藏计数
    counts['收藏'] = favoriteSymbols.length;
    return counts;
  }, [favoriteSymbols]);
  
  // 热门搜索词
  const popularSearches = [
    { term: '加减乘除', category: '基础运算' },
    { term: '集合', category: '集合论' },
    { term: '积分', category: '微积分' },
    { term: '希腊字母', category: '希腊字母' },
    { term: '极限', category: '微积分' }
  ];
  
  // 快速跳转到热门搜索
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory('全部');
    setShowFavoritesOnly(false);
    // 滚动到结果区域
    setTimeout(() => {
      const resultsElement = document.getElementById('symbol-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  // 获取分类统计
  const getCategoryStats = () => {
    const stats: { [key: string]: number } = {};
    mathematicalSymbols.forEach(symbol => {
      stats[symbol.category] = (stats[symbol.category] || 0) + 1;
    });
    return stats;
  };

  // 使用useMemo计算分类统计
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    mathematicalSymbols.forEach(symbol => {
      stats[symbol.category] = (stats[symbol.category] || 0) + 1;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
            数学符号大全
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-xl text-gray-600 dark:text-gray-300">
            探索数学符号的奥秘，掌握数学语言的精髓 - 包含LaTeX代码和详细说明
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
              <i className="mr-2 fa-solid fa-infinity"></i>
              {mathematicalSymbols.length} 个符号
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-pink-800 bg-pink-100 rounded-full dark:bg-pink-900 dark:text-pink-200">
              <i className="mr-2 fa-solid fa-heart"></i>
              {favoriteSymbols.length} 个收藏
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
              <i className="mr-2 fa-solid fa-gift"></i>
              完全免费使用
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
              placeholder="搜索符号、名称、含义或LaTeX代码..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-4 pl-10 pr-4 text-lg bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
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

          {/* 控制选项 */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLatex}
                onChange={(e) => setShowLatex(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">显示LaTeX代码</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">只看收藏</span>
            </label>
            
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('全部');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              <i className="mr-2 fa-solid fa-refresh"></i>
              重置筛选
            </button>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-purple-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-purple-900/30'
                }`}
              >
                {category}
                {category !== '全部' && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-black/20 rounded-full">
                    {categoryStats[category]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 统计信息 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredSymbols.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">匹配符号</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{categories.length - 1}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">符号分类</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{favoriteSymbols.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">收藏符号</div>
            </div>
            <div className="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">免费使用</div>
            </div>
          </div>
        </motion.div>

        {/* 符号列表 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSymbols.map((symbol, index) => (
            <motion.div 
              key={symbol.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-xl hover:shadow-xl hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                {/* 符号头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 text-center">
                    <div className="mb-2 text-4xl font-bold text-purple-600 transition-transform cursor-pointer dark:text-purple-400 hover:scale-110"
                         onClick={() => copyToClipboard(symbol.symbol, 'symbol')}>
                      {symbol.symbol}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {symbol.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFavorite(symbol.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favoriteSymbols.includes(symbol.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <i className={`fa-${favoriteSymbols.includes(symbol.id) ? 'solid' : 'regular'} fa-heart`}></i>
                  </button>
                </div>

                {/* 分类标签 */}
                <div className="flex justify-center mb-3">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
                    {symbol.category}
                  </span>
                </div>

                {/* 含义说明 */}
                <p className="mb-3 text-center text-gray-600 dark:text-gray-300 line-clamp-2">
                  {symbol.meaning}
                </p>

                {/* 示例 */}
                <div className="p-3 mb-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>示例：</strong> {symbol.example}
                  </p>
                </div>

                {/* LaTeX代码 */}
                {showLatex && (
                  <div className="p-3 mb-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">LaTeX:</span>
                      <button
                        onClick={() => copyToClipboard(symbol.latex, 'latex')}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        <i className="fa-solid fa-copy"></i>
                      </button>
                    </div>
                    <code className="font-mono text-sm text-blue-800 dark:text-blue-200">
                      {symbol.latex}
                    </code>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(symbol.symbol, 'symbol')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      copiedSymbol === symbol.symbol
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800'
                    }`}
                  >
                    <i className={`mr-2 fa-solid ${copiedSymbol === symbol.symbol ? 'fa-check' : 'fa-copy'}`}></i>
                    {copiedSymbol === symbol.symbol ? '已复制' : '复制符号'}
                  </button>
                  
                  <button
                    onClick={() => setSelectedSymbol(symbol)}
                    className="px-3 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                  >
                    <i className="fa-solid fa-info-circle"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
          {filteredSymbols.length === 0 && (
            <motion.div 
              className="py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">未找到匹配的符号</h3>
              <p className="mb-6 max-w-md mx-auto text-gray-500 dark:text-gray-400">
                {showFavoritesOnly ? '您收藏的符号中没有匹配的结果' : '尝试使用不同的关键词或清除筛选条件'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  清除搜索
                </button>
                {selectedCategory !== '全部' && (
                  <button 
                    onClick={() => setSelectedCategory('全部')}
                    className="px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    查看全部分类
                  </button>
                )}
                {showFavoritesOnly && (
                  <button 
                    onClick={() => setShowFavoritesOnly(false)}
                    className="px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    显示所有符号
                  </button>
                )}
              </div>
            </motion.div>
          )}

        {/* 符号详情模态框 */}
        {selectedSymbol && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSymbol(null)}
          >
            <motion.div 
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">符号详情</h3>
                <button
                  onClick={() => setSelectedSymbol(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              
              <div className="mb-4 text-center">
                <div className="mb-2 text-6xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedSymbol.symbol}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedSymbol.name}
                </h4>
                <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200">
                  {selectedSymbol.category}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="mb-2 font-medium text-gray-900 dark:text-white">含义</h5>
                  <p className="text-gray-600 dark:text-gray-300">{selectedSymbol.meaning}</p>
                </div>
                
                <div>
                  <h5 className="mb-2 font-medium text-gray-900 dark:text-white">示例</h5>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <code className="text-sm text-gray-700 dark:text-gray-300">{selectedSymbol.example}</code>
                  </div>
                </div>
                
                <div>
                  <h5 className="mb-2 font-medium text-gray-900 dark:text-white">LaTeX代码</h5>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <code className="font-mono text-sm text-blue-800 dark:text-blue-200">{selectedSymbol.latex}</code>
                    <button
                      onClick={() => copyToClipboard(selectedSymbol.latex, 'latex')}
                      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => copyToClipboard(selectedSymbol.symbol, 'symbol')}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  <i className="mr-2 fa-solid fa-copy"></i>
                  复制符号
                </button>
                <button
                  onClick={() => toggleFavorite(selectedSymbol.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    favoriteSymbols.includes(selectedSymbol.id)
                      ? 'text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <i className={`fa-${favoriteSymbols.includes(selectedSymbol.id) ? 'solid' : 'regular'} fa-heart`}></i>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 使用指南 */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
            使用指南
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="mb-4 text-3xl text-center text-blue-500">
                <i className="fa-solid fa-mouse-pointer"></i>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">
                点击复制
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                点击符号或复制按钮即可快速复制到剪贴板，方便在文档中使用
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="mb-4 text-3xl text-center text-green-500">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">
                LaTeX支持
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                每个符号都提供对应的LaTeX代码，方便在学术论文和数学文档中使用
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="mb-4 text-3xl text-center text-red-500">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">
                收藏管理
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                收藏常用符号，建立个人符号库，提高学习和工作效率
              </p>
            </div>
          </div>
        </motion.div>

        {/* 常用符号快速访问 */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
            常用符号快速访问
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">基础运算</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['±', '∞', '≈', '≠', '≤', '≥'].map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => copyToClipboard(symbol, 'symbol')}
                    className="px-3 py-2 text-lg font-bold text-purple-600 bg-purple-100 rounded hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">集合论</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['∈', '∉', '⊆', '∪', '∩', '∅'].map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => copyToClipboard(symbol, 'symbol')}
                    className="px-3 py-2 text-lg font-bold text-blue-600 bg-blue-100 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">微积分</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['∫', '∂', '∇', 'Δ', '∑', '∏'].map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => copyToClipboard(symbol, 'symbol')}
                    className="px-3 py-2 text-lg font-bold text-green-600 bg-green-100 rounded hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <h3 className="mb-3 text-lg font-semibold text-center text-gray-900 dark:text-white">希腊字母</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['α', 'β', 'γ', 'δ', 'π', 'λ'].map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => copyToClipboard(symbol, 'symbol')}
                    className="px-3 py-2 text-lg font-bold text-red-600 bg-red-100 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}