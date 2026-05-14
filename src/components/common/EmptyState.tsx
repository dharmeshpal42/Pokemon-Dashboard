import React from 'react';
import { Ghost } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No Pokémon found.' }) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center text-gray-500">
      <Ghost className="h-16 w-16 opacity-20" />
      <p className="text-lg">{message}</p>
    </div>
  );
};
