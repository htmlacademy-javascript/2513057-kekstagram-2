const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const tempData = [
  {
    url: 'photos/1.jpg',
    description: 'Закат на пляже',
    likes: 152,
    comments: ['Красота!', 'Где это?']
  },
  {
    url: 'photos/2.jpg',
    description: 'Горы и озеро',
    likes: 200,
    comments: ['Ух ты!', 'Как будто в сказке']
  }
];

export const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { tempData };
