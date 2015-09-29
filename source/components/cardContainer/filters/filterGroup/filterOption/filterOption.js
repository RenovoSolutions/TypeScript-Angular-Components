// /// <reference path='../../../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
exports.directiveName = 'rlFilterOption';
function filterOption() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./filterOption.html'),
        scope: {
            activate: '&',
            isActive: '=active',
            option: '=',
        },
    };
}
exports.filterOption = filterOption;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, filterOption);
//# sourceMappingURL=filterOption.js.map