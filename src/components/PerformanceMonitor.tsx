import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

// 移除重复的接口定义，使用hooks中的类型定义

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onToggle?: () => void;
  updateInterval?: number; // 更新间隔（毫秒）
  showInDevOnly?: boolean; // 是否仅在开发环境显示
}

// 保留开发环境检查标志，但使用更现代的导入方式
const IS_DEV = import.meta.env.DEV;

export default function PerformanceMonitor({ 
  isVisible = false, 
  onToggle,
  showInDevOnly = true
}: PerformanceMonitorProps) {
  // 如果设置了仅在开发环境显示且当前不是开发环境，则直接返回null
  if (showInDevOnly && !IS_DEV) {
    return null;
  }
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 使用优化后的性能监控钩子
  const { metrics, incrementComponentsRendered } = usePerformanceOptimization();
  
  // 组件挂载时增加渲染计数
  React.useEffect(() => {
    incrementComponentsRendered();
  }, [incrementComponentsRendered]);

  // 移除所有重复的性能监控逻辑，因为这些已经在usePerformanceOptimization钩子中实现


  // 使用更精确的阈值和更多颜色级别
  const getPerformanceColor = useCallback((value: number, type: 'fps' | 'memory' | 'time' | 'layout' | 'count') => {
    switch (type) {
      case 'fps':
        if (value >= 55) return 'text-green-600';
        if (value >= 40) return 'text-emerald-600';
        if (value >= 30) return 'text-yellow-600';
        return 'text-red-600';
      case 'memory':
        if (value <= 50) return 'text-green-600';
        if (value <= 100) return 'text-emerald-600';
        if (value <= 200) return 'text-yellow-600';
        return 'text-red-600';
      case 'time':
        if (value <= 100) return 'text-green-600';
        if (value <= 200) return 'text-emerald-600';
        if (value <= 500) return 'text-yellow-600';
        return 'text-red-600';
      case 'layout':
        if (value <= 0.05) return 'text-green-600';
        if (value <= 0.1) return 'text-emerald-600';
        if (value <= 0.25) return 'text-yellow-600';
        return 'text-red-600';
      case 'count':
        if (value <= 500) return 'text-green-600';
        if (value <= 1000) return 'text-emerald-600';
        if (value <= 2000) return 'text-yellow-600';
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }, []);
  
  // 优化的性能指标格式化
  const formatMetric = useCallback((value: number, type: string) => {
    switch (type) {
      case 'fps':
        return `${value} FPS`;
      case 'memory':
        return `${value} MB`;
      case 'time':
        return `${value} ms`;
      case 'layout':
        return value.toFixed(3);
      case 'count':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  }, []);
  
  // 详细的指标描述
  const getMetricDescription = useCallback((key: string) => {
    const descriptions: Record<string, string> = {
      fps: '当前FPS',
      avgFps: '平均FPS',
      memoryUsage: '当前内存使用',
      peakMemoryUsage: '峰值内存使用',
      renderTime: '渲染时间',
      loadTime: '页面加载时间',
      domNodes: 'DOM节点数量',
      componentsRendered: '组件渲染数',
      layoutShift: '累积布局偏移(CLS)'
    };
    return descriptions[key] || key;
  }, []);
  
  // 紧凑显示的关键指标 - 使用avgFps替代fps以减少波动
  const compactMetrics = useMemo(() => [
    { key: 'avgFps', value: metrics.avgFps || metrics.fps, type: 'fps' as const },
    { key: 'memoryUsage', value: metrics.memoryUsage, type: 'memory' as const },
    { key: 'renderTime', value: metrics.renderTime, type: 'time' as const }
  ], [metrics]);
  
  // 展开显示的详细指标 - 包含所有扩展指标
  const detailedMetrics = useMemo(() => [
    { key: 'fps', value: metrics.fps, type: 'fps' as const },
    { key: 'peakMemoryUsage', value: metrics.peakMemoryUsage, type: 'memory' as const },
    { key: 'loadTime', value: metrics.loadTime, type: 'time' as const },
    { key: 'domNodes', value: metrics.domNodes, type: 'count' as const },
    { key: 'componentsRendered', value: metrics.componentsRendered, type: 'count' as const },
    { key: 'layoutShift', value: metrics.layoutShift, type: 'layout' as const }
  ], [metrics]);
  
  // 综合性能评分计算（0-100），考虑所有扩展指标
  const performanceScore = useMemo(() => {
    // 基础分数
    let score = 100;
    
    // FPS评分 (最高占比30%)
    if (metrics.fps < 30) {
      score -= 25;
    } else if (metrics.fps < 45) {
      score -= 10;
    }
    
    // 内存使用评分 (最高占比25%)
    if (metrics.memoryUsage > 500) {
      score -= 20;
    } else if (metrics.memoryUsage > 300) {
      score -= 15;
    } else if (metrics.memoryUsage > 100) {
      score -= 5;
    }
    
    // 渲染时间评分 (最高占比15%)
    if (metrics.renderTime > 500) {
      score -= 15;
    } else if (metrics.renderTime > 200) {
      score -= 8;
    }
    
    // 加载时间评分 (最高占比10%)
    if (metrics.loadTime > 2000) {
      score -= 10;
    } else if (metrics.loadTime > 1000) {
      score -= 5;
    }
    
    // DOM节点数量评分 (最高占比10%)
    if (metrics.domNodes > 2000) {
      score -= 10;
    } else if (metrics.domNodes > 1000) {
      score -= 5;
    }
    
    // 布局偏移评分 (最高占比10%)
    if (metrics.layoutShift > 0.25) {
      score -= 10;
    } else if (metrics.layoutShift > 0.1) {
      score -= 5;
    }
    
    // 确保分数在0-100范围内
    return Math.max(0, Math.min(100, score));
  }, [metrics]);
  
  // 获取性能评分颜色 - 更细致的颜色分级
  const getScoreColor = useCallback((score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-emerald-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 45) return 'bg-orange-500';
    return 'bg-red-500';
  }, []);

  if (!isVisible) {
    return (
      <motion.button
        onClick={onToggle}
        className="fixed z-50 p-3 text-white transition-colors bg-gray-900 rounded-full shadow-lg bottom-4 right-4 hover:bg-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fa-solid fa-chart-line"></i>
      </motion.button>
    );
  }

  return (
    <>
      {onToggle && (
        <motion.button
          className="fixed bottom-4 right-4 z-50 p-2 text-xs bg-gray-800 rounded-full shadow-lg dark:bg-gray-700"
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="切换性能监控面板"
        >
          <i className="text-white fa-solid fa-chart-line"></i>
        </motion.button>
      )}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-40 max-w-sm w-full"
            layout
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">性能监控</h3>
            </div>
            
            {/* 性能分数指示器 - 突出显示 */}
            <div className="flex items-center mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${getScoreColor(performanceScore)}`}>
                <span className="font-bold text-white text-xl">{performanceScore}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 dark:text-white text-lg">性能评分</h4>
                <p className={`text-sm font-medium ${getScoreColor(performanceScore).replace('bg-', 'text-')}`}>
                  {performanceScore >= 90 ? '优秀' : 
                   performanceScore >= 75 ? '良好' : 
                   performanceScore >= 60 ? '一般' : 
                   performanceScore >= 45 ? '较差' : '需要优化'}
                </p>
              </div>
            </div>
            
            {/* 关键指标卡片 - 响应式设计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {compactMetrics.map(metric => (
                <motion.div 
                  key={metric.key} 
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className={`font-mono ${getPerformanceColor(metric.value, metric.type)} font-bold text-lg`}>
                    {formatMetric(metric.value, metric.type)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{getMetricDescription(metric.key)}</p>
                </motion.div>
              ))}
            </div>
            
            {/* 详细指标 - 分组显示 */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 dark:text-white">详细指标</h4>
              
              {/* 性能组 */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">性能指标</p>
                {detailedMetrics
                  .filter(m => m.key === 'fps' || m.key === 'layoutShift')
                  .map(metric => (
                    <div key={metric.key} className="flex justify-between items-center py-1 px-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{getMetricDescription(metric.key)}</span>
                      <span className={`font-mono ${getPerformanceColor(metric.value, metric.type)}`}>
                        {formatMetric(metric.value, metric.type)}
                      </span>
                    </div>
                  ))
                }
              </div>
              
              {/* 资源组 */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">资源使用</p>
                {detailedMetrics
                  .filter(m => m.key === 'peakMemoryUsage' || m.key === 'loadTime')
                  .map(metric => (
                    <div key={metric.key} className="flex justify-between items-center py-1 px-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{getMetricDescription(metric.key)}</span>
                      <span className={`font-mono ${getPerformanceColor(metric.value, metric.type)}`}>
                        {formatMetric(metric.value, metric.type)}
                      </span>
                    </div>
                  ))
                }
              </div>
              
              {/* 渲染组 */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-md p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">渲染统计</p>
                {detailedMetrics
                  .filter(m => m.key === 'domNodes' || m.key === 'componentsRendered')
                  .map(metric => (
                    <div key={metric.key} className="flex justify-between items-center py-1 px-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{getMetricDescription(metric.key)}</span>
                      <span className={`font-mono ${getPerformanceColor(metric.value, metric.type)}`}>
                        {formatMetric(metric.value, metric.type)}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
            
            {/* 性能建议 - 智能提示 */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">性能建议</h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                {performanceScore < 60 && (
                  <li className="flex items-start bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    <i className="mr-1 text-red-500 fa-solid fa-exclamation-circle"></i>
                    <span>页面性能较差，建议减少DOM节点数量，优化JavaScript执行</span>
                  </li>
                )}
                {metrics.renderTime > 300 && (
                  <li className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    <span className="mr-1 text-yellow-500">⚠️</span>
                    <span>渲染时间较长，检查是否有大量不必要的重渲染</span>
                  </li>
                )}
                {metrics.memoryUsage > 300 && (
                  <li className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    <span className="mr-1 text-yellow-500">⚠️</span>
                    <span>内存占用较高，检查是否有内存泄漏或不必要的大型对象</span>
                  </li>
                )}
                {metrics.domNodes > 2000 && (
                  <li className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    <span className="mr-1 text-yellow-500">⚠️</span>
                    <span>DOM节点过多，考虑组件拆分或虚拟滚动优化</span>
                  </li>
                )}
                {metrics.layoutShift > 0.25 && (
                  <li className="flex items-start bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                    <span className="mr-1 text-yellow-500">⚠️</span>
                    <span>布局偏移过大，为图片和动态内容设置固定尺寸</span>
                  </li>
                )}
                {performanceScore >= 80 && (
                  <li className="flex items-start bg-green-50 dark:bg-green-900/20 p-2 rounded">
                    <span className="mr-1 text-green-500">✅</span>
                    <span>性能良好，继续保持！考虑进一步优化加载时间</span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}