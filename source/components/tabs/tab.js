// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('./tab.css');
exports.componentName = 'rlTab';
exports.controllerName = 'rlTabController';
var TabController = (function () {
    function TabController($scope, $element, $transclude) {
        var _this = this;
        this.$element = $element;
        this.$transclude = $transclude;
        $scope.$watch('tabForm.$valid', function (isValid) {
            _this.header.isValid = isValid != null ? isValid : true;
        });
    }
    TabController.prototype.$postLink = function () {
        var _this = this;
        this.$transclude(function (header) {
            _this.header = {
                template: header.html(),
                isValid: true,
            };
            _this.tabset.registerTab(_this.$element, _this.header);
        }, null, 'headerSlot');
    };
    TabController.$inject = ['$scope', '$element', '$transclude'];
    return TabController;
}());
exports.TabController = TabController;
exports.tab = {
    transclude: {
        'headerSlot': '?rlTabHeader',
        'contentSlot': '?rlTabContent',
        'footerSlot': '?rlTabFooter',
    },
    require: { tabset: '^^rlTabset' },
    template: require('./tab.html'),
    controller: exports.controllerName,
    controllerAs: 'tab',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixRQUFPLFdBQVcsQ0FBQyxDQUFBO0FBTVIscUJBQWEsR0FBVyxPQUFPLENBQUM7QUFDaEMsc0JBQWMsR0FBVyxpQkFBaUIsQ0FBQztBQU10RDtJQU1DLHVCQUFZLE1BQWlCLEVBQ2pCLFFBQTZCLEVBQzdCLFdBQW1DO1FBUmhELGlCQXVCQztRQWhCWSxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBd0I7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLE9BQWdCO1lBQ2hELEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBUUM7UUFQQSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQUMsTUFBYztZQUMvQixLQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNiLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN2QixPQUFPLEVBQUUsSUFBSTthQUNiLENBQUM7WUFDRixLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFqQk0scUJBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFrQmxFLG9CQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxxQkFBYSxnQkF1QnpCLENBQUE7QUFFVSxXQUFHLEdBQXlCO0lBQ3RDLFVBQVUsRUFBTztRQUNoQixZQUFZLEVBQUUsY0FBYztRQUM1QixhQUFhLEVBQUUsZUFBZTtRQUM5QixZQUFZLEVBQUUsY0FBYztLQUM1QjtJQUNELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBQyxZQUFZLEVBQUU7SUFDaEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUM7SUFDL0IsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxLQUFLO0NBQ25CLENBQUMifQ==