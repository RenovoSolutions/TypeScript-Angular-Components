'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
exports.directiveName = 'rlCardSearch';
exports.controllerName = 'CardSearchController';
exports.defaultSearchPlaceholder = 'Search';
exports.defaultSearchDelay = 1000;
var CardSearchController = (function () {
    function CardSearchController($scope, $timeout) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.searchLengthError = false;
        this.hasSearchFilter = true;
    }
    CardSearchController.prototype.$onInit = function () {
        var _this = this;
        if (this.cardContainer == null) {
            return;
        }
        this.minSearchError = 'You must enter at least {{cardSearch.minSearchLength}} characters to perform a search';
        if (this.searchFilter == null) {
            var filter = this.cardContainer.searchFilter;
            this.searchFilter = filter;
            if (filter == null) {
                this.hasSearchFilter = false;
            }
        }
        if (this.hasSearchFilter) {
            this.searchPlaceholder = exports.defaultSearchPlaceholder;
            var dataSource = this.cardContainer.dataSource;
            var delay = this.delay != null
                ? this.delay
                : exports.defaultSearchDelay;
            var timer;
            this.$scope.$watch(function () { return _this.searchText; }, function (search) {
                _this.searchFilter.searchText = search;
                _this.minSearchLength = _this.searchFilter.minSearchLength;
                _this.validateSearchLength(search, _this.minSearchLength);
                if (timer != null) {
                    _this.$timeout.cancel(timer);
                }
                timer = _this.$timeout(dataSource.refresh.bind(dataSource), delay);
            });
            this.$scope.$watch(function () {
                return _this.searchFilter.searchText;
            }, function () {
                _this.searchText = _this.searchFilter.searchText;
            });
        }
    };
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
        require: { cardContainer: '?^^rlCardContainer' },
        template: require('./cardSearch.html'),
        controller: exports.controllerName,
        controllerAs: 'cardSearch',
        scope: {},
        bindToController: {
            delay: '=searchDelay',
            searchFilter: '=?',
        },
    };
}
exports.cardSearch = cardSearch;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, cardSearch)
    .controller(exports.controllerName, CardSearchController);
//# sourceMappingURL=cardSearch.js.map