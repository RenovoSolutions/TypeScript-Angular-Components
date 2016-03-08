'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.moduleName = 'rl.ui.components.commaList';
exports.directiveName = 'rlCommaList';
exports.controllerName = 'CommaListController';
var CommaListController = (function () {
    function CommaListController(object) {
        this.remainingItems = 0;
        this.list = this.getFirstItems(this.inList);
    }
    CommaListController.prototype.getFirstItems = function (list) {
        var _this = this;
        if (this.transform != null) {
            list = _.map(list, function (item) {
                return __transform.getValue(item, _this.transform);
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
    CommaListController.$inject = [__object.serviceName];
    return CommaListController;
}());
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
            inList: '<list',
            max: '<?',
            transform: '<?',
        },
    };
}
angular.module(exports.moduleName, [__object.moduleName])
    .directive(exports.directiveName, commaList)
    .controller(exports.controllerName, CommaListController);
//# sourceMappingURL=commaList.js.map