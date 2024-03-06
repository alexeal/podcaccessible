/**
 * Script to switch light/dark mode
 */

let theme_toggler = document.querySelector("#theme_toggler");
const item = document.getElementById("theme_toggler");
const checked = item.getAttribute("aria-checked");
const label = item.getAttribute("aria-label");
const darkModeLabel = "dark_mode";
const defaultLabel = "default";
const spacebarKeyCode = 32;

/**
 * Listen event for the switch button
 */
theme_toggler.addEventListener("click", function () {
  document.body.classList.toggle(darkModeLabel);
  if (document.body.classList.contains(darkModeLabel)) {
    localStorage.setItem("website_theme", darkModeLabel);
    switchCheckboxAttributes(darkModeLabel);
  } else {
    localStorage.setItem("website_theme", defaultLabel);
    switchCheckboxAttributes(defaultLabel);
  }
});

/**
 * Retrieves theme from localStorage
 */
function retrieve_theme() {
  var theme = localStorage.getItem("website_theme");
  if (theme !== null) {
    document.body.classList.remove(defaultLabel, darkModeLabel);
    document.body.classList.add(theme);
    switchCheckboxAttributes(theme);
  }
}

/**
 * Change checkbox onclick or with space key
 * @param {*} keyCode to check keycode
 */
function changeCheckbox(keyCode) {
  if (keyCode && keyCode !== spacebarKeyCode) {
    return;
  } else if (checked === "true") {
    switchCheckboxAttributes(darkModeLabel);
  } else {
    switchCheckboxAttributes(defaultLabel);
  }
}

/**
 * Update checkbock aria attributes
 * @param {*} theme dark_mode or default
 */
function switchCheckboxAttributes(theme) {
  if (theme === "dark_mode") {
    document.getElementById("theme_toggler").checked = true;
    item.setAttribute("aria-checked", "true");
    item.setAttribute("aria-label", "Mode sombre activé");
  } else {
    document.getElementById("theme_toggler").checked = false;
    item.setAttribute("aria-checked", "false");
    item.setAttribute("aria-label", "Mode clair activé");
  }
}

retrieve_theme();

window.addEventListener(
  "storage",
  function () {
    retrieve_theme();
  },
  false
);
