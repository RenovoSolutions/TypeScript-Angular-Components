'use strict';
var baseDialog_service_1 = require('./baseDialog.service');
exports.controllerName = 'BaseDialogController';
var BaseDialogController = (function () {
    function BaseDialogController($scope, $controller, baseDialog) {
        var controller;
        if ($scope.modalController != null) {
            var locals = $scope.resolveData || {};
            $scope.resolveData = null;
            locals.$scope = $scope;
            controller = $controller($scope.modalController, locals);
        }
        $scope.$on('modal.closing', baseDialog.modalClosing);
        return controller;
    }
    BaseDialogController.$inject = ['$scope', '$controller', baseDialog_service_1.serviceName];
    return BaseDialogController;
})();
exports.BaseDialogController = BaseDialogController;
//# sourceMappingURL=baseDialog.controller.js.map