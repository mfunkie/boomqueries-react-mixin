/*! BoomQueries 0.0.3 | http://boomtownroi.github.io/boomqueries/ | (c) 2014 BoomTown | MIT License */
(function (global, boomQueries) {
  if(typeof define === 'function' && define.amd) {
    define(['boomQueries'], boomQueries);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = boomQueries();
  } else {
    window.boomQueries = boomQueries();
  }
}(window, function() {
  'use strict';

  function boomQuery() {
    this.nodes = [];
    window.addEventListener('resize', this.debounce(this, this.update, 100), false);
  }

  boomQuery.prototype.debounce = function(context, func, wait, immediate) {
    var timeout;
    return function() {
      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  boomQuery.prototype.update = function(options) {
    var details = {};
    if ( typeof options !== 'undefined' ) details["detail"] = options;
    var myEvent = new CustomEvent("checkyourself", details);
    this.nodes.forEach(function(node) {
      node.dispatchEvent(myEvent);
    });
  };

  boomQuery.prototype.add = function (selector, breakPoints) {
    var nodes = document.querySelectorAll(selector),
        self = this;
    Array.prototype.forEach.call(nodes, function(node) {
      node.breaks = breakPoints;
      node.selector = selector;
      node.addEventListener("checkyourself", function() {
        if ( this.offsetParent !== null ) {
          var componentBreaksCounter = this.breaks.length,
              currentWidth = this.offsetWidth,
              currentBreak = -1;

          while ( componentBreaksCounter-- ) {
            if ( currentWidth >= this.breaks[componentBreaksCounter][0] ) {
              currentBreak++;
            }
            this.classList.remove(this.breaks[componentBreaksCounter][1]);
          }

          if ( currentBreak >= 0 ) {
            this.classList.add(this.breaks[currentBreak][1]);
          }
        }
      });
      self.nodes.push(node);
    });
    this.update();
  };

  boomQuery.prototype.remove = function(selector) {
    for ( var i = this.nodes.length; i--; ) {
      if ( this.nodes[i].selector === selector ) {
        this.nodes.splice(i, 1);
      }
    }
  };

  boomQuery.prototype.inspect = function(key) {
    if ( typeof console !== "undefined" ) console.log(this.nodes);
  };

  return new boomQuery();

}));