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
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, WindowService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93V3JhcHBlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93V3JhcHBlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpCLGtCQUFVLEdBQVcsOEJBQThCLENBQUM7QUFDcEQsbUJBQVcsR0FBVyxlQUFlLENBQUM7QUFhakQ7SUFBQTtRQUNTLGtCQUFhLEdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBaUIzQyxDQUFDO0lBZkEsOEJBQU0sR0FBTixVQUFPLFFBQTZDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBTyxPQUF1QjtRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=