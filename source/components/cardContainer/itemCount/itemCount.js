'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.directiveName = 'rlItemCount';
function itemCount() {
    'use strict';
    return {
        restrict: 'E',
        require: '^^rlCardContainer',
        template: "\n<p ng-show=\"!source.loadingDataSet\">\n\tShowing <strong>{{source.dataSet.length}} of {{source.count}}</strong> total items\n</p>",
        scope: true,
        link: function (scope, element, attrs, cardContainerController) {
            scope.source = cardContainerController.dataSource;
        }
    };
}
exports.itemCount = itemCount;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, itemCount);
//# sourceMappingURL=itemCount.js.map