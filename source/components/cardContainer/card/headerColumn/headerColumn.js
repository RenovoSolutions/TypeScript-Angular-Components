// /// <reference path='../../../../../typings/jquery/jquery.d.ts' />
'use strict';
exports.directiveName = 'rlCardHeaderColumn';
exports.controllerName = 'CardHeaderColumnController';
var HeaderColumnController = (function () {
    function HeaderColumnController($scope) {
        var _this = this;
        this.$scope = $scope;
        this.update = function () {
            _this.value = _this.column.getValue(_this.item);
        };
        this.update();
        $scope.$on('card.refresh', this.update); //*event?
    }
    HeaderColumnController.$inject = ['$scope'];
    return HeaderColumnController;
})();
exports.HeaderColumnController = HeaderColumnController;
headerColumn.$inject = ['$compile'];
function headerColumn($compile) {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div rl-size-for-breakpoints=\"header.column.size\" title=\"{{::header.column.description}}\">\n\t\t\t\t<div class=\"template-container\" style=\"display: inline-block\"></div>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'header',
        scope: {},
        bindToController: {
            column: '=',
            item: '=',
        },
        compile: function () {
            return {
                pre: function (scope, element, attrs, header) {
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