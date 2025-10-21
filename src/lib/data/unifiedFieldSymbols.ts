import { MathematicalSymbolExtended } from './types';

/**
 * 张祥前统一场论符号集合
 * 基于张祥前的统一场论理论体系
 */
export const unifiedFieldSymbols: MathematicalSymbolExtended[] = [
  // 基础时空符号
  {
    id: 1001,
    symbol: 'ds²',
    name: '时空间隔',
    category: '统一场论',
    description: '四维时空中两个事件之间的不变间隔',
    latex: 'ds^2',
    unicode: 'ds²',
    example: 'ds² = c²dt² - dx² - dy² - dz²',
    applications: ['相对论', '时空几何', '引力场'],
    difficulty: 'advanced'
  },
  {
    id: 1002,
    symbol: 'gμν',
    name: '度规张量',
    category: '统一场论',
    description: '描述时空弯曲的基本张量',
    latex: 'g_{\\mu\\nu}',
    unicode: 'gμν',
    example: 'ds² = gμν dxμ dxν',
    applications: ['广义相对论', '时空几何', '引力场'],
    difficulty: 'advanced'
  },
  {
    id: 1003,
    symbol: 'Rμν',
    name: '里奇张量',
    category: '统一场论',
    description: '描述时空曲率的张量',
    latex: 'R_{\\mu\\nu}',
    unicode: 'Rμν',
    example: 'Rμν = ∂Γλμν/∂xλ - ∂Γλμλ/∂xν + ΓλσλΓσμν - ΓλσνΓσμλ',
    applications: ['爱因斯坦场方程', '引力场', '时空曲率'],
    difficulty: 'advanced'
  },
  {
    id: 1004,
    symbol: 'R',
    name: '标量曲率',
    category: '统一场论',
    description: '时空曲率的标量表示',
    latex: 'R',
    unicode: 'R',
    example: 'R = gμν Rμν',
    applications: ['爱因斯坦-希尔伯特作用量', '引力场', '宇宙学'],
    difficulty: 'advanced'
  },
  {
    id: 1005,
    symbol: 'Tμν',
    name: '能量动量张量',
    category: '统一场论',
    description: '描述物质和能量分布的张量',
    latex: 'T_{\\mu\\nu}',
    unicode: 'Tμν',
    example: 'Gμν = 8πG/c⁴ Tμν',
    applications: ['爱因斯坦场方程', '物质场', '能量守恒'],
    difficulty: 'advanced'
  },
  
  // 统一场论特有符号
  {
    id: 1006,
    symbol: 'Φ',
    name: '统一场势',
    category: '统一场论',
    description: '张祥前统一场论中的基本场势',
    latex: '\\Phi',
    unicode: 'Φ',
    example: 'Φ = Φ(x, y, z, t)',
    applications: ['统一场论', '场方程', '物质运动'],
    difficulty: 'advanced'
  },
  {
    id: 1007,
    symbol: '∇²Φ',
    name: '场势拉普拉斯算子',
    category: '统一场论',
    description: '统一场势的拉普拉斯算子',
    latex: '\\nabla^2 \\Phi',
    unicode: '∇²Φ',
    example: '∇²Φ = ∂²Φ/∂x² + ∂²Φ/∂y² + ∂²Φ/∂z²',
    applications: ['场方程', '波动方程', '场的传播'],
    difficulty: 'advanced'
  },
  {
    id: 1008,
    symbol: 'ρ',
    name: '物质密度',
    category: '统一场论',
    description: '空间中物质的密度分布',
    latex: '\\rho',
    unicode: 'ρ',
    example: '∇²Φ = 4πGρ',
    applications: ['泊松方程', '引力场', '物质分布'],
    difficulty: 'intermediate'
  },
  {
    id: 1009,
    symbol: 'c',
    name: '光速常数',
    category: '统一场论',
    description: '真空中光的传播速度',
    latex: 'c',
    unicode: 'c',
    example: 'c = 299,792,458 m/s',
    applications: ['相对论', '电磁学', '时空关系'],
    difficulty: 'basic'
  },
  {
    id: 1010,
    symbol: 'G',
    name: '万有引力常数',
    category: '统一场论',
    description: '牛顿万有引力定律中的比例常数',
    latex: 'G',
    unicode: 'G',
    example: 'F = Gm₁m₂/r²',
    applications: ['万有引力', '引力场', '天体力学'],
    difficulty: 'basic'
  },
  
  // 场的梯度和旋度
  {
    id: 1011,
    symbol: '∇Φ',
    name: '场势梯度',
    category: '统一场论',
    description: '统一场势的梯度，表示场强',
    latex: '\\nabla \\Phi',
    unicode: '∇Φ',
    example: 'E = -∇Φ',
    applications: ['场强计算', '力的方向', '势能'],
    difficulty: 'intermediate'
  },
  {
    id: 1012,
    symbol: '∇×A',
    name: '矢量势旋度',
    category: '统一场论',
    description: '矢量势的旋度，表示磁场',
    latex: '\\nabla \\times \\vec{A}',
    unicode: '∇×A',
    example: 'B = ∇×A',
    applications: ['磁场', '电磁感应', '矢量场'],
    difficulty: 'intermediate'
  },
  {
    id: 1013,
    symbol: '∇·E',
    name: '电场散度',
    category: '统一场论',
    description: '电场的散度，高斯定律',
    latex: '\\nabla \\cdot \\vec{E}',
    unicode: '∇·E',
    example: '∇·E = ρ/ε₀',
    applications: ['高斯定律', '电场', '电荷分布'],
    difficulty: 'intermediate'
  },
  
  // 时空变换符号
  {
    id: 1014,
    symbol: 'γ',
    name: '洛伦兹因子',
    category: '统一场论',
    description: '相对论中的时间膨胀因子',
    latex: '\\gamma',
    unicode: 'γ',
    example: 'γ = 1/√(1 - v²/c²)',
    applications: ['狭义相对论', '时间膨胀', '长度收缩'],
    difficulty: 'intermediate'
  },
  {
    id: 1015,
    symbol: 'β',
    name: '速度比',
    category: '统一场论',
    description: '物体速度与光速的比值',
    latex: '\\beta',
    unicode: 'β',
    example: 'β = v/c',
    applications: ['相对论', '高速运动', '粒子物理'],
    difficulty: 'intermediate'
  },
  
  // 量子场论符号
  {
    id: 1016,
    symbol: 'ψ',
    name: '波函数',
    category: '统一场论',
    description: '量子力学中描述粒子状态的波函数',
    latex: '\\psi',
    unicode: 'ψ',
    example: 'iℏ∂ψ/∂t = Ĥψ',
    applications: ['量子力学', '薛定谔方程', '粒子状态'],
    difficulty: 'advanced'
  },
  {
    id: 1017,
    symbol: 'ℏ',
    name: '约化普朗克常数',
    category: '统一场论',
    description: '量子力学基本常数',
    latex: '\\hbar',
    unicode: 'ℏ',
    example: 'ℏ = h/2π',
    applications: ['量子力学', '不确定性原理', '角动量量子化'],
    difficulty: 'intermediate'
  },
  {
    id: 1018,
    symbol: 'Ĥ',
    name: '哈密顿算符',
    category: '统一场论',
    description: '量子力学中的能量算符',
    latex: '\\hat{H}',
    unicode: 'Ĥ',
    example: 'Ĥ = -ℏ²/2m ∇² + V',
    applications: ['薛定谔方程', '能量本征值', '量子系统'],
    difficulty: 'advanced'
  },
  
  // 统一场论核心方程符号
  {
    id: 1019,
    symbol: '□',
    name: '达朗贝尔算符',
    category: '统一场论',
    description: '四维时空中的波动算符',
    latex: '\\Box',
    unicode: '□',
    example: '□Φ = ∂²Φ/∂t² - c²∇²Φ',
    applications: ['波动方程', '场的传播', '相对论场论'],
    difficulty: 'advanced'
  },
  {
    id: 1020,
    symbol: 'Fμν',
    name: '电磁场张量',
    category: '统一场论',
    description: '描述电磁场的反对称张量',
    latex: 'F_{\\mu\\nu}',
    unicode: 'Fμν',
    example: 'Fμν = ∂μAν - ∂νAμ',
    applications: ['电磁场', '麦克斯韦方程', '场张量'],
    difficulty: 'advanced'
  },
  
  // 张祥前理论特有符号
  {
    id: 1021,
    symbol: 'Ω',
    name: '时空旋转角速度',
    category: '统一场论',
    description: '张祥前理论中时空的旋转角速度',
    latex: '\\Omega',
    unicode: 'Ω',
    example: 'Ω = dθ/dt',
    applications: ['时空旋转', '惯性力', '科里奥利效应'],
    difficulty: 'advanced'
  },
  {
    id: 1022,
    symbol: 'κ',
    name: '时空曲率参数',
    category: '统一场论',
    description: '描述时空弯曲程度的参数',
    latex: '\\kappa',
    unicode: 'κ',
    example: 'κ = 8πG/c⁴',
    applications: ['爱因斯坦场方程', '时空几何', '引力耦合'],
    difficulty: 'advanced'
  },
  {
    id: 1023,
    symbol: 'λ',
    name: '宇宙学常数',
    category: '统一场论',
    description: '爱因斯坦场方程中的宇宙学常数',
    latex: '\\lambda',
    unicode: 'λ',
    example: 'Gμν + λgμν = κTμν',
    applications: ['宇宙学', '暗能量', '时空膨胀'],
    difficulty: 'advanced'
  },
  {
    id: 1024,
    symbol: 'ξ',
    name: '场耦合参数',
    category: '统一场论',
    description: '不同场之间相互作用的耦合强度',
    latex: '\\xi',
    unicode: 'ξ',
    example: 'L = L₀ + ξΦ₁Φ₂',
    applications: ['场的相互作用', '耦合理论', '统一场'],
    difficulty: 'advanced'
  },
  {
    id: 1025,
    symbol: 'η',
    name: '时空度规符号',
    category: '统一场论',
    description: '闵可夫斯基时空的度规张量',
    latex: '\\eta',
    unicode: 'η',
    example: 'ημν = diag(1, -1, -1, -1)',
    applications: ['狭义相对论', '平直时空', '洛伦兹变换'],
    difficulty: 'advanced'
  }
];