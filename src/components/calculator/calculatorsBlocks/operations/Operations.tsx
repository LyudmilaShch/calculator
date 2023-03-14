import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from './Operations.module.scss';

import { OperationButton } from 'common';
import { RootState, addOperation } from 'store';

export const Operations = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const dispatch = useDispatch();
  const operations = [
    { operation: '/' },
    { operation: 'x' },
    { operation: '-' },
    { operation: '+' },
  ];

  const onClickHandler = (operation: string) => {
    if (mode === 'Constructor') {
      return;
    }
    dispatch(addOperation(operation));
  };

  return (
    <div className={s.operationsContainer}>
      <div className={s.operations}>
        {operations.map(b => {
          return (
            <OperationButton
              key={b.operation}
              onClick={() => onClickHandler(b.operation)}
              mode={mode}
            >
              {b.operation}
            </OperationButton>
          );
        })}
      </div>
    </div>
  );
};
