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

    // Set storage object
    formCorrectionsObj.hydratationIncrement = incrementHydrPercentStr;
  }

  // Print results
  printResult(additionalWaterWeight, correctionsIncrResultElemWater, 1, {
    prefix: '+ ',
    postfix: ' g (вода)',
  });

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

    // Set storage object
    formCorrectionsObj.hydratationDecrement = decrementHydrPercentStr;
  }

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
import { printResult } from './print.js';
