import { useEffect, useRef, useState } from 'react';
import { cleanMathFormula } from '@/utils/mathUtils';

interface FixedMathFormulaProps {
  formula: string;
  className?: string;
  inline?: boolean;
  fallbackText?: string;
}

export default function FixedMathFormula({ 
  formula, 
  className = '', 
  inline = false,
  fallbackText 
}: FixedMathFormulaProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const renderMath = async () => {
      if (!mathRef.current) return;
      
      try {
        setIsLoading(true);
        setHasError(false);

        // 使用工具函数清理公式
        const cleanedFormula = cleanMathFormula(formula);
        
        // 设置数学内容
        const mathContent = inline 
          ? `\\(${cleanedFormula}\\)` 
          : `$$${cleanedFormula}$$`;
        
        mathRef.current.innerHTML = mathContent;

        // 等待 MathJax 加载并渲染
        if (window.MathJax?.typesetPromise) {
          await window.MathJax.typesetPromise([mathRef.current]);
        } else if (window.MathJax?.Hub) {
          // 兼容旧版本
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, mathRef.current]);
        } else {
          // MathJax 未加载，显示原始文本
          if (mathRef.current) {
            mathRef.current.innerHTML = fallbackText || cleanedFormula;
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('数学公式渲染错误:', error);
        setHasError(true);
        setIsLoading(false);
        
        // 显示备用文本
        if (mathRef.current) {
          mathRef.current.innerHTML = fallbackText || cleanMathFormula(formula);
        }
      }
    };

    renderMath();
  }, [formula, inline, fallbackText]);

  // 初始化 MathJax
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.MathJax) {
      const initMathJax = () => {
        window.MathJax = {
          tex: {
            inlineMath: [['\\(', '\\)']],
            displayMath: [['$$', '$$']],
            processEscapes: true,
            processEnvironments: true,
            packages: ['base', 'ams', 'noerrors', 'noundefined', 'boldsymbol']
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          startup: {
            ready: () => {
              console.log('MathJax 已准备就绪');
              window.MathJax.startup.defaultReady();
            }
          }
        };

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        document.head.appendChild(script);
      };

      initMathJax();
    }
  }, []);

  const containerClass = inline 
    ? `inline-block ${className}` 
    : `math-formula text-center ${className}`;

  const wrapperClass = inline 
    ? 'inline-block px-1' 
    : 'inline-block p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700';

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <span className="ml-2 text-sm text-gray-500">渲染中...</span>
          </div>
        )}
        
        <div 
          ref={mathRef}
          className={`text-gray-900 dark:text-gray-100 ${isLoading ? 'hidden' : 'block'}`}
          style={{ 
            minHeight: inline ? 'auto' : '2rem',
            lineHeight: inline ? 'inherit' : '1.8',
            fontSize: inline ? 'inherit' : '1.1em'
          }}
        />
        
        {hasError && (
          <div className="p-2 text-sm text-red-600 border border-red-200 rounded bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
            公式渲染失败，显示原始文本：{fallbackText || formula}
          </div>
        )}
      </div>
    </div>
  );
}

