// --- Locale Storage functions
export function setGlobalLocalStorage() {
  setLocaleStorageMain();
  setLocalStorageFloursAndIngredients();
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

// IMPORTS
import { numberFieldsMain, formFlours } from './elements.js';
import { camelToKebapCase } from './helpers.js';
