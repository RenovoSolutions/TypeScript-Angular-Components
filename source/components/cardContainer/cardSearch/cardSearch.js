'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
exports.directiveName = 'rlCardSearch';
exports.controllerName = 'CardSearchController';
exports.defaultSearchPlaceholder = 'Search';
exports.defaultSearchDelay = 1000;
var CardSearchController = (function () {
    function CardSearchController($scope, $timeout) {
        var _this = this;
        this.searchLengthError = false;
        this.hasSearchFilter = true;
        if (this.builder == null) {
            return;
        }
        if (this.searchFilter == null) {
            var filter = this.builder._searchFilter;
            this.searchFilter = filter;
            if (filter == null) {
                this.hasSearchFilter = false;
            }
        }
        if (this.hasSearchFilter) {
            this.searchPlaceholder = exports.defaultSearchPlaceholder;
            var dataSource = this.builder._dataSource;
            var delay = this.delay != null
                ? this.delay
                : exports.defaultSearchDelay;
            var timer;
            $scope.$watch(function () { return _this.searchText; }, function (search) {
                _this.searchFilter.searchText = search;
                _this.minSearchLength = _this.searchFilter.minSearchLength;
                _this.validateSearchLength(search, _this.minSearchLength);
                if (timer != null) {
                    $timeout.cancel(timer);
                }
                timer = $timeout(dataSource.refresh.bind(dataSource), delay);
            });
        }
    }
    CardSearchController.prototype.validateSearchLength = function (search, minLength) {
        // show error if search string exists but is below minimum size
        this.searchLengthError = search != null
            && search.length > 0
            && search.length < minLength;
    };
    CardSearchController.$inject = ['$scope', '$timeout'];
    return CardSearchController;
})();
exports.CardSearchController = CardSearchController;
function cardSearch() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./cardSearch.html'),
        controller: exports.controllerName,
        controllerAs: 'cardSearch',
        scope: {},
        bindToController: {
            delay: '=searchDelay',
            builder: '=',
            searchFilter: '=?',
        },
    };
}
exports.cardSearch = cardSearch;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, cardSearch)
    .controller(exports.controllerName, CardSearchController);
//# sourceMappingURL=cardSearch.js.map