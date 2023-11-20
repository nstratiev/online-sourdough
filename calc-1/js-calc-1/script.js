// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
  getLocaleStorageMain();
  calcMainSubmit();
  getLocaleStorageFlours();
  getLocaleStorageIngredients();
  calculateAdditionalFlours();
  calculateAdditionalIngredients();
  getLocalStorageCorrections();
  calculateHydrIncrement();
  calculateHydrDecrement();
  getLocalStorageWater();
  calcWater();
  getLocalStorageLeaven();
  calcLeaven();
});

// -- Focusout input listeners
addOnFocusOutInputsListener(numberFieldsMain);
addOnFocusOutInputsListener(numberFieldsFlours);
addOnFocusOutInputsListener(numberFieldsIngredients);
addOnFocusOutInputsListener(numberFieldsCorrections);
addOnFocusOutInputsListener(numberFieldsWater);
addOnFocusOutInputsListener(numberFieldsLeaven);

// -- OnInput input listeners
numberFieldsMain[1].addEventListener('input', () => {
  leavenHydrPredifinedResultElem.textContent = numberFieldsMain[1].value;
});

// -- Button-to-top listeners
window.addEventListener('scroll', onScreenScroll);
btnToTop.addEventListener('click', goToScreenTop);
// -- Buttons - global
btnGlobalReset.addEventListener('click', resetGlobalLocalStorage);
btnGlobalSave.addEventListener('click', setGlobalLocalStorage);

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
      checkmarkAlertGreen();
    } else if (btnClassName === 'btn-save') {
      setLocaleStorageMain();
      checkmarkAlertGreen();
    }
  } else if (btnsGroupClassName.includes('_flours')) {
    // console.log('FLOURS');
    if (btnClassName === 'btn-submit') {
      calcFloursAndIngredientsSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetFloursForm();
      checkmarkAlertGreen();
    } else if (btnClassName === 'btn-save') {
      setLocalStorageFloursAndIngredients();
      checkmarkAlertGreen();
    }
  } else if (btnsGroupClassName.includes('_corrections')) {
    // console.log('CORRECTIONS');
    if (btnClassName === 'btn-submit') {
      calculateCorrections();
    } else if (btnClassName === 'btn-reset') {
      resetCorrectionsForm();
      checkmarkAlertGreen();
    } else if (btnClassName === 'btn-save') {
      setLocalStorageCorrections();
      checkmarkAlertGreen();
    }
  } else if (btnsGroupClassName.includes('_water')) {
    // console.log('WATER');
    if (btnClassName === 'btn-submit') {
      calculateWaterSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetWaterForm();
      checkmarkAlertGreen();
    } else if (btnClassName === 'btn-save') {
      setLocalStorageWater();
      checkmarkAlertGreen();
    }
  } else if (btnsGroupClassName.includes('_leaven-feed')) {
    // console.log('LEAVEN FEED');
    if (btnClassName === 'btn-submit') {
      calculateLeavenSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetLeavenForm();
      checkmarkAlertGreen();
    } else if (btnClassName === 'btn-save') {
      setLocalStorageLeaven();
      checkmarkAlertGreen();
    }
  }
});

// IMPORTS
import { calcMainSubmit } from './calcMain.js';
import {
  calcFloursAndIngredientsSubmit,
  calculateAdditionalFlours,
  calculateAdditionalIngredients,
} from './calcFlours.js';
import {
  calculateCorrections,
  calculateHydrIncrement,
  calculateHydrDecrement,
} from './calcCorrections.js';

import { calcWater, calculateWaterSubmit } from './calcWater.js';
import { calculateLeavenSubmit, calcLeaven } from './calcLeaven.js';
import {
  resetMainForm,
  resetFloursForm,
  resetGlobalLocalStorage,
  resetCorrectionsForm,
  resetWaterForm,
  resetLeavenForm,
} from './reset.js';
import {
  btnToTop,
  btnGlobalReset,
  btnGlobalSave,
  numberFieldsMain,
  numberFieldsFlours,
  numberFieldsIngredients,
  numberFieldsCorrections,
  numberFieldsWater,
  numberFieldsLeaven,
  leavenHydrPredifinedResultElem,
} from './elements.js';

import { onScreenScroll, goToScreenTop } from './scroll.js';
import { addOnFocusOutInputsListener } from './validation.js';
import {
  setGlobalLocalStorage,
  getLocaleStorageMain,
  setLocaleStorageMain,
  getLocaleStorageFlours,
  getLocaleStorageIngredients,
  setLocalStorageFloursAndIngredients,
  getLocalStorageCorrections,
  setLocalStorageCorrections,
  getLocalStorageWater,
  setLocalStorageWater,
  getLocalStorageLeaven,
  setLocalStorageLeaven,
} from './storage.js';
import { checkmarkAlertGreen } from './alerts.js';
