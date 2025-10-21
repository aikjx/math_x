import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  type: 'symbol' | 'formula' | 'concept' | 'exercise';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  relevanceScore: number;
  estimatedTime: number; // 分钟
  prerequisites?: string[];
  relatedItems?: string[];
}

interface UserProfile {
  completedItems: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  learningGoals: string[];
  timePreference: number; // 每日学习时间（分钟）
  weakAreas: string[];
  strongAreas: string[];
}

interface SmartRecommendationProps {
  items: RecommendationItem[];
  userProfile: UserProfile;
  maxRecommendations?: number;
  className?: string;
  onItemClick?: (item: RecommendationItem) => void;
  onFeedback?: (itemId: string, feedback: 'like' | 'dislike' | 'completed') => void;
}

export default function SmartRecommendation({
  items,
  userProfile,
  maxRecommendations = 6,
  className = "",
  onItemClick,
  onFeedback
}: SmartRecommendationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showExplanation, setShowExplanation] = useState(false);

  // 推荐算法
  const recommendations = useMemo(() => {
    const scoredItems = items
      .filter(item => !userProfile.completedItems.includes(item.id))
      .map(item => {
        let score = 0;

        // 1. 难度匹配 (权重: 25%)
        const difficultyMatch = item.difficulty === userProfile.currentLevel ? 1.0 :
          (userProfile.currentLevel === 'beginner' && item.difficulty === 'intermediate') ? 0.7 :
          (userProfile.currentLevel === 'intermediate' && item.difficulty === 'beginner') ? 0.8 :
          (userProfile.currentLevel === 'intermediate' && item.difficulty === 'advanced') ? 0.6 :
          (userProfile.currentLevel === 'advanced' && item.difficulty === 'intermediate') ? 0.9 : 0.3;
        score += difficultyMatch * 0.25;

        // 2. 兴趣匹配 (权重: 20%)
        const interestMatch = userProfile.interests.some(interest =>
          item.tags.includes(interest) || item.category === interest
        ) ? 1.0 : 0.0;
        score += interestMatch * 0.20;

        // 3. 学习目标匹配 (权重: 15%)
        const goalMatch = userProfile.learningGoals.some(goal =>
          item.tags.includes(goal) || item.category === goal
        ) ? 1.0 : 0.0;
        score += goalMatch * 0.15;

        // 4. 时间匹配 (权重: 10%)
        const timeMatch = item.estimatedTime <= userProfile.timePreference ? 1.0 :
          item.estimatedTime <= userProfile.timePreference * 1.5 ? 0.7 : 0.3;
        score += timeMatch * 0.10;

        // 5. 弱项补强 (权重: 15%)
        const weakAreaBonus = userProfile.weakAreas.some(area =>
          item.category === area || item.tags.includes(area)
        ) ? 1.0 : 0.0;
        score += weakAreaBonus * 0.15;

        // 6. 前置条件检查 (权重: 10%)
        const prerequisitesMet = !item.prerequisites || 
          item.prerequisites.every(prereq => userProfile.completedItems.includes(prereq));
        score += prerequisitesMet ? 0.10 : 0.0;

        // 7. 基础相关性分数 (权重: 5%)
        score += item.relevanceScore * 0.05;

        return { ...item, finalScore: score };
      })
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, maxRecommendations);

    return scoredItems;
  }, [items, userProfile, maxRecommendations]);

  // 获取分类
  const categories = useMemo(() => {
    const cats = Array.from(new Set(recommendations.map(item => item.category)));
    return ['all', ...cats];
  }, [recommendations]);

  // 过滤推荐
  const filteredRecommendations = useMemo(() => {
    if (selectedCategory === 'all') return recommendations;
    return recommendations.filter(item => item.category === selectedCategory);
  }, [recommendations, selectedCategory]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'symbol': return 'fa-solid fa-at';
      case 'formula': return 'fa-solid fa-calculator';
      case 'concept': return 'fa-solid fa-lightbulb';
      case 'exercise': return 'fa-solid fa-dumbbell';
      default: return 'fa-solid fa-book';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'symbol': return '符号';
      case 'formula': return '公式';
      case 'concept': return '概念';
      case 'exercise': return '练习';
      default: return '其他';
    }
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ${className}`}>
      {/* 标题和说明 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            智能推荐
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            基于您的学习进度和偏好为您推荐合适的内容
          </p>
        </div>
        
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="查看推荐算法说明"
        >
          <i className="fa-solid fa-info-circle"></i>
        </button>
      </div>

      {/* 推荐算法说明 */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20"
          >
            <h4 className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-200">
              推荐算法说明
            </h4>
            <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
              <div>• 难度匹配 (25%): 根据您的当前水平推荐合适难度的内容</div>
              <div>• 兴趣匹配 (20%): 基于您的兴趣标签进行推荐</div>
              <div>• 学习目标 (15%): 与您的学习目标相关的内容</div>
              <div>• 弱项补强 (15%): 重点推荐您需要加强的领域</div>
              <div>• 时间匹配 (10%): 符合您的学习时间偏好</div>
              <div>• 前置条件 (10%): 确保您已掌握必要的前置知识</div>
              <div>• 基础相关性 (5%): 内容本身的质量和相关性</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? '全部' : category}
          </button>
        ))}
      </div>

      {/* 推荐列表 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecommendations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 transition-shadow border border-gray-200 rounded-lg hover:shadow-md dark:border-gray-700 dark:hover:border-gray-600"
          >
            {/* 头部信息 */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <i className={`${getTypeIcon(item.type)} text-blue-600 dark:text-blue-400`}></i>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {getTypeText(item.type)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty)}`}>
                  {getDifficultyText(item.difficulty)}
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(item.finalScore * 100)}%
                </div>
              </div>
            </div>

            {/* 标题和描述 */}
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
              {item.title}
            </h4>
            <p className="mb-3 text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
              {item.description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>

            {/* 底部信息 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <i className="mr-1 fa-solid fa-clock"></i>
                  {item.estimatedTime}分钟
                </span>
                {item.prerequisites && item.prerequisites.length > 0 && (
                  <span className="flex items-center">
                    <i className="mr-1 fa-solid fa-link"></i>
                    {item.prerequisites.length}个前置
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onItemClick?.(item)}
                  className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                >
                  开始学习
                </button>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => onFeedback?.(item.id, 'like')}
                    className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                    title="喜欢"
                  >
                    <i className="text-xs fa-solid fa-thumbs-up"></i>
                  </button>
                  <button
                    onClick={() => onFeedback?.(item.id, 'dislike')}
                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    title="不喜欢"
                  >
                    <i className="text-xs fa-solid fa-thumbs-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredRecommendations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <i className="mb-4 text-5xl text-gray-400 fa-solid fa-robot"></i>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            暂无推荐内容
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            请完善您的学习档案以获得更好的推荐
          </p>
        </div>
      )}

      {/* 刷新推荐 */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <i className="mr-2 fa-solid fa-refresh"></i>
          刷新推荐
        </button>
      </div>
    </div>
  );
}

// 推荐项目卡片组件
export function RecommendationCard({ 
  item, 
  onItemClick, 
  onFeedback,
  className = ""
}: {
  item: RecommendationItem & { finalScore: number };
  onItemClick?: (item: RecommendationItem) => void;
  onFeedback?: (itemId: string, feedback: 'like' | 'dislike' | 'completed') => void;
  className?: string;
}) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round(item.finalScore * 100)}%
        </span>
      </div>
      
      <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
        {item.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{item.estimatedTime}分钟</span>
          <span className={`px-2 py-1 rounded-full ${
            item.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            item.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {item.difficulty === 'beginner' ? '初级' :
             item.difficulty === 'intermediate' ? '中级' : '高级'}
          </span>
        </div>
        
        <button
          onClick={() => onItemClick?.(item)}
          className="px-3 py-1 text-xs text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          学习
        </button>
      </div>
    </div>
  );
}
