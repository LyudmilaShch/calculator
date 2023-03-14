import { useDraggable } from '@dnd-kit/core';

import s from './CalculatorBlockContainer.module.scss';
import { DraggableItem } from './draggableItem';

import { DraggableItemType } from 'ts/types';

type CalculatorBlockContainerType = {
  containerId: string;
  items: DraggableItemType[];
  copyItems: DraggableItemType[];
};

export const CalculatorBlockContainer = ({
  containerId,
  items,
  copyItems,
}: CalculatorBlockContainerType) => {
  const { setNodeRef } = useDraggable({
    id: containerId,
  });

  return (
    <div ref={setNodeRef} className={s.CalculatorBlockContainer}>
      {copyItems.map(el => {
        const item = items.find(item => item.id === el.id);

        return <DraggableItem key={el.id} item={item} copyItem={el} />;
      })}
    </div>
  );
};
