import {isEscKeyDown} from './utils.js';
import { error, isHashtagValid} from './validation.js';
import { initScale, resetScale } from './scale-control.js';
import { onEffectRadioBtnClick } from './slider-editor.js';
import { sendData } from './api.js';
import { showNotification } from './error.js';


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const onPhotoEditorResetBtnClick = ()=> {
  closePhotoEditor();
};
const onDocumentKeydown = (evt)=> {
  if (isEscKeyDown(evt)){
    evt.preventDefault();
      closePhotoEditor();
  }
};

const onFormSubmit = (evt)=> {
  evt.preventDefault();
  if(pristine.validate()){
    sendData(new FormData(evt.target))
    .then(closePhotoEditor)
    .then(()=> showNotification('success', onDocumentKeydown));
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













