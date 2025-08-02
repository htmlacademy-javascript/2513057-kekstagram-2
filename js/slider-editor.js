import {uploadForm, imgPreview} from './element.js';
import {getEffectSelector} from './utils.js';
import {Effects, EFFECT_LEVEL_MAX, StyleFilterByEffects} from './const.js';

const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = EFFECT_LEVEL_MAX;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const selectorImg = imgPreview.classList;

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

const getUpdateSladerOptions = (effect, sliderElement) =>
  sliderElement.noUiSlider.updateOptions(Effects[effect]);

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.className = 'effects__preview--none';
};

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if (currentRadioBtn) {
    const effectBthValue = currentRadioBtn.value;
    imgPreview.className = getEffectSelector(effectBthValue);
    getUpdateSladerOptions(effectBthValue, effectSlider);
  }
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

effectSlider.noUiSlider.on('update', () => {
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

export {onEffectRadioBtnClick, resetFilter};
