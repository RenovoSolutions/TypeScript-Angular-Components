"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJVyxxQkFBYSxHQUFXLE9BQU8sQ0FBQztBQUNoQyxzQkFBYyxHQUFXLGlCQUFpQixDQUFDO0FBTXREO0lBTUMsdUJBQVksTUFBaUIsRUFDakIsUUFBNkIsRUFDN0IsV0FBbUM7UUFSaEQsaUJBdUJDO1FBaEJZLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBQzdCLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsT0FBZ0I7WUFDaEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFBQSxpQkFRQztRQVBBLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBQyxNQUFjO1lBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxJQUFJO2FBQ2IsQ0FBQztZQUNGLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQWpCTSxxQkFBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQWtCbEUsb0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLHFCQUFhLGdCQXVCekIsQ0FBQTtBQUVVLFdBQUcsR0FBeUI7SUFDdEMsVUFBVSxFQUFPO1FBQ2hCLFlBQVksRUFBRSxjQUFjO1FBQzVCLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFlBQVksRUFBRSxjQUFjO0tBQzVCO0lBQ0QsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRTtJQUNqQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUMvQixVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyJ9