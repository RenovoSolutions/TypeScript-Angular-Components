'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.directiveName = 'rlItemCount';
function itemCount() {
    'use strict';
    return {
        restrict: 'E',
        require: '^^rlCardContainer',
        template: require('./itemCount.html'),
        scope: {
            containerService: '=',
        },
    };
}
exports.itemCount = itemCount;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, itemCount);
//# sourceMappingURL=itemCount.js.map