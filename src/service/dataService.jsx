export const dataPerCal = (denominator, numerator) => {
  const data = numerator / denominator;

  if (Math.floor(data * 100) === data * 100) {
    return `${data * 100}%`;
  } else {
    return `${(data * 100).toFixed(2)}%`;
  }
};
