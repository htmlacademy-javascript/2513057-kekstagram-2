// const.js

// Максимальное значение уровня эффекта
const EFFECT_LEVEL_MAX = 100;

// Объект с настройками для каждого эффекта (для noUiSlider)
const Effects = {
  none: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
};

// Объект, сопоставляющий эффект и CSS-фильтр
const StyleFilterByEffects = {
  none: () => 'none',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

export { EFFECT_LEVEL_MAX, Effects, StyleFilterByEffects };
