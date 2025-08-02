// Генератор случайного числа в диапазоне [min, max]
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isEscKeyDown = (event) => event.key === 'Escape';

export const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

// Функция, возвращающая CSS-класс для preview картинки в зависимости от выбранного эффекта.
// Используется для переключения классов эффектов
export const getEffectSelector = (effectName) => {
  return `effects__preview--${effectName}`;
};
