// formWaterObj = {initialDoughHydratation: ... };
let formWaterObj = {};

preventDefaultOnEnterKeyPress(numberFieldsWater[0]);

export function calculateWaterSubmit() {
  if (!calcMainSubmit()) {
    return null;
  }

  if (!calcWater()) {
    return false;
  }

  localStorage.setItem('formWater', JSON.stringify(formWaterObj));
  return true;
}

export function calcWater() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsWater)) {
    return false;
  }

  const totalDoughFlour = breadParamsObj.total.flour;
  const totalDoughWater = breadParamsObj.total.water;
  const leavenWater = breadParamsObj.leaven.water;

  const initialWaterPercentStr = numberFieldsWater[0].value;
  const initialWaterPercent = Number(initialWaterPercentStr) / 100;

  // Reset in case of empty input
  if (!initialWaterPercent) {
    resetWaterForm();
    return false;
  }

  const initialWaterWeight =
    totalDoughFlour * initialWaterPercent - leavenWater;
  const secondaryWaterWeight =
    totalDoughWater - (initialWaterWeight + leavenWater);
  const secondaryWaterPercent =
    ((initialWaterWeight + secondaryWaterWeight + leavenWater) /
      totalDoughFlour) *
    100;
  const totalWaterWeightCheck = initialWaterWeight + secondaryWaterWeight;

  // Print results
  printResult(initialWaterWeight, initialWaterResultElem, 0);
  printResult(secondaryWaterWeight, secondaryWaterResultElem, 0);
  printResult(secondaryWaterPercent, secondaryWaterPercentResultElem, 0, {
    prefix: '',
    postfix: ' %',
  });
  printResult(totalWaterWeightCheck, totalWaterCheckResultElem, 0);

  // Set storage object
  formWaterObj.initialDoughHydratation = initialWaterPercentStr;
  return true;
}

export function getStorageAndCalculateWater() {
  getLocalStorageWater();
  calcWater();
}

//IMPORTS
import {
  totalWaterCheckResultElem,
  numberFieldsWater,
  initialWaterResultElem,
  secondaryWaterResultElem,
  secondaryWaterPercentResultElem,
  formWater,
} from './elements.js';
import { calcMainSubmit, breadParamsObj } from './calcMain.js';
import { hasOutOfRangeFieldsValidation } from './validation.js';
import { resetWaterForm } from './reset.js';
import { preventDefaultOnEnterKeyPress } from './helpers.js';
import { getLocalStorageWater } from './storage.js';
import { printResult } from './print.js';
