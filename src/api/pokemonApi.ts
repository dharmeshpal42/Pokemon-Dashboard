import { endpoints } from './endpoints';
import type { PaginatedResponse, NamedAPIResource } from '../types/api';
import type { PokemonDetailResponse, TypeDetailResponse } from '../types/pokemon';

export class APIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new APIError(response.status, `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const pokemonApi = {
  getPokemons: (limit: number, offset: number, signal?: AbortSignal): Promise<PaginatedResponse<NamedAPIResource>> => {
    return fetchWithTimeout(endpoints.pokemon(limit, offset), { signal });
  },

  getPokemonDetail: (nameOrId: string | number, signal?: AbortSignal): Promise<PokemonDetailResponse> => {
    return fetchWithTimeout(endpoints.pokemonDetail(nameOrId), { signal });
  },

  getTypes: (signal?: AbortSignal): Promise<PaginatedResponse<NamedAPIResource>> => {
    return fetchWithTimeout(endpoints.types(), { signal });
  },

  getTypeDetail: (type: string, signal?: AbortSignal): Promise<TypeDetailResponse> => {
    return fetchWithTimeout(endpoints.typeDetail(type), { signal });
  }
};
