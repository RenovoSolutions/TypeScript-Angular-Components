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
//# sourceMappingURL=busy.js.map