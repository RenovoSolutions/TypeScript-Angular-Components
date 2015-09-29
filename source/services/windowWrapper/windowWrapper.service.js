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
    return WindowService;
})();
angular.module(exports.moduleName, [])
    .service(exports.serviceName, WindowService);
//# sourceMappingURL=windowWrapper.service.js.map