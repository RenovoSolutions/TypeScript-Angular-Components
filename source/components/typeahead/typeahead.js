'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __search = typescript_angular_utilities_1.services.search;
var __objectUtility = typescript_angular_utilities_1.services.object;
var __arrayUtility = typescript_angular_utilities_1.services.array;
var __transform = typescript_angular_utilities_1.services.transform.transform;
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
        __parentChild.serviceName,
        __objectUtility.serviceName,
        __arrayUtility.serviceName,
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
    __parentChild.moduleName,
    __objectUtility.moduleName,
    __arrayUtility.moduleName,
    input_1.moduleName
])
    .component(exports.componentName, typeahead)
    .controller(exports.controllerName, TypeaheadController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxhQUFhLEdBQUcsdUNBQVEsQ0FBQyxtQkFBbUIsQ0FBQztBQUNwRCxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLGVBQWUsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUN6QyxJQUFPLGNBQWMsR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUV2QyxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFFbEQsc0JBQXVFLGdCQUFnQixDQUFDLENBQUE7QUFDeEYsMkNBQXlGLDhEQUE4RCxDQUFDLENBQUE7QUFFN0ksa0JBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUNsRCxxQkFBYSxHQUFXLGFBQWEsQ0FBQztBQUN0QyxzQkFBYyxHQUFXLHFCQUFxQixDQUFDO0FBcUYxRDtJQUF5Qyx1Q0FBZTtJQXNEdkQsNkJBQVksTUFBc0IsRUFDdkIsRUFBcUIsRUFDN0IsTUFBdUIsRUFDZixRQUFpQyxFQUNqQyxXQUFzRCxFQUN0RCxNQUFzQyxFQUN0QyxLQUFtQyxFQUMzQyx5QkFBcUQ7UUFDdEQsa0JBQU0sTUFBTSxFQUFPLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBUDdDLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBRXJCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztRQUN0RCxXQUFNLEdBQU4sTUFBTSxDQUFnQztRQUN0QyxVQUFLLEdBQUwsS0FBSyxDQUE4QjtRQTdD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