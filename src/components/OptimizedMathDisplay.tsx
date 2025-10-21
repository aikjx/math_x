import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface OptimizedMathDisplayProps {
  formula: string;
  name?: string;
  explanation?: string;
  inline?: boolean;
  showCopy?: boolean;
  className?: string;
}

const OptimizedMathDisplay: React.FC<OptimizedMathDisplayProps> = ({
  formula,
  name,
  explanation,
  inline = false,
  showCopy = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [mathJaxReady, setMathJaxReady] = useState(false);

  useEffect(() => {
    // 检查MathJax是否已加载
    const checkMathJax = () => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        setMathJaxReady(true);
        // 重新渲染数学公式
        window.MathJax.typesetPromise().catch((err: any) => {
          console.error('MathJax渲染失败:', err);
        });
      } else {
        // 如果MathJax未加载，初始化它
        initializeMathJax();
      }
    };

    const initializeMathJax = () => {
      if (!document.getElementById('MathJax-script')) {
        // 添加MathJax配置
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true,
            packages: {'[+]': ['ams', 'newcommand', 'configmacros', 'color']},
            macros: {
              // 添加常用宏定义
              vec: ['\\boldsymbol{#1}', 1],
              overrightarrow: ['\\vec{#1}', 1],
              overline: ['\\overline{#1}', 1]
            }
          },
          options: {
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          startup: {
            ready: () => {
              window.MathJax.startup.defaultReady();
              setMathJaxReady(true);
            }
          }
        };

        // 加载MathJax脚本
        const script = document.createElement('script');
        script.id = 'MathJax-script';
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        document.head.appendChild(script);
      }
    };

    checkMathJax();
  }, []);

  useEffect(() => {
    if (mathJaxReady && window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err: any) => {
        console.error('公式渲染错误:', err);
      });
    }
  }, [formula, mathJaxReady]);

  const copyFormula = async () => {
    try {
      await navigator.clipboard.writeText(formula);
      setCopied(true);
      toast.success('公式已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('复制失败');
    }
  };

  const formattedFormula = inline ? `$${formula}$` : `$$${formula}$$`;

  return (
    <div className={`math-display-container ${className}`}>
      {name && (
        <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          {name}
        </h4>
      )}
      
      <div className="relative group">
        <div 
          className={`
            math-content p-4 bg-gray-50 dark:bg-gray-800 rounded-lg
            ${inline ? 'inline-block' : 'text-center'}
            ${!mathJaxReady ? 'animate-pulse' : ''}
          `}
        >
          {mathJaxReady ? (
            <div 
              className="tex2jax_process"
              dangerouslySetInnerHTML={{ __html: formattedFormula }}
            />
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              正在加载数学公式...
            </div>
          )}
        </div>

        {showCopy && (
          <button
            onClick={copyFormula}
            className="absolute p-2 text-gray-500 transition-colors opacity-0 top-2 right-2 group-hover:opacity-100 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="复制公式"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {explanation && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {explanation}
        </p>
      )}
    </div>
  );
};

export default OptimizedMathDisplay;