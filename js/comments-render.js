const COMMENTS_PER_STEP = 5;
const commentTemplate = document.querySelector('.social__comment');

const commentList = document.querySelector('.social__comments');
const commentCountBlock = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const shownCountElement = document.querySelector('.social__comment-shown-count');
const totalCountElement = document.querySelector('.social__comment-total-count');

let allComments = [];
let renderedCount = 0;

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const renderedComments = allComments.slice(renderedCount, renderedCount + COMMENTS_PER_STEP);

  renderedComments.forEach(({ avatar, name, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });

  commentList.appendChild(fragment);
  renderedCount += renderedComments.length;

  shownCountElement.textContent = renderedCount;
  totalCountElement.textContent = allComments.length;

  if (renderedCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const initComments = (comments) => {
  commentList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentCountBlock.classList.remove('hidden');

  allComments = comments;
  renderedCount = 0;

  renderComments();
};

commentsLoader.addEventListener('click', renderComments);

export { initComments };
