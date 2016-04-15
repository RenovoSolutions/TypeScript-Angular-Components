'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
exports.componentName = 'rlCardSearch';
exports.controllerName = 'CardSearchController';
exports.defaultSearchPlaceholder = 'Search';
exports.defaultSearchDelay = 1000;
var CardSearchController = (function () {
    function CardSearchController($timeout) {
        this.$timeout = $timeout;
        this.searchLengthError = false;
        this.hasSearchFilter = true;
    }
    Object.defineProperty(CardSearchController.prototype, "searchText", {
        get: function () {
            return this.searchFilter
                ? this.searchFilter.searchText
                : null;
        },
        set: function (search) {
            this.searchFilter.searchText = search;
            this.minSearchLength = this.searchFilter.minSearchLength;
            this.validateSearchLength(search, this.minSearchLength);
            if (this.timer != null) {
                this.$timeout.cancel(this.timer);
            }
            this.timer = this.$timeout(this.cardContainer.dataSource.refresh.bind(this.cardContainer.dataSource), this.delay);
        },
        enumerable: true,
        configurable: true
    });
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
            this.delay = this.delay != null
                ? this.delay
                : exports.defaultSearchDelay;
            this.searchFilter.subscribe(function () {
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
    CardSearchController.$inject = ['$timeout'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZFNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRTZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFReEIsa0JBQVUsR0FBVywyQ0FBMkMsQ0FBQztBQUNqRSxxQkFBYSxHQUFXLGNBQWMsQ0FBQztBQUN2QyxzQkFBYyxHQUFXLHNCQUFzQixDQUFDO0FBRWhELGdDQUF3QixHQUFXLFFBQVEsQ0FBQztBQUM1QywwQkFBa0IsR0FBVyxJQUFJLENBQUM7QUFNN0M7SUFrQ0MsOEJBQW9CLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBN0JyRCxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsb0JBQWUsR0FBWSxJQUFJLENBQUM7SUEyQndCLENBQUM7SUFwQnpELHNCQUFJLDRDQUFVO2FBQWQ7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVk7a0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTtrQkFDNUIsSUFBSSxDQUFDO1FBQ1QsQ0FBQzthQUVELFVBQWUsTUFBYztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztZQUV6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekgsQ0FBQzs7O09BYkE7SUFrQkQsc0NBQU8sR0FBUDtRQUFBLGlCQTJCQztRQTFCQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsdUZBQXVGLENBQUM7UUFFOUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksTUFBTSxHQUErQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUN6RixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDOUIsQ0FBQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0NBQXdCLENBQUM7WUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7a0JBQzVCLElBQUksQ0FBQyxLQUFLO2tCQUNWLDBCQUFrQixDQUFDO1lBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO2dCQUMzQixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNGLENBQUM7SUFFTyxtREFBb0IsR0FBNUIsVUFBNkIsTUFBYyxFQUFFLFNBQWlCO1FBQzdELCtEQUErRDtRQUMvRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxJQUFJLElBQUk7ZUFDOUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDO2VBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFyQ00sNEJBQU8sR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBc0N6QywyQkFBQztBQUFELENBQUMsQUF2RUQsSUF1RUM7QUF2RVksNEJBQW9CLHVCQXVFaEMsQ0FBQTtBQUVELElBQUksVUFBVSxHQUE4QjtJQUMzQyxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUU7SUFDaEQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztJQUN0QyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFlBQVk7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsS0FBSyxFQUFFLGVBQWU7UUFDdEIsWUFBWSxFQUFFLElBQUk7S0FDbEI7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxVQUFVLENBQUM7S0FDcEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9