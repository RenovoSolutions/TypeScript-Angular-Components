// /// <reference path='../../../../../typings/jquery/jquery.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.directiveName = 'rlCardHeaderColumn';
exports.controllerName = 'CardHeaderColumnController';
var HeaderColumnController = (function () {
    function HeaderColumnController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.update = function () {
            _this.value = __transform.getValue(_this.item, _this.column.getValue);
        };
        this.update();
        $scope.$on('card.refresh', this.update); //*event?
    }
    HeaderColumnController.$inject = ['$scope'];
    return HeaderColumnController;
}());
exports.HeaderColumnController = HeaderColumnController;
headerColumn.$inject = ['$compile'];
function headerColumn($compile) {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div rl-size-for-breakpoints=\"header.column.size\" styling=\"::header.column.styling\" title=\"{{::header.column.description}}\">\n\t\t\t\t<div class=\"template-container\"></div>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'header',
        scope: {},
        bindToController: {
            column: '<',
            item: '<',
            alias: '<',
        },
        compile: function () {
            return {
                pre: function (scope, element, attrs, header) {
                    if (header.alias != null) {
                        scope[header.alias] = header.item;
                    }
                    var column = header.column;
                    if (column.templateUrl != null) {
                        header.renderedTemplate = $compile('<div ng-include="\'' + column.templateUrl + '\'"></div>')(scope);
                    }
                    else if (column.template != null) {
                        header.renderedTemplate = $compile(column.template)(scope);
                    }
                    else {
                        header.renderedTemplate = $compile('<span>{{header.value}}</span>')(scope);
                    }
                },
                post: function (scope, element, attrs, header) {
                    var container = element.find('.template-container');
                    container.append(header.renderedTemplate);
                },
            };
        },
    };
}
exports.headerColumn = headerColumn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVhZGVyQ29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFFQUFxRTtBQUVyRSxZQUFZLENBQUM7QUFJYiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFJdkMscUJBQWEsR0FBVyxvQkFBb0IsQ0FBQztBQUM3QyxzQkFBYyxHQUFXLDRCQUE0QixDQUFDO0FBUWpFO0lBVUMsZ0NBQW9CLE1BQXNCO1FBVjNDLGlCQWtCQztRQVJvQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUtsQyxXQUFNLEdBQWlCO1lBQzlCLEtBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFBO1FBTkEsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNuRCxDQUFDO0lBSk0sOEJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBU3ZDLDZCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSw4QkFBc0IseUJBa0JsQyxDQUFBO0FBRUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLHNCQUE2QixRQUFpQztJQUM3RCxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxrTkFJVDtRQUNELFVBQVUsRUFBRSxzQkFBYztRQUMxQixZQUFZLEVBQUUsUUFBUTtRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULGdCQUFnQixFQUFFO1lBQ2pCLE1BQU0sRUFBRSxHQUFHO1lBQ1gsSUFBSSxFQUFFLEdBQUc7WUFDVCxLQUFLLEVBQUUsR0FBRztTQUNWO1FBQ0QsT0FBTztZQUNOLE1BQU0sQ0FBQztnQkFDTixHQUFHLFlBQUMsS0FBcUIsRUFDdEIsT0FBaUMsRUFDakMsS0FBMEIsRUFDMUIsTUFBOEI7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNuQyxDQUFDO29CQUVELElBQUksTUFBTSxHQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEcsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDUCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLCtCQUErQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVFLENBQUM7Z0JBQ0YsQ0FBQztnQkFDRCxJQUFJLFlBQUMsS0FBcUIsRUFDdkIsT0FBaUMsRUFDakMsS0FBMEIsRUFDMUIsTUFBOEI7b0JBQ2hDLElBQUksU0FBUyxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDNUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDM0MsQ0FBQzthQUNELENBQUM7UUFDSCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUE5Q2Usb0JBQVksZUE4QzNCLENBQUEifQ==