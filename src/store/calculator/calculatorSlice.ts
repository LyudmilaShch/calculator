import { createSlice } from '@reduxjs/toolkit';

export type InitialStateType = {
  current: string;
  previous: string;
  operation: string;
  overwrite: boolean;
};

const initialState: InitialStateType = {
  current: '0',
  previous: '0',
  operation: '',
  overwrite: false,
};

export const slice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {},
});
