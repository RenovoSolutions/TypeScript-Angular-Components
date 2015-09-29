'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChildBehavior = typescript_angular_utilities_1.services.parentChildBehavior;
var __observable = typescript_angular_utilities_1.services.observable;
var __promiseUtility = typescript_angular_utilities_1.services.promise;
var __numberUtility = typescript_angular_utilities_1.services.number;
var jquery_service_1 = require('../../services/jquery/jquery.service');
var grid = require('./responsiveCardGrid');
exports.responsiveCardGrid = grid;
var card = require('./responsiveCard');
exports.responsiveCard = card;
exports.moduleName = 'rl.ui.components.responsiveCardGrid';
angular.module(exports.moduleName, [
    jquery_service_1.moduleName,
    __parentChildBehavior.moduleName,
    __observable.moduleName,
    __promiseUtility.moduleName,
    __numberUtility.moduleName,
])
    .directive(grid.directiveName, grid.responsiveCardGrid)
    .controller(grid.controllerName, grid.ResponsiveCardGridController)
    .directive(card.directiveName, card.responsiveCard)
    .controller(card.controllerName, card.ResponsiveCardController);
//# sourceMappingURL=responsiveCardGrid.module.js.map