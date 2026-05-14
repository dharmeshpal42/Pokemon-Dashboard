const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pokeapi.co/api/v2';

export const endpoints = {
  pokemon: (limit: number, offset: number) => `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  pokemonDetail: (nameOrId: string | number) => `${BASE_URL}/pokemon/${nameOrId}`,
  types: () => `${BASE_URL}/type`,
  typeDetail: (type: string) => `${BASE_URL}/type/${type}`,
};
