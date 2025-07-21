import {isEscapeKey} from './utils.js';
const uploadForm  = document.querySelector('.img-upload__form');
const padeBody = document.querySelector('.body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


const onPhotoEditorResetBtnClick = ()=> {
  closePhotoEditor();
}
const onDocumentKeydown = (evt)=> {
  if (isEscapeKey(evt)){
    evt.preventDefault();
      closePhotoEditor();
  }
 };

function closePhotoEditor (){
  photoEditorForm.classList.add(hidden);
  padeBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

export const initUploadModal = ()=> {
  uploadFileControl.addEventListener('change'),()=> {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click',onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };
};


const pristine = new Pristine(uploadForm,{
  classTo:'img-upload__field-wrapper',
  errorClass:'img-upload__field-wrapper--error',
  errorTextParent:'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput),(value)=> {
  const hasNamber=/\d/.test(value);
  console.log(hasNamber, value);
  return !hasNamber;
},('Ошибка здесь');
