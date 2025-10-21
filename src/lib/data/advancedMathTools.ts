import { Website } from './types';

// 高级数学工具与软件 - 专业级数学计算平台
export const advancedMathTools: Website[] = [
  // 专业数学软件
  {
    id: 301,
    name: "Mathematica Online",
    url: "https://www.wolframcloud.com",
    description: "Wolfram公司的旗舰数学软件在线版，支持符号计算、数值分析、可视化等全方位数学计算",
    category: "专业软件",
    rating: 4.9
  },
  {
    id: 302,
    name: "MATLAB Online",
    url: "https://matlab.mathworks.com",
    description: "MathWorks的MATLAB在线版，专业的数值计算和工程分析平台",
    category: "工程计算",
    rating: 4.8
  },
  {
    id: 303,
    name: "Maple Learn",
    url: "https://www.maplesoft.com/products/learn/",
    description: "Maple的在线学习版本，提供强大的符号计算和数学可视化功能",
    category: "符号计算",
    rating: 4.7
  },

  // 开源数学软件
  {
    id: 304,
    name: "SciPy Ecosystem",
    url: "https://scipy.org",
    description: "Python科学计算生态系统，包含NumPy、SciPy、Matplotlib等核心库",
    category: "开源软件",
    rating: 4.8
  },
  {
    id: 305,
    name: "R Project",
    url: "https://www.r-project.org",
    description: "专业的统计计算和图形软件，在数据分析和统计建模领域应用广泛",
    category: "统计软件",
    rating: 4.7
  },
  {
    id: 306,
    name: "GNU Octave",
    url: "https://octave.org",
    description: "开源的MATLAB替代品，支持数值计算和科学编程",
    category: "开源软件",
    rating: 4.5
  },

  // 在线计算平台
  {
    id: 307,
    name: "CoCalc",
    url: "https://cocalc.com",
    description: "协作计算平台，支持Jupyter、SageMath、R、LaTeX等多种数学工具",
    category: "云计算平台",
    rating: 4.6
  },
  {
    id: 308,
    name: "Google Colab",
    url: "https://colab.research.google.com",
    description: "Google提供的免费Jupyter笔记本环境，支持GPU加速计算",
    category: "云计算平台",
    rating: 4.8
  },
  {
    id: 309,
    name: "Observable",
    url: "https://observablehq.com",
    description: "现代数据可视化和计算笔记本平台，支持JavaScript和D3.js",
    category: "数据可视化",
    rating: 4.7
  },

  // 专业绘图工具
  {
    id: 310,
    name: "Asymptote",
    url: "https://asymptote.sourceforge.io",
    description: "专业的数学图形描述语言，用于创建高质量的数学图形和图表",
    category: "绘图软件",
    rating: 4.4
  },
  {
    id: 311,
    name: "TikZ/PGF",
    url: "https://tikz.dev",
    description: "LaTeX中的强大绘图包，用于创建精确的数学图形和图表",
    category: "LaTeX工具",
    rating: 4.6
  },
  {
    id: 312,
    name: "Matplotlib",
    url: "https://matplotlib.org",
    description: "Python的主要绘图库，支持2D和3D数据可视化",
    category: "Python库",
    rating: 4.7
  },

  // 数值分析工具
  {
    id: 313,
    name: "LAPACK",
    url: "http://www.netlib.org/lapack/",
    description: "线性代数计算的标准库，提供高效的矩阵运算算法",
    category: "数值库",
    rating: 4.8
  },
  {
    id: 314,
    name: "BLAS",
    url: "http://www.netlib.org/blas/",
    description: "基础线性代数子程序库，提供向量和矩阵运算的基础函数",
    category: "数值库",
    rating: 4.7
  },
  {
    id: 315,
    name: "FFTW",
    url: "http://www.fftw.org",
    description: "快速傅里叶变换库，在信号处理和科学计算中广泛应用",
    category: "信号处理",
    rating: 4.6
  },

  // 机器学习数学工具
  {
    id: 316,
    name: "TensorFlow",
    url: "https://www.tensorflow.org",
    description: "Google开发的机器学习框架，内置丰富的数学运算功能",
    category: "机器学习",
    rating: 4.8
  },
  {
    id: 317,
    name: "PyTorch",
    url: "https://pytorch.org",
    description: "Facebook开发的深度学习框架，支持动态计算图和自动微分",
    category: "深度学习",
    rating: 4.8
  },
  {
    id: 318,
    name: "JAX",
    url: "https://jax.readthedocs.io",
    description: "Google开发的科学计算库，支持自动微分和JIT编译",
    category: "科学计算",
    rating: 4.7
  },

  // 优化求解器
  {
    id: 319,
    name: "CVXPY",
    url: "https://www.cvxpy.org",
    description: "Python凸优化建模语言，简化凸优化问题的表达和求解",
    category: "优化工具",
    rating: 4.6
  },
  {
    id: 320,
    name: "Gurobi",
    url: "https://www.gurobi.com",
    description: "商业优化求解器，在线性规划和整数规划方面性能卓越",
    category: "商业软件",
    rating: 4.8
  },
  {
    id: 321,
    name: "CPLEX",
    url: "https://www.ibm.com/products/ilog-cplex-optimization-studio",
    description: "IBM的优化求解器，广泛应用于运筹学和决策科学",
    category: "商业软件",
    rating: 4.7
  },

  // 符号计算工具
  {
    id: 322,
    name: "SymPy",
    url: "https://www.sympy.org",
    description: "Python符号数学库，支持代数运算、微积分、方程求解等",
    category: "符号计算",
    rating: 4.7
  },
  {
    id: 323,
    name: "Maxima",
    url: "https://maxima.sourceforge.io",
    description: "开源符号计算系统，继承自MIT的Macsyma系统",
    category: "符号计算",
    rating: 4.5
  },
  {
    id: 324,
    name: "Reduce",
    url: "https://reduce-algebra.sourceforge.io",
    description: "历史悠久的符号计算系统，在代数计算方面功能强大",
    category: "符号计算",
    rating: 4.3
  },

  // 几何计算工具
  {
    id: 325,
    name: "CGAL",
    url: "https://www.cgal.org",
    description: "计算几何算法库，提供高效可靠的几何算法实现",
    category: "计算几何",
    rating: 4.6
  },
  {
    id: 326,
    name: "OpenMesh",
    url: "https://www.graphics.rwth-aachen.de/software/openmesh/",
    description: "多面体网格处理库，用于3D几何建模和处理",
    category: "3D几何",
    rating: 4.4
  },
  {
    id: 327,
    name: "VTK",
    url: "https://vtk.org",
    description: "可视化工具包，支持3D计算机图形学和数据可视化",
    category: "可视化",
    rating: 4.5
  }
];