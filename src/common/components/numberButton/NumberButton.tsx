import React from 'react';

import s from './NumberButton.module.scss';

type NumberButtonType = {
  onClickHandler: () => void;
  children: React.ReactNode;
};
export const NumberButton = ({ children, onClickHandler }: NumberButtonType) => {
  return (
    <button type="button" className={s.numberButton} onClick={onClickHandler}>
      {children}
    </button>
  );
};
