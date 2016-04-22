// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __array = typescript_angular_utilities_1.services.array;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var __search = typescript_angular_utilities_1.services.search;
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
        if (this.disableSearching) {
            this.loadCachedItems();
        }
    };
    TypeaheadListController.prototype.$onChanges = function (changes) {
        if (changes.disableSearching && changes.disableSearching.currentValue && !this.cachedItems) {
            this.loadCachedItems();
        }
    };
    TypeaheadListController.prototype.loadItems = function (search) {
        if (this.useClientSearching || this.disableSearching) {
            if (this.cachedItems != null) {
                return this.$q.when(this.cachedItems);
            }
            else {
                return this.$q.when(this.getItems());
            }
        }
        else {
            return this.getItems({ search: search });
        }
    };
    TypeaheadListController.prototype.searchItems = function (search) {
        var _this = this;
        return this.loadItems(search).then(function (items) {
            return _this.filter(items, search);
        });
    };
    TypeaheadListController.prototype.addItem = function (item) {
        var _this = this;
        return this.$q.when(this.add({ item: item })).then(function (newItem) {
            newItem = newItem || item;
            _this.ngModel.$viewValue.push(newItem);
            _this.ngModel.$setDirty();
            if (_this.cachedItems != null) {
                __array.arrayUtility.remove(_this.cachedItems, item);
            }
            _this.model = null;
            return newItem;
        });
    };
    TypeaheadListController.prototype.removeItem = function (item) {
        var _this = this;
        return this.$q.when(this.remove({ item: item })).then(function () {
            __array.arrayUtility.remove(_this.ngModel.$viewValue, item);
            _this.ngModel.$setDirty();
            if (_this.cachedItems != null) {
                _this.cachedItems.push(item);
            }
        });
    };
    TypeaheadListController.prototype.filter = function (list, search) {
        var _this = this;
        var filteredList = _.filter(list, function (item) {
            return !_.find(_this.ngModel.$viewValue, item);
        });
        if (this.useClientSearching) {
            this.cachedItems = filteredList;
            return _.filter(filteredList, function (item) { return __search.searchUtility.tokenizedSearch(item, search); });
        }
        else {
            return filteredList;
        }
    };
    TypeaheadListController.prototype.loadCachedItems = function () {
        var _this = this;
        this.searchItems().then(function (items) {
            _this.cachedItems = items;
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
        disableSearching: '<?',
    },
};
angular.module(exports.moduleName, [__parentChild.moduleName])
    .component(exports.componentName, typeaheadList)
    .controller(exports.controllerName, TypeaheadListController)
    .component(typeaheadItem_1.componentName, typeaheadItem_1.typeaheadItem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVhaGVhZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sYUFBYSxHQUFHLHVDQUFRLENBQUMsbUJBQW1CLENBQUM7QUFDcEQsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFDaEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQ2xELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBR2xDLDhCQUFrRSxpQkFBaUIsQ0FBQyxDQUFBO0FBSXZFLGtCQUFVLEdBQVcsZ0NBQWdDLENBQUM7QUFDdEQscUJBQWEsR0FBVyxpQkFBaUIsQ0FBQztBQUMxQyxzQkFBYyxHQUFXLHlCQUF5QixDQUFDO0FBMEZoRTtJQXFCQyxpQ0FBb0IsTUFBMkIsRUFDcEMsV0FBd0MsRUFDdkMsRUFBcUIsRUFDckIsV0FBc0Q7UUFIOUMsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3ZDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztJQUFJLENBQUM7SUFFdkUseUNBQU8sR0FBUDtRQUFBLGlCQWFDO1FBWkEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBQyxJQUFTO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFB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