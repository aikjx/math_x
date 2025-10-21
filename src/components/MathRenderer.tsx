import React, { useEffect, useRef } from 'react';

interface MathRendererProps {
  formula: string;
  inline?: boolean;
  className?: string;
}

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathRenderer: React.FC<MathRendererProps> = ({ 
  formula, 
  inline = false, 
  className = '' 
}) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保MathJax已加载
    if (!window.MathJax) {
      // 动态加载MathJax
      const script = document.createElement('script');
      script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
      script.onload = () => {
        const mathJaxScript = document.createElement('script');
        mathJaxScript.id = 'MathJax-script';
        mathJaxScript.async = true;
        mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        
        // 配置MathJax
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true,
            packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
          },
          options: {
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          startup: {
            ready: () => {
              window.MathJax.startup.defaultReady();
              // 渲染当前公式
              if (mathRef.current) {
                window.MathJax.typesetPromise([mathRef.current]);
              }
            }
          }
        };
        
        document.head.appendChild(mathJaxScript);
      };
      document.head.appendChild(script);
    } else {
      // MathJax已加载，直接渲染
      if (mathRef.current && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
          console.error('MathJax渲染错误:', err);
        });
      }
    }
  }, [formula]);

  // 格式化公式
  const formattedFormula = inline 
    ? `$${formula}$` 
    : `$$${formula}$$`;

  return (
    <div 
      ref={mathRef}
      className={`math-renderer ${inline ? 'inline-math' : 'display-math'} ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedFormula }}
    />
  );
};

export default MathRenderer;