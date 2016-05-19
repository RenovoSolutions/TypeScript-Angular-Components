"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZFNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRTZWFyY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBUXhCLGtCQUFVLEdBQVcsMkNBQTJDLENBQUM7QUFDakUscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztBQUVoRCxnQ0FBd0IsR0FBVyxRQUFRLENBQUM7QUFDNUMsMEJBQWtCLEdBQVcsSUFBSSxDQUFDO0FBTTdDO0lBa0NDLDhCQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQTdCckQsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBRW5DLG9CQUFlLEdBQVksSUFBSSxDQUFDO0lBMkJ3QixDQUFDO0lBcEJ6RCxzQkFBSSw0Q0FBVTthQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZO2tCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7a0JBQzVCLElBQUksQ0FBQztRQUNULENBQUM7YUFFRCxVQUFlLE1BQWM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7WUFFekQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pILENBQUM7OztPQWJBO0lBa0JELHNDQUFPLEdBQVA7UUFBQSxpQkEyQkM7UUExQkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLHVGQUF1RixDQUFDO1FBRTlHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLE1BQU0sR0FBK0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDekYsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdDQUF3QixDQUFDO1lBRWxELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO2tCQUM1QixJQUFJLENBQUMsS0FBSztrQkFDViwwQkFBa0IsQ0FBQztZQUV0QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7SUFDRixDQUFDO0lBRU8sbURBQW9CLEdBQTVCLFVBQTZCLE1BQWMsRUFBRSxTQUFpQjtRQUM3RCwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxJQUFJO2VBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztlQUNqQixNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUNwQyxDQUFDO0lBckNNLDRCQUFPLEdBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQXNDekMsMkJBQUM7QUFBRCxDQUFDLEFBdkVELElBdUVDO0FBdkVZLDRCQUFvQix1QkF1RWhDLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBOEI7SUFDM0MsT0FBTyxFQUFFLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFO0lBQ2hELFFBQVEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUM7SUFDdEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULEtBQUssRUFBRSxlQUFlO1FBQ3RCLFlBQVksRUFBRSxJQUFJO0tBQ2xCO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsVUFBVSxDQUFDO0tBQ3BDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLG9CQUFvQixDQUFDLENBQUMifQ==