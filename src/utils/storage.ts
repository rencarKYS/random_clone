export const setStorage = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key: string) => {
  const getData = localStorage.getItem(key);
  if (!getData) return null;
  return JSON.parse(getData || '');
};

export const storageClear = () => {
  localStorage.clear();
};
