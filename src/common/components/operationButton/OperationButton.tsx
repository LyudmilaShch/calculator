import React from 'react';

import s from './OperationButton.module.scss';

import { ModeType } from 'ts/types';

type OperationButtonType = {
  onClick: () => void;
  children: React.ReactNode;
  mode: ModeType;
};
export const OperationButton = ({ onClick, children, mode }: OperationButtonType) => {
  const operationButtonClassName =
    s.operationButton + (mode === 'Constructor' ? ' ' : ` ${s.active}`);

  return (
    <button type="button" onClick={onClick} className={operationButtonClassName}>
      {children}
    </button>
  );
};
