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
//# sourceMappingURL=templateRenderer.js.map