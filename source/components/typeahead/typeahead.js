'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __genericSearch = typescript_angular_utilities_1.services.genericSearchFilter;
var __objectUtility = typescript_angular_utilities_1.services.object;
var __arrayUtility = typescript_angular_utilities_1.services.array;
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.typeahead';
exports.componentName = 'rlTypeahead';
exports.controllerName = 'TypeaheadController';
var TypeaheadController = (function () {
    function TypeaheadController($scope, $q, $attrs, $timeout, parentChild, genericSearchFactory, object, array, componentValidatorFactory) {
        this.$scope = $scope;
        this.$q = $q;
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.parentChild = parentChild;
        this.genericSearchFactory = genericSearchFactory;
        this.object = object;
        this.array = array;
        this.componentValidatorFactory = componentValidatorFactory;
        this.loading = false;
        this.collapsed = false;
        this.hasSearchOption = false;
        this._searchOption = {
            __isSearchOption: true,
        };
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
        this.searchFilter = this.genericSearchFactory.getInstance();
        this.loadDelay = this.useClientSearching ? 100 : 500;
        this.prefix = this.prefix || 'Search for';
        this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';
        this.collapseOnSelect = this.allowCollapse || this.object.isNullOrEmpty(this.$attrs.select);
        this.allowCustomOption = !this.object.isNullOrEmpty(this.$attrs.create);
        this.$timeout(function () {
            if (_this.collapseOnSelect && !_this.object.isNullOrEmpty(_this.ngModel.$viewValue)) {
                _this.collapsed = true;
            }
        });
        if (!_.isUndefined(this.validator)) {
            this.typeaheadValidator = this.componentValidatorFactory.getInstance({
                ngModel: this.ngModel,
                $scope: this.$scope,
                validators: [this.validator],
            });
        }
        this.parentChild.registerChildBehavior(this.childLink, {
            add: this.addItem.bind(this),
            remove: this.removeItem.bind(this),
        });
    };
    TypeaheadController.prototype.getDisplayName = function (item) {
        if (item == null) {
            return null;
        }
        if (item.__isSearchOption) {
            return item.text;
        }
        if (this.transform == null) {
            return item;
        }
        return _.isFunction(this.transform)
            ? this.transform(item)
            : item[this.transform];
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
            this.searchFilter.searchText = search;
            if (this.cachedItems != null) {
                this.visibleItems = this.filter(this.cachedItems);
                return this.$q.when();
            }
            else {
                return this.$q.when(this.getItems()).then(function (items) {
                    _this.cachedItems = items;
                    _this.visibleItems = _this.filter(items);
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
    TypeaheadController.prototype.filter = function (list) {
        var _this = this;
        return _.filter(list, function (item) { return _this.searchFilter.filter(item); });
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
        __genericSearch.factoryName,
        __objectUtility.serviceName,
        __arrayUtility.serviceName,
        componentValidator_service_1.factoryName];
    return TypeaheadController;
})();
exports.TypeaheadController = TypeaheadController;
var typeahead = {
    require: { ngModel: 'ngModel' },
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
        label: '@',
        prefix: '@',
        useClientSearching: '<?',
        ngDisabled: '<?',
        validator: '<?',
    },
};
angular.module(exports.moduleName, [
    __parentChild.moduleName,
    __genericSearch.moduleName,
    __objectUtility.moduleName,
    __arrayUtility.moduleName,
    componentValidator_service_1.moduleName
])
    .component(exports.componentName, typeahead)
    .controller(exports.controllerName, TypeaheadController);
//# sourceMappingURL=typeahead.js.map