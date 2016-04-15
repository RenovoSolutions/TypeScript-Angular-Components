'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
var templateLoader_service_1 = require('../../services/templateLoader/templateLoader.service');
exports.moduleName = 'rl.ui.components.genericContainer';
exports.componentName = 'rlGenericContainer';
exports.controllerName = 'GenericContainerController';
var __object = typescript_angular_utilities_1.services.object;
var GenericContainerController = (function () {
    function GenericContainerController($element, $transclude, $compile, object, jquery, templateLoader) {
        this.$element = $element;
        this.$transclude = $transclude;
        this.$compile = $compile;
        this.object = object;
        this.jquery = jquery;
        this.templateLoader = templateLoader;
    }
    GenericContainerController.prototype.$onChanges = function (changes) {
        if (changes.selector) {
            var template = this.resolveTemplate(changes.selector.currentValue);
            this.swapTemplates(template);
        }
    };
    GenericContainerController.prototype.refresh = function () {
        var template = this.resolveTemplate(this.selector);
        this.swapTemplates(template);
    };
    GenericContainerController.prototype.resolveTemplate = function (type) {
        if (_.has(this.templates, type)) {
            return this.templates[type];
        }
        else {
            return this.default;
        }
    };
    GenericContainerController.prototype.$postLink = function () {
        this.initDefaults();
        this.container = this.$element.find('#container');
        var templateResult = this.templateLoader.loadTemplates(this.$transclude);
        this.templates = _.extend(this.templates, templateResult.templates);
        this.default = templateResult.default;
        this.templateScope = templateResult.transclusionScope;
        if (!this.default) {
            this.default = '<div></div>';
        }
        this.refresh();
    };
    GenericContainerController.prototype.initDefaults = function () {
        this.default = this.defaultTemplate;
        this.templates = this.configuredTemplates ? this.configuredTemplates : {};
    };
    GenericContainerController.prototype.swapTemplates = function (template) {
        var content = angular.element(template);
        this.jquery.replaceContent(this.container, content);
        this.$compile(content)(this.templateScope);
    };
    GenericContainerController.$inject = ['$element',
        '$transclude',
        '$compile',
        __object.serviceName,
        jquery_service_1.serviceName,
        templateLoader_service_1.serviceName];
    return GenericContainerController;
}());
exports.GenericContainerController = GenericContainerController;
var genericContainer = {
    template: '<div id="container"></div>',
    transclude: true,
    controller: exports.controllerName,
    controllerAs: 'genericContainer',
    bindings: {
        selector: '<',
        configuredTemplates: '<templates',
        defaultTemplate: '<',
    },
};
angular.module(exports.moduleName, [jquery_service_1.moduleName, __object.moduleName, templateLoader_service_1.moduleName])
    .component(exports.componentName, genericContainer)
    .controller(exports.controllerName, GenericContainerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyaWNDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUU5Qyx1Q0FJTyxzREFBc0QsQ0FBQyxDQUFBO0FBSW5ELGtCQUFVLEdBQVcsbUNBQW1DLENBQUM7QUFDekQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBRWpFLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBTWxDO0lBaUJDLG9DQUFvQixRQUFrQyxFQUMxQyxXQUF3QyxFQUN4QyxRQUFpQyxFQUNqQyxNQUErQixFQUMvQixNQUFzQixFQUN0QixjQUErQjtRQUx2QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO0lBQUcsQ0FBQztJQUUvQywrQ0FBVSxHQUFWLFVBQVcsT0FBaUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNGLENBQUM7SUFFRCw0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