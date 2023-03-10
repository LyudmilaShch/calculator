import React from 'react';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

import s from './DragField.module.scss';

export const DragField = () => {
  return (
    <Box className={s.DragFieldContainer}>
      <AddPhotoAlternateIcon />
      <Typography variant="h3" className={s.title}>
        Перетащите сюда
      </Typography>
      <Typography variant="body1" className={s.body}>
        любой элемент из левой панели
      </Typography>
    </Box>
  );
};
