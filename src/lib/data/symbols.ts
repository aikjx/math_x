import { MathematicalSymbolExtended } from './types';
import { additionalMathematicalSymbols } from './additionalSymbols';

export const mathematicalSymbols: MathematicalSymbolExtended[] = [
  // 集合论符号
  {
    id: 1,
    symbol: "∀",
    name: "全称量词",
    category: "集合论",
    meaning: "对于所有；对于任意",
    example: "∀x ∈ N, x > 0",
    latex: "\\forall"
  },
  {
    id: 2,
    symbol: "∃",
    name:"存在量词",
    category: "集合论",
    meaning: "存在；至少有一个",
    example: "∃x ∈ R, x² = 2",
    latex: "\\exists"
  },
  {
    id: 3,
    symbol: "∈",
    name: "属于",
    category: "集合论",
    meaning: "元素属于集合",
    example: "a ∈ A",
    latex: "\\in"
  },
  {
    id: 4,
    symbol: "∉",
    name: "不属于",
    category: "集合论",
    meaning: "元素不属于集合",
    example: "b ∉ A",
    latex: "\\notin"
  },
  {
    id: 5,
    symbol: "⊆",
    name: "子集",
    category: "集合论",
    meaning: "集合A是集合B的子集",
    example: "A ⊆ B",
    latex: "\\subseteq"
  },
  {
    id: 6,
    symbol: "⊂",
    name: "真子集",
    category: "集合论",
    meaning: "集合A是集合B的真子集",
    example: "A ⊂ B",
    latex: "\\subset"
  },
  {
    id: 7,
    symbol: "∪",
    name: "并集",
    category: "集合论",
    meaning: "两个集合的并集",
    example: "A ∪ B",
    latex: "\\cup"
  },
  {
    id: 8,
    symbol: "∩",
    name: "交集",
    category: "集合论",
    meaning: "两个集合的交集",
    example: "A ∩ B",
    latex: "\\cap"
  },
  {
    id: 9,
    symbol: "∅",
    name: "空集",
    category: "集合论",
    meaning: "不含任何元素的集合",
    example: "A ∩ B = ∅",
    latex: "\\emptyset"
  },
  {
    id: 10,
    symbol: "ℕ",
    name: "自然数集",
    category: "集合论",
    meaning: "所有自然数的集合",
    example: "x ∈ ℕ",
    latex: "\\mathbb{N}"
  },
  {
    id: 11,
    symbol: "ℤ",
    name: "整数集",
    category: "集合论",
    meaning: "所有整数的集合",
    example: "x ∈ ℤ",
    latex: "\\mathbb{Z}"
  },
  {
    id: 12,
    symbol: "ℚ",
    name: "有理数集",
    category: "集合论",
    meaning: "所有有理数的集合",
    example: "x ∈ ℚ",
    latex: "\\mathbb{Q}"
  },
  {
    id: 13,
    symbol: "ℝ",
    name: "实数集",
    category: "集合论",
    meaning: "所有实数的集合",
    example: "x ∈ ℝ",
    latex: "\\mathbb{R}"
  },
  {
    id: 14,
    symbol: "ℂ",
    name: "复数集",
    category: "集合论",
    meaning: "所有复数的集合",
    example: "x ∈ ℂ",
    latex: "\\mathbb{C}"
  },
  {
    id: 15,
    symbol: "⊇",
    name: "超集",
    category: "集合论",
    meaning: "集合B是集合A的超集",
    example: "B ⊇ A",
    latex: "\\supseteq"
  },
  {
    id: 16,
    symbol: "⊃",
    name: "真超集",
    category: "集合论",
    meaning: "集合B是集合A的真超集",
    example: "B ⊃ A",
    latex: "\\supset"
  },
  {
    id: 17,
    symbol: "∁",
    name: "补集",
    category: "集合论",
    meaning: "集合的补集",
    example: "∁_U A",
    latex: "\\complement"
  },
  {
    id: 18,
    symbol: "×",
    name: "笛卡尔积",
    category: "集合论",
    meaning: "两个集合的笛卡尔积",
    example: "A × B",
    latex: "\\times"
  },
  {
    id: 19,
    symbol: "△",
    name: "对称差",
    category: "集合论",
    meaning: "两个集合的对称差",
    example: "A △ B",
    latex: "\\bigtriangleup"
  },
  {
    id: 20,
    symbol: "ℙ",
    name: "幂集",
    category: "集合论",
    meaning: "集合的幂集",
    example: "ℙ(A)",
    latex: "\\mathbb{P}"
  },
  
  // 微积分符号
  {
    id: 21,
    symbol: "∞",
    name: "无穷大",
    category: "微积分",
    meaning: "表示无限大的概念",
    example: "limₓ→∞ f(x) = 0",
    latex: "\\infty"
  },
  {
    id: 22,
    symbol: "∫",
    name: "积分符号",
    category: "微积分",
    meaning: "表示积分运算",
    example: "∫f(x)dx",
    latex: "\\int"
  },
  {
    id: 23,
    symbol: "∬",
    name: "二重积分",
    category: "微积分",
    meaning: "平面区域上的积分",
    example: "∬_D f(x,y) dxdy",
    latex: "\\iint"
  },
  {
    id: 24,
    symbol: "∭",
    name: "三重积分",
    category: "微积分",
    meaning: "空间区域上的积分",
    example: "∭_V f(x,y,z) dxdydz",
    latex: "\\iiint"
  },
  {
    id: 25,
    symbol: "∮",
    name: "曲线积分",
    category: "微积分",
    meaning: "沿着闭合曲线的积分",
    example: "∮_C F·dr",
    latex: "\\oint"
  },
  {
    id: 26,
    symbol: "lim",
    name: "极限符号",
    category: "微积分",
    meaning: "表示函数的极限",
    example: "limₓ→a f(x) = L",
    latex: "\\lim"
  },
  {
    id: 27,
    symbol: "→",
    name: "趋近符号",
    category: "微积分",
    meaning: "表示变量趋近于某个值",
    example: "x → a",
    latex: "\\to"
  },
  {
    id: 28,
    symbol: "f'(x)",
    name: "导数符号",
    category: "微积分",
    meaning: "表示函数f对x的一阶导数",
    example: "f'(x) = df/dx",
    latex: "f'(x)"
  },
  {
    id: 29,
    symbol: "f''(x)",
    name: "二阶导数",
    category: "微积分",
    meaning: "表示函数f对x的二阶导数",
    example: "f''(x) = d²f/dx²",
    latex: "f''(x)"
  },
  {
    id: 30,
    symbol: "df/dx",
    name: "导数符号",
    category: "微积分",
    meaning: "表示函数f对x的导数",
    example: "df/dx = 2x",
    latex: "\\frac{df}{dx}"
  },
  {
    id: 31,
    symbol: "∂",
    name: "偏微分符号",
    category: "微积分",
    meaning: "表示偏导数",
    example: "∂f/∂x",
    latex: "\\partial"
  },
  {
    id: 32,
    symbol: "∇",
    name: "梯度算子",
    category: "微积分",
    meaning: "表示梯度运算",
    example: "∇f(x,y,z)",
    latex: "\\nabla"
  },
  {
    id: 33,
    symbol: "Δ",
    name: "差分符号",
    category: "微积分",
    meaning: "表示差分或拉普拉斯算子",
    example: "Δf(x)",
    latex: "\\Delta"
  },
  {
    id: 34,
    symbol: "∇²",
    name: "拉普拉斯算子",
    category: "微积分",
    meaning: "表示梯度的散度，是一个二阶微分算子",
    example: "∇²f = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²",
    latex: "\\nabla^2"
  },
  {
    id: 35,
    symbol: "d/dx",
    name: "微分算子",
    category: "微积分",
    meaning: "对x的微分运算",
    example: "d/dx f(x)",
    latex: "\\frac{d}{dx}"
  },
  {
    id: 36,
    symbol: "∫ₐᵇ",
    name: "定积分",
    category: "微积分",
    meaning: "从a到b的定积分",
    example: "∫ₐᵇ f(x)dx",
    latex: "\\int_a^b"
  },
  {
    id: 37,
    symbol: "∇·",
    name: "散度算子",
    category: "微积分",
    meaning: "向量场的散度",
    example: "∇·F",
    latex: "\\nabla\\cdot"
  },
  {
    id: 38,
    symbol: "∇×",
    name: "旋度算子",
    category: "微积分",
    meaning: "向量场的旋度",
    example: "∇×F",
    latex: "\\nabla\\times"
  },
  {
    id: 39,
    symbol: "o",
    name: "小o符号",
    category: "微积分",
    meaning: "高阶无穷小量",
    example: "f(x) = o(g(x))",
    latex: "o"
  },
  {
    id: 40,
    symbol: "O",
    name: "大O符号",
    category: "微积分",
    meaning: "同阶无穷小量",
    example: "f(x) = O(g(x))",
    latex: "O"
  },
  
  // 代数符号
  {
    id: 41,
    symbol: "√",
    name: "平方根",
    category: "代数",
    meaning: "表示平方根运算",
    example: "√4 = 2",
    latex: "\\sqrt"
  },
  {
    id: 42,
    symbol: "∛",
    name: "立方根",
    category: "代数",
    meaning: "表示立方根运算",
    example: "∛8 = 2",
    latex: "\\sqrt[3]"
  },
  {
    id: 43,
    symbol: "±",
    name: "正负号",
    category: "代数",
    meaning: "表示正负两种情况",
    example: "x = ±3",
    latex: "\\pm"
  },
  {
    id: 44,
    symbol: "∓",
    name: "负正号",
    category: "代数",
    meaning: "与正负号配合使用，表示相反的符号组合",
    example: "a ± b ∓ c",
    latex: "\\mp"
  },
  {
    id: 45,
    symbol: "∝",
    name: "正比符号",
    category: "代数",
    meaning: "表示成正比关系",
    example: "F ∝ a",
    latex: "\\propto"
  },
  {
    id: 46,
    symbol: "≡",
    name: "恒等符号",
    category: "代数",
    meaning: "表示恒等关系或同余关系",
    example: "a ≡ b mod n",
    latex: "\\equiv"
  },
  {
    id: 47,
    symbol: "≈",
    name: "约等号",
    category: "代数",
    meaning: "表示近似相等",
    example: "π ≈ 3.14159",
    latex: "\\approx"
  },
  {
    id: 48,
    symbol: "≠",
    name: "不等号",
    category: "代数",
    meaning: "表示不等于关系",
    example: "a ≠ b",
    latex: "\\neq"
  },
  {
    id: 49,
    symbol: "≤",
    name: "小于等于号",
    category: "代数",
    meaning: "表示小于或等于关系",
    example: "a ≤ b",
    latex: "\\leq"
  },
  {
    id: 50,
    symbol: "≥",
    name: "大于等于号",
    category: "代数",
    meaning: "表示大于或等于关系",
    example: "a ≥ b",
    latex: "\\geq"
  },

  // 更多希腊字母
  {
    id: 51,
    symbol: "α",
    name: "Alpha",
    category: "希腊字母",
    meaning: "希腊字母α，常用作角度或参数",
    example: "sin α = 0.5",
    latex: "\\alpha"
  },
  {
    id: 52,
    symbol: "β",
    name: "Beta",
    category: "希腊字母",
    meaning: "希腊字母β，常用作角度或参数",
    example: "cos β = 0.8",
    latex: "\\beta"
  },
  {
    id: 53,
    symbol: "γ",
    name: "Gamma",
    category: "希腊字母",
    meaning: "希腊字母γ，常用作角度或伽马函数",
    example: "Γ(n) = (n-1)!",
    latex: "\\gamma"
  },
  {
    id: 54,
    symbol: "δ",
    name: "Delta",
    category: "希腊字母",
    meaning: "希腊字母δ，常用作微小量或狄拉克函数",
    example: "δ(x)",
    latex: "\\delta"
  },
  {
    id: 55,
    symbol: "ε",
    name: "Epsilon",
    category: "希腊字母",
    meaning: "希腊字母ε，常用作微小正数",
    example: "∀ε > 0",
    latex: "\\epsilon"
  },
  {
    id: 56,
    symbol: "ζ",
    name: "Zeta",
    category: "希腊字母",
    meaning: "希腊字母ζ，常用于黎曼ζ函数",
    example: "ζ(s) = Σ 1/n^s",
    latex: "\\zeta"
  },
  {
    id: 57,
    symbol: "η",
    name: "Eta",
    category: "希腊字母",
    meaning: "希腊字母η，常用作效率或参数",
    example: "η = 0.85",
    latex: "\\eta"
  },
  {
    id: 58,
    symbol: "θ",
    name: "Theta",
    category: "希腊字母",
    meaning: "希腊字母θ，常用作角度",
    example: "θ = 30°",
    latex: "\\theta"
  },
  {
    id: 59,
    symbol: "ι",
    name: "Iota",
    category: "希腊字母",
    meaning: "希腊字母ι",
    example: "ι(x)",
    latex: "\\iota"
  },
  {
    id: 60,
    symbol: "κ",
    name: "Kappa",
    category: "希腊字母",
    meaning: "希腊字母κ，常用作曲率",
    example: "κ = 1/R",
    latex: "\\kappa"
  },
  {
    id: 61,
    symbol: "λ",
    name: "Lambda",
    category: "希腊字母",
    meaning: "希腊字母λ，常用作特征值或波长",
    example: "λ = 500nm",
    latex: "\\lambda"
  },
  {
    id: 62,
    symbol: "μ",
    name: "Mu",
    category: "希腊字母",
    meaning: "希腊字母μ，常用作均值或摩擦系数",
    example: "μ = E[X]",
    latex: "\\mu"
  },
  {
    id: 63,
    symbol: "ν",
    name: "Nu",
    category: "希腊字母",
    meaning: "希腊字母ν，常用作频率",
    example: "ν = c/λ",
    latex: "\\nu"
  },
  {
    id: 64,
    symbol: "ξ",
    name: "Xi",
    category: "希腊字母",
    meaning: "希腊字母ξ",
    example: "ξ(x)",
    latex: "\\xi"
  },
  {
    id: 65,
    symbol: "π",
    name: "Pi",
    category: "希腊字母",
    meaning: "圆周率，约等于3.14159",
    example: "C = 2πr",
    latex: "\\pi"
  },
  {
    id: 66,
    symbol: "ρ",
    name: "Rho",
    category: "希腊字母",
    meaning: "希腊字母ρ，常用作密度或相关系数",
    example: "ρ = m/V",
    latex: "\\rho"
  },
  {
    id: 67,
    symbol: "σ",
    name: "Sigma",
    category: "希腊字母",
    meaning: "希腊字母σ，常用作标准差",
    example: "σ = √Var(X)",
    latex: "\\sigma"
  },
  {
    id: 68,
    symbol: "τ",
    name: "Tau",
    category: "希腊字母",
    meaning: "希腊字母τ，常用作时间常数",
    example: "τ = RC",
    latex: "\\tau"
  },
  {
    id: 69,
    symbol: "υ",
    name: "Upsilon",
    category: "希腊字母",
    meaning: "希腊字母υ",
    example: "υ(x)",
    latex: "\\upsilon"
  },
  {
    id: 70,
    symbol: "φ",
    name: "Phi",
    category: "希腊字母",
    meaning: "希腊字母φ，常用作黄金比例或相位",
    example: "φ = (1+√5)/2",
    latex: "\\phi"
  },
  {
    id: 71,
    symbol: "χ",
    name: "Chi",
    category: "希腊字母",
    meaning: "希腊字母χ，常用于卡方分布",
    example: "χ²检验",
    latex: "\\chi"
  },
  {
    id: 72,
    symbol: "ψ",
    name: "Psi",
    category: "希腊字母",
    meaning: "希腊字母ψ，常用作波函数",
    example: "ψ(x,t)",
    latex: "\\psi"
  },
  {
    id: 73,
    symbol: "ω",
    name: "Omega",
    category: "希腊字母",
    meaning: "希腊字母ω，常用作角频率",
    example: "ω = 2πf",
    latex: "\\omega"
  },

  // 大写希腊字母
  {
    id: 74,
    symbol: "Γ",
    name: "大写Gamma",
    category: "希腊字母",
    meaning: "伽马函数",
    example: "Γ(n) = (n-1)!",
    latex: "\\Gamma"
  },
  {
    id: 75,
    symbol: "Δ",
    name: "大写Delta",
    category: "希腊字母",
    meaning: "变化量或拉普拉斯算子",
    example: "Δx = x₂ - x₁",
    latex: "\\Delta"
  },
  {
    id: 76,
    symbol: "Θ",
    name: "大写Theta",
    category: "希腊字母",
    meaning: "大O记号的变体",
    example: "f(n) = Θ(n²)",
    latex: "\\Theta"
  },
  {
    id: 77,
    symbol: "Λ",
    name: "大写Lambda",
    category: "希腊字母",
    meaning: "对角矩阵或外积",
    example: "Λ = diag(λ₁, λ₂, ...)",
    latex: "\\Lambda"
  },
  {
    id: 78,
    symbol: "Ξ",
    name: "大写Xi",
    category: "希腊字母",
    meaning: "随机变量或粒子物理中的粒子",
    example: "Ξ⁻粒子",
    latex: "\\Xi"
  },
  {
    id: 79,
    symbol: "Π",
    name: "大写Pi",
    category: "希腊字母",
    meaning: "连乘符号",
    example: "Π_{i=1}^n a_i",
    latex: "\\Pi"
  },
  {
    id: 80,
    symbol: "Σ",
    name: "大写Sigma",
    category: "希腊字母",
    meaning: "求和符号",
    example: "Σ_{i=1}^n a_i",
    latex: "\\Sigma"
  },
  {
    id: 81,
    symbol: "Υ",
    name: "大写Upsilon",
    category: "希腊字母",
    meaning: "粒子物理中的粒子",
    example: "Υ介子",
    latex: "\\Upsilon"
  },
  {
    id: 82,
    symbol: "Φ",
    name: "大写Phi",
    category: "希腊字母",
    meaning: "磁通量或黄金比例",
    example: "Φ = B·A",
    latex: "\\Phi"
  },
  {
    id: 83,
    symbol: "Χ",
    name: "大写Chi",
    category: "希腊字母",
    meaning: "卡方分布",
    example: "Χ²分布",
    latex: "\\Chi"
  },
  {
    id: 84,
    symbol: "Ψ",
    name: "大写Psi",
    category: "希腊字母",
    meaning: "波函数或心理学符号",
    example: "Ψ(x,t)",
    latex: "\\Psi"
  },
  {
    id: 85,
    symbol: "Ω",
    name: "大写Omega",
    category: "希腊字母",
    meaning: "电阻单位或样本空间",
    example: "R = 100Ω",
    latex: "\\Omega"
  },

  // 逻辑符号
  {
    id: 86,
    symbol: "∧",
    name: "逻辑与",
    category: "逻辑",
    meaning: "逻辑合取运算",
    example: "P ∧ Q",
    latex: "\\land"
  },
  {
    id: 87,
    symbol: "∨",
    name: "逻辑或",
    category: "逻辑",
    meaning: "逻辑析取运算",
    example: "P ∨ Q",
    latex: "\\lor"
  },
  {
    id: 88,
    symbol: "¬",
    name: "逻辑非",
    category: "逻辑",
    meaning: "逻辑否定运算",
    example: "¬P",
    latex: "\\neg"
  },
  {
    id: 89,
    symbol: "→",
    name: "蕴含",
    category: "逻辑",
    meaning: "逻辑蕴含关系",
    example: "P → Q",
    latex: "\\rightarrow"
  },
  {
    id: 90,
    symbol: "↔",
    name: "双条件",
    category: "逻辑",
    meaning: "逻辑等价关系",
    example: "P ↔ Q",
    latex: "\\leftrightarrow"
  },
  {
    id: 91,
    symbol: "⊕",
    name: "异或",
    category: "逻辑",
    meaning: "逻辑异或运算",
    example: "P ⊕ Q",
    latex: "\\oplus"
  },
  {
    id: 92,
    symbol: "⊤",
    name: "真",
    category: "逻辑",
    meaning: "逻辑真值",
    example: "P ∨ ⊤ = ⊤",
    latex: "\\top"
  },
  {
    id: 93,
    symbol: "⊥",
    name: "假",
    category: "逻辑",
    meaning: "逻辑假值或垂直",
    example: "P ∧ ⊥ = ⊥",
    latex: "\\bot"
  },
  {
    id: 94,
    symbol: "⊢",
    name: "推导",
    category: "逻辑",
    meaning: "逻辑推导关系",
    example: "Γ ⊢ φ",
    latex: "\\vdash"
  },
  {
    id: 95,
    symbol: "⊨",
    name: "语义蕴含",
    category: "逻辑",
    meaning: "语义蕴含关系",
    example: "Γ ⊨ φ",
    latex: "\\models"
  },

  // 几何符号
  {
    id: 96,
    symbol: "∠",
    name: "角",
    category: "几何",
    meaning: "表示角度",
    example: "∠ABC = 90°",
    latex: "\\angle"
  },
  {
    id: 97,
    symbol: "∟",
    name: "直角",
    category: "几何",
    meaning: "表示直角",
    example: "∠ABC = ∟",
    latex: "\\square"
  },
  {
    id: 98,
    symbol: "△",
    name: "三角形",
    category: "几何",
    meaning: "表示三角形",
    example: "△ABC",
    latex: "\\triangle"
  },
  {
    id: 99,
    symbol: "□",
    name: "正方形",
    category: "几何",
    meaning: "表示正方形或方框",
    example: "□ABCD",
    latex: "\\square"
  },
  {
    id: 100,
    symbol: "○",
    name: "圆",
    category: "几何",
    meaning: "表示圆",
    example: "○O",
    latex: "\\circ"
  },
  {
    id: 101,
    symbol: "∥",
    name: "平行",
    category: "几何",
    meaning: "表示平行关系",
    example: "AB ∥ CD",
    latex: "\\parallel"
  },
  {
    id: 102,
    symbol: "⊥",
    name: "垂直",
    category: "几何",
    meaning: "表示垂直关系",
    example: "AB ⊥ CD",
    latex: "\\perp"
  },
  {
    id: 103,
    symbol: "≅",
    name: "全等",
    category: "几何",
    meaning: "表示全等关系",
    example: "△ABC ≅ △DEF",
    latex: "\\cong"
  },
  {
    id: 104,
    symbol: "∼",
    name: "相似",
    category: "几何",
    meaning: "表示相似关系",
    example: "△ABC ∼ △DEF",
    latex: "\\sim"
  },
  {
    id: 105,
    symbol: "⌒",
    name: "弧",
    category: "几何",
    meaning: "表示圆弧",
    example: "⌒AB",
    latex: "\\frown"
  },

  // 概率统计符号
  {
    id: 106,
    symbol: "P",
    name: "概率",
    category: "概率统计",
    meaning: "表示概率",
    example: "P(A) = 0.5",
    latex: "P"
  },
  {
    id: 107,
    symbol: "E",
    name: "期望",
    category: "概率统计",
    meaning: "表示数学期望",
    example: "E[X] = μ",
    latex: "E"
  },
  {
    id: 108,
    symbol: "Var",
    name: "方差",
    category: "概率统计",
    meaning: "表示方差",
    example: "Var(X) = σ²",
    latex: "\\text{Var}"
  },
  {
    id: 109,
    symbol: "Cov",
    name: "协方差",
    category: "概率统计",
    meaning: "表示协方差",
    example: "Cov(X,Y)",
    latex: "\\text{Cov}"
  },
  {
    id: 110,
    symbol: "∼",
    name: "分布",
    category: "概率统计",
    meaning: "表示服从某种分布",
    example: "X ∼ N(0,1)",
    latex: "\\sim"
  },
  {
    id: 111,
    symbol: "N",
    name: "正态分布",
    category: "概率统计",
    meaning: "表示正态分布",
    example: "X ∼ N(μ,σ²)",
    latex: "N"
  },
  {
    id: 112,
    symbol: "χ²",
    name: "卡方",
    category: "概率统计",
    meaning: "卡方分布或检验",
    example: "χ²(n)",
    latex: "\\chi^2"
  },
  {
    id: 113,
    symbol: "t",
    name: "t分布",
    category: "概率统计",
    meaning: "学生t分布",
    example: "t(n)",
    latex: "t"
  },
  {
    id: 114,
    symbol: "F",
    name: "F分布",
    category: "概率统计",
    meaning: "F分布",
    example: "F(m,n)",
    latex: "F"
  },
  {
    id: 115,
    symbol: "α",
    name: "显著性水平",
    category: "概率统计",
    meaning: "统计检验的显著性水平",
    example: "α = 0.05",
    latex: "\\alpha"
  },

  // 线性代数符号
  {
    id: 116,
    symbol: "det",
    name: "行列式",
    category: "线性代数",
    meaning: "表示矩阵的行列式",
    example: "det(A)",
    latex: "\\det"
  },
  {
    id: 117,
    symbol: "tr",
    name: "迹",
    category: "线性代数",
    meaning: "表示矩阵的迹",
    example: "tr(A)",
    latex: "\\text{tr}"
  },
  {
    id: 118,
    symbol: "rank",
    name: "秩",
    category: "线性代数",
    meaning: "表示矩阵的秩",
    example: "rank(A)",
    latex: "\\text{rank}"
  },
  {
    id: 119,
    symbol: "dim",
    name: "维数",
    category: "线性代数",
    meaning: "表示向量空间的维数",
    example: "dim(V)",
    latex: "\\dim"
  },
  {
    id: 120,
    symbol: "span",
    name: "张成",
    category: "线性代数",
    meaning: "表示向量组张成的空间",
    example: "span{v₁, v₂}",
    latex: "\\text{span}"
  },
  {
    id: 121,
    symbol: "⊗",
    name: "张量积",
    category: "线性代数",
    meaning: "表示张量积运算",
    example: "A ⊗ B",
    latex: "\\otimes"
  },
  {
    id: 122,
    symbol: "⊕",
    name: "直和",
    category: "线性代数",
    meaning: "表示直和运算",
    example: "V ⊕ W",
    latex: "\\oplus"
  },
  {
    id: 123,
    symbol: "‖·‖",
    name: "范数",
    category: "线性代数",
    meaning: "表示向量或矩阵的范数",
    example: "‖x‖₂",
    latex: "\\|\\cdot\\|"
  },
  {
    id: 124,
    symbol: "⟨·,·⟩",
    name: "内积",
    category: "线性代数",
    meaning: "表示内积运算",
    example: "⟨u,v⟩",
    latex: "\\langle\\cdot,\\cdot\\rangle"
  },
  {
    id: 125,
    symbol: "A^T",
    name: "转置",
    category: "线性代数",
    meaning: "表示矩阵的转置",
    example: "A^T",
    latex: "A^T"
  },

  // 数论符号
  {
    id: 126,
    symbol: "gcd",
    name: "最大公约数",
    category: "数论",
    meaning: "表示最大公约数",
    example: "gcd(12,18) = 6",
    latex: "\\gcd"
  },
  {
    id: 127,
    symbol: "lcm",
    name: "最小公倍数",
    category: "数论",
    meaning: "表示最小公倍数",
    example: "lcm(12,18) = 36",
    latex: "\\text{lcm}"
  },
  {
    id: 128,
    symbol: "≡",
    name: "同余",
    category: "数论",
    meaning: "表示同余关系",
    example: "a ≡ b (mod n)",
    latex: "\\equiv"
  },
  {
    id: 129,
    symbol: "∤",
    name: "不整除",
    category: "数论",
    meaning: "表示不整除关系",
    example: "3 ∤ 10",
    latex: "\\nmid"
  },
  {
    id: 130,
    symbol: "∣",
    name: "整除",
    category: "数论",
    meaning: "表示整除关系",
    example: "3 ∣ 9",
    latex: "\\mid"
  },
  {
    id: 131,
    symbol: "φ",
    name: "欧拉函数",
    category: "数论",
    meaning: "欧拉φ函数",
    example: "φ(n)",
    latex: "\\phi"
  },
  {
    id: 132,
    symbol: "μ",
    name: "莫比乌斯函数",
    category: "数论",
    meaning: "莫比乌斯μ函数",
    example: "μ(n)",
    latex: "\\mu"
  },
  {
    id: 133,
    symbol: "τ",
    name: "除数函数",
    category: "数论",
    meaning: "除数个数函数",
    example: "τ(n)",
    latex: "\\tau"
  },
  {
    id: 134,
    symbol: "σ",
    name: "除数和函数",
    category: "数论",
    meaning: "除数和函数",
    example: "σ(n)",
    latex: "\\sigma"
  },
  {
    id: 135,
    symbol: "ℙ",
    name: "素数集",
    category: "数论",
    meaning: "所有素数的集合",
    example: "p ∈ ℙ",
    latex: "\\mathbb{P}"
  },

  // 复分析符号
  {
    id: 136,
    symbol: "i",
    name: "虚数单位",
    category: "复分析",
    meaning: "虚数单位，i² = -1",
    example: "z = a + bi",
    latex: "i"
  },
  {
    id: 137,
    symbol: "Re",
    name: "实部",
    category: "复分析",
    meaning: "复数的实部",
    example: "Re(z)",
    latex: "\\text{Re}"
  },
  {
    id: 138,
    symbol: "Im",
    name: "虚部",
    category: "复分析",
    meaning: "复数的虚部",
    example: "Im(z)",
    latex: "\\text{Im}"
  },
  {
    id: 139,
    symbol: "z̄",
    name: "共轭",
    category: "复分析",
    meaning: "复数的共轭",
    example: "z̄ = a - bi",
    latex: "\\overline{z}"
  },
  {
    id: 140,
    symbol: "arg",
    name: "幅角",
    category: "复分析",
    meaning: "复数的幅角",
    example: "arg(z)",
    latex: "\\arg"
  },
  {
    id: 141,
    symbol: "|z|",
    name: "模",
    category: "复分析",
    meaning: "复数的模",
    example: "|z| = √(a² + b²)",
    latex: "|z|"
  },
  {
    id: 142,
    symbol: "e^{iθ}",
    name: "欧拉公式",
    category: "复分析",
    meaning: "欧拉公式表示",
    example: "e^{iθ} = cos θ + i sin θ",
    latex: "e^{i\\theta}"
  },
  {
    id: 143,
    symbol: "Res",
    name: "留数",
    category: "复分析",
    meaning: "复函数的留数",
    example: "Res(f,z₀)",
    latex: "\\text{Res}"
  },
  {
    id: 144,
    symbol: "∮",
    name: "围道积分",
    category: "复分析",
    meaning: "沿闭合路径的积分",
    example: "∮_C f(z)dz",
    latex: "\\oint"
  },
  {
    id: 145,
    symbol: "ℂ",
    name: "复平面",
    category: "复分析",
    meaning: "复数平面",
    example: "z ∈ ℂ",
    latex: "\\mathbb{C}"
  },

  // 拓扑符号
  {
    id: 146,
    symbol: "∂",
    name: "边界",
    category: "拓扑",
    meaning: "集合的边界",
    example: "∂A",
    latex: "\\partial"
  },
  {
    id: 147,
    symbol: "int",
    name: "内部",
    category: "拓扑",
    meaning: "集合的内部",
    example: "int(A)",
    latex: "\\text{int}"
  },
  {
    id: 148,
    symbol: "cl",
    name: "闭包",
    category: "拓扑",
    meaning: "集合的闭包",
    example: "cl(A)",
    latex: "\\text{cl}"
  },
  {
    id: 149,
    symbol: "≈",
    name: "同胚",
    category: "拓扑",
    meaning: "拓扑同胚关系",
    example: "X ≈ Y",
    latex: "\\approx"
  },
  {
    id: 150,
    symbol: "≃",
    name: "同伦",
    category: "拓扑",
    meaning: "同伦等价关系",
    example: "f ≃ g",
    latex: "\\simeq"
  },

  // 更多特殊符号
  {
    id: 151,
    symbol: "∅",
    name: "空集",
    category: "集合论",
    meaning: "不含任何元素的集合",
    example: "A ∩ B = ∅",
    latex: "\\emptyset"
  },
  {
    id: 152,
    symbol: "∴",
    name: "所以",
    category: "逻辑",
    meaning: "表示结论",
    example: "a > b, b > c ∴ a > c",
    latex: "\\therefore"
  },
  {
    id: 153,
    symbol: "∵",
    name: "因为",
    category: "逻辑",
    meaning: "表示原因",
    example: "∵ a > 0, b > 0",
    latex: "\\because"
  },
  {
    id: 154,
    symbol: "□",
    name: "证毕",
    category: "逻辑",
    meaning: "表示证明结束",
    example: "证明完毕 □",
    latex: "\\square"
  },
  {
    id: 155,
    symbol: "∎",
    name: "证毕",
    category: "逻辑",
    meaning: "表示证明结束",
    example: "证明完毕 ∎",
    latex: "\\blacksquare"
  },
  {
    id: 156,
    symbol: "iff",
    name: "当且仅当",
    category: "逻辑",
    meaning: "当且仅当的缩写",
    example: "P iff Q",
    latex: "\\text{iff}"
  },
  {
    id: 157,
    symbol: "s.t.",
    name: "使得",
    category: "逻辑",
    meaning: "such that的缩写",
    example: "∃x s.t. P(x)",
    latex: "\\text{s.t.}"
  },
  {
    id: 158,
    symbol: "w.r.t.",
    name: "关于",
    category: "逻辑",
    meaning: "with respect to的缩写",
    example: "导数 w.r.t. x",
    latex: "\\text{w.r.t.}"
  },
  {
    id: 159,
    symbol: "∝",
    name: "正比",
    category: "关系符号",
    meaning: "成正比关系",
    example: "F ∝ ma",
    latex: "\\propto"
  },
  {
    id: 160,
    symbol: "∞",
    name: "无穷",
    category: "特殊符号",
    meaning: "无穷大",
    example: "lim_{x→∞} f(x)",
    latex: "\\infty"
  }
];

// 导入高级符号
import { advancedMathematicalSymbols } from './advancedSymbols';

// 合并所有数学符号
export const allMathematicalSymbols = [...mathematicalSymbols, ...additionalMathematicalSymbols];

// 完整的数学符号集合
export const completeMathematicalSymbols = [
  ...mathematicalSymbols, 
  ...additionalMathematicalSymbols, 
  ...advancedMathematicalSymbols
];
