'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
exports.moduleName = 'rl.ui.components.genericContainer';
exports.directiveName = 'rlGenericContainer';
exports.controllerName = 'GenericContainerController';
var __object = typescript_angular_utilities_1.services.object;
var GenericContainerController = (function () {
    function GenericContainerController($scope, object) {
        var _this = this;
        this.object = object;
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
        var templateObject;
        if (_.has(this.templates, type)) {
            templateObject = this.templates[type];
        }
        else {
            templateObject = this.default;
        }
        var template = templateObject;
        if (!_.isUndefined(template.templateUrl)) {
            return '<ng-include src="\'' + template.templateUrl + '\'"></ng-include>';
        }
        else if (!_.isUndefined(template.template)) {
            return template.template;
        }
        else {
            return templateObject;
        }
    };
    GenericContainerController.$inject = ['$scope', __object.serviceName];
    return GenericContainerController;
})();
exports.GenericContainerController = GenericContainerController;
genericContainer.$inject = ['$compile', '$interpolate', jquery_service_1.serviceName, __object.serviceName];
function genericContainer($compile, $interpolate, jquery, object) {
    'use strict';
    return {
        restrict: 'E',
        template: '<div id="container"></div>',
        transclude: true,
        controller: exports.controllerName,
        controllerAs: 'genericContainer',
        scope: {},
        bindToController: {
            selector: '=',
            configuredTemplates: '=templates',
            defaultTemplate: '=',
        },
        link: function (scope, element, attributes, controller, transclude) {
            initDefaults(controller);
            var container = element.find('#container');
            var templateScope;
            // Load templates from the DOM
            transclude(function (clone, transclusionScope) {
                var templates = clone.filter('template');
                templates.each(function (index, template) {
                    var templateElement = angular.element(template);
                    var templateHtml = templateElement.html();
                    var triggerAttribute = templateElement.attr('when-selector');
                    if (!object.isNullOrWhitespace(triggerAttribute)) {
                        var trigger = $interpolate(triggerAttribute)(transclusionScope);
                        controller.templates[trigger] = templateHtml;
                    }
                    var isDefault = templateElement.attr('default');
                    if (!_.isUndefined(isDefault) && isDefault.toLowerCase() !== 'false') {
                        controller.default = templateHtml;
                    }
                });
                templateScope = transclusionScope;
            });
            if (!controller.default) {
                controller.default = {
                    template: '<div></div>',
                };
            }
            controller.refresh();
            function initDefaults(controller) {
                controller.default = controller.defaultTemplate;
                controller.templates = controller.configuredTemplates ? controller.configuredTemplates : {};
                controller.swapTemplates = swapTemplates;
            }
            function swapTemplates(template) {
                var content = $compile(template)(templateScope);
                jquery.replaceContent(container, content);
            }
        }
    };
}
angular.module(exports.moduleName, [jquery_service_1.moduleName, __object.moduleName])
    .directive(exports.directiveName, genericContainer)
    .controller(exports.controllerName, GenericContainerController);
//# sourceMappingURL=genericContainer.js.map