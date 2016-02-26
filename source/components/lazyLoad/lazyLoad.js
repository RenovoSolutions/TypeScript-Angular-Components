'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.lazyLoad';
exports.directiveName = 'rlLazyLoad';
exports.controllerName = 'LazyLoadController';
var LazyLoadController = (function () {
    function LazyLoadController($scope) {
        var _this = this;
        this.init = false;
        var unbind = $scope.$watch(function () { return _this.show; }, function (value) {
            if (value) {
                _this.init = true;
                unbind();
            }
        });
    }
    LazyLoadController.$inject = ['$scope'];
    return LazyLoadController;
}());
exports.LazyLoadController = LazyLoadController;
function lazyLoad() {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: "\n\t\t\t<div ng-if=\"lazyLoad.init\">\n\t\t\t\t<div ng-show=\"lazyLoad.show\">\n\t\t\t\t\t<div ng-transclude></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'lazyLoad',
        scope: {},
        bindToController: {
            show: '=',
        },
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, lazyLoad)
    .controller(exports.controllerName, LazyLoadController);
//# sourceMappingURL=lazyLoad.js.map