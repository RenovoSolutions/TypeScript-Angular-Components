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
                var templateHtml = '<span>' + templateElement.html() + '</span>';
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
}());
angular.module(exports.moduleName, [__object.moduleName])
    .value('templateSelectorValue', 'template')
    .service(exports.serviceName, TemplateLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVMb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlbXBsYXRlTG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBRS9ELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRXZCLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFDNUQsbUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztBQVlsRDtJQUVDLHdCQUFvQixZQUF5QyxFQUNsRCxxQkFBcUIsRUFDckIsYUFBc0M7UUFGN0IsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ2xELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBQTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7SUFBSSxDQUFDO0lBRXRELHNDQUFhLEdBQWIsVUFBYyxVQUF1QztRQUFyRCxpQkFpQ0M7UUFoQ0EsSUFBSSxNQUFNLEdBQW1CO1lBQzVCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixpQkFBaUIsRUFBRSxJQUFJO1NBQ3ZCLENBQUM7UUFFRiw4QkFBOEI7UUFDOUIsVUFBVSxDQUFDLFVBQUMsS0FBK0IsRUFDeEMsaUJBQWlDO1lBQ25DLElBQUksU0FBUyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWEsRUFDekIsUUFBaUI7Z0JBQ3BCLElBQUksZUFBZSxHQUE2QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLFlBQVksR0FBVyxRQUFRLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFFekUsSUFBSSxnQkFBZ0IsR0FBVyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlELElBQUksT0FBTyxHQUFXLEtBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM3RSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztnQkFDMUMsQ0FBQztnQkFFRCxJQUFJLFNBQVMsR0FBVyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO2dCQUMvQixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQXRDTSxzQkFBTyxHQUFhLENBQUMsY0FBYyxFQUFFLHVCQUF1QixFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQXVDNUYscUJBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxVQUFVLENBQUM7S0FDMUMsT0FBTyxDQUFDLG1CQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMifQ==