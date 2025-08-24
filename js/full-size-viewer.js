import { isEscKeyDown } from './utils.js';
import { initComments } from './comments-render.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// Функция, которая заполняет блок с данными фото
const fillBigPicture = (photoData) => {
  bigPicture.querySelector('.big-picture__img img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.social__caption').textContent = photoData.description;

  // Вставка комментариев
  initComments(photoData.comments);
};

// Открытие полноразмерного изображения
const openBigPicture = (photoData) => {
  fillBigPicture(photoData); // Вызываем функцию для заполнения данных

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
};

// Закрытие модального окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

// Обработчик закрытия по клавише Esc
function onEscKeyDown(evt) {
  if (isEscKeyDown(evt)) {
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);

// Инициализация полноразмерного изображения
export const initFullSizeViewer = (photos) => {
  const pictureElements = document.querySelectorAll('.picture');

  pictureElements.forEach((element) => {
    element.addEventListener('click', () => {
      const index = +element.dataset.index;
      openBigPicture(photos[index]);
    });
  });
};
