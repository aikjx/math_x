import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import NavigationItem from './NavigationItem';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{
    path: string;
    icon: string;
    label: string;
    color: string;
  }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navigationItems }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          
          {/* 菜单内容 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full bg-white shadow-2xl w-80 dark:bg-gray-900 md:hidden"
          >
            {/* 菜单头部 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <i className="text-sm text-white fa-solid fa-calculator"></i>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  数学学习平台
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <i className="text-xl fa-solid fa-times"></i>
              </motion.button>
            </div>

            {/* 菜单项 */}
            <div className="p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={onClose}
                >
                  <div className={`rounded-lg overflow-hidden ${
                    location.pathname === item.path 
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}>
                    <NavigationItem {...item} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 菜单底部 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © 2025 数学学习平台
                </p>
                <div className="flex justify-center mt-3 space-x-4">
                  <motion.a
                    href="https://github.com/aikjx/math"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors rounded-full hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <i className="fa-brands fa-github"></i>
                  </motion.a>
                  <motion.a
                    href="https://x.com/aikjxcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors rounded-full hover:text-blue-500 dark:text-gray-400"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;