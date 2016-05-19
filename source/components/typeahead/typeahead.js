"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __search = typescript_angular_utilities_1.services.search;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var parentChild_service_1 = require('../../services/parentChild/parentChild.service');
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.typeahead';
exports.componentName = 'rlTypeahead';
exports.controllerName = 'TypeaheadController';
var TypeaheadController = (function (_super) {
    __extends(TypeaheadController, _super);
    function TypeaheadController($scope, $q, $attrs, $timeout, parentChild, object, array, componentValidatorFactory) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$q = $q;
        this.$timeout = $timeout;
        this.parentChild = parentChild;
        this.object = object;
        this.array = array;
        this.loading = false;
        this.collapsed = false;
        this.hasSearchOption = false;
        this._searchOption = {
            __isSearchOption: true,
        };
        this.inputType = 'typeahead';
    }
    Object.defineProperty(TypeaheadController.prototype, "selection", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            if (value != null) {
                if (value.__isSearchOption) {
                    value = this.create({ value: value.text });
                }
                this.select({ value: value });
                if (this.collapseOnSelect) {
                    this.collapsed = true;
                    this.ngModel.$setViewValue(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadController.prototype.$onInit = function () {
        var _this = this;
        _super.prototype.$onInit.call(this);
        this.loadDelay = this.useClientSearching ? 100 : 500;
        this.prefix = this.prefix || 'Search for';
        this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';
        var $attrs = this.$attrs;
        this.collapseOnSelect = this.allowCollapse || this.object.isNullOrEmpty($attrs.select);
        this.allowCustomOption = !this.object.isNullOrEmpty($attrs.create);
        this.$timeout(function () {
            if (_this.collapseOnSelect && !_this.object.isNullOrEmpty(_this.ngModel.$viewValue)) {
                _this.collapsed = true;
            }
        });
        this.parentChild.registerChildBehavior(this.childLink, {
            add: this.addItem.bind(this),
            remove: this.removeItem.bind(this),
        });
        this.$scope.$watch(function () { return _this.ngModel.$viewValue; }, function (value) {
            if (value != null && _this.collapseOnSelect) {
                _this.collapsed = true;
            }
        });
    };
    TypeaheadController.prototype.getDisplayName = function (item) {
        if (item != null && item.__isSearchOption) {
            return item.text;
        }
        return __transform.getValue(item, this.transform);
    };
    TypeaheadController.prototype.refresh = function (search) {
        var _this = this;
        if (this.object.isNullOrEmpty(search)) {
            this.visibleItems = [];
            return null;
        }
        this.loading = true;
        return this.loadItems(search).then(function () {
            _this.loading = false;
            _this._searchOption.text = search;
            if (_this.showCustomSearch(search)) {
                _this.hasSearchOption = true;
                _this.visibleItems.unshift(_this._searchOption);
            }
        });
    };
    TypeaheadController.prototype.loadItems = function (search) {
        var _this = this;
        if (!this.useClientSearching) {
            return this.$q.when(this.getItems({
                search: search,
            })).then(function (items) {
                _this.visibleItems = items;
            });
        }
        else {
            if (this.cachedItems != null) {
                this.visibleItems = this.filter(this.cachedItems, search);
                return this.$q.when();
            }
            else {
                return this.$q.when(this.getItems()).then(function (items) {
                    _this.cachedItems = items;
                    _this.visibleItems = _this.filter(items, search);
                });
            }
        }
    };
    TypeaheadController.prototype.clear = function () {
        this.ngModel.$setViewValue(null);
        this.collapsed = false;
    };
    TypeaheadController.prototype.showCustomSearch = function (search) {
        var _this = this;
        return this.allowCustomOption
            && !this.hasSearchOption
            && !_.find(this.visibleItems, function (item) {
                return _this.getDisplayName(item) === search;
            });
    };
    TypeaheadController.prototype.filter = function (list, search) {
        return _.filter(list, function (item) { return __search.searchUtility.tokenizedSearch(item, search); });
    };
    TypeaheadController.prototype.addItem = function (item) {
        if (this.cachedItems != null) {
            this.cachedItems.push(item);
        }
    };
    TypeaheadController.prototype.removeItem = function (item) {
        if (this.cachedItems != null) {
            this.array.remove(this.cachedItems, item);
        }
    };
    TypeaheadController.$inject = ['$scope',
        '$q',
        '$attrs',
        '$timeout',
        parentChild_service_1.serviceName,
        typescript_angular_utilities_1.downgrade.objectServiceName,
        typescript_angular_utilities_1.downgrade.arrayServiceName,
        componentValidator_service_1.factoryName];
    return TypeaheadController;
}(input_1.InputController));
exports.TypeaheadController = TypeaheadController;
var typeahead = input_1.buildInput({
    template: require('./typeahead.html'),
    controller: exports.controllerName,
    controllerAs: 'typeahead',
    bindings: {
        childLink: '=?',
        select: '&',
        create: '&',
        allowCollapse: '<?',
        transform: '<?',
        getItems: '&',
        prefix: '@',
        useClientSearching: '<?',
        ngDisabled: '<?',
    },
});
angular.module(exports.moduleName, [
    parentChild_service_1.moduleName,
    typescript_angular_utilities_1.downgrade.moduleName,
    input_1.moduleName
])
    .component(exports.componentName, typeahead)
    .controller(exports.controllerName, TypeaheadController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ25FLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBSWxDLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUVsRCxvQ0FBNEgsZ0RBQWdELENBQUMsQ0FBQTtBQUU3SyxzQkFBdUUsZ0JBQWdCLENBQUMsQ0FBQTtBQUN4RiwyQ0FBeUYsOERBQThELENBQUMsQ0FBQTtBQUUzSSxrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBQ2xELHFCQUFhLEdBQVcsYUFBYSxDQUFDO0FBQ3RDLHNCQUFjLEdBQVcscUJBQXFCLENBQUM7QUFxRjVEO0lBQXlDLHVDQUFlO0lBc0R2RCw2QkFBWSxNQUFzQixFQUN2QixFQUFxQixFQUM3QixNQUF1QixFQUNmLFFBQWlDLEVBQ2pDLFdBQXdDLEVBQ3hDLE1BQXNDLEVBQ3RDLEtBQW1DLEVBQzNDLHlCQUFxRDtRQUN0RCxrQkFBTSxNQUFNLEVBQU8sTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFQN0MsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFFckIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsZ0JBQVcsR0FBWCxXQUFXLENBQTZCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQWdDO1FBQ3RDLFVBQUssR0FBTCxLQUFLLENBQThCO1FBN0M5QyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBS3pCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFxQmpDLGtCQUFhLEdBQVE7WUFDcEIsZ0JBQWdCLEVBQUUs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