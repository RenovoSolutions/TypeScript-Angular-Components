// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.templateRenderer';
exports.componentName = 'rlTemplateRenderer';
exports.controllerName = 'TemplateRendererController';
var TemplateRendererController = (function () {
    function TemplateRendererController($compile, $element) {
        var target = $element.find('.template-target');
        var template = target.append(this.template.template);
        $compile(template)(this.template.scope);
    }
    TemplateRendererController.$inject = ['$compile', '$element'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlbXBsYXRlUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRXhCLGtCQUFVLEdBQVcsbUNBQW1DLENBQUM7QUFDekQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBV2pFO0lBSUMsb0NBQVksUUFBaUMsRUFBRSxRQUFrQztRQUNoRixJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkQsSUFBSSxRQUFRLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFMTSxrQ0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBTTNDLGlDQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxrQ0FBMEIsNkJBU3RDLENBQUE7QUFFRCxJQUFJLGdCQUFnQixHQUE4QjtJQUNqRCxRQUFRLEVBQUUscUNBQXFDO0lBQy9DLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUU7UUFDVCxRQUFRLEVBQUUsR0FBRztLQUNiO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsU0FBUyxDQUFDLHFCQUFhLEVBQUUsZ0JBQWdCLENBQUM7S0FDMUMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyJ9