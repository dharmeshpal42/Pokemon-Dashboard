import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import typeReducer from '../features/types/typeSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    types: typeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
