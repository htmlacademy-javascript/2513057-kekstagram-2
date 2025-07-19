import { getRandomInt } from './utils.js';

// Массив с возможными предложениями для комментариев
const COMMENT_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив с возможными именами комментаторов
const COMMENT_NAMES = ['Алексей', 'Мария', 'Иван', 'София', 'Павел', 'Анна', 'Дмитрий', 'Елена', 'Арсений', 'Кристина'];

// Счётчик для генерации уникальных ID комментариев
let commentIdCounter = 1;

// Функция для генерации одного комментария
export function generateComment() {
  // Выбираем 1 или 2 предложения
  const numSentences = getRandomInt(1, 2);
  let message = '';

  for (let i = 0; i < numSentences; i++) {
    const randomIndex = getRandomInt(0, COMMENT_SENTENCES.length - 1);
    message += COMMENT_SENTENCES[randomIndex] + ' ';
  }

  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: message.trim(),
    name: COMMENT_NAMES[getRandomInt(0, COMMENT_NAMES.length - 1)]
  };
}
pattern: /^#(\w+)(\s+#\w+)*$/

