'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.componentName = 'rlItemCount';
var itemCount = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./itemCount.html'),
    controllerAs: 'itemCount',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, itemCount);
//# sourceMappingURL=itemCount.js.map