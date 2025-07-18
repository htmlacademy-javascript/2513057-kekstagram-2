
import { generatePhotos } from './photos.js';
import { renderThumbnails } from './render-thumbnails.js';
import { initFullSizeViewer } from './full-size-viewer.js';

const photos = generatePhotos();
renderThumbnails(photos);
initFullSizeViewer(photos);


