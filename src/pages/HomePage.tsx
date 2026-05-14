import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPokemons } from '../features/pokemon/pokemonThunks';
import {
  setPage,
  setSearch,
  setViewMode,
} from '../features/pokemon/pokemonSlice';
import {
  selectPokemonList,
  selectPokemonLoading,
  selectPokemonError,
  selectCurrentPage,
  selectTotalCount,
  selectSelectedType,
  selectSearch,
  selectViewMode,
} from '../features/pokemon/pokemonSelectors';
import { PokemonGrid } from '../components/pokemon/PokemonGrid';
import { PokemonList } from '../components/pokemon/PokemonList';
import { PokemonSearch } from '../components/pokemon/PokemonSearch';
import { ViewToggle } from '../components/pokemon/ViewToggle';
import { PageContainer } from '../components/common/PageContainer';
import { Pagination } from '../components/common/Pagination';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { POKEMON_PER_PAGE } from '../utils/constants';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const pokemons = useAppSelector(selectPokemonList);
  const loading = useAppSelector(selectPokemonLoading);
  const error = useAppSelector(selectPokemonError);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalCount = useAppSelector(selectTotalCount);
  const selectedType = useAppSelector(selectSelectedType);
  const search = useAppSelector(selectSearch);
  const viewMode = useAppSelector(selectViewMode);

  useEffect(() => {
    const promise = dispatch(fetchPokemons({
      page: currentPage,
      type: selectedType,
      search: search
    }));
    return () => {
      promise.abort();
    };
  }, [dispatch, currentPage, selectedType, search]);

  const handlePageChange = useCallback((page: number) => {
    console.log("🚀 ~ handlePageChange ~ page:", page)
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setSearch(value));
  }, [dispatch]);

  const handleViewToggle = (mode: 'grid' | 'list') => {
    dispatch(setViewMode(mode));
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorState
          message={error}
          onRetry={() => dispatch(fetchPokemons({
            page: currentPage,
            type: selectedType,
            search: search
          }))}
        />
      );
    }

    if (!loading && pokemons.length === 0) {
      return <EmptyState />;
    }

    const isInitialLoad = loading && pokemons.length === 0;

    return (
      <div className={`relative mt-8 min-h-[600px] transition-all duration-300 ${loading && !isInitialLoad ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {loading && !isInitialLoad && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-50/10 backdrop-blur-[1px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-pokemon-red animate-spin shadow-lg" />
              <p className="text-sm font-bold text-pokemon-red animate-pulse">Updating PokéDex...</p>
            </div>
          </div>
        )}
        {viewMode === 'grid' ? (
          <PokemonGrid pokemons={pokemons} isLoading={isInitialLoad} />
        ) : (
          <PokemonList pokemons={pokemons} isLoading={isInitialLoad} />
        )}
      </div>
    );
  };

  const showPagination = totalCount > 0;

  return (
    <PageContainer>
      <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-md pt-4 sm:pt-8 pb-4 sm:pb-6 -mt-8 mb-4 border-b border-gray-100/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1">
            {selectedType === 'all' ? 'All Pokémon' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Type Pokémon`}
          </h1>
          <p className="hidden sm:block text-sm font-medium text-gray-400 tracking-wide uppercase">Explore, search, and filter the magical world of Pokémon.</p>
        </div>

        <div className="flex items-center space-x-3 sm:justify-between">
          <div className="flex-1 min-w-0">
            <PokemonSearch value={search} onChange={handleSearchChange} />
          </div>
          <div className="flex-shrink-0">
            <ViewToggle viewMode={viewMode} onToggle={handleViewToggle} />
          </div>
        </div>
      </div>

      {renderContent()}

      {showPagination && totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={POKEMON_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </PageContainer>
  );
};
