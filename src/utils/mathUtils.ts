/**
 * 数学公式处理工具
 * 用于修复和标准化LaTeX公式中的乱码问题
 */

export interface FormulaCleanupOptions {
  fixVectors?: boolean;
  fixGreekLetters?: boolean;
  fixOperators?: boolean;
  fixSubscripts?: boolean;
  fixSuperscripts?: boolean;
}

/**
 * 清理和修复数学公式中的乱码
 */
export function cleanMathFormula(
  formula: string, 
  options: FormulaCleanupOptions = {}
): string {
  const {
    fixVectors = true,
    fixGreekLetters = true,
    fixOperators = true,
    fixSubscripts = true,
    fixSuperscripts = true
  } = options;

  let cleaned = formula;

  // 修复向量符号
  if (fixVectors) {
    cleaned = cleaned
      .replace(/\\vec\{([^}]+)\}/g, '\\boldsymbol{$1}')
      .replace(/\\overrightarrow\{([^}]+)\}/g, '\\vec{$1}')
      .replace(/([A-Za-z])⃗/g, '\\vec{$1}')
      .replace(/→/g, '\\rightarrow')
      .replace(/←/g, '\\leftarrow')
      .replace(/↔/g, '\\leftrightarrow');
  }

  // 修复希腊字母
  if (fixGreekLetters) {
    const greekMap: Record<string, string> = {
      'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta',
      'ε': '\\epsilon', 'ζ': '\\zeta', 'η': '\\eta', 'θ': '\\theta',
      'ι': '\\iota', 'κ': '\\kappa', 'λ': '\\lambda', 'μ': '\\mu',
      'ν': '\\nu', 'ξ': '\\xi', 'ο': '\\omicron', 'π': '\\pi',
      'ρ': '\\rho', 'σ': '\\sigma', 'τ': '\\tau', 'υ': '\\upsilon',
      'φ': '\\phi', 'χ': '\\chi', 'ψ': '\\psi', 'ω': '\\omega',
      'Α': '\\Alpha', 'Β': '\\Beta', 'Γ': '\\Gamma', 'Δ': '\\Delta',
      'Ε': '\\Epsilon', 'Ζ': '\\Zeta', 'Η': '\\Eta', 'Θ': '\\Theta',
      'Ι': '\\Iota', 'Κ': '\\Kappa', 'Λ': '\\Lambda', 'Μ': '\\Mu',
      'Ν': '\\Nu', 'Ξ': '\\Xi', 'Ο': '\\Omicron', 'Π': '\\Pi',
      'Ρ': '\\Rho', 'Σ': '\\Sigma', 'Τ': '\\Tau', 'Υ': '\\Upsilon',
      'Φ': '\\Phi', 'Χ': '\\Chi', 'Ψ': '\\Psi', 'Ω': '\\Omega'
    };

    Object.entries(greekMap).forEach(([unicode, latex]) => {
      cleaned = cleaned.replace(new RegExp(unicode, 'g'), latex);
    });
  }

  // 修复数学运算符
  if (fixOperators) {
    const operatorMap: Record<string, string> = {
      '∇': '\\nabla',
      '∂': '\\partial',
      '∫': '\\int',
      '∮': '\\oint',
      '∑': '\\sum',
      '∏': '\\prod',
      '√': '\\sqrt',
      '∞': '\\infty',
      '±': '\\pm',
      '∓': '\\mp',
      '×': '\\times',
      '÷': '\\div',
      '≠': '\\neq',
      '≤': '\\leq',
      '≥': '\\geq',
      '≈': '\\approx',
      '≡': '\\equiv',
      '∈': '\\in',
      '∉': '\\notin',
      '⊂': '\\subset',
      '⊃': '\\supset',
      '⊆': '\\subseteq',
      '⊇': '\\supseteq',
      '∪': '\\cup',
      '∩': '\\cap',
      '∅': '\\emptyset',
      '∀': '\\forall',
      '∃': '\\exists',
      '∧': '\\land',
      '∨': '\\lor',
      '¬': '\\neg',
      '⟨': '\\langle',
      '⟩': '\\rangle'
    };

    Object.entries(operatorMap).forEach(([unicode, latex]) => {
      cleaned = cleaned.replace(new RegExp(unicode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), latex);
    });
  }

  // 修复上下标
  if (fixSubscripts || fixSuperscripts) {
    // 修复单字符上下标
    if (fixSuperscripts) {
      cleaned = cleaned.replace(/\^([^{}\s])/g, '^{$1}');
    }
    if (fixSubscripts) {
      cleaned = cleaned.replace(/_([^{}\s])/g, '_{$1}');
    }
  }

  // 修复分数
  cleaned = cleaned.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');

  // 清理多余的反斜杠
  cleaned = cleaned.replace(/\\\\\\\\/g, '\\\\');

  // 修复常见的LaTeX命令错误
  cleaned = cleaned
    .replace(/\\overline\{([^}]+)\}/g, '\\overline{$1}')
    .replace(/\\underline\{([^}]+)\}/g, '\\underline{$1}')
    .replace(/\\hat\{([^}]+)\}/g, '\\hat{$1}')
    .replace(/\\tilde\{([^}]+)\}/g, '\\tilde{$1}');

  return cleaned.trim();
}

/**
 * 验证LaTeX公式是否有效
 */
export function validateLatexFormula(formula: string): boolean {
  try {
    // 基本的括号匹配检查
    const brackets = ['{', '}', '[', ']', '(', ')'];
    const stack: string[] = [];
    
    for (const char of formula) {
      if (brackets.includes(char)) {
        if (char === '{' || char === '[' || char === '(') {
          stack.push(char);
        } else {
          const last = stack.pop();
          const pairs: Record<string, string> = { '}': '{', ']': '[', ')': '(' };
          if (last !== pairs[char]) {
            return false;
          }
        }
      }
    }
    
    return stack.length === 0;
  } catch {
    return false;
  }
}

/**
 * 获取公式中使用的数学符号统计
 */
export function getFormulaStats(formula: string): {
  greekLetters: number;
  operators: number;
  vectors: number;
  fractions: number;
} {
  const greekPattern = /\\(alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega)/gi;
  const operatorPattern = /\\(nabla|partial|int|sum|prod|sqrt|infty|pm|mp|times|div|neq|leq|geq|approx|equiv)/gi;
  const vectorPattern = /\\(vec|boldsymbol|overrightarrow)\{[^}]+\}/gi;
  const fractionPattern = /\\frac\{[^}]*\}\{[^}]*\}/gi;

  return {
    greekLetters: (formula.match(greekPattern) || []).length,
    operators: (formula.match(operatorPattern) || []).length,
    vectors: (formula.match(vectorPattern) || []).length,
    fractions: (formula.match(fractionPattern) || []).length
  };
}

/**
 * 批量处理公式数组
 */
export function cleanFormulaBatch(
  formulas: string[], 
  options?: FormulaCleanupOptions
): string[] {
  return formulas.map(formula => cleanMathFormula(formula, options));
}