import { Website } from './types';

// 新兴数学领域资源 - 前沿数学研究方向和应用
export const emergingMathFields: Website[] = [
  // 数据科学与机器学习数学
  {
    id: 601,
    name: "Mathematics for Machine Learning",
    url: "https://mml-book.github.io",
    description: "机器学习数学基础在线教材，涵盖线性代数、概率论、优化等核心数学知识",
    category: "机器学习数学",
    rating: 4.9
  },
  {
    id: 602,
    name: "Deep Learning Mathematics",
    url: "https://www.deeplearningbook.org",
    description: "深度学习的数学基础，包括信息论、数值计算、概率论等内容",
    category: "深度学习数学",
    rating: 4.8
  },
  {
    id: 603,
    name: "Statistical Learning Theory",
    url: "https://web.stanford.edu/class/cs229t/",
    description: "斯坦福大学统计学习理论课程，探讨机器学习的理论基础",
    category: "统计学习",
    rating: 4.7
  },

  // 量子计算数学
  {
    id: 604,
    name: "Quantum Computing: An Applied Approach",
    url: "https://qiskit.org/textbook/",
    description: "IBM Qiskit量子计算教材，介绍量子计算的数学原理",
    category: "量子计算",
    rating: 4.8
  },
  {
    id: 605,
    name: "Microsoft Quantum Development Kit",
    url: "https://azure.microsoft.com/en-us/products/quantum",
    description: "微软量子开发工具包，包含量子算法的数学实现",
    category: "量子编程",
    rating: 4.6
  },
  {
    id: 606,
    name: "Quantum Algorithm Zoo",
    url: "https://quantumalgorithmzoo.org",
    description: "量子算法大全，收录各种量子算法及其数学描述",
    category: "量子算法",
    rating: 4.7
  },

  // 区块链与密码学数学
  {
    id: 607,
    name: "Cryptography Engineering",
    url: "https://www.schneier.com/books/cryptography-engineering/",
    description: "现代密码学工程，涵盖椭圆曲线、哈希函数等数学基础",
    category: "密码学数学",
    rating: 4.7
  },
  {
    id: 608,
    name: "Zero-Knowledge Proofs",
    url: "https://zkp.science",
    description: "零知识证明的数学理论和实现，区块链技术的重要组成",
    category: "零知识证明",
    rating: 4.6
  },
  {
    id: 609,
    name: "Elliptic Curve Cryptography",
    url: "https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/",
    description: "椭圆曲线密码学详细介绍，现代加密技术的数学基础",
    category: "椭圆曲线",
    rating: 4.8
  },

  // 生物信息学数学
  {
    id: 610,
    name: "Bioinformatics Algorithms",
    url: "https://www.bioinformaticsalgorithms.org",
    description: "生物信息学算法教材，介绍基因组学中的数学方法",
    category: "生物信息学",
    rating: 4.7
  },
  {
    id: 611,
    name: "Mathematical Biology",
    url: "https://www.math.utah.edu/~keener/mathbio/",
    description: "数学生物学课程，用数学模型描述生物现象",
    category: "数学生物学",
    rating: 4.6
  },
  {
    id: 612,
    name: "Systems Biology Mathematics",
    url: "https://www.systemsbiology.org",
    description: "系统生物学的数学方法，研究复杂生物系统",
    category: "系统生物学",
    rating: 4.5
  },

  // 金融数学与量化分析
  {
    id: 613,
    name: "Quantitative Finance",
    url: "https://www.quantstart.com",
    description: "量化金融学习平台，涵盖期权定价、风险管理等数学模型",
    category: "量化金融",
    rating: 4.8
  },
  {
    id: 614,
    name: "Financial Mathematics",
    url: "https://www.math.nyu.edu/financial_mathematics/",
    description: "纽约大学金融数学项目，培养量化分析师",
    category: "金融数学",
    rating: 4.7
  },
  {
    id: 615,
    name: "Risk Management Mathematics",
    url: "https://www.risk.net",
    description: "风险管理的数学方法，包括VaR、压力测试等模型",
    category: "风险管理",
    rating: 4.6
  },

  // 网络科学与图论应用
  {
    id: 616,
    name: "Network Science",
    url: "http://networksciencebook.com",
    description: "网络科学教材，研究复杂网络的数学性质",
    category: "网络科学",
    rating: 4.8
  },
  {
    id: 617,
    name: "Graph Neural Networks",
    url: "https://distill.pub/2021/gnn-intro/",
    description: "图神经网络介绍，结合图论和深度学习的前沿方向",
    category: "图神经网络",
    rating: 4.7
  },
  {
    id: 618,
    name: "Social Network Analysis",
    url: "https://www.cs.cornell.edu/home/kleinber/networks-book/",
    description: "社交网络分析，用图论方法研究社会关系",
    category: "社交网络",
    rating: 4.6
  },

  // 计算几何与计算机图形学
  {
    id: 619,
    name: "Computational Geometry",
    url: "https://www.cs.umd.edu/~mount/754/Lects/754lects.pdf",
    description: "计算几何算法，在计算机图形学和CAD中应用广泛",
    category: "计算几何",
    rating: 4.7
  },
  {
    id: 620,
    name: "Computer Graphics Mathematics",
    url: "https://www.scratchapixel.com",
    description: "计算机图形学的数学基础，包括变换、光照、渲染等",
    category: "图形学数学",
    rating: 4.8
  },
  {
    id: 621,
    name: "Geometric Deep Learning",
    url: "https://geometricdeeplearning.com",
    description: "几何深度学习，将深度学习扩展到非欧几里得数据",
    category: "几何深度学习",
    rating: 4.6
  },

  // 优化理论新发展
  {
    id: 622,
    name: "Convex Optimization",
    url: "https://web.stanford.edu/~boyd/cvxbook/",
    description: "斯坦福大学凸优化教材，现代优化理论的经典著作",
    category: "凸优化",
    rating: 4.9
  },
  {
    id: 623,
    name: "Online Learning and Optimization",
    url: "https://ocobook.cs.princeton.edu",
    description: "在线学习与优化，研究动态环境下的决策问题",
    category: "在线优化",
    rating: 4.7
  },
  {
    id: 624,
    name: "Reinforcement Learning Theory",
    url: "https://rltheorybook.github.io",
    description: "强化学习理论，结合控制论和机器学习的数学基础",
    category: "强化学习",
    rating: 4.8
  },

  // 拓扑数据分析
  {
    id: 625,
    name: "Topological Data Analysis",
    url: "https://www.math.upenn.edu/~ghrist/notes.html",
    description: "拓扑数据分析入门，用拓扑方法分析高维数据",
    category: "拓扑数据分析",
    rating: 4.6
  },
  {
    id: 626,
    name: "Persistent Homology",
    url: "https://www.maths.ed.ac.uk/~v1ranick/papers/edelcomp.pdf",
    description: "持续同调理论，TDA的核心数学工具",
    category: "持续同调",
    rating: 4.5
  },
  {
    id: 627,
    name: "Mapper Algorithm",
    url: "https://research.math.osu.edu/tgda/mapperPBG.pdf",
    description: "Mapper算法，用于高维数据的可视化和分析",
    category: "数据可视化",
    rating: 4.4
  }
];