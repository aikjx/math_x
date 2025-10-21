import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface LearningProgressProps {
  userId?: string;
  topicId: string;
  topicTitle: string;
  totalSteps: number;
  currentStep: number;
  onProgressUpdate?: (progress: number) => void;
}

interface ProgressData {
  topicId: string;
  topicTitle: string;
  currentStep: number;
  totalSteps: number;
  completedAt?: string;
  lastUpdated: string;
  timeSpent: number; // 学习时间（分钟）
}

export default function LearningProgress({
  userId = 'default',
  topicId,
  topicTitle,
  totalSteps,
  currentStep,
  onProgressUpdate
}: LearningProgressProps) {
  const [progress, setProgress] = useState<ProgressData>({
    topicId,
    topicTitle,
    currentStep,
    totalSteps,
    lastUpdated: new Date().toISOString(),
    timeSpent: 0
  });

  const [startTime] = useState(Date.now());

  // 从本地存储加载进度
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${userId}_${topicId}`);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
      } catch (e) {
        console.warn('Failed to parse saved progress:', e);
      }
    }
  }, [userId, topicId]);

  // 保存进度到本地存储
  const saveProgress = (newProgress: ProgressData) => {
    localStorage.setItem(`progress_${userId}_${topicId}`, JSON.stringify(newProgress));
    setProgress(newProgress);
    onProgressUpdate?.(newProgress.currentStep / newProgress.totalSteps);
  };

  // 更新学习进度
  const updateProgress = (step: number) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 60000); // 转换为分钟
    const newProgress: ProgressData = {
      ...progress,
      currentStep: Math.max(step, progress.currentStep), // 只能前进，不能后退
      lastUpdated: new Date().toISOString(),
      timeSpent: progress.timeSpent + timeSpent,
      completedAt: step >= totalSteps ? new Date().toISOString() : undefined
    };

    saveProgress(newProgress);

    if (step >= totalSteps) {
      toast.success(`🎉 恭喜完成《${topicTitle}》的学习！`);
    } else {
      toast.success(`✅ 进度已更新：${step}/${totalSteps}`);
    }
  };

  // 重置进度
  const resetProgress = () => {
    const newProgress: ProgressData = {
      topicId,
      topicTitle,
      currentStep: 0,
      totalSteps,
      lastUpdated: new Date().toISOString(),
      timeSpent: 0
    };
    saveProgress(newProgress);
    toast.info('学习进度已重置');
  };

  const progressPercentage = (progress.currentStep / progress.totalSteps) * 100;
  const isCompleted = progress.currentStep >= progress.totalSteps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          学习进度
        </h3>
        <div className="flex items-center space-x-2">
          {isCompleted && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
              <i className="mr-1 fa-solid fa-check"></i>
              已完成
            </span>
          )}
          <button
            onClick={resetProgress}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="重置进度"
          >
            <i className="fa-solid fa-refresh"></i>
          </button>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {progress.currentStep} / {progress.totalSteps} 步骤
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
          <motion.div
            className={`h-3 rounded-full ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* 学习统计 */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {progress.timeSpent}
          </div>
          <div className="text-gray-600 dark:text-gray-300">学习时长(分钟)</div>
        </div>
        <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {progress.currentStep}
          </div>
          <div className="text-gray-600 dark:text-gray-300">已完成步骤</div>
        </div>
      </div>

      {/* 快速操作按钮 */}
      <div className="flex mt-4 space-x-2">
        <button
          onClick={() => updateProgress(progress.currentStep + 1)}
          disabled={isCompleted}
          className="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCompleted ? '已完成' : '标记下一步完成'}
        </button>
        
        {progress.currentStep > 0 && (
          <button
            onClick={() => updateProgress(progress.currentStep - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            回退一步
          </button>
        )}
      </div>

      {/* 最后更新时间 */}
      {progress.lastUpdated && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          最后更新：{new Date(progress.lastUpdated).toLocaleString('zh-CN')}
        </div>
      )}
    </motion.div>
  );
}

// 学习成就系统
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: ProgressData[]) => boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'first_step',
    title: '初学者',
    description: '完成第一个学习步骤',
    icon: 'fa-solid fa-baby',
    condition: (progress) => progress.some(p => p.currentStep > 0)
  },
  {
    id: 'first_complete',
    title: '完成者',
    description: '完成第一个完整主题',
    icon: 'fa-solid fa-trophy',
    condition: (progress) => progress.some(p => p.completedAt)
  },
  {
    id: 'time_master',
    title: '时间大师',
    description: '累计学习时间超过100分钟',
    icon: 'fa-solid fa-clock',
    condition: (progress) => progress.reduce((total, p) => total + p.timeSpent, 0) >= 100
  },
  {
    id: 'multi_topic',
    title: '博学者',
    description: '同时学习3个不同主题',
    icon: 'fa-solid fa-graduation-cap',
    condition: (progress) => progress.filter(p => p.currentStep > 0).length >= 3
  },
  {
    id: 'speed_learner',
    title: '快速学习者',
    description: '在30分钟内完成一个主题',
    icon: 'fa-solid fa-rocket',
    condition: (progress) => progress.some(p => p.completedAt && p.timeSpent <= 30)
  }
];

// 成就检查 Hook
export function useAchievements(userId: string = 'default') {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);

  const checkAchievements = () => {
    // 获取所有学习进度
    const allProgress: ProgressData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`progress_${userId}_`)) {
        try {
          const progress = JSON.parse(localStorage.getItem(key) || '');
          allProgress.push(progress);
        } catch (e) {
          console.warn('Failed to parse progress:', e);
        }
      }
    }

    // 检查成就
    const newUnlocked: Achievement[] = [];
    achievements.forEach(achievement => {
      const isUnlocked = achievement.condition(allProgress);
      const alreadyUnlocked = unlockedAchievements.some(a => a.id === achievement.id);
      
      if (isUnlocked && !alreadyUnlocked) {
        const unlockedAchievement = {
          ...achievement,
          unlockedAt: new Date().toISOString()
        };
        newUnlocked.push(unlockedAchievement);
        
        // 显示成就通知
        toast.success(
          <div className="flex items-center space-x-3">
            <i className={`text-2xl text-yellow-500 ${achievement.icon}`}></i>
            <div>
              <div className="font-semibold">🏆 获得成就：{achievement.title}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </div>
          </div>,
          { duration: 5000 }
        );
      }
    });

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
      
      // 保存到本地存储
      localStorage.setItem(
        `achievements_${userId}`,
        JSON.stringify([...unlockedAchievements, ...newUnlocked])
      );
    }
  };

  // 加载已解锁的成就
  useEffect(() => {
    const saved = localStorage.getItem(`achievements_${userId}`);
    if (saved) {
      try {
        setUnlockedAchievements(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse achievements:', e);
      }
    }
  }, [userId]);

  return { unlockedAchievements, checkAchievements };
}