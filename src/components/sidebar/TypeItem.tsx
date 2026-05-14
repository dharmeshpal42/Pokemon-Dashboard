import React, { memo } from 'react';
import { TYPE_COLORS } from '../../utils/constants';
import { classNames } from '../../utils/helpers';

interface TypeItemProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

const TypeItemComponent: React.FC<TypeItemProps> = ({ type, isActive, onClick }) => {
  const typeKey = type.toLowerCase();
  const bgColor = TYPE_COLORS[typeKey] || 'bg-gray-400';

  return (
    <button
      onClick={onClick}
      className={classNames(
        'group relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-6 py-4 text-sm font-black tracking-tight transition-all duration-300',
        isActive
          ? 'bg-pokemon-red text-white shadow-xl shadow-pokemon-red/40 -translate-y-0.5'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:-translate-y-0.5'
      )}
    >
      <div className="relative flex items-center space-x-4 z-10">
        {type !== 'all' && (
          <span
            className={classNames(
              'h-3.5 w-3.5 rounded-full shadow-sm transition-all duration-300 group-hover:scale-125',
              isActive ? 'bg-white' : bgColor
            )}
          />
        )}
        <span className="capitalize">{type}</span>
      </div>
      {isActive && (
        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  );
};

export const TypeItem = memo(TypeItemComponent);
