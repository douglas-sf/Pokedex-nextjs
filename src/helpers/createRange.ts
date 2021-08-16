export function createRange(min: number, max: number) {
  const range = [];

  const length = max + 1 - min;

  for (let i = 0; i < length; i++) {
    range.push(min + i);
  }

  return range;
}
