export const MAX_LENGTH_NUMBER = 15;

export const roundNumber = (value: string) => {
  const lastChar = value[MAX_LENGTH_NUMBER - 1];

  return value.slice(0, MAX_LENGTH_NUMBER) + (+lastChar + 1);
};
