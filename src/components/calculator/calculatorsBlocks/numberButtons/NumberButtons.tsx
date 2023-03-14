import React from 'react';

import s from './NumberButtons.module.scss';

import { NumberButton } from 'common';

export const NumberButtons = () => {
  const buttonValues = [
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '0' },
    { value: ',' },
  ];

  return (
    <div className={s.numberButtonsContainer}>
      <div className={s.numbers}>
        {buttonValues.map(v => {
          return (
            <NumberButton key={v.value} onClickHandler={() => {}}>
              {v.value}
            </NumberButton>
          );
        })}
      </div>
    </div>
  );
};
