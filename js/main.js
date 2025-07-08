
import { generatePhotos } from './photos.js';
import { renderThumbnails} from './render-thumbnails.js';

const photos = generatePhotos();
renderThumbnails(photos);


