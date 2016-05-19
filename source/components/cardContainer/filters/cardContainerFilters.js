// /// <reference path='../../../typings/node/node.d.ts' />
"use strict";
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.filters.cardContainerFilters';
exports.componentName = 'rlCardContainerFilters';
exports.controllerName = 'CardContainerFiltersController';
var CardContainerFiltersController = (function () {
    function CardContainerFiltersController($rootScope) {
        this.$rootScope = $rootScope;
    }
    CardContainerFiltersController.prototype.$onInit = function () {
        var _this = this;
        this.renderableFilters = _(this.filters).filter(function (filter) {
            return filter.template != null;
        }).map(function (filter) {
            var scope = _this.$rootScope.$new();
            scope.filter = filter;
            scope.dataSource = _this.source;
            filter.template = {
                template: filter.template,
                scope: scope,
            };
            return filter;
        }).value();
    };
    CardContainerFiltersController.$inject = ['$rootScope'];
    return CardContainerFiltersController;
}());
exports.CardContainerFiltersController = CardContainerFiltersController;
var cardContainerFilters = {
    template: require('./cardContainerFilters.html'),
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        filters: '<',
        source: '<',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, cardContainerFilters)
    .controller(exports.controllerName, CardContainerFiltersController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckZpbHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkQ29udGFpbmVyRmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7O0FBRTNELElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBTWpCLGtCQUFVLEdBQVcsNkRBQTZELENBQUM7QUFDbkYscUJBQWEsR0FBVyx3QkFBd0IsQ0FBQztBQUNqRCxzQkFBYyxHQUFXLGdDQUFnQyxDQUFDO0FBZ0JyRTtJQU1DLHdDQUFvQixVQUFxQztRQUFyQyxlQUFVLEdBQVYsVUFBVSxDQUEyQjtJQUFJLENBQUM7SUFFOUQsZ0RBQU8sR0FBUDtRQUFBLGlCQWFDO1FBWkEsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBeUI7WUFDekUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQXlCO1lBQ2hDLElBQUksS0FBSyxHQUErQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9ELEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztZQUMvQixNQUFNLENBQUMsUUFBUSxHQUFHO2dCQUNqQixRQUFRLEVBQVUsTUFBTSxDQUFDLFFBQVE7Z0JBQ2pDLEtBQUssRUFBRSxLQUFLO2FBQ1osQ0FBQztZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFoQk0sc0NBQU8sR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBaUIzQyxxQ0FBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksc0NBQThCLGlDQXNCMUMsQ0FBQTtBQUVELElBQUksb0JBQW9CLEdBQThCO0lBQ3JELFFBQVEsRUFBRSxPQUFPLENBQUMsNkJBQTZCLENBQUM7SUFDaEQsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULE9BQU8sRUFBRSxHQUFHO1FBQ1osTUFBTSxFQUFFLEdBQUc7S0FDWDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLG9CQUFvQixDQUFDO0tBQzlDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLDhCQUE4QixDQUFDLENBQUMifQ==