import s from './Display.module.scss';

export const Display = () => {
  return (
    <div className={s.displayContainer}>
      <input type="text" readOnly className={s.display} value={0} />
    </div>
  );
};
