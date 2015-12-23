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
        require: '^^rlCardContainer',
        template: "\n\t\t\t<div rl-size-for-breakpoints=\"column.size\" ng-click=\"sort()\" title=\"{{::column.description}}\"\n\t\t\t\t\tclass=\"column-header\">\n\t\t\t\t<div class=\"template-container\" style=\"display: inline-block\"></div>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.ascending\" class=\"fa fa-sort-asc\"></i>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.descending\" class=\"fa fa-sort-desc\"></i>\n\t\t\t</div>\n\t\t",
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
//# sourceMappingURL=columnHeader.js.map