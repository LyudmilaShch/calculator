import React, { useState } from 'react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { DraggableItemType } from '../../ts/types';

import s from './Calculator.module.scss';
import { Display, EqualsButton, NumberButtons, Operations } from './calculatorsBlocks';
import { CalculatorBlock } from './calculatorsBlocks/CalculatorBlock';
import { DragField, Toggler } from './constructorBlock';

export const Calculator = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const draggableItems: DraggableItemType[] = [
    { id: 'display', component: <Display /> },
    { id: 'operations', component: <Operations /> },
    { id: 'numberButtons', component: <NumberButtons /> },
    { id: 'equalsButton', component: <EqualsButton /> },
  ];

  const [droppedElems, setDroppedElems] = useState<DraggableItemType[]>([]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { id } = event.active;

    const elem = draggableItems.find(el => el.id === id) as DraggableItemType;

    if (event.over && event.over.id === 'droppable') {
      setDroppedElems(prev => {
        if (id === 'display') {
          return [elem, ...prev];
        }

        return [...prev, elem];
      });
    }
  };
  const deleteDroppedElem = (item: DraggableItemType) => {
    const filtered = [...droppedElems].filter(elem => elem.id !== item.id);

    setDroppedElems(filtered);
  };

  const calcElementsList = draggableItems.map(el => {
    const index = droppedElems.findIndex(elem => elem.id === el.id);
    const layoutDisabledStyle = index !== -1;

    return (
      <CalculatorBlock
        key={el.id}
        item={el}
        selected={mode}
        deleteDroppedElem={deleteDroppedElem}
        layoutDisabledStyle={layoutDisabledStyle}
      />
    );
  });

  return (
    <div className={s.calculatorPage}>
      <div className={s.calculatorContainer}>
        <div className={s.toggleContainer}>
          <div className={s.toggle} />
          <div className={s.toggle}>
            <Toggler />
          </div>
        </div>
        <div className={s.calculator}>
          <DndContext onDragEnd={handleDragEnd}>
            <div className={s.calculatorBlocks}>
              {mode === 'Constructor' && <div>{calcElementsList}</div>}
            </div>
            <div className={s.constructorBlock}>
              <DragField
                deleteDroppedElem={deleteDroppedElem}
                selected={mode}
                droppedElems={droppedElems}
                setDroppedElems={setDroppedElems}
              />
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
