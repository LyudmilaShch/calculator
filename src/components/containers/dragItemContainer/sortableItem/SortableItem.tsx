import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import s from './SortableItem.module.scss';

import { DraggableItemType, ModeType } from 'ts/types';

type SortableItemType = {
  item: DraggableItemType;
  isRef: boolean;
  activeId: string | null;
  mode: ModeType;
  deleteDroppedElem: (item: DraggableItemType) => void;
};
export const SortableItem = ({
  item,
  isRef,
  activeId,
  mode,
  deleteDroppedElem,
}: SortableItemType) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cursorClassName =
    item.id !== 'display' ? ` ${s.dragCursor}` : ` ${s.noDragCursor}`;
  const blockClassName =
    (isDragging ? ` ${s.transparent}` : ' ') +
    (mode === 'Constructor' ? cursorClassName : ' ');

  const handleDeleteDroppedElem = () => {
    deleteDroppedElem(item);
  };

  const doubleClickCondition =
    mode === 'Constructor' ? handleDeleteDroppedElem : undefined;

  return (
    <div
      ref={isRef ? setNodeRef : null}
      style={activeId === 'display' ? undefined : style}
      {...attributes}
      {...listeners}
    >
      <div onDoubleClick={doubleClickCondition} className={blockClassName}>
        {item.component}
      </div>
    </div>
  );
};
