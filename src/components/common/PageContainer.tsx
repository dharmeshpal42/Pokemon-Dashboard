import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
      {children}
    </div>
  );
};
