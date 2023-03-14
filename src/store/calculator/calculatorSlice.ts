import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DraggableItemType } from '../../ts/types';

export type InitialStateType = {
  mode: 'Constructor' | 'RunTime';
  droppedItems: DraggableItemType[];
  resultValue: string | null;
  errorMessage: string | null;
  firstNumber: number | '';
  secondNumber: number | '';
  operation: '/' | '∗' | '-' | '+' | null;
};

const initialState: InitialStateType = {
  mode: 'Constructor',
  droppedItems: [],
  resultValue: null,
  errorMessage: null,
  firstNumber: '',
  secondNumber: '',
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
    setDroppedItems: (state, action: PayloadAction<DraggableItemType[]>) => {
      state.droppedItems = action.payload;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.droppedItems = state.droppedItems.filter(item => item.id !== action.payload);
    },
    setNumber(state = initialState, { payload }) {
      state.resultValue = null;
      state.errorMessage = null;

      if (state.operation) {
        if (payload === 0 && state.secondNumber === 0) {
          return;
        }
        state.secondNumber += payload;

        return;
      }

      if (payload === 0 && state.secondNumber === 0) {
        return;
      }
      state.firstNumber += payload;
    },
    setOperation(state = initialState, { payload }) {
      if (payload === '-') {
        if (state.firstNumber === '') {
          return {
            ...state,
            input: {
              ...state,
              firstNumber: '-',
            },
          };
        }

        if (state.operation && state.secondNumber === '') {
          return {
            ...state,
            input: {
              ...state,
              secondNumber: '-',
            },
          };
        }
      }

      if (state.firstNumber !== '' && !state.operation) {
        state.operation = payload;
      }
    },
  },
});
export const {
  toggleConstructorMode,
  setNumber,
  setOperation,
  setDroppedItems,
  deleteItem,
} = slice.actions;
