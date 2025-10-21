import React, { memo } from 'react';
import { Website } from '@/lib/data/types';

interface OptimizedWebsiteCardProps {
  website: Website;
  isVisible?: boolean;
}

const OptimizedWebsiteCard = memo(({ website, isVisible = true }: OptimizedWebsiteCardProps) => {
  // 懒加载优化：只有在可见时才渲染完整内容
  if (!isVisible) {
    return (
      <div className="h-48 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse">
        <div className="p-6">
          <div className="h-4 mb-2 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-3 mb-4 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="w-3/4 h-3 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg dark:border-gray-700 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
            {website.name}
          </h3>
          <div className="flex flex-col items-end ml-2">
            <span className="inline-flex items-center px-2 py-1 mb-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
              {website.category}
            </span>
            <div className="flex items-center">
              <span className="text-sm text-yellow-500">★</span>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                {website.rating}
              </span>
            </div>
          </div>
        </div>
        
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {website.description}
        </p>
        
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          onClick={(e) => e.stopPropagation()}
        >
          访问网站
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
});

OptimizedWebsiteCard.displayName = 'OptimizedWebsiteCard';

export default OptimizedWebsiteCard;