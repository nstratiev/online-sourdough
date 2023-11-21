// Print functions
// additionalTextObj = {prefix: '', postfix: ''};
export function printResult(
  value,
  resultElem,
  toFixedIndex,
  additionalTextObj
) {
  let result;

  if (value) {
    if (additionalTextObj) {
      result = `${additionalTextObj.prefix}${value.toFixed(toFixedIndex)}${
        additionalTextObj.postfix
      }`;
    } else {
      result = `${value.toFixed(toFixedIndex)}`;
    }
  } else {
    result = '';
  }

  resultElem.textContent = result;
}
