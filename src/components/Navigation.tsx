import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UnifiedFieldLogoMini } from './UnifiedFieldLogo';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: '理论概述', href: '#overview', icon: '🌌' },
    { name: '核心公式', href: '#formulas', icon: '📐' },
    { name: '可视化', href: '#visualization', icon: '🎯' },
    { name: '推导体系', href: '#derivation', icon: '🔬' },
    { name: '应用前景', href: '#applications', icon: '🚀' }
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* LOGO区域 */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <UnifiedFieldLogoMini />
            <div className="hidden md:block">
              <div className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                统一场论
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                UNIFIED FIELD
              </div>
            </div>
          </motion.div>

          {/* 桌面导航菜单 */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 space-x-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <motion.button
            className="p-2 text-gray-700 rounded-lg md:hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* 移动端菜单 */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}