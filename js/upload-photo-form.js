import {isEscKeyDown} from './utils.js';
import { error, isHashtagValid} from './validation.js';
import { initScale, resetScale } from './scale-control.js';
import { onEffectRadioBtnClick, resetFilter } from './slider-editor.js';
import { sendData } from './api.js';
import { showNotification } from './error.js';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit'); // Получаем кнопку отправки

const onPhotoEditorResetBtnClick = ()=> {
  closePhotoEditor();
};
const onDocumentKeydown = (evt)=> {
  if (isEscKeyDown(evt)){
    evt.preventDefault();
      closePhotoEditor();
  }
};

// Функция блокировки кнопки
const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...'; // Изменяем текст кнопки
};

// Функция разблокировки кнопки
const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить'; // Возвращаем исходный текст
};

const onFormSubmit = (evt)=> {
  evt.preventDefault();
  if(pristine.validate()){
    disableSubmitButton(); // Блокируем кнопку перед отправкой
    sendData(new FormData(evt.target))
    .then(closePhotoEditor)
    .then(()=> showNotification('success', onDocumentKeydown))
    .finally(() => enableSubmitButton()); // Разблокируем кнопку в любом случае (успех/ошибка)
  }
};

function closePhotoEditor (){
  resetScale();
  resetFilter();
  pristine.reset();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadForm.reset();
  enableSubmitButton(); //  Разблокируем кнопку при закрытии редактора
}

export const initUploadModal =()=> {
  uploadFileControl.addEventListener('change',()=> {
    initScale();
    effectRadioBtns.forEach((button)=>
    button.addEventListener('click',onEffectRadioBtnClick)
  );
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  });
  uploadForm.addEventListener('submit', onFormSubmit);
};


const pristine = new Pristine(uploadForm,{
  classTo:'img-upload__field-wrapper',
  errorClass:'img-upload__field-wrapper--error',
  errorTextParent:'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput, isHashtagValid, error, 2, false);
uploadForm.addEventListener('submit', onFormSubmit);
