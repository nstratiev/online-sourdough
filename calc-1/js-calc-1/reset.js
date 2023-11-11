// Reset functions
export function resetMainForm() {
  resetMainInputs();
  resetMainPrimaryResults();
  resetMainSecondaryResults();

  setTimeout(() => {
    resetConfirmDialog
      .open()
      .then((val) => {
        localStorage.clear();
        temporaryOnClickAlert('&check;', 500, 'rgb(192, 0, 0)');
      })
      .catch((val) => {});
  }, 300);
}

export function resetMainInputs() {
  formMain.reset();
  // numberFieldsMain.forEach((inp) => {
  //   inp.value = '';
  // });
}

export function resetMainPrimaryResults() {
  doughWeightElement.textContent = '####';
  flourWeightElement.textContent = '####';
  leavenWeightElement.textContent = '####';
  waterWeightElement.textContent = '####';
  saltWeightElement.textContent = '####';
}

export function resetMainSecondaryResults() {
  flourLeavenElement.textContent = '###';
  waterLeavenElement.textContent = '###';
  flourTotalElement.textContent = '###';
  waterTotalElement.textContent = '###';
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
} from './elements.js';
