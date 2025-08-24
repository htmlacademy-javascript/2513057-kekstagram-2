import { numDecline } from './utils';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';
export const error = () => errorMessage;

export const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if ((inputText.length === 0)) {
    return true;
  }

  const inputArray = inputText.split(/\s+/); //-\s - пробел,
  const rules = [

    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштэг должен начинаться с решётки'
    },

    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять из одной решетки'
    },

    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами'
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги не должен повторяться'
    },

    {
      check: inputArray.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',//test(item) проверяет,есть ли хоть одно совпадение, если да, то возвращает`
    },

    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS}, символов, включая решетку`
    },

    {
      check: inputArray.length > 0 && inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Хэштеги необязательны. Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решетку`
    },
  ];

  return rules.every((rule) => {
    const isError = rule.check;
    if (isError) {
      errorMessage = rule.error;
    }
    return !isError;
  });
};

