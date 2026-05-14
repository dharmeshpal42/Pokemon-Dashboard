import React, { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import { capitalize, formatPokemonId } from '../../utils/formatters';

interface PokemonListItemProps {
  pokemon: Pokemon;
}

export const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative flex items-center space-x-5 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(6,81,237,0.15)] hover:ring-pokemon-red/50 animate-fade-in-up cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-20 w-20 flex-shrink-0 drop-shadow-md transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-xl z-10">
        {!imageLoaded && (
          <div className="absolute inset-0 rounded-full bg-gray-100/50 animate-pulse" />
        )}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={`h-full w-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="flex-1 min-w-0 z-10">
        <p className="text-sm font-bold tracking-widest text-gray-400 mb-1">
          {formatPokemonId(pokemon.id)}
        </p>
        <h3 className="text-2xl font-black tracking-tight truncate text-gray-800 transition-colors duration-300 group-hover:text-pokemon-red">
          {capitalize(pokemon.name)}
        </h3>
      </div>
    </div>
  );
};
