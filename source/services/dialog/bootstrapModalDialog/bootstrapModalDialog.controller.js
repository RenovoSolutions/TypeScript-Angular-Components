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
}());
exports.BootstrapModalDialogController = BootstrapModalDialogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwTW9kYWxEaWFsb2cuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb3RzdHJhcE1vZGFsRGlhbG9nLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsNkNBQXlELGdDQUFnQyxDQUFDLENBQUE7QUFFL0Usc0JBQWMsR0FBVyxnQ0FBZ0MsQ0FBQztBQU9yRTtJQUVDLHdDQUFZLE1BQWtDLEVBQzFDLFdBQWtDLEVBQ2xDLFVBQXVDO1FBQzFDLElBQUksVUFBZSxDQUFDO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLE1BQU0sR0FBUSxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUV2QixVQUFVLEdBQUcsV0FBVyxDQUFNLE1BQU0sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVyRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFqQk0sc0NBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsMENBQVcsQ0FBQyxDQUFDO0lBa0JuRSxxQ0FBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksc0NBQThCLGlDQW1CMUMsQ0FBQSJ9