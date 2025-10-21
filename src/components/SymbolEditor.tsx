import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { type MathematicalSymbolExtended } from '@/lib/data';
import { toast } from 'sonner';

interface SymbolEditorProps {
  symbol: MathematicalSymbolExtended;
  onClose: () => void;
}

export default function SymbolEditor({ symbol, onClose }: SymbolEditorProps) {
  const { updateSymbol } = useData();
  const [editData, setEditData] = useState<Partial<MathematicalSymbolExtended>>({
    name: symbol.name,
    category: symbol.category,
    meaning: symbol.meaning,
    example: symbol.example,
    latex: symbol.latex
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSymbol(symbol.id, editData);
    toast.success('符号数据已更新');
    onClose();
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md bg-white shadow-lg dark:bg-gray-800 rounded-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">编辑数学符号</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="font-mono text-2xl">{symbol.symbol}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              符号名称
            </label>
            <input
              type="text"
              name="name"
              value={editData.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              类别
            </label>
            <input
              type="text"
              name="category"
              value={editData.category || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              含义
            </label>
            <textarea
              name="meaning"
              value={editData.meaning || ''}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              示例
            </label>
            <input
              type="text"
              name="example"
              value={editData.example || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              LaTeX代码
            </label>
            <input
              type="text"
              name="latex"
              value={editData.latex || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 font-mono text-sm bg-white border border-gray-300 rounded-lg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          
          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              保存修改
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}