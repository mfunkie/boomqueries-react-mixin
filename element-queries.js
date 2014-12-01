(function(window, undefined) {
  'use strict';

  var elementQueryComponents = [];

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function calculateElements() {
    var componentsCounter = elementQueryComponents.length;
    var currentComponent;
    var $elements;

    function calculateElement(element, i) {
      if (element.offsetParent !== null) {
        var componentBreaksCounter = currentComponent.breaks.length,
        currentWidth = element.offsetWidth,
        currentBreak = -1;

        while (componentBreaksCounter--) {
          if(currentWidth > comp.breaks[componentBreaksCounter][0]) {
            currentBreak++;
          }
          element.classList.remove(currentComponent.breaks[componentBreaksCounter][1]);
        }

        if (currentBreak >= 0) {
          element.classList.add(currentComponent.breaks[currentBreak][1]);
        }
      }
    }

    while (componentsCounter--) {
      currentComponent = elementQueryComponents[componentsCounter];
      if (currentComponent.name) {
        $elements = document.querySelectorAll(currentComponent.name);
      } else if (currentComponent.element) {
        $elements = [currentComponent.element];
      }
      Array.prototype.forEach.call($elements, calculateElement);
    }
  }

  window.addEventListener("load",   calculateElements);
  window.addEventListener("resize", debounce(calculateElements, 100), false);

  window.btElementQueries = {
    components: elementQueryComponents,
    calculate: calculateElements
  };
})(window);
