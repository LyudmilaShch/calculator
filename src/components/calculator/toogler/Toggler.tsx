import React from 'react';

import CodeIcon from '@mui/icons-material/Code';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useDispatch, useSelector } from 'react-redux';

import s from './Toggler.module.scss';

import { resetCalc, toggleConstructorMode, RootState } from 'store';

export const Toggler = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const onRuntimeClick = () => {
    dispatch(toggleConstructorMode('RunTime'));
  };
  const onConstructorClick = () => {
    dispatch(resetCalc());
    dispatch(toggleConstructorMode('Constructor'));
  };

  const buttonRunTimeClassName =
    s.toggleButton + (mode === 'RunTime' ? ` ${s.activeToddleButton}` : ' ');
  const buttonConstructorClassName =
    s.toggleButton + (mode === 'Constructor' ? ` ${s.activeToddleButton}` : ' ');

  return (
    <div className={s.toggleButtonContainer}>
      <Box color="standard" className={s.toggle}>
        <Button
          value="runtime"
          className={buttonRunTimeClassName}
          startIcon={
            <RemoveRedEyeIcon className={mode === 'RunTime' ? ` ${s.activeIcon}` : ' '} />
          }
          onClick={onRuntimeClick}
        >
          Runtime
        </Button>
        <Button
          value="constructor"
          className={buttonConstructorClassName}
          startIcon={
            <CodeIcon className={mode === 'Constructor' ? ` ${s.activeIcon}` : ' '} />
          }
          onClick={onConstructorClick}
        >
          Constructor
        </Button>
      </Box>
    </div>
  );
};
