import {
  slice,
  toggleConstructorMode,
  addNumber,
  addOperation,
  resetCalc,
  calculate,
} from './calculatorSlice';

const calculatorReducer = slice.reducer;

export {
  calculatorReducer,
  toggleConstructorMode,
  addNumber,
  addOperation,
  resetCalc,
  calculate,
};
