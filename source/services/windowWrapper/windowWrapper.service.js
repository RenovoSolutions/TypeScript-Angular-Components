'use strict';
var angular = require('angular');
var $ = require('jquery');
exports.moduleName = 'rl.ui.services.windowWrapper';
exports.serviceName = 'windowWrapper';
var WindowService = (function () {
    function WindowService() {
        this.windowControl = $(window);
    }
    WindowService.prototype.resize = function (callback) {
        this.windowControl.resize(callback);
    };
    WindowService.prototype.scrollTop = function () {
        return this.windowControl.scrollTop();
    };
    WindowService.prototype.scroll = function (handler) {
        this.windowControl.scroll(handler);
    };
    WindowService.prototype.height = function () {
        return this.windowControl.height();
    };
    return WindowService;
})();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, WindowService);
//# sourceMappingURL=windowWrapper.service.js.map