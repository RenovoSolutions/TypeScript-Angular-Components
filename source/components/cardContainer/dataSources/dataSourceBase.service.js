'use strict';
var events = require('./dataSourceEvents');
var DataSourceBase = (function () {
    function DataSourceBase(observableFactory, dataSourceProcessor, array) {
        this.dataSourceProcessor = dataSourceProcessor;
        this.array = array;
        this.sorts = [];
        this.filters = {};
        this.count = 0;
        this.countFilterGroups = false;
        this.loadingDataSet = false;
        this.observable = observableFactory.getInstance();
    }
    DataSourceBase.prototype.watch = function (action, event) {
        return this.observable.register(action, event);
    };
    DataSourceBase.prototype.processData = function () {
        var processedData;
        if (this.countFilterGroups) {
            processedData = this.dataSourceProcessor.processAndCount(this.sorts, this.filters, this.pager, this.rawDataSet);
        }
        else {
            processedData = this.dataSourceProcessor.process(this.sorts, this.filters, this.pager, this.rawDataSet);
        }
        this.count = processedData.count;
        this.dataSet = processedData.dataSet;
        this.filteredDataSet = processedData.filteredDataSet;
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
})();
exports.DataSourceBase = DataSourceBase;
//# sourceMappingURL=dataSourceBase.service.js.map