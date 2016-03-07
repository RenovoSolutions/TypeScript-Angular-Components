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
        this.$scope.$emit('selectionChanged');
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
    CardContainerController.$inject = ['$scope', '$attrs', __object.serviceName, __array.serviceName, dataSources_module_1.dataPager.factoryName, __parentChild.serviceName];
    return CardContainerController;
}());
exports.CardContainerController = CardContainerController;
cardContainer.$inject = ['$compile'];
function cardContainer($compile) {
    'use strict';
    return {
        restrict: 'E',
        transclude: {
            'containerHeaderSlot': '?rlContainerHeader',
            'containerFooterSlot': '?rlContainerFooter',
            'contentSlot': '?rlCardContent',
            'footerSlot': '?rlCardFooter',
        },
        template: require('./cardContainer.html'),
        controller: exports.controllerName,
        controllerAs: 'cardContainer',
        scope: {},
        bindToController: {
            // summary: a builder for the card container
            builder: '=?',
            // summary: controller shared by all components on a card
            // remarks: this controller cannot override any of the following letiable names:
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
        },
        link: function (scope, element, attrs, controller, transclude) {
            var headerArea = element.find('.container-header-template');
            var footerArea = element.find('.container-footer-template');
            controller.makeCard = transclude;
            transclude(scope, function (header) {
                if (header.length === 0) {
                    var defaultHeader = require('./defaultCardContainerHeader.html');
                    header = headerArea.append(defaultHeader);
                    $compile(header)(scope);
                }
                else {
                    headerArea.append(header);
                }
            }, null, 'containerHeaderSlot');
            transclude(scope, function (footer) {
                if (footer.length === 0) {
                    var defaultFooter = require('./defaultCardContainerFooter.html');
                    footer = footerArea.append(defaultFooter);
                    $compile(footer)(scope);
                }
                else {
                    footerArea.append(footer);
                }
            }, null, 'containerFooterSlot');
        }
    };
}
exports.cardContainer = cardContainer;
//# sourceMappingURL=cardContainer.js.map