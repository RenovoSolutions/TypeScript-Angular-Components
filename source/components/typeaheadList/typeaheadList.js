// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __array = typescript_angular_utilities_1.services.array;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var typeaheadItem_1 = require('./typeaheadItem');
exports.moduleName = 'rl.ui.components.typeaheadList';
exports.componentName = 'rlTypeaheadList';
exports.controllerName = 'TypeaheadListController';
var TypeaheadListController = (function () {
    function TypeaheadListController($scope, $transclude, $q, parentChild) {
        this.$scope = $scope;
        this.$transclude = $transclude;
        this.$q = $q;
        this.parentChild = parentChild;
        this.typeaheadLink = {};
    }
    TypeaheadListController.prototype.$onInit = function () {
        var _this = this;
        this.$scope.$remove = this.removeItem.bind(this);
        this.$scope.$transform = function (item) {
            return __transform.getValue(item, _this.transform);
        };
        this.$scope.listData = this.listData;
        this.parentChild.registerChildBehavior(this.childLink, {
            add: this.addItem.bind(this),
            remove: this.removeItem.bind(this),
        });
    };
    TypeaheadListController.prototype.loadItems = function (search) {
        var _this = this;
        return this.getItems({ search: search }).then(function (data) {
            return _.filter(data, function (item) {
                return !_.find(_this.ngModel.$viewValue, item);
            });
        });
    };
    TypeaheadListController.prototype.addItem = function (item) {
        var _this = this;
        return this.$q.when(this.add({ item: item })).then(function (newItem) {
            newItem = newItem || item;
            _this.ngModel.$viewValue.push(newItem);
            _this.parentChild.triggerChildBehavior(_this.typeaheadLink, function (behavior) {
                behavior.remove(newItem);
            });
            return newItem;
        });
    };
    TypeaheadListController.prototype.removeItem = function (item) {
        var _this = this;
        return this.$q.when(this.remove({ item: item })).then(function () {
            __array.arrayUtility.remove(_this.ngModel.$viewValue, item);
            _this.parentChild.triggerChildBehavior(_this.typeaheadLink, function (behavior) {
                behavior.add(item);
            });
        });
    };
    TypeaheadListController.$inject = ['$scope', '$transclude', '$q', __parentChild.serviceName];
    return TypeaheadListController;
}());
exports.TypeaheadListController = TypeaheadListController;
var typeaheadList = {
    require: { ngModel: 'ngModel' },
    transclude: {
        headerSlot: '?rlListHeader',
        listItemSlot: '?rlListItem',
    },
    template: require('./typeaheadList.html'),
    controller: exports.controllerName,
    controllerAs: 'list',
    bindings: {
        getItems: '&',
        add: '&',
        remove: '&',
        transform: '<?',
        label: '@',
        prefix: '@',
        useClientSearching: '<?',
        ngDisabled: '<?',
        itemAs: '@',
        childLink: '=?',
        listData: '<?',
    },
};
angular.module(exports.moduleName, [__parentChild.moduleName])
    .component(exports.componentName, typeaheadList)
    .controller(exports.controllerName, TypeaheadListController)
    .component(typeaheadItem_1.componentName, typeaheadItem_1.typeaheadItem);
//# sourceMappingURL=typeaheadList.js.map