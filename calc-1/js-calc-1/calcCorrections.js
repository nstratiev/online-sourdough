// formCorrectionsObj = {hydratationIncrement: ... , hydratationDecrement: ...};
let formCorrectionsObj = {};

export function calculateCorrections() {
  if (!calcMainSubmit()) {
    return null;
  }

  if (!calculateHydrIncrement() || !calculateHydrDecrement()) {
    return false;
  }

  localStorage.setItem('formCorrections', JSON.stringify(formCorrectionsObj));
  return true;
}

export function calculateHydrIncrement() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsCorrections)) {
    return false;
  }

  const totalDoughFlour = breadParamsObj.total.flour;

  const incrementHydrPercentStr = numberFieldsCorrections[0].value;
  const incrementHydrPercent = Number(incrementHydrPercentStr) / 100;

  // Reset in case of empty input
  if (!incrementHydrPercent) {
    correctionsIncrementSubform();
    // resetCorrectionsForm();
    return false;
  }

  const additionalWaterWeight = totalDoughFlour * incrementHydrPercent;

  // Print results
  printResult(additionalWaterWeight, correctionsIncrResultElemWater, 1, {
    prefix: '+ ',
    postfix: ' g (вода)',
  });

  // Set storage object
  formCorrectionsObj.hydratationIncrement = incrementHydrPercentStr;
  return true;
}

export function calculateHydrDecrement() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsCorrections)) {
    return false;
  }

  const waterPercent = breadParamsObj.formula.waterPercent;
  const saltPercent = breadParamsObj.formula.saltPercent;
  const totalDoughFlour = breadParamsObj.total.flour;
  const totalDoughWater = breadParamsObj.total.water;
  const leavenFlour = breadParamsObj.leaven.flour;

  const decrementHydrPercentStr = numberFieldsCorrections[1].value;
  const decrementHydrPercent = Number(decrementHydrPercentStr) / 100;

  // Reset in case of empty input
  if (!decrementHydrPercent) {
    correctionsDecrementSubform();
    // resetCorrectionsForm();
    return false;
  }

  const additionalFlourWeight =
    totalDoughWater / (waterPercent - decrementHydrPercent) - totalDoughFlour;

  const additionalSaltWeight = additionalFlourWeight * saltPercent;
  const prefermFlourPercent =
    (leavenFlour / (totalDoughFlour + additionalFlourWeight)) * 100;

  // Print results
  printResult(additionalFlourWeight, correctionsDecrResultElemFlour, 1, {
    prefix: '+ ',
    postfix: ' g (брашно)',
  });
  printResult(additionalSaltWeight, correctionsDecrResultElemSalt, 1, {
    prefix: '+ ',
    postfix: ' g (сол)',
  });
  printResult(prefermFlourPercent, correctionsDecrResultElemPreferm, 1, {
    prefix: 'Прфб. - променено: ',
    postfix: ' %',
  });

  // Set storage object
  formCorrectionsObj.hydratationDecrement = decrementHydrPercentStr;
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
import { hasOutOfRangeFieldsValidation } from './validation.js';
import {
  correctionsIncrementSubform,
  correctionsDecrementSubform,
  resetCorrectionsForm,
} from './reset.js';
import { breadParamsObj, calcMainSubmit } from './calcMain.js';
import { getLocalStorageCorrections } from './storage.js';
import { printResult } from './print.js';
