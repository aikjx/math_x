import React from 'react';
import MathFormula from './MathFormula';

interface MathDisplayProps {
  formula: string;
  title?: string;
  description?: string;
  inline?: boolean;
  className?: string;
}

export default function MathDisplay({ 
  formula, 
  title, 
  description, 
  inline = false, 
  className = '' 
}: MathDisplayProps) {
  return (
    <div className={`math-display ${className}`}>
      {title && (
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      
      <div className="mb-4">
        <MathFormula formula={formula} inline={inline} />
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}