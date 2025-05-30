// Генератор случайного числа в диапазоне [min, max]
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
