import React from 'react';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import { classNames } from '../../utils/helpers';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onToggle: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center space-x-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
      <button
        onClick={() => onToggle('grid')}
        className={classNames(
          'rounded-md p-1.5 transition-colors',
          viewMode === 'grid'
            ? 'bg-gray-100 text-pokemon-red'
            : 'text-gray-400 hover:text-gray-600'
        )}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
      <button
        onClick={() => onToggle('list')}
        className={classNames(
          'rounded-md p-1.5 transition-colors',
          viewMode === 'list'
            ? 'bg-gray-100 text-pokemon-red'
            : 'text-gray-400 hover:text-gray-600'
        )}
        aria-label="List view"
      >
        <ListIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
