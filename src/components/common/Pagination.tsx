import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5 py-12 border-t border-gray-100/50 mt-10">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-gray-400 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] ring-1 ring-gray-200/50 transition-all hover:bg-pokemon-red hover:text-white hover:ring-pokemon-red disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-400 disabled:hover:ring-gray-200/50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div className="flex items-center space-x-2 tabular-nums">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex h-9 min-w-[36px] sm:h-11 sm:min-w-[44px] items-center justify-center rounded-xl sm:rounded-2xl px-2 sm:px-3 text-xs sm:text-sm font-black transition-all duration-300 ${
                currentPage === page
                  ? 'bg-pokemon-red text-white shadow-xl shadow-pokemon-red/30 ring-1 ring-pokemon-red scale-105 sm:scale-110 z-10'
                  : 'bg-white text-gray-500 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] ring-1 ring-gray-200/50 hover:bg-gray-50 hover:text-pokemon-red hover:ring-pokemon-red/20'
              }`}
            >
              {page}
            </button>
          ))}
          
          {totalPages > 5 && getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <div className="flex items-center space-x-2">
              <span className="w-6 text-center text-gray-300 font-black tracking-widest">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className="flex h-11 min-w-[44px] items-center justify-center rounded-2xl bg-white px-3 text-sm font-black text-gray-500 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] ring-1 ring-gray-200/50 transition-all hover:bg-gray-50 hover:text-pokemon-red hover:ring-pokemon-red/20"
              >
                {totalPages}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-gray-400 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] ring-1 ring-gray-200/50 transition-all hover:bg-pokemon-red hover:text-white hover:ring-pokemon-red disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-gray-400 disabled:hover:ring-gray-200/50"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-[0.2em] text-gray-300 tabular-nums">
        <span>Showing</span>
        <span className="text-gray-900">{(currentPage - 1) * pageSize + 1}</span>
        <span className="text-gray-400">to</span>
        <span className="text-gray-900">{Math.min(currentPage * pageSize, totalCount)}</span>
        <span className="text-gray-400">of</span>
        <span className="text-gray-900 font-black">{totalCount}</span>
        <span>Pokémon</span>
      </div>
    </div>
  );
};
