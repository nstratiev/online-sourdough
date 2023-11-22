// On Focus Out
export function addOnFocusOutInputsListener(numberFields) {
  numberFields.forEach((field) => {
    field.addEventListener('focusout', (e) => {
      const min = e.target.min;
      const max = e.target.max;
      const isRequired = e.target.required;
      onFocusOutValidation(e.target, min, max, isRequired);
    });
  });
}

function onFocusOutValidation(field, min, max, isRequired) {
  const inputValue = Number(field.value);
  min = Number(min);
  max = Number(max);

  if (max === 0) {
    max = Number.MAX_SAFE_INTEGER;
  }

  if (field.value === '') {
    if (isRequired) {
      field.style.outline = '2px solid green';
    } else {
      field.style.outline = 'none';
    }
  } else if (inputValue < min || inputValue > max) {
    field.style.outline = '2px solid red';
  } else {
    field.style.outline = 'none';
  }
}

// On Empty Field
export function hasEmptyFieldsValidation(fields) {
  for (const field of fields) {
    const val = field.value;

    if (val === '') {
      setTimeout(() => {
        field.focus();
        field.style.outline = '2px solid green';
      }, 0);

      return [true, field];
    }
  }

  return [false];
}

// On Out Of Range
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
      field.style.outline = '2px solid red';
    }, 0);

    alertOutOfRangeBox
      .open()
      .then((val) => {
        field.focus();
      })
      .catch((val) => {});

    return false;
  } else {
    field.style.outline = 'none';
    return true;
  }
}

export function hasOutOfRangeFieldsValidation(fields) {
  for (const field of fields) {
    const min = field.min;
    const max = field.max;

    if (valueRangeCheck(field, min, max)) {
      continue;
    } else {
      return [true, field];
    }
  }

  return [false];
}

// IMPORTS
import { ConfirmModal } from '../../common-js/modalClass.js';
