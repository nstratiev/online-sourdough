// formWaterObj = {initialDoughHydratation: ... };
let formWaterObj = {};

preventDefaultOnEnterKeyPress(numberFieldsWater[0]);

export function calculateWaterSubmit() {
  if (!calcMainSubmit()) {
    return false;
  }

  if (!calcWater()) {
    return false;
  }

  localStorage.setItem('formWater', JSON.stringify(formWaterObj));
}

export function calcWater() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!valuesRangeValidation(numberFieldsWater)) {
    return false;
  }

  const totalDoughFlour = breadParamsObj.total.flour;
  const totalDoughWater = breadParamsObj.total.water;
  const leavenWater = breadParamsObj.leaven.water;

  const initialWaterPercentStr = numberFieldsWater[0].value;
  const initialWaterPercent = Number(initialWaterPercentStr) / 100;

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
  if (initialWaterWeight) {
    initialWaterResultElem.textContent = `${initialWaterWeight.toFixed(0)}`;
  } else {
    initialWaterResultElem.textContent = '';
  }

  if (secondaryWaterWeight) {
    secondaryWaterResultElem.textContent = `${secondaryWaterWeight.toFixed(0)}`;
  } else {
    secondaryWaterResultElem.textContent = '';
  }

  if (secondaryWaterPercent) {
    secondaryWaterPercentResultElem.textContent = `${secondaryWaterPercent.toFixed(
      0
    )} %`;
  } else {
    secondaryWaterPercentResultElem.textContent = '';
  }

  if (totalWaterWeightCheck) {
    totalWaterCheckResultElem.textContent = `${totalWaterWeightCheck.toFixed(
      0
    )}`;
  } else {
    totalWaterCheckResultElem.textContent = '';
  }

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
import { valuesRangeValidation } from './validation.js';
import { resetWaterForm } from './reset.js';
import { preventDefaultOnEnterKeyPress } from './helpers.js';
import { getLocalStorageWater } from './storage.js';
