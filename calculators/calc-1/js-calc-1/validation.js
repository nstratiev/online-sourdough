// export function hasEmptyInputField() {
//   for (const field of numberFieldsMain) {
//     const val = field.value;

//     if (val === '') {
//       setTimeout(() => {
//         field.focus();
//         field.style.outline = '2px solid green';
//       }, 0);

//       return true;
//     }
//   }

//   return false;
// }

// export function hasEmptyFieldsValidation() {
//   if (hasEmptyInputField()) {
//     return true;
//   }

//   return false;
// }
export function onFocusOutValidation(field, min, max) {
  const inputValue = Number(field.value);
  min = Number(min);
  max = Number(max);

  if (max === 0) {
    max = Number.MAX_SAFE_INTEGER;
  }

  if (field.value === '') {
    field.style.outline = '2px solid green';
  } else if (inputValue < min || inputValue > max) {
    field.style.outline = '2px solid red';
  } else {
    field.style.outline = 'none';
  }
}

export function hasEmptyFieldsValidation() {
  for (const field of numberFieldsMain) {
    const val = field.value;

    // console.log(val);

    if (val === '') {
      setTimeout(() => {
        field.focus();
        field.style.outline = '2px solid green';
      }, 0);

      return true;
    }
  }

  return false;
}

export function valueRangeCheck(field, min, max) {
  const inputValue = Number(field.value);
  min = Number(min);
  max = Number(max);

  if (max === 0) {
    max = Number.MAX_SAFE_INTEGER;
  }

  if (inputValue < min || inputValue > max) {
    const alertOutOfRangeBox = new ConfirmModal({
      titleText: '',
      msgText: `Моля, въведете стойност в диапазона:`,
      confirmText: 'OK',
      cancelText: '',
      msgText2: `[ ${min} - ${max} ]`,
    });

    setTimeout(() => {
      field.focus();
      field.style.outline = '2px solid red';

      // alert(`Моля, въведете стойност в диапазона: [ ${min} - ${max} ]!`);
    }, 0);

    alertOutOfRangeBox
      .open()
      .then((val) => {})
      .catch((val) => {});

    return false;
  } else {
    field.style.outline = 'none';
    return true;
  }
}

export function valuesRangeValidation() {
  let isValid = true;

  for (const field of numberFieldsMain) {
    const min = field.min;
    const max = field.max;

    if (valueRangeCheck(field, min, max)) {
      continue;
    } else {
      isValid = false;
      break;
    }
  }

  return isValid;
}

// IMPORTS
import { ConfirmModal } from '../../common-js/modalClass.js';
import { numberFieldsMain } from './elements.js';
