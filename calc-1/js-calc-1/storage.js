// --- Locale Storage functions
export function setGlobalLocalStorage() {
  setLocaleStorageMain();
  setLocalStorageFloursAndIngredients();
  setLocalStorageCorrections();
  setLocalStorageWater();
  setLocalStorageLeaven();
  checkmarkAlertGreen();
}

// Main localStorage
export function getLocaleStorageMain() {
  getLocalStorage('formMain');
}

export function setLocaleStorageMain() {
  setLocalStorage('formMain', numberFieldsMain);
}

// Flours & Ingredients localStorage
export function setLocalStorageFloursAndIngredients() {
  setLocaleStorageFlours();
  setLocaleStorageIngredients();
}
// Flours localStorage
export function getLocaleStorageFlours() {
  let formFloursStorage = localStorage.getItem('formFlours');

  if (formFloursStorage === null) {
    return;
  }

  formFloursStorage = JSON.parse(formFloursStorage);

  for (let i = 1; i <= 8; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}"]`);
    elementsGroup[0].value = formFloursStorage[i].flourType;
    elementsGroup[1].value = formFloursStorage[i].flourPercent;
  }

  return formFloursStorage;
}

export function setLocaleStorageFlours() {
  const formFloursObj = {};

  for (let i = 1; i <= 8; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}"]`);
    const flourType = elementsGroup[0].value;
    let flourPercent = elementsGroup[1].value;

    formFloursObj[i] = { flourType, flourPercent };
  }

  localStorage.setItem('formFlours', JSON.stringify(formFloursObj));
}

// Ingredients localStorage
export function getLocaleStorageIngredients() {
  let formIngredientsStorage = localStorage.getItem('formIngredients');

  if (formIngredientsStorage === null) {
    return;
  }

  formIngredientsStorage = JSON.parse(formIngredientsStorage);

  for (let i = 1; i <= 2; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}b"]`);
    elementsGroup[0].value = formIngredientsStorage[i].ingrType;
    elementsGroup[1].value = formIngredientsStorage[i].ingrPercent;
  }

  return formIngredientsStorage;
}

export function setLocaleStorageIngredients() {
  const formIngredientsObj = {};

  for (let i = 1; i <= 2; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}b"]`);
    const ingrType = elementsGroup[0].value;
    let ingrPercent = elementsGroup[1].value;

    formIngredientsObj[i] = { ingrType, ingrPercent };
  }

  localStorage.setItem('formIngredients', JSON.stringify(formIngredientsObj));
}

// Corrections localStorage
export function getLocalStorageCorrections() {
  getLocalStorage('formCorrections');
}

export function setLocalStorageCorrections() {
  setLocalStorage('formCorrections', numberFieldsCorrections);
}

// Water localStorage
export function getLocalStorageWater() {
  getLocalStorage('formWater');
}

export function setLocalStorageWater() {
  setLocalStorage('formWater', numberFieldsWater);
}

// Leaven localStorage
export function getLocalStorageLeaven() {
  getLocalStorage('formLeaven');
}

export function setLocalStorageLeaven() {
  setLocalStorage('formLeaven', numberFieldsLeaven);
}

// Basic functions
function getLocalStorage(formItemStr) {
  let formStorage = localStorage.getItem(formItemStr);
  formStorage = JSON.parse(formStorage);

  for (const key in formStorage) {
    const val = formStorage[key];
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  }

  return formStorage;
}

function setLocalStorage(formItemStr, numberFieldsCollection) {
  const obj = {};

  for (const numField of numberFieldsCollection) {
    obj[numField.name] = numField.value;
  }

  localStorage.setItem(formItemStr, JSON.stringify(obj));
}

// IMPORTS
import {
  numberFieldsMain,
  formFlours,
  numberFieldsCorrections,
  numberFieldsWater,
  numberFieldsLeaven,
} from './elements.js';
import { camelToKebapCase } from './helpers.js';
import { checkmarkAlertGreen } from './alerts.js';
