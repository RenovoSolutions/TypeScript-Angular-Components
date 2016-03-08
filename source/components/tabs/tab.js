// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
exports.directiveName = 'rlTab';
exports.controllerName = 'rlTabController';
var TabController = (function () {
    function TabController($scope) {
        var _this = this;
        $scope.$watch('tabForm.$valid', function (isValid) {
            _this.header.isValid = isValid != null ? isValid : true;
        });
    }
    TabController.$inject = ['$scope'];
    return TabController;
}());
exports.TabController = TabController;
function tab() {
    return {
        restrict: 'E',
        transclude: {
            'headerSlot': '?rlTabHeader',
            'contentSlot': '?rlTabContent',
            'footerSlot': '?rlTabFooter',
        },
        require: ['^^rlTabset', 'rlTab'],
        template: require('./tab.html'),
        controller: exports.controllerName,
        controllerAs: 'tab',
        scope: {},
        bindToController: {},
        link: function (scope, element, attrs, controllers, transclude) {
            transclude(function (header) {
                var tabset = controllers[0];
                var tab = controllers[1];
                tab.header = {
                    template: header.html(),
                    isValid: true,
                };
                tabset.registerTab(element, tab.header);
            }, null, 'headerSlot');
        },
    };
}
exports.tab = tab;
//# sourceMappingURL=tab.js.map