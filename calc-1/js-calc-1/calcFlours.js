let isFirstPageLoad = true;
// const formFloursObj = {'1': {flourType: 'Wholewheat', flourPercent: 25, flourWeight: 320}, '2': {}, ...};

// Flours Calculation on submit
export default function calcFloursAndIngredientsSubmit(flourForKneading) {
  if (!calculateAdditionalFlours(flourForKneading)) {
    return false;
  }

  // Validation

  // if (!valuesRangeValidation()) {
  //   return false;
  // }

  // Input values

  // Print calculated values

  // setLocaleStorageMain();

  // if (isFirstPageLoad) {
  //   isFirstPageLoad = false;
  // } else {
  //   temporaryOnClickAlert('&check;', 400, 'green');
  // }

  // return true;
}

function calculateAdditionalFlours(flourForKneading) {
  // let flourForKneading = 1380;
  let additionalFlours = 0;
  const formFloursObj = {};

  for (let i = 1; i <= 8; i++) {
    const elementsGroup = formFlours.querySelectorAll(`[data-id="${i}"]`);
    const flourType = elementsGroup[0].value;
    let flourPercent = elementsGroup[1].value;
    let flourWeight = '##';

    if (flourPercent) {
      // If Validation === False >>> return false;

      flourPercent = Number(flourPercent) / 100;
      flourWeight = flourForKneading * flourPercent;
      additionalFlours += flourWeight;
    }

    if (typeof flourWeight === 'string') {
      elementsGroup[2].textContent = flourWeight;
    } else {
      elementsGroup[2].textContent = flourWeight.toFixed(0);
    }

    formFloursObj[i] = { flourType, flourPercent, flourWeight };
  }

  const whiteFlour = flourForKneading - additionalFlours;

  console.log(`Additional flous: ${additionalFlours.toFixed(0)}`);
  console.log(`White flour: ${whiteFlour.toFixed(0)}`);
  console.log(`Total flour: ${additionalFlours + whiteFlour}`);
  console.log(formFloursObj);

  return true;
}

function calculateAdditionalIngredients() {}

// IMPORTS
import { formFlours } from './elements.js';
