// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
  getLocaleStorageMain();
  calcMainSubmit();
});

// -- Focusout input listeners
for (const field of numberFieldsMain) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    onFocusOutValidation(e.target, min, max);
  });
}

// -- Button-to-top listeners
window.addEventListener('scroll', onScreenScroll);
btnToTop.addEventListener('click', goToScreenTop);

// -- Form listeners
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
      temporaryOnClickAlert('&check;', 500, 'green');
    } else if (btnClassName === 'btn-save') {
      setLocaleStorageMain();
      temporaryOnClickAlert('&check;', 500, 'green');
    }
  } else if (btnsGroupClassName.includes('_flours')) {
    // console.log('FLOURS');
  } else if (btnsGroupClassName.includes('_corrections')) {
    // console.log('CORRECTIONS');
  } else if (btnsGroupClassName.includes('_water')) {
    // console.log('WATER');
  } else if (btnsGroupClassName.includes('_leaven-feed')) {
    // console.log('LEAVEN FEED');
  }
});

// IMPORTS
import calcMainSubmit from './calcMain.js';
import { resetMainForm } from './reset.js';
import { btnToTop, numberFieldsMain } from './elements.js';

import { onScreenScroll, goToScreenTop } from './scroll.js';
import { onFocusOutValidation } from './validation.js';
import { getLocaleStorageMain, setLocaleStorageMain } from './storage.js';
import { temporaryOnClickAlert } from './alerts.js';
