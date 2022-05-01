export function createRange(min: number, max: number, step = 1) {
  const range = [];

  const length = max + 1 - min;

  for (let i = 0; i < length; i += step) {
    range.push(min + i);
  }

  return range;
}
