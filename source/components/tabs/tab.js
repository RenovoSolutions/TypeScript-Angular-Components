// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
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
//# sourceMappingURL=tab.js.map