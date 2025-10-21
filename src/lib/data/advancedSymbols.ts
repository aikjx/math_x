import { MathematicalSymbolExtended } from './types';

// 更多高级数学符号
export const advancedMathematicalSymbols: MathematicalSymbolExtended[] = [
  // 更多积分符号
  {
    id: 251,
    symbol: "∯",
    name: "曲面积分",
    category: "微积分",
    meaning: "封闭曲面上的积分",
    example: "∯_S F·dS",
    latex: "\\oiint"
  },
  {
    id: 252,
    symbol: "∰",
    name: "体积分",
    category: "微积分",
    meaning: "封闭体积上的积分",
    example: "∰_V f dV",
    latex: "\\oiiint"
  },
  {
    id: 253,
    symbol: "∫∫∫",
    name: "三重积分",
    category: "微积分",
    meaning: "三维区域上的积分",
    example: "∫∫∫_V f(x,y,z) dx dy dz",
    latex: "\\iiint"
  },

  // 更多微分算子
  {
    id: 254,
    symbol: "∇⁴",
    name: "双调和算子",
    category: "微积分",
    meaning: "四阶微分算子",
    example: "∇⁴u = 0",
    latex: "\\nabla^4"
  },
  {
    id: 255,
    symbol: "□",
    name: "达朗贝尔算子",
    category: "微积分",
    meaning: "波动算子",
    example: "□φ = 0",
    latex: "\\Box"
  },
  {
    id: 256,
    symbol: "∂ₜ",
    name: "时间偏导",
    category: "微积分",
    meaning: "对时间的偏导数",
    example: "∂ₜu = ∂u/∂t",
    latex: "\\partial_t"
  },

  // 更多特殊函数
  {
    id: 257,
    symbol: "Γ",
    name: "伽马函数",
    category: "特殊函数",
    meaning: "伽马函数",
    example: "Γ(n) = (n-1)!",
    latex: "\\Gamma"
  },
  {
    id: 258,
    symbol: "B",
    name: "贝塔函数",
    category: "特殊函数",
    meaning: "贝塔函数",
    example: "B(x,y) = ∫₀¹ t^{x-1}(1-t)^{y-1}dt",
    latex: "B"
  },
  {
    id: 259,
    symbol: "ζ",
    name: "黎曼ζ函数",
    category: "特殊函数",
    meaning: "黎曼ζ函数",
    example: "ζ(s) = Σ_{n=1}^∞ 1/n^s",
    latex: "\\zeta"
  },
  {
    id: 260,
    symbol: "J",
    name: "贝塞尔函数",
    category: "特殊函数",
    meaning: "第一类贝塞尔函数",
    example: "J_n(x)",
    latex: "J"
  },
  {
    id: 261,
    symbol: "Y",
    name: "诺伊曼函数",
    category: "特殊函数",
    meaning: "第二类贝塞尔函数",
    example: "Y_n(x)",
    latex: "Y"
  },
  {
    id: 262,
    symbol: "H",
    name: "汉克尔函数",
    category: "特殊函数",
    meaning: "第三类贝塞尔函数",
    example: "H_n^{(1)}(x)",
    latex: "H"
  },
  {
    id: 263,
    symbol: "L",
    name: "拉盖尔多项式",
    category: "特殊函数",
    meaning: "拉盖尔多项式",
    example: "L_n(x)",
    latex: "L"
  },
  {
    id: 264,
    symbol: "P",
    name: "勒让德多项式",
    category: "特殊函数",
    meaning: "勒让德多项式",
    example: "P_n(x)",
    latex: "P"
  },
  {
    id: 265,
    symbol: "T",
    name: "切比雪夫多项式",
    category: "特殊函数",
    meaning: "第一类切比雪夫多项式",
    example: "T_n(x)",
    latex: "T"
  },
  {
    id: 266,
    symbol: "U",
    name: "切比雪夫多项式",
    category: "特殊函数",
    meaning: "第二类切比雪夫多项式",
    example: "U_n(x)",
    latex: "U"
  },
  {
    id: 267,
    symbol: "H",
    name: "埃尔米特多项式",
    category: "特殊函数",
    meaning: "埃尔米特多项式",
    example: "H_n(x)",
    latex: "H"
  },
  {
    id: 268,
    symbol: "erf",
    name: "误差函数",
    category: "特殊函数",
    meaning: "误差函数",
    example: "erf(x) = (2/√π)∫₀ˣ e^{-t²}dt",
    latex: "\\text{erf}"
  },
  {
    id: 269,
    symbol: "erfc",
    name: "余误差函数",
    category: "特殊函数",
    meaning: "余误差函数",
    example: "erfc(x) = 1 - erf(x)",
    latex: "\\text{erfc}"
  },
  {
    id: 270,
    symbol: "Ei",
    name: "指数积分",
    category: "特殊函数",
    meaning: "指数积分函数",
    example: "Ei(x) = ∫_{-∞}^x (e^t/t)dt",
    latex: "\\text{Ei}"
  },
  {
    id: 271,
    symbol: "Si",
    name: "正弦积分",
    category: "特殊函数",
    meaning: "正弦积分函数",
    example: "Si(x) = ∫₀ˣ (sin t/t)dt",
    latex: "\\text{Si}"
  },
  {
    id: 272,
    symbol: "Ci",
    name: "余弦积分",
    category: "特殊函数",
    meaning: "余弦积分函数",
    example: "Ci(x) = -∫ₓ^∞ (cos t/t)dt",
    latex: "\\text{Ci}"
  },

  // 更多数学常数
  {
    id: 273,
    symbol: "γ",
    name: "欧拉-马歇罗尼常数",
    category: "数学常数",
    meaning: "欧拉常数",
    example: "γ = lim_{n→∞}(Σ_{k=1}^n 1/k - ln n) ≈ 0.5772",
    latex: "\\gamma"
  },
  {
    id: 274,
    symbol: "φ",
    name: "黄金比例",
    category: "数学常数",
    meaning: "黄金分割比",
    example: "φ = (1+√5)/2 ≈ 1.618",
    latex: "\\varphi"
  },
  {
    id: 275,
    symbol: "δ",
    name: "费根鲍姆常数",
    category: "数学常数",
    meaning: "混沌理论中的常数",
    example: "δ ≈ 4.669",
    latex: "\\delta"
  },
  {
    id: 276,
    symbol: "α",
    name: "费根鲍姆常数",
    category: "数学常数",
    meaning: "另一个费根鲍姆常数",
    example: "α ≈ 2.502",
    latex: "\\alpha"
  },
  {
    id: 277,
    symbol: "K",
    name: "卡塔兰常数",
    category: "数学常数",
    meaning: "卡塔兰常数",
    example: "K = Σ_{n=0}^∞ (-1)^n/(2n+1)² ≈ 0.916",
    latex: "K"
  },
  {
    id: 278,
    symbol: "G",
    name: "高斯常数",
    category: "数学常数",
    meaning: "算术几何平均的倒数",
    example: "G = 1/agm(1,√2) ≈ 0.834",
    latex: "G"
  },

  // 更多组合数学符号
  {
    id: 279,
    symbol: "S",
    name: "第二类斯特林数",
    category: "组合数学",
    meaning: "第二类斯特林数",
    example: "S(n,k)",
    latex: "S"
  },
  {
    id: 280,
    symbol: "s",
    name: "第一类斯特林数",
    category: "组合数学",
    meaning: "第一类斯特林数",
    example: "s(n,k)",
    latex: "s"
  },
  {
    id: 281,
    symbol: "B",
    name: "贝尔数",
    category: "组合数学",
    meaning: "贝尔数",
    example: "B_n = Σ_{k=0}^n S(n,k)",
    latex: "B"
  },
  {
    id: 282,
    symbol: "C",
    name: "卡塔兰数",
    category: "组合数学",
    meaning: "卡塔兰数",
    example: "C_n = (1/(n+1))(2n choose n)",
    latex: "C"
  },
  {
    id: 283,
    symbol: "F",
    name: "斐波那契数",
    category: "组合数学",
    meaning: "斐波那契数列",
    example: "F_n = F_{n-1} + F_{n-2}",
    latex: "F"
  },
  {
    id: 284,
    symbol: "L",
    name: "卢卡斯数",
    category: "组合数学",
    meaning: "卢卡斯数列",
    example: "L_n = L_{n-1} + L_{n-2}",
    latex: "L"
  },

  // 更多群论符号
  {
    id: 285,
    symbol: "⋊",
    name: "半直积",
    category: "群论",
    meaning: "群的半直积",
    example: "G ⋊ H",
    latex: "\\rtimes"
  },
  {
    id: 286,
    symbol: "⋉",
    name: "左半直积",
    category: "群论",
    meaning: "群的左半直积",
    example: "G ⋉ H",
    latex: "\\ltimes"
  },
  {
    id: 287,
    symbol: "≀",
    name: "花环积",
    category: "群论",
    meaning: "群的花环积",
    example: "G ≀ H",
    latex: "\\wr"
  },
  {
    id: 288,
    symbol: "⊲",
    name: "正规子群",
    category: "群论",
    meaning: "正规子群关系",
    example: "H ⊲ G",
    latex: "\\triangleleft"
  },
  {
    id: 289,
    symbol: "⊳",
    name: "正规子群",
    category: "群论",
    meaning: "正规子群关系",
    example: "G ⊳ H",
    latex: "\\triangleright"
  },
  {
    id: 290,
    symbol: "⊴",
    name: "正规子群或等于",
    category: "群论",
    meaning: "正规子群或等于",
    example: "H ⊴ G",
    latex: "\\trianglelefteq"
  },
  {
    id: 291,
    symbol: "⊵",
    name: "正规子群或等于",
    category: "群论",
    meaning: "正规子群或等于",
    example: "G ⊵ H",
    latex: "\\trianglerighteq"
  },

  // 更多环论符号
  {
    id: 292,
    symbol: "⊕",
    name: "直和",
    category: "环论",
    meaning: "模的直和",
    example: "M ⊕ N",
    latex: "\\oplus"
  },
  {
    id: 293,
    symbol: "⊗",
    name: "张量积",
    category: "环论",
    meaning: "模的张量积",
    example: "M ⊗ N",
    latex: "\\otimes"
  },
  {
    id: 294,
    symbol: "⊠",
    name: "盒积",
    category: "环论",
    meaning: "盒积运算",
    example: "A ⊠ B",
    latex: "\\boxtimes"
  },
  {
    id: 295,
    symbol: "⊞",
    name: "盒和",
    category: "环论",
    meaning: "盒和运算",
    example: "A ⊞ B",
    latex: "\\boxplus"
  },

  // 更多范畴论符号
  {
    id: 296,
    symbol: "⇒",
    name: "自然变换",
    category: "范畴论",
    meaning: "自然变换",
    example: "F ⇒ G",
    latex: "\\Rightarrow"
  },
  {
    id: 297,
    symbol: "⟶",
    name: "态射",
    category: "范畴论",
    meaning: "范畴中的态射",
    example: "f: A ⟶ B",
    latex: "\\longrightarrow"
  },
  {
    id: 298,
    symbol: "⟵",
    name: "逆态射",
    category: "范畴论",
    meaning: "逆向态射",
    example: "f: B ⟵ A",
    latex: "\\longleftarrow"
  },
  {
    id: 299,
    symbol: "⟷",
    name: "同构",
    category: "范畴论",
    meaning: "同构态射",
    example: "A ⟷ B",
    latex: "\\longleftrightarrow"
  },
  {
    id: 300,
    symbol: "≃",
    name: "等价",
    category: "范畴论",
    meaning: "范畴等价",
    example: "𝒞 ≃ 𝒟",
    latex: "\\simeq"
  },

  // 更多微分几何符号
  {
    id: 301,
    symbol: "∇_X",
    name: "协变导数",
    category: "微分几何",
    meaning: "沿向量场X的协变导数",
    example: "∇_X Y",
    latex: "\\nabla_X"
  },
  {
    id: 302,
    symbol: "R",
    name: "黎曼曲率张量",
    category: "微分几何",
    meaning: "黎曼曲率张量",
    example: "R(X,Y)Z",
    latex: "R"
  },
  {
    id: 303,
    symbol: "Ric",
    name: "里奇张量",
    category: "微分几何",
    meaning: "里奇曲率张量",
    example: "Ric(X,Y)",
    latex: "\\text{Ric}"
  },
  {
    id: 304,
    symbol: "Scal",
    name: "标量曲率",
    category: "微分几何",
    meaning: "标量曲率",
    example: "Scal = g^{ij}R_{ij}",
    latex: "\\text{Scal}"
  },
  {
    id: 305,
    symbol: "∧",
    name: "楔积",
    category: "微分几何",
    meaning: "外积运算",
    example: "α ∧ β",
    latex: "\\wedge"
  },
  {
    id: 306,
    symbol: "⌟",
    name: "内积",
    category: "微分几何",
    meaning: "向量场与微分形式的内积",
    example: "X ⌟ ω",
    latex: "\\lrcorner"
  },
  {
    id: 307,
    symbol: "d",
    name: "外微分",
    category: "微分几何",
    meaning: "外微分算子",
    example: "dω",
    latex: "d"
  },
  {
    id: 308,
    symbol: "δ",
    name: "余微分",
    category: "微分几何",
    meaning: "余微分算子",
    example: "δω",
    latex: "\\delta"
  },
  {
    id: 309,
    symbol: "★",
    name: "霍奇星算子",
    category: "微分几何",
    meaning: "霍奇对偶算子",
    example: "★ω",
    latex: "\\star"
  },

  // 更多代数几何符号
  {
    id: 310,
    symbol: "Spec",
    name: "谱",
    category: "代数几何",
    meaning: "环的素谱",
    example: "Spec(R)",
    latex: "\\text{Spec}"
  },
  {
    id: 311,
    symbol: "Proj",
    name: "射影谱",
    category: "代数几何",
    meaning: "分次环的射影谱",
    example: "Proj(S)",
    latex: "\\text{Proj}"
  },
  {
    id: 312,
    symbol: "𝒪",
    name: "结构层",
    category: "代数几何",
    meaning: "概形的结构层",
    example: "𝒪_X",
    latex: "\\mathcal{O}"
  },
  {
    id: 313,
    symbol: "ℱ",
    name: "层",
    category: "代数几何",
    meaning: "概形上的层",
    example: "ℱ(U)",
    latex: "\\mathcal{F}"
  },
  {
    id: 314,
    symbol: "H",
    name: "上同调",
    category: "代数几何",
    meaning: "层上同调",
    example: "H^i(X,ℱ)",
    latex: "H"
  },

  // 更多数理逻辑符号
  {
    id: 315,
    symbol: "⊢",
    name: "语法推导",
    category: "数理逻辑",
    meaning: "语法推导关系",
    example: "Γ ⊢ φ",
    latex: "\\vdash"
  },
  {
    id: 316,
    symbol: "⊨",
    name: "语义蕴含",
    category: "数理逻辑",
    meaning: "语义蕴含关系",
    example: "Γ ⊨ φ",
    latex: "\\models"
  },
  {
    id: 317,
    symbol: "⊬",
    name: "不可推导",
    category: "数理逻辑",
    meaning: "不可语法推导",
    example: "Γ ⊬ φ",
    latex: "\\nvdash"
  },
  {
    id: 318,
    symbol: "⊭",
    name: "不蕴含",
    category: "数理逻辑",
    meaning: "不语义蕴含",
    example: "Γ ⊭ φ",
    latex: "\\nvDash"
  },
  {
    id: 319,
    symbol: "⊩",
    name: "强制",
    category: "数理逻辑",
    meaning: "强制关系",
    example: "p ⊩ φ",
    latex: "\\Vdash"
  },
  {
    id: 320,
    symbol: "⊪",
    name: "不强制",
    category: "数理逻辑",
    meaning: "不强制关系",
    example: "p ⊪ φ",
    latex: "\\Vvdash"
  },

  // 更多计算理论符号
  {
    id: 321,
    symbol: "⊢",
    name: "推导",
    category: "计算理论",
    meaning: "形式系统中的推导",
    example: "Γ ⊢ M : A",
    latex: "\\vdash"
  },
  {
    id: 322,
    symbol: "⟹",
    name: "计算",
    category: "计算理论",
    meaning: "计算步骤",
    example: "M ⟹ N",
    latex: "\\Longrightarrow"
  },
  {
    id: 323,
    symbol: "⟹*",
    name: "多步计算",
    category: "计算理论",
    meaning: "多步计算关系",
    example: "M ⟹* N",
    latex: "\\Longrightarrow^*"
  },
  {
    id: 324,
    symbol: "≡",
    name: "α等价",
    category: "计算理论",
    meaning: "α等价关系",
    example: "M ≡_α N",
    latex: "\\equiv_\\alpha"
  },
  {
    id: 325,
    symbol: "≃",
    name: "β等价",
    category: "计算理论",
    meaning: "β等价关系",
    example: "M ≃_β N",
    latex: "\\simeq_\\beta"
  },

  // 更多信息论符号
  {
    id: 326,
    symbol: "H",
    name: "熵",
    category: "信息论",
    meaning: "信息熵",
    example: "H(X) = -Σ p(x) log p(x)",
    latex: "H"
  },
  {
    id: 327,
    symbol: "I",
    name: "互信息",
    category: "信息论",
    meaning: "互信息量",
    example: "I(X;Y)",
    latex: "I"
  },
  {
    id: 328,
    symbol: "D",
    name: "KL散度",
    category: "信息论",
    meaning: "Kullback-Leibler散度",
    example: "D_{KL}(P||Q)",
    latex: "D"
  },
  {
    id: 329,
    symbol: "C",
    name: "信道容量",
    category: "信息论",
    meaning: "信道容量",
    example: "C = max I(X;Y)",
    latex: "C"
  },

  // 更多图论符号
  {
    id: 330,
    symbol: "G",
    name: "图",
    category: "图论",
    meaning: "图结构",
    example: "G = (V,E)",
    latex: "G"
  },
  {
    id: 331,
    symbol: "V",
    name: "顶点集",
    category: "图论",
    meaning: "图的顶点集合",
    example: "V(G)",
    latex: "V"
  },
  {
    id: 332,
    symbol: "E",
    name: "边集",
    category: "图论",
    meaning: "图的边集合",
    example: "E(G)",
    latex: "E"
  },
  {
    id: 333,
    symbol: "deg",
    name: "度数",
    category: "图论",
    meaning: "顶点的度数",
    example: "deg(v)",
    latex: "\\deg"
  },
  {
    id: 334,
    symbol: "χ",
    name: "色数",
    category: "图论",
    meaning: "图的色数",
    example: "χ(G)",
    latex: "\\chi"
  },
  {
    id: 335,
    symbol: "α",
    name: "独立数",
    category: "图论",
    meaning: "最大独立集的大小",
    example: "α(G)",
    latex: "\\alpha"
  },
  {
    id: 336,
    symbol: "ω",
    name: "团数",
    category: "图论",
    meaning: "最大团的大小",
    example: "ω(G)",
    latex: "\\omega"
  },
  {
    id: 337,
    symbol: "κ",
    name: "连通度",
    category: "图论",
    meaning: "图的连通度",
    example: "κ(G)",
    latex: "\\kappa"
  },
  {
    id: 338,
    symbol: "λ",
    name: "边连通度",
    category: "图论",
    meaning: "图的边连通度",
    example: "λ(G)",
    latex: "\\lambda"
  },

  // 更多测度论符号
  {
    id: 339,
    symbol: "μ",
    name: "测度",
    category: "测度论",
    meaning: "测度函数",
    example: "μ(A)",
    latex: "\\mu"
  },
  {
    id: 340,
    symbol: "σ",
    name: "σ代数",
    category: "测度论",
    meaning: "σ代数",
    example: "σ(𝒜)",
    latex: "\\sigma"
  },
  {
    id: 341,
    symbol: "ℬ",
    name: "Borel σ代数",
    category: "测度论",
    meaning: "Borel σ代数",
    example: "ℬ(ℝ)",
    latex: "\\mathcal{B}"
  },
  {
    id: 342,
    symbol: "ℒ",
    name: "Lebesgue测度",
    category: "测度论",
    meaning: "Lebesgue测度",
    example: "ℒ(A)",
    latex: "\\mathcal{L}"
  },
  {
    id: 343,
    symbol: "∫",
    name: "Lebesgue积分",
    category: "测度论",
    meaning: "Lebesgue积分",
    example: "∫_A f dμ",
    latex: "\\int"
  },

  // 更多泛函分析符号
  {
    id: 344,
    symbol: "⟨·,·⟩",
    name: "内积",
    category: "泛函分析",
    meaning: "内积空间的内积",
    example: "⟨f,g⟩",
    latex: "\\langle\\cdot,\\cdot\\rangle"
  },
  {
    id: 345,
    symbol: "‖·‖",
    name: "范数",
    category: "泛函分析",
    meaning: "赋范空间的范数",
    example: "‖f‖_p",
    latex: "\\|\\cdot\\|"
  },
  {
    id: 346,
    symbol: "⊥",
    name: "正交",
    category: "泛函分析",
    meaning: "正交关系",
    example: "f ⊥ g",
    latex: "\\perp"
  },
  {
    id: 347,
    symbol: "⊕",
    name: "直和",
    category: "泛函分析",
    meaning: "Hilbert空间的直和",
    example: "H = H₁ ⊕ H₂",
    latex: "\\oplus"
  },
  {
    id: 348,
    symbol: "⊗",
    name: "张量积",
    category: "泛函分析",
    meaning: "Hilbert空间的张量积",
    example: "H₁ ⊗ H₂",
    latex: "\\otimes"
  },
  {
    id: 349,
    symbol: "T*",
    name: "伴随算子",
    category: "泛函分析",
    meaning: "线性算子的伴随",
    example: "⟨Tx,y⟩ = ⟨x,T*y⟩",
    latex: "T^*"
  },
  {
    id: 350,
    symbol: "σ",
    name: "谱",
    category: "泛函分析",
    meaning: "算子的谱",
    example: "σ(T)",
    latex: "\\sigma"
  }
];