'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var events = require('./dataSourceEvents');
var DataSourceBase = (function () {
    function DataSourceBase(observableFactory, dataSourceProcessor, array) {
        this.dataSourceProcessor = dataSourceProcessor;
        this.array = array;
        this.sorts = [];
        this.filters = [];
        this.count = 0;
        this.countFilterGroups = false;
        this.loadingDataSet = false;
        this.observable = observableFactory.getInstance();
        this.observable.allowableEvents = events.all;
    }
    DataSourceBase.prototype.watch = function (action, event) {
        return this.observable.register(action, event);
    };
    Object.defineProperty(DataSourceBase.prototype, "needsRefinedSearch", {
        get: function () {
            var noItemsDisplayed = __object.objectUtility.isNullOrEmpty(this.dataSet);
            var moreItemsOnServer = this._isEmpty === false || (this.rawDataSet != null && this.rawDataSet.length < this.count);
            return noItemsDisplayed && moreItemsOnServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceBase.prototype, "isEmpty", {
        get: function () {
            return __object.objectUtility.isNullOrEmpty(this.rawDataSet)
                && (this._isEmpty != null ? this._isEmpty : true);
        },
        set: function (value) {
            this._isEmpty = value;
        },
        enumerable: true,
        configurable: true
    });
    DataSourceBase.prototype.processData = function () {
        var processedData;
        if (this.countFilterGroups) {
            processedData = this.dataSourceProcessor.processAndCount(this.sorts, this.filters, this.pager, this.rawDataSet);
        }
        else {
            processedData = this.dataSourceProcessor.process(this.sorts, this.filters, this.pager, this.rawDataSet);
        }
        this.setProcessedData(processedData);
    };
    //used when we need to process data but without client filters.
    DataSourceBase.prototype.processDataNoClientFilters = function () {
        var processedData;
        if (this.countFilterGroups) {
            processedData = this.dataSourceProcessor.processAndCount(this.sorts, null, this.pager, this.rawDataSet);
        }
        else {
            processedData = this.dataSourceProcessor.process(this.sorts, null, this.pager, this.rawDataSet);
        }
        this.setProcessedData(processedData);
    };
    DataSourceBase.prototype.setProcessedData = function (processedData) {
        this.count = processedData.count;
        this.dataSet = processedData.dataSet;
        this.filteredDataSet = processedData.filteredDataSet;
    };
    DataSourceBase.prototype.onSortChange = function () {
        if (!this.loadingDataSet) {
            this.filteredDataSet = this.dataSourceProcessor.sort(this.filteredDataSet, this.sorts);
            this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
            this.observable.fire(events.redrawing);
        }
    };
    DataSourceBase.prototype.onPagingChange = function () {
        if (!this.loadingDataSet) {
            this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
            this.observable.fire(events.redrawing);
        }
    };
    DataSourceBase.prototype.refresh = function () {
        if (!this.loadingDataSet) {
            this.processData();
            this.observable.fire(events.redrawing);
        }
    };
    DataSourceBase.prototype.remove = function (data) {
        var item = this.array.remove(this.rawDataSet, data);
        if (item != null) {
            this.observable.fire(events.removed);
            this.observable.fire(events.changed);
            if (this.pager) {
                this.refresh();
            }
        }
    };
    DataSourceBase.prototype.push = function (data) {
        this.rawDataSet.push(data);
        this.observable.fire(events.added);
        this.observable.fire(events.changed);
        this.refresh();
    };
    DataSourceBase.prototype.replace = function (oldData, newData) {
        var locationOfOldData = this.rawDataSet.indexOf(oldData);
        if (locationOfOldData >= 0) {
            this.array.replace(this.rawDataSet, oldData, newData);
            this.observable.fire(events.replaced);
            this.observable.fire(events.changed);
            this.refresh();
        }
    };
    return DataSourceBase;
}());
exports.DataSourceBase = DataSourceBase;
//# sourceMappingURL=dataSourceBase.service.js.map