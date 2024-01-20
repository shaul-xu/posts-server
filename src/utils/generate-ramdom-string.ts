export const generateRamdomString = (length = 6) =>
  Math.random()
    .toString(36)
    .slice(2, 2 + length)
    .toUpperCase()
