
import { renderThumbnails } from './render-thumbnails.js';
import { initFullSizeViewer } from './full-size-viewer.js';
import { initUploadModal } from './upload-photo-form.js';
import { getData } from './api.js';
import { showLoadingDataError } from './error';

initUploadModal();

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFullSizeViewer(photos);
  }
  )
  .catch(() => {
    showLoadingDataError();
  });
