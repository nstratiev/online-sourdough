// FORMS
const formMain = document.getElementById('form-1');

// INPUT fields
const numberFields = document.querySelectorAll('input[type="number"]');

const prefermentFlourPercentInput = document.getElementById(
  'preferm-flour-percent'
);
const leavenHydratationPercentInput = document.getElementById(
  'leaven-hydratation-percent'
);
const waterPercentInput = document.getElementById('water-percent');
const saltPercentInput = document.getElementById('salt-percent');
const loafsCountInput = document.getElementById('loafs-count');
const loafWeightInput = document.getElementById('loaf-weight');

// RESULT elements
const doughWeightElement = document.getElementById('dough-weight-result');
const flourWeightElement = document.getElementById('flour-weight-result');
const leavenWeightElement = document.getElementById('leaven-weight-result');
const flourLeavenElement = document.getElementById('flour-leaven');
const waterLeavenElement = document.getElementById('water-leaven');
const waterWeightElement = document.getElementById('water-weight-result');
const saltWeightElement = document.getElementById('salt-weight-result');
const flourTotalElement = document.getElementById('flour-total');
const waterTotalElement = document.getElementById('water-total');

// BUTTONS
const btnSubmit_1 = document.getElementById('btn-submit-col1');
const btnReset_1 = document.getElementById('btn-reset-col1');
const btnSave_1 = document.getElementById('btn-save-col1');

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
  getLocaleStorage();
  if (!hasEmptyInputField()) {
    mainCalculation();
  }
});

formMain.addEventListener('keypress', function (e) {
  if (
    e.keyCode === 13 &&
    e.target.id !== 'btn-reset-col1' &&
    e.target.id !== 'btn-save-col1'
  ) {
    e.preventDefault();
    mainCalculation();
  }
});

btnSubmit_1.addEventListener('click', function (e) {
  e.preventDefault();
  mainCalculation();
});

btnSave_1.addEventListener('click', setLocaleStorage);

// Main Function
function hasEmptyInputField() {
  for (const elem of numberFields) {
    const val = elem.value;

    if (val === '') {
      return true;
    }
  }

  return false;
}

function mainCalculation() {
  let loafsCount = loafsCountInput.value;
  let loafWeight = loafWeightInput.value;
  let waterPercent = waterPercentInput.value;
  let saltPercent = saltPercentInput.value;
  let prefermentFlourPercent = prefermentFlourPercentInput.value;
  let leavenHydratationPercent = leavenHydratationPercentInput.value;

  // Validation
  if (hasEmptyInputField()) {
    alert('Необходимо е всички полета да бъдат попълнени!');
    // alert('All fields required!');
    return;
  }

  // Inputs as percent
  loafsCount = Number(loafsCount);
  loafWeight = Number(loafWeight);
  waterPercent = Number(waterPercent) / 100;
  saltPercent = Number(saltPercent) / 100;
  prefermentFlourPercent = Number(prefermentFlourPercent) / 100;
  leavenHydratationPercent = Number(leavenHydratationPercent) / 100;

  const totalDoughWeight = getTotalDoughWeight(loafsCount, loafWeight);
  const totalFlour = getTotalFlour(totalDoughWeight, waterPercent, saltPercent);
  const totalWater = getTotalWater(totalFlour, waterPercent);
  const totalSalt = getTotalSalt(totalFlour, saltPercent);
  const leavenObj = getLeavenComponents(
    totalFlour,
    prefermentFlourPercent,
    leavenHydratationPercent
  );
  const ingredientsObj = getIngredientsForKneading(
    totalFlour,
    totalWater,
    totalSalt,
    leavenObj.leavenFlour,
    leavenObj.leavenWater
  );

  doughWeightElement.textContent = totalDoughWeight.toFixed(0);
  flourWeightElement.textContent = ingredientsObj.flour.toFixed(0);
  leavenWeightElement.textContent = leavenObj.leavenTotal.toFixed(0);
  flourLeavenElement.textContent = leavenObj.leavenFlour.toFixed(0);
  waterLeavenElement.textContent = leavenObj.leavenWater.toFixed(0);
  waterWeightElement.textContent = ingredientsObj.water.toFixed(0);
  saltWeightElement.textContent = ingredientsObj.salt.toFixed(0);
  flourTotalElement.textContent = totalFlour.toFixed(0);
  waterTotalElement.textContent = totalWater.toFixed(0);

  setLocaleStorage();
}

// FUNCTIONS
function getLocaleStorage() {
  for (const key in localStorage) {
    const val = localStorage.getItem(key);

    console.log(`${key} >>> ${val}`);

    if (typeof val === 'string') {
      const elem = document.querySelector(`#${key}`);
      if (elem !== null) {
        elem.value = val;
      }
    }
  }
}

function setLocaleStorage() {
  for (const numrField of numberFields) {
    localStorage.setItem(numrField.name, numrField.value);
  }
}

function getTotalDoughWeight(loafsCount, loafWeight) {
  return loafsCount * loafWeight;
}

function getTotalFlour(totalDoughWeight, waterPercent, saltPercent) {
  return totalDoughWeight / (1 + waterPercent + saltPercent);
}

function getTotalWater(totalFlour, waterPercent) {
  return totalFlour * waterPercent;
}

function getTotalSalt(totalFlour, saltPercent) {
  return totalFlour * saltPercent;
}

function getLeavenComponents(
  totalFlour,
  prefermentFlourPercent,
  leavenHydratationPercent
) {
  const obj = {};
  obj.leavenFlour = totalFlour * prefermentFlourPercent;
  obj.leavenWater = obj.leavenFlour * leavenHydratationPercent;
  obj.leavenTotal = obj.leavenFlour + obj.leavenWater;

  return obj;
}

function getIngredientsForKneading(
  totalFlour,
  totalWater,
  totalSalt,
  leavenFlour,
  leavenWater
) {
  const obj = {};
  obj.flour = totalFlour - leavenFlour;
  obj.water = totalWater - leavenWater;
  obj.salt = totalSalt;

  return obj;
}

/* function setInputsOnchangeListeners() {
  for (const el of numberFields) {
    el.addEventListener('change', function (e) {
      localStorage.setItem(e.target.name, e.target.value);
    });
  }
}
 */
