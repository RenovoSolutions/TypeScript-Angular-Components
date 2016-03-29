'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.lazyLoad';
exports.componentName = 'rlLazyLoad';
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
var lazyLoad = {
    transclude: true,
    template: "\n\t\t<div ng-if=\"lazyLoad.init\">\n\t\t\t<div ng-show=\"lazyLoad.show\">\n\t\t\t\t<div ng-transclude></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'lazyLoad',
    bindings: {
        show: '=',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, lazyLoad)
    .controller(exports.controllerName, LazyLoadController);
//# sourceMappingURL=lazyLoad.js.map