// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
  getStorageAndCalculateMain();
  getStorageAndCalculateFlours();
  getStorageAndCalculateCorrections();
  getStorageAndCalculateWater();
  getStorageAndCalculateLeaven();

  // TEST
  const decimalOneDigitInputs = document.querySelectorAll('input[step="0.1"]');
  decimalOneDigitInputs.forEach(el => {
    el.addEventListener('focusout', () => validationForDecimalPoint(el));
    console.log(el);
  });

  function validationForDecimalPoint(numField) {
    const numValue = numField.value;

    if (numValue !== '' && numValue.includes('.') === false) {
      numField.value = numValue + '.0';
    }
  }

});

// -- OnEnter form listeners
addOnEnterFormListener(formMain, calculateAllForms);
// addOnEnterFormListener(formMain, calcMainSubmit);
addOnEnterFormListener(formFlours, calcFloursAndIngredientsSubmit);
addOnEnterFormListener(formCorrections, calculateCorrections);
addOnEnterFormListener(formWater, calculateWaterSubmit);
addOnEnterFormListener(formLeaven, calculateLeavenSubmit);

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
      calculateAllForms();
      // calcMainSubmit();
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

function calculateAllForms() {
  calcMainSubmit();
  calculateAdditionalFlours();
  calculateAdditionalIngredients();
  calculateHydrIncrement();
  calculateHydrDecrement();
  calcWater();
  calcLeaven();
}

// IMPORTS
import {
  formMain,
  formFlours,
  formCorrections,
  formWater,
  formLeaven,
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

import { calcMainSubmit, getStorageAndCalculateMain } from './calcMain.js';
import {
  calcFloursAndIngredientsSubmit,
  getStorageAndCalculateFlours,
  calculateAdditionalFlours,
  calculateAdditionalIngredients,
} from './calcFlours.js';
import {
  calculateCorrections,
  getStorageAndCalculateCorrections,
  calculateHydrIncrement,
  calculateHydrDecrement,
} from './calcCorrections.js';

import {
  getStorageAndCalculateWater,
  calculateWaterSubmit,
  calcWater,
} from './calcWater.js';
import {
  calculateLeavenSubmit,
  getStorageAndCalculateLeaven,
  calcLeaven,
} from './calcLeaven.js';

import {
  resetMainForm,
  resetFloursForm,
  resetGlobalLocalStorage,
  resetCorrectionsForm,
  resetWaterForm,
  resetLeavenForm,
} from './reset.js';

import {
  setGlobalLocalStorage,
  setLocaleStorageMain,
  setLocalStorageFloursAndIngredients,
  setLocalStorageCorrections,
  setLocalStorageWater,
  setLocalStorageLeaven,
} from './storage.js';

import { addOnFocusOutInputsListener } from './validation.js';
import { checkmarkAlertGreen } from './alerts.js';
import { onScreenScroll, goToScreenTop } from './scroll.js';
import { addOnEnterFormListener } from './helpers.js';
