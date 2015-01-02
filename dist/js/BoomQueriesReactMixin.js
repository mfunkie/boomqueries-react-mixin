/*! BoomQueries React Mixin 0.0.6 | http://mfunkie.github.io/boomqueries-react/ | (c) 2014 BoomTown | MIT License */
'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['boomQueries'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('boomqueries'));
  } else {
    // Browser globals (root is window)
    root.boomQueriesReactMixin = factory(root.boomQueries);
  }
}(this, function(boomQueries) {

  return function(breakPoints) {
    breakPoints = breakPoints || [];

    function buildDefaultBreakPoints() {
      return breakPoints.reduce(function(points, point) {
        points[point.name] = false;
        return points;
      }, {});
    }
    var stateBreakPoints = buildDefaultBreakPoints();

    var pointMap = breakPoints.reduce(function(points, point) {
      points[point.breakpoint] = point.name;
      return points;
    });

    return {

      getInitialState: function() {
        return {
          breakpoints: stateBreakPoints
        };
      },

      _componentUpdated: function(event) {
        var breakPoint = event.currentBreak;

        var newBreakPoints = buildDefaultBreakPoints();

        newBreakPoints[pointMap[breakPoint]] = true;
        this.setState({
          breakpoints: newBreakPoints
        });
      },

      componentDidMount: function() {
        var component = this.getDOMNode();
        var breakPointList = Object.keys(pointMap).map(function(breakPoint) {
          return [breakPoint, ''];
        });
        boomQueries.add(component, breakPointList);

        component.addEventListener('nodeUpdated', this._componentUpdated);

        boomQueries.refresh();
      },

      componentWillUnmount: function() {
        var component = this.getDOMNode();
        component.removeEventListener('nodeUpdated');
        boomQueries.remove(component);
      }
    };
  };
}));
