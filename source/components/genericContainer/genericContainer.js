"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
var templateLoader_service_1 = require('../../services/templateLoader/templateLoader.service');
exports.moduleName = 'rl.ui.components.genericContainer';
exports.componentName = 'rlGenericContainer';
exports.controllerName = 'GenericContainerController';
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
        typescript_angular_utilities_1.downgrade.objectServiceName,
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
angular.module(exports.moduleName, [jquery_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, templateLoader_service_1.moduleName])
    .component(exports.componentName, genericContainer)
    .controller(exports.controllerName, GenericContainerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyaWNDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR25FLCtCQUlPLHNDQUFzQyxDQUFDLENBQUE7QUFFOUMsdUNBSU8sc0RBQXNELENBQUMsQ0FBQTtBQUluRCxrQkFBVSxHQUFXLG1DQUFtQyxDQUFDO0FBQ3pELHFCQUFhLEdBQVcsb0JBQW9CLENBQUM7QUFDN0Msc0JBQWMsR0FBVyw0QkFBNEIsQ0FBQztBQU9qRTtJQWlCQyxvQ0FBb0IsUUFBa0MsRUFDM0MsV0FBd0MsRUFDeEMsUUFBaUMsRUFDakMsTUFBK0IsRUFDL0IsTUFBc0IsRUFDdEIsY0FBK0I7UUFMdEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDM0MsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtJQUFJLENBQUM7SUFFL0MsK0NBQVUsR0FBVixVQUFXLE9BQWlDO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNGLENBQUM7SUFFRCw0Q0FBTyxHQUFQO1FBQ0MsSUFBSSxRQUFRLEdBQVcsSUFBSSxD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