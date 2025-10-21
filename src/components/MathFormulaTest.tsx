import React, { useState } from 'react';
import FixedMathFormula from './FixedMathFormula';
import { cleanMathFormula, validateLatexFormula, getFormulaStats } from '@/utils/mathUtils';

const MathFormulaTest: React.FC = () => {
  const [testFormula, setTestFormula] = useState('\\vec{F} = m\\vec{a}');
  
  // 测试公式集合 - 包含常见的乱码问题
  const testFormulas = [
    {
      name: '向量公式（有乱码）',
      original: '\\vec{r}(t)=\\vec{C}t=x\\vec{i}+y\\vec{j}+z\\vec{k}',
      description: '测试向量符号渲染'
    },
    {
      name: '希腊字母（有乱码）',
      original: 'α + β = γ, ∇²φ = ρ/ε₀',
      description: '测试希腊字母和特殊符号'
    },
    {
      name: '复杂公式',
      original: '\\frac{\\partial^2 L}{\\partial x^2} + \\frac{\\partial^2 L}{\\partial y^2} + \\frac{\\partial^2 L}{\\partial z^2} = \\frac{1}{c^2} \\frac{\\partial^2 L}{\\partial t^2}',
      description: '测试偏微分方程'
    },
    {
      name: '统一场方程',
      original: 'F = \\frac{d\\vec{P}}{dt} = \\vec{C}\\frac{dm}{dt} - \\vec{V}\\frac{dm}{dt} + m\\frac{d\\vec{C}}{dt} - m\\frac{d\\vec{V}}{dt}',
      description: '测试复杂向量公式'
    },
    {
      name: '电磁场方程',
      original: '\\vec{E}=-\\frac{kk^{\\prime}}{4\\pi\\epsilon_0\\Omega^2}\\frac{d\\Omega}{dt}\\frac{\\vec{r}}{r^3}',
      description: '测试电磁场公式'
    }
  ];

  const stats = getFormulaStats(testFormula);
  const isValid = validateLatexFormula(testFormula);
  const cleaned = cleanMathFormula(testFormula);

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-8">
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          数学公式渲染测试
        </h2>
        
        {/* 自定义公式测试 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            输入测试公式：
          </label>
          <textarea
            value={testFormula}
            onChange={(e) => setTestFormula(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="输入LaTeX公式..."
          />
          
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <span className={`px-2 py-1 rounded ${isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isValid ? '✓ 语法有效' : '✗ 语法错误'}
            </span>
            <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded">
              希腊字母: {stats.greekLetters}
            </span>
            <span className="px-2 py-1 text-purple-800 bg-purple-100 rounded">
              运算符: {stats.operators}
            </span>
            <span className="px-2 py-1 text-yellow-800 bg-yellow-100 rounded">
              向量: {stats.vectors}
            </span>
            <span className="px-2 py-1 text-pink-800 bg-pink-100 rounded">
              分数: {stats.fractions}
            </span>
          </div>
        </div>

        {/* 渲染结果 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">原始公式</h3>
            <div className="p-4 border rounded bg-gray-50 dark:bg-gray-700">
              <code className="text-sm">{testFormula}</code>
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">清理后公式</h3>
            <div className="p-4 border rounded bg-gray-50 dark:bg-gray-700">
              <code className="text-sm">{cleaned}</code>
            </div>
          </div>
        </div>

        {/* 渲染预览 */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">渲染效果</h3>
          <div className="p-6 border rounded bg-gray-50 dark:bg-gray-700">
            <FixedMathFormula 
              formula={testFormula}
              fallbackText="公式渲染失败"
            />
          </div>
        </div>
      </div>

      {/* 预设测试公式 */}
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          预设测试公式
        </h3>
        
        <div className="space-y-6">
          {testFormulas.map((test, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg dark:border-gray-600">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{test.name}</h4>
                <button
                  onClick={() => setTestFormula(test.original)}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  使用此公式
                </button>
              </div>
              
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
              
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs text-gray-500">原始代码:</div>
                  <code className="block p-2 overflow-x-auto text-xs bg-gray-100 rounded dark:bg-gray-700">
                    {test.original}
                  </code>
                </div>
                
                <div>
                  <div className="mb-1 text-xs text-gray-500">渲染效果:</div>
                  <div className="p-3 bg-white border rounded dark:bg-gray-600">
                    <FixedMathFormula 
                      formula={test.original}
                      fallbackText="渲染失败"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathFormulaTest;