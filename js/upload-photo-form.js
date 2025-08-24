import { isEscKeyDown } from './utils.js';
import { error, isHashtagValid } from './validation.js';
import { initScale, resetScale } from './scale-control.js';
import { onEffectRadioBtnClick, resetFilter } from './slider-editor.js';
import { sendData } from './api.js';
import { showNotification } from './error.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit'); // Получаем кнопку отправки
const effectsPreviewEffects = document.querySelectorAll('.effects__preview');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const onPhotoEditorResetBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      closePhotoEditor();
    }
  }
};

function onFileInputChange() {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);
  if (matches) {
    const previewImgUrl = URL.createObjectURL(file);
    preview.src = previewImgUrl;
    effectsPreviewEffects.forEach((previewEffect) => {
      previewEffect.style.backgroundImage = `url(${previewImgUrl})`;
    });
  } else {
    closePhotoEditor();
  }
}


// Функция блокировки кнопки
function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка…'; // Изменяем текст кнопки
}


// Функция разблокировки кнопки
function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать'; // Возвращаем исходный текст
}


const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    disableSubmitButton(); // Блокируем кнопку перед отправкой
    sendData(new FormData(evt.target))
      .then(closePhotoEditor)
      .then(() => showNotification('success', onDocumentKeydown))
      .catch(() => showNotification('error', onDocumentKeydown))
      .finally(() => enableSubmitButton()); // Разблокируем кнопку в любом случае (успех/ошибка)
  }
};


function closePhotoEditor() {
  resetScale();
  resetFilter();
  pristine.reset();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();

}


export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    onFileInputChange();
    initScale();
    effectRadioBtns.forEach((button) =>
      button.addEventListener('click', onEffectRadioBtnClick)
    );
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  });
  uploadForm.addEventListener('submit', onFormSubmit);

};


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);


