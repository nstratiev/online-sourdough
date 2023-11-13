// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
  getLocaleStorageMain();
  calcMainSubmit();
  getLocaleStorageFlours();
  getLocaleStorageIngredients();
  calculateAdditionalFlours();
  calculateAdditionalIngredients();
});

// -- Focusout input listeners
for (const field of numberFieldsMain) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const isRequired = e.target.required;
    onFocusOutValidation(e.target, min, max, isRequired);
  });
}

for (const field of numberFieldsFlours) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const isRequired = e.target.required;
    onFocusOutValidation(e.target, min, max, isRequired);
  });
}

for (const field of numberFieldsIngredients) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const isRequired = e.target.required;
    onFocusOutValidation(e.target, min, max, isRequired);
  });
}

// -- Button-to-top listeners
window.addEventListener('scroll', onScreenScroll);
btnToTop.addEventListener('click', goToScreenTop);
// -- Buttons - global
btnGlobalReset.addEventListener('click', resetGlobalLocalStorage);
btnGlobalSave.addEventListener('click', () => {
  setGlobalLocalStorage();
  temporaryOnClickAlert('&check;', 400, 'green');
});

// -- Buttons listeners
document.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  const btnsGroupClassName = e.target.parentElement.className;
  const btnClassName = e.target.className;

  if (btnsGroupClassName.includes('_main')) {
    // console.log('MAIN');
    if (btnClassName === 'btn-submit') {
      calcMainSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetMainForm();
      temporaryOnClickAlert('&check;', 400, 'green');
    } else if (btnClassName === 'btn-save') {
      setLocaleStorageMain();
      temporaryOnClickAlert('&check;', 400, 'green');
    }
  } else if (btnsGroupClassName.includes('_flours')) {
    // console.log('FLOURS');
    if (btnClassName === 'btn-submit') {
      calcFloursAndIngredientsSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetFloursInputs();
      temporaryOnClickAlert('&check;', 400, 'green');
    } else if (btnClassName === 'btn-save') {
      setLocalStorageFloursAndIngredients();
      temporaryOnClickAlert('&check;', 400, 'green');
    }
  } else if (btnsGroupClassName.includes('_corrections')) {
    // console.log('CORRECTIONS');
  } else if (btnsGroupClassName.includes('_water')) {
    // console.log('WATER');
  } else if (btnsGroupClassName.includes('_leaven-feed')) {
    // console.log('LEAVEN FEED');
  }
});

// IMPORTS
import { calcMainSubmit, breadParamsObj } from './calcMain.js';
import {
  calcFloursAndIngredientsSubmit,
  calculateAdditionalFlours,
  calculateAdditionalIngredients,
} from './calcFlours.js';
import {
  resetMainForm,
  resetFloursInputs,
  resetGlobalLocalStorage,
} from './reset.js';
import {
  btnToTop,
  btnGlobalReset,
  btnGlobalSave,
  numberFieldsMain,
  numberFieldsFlours,
  numberFieldsIngredients,
} from './elements.js';

import { onScreenScroll, goToScreenTop } from './scroll.js';
import { onFocusOutValidation } from './validation.js';
import {
  setGlobalLocalStorage,
  getLocaleStorageMain,
  setLocaleStorageMain,
  getLocaleStorageFlours,
  getLocaleStorageIngredients,
  setLocalStorageFloursAndIngredients,
} from './storage.js';
import { temporaryOnClickAlert } from './alerts.js';
