'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __genericSearch = typescript_angular_utilities_1.services.genericSearchFilter;
var __objectUtility = typescript_angular_utilities_1.services.object;
var __arrayUtility = typescript_angular_utilities_1.services.array;
var __promiseUtility = typescript_angular_utilities_1.services.promise;
exports.moduleName = 'rl.ui.components.typeahead';
exports.directiveName = 'rlTypeahead';
exports.controllerName = 'TypeaheadController';
var TypeaheadController = (function () {
    function TypeaheadController($scope, $attrs, $q, parentChild, genericSearchFactory, object, array, promise) {
        var _this = this;
        this.$scope = $scope;
        this.$q = $q;
        this.parentChild = parentChild;
        this.array = array;
        this.promise = promise;
        this.loading = false;
        this.addItem = function (item) {
            if (_this.cachedItems != null) {
                _this.cachedItems.push(item);
            }
        };
        this.removeItem = function (item) {
            if (_this.cachedItems != null) {
                _this.array.remove(_this.cachedItems, item);
            }
        };
        this.searchFilter = genericSearchFactory.getInstance();
        this.loadDelay = this.useClientSearching ? 100 : 500;
        this.selection = this.selectionBinding;
        if (this.hasSelection == null) {
            this.hasSelection = false;
        }
        if (this.placeholder == null) {
            this.placeholder = 'Search';
        }
        if (this.showSearch == null) {
            this.showSearch = true;
        }
        this.useScopeSelection = object.isNullOrEmpty($attrs.selection) === false;
        this.hasTransform = object.isNullOrEmpty($attrs.transform) === false;
        this.useApply = object.isNullOrEmpty($attrs.apply) === false;
        this.parentChild.registerChildBehavior(this.childLink, {
            add: this.addItem,
            remove: this.removeItem,
        });
        $scope.$watch(function () { return _this.selection; }, function (value) {
            _this.hasSelection = _.isObject(value);
            _this.setSelection(value);
        });
        $scope.$watch(function () { return _this.selectionBinding; }, function (value) {
            if (value == null) {
                _this.selection = null;
            }
        });
    }
    TypeaheadController.prototype.setSelection = function (object) {
        if (this.hasSelection != null) {
            this.hasSelection = this.hasSelection;
        }
        if (this.useScopeSelection) {
            this.selection = object;
        }
        if (_.isFunction(this.select)) {
            this.select({ value: object, hasSelection: this.hasSelection });
        }
    };
    TypeaheadController.prototype.transform = function (object) {
        if (this.hasTransform && object != null) {
            return this.transformInParent({
                value: object,
            });
        }
        return object;
    };
    TypeaheadController.prototype.getItems = function (search) {
        var _this = this;
        if (!this.useClientSearching) {
            return this.getItemsInParent({
                search: search,
            });
        }
        else {
            this.searchFilter.searchText = search;
            if (this.cachedItems != null) {
                return this.$q.when(this.filter(this.cachedItems));
            }
            else {
                return this.$q.when(this.getItemsInParent()).then(function (data) {
                    _this.cachedItems = data;
                    return _this.filter(data);
                });
            }
        }
    };
    TypeaheadController.prototype.applyItem = function () {
        var _this = this;
        if (this.useApply && this.hasSelection) {
            var request = this.apply({ value: this.selection });
            if (this.promise.isPromise(request)) {
                return request.then(function () {
                    _this.removeItem(_this.selection);
                    _this.selection = null;
                });
            }
            else if (!_.isUndefined(request)) {
                this.removeItem(this.selection);
                this.selection = null;
            }
        }
        return this.$q.when();
    };
    TypeaheadController.prototype.filter = function (list) {
        var _this = this;
        return _.filter(list, function (item) { return _this.searchFilter.filter(item); });
    };
    TypeaheadController.$inject = ['$scope',
        '$attrs',
        '$q',
        __parentChild.serviceName,
        __genericSearch.factoryName,
        __objectUtility.serviceName,
        __arrayUtility.serviceName,
        __promiseUtility.serviceName];
    return TypeaheadController;
})();
exports.TypeaheadController = TypeaheadController;
function typeahead() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./typeahead.html'),
        controller: exports.controllerName,
        controllerAs: 'typeahead',
        scope: {},
        bindToController: {
            childLink: '=',
            selectionBinding: '=selection',
            hasSelection: '=',
            select: '&',
            transformInParent: '&transform',
            getItemsInParent: '&getItems',
            placeholder: '@',
            useClientSearching: '=',
            hasError: '=',
            showSearch: '=',
            apply: '&',
        },
    };
}
exports.typeahead = typeahead;
angular.module(exports.moduleName, [
    __parentChild.moduleName,
    __genericSearch.moduleName,
    __objectUtility.moduleName,
    __arrayUtility.moduleName,
    __promiseUtility.moduleName])
    .directive(exports.directiveName, typeahead)
    .controller(exports.controllerName, TypeaheadController);
//# sourceMappingURL=typeahead.js.map