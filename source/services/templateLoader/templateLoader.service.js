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
}());
angular.module(exports.moduleName, [__object.moduleName])
    .value('templateSelectorValue', 'template')
    .service(exports.serviceName, TemplateLoader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVMb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlbXBsYXRlTG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBRS9ELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBRXZCLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFDNUQsbUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztBQVlsRDtJQUVDLHdCQUFvQixZQUF5QyxFQUNsRCxxQkFBcUIsRUFDckIsYUFBc0M7UUFGN0IsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ2xELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBQTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7SUFBSSxDQUFDO0lBRXRELHNDQUFhLEdBQWIsVUFBYyxVQUF1QztRQUFyRCxpQkFpQ0M7UUFoQ0EsSUFBSSxNQUFNLEdBQW1CO1lBQzVCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixpQkFBaUIsRUFBRSxJQUFJO1NBQ3ZCLENBQUM7UUFFRiw4QkFBOEI7UUFDOUIsVUFBVSxDQUFDLFVBQUMsS0FBK0IsRUFDeEMsaUJBQWlDO1lBQ25DLElBQUksU0FBUyxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQWEsRUFDekIsUUFBaUI7Z0JBQ3BCLElBQUksZUFBZSxHQUE2QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLFlBQVksR0FBVyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRWxELElBQUksZ0JBQWdCLEdBQVcsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLE9BQU8sR0FBVyxLQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDN0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQsSUFBSSxTQUFTLEdBQVcsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztnQkFDL0IsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNmLENBQUM7SUF0Q00sc0JBQU8sR0FBYSxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUF1QzVGLHFCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDO0tBQzFDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=