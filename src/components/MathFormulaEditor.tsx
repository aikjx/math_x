import React, { useState, useRef, useEffect } from 'react';
import MathFormula from './MathFormula';

interface MathFormulaEditorProps {
  onFormulaChange?: (formula: string) => void;
  initialFormula?: string;
  className?: string;
}

export default function MathFormulaEditor({ 
  onFormulaChange, 
  initialFormula = '', 
  className = '' 
}: MathFormulaEditorProps) {
  const [formula, setFormula] = useState(initialFormula);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (onFormulaChange) {
      onFormulaChange(formula);
    }
  }, [formula, onFormulaChange]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormula(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className={`math-formula-editor ${className}`}>
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            ref={textareaRef}
            value={formula}
            onChange={handleFormulaChange}
            onKeyDown={handleKeyDown}
            className="w-full p-3 font-mono text-sm border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            rows={4}
            placeholder="输入LaTeX公式，例如：\\frac{a}{b} 或 \\vec{F} = m\\vec{a}"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              保存 (Ctrl+Enter)
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              取消 (Esc)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 min-h-[100px] flex items-center justify-center">
            {formula ? (
              <MathFormula formula={formula} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">点击编辑按钮添加数学公式</p>
            )}
          </div>
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
          >
            编辑公式
          </button>
        </div>
      )}
      
      {formula && (
        <div className="p-3 mt-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">LaTeX源码：</p>
          <code className="font-mono text-sm text-gray-800 dark:text-gray-200">
            {formula}
          </code>
        </div>
      )}
    </div>
  );
}