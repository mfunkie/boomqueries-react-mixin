'use strict';

var boomQueries = require('boomqueries');

var BoomQueriesReactMixin = function(breakPoints) {
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

      component.addEventListener('nodeUpdated', this._componentUpdated.bind(this));

      boomQueries.refresh();
    },

    componentWillUnmount: function() {
      var component = this.getDOMNode();
      component.removeEventListener('nodeUpdated');
      boomQueries.remove(component);
    }
  };
};

module.exports = BoomQueriesReactMixin;
