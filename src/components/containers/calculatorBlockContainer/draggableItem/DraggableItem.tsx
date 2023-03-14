import { useDraggable } from '@dnd-kit/core';

import { CalcItem } from 'common';
import { DraggableItemType } from 'ts/types';

type DraggableItemPropsType = {
  item?: DraggableItemType;
  copyItem: DraggableItemType;
};
export const DraggableItem = ({ item, copyItem }: DraggableItemPropsType) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: item?.id || '' });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <CalcItem item={item} copyItem={copyItem} />
    </div>
  );
};
