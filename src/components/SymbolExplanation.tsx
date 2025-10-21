import { motion } from 'framer-motion';

import { useState } from 'react';
import { toast } from 'sonner';

interface MathematicalSymbol {
  id: number;
  symbol: string;
  name: string;
  category: string;
  meaning: string;
  example: string;
  latex: string;
}

interface SymbolExplanationProps {
  symbol: MathematicalSymbol;
}

export default function SymbolExplanation({ symbol }: SymbolExplanationProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(symbol.latex).then(() => {
      setCopied(true);
      toast.success('LaTeX代码已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-xl">{symbol.symbol}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 dark:text-white">{symbol.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{symbol.category}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">{symbol.meaning}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-mono text-gray-600 dark:text-gray-300 mb-1">{symbol.example}</div>
        <div className="flex items-center">
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded mr-2">
            {symbol.latex}
          </span>
          <button 
            onClick={copyToClipboard}
            className={`text-xs p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              copied ? 'text-green-500' : 'text-gray-500'
            }`}
            title={copied ? "已复制" : "复制LaTeX代码"}
          >
            <i class="fa-solid fa-copy"></i>
          </button>
        </div>
      </td>
    </motion.tr>
  );
}