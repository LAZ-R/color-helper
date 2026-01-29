import * as FILTER from './colors/filter.js';

export const getFilterStringForHexValue = (hexValue) => {
  return FILTER.getFilterStringForHexValue(hexValue);
}

export const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const setHTMLTitle = (pageTitle) => {
  const title = document.getElementById('title');
  title.innerHTML = pageTitle;

  const appleTitle = document.getElementById('appleTitle');
  appleTitle.setAttribute('content', pageTitle);
}