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
    function GenericContainerController($scope, $element, $transclude, $compile, object, jquery, templateLoader) {
        var _this = this;
        this.$element = $element;
        this.$transclude = $transclude;
        this.$compile = $compile;
        this.object = object;
        this.jquery = jquery;
        this.templateLoader = templateLoader;
        $scope.$watch(function () { return _this.selector; }, function (newType, oldType) {
            if (_this.object.areEqual(newType, oldType)) {
                return;
            }
            var template = _this.resolveTemplate(newType);
            _this.swapTemplates(template);
        });
    }
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
    GenericContainerController.$inject = ['$scope',
        '$element',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY0NvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyaWNDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUU5Qyx1Q0FJTyxzREFBc0QsQ0FBQyxDQUFBO0FBRW5ELGtCQUFVLEdBQVcsbUNBQW1DLENBQUM7QUFDekQscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBRWpFLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRWxDO0lBa0JDLG9DQUFZLE1BQXNCLEVBQ3RCLFFBQWtDLEVBQ2xDLFdBQXdDLEVBQ3hDLFFBQWlDLEVBQ2pDLE1BQStCLEVBQy9CLE1BQXNCLEVBQ3RCLGNBQStCO1FBeEI1QyxpQkEyRUM7UUF4RFksYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWEsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxPQUFZLEVBQUUsT0FBWTtZQUM5RSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUM7WUFDUixDQUFD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