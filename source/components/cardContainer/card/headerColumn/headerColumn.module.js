'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var headerColumn_1 = require('./headerColumn');
var sizeForBreakpoints_1 = require('./sizeForBreakpoints');
exports.moduleName = 'rl.ui.components.cardContainer.card.headerColumn';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.services.string.moduleName,
])
    .directive(sizeForBreakpoints_1.sizeForBreakpointsName, sizeForBreakpoints_1.sizeForBreakpoints)
    .directive(headerColumn_1.directiveName, headerColumn_1.headerColumn)
    .controller(headerColumn_1.controllerName, headerColumn_1.HeaderColumnController);
//# sourceMappingURL=headerColumn.module.js.map