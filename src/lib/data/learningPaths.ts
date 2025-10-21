import { LearningPath } from './types';

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "数学入门",
    educationStage: "初级",
    shortTitle: "初级",
    description: "掌握小学数学核心概念，包括加减乘除四则运算、基础几何图形和简单应用题",
    estimatedHours: 120,
    difficulty: "初级",
    learningObjectives: [
      "熟练掌握整数、分数和小数的四则运算",
      "建立初步的几何空间认知能力",
      "培养基础的数学思维和问题解决能力",
      "能够运用数学知识解决简单的实际问题"
    ],
    coreTopics: [
      { 
        title: "整数运算", 
        description: "掌握整数的加减乘除四则运算及其混合运算",
        keyPoints: [
          "理解运算顺序和优先级规则",
          "掌握进位加法和退位减法技巧",
          "学习乘法口诀和多位数乘法方法",
          "掌握除法的竖式计算和余数概念"
        ]
      },
      { 
        title: "分数与小数", 
        description: "理解分数和小数的概念，掌握基本运算方法",
        keyPoints: [
          "理解分数的意义和分数与除法的关系",
          "掌握分数的化简和通分方法",
          "学习小数的读写和基本运算",
          "理解分数与小数的互化规则"
        ]
      },
      { 
        title: "基础几何", 
        description: "认识基本几何图形，了解周长和面积计算",
        keyPoints: [
          "识别常见平面图形的特征",
          "掌握长方形、正方形周长和面积计算",
          "学习三角形、圆形的基本性质",
          "建立空间图形的初步认知"
        ]
      },
      { 
        title: "简单应用题", 
        description: "学习分析和解决简单的实际应用问题",
        keyPoints: [
          "掌握加减乘除应用题结构分析",
          "学习从实际问题中抽象数学关系",
          "培养分步解决问题的思维习惯",
          "提高数学语言表达能力"
        ]
      }
    ],
    recommendedResources: [
      { 
        name: "小学数学互动课堂", 
        type: "在线课程",
        description: "通过动画和游戏方式学习小学数学概念", 
        url: "https://example.com/primary-math" 
      },
      { 
        name: "趣味数学练习", 
        type: "练习题库",
        description: "适合小学生的数学练习题和互动游戏", 
        url: "https://example.com/math-practice" 
      },
      { 
        name: "数学启蒙视频", 
        type: "视频教程",
        description: "通过生动有趣的视频讲解数学概念", 
        url: "https://example.com/math-videos" 
      }
    ],
    keyChallenges: [
      {
        challenge: "计算容易出错且速度慢",
        solution: "制定每日10分钟速算练习计划，并使用手指计算、数轴等辅助工具强化计算能力"
      },
      {
        challenge: "抽象概念理解困难",
        solution: "通过实物操作、图形演示等可视化方式帮助理解抽象概念"
      }
    ],
    assessmentMethods: [
      {
        type: "单元测试评估",
        description: "每个单元结束后进行针对性测试，检验知识点掌握情况"
      },
      {
        type: "实践应用任务",
        description: "完成与日常生活相关的数学应用项目，如家庭购物预算计算等"
      },
      {
        type: "自我评估",
        description: "定期进行自我评估，记录学习进度和难点问题"
      }
    ],
    applicationCases: [
      "家庭购物预算规划与计算",
      "时间管理与日程安排",
      "测量与绘制房间平面图",
      "简单的家庭记账与理财"
    ]
  },
  {
    id: 2,
    title: "数学进阶",
    educationStage: "中级",
    shortTitle: "中级",
    description: "学习代数基础、平面几何和统计初步，培养逻辑思维能力",
    estimatedHours: 180,
    difficulty: "中级",
    learningObjectives: [
      "掌握代数表达式的变形与运算",
      "理解函数概念及图像性质",
      "学会平面几何的证明方法与技巧",
      "掌握数据收集与统计分析的基本方法"
    ],
    coreTopics: [
      { 
        title: "代数基础", 
        description: "学习代数式、方程与不等式的解法",
        keyPoints: [
          "理解代数式的概念与运算规则",
          "掌握一元一次方程和方程组的解法",
          "学会不等式的性质与解法",
          "理解分式与根式的运算"
        ]
      },
      { 
        title: "函数初步", 
        description: "理解函数概念，学习一次函数和二次函数",
        keyPoints: [
          "理解函数的定义与表示方法",
          "掌握一次函数的图像与性质",
          "学习二次函数的图像与性质",
          "学会函数的应用与建模"
        ]
      },
      { 
        title: "平面几何", 
        description: "学习三角形、四边形等平面图形的性质和证明",
        keyPoints: [
          "掌握三角形的性质与全等判定",
          "理解四边形的分类与性质",
          "学会几何证明的基本方法",
          "掌握圆的基本性质与应用"
        ]
      },
      { 
        title: "统计与概率", 
        description: "掌握数据收集、整理和分析的基本方法",
        keyPoints: [
          "学会数据的收集与整理方法",
          "理解平均数、方差等统计量",
          "掌握概率的基本概念与计算",
          "学会用统计图表表示数据"
        ]
      }
    ],
    keyChallenges: [
      {
        challenge: "代数抽象思维能力不足",
        solution: "通过实际问题引入代数概念，使用具象化模型帮助理解"
      },
      {
        challenge: "几何证明思路难以形成",
        solution: "从简单例题入手，总结常见证明方法，多做变式练习"
      }
    ],
    assessmentMethods: [
      {
        type: "章节测试",
        description: "每章结束后的综合测试，检验知识点掌握情况"
      },
      {
        type: "证明题考核",
        description: "重点考察几何证明能力和逻辑推理能力"
      },
      {
        type: "数学建模小论文",
        description: "运用所学知识解决实际问题，撰写简单的数学建模论文"
      }
    ],
    applicationCases: [
      "利用函数模型预测人口增长趋势",
      "通过几何知识设计建筑结构",
      "运用统计方法分析市场调研数据",
      "使用概率知识评估风险与收益"
    ],
    recommendedResources: [
      { name: "初中数学在线课程", type: "在线课程", description: "系统讲解初中数学知识点和解题方法", url: "https://example.com/junior-math" },
      { name: "几何证明辅助工具", type: "软件工具", description: "可视化几何证明过程，帮助理解几何定理", url: "https://example.com/geo-tool" },
      { name: "初中数学题库", type: "练习资源", description: "分知识点的练习题和模拟试卷", url: "https://example.com/math-questions" }
    ]
  },
  {
    id: 3,
    title: "数学高级",
    educationStage: "高级",
    shortTitle: "高级",
    description: "深入学习函数、立体几何、解析几何、微积分初步等内容，为大学数学打下基础",
    estimatedHours: 240,
    difficulty: "高级",
    learningObjectives: [
      "掌握函数与导数的核心概念及应用",
      "建立空间想象能力，理解立体几何性质",
      "学会用代数方法解决几何问题",
      "理解微积分的基本思想与方法",
      "掌握概率统计的基本理论与应用"
    ],
    coreTopics: [
      { 
        title: "函数与导数", 
        description: "深入学习各类函数性质及导数的应用",
        keyPoints: [
          "掌握基本初等函数的图像与性质",
          "理解导数的定义与几何意义",
          "学会利用导数研究函数单调性和极值",
          "掌握导数在实际问题中的应用"
        ]
      },
      { 
        title: "立体几何", 
        description: "学习空间几何体的性质、表面积和体积计算",
        keyPoints: [
          "理解空间几何体的结构特征",
          "掌握空间点、线、面的位置关系",
          "学会空间角与距离的计算方法",
          "掌握空间几何体的表面积和体积公式"
        ]
      },
      { 
        title: "解析几何", 
        description: "掌握平面直角坐标系中的曲线方程和性质",
        keyPoints: [
          "掌握直线与圆的方程及位置关系",
          "理解圆锥曲线的定义与标准方程",
          "学会用代数方法解决几何问题",
          "掌握参数方程与极坐标的应用"
        ]
      },
      { 
        title: "概率统计", 
        description: "学习随机变量、概率分布和统计推断",
        keyPoints: [
          "理解随机变量及其分布",
          "掌握期望、方差等数字特征",
          "学会参数估计与假设检验方法",
          "了解回归分析的基本原理"
        ]
      },
      { 
        title: "微积分初步", 
        description: "了解极限、导数和积分的基本概念",
        keyPoints: [
          "理解极限的定义与性质",
          "掌握导数的计算法则",
          "理解定积分的概念与几何意义",
          "学会微积分基本公式的应用"
        ]
      }
    ],
    keyChallenges: [
      {
        challenge: "抽象数学概念难以理解",
        solution: "结合几何直观和物理背景理解抽象概念，多维度构建概念体系"
      },
      {
        challenge: "微积分计算技巧掌握困难",
        solution: "通过分类练习掌握典型题型，总结计算规律和技巧"
      }
    ],
    assessmentMethods: [
      {
        type: "综合能力测试",
        description: "全面考察数学知识的综合应用能力"
      },
      {
        type: "问题解决能力评估",
        description: "通过复杂问题考察分析和解决实际问题的能力"
      },
      {
        type: "数学建模项目",
        description: "完成小型数学建模项目，展示数学应用能力"
      }
    ],
    applicationCases: [
      "利用导数优化生产流程和资源配置",
      "通过概率统计方法进行风险评估和决策",
      "运用微积分知识解决物理问题和工程问题",
      "使用解析几何方法进行计算机图形学开发"
    ],
    recommendedResources: [
      { name: "高中数学微课", type: "视频课程", description: "专题讲解高中数学知识点和解题方法", url: "https://example.com/senior-math" },
      { name: "几何画板", type: "软件工具", description: "动态几何软件，帮助理解几何概念", url: "https://example.com/geometry-sketchpad" },
      { name: "高考数学真题库", type: "练习资源", description: "历年高考真题和模拟试卷", url: "https://example.com/gaokao-math" }
    ]
  },
  {
    id: 4,
    title: "专业数学",
    educationStage: "专业级",
    shortTitle: "专业级",
    description: "系统学习高等数学、线性代数、概率论与数理统计等大学基础数学课程",
    estimatedHours: 300,
    difficulty: "专业级",
    learningObjectives: [
      "掌握微积分的理论基础和计算技巧",
      "理解线性代数的核心概念和应用",
      "掌握概率论与数理统计的基本理论",
      "能够运用数学知识解决专业领域问题"
    ],
    coreTopics: [
      { 
        title: "高等数学", 
        description: "深入学习微积分、微分方程和级数理论",
        keyPoints: [
          "掌握极限理论和连续性",
          "理解导数和微分的概念及应用",
          "掌握积分理论和计算技巧",
          "学习微分方程的求解方法"
        ]
      },
      { 
        title: "线性代数", 
        description: "学习矩阵理论、线性方程组和向量空间",
        keyPoints: [
          "掌握矩阵运算和行列式计算",
          "理解向量空间和线性变换",
          "学习特征值和特征向量",
          "掌握二次型理论"
        ]
      },
      { 
        title: "概率论与数理统计", 
        description: "掌握概率论基础和统计分析方法",
        keyPoints: [
          "理解概率的基本概念和性质",
          "掌握随机变量及其分布",
          "学习参数估计和假设检验",
          "了解回归分析和方差分析"
        ]
      },
      { 
        title: "复变函数", 
        description: "了解复数域上的函数性质和解析函数",
        keyPoints: [
          "理解复数和复平面",
          "掌握解析函数的性质",
          "学习复积分和留数定理",
          "了解保形映射"
        ]
      }
    ],
    recommendedResources: [
      { name: "大学数学公开课", type: "在线课程", description: "知名大学的数学课程视频和讲义", url: "https://example.com/university-math" }, 
      { name: "数学分析习题集", type: "教材资源", description: "高等数学练习题及详细解答", url: "https://example.com/analysis-exercises" },
      { name: "线性代数可视化工具", type: "软件工具", description: "通过可视化理解线性代数概念和运算", url: "https://example.com/linear-algebra" }
    ],
    keyChallenges: [
      {
        challenge: "理论抽象程度高，难以理解",
        solution: "结合具体例子和几何直观理解抽象概念，多做练习巩固理论知识"
      },
      {
        challenge: "计算量大且容易出错",
        solution: "掌握计算技巧和规律，使用数学软件辅助计算和验证"
      }
    ],
    assessmentMethods: [
      {
        type: "期末考试",
        description: "全面考察各科目的理论知识和计算能力"
      },
      {
        type: "课程设计",
        description: "运用所学知识完成综合性的数学建模或计算项目"
      }
    ],
    applicationCases: [
      "工程计算和数值分析",
      "经济数学建模和优化",
      "物理问题的数学描述和求解",
      "数据分析和统计推断"
    ]
  },
  {
    id: 5,
    title: "数学大师",
    educationStage: "大师级",
    shortTitle: "大师级",
    difficulty: "高级研究",
    description: "深入学习研究生阶段核心数学课程，为学术研究或专业应用奠定坚实基础",
    estimatedHours: 400,
    learningObjectives: [
      "掌握现代数学的核心理论和方法",
      "具备独立进行数学研究的能力",
      "能够将高深数学理论应用于实际问题",
      "培养数学创新思维和学术素养"
    ],
    coreTopics: [
      { 
        title: "高级分析", 
        description: "深入研究实分析、复分析的高级理论及应用",
        keyPoints: [
          "掌握测度论和积分理论",
          "理解函数空间和泛函分析",
          "学习复分析的高级理论",
          "掌握调和分析基础"
        ]
      },
      { 
        title: "抽象代数", 
        description: "学习群论、环论、域论等抽象代数核心内容",
        keyPoints: [
          "掌握群的结构理论",
          "理解环和域的性质",
          "学习模理论基础",
          "了解代数几何入门"
        ]
      },
      { 
        title: "微分几何", 
        description: "研究微分流形、黎曼几何等微分几何理论",
        keyPoints: [
          "理解微分流形的概念",
          "掌握张量分析",
          "学习黎曼几何基础",
          "了解纤维丛理论"
        ]
      },
      { 
        title: "拓扑学", 
        description: "学习点集拓扑、代数拓扑的基本概念和方法",
        keyPoints: [
          "掌握拓扑空间理论",
          "理解连续映射和同胚",
          "学习基本群和同调群",
          "了解拓扑不变量"
        ]
      },
      { 
        title: "概率论与随机过程", 
        description: "深入研究概率理论基础及随机过程的数学理论",
        keyPoints: [
          "掌握测度论概率基础",
          "理解随机过程理论",
          "学习马尔可夫过程",
          "了解随机分析入门"
        ]
      },
      { 
        title: "数值分析", 
        description: "学习科学计算中的数值方法和算法设计",
        keyPoints: [
          "掌握数值线性代数",
          "理解数值微分和积分",
          "学习偏微分方程数值解",
          "了解优化算法理论"
        ]
      }
    ],
    recommendedResources: [
      { name: "研究生数学课程讲义", type: "学术资源", description: "顶尖大学研究生数学核心课程讲义和课件", url: "https://example.com/graduate-math-notes" },
      { name: "数学研究论文数据库", type: "学术数据库", description: "收录数学各领域最新研究成果的学术数据库", url: "https://example.com/math-research" },
      { name: "学术会议视频", type: "学术资源", description: "国际数学学术会议的演讲视频和论文集", url: "https://example.com/math-conferences" }
    ],
    keyChallenges: [
      {
        challenge: "理论深度大，学习难度极高",
        solution: "循序渐进，从基础理论开始，多参考不同教材和论文，寻求导师指导"
      },
      {
        challenge: "抽象程度高，缺乏直观理解",
        solution: "通过具体例子和应用背景理解抽象理论，多与同行交流讨论"
      }
    ],
    assessmentMethods: [
      {
        type: "学术论文",
        description: "撰写高质量的数学研究论文，展示研究能力"
      },
      {
        type: "学术报告",
        description: "在学术会议或研讨会上做专题报告"
      },
      {
        type: "博士资格考试",
        description: "通过博士研究生资格考试，证明学术水平"
      }
    ],
    applicationCases: [
      "前沿科学研究中的数学建模",
      "高科技产业中的算法设计",
      "金融工程中的风险模型",
      "人工智能中的数学理论"
    ]
  }
];