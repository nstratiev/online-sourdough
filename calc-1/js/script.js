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
const resultContainersMain = document.getElementsByClassName('result');
const resultContainersSecondary =
  document.getElementsByClassName('result-secondary');

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
  if (!hasEmptyInputFieldValidation()) {
    mainCalculation();
  }
});

formMain.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

for (const field of numberFields) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    valueRangeAlert_2(e.target, min, max);
  });
}

// Buttons listeners
document.querySelector('#btns-container').addEventListener('click', (e) => {
  btnsGroupListener(e);
});

document.querySelector('#btns-container').addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    btnsGroupListener(e);
  }
});

// Main Function
function mainCalculation() {
  let loafsCount = loafsCountInput.value;
  let loafWeight = loafWeightInput.value;
  let waterPercent = waterPercentInput.value;
  let saltPercent = saltPercentInput.value;
  let prefermentFlourPercent = prefermentFlourPercentInput.value;
  let leavenHydratationPercent = leavenHydratationPercentInput.value;

  // Validation
  if (!emptyFieldsValidation()) {
    return false;
  }

  if (!valuesRangeValidation()) {
    return false;
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
  return true;
}

// FUNCTIONS

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

// Locale Storage
function getLocaleStorage() {
  for (const key in localStorage) {
    const val = localStorage.getItem(key);

    // console.log(`${key} >>> ${val}`);

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

// RESET
function resetInputFields() {
  for (const field of numberFields) {
    field.value = '';
  }
}

// Listener functions
function btnsGroupListener(e) {
  const target = e.target;
  if (target.className.includes('btn--submit')) {
    // console.log('submit');
    e.preventDefault();

    if (mainCalculation()) {
      tempAlert('ok', 500);
    }
  } else if (target.className.includes('btn--reset')) {
    // console.log('reset');
    e.preventDefault();
    resetInputFields();
    tempAlert('ok', 500);
  } else if (target.className.includes('btn--save')) {
    // console.log('save');
    setLocaleStorage();
    tempAlert('ok', 500);
  }
}

// Alerts
function tempAlert(msg, duration) {
  var el = document.createElement('div');
  el.setAttribute('class', 'temp-alert');
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function valueRangeAlert(field, min, max) {
  inputValue = Number(field.value);
  min = Number(min);
  max = Number(max);

  if (max === 0) {
    max = Number.MAX_SAFE_INTEGER;
  }

  if (inputValue < min || inputValue > max) {
    setTimeout(() => {
      field.focus();
      field.style.border = '2px solid red';
      alert(`Моля, въведете стойност в диапазона: [ ${min} - ${max} ]!`);
    }, 0);

    return false;
  } else {
    field.style.border = 'none';
    return true;
  }
}

function valueRangeAlert_2(field, min, max) {
  inputValue = Number(field.value);
  min = Number(min);
  max = Number(max);

  if (max === 0) {
    max = Number.MAX_SAFE_INTEGER;
  }

  if (field.value === '') {
    field.style.border = '2px solid green';
  } else if (inputValue < min || inputValue > max) {
    // alert(`Моля, въведете стойност в диапазона: [ ${min} - ${max} ]!`);
    field.style.border = '2px solid red';
  } else {
    field.style.border = 'none';
  }
}

// Validation functions
function hasEmptyInputFieldValidation() {
  for (const field of numberFields) {
    const val = field.value;

    if (val === '') {
      setTimeout(() => {
        field.focus();
        field.style.border = '2px solid green';
      }, 0);

      return true;
    }
  }

  return false;
}

function emptyFieldsValidation() {
  if (hasEmptyInputFieldValidation()) {
    alert('Необходимо е всички полета да бъдат попълнени!');
    // alert('All fields required!');
    return false;
  }

  return true;
}

function valuesRangeValidation() {
  let isValid = true;

  for (const field of numberFields) {
    const min = field.min;
    const max = field.max;

    if (valueRangeAlert(field, min, max)) {
      continue;
    } else {
      isValid = false;
      break;
    }
  }

  return isValid;
}
