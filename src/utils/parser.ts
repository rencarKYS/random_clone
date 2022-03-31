export const wonParser = (data: number) => {
  const man = Math.floor(data / 10000);
  const chun = data - Math.floor(data / 10000) * 10000;
  if (chun) return `${man}만 ${Math.floor(chun / 1000)}천원`;
  return `${man}만원`;
};
