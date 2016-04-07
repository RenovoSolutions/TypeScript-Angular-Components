// /// <reference path='../../../../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
exports.componentName = 'rlFilterOption';
var filterOption = {
    template: require('./filterOption.html'),
    controllerAs: 'filter',
    bindings: {
        activate: '&',
        isActive: '=active',
        option: '=',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, filterOption);
//# sourceMappingURL=filterOption.js.map