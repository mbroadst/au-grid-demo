/* */ 
define(['exports', './grid', './column'], function (exports, _grid, _column) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Column = exports.Grid = undefined;
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.globalResources('./grid', './column');
  }

  exports.Grid = _grid.Grid;
  exports.Column = _column.Column;
});