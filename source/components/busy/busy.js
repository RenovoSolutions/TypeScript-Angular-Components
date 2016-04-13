'use strict';
require('./busy.css');
var angular = require('angular');
var componentsDefaultTheme_1 = require('../componentsDefaultTheme');
exports.moduleName = 'rl.ui.components.busy';
exports.componentName = 'rlBusy';
var BusyController = (function () {
    function BusyController(useDefaultTheme) {
        this.useDefaultTheme = useDefaultTheme;
    }
    BusyController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
    return BusyController;
}());
var busy = {
    template: "<i class=\"busy rl-{{::busy.size}}\" ng-class=\"{ 'default-theme': busy.useDefaultTheme }\" ng-show=\"busy.loading\"></i>",
    controller: BusyController,
    controllerAs: 'busy',
    bindings: {
        loading: '<',
        // Valid values are:
        // `lg`, `2x`, `3x`, `4x`, and `5x`
        size: '@',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, busy);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsUUFBTyxZQUFZLENBQUMsQ0FBQTtBQUVwQixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyx1Q0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUV2RCxrQkFBVSxHQUFXLHVCQUF1QixDQUFDO0FBQzdDLHFCQUFhLEdBQVcsUUFBUSxDQUFDO0FBTTVDO0lBRUMsd0JBQW1CLGVBQXdCO1FBQXhCLG9CQUFlLEdBQWYsZUFBZSxDQUFTO0lBQUksQ0FBQztJQUR6QyxzQkFBTyxHQUFhLENBQUMsOENBQXFCLENBQUMsQ0FBQztJQUVwRCxxQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBRUQsSUFBSSxJQUFJLEdBQThCO0lBQ3JDLFFBQVEsRUFBRSwySEFBcUg7SUFDL0gsVUFBVSxFQUFFLGNBQWM7SUFDMUIsWUFBWSxFQUFFLE1BQU07SUFDcEIsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEdBQUc7UUFDWixvQkFBb0I7UUFDcEIsbUNBQW1DO1FBQ25DLElBQUksRUFBRSxHQUFHO0tBQ1Q7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyJ9