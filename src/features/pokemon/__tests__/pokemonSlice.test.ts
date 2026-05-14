import { describe, it, expect } from 'vitest';
import reducer, { setPage, setSelectedType, setSearch, setViewMode } from '../pokemonSlice';
import type { PokemonState } from '../pokemonTypes';

describe('pokemonSlice', () => {
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

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setPage', () => {
    const actual = reducer(initialState, setPage(2));
    expect(actual.currentPage).toBe(2);
  });

  it('should handle setSelectedType and reset page', () => {
    const stateWithPage = { ...initialState, currentPage: 5 };
    const actual = reducer(stateWithPage, setSelectedType('fire'));
    expect(actual.selectedType).toBe('fire');
    expect(actual.currentPage).toBe(1);
  });

  it('should handle setSearch and reset page', () => {
    const stateWithPage = { ...initialState, currentPage: 3 };
    const actual = reducer(stateWithPage, setSearch('pika'));
    expect(actual.search).toBe('pika');
    expect(actual.currentPage).toBe(1);
  });

  it('should handle setViewMode', () => {
    const actual = reducer(initialState, setViewMode('list'));
    expect(actual.viewMode).toBe('list');
  });
});
