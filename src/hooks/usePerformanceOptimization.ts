import { useEffect, useState, useRef, useCallback } from 'react';

// 扩展性能数据接口，添加新的性能指标
export interface PerformanceMetrics {
  fps: number;
  avgFps: number;
  memoryUsage: number;
  peakMemoryUsage: number;
  renderTime: number;
  loadTime: number;
  domNodes: number;
  componentsRendered: number;
  layoutShift: number;
}

interface UsePerformanceOptimizationOptions {
  enableFPSMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  enableRenderTimeMonitoring?: boolean;
  enableDomMonitoring?: boolean;
  enableLayoutShiftMonitoring?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

// 节流函数实现
function throttle<T extends (...args: any[]) => any>(func: T, limit: number) {
  let lastCall = 0;
  return function(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func(...args);
    }
  };
}

export const usePerformanceOptimization = (options: UsePerformanceOptimizationOptions = {}) => {
  const {
    enableFPSMonitoring = true,
    enableMemoryMonitoring = true,
    enableRenderTimeMonitoring = true,
    enableDomMonitoring = true,
    enableLayoutShiftMonitoring = true,
    onMetricsUpdate
  } = options;

  // 使用useState来存储指标，使其更适合React的状态管理
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    avgFps: 0,
    memoryUsage: 0,
    peakMemoryUsage: 0,
    renderTime: 0,
    loadTime: 0,
    domNodes: 0,
    componentsRendered: 0,
    layoutShift: 0
  });

  // FPS相关引用
  const fpsHistoryRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  
  // 内存相关引用
  const peakMemoryRef = useRef<number>(0);
  
  // 组件渲染计数
  const componentsRenderedRef = useRef<number>(0);
  
  // 布局偏移相关
  const clsRef = useRef<PerformanceObserver | null>(null);

  // FPS 监控 - 优化版本
  const updateFPS = useCallback(() => {
    if (!enableFPSMonitoring) return;

    const now = performance.now();
    const delta = now - lastTimeRef.current;
    
    frameCountRef.current++;
    
    if (delta >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / delta);
      
      // 更新FPS历史记录并计算平均值
      fpsHistoryRef.current.push(fps);
      if (fpsHistoryRef.current.length > 60) { // 保留最近60秒的数据
        fpsHistoryRef.current.shift();
      }
      
      const avgFps = Math.round(
        fpsHistoryRef.current.reduce((sum, value) => sum + value, 0) / fpsHistoryRef.current.length
      );
      
      setMetrics(prev => ({ ...prev, fps, avgFps }));
      
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
  }, [enableFPSMonitoring]);

  // 内存使用监控 - 增加峰值监控
  const updateMemoryUsage = useCallback(() => {
    if (!enableMemoryMonitoring) return;

    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      
      // 更新峰值内存
      if (memoryUsage > peakMemoryRef.current) {
        peakMemoryRef.current = memoryUsage;
      }
      
      setMetrics(prev => ({ 
        ...prev, 
        memoryUsage, 
        peakMemoryUsage: peakMemoryRef.current 
      }));
    }
  }, [enableMemoryMonitoring]);

  // 渲染时间监控 - 优化版本
  const measureRenderTime = useCallback((callback?: () => void) => {
    if (!enableRenderTimeMonitoring) {
      if (callback) callback();
      return;
    }

    const startTime = performance.now();
    if (callback) callback();
    
    // 使用requestAnimationFrame在下一帧记录结束时间
    requestAnimationFrame(() => {
      // 使用requestIdleCallback减少主线程阻塞
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(() => {
          const endTime = performance.now();
          setMetrics(prev => ({ 
            ...prev, 
            renderTime: Math.round(endTime - startTime) 
          }));
        });
      } else {
        setTimeout(() => {
          const endTime = performance.now();
          setMetrics(prev => ({ 
            ...prev, 
            renderTime: Math.round(endTime - startTime) 
          }));
        }, 0);
      }
    });
  }, [enableRenderTimeMonitoring]);

  // 计算DOM节点数量
  const countDomNodes = useCallback(throttle(() => {
    if (!enableDomMonitoring) return;
    
    const domNodes = document.querySelectorAll('*').length;
    setMetrics(prev => ({ ...prev, domNodes }));
  }, 5000), [enableDomMonitoring]); // 5秒更新一次

  // 监控布局偏移(CLS)
  const monitorLayoutShift = useCallback(() => {
    if (!enableLayoutShiftMonitoring || typeof PerformanceObserver === 'undefined') return;
    
    try {
      clsRef.current = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            setMetrics(prev => ({ 
              ...prev, 
              layoutShift: prev.layoutShift + entry.value 
            }));
          }
        });
      });
      
      clsRef.current.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.error('无法监控布局偏移:', error);
    }
  }, [enableLayoutShiftMonitoring]);

  // 页面加载时间 - 使用PerformanceNavigationTiming
  useEffect(() => {
    if (typeof performance.getEntriesByType === 'function') {
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const loadTime = Math.round(navigationEntry.loadEventEnd - navigationEntry.startTime);
          setMetrics(prev => ({ ...prev, loadTime }));
        }
      } catch (error) {
        // 降级到传统API
        if (typeof performance.timing !== 'undefined') {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          setMetrics(prev => ({ ...prev, loadTime }));
        }
      }
    }
  }, []);

  // 组件渲染计数辅助函数
  const incrementComponentsRendered = useCallback(() => {
    componentsRenderedRef.current++;
    setMetrics(prev => ({ 
      ...prev, 
      componentsRendered: componentsRenderedRef.current 
    }));
  }, []);

  // 性能监控循环
  useEffect(() => {
    let animationFrameId: number;

    const monitorPerformance = () => {
      updateFPS();
      
      animationFrameId = requestAnimationFrame(monitorPerformance);
    };

    // 启动监控
    if (enableFPSMonitoring) {
      animationFrameId = requestAnimationFrame(monitorPerformance);
    }
    
    // 内存监控使用setTimeout降低频率
    let memoryTimer: number;
    if (enableMemoryMonitoring) {
      memoryTimer = window.setInterval(updateMemoryUsage, 5000);
    }
    
    // 初始DOM节点计数
    if (enableDomMonitoring) {
      countDomNodes();
    }
    
    // 初始化布局偏移监控
    monitorLayoutShift();

    // 定期更新DOM节点计数
    let domTimer: number;
    if (enableDomMonitoring) {
      domTimer = window.setInterval(countDomNodes, 10000);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (memoryTimer) {
        clearInterval(memoryTimer);
      }
      if (domTimer) {
        clearInterval(domTimer);
      }
      if (clsRef.current) {
        clsRef.current.disconnect();
      }
    };
  }, [enableFPSMonitoring, enableMemoryMonitoring, enableDomMonitoring, enableLayoutShiftMonitoring, updateFPS, updateMemoryUsage, countDomNodes, monitorLayoutShift]);

  // 性能优化建议 - 扩展版本
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations: string[] = [];
    const { fps, memoryUsage, domNodes, layoutShift } = metrics;

    if (fps < 30) {
      recommendations.push('FPS过低，建议减少动画效果或优化渲染逻辑');
    }

    if (memoryUsage > 100) {
      recommendations.push('内存使用过高，建议检查内存泄漏或优化数据结构');
    }
    
    if (domNodes > 1000) {
      recommendations.push('DOM节点数量过多，可能导致渲染性能下降');
    }
    
    if (layoutShift > 0.1) {
      recommendations.push('布局偏移较大，建议为图片和动态内容添加明确尺寸');
    }

    if (fps >= 55 && memoryUsage < 50) {
      recommendations.push('性能表现优秀！');
    }

    return recommendations;
  }, [metrics]);

  // 性能等级评估 - 扩展版本
  const getPerformanceGrade = useCallback(() => {
    const { fps, memoryUsage, layoutShift } = metrics;
    
    if (fps >= 55 && memoryUsage < 50 && layoutShift < 0.05) return 'A+';
    if (fps >= 45 && memoryUsage < 75 && layoutShift < 0.1) return 'A';
    if (fps >= 35 && memoryUsage < 100 && layoutShift < 0.25) return 'B';
    if (fps >= 25 && memoryUsage < 150) return 'C';
    return 'D';
  }, [metrics]);

  return {
    metrics,
    measureRenderTime,
    getPerformanceRecommendations,
    getPerformanceGrade,
    incrementComponentsRendered // 暴露组件渲染计数方法给父组件使用
  };
};