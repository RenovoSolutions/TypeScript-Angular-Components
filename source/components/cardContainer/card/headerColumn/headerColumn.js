// /// <reference path='../../../../../typings/jquery/jquery.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
var card_1 = require('../card');
exports.directiveName = 'rlCardHeaderColumn';
exports.controllerName = 'CardHeaderColumnController';
var HeaderColumnController = (function () {
    function HeaderColumnController() {
        var _this = this;
        this.update = function () {
            _this.value = __transform.getValue(_this.item, _this.column.getValue);
        };
    }
    HeaderColumnController.prototype.$onInit = function () {
        this.update();
        this.cardController.refresh.subscribe(this.update);
    };
    return HeaderColumnController;
}());
exports.HeaderColumnController = HeaderColumnController;
headerColumn.$inject = ['$compile'];
function headerColumn($compile) {
    'use strict';
    return {
        restrict: 'E',
        require: { cardController: '^' + card_1.componentName },
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
                pre: function (scope) {
                    var header = scope.header;
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
                post: function (scope, element) {
                    var container = element.find('.template-container');
                    container.append(scope.header.renderedTemplate);
                },
            };
        },
    };
}
exports.headerColumn = headerColumn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVhZGVyQ29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFFQUFxRTtBQUVyRSxZQUFZLENBQUM7QUFJYiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFJbEQscUJBQStELFNBQVMsQ0FBQyxDQUFBO0FBRTlELHFCQUFhLEdBQVcsb0JBQW9CLENBQUM7QUFDN0Msc0JBQWMsR0FBVyw0QkFBNEIsQ0FBQztBQVlqRTtJQUFBO1FBQUEsaUJBa0JDO1FBSFEsV0FBTSxHQUFpQjtZQUM5QixLQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQTtJQUNGLENBQUM7SUFSQSx3Q0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBS0YsNkJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDO0FBbEJZLDhCQUFzQix5QkFrQmxDLENBQUE7QUFFRCxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsc0JBQTZCLFFBQWlDO0lBQzdELFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLEdBQUcsR0FBRyxvQkFBYSxFQUFFO1FBQ2hELFFBQVEsRUFBRSxrTkFJVDtRQUNELFVBQVUsRUFBRSxzQkFBYztRQUMxQixZQUFZLEVBQUUsUUFBUTtRQUN0QixLQUFLLEVBQUUsRUFBRTtRQUNULGdCQUFnQixFQUFFO1lBQ2pCLE1BQU0sRUFBRSxHQUFHO1lBQ1gsSUFBSSxFQUFFLEdBQUc7WUFDVCxLQUFLLEVBQUUsR0FBRztTQUNWO1FBQ0QsT0FBTztZQUNOLE1BQU0sQ0FBQztnQkFDTixHQUFHLFlBQUMsS0FBbUI7b0JBQ3RCLElBQUksTUFBTSxHQUEyQixLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDbkMsQ0FBQztvQkFFRCxJQUFJLE1BQU0sR0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RHLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ1AsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1RSxDQUFDO2dCQUNGLENBQUM7Z0JBQ0QsSUFBSSxZQUFDLEtBQW1CLEVBQ3JCLE9BQWlDO29CQUNuQyxJQUFJLFNBQVMsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQzVELFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2FBQ0QsQ0FBQztRQUNILENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQTNDZSxvQkFBWSxlQTJDM0IsQ0FBQSJ9