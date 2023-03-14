import {
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export const useSensorsForCalc = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 100,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  return useSensors(mouseSensor, touchSensor, pointerSensor);
};
