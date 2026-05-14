import type { RootState } from '../../app/store';

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectPokemonLoading = (state: RootState) => state.pokemon.loading;
export const selectPokemonError = (state: RootState) => state.pokemon.error;
export const selectCurrentPage = (state: RootState) => state.pokemon.currentPage;
export const selectTotalCount = (state: RootState) => state.pokemon.totalCount;
export const selectSelectedType = (state: RootState) => state.pokemon.selectedType;
export const selectSearch = (state: RootState) => state.pokemon.search;
export const selectViewMode = (state: RootState) => state.pokemon.viewMode;
