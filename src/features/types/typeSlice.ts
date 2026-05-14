import { createSlice } from '@reduxjs/toolkit';
import type { TypeState } from './typeTypes';
import { fetchTypes } from './typeThunks';

const initialState: TypeState = {
  types: [],
  loading: false,
  error: null,
};

const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        if (action.error.name !== 'AbortError') {
          state.loading = false;
          state.error = action.payload as string || 'Failed to fetch types';
        }
      });
  },
});

export default typeSlice.reducer;
