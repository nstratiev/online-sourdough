camelToKebapCase('redGreenOrangeBlue');

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
