import { DragOverlay } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from '@dnd-kit/utilities';

import s from './CalculatorBlock.module.scss';

import { DraggableItemType } from 'ts/types';

type CalculatorBlockType = {
  item: DraggableItemType;
  selected?: string;
  deleteDroppedElem?: (item: DraggableItemType) => void;
  layoutDisabledStyle?: boolean;
};
export const CalculatorBlock = ({
  item,
  selected,
  deleteDroppedElem,
  layoutDisabledStyle,
}: CalculatorBlockType) => {
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const blockClassName =
    (layoutDisabledStyle ? s.disable : '') + (isDragging ? ` ${s.transparent}` : ' ');

  const dragOverlayContent = isDragging ? (
    <div
      className={blockClassName}
      style={{
        opacity: isDragging ? '1' : '',
        boxShadow: isDragging
          ? '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)'
          : '',
      }}
    >
      {item.component}
    </div>
  ) : null;

  const handleDeleteDroppedElem = () => {
    deleteDroppedElem?.(item);
  };
  const doubleClickCondition =
    selected === 'Constructor' ? handleDeleteDroppedElem : undefined;

  return (
    <>
      <div
        className={blockClassName}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onDoubleClick={doubleClickCondition}
      >
        {item.component}
      </div>
      <DragOverlay dropAnimation={null}>{dragOverlayContent}</DragOverlay>
    </>
  );
};
