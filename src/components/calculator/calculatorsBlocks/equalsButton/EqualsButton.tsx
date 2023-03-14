import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import s from './EqualsButton.module.scss';

import { calculate, RootState } from 'store';

export const EqualsButton = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const dispatch = useDispatch();

  const equalsButtonClassName =
    s.equalsButton + (mode === 'Constructor' ? ' ' : ` ${s.active}`);
  const onClickHandler = () => {
    if (mode === 'Constructor') {
      return;
    }
    dispatch(calculate());
  };

  return (
    <div className={s.equalsButtonContainer}>
      <button type="button" className={equalsButtonClassName} onClick={onClickHandler}>
        =
      </button>
    </div>
  );
};
