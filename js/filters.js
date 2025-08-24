import { FILTER, MAX_PICTURE_COUNT, SORT_FUNC } from './const.js';
import { initFullSizeViewer } from './full-size-viewer.js';
import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './utils.js';


let currentFilter = FILTER.default;
let pictures = [];

const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const debounceRender = debounce(renderThumbnails);
const debounceRenderFullSizeViewer = debounce(initFullSizeViewer);
function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORT_FUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted(SORT_FUNC.discussed);
  }
  debounceRender(filteredPictures);
  debounceRenderFullSizeViewer(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
}
export { configFilter };
