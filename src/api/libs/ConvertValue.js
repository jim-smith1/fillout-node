const convertValue = (value) => {
  // Convert to number if possible, otherwise return as string
  const numericValue = Number(value);
  if (!isNaN(numericValue)) return numericValue;

  // Convert to date if possible, otherwise return as string
  const dateValue = new Date(value);
  if (!isNaN(dateValue.getTime())) return dateValue.getTime();

  return value;
};

module.exports = { convertValue };
