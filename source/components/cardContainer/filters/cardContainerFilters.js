// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckZpbHRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXJkQ29udGFpbmVyRmlsdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFFM0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFNakIsa0JBQVUsR0FBVyw2REFBNkQsQ0FBQztBQUNuRixxQkFBYSxHQUFXLHdCQUF3QixDQUFDO0FBQ2pELHNCQUFjLEdBQVcsZ0NBQWdDLENBQUM7QUFnQnJFO0lBTUMsd0NBQW9CLFVBQXFDO1FBQXJDLGVBQVUsR0FBVixVQUFVLENBQTJCO0lBQUksQ0FBQztJQUU5RCxnREFBTyxHQUFQO1FBQUEsaUJBYUM7UUFaQSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUF5QjtZQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBeUI7WUFDaEMsSUFBSSxLQUFLLEdBQStCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0QsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBVSxNQUFNLENBQUMsUUFBUTtnQkFDakMsS0FBSyxFQUFFLEtBQUs7YUFDWixDQUFDO1lBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQWhCTSxzQ0FBTyxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFpQjNDLHFDQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQXRCWSxzQ0FBOEIsaUNBc0IxQyxDQUFBO0FBRUQsSUFBSSxvQkFBb0IsR0FBOEI7SUFDckQsUUFBUSxFQUFFLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQztJQUNoRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFlBQVk7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztLQUNYO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsb0JBQW9CLENBQUM7S0FDOUMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsOEJBQThCLENBQUMsQ0FBQyJ9