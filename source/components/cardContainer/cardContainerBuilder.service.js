'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __genericSearchFilter = typescript_angular_utilities_1.services.genericSearchFilter;
var dataSources = require('./dataSources/dataSources.module');
var filterGroup = require('./filters/filterGroup/filterGroup.module');
var selectFilter = require('./filters/selectFilter/selectFilter.module');
var columnSearchFilter_service_1 = require('./filters/columnSearchFilter/columnSearchFilter.service');
exports.factoryName = 'cardContainerBuilder';
var CardContainerBuilder = (function () {
    function CardContainerBuilder($injector) {
        this.$injector = $injector;
        this.dataSource = new DataSourceBuilder($injector, this);
        this.filters = new FilterBuilder($injector, this);
        this._columns = [];
    }
    CardContainerBuilder.prototype.useSearch = function () {
        var factory = this.$injector.get(__genericSearchFilter.factoryName);
        this._searchFilter = factory.getInstance();
        return this._searchFilter;
    };
    CardContainerBuilder.prototype.usePaging = function () {
        this._paging = true;
    };
    CardContainerBuilder.prototype.addColumn = function (column) {
        this._columns.push(column);
    };
    CardContainerBuilder.prototype.useClickableCards = function () {
        this._clickableCards = true;
    };
    CardContainerBuilder.prototype.usePermanentFooters = function () {
        this._permanentFooters = true;
    };
    CardContainerBuilder.prototype.useSelection = function () {
        this._selectableCards = true;
    };
    Object.defineProperty(CardContainerBuilder.prototype, "disableSelection", {
        set: function (value) {
            if (!this._selectableCards) {
                this.useSelection();
            }
            this._disableSelection = value;
        },
        enumerable: true,
        configurable: true
    });
    CardContainerBuilder.prototype.setCardContainerProperties = function (cardContainer) {
        if (this._searchFilter != null) {
            this._filters.push(this._searchFilter);
        }
        cardContainer.source = this._dataSource;
        cardContainer.filters = this._filters;
        cardContainer.paging = this._paging;
        cardContainer.columns = this._columns;
        cardContainer.containerData = this.containerData;
        cardContainer.cardController = this.cardController;
        cardContainer.cardControllerAs = this.cardControllerAs;
        cardContainer.cardAs = this.cardAs;
        cardContainer.clickableCards = this._clickableCards;
        cardContainer.maxColumnSorts = this.maxColumnSorts;
        cardContainer.permanentFooters = this._permanentFooters;
        cardContainer.selectableCards = this._selectableCards;
        cardContainer.disableSelection = this._disableSelection;
    };
    return CardContainerBuilder;
})();
exports.CardContainerBuilder = CardContainerBuilder;
var DataSourceBuilder = (function () {
    function DataSourceBuilder($injector, parent) {
        this.$injector = $injector;
        this.parent = parent;
        var factory = this.$injector.get(dataSources.simpleDataSource.factoryName);
        parent._dataSource = factory.getInstance([]);
    }
    DataSourceBuilder.prototype.buildSimpleDataSource = function (data) {
        var factory = this.$injector.get(dataSources.simpleDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(data);
        return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildDataServiceDataSource = function (getDataSet) {
        var factory = this.$injector.get(dataSources.dataServiceDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(getDataSet);
        return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildServerSearchDataSource = function (getDataSet, getFilterModel, validateModel) {
        if (_.isUndefined(this.parent._searchFilter)) {
            this.parent.useSearch();
        }
        var factory = this.$injector.get(dataSources.serverSearchDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(getDataSet, this.parent._searchFilter, getFilterModel, validateModel);
        return this.parent._dataSource;
    };
    return DataSourceBuilder;
})();
exports.DataSourceBuilder = DataSourceBuilder;
var FilterBuilder = (function () {
    function FilterBuilder($injector, parent) {
        this.$injector = $injector;
        this.parent = parent;
        this.parent._filters = [];
    }
    FilterBuilder.prototype.buildFilterGroup = function (settings) {
        var factory = this.$injector.get(filterGroup.factoryName);
        var filter = factory.getInstance(settings);
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.buildModeFilterGroup = function (settings) {
        var factory = this.$injector.get(filterGroup.modeFilterGroup.factoryName);
        var filter = factory.getInstance(settings);
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.buildRangeFilterGroup = function (settings) {
        var factory = this.$injector.get(filterGroup.rangeFilterGroup.factoryName);
        var filter = factory.getInstance(settings);
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.buildSelectFilter = function (valueSelector) {
        var factory = this.$injector.get(selectFilter.factoryName);
        var filter = factory.getInstance(valueSelector);
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.buildColumnSearchFilter = function () {
        var factory = this.$injector.get(columnSearchFilter_service_1.factoryName);
        var filter = factory.getInstance();
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.addCustomFilter = function (filter) {
        this.parent._filters.push(filter);
    };
    return FilterBuilder;
})();
exports.FilterBuilder = FilterBuilder;
cardContainerBuilderFactory.$inject = ['$injector'];
function cardContainerBuilderFactory($injector) {
    return {
        getInstance: function () {
            return new CardContainerBuilder($injector);
        },
    };
}
exports.cardContainerBuilderFactory = cardContainerBuilderFactory;
//# sourceMappingURL=cardContainerBuilder.service.js.map