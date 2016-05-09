// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.templateRenderer';
exports.componentName = 'rlTemplateRenderer';
exports.controllerName = 'TemplateRendererController';
var TemplateRendererController = (function () {
    function TemplateRendererController($compile, $element, $scope) {
        if (_.isString(this.template)) {
            var templateString = this.template;
            this.template = {
                template: templateString,
                scope: $scope.$parent.$new(),
            };
        }
        var target = $element.find('.template-target');
        var template = target.append(this.template.template);
        $compile(template)(this.template.scope);
    }
    TemplateRendererController.$inject = ['$compile', '$element', '$scope'];
    return TemplateRendererController;
}());
exports.TemplateRendererController = TemplateRendererController;
var templateRenderer = {
    template: '<div class="template-target"></div>',
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
        template: '<',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, templateRenderer)
    .controller(exports.controllerName, TemplateRendererController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlbXBsYXRlUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXhCLGtCQUFVLEdBQVcsbUNBQW1DLENBQUM7QUFDekQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBV2pFO0lBSUMsb0NBQVksUUFBaUMsRUFBRSxRQUFrQyxFQUFFLE1BQXNCO1FBQ3hHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFNLGNBQWMsR0FBZ0IsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHO2dCQUNmLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7YUFDNUIsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkQsSUFBSSxRQUFRLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFiTSxrQ0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQWNyRCxpQ0FBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksa0NBQTBCLDZCQWlCdEMsQ0FBQTtBQUVELElBQUksZ0JBQWdCLEdBQThCO0lBQ2pELFFBQVEsRUFBRSxxQ0FBcUM7SUFDL0MsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxZQUFZO0lBQzFCLFFBQVEsRUFBRTtRQUNULFFBQVEsRUFBRSxHQUFHO0tBQ2I7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxnQkFBZ0IsQ0FBQztLQUMxQyxVQUFVLENBQUMsc0JBQWMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIn0=