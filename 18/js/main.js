import { renderThumbnails } from './render-thumbnails.js';
import { initFullSizeViewer } from './full-size-viewer.js';
import { initUploadModal } from './upload-photo-form.js';
import { getData } from './api.js';
import { showLoadingDataError } from './error';
import { configFilter } from './filters.js';

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

async function bootsrapApp() {
  configUpLoadHandLers();
  try{
    const pictures=await fetchPictures();
    renderPictures(pictures);
    configFilter(pictures);

}catch{
  showFetchError();
}
}
bootsrapApp();
