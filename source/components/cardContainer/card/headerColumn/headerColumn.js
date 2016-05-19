// /// <reference path='../../../../../typings/jquery/jquery.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyQ29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVhZGVyQ29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFFQUFxRTs7QUFJckUsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBSWxELHFCQUErRCxTQUFTLENBQUMsQ0FBQTtBQUU5RCxxQkFBYSxHQUFXLG9CQUFvQixDQUFDO0FBQzdDLHNCQUFjLEdBQVcsNEJBQTRCLENBQUM7QUFZakU7SUFBQTtRQUFBLGlCQWtCQztRQUhRLFdBQU0sR0FBaUI7WUFDOUIsS0FBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUE7SUFDRixDQUFDO0lBUkEsd0NBQU8sR0FBUDtRQUNDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUtGLDZCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSw4QkFBc0IseUJBa0JsQyxDQUFBO0FBRUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLHNCQUE2QixRQUFpQztJQUM3RCxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUcsb0JBQWEsRUFBRTtRQUNoRCxRQUFRLEVBQUUsa05BSVQ7UUFDRCxVQUFVLEVBQUUsc0JBQWM7UUFDMUIsWUFBWSxFQUFFLFFBQVE7UUFDdEIsS0FBSyxFQUFFLEVBQUU7UUFDVCxnQkFBZ0IsRUFBRTtZQUNqQixNQUFNLEVBQUUsR0FBRztZQUNYLElBQUksRUFBRSxHQUFHO1lBQ1QsS0FBSyxFQUFFLEdBQUc7U0FDVjtRQUNELE9BQU87WUFDTixNQUFNLENBQUM7Z0JBQ04sR0FBRyxZQUFDLEtBQW1CO29CQUN0QixJQUFJLE1BQU0sR0FBMkIsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ25DLENBQUM7b0JBRUQsSUFBSSxNQUFNLEdBQWlCLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsK0JBQStCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztnQkFDRixDQUFDO2dCQUNELElBQUksWUFBQyxLQUFtQixFQUNyQixPQUFpQztvQkFDbkMsSUFBSSxTQUFTLEdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUM1RCxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDakQsQ0FBQzthQUNELENBQUM7UUFDSCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUEzQ2Usb0JBQVksZUEyQzNCLENBQUEifQ==