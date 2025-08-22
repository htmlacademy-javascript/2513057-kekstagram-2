import {Effects, EFFECT_LEVEL_MAX, StyleFilterByEffects} from './const.js';


const uploadForm = document. querySelector ('.img-upload__form');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = EFFECT_LEVEL_MAX;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

const getUpdateSliderOptions = (effect) =>{
 effectSlider.noUiSlider.updateOptions(Effects[effect]);
};

function resetFilter() {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.className = 'effects__preview--none';
}



noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');


const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  getUpdateSliderOptions(currentRadioBtn.value);

  effectSlider.noUiSlider.on('update', () => {
    let effectLevelValue = effectSlider.noUiSlider.get(); // Получаем значение слайдера

    effectRadioBtns.forEach((item) => {
      if (item.checked) {
        if (item.value !== 'none') {
          sliderContainer.classList.remove('hidden');

          // Преобразуем значение слайдера в число
          effectLevelValue = Number(effectLevelValue);

          // Проверяем, является ли значение числом и не NaN
          if (isNaN(effectLevelValue)) {
            console.error('Получено не числовое значение слайдера!');
            return; // Прерываем выполнение, если не число
          }

          // Применяем фильтр
          imgPreview.style.filter = StyleFilterByEffects[item.value](effectLevelValue);
        } else {
          resetFilter();
        }
      }
    });
     effectLevelInput.value = effectLevelValue; // Обновляем значение инпута
  });
};

  
export {onEffectRadioBtnClick, resetFilter};
