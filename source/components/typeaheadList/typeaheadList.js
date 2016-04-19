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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVhaGVhZExpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkRBQTJEO0FBRTNELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sYUFBYSxHQUFHLHVDQUFRLENBQUMsbUJBQW1CLENBQUM7QUFDcEQsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFDaEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBR2xELDhCQUFrRSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXZFLGtCQUFVLEdBQVcsZ0NBQWdDLENBQUM7QUFDdEQscUJBQWEsR0FBVyxpQkFBaUIsQ0FBQztBQUMxQyxzQkFBYyxHQUFXLHlCQUF5QixDQUFDO0FBaUZoRTtJQWtCQyxpQ0FBb0IsTUFBMkIsRUFDcEMsV0FBd0MsRUFDdkMsRUFBcUIsRUFDckIsV0FBc0Q7UUFIOUMsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDcEMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3ZDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztRQVBsRSxrQkFBYSxHQUFrRCxFQUFFLENBQUM7SUFPSSxDQUFDO0lBRXZFLHlDQUFPLEdBQVA7UUFBQSxpQkFVQztRQVRBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLFVBQUMsSUFBUztZQUNsQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVB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