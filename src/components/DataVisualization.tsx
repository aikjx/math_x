import React, { useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
  category?: string;
}

interface ChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  className?: string;
  showLabels?: boolean;
  showValues?: boolean;
  animated?: boolean;
}

// 饼图组件
export function PieChart({ 
  data, 
  width = 300, 
  height = 300, 
  className = "",
  showLabels = true,
  showValues = true,
  animated = true
}: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  const processedData = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // 从顶部开始

    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // 计算路径
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      // 标签位置
      const labelAngle = (startAngle + endAngle) / 2;
      const labelAngleRad = (labelAngle * Math.PI) / 180;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos(labelAngleRad);
      const labelY = centerY + labelRadius * Math.sin(labelAngleRad);

      currentAngle = endAngle;

      return {
        ...item,
        pathData,
        percentage,
        labelX,
        labelY,
        color: item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`
      };
    });
  }, [data, centerX, centerY, radius]);

  return (
    <div className={`inline-block ${className}`}>
      <svg ref={svgRef} width={width} height={height} className="overflow-visible">
        {processedData.map((item, index) => (
          <g key={index}>
            <motion.path
              d={item.pathData}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
              initial={animated ? { scale: 0 } : undefined}
              animate={animated ? { scale: 1 } : undefined}
              transition={animated ? { delay: index * 0.1, duration: 0.5 } : undefined}
              className="cursor-pointer hover:opacity-80"
            />
            
            {showLabels && item.percentage > 5 && (
              <motion.text
                x={item.labelX}
                y={item.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-white"
                initial={animated ? { opacity: 0 } : undefined}
                animate={animated ? { opacity: 1 } : undefined}
                transition={animated ? { delay: index * 0.1 + 0.3 } : undefined}
              >
                {showValues ? `${item.percentage.toFixed(1)}%` : item.label}
              </motion.text>
            )}
          </g>
        ))}
      </svg>
      
      {/* 图例 */}
      <div className="mt-4 space-y-2">
        {processedData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {item.label}: {item.value} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 柱状图组件
export function BarChart({ 
  data, 
  width = 400, 
  height = 300, 
  className = "",
  showLabels = true,
  showValues = true,
  animated = true
}: ChartProps) {
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y轴 */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke="currentColor"
            className="text-gray-400"
          />
          
          {/* X轴 */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="currentColor"
            className="text-gray-400"
          />
          
          {/* 柱状图 */}
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const y = chartHeight - barHeight;
            
            return (
              <g key={index}>
                <motion.rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`}
                  initial={animated ? { height: 0, y: chartHeight } : undefined}
                  animate={animated ? { height: barHeight, y } : undefined}
                  transition={animated ? { delay: index * 0.1, duration: 0.5 } : undefined}
                  className="cursor-pointer hover:opacity-80"
                />
                
                {showValues && (
                  <motion.text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="text-xs font-medium text-gray-700 fill-current dark:text-gray-300"
                    initial={animated ? { opacity: 0 } : undefined}
                    animate={animated ? { opacity: 1 } : undefined}
                    transition={animated ? { delay: index * 0.1 + 0.3 } : undefined}
                  >
                    {item.value}
                  </motion.text>
                )}
                
                {showLabels && (
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 15}
                    textAnchor="middle"
                    className="text-xs text-gray-600 fill-current dark:text-gray-400"
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// 折线图组件
export function LineChart({ 
  data, 
  width = 400, 
  height = 300, 
  className = "",
  showLabels = true,
  showValues = true,
  animated = true
}: ChartProps) {
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((item.value - minValue) / valueRange) * chartHeight;
    return { x, y, ...item };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* 网格线 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={index}
              x1={0}
              y1={chartHeight * ratio}
              x2={chartWidth}
              y2={chartHeight * ratio}
              stroke="currentColor"
              strokeDasharray="2,2"
              className="text-gray-200 dark:text-gray-700"
            />
          ))}
          
          {/* Y轴 */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke="currentColor"
            className="text-gray-400"
          />
          
          {/* X轴 */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="currentColor"
            className="text-gray-400"
          />
          
          {/* 折线 */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={animated ? { pathLength: 0 } : undefined}
            animate={animated ? { pathLength: 1 } : undefined}
            transition={animated ? { duration: 1 } : undefined}
          />
          
          {/* 数据点 */}
          {points.map((point, index) => (
            <g key={index}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                initial={animated ? { scale: 0 } : undefined}
                animate={animated ? { scale: 1 } : undefined}
                transition={animated ? { delay: index * 0.1 + 0.5 } : undefined}
                className="cursor-pointer hover:r-6"
              />
              
              {showValues && (
                <motion.text
                  x={point.x}
                  y={point.y - 10}
                  textAnchor="middle"
                  className="text-xs font-medium text-gray-700 fill-current dark:text-gray-300"
                  initial={animated ? { opacity: 0 } : undefined}
                  animate={animated ? { opacity: 1 } : undefined}
                  transition={animated ? { delay: index * 0.1 + 0.7 } : undefined}
                >
                  {point.value}
                </motion.text>
              )}
            </g>
          ))}
          
          {/* X轴标签 */}
          {showLabels && points.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y={chartHeight + 15}
              textAnchor="middle"
              className="text-xs text-gray-600 fill-current dark:text-gray-400"
            >
              {point.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

// 学习进度可视化组件
export function LearningProgressChart({ 
  progressData,
  className = ""
}: { 
  progressData: Array<{
    topic: string;
    completed: number;
    total: number;
    category: string;
  }>;
  className?: string;
}) {
  const chartData = progressData.map(item => ({
    label: item.topic,
    value: Math.round((item.completed / item.total) * 100),
    category: item.category,
    color: item.category === '基础' ? '#10B981' : 
           item.category === '进阶' ? '#3B82F6' : '#8B5CF6'
  }));

  return (
    <div className={`p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ${className}`}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        学习进度统计
      </h3>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            完成度分布
          </h4>
          <PieChart data={chartData} width={250} height={250} />
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            各主题进度
          </h4>
          <BarChart data={chartData} width={300} height={250} />
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          学习趋势
        </h4>
        <LineChart 
          data={chartData.map((item, index) => ({
            ...item,
            label: `第${index + 1}周`
          }))} 
          width={600} 
          height={200} 
        />
      </div>
    </div>
  );
}