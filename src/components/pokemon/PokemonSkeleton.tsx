import React from 'react';

interface PokemonSkeletonProps {
  viewMode: 'grid' | 'list';
}

export const PokemonSkeleton: React.FC<PokemonSkeletonProps> = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex animate-pulse items-center space-x-4 rounded-lg bg-white p-4 shadow-sm">
        <div className="h-16 w-16 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-3 w-1/3 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex animate-pulse flex-col items-center rounded-xl bg-white p-6 shadow-sm">
      <div className="h-32 w-32 rounded-full bg-gray-200 mb-4"></div>
      <div className="h-4 w-2/3 rounded bg-gray-200 mb-2"></div>
      <div className="h-3 w-1/2 rounded bg-gray-200"></div>
    </div>
  );
};
