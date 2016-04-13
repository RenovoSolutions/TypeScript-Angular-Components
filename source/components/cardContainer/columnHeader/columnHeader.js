// /// <reference path='../../../../typings/jquery/jquery.d.ts' />
'use strict';
var angular = require('angular');
var sortDirection_1 = require('../sorts/sortDirection');
exports.moduleName = 'rl.ui.components.cardContainer.columnHeader';
exports.directiveName = 'rlColumnHeader';
cardColumnHeader.$inject = ['$compile'];
function cardColumnHeader($compile) {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div rl-size-for-breakpoints=\"column.size\" ng-click=\"sort()\" title=\"{{::column.description}}\"\n\t\t\t\t\tclass=\"column-header\">\n\t\t\t\t<div class=\"template-container\"></div>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.ascending\" class=\"fa fa-sort-asc\"></i>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.descending\" class=\"fa fa-sort-desc\"></i>\n\t\t\t</div>\n\t\t",
        scope: {
            column: '=',
            sorting: '=',
            sort: '&',
        },
        compile: function () {
            return {
                pre: function (scope) {
                    var column = scope.column;
                    if (column.headerTemplateUrl != null) {
                        scope.renderedTemplate = $compile('<div ng-include="\'' + column.headerTemplateUrl + '\'"></div>')(scope);
                    }
                    else if (column.headerTemplate != null) {
                        scope.renderedTemplate = $compile(column.headerTemplate)(scope);
                    }
                    else {
                        scope.renderedTemplate = ('<h5>' + column.label + '</h5');
                    }
                },
                post: function (scope, element) {
                    if (scope.column.displayColumnHeader != null && scope.column.displayColumnHeader === false) {
                        element.remove();
                        return;
                    }
                    var container = element.find('.template-container');
                    container.append(scope.renderedTemplate);
                    scope.sortDirection = sortDirection_1.SortDirection;
                },
            };
        }
    };
}
exports.cardColumnHeader = cardColumnHeader;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, cardColumnHeader);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29sdW1uSGVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtFQUFrRTtBQUVsRSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw4QkFBK0Msd0JBQXdCLENBQUMsQ0FBQTtBQUc3RCxrQkFBVSxHQUFXLDZDQUE2QyxDQUFDO0FBQ25FLHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFXcEQsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEMsMEJBQWlDLFFBQWlDO0lBQ2pFLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLDZZQU9UO1FBQ0QsS0FBSyxFQUFFO1lBQ04sTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsR0FBRztZQUNaLElBQUksRUFBRSxHQUFHO1NBQ1Q7UUFDRCxPQUFPO1lBQ04sTUFBTSxDQUFDO2dCQUNOLEdBQUcsWUFBQyxLQUE2QjtvQkFDaEMsSUFBSSxNQUFNLEdBQWlCLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0csQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakUsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUMsZ0JBQWdCLEdBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQztvQkFDaEUsQ0FBQztnQkFDRixDQUFDO2dCQUNELElBQUksWUFBQyxLQUE2QixFQUFFLE9BQWlDO29CQUNwRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzVGLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDakIsTUFBTSxDQUFDO29CQUNSLENBQUM7b0JBQ0QsSUFBSSxTQUFTLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUM1RCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUV6QyxLQUFLLENBQUMsYUFBYSxHQUFHLDZCQUFhLENBQUM7Z0JBRXJDLENBQUM7YUFDRCxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBM0NlLHdCQUFnQixtQkEyQy9CLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==