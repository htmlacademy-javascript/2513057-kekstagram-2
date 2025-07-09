const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentList = bigPicture.querySelector('.social__comments');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const fillBigPicture = (photoData) => {
  bigPicture.querySelector('.big-picture__img img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.social__caption').textContent = photoData.description;

  bigPicture.querySelector('.social__comment-total-count').textContent = photoData.comments.length;
  bigPicture.querySelector('.social__comment-shown-count').textContent = photoData.comments.length;

  commentList.innerHTML = '';
  photoData.comments.forEach(({ avatar, name, message }) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    commentList.appendChild(li);
  });

  // Скрываем блоки, как по заданию
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const openBigPicture = (photoData) => {
  fillBigPicture(photoData);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);

// Привязка к миниатюрам
export const initFullSizeViewer = (photos) => {
  const pictureElements = document.querySelectorAll('.picture');

  pictureElements.forEach((element) => {
    element.addEventListener('click', () => {
      const index = +element.dataset.index;
      openBigPicture(photos[index]);
    });
  });
};
