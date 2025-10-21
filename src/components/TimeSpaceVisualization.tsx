import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TimeSpaceVisualizationProps {
  className?: string;
}

export default function TimeSpaceVisualization({ className = '' }: TimeSpaceVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showVectors, setShowVectors] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [showWaves, setShowWaves] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'split'>('3d');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  // 粒子系统
  const particles = useRef<Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 初始化粒子系统
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < 50; i++) {
        particles.current.push({
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          z: (Math.random() - 0.5) * 200,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          size: 1 + Math.random() * 3
        });
      }
    };

    initParticles();

    const animate = () => {
      if (!isPlaying) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // 清空画布并设置背景
      ctx.clearRect(0, 0, width, height);
      
      // 动态背景渐变
      const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      bgGradient.addColorStop(0, `rgba(15, 23, 42, ${0.95 + 0.05 * Math.sin(time * 0.01)})`);
      bgGradient.addColorStop(0.5, `rgba(30, 41, 59, ${0.9 + 0.1 * Math.sin(time * 0.015)})`);
      bgGradient.addColorStop(1, `rgba(51, 65, 85, ${0.85 + 0.15 * Math.sin(time * 0.02)})`);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // 设置坐标系原点到中心
      ctx.save();
      ctx.translate(width / 2, height / 2);
      
      // 鼠标交互效果
      if (isMouseOver) {
        const mouseInfluence = 0.1;
        ctx.translate(
          (mousePos.x - width/2) * mouseInfluence,
          (mousePos.y - height/2) * mouseInfluence
        );
      }
      
      // 绘制星空背景
      drawStarField(ctx, width, height, time);
      
      // 绘制坐标轴
      if (showGrid) {
        drawEnhancedAxes(ctx, width, height, time);
      }
      
      // 绘制时空网格
      if (showGrid) {
        drawSpaceTimeGrid(ctx, width, height, time);
      }
      
      // 绘制光速传播波
      if (showWaves) {
        drawQuantumWaves(ctx, time);
      }
      
      // 绘制时空螺旋 - 多维度
      drawMultiDimensionalSpiral(ctx, time * speed);
      
      // 绘制矢量场
      if (showVectors) {
        drawVectorField(ctx, time * speed, width, height);
      }
      
      // 绘制粒子系统
      if (showParticles) {
        updateAndDrawParticles(ctx, time);
      }
      
      // 绘制主要矢量
      if (showVectors) {
        drawMainVectors(ctx, time * speed);
      }
      
      // 绘制时空扭曲效果
      drawSpaceTimeDistortion(ctx, time * speed);
      
      // 绘制能量场
      drawEnergyField(ctx, time);
      
      // 绘制公式可视化
      drawFormulaVisualization(ctx, time * speed, width, height);
      
      ctx.restore();
      
      setTime(prev => prev + 0.02);
      animationRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, showVectors, showGrid, showParticles, showWaves, viewMode, mousePos, isMouseOver]);

  // 星空背景
  const drawStarField = (ctx: CanvasRenderingContext2D, width: number, height: number, t: number) => {
    for (let i = 0; i < 100; i++) {
      const x = (i * 137.5) % width - width/2;
      const y = (i * 73.3) % height - height/2;
      const brightness = 0.3 + 0.7 * Math.sin(t * 0.01 + i * 0.1);
      const size = 0.5 + Math.sin(t * 0.02 + i * 0.05) * 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // 增强坐标轴
  const drawEnhancedAxes = (ctx: CanvasRenderingContext2D, width: number, height: number, t: number) => {
    const axisLength = Math.min(width, height) * 0.4;
    
    // 动态网格
    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 + 0.05 * Math.sin(t * 0.01)})`;
    ctx.lineWidth = 1;
    
    for (let i = -10; i <= 10; i++) {
      const offset = i * 30;
      const alpha = 0.1 + 0.05 * Math.sin(t * 0.01 + i * 0.2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
      
      // 垂直线
      ctx.beginPath();
      ctx.moveTo(offset, -axisLength);
      ctx.lineTo(offset, axisLength);
      ctx.stroke();
      
      // 水平线
      ctx.beginPath();
      ctx.moveTo(-axisLength, offset);
      ctx.lineTo(axisLength, offset);
      ctx.stroke();
    }
    
    // 主坐标轴
    const axisColors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
    const axisLabels = ['X', 'Y', 'Z'];
    
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3 + t * 0.01;
      const endX = Math.cos(angle) * axisLength;
      const endY = Math.sin(angle) * axisLength * 0.6;
      
      // 轴光晕
      ctx.strokeStyle = axisColors[i] + '40';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 主轴
      ctx.strokeStyle = axisColors[i];
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // 箭头
      drawEnhancedArrow(ctx, 0, 0, endX, endY, axisColors[i]);
      
      // 标签
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.strokeStyle = axisColors[i];
      ctx.lineWidth = 3;
      ctx.strokeText(axisLabels[i], endX + 20, endY - 10);
      ctx.fillText(axisLabels[i], endX + 20, endY - 10);
    }
  };

  // 时空网格
  const drawSpaceTimeGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, t: number) => {
    const gridSize = 40;
    const waveAmplitude = 10;
    
    ctx.strokeStyle = `rgba(147, 51, 234, ${0.2 + 0.1 * Math.sin(t * 0.02)})`;
    ctx.lineWidth = 1;
    
    // 弯曲的时空网格
    for (let x = -width/2; x < width/2; x += gridSize) {
      ctx.beginPath();
      for (let y = -height/2; y < height/2; y += 5) {
        const wave = Math.sin((x + y) * 0.01 + t * 0.05) * waveAmplitude;
        const waveX = x + wave;
        const waveY = y + Math.sin(x * 0.02 + t * 0.03) * waveAmplitude * 0.5;
        
        if (y === -height/2) {
          ctx.moveTo(waveX, waveY);
        } else {
          ctx.lineTo(waveX, waveY);
        }
      }
      ctx.stroke();
    }
    
    for (let y = -height/2; y < height/2; y += gridSize) {
      ctx.beginPath();
      for (let x = -width/2; x < width/2; x += 5) {
        const wave = Math.sin((x + y) * 0.01 + t * 0.05) * waveAmplitude;
        const waveX = x + Math.sin(y * 0.02 + t * 0.03) * waveAmplitude * 0.5;
        const waveY = y + wave;
        
        if (x === -width/2) {
          ctx.moveTo(waveX, waveY);
        } else {
          ctx.lineTo(waveX, waveY);
        }
      }
      ctx.stroke();
    }
  };

  // 量子波动
  const drawQuantumWaves = (ctx: CanvasRenderingContext2D, t: number) => {
    for (let wave = 0; wave < 6; wave++) {
      const radius = (t * 60 + wave * 40) % 300;
      const alpha = Math.max(0, 1 - (radius / 300));
      const hue = (wave * 60 + t * 2) % 360;
      
      // 主波
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.6})`;
      ctx.lineWidth = 3;
      ctx.setLineDash([15, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 波的干涉效果
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.3})`;
      ctx.lineWidth = 6;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 量子涨落
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + t * 0.05;
        const fluctX = Math.cos(angle) * radius;
        const fluctY = Math.sin(angle) * radius;
        const fluctSize = 3 + 2 * Math.sin(t * 0.1 + i);
        
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(fluctX, fluctY, fluctSize, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    ctx.setLineDash([]);
  };

  // 多维螺旋
  const drawMultiDimensionalSpiral = (ctx: CanvasRenderingContext2D, t: number) => {
    const numDimensions = 5;
    const baseRadius = 60;
    const omega = 0.3;
    const h = 15;
    
    for (let dim = 0; dim < numDimensions; dim++) {
      const dimRadius = baseRadius + dim * 20;
      const dimOffset = (dim * Math.PI * 2) / numDimensions;
      const alpha = 0.9 - dim * 0.15;
      const hue = (dim * 72 + t * 10) % 360;
      
      // 螺旋光晕
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.3})`;
      ctx.lineWidth = 12 - dim * 2;
      ctx.beginPath();
      
      for (let i = 0; i <= t * 60; i++) {
        const time = i / 60;
        const spiralT = omega * time + dimOffset;
        const x = dimRadius * Math.cos(spiralT) * (1 - time * 0.08);
        const y = dimRadius * Math.sin(spiralT) * 0.6 * (1 - time * 0.08) - h * time * 3;
        const z = Math.sin(spiralT * 2 + t * 0.1) * 20;
        
        // 3D投影
        const projX = x + z * 0.3;
        const projY = y + z * 0.2;
        
        if (i === 0) {
          ctx.moveTo(projX, projY);
        } else {
          ctx.lineTo(projX, projY);
        }
      }
      ctx.stroke();
      
      // 主螺旋
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
      ctx.lineWidth = 4 - dim * 0.5;
      ctx.beginPath();
      
      for (let i = 0; i <= t * 60; i++) {
        const time = i / 60;
        const spiralT = omega * time + dimOffset;
        const x = dimRadius * Math.cos(spiralT) * (1 - time * 0.08);
        const y = dimRadius * Math.sin(spiralT) * 0.6 * (1 - time * 0.08) - h * time * 3;
        const z = Math.sin(spiralT * 2 + t * 0.1) * 20;
        
        const projX = x + z * 0.3;
        const projY = y + z * 0.2;
        
        if (i === 0) {
          ctx.moveTo(projX, projY);
        } else {
          ctx.lineTo(projX, projY);
        }
      }
      ctx.stroke();
    }
    
    // 当前位置 - 超级粒子
    const currentT = omega * t;
    const currentX = baseRadius * Math.cos(currentT);
    const currentY = baseRadius * Math.sin(currentT) * 0.6 - h * t * 3;
    const currentZ = Math.sin(currentT * 2 + t * 0.1) * 20;
    
    const projCurrentX = currentX + currentZ * 0.3;
    const projCurrentY = currentY + currentZ * 0.2;
    
    // 超级光晕
    for (let ring = 0; ring < 5; ring++) {
      const ringRadius = 30 - ring * 5;
      const ringAlpha = (5 - ring) / 5 * 0.3;
      const ringGradient = ctx.createRadialGradient(
        projCurrentX, projCurrentY, 0,
        projCurrentX, projCurrentY, ringRadius
      );
      ringGradient.addColorStop(0, `rgba(255, 100, 100, ${ringAlpha})`);
      ringGradient.addColorStop(1, `rgba(255, 100, 100, 0)`);
      
      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(projCurrentX, projCurrentY, ringRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // 主粒子
    const particleGradient = ctx.createRadialGradient(
      projCurrentX, projCurrentY, 0,
      projCurrentX, projCurrentY, 12
    );
    particleGradient.addColorStop(0, '#ffffff');
    particleGradient.addColorStop(0.3, '#ff6464');
    particleGradient.addColorStop(0.7, '#ff3030');
    particleGradient.addColorStop(1, '#cc0000');
    
    ctx.fillStyle = particleGradient;
    ctx.beginPath();
    ctx.arc(projCurrentX, projCurrentY, 8 + Math.sin(t * 8) * 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  // 矢量场
  const drawVectorField = (ctx: CanvasRenderingContext2D, t: number, width: number, height: number) => {
    const gridSpacing = 60;
    
    for (let x = -width/2; x < width/2; x += gridSpacing) {
      for (let y = -height/2; y < height/2; y += gridSpacing) {
        const distance = Math.sqrt(x*x + y*y);
        if (distance > 200) continue;
        
        const fieldStrength = 1 / (1 + distance * 0.01);
        const angle = Math.atan2(y, x) + t * 0.02 + Math.sin(distance * 0.01 + t * 0.05) * 0.5;
        
        const vx = Math.cos(angle) * fieldStrength * 30;
        const vy = Math.sin(angle) * fieldStrength * 30;
        
        // 矢量光晕
        ctx.strokeStyle = `rgba(100, 255, 150, ${fieldStrength * 0.3})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx, y + vy);
        ctx.stroke();
        
        // 主矢量
        ctx.strokeStyle = `rgba(100, 255, 150, ${fieldStrength * 0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx, y + vy);
        ctx.stroke();
        
        // 小箭头
        drawMiniArrow(ctx, x, y, x + vx, y + vy, `rgba(100, 255, 150, ${fieldStrength})`);
      }
    }
  };

  // 粒子系统更新
  const updateAndDrawParticles = (ctx: CanvasRenderingContext2D, t: number) => {
    particles.current.forEach((particle, index) => {
      // 更新粒子
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      particle.life++;
      
      // 重力和场力影响
      const centerForce = 0.001;
      const distance = Math.sqrt(particle.x*particle.x + particle.y*particle.y);
      if (distance > 0) {
        particle.vx -= (particle.x / distance) * centerForce;
        particle.vy -= (particle.y / distance) * centerForce;
      }
      
      // 重生粒子
      if (particle.life > particle.maxLife || distance > 300) {
        particle.x = (Math.random() - 0.5) * 100;
        particle.y = (Math.random() - 0.5) * 100;
        particle.z = (Math.random() - 0.5) * 100;
        particle.vx = (Math.random() - 0.5) * 3;
        particle.vy = (Math.random() - 0.5) * 3;
        particle.vz = (Math.random() - 0.5) * 3;
        particle.life = 0;
        particle.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }
      
      // 绘制粒子
      const alpha = 1 - (particle.life / particle.maxLife);
      const projX = particle.x + particle.z * 0.2;
      const projY = particle.y + particle.z * 0.1;
      
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
      ctx.beginPath();
      ctx.arc(projX, projY, particle.size * alpha, 0, 2 * Math.PI);
      ctx.fill();
      
      // 粒子轨迹
      if (index % 3 === 0) {
        ctx.strokeStyle = particle.color.replace(')', `, ${alpha * 0.3})`).replace('hsl', 'hsla');
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(projX, projY);
        ctx.lineTo(projX - particle.vx * 5, projY - particle.vy * 5);
        ctx.stroke();
      }
    });
  };

  // 主矢量
  const drawMainVectors = (ctx: CanvasRenderingContext2D, t: number) => {
    const radius = 80;
    const omega = 0.3;
    const h = 15;
    
    const currentT = omega * t;
    const x = radius * Math.cos(currentT);
    const y = radius * Math.sin(currentT) * 0.6 - h * t * 3;
    const z = Math.sin(currentT * 2 + t * 0.1) * 20;
    
    const projX = x + z * 0.3;
    const projY = y + z * 0.2;
    
    // 位置矢量 R(t)
    const rGradient = ctx.createLinearGradient(0, 0, projX, projY);
    rGradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
    rGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.9)');
    rGradient.addColorStop(1, 'rgba(22, 163, 74, 1)');
    
    // 超级光晕
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(projX, projY);
    ctx.stroke();
    
    // 主矢量
    ctx.strokeStyle = rGradient;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(projX, projY);
    ctx.stroke();
    
    drawSuperArrow(ctx, 0, 0, projX, projY, '#10b981');
    
    // 标签
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeText('R⃗(t)', projX + 20, projY - 10);
    ctx.fillText('R⃗(t)', projX + 20, projY - 10);
    
    // 速度矢量 C
    const vx = -radius * omega * Math.sin(currentT);
    const vy = radius * omega * Math.cos(currentT) * 0.6 - h;
    const vz = Math.cos(currentT * 2 + t * 0.1) * 20 * 2;
    
    const projVx = vx + vz * 0.3;
    const projVy = vy + vz * 0.2;
    
    const cGradient = ctx.createLinearGradient(projX, projY, projX + projVx * 0.8, projY + projVy * 0.8);
    cGradient.addColorStop(0, 'rgba(245, 158, 11, 0.8)');
    cGradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.9)');
    cGradient.addColorStop(1, 'rgba(217, 119, 6, 1)');
    
    // 速度矢量光晕
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(projX, projY);
    ctx.lineTo(projX + projVx * 0.8, projY + projVy * 0.8);
    ctx.stroke();
    
    // 主速度矢量
    ctx.strokeStyle = cGradient;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(projX, projY);
    ctx.lineTo(projX + projVx * 0.8, projY + projVy * 0.8);
    ctx.stroke();
    
    drawSuperArrow(ctx, projX, projY, projX + projVx * 0.8, projY + projVy * 0.8, '#f59e0b');
    
    // 速度标签
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeText('C⃗', projX + projVx * 0.8 + 20, projY + projVy * 0.8);
    ctx.fillText('C⃗', projX + projVx * 0.8 + 20, projY + projVy * 0.8);
  };

  // 时空扭曲
  const drawSpaceTimeDistortion = (ctx: CanvasRenderingContext2D, t: number) => {
    const numRings = 8;
    
    for (let ring = 0; ring < numRings; ring++) {
      const baseRadius = 50 + ring * 25;
      const distortion = Math.sin(t * 0.05 + ring * 0.5) * 10;
      const alpha = (numRings - ring) / numRings * 0.1;
      
      ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const radius = baseRadius + Math.sin(angle * 4 + t * 0.1) * distortion;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.7;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
  };

  // 能量场
  const drawEnergyField = (ctx: CanvasRenderingContext2D, t: number) => {
    const centerRadius = 40 + 15 * Math.sin(t * 0.08);
    
    // 多层能量场
    for (let layer = 0; layer < 4; layer++) {
      const layerRadius = centerRadius + layer * 20;
      const layerAlpha = (4 - layer) / 4 * 0.3;
      const hue = (t * 5 + layer * 30) % 360;
      
      const energyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerRadius);
      energyGradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${layerAlpha})`);
      energyGradient.addColorStop(0.7, `hsla(${hue}, 70%, 60%, ${layerAlpha * 0.5})`);
      energyGradient.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
      
      ctx.fillStyle = energyGradient;
      ctx.beginPath();
      ctx.arc(0, 0, layerRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // 公式可视化
  const drawFormulaVisualization = (ctx: CanvasRenderingContext2D, t: number, width: number, height: number) => {
    // R(t) = Ct = xi + yj + zk 的动态展示
    const formulaY = -height/2 + 60;
    
    // 背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(-width/2 + 20, formulaY - 30, width - 40, 50);
    
    // 公式文本
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    const components = ['R(t)', '=', 'Ct', '=', 'xi', '+', 'yj', '+', 'zk'];
    const colors = ['#ff6b6b', '#ffffff', '#4ecdc4', '#ffffff', '#45b7d1', '#ffffff', '#96ceb4', '#ffffff', '#feca57'];
    
    let totalWidth = 0;
    components.forEach(comp => {
      totalWidth += ctx.measureText(comp).width + 20;
    });
    
    let currentX = -totalWidth / 2;
    
    components.forEach((component, index) => {
      const alpha = 0.7 + 0.3 * Math.sin(t * 0.1 + index * 0.5);
      ctx.fillStyle = colors[index].replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(') || colors[index];
      
      if (colors[index].startsWith('#')) {
        const r = parseInt(colors[index].slice(1, 3), 16);
        const g = parseInt(colors[index].slice(3, 5), 16);
        const b = parseInt(colors[index].slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      
      // 发光效果
      ctx.shadowColor = colors[index];
      ctx.shadowBlur = 10;
      ctx.fillText(component, currentX, formulaY);
      ctx.shadowBlur = 0;
      
      currentX += ctx.measureText(component).width + 20;
    });
    
    ctx.textAlign = 'left';
  };

  // 增强箭头
  const drawEnhancedArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const headlen = 15;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    
    // 箭头光晕
    ctx.strokeStyle = color + '40';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
    
    // 主箭头
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // 超级箭头
  const drawSuperArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const headlen = 20;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    
    // 多层光晕
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = color + (30 - i * 10).toString(16);
      ctx.lineWidth = 12 - i * 3;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    }
    
    // 主箭头
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 5;
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // 迷你箭头
  const drawMiniArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const headlen = 8;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetAnimation = () => setTime(0);

  return (
    <div className={`time-space-visualization ${className}`}>
      <motion.div 
        className="p-6 shadow-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-6">
          <h3 className="mb-3 text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text">
            🌌 时空统一化方程 - 终极可视化
          </h3>
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
            <p className="font-mono text-xl text-center text-cyan-300">
              R(t) = Ct = xi + yj + zk
            </p>
            <p className="mt-2 text-sm text-center text-blue-200">
              时间即空间运动 • 矢量光速统一时空 • 多维螺旋展现宇宙本质
            </p>
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full border-2 rounded-lg shadow-inner border-cyan-500/30 h-96 bg-gradient-to-br from-gray-900 to-black"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          />
          
          {/* 高级控制面板 */}
          <div className="absolute flex flex-col gap-2 top-4 right-4">
            <button
              onClick={togglePlay}
              className="px-4 py-2 text-sm font-bold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105 hover:shadow-lg"
            >
              {isPlaying ? '⏸️ 暂停' : '▶️ 播放'}
            </button>
            <button
              onClick={resetAnimation}
              className="px-4 py-2 text-sm font-bold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg"
            >
              🔄 重置
            </button>
          </div>
          
          {/* 速度和选项控制 */}
          <div className="absolute flex flex-col gap-3 bottom-4 left-4">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black/50 backdrop-blur-sm">
              <span className="text-sm font-medium text-cyan-300">速度:</span>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 accent-cyan-500"
              />
              <span className="text-sm font-medium text-cyan-300">{speed.toFixed(1)}x</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'showVectors', label: '矢量', state: showVectors, setter: setShowVectors },
                { key: 'showGrid', label: '网格', state: showGrid, setter: setShowGrid },
                { key: 'showParticles', label: '粒子', state: showParticles, setter: setShowParticles },
                { key: 'showWaves', label: '波动', state: showWaves, setter: setShowWaves }
              ].map(({ key, label, state, setter }) => (
                <button
                  key={key}
                  onClick={() => setter(!state)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-300 ${
                    state 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* 超级图例 */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm md:grid-cols-4">
          {[
            { color: 'bg-green-500', label: '位置矢量 R⃗(t)', desc: '时空位置' },
            { color: 'bg-yellow-500', label: '矢量光速 C⃗', desc: '光速方向' },
            { color: 'bg-blue-500', label: '多维螺旋', desc: '时空结构' },
            { color: 'bg-purple-500', label: '量子波动', desc: '能量传播' }
          ].map(({ color, label, desc }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <div className={`w-4 h-4 ${color} rounded-full shadow-lg`}></div>
              <div>
                <span className="font-medium text-white">{label}</span>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* 终极物理解释 */}
        <div className="p-6 mt-6 border rounded-lg bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-purple-500/30">
          <h4 className="mb-4 text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            🔬 张祥前统一场论 - 时空本质揭示
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h5 className="mb-2 font-semibold text-cyan-300">核心原理：</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong className="text-green-400">时空统一</strong>：时间就是空间的运动</li>
                <li>• <strong className="text-blue-400">螺旋结构</strong>：空间以圆柱状螺旋式运动</li>
                <li>• <strong className="text-purple-400">矢量光速</strong>：C的模恒定，方向可变</li>
                <li>• <strong className="text-yellow-400">多维展现</strong>：5维时空的3D投影</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-2 font-semibold text-cyan-300">视觉元素：</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• <strong className="text-red-400">超级粒子</strong>：物体在时空中的实时位置</li>
                <li>• <strong className="text-green-400">矢量场</strong>：空间运动的方向分布</li>
                <li>• <strong className="text-blue-400">量子波</strong>：光速传播的波动效应</li>
                <li>• <strong className="text-purple-400">时空扭曲</strong>：引力场对空间的影响</li>
              </ul>
            </div>
          </div>
          <div className="p-4 mt-4 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <p className="text-sm text-center text-blue-200">
              <strong>革命性洞察：</strong>这个可视化展现了统一场论的核心思想 - 
              宇宙中的一切物理现象都源于空间本身的几何运动，
              时间、质量、电荷、场都是空间运动的不同表现形式。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}