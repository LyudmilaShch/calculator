import React from 'react';

import s from './NumberButton.module.scss';

import { ModeType } from 'ts/types';

type NumberButtonType = {
  onClickHandler: () => void;
  children: React.ReactNode;
  mode: ModeType;
};
export const NumberButton = ({ children, onClickHandler, mode }: NumberButtonType) => {
  const numberButtonClassName =
    s.numberButton + (mode === 'Constructor' ? ' ' : ` ${s.active}`);

  return (
    <button type="button" className={numberButtonClassName} onClick={onClickHandler}>
      {children}
    </button>
  );
};
