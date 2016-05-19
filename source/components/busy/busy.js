"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1c3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLHVDQUFzQywyQkFBMkIsQ0FBQyxDQUFBO0FBRXJELGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFDN0MscUJBQWEsR0FBVyxRQUFRLENBQUM7QUFFOUM7SUFFQyx3QkFBbUIsZUFBd0I7UUFBeEIsb0JBQWUsR0FBZixlQUFlLENBQVM7SUFBSSxDQUFDO0lBRHpDLHNCQUFPLEdBQWEsQ0FBQyw4Q0FBcUIsQ0FBQyxDQUFDO0lBRXBELHFCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRCxJQUFNLElBQUksR0FBOEI7SUFDdkMsUUFBUSxFQUFFLDJIQUFxSDtJQUMvSCxVQUFVLEVBQUUsY0FBYztJQUMxQixZQUFZLEVBQUUsTUFBTTtJQUNwQixRQUFRLEVBQUU7UUFDVCxPQUFPLEVBQUUsR0FBRztRQUNaLG9CQUFvQjtRQUNwQixtQ0FBbUM7UUFDbkMsSUFBSSxFQUFFLEdBQUc7S0FDVDtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLElBQUksQ0FBQyxDQUFDIn0=