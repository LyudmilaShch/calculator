import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from './NumberButtons.module.scss';

import { NumberButton } from 'common';
import { RootState, addNumber } from 'store';

export const NumberButtons = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const dispatch = useDispatch();
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
  const onClickHandler = (number: string) => {
    if (mode === 'Constructor') {
      return;
    }
    dispatch(addNumber(number));
  };

  return (
    <div className={s.numberButtonsContainer}>
      <div className={s.numbers}>
        {buttonValues.map(v => {
          return (
            <NumberButton
              key={v.value}
              onClickHandler={() => onClickHandler(v.value)}
              mode={mode}
            >
              {v.value}
            </NumberButton>
          );
        })}
      </div>
    </div>
  );
};
