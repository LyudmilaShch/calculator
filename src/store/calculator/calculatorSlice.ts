import { createSlice } from '@reduxjs/toolkit';

export type InitialStateType = {
  mode: 'Constructor' | 'RunTime';
};

const initialState: InitialStateType = {
  mode: 'Constructor',
};

export const slice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    toggleConstructorMode(state = initialState, { payload }) {
      return {
        ...state,
        mode: payload,
      };
    },
  },
});
export const { toggleConstructorMode } = slice.actions;
