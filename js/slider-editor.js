import {Effects, EFFECT_LEVEL_MAX, StyleFilterByEffects} from './const.js';


const uploadForm = document. querySelector ('.img-upload__form');
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = EFFECT_LEVEL_MAX;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

const getUpdateSladerOptions = (effect) =>
 effectSlider.noUiSlider.updateOptions(Effects[effect]);

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.className = 'effects__preview--none';
};


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

  const onEffectRadioBtnClick =(evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  getUpdateSladerOptions(currentRadioBtn.value);
  effectSlider.noUiSlider.on ('update', ()=> {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item) => {
    if (item.checked) {
      if (item.value !== 'none') {
        sliderContainer.classList.remove('hidden');
        imgPreview.style.filter = StyleFilterByEffects[item.value](effectLevelInput.value);
      } else {
        resetFilter();
      }
    }
  });
});
};
export {onEffectRadioBtnClick, resetFilter};
