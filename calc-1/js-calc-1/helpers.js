// Helper Functions
// --- DOM helper functions
export function preventDefaultOnEnterKeyPress(element) {
  element.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}

export function addOnEnterFormListener(form, func) {
  form.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' && e.key === 'Enter') {
      setTimeout(func, 10);
    }
  });
}

// --- Basic helper functions
export function formdataToObject(formData) {
  const formDataArr = Array.from(formData);
  formDataArr.map((el) => {
    el[1] = Number(el[1]);
  });

  return Object.fromEntries(formDataArr);
}

export function camelToKebapCase(str) {
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
