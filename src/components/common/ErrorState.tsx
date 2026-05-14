import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center">
      <AlertCircle className="h-12 w-12 text-red-500" />
      <div className="text-lg font-medium text-gray-900">Oops! Something went wrong</div>
      <p className="text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-pokemon-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
