import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Enhanced3DSpiralAnimation from '@/components/visualizers/Enhanced3DSpiralAnimation';
import FixedMathFormula from '@/components/FixedMathFormula';

// 扩展 Window 接口
declare global {
  interface Window {
    MathJax?: any;
  }
}

const UnifiedFieldTheory: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const coreFormulas = [
    {
      id: 1,
      name: "时空同一化方程",
      formula: "\\vec{r}(t)=\\vec{C}t=x\\vec{i}+y\\vec{j}+z\\vec{k}",
      explanation: "描述时空的统一性质，时间与空间的内在联系。",
      derivation: "时间t的定义方程。矢量光速C的模c恒定，但方向可以变化。这是统一场论的基础方程，揭示了时空的本质同一性。",
      category: "基础理论"
    },
    {
      id: 2,
      name: "三维螺旋时空方程",
      formula: "\\vec{r}(t) = r\\cos\\omega t \\cdot \\vec{i} + r\\sin\\omega t \\cdot \\vec{j} + ht \\cdot \\vec{k}",
      explanation: "描述空间以圆柱状螺旋式运动的完整数学表达，包含旋转运动和直线运动的合成。",
      derivation: "将空间的圆柱状螺旋运动分解为旋转分量和直线分量。",
      category: "基础理论"
    },
    {
      id: 3,
      name: "质量定义方程",
      formula: "m = k \\cdot \\frac{dn}{d\\Omega}",
      explanation: "质量m表征空间位移线的密度，其中k是比例常数，dn是穿过立体角dΩ的空间位移线R的条数。",
      derivation: "基于质量是空间运动效应的假设，通过计算单位立体角内空间位移矢量的通量来定义质量。",
      category: "物质定义"
    },
    {
      id: 4,
      name: "引力场定义方程",
      formula: "\\overrightarrow{A}=-Gk\\frac{\\Delta n}{\\Delta s}\\frac{\\overrightarrow{r}}{r}",
      explanation: "引力场A的几何定义，其中G是引力常数，k是比例常数，Δn是空间位移线数量变化。",
      derivation: "通过空间位移线的几何分布来定义引力场，体现了引力的几何本质。",
      category: "场方程"
    },
    {
      id: 5,
      name: "静止动量方程",
      formula: "\\overrightarrow{p}_{0}=m_{0}\\overrightarrow{C}_{0}",
      explanation: "物体静止时周围空间以矢量光速C运动，因而具有静止动量P。",
      derivation: "静止状态下，物体周围空间仍以光速运动，因此具有静止动量。",
      category: "动量理论"
    },
    {
      id: 6,
      name: "运动动量方程",
      formula: "\\overrightarrow{P}=m(\\overrightarrow{C}-\\overrightarrow{V})",
      explanation: "物体以速度V运动时的动量，是静止动量与因物体运动而产生的动量变化的合成。",
      derivation: "运动状态下，物体动量是矢量光速与物体速度差值与质量的乘积。",
      category: "动量理论"
    },
    {
      id: 7,
      name: "宇宙大统一方程",
      formula: "F = \\frac{d\\vec{P}}{dt} = \\vec{C}\\frac{dm}{dt} - \\vec{V}\\frac{dm}{dt} + m\\frac{d\\vec{C}}{dt} - m\\frac{d\\vec{V}}{dt}",
      explanation: "该方程综合了质量变化、速度变化以及矢量光速变化等因素对力的影响，体现了力与动量变化的关系。",
      derivation: "通过对总动量求时间导数，得到统一的力方程，体现了四种基本力的统一性。",
      category: "统一理论"
    },
    {
      id: 8,
      name: "空间波动方程",
      formula: "\\frac{\\partial^2 L}{\\partial x^2} + \\frac{\\partial^2 L}{\\partial y^2} + \\frac{\\partial^2 L}{\\partial z^2} = \\frac{1}{c^2} \\frac{\\partial^2 L}{\\partial t^2}",
      explanation: "描述了空间的波动性质，类似于波动方程，反映了空间中某种物理量的分布随时间和空间的变化规律。",
      derivation: "基于空间运动假设，空间位移满足标准的三维波动方程。",
      category: "波动理论"
    },
    {
      id: 9,
      name: "电荷定义方程",
      formula: "q=k^{\\prime}k\\frac{1}{\\Omega^{2}}\\frac{d\\Omega}{dt}",
      explanation: "电荷表示单位时间里、单位立体角上穿过的空间位移，即质量随时间变化的变化程度。",
      derivation: "电荷是物质粒子周围空间运动状态变化的表现，通过质量变化率来定义。",
      category: "电磁理论"
    },
    {
      id: 10,
      name: "电场定义方程",
      formula: "\\vec{E}=-\\frac{kk^{\\prime}}{4\\pi\\epsilon_0\\Omega^2}\\frac{d\\Omega}{dt}\\frac{\\vec{r}}{r^3}",
      explanation: "电场强度的几何化表达，与立体角Ω的时间变化率相关。",
      derivation: "基于空间几何运动，电场强度与立体角的变化率成正比。",
      category: "电磁理论"
    },
    {
      id: 11,
      name: "磁场定义方程",
      formula: "\\vec{B}=\\frac{\\mu_{0} \\gamma k k^{\\prime}}{4 \\pi \\Omega^{2}} \\frac{d \\Omega}{d t} \\frac{[(x-v t) \\vec{i}+y \\vec{j}+z \\vec{k}]}{\\left[\\gamma^{2}(x-v t)^{2}+y^{2}+z^{2}\\right]^{\\frac{3}{2}}}",
      explanation: "磁场是由运动电场产生的，该方程描述了磁场与电荷运动速度、空间位置等因素的关系。",
      derivation: "运动电荷产生的磁场，考虑相对论效应的修正。",
      category: "电磁理论"
    },
    {
      id: 12,
      name: "变化的引力场产生电磁场",
      formula: "\\frac{\\partial^{2}\\overline{A}}{\\partial t^{2}}=\\frac{\\overline{V}}{f}\\left(\\overline{\\nabla}\\cdot\\overline{E}\\right)-\\frac{C^{2}}{f}\\left(\\overline{\\nabla}\\times\\overline{B}\\right)",
      explanation: "变化的引力场产生电磁场",
      derivation: "变化的引力场产生电磁场",
      category: "统一理论"
    },
    {
      id: 13,
      name: "磁矢势方程",
      formula: "\\vec{\\nabla} \\times \\vec{A} = \\frac{\\vec{B}}{f}",
      explanation: "磁矢势A的旋度与磁场B之间满足的关系，用于描述磁场的性质。",
      derivation: "通过矢量分析，建立磁矢势与磁场的直接联系。",
      category: "电磁理论"
    },
    {
      id: 14,
      name: "变化的引力场产生电场",
      formula: "\\vec{E}=-f\\frac{d\\vec{A}}{dt}",
      explanation: "变化的引力场产生电场",
      derivation: "变化的引力场产生电场",
      category: "波动理论"
    },
    {
      id: 15,
      name: "变化的磁场产生引力场和电场",
      formula: "\\frac{d\\overrightarrow{B}}{dt}=\\frac{-\\overrightarrow{A}\\times\\overrightarrow{E}}{c^2}-\\frac{\\overrightarrow{V}}{c^{2}}\\times\\frac{d\\overrightarrow{E}}{dt}",
      explanation: "描述引力场与电磁场相互转换的动力学方程。",
      derivation: "随时间变化的引力场A产生电场E和磁场B，体现了场的统一性。",
      category: "统一理论"
    },
    {
      id: 16,
      name: "统一场论能量方程",
      formula: "e = m_0 c^2 = mc^2\\sqrt{1 - \\frac{v^2}{c^2}}",
      explanation: "该方程是能量与质量的关系方程，与爱因斯坦的质能方程类似，体现了物体静止能量和运动能量之间的关系。",
      derivation: "基于相对论原理，建立能量、质量和速度之间的关系。",
      category: "能量理论"
    },
    {
      id: 17,
      name: "光速飞行器动力学方程",
      formula: "\\vec{F} = (\\vec{C} - \\vec{V})\\frac{dm}{dt}",
      explanation: "描述了光速飞行器在运动过程中所受的力，与物体的运动速度V、质量变化率dm/dt以及矢量光速C有关。",
      derivation: "通过精确控制物质的质量变化率dm/dt，可以实现接近光速的飞行。这是统一场论最具革命性的预测，为星际旅行提供理论基础。",
      category: "应用技术"
    },
    {
      id: 18,
      name: "空间波动通解",
      formula: "L(r,t) = f(t-r/c) + g(t+r/c)",
      explanation: "空间波动方程的通解，包含向外传播和向内传播的波。",
      derivation: "三维波动方程的标准通解形式。",
      category: "波动理论"
    }
  ];

  const categories = ['全部', '基础理论', '物质定义', '场方程', '动量理论', '统一理论', '波动理论', '电磁理论', '能量理论', '应用技术'];

  const filteredFormulas = selectedCategory === '全部' 
    ? coreFormulas 
    : coreFormulas.filter(formula => formula.category === selectedCategory);

  // 加载 MathJax
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.id = 'MathJax-script';
    script2.async = true;
    script2.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    document.head.appendChild(script2);

    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
      },
      svg: {
        fontCache: 'global'
      }
    };

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  // 重新渲染数学公式
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [selectedCategory, selectedFormula]);

  const [activeTab, setActiveTab] = useState('formulas');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
        }
      `}</style>
      <div className="container mx-auto px-6 py-20 max-w-[1800px]">
        
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-24 text-center"
        >
          {/* 三维螺旋时空动画 - 基于 r(t) = r*cos(ωt)i + r*sin(ωt)j + ht*k */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="relative w-full h-full">
              {/* 多层螺旋轨迹 - 不同半径r */}
              {[...Array(6)].map((_, layerIndex) => {
                const r = 50 + layerIndex * 40; // 半径从50到250
                const h = 2 + layerIndex * 0.5; // 螺距
                const ω = 0.5 + layerIndex * 0.1; // 角速度
                
                return [...Array(20)].map((_, pointIndex) => {
                  const t = pointIndex * 0.5; // 时间参数
                  
                  return (
                    <motion.div
                      key={`spiral-${layerIndex}-${pointIndex}`}
                      className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                        layerIndex < 2 ? 'bg-purple-400' : 
                        layerIndex < 4 ? 'bg-indigo-400' : 'bg-blue-400'
                      }`}
                      style={{
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.7 - layerIndex * 0.1,
                      }}
                      animate={{
                        x: Array.from({length: 100}, (_, i) => {
                          const time = i * 0.1;
                          return r * Math.cos(ω * time);
                        }),
                        y: Array.from({length: 100}, (_, i) => {
                          const time = i * 0.1;
                          return r * Math.sin(ω * time);
                        }),
                        z: Array.from({length: 100}, (_, i) => {
                          const time = i * 0.1;
                          return h * time;
                        }),
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        delay: layerIndex * 0.5 + pointIndex * 0.1,
                        ease: "linear"
                      }}
                    />
                  );
                });
              })}
              
              {/* 螺旋轨迹线 */}
              {[...Array(4)].map((_, i) => {
                const r = 80 + i * 60;
                const ω = 0.3 + i * 0.1;
                const h = 1.5;
                
                return (
                  <motion.div
                    key={`helix-${i}`}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      width: '2px',
                      height: '2px',
                      background: `linear-gradient(45deg, ${
                        i === 0 ? '#a855f7' : i === 1 ? '#6366f1' : i === 2 ? '#3b82f6' : '#06b6d4'
                      }, transparent)`,
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      x: Array.from({length: 200}, (_, t) => r * Math.cos(ω * t * 0.1)),
                      y: Array.from({length: 200}, (_, t) => r * Math.sin(ω * t * 0.1)),
                      rotateZ: Array.from({length: 200}, (_, t) => h * t * 0.1 * 10), // 模拟z轴运动
                      opacity: [0.8, 0.3, 0.8],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "linear"
                    }}
                  />
                );
              })}
              
              {/* 中心轴线 - 代表k方向 */}
              <motion.div
                className="absolute w-1 top-1/2 left-1/2 bg-gradient-to-t from-purple-500 via-indigo-500 to-blue-500"
                style={{
                  height: '400px',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center',
                }}
                animate={{
                  scaleY: [0.5, 1.2, 0.5],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* 圆形轨道参考线 */}
              {[...Array(3)].map((_, i) => {
                const radius = 100 + i * 80;
                return (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute border border-purple-300 rounded-full top-1/2 left-1/2"
                    style={{
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                      transform: 'translate(-50%, -50%)',
                      opacity: 0.2,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* 标题内容 */}
          <div className="relative z-10">
            <h1 className="mb-10 font-bold text-transparent text-8xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text">
              统一场论核心方程
            </h1>
            <p className="mx-auto mb-12 text-3xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-7xl">
              探索宇宙的终极奥秘：四种基本力的统一理论，揭示时空、物质与能量的本质联系
            </p>
            <div className="inline-flex items-center px-12 py-6 bg-white rounded-full shadow-2xl dark:bg-gray-800">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                共 {coreFormulas.length} 个核心方程
              </span>
            </div>
          </div>
        </motion.div>

        {/* 主要内容标签页 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="flex p-2 bg-white rounded-full shadow-lg dark:bg-gray-800">
              <button
                onClick={() => setActiveTab('formulas')}
                className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${
                  activeTab === 'formulas'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                📚 核心方程
              </button>
              <button
                onClick={() => setActiveTab('animation')}
                className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-300 ${
                  activeTab === 'animation'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                🌌 螺旋时空动画
              </button>
            </div>
          </div>

          {activeTab === 'formulas' && (
            <>
              {/* 分类筛选 */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg transform scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* 内容区域 */}
        {activeTab === 'formulas' && (
          /* 公式网格 - 合理的卡片布局 */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 gap-10 mb-24 md:grid-cols-2 lg:grid-cols-3"
          >
          {filteredFormulas.map((formula, index) => (
            <motion.div
              key={formula.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                selectedFormula === formula.id ? 'ring-8 ring-purple-500 ring-opacity-30' : ''
              }`}
              onClick={() => setSelectedFormula(selectedFormula === formula.id ? null : formula.id)}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 text-base font-bold text-purple-600 bg-purple-100 rounded-full dark:text-purple-400 dark:bg-purple-900">
                    {formula.category}
                  </span>
                  <span className="text-3xl font-bold text-gray-400">
                    #{formula.id}
                  </span>
                </div>
                
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  {formula.name}
                </h3>
                
                <div className="p-6 mb-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
                  <FixedMathFormula 
                    formula={formula.formula}
                    inline={false}
                    className="my-4"
                  />
                </div>
                
                <p className="mb-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {formula.explanation}
                </p>
                
                <button className="text-base font-semibold text-purple-600 transition-colors dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  {selectedFormula === formula.id ? '收起详情 ▲' : '查看推导 ▼'}
                </button>
                
                {selectedFormula === formula.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 mt-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl"
                  >
                    <h4 className="mb-3 text-lg font-bold text-purple-900 dark:text-purple-100">
                      📚 推导过程：
                    </h4>
                    <p className="text-base leading-relaxed text-purple-800 dark:text-purple-200">
                      {formula.derivation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {activeTab === 'animation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-24"
          >
            <div className="overflow-hidden bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
              <div className="p-8 text-white bg-gradient-to-r from-purple-500 to-indigo-500">
                <h2 className="mb-4 text-4xl font-bold">🌌 圆柱状螺旋时空动画</h2>
                <p className="text-xl opacity-90">
                  基于时空同一化方程和三维螺旋时空方程的实时可视化
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6 text-sm md:grid-cols-2">
                  <div className="p-3 rounded-lg bg-white/20">
                    <strong>时空同一化方程:</strong><br/>
                    ds² = c²dt² - dx² - dy² - dz²
                  </div>
                  <div className="p-3 rounded-lg bg-white/20">
                    <strong>三维螺旋时空方程:</strong><br/>
                    r(t) = R·cos(ωt + φ)î + R·sin(ωt + φ)ĵ + h·t·k̂
                  </div>
                </div>
              </div>
              <div className="h-[800px]">
                <Enhanced3DSpiralAnimation />
              </div>
            </div>
          </motion.div>
        )}

        {/* 理论意义展示 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-16 text-white shadow-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-3xl"
        >
          <h2 className="mb-16 text-6xl font-bold text-center">统一场论的革命性意义</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-8 text-8xl">🌌</div>
              <h3 className="mb-6 text-3xl font-bold">时空统一</h3>
              <p className="text-xl leading-relaxed opacity-90">揭示时间与空间的本质同一性，重新定义宇宙的基本结构</p>
            </div>
            <div className="text-center">
              <div className="mb-8 text-8xl">⚡</div>
              <h3 className="mb-6 text-3xl font-bold">四力统一</h3>
              <p className="text-xl leading-relaxed opacity-90">统一引力、电磁力、强核力、弱核力为一个基本相互作用</p>
            </div>
            <div className="text-center">
              <div className="mb-8 text-8xl">🚀</div>
              <h3 className="mb-6 text-3xl font-bold">光速飞行</h3>
              <p className="text-xl leading-relaxed opacity-90">为星际旅行提供理论基础，开启人类宇宙探索新纪元</p>
            </div>
            <div className="text-center">
              <div className="mb-8 text-8xl">🔬</div>
              <h3 className="mb-6 text-3xl font-bold">物质本质</h3>
              <p className="text-xl leading-relaxed opacity-90">重新定义质量、能量和电荷，揭示物质的几何本质</p>
            </div>
          </div>
        </motion.div>

        {/* 理论特色 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="p-16 mt-24 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl"
        >
          <h2 className="mb-16 text-5xl font-bold text-center text-gray-900 dark:text-white">
            🌟 理论特色与优势
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <i className="text-4xl text-white fas fa-atom"></i>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">统一性</h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                用一个基本假设统一描述四种基本相互作用力
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <i className="text-4xl text-white fas fa-cube"></i>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">几何化</h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                将所有物理现象归结为空间几何运动
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <i className="text-4xl text-white fas fa-rocket"></i>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">预测性</h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                预测光速飞行器等革命性技术的可能性
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500">
                <i className="text-4xl text-white fas fa-lightbulb"></i>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">创新性</h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                挑战传统物理学框架，提出全新理论体系
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnifiedFieldTheory;