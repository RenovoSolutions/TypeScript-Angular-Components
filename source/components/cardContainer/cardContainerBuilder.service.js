"use strict";
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var dataSources = require('./dataSources/dataSources.module');
var filterGroup = require('./filters/filterGroup/filterGroup.module');
var selectFilter = require('./filters/selectFilter/selectFilter.module');
var dateFilter = require('./filters/dateFilter/dateFilter.module');
var columnSearchFilter_service_1 = require('./filters/columnSearchFilter/columnSearchFilter.service');
exports.factoryName = 'cardContainerBuilder';
var CardContainerBuilder = (function () {
    function CardContainerBuilder($injector) {
        this.$injector = $injector;
        this.dataSource = new DataSourceBuilder($injector, this);
        this.filters = new FilterBuilder($injector, this);
        this._columns = [];
    }
    CardContainerBuilder.prototype.useSearch = function (tokenized) {
        var factory = this.$injector.get(typescript_angular_utilities_1.downgrade.genericSearchFilterServiceName);
        this._searchFilter = factory.getInstance(tokenized);
        return this._searchFilter;
    };
    CardContainerBuilder.prototype.searchFilter = function (filter) {
        this._searchFilter = filter;
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
    CardContainerBuilder.prototype.renderFilters = function () {
        this._renderFilters = true;
    };
    CardContainerBuilder.prototype.saveWhenInvalid = function () {
        this._saveWhenInvalid = true;
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
        cardContainer.searchFilter = this._searchFilter;
        cardContainer.paging = this._paging;
        cardContainer.columns = this._columns;
        cardContainer.containerData = this.containerData;
        cardContainer.clickableCards = this._clickableCards;
        cardContainer.maxColumnSorts = this.maxColumnSorts;
        cardContainer.permanentFooters = this._permanentFooters;
        cardContainer.selectableCards = this._selectableCards;
        cardContainer.disableSelection = this._disableSelection;
        cardContainer.renderFilters = this._renderFilters;
        cardContainer.saveWhenInvalid = this._saveWhenInvalid;
        if (cardContainer.cardController == null) {
            cardContainer.cardController = this.cardController;
        }
        if (cardContainer.cardControllerAs == null) {
            cardContainer.cardControllerAs = this.cardControllerAs;
        }
        if (cardContainer.cardAs == null) {
            cardContainer.cardAs = this.cardAs;
        }
    };
    return CardContainerBuilder;
}());
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
    DataSourceBuilder.prototype.buildClientServerDataSource = function (getDataSet, getFilterModel, validateModel) {
        if (_.isUndefined(this.parent._searchFilter)) {
            this.parent.useSearch();
        }
        var factory = this.$injector.get(dataSources.clientServerDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(getDataSet, this.parent._searchFilter, getFilterModel, validateModel);
        return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildServerSideDataSource = function (getDataSet) {
        var factory = this.$injector.get(dataSources.serverSideDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(getDataSet);
        return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildSmartDataSource = function (getDataSet) {
        var factory = this.$injector.get(dataSources.smartDataSource.factoryName);
        this.parent._dataSource = factory.getInstance(getDataSet);
        return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildCustomDataSource = function (dataSource) {
        this.parent._dataSource = dataSource;
        return this.parent._dataSource;
    };
    return DataSourceBuilder;
}());
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
    FilterBuilder.prototype.buildSelectFilter = function (settings) {
        var factory = this.$injector.get(selectFilter.factoryName);
        var filter = factory.getInstance(settings);
        this.parent._filters.push(filter);
        return filter;
    };
    FilterBuilder.prototype.buildDateFilter = function (settings) {
        var factory = this.$injector.get(dateFilter.factoryName);
        var filter = factory.getInstance(settings);
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
}());
exports.FilterBuilder = FilterBuilder;
cardContainerBuilderFactory.$inject = ['$injector'];
function cardContainerBuilderFactory($injector) {
    return {
        useMock: false,
        getInstance: function () {
            return this.useMock ? this.mockBuilder : new CardContainerBuilder($injector);
        },
        mockBuilder: new CardContainerBuilder($injector),
    };
}
exports.cardContainerBuilderFactory = cardContainerBuilderFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXJCdWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUE2Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBSzVFLElBQVksV0FBVyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFDaEUsSUFBWSxXQUFXLFdBQU0sMENBQTBDLENBQUMsQ0FBQTtBQUN4RSxJQUFZLFlBQVksV0FBTSw0Q0FBNEMsQ0FBQyxDQUFBO0FBQzNFLElBQVksVUFBVSxXQUFNLHdDQUF3QyxDQUFDLENBQUE7QUFDckUsMkNBQXdHLHlEQUF5RCxDQUFDLENBQUE7QUF3QnZKLG1CQUFXLEdBQVcsc0JBQXNCLENBQUM7QUFxRXhEO0lBdUJDLDhCQUFvQixTQUF3QztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsU0FBbUI7UUFDNUIsSUFBSSxPQUFPLEdBQXNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFNLHdDQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNuSSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0IsQ0FBQztJQUVELDJDQUFZLEdBQVosVUFBYSxNQUE0QjtRQUN4QyxJ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