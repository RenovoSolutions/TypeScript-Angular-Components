'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promiseUtility = typescript_angular_utilities_1.services.promise;
exports.moduleName = 'rl.ui.components.buttonAsync';
exports.componentName = 'rlButtonAsync';
exports.controllerName = 'ButtonAsyncController';
var ButtonAsyncController = (function () {
    function ButtonAsyncController(promiseUtility) {
        this.promiseUtility = promiseUtility;
        this.type = this.type != null ? this.type : 'default';
        this.sizeClass = this.size != null ? 'btn-' + this.size : null;
    }
    ButtonAsyncController.prototype.trigger = function () {
        var _this = this;
        if (!this.busy) {
            this.busy = true;
            var result = this.action();
            if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
                result.finally(function () {
                    _this.busy = false;
                });
            }
            else if (result !== true) {
                this.busy = false;
            }
        }
    };
    ButtonAsyncController.$inject = [__promiseUtility.serviceName];
    return ButtonAsyncController;
}());
exports.ButtonAsyncController = ButtonAsyncController;
var buttonAsync = {
    transclude: true,
    template: require('./buttonAsync.html'),
    bindings: {
        busy: '<?',
        action: '&',
        type: '@',
        ngDisabled: '<?',
        rightAligned: '<?',
        size: '@',
    },
    controller: exports.controllerName,
    controllerAs: 'button',
};
angular.module(exports.moduleName, [__promiseUtility.moduleName])
    .component(exports.componentName, buttonAsync)
    .controller(exports.controllerName, ButtonAsyncController);
//# sourceMappingURL=buttonAsync.js.map