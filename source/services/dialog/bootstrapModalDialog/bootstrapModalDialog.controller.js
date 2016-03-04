'use strict';
var bootstrapModalDialog_service_1 = require('./bootstrapModalDialog.service');
exports.controllerName = 'BootstrapModalDialogController';
var BootstrapModalDialogController = (function () {
    function BootstrapModalDialogController($scope, $controller, baseDialog) {
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
    BootstrapModalDialogController.$inject = ['$scope', '$controller', bootstrapModalDialog_service_1.serviceName];
    return BootstrapModalDialogController;
})();
exports.BootstrapModalDialogController = BootstrapModalDialogController;
//# sourceMappingURL=bootstrapModalDialog.controller.js.map