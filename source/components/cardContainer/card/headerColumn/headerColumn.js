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
//# sourceMappingURL=headerColumn.js.map