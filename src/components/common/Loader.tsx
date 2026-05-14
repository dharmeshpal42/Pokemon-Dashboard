import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader: React.FC = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-pokemon-red" />
    </div>
  );
};
