'use strict';
exports.controllerName = 'AutosaveDialogController';
var AutosaveDialogController = (function () {
    function AutosaveDialogController($scope) {
        this.$scope = $scope;
        if ($scope.form != null) {
            var unbind = $scope.$watch($scope.form, function (form) {
                if (form != null) {
                    $scope.setForm(form);
                    unbind();
                }
            });
        }
        else if ($scope.formGetter != null) {
            var unbind = $scope.$watch(function () { return $scope.formGetter($scope); }, function (form) {
                if (form != null) {
                    $scope.setForm(form);
                    unbind();
                }
            });
        }
    }
    AutosaveDialogController.$inject = ['$scope'];
    return AutosaveDialogController;
})();
exports.AutosaveDialogController = AutosaveDialogController;
//# sourceMappingURL=autosaveDialog.controller.js.map