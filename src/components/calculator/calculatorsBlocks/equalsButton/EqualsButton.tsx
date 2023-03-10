import React from 'react';

import s from './EqualsButton.module.scss';

export const EqualsButton = () => {
  return (
    <div className={s.equalsButtonContainer}>
      <button type="button" className={s.equalsButton}>
        =
      </button>
    </div>
  );
};
