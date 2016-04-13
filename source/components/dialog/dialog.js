// /// <reference path='../../../typings/node/node.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsK0JBQTRGLHNDQUFzQyxDQUFDLENBQUE7QUFHeEgsa0JBQVUsR0FBVyx5QkFBeUIsQ0FBQztBQUMvQyxxQkFBYSxHQUFXLFVBQVUsQ0FBQztBQUNuQyxzQkFBYyxHQUFXLGtCQUFrQixDQUFDO0FBaUJ2RDtJQVVDLDBCQUFvQixNQUFvQixFQUM1QixRQUFrQyxFQUNsQyxXQUF3QyxFQUN4QyxRQUFpQyxFQUNqQyxhQUFpQztRQUp6QixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUN4QyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBb0I7SUFBRyxDQUFDO0lBRWpELGtDQUFPLEdBQVA7UUFBQSxpQkFPQztRQU5BLElBQUksTUFBTSxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQXdCLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsSUFBb0I7WUFDM0csRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQztZQUNWLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQUEsaUJBa0JDO1FBakJBLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3RELElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBQyxNQUFjO2dCQUMvQixLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDRixDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDRixDQUFDO0lBbENNLHdCQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsNEJBQWlCLENBQUMsQ0FBQztJQW1DakcsdUJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLHdCQUFnQixtQkE0QzVCLENBQUE7QUFFRCxJQUFJLE1BQU0sR0FBOEI7SUFDdkMsVUFBVSxFQUFPO1FBQ2hCLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixVQUFVLEVBQUUsaUJBQWlCO0tBQzdCO0lBQ0QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDbEMsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxRQUFRO0lBQ3RCLFFBQVEsRUFBRTtRQUNULFFBQVEsRUFBRSxHQUFHO0tBQ2I7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsMkJBQVksQ0FBQyxDQUFDO0tBQ3hDLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLE1BQU0sQ0FBQztLQUNoQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIn0=