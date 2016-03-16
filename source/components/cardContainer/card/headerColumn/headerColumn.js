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
        template: "\n\t\t\t<div rl-size-for-breakpoints=\"header.column.size\" title=\"{{::header.column.description}}\">\n\t\t\t\t<div class=\"template-container\"></div>\n\t\t\t</div>\n\t\t",
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
//# sourceMappingURL=headerColumn.js.map