'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __boolean = typescript_angular_utilities_1.services.boolean;
exports.moduleName = 'rl.ui.components.buttonToggle';
exports.directiveName = 'rlButtonToggle';
exports.controllerName = 'ButtonToggleController';
var ButtonToggleController = (function () {
    function ButtonToggleController($scope, bool) {
        var _this = this;
        this.$scope = $scope;
        this.buttonClass = $scope.type != null ? $scope.type : 'default';
        this.buttonSize = $scope.size != null ? 'btn-' + $scope.size : null;
        $scope.$watch('ngModel.$modelValue', function (value) {
            _this.isActive = bool.toBool(value);
            if (value != null && _.isFunction($scope.onToggle)) {
                $scope.onToggle({ value: value });
            }
        });
    }
    ButtonToggleController.prototype.clicked = function () {
        this.$scope.ngModel.$setViewValue(!this.$scope.ngModel.$viewValue);
    };
    ButtonToggleController.$inject = ['$scope', __boolean.serviceName];
    return ButtonToggleController;
})();
function buttonToggle() {
    'use strict';
    return {
        restrict: 'E',
        require: '^ngModel',
        transclude: true,
        templateUrl: require('./buttonToggle.html'),
        controller: exports.controllerName,
        controllerAs: 'buttonToggle',
        scope: {
            type: '@',
            size: '@',
            onToggle: '&',
            disabled: '=ngDisabled',
        },
        link: function (scope, element, attrs, ngModel) {
            scope.ngModel = ngModel;
        }
    };
}
angular.module(exports.moduleName, [__boolean.moduleName])
    .directive(exports.directiveName, buttonToggle)
    .controller(exports.controllerName, ButtonToggleController);
//# sourceMappingURL=buttonToggle.js.map