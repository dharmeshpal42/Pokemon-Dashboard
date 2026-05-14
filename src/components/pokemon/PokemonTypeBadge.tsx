import React from 'react';
import { TYPE_COLORS } from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import { capitalize as cap } from '../../utils/formatters';

interface PokemonTypeBadgeProps {
  type: string;
}

export const PokemonTypeBadge: React.FC<PokemonTypeBadgeProps> = ({ type }) => {
  const bgColor = TYPE_COLORS[type.toLowerCase()] || 'bg-gray-400';

  return (
    <span
      className={classNames(
        bgColor,
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm'
      )}
    >
      {cap(type)}
    </span>
  );
};
