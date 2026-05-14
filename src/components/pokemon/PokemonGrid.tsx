import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { PokemonSkeleton } from './PokemonSkeleton';

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 animate-fade-in">
        {Array.from({ length: 12 }).map((_, i) => (
          <PokemonSkeleton key={i} viewMode="grid" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
