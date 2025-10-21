import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Website {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  rating: number;
}

interface WebsiteCardProps {
  website: Website;
}

export default function WebsiteCard({ website }: WebsiteCardProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-2">{website.name}</h3>
            <span className="flex items-center text-green-600 dark:text-green-400 text-xs">
              <i class="fa-solid fa-check-circle mr-1"></i>已验证
            </span>
          </div>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {website.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{website.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
            <span className="text-sm text-gray-500 dark:text-gray-400">{website.rating.toFixed(1)}</span>
          </div>
          
          <a 
            href={website.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            访问网站
            <i class="fa-solid fa-external-link ml-2 text-xs"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
}