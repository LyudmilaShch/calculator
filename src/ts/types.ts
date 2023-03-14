import React from 'react';

export type DraggableItemIdType =
  | 'display'
  | 'operations'
  | 'numberButtons'
  | 'equalsButton';

export type DraggableItemType = {
  id: DraggableItemIdType;
  component: React.ReactNode;
};

export type KeysType = 'constructorItems' | 'calculatorItems';
