import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavigationItemProps {
  path: string;
  icon: string;
  label: string;
  color: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ path, icon, label, color }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link to={path} className="relative group">
      <motion.div
        className={`
          relative px-4 py-2 rounded-lg transition-all duration-300 overflow-hidden
          ${isActive 
            ? 'text-white shadow-lg' 
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 背景渐变 */}
        {isActive && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg`}
            layoutId="activeBackground"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        
        {/* 悬停背景 */}
        <motion.div
          className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ display: isActive ? 'none' : 'block' }}
        />

        {/* 内容 */}
        <div className="relative flex items-center space-x-2">
          <motion.i
            className={`${icon} text-sm`}
            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
          <span className="text-sm font-medium whitespace-nowrap">
            {label}
          </span>
        </div>

        {/* 活跃指示器 */}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0, x: '-50%' }}
            animate={{ scale: 1, x: '-50%' }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavigationItem;