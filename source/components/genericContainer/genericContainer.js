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
        if (this.container && changes.selector) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyaWNDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUU5Qyx1Q0FJTyxzREFBc0QsQ0FBQyxDQUFBO0FBSW5ELGtCQUFVLEdBQVcsbUNBQW1DLENBQUM7QUFDekQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBRWpFLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBTWxDO0lBaUJDLG9DQUFvQixRQUFrQyxFQUMxQyxXQUF3QyxFQUN4QyxRQUFpQyxFQUNqQyxNQUErQixFQUMvQixNQUFzQixFQUN0QixjQUErQjtRQUx2QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUMxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7UUFDeEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO0lBQUcsQ0FBQztJQUUvQywrQ0FBVSxHQUFWLFVBQVcsT0FBaUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixD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