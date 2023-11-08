// Elements
const btnToTop = document.querySelector('#btn-to-top');
const formMain = document.querySelector('.calc-main');
const numberFieldsMain = document.querySelectorAll(
  'input[class="percent _main"]'
);

// RESULT elements
const resultContainersMainPrimary =
  document.querySelectorAll('.result-primary');
const resultContainersMainSecondary = document.querySelectorAll(
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

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
  const storageMain = getLocaleStorageMain();
  // console.log(storageMain);

  // if (!hasEmptyInputFieldValidation()) {
  //   mainCalculation();
  // }

  calcMainSubmit();
});

// -- Focusout input listeners
for (const field of numberFieldsMain) {
  field.addEventListener('focusout', (e) => {
    const min = e.target.min;
    const max = e.target.max;
    onFocusOutAlert(e.target, min, max);
  });
}

// -- Button-to-top listeners
window.addEventListener('scroll', onScreenScroll);
btnToTop.addEventListener('click', goToScreenTop);

// -- Form listeners
document.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  const btnsGroupClassName = e.target.parentElement.className;
  const btnClassName = e.target.className;

  if (btnsGroupClassName.includes('_main')) {
    // console.log('MAIN');
    if (btnClassName === 'btn-submit') {
      calcMainSubmit();
    } else if (btnClassName === 'btn-reset') {
      resetMainForm();
    } else if (btnClassName === 'btn-save') {
      setLocaleStorageMain();
    }
  } else if (btnsGroupClassName.includes('_flours')) {
    // console.log('FLOURS');
  } else if (btnsGroupClassName.includes('_corrections')) {
    // console.log('CORRECTIONS');
  } else if (btnsGroupClassName.includes('_water')) {
    // console.log('WATER');
  } else if (btnsGroupClassName.includes('_leaven-feed')) {
    // console.log('LEAVEN FEED');
  }
});

// FUNCTIONS

// --- Locale Storage functions
function getLocaleStorageMain() {
  let formMainStorage = localStorage.getItem('formMain');
  formMainStorage = JSON.parse(formMainStorage);

  for (const key in formMainStorage) {
    const val = formMainStorage[key];
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  }

  return formMainStorage;
}

function setLocaleStorageMain_Old() {
  for (const numField of numberFieldsMain) {
    localStorage.setItem(numField.name, numField.value);
  }
}

// Listener functions
function calcMainSubmit() {
  let formData = new FormData(formMain);
  const formDataObj = formdataToObject(formData);

  // Validation

  // Input values
  const prefermFlourPercent = formDataObj.prefermFlourPercent / 100;
  const leavenHydratationPercent = formDataObj.leavenHydratationPercent / 100;
  const waterPercent = formDataObj.waterPercent / 100;
  const saltPercent = formDataObj.saltPercent / 100;
  const loafsCount = formDataObj.loafsCount;
  const loafWeight = formDataObj.loafWeight;

  // Clculated values
  const totalDoughWeight = getTotalDoughWeight(loafsCount, loafWeight);
  const totalFlour = getTotalFlour(totalDoughWeight, waterPercent, saltPercent);
  const totalWater = getTotalWater(totalFlour, waterPercent);
  const totalSalt = getTotalSalt(totalFlour, saltPercent);
  const leavenObj = getLeavenComponents(
    totalFlour,
    prefermFlourPercent,
    leavenHydratationPercent
  );
  const kneadingdObj = getIngredientsForKneading(
    totalFlour,
    totalWater,
    totalSalt,
    leavenObj.leavenFlour,
    leavenObj.leavenWater
  );

  // Print calculated values
  printMainPrimaryResults(
    totalDoughWeight,
    kneadingdObj.flour,
    leavenObj.leavenTotal,
    kneadingdObj.water,
    kneadingdObj.salt
  );
  printMainSecondaryResults(
    leavenObj.leavenFlour,
    leavenObj.leavenWater,
    totalFlour,
    totalWater
  );

  setLocaleStorageMain();
}

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
  prefermentedFlourPercent,
  leavenHydratationPercent
) {
  const obj = {};
  obj.leavenFlour = totalFlour * prefermentedFlourPercent;
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

// Helper Functions
function formdataToObject(formData) {
  const formDataArr = Array.from(formData);
  formDataArr.map((el) => {
    el[1] = Number(el[1]);
  });

  return Object.fromEntries(formDataArr);
}

function camelToKebapCase(str) {
  const strArr = str.split('');

  for (let i = 0; i < strArr.length; i++) {
    const charCode = strArr[i].charCodeAt(0);

    if (charCode < 65 || charCode > 90) {
      continue;
    }

    strArr[i] = strArr[i].toLowerCase();
    strArr.splice(i, 0, '-');
  }

  return strArr.join('');
}

// Print functions
function printMainPrimaryResults(
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

function printMainSecondaryResults(
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

// Reset functions
function resetMainForm() {
  resetMainInputs();
  resetMainPrimaryResults();
  resetMainSecondaryResults();

  const bool = confirm(
    'Полетата на текущата форма ще бъдат изтрити ... !\n============\nИзтриване на всички запаметените стойности, свързани с настоящата страница?'
  );

  if (bool === true) {
    localStorage.clear();
  }
}

function resetMainInputs() {
  numberFieldsMain.forEach((inp) => {
    inp.value = '';
  });
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

// OLD functions
function setLocaleStorageMain() {
  const obj = {};

  for (const numField of numberFieldsMain) {
    obj[numField.name] = numField.value;
  }

  localStorage.setItem('formMain', JSON.stringify(obj));
}

function getLocaleStorageMain_Old() {
  Object.entries(localStorage).forEach((el) => {
    const [key, val] = el;
    const elem = document.querySelector(`#${camelToKebapCase(key)}`);
    elem.value = val;
  });
}
