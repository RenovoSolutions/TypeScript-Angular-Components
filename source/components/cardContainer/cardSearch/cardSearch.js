'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __genericSearchFilter = typescript_angular_utilities_1.services.genericSearchFilter;
exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
exports.directiveName = 'rlCardSearch';
exports.controllerName = 'CardSearchController';
exports.defaultSearchPlaceholder = 'Search';
exports.defaultSearchDelay = 1000;
var CardSearchController = (function () {
    function CardSearchController($scope, $timeout, $element) {
        var _this = this;
        this.hasSearchFilter = true;
        this.cardContainerController = $element.controller('rlCardContainer');
        this.searchFilter = this.cardContainerController.lookupFilter(__genericSearchFilter.filterName);
        if (this.searchFilter == null) {
            this.hasSearchFilter = false;
        }
        else {
            this.searchPlaceholder = exports.defaultSearchPlaceholder;
            var dataSource = this.cardContainerController.dataSource;
            var delay = this.delay != null
                ? this.delay
                : exports.defaultSearchDelay;
            var timer;
            $scope.$watch(function () { return _this.searchText; }, function (search) {
                _this.searchFilter.searchText = search;
                if (timer != null) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(dataSource.refresh, delay);
            });
        }
    }
    CardSearchController.$inject = ['$scope', '$timeout', '$element'];
    return CardSearchController;
})();
exports.CardSearchController = CardSearchController;
function cardSearch() {
    'use strict';
    return {
        restrict: 'E',
        require: '^^rlCardContainer',
        template: "\n<div class=\"input-group\" ng-show=\"cardSearch.hasSearchFilter\">\n\t<input class=\"form-control\" type=\"text\" placeholder=\"{{cardSearch.searchPlaceholder}}\" ng-model=\"cardSearch.searchText\" />\n\t<div class=\"input-group-btn\">\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-disabled=\"cardSearch.searchText | isEmpty\" ng-click=\"cardSearch.searchText = null\">\n\t\t\t<i class=\"fa fa-times\"></i>\n\t\t</button>\n\t</div>\n</div>",
        controller: exports.controllerName,
        controllerAs: 'cardSearch',
        scope: {},
        bindToController: {
            delay: '=searchDelay',
        },
    };
}
exports.cardSearch = cardSearch;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, cardSearch)
    .controller(exports.controllerName, CardSearchController);
//# sourceMappingURL=cardSearch.js.map