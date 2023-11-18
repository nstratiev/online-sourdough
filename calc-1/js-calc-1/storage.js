// --- Locale Storage functions
export function setGlobalLocalStorage() {
  setLocaleStorageMain();
  setLocalStorageFloursAndIngredients();
  setLocalStorageCorrections();
  checkmarkAlertGreen();
}

// Main localStorage
export function getLocaleStorageMain() {
  let formMainStorage = localStorage.getItem('formMain');
  formMainStorage = JSON.parse(formMainStorage);

  for (const key in formMainStorage) {
    const val = formMainStorage[key];
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  }

  return formMainStorage;
}

export function setLocaleStorageMain() {
  const obj = {};

  for (const numField of numberFieldsMain) {
    obj[numField.name] = numField.value;
  }

  localStorage.setItem('formMain', JSON.stringify(obj));
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

  // console.log(formFloursStorage);

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
  let formCorrectionsStorage = localStorage.getItem('formCorrections');
  formCorrectionsStorage = JSON.parse(formCorrectionsStorage);

  for (const key in formCorrectionsStorage) {
    const val = formCorrectionsStorage[key];
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  }

  return formCorrectionsStorage;
}

export function setLocalStorageCorrections() {
  const obj = {};

  for (const numField of numberFieldsCorrections) {
    obj[numField.name] = numField.value;
  }

  localStorage.setItem('formCorrections', JSON.stringify(obj));
}

// Water localStorage
export function getLocalStorageWater() {
  let formWaterStorage = localStorage.getItem('formWater');
  formWaterStorage = JSON.parse(formWaterStorage);

  for (const key in formWaterStorage) {
    const val = formWaterStorage[key];
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  }

  return formWaterStorage;
}

export function setLocalStorageWater() {
  const obj = {};

  for (const numField of numberFieldsWater) {
    obj[numField.name] = numField.value;
  }

  localStorage.setItem('formWater', JSON.stringify(obj));
}

// IMPORTS
import {
  numberFieldsMain,
  formFlours,
  numberFieldsCorrections,
  numberFieldsWater,
} from './elements.js';
import { camelToKebapCase } from './helpers.js';
import { checkmarkAlertGreen } from './alerts.js';
