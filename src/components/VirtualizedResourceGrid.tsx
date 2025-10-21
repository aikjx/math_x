import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Website } from '@/lib/data/types';
import OptimizedWebsiteCard from './OptimizedWebsiteCard';

interface VirtualizedResourceGridProps {
  websites: Website[];
  itemsPerRow?: number;
  itemHeight?: number;
  containerHeight?: number;
}

const VirtualizedResourceGrid: React.FC<VirtualizedResourceGridProps> = ({
  websites,
  itemsPerRow = 3,
  itemHeight = 200,
  containerHeight = 600
}) => {
  const [containerWidth, setContainerWidth] = useState(1200);

  // 响应式列数
  const columnsCount = useMemo(() => {
    if (containerWidth < 768) return 1;
    if (containerWidth < 1024) return 2;
    return itemsPerRow;
  }, [containerWidth, itemsPerRow]);

  const itemWidth = useMemo(() => 
    Math.floor(containerWidth / columnsCount) - 16, 
    [containerWidth, columnsCount]
  );

  const rowCount = Math.ceil(websites.length / columnsCount);

  // 网格项渲染器
  const GridItem = useCallback(({ columnIndex, rowIndex, style }: any) => {
    const itemIndex = rowIndex * columnsCount + columnIndex;
    const website = websites[itemIndex];

    if (!website) {
      return <div style={style} />;
    }

    return (
      <div style={{ ...style, padding: '8px' }}>
        <OptimizedWebsiteCard website={website} isVisible={true} />
      </div>
    );
  }, [websites, columnsCount]);

  // 监听容器宽度变化
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('resource-grid-container');
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (websites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <i className="mb-4 text-6xl text-gray-400 fa-solid fa-search"></i>
        <h3 className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-300">
          没有找到匹配的资源
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          尝试调整筛选条件或搜索关键词
        </p>
      </div>
    );
  }

  return (
    <div id="resource-grid-container" className="w-full">
      <Grid
        columnCount={columnsCount}
        columnWidth={itemWidth}
        height={Math.min(containerHeight, rowCount * itemHeight)}
        rowCount={rowCount}
        rowHeight={itemHeight}
        width={containerWidth}
        style={{ margin: '0 auto' }}
      >
        {GridItem}
      </Grid>
    </div>
  );
};

export default VirtualizedResourceGrid;