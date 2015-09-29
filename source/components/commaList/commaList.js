'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.ui.components.commaList';
exports.directiveName = 'rlCommaList';
exports.controllerName = 'CommaListController';
var CommaListController = (function () {
    function CommaListController($attrs, object) {
        this.remainingItems = 0;
        this.hasTransform = object.isNullOrWhitespace($attrs.transform) === false;
        this.list = this.getFirstItems(this.inList);
    }
    CommaListController.prototype.getFirstItems = function (list) {
        var _this = this;
        if (this.hasTransform) {
            list = _.map(list, function (item) {
                return _this.transform({ item: item });
            });
        }
        ;
        var newList;
        if (this.max != null) {
            newList = _.take(list, this.max);
            this.remainingItems = list.length - this.max;
        }
        else {
            newList = _.clone(list);
        }
        return newList;
    };
    CommaListController.$inject = ['$attrs', __object.serviceName];
    return CommaListController;
})();
exports.CommaListController = CommaListController;
function commaList() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<span>\n\t\t\t\t<span ng-repeat=\"item in commaList.list track by $index\">\n\t\t\t\t\t<span>{{item}}</span><span ng-hide=\"$last\">, </span>\n\t\t\t\t</span>\n\t\t\t\t<span ng-show=\"commaList.remainingItems > 0\">... {{commaList.remainingItems}} more items</span>\n\t\t\t</span>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'commaList',
        scope: {},
        bindToController: {
            inList: '=list',
            max: '=',
            transform: '&',
        },
    };
}
angular.module(exports.moduleName, [__object.moduleName])
    .directive(exports.directiveName, commaList)
    .controller(exports.controllerName, CommaListController);
//# sourceMappingURL=commaList.js.map