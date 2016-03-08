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
//# sourceMappingURL=cardContainerFilters.js.map