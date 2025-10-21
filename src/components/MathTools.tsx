import React, { useState } from 'react';

// 矩阵计算器
export const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [result, setResult] = useState<number[][] | null>(null);

  const multiplyMatrices = (a: number[][], b: number[][]) => {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">矩阵计算器</h3>
      <button 
        onClick={() => setResult(multiplyMatrices(matrixA, matrixB))}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        计算矩阵乘法
      </button>
      {result && (
        <div className="mt-4">
          <h4 className="font-semibold">结果:</h4>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {result.map((row, i) => 
              row.map((val, j) => (
                <div key={`${i}-${j}`} className="p-2 text-center bg-gray-100">
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 数列分析器
export const SequenceAnalyzer: React.FC = () => {
  const [sequence, setSequence] = useState<string>('1,2,3,4,5');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeSequence = () => {
    const nums = sequence.split(',').map(n => parseFloat(n.trim()));
    const differences = [];
    for (let i = 1; i < nums.length; i++) {
      differences.push(nums[i] - nums[i-1]);
    }
    
    const isArithmetic = differences.every(d => d === differences[0]);
    const isGeometric = nums.length > 1 && nums.slice(1).every((n, i) => 
      Math.abs(n / nums[i] - nums[1] / nums[0]) < 0.0001
    );

    setAnalysis({
      sequence: nums,
      differences,
      isArithmetic,
      isGeometric,
      commonDiff: isArithmetic ? differences[0] : null,
      commonRatio: isGeometric ? nums[1] / nums[0] : null
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">数列分析器</h3>
      <input
        type="text"
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder="输入数列，用逗号分隔"
        className="w-full p-2 mb-4 border rounded"
      />
      <button 
        onClick={analyzeSequence}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        分析数列
      </button>
      {analysis && (
        <div className="mt-4 space-y-2">
          <p><strong>数列:</strong> {analysis.sequence.join(', ')}</p>
          <p><strong>差值:</strong> {analysis.differences.join(', ')}</p>
          <p><strong>等差数列:</strong> {analysis.isArithmetic ? '是' : '否'}</p>
          <p><strong>等比数列:</strong> {analysis.isGeometric ? '是' : '否'}</p>
          {analysis.commonDiff && <p><strong>公差:</strong> {analysis.commonDiff}</p>}
          {analysis.commonRatio && <p><strong>公比:</strong> {analysis.commonRatio}</p>}
        </div>
      )}
    </div>
  );
};

// 概率计算器
export const ProbabilityCalculator: React.FC = () => {
  const [totalEvents, setTotalEvents] = useState<number>(10);
  const [favorableEvents, setFavorableEvents] = useState<number>(3);
  const [trials, setTrials] = useState<number>(5);
  const [successes, setSuccesses] = useState<number>(2);

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const combination = (n: number, r: number): number => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const binomialProbability = (n: number, k: number, p: number): number => {
    return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  };

  const basicProbability = favorableEvents / totalEvents;
  const binomialProb = binomialProbability(trials, successes, basicProbability);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">概率计算器</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">总事件数</label>
          <input
            type="number"
            value={totalEvents}
            onChange={(e) => setTotalEvents(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">有利事件数</label>
          <input
            type="number"
            value={favorableEvents}
            onChange={(e) => setFavorableEvents(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">试验次数</label>
          <input
            type="number"
            value={trials}
            onChange={(e) => setTrials(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">成功次数</label>
          <input
            type="number"
            value={successes}
            onChange={(e) => setSuccesses(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="space-y-2">
        <p><strong>基本概率:</strong> {basicProbability.toFixed(4)} ({(basicProbability * 100).toFixed(2)}%)</p>
        <p><strong>二项分布概率:</strong> {binomialProb.toFixed(6)}</p>
        <p><strong>组合数 C({trials},{successes}):</strong> {combination(trials, successes)}</p>
      </div>
    </div>
  );
};

// 数值积分器
export const NumericalIntegrator: React.FC = () => {
  const [expression, setExpression] = useState<string>('x^2');
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const evaluateExpression = (x: number, expr: string): number => {
    // 简单的表达式求值器
    const sanitized = expr.replace(/x/g, x.toString())
                          .replace(/\^/g, '**')
                          .replace(/sin/g, 'Math.sin')
                          .replace(/cos/g, 'Math.cos')
                          .replace(/tan/g, 'Math.tan')
                          .replace(/log/g, 'Math.log')
                          .replace(/sqrt/g, 'Math.sqrt');
    try {
      return eval(sanitized);
    } catch {
      return 0;
    }
  };

  const trapezoidalRule = (f: (x: number) => number, a: number, b: number, n: number = 1000): number => {
    const h = (b - a) / n;
    let sum = (f(a) + f(b)) / 2;
    for (let i = 1; i < n; i++) {
      sum += f(a + i * h);
    }
    return sum * h;
  };

  const integrate = () => {
    const f = (x: number) => evaluateExpression(x, expression);
    const integral = trapezoidalRule(f, lowerBound, upperBound);
    setResult(integral);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">数值积分器</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">函数表达式 (支持: x^2, sin(x), cos(x), log(x))</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="例如: x^2 + sin(x)"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">下限</label>
            <input
              type="number"
              step="0.1"
              value={lowerBound}
              onChange={(e) => setLowerBound(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">上限</label>
            <input
              type="number"
              step="0.1"
              value={upperBound}
              onChange={(e) => setUpperBound(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button 
          onClick={integrate}
          className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          计算积分
        </button>
        {result !== null && (
          <div className="p-4 mt-4 bg-gray-100 rounded">
            <p><strong>积分结果:</strong> {result.toFixed(6)}</p>
            <p className="text-sm text-gray-600">使用梯形法则近似计算</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 复数计算器
export const ComplexNumberCalculator: React.FC = () => {
  const [real1, setReal1] = useState<number>(3);
  const [imag1, setImag1] = useState<number>(4);
  const [real2, setReal2] = useState<number>(1);
  const [imag2, setImag2] = useState<number>(2);
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<{real: number, imag: number} | null>(null);

  const calculate = () => {
    let resultReal = 0, resultImag = 0;
    
    switch (operation) {
      case 'add':
        resultReal = real1 + real2;
        resultImag = imag1 + imag2;
        break;
      case 'subtract':
        resultReal = real1 - real2;
        resultImag = imag1 - imag2;
        break;
      case 'multiply':
        resultReal = real1 * real2 - imag1 * imag2;
        resultImag = real1 * imag2 + imag1 * real2;
        break;
      case 'divide':
        const denominator = real2 * real2 + imag2 * imag2;
        resultReal = (real1 * real2 + imag1 * imag2) / denominator;
        resultImag = (imag1 * real2 - real1 * imag2) / denominator;
        break;
    }
    
    setResult({ real: resultReal, imag: resultImag });
  };

  const magnitude = Math.sqrt(real1 * real1 + imag1 * imag1);
  const phase = Math.atan2(imag1, real1) * 180 / Math.PI;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">复数计算器</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="mb-2 font-semibold">复数 1</h4>
          <div className="space-y-2">
            <input
              type="number"
              step="0.1"
              value={real1}
              onChange={(e) => setReal1(parseFloat(e.target.value))}
              placeholder="实部"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              step="0.1"
              value={imag1}
              onChange={(e) => setImag1(parseFloat(e.target.value))}
              placeholder="虚部"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-semibold">复数 2</h4>
          <div className="space-y-2">
            <input
              type="number"
              step="0.1"
              value={real2}
              onChange={(e) => setReal2(parseFloat(e.target.value))}
              placeholder="实部"
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              step="0.1"
              value={imag2}
              onChange={(e) => setImag2(parseFloat(e.target.value))}
              placeholder="虚部"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="add">加法</option>
          <option value="subtract">减法</option>
          <option value="multiply">乘法</option>
          <option value="divide">除法</option>
        </select>
      </div>
      <button 
        onClick={calculate}
        className="px-4 py-2 mb-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
      >
        计算
      </button>
      <div className="space-y-2">
        <p><strong>复数 1:</strong> {real1} + {imag1}i</p>
        <p><strong>模长:</strong> {magnitude.toFixed(4)}</p>
        <p><strong>幅角:</strong> {phase.toFixed(2)}°</p>
        {result && (
          <p><strong>结果:</strong> {result.real.toFixed(4)} + {result.imag.toFixed(4)}i</p>
        )}
      </div>
    </div>
  );
};