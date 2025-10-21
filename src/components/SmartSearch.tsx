import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult<T> {
  item: T;
  score: number;
  matches: Array<{
    field: string;
    value: string;
    indices: [number, number][];
  }>;
}

interface SmartSearchProps<T> {
  items: T[];
  searchFields: Array<{
    key: keyof T;
    weight: number;
    fuzzy?: boolean;
  }>;
  onSearch: (results: SearchResult<T>[], query: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
  maxSuggestions?: number;
  debounceMs?: number;
  minQueryLength?: number;
}

export default function SmartSearch<T>({
  items,
  searchFields,
  onSearch,
  placeholder = "智能搜索...",
  className = "",
  showSuggestions = true,
  maxSuggestions = 5,
  debounceMs = 300,
  minQueryLength = 1
}: SmartSearchProps<T>) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 防抖处理
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // 模糊匹配算法
  const fuzzyMatch = useCallback((text: string, pattern: string): { score: number; indices: [number, number][] } => {
    const textLower = text.toLowerCase();
    const patternLower = pattern.toLowerCase();
    
    if (textLower.includes(patternLower)) {
      const startIndex = textLower.indexOf(patternLower);
      return {
        score: 1.0,
        indices: [[startIndex, startIndex + patternLower.length]]
      };
    }

    // 模糊匹配
    let score = 0;
    let patternIndex = 0;
    const indices: [number, number][] = [];
    let matchStart = -1;

    for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
      if (textLower[i] === patternLower[patternIndex]) {
        if (matchStart === -1) matchStart = i;
        patternIndex++;
        
        if (patternIndex === patternLower.length) {
          indices.push([matchStart, i + 1]);
          score = 0.7 * (patternLower.length / text.length);
        }
      } else if (matchStart !== -1) {
        indices.push([matchStart, i]);
        matchStart = -1;
      }
    }

    return { score, indices };
  }, []);

  // 搜索算法
  const performSearch = useCallback((searchQuery: string): SearchResult<T>[] => {
    if (!searchQuery || searchQuery.length < minQueryLength) {
      return [];
    }

    const results: SearchResult<T>[] = [];

    items.forEach(item => {
      let totalScore = 0;
      const matches: SearchResult<T>['matches'] = [];

      searchFields.forEach(({ key, weight, fuzzy = false }) => {
        const value = String(item[key] || '');
        
        if (fuzzy) {
          const fuzzyResult = fuzzyMatch(value, searchQuery);
          if (fuzzyResult.score > 0) {
            totalScore += fuzzyResult.score * weight;
            matches.push({
              field: String(key),
              value,
              indices: fuzzyResult.indices
            });
          }
        } else {
          const lowerValue = value.toLowerCase();
          const lowerQuery = searchQuery.toLowerCase();
          
          if (lowerValue.includes(lowerQuery)) {
            const exactMatch = lowerValue === lowerQuery;
            const startsWith = lowerValue.startsWith(lowerQuery);
            
            let fieldScore = exactMatch ? 1.0 : startsWith ? 0.8 : 0.5;
            totalScore += fieldScore * weight;
            
            const startIndex = lowerValue.indexOf(lowerQuery);
            matches.push({
              field: String(key),
              value,
              indices: [[startIndex, startIndex + lowerQuery.length]]
            });
          }
        }
      });

      if (totalScore > 0) {
        results.push({ item, score: totalScore, matches });
      }
    });

    // 按分数排序
    return results.sort((a, b) => b.score - a.score);
  }, [items, searchFields, minQueryLength, fuzzyMatch]);

  // 生成搜索建议
  const generateSuggestions = useCallback((searchQuery: string): string[] => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const suggestionSet = new Set<string>();
    
    // 从历史记录中获取建议
    searchHistory.forEach(historyItem => {
      if (historyItem.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestionSet.add(historyItem);
      }
    });

    // 从数据中提取相关词汇
    items.forEach(item => {
      searchFields.forEach(({ key }) => {
        const value = String(item[key] || '');
        const words = value.split(/\s+/);
        
        words.forEach(word => {
          if (word.toLowerCase().includes(searchQuery.toLowerCase()) && word.length > 2) {
            suggestionSet.add(word);
          }
        });
      });
    });

    return Array.from(suggestionSet).slice(0, maxSuggestions);
  }, [items, searchFields, searchHistory, maxSuggestions]);

  // 执行搜索
  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      
      const results = performSearch(debouncedQuery);
      onSearch(results, debouncedQuery);
      
      // 更新搜索历史
      if (debouncedQuery.length >= 2) {
        setSearchHistory(prev => {
          const newHistory = [debouncedQuery, ...prev.filter(item => item !== debouncedQuery)];
          return newHistory.slice(0, 10); // 保留最近10次搜索
        });
      }
      
      setIsSearching(false);
    } else {
      onSearch([], '');
    }
  }, [debouncedQuery, performSearch, onSearch]);

  // 更新建议
  useEffect(() => {
    if (showSuggestions && query) {
      const newSuggestions = generateSuggestions(query);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, showSuggestions, generateSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestionsList(value.length > 0 && showSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestionsList(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestionsList(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestionsList(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isSearching ? (
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600"></div>
          ) : (
            <i className="text-gray-400 fa-solid fa-search"></i>
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestionsList(query.length > 0 && showSuggestions)}
          placeholder={placeholder}
          className="block w-full py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        )}
      </div>

      {/* 搜索建议 */}
      <AnimatePresence>
        {showSuggestionsList && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="py-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <i className="mr-3 text-gray-400 fa-solid fa-history"></i>
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 搜索统计 */}
      {debouncedQuery && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          搜索 "{debouncedQuery}" 
          {isSearching ? ' 搜索中...' : ''}
        </div>
      )}
    </div>
  );
}

// 高亮匹配文本的组件
export function HighlightText({ 
  text, 
  indices, 
  className = "" 
}: { 
  text: string; 
  indices: [number, number][]; 
  className?: string;
}) {
  if (!indices || indices.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const parts: Array<{ text: string; highlighted: boolean }> = [];
  let lastIndex = 0;

  indices.forEach(([start, end]) => {
    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), highlighted: false });
    }
    parts.push({ text: text.slice(start, end), highlighted: true });
    lastIndex = end;
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), highlighted: false });
  }

  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span
          key={index}
          className={part.highlighted ? 'bg-yellow-200 dark:bg-yellow-800 font-semibold' : ''}
        >
          {part.text}
        </span>
      ))}
    </span>
  );
}