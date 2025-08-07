
const REMOVE_ERROR_MESSAGE_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadingErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

export function showLoadingDataError (){
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_ERROR_MESSAGE_TIME);
}

export function showUploadingDataError () {
  const uploadingErrorMessage = uploadingErrorTemplate.cloneNode(true);
  const errorButton = uploadingErrorMessage.querySelector('.error__button');

  body.append(uploadingErrorMessage);

  function onBodyEscKeydown (evt) {
    if (!isEscapeKey(evt)) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    closeErrorMessage();
  }

  function onBodyClick (evt){
    if (!document.contains(uploadingErrorMessage)) {
      return;
    }
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  }

  function onErrorButtonClick (evt) {
    evt.stopPropagation();
    closeErrorMessage();
  }

  function closeErrorMessage () {
    if (!document.contains(uploadingErrorMessage)) {
      return;
    }
    uploadingErrorMessage.remove();
    body.removeEventListener('keydown', onBodyEscKeydown);
    body.removeEventListener('click', onBodyClick);
    errorButton.removeEventListener('click', onErrorButtonClick);
  }

  errorButton.addEventListener('click', onErrorButtonClick);
  body.addEventListener('keydown', onBodyEscKeydown);
  body.addEventListener('click', onBodyClick);
}
