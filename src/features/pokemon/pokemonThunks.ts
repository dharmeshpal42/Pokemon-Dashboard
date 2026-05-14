import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonApi } from '../../api/pokemonApi';
import type { Pokemon } from '../../types/pokemon';
import type { RootState } from '../../app/store';
import { POKEMON_PER_PAGE } from '../../utils/constants';

const extractIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

const mapToPokemon = (name: string, url: string): Pokemon => {
  const id = extractIdFromUrl(url);
  return {
    id,
    name,
    url,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
};

export const fetchPokemons = createAsyncThunk<
  { results: Pokemon[]; totalCount: number; next?: string | null; previous?: string | null },
  { page: number; type: string; search: string },
  { state: RootState }
>('pokemon/fetchPokemons', async ({ page, type, search }, { signal, rejectWithValue }) => {
  try {
    const currentPage = page;
    const selectedType = type;
    
    const limit = POKEMON_PER_PAGE;
    const offset = (currentPage - 1) * limit;
    
    let results: Pokemon[] = [];
    let totalCount = 0;

    if (selectedType !== 'all') {
      // Fetch by type
      const response = await pokemonApi.getTypeDetail(selectedType, signal);
      const allOfType = response.pokemon.map(p => mapToPokemon(p.pokemon.name, p.pokemon.url));
      
      // Apply search filter if any
      const filtered = search
        ? allOfType.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        : allOfType;
        
      totalCount = filtered.length;
      // Manually paginate the filtered list
      results = filtered.slice(offset, offset + limit);
    } else {
      if (search) {
        // Fetch all to search (limited to first 1000 for performance)
        const response = await pokemonApi.getPokemons(1000, 0, signal);
        const allPokemon = response.results.map(p => mapToPokemon(p.name, p.url));
        const filtered = allPokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        
        totalCount = filtered.length;
        // Manually paginate the filtered list
        results = filtered.slice(offset, offset + limit);
      } else {
        // Paginated fetch for "all"
        const response = await pokemonApi.getPokemons(limit, offset, signal);
        
        results = response.results.map(p => mapToPokemon(p.name, p.url));
        totalCount = response.count;
        return { 
          results, 
          totalCount, 
          next: response.next, 
          previous: response.previous 
        };
      }
    }

    return { results, totalCount };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error;
    }
    return rejectWithValue(error.message || 'Failed to fetch pokemons');
  }
});
