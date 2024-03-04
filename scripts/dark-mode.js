/**
 * Script to switch light/dark mode
 */

let theme_toggler = document.querySelector("#theme_toggler");
const item = document.getElementById("theme_toggler");
const checked = item.getAttribute("aria-checked");
const label = item.getAttribute("aria-label");
const darkModeLabel = "dark_mode";
const defaultLabel =  "default";

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
  console.log(theme);
  if (theme != null) {
    document.body.classList.remove(defaultLabel, darkModeLabel);
    document.body.classList.add(theme);
  }
  switchCheckboxAttributes(theme);
}

/**
 * Update checkbock aria attributes
 * @param {*} theme dark_mode or default
 */
function switchCheckboxAttributes(theme) {
  if (theme === "dark_mode") {
    item.setAttribute("aria-checked", "true");
    item.setAttribute("aria-label", "Mode sombre activé");
  } else {
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
