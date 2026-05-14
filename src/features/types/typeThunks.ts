import { createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonApi } from '../../api/pokemonApi';

export const fetchTypes = createAsyncThunk(
  'types/fetchTypes',
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await pokemonApi.getTypes(signal);
      return response.results.map(t => t.name);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error;
      }
      return rejectWithValue(error.message || 'Failed to fetch types');
    }
  }
);
