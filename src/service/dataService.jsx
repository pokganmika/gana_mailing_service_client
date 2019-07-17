export const dataPerCalc = (numerator, denominator) => {
  if (numerator === 0 || denominator === 0) {
    return `0`;
  }

  const data = numerator / denominator;

  if (Math.floor(data * 100) === data * 100) {
    return `${numerator} (${data * 100}%)`;
  } else {
    return `${numerator} (${(data * 100).toFixed(2)}%)`;
  }
};
