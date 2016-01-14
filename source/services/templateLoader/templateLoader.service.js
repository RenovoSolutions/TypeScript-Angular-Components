// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.utilities.services.templateLoader';
exports.serviceName = 'templateLoader';
var TemplateLoader = (function () {
    function TemplateLoader($interpolate, templateSelectorValue, objectUtility) {
        this.$interpolate = $interpolate;
        this.templateSelectorValue = templateSelectorValue;
        this.objectUtility = objectUtility;
    }
    TemplateLoader.prototype.loadTemplates = function (transclude) {
        var _this = this;
        var result = {
            templates: {},
            default: null,
            transclusionScope: null,
        };
        // Load templates from the DOM
        transclude(function (clone, transclusionScope) {
            var templates = clone.filter(_this.templateSelectorValue);
            templates.each(function (index, template) {
                var templateElement = angular.element(template);
                var templateHtml = templateElement.html();
                var triggerAttribute = templateElement.attr('when-selector');
                if (!_this.objectUtility.isNullOrWhitespace(triggerAttribute)) {
                    var trigger = _this.$interpolate(triggerAttribute)(transclusionScope);
                    result.templates[trigger] = templateHtml;
                }
                var isDefault = templateElement.attr('default');
                if (!_.isUndefined(isDefault) && isDefault.toLowerCase() !== 'false') {
                    result.default = templateHtml;
                }
            });
            result.transclusionScope = transclusionScope;
        });
        return result;
    };
    TemplateLoader.$inject = ['$interpolate', 'templateSelectorValue', __object.serviceName];
    return TemplateLoader;
})();
angular.module(exports.moduleName, [__object.moduleName])
    .value('templateSelectorValue', 'template')
    .service(exports.serviceName, TemplateLoader);
//# sourceMappingURL=templateLoader.service.js.map