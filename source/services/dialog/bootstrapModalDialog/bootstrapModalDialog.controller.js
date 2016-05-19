"use strict";
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
}());
exports.BootstrapModalDialogController = BootstrapModalDialogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb3RzdHJhcE1vZGFsRGlhbG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLDZDQUF5RCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRS9FLHNCQUFjLEdBQVcsZ0NBQWdDLENBQUM7QUFPckU7SUFFQyx3Q0FBWSxNQUFrQyxFQUMxQyxXQUFrQyxFQUNsQyxVQUF1QztRQUMxQyxJQUFJLFVBQWUsQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxNQUFNLEdBQVEsTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFDM0MsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFdkIsVUFBVSxHQUFHLFdBQVcsQ0FBTSxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckQsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBakJNLHNDQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLDBDQUFXLENBQUMsQ0FBQztJQWtCbkUscUNBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNDQUE4QixpQ0FtQjFDLENBQUEifQ==