import React from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';

import { CalculatorBlock } from '../../calculatorsBlocks/CalculatorBlock';

import s from './DragField.module.scss';

import { DraggableItemType } from 'ts/types';

type DragFieldType = {
  droppedElems: DraggableItemType[];
  deleteDroppedElem: (item: DraggableItemType) => void;
  selected: string;
  setDroppedElems: React.Dispatch<React.SetStateAction<DraggableItemType[]>>;
};
export const DragField = ({
  droppedElems,
  deleteDroppedElem,
  selected,
  setDroppedElems,
}: DragFieldType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const style = {
    borderBottom: droppedElems.length && isOver ? '2px solid #5D5FEF' : '',
    // borderTop: droppedElems.length && isOver ? '2px solid #5D5FEF' : '',
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const droppedRuntimeElemList = droppedElems.map(item => {
    return (
      <div className={item.id === 'display' ? s.disable : ' '} key={item.id}>
        <CalculatorBlock
          item={item}
          selected={selected}
          deleteDroppedElem={deleteDroppedElem}
        />
      </div>
    );
  });

  const droppedElemList = !droppedElems.length ? (
    <Box className={s.DragFieldContainer}>
      <AddPhotoAlternateIcon />
      <Typography variant="h3" className={s.title}>
        Перетащите сюда
      </Typography>
      <Typography variant="body1" className={s.body}>
        любой элемент из левой панели
      </Typography>
    </Box>
  ) : (
    droppedRuntimeElemList
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.active.id !== event.over?.id) {
      setDroppedElems((items: DraggableItemType[]) => {
        const oldIndex = items.findIndex(item => item.id === event.active?.id);
        const newIndex = items.findIndex(item => item.id === event.over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <div ref={setNodeRef} style={style}>
        <SortableContext items={droppedElems} strategy={verticalListSortingStrategy}>
          {droppedElemList}
        </SortableContext>
      </div>
    </DndContext>
  );
};
