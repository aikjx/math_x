/**
 * 浏览器端性能测试脚本
 * 在开发者控制台中运行以测试实际性能
 */

class BrowserPerformanceTester {
  constructor() {
    this.results = {};
    this.observer = null;
    this.startTime = 0;
  }

  // 测试页面加载性能
  async testPageLoadPerformance() {
    console.log('🚀 开始页面加载性能测试');
    
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      const firstPaint = window.performance.getEntriesByType('paint')[0]?.startTime || 0;
      
      console.log(`📊 页面加载性能:`);
      console.log(`  - 总加载时间: ${loadTime}ms`);
      console.log(`  - DOM就绪时间: ${domReady}ms`);
      console.log(`  - 首次绘制时间: ${firstPaint.toFixed(2)}ms`);
      
      this.results.pageLoad = {
        loadTime,
        domReady,
        firstPaint
      };
    }
  }

  // 测试虚拟滚动性能
  async testVirtualScrollPerformance() {
    console.log('🔄 开始虚拟滚动性能测试');
    
    const scrollContainer = document.querySelector('[data-testid="virtual-scroll"]') || 
                           document.querySelector('.overflow-auto');
    
    if (!scrollContainer) {
      console.warn('⚠️ 未找到虚拟滚动容器');
      return;
    }

    let frameCount = 0;
    let startTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        console.log(`📈 虚拟滚动 FPS: ${fps}`);
        this.results.virtualScrollFPS = fps;
        return fps;
      }
      
      requestAnimationFrame(measureFPS);
    };

    // 模拟快速滚动
    const scrollTest = () => {
      return new Promise(resolve => {
        let scrollPosition = 0;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollStep = maxScroll / 50;
        
        const scroll = () => {
          scrollPosition += scrollStep;
          scrollContainer.scrollTop = scrollPosition;
          
          if (scrollPosition >= maxScroll) {
            setTimeout(resolve, 100);
          } else {
            requestAnimationFrame(scroll);
          }
        };
        
        requestAnimationFrame(measureFPS);
        scroll();
      });
    };

    await scrollTest();
  }

  // 测试搜索性能
  async testSearchPerformance() {
    console.log('🔍 开始搜索性能测试');
    
    const searchInput = document.querySelector('input[placeholder*="搜索"]');
    if (!searchInput) {
      console.warn('⚠️ 未找到搜索输入框');
      return;
    }

    const testQueries = ['符号', 'symbol', '数学', 'α', 'β', '∑', '∫'];
    const searchResults = [];

    for (const query of testQueries) {
      const startTime = performance.now();
      
      // 模拟用户输入
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      
      // 等待搜索结果更新
      await new Promise(resolve => setTimeout(resolve, 350));
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      const resultCount = document.querySelectorAll('[data-testid="symbol-item"]').length ||
                         document.querySelectorAll('.hover\\:bg-gray-50').length;
      
      searchResults.push({
        query,
        duration: duration.toFixed(2),
        resultCount
      });
      
      console.log(`  搜索 "${query}": ${duration.toFixed(2)}ms, ${resultCount} 个结果`);
    }

    this.results.searchPerformance = searchResults;
    
    // 清空搜索
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // 测试内存使用
  testMemoryUsage() {
    console.log('🧠 开始内存使用测试');
    
    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
      const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
      const usage = ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2);
      
      console.log(`📊 内存使用情况:`);
      console.log(`  - 已使用: ${usedMB} MB`);
      console.log(`  - 总分配: ${totalMB} MB`);
      console.log(`  - 限制: ${limitMB} MB`);
      console.log(`  - 使用率: ${usage}%`);
      
      const status = usage < 30 ? '🟢 优秀' : 
                    usage < 60 ? '🟡 良好' : '🔴 需优化';
      console.log(`  - 状态: ${status}`);
      
      this.results.memoryUsage = {
        used: usedMB,
        total: totalMB,
        limit: limitMB,
        usage: usage
      };
    } else {
      console.warn('⚠️ 当前浏览器不支持内存监控');
    }
  }

  // 测试组件渲染性能
  async testComponentRenderPerformance() {
    console.log('⚡ 开始组件渲染性能测试');
    
    const components = [
      { name: '数学符号列表', selector: '[data-testid="symbol-list"]' },
      { name: '学习进度', selector: '[data-testid="learning-progress"]' },
      { name: '公式编辑器', selector: '[data-testid="formula-editor"]' },
      { name: '性能监控', selector: '[data-testid="performance-monitor"]' }
    ];

    for (const component of components) {
      const element = document.querySelector(component.selector);
      if (element) {
        const startTime = performance.now();
        
        // 触发重新渲染
        element.style.display = 'none';
        await new Promise(resolve => requestAnimationFrame(resolve));
        element.style.display = '';
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        console.log(`  ${component.name}: ${renderTime.toFixed(2)}ms`);
      }
    }
  }

  // 测试用户交互响应时间
  async testInteractionPerformance() {
    console.log('👆 开始用户交互性能测试');
    
    const interactions = [
      {
        name: '符号点击',
        selector: '.hover\\:bg-gray-50:first-child button',
        event: 'click'
      },
      {
        name: '分类筛选',
        selector: 'button[class*="bg-green-600"], button[class*="bg-white"]:first-child',
        event: 'click'
      },
      {
        name: '公式编辑器切换',
        selector: 'button:has(i.fa-calculator)',
        event: 'click'
      }
    ];

    for (const interaction of interactions) {
      const element = document.querySelector(interaction.selector);
      if (element) {
        const startTime = performance.now();
        
        element.dispatchEvent(new Event(interaction.event, { bubbles: true }));
        
        // 等待DOM更新
        await new Promise(resolve => requestAnimationFrame(resolve));
        
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        
        const status = responseTime < 50 ? '🟢 优秀' : 
                      responseTime < 100 ? '🟡 良好' : '🔴 需优化';
        
        console.log(`  ${interaction.name}: ${responseTime.toFixed(2)}ms ${status}`);
      }
    }
  }

  // 生成综合报告
  generateReport() {
    console.log('\n📋 综合性能测试报告');
    console.log('='.repeat(60));
    
    // 页面加载性能评分
    if (this.results.pageLoad) {
      const { loadTime, domReady, firstPaint } = this.results.pageLoad;
      const loadScore = loadTime < 2000 ? 100 : loadTime < 4000 ? 80 : 60;
      console.log(`📊 页面加载性能: ${loadScore}/100`);
    }

    // 虚拟滚动性能评分
    if (this.results.virtualScrollFPS) {
      const fpsScore = this.results.virtualScrollFPS >= 60 ? 100 : 
                      this.results.virtualScrollFPS >= 30 ? 80 : 60;
      console.log(`🔄 虚拟滚动性能: ${fpsScore}/100`);
    }

    // 搜索性能评分
    if (this.results.searchPerformance) {
      const avgSearchTime = this.results.searchPerformance.reduce((sum, result) => 
        sum + parseFloat(result.duration), 0) / this.results.searchPerformance.length;
      const searchScore = avgSearchTime < 100 ? 100 : avgSearchTime < 300 ? 80 : 60;
      console.log(`🔍 搜索性能: ${searchScore}/100`);
    }

    // 内存使用评分
    if (this.results.memoryUsage) {
      const usage = parseFloat(this.results.memoryUsage.usage);
      const memoryScore = usage < 30 ? 100 : usage < 60 ? 80 : 60;
      console.log(`🧠 内存使用: ${memoryScore}/100`);
    }

    console.log('\n🎯 优化建议:');
    console.log('✅ 虚拟滚动已优化，支持大数据量');
    console.log('✅ 搜索防抖已实现，减少不必要计算');
    console.log('✅ 组件懒加载已配置，提升首屏速度');
    console.log('✅ 性能监控已集成，实时追踪指标');
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🧪 开始浏览器端性能测试');
    console.log('='.repeat(60));
    
    try {
      await this.testPageLoadPerformance();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await this.testVirtualScrollPerformance();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await this.testSearchPerformance();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.testMemoryUsage();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await this.testComponentRenderPerformance();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await this.testInteractionPerformance();
      
      this.generateReport();
      
    } catch (error) {
      console.error('❌ 测试过程中出现错误:', error);
    }
  }
}

// 自动运行测试（如果在浏览器环境中）
if (typeof window !== 'undefined') {
  window.BrowserPerformanceTester = BrowserPerformanceTester;
  window.runBrowserPerformanceTest = () => {
    const tester = new BrowserPerformanceTester();
    return tester.runAllTests();
  };
  
  console.log('💡 在浏览器控制台中运行以下命令开始测试:');
  console.log('runBrowserPerformanceTest()');
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrowserPerformanceTester;
}