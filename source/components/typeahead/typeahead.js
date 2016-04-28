'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFDbkUsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFJbEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBRWxELG9DQUE0SCxnREFBZ0QsQ0FBQyxDQUFBO0FBRTdLLHNCQUF1RSxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hGLDJDQUF5Riw4REFBOEQsQ0FBQyxDQUFBO0FBRTNJLGtCQUFVLEdBQVcsNEJBQTRCLENBQUM7QUFDbEQscUJBQWEsR0FBVyxhQUFhLENBQUM7QUFDdEMsc0JBQWMsR0FBVyxxQkFBcUIsQ0FBQztBQXFGNUQ7SUFBeUMsdUNBQWU7SUFzRHZELDZCQUFZLE1BQXNCLEVBQ3ZCLEVBQXFCLEVBQzdCLE1BQXVCLEVBQ2YsUUFBaUMsRUFDakMsV0FBd0MsRUFDeEMsTUFBc0MsRUFDdEMsS0FBbUMsRUFDM0MseUJBQXFEO1FBQ3RELGtCQUFNLE1BQU0sRUFBTyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQVA3QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUVyQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0M7UUFDdEMsVUFBSyxHQUFMLEtBQUssQ0FBOEI7UUE3QzlDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFLekIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQXFCakMsa0JBQWEsR0FBUTtZQUNw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