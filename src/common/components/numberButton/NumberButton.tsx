import React from 'react';

import s from './NumberButton.module.scss';

type OperationButtonType = {
  children: React.ReactNode;
};
export const NumberButton = ({ children }: OperationButtonType) => {
  return (
    <button type="button" className={s.numberButton}>
      {children}
    </button>
  );
};
