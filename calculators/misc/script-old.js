// FORMS
const formMain = document.querySelector('.calc-main');
// console.log(formMain);

// INPUT fields
const numberFields = document.querySelectorAll('input[class="percent"]');
// const numberFields = document.querySelectorAll('input[type="number"]');

const prefermentFlourPercentInput = document.querySelector(
  '#preferm-flour-percent'
);
const leavenHydratationPercentInput = document.querySelector(
  '#leaven-hydratation-percent'
);
const waterPercentInput = document.querySelector('#water-percent');
const saltPercentInput = document.querySelector('#salt-percent');
const loafsCountInput = document.querySelector('#loafs-count');
const loafWeightInput = document.querySelector('#loaf-weight');

// RESULT elements
const resultContainersMain = document.getElementsByClassName('result');
const resultContainersSecondary = document.querySelectorAll(
  'span.result-secondary'
);

const doughWeightElement = document.querySelector('#dough-weight-result');
const flourWeightElement = document.querySelector('#flour-weight-result');
const leavenWeightElement = document.querySelector('#leaven-weight-result');
const flourLeavenElement = document.querySelector('#flour-leaven');
const waterLeavenElement = document.querySelector('#water-leaven');
const waterWeightElement = document.querySelector('#water-weight-result');
const saltWeightElement = document.querySelector('#salt-weight-result');
const flourTotalElement = document.querySelector('#flour-total');
const waterTotalElement = document.querySelector('#water-total');

// BUTTONS
const btnSubmit_1 = document.querySelector('#btn-submit-main');
const btnReset_1 = document.querySelector('#btn-reset-main');
const btnSave_1 = document.querySelector('#btn-save-main');
const btnToTop = document.querySelector('#btn-to-top');

// EVENT LISTENERS
// -- Onload listener
document.addEventListener('DOMContentLoaded', function () {
  console.log('abc');
  const storage = getLocaleStorage();
  console.log(storage);

  if (!hasEmptyInputFieldValidation()) {
    mainCalculation();
  }
});

// -- Top navigation listeners
const navItem = document.querySelectorAll('.top-nav-item');
for (const item of navItem) {
  item.addEventListener('click', (e) => {
    if (e.target.className.includes('menu')) {
      window.location.href = '../';
    } else if (e.target.className.includes('legend')) {
      console.log('legend');
    } else if (e.target.className.includes('info')) {
      console.log('info');
    }
  });
}

// console.log(navItem);

// -- Button-to-top listeners
window.addEventListener('scroll', onScreenScroll);
btnToTop.addEventListener('click', goToScreenTop);

// -- Form-main listener
formMain.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

// -- Focusout input listeners
for (const field of numberFields) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    onFocusOutAlert(e.target, min, max);
  });
}

// Button listeners
document.querySelector('#btns-group').addEventListener('click', (e) => {
  // console.log(e);
  btnsGroupListener(e);
});

document.querySelector('#btns-group').addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    btnsGroupListener(e);
  }
});

// FUNCTIONS

// -- MAIN function
function mainCalculation() {
  // Initial input text values
  let loafsCount = loafsCountInput.value;
  let loafWeight = loafWeightInput.value;
  let waterPercent = waterPercentInput.value;
  let saltPercent = saltPercentInput.value;
  let prefermentFlourPercent = prefermentFlourPercentInput.value;
  let leavenHydratationPercent = leavenHydratationPercentInput.value;

  // Validations
  if (!emptyFieldsValidation()) {
    return false;
  }

  if (!valuesRangeValidation()) {
    return false;
  }

  // Input values as number
  loafsCount = Number(loafsCount);
  loafWeight = Number(loafWeight);
  waterPercent = Number(waterPercent) / 100;
  saltPercent = Number(saltPercent) / 100;
  prefermentFlourPercent = Number(prefermentFlourPercent) / 100;
  leavenHydratationPercent = Number(leavenHydratationPercent) / 100;

  // Calculate bread parameters
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

  // Set visible result values
  doughWeightElement.textContent = totalDoughWeight.toFixed(0);

  // console.log(flourWeightElement);
  // console.log(typeof ingredientsObj.flour);

  flourWeightElement.textContent = ingredientsObj.flour.toFixed(0);
  leavenWeightElement.textContent = leavenObj.leavenTotal.toFixed(0);
  flourLeavenElement.textContent = leavenObj.leavenFlour.toFixed(0);
  waterLeavenElement.textContent = leavenObj.leavenWater.toFixed(0);
  waterWeightElement.textContent = ingredientsObj.water.toFixed(0);
  saltWeightElement.textContent = ingredientsObj.salt.toFixed(0);

  // console.log(flourTotalElement);
  // console.log(typeof totalFlour);

  flourTotalElement.textContent = totalFlour.toFixed(0);
  waterTotalElement.textContent = totalWater.toFixed(0);

  setLocaleStorage();
  return true;
}

// -- FUNCTIONS II

// --- Math functions
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

  // const obj = {leavenTotal: '', leavenFlour: '', leavenWater: ''};
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

  // const obj = { flour: '', water: '', salt: '' };
  return obj;
}

// --- Locale Storage functions
function getLocaleStorage() {
  for (const key in localStorage) {
    const val = localStorage.getItem(key);

    // console.log(`${key} >>> ${val}`);

    if (typeof val === 'string') {
      const elem = document.querySelector(`#${key}`);
      console.log(elem);
      console.log(val);
      if (elem !== null) {
        elem.value = val;
      }
    }
  }
}

function setLocaleStorage() {
  for (const numField of numberFields) {
    localStorage.setItem(numField.name, numField.value);
  }

  console.log(localStorage);
}

// --- RESET functions
function resetInputFields() {
  for (const field of numberFields) {
    field.value = '';
  }
}

function resetResultValuesMain() {
  for (const result of resultContainersMain) {
    result.textContent = '####';
  }
}

function resetResultValuesSecondary() {
  for (const result of resultContainersSecondary) {
    result.textContent = '###';
  }
}

// --- Listener functions
function btnsGroupListener(e) {
  e.preventDefault();

  const target = e.target;
  let btnBgColor = getComputedStyle(target);

  if (e.keyCode === 13) {
    btnBgColor = btnBgColor.backgroundColor;
  } else {
    btnBgColor = btnBgColor.color;
  }

  // console.log(target.tagName);

  function condition(e, nameClass) {
    const target = e.target;

    if (target.tagName === 'svg') {
      return target.parentElement.className.includes(nameClass);
    } else if (target.tagName === 'BUTTON') {
      return target.className.includes(nameClass);
    }
  }

  if (condition(e, 'btn-submit')) {
    // console.log('submit');

    if (mainCalculation()) {
      temporaryOnClickAlert('&check;', 500, btnBgColor);
    }
  } else if (condition(e, 'btn-reset')) {
    // console.log('reset');
    resetInputFields();
    resetResultValuesMain();
    resetResultValuesSecondary();
    temporaryOnClickAlert('&check;', 500, btnBgColor);
  } else if (condition(e, 'btn-save')) {
    // console.log('save');
    setLocaleStorage();
    temporaryOnClickAlert('&check;', 500, btnBgColor);
  }
}

// --- Validation functions
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

// --- Alert functions
function temporaryOnClickAlert(msg, duration, bgColor) {
  const containerEl = document.createElement('div');
  containerEl.setAttribute('class', 'temp-alert');
  containerEl.style.backgroundColor = bgColor;
  const spanEl = document.createElement('span');
  spanEl.setAttribute('class', 'check-mark');
  spanEl.innerHTML = msg;
  containerEl.appendChild(spanEl);
  setTimeout(function () {
    containerEl.parentNode.removeChild(containerEl);
  }, duration);
  document.body.appendChild(containerEl);
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

function onFocusOutAlert(field, min, max) {
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

// --- Screen scroll functions
function onScreenScroll() {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    btnToTop.style.display = 'block';
  } else {
    btnToTop.style.display = 'none';
  }
}

function goToScreenTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
