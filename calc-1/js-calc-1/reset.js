// Reset functions

// Global
export function resetGlobalLocalStorage() {
  btnGlobalReset.style.pointerEvents = 'none';
  btnGlobalSave.style.pointerEvents = 'none';
  btnToTop.style.pointerEvents = 'none';

  resetMainForm();
  resetFloursInputs();
  checkmarkAlertGreen();

  setTimeout(() => {
    resetConfirmDialog
      .open()
      .then((val) => {
        localStorage.clear();
        checkmarkAlertGreen();
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

// Main
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

// Flours & Ingredients
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

// Corrections
export function resetCorrectionsForm() {
  resetCorrectionsInputs();
  resetCorrectionsResults();
}

function resetCorrectionsInputs() {
  formCorrections.reset();
}

function resetCorrectionsResults() {
  correctionsIncrResultElemWater.textContent = '';
  correctionsDecrResultElemFlour.textContent = '';
  correctionsDecrResultElemSalt.textContent = '';
  correctionsDecrResultElemPreferm.textContent = '';
}

// Water
export function resetWaterForm() {
  resetWaterInputs();
  resetWaterResults();
}

function resetWaterInputs() {
  formWater.reset();
}

function resetWaterResults() {
  totalWaterCheckResultElem.textContent = '';
  initialWaterResultElem.textContent = '';
  secondaryWaterResultElem.textContent = '';
  secondaryWaterPercentResultElem.textContent = '';
}

// Leaven feed

// IMPORTS
import { resetConfirmDialog, checkmarkAlertGreen } from './alerts.js';
import {
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
  formCorrections,
  floursResultElements,
  whiteFlourResultElement,
  totalCalculatedFlourResultElement,
  ingredientsResultElements,
  correctionsIncrResultElemWater,
  correctionsDecrResultElemFlour,
  correctionsDecrResultElemSalt,
  correctionsDecrResultElemPreferm,
  totalWaterCheckResultElem,
  initialWaterResultElem,
  secondaryWaterResultElem,
  secondaryWaterPercentResultElem,
  btnGlobalReset,
  btnGlobalSave,
  btnToTop,
  formWater,
} from './elements.js';
