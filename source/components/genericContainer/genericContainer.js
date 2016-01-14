'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
var templateLoader_service_1 = require('../../services/templateLoader/templateLoader.service');
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
        if (_.has(this.templates, type)) {
            return this.templates[type];
        }
        else {
            return this.default;
        }
    };
    GenericContainerController.$inject = ['$scope', __object.serviceName];
    return GenericContainerController;
})();
exports.GenericContainerController = GenericContainerController;
genericContainer.$inject = [
    '$compile',
    '$interpolate',
    jquery_service_1.serviceName,
    templateLoader_service_1.serviceName,
    __object.serviceName,
];
function genericContainer($compile, $interpolate, jquery, templateLoader, object) {
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
            var templateResult = templateLoader.loadTemplates(transclude);
            controller.templates = _.extend(controller.templates, templateResult.templates);
            controller.default = templateResult.default;
            var templateScope = templateResult.transclusionScope;
            if (!controller.default) {
                controller.default = '<div></div>';
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
angular.module(exports.moduleName, [jquery_service_1.moduleName, __object.moduleName, templateLoader_service_1.moduleName])
    .directive(exports.directiveName, genericContainer)
    .controller(exports.controllerName, GenericContainerController);
//# sourceMappingURL=genericContainer.js.map