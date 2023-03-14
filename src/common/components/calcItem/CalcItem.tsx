import React from 'react';

import s from './CalcItem.module.scss';

import { DraggableItemType } from 'ts/types';

type CalcItemType = {
  item?: DraggableItemType;
  copyItem?: DraggableItemType;
};

export const CalcItem = ({ item, copyItem }: CalcItemType) => {
  return (
    <div>
      {item ? (
        <div className={s.item}>{item.component}</div>
      ) : (
        <div className={s.disable}>{copyItem?.component}</div>
      )}
    </div>
  );
};
