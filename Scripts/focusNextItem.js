window.onload = function () {
  // Define the function that will focus the next element
  // source: https://stackoverflow.com/questions/7208161/focus-next-element-in-tab-index/10730308

  function focusNextElement() {
    //add all elements we want to include in our selection
    var focussableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text], [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
      var focussable = Array.prototype.filter.call(
        document.activeElement.querySelectorAll(focussableElements),
        function (element) {
          //check for visibility while always include the current activeElement
          return (
            element.offsetWidth > 0 ||
            element.offsetHeight > 0 ||
            element === document.activeElement
          );
        }
      );
      var index = focussable.indexOf(document.activeElement);
      if (index > -1) {
        var nextElement = focussable[index + 1] || focussable[0];
        nextElement.focus();
      }
    }
  }

  //Grab the button element:
  var nel = document.querySelector("#focus-next-el");

  //Tell it what to do to the page when it's clicked:
  nel.addEventListener("click", (event) => {
    event.preventDefault();
    focusNextElement();
  });
};
