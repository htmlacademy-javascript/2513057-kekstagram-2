import { isEscKeyDown } from './utils.js';

const REMOVE_ERROR_MESSAGE_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.querySelector('body');

// Показывает сообщение об ошибке загрузки данных (с сервера, при открытии страницы).
export function showLoadingDataError() {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true); // Клонируем шаблон сообщения.
  body.append(dataErrorMessage); // Добавляем сообщение в DOM.
  setTimeout(() => {
    dataErrorMessage.remove(); // Удаляем сообщение через 5 секунд.
  }, REMOVE_ERROR_MESSAGE_TIME);
}

// Универсальная функция показа уведомлений (успех/ошибка отправки).
export const showNotification = (element, cbKeyDown) => {
  const messageTemplate = document.querySelector(`#${element}`).content.querySelector(`.${element}`); //Получаем шаблон
  const messageContainer = messageTemplate.cloneNode(true); // Клонируем шаблон.
  const button = messageContainer.querySelector('button'); // Находим кнопку внутри сообщения.
  body.append(messageContainer); // Добавляем сообщение в DOM.

  // Функция закрытия уведомления.
  function onCloseNotification(evt) {
    evt.stopPropagation(); //Прекращаем всплытие
    const hasElementTarget = [messageContainer, button].includes(evt.target);
    if (hasElementTarget || isEscKeyDown(evt)) { // Закрываем по клику на сообщение/кнопку или по Esc.
      messageContainer.remove(); // Удаляем сообщение.
      body.removeEventListener('keydown', onCloseNotification); //Удаляем обработчик
      body.removeEventListener('click', onCloseNotification); //Удаляем обработчик
      if (element === 'error') {
        document.addEventListener('keydown', cbKeyDown); //Если ошибка, добавляем cbKeyDown
      }
    }
  }

  button.addEventListener('click', onCloseNotification); //Обработчик на кнопку

  body.addEventListener('keydown', onCloseNotification); //Обработчик на keydown
  body.addEventListener('click', onCloseNotification); //Обработчик на click
};
