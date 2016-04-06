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
//# sourceMappingURL=genericContainer.js.map