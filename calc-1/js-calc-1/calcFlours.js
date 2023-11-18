// const formFloursObj = {'1': {flourType: 'Wholewheat', flourPercent: 25, flourWeight: 320}, '2': {}, ...};

// Flours Calculation on submit
export function calcFloursAndIngredientsSubmit() {
  if (!calcMainSubmit()) {
    return;
  }

  if (!calculateAdditionalFlours() || !calculateAdditionalIngredients()) {
    return false;
  }
}

export function calculateAdditionalFlours() {
  if (breadParamsObj === null) {
    return false;
  }

  const flourForKneading = breadParamsObj.kneading.flour;
  let additionalFlours = 0;
  const formFloursObj = {};

  // Validation
  if (!valuesRangeValidation(numberFieldsFlours)) {
    return false;
  }

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

    if (flourWeight) {
      elementsGroup[2].textContent = flourWeight.toFixed(0);
    } else {
      elementsGroup[2].textContent = '';
    }

    formFloursObj[i] = { flourType, flourPercent: flourPercentStr };
  }

  localStorage.setItem('formFlours', JSON.stringify(formFloursObj));

  const whiteFlour = flourForKneading - additionalFlours;

  if (additionalFlours) {
    whiteFlourResultElement.textContent = whiteFlour.toFixed(0);
    totalCalculatedFlourResultElement.textContent = (
      additionalFlours + whiteFlour
    ).toFixed(0);
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

  const doughWeight = breadParamsObj.doughWeight;
  let additionalIngredients = 0;
  const formIngredientsObj = {};

  // Validation
  if (!valuesRangeValidation(numberFieldsIngredients)) {
    return false;
  }

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

    if (ingrWeight) {
      elementsGroup[2].textContent = ingrWeight.toFixed(0);
    } else {
      elementsGroup[2].textContent = '';
    }

    formIngredientsObj[i] = { ingrType, ingrPercent: ingrPercentStr };
  }

  localStorage.setItem('formIngredients', JSON.stringify(formIngredientsObj));

  return true;
}

// IMPORTS
import {
  formFlours,
  numberFieldsFlours,
  numberFieldsIngredients,
  whiteFlourResultElement,
  totalCalculatedFlourResultElement,
} from './elements.js';
import { valuesRangeValidation } from './validation.js';
import { breadParamsObj, calcMainSubmit } from './calcMain.js';
