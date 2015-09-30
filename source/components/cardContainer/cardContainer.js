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
exports.directiveName = 'rlCardContainer';
exports.controllerName = 'CardContainerController';
exports.defaultMaxColumnSorts = 2;
exports.defaultSelectionTitle = 'Select card';
var CardContainerService = (function () {
    function CardContainerService(cardContainer) {
        this.cardContainer = cardContainer;
        this.pager = cardContainer.pager;
        this.dataSource = cardContainer.dataSource;
        this.filters = cardContainer.filters;
    }
    CardContainerService.prototype.lookupFilter = function (type) {
        return this.filters[type];
    };
    Object.defineProperty(CardContainerService.prototype, "numberSelected", {
        get: function () {
            return this.cardContainer.numberSelected;
        },
        enumerable: true,
        configurable: true
    });
    return CardContainerService;
})();
exports.CardContainerService = CardContainerService;
var CardContainerController = (function () {
    function CardContainerController($scope, $attrs, object, array, dataPagerFactory, parentChild) {
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
                return item.viewData.selected;
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
            $scope.$on('selectionChanged', this.updateSelected);
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
        $scope.containerService = new CardContainerService(this);
    }
    CardContainerController.prototype.sortSelected = function () {
        this.sort(this.selectionColumn);
    };
    CardContainerController.prototype.openCard = function () {
        var behaviors = this.parentChild.getAllChildBehaviors(this.dataSource.dataSet);
        return _.all(_.map(behaviors, function (behavior) { return behavior.close(); }));
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
        this.dataSource.refresh();
    };
    CardContainerController.prototype.selectionChanged = function () {
        this.updateSelected();
        this.$scope.$emit('selectionChanged');
    };
    CardContainerController.prototype.syncFilters = function () {
        if (this.filters != null) {
            // Convert filter array to dictionary if necessary
            if (_.isArray(this.filters)) {
                this.filters = this.array.toDictionary(this.filters, function (filter) { return filter.type; });
            }
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
                this.pager = this.dataPagerFactory.getInstance();
                this.dataSource.pager = this.pager;
            }
        }
        else if (this.dataSource.pager) {
            // If the paging flag is not set and the dataSource has a pager, save a reference here
            this.pager = this.dataSource.pager;
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
    CardContainerController.$inject = ['$scope', '$attrs', __object.serviceName, __array.serviceName, dataSources_module_1.dataPager.factoryName, __parentChild.serviceName];
    return CardContainerController;
})();
exports.CardContainerController = CardContainerController;
cardContainer.$inject = ['$compile'];
function cardContainer($compile) {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: require('./cardContainer.html'),
        controller: exports.controllerName,
        controllerAs: 'cardContainer',
        scope: {},
        bindToController: {
            // summary: The data source for the card container
            // remarks: Can be an array of objects, or an implementation of the data source contract: {
            //     sorts: A list of sorts to apply to the data. Sorts should be in this format: {
            //         column: The name of the column to sort on,
            //         direction: Sort ascending or descending (sortDirection.js)
            //     },
            //     filters: A list of filters to apply to the data source,
            //     pager: A pager that can be optionally used to page the data: {
            //         filter: function(dataSet) {
            //             Takes the data set and filters it down to pages
            //         }
            //     },
            //     refresh: [function] Call to trigger the data source to refresh,
            //     dataSet: Will contain the resulting data provided by the source, after sorts and filters are applied,
            //     count: The number of items available in the data set (used for paging).
            //     loadingDataSet: A boolean indicating if the dataSet is being refreshed / loaded,
            // }
            source: '=',
            // summary: A list of filters to be applied to the data source
            // remarks: Each filter should implement the data filter contract: {
            //     type: A name that can be used to look up the filter,
            //     filter: function(item) { takes an item and returns false if it should be removed from the data set },
            // }
            filters: '=',
            // summary: Turn paging on or off (true / false)
            paging: '=',
            // summary: A list of the columns for building the column header and card headers.
            // remarks: Each column object should be in the following format: {
            //     label: The label for the column header,
            //     description: A description for the column; shown in tooltips,
            //     size: A description of the column size at breakpoints; either a constant int (for constant size) or breakpoint detail object: {
            //         [xs]: optional size for xs breakpoint (defaults to 0),
            //         [sm]: optional size for sm breakpoint (defaults to xs),
            //         [md]: optional size for md breakpoint (defaults to sm),
            //         [lg]: optional size for lg breakpoint (defaults to md),
            //     },
            //     getValue: A function that takes a data record and retrieves the value for the column,
            //     headerTemplateUrl: The path to an HTML template for the column header,
            //     headerTemplate: An HTML template string for the column header (overriden by headerTemplateUrl if present),
            //     templateUrl: The path to an HTML template for the card header,
            //     template: An HTML template string for the card header (overriden by templateUrl if present),
            //     secondarySorts: A set of secondary sorts to apply on other columns when this column is sorted (ascending and / or descending): {
            //        sortDirection.ascending ('asc'):  [
            //             {
            //                 column: The label of another column to sort on,
            //                 direction: The direction to sort the column,
            //             },
            //             ...
            //        ],
            //        sortDirection.descending ('desc'): [
            //             {
            //                 column: The label of another column to sort on,
            //                 direction: The direction to sort the column,
            //             },
            //             ...
            //        ],
            //     }
            // }
            columns: '=',
            // summary: container-wide data available in cards
            containerData: '=',
            // summary: controller shared by all components on a card
            // remarks: this controller cannot override any of the following variable names:
            //          columns
            //          item
            //          contentTemplate
            //          footerTemplate
            //          clickable
            //          cardController
            //          cardControllerAs
            //          cardAs
            //          showContent
            //          toggleContent
            //          collapse
            //          selected
            //          setSelected
            cardController: '@',
            // summary: controller alias specified using controllerAs syntax
            cardControllerAs: '@',
            // summary: name used to access the card data
            cardAs: '@',
            // summary: Indicates if cards should show active state on mouse over
            clickableCards: '=',
            // summary: The number of sorts that can be applied at a time.
            maxColumnSorts: '=',
            permanentFooters: '=',
            // summary: If true, turns on selection for cards via the cardData.viewData.selected property
            selectableCards: '=',
            // summary: Function called with each item. If true is returned selection is disabled for this item.
            //          If function is not defined, selection is enabled for all by default.
            disableSelection: '&',
        },
        link: function (scope, element, attrs, controller, transclude) {
            var headerArea = element.find('.container-header-template');
            var footerArea = element.find('.container-footer-template');
            controller.makeCard = transclude;
            transclude(scope, function (clone) {
                var header = clone.filter('container-header');
                if (header.length === 0) {
                    var defaultHeader = require('./defaultCardContainerHeader.html');
                    header = $compile(defaultHeader)(scope);
                }
                headerArea.append(header);
                var footer = clone.filter('container-footer');
                if (footer.length === 0) {
                    var defaultFooter = require('./defaultCardContainerFooter.html');
                    footer = $compile(defaultFooter)(scope);
                }
                footerArea.append(footer);
            });
        }
    };
}
exports.cardContainer = cardContainer;
//# sourceMappingURL=cardContainer.js.map