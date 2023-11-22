// const formFloursObj = {'1': {flourType: 'Wholewheat', flourPercent: '25'}, '2': {}, ...};
const formFloursObj = {};
// const formIngredientsObj = {'1': {ingrType: 'Seeds', ingrPercent: '10'}, '2': {}, ...};
const formIngredientsObj = {};

export function calcFloursAndIngredientsSubmit() {
  if (!calcMainSubmit()) {
    return null;
  }

  if (!calculateAdditionalFlours() || !calculateAdditionalIngredients()) {
    return false;
  }

  localStorage.setItem('formFlours', JSON.stringify(formFloursObj));
  localStorage.setItem('formIngredients', JSON.stringify(formIngredientsObj));

  return true;
}

export function calculateAdditionalFlours() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsFlours)) {
    return false;
  }

  const flourForKneading = breadParamsObj.kneading.flour;
  let additionalFlours = 0;

  for (let i = 1; i <= 8; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}"]`);
    const flourType = elementsGroup[0].value;
    const flourPercentStr = elementsGroup[1].value;
    let flourPercent = null;
    let flourWeight = '';

    if (flourPercentStr) {
      flourPercent = Number(flourPercentStr) / 100;
      flourWeight = flourForKneading * flourPercent;
      additionalFlours += flourWeight;
    }

    // Print results
    printResult(flourWeight, elementsGroup[2], 0);

    // Set storage object
    formFloursObj[i] = { flourType, flourPercent: flourPercentStr };
  }

  const whiteFlour = flourForKneading - additionalFlours;

  // Print results
  if (additionalFlours) {
    printResult(whiteFlour, whiteFlourResultElement, 0);
    printResult(
      additionalFlours + whiteFlour,
      totalCalculatedFlourResultElement,
      0
    );
  } else {
    whiteFlourResultElement.textContent = '';
    totalCalculatedFlourResultElement.textContent = '';
  }

  return true;
}

export function calculateAdditionalIngredients() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsIngredients)) {
    return false;
  }

  const doughWeight = breadParamsObj.doughWeight;
  let additionalIngredients = 0;

  for (let i = 1; i <= 2; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}b"]`);
    const ingrType = elementsGroup[0].value;
    const ingrPercentStr = elementsGroup[1].value;
    let ingrPercent = null;
    let ingrWeight = '';

    if (ingrPercentStr) {
      ingrPercent = Number(ingrPercentStr) / 100;
      ingrWeight = doughWeight * ingrPercent;
      additionalIngredients += ingrWeight;
    }

    // Print results
    printResult(ingrWeight, elementsGroup[2], 0);

    // Set storage object
    formIngredientsObj[i] = { ingrType, ingrPercent: ingrPercentStr };
  }

  return true;
}

export function getStorageAndCalculateFlours() {
  getLocaleStorageFlours();
  getLocaleStorageIngredients();
  calculateAdditionalFlours();
  calculateAdditionalIngredients();
}

// IMPORTS
import {
  formFlours,
  numberFieldsFlours,
  numberFieldsIngredients,
  whiteFlourResultElement,
  totalCalculatedFlourResultElement,
} from './elements.js';
import { hasOutOfRangeFieldsValidation } from './validation.js';
import { breadParamsObj, calcMainSubmit } from './calcMain.js';
import {
  getLocaleStorageFlours,
  getLocaleStorageIngredients,
} from './storage.js';
import { printResult } from './print.js';
