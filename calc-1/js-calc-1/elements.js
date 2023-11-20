// Button elements
export const btnToTop = document.querySelector('#btn-to-top');
export const btnGlobalReset = document.querySelector('#btn-reset-global ');
export const btnGlobalSave = document.querySelector('#btn-save-global');

// Form elements
export const formMain = document.querySelector('.calc-main');
export const formFlours = document.querySelector('.calc-flours-ingredients');
export const formCorrections = document.querySelector('.calc-corrections');
export const formWater = document.querySelector('.calc-water');
export const formLeaven = document.querySelector('.calc-leaven-feed');

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
export const numberFieldsLeaven = document.querySelectorAll(
  'input[class="work-leaven"]'
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

// -- Results - LEAVEN
export const leavenHydrPredifinedResultElem = formLeaven.querySelector(
  '.leaven-hydratation-predefined'
);

export const feedMotherResultElem_1 =
  formLeaven.querySelector('.feed-mother._1');
export const feedFlourResultElem_1 = formLeaven.querySelector('.feed-flour._1');
export const feedWaterResultElem_1 = formLeaven.querySelector('.feed-water._1');
export const feedTotalResultElem_1 = formLeaven.querySelector('.feed-total._1');

export const feedMotherResultElem_2 =
  formLeaven.querySelector('.feed-mother._2');
export const feedFlourResultElem_2 = formLeaven.querySelector('.feed-flour._2');
export const feedWaterResultElem_2 = formLeaven.querySelector('.feed-water._2');
export const feedTotalResultElem_2 = formLeaven.querySelector('.feed-total._2');

export const explainedResultElemEquals =
  formLeaven.querySelector('.explained._equals');
export const explainedResultElemPlus =
  formLeaven.querySelector('.explained._plus');
export const explainedResultElem_A = formLeaven.querySelector('.explained._A');
export const explainedResultElem_B = formLeaven.querySelector('.explained._B');
