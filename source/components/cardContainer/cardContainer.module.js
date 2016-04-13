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
var defaultComponents_1 = require('./defaultComponents');
__export(require('./cardContainer'));
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
    .component(cardContainer_1.componentName, cardContainer_1.cardContainer)
    .controller(cardContainer_1.controllerName, cardContainer_1.CardContainerController)
    .factory(builder.factoryName, builder.cardContainerBuilderFactory)
    .component(defaultComponents_1.headerComponentName, defaultComponents_1.defaultContainerHeader)
    .component(defaultComponents_1.footerComponentName, defaultComponents_1.defaultContainerFooter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkQ29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBQ3BELElBQU8scUJBQXFCLEdBQUcsdUNBQVEsQ0FBQyxtQkFBbUIsQ0FBQztBQUU1RCxJQUFZLElBQUksV0FBTSxhQUFhLENBQUMsQ0FBQTtBQWlCbkMsWUFBSTtBQWhCTCxJQUFZLFVBQVUsV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBaUJyRCxrQkFBVTtBQWhCWCxJQUFZLFlBQVksV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBaUIzRCxvQkFBWTtBQWhCYixJQUFZLFdBQVcsV0FBTSxrQ0FBa0MsQ0FBQyxDQUFBO0FBaUIvRCxtQkFBVztBQWhCWixJQUFZLE9BQU8sV0FBTSwwQkFBMEIsQ0FBQyxDQUFBO0FBaUJuRCxlQUFPO0FBaEJSLElBQVksU0FBUyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFpQmxELGlCQUFTO0FBaEJWLElBQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBaUJ0QyxhQUFLO0FBaEJOLElBQVksUUFBUSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFpQi9DLGdCQUFRO0FBaEJULElBQVksZ0JBQWdCLFdBQU0scUNBQXFDLENBQUMsQ0FBQTtBQWlCdkUsd0JBQWdCO0FBaEJqQixJQUFZLEtBQUssV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBaUI3QyxhQUFLO0FBZk4sOEJBQXNGLGlCQUFpQixDQUFDLENBQUE7QUFDeEcsSUFBWSxPQUFPLFdBQU0sZ0NBQWdDLENBQUMsQ0FBQTtBQUl6RCxlQUFPO0FBSFIsa0NBQXlHLHFCQUFxQixDQUFDLENBQUE7QUFnQi9ILGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFHckIsa0JBQVUsR0FBVyxnQ0FBZ0MsQ0FBQztBQUVqRSxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUU7SUFDMUIsZUFBZTtJQUNmLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVTtJQUNoQyxRQUFRLENBQUMsVUFBVTtJQUNuQixPQUFPLENBQUMsVUFBVTtJQUNsQixhQUFhLENBQUMsVUFBVTtJQUN4QixxQkFBcUIsQ0FBQyxVQUFVO0lBRWhDLGFBQWE7SUFDYixJQUFJLENBQUMsVUFBVTtJQUNmLFVBQVUsQ0FBQyxVQUFVO0lBQ3JCLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLFNBQVMsQ0FBQyxVQUFVO0lBQ3BCLEtBQUssQ0FBQyxVQUFVO0lBQ2hCLFFBQVEsQ0FBQyxVQUFVO0lBQ25CLGdCQUFnQixDQUFDLFVBQVU7SUFFM0IsYUFBYTtJQUNiLFdBQVcsQ0FBQyxVQUFVO0lBQ3RCLE9BQU8sQ0FBQyxVQUFVO0lBQ2xCLEtBQUssQ0FBQyxVQUFVO0NBQ2hCLENBQUM7S0FDQSxTQUFTLENBQUMsNkJBQWEsRUFBRSw2QkFBYSxDQUFDO0tBQ3ZDLFVBQVUsQ0FBQyw4QkFBYyxFQUFFLHVDQUF1QixDQUFDO0tBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztLQUNqRSxTQUFTLENBQUMsdUNBQW1CLEVBQUUsMENBQXNCLENBQUM7S0FDdEQsU0FBUyxDQUFDLHVDQUFtQixFQUFFLDBDQUFzQixDQUFDLENBQUMifQ==