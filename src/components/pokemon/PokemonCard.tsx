import React, { useState, memo } from 'react';
import type { Pokemon } from '../../types/pokemon';
import { capitalize, formatPokemonId } from '../../utils/formatters';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(6,81,237,0.15)] hover:ring-pokemon-red/50 animate-fade-in-up cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute top-3 right-4 text-xs font-black text-gray-200 group-hover:text-gray-300 transition-colors z-10">
        {formatPokemonId(pokemon.id)}
      </div>
      <div className="relative mb-5 h-36 w-36 drop-shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl z-10">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-100/50 animate-pulse" />
        )}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={`h-full w-full object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <h3 className="relative text-xl font-black tracking-tight text-gray-800 transition-colors duration-300 group-hover:text-pokemon-red z-10">
        {capitalize(pokemon.name)}
      </h3>
    </div>
  );
};

export const PokemonCard = memo(PokemonCardComponent);
