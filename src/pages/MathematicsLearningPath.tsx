import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { learningPaths } from '@/lib/data';

export default function MathematicsLearningPath() {
  const [activeStage, setActiveStage] = useState('all');
  const [progress, setProgress] = useState<Record<string, number>>({});
  
  // Initialize progress state on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Set initial progress to 0 for all stages
      const initialProgress: Record<string, number> = {};
      learningPaths.forEach(stage => {
        initialProgress[stage.id.toString()] = 0;
      });
      setProgress(initialProgress);
    }
  }, []);
  
  // Filter stages based on active selection
  const filteredStages = activeStage === 'all' 
    ? learningPaths 
    : learningPaths.filter(stage => stage.educationStage === activeStage);
  
  // Get unique education stages for filtering
  // 按初级到大师级的顺序排列阶段
  const stages = ['all', '初级', '中级', '高级', '专业级', '大师级'];
  
  // Handle progress update
  const updateProgress = (stageId: number, newProgress: number) => {
    const updatedProgress = { ...progress };
    updatedProgress[stageId.toString()] = Math.max(0, Math.min(100, newProgress));
    setProgress(updatedProgress);
    localStorage.setItem('learningProgress', JSON.stringify(updatedProgress));
  };
  
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
 初级 到 大师
        <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          从小学到大学的完整数学学习指南，系统掌握数学知识体系，循序渐进提升数学能力
        </p>
      </header>
      
      <div className="p-4 mb-8 border-l-4 rounded-r-lg bg-amber-50 dark:bg-amber-900/20 border-amber-500">
        <div className="flex">
          <div className="flex-shrink-0">
            <i class="fa-solid fa-road text-amber-500"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              本学习路径按照教育阶段和难度级别系统组织数学知识，每个阶段包含核心知识点、推荐学习资源和实践项目，帮助你构建完整的数学知识体系。
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200 md:mb-0">学习阶段导航</h2>
        
        <div className="flex flex-wrap gap-2">
          {stages.map(stage => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeStage === stage 
                  ? "bg-amber-600 text-white hover:bg-amber-700" 
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              {stage === 'all' ? '全部阶段' : stage}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-12">
        {filteredStages.map((stage) => (
          <motion.div 
            key={stage.id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-md dark:bg-gray-800 rounded-xl hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stage.id * 0.1 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="mr-3 text-2xl font-bold text-gray-900 dark:text-white">{stage.title}</h3>
                    <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {stage.educationStage}
                    </span>
                  </div>
                  <p className="max-w-3xl text-gray-600 dark:text-gray-300">{stage.description}</p>
                </div>
                
                <div className="w-full mt-4 md:mt-0 md:w-auto">
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">学习进度</span>
                    <div className="w-full md:w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-amber-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress[stage.id.toString()] || 0}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {progress[stage.id.toString()] || 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                 <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                   <i class="fa-solid fa-bullseye text-amber-500 mr-2"></i>
                   学习目标
                 </h4>
                 
                 <div className="mb-6">
                   <ul className="pl-5 space-y-2 text-gray-600 list-disc dark:text-gray-300">
                     {stage.learningObjectives?.map((objective, index) => (
                       <li key={index}>{objective}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                   <i class="fa-solid fa-list-checks text-amber-500 mr-2"></i>
                   核心学习内容
                 </h4>
                 
                 <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                   {stage.coreTopics.map((topic, index) => (
                     <div 
                       key={index}
                       className="flex flex-col p-4 transition-shadow rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:shadow-md"
                     >
                       <div className="flex items-start mb-2">
                         <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3 mt-0.5">
                           <i class="fa-solid fa-check text-amber-600 dark:text-amber-400 text-xs"></i>
                         </div>
                         <h5 className="text-sm font-medium text-gray-900 dark:text-white">{topic.title}</h5>
                       </div>
                       <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                         {topic.description}
                       </p>
                       
                       {topic.keyPoints && (
                         <div className="mt-3">
                           <h6 className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">重点掌握：</h6>
                           <ul className="pl-5 space-y-1 text-xs text-gray-600 list-disc dark:text-gray-400">
                             {topic.keyPoints.map((point, key) => (
                               <li key={key}>{point}</li>
                             ))}
                           </ul>
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
                 
                 {/* 学习挑战与解决方法 */}
                 {stage.keyChallenges && (
                   <div className="mb-8">
                     <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                       <i class="fa-solid fa-exclamation-triangle text-amber-500 mr-2"></i>
                       学习挑战与解决方法
                     </h4>
                     
                     <div className="mt-3 space-y-4">
                       {stage.keyChallenges.map((item, index) => (
                         <div key={index} className="p-4 border-l-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-500">
                           <h5 className="mb-1 text-sm font-medium text-amber-800 dark:text-amber-200">{item.challenge}</h5>
                           <p className="text-sm text-amber-700 dark:text-amber-300">{item.solution}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
                 
                 {/* 应用案例 */}
                 {stage.applicationCases && (
                   <div className="mb-8">
                     <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                       <i class="fa-solid fa-lightbulb text-amber-500 mr-2"></i>
                       实际应用案例
                     </h4>
                     
                     <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2">
                       {stage.applicationCases.map((caseItem, index) => (
                         <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                           <i class="fa-solid fa-check-circle text-green-500 mr-2"></i>
                           <span className="text-sm text-gray-700 dark:text-gray-300">{caseItem}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
              </div>
              
              <div className="mb-8">
                 <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                   <i class="fa-solid fa-graduation-cap text-amber-500 mr-2"></i>
                   推荐学习资源
                 </h4>
                 
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                   {stage.recommendedResources.map((resource, index) => (
                     <a
                       key={index}
                       href={resource.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="block p-4 transition-colors border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
                     >
                       <div className="flex items-start justify-between mb-2">
                         <h5 className="text-sm font-medium text-gray-900 dark:text-white">{resource.name}</h5>
                         {resource.type && (
                           <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-1.5 py-0.5 rounded-full">
                             {resource.type}
                           </span>
                         )}
                       </div>
                       <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">{resource.description}</p>
                       <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                         <i class="fa-solid fa-external-link mr-1"></i>
                         <span>访问资源</span>
                       </div>
                     </a>
                   ))}
                 </div>
                 
                 {/* 学习评估方法 */}
                 {stage.assessmentMethods && (
                   <div className="mt-8">
                     <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                       <i class="fa-solid fa-check-square text-amber-500 mr-2"></i>
                       学习评估方法
                     </h4>
                     
                     <div className="space-y-3">
                       {stage.assessmentMethods.map((method, index) => (
                         <div key={index} className="flex items-start">
                           <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 mt-0.5">
                             <i class="fa-solid fa-check text-green-600 dark:text-green-400 text-xs"></i>
                           </div>
                           <div>
                             <h5 className="text-sm font-medium text-gray-900 dark:text-white">{method.type}</h5>
                             <p className="text-xs text-gray-600 dark:text-gray-400">
                               {method.description}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
              </div>
              
              <div className="flex flex-col items-start justify-between pt-6 border-t border-gray-200 dark:border-gray-700 sm:flex-row sm:items-center">
                <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
                  <i class="fa-solid fa-clock mr-2 text-amber-500"></i>
                  <span>预计学习时间: {stage.estimatedHours}小时</span>
                  <span className="mx-2">•</span>
                  <i class="fa-solid fa-signal mr-2 text-amber-500"></i>
                  <span>难度: {stage.difficulty}</span>
                </div>
                
                <button
                  onClick={() => {
                    // Update progress to 100% when "Mark as completed" is clicked
                    updateProgress(stage.id, 100);
                  }}
                  disabled={progress[stage.id.toString()] === 100}
                  className={cn(
                    "inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium transition-colors",
                    progress[stage.id.toString()] === 100
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed"
                      : "bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  )}
                >
                  {progress[stage.id.toString()] === 100 ? (
                    <>
                      <i class="fa-solid fa-check-circle mr-2"></i>已完成学习
                    </>
                  ) : (
                    <>
                      <i class="fa-solid fa-check mr-2"></i>标记为已学习
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-6 mt-16 bg-white shadow-md dark:bg-gray-800 rounded-xl md:p-8">
        <h3 className="mb-6 text-xl font-semibold text-center text-gray-900 dark:text-white">数学学习路径图</h3>
        
        <div className="relative">
          {/* Timeline connector line */}
          <div className="absolute left-0 right-0 z-0 h-1 transform -translate-y-1/2 top-1/2 bg-amber-200 dark:bg-amber-800"></div>
          
          <div className="relative z-10 flex justify-between">
            {learningPaths.map((stage, index) => (
               <motion.div
                key={stage.educationStage}
                className="flex flex-col items-center w-20 cursor-pointer"
                onClick={() => setActiveStage(stage.educationStage)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2 text-white font-bold text-lg",
                    activeStage === stage.educationStage || activeStage === 'all'
                      ? "bg-amber-600 shadow-lg"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-center text-gray-700 dark:text-gray-300">{stage.shortTitle}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-300">完成所有学习阶段，构建完整的数学知识体系</p>
          <button
            onClick={() => {
              // Reset all progress
              const resetProgress: Record<string, number> = {};
              learningPaths.forEach(stage => {
                resetProgress[stage.id.toString()] = 0;
              });
              setProgress(resetProgress);
              localStorage.setItem('learningProgress', JSON.stringify(resetProgress));
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors border border-transparent rounded-lg shadow-sm text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
          >
            <i class="fa-solid fa-refresh mr-2"></i>
            重置学习进度
          </button>
        </div>
      </div>
    </div>
  );
}