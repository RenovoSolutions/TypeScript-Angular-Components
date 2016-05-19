"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var parentChild_service_1 = require('../../services/parentChild/parentChild.service');
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
    typescript_angular_utilities_1.downgrade.moduleName,
    parentChild_service_1.moduleName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkQ29udGFpbmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQTBCLDhCQUE4QixDQUFDLENBQUE7QUFFekQsb0NBQWdELGdEQUFnRCxDQUFDLENBQUE7QUFFakcsSUFBWSxJQUFJLFdBQU0sYUFBYSxDQUFDLENBQUE7QUFpQm5DLFlBQUk7QUFoQkwsSUFBWSxVQUFVLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQWlCckQsa0JBQVU7QUFoQlgsSUFBWSxZQUFZLFdBQU0sNkJBQTZCLENBQUMsQ0FBQTtBQWlCM0Qsb0JBQVk7QUFoQmIsSUFBWSxXQUFXLFdBQU0sa0NBQWtDLENBQUMsQ0FBQTtBQWlCL0QsbUJBQVc7QUFoQlosSUFBWSxPQUFPLFdBQU0sMEJBQTBCLENBQUMsQ0FBQTtBQWlCbkQsZUFBTztBQWhCUixJQUFZLFNBQVMsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBaUJsRCxpQkFBUztBQWhCVixJQUFZLEtBQUssV0FBTSxlQUFlLENBQUMsQ0FBQTtBQWlCdEMsYUFBSztBQWhCTixJQUFZLFFBQVEsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBaUIvQyxnQkFBUTtBQWhCVCxJQUFZLGdCQUFnQixXQUFNLHFDQUFxQyxDQUFDLENBQUE7QUFpQnZFLHdCQUFnQjtBQWhCakIsSUFBWSxLQUFLLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQWlCN0MsYUFBSztBQWZOLDhCQUFzRixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hHLElBQVksT0FBTyxXQUFNLGdDQUFnQyxDQUFDLENBQUE7QUFJekQsZUFBTztBQUhSLGtDQUF5RyxxQkFBcUIsQ0FBQyxDQUFBO0FBZ0IvSCxpQkFBYyxpQkFBaUIsQ0FBQyxFQUFBO0FBR3JCLGtCQUFVLEdBQVcsZ0NBQWdDLENBQUM7QUFFakUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLGVBQWU7SUFDZixXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVU7SUFDaEMsd0NBQVMsQ0FBQyxVQUFVO0lBQ3BCLGdDQUFpQjtJQUVqQixhQUFhO0lBQ2IsSUFBSSxDQUFDLFVBQVU7SUFDZixVQUFVLENBQUMsVUFBVTtJQUNyQixZQUFZLENBQUMsVUFBVTtJQUN2QixTQUFTLENBQUMsVUFBVTtJQUNwQixLQUFLLENBQUMsVUFBVTtJQUNoQixRQUFRLENBQUMsVUFBVTtJQUNuQixnQkFBZ0IsQ0FBQyxVQUFVO0lBRTNCLGFBQWE7SUFDYixXQUFXLENBQUMsVUFBVTtJQUN0QixPQUFPLENBQUMsVUFBVTtJQUNsQixLQUFLLENBQUMsVUFBVTtDQUNoQixDQUFDO0tBQ0EsU0FBUyxDQUFDLDZCQUFhLEVBQUUsNkJBQWEsQ0FBQztLQUN2QyxVQUFVLENBQUMsOEJBQWMsRUFBRSx1Q0FBdUIsQ0FBQztLQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsMkJBQTJCLENBQUM7S0FDakUsU0FBUyxDQUFDLHVDQUFtQixFQUFFLDBDQUFzQixDQUFDO0tBQ3RELFNBQVMsQ0FBQyx1Q0FBbUIsRUFBRSwwQ0FBc0IsQ0FBQyxDQUFDIn0=