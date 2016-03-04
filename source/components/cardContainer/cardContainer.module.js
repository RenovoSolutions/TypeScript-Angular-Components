'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __array = typescript_angular_utilities_1.services.array;
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __genericSearchFilter = typescript_angular_utilities_1.services.genericSearchFilter;
var card = require('./card/card');
exports.card = card;
var cardSearch = require('./cardSearch/cardSearch');
exports.cardSearch = cardSearch;
var columnHeader = require('./columnHeader/columnHeader');
exports.columnHeader = columnHeader;
var dataSources = require('./dataSources/dataSources.module');
exports.dataSources = dataSources;
var filters = require('./filters/filters.module');
exports.filters = filters;
var itemCount = require('./itemCount/itemCount');
exports.itemCount = itemCount;
var pager = require('./pager/pager');
exports.pager = pager;
var pageSize = require('./pageSize/pageSize');
exports.pageSize = pageSize;
var selectionControl = require('./selectionControl/selectionControl');
exports.selectionControl = selectionControl;
var sorts = require('./sorts/sorts.module');
exports.sorts = sorts;
var cardContainer_1 = require('./cardContainer');
var builder = require('./cardContainerBuilder.service');
exports.builder = builder;
__export(require('./cardContainer'));
__export(require('./column'));
exports.moduleName = 'rl.ui.components.cardContainer';
angular.module(exports.moduleName, [
    // dependencies
    dataSources.dataPager.moduleName,
    __object.moduleName,
    __array.moduleName,
    __parentChild.moduleName,
    __genericSearchFilter.moduleName,
    // components
    card.moduleName,
    cardSearch.moduleName,
    columnHeader.moduleName,
    itemCount.moduleName,
    pager.moduleName,
    pageSize.moduleName,
    selectionControl.moduleName,
    // submodules
    dataSources.moduleName,
    filters.moduleName,
    sorts.moduleName,
])
    .directive(cardContainer_1.directiveName, cardContainer_1.cardContainer)
    .controller(cardContainer_1.controllerName, cardContainer_1.CardContainerController)
    .factory(builder.factoryName, builder.cardContainerBuilderFactory);
//# sourceMappingURL=cardContainer.module.js.map