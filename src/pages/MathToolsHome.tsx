import React, { useState } from 'react';
import { Calculator, Function, BarChart3, Compass, Sigma, Brain, Zap, BookOpen } from 'lucide-react';

interface ToolCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tools: Tool[];
}

interface Tool {
  id: string;
  name: string;
  description: string;
  component: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const MathToolsHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: ToolCategory[] = [
    {
      id: 'basic',
      name: '基础计算器',
      icon: <Calculator className="w-6 h-6" />,
      description: '日常数学计算工具',
      tools: [
        { id: 'calculator', name: '科学计算器', description: '支持基本运算、三角函数、对数等', component: 'ScientificCalculator', difficulty: 'basic' },
        { id: 'fraction', name: '分数计算器', description: '分数的加减乘除运算', component: 'FractionCalculator', difficulty: 'basic' },
        { id: 'percentage', name: '百分比计算器', description: '百分比相关计算', component: 'PercentageCalculator', difficulty: 'basic' },
        { id: 'unit-converter', name: '单位转换器', description: '长度、重量、温度等单位转换', component: 'UnitConverter', difficulty: 'basic' }
      ]
    },
    {
      id: 'algebra',
      name: '代数工具',
      icon: <Function className="w-6 h-6" />,
      description: '方程求解与代数运算',
      tools: [
        { id: 'equation-solver', name: '方程求解器', description: '一元二次方程、线性方程组求解', component: 'EquationSolver', difficulty: 'intermediate' },
        { id: 'polynomial', name: '多项式计算器', description: '多项式运算、因式分解', component: 'PolynomialCalculator', difficulty: 'intermediate' },
        { id: 'matrix', name: '矩阵计算器', description: '矩阵运算、行列式、逆矩阵', component: 'MatrixCalculator', difficulty: 'advanced' },
        { id: 'complex', name: '复数计算器', description: '复数的四则运算、极坐标转换', component: 'ComplexCalculator', difficulty: 'intermediate' }
      ]
    },
    {
      id: 'geometry',
      name: '几何工具',
      icon: <Compass className="w-6 h-6" />,
      description: '几何图形计算与绘制',
      tools: [
        { id: 'area-perimeter', name: '面积周长计算器', description: '各种图形的面积和周长计算', component: 'AreaPerimeterCalculator', difficulty: 'basic' },
        { id: 'coordinate', name: '坐标几何计算器', description: '点、线、圆的坐标计算', component: 'CoordinateCalculator', difficulty: 'intermediate' },
        { id: 'triangle', name: '三角形计算器', description: '三角形边长、角度、面积计算', component: 'TriangleCalculator', difficulty: 'basic' },
        { id: 'geometry-visualizer', name: '几何图形可视化', description: '绘制和分析几何图形', component: 'GeometryVisualizer', difficulty: 'intermediate' }
      ]
    },
    {
      id: 'calculus',
      name: '微积分工具',
      icon: <Sigma className="w-6 h-6" />,
      description: '导数、积分与极限计算',
      tools: [
        { id: 'derivative', name: '导数计算器', description: '函数求导、偏导数计算', component: 'DerivativeCalculator', difficulty: 'advanced' },
        { id: 'integral', name: '积分计算器', description: '定积分、不定积分计算', component: 'IntegralCalculator', difficulty: 'advanced' },
        { id: 'limit', name: '极限计算器', description: '函数极限计算', component: 'LimitCalculator', difficulty: 'advanced' },
        { id: 'series', name: '级数计算器', description: '数列求和、级数收敛性判断', component: 'SeriesCalculator', difficulty: 'advanced' }
      ]
    },
    {
      id: 'statistics',
      name: '统计分析',
      icon: <BarChart3 className="w-6 h-6" />,
      description: '数据分析与统计计算',
      tools: [
        { id: 'descriptive-stats', name: '描述性统计', description: '均值、方差、标准差等统计量', component: 'DescriptiveStats', difficulty: 'basic' },
        { id: 'probability', name: '概率计算器', description: '概率分布、贝叶斯定理', component: 'ProbabilityCalculator', difficulty: 'intermediate' },
        { id: 'regression', name: '回归分析', description: '线性回归、多项式回归', component: 'RegressionAnalysis', difficulty: 'advanced' },
        { id: 'hypothesis-test', name: '假设检验', description: 't检验、卡方检验等', component: 'HypothesisTest', difficulty: 'advanced' }
      ]
    },
    {
      id: 'number-theory',
      name: '数论工具',
      icon: <Brain className="w-6 h-6" />,
      description: '数论与离散数学',
      tools: [
        { id: 'prime-factorization', name: '质因数分解', description: '整数的质因数分解', component: 'PrimeFactorization', difficulty: 'basic' },
        { id: 'gcd-lcm', name: '最大公约数/最小公倍数', description: 'GCD和LCM计算', component: 'GcdLcmCalculator', difficulty: 'basic' },
        { id: 'modular-arithmetic', name: '模运算计算器', description: '模运算、同余方程', component: 'ModularArithmetic', difficulty: 'intermediate' },
        { id: 'combinatorics', name: '组合数学', description: '排列组合、二项式定理', component: 'Combinatorics', difficulty: 'intermediate' }
      ]
    },
    {
      id: 'visualization',
      name: '函数绘图',
      icon: <Zap className="w-6 h-6" />,
      description: '函数图像与数据可视化',
      tools: [
        { id: 'function-plotter', name: '函数绘图器', description: '2D/3D函数图像绘制', component: 'FunctionPlotter', difficulty: 'intermediate' },
        { id: 'parametric-plotter', name: '参数方程绘图', description: '参数方程和极坐标绘图', component: 'ParametricPlotter', difficulty: 'advanced' },
        { id: 'data-visualizer', name: '数据可视化', description: '统计图表、散点图、直方图', component: 'DataVisualizer', difficulty: 'basic' },
        { id: 'vector-field', name: '向量场可视化', description: '向量场和梯度可视化', component: 'VectorFieldVisualizer', difficulty: 'advanced' }
      ]
    },
    {
      id: 'reference',
      name: '数学参考',
      icon: <BookOpen className="w-6 h-6" />,
      description: '公式手册与常数表',
      tools: [
        { id: 'formula-reference', name: '公式手册', description: '常用数学公式查询', component: 'FormulaReference', difficulty: 'basic' },
        { id: 'constants', name: '数学常数', description: '重要数学常数及其性质', component: 'MathConstants', difficulty: 'basic' },
        { id: 'conversion-tables', name: '换算表', description: '各种单位换算表', component: 'ConversionTables', difficulty: 'basic' },
        { id: 'math-symbols', name: '数学符号', description: '数学符号含义和LaTeX代码', component: 'MathSymbols', difficulty: 'basic' }
      ]
    }
  ];

  const allTools = categories.flatMap(cat => cat.tools);

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           categories.find(cat => cat.tools.includes(tool))?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return '基础';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              数学工具大全
            </h1>
            <p className="text-xl text-gray-600">
              最全面的在线数学计算器和工具集合
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索数学工具..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">所有分类</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4 lg:grid-cols-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {category.icon}
                  <span className="text-sm font-medium text-center">
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              className="p-6 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {tool.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
                  {getDifficultyText(tool.difficulty)}
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-600">
                {tool.description}
              </p>
              <button className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                打开工具
              </button>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              没有找到匹配的工具，请尝试其他搜索词或选择不同的分类。
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="p-6 mt-12 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">工具统计</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{allTools.length}</div>
              <div className="text-gray-600">总工具数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {allTools.filter(t => t.difficulty === 'basic').length}
              </div>
              <div className="text-gray-600">基础工具</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {allTools.filter(t => t.difficulty === 'intermediate').length}
              </div>
              <div className="text-gray-600">中级工具</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {allTools.filter(t => t.difficulty === 'advanced').length}
              </div>
              <div className="text-gray-600">高级工具</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathToolsHome;