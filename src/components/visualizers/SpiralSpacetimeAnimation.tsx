import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// 时空同一化方程参数
interface SpacetimeParams {
  timeScale: number;
  spatialScale: number;
  helixRadius: number;
  helixPitch: number;
  particleCount: number;
}

// 螺旋粒子组件
const SpiralParticle: React.FC<{ 
  position: [number, number, number];
  time: number;
  params: SpacetimeParams;
  index: number;
}> = ({ position, time, params, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    // 时空同一化方程: ds² = c²dt² - dx² - dy² - dz²
    const t = time * params.timeScale;
    const phase = (index / params.particleCount) * Math.PI * 2;
    
    // 三维螺旋时空方程
    const x = params.helixRadius * Math.cos(t + phase);
    const z = params.helixRadius * Math.sin(t + phase);
    const y = (t * params.helixPitch) % 20 - 10; // 螺旋上升
    
    meshRef.current.position.set(x, y, z);
    
    // 根据时空曲率调整大小和颜色
    const curvature = Math.abs(Math.sin(t + phase)) * 0.5 + 0.5;
    meshRef.current.scale.setScalar(0.1 + curvature * 0.2);
    
    // 时空扭曲效果
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.3;
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial 
        color={new THREE.Color().setHSL((index / 50) % 1, 0.8, 0.6)}
        emissive={new THREE.Color().setHSL((index / 50) % 1, 0.3, 0.2)}
      />
    </mesh>
  );
};

// 时空网格组件
const SpacetimeGrid: React.FC<{ time: number }> = ({ time }) => {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!gridRef.current) return;
    
    // 时空扭曲动画
    gridRef.current.rotation.y = time * 0.1;
    gridRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        const distortion = Math.sin(time + index * 0.5) * 0.1;
        child.position.y = Math.sin(time * 0.5 + index * 0.2) * distortion;
      }
    });
  });
  
  const gridLines = [];
  for (let i = -10; i <= 10; i += 2) {
    // 径向网格线
    for (let j = 0; j < 16; j++) {
      const angle = (j / 16) * Math.PI * 2;
      const x1 = i * Math.cos(angle);
      const z1 = i * Math.sin(angle);
      const x2 = (i + 1) * Math.cos(angle);
      const z2 = (i + 1) * Math.sin(angle);
      
      gridLines.push(
        <line key={`radial-${i}-${j}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([x1, 0, z1, x2, 0, z2])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#444444" opacity={0.3} transparent />
        </line>
      );
    }
    
    // 圆形网格线
    const points = [];
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
      points.push(
        Math.abs(i) * Math.cos(angle),
        0,
        Math.abs(i) * Math.sin(angle)
      );
    }
    
    gridLines.push(
      <line key={`circle-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={new Float32Array(points)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#444444" opacity={0.2} transparent />
      </line>
    );
  }
  
  return <group ref={gridRef}>{gridLines}</group>;
};

// 中心物体组件
const CentralObject: React.FC<{ time: number }> = ({ time }) => {
  const objectRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!objectRef.current) return;
    
    // 中心物体的引力场效应
    const pulsation = Math.sin(time * 2) * 0.1 + 1;
    objectRef.current.scale.setScalar(pulsation);
    objectRef.current.rotation.y = time * 0.5;
    objectRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
  });
  
  return (
    <mesh ref={objectRef}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial 
        color="#ff6b35"
        emissive="#ff2200"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

// 主动画场景组件
const SpacetimeScene: React.FC<{ params: SpacetimeParams }> = ({ params }) => {
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    setTime(state.clock.elapsedTime);
  });
  
  // 生成螺旋粒子
  const particles = Array.from({ length: params.particleCount }, (_, index) => (
    <SpiralParticle
      key={index}
      position={[0, 0, 0]}
      time={time}
      params={params}
      index={index}
    />
  ));
  
  return (
    <>
      {/* 环境光照 */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />
      
      {/* 时空网格 */}
      <SpacetimeGrid time={time} />
      
      {/* 中心物体 */}
      <CentralObject time={time} />
      
      {/* 螺旋粒子群 */}
      {particles}
      
      {/* 方程式标签 */}
      <Text
        position={[0, 12, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        时空同一化方程: ds² = c²dt² - dx² - dy² - dz²
      </Text>
      
      <Text
        position={[0, 10.5, 0]}
        fontSize={0.6}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        三维螺旋时空: r(t) = R·cos(ωt + φ)î + R·sin(ωt + φ)ĵ + h·t·k̂
      </Text>
      
      {/* 相机控制 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={50}
        minDistance={5}
      />
    </>
  );
};

// 控制面板组件
const ControlPanel: React.FC<{
  params: SpacetimeParams;
  onParamsChange: (params: SpacetimeParams) => void;
}> = ({ params, onParamsChange }) => {
  const updateParam = (key: keyof SpacetimeParams, value: number) => {
    onParamsChange({ ...params, [key]: value });
  };
  
  return (
    <div className="absolute p-4 text-white rounded-lg top-4 left-4 bg-black/80 backdrop-blur-sm">
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
          <label className="block mb-1 text-sm">空间尺度: {params.spatialScale.toFixed(2)}</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={params.spatialScale}
            onChange={(e) => updateParam('spatialScale', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm">螺旋半径: {params.helixRadius.toFixed(1)}</label>
          <input
            type="range"
            min="2"
            max="8"
            step="0.5"
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
            max="3"
            step="0.1"
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
  );
};

// 主组件
const SpiralSpacetimeAnimation: React.FC = () => {
  const [params, setParams] = useState<SpacetimeParams>({
    timeScale: 0.5,
    spatialScale: 1.0,
    helixRadius: 5,
    helixPitch: 1.5,
    particleCount: 50
  });
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Canvas
        camera={{ position: [15, 10, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SpacetimeScene params={params} />
      </Canvas>
      
      <ControlPanel params={params} onParamsChange={setParams} />
      
      <div className="absolute p-3 text-white rounded-lg bottom-4 right-4 bg-black/80 backdrop-blur-sm">
        <p className="text-sm">
          🌌 圆柱状螺旋时空动画<br/>
          📐 时空同一化理论可视化<br/>
          🎮 拖拽旋转 | 滚轮缩放
        </p>
      </div>
    </div>
  );
};

export default SpiralSpacetimeAnimation;