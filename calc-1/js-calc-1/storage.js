// --- Locale Storage functions
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

// IMPORTS
import { numberFieldsMain } from './elements.js';
import { camelToKebapCase } from './helpers.js';
