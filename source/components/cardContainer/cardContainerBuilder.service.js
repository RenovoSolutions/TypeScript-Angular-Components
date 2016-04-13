'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __genericSearchFilter = typescript_angular_utilities_1.services.genericSearchFilter;
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
    CardContainerBuilder.prototype.useSearch = function (filter) {
        if (filter == null) {
            var factory = this.$injector.get(__genericSearchFilter.factoryName);
            filter = factory.getInstance();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckJ1aWxkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXJCdWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQWtDLDhCQUE4QixDQUFDLENBQUE7QUFDakUsSUFBTyxxQkFBcUIsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBSTVELElBQVksV0FBVyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFDaEUsSUFBWSxXQUFXLFdBQU0sMENBQTBDLENBQUMsQ0FBQTtBQUN4RSxJQUFZLFlBQVksV0FBTSw0Q0FBNEMsQ0FBQyxDQUFBO0FBQzNFLElBQVksVUFBVSxXQUFNLHdDQUF3QyxDQUFDLENBQUE7QUFDckUsMkNBQXdHLHlEQUF5RCxDQUFDLENBQUE7QUF3QnZKLG1CQUFXLEdBQVcsc0JBQXNCLENBQUM7QUFvRXhEO0lBdUJDLDhCQUFvQixTQUF3QztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3Q0FBUyxHQUFULFVBQVUsTUFBNkI7UUFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxPQUFPLEdBQXNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzVILE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxF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