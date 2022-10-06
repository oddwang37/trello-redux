import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string;
};

const initialState: User = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
