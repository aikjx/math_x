import React from 'react';
import { motion } from 'framer-motion';
import UnifiedFieldLogo from './UnifiedFieldLogo';

interface BrandHeaderProps {
  showSubtitle?: boolean;
  showAuthor?: boolean;
  className?: string;
}

export default function BrandHeader({ 
  showSubtitle = true, 
  showAuthor = true, 
  className = '' 
}: BrandHeaderProps) {
  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 主LOGO */}
      <div className="flex justify-center mb-8">
        <UnifiedFieldLogo size="xl" animated={true} />
      </div>
      
      {/* 主标题 */}
      <motion.h1
        className="mb-6 text-5xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        张祥前统一场论
      </motion.h1>
      
      {/* 英文标题 */}
      <motion.div
        className="mb-4 text-xl font-semibold text-gray-600 md:text-2xl dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Zhang Xiangqian's Unified Field Theory
      </motion.div>
      
      {/* 副标题 */}
      {showSubtitle && (
        <motion.div
          className="max-w-4xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            🌟 完整的物理统一理论体系
          </p>
          <p className="max-w-5xl mx-auto mt-3 text-base text-gray-500 dark:text-gray-400 md:text-lg">
            基于"物理世界存在于空间中，一切物理现象都是空间本身运动造成的"这一基本假设，
            通过17个核心方程建立了从基础原理到实际应用的完整理论框架，
            统一描述了电磁力、万有引力、强核力和弱核力四种基本相互作用。
          </p>
        </motion.div>
      )}
      
      {/* 作者信息 */}
      {showAuthor && (
        <motion.div
          className="max-w-2xl p-6 mx-auto border rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm border-blue-200/30 dark:border-blue-700/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-2xl font-bold text-white">张</span>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            张祥前 Zhang Xiangqian
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            独立物理学研究者 • 统一场论创立者
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            "宇宙中一切物理现象都是空间本身运动造成的"
          </p>
        </motion.div>
      )}
      
      {/* 装饰性元素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* 背景粒子效果 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}