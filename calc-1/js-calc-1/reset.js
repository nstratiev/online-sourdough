// Reset functions
export function resetGlobalLocalStorage() {
  setTimeout(() => {
    resetConfirmDialog
      .open()
      .then((val) => {
        localStorage.clear();
        temporaryOnClickAlert('&check;', 500, 'rgb(192, 0, 0)');
        location.reload();
      })
      .catch((val) => {});
  }, 300);
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

export function resetFloursInputs() {
  formFlours.reset();
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
} from './elements.js';
