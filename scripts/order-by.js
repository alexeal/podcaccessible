function init(selector) {
  var elements = document.querySelectorAll(selector);

  var dividers = document.querySelectorAll('.divider');
  dividers.forEach((item) => item.remove());

  var hrElement = document.createElement('hr');
  hrElement.classList.add('divider');

  Array.prototype.slice
    .call(elements)
    .sort(byTitle)
    .forEach(function (div) {
      div.parentElement.appendChild(div);

      var hrElement = document.createElement('hr');
      hrElement.classList.add('divider');
      div.parentElement.appendChild(hrElement);
    });
}

function byTitle(first, second) {
  var order = 0;
  var first = first.querySelector('h2').textContent.trim();
  var second = second.querySelector('h2').textContent.trim();

  first > second ? (order = 1) : (order = -1);

  return order;
}
