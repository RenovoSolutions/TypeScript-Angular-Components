"use strict";
var angular = require('angular');
var dialog_service_1 = require('../../services/dialog/dialog.service');
exports.moduleName = 'rl.ui.components.dialog';
exports.componentName = 'rlDialog';
exports.controllerName = 'DialogController';
var DialogController = (function () {
    function DialogController($scope, $element, $transclude, $compile, dialogService) {
        this.$scope = $scope;
        this.$element = $element;
        this.$transclude = $transclude;
        this.$compile = $compile;
        this.dialogService = dialogService;
    }
    DialogController.prototype.$onInit = function () {
        var _this = this;
        var unbind = this.$scope.$watch(function () { return _this.form; }, function (form) {
            if (form != null) {
                _this.dialogService.setForm(form);
                unbind();
            }
        });
    };
    DialogController.prototype.$postLink = function () {
        var _this = this;
        this.close = this.$scope.$parent.$close;
        this.dismiss = this.$scope.$parent.$dismiss;
        this.saveAndClose = this.$scope.$parent.$saveAndClose;
        var footerArea = this.$element.find('.footer-template');
        if (this.$transclude.isSlotFilled('footerSlot')) {
            this.$transclude(function (footer) {
                _this.hasFooter = (footer.length > 0);
                if (_this.hasFooter) {
                    footerArea.append(footer);
                }
            }, null, 'footerSlot');
        }
        else if (this.autosave) {
            var footer = this.$compile(require('./autosaveDialogFooter.html'))(this.$scope);
            this.hasFooter = true;
            footerArea.append(footer);
        }
    };
    DialogController.$inject = ['$scope', '$element', '$transclude', '$compile', dialog_service_1.serviceName];
    return DialogController;
}());
exports.DialogController = DialogController;
var dialog = {
    transclude: {
        headerSlot: '?rlDialogHeader',
        contentSlot: '?rlDialogContent',
        footerSlot: '?rlDialogFooter',
    },
    template: require('./dialog.html'),
    controller: exports.controllerName,
    controllerAs: 'dialog',
    bindings: {
        autosave: '=',
    },
};
angular.module(exports.moduleName, [dialog_service_1.moduleName])
    .component(exports.componentName, dialog)
    .controller(exports.controllerName, DialogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQywrQkFBNEYsc0NBQXNDLENBQUMsQ0FBQTtBQUd4SCxrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLHFCQUFhLEdBQVcsVUFBVSxDQUFDO0FBQ25DLHNCQUFjLEdBQVcsa0JBQWtCLENBQUM7QUFpQnZEO0lBVUMsMEJBQW9CLE1BQW9CLEVBQzVCLFFBQWtDLEVBQ2xDLFdBQXdDLEVBQ3hDLFFBQWlDLEVBQ2pDLGFBQWlDO1FBSnpCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtJQUFHLENBQUM7SUFFakQsa0NBQU8sR0FBUDtRQUFBLGlCQU9DO1FBTkEsSUFBSSxNQUFNLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBd0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxJQUFvQjtZQUMzRyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sRUFBRSxDQUFDO1lBQ1YsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFBQSxpQkFrQkM7UUFqQkEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDdEQsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFDLE1BQWM7Z0JBQy9CLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNGLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNGLENBQUM7SUFsQ00sd0JBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSw0QkFBaUIsQ0FBQyxDQUFDO0lBbUNqRyx1QkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksd0JBQWdCLG1CQTRDNUIsQ0FBQTtBQUVELElBQUksTUFBTSxHQUE4QjtJQUN2QyxVQUFVLEVBQU87UUFDaEIsVUFBVSxFQUFFLGlCQUFpQjtRQUM3QixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLFVBQVUsRUFBRSxpQkFBaUI7S0FDN0I7SUFDRCxRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUNsQyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEdBQUc7S0FDYjtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQywyQkFBWSxDQUFDLENBQUM7S0FDeEMsU0FBUyxDQUFDLHFCQUFhLEVBQUUsTUFBTSxDQUFDO0tBQ2hDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==