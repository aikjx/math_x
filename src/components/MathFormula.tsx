import { useEffect, useRef, useState, useMemo } from 'react';

interface MathFormulaProps {
  formula: string;
  className?: string;
  inline?: boolean;
}

// 全局公式缓存
const formulaCache = new Map<string, HTMLElement>();

// 全局 MathJax 状态
let mathJaxReady = false;
const pendingRenderQueue: HTMLDivElement[] = [];

// 优化的 MathJax 配置
const configureMathJax = () => {
  if (window.MathJax) {
    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['$$', '$$']],
        processEscapes: true,
        processEnvironments: true,
        packages: {'[+]': ['noerrors', 'physics']}
      },
      svg: {
        fontCache: 'global',
        scale: 1,
        exFactor: 0.5
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      startup: {
        ready: () => {
          mathJaxReady = true;
          window.MathJax.startup.defaultReady();
          
          // 处理队列中的公式
          if (pendingRenderQueue.length > 0 && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise(pendingRenderQueue).catch((err: any) => {
              console.error('MathJax batch rendering error:', err);
            });
            pendingRenderQueue.length = 0;
          }
        }
      }
    };
  }
};

// 预加载 MathJax 的函数
const preloadMathJax = () => {
  // 检查 MathJax 是否已加载
  if (window.MathJax) {
    configureMathJax();
    return;
  }
  
  // 使用更高效的加载方式
  if (!document.getElementById('MathJax-script')) {
    // 使用现代的动态导入方式
    const mathJaxScript = document.createElement('script');
    mathJaxScript.id = 'MathJax-script';
    mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    mathJaxScript.async = true;
    mathJaxScript.onload = configureMathJax;
    document.head.appendChild(mathJaxScript);
  }
};

// 在应用启动时预加载 MathJax
preloadMathJax();

export default function MathFormula({ formula, className = '', inline = false }: MathFormulaProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  
  // 生成唯一的缓存键
  const cacheKey = useMemo(() => `${formula}_${inline ? 'inline' : 'block'}`, [formula, inline]);
  
  // 处理 LaTeX 公式
  const processedFormula = useMemo(() => formula.replace(/\\\\/g, '\\'), [formula]);
  const mathContent = useMemo(() => inline ? `\\(${processedFormula}\\)` : `$$${processedFormula}$$`, [processedFormula, inline]);

  useEffect(() => {
    // 检查缓存
    const cachedElement = formulaCache.get(cacheKey);
    
    if (mathRef.current) {
      if (cachedElement && !isRendered) {
        // 使用缓存的渲染结果
        const clonedElement = cachedElement.cloneNode(true) as HTMLElement;
        mathRef.current.innerHTML = '';
        mathRef.current.appendChild(clonedElement);
        setIsRendered(true);
      } else {
        // 设置新公式
        mathRef.current.innerHTML = mathContent;
        
        if (mathJaxReady && window.MathJax && window.MathJax.typesetPromise) {
          // 立即渲染
          window.MathJax.typesetPromise([mathRef.current]).then(() => {
            // 缓存渲染结果
            if (mathRef.current && mathRef.current.firstChild) {
              formulaCache.set(cacheKey, mathRef.current.firstChild.cloneNode(true) as HTMLElement);
            }
            setIsRendered(true);
          }).catch((err: any) => {
            console.error('MathJax rendering error:', err);
          });
        } else {
          // 添加到渲染队列
          pendingRenderQueue.push(mathRef.current);
        }
      }
    }
  }, [formula, inline, cacheKey, mathContent, isRendered]);


  const containerClass = inline 
    ? `inline-block ${className}` 
    : `math-formula text-center ${className}`;

  const wrapperClass = inline 
    ? 'inline-block px-2 py-1' 
    : 'inline-block p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-all duration-300';

  // 骨架屏效果
  const skeletonClass = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        {!isRendered && !formulaCache.has(cacheKey) && (
          <div className={skeletonClass} style={{ 
            minHeight: inline ? '1.2em' : '2rem',
            minWidth: inline ? '2em' : '4rem'
          }} />
        )}
        <div 
          ref={mathRef}
          className={`text-gray-900 dark:text-gray-100 transition-opacity duration-300 ${isRendered ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            minHeight: inline ? '1.2em' : '2rem',
            lineHeight: inline ? 'inherit' : '1.8',
            position: 'relative',
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
}

// 扩展 Window 接口以包含 MathJax
declare global {
  interface Window {
    MathJax?: any;
  }
}
