import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PokemonState } from './pokemonTypes';
import { fetchPokemons } from './pokemonThunks';

const initialState: PokemonState = {
  pokemonList: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalCount: 0,
  nextUrl: null,
  prevUrl: null,
  selectedType: 'all',
  search: '',
  viewMode: 'grid',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.currentPage = 1; // Reset to first page when changing type
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload.results;
        state.totalCount = action.payload.totalCount;
        state.nextUrl = action.payload.next || null;
        state.prevUrl = action.payload.previous || null;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        if (action.error.name !== 'AbortError') {
          state.loading = false;
          state.error = action.payload as string || 'Failed to fetch pokemons';
        }
      });
  },
});

export const { setPage, setSelectedType, setSearch, setViewMode } = pokemonSlice.actions;
export default pokemonSlice.reducer;
