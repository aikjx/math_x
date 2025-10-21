import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

export default function DataSwitcher() {
  const { currentDataset, switchDataset } = useData();
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 mb-3">
        <i className="fa-solid fa-database text-blue-600 dark:text-blue-400"></i>
        <span className="text-sm font-medium text-gray-900 dark:text-white">数据切换</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => switchDataset('default')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            currentDataset === 'default'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          默认
        </button>
        
        <button
          onClick={() => switchDataset('extended')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            currentDataset === 'extended'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          扩展
        </button>
        
        <button
          onClick={() => switchDataset('simplified')}
          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
            currentDataset === 'simplified'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          简化
        </button>
      </div>
      
      <button
        onClick={() => {
          if (confirm('确定要重置所有数据吗？这将清除您的修改并恢复到初始状态。')) {
            switchDataset('default');
          }
        }}
        className="mt-3 text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center justify-center"
      >
        <i className="fa-solid fa-refresh mr-1"></i> 重置数据
      </button>
    </motion.div>
  );
}