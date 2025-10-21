import React, { useEffect, useRef, useState } from 'react';

interface SpiralParams {
  timeScale: number;
  helixRadius: number;
  helixPitch: number;
  particleCount: number;
}

const SimpleSpiralAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [params, setParams] = useState<SpiralParams>({
    timeScale: 0.5,
    helixRadius: 100,
    helixPitch: 2,
    particleCount: 50
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      // 清空画布
      ctx.clearRect(0, 0, width, height);
      
      // 设置画布中心
      const centerX = width / 2;
      const centerY = height / 2;
      
      // 绘制时空网格
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)';
      ctx.lineWidth = 1;
      
      // 径向网格线
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * params.helixRadius * 2,
          centerY + Math.sin(angle) * params.helixRadius * 2
        );
        ctx.stroke();
      }
      
      // 同心圆网格
      for (let r = 30; r <= params.helixRadius * 2; r += 30) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // 绘制中心物体
      const pulsation = Math.sin(time * 2) * 0.2 + 1;
      ctx.fillStyle = '#ff6b35';
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15 * pulsation, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // 绘制螺旋粒子
      for (let i = 0; i < params.particleCount; i++) {
        const phase = (i / params.particleCount) * Math.PI * 2;
        const t = time * params.timeScale;
        
        // 三维螺旋时空方程
        const x = params.helixRadius * Math.cos(t + phase);
        const z = params.helixRadius * Math.sin(t + phase);
        const y = (t * params.helixPitch) % 20 - 10;
        
        // 投影到2D平面 (简化的透视投影)
        const perspective = 300 / (300 + y * 10);
        const screenX = centerX + x * perspective;
        const screenY = centerY + z * perspective;
        
        // 根据深度调整大小和透明度
        const size = (3 + Math.abs(Math.sin(t + phase)) * 5) * perspective;
        const alpha = 0.3 + perspective * 0.7;
        
        // 颜色基于位置
        const hue = (i / params.particleCount * 360 + time * 50) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制轨迹线
        if (i % 5 === 0) {
          ctx.strokeStyle = `hsla(${hue}, 60%, 50%, 0.3)`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          
          for (let j = 0; j < 20; j++) {
            const trailT = t - j * 0.1;
            const trailX = params.helixRadius * Math.cos(trailT + phase);
            const trailZ = params.helixRadius * Math.sin(trailT + phase);
            const trailY = (trailT * params.helixPitch) % 20 - 10;
            
            const trailPerspective = 300 / (300 + trailY * 10);
            const trailScreenX = centerX + trailX * trailPerspective;
            const trailScreenY = centerY + trailZ * trailPerspective;
            
            if (j === 0) {
              ctx.moveTo(trailScreenX, trailScreenY);
            } else {
              ctx.lineTo(trailScreenX, trailScreenY);
            }
          }
          ctx.stroke();
        }
      }
      
      // 绘制方程式
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('时空同一化方程: ds² = c²dt² - dx² - dy² - dz²', centerX, 40);
      ctx.font = '14px monospace';
      ctx.fillText('三维螺旋时空: r(t) = R·cos(ωt + φ)î + R·sin(ωt + φ)ĵ + h·t·k̂', centerX, 65);
      
      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [params]);

  const updateParam = (key: keyof SpiralParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      {/* 控制面板 */}
      <div className="absolute max-w-xs p-4 text-white rounded-lg top-4 left-4 bg-black/80 backdrop-blur-sm">
        <h3 className="mb-3 text-lg font-bold">时空参数控制</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block mb-1 text-sm">时间尺度: {params.timeScale.toFixed(2)}</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={params.timeScale}
              onChange={(e) => updateParam('timeScale', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm">螺旋半径: {params.helixRadius.toFixed(0)}</label>
            <input
              type="range"
              min="50"
              max="150"
              step="10"
              value={params.helixRadius}
              onChange={(e) => updateParam('helixRadius', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm">螺旋间距: {params.helixPitch.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={params.helixPitch}
              onChange={(e) => updateParam('helixPitch', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm">粒子数量: {params.particleCount}</label>
            <input
              type="range"
              min="20"
              max="100"
              step="10"
              value={params.particleCount}
              onChange={(e) => updateParam('particleCount', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* 信息面板 */}
      <div className="absolute p-3 text-white rounded-lg bottom-4 right-4 bg-black/80 backdrop-blur-sm">
        <p className="text-sm">
          🌌 圆柱状螺旋时空动画<br/>
          📐 时空同一化理论可视化<br/>
          🎮 实时参数调节
        </p>
      </div>
    </div>
  );
};

export default SimpleSpiralAnimation;