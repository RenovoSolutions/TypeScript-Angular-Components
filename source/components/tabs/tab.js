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
        transclude: true,
        require: ['^^rlTabset', 'rlTab'],
        template: require('./tab.html'),
        controller: exports.controllerName,
        controllerAs: 'tab',
        scope: {},
        bindToController: {},
        link: function (scope, element, attrs, controllers, transclude) {
            transclude(function (clone) {
                var header = clone.filter('rl-tab-header');
                var content = clone.filter('rl-tab-content');
                var footer = clone.filter('rl-tab-footer');
                var tabset = controllers[0];
                var tab = controllers[1];
                tab.header = {
                    template: header.html(),
                    isValid: true,
                };
                tabset.registerTab(element, tab.header);
                var contentArea = element.find('.content-template');
                contentArea.append(content);
                scope.hasFooter = (footer.length > 0);
                if (scope.hasFooter) {
                    var footerArea = element.find('.footer-template');
                    footerArea.append(footer);
                }
            });
        },
    };
}
exports.tab = tab;
//# sourceMappingURL=tab.js.map