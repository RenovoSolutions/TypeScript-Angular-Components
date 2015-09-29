'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.busy';
exports.directiveName = 'rlBusy';
function busy() {
    'use strict';
    return {
        restrict: 'E',
        template: '<i class="fa fa-spin fa-spinner fa-{{size}}" ng-show="loading"></i>',
        scope: {
            loading: '=',
            // Valid values are:
            // `lg`, `2x`, `3x`, `4x`, and `5x`
            size: '@',
        },
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, busy);
//# sourceMappingURL=busy.js.map