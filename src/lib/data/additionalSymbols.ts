import { MathematicalSymbolExtended } from './types';

// 更多数学符号补充
export const additionalMathematicalSymbols: MathematicalSymbolExtended[] = [
  // 更多运算符号
  {
    id: 161,
    symbol: "⋅",
    name: "点乘",
    category: "运算符号",
    meaning: "表示数量积或点积",
    example: "a⋅b = |a||b|cosθ",
    latex: "\\cdot"
  },
  {
    id: 162,
    symbol: "×",
    name: "叉乘",
    category: "运算符号",
    meaning: "表示向量积或叉积",
    example: "a×b",
    latex: "\\times"
  },
  {
    id: 163,
    symbol: "∘",
    name: "复合",
    category: "运算符号",
    meaning: "表示函数复合",
    example: "(f∘g)(x) = f(g(x))",
    latex: "\\circ"
  },
  {
    id: 164,
    symbol: "⊙",
    name: "哈达玛积",
    category: "运算符号",
    meaning: "表示逐元素乘积",
    example: "A⊙B",
    latex: "\\odot"
  },
  {
    id: 165,
    symbol: "⊛",
    name: "卷积",
    category: "运算符号",
    meaning: "表示卷积运算",
    example: "f⊛g",
    latex: "\\circledast"
  },
  {
    id: 166,
    symbol: "⋆",
    name: "星运算",
    category: "运算符号",
    meaning: "表示星运算或对偶",
    example: "A⋆",
    latex: "\\star"
  },
  {
    id: 167,
    symbol: "⋄",
    name: "菱形运算",
    category: "运算符号",
    meaning: "表示二元运算",
    example: "a⋄b",
    latex: "\\diamond"
  },
  {
    id: 168,
    symbol: "∗",
    name: "星号运算",
    category: "运算符号",
    meaning: "表示二元运算或共轭",
    example: "a∗b",
    latex: "\\ast"
  },
  {
    id: 169,
    symbol: "⊎",
    name: "不交并",
    category: "运算符号",
    meaning: "表示不相交集合的并集",
    example: "A⊎B",
    latex: "\\uplus"
  },
  {
    id: 170,
    symbol: "⊓",
    name: "方形交",
    category: "运算符号",
    meaning: "表示格的下确界",
    example: "a⊓b",
    latex: "\\sqcap"
  },
  {
    id: 171,
    symbol: "⊔",
    name: "方形并",
    category: "运算符号",
    meaning: "表示格的上确界",
    example: "a⊔b",
    latex: "\\sqcup"
  },
  {
    id: 172,
    symbol: "⊼",
    name: "与非",
    category: "运算符号",
    meaning: "表示与非运算",
    example: "P⊼Q",
    latex: "\\barwedge"
  },
  {
    id: 173,
    symbol: "⊽",
    name: "或非",
    category: "运算符号",
    meaning: "表示或非运算",
    example: "P⊽Q",
    latex: "\\veebar"
  },

  // 更多关系符号
  {
    id: 174,
    symbol: "≪",
    name: "远小于",
    category: "关系符号",
    meaning: "表示远小于关系",
    example: "ε≪1",
    latex: "\\ll"
  },
  {
    id: 175,
    symbol: "≫",
    name: "远大于",
    category: "关系符号",
    meaning: "表示远大于关系",
    example: "n≫1",
    latex: "\\gg"
  },
  {
    id: 176,
    symbol: "≺",
    name: "先于",
    category: "关系符号",
    meaning: "表示偏序关系",
    example: "a≺b",
    latex: "\\prec"
  },
  {
    id: 177,
    symbol: "≻",
    name: "后于",
    category: "关系符号",
    meaning: "表示偏序关系",
    example: "a≻b",
    latex: "\\succ"
  },
  {
    id: 178,
    symbol: "⪯",
    name: "先于等于",
    category: "关系符号",
    meaning: "表示偏序关系",
    example: "a⪯b",
    latex: "\\preceq"
  },
  {
    id: 179,
    symbol: "⪰",
    name: "后于等于",
    category: "关系符号",
    meaning: "表示偏序关系",
    example: "a⪰b",
    latex: "\\succeq"
  },
  {
    id: 180,
    symbol: "≍",
    name: "渐近等于",
    category: "关系符号",
    meaning: "表示渐近相等",
    example: "f(x)≍g(x)",
    latex: "\\asymp"
  },
  {
    id: 181,
    symbol: "≎",
    name: "几何等于",
    category: "关系符号",
    meaning: "表示几何相等",
    example: "△ABC≎△DEF",
    latex: "\\bumpeq"
  },
  {
    id: 182,
    symbol: "≏",
    name: "差异等于",
    category: "关系符号",
    meaning: "表示差异相等",
    example: "a≏b",
    latex: "\\Bumpeq"
  },
  {
    id: 183,
    symbol: "≐",
    name: "接近等于",
    category: "关系符号",
    meaning: "表示接近相等",
    example: "a≐b",
    latex: "\\doteq"
  },
  {
    id: 184,
    symbol: "≑",
    name: "几何相等",
    category: "关系符号",
    meaning: "表示几何相等",
    example: "a≑b",
    latex: "\\doteqdot"
  },
  {
    id: 185,
    symbol: "≒",
    name: "约等于",
    category: "关系符号",
    meaning: "表示近似相等",
    example: "π≒3.14",
    latex: "\\fallingdotseq"
  },

  // 更多箭头符号
  {
    id: 186,
    symbol: "⇒",
    name: "双线右箭头",
    category: "箭头符号",
    meaning: "表示蕴含关系",
    example: "P⇒Q",
    latex: "\\Rightarrow"
  },
  {
    id: 187,
    symbol: "⇐",
    name: "双线左箭头",
    category: "箭头符号",
    meaning: "表示逆蕴含关系",
    example: "Q⇐P",
    latex: "\\Leftarrow"
  },
  {
    id: 188,
    symbol: "⇔",
    name: "双线双向箭头",
    category: "箭头符号",
    meaning: "表示等价关系",
    example: "P⇔Q",
    latex: "\\Leftrightarrow"
  },
  {
    id: 189,
    symbol: "↑",
    name: "上箭头",
    category: "箭头符号",
    meaning: "表示向上或增长",
    example: "f↑",
    latex: "\\uparrow"
  },
  {
    id: 190,
    symbol: "↓",
    name: "下箭头",
    category: "箭头符号",
    meaning: "表示向下或减少",
    example: "f↓",
    latex: "\\downarrow"
  },
  {
    id: 191,
    symbol: "↕",
    name: "上下箭头",
    category: "箭头符号",
    meaning: "表示双向变化",
    example: "f↕",
    latex: "\\updownarrow"
  },
  {
    id: 192,
    symbol: "⇑",
    name: "双线上箭头",
    category: "箭头符号",
    meaning: "表示强向上关系",
    example: "f⇑",
    latex: "\\Uparrow"
  },
  {
    id: 193,
    symbol: "⇓",
    name: "双线下箭头",
    category: "箭头符号",
    meaning: "表示强向下关系",
    example: "f⇓",
    latex: "\\Downarrow"
  },
  {
    id: 194,
    symbol: "⇕",
    name: "双线上下箭头",
    category: "箭头符号",
    meaning: "表示强双向关系",
    example: "f⇕",
    latex: "\\Updownarrow"
  },
  {
    id: 195,
    symbol: "↗",
    name: "右上箭头",
    category: "箭头符号",
    meaning: "表示向右上方向",
    example: "趋势↗",
    latex: "\\nearrow"
  },
  {
    id: 196,
    symbol: "↘",
    name: "右下箭头",
    category: "箭头符号",
    meaning: "表示向右下方向",
    example: "趋势↘",
    latex: "\\searrow"
  },
  {
    id: 197,
    symbol: "↙",
    name: "左下箭头",
    category: "箭头符号",
    meaning: "表示向左下方向",
    example: "趋势↙",
    latex: "\\swarrow"
  },
  {
    id: 198,
    symbol: "↖",
    name: "左上箭头",
    category: "箭头符号",
    meaning: "表示向左上方向",
    example: "趋势↖",
    latex: "\\nwarrow"
  },

  // 更多特殊函数符号
  {
    id: 199,
    symbol: "sin",
    name: "正弦函数",
    category: "三角函数",
    meaning: "正弦三角函数",
    example: "sin(π/2) = 1",
    latex: "\\sin"
  },
  {
    id: 200,
    symbol: "cos",
    name: "余弦函数",
    category: "三角函数",
    meaning: "余弦三角函数",
    example: "cos(0) = 1",
    latex: "\\cos"
  },
  {
    id: 201,
    symbol: "tan",
    name: "正切函数",
    category: "三角函数",
    meaning: "正切三角函数",
    example: "tan(π/4) = 1",
    latex: "\\tan"
  },
  {
    id: 202,
    symbol: "cot",
    name: "余切函数",
    category: "三角函数",
    meaning: "余切三角函数",
    example: "cot(π/4) = 1",
    latex: "\\cot"
  },
  {
    id: 203,
    symbol: "sec",
    name: "正割函数",
    category: "三角函数",
    meaning: "正割三角函数",
    example: "sec(0) = 1",
    latex: "\\sec"
  },
  {
    id: 204,
    symbol: "csc",
    name: "余割函数",
    category: "三角函数",
    meaning: "余割三角函数",
    example: "csc(π/2) = 1",
    latex: "\\csc"
  },
  {
    id: 205,
    symbol: "arcsin",
    name: "反正弦函数",
    category: "三角函数",
    meaning: "反正弦函数",
    example: "arcsin(1) = π/2",
    latex: "\\arcsin"
  },
  {
    id: 206,
    symbol: "arccos",
    name: "反余弦函数",
    category: "三角函数",
    meaning: "反余弦函数",
    example: "arccos(1) = 0",
    latex: "\\arccos"
  },
  {
    id: 207,
    symbol: "arctan",
    name: "反正切函数",
    category: "三角函数",
    meaning: "反正切函数",
    example: "arctan(1) = π/4",
    latex: "\\arctan"
  },
  {
    id: 208,
    symbol: "sinh",
    name: "双曲正弦",
    category: "双曲函数",
    meaning: "双曲正弦函数",
    example: "sinh(x) = (e^x - e^{-x})/2",
    latex: "\\sinh"
  },
  {
    id: 209,
    symbol: "cosh",
    name: "双曲余弦",
    category: "双曲函数",
    meaning: "双曲余弦函数",
    example: "cosh(x) = (e^x + e^{-x})/2",
    latex: "\\cosh"
  },
  {
    id: 210,
    symbol: "tanh",
    name: "双曲正切",
    category: "双曲函数",
    meaning: "双曲正切函数",
    example: "tanh(x) = sinh(x)/cosh(x)",
    latex: "\\tanh"
  },
  {
    id: 211,
    symbol: "ln",
    name: "自然对数",
    category: "对数函数",
    meaning: "以e为底的对数",
    example: "ln(e) = 1",
    latex: "\\ln"
  },
  {
    id: 212,
    symbol: "log",
    name: "对数函数",
    category: "对数函数",
    meaning: "对数函数",
    example: "log₁₀(100) = 2",
    latex: "\\log"
  },
  {
    id: 213,
    symbol: "lg",
    name: "常用对数",
    category: "对数函数",
    meaning: "以10为底的对数",
    example: "lg(1000) = 3",
    latex: "\\lg"
  },
  {
    id: 214,
    symbol: "exp",
    name: "指数函数",
    category: "指数函数",
    meaning: "以e为底的指数函数",
    example: "exp(1) = e",
    latex: "\\exp"
  },

  // 更多数学常数
  {
    id: 215,
    symbol: "e",
    name: "自然常数",
    category: "数学常数",
    meaning: "自然对数的底，约等于2.718",
    example: "e ≈ 2.71828",
    latex: "e"
  },
  {
    id: 216,
    symbol: "π",
    name: "圆周率",
    category: "数学常数",
    meaning: "圆周长与直径的比值",
    example: "π ≈ 3.14159",
    latex: "\\pi"
  },
  {
    id: 217,
    symbol: "φ",
    name: "黄金比例",
    category: "数学常数",
    meaning: "黄金分割比例",
    example: "φ = (1+√5)/2 ≈ 1.618",
    latex: "\\phi"
  },
  {
    id: 218,
    symbol: "γ",
    name: "欧拉常数",
    category: "数学常数",
    meaning: "欧拉-马歇罗尼常数",
    example: "γ ≈ 0.5772",
    latex: "\\gamma"
  },
  {
    id: 219,
    symbol: "∞",
    name: "无穷大",
    category: "数学常数",
    meaning: "表示无限大",
    example: "lim_{x→∞} 1/x = 0",
    latex: "\\infty"
  },

  // 更多组合数学符号
  {
    id: 220,
    symbol: "C",
    name: "组合数",
    category: "组合数学",
    meaning: "从n个元素中选k个的组合数",
    example: "C(n,k) = n!/(k!(n-k)!)",
    latex: "C"
  },
  {
    id: 221,
    symbol: "P",
    name: "排列数",
    category: "组合数学",
    meaning: "从n个元素中选k个的排列数",
    example: "P(n,k) = n!/(n-k)!",
    latex: "P"
  },
  {
    id: 222,
    symbol: "!",
    name: "阶乘",
    category: "组合数学",
    meaning: "n的阶乘",
    example: "5! = 120",
    latex: "!"
  },
  {
    id: 223,
    symbol: "!!",
    name: "双阶乘",
    category: "组合数学",
    meaning: "n的双阶乘",
    example: "5!! = 5×3×1 = 15",
    latex: "!!"
  },
  {
    id: 224,
    symbol: "⌊⌋",
    name: "下取整",
    category: "取整函数",
    meaning: "不超过x的最大整数",
    example: "⌊3.7⌋ = 3",
    latex: "\\lfloor\\rfloor"
  },
  {
    id: 225,
    symbol: "⌈⌉",
    name: "上取整",
    category: "取整函数",
    meaning: "不小于x的最小整数",
    example: "⌈3.2⌉ = 4",
    latex: "\\lceil\\rceil"
  },

  // 更多微分几何符号
  {
    id: 226,
    symbol: "∇",
    name: "梯度",
    category: "微分几何",
    meaning: "梯度算子",
    example: "∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)",
    latex: "\\nabla"
  },
  {
    id: 227,
    symbol: "∇·",
    name: "散度",
    category: "微分几何",
    meaning: "散度算子",
    example: "∇·F = ∂F₁/∂x + ∂F₂/∂y + ∂F₃/∂z",
    latex: "\\nabla\\cdot"
  },
  {
    id: 228,
    symbol: "∇×",
    name: "旋度",
    category: "微分几何",
    meaning: "旋度算子",
    example: "∇×F",
    latex: "\\nabla\\times"
  },
  {
    id: 229,
    symbol: "∇²",
    name: "拉普拉斯算子",
    category: "微分几何",
    meaning: "拉普拉斯算子",
    example: "∇²f = ∂²f/∂x² + ∂²f/∂y² + ∂²f/∂z²",
    latex: "\\nabla^2"
  },
  {
    id: 230,
    symbol: "d",
    name: "微分",
    category: "微分几何",
    meaning: "微分算子",
    example: "df = (∂f/∂x)dx + (∂f/∂y)dy",
    latex: "d"
  },

  // 更多物理数学符号
  {
    id: 231,
    symbol: "ℏ",
    name: "约化普朗克常数",
    category: "物理常数",
    meaning: "普朗克常数除以2π",
    example: "ℏ = h/(2π)",
    latex: "\\hbar"
  },
  {
    id: 232,
    symbol: "c",
    name: "光速",
    category: "物理常数",
    meaning: "真空中的光速",
    example: "c ≈ 3×10⁸ m/s",
    latex: "c"
  },
  {
    id: 233,
    symbol: "G",
    name: "万有引力常数",
    category: "物理常数",
    meaning: "牛顿万有引力常数",
    example: "F = Gm₁m₂/r²",
    latex: "G"
  },
  {
    id: 234,
    symbol: "k",
    name: "玻尔兹曼常数",
    category: "物理常数",
    meaning: "玻尔兹曼常数",
    example: "E = kT",
    latex: "k"
  },
  {
    id: 235,
    symbol: "ε₀",
    name: "真空介电常数",
    category: "物理常数",
    meaning: "真空的电介质常数",
    example: "F = q₁q₂/(4πε₀r²)",
    latex: "\\varepsilon_0"
  },

  // 更多统计符号
  {
    id: 236,
    symbol: "μ",
    name: "总体均值",
    category: "统计学",
    meaning: "总体的数学期望",
    example: "μ = E[X]",
    latex: "\\mu"
  },
  {
    id: 237,
    symbol: "σ²",
    name: "总体方差",
    category: "统计学",
    meaning: "总体的方差",
    example: "σ² = Var(X)",
    latex: "\\sigma^2"
  },
  {
    id: 238,
    symbol: "x̄",
    name: "样本均值",
    category: "统计学",
    meaning: "样本的平均值",
    example: "x̄ = (x₁+x₂+...+xₙ)/n",
    latex: "\\bar{x}"
  },
  {
    id: 239,
    symbol: "s²",
    name: "样本方差",
    category: "统计学",
    meaning: "样本的方差",
    example: "s² = Σ(xᵢ-x̄)²/(n-1)",
    latex: "s^2"
  },
  {
    id: 240,
    symbol: "ρ",
    name: "相关系数",
    category: "统计学",
    meaning: "皮尔逊相关系数",
    example: "ρ = Cov(X,Y)/(σₓσᵧ)",
    latex: "\\rho"
  },

  // 更多数论符号
  {
    id: 241,
    symbol: "≡",
    name: "同余",
    category: "数论",
    meaning: "模运算中的同余关系",
    example: "a ≡ b (mod n)",
    latex: "\\equiv"
  },
  {
    id: 242,
    symbol: "∤",
    name: "不整除",
    category: "数论",
    meaning: "不能整除",
    example: "3 ∤ 10",
    latex: "\\nmid"
  },
  {
    id: 243,
    symbol: "∣",
    name: "整除",
    category: "数论",
    meaning: "能够整除",
    example: "3 ∣ 9",
    latex: "\\mid"
  },
  {
    id: 244,
    symbol: "⊥",
    name: "互质",
    category: "数论",
    meaning: "两数互质",
    example: "gcd(a,b) = 1 ⟺ a⊥b",
    latex: "\\perp"
  },
  {
    id: 245,
    symbol: "≈",
    name: "渐近",
    category: "数论",
    meaning: "渐近相等",
    example: "π(x) ≈ x/ln(x)",
    latex: "\\approx"
  },

  // 更多集合论符号
  {
    id: 246,
    symbol: "𝒫",
    name: "幂集",
    category: "集合论",
    meaning: "集合的幂集",
    example: "𝒫(A) = {B : B ⊆ A}",
    latex: "\\mathcal{P}"
  },
  {
    id: 247,
    symbol: "∁",
    name: "补集",
    category: "集合论",
    meaning: "集合的补集",
    example: "∁A = U \\ A",
    latex: "\\complement"
  },
  {
    id: 248,
    symbol: "\\",
    name: "差集",
    category: "集合论",
    meaning: "集合的差",
    example: "A \\ B = {x : x ∈ A, x ∉ B}",
    latex: "\\setminus"
  },
  {
    id: 249,
    symbol: "⊖",
    name: "对称差",
    category: "集合论",
    meaning: "两集合的对称差",
    example: "A ⊖ B = (A \\ B) ∪ (B \\ A)",
    latex: "\\ominus"
  },
  {
    id: 250,
    symbol: "|A|",
    name: "基数",
    category: "集合论",
    meaning: "集合的基数或元素个数",
    example: "|{1,2,3}| = 3",
    latex: "|A|"
  }
];