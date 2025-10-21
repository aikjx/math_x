import React, { useState } from 'react';

// 统计分析工具
export const StatisticsAnalyzer: React.FC = () => {
  const [data, setData] = useState<string>('1,2,3,4,5,6,7,8,9,10');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeData = () => {
    const numbers = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) return;
    
    // 基本统计量
    const n = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    // 排序
    const sorted = [...numbers].sort((a, b) => a - b);
    
    // 中位数
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    
    // 众数
    const frequency: {[key: number]: number} = {};
    numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[parseFloat(key)] === maxFreq).map(Number);
    
    // 方差和标准差
    const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // 四分位数
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;
    
    // 偏度和峰度
    const skewness = numbers.reduce((sum, num) => sum + Math.pow((num - mean) / stdDev, 3), 0) / n;
    const kurtosis = numbers.reduce((sum, num) => sum + Math.pow((num - mean) / stdDev, 4), 0) / n - 3;
    
    setAnalysis({
      count: n,
      sum,
      mean,
      median,
      modes,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      range: Math.max(...numbers) - Math.min(...numbers),
      variance,
      stdDev,
      q1,
      q3,
      iqr,
      skewness,
      kurtosis
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">统计分析工具</h3>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">数据 (用逗号分隔)</label>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full h-20 p-2 border rounded"
          placeholder="1,2,3,4,5,6,7,8,9,10"
        />
      </div>
      <button 
        onClick={analyzeData}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        分析数据
      </button>
      {analysis && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold">基本统计量</h4>
            <p><strong>样本数:</strong> {analysis.count}</p>
            <p><strong>总和:</strong> {analysis.sum.toFixed(4)}</p>
            <p><strong>均值:</strong> {analysis.mean.toFixed(4)}</p>
            <p><strong>中位数:</strong> {analysis.median.toFixed(4)}</p>
            <p><strong>众数:</strong> {analysis.modes.join(', ')}</p>
            <p><strong>最小值:</strong> {analysis.min}</p>
            <p><strong>最大值:</strong> {analysis.max}</p>
            <p><strong>极差:</strong> {analysis.range.toFixed(4)}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">分布特征</h4>
            <p><strong>方差:</strong> {analysis.variance.toFixed(4)}</p>
            <p><strong>标准差:</strong> {analysis.stdDev.toFixed(4)}</p>
            <p><strong>第一四分位数:</strong> {analysis.q1.toFixed(4)}</p>
            <p><strong>第三四分位数:</strong> {analysis.q3.toFixed(4)}</p>
            <p><strong>四分位距:</strong> {analysis.iqr.toFixed(4)}</p>
            <p><strong>偏度:</strong> {analysis.skewness.toFixed(4)}</p>
            <p><strong>峰度:</strong> {analysis.kurtosis.toFixed(4)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// 假设检验工具
export const HypothesisTestTool: React.FC = () => {
  const [sampleMean, setSampleMean] = useState<number>(50);
  const [populationMean, setPopulationMean] = useState<number>(48);
  const [sampleStd, setSampleStd] = useState<number>(5);
  const [sampleSize, setSampleSize] = useState<number>(30);
  const [alpha, setAlpha] = useState<number>(0.05);
  const [testType, setTestType] = useState<string>('two-tailed');
  const [result, setResult] = useState<any>(null);

  const performTTest = () => {
    const standardError = sampleStd / Math.sqrt(sampleSize);
    const tStatistic = (sampleMean - populationMean) / standardError;
    const degreesOfFreedom = sampleSize - 1;
    
    // 简化的t分布临界值 (近似)
    let criticalValue;
    if (alpha === 0.05) {
      criticalValue = degreesOfFreedom > 30 ? 1.96 : 2.042; // 近似值
    } else if (alpha === 0.01) {
      criticalValue = degreesOfFreedom > 30 ? 2.576 : 2.750; // 近似值
    } else {
      criticalValue = 1.96; // 默认值
    }
    
    let pValue;
    let reject = false;
    
    if (testType === 'two-tailed') {
      pValue = 2 * (1 - normalCDF(Math.abs(tStatistic)));
      reject = Math.abs(tStatistic) > criticalValue;
    } else if (testType === 'left-tailed') {
      pValue = normalCDF(tStatistic);
      reject = tStatistic < -criticalValue;
    } else { // right-tailed
      pValue = 1 - normalCDF(tStatistic);
      reject = tStatistic > criticalValue;
    }
    
    setResult({
      tStatistic,
      criticalValue,
      pValue,
      reject,
      standardError,
      degreesOfFreedom
    });
  };

  // 简化的标准正态分布累积分布函数
  const normalCDF = (x: number): number => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };

  const erf = (x: number): number => {
    // 近似误差函数
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">假设检验工具 (t检验)</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">样本均值</label>
          <input
            type="number"
            step="0.1"
            value={sampleMean}
            onChange={(e) => setSampleMean(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">总体均值 (H₀)</label>
          <input
            type="number"
            step="0.1"
            value={populationMean}
            onChange={(e) => setPopulationMean(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">样本标准差</label>
          <input
            type="number"
            step="0.1"
            value={sampleStd}
            onChange={(e) => setSampleStd(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">样本大小</label>
          <input
            type="number"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">显著性水平 α</label>
          <select
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={0.01}>0.01</option>
            <option value={0.05}>0.05</option>
            <option value={0.10}>0.10</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">检验类型</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="two-tailed">双尾检验</option>
            <option value="left-tailed">左尾检验</option>
            <option value="right-tailed">右尾检验</option>
          </select>
        </div>
      </div>
      <button 
        onClick={performTTest}
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        执行t检验
      </button>
      {result && (
        <div className="space-y-2">
          <p><strong>t统计量:</strong> {result.tStatistic.toFixed(4)}</p>
          <p><strong>临界值:</strong> ±{result.criticalValue.toFixed(4)}</p>
          <p><strong>p值:</strong> {result.pValue.toFixed(6)}</p>
          <p><strong>标准误:</strong> {result.standardError.toFixed(4)}</p>
          <p><strong>自由度:</strong> {result.degreesOfFreedom}</p>
          <p className={`font-bold ${result.reject ? 'text-red-600' : 'text-green-600'}`}>
            <strong>结论:</strong> {result.reject ? '拒绝原假设' : '不能拒绝原假设'}
          </p>
        </div>
      )}
    </div>
  );
};

// 回归分析工具
export const RegressionAnalyzer: React.FC = () => {
  const [xData, setXData] = useState<string>('1,2,3,4,5');
  const [yData, setYData] = useState<string>('2,4,6,8,10');
  const [result, setResult] = useState<any>(null);

  const performLinearRegression = () => {
    const x = xData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const y = yData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (x.length !== y.length || x.length < 2) return;
    
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    // 计算回归系数
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // 计算相关系数
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const correlation = numerator / denominator;
    const rSquared = correlation * correlation;
    
    // 计算预测值和残差
    const predictions = x.map(xi => slope * xi + intercept);
    const residuals = y.map((yi, i) => yi - predictions[i]);
    const mse = residuals.reduce((sum, r) => sum + r * r, 0) / n;
    const rmse = Math.sqrt(mse);
    
    setResult({
      slope,
      intercept,
      correlation,
      rSquared,
      predictions,
      residuals,
      mse,
      rmse,
      equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-4 text-xl font-bold">线性回归分析</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">X数据 (用逗号分隔)</label>
          <textarea
            value={xData}
            onChange={(e) => setXData(e.target.value)}
            className="w-full h-20 p-2 border rounded"
            placeholder="1,2,3,4,5"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Y数据 (用逗号分隔)</label>
          <textarea
            value={yData}
            onChange={(e) => setYData(e.target.value)}
            className="w-full h-20 p-2 border rounded"
            placeholder="2,4,6,8,10"
          />
        </div>
      </div>
      <button 
        onClick={performLinearRegression}
        className="px-4 py-2 mb-4 text-white bg-purple-500 rounded hover:bg-purple-600"
      >
        执行回归分析
      </button>
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-2 font-semibold">回归参数</h4>
              <p><strong>回归方程:</strong> {result.equation}</p>
              <p><strong>斜率:</strong> {result.slope.toFixed(6)}</p>
              <p><strong>截距:</strong> {result.intercept.toFixed(6)}</p>
              <p><strong>相关系数 r:</strong> {result.correlation.toFixed(6)}</p>
              <p><strong>决定系数 R²:</strong> {result.rSquared.toFixed(6)}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">模型评估</h4>
              <p><strong>均方误差 MSE:</strong> {result.mse.toFixed(6)}</p>
              <p><strong>均方根误差 RMSE:</strong> {result.rmse.toFixed(6)}</p>
              <p><strong>拟合优度:</strong> {(result.rSquared * 100).toFixed(2)}%</p>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">预测值与残差</h4>
            <div className="overflow-y-auto max-h-40">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-1">观测值</th>
                    <th className="p-1">预测值</th>
                    <th className="p-1">残差</th>
                  </tr>
                </thead>
                <tbody>
                  {result.predictions.map((pred: number, i: number) => (
                    <tr key={i}>
                      <td className="p-1 text-center">{yData.split(',')[i]}</td>
                      <td className="p-1 text-center">{pred.toFixed(4)}</td>
                      <td className="p-1 text-center">{result.residuals[i].toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};