import React, { useState, useMemo } from 'react';
import { MathResourceManager } from '../lib/data/dataManager';
import { Website } from '../lib/data/types';

interface FilterOptions {
  category: string;
  minRating: number;
  searchQuery: string;
  userLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
}

const MathResourceDashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minRating: 0,
    searchQuery: '',
    userLevel: 'intermediate'
  });
  const [activeView, setActiveView] = useState<'overview' | 'resources' | 'stats' | 'recommendations'>('overview');

  // 获取数据
  const allResources = useMemo(() => MathResourceManager.getAllWebsites(), []);
  const stats = useMemo(() => MathResourceManager.getResourceStats(), []);
  const newResourcesOverview = useMemo(() => MathResourceManager.getNewResourcesOverview(), []);
  
  // 过滤资源
  const filteredResources = useMemo(() => {
    let resources = allResources;
    
    if (filters.searchQuery) {
      resources = MathResourceManager.searchResources(filters.searchQuery);
    }
    
    if (filters.category !== 'all') {
      resources = resources.filter(r => r.category === filters.category);
    }
    
    if (filters.minRating > 0) {
      resources = resources.filter(r => r.rating >= filters.minRating);
    }
    
    return resources.sort((a, b) => b.rating - a.rating);
  }, [allResources, filters]);

  // 获取推荐资源
  const recommendations = useMemo(() => 
    MathResourceManager.getRecommendedResources(filters.userLevel), 
    [filters.userLevel]
  );

  // 获取所有类别
  const categories = useMemo(() => 
    [...new Set(allResources.map(r => r.category))].sort(), 
    [allResources]
  );

  const renderResourceCard = (resource: Website) => (
    <div key={resource.id} className="p-6 transition-shadow bg-white border-l-4 border-blue-500 rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <h3 className="flex-1 mr-2 text-lg font-semibold text-gray-800">{resource.name}</h3>
        <div className="flex flex-col items-end">
          <span className="px-2 py-1 mb-1 text-xs text-blue-800 bg-blue-100 rounded-full">
            {resource.category}
          </span>
          <div className="flex items-center">
            <span className="text-sm text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-600">{resource.rating}</span>
          </div>
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{resource.description}</p>
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        访问网站
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* 总体统计 */}
      <div className="p-6 text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
        <h2 className="mb-4 text-2xl font-bold">📊 数学资源总览</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.totalResources}</div>
            <div className="text-sm opacity-90">总资源数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.totalCategories}</div>
            <div className="text-sm opacity-90">资源类别</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.averageRating}</div>
            <div className="text-sm opacity-90">平均评分</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{Object.keys(newResourcesOverview).length}</div>
            <div className="text-sm opacity-90">新增模块</div>
          </div>
        </div>
      </div>

      {/* 新增资源模块 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">🚀 新增资源模块</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(newResourcesOverview).map(([key, module]) => (
            <div key={key} className="p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{module.name}</h3>
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                  {module.count} 个资源
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-600">{module.description}</p>
              <button 
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'all', searchQuery: '' }));
                  setActiveView('resources');
                }}
                className="text-sm font-medium text-green-600 hover:text-green-800"
              >
                查看资源 →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 热门类别 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">📈 热门资源类别</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.categoryStats.slice(0, 9).map((category, index) => (
            <div key={category.name} className="p-4 transition-shadow bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                 onClick={() => {
                   setFilters(prev => ({ ...prev, category: category.name }));
                   setActiveView('resources');
                 }}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">{category.name}</h3>
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                  {category.count}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-yellow-500">★</span>
                <span className="ml-1 text-sm text-gray-600">{category.avgRating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📊 详细统计</h2>
      
      {/* 类别统计表格 */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-semibold">资源类别统计</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">类别</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">资源数量</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">平均评分</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">占比</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.categoryStats.map((category, index) => (
                <tr key={category.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {category.count}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-1 text-yellow-500">★</span>
                      {category.avgRating}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {((category.count / stats.totalResources) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">数学资源管理系统</h1>
            </div>
            <div className="flex items-center space-x-4">
              {['overview', 'resources', 'stats', 'recommendations'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view as any)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === view
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {view === 'overview' && '概览'}
                  {view === 'resources' && '资源'}
                  {view === 'stats' && '统计'}
                  {view === 'recommendations' && '推荐'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* 过滤器 */}
        {(activeView === 'resources' || activeView === 'recommendations') && (
          <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">搜索</label>
                <input
                  type="text"
                  placeholder="搜索资源..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">类别</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">所有类别</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">最低评分</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>所有评分</option>
                  <option value={4.0}>4.0+ ★</option>
                  <option value={4.5}>4.5+ ★</option>
                  <option value={4.8}>4.8+ ★</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">用户水平</label>
                <select
                  value={filters.userLevel}
                  onChange={(e) => setFilters(prev => ({ ...prev, userLevel: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">初学者</option>
                  <option value="intermediate">进阶者</option>
                  <option value="advanced">高级用户</option>
                  <option value="professional">专业人士</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 内容区域 */}
        {activeView === 'overview' && renderOverview()}
        
        {activeView === 'resources' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                数学资源 ({filteredResources.length})
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map(renderResourceCard)}
            </div>
          </div>
        )}

        {activeView === 'stats' && renderStats()}

        {activeView === 'recommendations' && (
          <div>
            <h2 className="mb-6 text-2xl font-bold">
              为 {filters.userLevel === 'beginner' ? '初学者' : 
                   filters.userLevel === 'intermediate' ? '进阶者' :
                   filters.userLevel === 'advanced' ? '高级用户' : '专业人士'} 推荐
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map(renderResourceCard)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MathResourceDashboard;