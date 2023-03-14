import { useSelector } from 'react-redux';

import s from './Display.module.scss';

import { RootState } from 'store';

export const Display = () => {
  const value = useSelector((state: RootState) => state.calculator.resultValue);
  const MAX_VALUE_LENGTH = 9;

  const displayClassName =
    s.display +
    (value.length > MAX_VALUE_LENGTH ? ` ${s.littleFontSize}` : ` ${s.bigFontSize}`);

  return (
    <div className={s.displayContainer}>
      <input type="text" readOnly className={displayClassName} value={value} disabled />
    </div>
  );
};
