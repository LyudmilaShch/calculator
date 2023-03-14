import { MAX_LENGTH_NUMBER, roundNumber, replaceFloatPoint } from 'helpers';
import { InitialStateType } from 'store/calculator/calculatorSlice';

export const appraise = ({
  currentOperation,
  previousOperation,
  operation,
}: Omit<InitialStateType, 'isAppraised'>) => {
  const current = parseFloat(replaceFloatPoint(currentOperation || ''));
  const prev = parseFloat(replaceFloatPoint(previousOperation || ''));

  if (Number.isNaN(current) || Number.isNaN(prev)) {
    return '0';
  }

  let result;

  switch (operation) {
    case '/':
      result = prev / current;
      break;
    case 'x':
      result = prev * current;
      break;
    case '-':
      result = prev - current;
      break;
    case '+':
      result = prev + current;
      break;
    default:
      return '';
  }

  if (!Number.isFinite(result)) {
    return 'Не определено';
  }
  if (result.toString().length > MAX_LENGTH_NUMBER) {
    if (result.toPrecision(MAX_LENGTH_NUMBER).length > MAX_LENGTH_NUMBER) {
      return replaceFloatPoint(roundNumber(result.toString()));
    }

    return replaceFloatPoint(result.toPrecision(MAX_LENGTH_NUMBER));
  }

  return replaceFloatPoint(result.toString());
};
