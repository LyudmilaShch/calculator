import React from 'react';

import CodeIcon from '@mui/icons-material/Code';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';

import s from './Toggler.module.scss';

type TogglerType = {
  handleActiveSwitcher: any;
};
export const Toggler = ({ handleActiveSwitcher }: TogglerType) => {
  return (
    <div className={s.toggleButtonContainer}>
      <Box color="standard" className={s.toggle}>
        <Button
          value="runtime"
          className={s.toggleButton}
          startIcon={<RemoveRedEyeIcon />}
        >
          Runtime
        </Button>
        <Button value="constructor" className={s.toggleButton} startIcon={<CodeIcon />}>
          Constructor
        </Button>
      </Box>
    </div>
  );
};
