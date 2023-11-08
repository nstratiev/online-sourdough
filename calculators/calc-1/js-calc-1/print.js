// Print functions
export function printMainPrimaryResults(
  doughWeight,
  flourWeight,
  leavenWeight,
  waterWeight,
  saltWeight
) {
  doughWeightElement.textContent = doughWeight.toFixed(0);
  flourWeightElement.textContent = flourWeight.toFixed(0);
  leavenWeightElement.textContent = leavenWeight.toFixed(0);
  waterWeightElement.textContent = waterWeight.toFixed(0);
  saltWeightElement.textContent = saltWeight.toFixed(0);
}

export function printMainSecondaryResults(
  leavenFlourWeight,
  leavenWaterWeight,
  totalFlour,
  totalWater
) {
  flourLeavenElement.textContent = leavenFlourWeight.toFixed(0);
  waterLeavenElement.textContent = leavenWaterWeight.toFixed(0);
  flourTotalElement.textContent = totalFlour.toFixed(0);
  waterTotalElement.textContent = totalWater.toFixed(0);
}

// IMPORTS
import {
  doughWeightElement,
  flourWeightElement,
  leavenWeightElement,
  waterWeightElement,
  saltWeightElement,
  flourLeavenElement,
  waterLeavenElement,
  flourTotalElement,
  waterTotalElement,
} from './elements.js';
