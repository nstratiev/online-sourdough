// Print functions
export function printResult(value, resultElem, toFixedIndex) {
  if (value) {
    resultElem.textContent = `${value.toFixed(toFixedIndex)}`;
  } else {
    resultElem.textContent = '';
  }
}
