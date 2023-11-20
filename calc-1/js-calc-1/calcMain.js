let isFirstPageLoad = true;

/*  
const breadParamsObj = {
  formula: {
    prefermFlourPercent,
    leavenHydr,
    waterPercent,
    saltPercent,
  },
  doughWeight,
  leaven: { flour, water },
  kneading: { flour, leaven, water, salt },
  total: { flour, water },
};
*/

export let breadParamsObj = {
  formula: {},
  doughWeight: null,
  leaven: {},
  kneading: {},
  total: {},
};

// Main Calculation on submit
export function calcMainSubmit() {
  let formData = new FormData(formMain);
  const formDataObj = formdataToObject(formData);

  // Validation
  const condition = hasEmptyFieldsValidation();

  if (condition[0]) {
    if (isFirstPageLoad) {
      isFirstPageLoad = false;
    } else {
      setLocaleStorageMain();

      setTimeout(() => {
        alertEmptyFieldBox
          .open()
          .then((val) => {
            condition[1].focus();
          })
          .catch((val) => {});
      }, 100);

      // alert('Необходимо е всички полета да бъдат попълнени!');
      // alert('All fields required!');
    }

    breadParamsObj = null;
    return false;
  }

  if (!valuesRangeValidation(numberFieldsMain)) {
    setLocaleStorageMain();

    breadParamsObj = null;
    return false;
  }

  // Input values
  const prefermFlourPercent = formDataObj.prefermFlourPercent / 100;
  const leavenHydratationPercent = formDataObj.leavenHydratationPercent / 100;
  const waterPercent = formDataObj.waterPercent / 100;
  const saltPercent = formDataObj.saltPercent / 100;
  const loafsCount = formDataObj.loafsCount;
  const loafWeight = formDataObj.loafWeight;
  numberFieldsWater[0].setAttribute('max', formDataObj.waterPercent);
  leavenHydrPredifinedResultElem.textContent =
    formDataObj.leavenHydratationPercent;

  // Calculated values
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

  // Set breadParamsObj
  breadParamsObj = {
    formula: {},
    doughWeight: null,
    leaven: {},
    kneading: {},
    total: {},
  };

  breadParamsObj.formula.prefermFlourPercent = prefermFlourPercent;
  breadParamsObj.formula.leavenHydr = leavenHydratationPercent;
  breadParamsObj.formula.waterPercent = waterPercent;
  breadParamsObj.formula.saltPercent = saltPercent;
  breadParamsObj.doughWeight = totalDoughWeight;
  breadParamsObj.leaven.flour = leavenObj.leavenFlour;
  breadParamsObj.leaven.water = leavenObj.leavenWater;
  breadParamsObj.kneading.flour = kneadingdObj.flour;
  breadParamsObj.kneading.leaven = leavenObj.leavenTotal;
  breadParamsObj.kneading.water = kneadingdObj.water;
  breadParamsObj.kneading.salt = kneadingdObj.salt;
  breadParamsObj.total.flour = totalFlour;
  breadParamsObj.total.water = totalWater;

  // console.log(breadParamsObj);

  setLocaleStorageMain();

  if (isFirstPageLoad) {
    isFirstPageLoad = false;
  } else {
    checkmarkAlertGreen();
    // console.log(isFirstPageLoad);
  }

  return true;
}

// IMPORTS
import { formdataToObject } from './helpers.js';
import {
  formMain,
  numberFieldsMain,
  numberFieldsWater,
  leavenHydrPredifinedResultElem,
} from './elements.js';
import { setLocaleStorageMain } from './storage.js';
import { printMainPrimaryResults, printMainSecondaryResults } from './print.js';
import { alertEmptyFieldBox, checkmarkAlertGreen } from './alerts.js';
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
