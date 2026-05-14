import type { Pokemon } from '../../types/pokemon';

export interface PokemonState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalCount: number;
  nextUrl: string | null;
  prevUrl: string | null;
  selectedType: string;
  search: string;
  viewMode: 'grid' | 'list';
}
