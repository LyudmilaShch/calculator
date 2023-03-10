import React from 'react';

import s from './Calculator.module.scss';
import { Display, EqualsButton, NumberButtons, Operations } from './calculatorsBlocks';
import { DragField, Toggler } from './constructorBlock';

export const Calculator = () => {
  return (
    <div className={s.calculatorPage}>
      <div className={s.calculatorContainer}>
        <div className={s.toggleContainer}>
          <div className={s.toggle} />
          <div className={s.toggle}>
            <Toggler />
          </div>
        </div>
        <div className={s.calculator}>
          <div className={s.calculatorBlocks}>
            <Display />
            <Operations />
            <NumberButtons />
            <EqualsButton />
          </div>
          <div className={s.constructorBlock}>
            <DragField />
          </div>
        </div>
      </div>
    </div>
  );
};
