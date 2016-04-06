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
//# sourceMappingURL=dialog.js.map