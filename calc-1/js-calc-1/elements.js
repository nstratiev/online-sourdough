// Elements
export const btnToTop = document.querySelector('#btn-to-top');
export const btnGlobalReset = document.querySelector('#btn-reset-global ');
export const btnGlobalSave = document.querySelector('#btn-save-global');

export const formMain = document.querySelector('.calc-main');
export const formFlours = document.querySelector('.calc-flours-ingredients');

export const numberFieldsMain = document.querySelectorAll(
  'input[class="percent _main"]'
);
export const numberFieldsFlours = document.querySelectorAll(
  'input[class="additional-flour-percent"]'
);
export const numberFieldsIngredients = document.querySelectorAll(
  'input[class="additional-ingr-percent"]'
);

// RESULT elements
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

export const floursResultElements = formFlours.querySelectorAll(
  '.additional-flour-result'
);
export const ingredientsResultElements = formFlours.querySelectorAll(
  '.additional-ingredient-result'
);

export const whiteFlourResultElement = document.querySelector(
  '#whiteFlour-flours-form-result'
);

export const totalCalculatedFlourResultElement = document.querySelector(
  '#totalFlour-flours-form-result'
);
