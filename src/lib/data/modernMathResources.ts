import { Website } from './types';

// 现代数学学习资源 - 2025年最新收集
export const modernMathResources: Website[] = [
  // AI驱动的数学学习平台
  {
    id: 201,
    name: "Photomath",
    url: "https://photomath.com",
    description: "AI驱动的数学解题应用，支持拍照识别数学题目并提供详细解答步骤，涵盖从基础算术到微积分的各个层次",
    category: "AI工具",
    rating: 4.8
  },
  {
    id: 202,
    name: "Microsoft Math Solver",
    url: "https://mathsolver.microsoft.com",
    description: "微软开发的AI数学求解器，支持手写识别、语音输入，提供图形化解答和多种解题方法",
    category: "AI工具",
    rating: 4.7
  },
  {
    id: 203,
    name: "Socratic by Google",
    url: "https://socratic.org",
    description: "Google开发的AI学习助手，通过拍照或语音提问获得数学概念解释和解题指导",
    category: "AI工具",
    rating: 4.6
  },

  // 交互式数学平台
  {
    id: 204,
    name: "Brilliant",
    url: "https://brilliant.org",
    description: "通过互动式问题和可视化内容学习数学、科学和计算机科学，注重培养问题解决能力",
    category: "互动学习",
    rating: 4.9
  },
  {
    id: 205,
    name: "Manim Community",
    url: "https://www.manim.community",
    description: "3Blue1Brown开源的数学动画引擎，用于创建精美的数学概念可视化动画",
    category: "可视化工具",
    rating: 4.8
  },
  {
    id: 206,
    name: "Mathigon Polypad",
    url: "https://mathigon.org/polypad",
    description: "虚拟数学操作台，提供丰富的数学工具和材料进行探索性学习",
    category: "互动工具",
    rating: 4.7
  },

  // 现代数学研究平台
  {
    id: 207,
    name: "Lean Prover Community",
    url: "https://leanprover-community.github.io",
    description: "现代定理证明助手，用于形式化数学证明，代表数学研究的前沿方向",
    category: "形式化数学",
    rating: 4.5
  },
  {
    id: 208,
    name: "Coq Proof Assistant",
    url: "https://coq.inria.fr",
    description: "交互式定理证明器，支持形式化数学理论的构建和验证",
    category: "形式化数学",
    rating: 4.4
  },
  {
    id: 209,
    name: "Isabelle/HOL",
    url: "https://isabelle.in.tum.de",
    description: "高阶逻辑证明助手，用于数学定理的机器验证",
    category: "形式化数学",
    rating: 4.3
  },

  // 数学编程与计算
  {
    id: 210,
    name: "SageMath",
    url: "https://www.sagemath.org",
    description: "开源数学软件系统，集成了众多数学库，支持代数、几何、数论等多个领域的计算",
    category: "计算软件",
    rating: 4.6
  },
  {
    id: 211,
    name: "Julia Language",
    url: "https://julialang.org",
    description: "专为科学计算设计的高性能编程语言，在数值分析和机器学习领域应用广泛",
    category: "编程语言",
    rating: 4.7
  },
  {
    id: 212,
    name: "Jupyter Notebooks",
    url: "https://jupyter.org",
    description: "交互式计算环境，支持Python、R、Julia等语言，广泛用于数据科学和数学建模",
    category: "计算环境",
    rating: 4.8
  },

  // 在线数学课程平台
  {
    id: 213,
    name: "Coursera 数学课程",
    url: "https://www.coursera.org/browse/math-and-logic",
    description: "汇集全球顶尖大学的数学课程，包括斯坦福、MIT等名校的专业课程",
    category: "在线课程",
    rating: 4.8
  },
  {
    id: 214,
    name: "edX 数学专业课程",
    url: "https://www.edx.org/learn/mathematics",
    description: "提供哈佛、MIT等名校的数学课程，部分课程可获得认证证书",
    category: "在线课程",
    rating: 4.7
  },
  {
    id: 215,
    name: "Udacity 数学基础",
    url: "https://www.udacity.com/school-of-data-science",
    description: "面向数据科学和AI的数学基础课程，注重实际应用",
    category: "在线课程",
    rating: 4.6
  },

  // 数学竞赛与挑战
  {
    id: 216,
    name: "Art of Problem Solving (AoPS)",
    url: "https://artofproblemsolving.com",
    description: "数学竞赛培训的权威平台，提供从AMC到IMO各级别竞赛的训练资源",
    category: "竞赛培训",
    rating: 4.9
  },
  {
    id: 217,
    name: "Project Euler",
    url: "https://projecteuler.net",
    description: "数学与编程结合的挑战平台，通过解决数学问题提升编程和数学能力",
    category: "编程挑战",
    rating: 4.8
  },
  {
    id: 218,
    name: "Codeforces Math Problems",
    url: "https://codeforces.com/problemset?tags=math",
    description: "编程竞赛平台中的数学问题集合，训练算法数学思维",
    category: "算法数学",
    rating: 4.7
  },

  // 数学可视化与动画
  {
    id: 219,
    name: "Desmos Classroom Activities",
    url: "https://teacher.desmos.com",
    description: "Desmos为教师提供的互动数学课堂活动，包含丰富的教学资源",
    category: "教学资源",
    rating: 4.8
  },
  {
    id: 220,
    name: "GeoGebra Classroom",
    url: "https://www.geogebra.org/classroom",
    description: "GeoGebra的在线教室功能，支持实时互动数学教学",
    category: "教学平台",
    rating: 4.7
  },
  {
    id: 221,
    name: "Mathway Graph",
    url: "https://www.mathway.com/graph",
    description: "强大的在线函数绘图工具，支持2D和3D图形绘制",
    category: "绘图工具",
    rating: 4.6
  },

  // 数学博客与社区
  {
    id: 222,
    name: "Math Stack Exchange",
    url: "https://math.stackexchange.com",
    description: "数学问答社区，汇聚全球数学爱好者和专家，提供高质量的数学讨论",
    category: "问答社区",
    rating: 4.8
  },
  {
    id: 223,
    name: "MathOverflow",
    url: "https://mathoverflow.net",
    description: "面向专业数学研究者的问答平台，讨论前沿数学问题",
    category: "学术社区",
    rating: 4.7
  },
  {
    id: 224,
    name: "Quanta Magazine Math",
    url: "https://www.quantamagazine.org/mathematics/",
    description: "高质量的数学科普文章，介绍最新数学研究成果和发现",
    category: "科普媒体",
    rating: 4.9
  },

  // 移动学习应用
  {
    id: 225,
    name: "Khan Academy App",
    url: "https://www.khanacademy.org/downloads",
    description: "Khan Academy移动应用，支持离线学习数学课程",
    category: "移动应用",
    rating: 4.8
  },
  {
    id: 226,
    name: "Wolfram Alpha App",
    url: "https://www.wolframalpha.com/mobile/",
    description: "Wolfram Alpha移动版，随时随地进行数学计算和查询",
    category: "移动应用",
    rating: 4.7
  },
  {
    id: 227,
    name: "GeoGebra Apps",
    url: "https://www.geogebra.org/download",
    description: "GeoGebra移动应用套件，包含图形计算器、几何、3D等工具",
    category: "移动应用",
    rating: 4.6
  },

  // 数学游戏与娱乐
  {
    id: 228,
    name: "DragonBox",
    url: "https://dragonbox.com",
    description: "通过游戏化方式学习代数和几何，适合儿童和青少年",
    category: "教育游戏",
    rating: 4.5
  },
  {
    id: 229,
    name: "Prodigy Math Game",
    url: "https://www.prodigygame.com",
    description: "RPG风格的数学学习游戏，让学习数学变得有趣",
    category: "教育游戏",
    rating: 4.4
  },
  {
    id: 230,
    name: "Set Game Online",
    url: "https://www.setgame.com/set/puzzle",
    description: "经典的Set卡牌游戏在线版，训练逻辑思维和模式识别",
    category: "逻辑游戏",
    rating: 4.3
  }
];