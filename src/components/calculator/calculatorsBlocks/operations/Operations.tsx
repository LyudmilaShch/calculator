import React from 'react';

import s from './Operations.module.scss';

import { OperationButton } from 'common';

export const Operations = () => {
  const operations = [
    { operation: '/', onClickHandler: () => {} },
    { operation: '∗', onClickHandler: () => {} },
    { operation: '-', onClickHandler: () => {} },
    { operation: '+', onClickHandler: () => {} },
  ];

  return (
    <div className={s.operationsContainer}>
      <div className={s.operations}>
        {operations.map(b => {
          return (
            <OperationButton key={b.operation} onClick={b.onClickHandler}>
              {b.operation}
            </OperationButton>
          );
        })}
      </div>
    </div>
  );
};
