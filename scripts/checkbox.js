function changeCheckbox(keyCode) {
    const spacebarKeyCode = 32;
    const item = document.getElementById("theme_toggler");
    const checked = item.getAttribute("aria-checked");
    const label = item.getAttribute("aria-label");
  
    if (keyCode && keyCode !== spacebarKeyCode) {
      return;
    } else if (checked === "true") {
      item.setAttribute("aria-checked", "false");
      item.setAttribute("aria-label", "Mode clair activé");
    } else {
      item.setAttribute("aria-checked", "true");
      item.setAttribute("aria-label", "Mode sombre activé");
    }
}
  