export type { RootState } from './store';

export { rootReducer, store } from './store';

export {
  calculatorReducer,
  toggleConstructorMode,
  addNumber,
  addOperation,
  resetCalc,
  calculate,
} from './calculator';
