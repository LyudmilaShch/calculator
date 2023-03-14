import React from 'react';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

import s from './DragItemContainer.module.scss';
import { SortableItem } from './sortableItem';

import { DraggableItemType, ModeType } from 'ts/types';

type DragItemContainerType = {
  containerId: string;
  items: DraggableItemType[];
  activeId: string | null;
  mode: ModeType;
  deleteDroppedElem: (item: DraggableItemType) => void;
};

export const DragItemContainer = ({
  containerId,
  items,
  activeId,
  mode,
  deleteDroppedElem,
}: DragItemContainerType) => {
  const { setNodeRef } = useDroppable({
    id: containerId,
  });

  return (
    <div ref={setNodeRef}>
      {!items.length ? (
        <Box className={s.emptyСontainer}>
          <AddPhotoAlternateIcon />
          <Typography variant="h3" className={s.title}>
            Перетащите сюда
          </Typography>
          <Typography variant="body1" className={s.body}>
            любой элемент из левой панели
          </Typography>
        </Box>
      ) : (
        <SortableContext
          id={containerId}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div className={s.DragFieldContainer}>
            {items.map(item => {
              return (
                <div key={item.id}>
                  <SortableItem
                    item={item}
                    isRef={item.id !== 'display' && mode === 'Constructor'}
                    activeId={activeId}
                    mode={mode}
                    deleteDroppedElem={deleteDroppedElem}
                  />
                </div>
              );
            })}
          </div>
        </SortableContext>
      )}
    </div>
  );
};
