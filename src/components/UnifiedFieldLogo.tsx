import React from 'react';
import { motion } from 'framer-motion';

interface UnifiedFieldLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export default function UnifiedFieldLogo({ 
  size = 'md', 
  animated = true, 
  className = '' 
}: UnifiedFieldLogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-xl'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* 主LOGO容器 */}
      <motion.div
        className="relative w-full h-full"
        initial={animated ? { opacity: 0, scale: 0.8 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 外层能量环 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"
          animate={animated ? {
            rotate: 360,
            scale: [1, 1.05, 1]
          } : {}}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* 中层螺旋轨道 */}
        <motion.div
          className="absolute border-2 rounded-full inset-2 border-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.3), transparent, rgba(147, 51, 234, 0.3), transparent)'
          }}
          animate={animated ? { rotate: -360 } : {}}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* 内层核心 */}
        <motion.div
          className="absolute border rounded-full shadow-lg inset-4 bg-gradient-to-br from-white via-blue-50 to-purple-50 border-blue-200/50"
          animate={animated ? {
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 30px rgba(147, 51, 234, 0.4)',
              '0 0 20px rgba(59, 130, 246, 0.3)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* 中心符号 - 统一场论核心标识 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={animated ? { rotate: 360 } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {/* 时空矢量符号 */}
              <svg
                viewBox="0 0 40 40"
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
              >
                {/* R矢量 */}
                <path d="M8 20 L32 20 M28 16 L32 20 L28 24" stroke="currentColor" strokeWidth="2" fill="none"/>
                {/* C矢量 */}
                <path d="M20 8 L20 32 M16 28 L20 32 L24 28" stroke="currentColor" strokeWidth="2" fill="none"/>
                {/* 螺旋轨迹 */}
                <path d="M20 20 Q24 16 28 20 Q24 24 20 20 Q16 16 12 20 Q16 24 20 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
              </svg>
            </motion.div>
          </div>
          
          {/* 量子粒子效果 */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0'
              }}
              animate={animated ? {
                rotate: 360,
                x: Math.cos(i * Math.PI / 4) * 15,
                y: Math.sin(i * Math.PI / 4) * 15,
                opacity: [0.3, 1, 0.3]
              } : {}}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
              }}
            />
          ))}
        </motion.div>
        
        {/* 外层光晕效果 */}
        <motion.div
          className="absolute rounded-full -inset-2"
          style={{
            background: 'radial-gradient(circle, transparent 60%, rgba(59, 130, 246, 0.1) 70%, transparent 80%)'
          }}
          animate={animated ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* LOGO文字标识 */}
      <motion.div
        className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 ${textSizes[size]} font-bold text-center`}
        initial={animated ? { opacity: 0, y: 10 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
          统一场论
        </div>
        <div className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-xs' : 'text-sm'} text-gray-500 mt-1`}>
          UNIFIED FIELD
        </div>
      </motion.div>
    </div>
  );
}

// 简化版LOGO（用于导航栏等小空间）
export function UnifiedFieldLogoMini({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-8 h-8 ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4 text-white"
            fill="currentColor"
          >
            <path d="M4 10 L16 10 M14 8 L16 10 L14 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M10 4 L10 16 M8 14 L10 16 L12 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}