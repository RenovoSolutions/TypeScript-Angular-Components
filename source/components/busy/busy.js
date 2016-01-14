'use strict';
require('./busy.css');
var angular = require('angular');
var componentsDefaultTheme_1 = require('../componentsDefaultTheme');
exports.moduleName = 'rl.ui.components.busy';
exports.directiveName = 'rlBusy';
busy.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
function busy(useDefaultTheme) {
    'use strict';
    return {
        restrict: 'E',
        template: "<i class=\"busy rl-{{size}}\" ng-class=\"{ 'default-theme': useDefaultTheme }\" ng-show=\"loading\"></i>",
        scope: {
            loading: '=',
            // Valid values are:
            // `lg`, `2x`, `3x`, `4x`, and `5x`
            size: '@',
        },
        link: function (scope) {
            scope.useDefaultTheme = useDefaultTheme;
        },
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, busy);
//# sourceMappingURL=busy.js.map