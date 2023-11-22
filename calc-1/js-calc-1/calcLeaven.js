// formLeavenObj = {workLeaven: ..., feedRatio: ... };
let formLeavenObj = {};

export function calculateLeavenSubmit() {
  if (!calcMainSubmit()) {
    return null;
  }

  if (!calcLeaven()) {
    return false;
  }

  localStorage.setItem('formLeaven', JSON.stringify(formLeavenObj));
  return true;
}

export function calcLeaven() {
  if (breadParamsObj === null) {
    return false;
  }

  // Validation
  if (!hasOutOfRangeFieldsValidation(numberFieldsLeaven)) {
    return false;
  }

  const leavenHydratationPercent = breadParamsObj.formula.leavenHydr;

  const workLeavenWeightStr = numberFieldsLeaven[0].value;
  const workLeavenWeight = Number(workLeavenWeightStr);
  const leavenFeedRatioStr = numberFieldsLeaven[1].value;
  const leavenFeedRatio = Number(leavenFeedRatioStr);

  // Reset in case of empty input
  // alert('Моля, поълнете всички полета на формата ...');
  if (!workLeavenWeight || !leavenFeedRatio) {
    resetLeavenResults();
    return false;
  }

  const feedMother_1 =
    workLeavenWeight / (1 + leavenFeedRatio * (1 + leavenHydratationPercent));
  const feedFlour_1 = feedMother_1 * leavenFeedRatio;
  const feedWater_1 = feedFlour_1 * leavenHydratationPercent;
  const feedTotal_1 = feedMother_1 + feedFlour_1 + feedWater_1;

  const feedMother_2 =
    workLeavenWeight / (leavenFeedRatio * (1 + leavenHydratationPercent));
  const feedFlour_2 = feedMother_2 * leavenFeedRatio;
  const feedWater_2 = feedFlour_2 * leavenHydratationPercent;
  const feedTotal_2 = feedMother_2 + feedFlour_2 + feedWater_2;

  // Print results
  printLeavenFeedResultsVer_1();
  printLeavenFeedResultsVer_2();
  printExplainedResults();

  // Set storage object
  formLeavenObj.workLeaven = workLeavenWeightStr;
  formLeavenObj.feedRatio = leavenFeedRatioStr;
  return true;

  // Inner functions
  function printLeavenFeedResultsVer_1() {
    printResult(feedMother_1, feedMotherResultElem_1, 0);
    printResult(feedFlour_1, feedFlourResultElem_1, 0);
    printResult(feedWater_1, feedWaterResultElem_1, 0);
    printResult(feedTotal_1, feedTotalResultElem_1, 0);
  }

  function printLeavenFeedResultsVer_2() {
    printResult(feedMother_2, feedMotherResultElem_2, 0);
    printResult(feedFlour_2, feedFlourResultElem_2, 0);
    printResult(feedWater_2, feedWaterResultElem_2, 0);
    printResult(feedTotal_2, feedTotalResultElem_2, 0);
  }

  function printExplainedResults() {
    if (feedTotal_1 && feedTotal_2) {
      explainedResultElemEquals.innerHTML = '&equals;';
      explainedResultElem_A.textContent = feedTotal_1.toFixed(0);
      explainedResultElemPlus.innerHTML = '&plus;';
      explainedResultElem_B.textContent = (feedTotal_2 - feedTotal_1).toFixed(
        0
      );
    } else {
      explainedResultElemEquals.textContent = '';
      explainedResultElem_A.textContent = '';
      explainedResultElemPlus.textContent = '';
      explainedResultElem_B.textContent = '';
    }
  }
}

export function getStorageAndCalculateLeaven() {
  getLocalStorageLeaven();
  calcLeaven();
}

//IMPORTS
import {
  numberFieldsLeaven,
  feedMotherResultElem_1,
  feedFlourResultElem_1,
  feedWaterResultElem_1,
  feedTotalResultElem_1,
  feedMotherResultElem_2,
  feedFlourResultElem_2,
  feedWaterResultElem_2,
  feedTotalResultElem_2,
  explainedResultElemEquals,
  explainedResultElem_A,
  explainedResultElemPlus,
  explainedResultElem_B,
} from './elements.js';
import { calcMainSubmit, breadParamsObj } from './calcMain.js';
import { hasOutOfRangeFieldsValidation } from './validation.js';
import { resetLeavenResults } from './reset.js';
import { printResult } from './print.js';
import { getLocalStorageLeaven } from './storage.js';
