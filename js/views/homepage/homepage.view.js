import { APP_NAME, APP_VERSION } from "../../../app-properties.js";
import { ICONS } from "../../data/svgIcons.data.js";
import { toExternalPath } from "../../router.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { updateMenuDom } from "../../services/menu.service.js";
import { getUser, setUser } from "../../services/storage.service.js";
import { showToast } from "../../services/toast.service.js";
import { isLaptopOrUp, isPhone, isTablet } from "../../utils/breakpoints.js";
import { getBestFontContrast, getHexFromHsl, getHslFromHex, getRgbFromHex } from "../../utils/factory/colors.js";
import { getFilterStringForHexValue } from "../../utils/factory/filter.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////

const HEADER_ICON_CONTAINER = document.getElementById('headerIconContainer');
const HEADER_TITLE = document.getElementById('headerTitle');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  let user = getUser();
  // Set HEADER layout
  if (isPhone || isTablet) {
    HEADER_TITLE.innerHTML = APP_NAME;
  }
  if (isLaptopOrUp) {
    HEADER_TITLE.innerHTML = APP_NAME;
  }

  // Set MAIN layout
  MAIN.innerHTML = `
    <div class="top-area">

      <h1>Main color</h1>

      <div class="main-color-area">
        <div class="color-picker-container">
          <input type="color" id="colorPicker" name="colorPicker" value="${user.HEX_COLOR}" class="color-input" />
        </div>

        <div class="color-text-container">
          <div class="text-row">
            <span id="mainColorHex" class="hex-text">#bf4040</span>
            <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('mainColorHex')">${getSvgIcon('copy', 's')}</button>
          </div>
          <div class="text-row">
            <span id="mainColorHsl">hsl(0, 50%, 50%)</span>
            <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('mainColorHsl')">${getSvgIcon('copy', 's')}</button>
          </div>
          <div class="text-row">
            <span id="mainColorRgb">rgb(191, 64, 64)</span>
            <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('mainColorRgb')">${getSvgIcon('copy', 's')}</button>
          </div>
        </div>
      </div>
      
      <button onclick="onThemeClick()" class="lzr-button lzr-round contrast-button">${getSvgIcon('contrast', 'l')}</button>
    </div>

    <div class="page-container main-container" style="margin-top: 156px;">

      <h1 style="margin-right: 100%; text-wrap: nowrap;">Web development</h1>

      <div class="category-container">

        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">WCAG contrast ratio</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body" style="align-items: center; gap: 8px;">
                
                <table class="contrast-table lzr-margin-bottom">
                  <tr>
                    <th>Foreground</th>
                    <th>Demo</th>
                    <th>Ratio</th>
                  </tr>
                  <tr>
                    <td>White</td>
                    <td><span id="wcagSampleWhite" class="sample-text white">Sample</span></td>
                    <td><span id="wcagWhiteRatio"></span></td>
                  </tr>
                  <tr>
                    <td>Black</td>
                    <td><span id="wcagSampleBlack" class="sample-text black">Sample</span></td>
                    <td><span id="wcagBlackRatio"></span></td>
                  </tr>
                </table>

                <div class="lzr-drawer lzr-outlined lzr-info">
                  <div class="tile-header">
                    ${getSvgIcon('circle-info')}
                    <div>
                      <span class="header-title">Reminder</span>
                    </div>
                    <div class="tile-caret">
                    ${getSvgIcon('chevron-right', 'm', null)}
                    </div>
                    <input type="checkbox">
                  </div>
                  <div class="expandable-wrapper">
                    <div class="expandable-inner">
                      <div class="inner-body">
                        <p class="lzr-margin-bottom">
                          The WCAG contrast ratio measure the contrast between two colors in order to assess the readability of a text against its background.<br>
                          <br>
                          It ranges from 1 to 21 :<br>
                          <ul>
                            <li>1:1 → same color (unreadable)</li>
                            <li>21:1 → pure black on pure white (max)</li>
                          </ul>
                        </p>

                        <table>
                          <tr>
                            <th>Ratio</th>
                            <th>WCAG status</th>
                          </tr>
                          <tr>
                            <td>< 3.0</td>
                            <td>❌ Fail</td>
                          </tr>
                          <tr>
                            <td>≥ 3.0</td>
                            <td>⚠️ AA large text</td>
                          </tr>
                          <tr>
                            <td>≥ 4.5</td>
                            <td>✅ AA</td>
                          </tr>
                          <tr>
                            <td>≥ 7.0</td>
                            <td>✅✅ AAA</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">CSS Filter</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body" style="align-items: center; gap: 8px;">
                <div class="python-icons-container">
                  <div class="python-icon-container">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" />
                  </div>
                  ${getSvgIcon('chevron-right', 'xxl')}
                  <div class="python-icon-container">
                    <img id="filteredImg" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" />
                  </div>
                </div>
                
                <p id="cssFilterString">...</p>
                <button class="lzr-button lzr-flat" onclick="onCopyFieldClick('cssFilterString')">${getSvgIcon('copy', 's')} Copy filter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <h1 style="margin-right: 100%;">Complementary</h1>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Complementary color</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="complementaryColor" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Inverted color</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="invertedColor" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <h1 style="margin-right: 100%;">Palettes</h1>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Luminosity palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="luminosityPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Analogous palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="analogousPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Triadic palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="triadicPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Split-complementary palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="splitComplementaryPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Square palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="squarePalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Pentagon palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="pentagonPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Hexagon palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="hexagonPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-container">
        <div class="lzr-drawer">
          <div class="tile-header">
            <div>
              <h2 class="header-title">Rainbow palette</h2>
            </div>
            <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
            </div>
            <input type="checkbox">
          </div>
          <div class="expandable-wrapper">
            <div class="expandable-inner">
              <div class="inner-body">
                <div id="rainbowPalette" class="palette-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = ``;

  updateMenuDom('homepage');

  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener("input", watchColorPicker, false);
  //colorPicker.addEventListener("change", watchColorPicker, false);

  setDomWithNewColor(user.HEX_COLOR);
}

function onCopyFieldClick(fieldId) {
  let TEXT = document.getElementById(fieldId).innerHTML;
  console.log(TEXT);
  navigator.clipboard.writeText(TEXT);
}
window.onCopyFieldClick = onCopyFieldClick;

function getContrastRatio(RgbColor1, RgbColor2) {
  function normalize(channel) {
    channel /= 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  }

  function luminance(RgbColorArray) {
    const R = normalize(RgbColorArray[0]);
    const G = normalize(RgbColorArray[1]);
    const B = normalize(RgbColorArray[2]);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  const L1 = luminance(RgbColor1);
  const L2 = luminance(RgbColor2);

  const brightest = Math.max(L1, L2);
  const darkest = Math.min(L1, L2);

  return ((brightest + 0.05) / (darkest + 0.05)).toFixed(1);
}

function getContrastEmoji(contrastValue) {
  if (contrastValue < 3) {
    return '❌'
  } else if (contrastValue >= 3 && contrastValue < 4.5) {
    return '⚠️';
  } else if (contrastValue >= 4.5 && contrastValue < 7) {
    return '✅';
  } else {
    return '✅✅';
  }
}

function onThemeClick() {
  let user = getUser();
  //console.log(user.PREFERED_THEME);
  if (user.PREFERED_THEME == 'dark') {
    user.PREFERED_THEME = 'light';
  } else if (user.PREFERED_THEME == 'light') {
    user.PREFERED_THEME = 'dark';
  }
  setUser(user);
  document.getElementsByClassName('lzr')[0].style = `--theme: '${user.PREFERED_THEME}';`;
}
window.onThemeClick = onThemeClick;

function watchColorPicker(event) {
  let user = getUser();
  const newColorHex = event.target.value;
  setDomWithNewColor(newColorHex);
  user.HEX_COLOR = newColorHex;
  setUser(user);
}

function setDomWithNewColor(newColorHex) {
  // Main color
  // Hexadecimal
  document.getElementById('mainColorHex').innerHTML = newColorHex;
  // HSL
  let newColorHslArray = getHslFromHex(newColorHex);
  document.getElementById('mainColorHsl').innerHTML = `hsl(${newColorHslArray[0]}, ${newColorHslArray[1]}%, ${newColorHslArray[2]}%)`;
  // RGB
  let newColorRgbArray = getRgbFromHex(newColorHex);
  document.getElementById('mainColorRgb').innerHTML = `rgb(${newColorRgbArray[0]}, ${newColorRgbArray[1]}, ${newColorRgbArray[2]})`;

  // Contrast ratios
  let wcagWhiteRatioElement = document.getElementById('wcagWhiteRatio');
  let wcagSampleWhite = document.getElementById('wcagSampleWhite');
  wcagSampleWhite.style.backgroundColor = `hsl(${newColorHslArray[0]}, ${newColorHslArray[1]}%, ${newColorHslArray[2]}%)`;
  let whiteRatio = getContrastRatio(newColorRgbArray, getRgbFromHex('#FFFFFF'));
  let whiteEmoji = getContrastEmoji(whiteRatio);
  wcagWhiteRatioElement.innerHTML = `${whiteRatio} ${whiteEmoji}`;
  
  let wcagBlackRatioElement = document.getElementById('wcagBlackRatio');
  let wcagSampleBlack = document.getElementById('wcagSampleBlack');
  wcagSampleBlack.style.backgroundColor = `hsl(${newColorHslArray[0]}, ${newColorHslArray[1]}%, ${newColorHslArray[2]}%)`;
  let blackRatio = getContrastRatio(newColorRgbArray, getRgbFromHex('#000000'));
  let blackEmoji = getContrastEmoji(blackRatio);
  wcagBlackRatioElement.innerHTML = `${blackRatio} ${blackEmoji}`;

  // CSS Filter
  document.getElementById('cssFilterString').innerHTML = `filter: ${getFilterStringForHexValue(newColorHex)}`;
  document.getElementById('filteredImg').setAttribute('style', `filter: ${getFilterStringForHexValue(newColorHex)}`);

  // Complementary
  document.getElementById('complementaryColor').innerHTML = getComplementaryColorDom(newColorHslArray);
  // Inverted
  document.getElementById('invertedColor').innerHTML = getInvertedColorDom(newColorHslArray);


  // Palettes
  // Luminosity
  document.getElementById('luminosityPalette').innerHTML = getLuminosityPaletteDom(newColorHslArray);
  // Analogous
  document.getElementById('analogousPalette').innerHTML = getAnalogousPaletteDom(newColorHslArray);
  // Triadic
  document.getElementById('triadicPalette').innerHTML = getTriadicPaletteDom(newColorHslArray);
  // Split-complementary
  document.getElementById('splitComplementaryPalette').innerHTML = getSplitComplementaryPaletteDom(newColorHslArray);
  // Square
  document.getElementById('squarePalette').innerHTML = getSquarePaletteDom(newColorHslArray);
  // Pentagon
  document.getElementById('pentagonPalette').innerHTML = getPentagonPaletteDom(newColorHslArray);
  // Hexagon
  document.getElementById('hexagonPalette').innerHTML = getHexagonPaletteDom(newColorHslArray);
  // Rainbow
  document.getElementById('rainbowPalette').innerHTML = getRainbowPaletteDom(newColorHslArray);

  
}

// Complementary
function getComplementaryColorDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hPlus180 = ((h + 180) > 360) ? h + 180 - 360 : (h + 180);

  let baseHsl = { h, s, l};
  let plus180Hsl = { h: hPlus180, s, l};

  let baseHex = getHexFromHsl(baseHsl);
  let plus180Hex = getHexFromHsl(plus180Hsl);

  let baseRgb = getRgbFromHex(baseHex);
  let plus180Rgb = getRgbFromHex(plus180Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus180}, ${s}%, ${l}%); color: ${getBestFontContrast(plus180Hex, "black", "white")};"></span>
      <span class="palette-text">+180°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus180ColorHex" class="hex-text">${plus180Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180ColorHsl">hsl(${plus180Hsl.h}, ${plus180Hsl.s}%, ${plus180Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180ColorRgb">rgb(${plus180Rgb[0]}, ${plus180Rgb[1]}, ${plus180Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

// Inverted
function getInvertedColorDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hInverted = ((h + 180) > 360) ? h + 180 - 360 : (h + 180);
  let sInverted = 100 - s;
  let lInverted = 100 - l;

  let baseHsl = { h, s, l};
  let invertedHsl = { h: hInverted, s: sInverted, l: lInverted };

  let baseHex = getHexFromHsl(baseHsl);
  let invertedHex = getHexFromHsl(invertedHsl);

  let baseRgb = getRgbFromHex(baseHex);
  let invertedRgb = getRgbFromHex(invertedHex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hInverted}, ${sInverted}%, ${lInverted}%); color: ${getBestFontContrast(invertedHex, "black", "white")};"></span>
      <span class="palette-text">Inverted</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="invertedColorHex" class="hex-text">${invertedHex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('invertedColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="invertedColorHsl">hsl(${invertedHsl.h}, ${invertedHsl.s}%, ${invertedHsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('invertedColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="invertedColorRgb">rgb(${invertedRgb[0]}, ${invertedRgb[1]}, ${invertedRgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('invertedColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

// PALETTES DOM

function getLuminosityPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let lMinus10 = ((l - 10) < 0) ? 0 : (l - 10);
  let lMinus5 = ((l - 5) < 0) ? 0 : (l - 5);
  let lPlus5 = ((l + 5) > 100) ? 100 : (l + 5);
  let lPlus10 = ((l + 10) > 100) ? 100 : (l + 10);

  let minus10Hsl = { h, s, l: lMinus10};
  let minus5Hsl = { h, s, l: lMinus5};
  let baseHsl = { h, s, l};
  let plus5Hsl = { h, s, l: lPlus5};
  let plus10Hsl = { h, s, l: lPlus10};

  let minus10Hex = getHexFromHsl(minus10Hsl);
  let minus5Hex = getHexFromHsl(minus5Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus5Hex = getHexFromHsl(plus5Hsl);
  let plus10Hex = getHexFromHsl(plus10Hsl);

  let minus10Rgb = getRgbFromHex(minus10Hex);
  let minus5Rgb = getRgbFromHex(minus5Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus5Rgb = getRgbFromHex(plus5Hex);
  let plus10Rgb = getRgbFromHex(plus10Hex);

  let str = `
    
    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${lPlus10}%); color: ${getBestFontContrast(plus10Hex, "black", "white")};"></span>
      <span class="palette-text">+10%</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus10ColorHex" class="hex-text">${plus10Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus10ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus10ColorHsl">hsl(${plus10Hsl.h}, ${plus10Hsl.s}%, ${plus10Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus10ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus10ColorRgb">rgb(${plus10Rgb[0]}, ${plus10Rgb[1]}, ${plus10Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus10ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${lPlus5}%); color: ${getBestFontContrast(plus5Hex, "black", "white")};"></span>
      <span class="palette-text">+5%</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus5ColorHex" class="hex-text">${plus5Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus5ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus5ColorHsl">hsl(${plus5Hsl.h}, ${plus5Hsl.s}%, ${plus5Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus5ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus5ColorRgb">rgb(${plus5Rgb[0]}, ${plus5Rgb[1]}, ${plus5Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus5ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${lMinus5}%); color: ${getBestFontContrast(minus5Hex, "black", "white")};"></span>
      <span class="palette-text">-5%</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus5ColorHex" class="hex-text">${minus5Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus5ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus5ColorHsl">hsl(${minus5Hsl.h}, ${minus5Hsl.s}%, ${minus5Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus5ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus5ColorRgb">rgb(${minus5Rgb[0]}, ${minus5Rgb[1]}, ${minus5Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus5ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${lMinus10}%); color: ${getBestFontContrast(minus10Hex, "black", "white")};"></span>
      <span class="palette-text">-10%</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus10ColorHex" class="hex-text">${minus10Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus10ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus10ColorHsl">hsl(${minus10Hsl.h}, ${minus10Hsl.s}%, ${minus10Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus10ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus10ColorRgb">rgb(${minus10Rgb[0]}, ${minus10Rgb[1]}, ${minus10Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus10ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getAnalogousPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus30 = ((h - 30) < 0) ? h - 30 + 360 : (h - 30);
  let hPlus30 = ((h + 30) > 360) ? h + 30 - 360 : (h + 30);

  let minus30Hsl = { h: hMinus30, s, l};
  let baseHsl = { h, s, l};
  let plus30Hsl = { h: hPlus30, s, l};

  let minus30Hex = getHexFromHsl(minus30Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus30Hex = getHexFromHsl(plus30Hsl);

  let minus30Rgb = getRgbFromHex(minus30Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus30Rgb = getRgbFromHex(plus30Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus30}, ${s}%, ${l}%); color: ${getBestFontContrast(minus30Hex, "black", "white")};"></span>
      <span class="palette-text">-30°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus30ColorHex" class="hex-text">${minus30Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus30ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus30ColorHsl">hsl(${minus30Hsl.h}, ${minus30Hsl.s}%, ${minus30Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus30ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus30ColorRgb">rgb(${minus30Rgb[0]}, ${minus30Rgb[1]}, ${minus30Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus30ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus30}, ${s}%, ${l}%); color: ${getBestFontContrast(plus30Hex, "black", "white")};"></span>
      <span class="palette-text">+30°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus30ColorHex" class="hex-text">${plus30Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus30ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus30ColorHsl">hsl(${plus30Hsl.h}, ${plus30Hsl.s}%, ${plus30Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus30ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus30ColorRgb">rgb(${plus30Rgb[0]}, ${plus30Rgb[1]}, ${plus30Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus30ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getTriadicPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus120 = ((h - 120) < 0) ? h - 120 + 360 : (h - 120);
  let hPlus120 = ((h + 120) > 360) ? h + 120 - 360 : (h + 120);

  let minus120Hsl = { h: hMinus120, s, l};
  let baseHsl = { h, s, l};
  let plus120Hsl = { h: hPlus120, s, l};

  let minus120Hex = getHexFromHsl(minus120Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus120Hex = getHexFromHsl(plus120Hsl);

  let minus120Rgb = getRgbFromHex(minus120Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus120Rgb = getRgbFromHex(plus120Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus120}, ${s}%, ${l}%); color: ${getBestFontContrast(minus120Hex, "black", "white")};"></span>
      <span class="palette-text">-120°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus120ColorHex" class="hex-text">${minus120Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus120ColorHsl">hsl(${minus120Hsl.h}, ${minus120Hsl.s}%, ${minus120Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus120ColorRgb">rgb(${minus120Rgb[0]}, ${minus120Rgb[1]}, ${minus120Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus120}, ${s}%, ${l}%); color: ${getBestFontContrast(plus120Hex, "black", "white")};"></span>
      <span class="palette-text">+120°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus120ColorHex" class="hex-text">${plus120Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus120ColorHsl">hsl(${plus120Hsl.h}, ${plus120Hsl.s}%, ${plus120Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus120ColorRgb">rgb(${plus120Rgb[0]}, ${plus120Rgb[1]}, ${plus120Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getSplitComplementaryPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus150 = ((h - 150) < 0) ? h - 150 + 360 : (h - 150);
  let hPlus150 = ((h + 150) > 360) ? h + 150 - 360 : (h + 150);

  let minus150Hsl = { h: hMinus150, s, l};
  let baseHsl = { h, s, l};
  let plus150Hsl = { h: hPlus150, s, l};

  let minus150Hex = getHexFromHsl(minus150Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus150Hex = getHexFromHsl(plus150Hsl);

  let minus150Rgb = getRgbFromHex(minus150Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus150Rgb = getRgbFromHex(plus150Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus150}, ${s}%, ${l}%); color: ${getBestFontContrast(minus150Hex, "black", "white")};"></span>
      <span class="palette-text">-150°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus150ColorHex" class="hex-text">${minus150Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus150ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus150ColorHsl">hsl(${minus150Hsl.h}, ${minus150Hsl.s}%, ${minus150Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus150ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus150ColorRgb">rgb(${minus150Rgb[0]}, ${minus150Rgb[1]}, ${minus150Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus150ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus150}, ${s}%, ${l}%); color: ${getBestFontContrast(plus150Hex, "black", "white")};"></span>
      <span class="palette-text">+150°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus150ColorHex" class="hex-text">${plus150Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus150ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus150ColorHsl">hsl(${plus150Hsl.h}, ${plus150Hsl.s}%, ${plus150Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus150ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus150ColorRgb">rgb(${plus150Rgb[0]}, ${plus150Rgb[1]}, ${plus150Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus150ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getSquarePaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus90 = ((h - 90) < 0) ? h - 90 + 360 : (h - 90);
  let hPlus90 = ((h + 90) > 360) ? h + 90 - 360 : (h + 90);
  let hPlus180 = ((h + 180) > 360) ? h + 180 - 360 : (h + 180);

  let minus90Hsl = { h: hMinus90, s, l};
  let baseHsl = { h, s, l};
  let plus90Hsl = { h: hPlus90, s, l};
  let plus180Hsl = { h: hPlus180, s, l};

  let minus90Hex = getHexFromHsl(minus90Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus90Hex = getHexFromHsl(plus90Hsl);
  let plus180Hex = getHexFromHsl(plus180Hsl);

  let minus90Rgb = getRgbFromHex(minus90Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus90Rgb = getRgbFromHex(plus90Hex);
  let plus180Rgb = getRgbFromHex(plus180Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus90}, ${s}%, ${l}%); color: ${getBestFontContrast(minus90Hex, "black", "white")};"></span>
      <span class="palette-text">-90°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus90ColorHex" class="hex-text">${minus90Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus90ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus90ColorHsl">hsl(${minus90Hsl.h}, ${minus90Hsl.s}%, ${minus90Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus90ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus90ColorRgb">rgb(${minus90Rgb[0]}, ${minus90Rgb[1]}, ${minus90Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus90ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus90}, ${s}%, ${l}%); color: ${getBestFontContrast(plus90Hex, "black", "white")};"></span>
      <span class="palette-text">+90°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus90ColorHex" class="hex-text">${plus90Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus90ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus90ColorHsl">hsl(${plus90Hsl.h}, ${plus90Hsl.s}%, ${plus90Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus90ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus90ColorRgb">rgb(${plus90Rgb[0]}, ${plus90Rgb[1]}, ${plus90Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus90ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus180}, ${s}%, ${l}%); color: ${getBestFontContrast(plus180Hex, "black", "white")};"></span>
      <span class="palette-text">+180°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus180SquareColorHex" class="hex-text">${plus180Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180SquareColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180SquareColorHsl">hsl(${plus180Hsl.h}, ${plus180Hsl.s}%, ${plus180Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180SquareColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180SquareColorRgb">rgb(${plus180Rgb[0]}, ${plus180Rgb[1]}, ${plus180Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180SquareColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getPentagonPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus144 = ((h - 144) < 0) ? h - 144 + 360 : (h - 144);
  let hMinus72 = ((h - 72) < 0) ? h - 72 + 360 : (h - 72);
  let hPlus72 = ((h + 72) > 360) ? h + 72 - 360 : (h + 72);
  let hPlus144 = ((h + 144) > 360) ? h + 144 - 360 : (h + 144);

  let minus144Hsl = { h: hMinus144, s, l};
  let minus72Hsl = { h: hMinus72, s, l};
  let baseHsl = { h, s, l};
  let plus72Hsl = { h: hPlus72, s, l};
  let plus144Hsl = { h: hPlus144, s, l};

  let minus144Hex = getHexFromHsl(minus144Hsl);
  let minus72Hex = getHexFromHsl(minus72Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus72Hex = getHexFromHsl(plus72Hsl);
  let plus144Hex = getHexFromHsl(plus144Hsl);

  let minus144Rgb = getRgbFromHex(minus144Hex);
  let minus72Rgb = getRgbFromHex(minus72Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus72Rgb = getRgbFromHex(plus72Hex);
  let plus144Rgb = getRgbFromHex(plus144Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus144}, ${s}%, ${l}%); color: ${getBestFontContrast(minus144Hex, "black", "white")};"></span>
      <span class="palette-text">-144°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus144ColorHex" class="hex-text">${minus144Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus144ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus144ColorHsl">hsl(${minus144Hsl.h}, ${minus144Hsl.s}%, ${minus144Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus144ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus144ColorRgb">rgb(${minus144Rgb[0]}, ${minus144Rgb[1]}, ${minus144Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus144ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus72}, ${s}%, ${l}%); color: ${getBestFontContrast(minus72Hex, "black", "white")};"></span>
      <span class="palette-text">-72°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus72ColorHex" class="hex-text">${minus72Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus72ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus72ColorHsl">hsl(${minus72Hsl.h}, ${minus72Hsl.s}%, ${minus72Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus72ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus72ColorRgb">rgb(${minus72Rgb[0]}, ${minus72Rgb[1]}, ${minus72Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus72ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus72}, ${s}%, ${l}%); color: ${getBestFontContrast(plus72Hex, "black", "white")};"></span>
      <span class="palette-text">+72°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus72ColorHex" class="hex-text">${plus72Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus72ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus72ColorHsl">hsl(${plus72Hsl.h}, ${plus72Hsl.s}%, ${plus72Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus72ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus72ColorRgb">rgb(${plus72Rgb[0]}, ${plus72Rgb[1]}, ${plus72Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus72ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus144}, ${s}%, ${l}%); color: ${getBestFontContrast(plus144Hex, "black", "white")};"></span>
      <span class="palette-text">+144°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus144ColorHex" class="hex-text">${plus144Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus144ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus144ColorHsl">hsl(${plus144Hsl.h}, ${plus144Hsl.s}%, ${plus144Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus144ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus144ColorRgb">rgb(${plus144Rgb[0]}, ${plus144Rgb[1]}, ${plus144Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus144ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>
  `;

  return str;
}

function getHexagonPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus120 = ((h - 120) < 0) ? h - 120 + 360 : (h - 120);
  let hMinus60 = ((h - 60) < 0) ? h - 60 + 360 : (h - 60);
  let hPlus60 = ((h + 60) > 360) ? h + 60 - 360 : (h + 60);
  let hPlus120 = ((h + 120) > 360) ? h + 120 - 360 : (h + 120);
  let hPlus180 = ((h + 180) > 360) ? h + 180 - 360 : (h + 180);

  let minus120Hsl = { h: hMinus120, s, l};
  let minus60Hsl = { h: hMinus60, s, l};
  let baseHsl = { h, s, l};
  let plus60Hsl = { h: hPlus60, s, l};
  let plus120Hsl = { h: hPlus120, s, l};
  let plus180Hsl = { h: hPlus180, s, l};

  let minus120Hex = getHexFromHsl(minus120Hsl);
  let minus60Hex = getHexFromHsl(minus60Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus60Hex = getHexFromHsl(plus60Hsl);
  let plus120Hex = getHexFromHsl(plus120Hsl);
  let plus180Hex = getHexFromHsl(plus180Hsl);

  let minus120Rgb = getRgbFromHex(minus120Hex);
  let minus60Rgb = getRgbFromHex(minus60Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus60Rgb = getRgbFromHex(plus60Hex);
  let plus120Rgb = getRgbFromHex(plus120Hex);
  let plus180Rgb = getRgbFromHex(plus180Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus120}, ${s}%, ${l}%); color: ${getBestFontContrast(minus120Hex, "black", "white")};"></span>
      <span class="palette-text">-120°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus120ColorHex" class="hex-text">${minus120Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus120ColorHsl">hsl(${minus120Hsl.h}, ${minus120Hsl.s}%, ${minus120Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus120ColorRgb">rgb(${minus120Rgb[0]}, ${minus120Rgb[1]}, ${minus120Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus120ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus60}, ${s}%, ${l}%); color: ${getBestFontContrast(minus60Hex, "black", "white")};"></span>
      <span class="palette-text">-60°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus60ColorHex" class="hex-text">${minus60Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus60ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus60ColorHsl">hsl(${minus60Hsl.h}, ${minus60Hsl.s}%, ${minus60Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus60ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus60ColorRgb">rgb(${minus60Rgb[0]}, ${minus60Rgb[1]}, ${minus60Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus60ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus60}, ${s}%, ${l}%); color: ${getBestFontContrast(plus60Hex, "black", "white")};"></span>
      <span class="palette-text">+60°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus60ColorHex" class="hex-text">${plus60Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus60ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus60ColorHsl">hsl(${plus60Hsl.h}, ${plus60Hsl.s}%, ${plus60Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus60ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus60ColorRgb">rgb(${plus60Rgb[0]}, ${plus60Rgb[1]}, ${plus60Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus60ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus120}, ${s}%, ${l}%); color: ${getBestFontContrast(plus120Hex, "black", "white")};"></span>
      <span class="palette-text">+120°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus120ColorHex" class="hex-text">${plus120Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus120ColorHsl">hsl(${plus120Hsl.h}, ${plus120Hsl.s}%, ${plus120Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus120ColorRgb">rgb(${plus120Rgb[0]}, ${plus120Rgb[1]}, ${plus120Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus120ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus180}, ${s}%, ${l}%); color: ${getBestFontContrast(plus180Hex, "black", "white")};"></span>
      <span class="palette-text">+180°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus180HexagonColorHex" class="hex-text">${plus180Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180HexagonColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180HexagonColorHsl">hsl(${plus180Hsl.h}, ${plus180Hsl.s}%, ${plus180Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180HexagonColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus180HexagonColorRgb">rgb(${plus180Rgb[0]}, ${plus180Rgb[1]}, ${plus180Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus180HexagonColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
  `;

  return str;
}

function getRainbowPaletteDom(colorHslArray) {
  let h = colorHslArray[0];
  let s = colorHslArray[1];
  let l = colorHslArray[2];

  let hMinus153 = ((h - 153) < 0) ? h - 153 + 360 : (h - 153);
  let hMinus102 = ((h - 102) < 0) ? h - 102 + 360 : (h - 102);
  let hMinus51 = ((h - 51) < 0) ? h - 51 + 351 : (h - 51);
  let hPlus51 = ((h + 51) > 351) ? h + 51 - 351 : (h + 51);
  let hPlus102 = ((h + 102) > 351) ? h + 102 - 351 : (h + 102);
  let hPlus153 = ((h + 153) > 351) ? h + 153 - 351 : (h + 153);

  let minus153Hsl = { h: hMinus153, s, l};
  let minus102Hsl = { h: hMinus102, s, l};
  let minus51Hsl = { h: hMinus51, s, l};
  let baseHsl = { h, s, l};
  let plus51Hsl = { h: hPlus51, s, l};
  let plus102Hsl = { h: hPlus102, s, l};
  let plus153Hsl = { h: hPlus153, s, l};

  let minus153Hex = getHexFromHsl(minus153Hsl);
  let minus102Hex = getHexFromHsl(minus102Hsl);
  let minus51Hex = getHexFromHsl(minus51Hsl);
  let baseHex = getHexFromHsl(baseHsl);
  let plus51Hex = getHexFromHsl(plus51Hsl);
  let plus102Hex = getHexFromHsl(plus102Hsl);
  let plus153Hex = getHexFromHsl(plus153Hsl);

  let minus153Rgb = getRgbFromHex(minus153Hex);
  let minus102Rgb = getRgbFromHex(minus102Hex);
  let minus51Rgb = getRgbFromHex(minus51Hex);
  let baseRgb = getRgbFromHex(baseHex);
  let plus51Rgb = getRgbFromHex(plus51Hex);
  let plus102Rgb = getRgbFromHex(plus102Hex);
  let plus153Rgb = getRgbFromHex(plus153Hex);

  let str = `

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus153}, ${s}%, ${l}%); color: ${getBestFontContrast(minus153Hex, "black", "white")};"></span>
      <span class="palette-text">-153°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus153ColorHex" class="hex-text">${minus153Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus153ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus153ColorHsl">hsl(${minus153Hsl.h}, ${minus153Hsl.s}%, ${minus153Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus153ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus153ColorRgb">rgb(${minus153Rgb[0]}, ${minus153Rgb[1]}, ${minus153Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus153ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus102}, ${s}%, ${l}%); color: ${getBestFontContrast(minus102Hex, "black", "white")};"></span>
      <span class="palette-text">-102°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus102ColorHex" class="hex-text">${minus102Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus102ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus102ColorHsl">hsl(${minus102Hsl.h}, ${minus102Hsl.s}%, ${minus102Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus102ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus102ColorRgb">rgb(${minus102Rgb[0]}, ${minus102Rgb[1]}, ${minus102Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus102ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hMinus51}, ${s}%, ${l}%); color: ${getBestFontContrast(minus51Hex, "black", "white")};"></span>
      <span class="palette-text">-51°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="minus51ColorHex" class="hex-text">${minus51Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus51ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus51ColorHsl">hsl(${minus51Hsl.h}, ${minus51Hsl.s}%, ${minus51Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus51ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="minus51ColorRgb">rgb(${minus51Rgb[0]}, ${minus51Rgb[1]}, ${minus51Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('minus51ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${h}, ${s}%, ${l}%); color: ${getBestFontContrast(baseHex, "black", "white")};"></span>
      <span class="palette-text">Main</span>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus51}, ${s}%, ${l}%); color: ${getBestFontContrast(plus51Hex, "black", "white")};"></span>
      <span class="palette-text">+51°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus51ColorHex" class="hex-text">${plus51Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus51ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus51ColorHsl">hsl(${plus51Hsl.h}, ${plus51Hsl.s}%, ${plus51Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus51ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus51ColorRgb">rgb(${plus51Rgb[0]}, ${plus51Rgb[1]}, ${plus51Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus51ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus102}, ${s}%, ${l}%); color: ${getBestFontContrast(plus102Hex, "black", "white")};"></span>
      <span class="palette-text">+102°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus102ColorHex" class="hex-text">${plus102Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus102ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus102ColorHsl">hsl(${plus102Hsl.h}, ${plus102Hsl.s}%, ${plus102Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus102ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus102ColorRgb">rgb(${plus102Rgb[0]}, ${plus102Rgb[1]}, ${plus102Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus102ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
    </span>

    <span class="palette-block">
      <span class="palette-color" style="--color: hsl(${hPlus153}, ${s}%, ${l}%); color: ${getBestFontContrast(plus153Hex, "black", "white")};"></span>
      <span class="palette-text">+153°</span>
      <div class="codes-container">
        <div class="text-row">
          <span id="plus153ColorHex" class="hex-text">${plus153Hex}</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus153ColorHex')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus153ColorHsl">hsl(${plus153Hsl.h}, ${plus153Hsl.s}%, ${plus153Hsl.l}%)</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus153ColorHsl')">${getSvgIcon('copy', 's')}</button>
        </div>
        <div class="text-row">
          <span id="plus153ColorRgb">rgb(${plus153Rgb[0]}, ${plus153Rgb[1]}, ${plus153Rgb[2]})</span>
          <button class="lzr-button lzr-square lzr-flat" onclick="onCopyFieldClick('plus153ColorRgb')">${getSvgIcon('copy', 's')}</button>
        </div>
      </div>
  `;

  return str;
}