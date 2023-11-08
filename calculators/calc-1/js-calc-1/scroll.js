// --- Screen scroll functions
export function onScreenScroll() {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    btnToTop.style.display = 'block';
  } else {
    btnToTop.style.display = 'none';
  }
}

export function goToScreenTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// IMPORTS
import { btnToTop } from './elements.js';
