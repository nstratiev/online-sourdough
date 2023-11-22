let isFirstPageLoadEmptyFieldCheck = true;
let isFirstPageLoadOutOfRangeCheck = true;

/*  
const breadParamsObj = {
  formula: {
    prefermFlourPercent,
    leavenHydr,
    waterPercent,
    saltPercent,
  },
  doughWeight,
  leaven: { flour, water },
  kneading: { flour, leaven, water, salt },
  total: { flour, water },
};
*/

export let breadParamsObj = {
  formula: {},
  doughWeight: null,
  leaven: {},
  kneading: {},
  total: {},
};

// Main Calculation on submit
export function calcMainSubmit() {
  let formData = new FormData(formMain);
  const formDataObj = formdataToObject(formData);

  // Validation - Empty fields
  const conditionHasEmpty = hasEmptyFieldsValidation(numberFieldsMain);

  if (conditionHasEmpty[0]) {
    if (isFirstPageLoadEmptyFieldCheck) {
      isFirstPageLoadEmptyFieldCheck = false;
    } else {
      setLocaleStorageMain();

      setTimeout(() => {
        alertEmptyFieldBox
          .open()
          .then((val) => {
            conditionHasEmpty[1].focus();
          })
          .catch((val) => {});
      }, 100);
    }

    resetAllResults();
    breadParamsObj = null;
    return false;
  }

  // Validation - Out of range fields
  const conditionOutOfRange = hasOutOfRangeFieldsValidation(numberFieldsMain);

  if (conditionOutOfRange[0]) {
    if (isFirstPageLoadOutOfRangeCheck) {
      isFirstPageLoadOutOfRangeCheck = false;
    } else {
      setLocaleStorageMain();
    }

    resetAllResults();
    breadParamsObj = null;
    return false;
  }

  // Input values
  const prefermFlourPercent = formDataObj.prefermFlourPercent / 100;
  const leavenHydratationPercent = formDataObj.leavenHydratationPercent / 100;
  const waterPercent = formDataObj.waterPercent / 100;
  const saltPercent = formDataObj.saltPercent / 100;
  const loafsCount = formDataObj.loafsCount;
  const loafWeight = formDataObj.loafWeight;
  numberFieldsWater[0].setAttribute('max', formDataObj.waterPercent);
  leavenHydrPredifinedResultElem.textContent =
    formDataObj.leavenHydratationPercent;

  // Calculated values
  const totalDoughWeight = getTotalDoughWeight(loafsCount, loafWeight);
  const totalFlour = getTotalFlour(totalDoughWeight, waterPercent, saltPercent);
  const totalWater = getTotalWater(totalFlour, waterPercent);
  const totalSalt = getTotalSalt(totalFlour, saltPercent);
  const leavenObj = getLeavenComponents(
    totalFlour,
    prefermFlourPercent,
    leavenHydratationPercent
  );

  // Set kneading object
  const kneadingdObj = getIngredientsForKneading(
    totalFlour,
    totalWater,
    totalSalt,
    leavenObj.leavenFlour,
    leavenObj.leavenWater
  );

  // Print calculated values
  printMainPrimaryResults();
  printMainSecondaryResults();

  // Set breadParamsObj
  breadParamsObj = {
    formula: {},
    doughWeight: null,
    leaven: {},
    kneading: {},
    total: {},
  };

  breadParamsObj.formula.prefermFlourPercent = prefermFlourPercent;
  breadParamsObj.formula.leavenHydr = leavenHydratationPercent;
  breadParamsObj.formula.waterPercent = waterPercent;
  breadParamsObj.formula.saltPercent = saltPercent;
  breadParamsObj.doughWeight = totalDoughWeight;
  breadParamsObj.leaven.flour = leavenObj.leavenFlour;
  breadParamsObj.leaven.water = leavenObj.leavenWater;
  breadParamsObj.kneading.flour = kneadingdObj.flour;
  breadParamsObj.kneading.leaven = leavenObj.leavenTotal;
  breadParamsObj.kneading.water = kneadingdObj.water;
  breadParamsObj.kneading.salt = kneadingdObj.salt;
  breadParamsObj.total.flour = totalFlour;
  breadParamsObj.total.water = totalWater;

  // Set localStorage
  setLocaleStorageMain();

  if (isFirstPageLoadEmptyFieldCheck || isFirstPageLoadOutOfRangeCheck) {
    isFirstPageLoadEmptyFieldCheck = false;
    isFirstPageLoadOutOfRangeCheck = false;
  } else {
    checkmarkAlertGreen();
  }

  return true;

  // Inner functions
  function printMainPrimaryResults() {
    doughWeightElement.textContent = totalDoughWeight.toFixed(0);
    flourWeightElement.textContent = kneadingdObj.flour.toFixed(0);
    leavenWeightElement.textContent = leavenObj.leavenTotal.toFixed(0);
    waterWeightElement.textContent = kneadingdObj.water.toFixed(0);
    saltWeightElement.textContent = kneadingdObj.salt.toFixed(0);
  }

  function printMainSecondaryResults() {
    flourLeavenElement.textContent = leavenObj.leavenFlour.toFixed(0);
    waterLeavenElement.textContent = leavenObj.leavenWater.toFixed(0);
    flourTotalElement.textContent = totalFlour.toFixed(0);
    waterTotalElement.textContent = totalWater.toFixed(0);
  }
}

export function getStorageAndCalculateMain() {
  getLocaleStorageMain();
  calcMainSubmit();
}

// IMPORTS
import {
  formMain,
  numberFieldsMain,
  numberFieldsWater,
  leavenHydrPredifinedResultElem,
  doughWeightElement,
  flourWeightElement,
  leavenWeightElement,
  waterWeightElement,
  saltWeightElement,
  flourLeavenElement,
  waterLeavenElement,
  flourTotalElement,
  waterTotalElement,
} from './elements.js';

import {
  hasEmptyFieldsValidation,
  hasOutOfRangeFieldsValidation,
} from './validation.js';

import { alertEmptyFieldBox, checkmarkAlertGreen } from './alerts.js';
import { resetAllResults } from './reset.js';
import { getLocaleStorageMain, setLocaleStorageMain } from './storage.js';

import {
  getTotalDoughWeight,
  getTotalFlour,
  getTotalWater,
  getTotalSalt,
  getLeavenComponents,
  getIngredientsForKneading,
} from './math.js';

import { formdataToObject } from './helpers.js';
