import { setStorage } from "./storage.js";
import { setHTMLTitle } from "./utils/utils.js";
import { getHslFromHex, getHexFromHsl, getBestFontContrast, getRgbFromHex } from "./utils/colors/colors.js";
// CONSTANTES ------------------------------------------------------------------
const APPNAME = "Color Helper";
const black = '#000000';
const white = '#ffffff';
// FONCTIONS -------------------------------------------------------------------

// INTERACTIONS UTILISATEUR ----------------------------------------------------

const onSwitchClick = () => {
  if (isWhite) {
    isWhite = false;
    document.documentElement.style.setProperty('--html-background-color', '#000000');
    document.documentElement.style.setProperty('--font-color-default', 'var(--gray-20)');
  } else {
    isWhite = true;
    document.documentElement.style.setProperty('--html-background-color', '#ffffff');
    document.documentElement.style.setProperty('--font-color-default', 'var(--gray-80)');
  }
}
window.onSwitchClick = onSwitchClick;

const watchColorPicker = (event) => {
  const newColor = event.target.value;

  setBaseColorDom(newColor);
  setVariantColorsDom(newColor);
  setContrastColorDom(newColor);
  setComplementaryColorDom(newColor);
  setAnalogousPaletteDom(newColor);
  setSplitComplementaryPaletteDom(newColor);
  setTriadicPaletteDom(newColor);
  setSquarePaletteDom(newColor);
  setRainbowPaletteDom(newColor);
}

// Base color ---------------------------------------------------------
const setBaseColorDom = (hexColor) => {
  //console.log(`baseColor color: ${hexColor}`);
  /* console.log(getRgbFromHex(hexColor));
  console.log(getHslFromHex(hexColor));
  console.log(getHexFromHsl(getHslFromHex(hexColor))); */
  let list1 = document.getElementsByClassName("base-color-hex-value")
  for (let item of list1) {
    item.style.color = getBestFontContrast(hexColor, black, white);
    item.innerHTML = hexColor;
  }

  let list2 = document.getElementsByClassName("base-color-bloc")
  for (let item of list2) {
    item.style.backgroundColor = hexColor;
  }
}

// Variant color ---------------------------------------------------------
const getVariantColors = (hexColor) => {
  let hsl1 = getHslFromHex(hexColor);
  let firstColor = hsl1;
  let l = firstColor[2];
  l -= 10;
  if (l < 0) { l = 0};
  firstColor[2] = l;

  let hsl2 = getHslFromHex(hexColor);
  let secondColor = hsl2;
  let l2 = secondColor[2];
  l2 += 10;
  if (l2 > 100) { l2 = 100};
  secondColor[2] = l2;

  return [getHexFromHsl(firstColor), getHexFromHsl(secondColor)];
}
const setVariantColorsDom = (hexColor) => {
  //console.log(`variant colors: ${getVariantColors(hexColor)}`);
  document.getElementById('variantString1').innerHTML = getVariantColors(hexColor)[0];
  document.getElementById('variantString1').style.color = getBestFontContrast(getVariantColors(hexColor)[0],black, white);
  document.getElementById('variantDiv1').style.backgroundColor = getVariantColors(hexColor)[0];

  document.getElementById('variantString2').innerHTML = getVariantColors(hexColor)[1];
  document.getElementById('variantString2').style.color = getBestFontContrast(getVariantColors(hexColor)[1],black, white);
  document.getElementById('variantDiv2').style.backgroundColor = getVariantColors(hexColor)[1];
}

// Contrast color ---------------------------------------------------------
const getContrastColor = (hexColor) => {
  let hsl = getHslFromHex(hexColor);
  let h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];
  h += 180;
  if (h > 360) { h -= 360};

  s = 100 - s;
  l = 100 - l;

  hsl[0] = h;
  hsl[1] = s;
  hsl[2] = l;
  return getHexFromHsl(hsl);
}
const setContrastColorDom = (hexColor) => {
  //console.log(`contrast color: ${getContrastColor(hexColor)}`);
  document.getElementById('contrastString').innerHTML = getContrastColor(hexColor);
  document.getElementById('contrastString').style.color = getBestFontContrast(getContrastColor(hexColor),black, white);
  document.getElementById('contrastDiv').style.backgroundColor = getContrastColor(hexColor);
}

// Complementary color ---------------------------------------------------------
const getComplementaryColor = (hexColor) => {
  let hsl = getHslFromHex(hexColor);
  let h = hsl[0];
  h += 180;
  if (h > 360) { h -= 360};
  hsl[0] = h;
  return getHexFromHsl(hsl);
}
const setComplementaryColorDom = (hexColor) => {
  //console.log(`complementary color: ${getComplementaryColor(hexColor)}`);
  document.getElementById('complementaryString').innerHTML = getComplementaryColor(hexColor);
  document.getElementById('complementaryString').style.color = getBestFontContrast(getComplementaryColor(hexColor),black, white);
  document.getElementById('complementaryDiv').style.backgroundColor = getComplementaryColor(hexColor);
}

// Analogous palette -----------------------------------------------------------
const getAnalogousPalette = (hexColor) => {
  let hsl1 = getHslFromHex(hexColor);
  let firstColor = hsl1;
  let h = firstColor[0];
  h += 30;
  if (h > 360) { h -= 360};
  firstColor[0] = h;

  let hsl2 = getHslFromHex(hexColor);
  let secondColor = hsl2;
  let h2 = secondColor[0];
  h2 -= 30;
  if (h2 < 360) { h2 += 360};
  secondColor[0] = h2;

  return [getHexFromHsl(firstColor), getHexFromHsl(secondColor)];
}
const setAnalogousPaletteDom = (hexColor) => {
  //console.log(`analogous palette: ${getAnalogousPalette(hexColor)}`);
  document.getElementById('analogousString1').innerHTML = getAnalogousPalette(hexColor)[0];
  document.getElementById('analogousString1').style.color = getBestFontContrast(getAnalogousPalette(hexColor)[0],black, white);
  document.getElementById('analogousDiv1').style.backgroundColor = getAnalogousPalette(hexColor)[0];

  document.getElementById('analogousString2').innerHTML = getAnalogousPalette(hexColor)[1];
  document.getElementById('analogousString2').style.color = getBestFontContrast(getAnalogousPalette(hexColor)[1],black, white);
  document.getElementById('analogousDiv2').style.backgroundColor = getAnalogousPalette(hexColor)[1];
}

// Split-complementary palette -----------------------------------------------
const getSplitComplementaryPalette = (hexColor) => {
  let hsl1 = getHslFromHex(getComplementaryColor(hexColor));
  let firstColor = hsl1;
  let h = firstColor[0];
  h += 30;
  if (h > 360) { h -= 360};
  firstColor[0] = h;

  let hsl2 = getHslFromHex(getComplementaryColor(hexColor));
  let secondColor = hsl2;
  let h2 = secondColor[0];
  h2 -= 30;
  if (h2 < 360) { h2 += 360};
  secondColor[0] = h2;

  return [getHexFromHsl(firstColor), getHexFromHsl(secondColor)];
}
const setSplitComplementaryPaletteDom = (hexColor) => {
  //console.log(`split complementary palette: ${getSplitComplementaryPalette(hexColor)}`);
  document.getElementById('splitComplementaryString1').innerHTML = getSplitComplementaryPalette(hexColor)[0];
  document.getElementById('splitComplementaryString1').style.color = getBestFontContrast(getSplitComplementaryPalette(hexColor)[0],black, white);
  document.getElementById('splitComplementaryDiv1').style.backgroundColor = getSplitComplementaryPalette(hexColor)[0];

  document.getElementById('splitComplementaryString2').innerHTML = getSplitComplementaryPalette(hexColor)[1];
  document.getElementById('splitComplementaryString2').style.color = getBestFontContrast(getSplitComplementaryPalette(hexColor)[1],black, white);
  document.getElementById('splitComplementaryDiv2').style.backgroundColor = getSplitComplementaryPalette(hexColor)[1];
}

// Triadic palette ---------------------------------------------------------
const getTriadicPalette = (hexColor) => {
  let hsl1 = getHslFromHex(hexColor);
  let firstColor = hsl1;
  let h = firstColor[0];
  h += 120;
  if (h > 360) { h -= 360};
  firstColor[0] = h;

  let hsl2 = getHslFromHex(hexColor);
  let secondColor = hsl2;
  let h2 = secondColor[0];
  h2 -= 120;
  if (h2 < 360) { h2 += 360};
  secondColor[0] = h2;

  return [getHexFromHsl(firstColor), getHexFromHsl(secondColor)];
}
const setTriadicPaletteDom = (hexColor) => {
  //console.log(`triadic palette: ${getTriadicPalette(hexColor)}`);
  document.getElementById('triadicString1').innerHTML = getTriadicPalette(hexColor)[0];
  document.getElementById('triadicString1').style.color = getBestFontContrast(getTriadicPalette(hexColor)[0],black, white);
  document.getElementById('triadicDiv1').style.backgroundColor = getTriadicPalette(hexColor)[0];

  document.getElementById('triadicString2').innerHTML = getTriadicPalette(hexColor)[1];
  document.getElementById('triadicString2').style.color = getBestFontContrast(getTriadicPalette(hexColor)[1],black, white);
  document.getElementById('triadicDiv2').style.backgroundColor = getTriadicPalette(hexColor)[1];
}

// Square palette ---------------------------------------------------------
const getSquarePalette = (hexColor) => {
  let hsl1 = getHslFromHex(hexColor);
  let firstColor = hsl1;
  let h = firstColor[0];
  h += 90;
  if (h > 360) { h -= 360};
  firstColor[0] = h;

  let hsl2 = getHslFromHex(hexColor);
  let thirdColor = hsl2;
  let h2 = thirdColor[0];
  h2 -= 90;
  if (h2 < 360) { h2 += 360};
  thirdColor[0] = h2;

  return [getHexFromHsl(firstColor), getComplementaryColor(hexColor), getHexFromHsl(thirdColor)];
}
const setSquarePaletteDom = (hexColor) => {
  //console.log(`square palette: ${getSquarePalette(hexColor)}`);
  document.getElementById('squareString1').innerHTML = getSquarePalette(hexColor)[0];
  document.getElementById('squareString1').style.color = getBestFontContrast(getSquarePalette(hexColor)[0],black, white);
  document.getElementById('squareDiv1').style.backgroundColor = getSquarePalette(hexColor)[0];

  document.getElementById('squareString2').innerHTML = getSquarePalette(hexColor)[1];
  document.getElementById('squareString2').style.color = getBestFontContrast(getSquarePalette(hexColor)[1],black, white);
  document.getElementById('squareDiv2').style.backgroundColor = getSquarePalette(hexColor)[1];

  document.getElementById('squareString3').innerHTML = getSquarePalette(hexColor)[2];
  document.getElementById('squareString3').style.color = getBestFontContrast(getSquarePalette(hexColor)[2],black, white);
  document.getElementById('squareDiv3').style.backgroundColor = getSquarePalette(hexColor)[2];
}

// Rainbow palette ---------------------------------------------------------
const getRainbowPalette = (hexColor) => {
  let colors = [];
  let hsl = getHslFromHex(hexColor);
  let h = hsl[0];
  for (let index = 0; index < 6; index++) {
    h += 51.42857142857143;
    if (h > 360) { h -= 360};
    colors.push(getHexFromHsl([h, hsl[1], hsl[2]]));
  }
  return colors;
}
const setRainbowPaletteDom = (hexColor) => {
  //console.log(`square palette: ${getRainbowPalette(hexColor)}`);
  for (let index = 0; index < 6; index++) {
    document.getElementById(`rainbowString${index + 1}`).innerHTML = getRainbowPalette(hexColor)[index];
    document.getElementById(`rainbowString${index + 1}`).style.color = getBestFontContrast(getRainbowPalette(hexColor)[index],black, white);
    document.getElementById(`rainbowDiv${index + 1}`).style.backgroundColor = getRainbowPalette(hexColor)[index];
  }
}

// DOM GENERATION --------------------------------------------------------------

// EXECUTION -------------------------------------------------------------------

// Auto ----------------------------------------------------
setStorage();

const setDocumentHeight = () => {
  document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', setDocumentHeight);
setDocumentHeight();

// Manuelle ------------------------------------------------

let isWhite = true;
setHTMLTitle(APPNAME);
const main = document.getElementById('main');
main.innerHTML = `
  <h1>Color Helper</h1>

  <button onclick="onSwitchClick()">
    <img src="./medias/images/font-awsome/circle-half-stroke-solid.svg" class="contrast-img" />
  </button>

  <div class="color-picker-category">
    <h2>Color Picker</h2>
    <div class="color-picker-container">
      <input type="color" id="colorPicker" name="colorPicker" value="#e66465" class="color-input" />
    </div>
  </div>

  <div class="categories-container">

    <div class="category">
      <h2>Variant colors</h2>
      <div class="color-group">
      <div id="variantDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="variantString1"></span></div>
      <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="variantDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="variantString2"></div>
      </div>
    </div>

    <div class="category">
      <h2>Contrast color</h2>
      <div class="color-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="contrastDiv" class="color-bloc"><span class="color-bloc-hex-value" id="contrastString"></span></div>
      </div>
    </div>

    <div class="category">
      <h2>Complementary color</h2>
      <div class="color-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="complementaryDiv" class="color-bloc"><span class="color-bloc-hex-value" id="complementaryString"></span></div>
      </div>
    </div>

    <div class="category">
      <h2>Analogous palette</h2>
      <div class="color-group">
        <div id="analogousDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="analogousString1"></span></div>
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="analogousDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="analogousString2"></div>
      </div>
    </div>

    <div class="category">
      <h2>Split-complementary palette</h2>
      <div class="color-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="splitComplementaryDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="splitComplementaryString1"></span></div>
        <div id="splitComplementaryDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="splitComplementaryString2"></span></div>
      </div>
    </div>

    <div class="category">
      <h2>Triadic palette</h2>
      <div class="color-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="triadicDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="triadicString1"></span></div>
        <div id="triadicDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="triadicString2"></span></div>
      </div>
    </div>

    <div class="category">
      <h2>Square palette</h2>
      <div class="color-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="squareDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="squareString1"></span></div>
        <div id="squareDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="squareString2"></span></div>
        <div id="squareDiv3" class="color-bloc"><span class="color-bloc-hex-value" id="squareString3"></span></div>
      </div>
    </div>

    <div class="category">
      <h2>Rainbow palette</h2>
      <div class="color-group rainbow-group">
        <div class="color-bloc base-color-bloc"><span class="color-bloc-hex-value base-color-hex-value"></span></div>
        <div id="rainbowDiv1" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString1"></span></div>
        <div id="rainbowDiv2" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString2"></span></div>
        <div id="rainbowDiv3" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString3"></span></div>
        <div id="rainbowDiv4" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString4"></span></div>
        <div id="rainbowDiv5" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString5"></span></div>
        <div id="rainbowDiv6" class="color-bloc"><span class="color-bloc-hex-value" id="rainbowString6"></span></div>
      </div>
    </div>
  </div>

`;
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener("input", watchColorPicker, false);
colorPicker.addEventListener("change", watchColorPicker, false);

