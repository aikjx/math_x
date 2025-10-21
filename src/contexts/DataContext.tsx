import React, { createContext, useContext, ReactNode } from 'react';

interface DataContextType {
  showMockData: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 始终显示所有数据，不再需要切换功能
  const showMockData = true;

  return (
    <DataContext.Provider value={{ showMockData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};