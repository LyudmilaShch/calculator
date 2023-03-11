import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { calculatorReducer } from './calculator';

export const rootReducer = combineReducers({
  calculator: calculatorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
