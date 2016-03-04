'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.directiveName = 'rlItemCount';
function itemCount() {
    'use strict';
    return {
        restrict: 'E',
        require: { cardContainer: '?^^rlCardContainer' },
        template: require('./itemCount.html'),
        controller: function () { },
        controllerAs: 'itemCount',
        scope: {},
        bindToController: true,
    };
}
exports.itemCount = itemCount;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, itemCount);
//# sourceMappingURL=itemCount.js.map