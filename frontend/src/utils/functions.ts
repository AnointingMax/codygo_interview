export const setToStorage = (key: string, value: unknown) => {
  const storedValue = JSON.stringify(value);
  localStorage.setItem(key, storedValue);
};

export const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeItemAtIndex = (array: any[], indexToRemove: number) => {
  const copy = [...array];

  if (indexToRemove >= 0 && indexToRemove < copy.length) {
    copy.splice(indexToRemove, 1);
  }

  return copy;
};