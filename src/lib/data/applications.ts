import { PracticalApplication } from './types';

export const practicalApplications: PracticalApplication[] = [
  {
    id: 1,
    title: "天气预报模型概率预测",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&weather%20forecast%20mathematical%20model",
    category: "气象学",
    description: "利用偏微分方程和数值分析预测天气变化，帮助人们提前做好防灾准备。",
    realWorldExample: "气象部门使用数学模型预测台风路径和强度，准确率超过85%",
    mathFields: ["偏微分方程", "数值分析", "统计学"],
    formula: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}",
    formulaExplanation: "贝叶斯概率公式：根据新的气象观测数据更新降水概率预测",
    exampleCalculation: "已知：基础降水概率P(A)=30%，当雷达观测到积雨云时P(B|A)=90%，任意时刻观测到积雨云的概率P(B)=25%，求观测到积雨云时的降水概率P(A|B)",
    reasoningSteps: [
      "步骤1: 明确已知条件：P(A)=0.3, P(B|A)=0.9, P(B)=0.25",
      "步骤2: 应用贝叶斯公式：P(A|B) = (P(B|A)×P(A))/P(B)",
      "步骤3: 代入数值计算：P(A|B) = (0.9×0.3)/0.25 = 0.27/0.25 = 1.08",
      "步骤4: 结果修正：概率值不能大于1，故P(A|B)=100%",
      "结论：当观测到积雨云时，降水概率提升至100%"
    ]
  },
  {
    id: 2,
    title: "复利计算与投资回报模型",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&financial%20derivatives%20pricing",
    category: "金融学",
    description: "应用随机过程和偏微分方程为期权、期货等金融衍生品定价及计算投资回报。",
    realWorldExample: "布莱克-斯科尔斯模型被广泛用于股票期权定价",
    mathFields: ["随机过程", "偏微分方程", "概率论"],
    formula: "A = P(1 + \\frac{r}{n})^{nt}",
    formulaExplanation: "复利计算公式：A为最终金额，P为本金，r为年利率，n为每年复利次数,t为期数(年)",
    exampleCalculation: "假设投资10000元，年利率5%，每年复利12次，计算5年后的本息总额",
    reasoningSteps: [
      "步骤1: 明确已知条件：P=10000元, r=5%=0.05, n=12, t=5",
      "步骤2: 代入公式：A = 10000×(1 + \\frac{0.05}{12})^(12×5)",
      "步骤3: 计算每期利率及期数：0.05/12≈0.00417, 12×5=60期",
      "步骤4: 计算指数部分：(1 + 0.00417)^60 ≈ e^(60×ln(1.00417)) ≈ e^(60×0.00416)≈e^0.25≈1.284",
      "步骤5: 计算最终金额：A≈10000×1.284≈12840元",
      "结论：5年后本息总额约为12840元，利息收益2840元"
    ]
  },
  {
    id: 3,
    title: "线性回归预测模型",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&machine%20learning%20algorithm",
    category: "计算机科学",
    description: "使用线性代数、微积分和概率统计构建和训练各种机器学习模型。线性回归用于建立变量间的线性关系。",
    realWorldExample: "通过房屋面积、房龄等因素预测房价",
    mathFields: ["线性代数", "微积分", "概率统计"],
    formula: "\\hat{y} = \\beta_0 + \\beta_1x_1 + \\beta_2x_2 + ... + \\beta_nx_n + \\epsilon",
    formulaExplanation: "多元线性回归方程：\\hat{y}为预测值，\\beta为回归系数，x为特征变量，\\epsilon为误差项",
    exampleCalculation: "基于房屋面积(x₁)和房龄(x₂)预测房价(y)，模型为：\\hat{y}=50+1.2x₁-0.8x₂，计算面积100㎡、房龄5年的房屋价格",
    reasoningSteps: [
      "步骤1: 明确模型参数：\\beta₀=50, \\beta₁=1.2, \\beta₂=-0.8",
      "步骤2: 代入特征变量x₁=100, x₂=5",
      "步骤3: 计算各分项：1.2×100=120, -0.8×5=-4",
      "步骤4: 汇总计算：\\hat{y}=50+120-4=166",
      "结论：该房屋预测价格约166万元"
    ]
  },
  {
    id: 4,
    title: "梁结构承重计算模型",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&structural%20engineering%20calculation",
    category: "工程学",
    description: "应用静力学和材料力学原理计算建筑结构的承重能力及稳定性安全系数。",
    realWorldExample: "桥梁设计中使用有限元分析计算梁的最大承重和变形量",
    mathFields: ["力学", "微分方程", "材料力学"],
    formula: "M_{max} = \\frac{FL}{4}, \\sigma = \\frac{M_{max}c}{I}",
    formulaExplanation: "最大弯矩和弯曲应力公式：M_max为最大弯矩，F为力,L为力臂长度σ应力,c为截面中性轴至边缘距离,I为截面惯性矩",
    exampleCalculation: "计算简支梁中心承受1000N载荷时的最大应力，梁长4m，矩形截面宽10cm高20cm，材料弹性模量200GPa",
    reasoningSteps: [
      "步骤1: 计算最大弯矩：M_max = FL/4 = 1000×4/4 = 1000N·m",
      "步骤2: 计算截面参数：c=0.1m(20cm/2), I=bh³/12 = 0.1×(0.2)^3/12≈0.1×0.008/12≈6.67×10^-5m⁴",
      "步骤3: 计算弯曲应力：σ = M_max×c/I = 1000×0.1/(6.67×10^-5)≈1.5×10^6Pa=1.5MPa",
      "结论：最大弯曲应力为1.5MPa，远小于钢材屈服强度(约235MPa)，结构安全"
    ]
  },
  {
    id: 5,
    title: "医学影像剂量计算模型",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&medical%20imaging%20analysis",
    category: "医学",
    description: "计算CT扫描辐射剂量及图像重建参数，平衡诊断清晰度与患者辐射风险。",
    realWorldExample: "CT扫描利用断层重建算法生成三维人体结构图像并计算辐射剂量",
    mathFields: ["傅里叶分析", "线性代数", "剂量学"],
    formula: "DLP = CTDI_{vol} × L",
    formulaExplanation: "CT剂量长度乘积：DLP表示总辐射剂量，CTDIvol为容积CT剂量指数，L为扫描长度",
    exampleCalculation: "头部CT扫描CTDIvol=50mGy，扫描长度15cm，计算DLP及有效剂量E",
    reasoningSteps: [
      "步骤1: 计算DLP：DLP=CTDIvol×L=50mGy×15cm=750mGy·cm",
      "步骤2: 计算有效剂量E=DLP×w，头部w=0.0021mSv/(mGy·cm)",
      "步骤3: 代入计算E=750×0.0021≈1.575mSv",
      "结论：该次头部CT扫描有效剂量约1.575mSv(相当于自然本底辐射约6个月)"
    ]
  },
  {
    id: 6,
    title: "交通流量密度与速度关系模型",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&traffic%20flow%20optimization",
    category: "城市规划",
    description: "应用流体力学和统计方法分析交通流量特性，建立流量-密度-速度关系模型。",
    realWorldExample: "智能交通系统使用数学模型动态调整红绿灯时长优化交通流量",
    mathFields: ["流体力学", "最优化", "微分方程"],
    formula: "Q = k×v, v = v_f(1 - \\frac{k}{k_j})",
    formulaExplanation: "交通流基本关系模型及格林伯-赫尔兹曼速度-密度模型：Q为流量(辆/小时),k为密度(辆/公里),v为速度(公里/小时),vf为自由流速度,kj为阻塞密度",
    exampleCalculation: "某高速公路自由流速度vf=100km/h，阻塞密度kj=150辆/km，计算最大流量及最佳密度",
    reasoningSteps: [
      "步骤1: 代入速度公式至流量公式：Q = k×vf×(1 - k/kj)=vf×k-vf×k²/kj",
      "步骤2: 对k求导并令导数为0：dQ/dk=vf-2vf×k/kj=0 ⇒ k=kj/2=75辆/km",
      "步骤3: 计算最佳速度vopt=vf×(1-kj/(2×kj))=vf×(1-1/2)=vf/2=50km/h",
      "步骤4: 计算最大流量Qmax = kopt×vopt=75×50=3750辆/小时",
      "结论：最佳密度为75辆/km，时速50km/h可达最大流量3750辆/小时"
    ]
  }
];