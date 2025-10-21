export const isDay = (time) => {
  const t = time;
  if (!t) return true;
  const hour = new Date(t).getHours();
  return hour >= 6 && hour < 18;
};
