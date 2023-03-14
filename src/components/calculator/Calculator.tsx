import React, { useState } from 'react';

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useSelector } from 'react-redux';

import { CalculatorBlockContainer, DragItemContainer } from '../containers';

import s from './Calculator.module.scss';
import { Display, EqualsButton, NumberButtons, Operations } from './calculatorsBlocks';
import { Toggler } from './toogler';

import { CalcItem } from 'common';
import { useSensorsForCalc } from 'hooks';
import { RootState } from 'store';
import { DraggableItemType, KeysType } from 'ts/types';

type DraggableItemsType = {
  constructorItems: DraggableItemType[];
  calculatorItems: DraggableItemType[];
};

export const Calculator = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const [activeId, setActiveId] = useState<null | string>(null);
  const copyCalculatorItems: DraggableItemType[] = [
    { id: 'display', component: <Display /> },
    { id: 'operations', component: <Operations /> },
    { id: 'numberButtons', component: <NumberButtons /> },
    { id: 'equalsButton', component: <EqualsButton /> },
  ];
  const [draggableItems, setDraggableItems] = useState<DraggableItemsType>({
    constructorItems: [],
    calculatorItems: [...copyCalculatorItems],
  });

  const deleteDroppedElem = (item: DraggableItemType) => {
    const filteredConstructorItems = draggableItems.constructorItems.filter(
      (elem: DraggableItemType) => elem.id !== item.id,
    );
    const filteredCalculatorItems = copyCalculatorItems.filter(
      el =>
        !filteredConstructorItems
          .map((item: DraggableItemType) => item.id)
          .includes(el.id),
    ) as DraggableItemType[];

    setDraggableItems({
      ...draggableItems,
      calculatorItems: filteredCalculatorItems,
      constructorItems: filteredConstructorItems,
    });
  };

  function findContainer(id: string) {
    if (id in draggableItems) {
      return id;
    }

    if (draggableItems.constructorItems.find(el => el.id === id)) {
      return 'constructorItems';
    }
    if (draggableItems.calculatorItems.find(el => el.id === id)) {
      return 'calculatorItems';
    }
  }

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const id = active.id as string;
    const overId = over?.id as string;

    // Find the containers
    const activeContainer = findContainer(id) as KeysType | undefined;
    const overContainer = findContainer(overId) as KeysType | undefined;

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setDraggableItems((prev: DraggableItemsType) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(item => item.id === id);
      const overIndex = overItems.findIndex(item => item.id === overId);

      let newIndex;

      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter(
            (item: { id: UniqueIdentifier }) => item.id !== active.id,
          ),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          draggableItems[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const id = active.id as string;

    if (over) {
      const overId = over.id as string;

      const activeContainer = findContainer(id) as KeysType | undefined;
      const overContainer = findContainer(overId) as KeysType | undefined;

      if (!activeContainer || !overContainer || activeContainer !== overContainer) {
        return;
      }

      const activeIndex = draggableItems[activeContainer].findIndex(
        item => item.id === id,
      );
      const overIndex =
        id === 'display'
          ? 0
          : draggableItems[overContainer].findIndex(item => item.id === overId);

      if (activeIndex !== overIndex) {
        setDraggableItems(items => ({
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
        }));
      }

      setActiveId(null);
    }
  };

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
          <DndContext
            sensors={useSensorsForCalc()}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className={s.calculatorBlocks}>
              {mode === 'Constructor' && (
                <div>
                  <CalculatorBlockContainer
                    containerId="calculatorItems"
                    items={draggableItems.calculatorItems}
                    copyItems={copyCalculatorItems}
                  />
                </div>
              )}
            </div>
            <div className={s.constructorBlock}>
              <DragItemContainer
                containerId="constructorItems"
                items={draggableItems.constructorItems}
                activeId={activeId}
                mode={mode}
                deleteDroppedElem={deleteDroppedElem}
              />
            </div>
            <DragOverlay>
              {activeId ? (
                <CalcItem item={copyCalculatorItems.find(el => el.id === activeId)} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};
