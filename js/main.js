
import { generatePhotos } from './photos.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initFullSizeViewer } from './full-size-viewer.js';
import { initUploadModal } from './upload-photo-form.js';
import { getData } from './api.js';

const photos = generatePhotos();
renderThumbnails(photos);
initFullSizeViewer(photos);
initUploadModal();

getData()
  .then((photos) => {
    renderPictures(photos);
    fillPictures(photos);
    initFilters(photos);
  }
  )
  .catch(() => {
    showLoadingDataError();
  });
