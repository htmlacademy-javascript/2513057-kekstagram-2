const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const removeThumbnails = () => {
  picturesContainer.querySelectorAll('a.picture').forEach((item) => item.remove());
};

// Рендерит миниатюры и возвращает элементы с индексами
export const renderThumbnails = (data) => {
  const fragment = document.createDocumentFragment();

  removeThumbnails();

  data?.forEach(({ url, description, likes, comments }, index) => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.index = index;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);

};
