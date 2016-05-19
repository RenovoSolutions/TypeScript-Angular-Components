"use strict";
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
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, WindowService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93V3JhcHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93V3JhcHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQixrQkFBVSxHQUFXLDhCQUE4QixDQUFDO0FBQ3BELG1CQUFXLEdBQVcsZUFBZSxDQUFDO0FBYWpEO0lBQUE7UUFDUyxrQkFBYSxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQWlCM0MsQ0FBQztJQWZBLDhCQUFNLEdBQU4sVUFBTyxRQUE2QztRQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw4QkFBTSxHQUFOLFVBQU8sT0FBdUI7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyJ9