export const formatDateToWeekday = (dateStr) => {
  if (!dateStr) return "";
  // Parse YYYY-MM-DD safely (use local date)
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: "long" }); // e.g. "Monday"
};
