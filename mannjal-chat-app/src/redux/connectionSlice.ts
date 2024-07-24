import { createSlice } from '@reduxjs/toolkit';

interface ConnectionState {
  isSocketConnected: boolean;
}

const initialState: ConnectionState = {
  isSocketConnected: false,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setSocketConnected: (state, action) => {
      state.isSocketConnected = action.payload;
    },
  },
});

export const { setSocketConnected } = connectionSlice.actions;
export default connectionSlice.reducer;
