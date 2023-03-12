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
  isRef?: boolean;
};
export const CalculatorBlock = ({
  item,
  selected,
  deleteDroppedElem,
  layoutDisabledStyle,
  isRef = true,
}: CalculatorBlockType) => {
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } =
    useSortable({
      id: item.id,
      data: { ...item },
      disabled: selected === 'Runtime',
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
        ref={isRef ? setNodeRef : null}
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
