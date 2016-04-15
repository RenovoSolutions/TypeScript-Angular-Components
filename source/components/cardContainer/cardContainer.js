// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var _ = require('lodash');
var Rx = require('rx');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __array = typescript_angular_utilities_1.services.array;
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var dataSources_module_1 = require('./dataSources/dataSources.module');
var sorts_module_1 = require('./sorts/sorts.module');
var breakpoint_1 = require('../../services/breakpoints/breakpoint');
exports.componentName = 'rlCardContainer';
exports.controllerName = 'CardContainerController';
exports.defaultMaxColumnSorts = 2;
exports.defaultSelectionTitle = 'Select card';
var CardContainerController = (function () {
    function CardContainerController($scope, $attrs, $transclude, object, array, dataPagerFactory, parentChild) {
        var _this = this;
        this.$scope = $scope;
        this.object = object;
        this.array = array;
        this.dataPagerFactory = dataPagerFactory;
        this.parentChild = parentChild;
        this.numberSelected = 0;
        this.addViewData = function () {
            _.each(_this.dataSource.rawDataSet, function (item) {
                if (_.isUndefined(item.viewData)) {
                    item.viewData = {
                        selected: false,
                    };
                }
            });
            _this.updateDisabledSelections();
        };
        this.clearFilteredSelections = function () {
            var nonVisibleItems = _.difference(_this.dataSource.rawDataSet, _this.dataSource.filteredDataSet);
            _.each(nonVisibleItems, function (item) {
                if (_.isUndefined(item.viewData)) {
                    item.viewData = {
                        selected: false,
                    };
                }
                item.viewData.selected = false;
                item.viewData.selectionTitle = exports.defaultSelectionTitle;
            });
            _this.updateSelected();
        };
        this.updateSelected = function () {
            _this.numberSelected = _.filter(_this.dataSource.filteredDataSet, function (item) {
                return item.viewData != null && item.viewData.selected;
            }).length;
            _this.numberSelectedObservable.onNext(_this.numberSelected);
        };
        this.updateDisabledSelections = function () {
            if (_this.disablingSelections) {
                _.each(_this.dataSource.rawDataSet, function (item) {
                    var disabledReason = _this.disableSelection({ item: item });
                    item.viewData.disabledSelection = (disabledReason != null);
                    item.viewData.selectionTitle = (item.viewData.disabledSelection ? disabledReason : exports.defaultSelectionTitle);
                });
            }
        };
        if (this.builder != null) {
            this.builder.setCardContainerProperties(this);
        }
        this.makeCard = $transclude;
        this.dataSource = this.source;
        this.permanentFooters = _.isUndefined(this.permanentFooters) ? false : this.permanentFooters;
        this.maxColSorts = this.maxColumnSorts != null ? this.maxColumnSorts : exports.defaultMaxColumnSorts;
        this.disablingSelections = object.isNullOrWhitespace($attrs.disableSelection) === false;
        this.sortDirection = sorts_module_1.SortDirection;
        this.numberSelectedObservable = new Rx.Subject();
        this.syncFilters();
        this.setupPaging();
        this.buildColumnSizes();
        if (this.selectableCards) {
            //*use card container event service?
            $scope.$on('updateDisabledSelections', this.updateDisabledSelections);
            this.dataSource.watch(this.addViewData, 'changed');
            this.dataSource.watch(this.clearFilteredSelections, 'redrawing');
            this.addViewData();
            this.selectionColumn = {
                label: null,
                size: null,
                getValue: function (item) {
                    return item.viewData.selected;
                },
                flipSort: true,
            };
        }
        if (this.dataSource.sorts == null) {
            this.dataSource.sorts = [];
        }
        $scope.containerData = this.containerData;
    }
    CardContainerController.prototype.sortSelected = function () {
        this.sort(this.selectionColumn);
    };
    CardContainerController.prototype.openCard = function () {
        var behaviors = this.parentChild.getAllChildBehaviors(this.dataSource.dataSet);
        return _.every(_.map(behaviors, function (behavior) { return behavior.close(); }));
    };
    CardContainerController.prototype.sort = function (column) {
        var sortList = this.dataSource.sorts;
        var firstSort = sortList[0];
        // If column is already the primary sort, change the direction
        if (firstSort != null
            && firstSort.column === column) {
            firstSort.direction = sorts_module_1.SortDirection.toggle(firstSort.direction);
            // Clear sort
            if (firstSort.direction === sorts_module_1.SortDirection.none) {
                this.clearVisualSortIndicator(firstSort);
                firstSort = null;
                // If the column has secondary sorts don't fall back to a
                //  secondary sort, instead just clear all sorts
                if (column.secondarySorts != null) {
                    sortList.length = 0;
                }
                else {
                    sortList.shift();
                }
            }
        }
        else {
            // Else make column primary ascending sort
            // Remove any existing non-primary sorts on column
            this.array.remove(sortList, function (sort) {
                return column === sort.column;
            });
            // Build ascending sort for column
            var newSort = {
                column: column,
                direction: sorts_module_1.SortDirection.ascending,
            };
            sortList.unshift(newSort);
            firstSort = newSort;
        }
        this.updateVisualColumnSorting();
        // If column has secondary sorts, wipe the sort order and just apply the secondary sorts
        if (firstSort != null && column.secondarySorts != null) {
            sortList.length = 0;
            var secondarySorts = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
            sortList.push(firstSort);
            sortList.push.apply(sortList, secondarySorts);
        }
        else {
            // If not using column secondary sorts, limit the maximum number
            //  of sorts applied to the maximum number of sorts
            this.dataSource.sorts = _.take(sortList, this.maxColSorts);
        }
        this.dataSource.onSortChange();
    };
    CardContainerController.prototype.selectionChanged = function () {
        this.updateSelected();
        this.selectionChangedEvent();
    };
    CardContainerController.prototype.syncFilters = function () {
        if (!this.object.isNullOrEmpty(this.filters)) {
            this.dataSource.filters = this.filters;
            this.dataSource.refresh();
        }
        else if (this.dataSource.filters != null) {
            this.filters = this.dataSource.filters;
        }
    };
    CardContainerController.prototype.setupPaging = function () {
        // If paging flag is specified, card container controls pager instance
        if (this.paging != null) {
            if (this.paging === false) {
                this.dataSource.pager = null;
            }
            else {
                this.builder._pager = this.dataPagerFactory.getInstance();
                this.dataSource.pager = this.builder._pager;
            }
        }
        else if (this.dataSource.pager) {
            // If the paging flag is not set and the dataSource has a pager, save a reference here
            this.builder._pager = this.dataSource.pager;
        }
        this.dataSource.initPager();
    };
    CardContainerController.prototype.buildColumnSizes = function () {
        var _this = this;
        _.each(this.columns, function (column) {
            var sizes = column.size;
            if (_.isObject(sizes)) {
                sizes[breakpoint_1.xs] = _this.object.valueOrDefault(sizes[breakpoint_1.xs], 0);
                sizes[breakpoint_1.sm] = _this.object.valueOrDefault(sizes[breakpoint_1.sm], sizes[breakpoint_1.xs]);
                sizes[breakpoint_1.md] = _this.object.valueOrDefault(sizes[breakpoint_1.md], sizes[breakpoint_1.sm]);
                sizes[breakpoint_1.lg] = _this.object.valueOrDefault(sizes[breakpoint_1.lg], sizes[breakpoint_1.md]);
            }
            else {
                column.size = {
                    xs: sizes,
                    sm: sizes,
                    md: sizes,
                    lg: sizes,
                };
            }
        });
    };
    CardContainerController.prototype.lookupColumn = function (label) {
        return _.find(this.columns, function (column) {
            return column.label === label;
        });
    };
    CardContainerController.prototype.buildSecondarySorts = function (direction, secondarySorts) {
        var _this = this;
        var sortList = secondarySorts[sorts_module_1.SortDirection.getFullName(direction)];
        return _.map(sortList, function (sort) {
            return {
                direction: sort.direction,
                column: _this.lookupColumn(sort.column),
            };
        });
    };
    CardContainerController.prototype.updateVisualColumnSorting = function () {
        var _this = this;
        _.each(this.dataSource.sorts, function (sort, index) {
            // Only first sort should have visible direction
            if (index === 0) {
                _this.updateVisualSortIndicator(sort);
            }
            else {
                _this.clearVisualSortIndicator(sort);
            }
        });
    };
    CardContainerController.prototype.updateVisualSortIndicator = function (sort) {
        sort.column.sortDirection = sort.direction;
    };
    CardContainerController.prototype.clearVisualSortIndicator = function (sort) {
        sort.column.sortDirection = null;
    };
    CardContainerController.$inject = ['$scope', '$attrs', '$transclude', __object.serviceName, __array.serviceName, dataSources_module_1.dataPager.factoryName, __parentChild.serviceName];
    return CardContainerController;
}());
exports.CardContainerController = CardContainerController;
exports.cardContainer = {
    transclude: {
        'containerHeaderSlot': '?rlContainerHeader',
        'containerFooterSlot': '?rlContainerFooter',
        'contentSlot': '?rlCardContent',
        'footerSlot': '?rlCardFooter',
    },
    template: require('./cardContainer.html'),
    controller: exports.controllerName,
    controllerAs: 'cardContainer',
    bindings: {
        builder: '=?',
        cardController: '@',
        cardControllerAs: '@',
        cardAs: '@',
        selectionChangedEvent: '&selectionChanged',
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELCtEQUErRDtBQUUvRCxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixJQUFZLEVBQUUsV0FBTSxJQUFJLENBQUMsQ0FBQTtBQUV6Qiw2Q0FBa0MsOEJBQThCLENBQUMsQ0FBQTtBQUNqRSxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBSXBELG1DQUF1QyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRTFFLDZCQUFvRSxzQkFBc0IsQ0FBQyxDQUFBO0FBRTNGLDJCQUErQix1Q0FBdUMsQ0FBQyxDQUFBO0FBSTVELHFCQUFhLEdBQVcsaUJBQWlCLENBQUM7QUFDMUMsc0JBQWMsR0FBVyx5QkFBeUIsQ0FBQztBQUVuRCw2QkFBcUIsR0FBVyxDQUFDLENBQUM7QUFDbEMsNkJBQXFCLEdBQVcsYUFBYSxDQUFDO0FBNkR6RDtJQWlDQyxpQ0FBb0IsTUFBMkIsRUFDM0MsTUFBMkIsRUFDM0IsV0FBd0MsRUFDaEMsTUFBK0IsRUFDL0IsS0FBNEIsRUFDNUIsZ0JBQTZDLEVBQzdDLFdBQXNEO1FBdkNuRSxpQkEwUkM7UUF6UG9CLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBR25DLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBNkI7UUFDN0MsZ0JBQVcsR0FBWCxXQUFXLENBQTJDO1FBZmxFLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBa0xuQixnQkFBVyxHQUFlO1lBQ2pDLENBQUMsQ0FBQyxJ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