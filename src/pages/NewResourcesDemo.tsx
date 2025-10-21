import React, { useState } from 'react';
import { 
  modernMathResources, 
  advancedMathTools, 
  mathCommunities, 
  chineseMathResources, 
  emergingMathFields,
  resourceStats,
  featuredResources,
  learningPathSuggestions
} from '../lib/data';

const NewResourcesDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '资源概览', count: resourceStats.totalResources },
    { id: 'modern', label: '现代工具', count: modernMathResources.length },
    { id: 'advanced', label: '专业软件', count: advancedMathTools.length },
    { id: 'communities', label: '学术社区', count: mathCommunities.length },
    { id: 'chinese', label: '中文资源', count: chineseMathResources.length },
    { id: 'emerging', label: '前沿领域', count: emergingMathFields.length }
  ];

  const renderResourceCard = (resource: any) => (
    <div key={resource.id} className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
        <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
          {resource.category}
        </span>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{resource.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm text-gray-600">{resource.rating}</span>
        </div>
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          访问网站 →
        </a>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* 统计信息 */}
      <div className="p-6 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
        <h2 className="mb-4 text-2xl font-bold">📊 资源统计</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold">{resourceStats.totalResources}</div>
            <div className="text-sm opacity-90">总资源数</div>
          </div>
          {Object.entries(resourceStats.categories).map(([key, category]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold">{category.count}</div>
              <div className="text-xs opacity-90">{category.description.split('，')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 精选推荐 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">⭐ 精选推荐</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResources.map((resource, index) => (
            <div key={index} className="p-6 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{resource.name}</h3>
              <span className="inline-block px-2 py-1 mb-3 text-xs text-green-800 bg-green-100 rounded-full">
                {resource.category}
              </span>
              <p className="text-sm text-gray-600">{resource.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 学习路径建议 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">🎯 学习路径建议</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(learningPathSuggestions).map(([key, path]) => (
            <div key={key} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">{path.title}</h3>
              <ul className="space-y-2">
                {path.resources.map((resource, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResourceList = (resources: any[]) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map(renderResourceCard)}
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            🚀 最新数学学习资源大全
          </h1>
          <p className="text-lg text-gray-600">
            收集了 {resourceStats.totalResources} 个最新最好的数学学习资源，涵盖从基础到前沿的各个领域
          </p>
        </div>

        {/* 标签页导航 */}
        <div className="flex flex-wrap justify-center p-2 mb-8 bg-white rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 mx-1 my-1 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="mb-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'modern' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">🔧 现代数学学习工具</h2>
              <p className="mb-6 text-gray-600">包括AI驱动的学习工具、互动平台、移动应用等现代化数学学习资源</p>
              {renderResourceList(modernMathResources)}
            </div>
          )}
          {activeTab === 'advanced' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">⚙️ 专业数学软件</h2>
              <p className="mb-6 text-gray-600">高级数学计算软件、符号计算系统、数值分析工具等专业级平台</p>
              {renderResourceList(advancedMathTools)}
            </div>
          )}
          {activeTab === 'communities' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">🌐 数学学术社区</h2>
              <p className="mb-6 text-gray-600">全球数学研究社区、学术期刊、问答平台和专业组织</p>
              {renderResourceList(mathCommunities)}
            </div>
          )}
          {activeTab === 'chinese' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">🇨🇳 中文数学资源</h2>
              <p className="mb-6 text-gray-600">专为中文用户收集的优质数学学习资源，包括课程、工具、社区等</p>
              {renderResourceList(chineseMathResources)}
            </div>
          )}
          {activeTab === 'emerging' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">🚀 新兴数学领域</h2>
              <p className="mb-6 text-gray-600">前沿数学研究方向，包括机器学习数学、量子计算、区块链数学等</p>
              {renderResourceList(emergingMathFields)}
            </div>
          )}
        </div>

        {/* 页脚信息 */}
        <div className="text-sm text-center text-gray-500">
          <p>💡 提示：点击"访问网站"可以直接跳转到相应的学习资源</p>
          <p className="mt-2">📅 资源更新时间：2024年8月 | 总计 {resourceStats.totalResources} 个优质资源</p>
        </div>
      </div>
    </div>
  );
};

export default NewResourcesDemo;