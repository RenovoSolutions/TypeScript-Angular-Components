'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __promiseUtility = typescript_angular_utilities_1.services.promise;
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonAsync';
exports.componentName = 'rlButtonAsync';
exports.controllerName = 'ButtonAsyncController';
var ButtonAsyncController = (function (_super) {
    __extends(ButtonAsyncController, _super);
    function ButtonAsyncController(promiseUtility) {
        _super.call(this);
        this.promiseUtility = promiseUtility;
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
}(button_1.ButtonController));
exports.ButtonAsyncController = ButtonAsyncController;
var buttonAsync = button_1.buildButton({
    template: require('./buttonAsync.html'),
    bindings: {
        busy: '<?',
        rightAligned: '<?',
    },
    controller: exports.controllerName,
});
angular.module(exports.moduleName, [__promiseUtility.moduleName])
    .component(exports.componentName, buttonAsync)
    .controller(exports.controllerName, ButtonAsyncController);
//# sourceMappingURL=buttonAsync.js.map