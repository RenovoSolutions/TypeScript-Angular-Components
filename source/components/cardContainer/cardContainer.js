// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var _ = require('lodash');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELCtEQUErRDtBQUUvRCxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBa0MsOEJBQThCLENBQUMsQ0FBQTtBQUNqRSxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBSXBELG1DQUF1QyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRTFFLDZCQUFvRSxzQkFBc0IsQ0FBQyxDQUFBO0FBRTNGLDJCQUErQix1Q0FBdUMsQ0FBQyxDQUFBO0FBSTVELHFCQUFhLEdBQVcsaUJBQWlCLENBQUM7QUFDMUMsc0JBQWMsR0FBVyx5QkFBeUIsQ0FBQztBQUVuRCw2QkFBcUIsR0FBVyxDQUFDLENBQUM7QUFDbEMsNkJBQXFCLEdBQVcsYUFBYSxDQUFDO0FBd0R6RDtJQStCQyxpQ0FBb0IsTUFBMkIsRUFDM0MsTUFBMkIsRUFDM0IsV0FBd0MsRUFDaEMsTUFBK0IsRUFDL0IsS0FBNEIsRUFDNUIsZ0JBQTZDLEVBQzdDLFdBQXNEO1FBckNuRSxpQkFxUkM7UUF0UG9CLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBR25DLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBNkI7UUFDN0MsZ0JBQVcsR0FBWCxXQUFXLENBQTJDO1FBZGxFLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBK0tuQixnQkFBVyxHQUFlO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVB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
