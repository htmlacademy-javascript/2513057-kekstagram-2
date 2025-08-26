import { declineNumber } from './utils';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';
export const getErrorMessage = () => errorMessage;

export const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();
  if ((inputText.length === 0)) {
    return true;
  }

  const inputValues = inputText.split(/\s+/); //-\s - пробел,
  const rules = [

    {
      check: inputValues.some((item) => item[0] !== '#'),
      error: 'Хэштэг должен начинаться с решётки'
    },

    {
      check: inputValues.some((item) => item === '#'),
      error: 'Хэштег не может состоять из одной решетки'
    },

    {
      check: inputValues.some((item) => item.slice(1).includes('#')),
      error: 'Хэштеги разделяются пробелами'
    },
    {
      check: inputValues.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_HASHTAGS} ${declineNumber(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputValues.some((item, num, values) => values.includes(item, num + 1)),
      error: 'Хэштеги не должен повторяться'
    },

    {
      check: inputValues.some((item) => !/^#[a-za-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',//test(item) проверяет,есть ли хоть одно совпадение, если да, то возвращает`
    },

    {
      check: inputValues.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS}, символов, включая решетку`
    },

    {
      check: inputValues.length > 0 && inputValues.some((item) => item.length > MAX_SYMBOLS),
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

