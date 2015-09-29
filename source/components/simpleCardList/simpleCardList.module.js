'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var card = require('./simpleCard');
exports.simpleCard = card;
var list = require('./simpleCardList');
exports.simpleCardList = list;
exports.moduleName = 'rl.ui.components.simpleCardList';
angular.module(exports.moduleName, [__observable.moduleName, __parentChild.moduleName])
    .directive(list.directiveName, list.simpleCardList)
    .controller(list.controllerName, list.SimpleCardListController)
    .directive(card.directiveName, card.simpleCard)
    .controller(card.controllerName, card.SimpleCardController);
//# sourceMappingURL=simpleCardList.module.js.map