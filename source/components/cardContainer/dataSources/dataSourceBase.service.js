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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZUJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFTb3VyY2VCYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsNkNBQWtDLDhCQUE4QixDQUFDLENBQUE7QUFHakUsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFNbEMsSUFBWSxNQUFNLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUU3QztJQWdCQyx3QkFBWSxpQkFBeUQsRUFDekQsbUJBQXlDLEVBQ3ZDLEtBQTRCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUFkMUMsVUFBSyxHQUFZLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUVoQyxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVEvQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDOUMsQ0FBQztJQUVELDhCQUFLLEdBQUwsVUFBbUIsTUFBeUMsRUFBRSxLQUFjO1FBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHNCQUFJLDhDQUFrQjthQUF0QjtZQUNDLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFFLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENB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