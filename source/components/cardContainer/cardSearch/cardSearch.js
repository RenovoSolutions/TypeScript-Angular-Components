'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
exports.componentName = 'rlCardSearch';
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
            var dataSource_1 = this.cardContainer.dataSource;
            var delay_1 = this.delay != null
                ? this.delay
                : exports.defaultSearchDelay;
            var timer_1;
            this.$scope.$watch(function () { return _this.searchText; }, function (search) {
                _this.searchFilter.searchText = search;
                _this.minSearchLength = _this.searchFilter.minSearchLength;
                _this.validateSearchLength(search, _this.minSearchLength);
                if (timer_1 != null) {
                    _this.$timeout.cancel(timer_1);
                }
                timer_1 = _this.$timeout(dataSource_1.refresh.bind(dataSource_1), delay_1);
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
}());
exports.CardSearchController = CardSearchController;
var cardSearch = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./cardSearch.html'),
    controller: exports.controllerName,
    controllerAs: 'cardSearch',
    bindings: {
        delay: '<?searchDelay',
        searchFilter: '<?',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, cardSearch)
    .controller(exports.controllerName, CardSearchController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZFNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRTZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFReEIsa0JBQVUsR0FBVywyQ0FBMkMsQ0FBQztBQUNqRSxxQkFBYSxHQUFXLGNBQWMsQ0FBQztBQUN2QyxzQkFBYyxHQUFXLHNCQUFzQixDQUFDO0FBRWhELGdDQUF3QixHQUFXLFFBQVEsQ0FBQztBQUM1QywwQkFBa0IsR0FBVyxJQUFJLENBQUM7QUFNN0M7SUFjQyw4QkFBb0IsTUFBc0IsRUFDOUIsUUFBaUM7UUFEekIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFUN0Msc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRW5DLG9CQUFlLEdBQVksSUFBSSxDQUFDO0lBT2dCLENBQUM7SUFFakQsc0NBQU8sR0FBUDtRQUFBLGlCQTZDQztRQTVDQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsdUZBQXVGLENBQUM7UUFFOUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksTUFBTSxHQUErQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUN6RixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFD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