let isFirstPageLoad = true;

// Main Calculation on submit
export default function calcMainSubmit() {
  let formData = new FormData(formMain);
  const formDataObj = formdataToObject(formData);

  // Validation
  if (hasEmptyFieldsValidation()) {
    if (isFirstPageLoad) {
      isFirstPageLoad = false;
    } else {
      setLocaleStorageMain();
      alert('Необходимо е всички полета да бъдат попълнени!');
      // alert('All fields required!');
    }

    return false;
  }

  if (!valuesRangeValidation()) {
    return false;
  }

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

  if (isFirstPageLoad) {
    isFirstPageLoad = false;
  } else {
    temporaryOnClickAlert('&check;', 500, 'green');
  }

  return true;
}

// IMPORTS
import { formdataToObject } from './helpers.js';
import { formMain } from './elements.js';
import { setLocaleStorageMain } from './storage.js';
import { printMainPrimaryResults, printMainSecondaryResults } from './print.js';
import { temporaryOnClickAlert } from './alerts.js';
import {
  hasEmptyFieldsValidation,
  valuesRangeValidation,
} from './validation.js';
import {
  getTotalDoughWeight,
  getTotalFlour,
  getTotalWater,
  getTotalSalt,
  getLeavenComponents,
  getIngredientsForKneading,
} from './math.js';
