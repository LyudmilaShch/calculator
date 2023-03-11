// import { DragOverlay } from '@dnd-kit/core';
// import { useSortable } from '@dnd-kit/sortable';

import s from './Display.module.scss';

export const Display = () => {
  // const { attributes, listeners, setNodeRef } = useSortable({
  //   id: 'display',
  // });

  return (
    // <>
    //   <div ref={setNodeRef} {...attributes} {...listeners}>
    <div className={s.displayContainer}>
      <input type="text" readOnly className={s.display} value={0} />
    </div>
    //   </div>
    //   <DragOverlay dropAnimation={null}>
    //     <div className={s.displayContainer}>
    //       <input type="text" readOnly className={s.display} value={0} />
    //     </div>
    //   </DragOverlay>
    // </>
  );
};
