import { generatePhotos } from './photos.js';
// Генерируем массив фотографий и выводим в консоль
const photosArray = generatePhotos();
console.log(photosArray);


import { renderThumbnails } from './render-thumbnails.js';

document.addEventListener('DOMContentLoaded', () => {
  const photosArray = generatePhotos();
  console.log(photosArray); // Проверка данных в консоли
  renderThumbnails(photosArray); // Передаём реальные данные в рендер
});
