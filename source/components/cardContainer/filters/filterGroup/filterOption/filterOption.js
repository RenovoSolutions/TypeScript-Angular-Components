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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyT3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyT3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1FQUFtRTtBQUVuRSxZQUFZLENBQUM7QUFDYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLGlFQUFpRSxDQUFDO0FBQ3ZGLHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFFcEQsSUFBSSxZQUFZLEdBQThCO0lBQzdDLFFBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7SUFDeEMsWUFBWSxFQUFFLFFBQVE7SUFDdEIsUUFBUSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEdBQUc7UUFDYixRQUFRLEVBQUUsU0FBUztRQUNuQixNQUFNLEVBQUUsR0FBRztLQUNYO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsWUFBWSxDQUFDLENBQUMifQ==