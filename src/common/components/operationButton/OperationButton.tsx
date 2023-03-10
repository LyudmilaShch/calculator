import React from 'react';

import s from './OperationButton.module.scss';

type OperationButtonType = {
  onClick: () => void;
  children: React.ReactNode;
};
export const OperationButton = ({ onClick, children }: OperationButtonType) => {
  return (
    <button type="button" onClick={onClick} className={s.operationButton}>
      {children}
    </button>
  );
};
