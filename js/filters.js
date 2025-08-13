import { FILTER, MAX_PICTURE_COUNT, SORTFUNC } from './const.js';
import { renderPictures } from './render-thumbnails.js';
import { debounce } from './utils.js';


let currentFilter =FILTER.default;
let pictures = [];

const filterElement = document.duerySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = '.img-filters_button--active';

const debounceRender = debounce(renderPictures);

function onFilterChange(evt) {
  const targetButton =evt.target;
  const activeButton = document.duerySelector (`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')){
    return;
}

if (activeButton === targetButton) {
     return;
 }
 activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
 targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
 currentFilter =targetButton.getAttribute('id');

 applyFilter();
}

function applyFilter(){
  let filteredPictures =[];
  if (currentFilter === FILTER.discussed){
    filteredPictures = pictures;
  }
  if(currentFilter === FILTER.random){
    filteredPictures = pictures.toSorted(SORTFUNC.random).slice(0,MAX_PICTURE_COUNT);
  }
  if(currentFilter === FILTER.discussed){
    filteredPictures = pictures.toSorted(SORTFUNC.discussed);
  }
  debounceRender(filteredPictures);
  }

  function configFilter(picturesData){
    filterElement.classList.remove('img-filters--inactive');
    filterElement.addEventListener('click', onFilterChange);
    pictures = picturesData;
  }
export{configFilter};
