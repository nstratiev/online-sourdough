// Reset functions
export function resetGlobalLocalStorage() {
  btnGlobalReset.style.pointerEvents = 'none';
  btnGlobalSave.style.pointerEvents = 'none';
  btnToTop.style.pointerEvents = 'none';

  resetMainForm();
  resetFloursInputs();
  temporaryOnClickAlert('&check;', 400, 'green');

  setTimeout(() => {
    resetConfirmDialog
      .open()
      .then((val) => {
        localStorage.clear();
        temporaryOnClickAlert('&check;', 400, 'green');
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnGlobalReset.style.pointerEvents = 'auto';
        btnGlobalSave.style.pointerEvents = 'auto';
        btnToTop.style.pointerEvents = 'auto';
      });
  }, 200);
}

export function resetMainForm() {
  resetMainInputs();
  resetMainPrimaryResults();
  resetMainSecondaryResults();
}

function resetMainInputs() {
  formMain.reset();
}

function resetMainPrimaryResults() {
  doughWeightElement.textContent = '####';
  flourWeightElement.textContent = '####';
  leavenWeightElement.textContent = '####';
  waterWeightElement.textContent = '####';
  saltWeightElement.textContent = '####';
}

function resetMainSecondaryResults() {
  flourLeavenElement.textContent = '###';
  waterLeavenElement.textContent = '###';
  flourTotalElement.textContent = '###';
  waterTotalElement.textContent = '###';
}

export function resetFloursForm() {
  resetFloursInputs();
  resetFloursResults();
  resetIngredientsResults();
}

function resetFloursInputs() {
  formFlours.reset();
}

function resetFloursResults() {
  floursResultElements.forEach((el) => (el.textContent = ''));
  whiteFlourResultElement.textContent = '';
  totalCalculatedFlourResultElement.textContent = '';
}

function resetIngredientsResults() {
  ingredientsResultElements.forEach((el) => (el.textContent = ''));
}

// IMPORTS
import { resetConfirmDialog, temporaryOnClickAlert } from './alerts.js';
import {
  numberFieldsMain,
  doughWeightElement,
  flourWeightElement,
  waterWeightElement,
  saltWeightElement,
  leavenWeightElement,
  flourLeavenElement,
  waterLeavenElement,
  flourTotalElement,
  waterTotalElement,
  formMain,
  formFlours,
  floursResultElements,
  whiteFlourResultElement,
  totalCalculatedFlourResultElement,
  ingredientsResultElements,
  btnGlobalReset,
  btnGlobalSave,
  btnToTop,
} from './elements.js';
