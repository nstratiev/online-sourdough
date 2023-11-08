// Reset functions
export function resetMainForm() {
  resetMainInputs();
  resetMainPrimaryResults();
  resetMainSecondaryResults();

  const bool = confirm(
    'Полетата на текущата форма ще бъдат изтрити ...\n============\nИзтриване на всички запаметени стойности, свързани с настоящата страница?'
  );

  if (bool === true) {
    localStorage.clear();
  }
}

export function resetMainInputs() {
  numberFieldsMain.forEach((inp) => {
    inp.value = '';
  });
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
} from './elements.js';
