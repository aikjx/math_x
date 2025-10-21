import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export default function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(items.length - 1, visibleEnd + overscan);

    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollElementRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={visibleRange.start + index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.start + index)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 搜索优化 Hook
export function useOptimizedSearch<T>(
  items: T[],
  searchQuery: string,
  searchFields: (keyof T)[],
  debounceMs: number = 300
) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // 优化的搜索算法
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    const query = debouncedQuery.toLowerCase();
    const filtered = items.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query);
        }
        return false;
      });
    });

    setFilteredItems(filtered);
  }, [items, debouncedQuery, searchFields]);

  return { filteredItems, debouncedQuery };
}

// 数据缓存 Hook
export function useDataCache<T>(
  key: string,
  fetchData: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5分钟缓存
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(`cache_${key}`);
    const cachedTime = localStorage.getItem(`cache_time_${key}`);

    if (cachedData && cachedTime) {
      const age = Date.now() - parseInt(cachedTime);
      if (age < ttl) {
        try {
          setData(JSON.parse(cachedData));
          return;
        } catch (e) {
          console.warn('Failed to parse cached data:', e);
        }
      }
    }

    // 缓存过期或不存在，重新获取数据
    setLoading(true);
    fetchData()
      .then(result => {
        setData(result);
        localStorage.setItem(`cache_${key}`, JSON.stringify(result));
        localStorage.setItem(`cache_time_${key}`, Date.now().toString());
        setError(null);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key, ttl]);

  const invalidateCache = () => {
    localStorage.removeItem(`cache_${key}`);
    localStorage.removeItem(`cache_time_${key}`);
  };

  return { data, loading, error, invalidateCache };
}