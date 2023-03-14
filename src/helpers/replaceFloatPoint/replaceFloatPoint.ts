export const replaceFloatPoint = (value: string) => {
  if (value.includes(',')) {
    return value.split(',').join('.');
  }
  if (value.includes('.')) {
    return value.split('.').join(',');
  }

  return value;
};
