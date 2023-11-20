// formCorrectionsObj = {hydratationIncrement: ... , hydratationDecrement: ...};
let formCorrectionsObj = {};

export function calculateCorrections() {
  if (!calcMainSubmit()) {
    return;
  }

  if (!calculateHydrIncrement() || !calculateHydrDecrement()) {
    return false;
  }

  localStorage.setItem('formCorrections', JSON.stringify(formCorrectionsObj));
}

export function calculateHydrIncrement() {
  if (breadParamsObj === null) {
    return false;
  }

  const totalDoughFlour = breadParamsObj.total.flour;

  // Validation
  if (!valuesRangeValidation(numberFieldsCorrections)) {
    return false;
  }

  const incrementHydrPercentStr = numberFieldsCorrections[0].value;
  let incrementHydrPercent = null;
  let additionalWaterWeight = null;

  if (incrementHydrPercentStr) {
    incrementHydrPercent = Number(incrementHydrPercentStr) / 100;
    additionalWaterWeight = totalDoughFlour * incrementHydrPercent;

    formCorrectionsObj.hydratationIncrement = incrementHydrPercentStr;
  }

  if (additionalWaterWeight) {
    correctionsIncrResultElemWater.textContent = `+ ${additionalWaterWeight.toFixed(
      1
    )} g (вода)`;
  } else {
    correctionsIncrResultElemWater.textContent = '';
  }

  return true;
}

export function calculateHydrDecrement() {
  if (breadParamsObj === null) {
    return false;
  }

  const waterPercent = breadParamsObj.formula.waterPercent;
  const saltPercent = breadParamsObj.formula.saltPercent;
  const totalDoughFlour = breadParamsObj.total.flour;
  const totalDoughWater = breadParamsObj.total.water;
  const leavenFlour = breadParamsObj.leaven.flour;

  // Validation
  if (!valuesRangeValidation(numberFieldsCorrections)) {
    return false;
  }

  const decrementHydrPercentStr = numberFieldsCorrections[1].value;
  let decrementHydrPercent = null;
  let additionalFlourWeight = null;
  let additionalSaltWeight = null;
  let prefermFlourPercent = null;

  if (decrementHydrPercentStr) {
    decrementHydrPercent = Number(decrementHydrPercentStr) / 100;
    additionalFlourWeight =
      totalDoughWater / (waterPercent - decrementHydrPercent) - totalDoughFlour;

    additionalSaltWeight = additionalFlourWeight * saltPercent;
    prefermFlourPercent =
      (leavenFlour / (totalDoughFlour + additionalFlourWeight)) * 100;

    formCorrectionsObj.hydratationDecrement = decrementHydrPercentStr;
  }

  if (additionalFlourWeight) {
    correctionsDecrResultElemFlour.textContent = `+ ${additionalFlourWeight.toFixed(
      1
    )} g (брашно)`;
  } else {
    correctionsDecrResultElemFlour.textContent = '';
  }

  if (additionalSaltWeight) {
    correctionsDecrResultElemSalt.textContent = `+ ${additionalSaltWeight.toFixed(
      1
    )} g (сол)`;
  } else {
    correctionsDecrResultElemSalt.textContent = '';
  }

  if (prefermFlourPercent) {
    correctionsDecrResultElemPreferm.textContent = `Прфб. - променено: ${prefermFlourPercent.toFixed(
      1
    )} %`;
  } else {
    correctionsDecrResultElemPreferm.textContent = '';
  }

  return true;
}

export function getStorageAndCalculateCorrections() {
  getLocalStorageCorrections();
  calculateHydrIncrement();
  calculateHydrDecrement();
}

// IMPORTS
import {
  numberFieldsCorrections,
  correctionsIncrResultElemWater,
  correctionsDecrResultElemFlour,
  correctionsDecrResultElemSalt,
  correctionsDecrResultElemPreferm,
} from './elements.js';
import { valuesRangeValidation } from './validation.js';
import { breadParamsObj, calcMainSubmit } from './calcMain.js';
import { getLocalStorageCorrections } from './storage.js';
