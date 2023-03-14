import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MAX_LENGTH_NUMBER, roundNumber, appraise } from 'helpers';
import { ModeType } from 'ts/types';

export type InitialStateType = {
  mode: ModeType;
  resultValue: string;
  isAppraised: boolean;
  currentOperation: string;
  previousOperation: string;
  operation: string | null;
};

const initialState: InitialStateType = {
  mode: 'Constructor',
  resultValue: '0',
  isAppraised: false,
  currentOperation: '',
  previousOperation: '',
  operation: null,
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
    addNumber: (state, { payload }: PayloadAction<string>) => {
      if (state.isAppraised) {
        state.currentOperation = '';
        state.previousOperation = '';
        state.isAppraised = false;
        state.operation = null;
      }

      if (state.currentOperation.length > MAX_LENGTH_NUMBER) {
        state.currentOperation = roundNumber(state.currentOperation);
        state.resultValue = state.currentOperation;

        return;
      }

      if (state.currentOperation === '0' && payload !== ',') {
        state.currentOperation = payload;
        state.resultValue = state.currentOperation;

        return;
      }

      if (
        state.currentOperation === 'Не определено' ||
        state.previousOperation === 'Не определено'
      ) {
        state.currentOperation = payload;
        state.resultValue = state.currentOperation;
        state.previousOperation = '';

        return;
      }

      if (payload === ',') {
        if (state.currentOperation.includes(',')) {
          return;
        }
        if (state.operation && state.currentOperation !== '') {
          state.currentOperation += payload;
          state.resultValue = state.currentOperation;

          return;
        }
        if (state.currentOperation === '') {
          state.currentOperation = '0,';
          state.resultValue = state.currentOperation;

          return;
        }
      }

      state.currentOperation += payload;
      state.resultValue = state.currentOperation;
    },
    addOperation: (state, { payload }: PayloadAction<string>) => {
      if (state.currentOperation === 'Не определено') {
        state.previousOperation = '';
        state.currentOperation = '0';
        state.resultValue = state.currentOperation;
        state.isAppraised = false;
        state.operation = payload;

        return;
      }
      if (state.isAppraised) {
        state.previousOperation = state.currentOperation;
        state.currentOperation = '';
        state.resultValue = state.previousOperation;
        state.isAppraised = false;
        state.operation = payload;

        return;
      }
      if (state.currentOperation === '' && state.previousOperation) {
        state.operation = payload;

        return;
      }

      if (state.currentOperation && state.previousOperation) {
        state.previousOperation = appraise(state);
        state.currentOperation = '';
        state.resultValue = state.previousOperation;
        state.operation = payload;

        return;
      }

      if (state.currentOperation && state.previousOperation === '') {
        state.previousOperation = state.currentOperation;
        state.currentOperation = '';
        state.resultValue = state.previousOperation;
        state.operation = payload;
      }
    },
    calculate: state => {
      if (
        state.operation === null ||
        state.currentOperation === '' ||
        state.previousOperation === '' ||
        state.currentOperation === 'Не определено'
      ) {
        return;
      }
      state.isAppraised = true;
      state.currentOperation = appraise(state);
      state.previousOperation = state.currentOperation;
      state.resultValue = state.previousOperation;
    },
    resetCalc: state => {
      state.currentOperation = '';
      state.previousOperation = '';
      state.operation = null;
      state.resultValue = '0';
      state.isAppraised = false;
    },
  },
});
export const { toggleConstructorMode, addNumber, addOperation, resetCalc, calculate } =
  slice.actions;
