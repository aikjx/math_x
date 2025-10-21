import React, { useState } from 'react';

// 傅里叶级数分析器
export const FourierSeriesAnalyzer: React.FC = () => {
  const [period, setPeriod] = useState<number>(2);
  const [harmonics, setHarmonics] = useState<number>(5);
  const [waveType, setWaveType] = useState<string>('square');
  const [coefficients, setCoefficients] = useState<any>(null);

  const calculateFourierCoefficients = () => {
    const T = period;
    const omega = 2 * Math.PI / T;
    const a0 = 0; // 直流分量
    const an: number[] = [];
    const bn: number[] = [];

    for (let n = 1; n <= harmonics; n++) {
      let a_n = 0, b_n = 0;
      
      if (waveType === 'square') {
        a_n = 0;
        b_n = n % 2 === 1 ? 4 / (n * Math.PI) : 0;
      } else if (waveType === 'sawtooth') {
        a_n = 0;
        b_n = 2 * Math.pow(-1, n + 1) / (n * Math.PI);
      } else if (waveType === 'triangle') {
        a_n = 0;
        b_n = n % 2 === 1 ? 8 / (Math.pow(n * Math.PI, 2)) * Math.pow(-1, (n - 1) / 2) : 0;
      }
      
      an.push(a_n);
      bn.push(b_n);
    }

    setCoefficients({ a0, an, bn, omega });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">傅里叶级数分析器</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">周期</label>
          <input
            type="number"
            step="0.1"
            value={period}
            onChange={(e) => setPeriod(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">谐波数</label>
          <input
            type="number"
            value={harmonics}
            onChange={(e) => setHarmonics(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">波形类型</label>
          <select
            value={waveType}
            onChange={(e) => setWaveType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="square">方波</option>
            <option value="sawtooth">锯齿波</option>
            <option value="triangle">三角波</option>
          </select>
        </div>
      </div>
      <button 
        onClick={calculateFourierCoefficients}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        计算傅里叶系数
      </button>
      {coefficients && (
        <div className="space-y-2">
          <p><strong>直流分量 a₀:</strong> {coefficients.a0}</p>
          <p><strong>角频率 ω:</strong> {coefficients.omega.toFixed(4)}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">余弦系数 aₙ:</h4>
              {coefficients.an.map((a: number, i: number) => (
                <p key={i}>a₍{i+1}₎ = {a.toFixed(6)}</p>
              ))}
            </div>
            <div>
              <h4 className="font-semibold">正弦系数 bₙ:</h4>
              {coefficients.bn.map((b: number, i: number) => (
                <p key={i}>b₍{i+1}₎ = {b.toFixed(6)}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 拉格朗日插值器
export const LagrangeInterpolator: React.FC = () => {
  const [points, setPoints] = useState<string>('0,1;1,4;2,9;3,16');
  const [xValue, setXValue] = useState<number>(1.5);
  const [result, setResult] = useState<number | null>(null);
  const [polynomial, setPolynomial] = useState<string>('');

  const lagrangeInterpolation = () => {
    const pointPairs = points.split(';').map(pair => {
      const [x, y] = pair.split(',').map(Number);
      return { x, y };
    });

    let interpolatedValue = 0;
    let polynomialTerms: string[] = [];

    for (let i = 0; i < pointPairs.length; i++) {
      let term = pointPairs[i].y;
      let polynomialTerm = `${pointPairs[i].y}`;
      
      for (let j = 0; j < pointPairs.length; j++) {
        if (i !== j) {
          term *= (xValue - pointPairs[j].x) / (pointPairs[i].x - pointPairs[j].x);
          polynomialTerm += ` * (x - ${pointPairs[j].x}) / (${pointPairs[i].x} - ${pointPairs[j].x})`;
        }
      }
      
      interpolatedValue += term;
      polynomialTerms.push(polynomialTerm);
    }

    setResult(interpolatedValue);
    setPolynomial(polynomialTerms.join(' + '));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">拉格朗日插值器</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">数据点 (格式: x1,y1;x2,y2;...)</label>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0,1;1,4;2,9;3,16"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">插值点 x</label>
          <input
            type="number"
            step="0.1"
            value={xValue}
            onChange={(e) => setXValue(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          onClick={lagrangeInterpolation}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          计算插值
        </button>
        {result !== null && (
          <div className="space-y-2">
            <p><strong>插值结果:</strong> f({xValue}) = {result.toFixed(6)}</p>
            <div className="text-sm text-gray-600">
              <p><strong>拉格朗日多项式:</strong></p>
              <p className="break-all">{polynomial}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 牛顿法求根器
export const NewtonRaphsonSolver: React.FC = () => {
  const [expression, setExpression] = useState<string>('x^2 - 2');
  const [derivative, setDerivative] = useState<string>('2*x');
  const [initialGuess, setInitialGuess] = useState<number>(1);
  const [tolerance, setTolerance] = useState<number>(0.0001);
  const [maxIterations, setMaxIterations] = useState<number>(50);
  const [result, setResult] = useState<any>(null);

  const evaluateExpression = (x: number, expr: string): number => {
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
      return NaN;
    }
  };

  const newtonRaphson = () => {
    let x = initialGuess;
    const iterations = [];
    
    for (let i = 0; i < maxIterations; i++) {
      const fx = evaluateExpression(x, expression);
      const fpx = evaluateExpression(x, derivative);
      
      if (Math.abs(fpx) < 1e-10) {
        setResult({ error: '导数接近零，无法继续迭代' });
        return;
      }
      
      const newX = x - fx / fpx;
      iterations.push({ iteration: i + 1, x: x, fx: fx, newX: newX });
      
      if (Math.abs(newX - x) < tolerance) {
        setResult({ root: newX, iterations: iterations, converged: true });
        return;
      }
      
      x = newX;
    }
    
    setResult({ root: x, iterations: iterations, converged: false });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">牛顿法求根器</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">函数 f(x)</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="x^2 - 2"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">导数 f'(x)</label>
          <input
            type="text"
            value={derivative}
            onChange={(e) => setDerivative(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="2*x"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">初始猜测</label>
            <input
              type="number"
              step="0.1"
              value={initialGuess}
              onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">容差</label>
            <input
              type="number"
              step="0.0001"
              value={tolerance}
              onChange={(e) => setTolerance(parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">最大迭代次数</label>
            <input
              type="number"
              value={maxIterations}
              onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button 
          onClick={newtonRaphson}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          求解根
        </button>
        {result && (
          <div className="space-y-2">
            {result.error ? (
              <p className="text-red-600"><strong>错误:</strong> {result.error}</p>
            ) : (
              <>
                <p><strong>根:</strong> {result.root.toFixed(8)}</p>
                <p><strong>收敛:</strong> {result.converged ? '是' : '否'}</p>
                <p><strong>迭代次数:</strong> {result.iterations.length}</p>
                <div className="overflow-y-auto max-h-40">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-1">迭代</th>
                        <th className="p-1">x</th>
                        <th className="p-1">f(x)</th>
                        <th className="p-1">新x</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.iterations.slice(-10).map((iter: any, i: number) => (
                        <tr key={i}>
                          <td className="p-1 text-center">{iter.iteration}</td>
                          <td className="p-1 text-center">{iter.x.toFixed(6)}</td>
                          <td className="p-1 text-center">{iter.fx.toFixed(6)}</td>
                          <td className="p-1 text-center">{iter.newX.toFixed(6)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 线性代数工具
export const LinearAlgebraTools: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(3);
  const [matrix, setMatrix] = useState<number[][]>([[2, 1, 1], [1, 3, 2], [1, 0, 0]]);
  const [vector, setVector] = useState<number[]>([4, 5, 6]);
  const [result, setResult] = useState<any>(null);

  const initializeMatrix = (size: number) => {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    const newVector = Array(size).fill(0);
    setMatrix(newMatrix);
    setVector(newVector);
  };

  const updateMatrixElement = (i: number, j: number, value: number) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
  };

  const updateVectorElement = (i: number, value: number) => {
    const newVector = [...vector];
    newVector[i] = value;
    setVector(newVector);
  };

  const calculateDeterminant = (mat: number[][]): number => {
    const n = mat.length;
    if (n === 1) return mat[0][0];
    if (n === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
    
    let det = 0;
    for (let j = 0; j < n; j++) {
      const minor = mat.slice(1).map(row => row.filter((_, colIndex) => colIndex !== j));
      det += Math.pow(-1, j) * mat[0][j] * calculateDeterminant(minor);
    }
    return det;
  };

  const gaussianElimination = () => {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [...row, vector[i]]);
    
    // 前向消元
    for (let i = 0; i < n; i++) {
      // 找主元
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
      
      // 消元
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k][i] / augmented[i][i];
        for (let j = i; j < n + 1; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
    
    // 回代
    const solution = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      solution[i] = augmented[i][n];
      for (let j = i + 1; j < n; j++) {
        solution[i] -= augmented[i][j] * solution[j];
      }
      solution[i] /= augmented[i][i];
    }
    
    const det = calculateDeterminant(matrix);
    setResult({ solution, determinant: det });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">线性代数工具</h3>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">矩阵大小</label>
        <select
          value={matrixSize}
          onChange={(e) => {
            const size = parseInt(e.target.value);
            setMatrixSize(size);
            initializeMatrix(size);
          }}
          className="p-2 border rounded"
        >
          <option value={2}>2×2</option>
          <option value={3}>3×3</option>
          <option value={4}>4×4</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h4 className="mb-2 font-semibold">系数矩阵 A</h4>
          <div className="grid gap-1" style={{gridTemplateColumns: `repeat(${matrixSize}, 1fr)`}}>
            {matrix.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  step="0.1"
                  value={val}
                  onChange={(e) => updateMatrixElement(i, j, parseFloat(e.target.value) || 0)}
                  className="w-full p-1 text-center border rounded"
                />
              ))
            )}
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 font-semibold">常数向量 b</h4>
          <div className="space-y-1">
            {vector.map((val, i) => (
              <input
                key={i}
                type="number"
                step="0.1"
                value={val}
                onChange={(e) => updateVectorElement(i, parseFloat(e.target.value) || 0)}
                className="w-full p-1 border rounded"
              />
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={gaussianElimination}
        className="px-4 py-2 mb-4 text-white bg-purple-500 rounded hover:bg-purple-600"
      >
        求解线性方程组
      </button>
      
      {result && (
        <div className="space-y-2">
          <p><strong>行列式:</strong> {result.determinant.toFixed(6)}</p>
          <div>
            <strong>解向量:</strong>
            {result.solution.map((x: number, i: number) => (
              <p key={i}>x₍{i+1}₎ = {x.toFixed(6)}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};