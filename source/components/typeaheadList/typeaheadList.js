// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var __search = typescript_angular_utilities_1.services.search;
var parentChild_service_1 = require('../../services/parentChild/parentChild.service');
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
    TypeaheadListController.$inject = ['$scope', '$transclude', '$q', parentChild_service_1.serviceName];
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
angular.module(exports.moduleName, [parentChild_service_1.moduleName])
    .component(exports.componentName, typeaheadList)
    .controller(exports.controllerName, TypeaheadListController)
    .component(typeaheadItem_1.componentName, typeaheadItem_1.typeaheadItem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVhaGVhZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNsRCxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUVsQyxvQ0FBNEgsZ0RBQWdELENBQUMsQ0FBQTtBQUc3Syw4QkFBa0UsaUJBQWlCLENBQUMsQ0FBQTtBQUl2RSxrQkFBVSxHQUFXLGdDQUFnQyxDQUFDO0FBQ3RELHFCQUFhLEdBQVcsaUJBQWlCLENBQUM7QUFDMUMsc0JBQWMsR0FBVyx5QkFBeUIsQ0FBQztBQTBGaEU7SUFxQkMsaUNBQW9CLE1BQTJCLEVBQ3BDLFdBQXdDLEVBQ3ZDLEVBQXFCLEVBQ3JCLFdBQXdDO1FBSGhDLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQ3BDLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQUN2QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7SUFBSSxDQUFDO0lBRXpELHlDQUFPLEdBQVA7UUFBQSxpQkFhQztRQVpBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQUMsSUFBUztZQUNsQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVB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