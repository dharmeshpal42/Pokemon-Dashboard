import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import { PokemonListItem } from './PokemonListItem';
import { PokemonSkeleton } from './PokemonSkeleton';

interface PokemonListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

export const PokemonList: React.FC<PokemonListProps> = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 animate-fade-in">
        {Array.from({ length: 8 }).map((_, i) => (
          <PokemonSkeleton key={i} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {pokemons.map((pokemon) => (
        <PokemonListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
