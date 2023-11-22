// Reset functions

// Global Reset Button
export function resetGlobalLocalStorage() {
  btnGlobalReset.style.pointerEvents = 'none';
  btnGlobalSave.style.pointerEvents = 'none';
  btnToTop.style.pointerEvents = 'none';

  resetMainForm();
  resetFloursForm();
  resetCorrectionsForm();
  resetWaterForm();
  resetLeavenForm();
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

// Global
export function resetAllResults() {
  resetMainPrimaryResults();
  resetMainSecondaryResults();
  resetFloursResults();
  resetIngredientsResults;
  resetCorrectionsResults();
  resetWaterResults();
  resetLeavenResults();
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

export function correctionsIncrementSubform() {
  correctionsIncrResultElemWater.textContent = '';
}

export function correctionsDecrementSubform() {
  correctionsDecrResultElemFlour.textContent = '';
  correctionsDecrResultElemSalt.textContent = '';
  correctionsDecrResultElemPreferm.textContent = '';
}

function resetCorrectionsResults() {
  correctionsIncrementSubform();
  correctionsDecrementSubform();
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
export function resetLeavenForm() {
  resetLeavenInputs();
  resetLeavenResults();
}

function resetLeavenInputs() {
  formLeaven.reset();
}

export function resetLeavenResults() {
  feedMotherResultElem_1.textContent = '';
  feedFlourResultElem_1.textContent = '';
  feedWaterResultElem_1.textContent = '';
  feedTotalResultElem_1.textContent = '';
  feedMotherResultElem_2.textContent = '';
  feedFlourResultElem_2.textContent = '';
  feedWaterResultElem_2.textContent = '';
  feedTotalResultElem_2.textContent = '';
  explainedResultElemEquals.innerHTML = '';
  explainedResultElemPlus.innerHTML = '';
  explainedResultElem_A.textContent = '';
  explainedResultElem_B.textContent = '';
}

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
  feedMotherResultElem_1,
  feedFlourResultElem_1,
  feedWaterResultElem_1,
  feedTotalResultElem_1,
  feedMotherResultElem_2,
  feedFlourResultElem_2,
  feedWaterResultElem_2,
  feedTotalResultElem_2,
  explainedResultElemEquals,
  explainedResultElemPlus,
  explainedResultElem_A,
  explainedResultElem_B,
  btnGlobalReset,
  btnGlobalSave,
  btnToTop,
  formWater,
  formLeaven,
} from './elements.js';
