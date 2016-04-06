"use strict";
var angular = require('angular');
var date = require('./date/date.filter');
exports.date = date;
exports.moduleName = 'rl.ui.filters';
angular.module(exports.moduleName, [
    date.moduleName,
]);
//# sourceMappingURL=filters.module.js.map