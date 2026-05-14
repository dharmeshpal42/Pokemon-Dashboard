import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTypes } from '../../features/types/typeThunks';
import { setSelectedType } from '../../features/pokemon/pokemonSlice';
import { TypeItem } from './TypeItem';
import { Loader2 } from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const dispatch = useAppDispatch();
  const { types, loading } = useAppSelector((state) => state.types);
  const selectedType = useAppSelector((state) => state.pokemon.selectedType);

  useEffect(() => {
    const promise = dispatch(fetchTypes());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const handleTypeSelect = (type: string) => {
    dispatch(setSelectedType(type));
  };

  return (
    <aside className={`h-full bg-white flex flex-col w-full flex-shrink-0 z-30 overflow-y-auto scrollbar-thin ${!isMobile ? 'border-r border-gray-100' : ''}`}>
      {!isMobile && (
        <div className="p-10 pb-12 flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-pokemon-red to-red-600 flex items-center justify-center shadow-2xl shadow-pokemon-red/40">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse"></div>
          <div className="w-4 h-4 rounded-full bg-white border-[3px] border-pokemon-red shadow-inner"></div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
          Poké<span className="text-pokemon-red">Dex</span>
        </h1>
      </div>
      )}
      
      <div className="px-8 flex-1">
        <h2 className="mb-8 text-xs font-black uppercase tracking-[0.25em] text-gray-400 pl-4">
          Filter by Type
        </h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-pokemon-red/70" />
          </div>
        ) : (
          <div className="space-y-1.5 pr-2">
            <TypeItem
              type="all"
              isActive={selectedType === 'all'}
              onClick={() => handleTypeSelect('all')}
            />
            {types.map((type) => (
              <TypeItem
                key={type}
                type={type}
                isActive={selectedType === type}
                onClick={() => handleTypeSelect(type)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
