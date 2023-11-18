// Button elements
export const btnToTop = document.querySelector('#btn-to-top');
export const btnGlobalReset = document.querySelector('#btn-reset-global ');
export const btnGlobalSave = document.querySelector('#btn-save-global');

// Form elements
export const formMain = document.querySelector('.calc-main');
export const formFlours = document.querySelector('.calc-flours-ingredients');
export const formCorrections = document.querySelector('.calc-corrections');
export const formWater = document.querySelector('.calc-water');

// Input elements
export const numberFieldsMain = document.querySelectorAll(
  'input[class="percent _main"]'
);
export const numberFieldsFlours = document.querySelectorAll(
  'input[class="additional-flour-percent"]'
);
export const numberFieldsIngredients = document.querySelectorAll(
  'input[class="additional-ingr-percent"]'
);
export const numberFieldsCorrections = document.querySelectorAll(
  'input[class="correction-hydr-percent"]'
);
export const numberFieldsWater = document.querySelectorAll(
  'input[class="water-addition-percent"]'
);

// RESULT elements
// -- Results - MAIN
export const doughWeightElement = document.querySelector(
  '#dough-weight-result'
);
export const flourWeightElement = document.querySelector(
  '#flour-weight-result'
);
export const leavenWeightElement = document.querySelector(
  '#leaven-weight-result'
);
export const flourLeavenElement = document.querySelector('#flour-leaven');
export const waterLeavenElement = document.querySelector('#water-leaven');
export const waterWeightElement = document.querySelector(
  '#water-weight-result'
);
export const saltWeightElement = document.querySelector('#salt-weight-result');
export const flourTotalElement = document.querySelector('#flour-total');
export const waterTotalElement = document.querySelector('#water-total');

// -- Results - FLOURS & INGREDIENTS
export const floursResultElements = formFlours.querySelectorAll(
  '.additional-flour-result'
);
export const whiteFlourResultElement = document.querySelector(
  '#whiteFlour-flours-form-result'
);
export const totalCalculatedFlourResultElement = document.querySelector(
  '#totalFlour-flours-form-result'
);
export const ingredientsResultElements = formFlours.querySelectorAll(
  '.additional-ingredient-result'
);

// -- Results - CORRECTIONS
export const correctionsIncrResultElemWater = formCorrections.querySelector(
  '.corrections-incr-result-water'
);

export const correctionsDecrResultElemFlour = formCorrections.querySelector(
  '.corrections-decr-result-flour'
);
export const correctionsDecrResultElemSalt = formCorrections.querySelector(
  '.corrections-decr-result-salt'
);
export const correctionsDecrResultElemPreferm = formCorrections.querySelector(
  '.corrections-decr-result-preferm'
);

// -- Results - WATER
export const totalWaterCheckResultElem =
  formWater.querySelector('.total-water-check');
export const initialWaterResultElem = formWater.querySelector(
  '.initial-water-result'
);
export const secondaryWaterResultElem = formWater.querySelector(
  '.secondary-water-result'
);
export const secondaryWaterPercentResultElem = formWater.querySelector(
  '.secondary-water-percent-result'
);
