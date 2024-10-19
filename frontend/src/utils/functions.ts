export const setToStorage = (key: string, value: unknown) => {
  const storedValue = JSON.stringify(value);
  localStorage.setItem(key, storedValue);
};

export const getFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};