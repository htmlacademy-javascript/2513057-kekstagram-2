/* eslint-disable no-console */
function isStringWithinMaxLength(str, maxLength) {
  // Проверка типа первого параметра
  if (typeof str !== 'string') {
    throw new TypeError('Первый параметр должен быть строкой');
  }

  // Проверка типа второго параметра
  if (typeof maxLength !== 'number') {
    throw new TypeError('Второй параметр должен быть числом');
  }

  // Проверка, что maxLength — положительное число
  if (maxLength < 0) {
    throw new RangeError('Максимальная длина должна быть положительным числом');
  }

  // Возвращаем результат проверки длины строки
  return str.length <= maxLength;
}
// Строка короче 20 символов
console.log(isStringWithinMaxLength('проверяемая строка', 20)); // true

// Длина строки ровно 18 символов
console.log(isStringWithinMaxLength('проверяемая строка', 18)); // true

// Строка длиннее 10 символов
console.log(isStringWithinMaxLength('проверяемая строка', 10)); // false

function isPalindrome(str) {
  // Приводим строку к нижнему регистру и удаляем все неалфавитные символы (для фраз)
  const normalizedStr = str.toLowerCase().replace(/[^a-zа-яё]/g, '');

  // Проверяем, равна ли строка сама себе в обратном порядке
  return normalizedStr === normalizedStr.split('').reverse().join('');
}

// Примеры использования функции:

// Строка является палиндромом
console.log(isPalindrome('топот')); // true

// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true

// Это не палиндром
console.log(isPalindrome('Кекс')); // false
