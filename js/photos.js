import { getRandomInt } from './utils.js';
import { generateComment } from './comments.js';

// Функция для генерации массива из 25 фото-объектов
export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    // Генерация массива комментариев (от 0 до 30)
    const numComments = getRandomInt(0, 30);
    const comments = [];

    for (let j = 0; j < numComments; j++) {
      comments.push(generateComment());
    }

    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии №${i}`,
      likes: getRandomInt(15, 200),
      comments: comments
    });
  }

  return photos;
}

