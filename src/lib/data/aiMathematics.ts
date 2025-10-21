import { AIMathematicsTopic } from './types';

export const aiMathematicsTopics: AIMathematicsTopic[] = [
  {
    id: 1,
    title: "线性代数与矩阵运算",
    category: "基础数学",
    description: "线性代数是机器学习的数学基础，涉及向量、矩阵和线性变换等概念，用于数据表示和特征提取。",
    keyConcepts: ["向量空间", "矩阵乘法", "特征值与特征向量", "奇异值分解", "线性方程组"],
    applicationScenario: "用于图像识别中的特征提取、推荐系统中的协同过滤算法以及自然语言处理中的词向量表示。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-06sc-linear-algebra-fall-2011"
  },
  {
    id: 2,
    title: "多变量微积分与优化",
    category: "基础数学",
    description: "微积分是理解机器学习算法训练过程的关键，特别是梯度下降等优化算法的数学原理。",
    keyConcepts: ["偏导数", "梯度", "Hessian矩阵", "拉格朗日乘数法", "泰勒级数"],
    applicationScenario: "用于神经网络的反向传播算法、支持向量机的优化问题以及深度学习模型的参数更新。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus-fall-2010"
  },
  {
    id: 3,
    title: "概率统计与贝叶斯推断",
    category: "基础数学",
    description: "概率统计为机器学习提供了处理不确定性的框架，是许多算法的理论基础。",
    keyConcepts: ["概率分布", "期望与方差", "最大似然估计", "贝叶斯定理", "假设检验"],
    applicationScenario: "用于贝叶斯分类器、隐马尔可夫模型、生成对抗网络以及强化学习中的策略优化。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-05-introduction-to-probability-and-statistics-spring-2014"
  },
  {
    id: 4,
    title: "最优化理论与算法",
    category: "进阶数学",
    description: "最优化理论研究如何找到使目标函数最小化或最大化的参数值，是训练机器学习模型的核心。",
    keyConcepts: ["凸优化", "梯度下降", "随机梯度下降", "牛顿法", "正则化"],
    applicationScenario: "用于训练神经网络、支持向量机、逻辑回归以及其他参数化模型的参数优化。",
    learningResourceUrl: "https://web.stanford.edu/class/cs229t/2017/syllabus.html"
  },
  {
    id: 5,
    title: "信息论与熵",
    category: "进阶数学",
    description: "信息论研究信息的量化、存储和通信，为许多机器学习算法提供了理论基础。",
    keyConcepts: ["熵", "交叉熵", "KL散度", "互信息", "决策树"],
    applicationScenario: "用于决策树的构建、聚类算法的评估、自然语言处理中的语言模型以及深度学习中的损失函数设计。",
    learningResourceUrl: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-441-information-theory-spring-2010"
  },
  {
    id: 6,
    title: "图论与网络分析",
    category: "进阶数学",
    description: "图论研究图的性质和应用，在社交网络分析、推荐系统和路径规划等AI领域有重要应用。",
    keyConcepts: ["图表示", "最短路径", "中心性分析", "社区检测", "图神经网络"],
    applicationScenario: "用于社交网络分析、推荐系统、知识图谱构建以及蛋白质结构预测等领域。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/lecture-notes/"
  },
  {
    id: 7,
    title: "数值分析与计算方法",
    category: "应用数学",
    description: "数值分析研究如何用计算机求解数学问题，是实现机器学习算法的关键技术。",
    keyConcepts: ["数值稳定性", "迭代方法", "插值与拟合", "数值积分", "微分方程数值解"],
    applicationScenario: "用于机器学习算法的高效实现、大规模数据处理以及科学计算中的模拟问题。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-330-introduction-to-numerical-analysis-spring-2012"
  },
  {
    id: 8,
    title: "微分方程与动力系统",
    category: "应用数学",
    description: "微分方程描述系统随时间的变化，在连续时间序列预测和动态系统建模中有重要应用。",
    keyConcepts: ["常微分方程", "偏微分方程", "稳定性分析", "混沌理论", "控制理论"],
    applicationScenario: "用于物理系统模拟、天气预报、人口增长预测以及机器人运动控制等领域。",
    learningResourceUrl: "https://ocw.mit.edu/courses/mathematics/18-03sc-differential-equations-fall-2011"
  }
];