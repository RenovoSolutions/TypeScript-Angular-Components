'use strict';
var Rx = require('rx');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var events = require('./dataSourceEvents');
var DataSourceBase = (function () {
    function DataSourceBase(observableFactory, dataSourceProcessor, array) {
        this.dataSourceProcessor = dataSourceProcessor;
        this.array = array;
        this.sorts = [];
        this.filters = [];
        this._count = 0;
        this.countFilterGroups = false;
        this.loadingDataSet = false;
        this.observable = observableFactory.getInstance();
        this.observable.allowableEvents = events.all;
        this.countObservable = new Rx.Subject();
    }
    Object.defineProperty(DataSourceBase.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            this._count = value;
            this.countObservable.onNext(value);
        },
        enumerable: true,
        configurable: true
    });
    DataSourceBase.prototype.initPager = function () {
        if (this.pager) {
            this.pager.pageSizeObservable.subscribe(this.onPagingChange.bind(this));
            this.pager.pageNumberObservable.subscribe(this.onPagingChange.bind(this));
        }
    };
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
            this.refresh();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZUJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFTb3VyY2VCYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFFekIsNkNBQWtDLDhCQUE4QixDQUFDLENBQUE7QUFHakUsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFNbEMsSUFBWSxNQUFNLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUU3QztJQTBCQyx3QkFBWSxpQkFBeUQsRUFDekQsbUJBQXlDLEVBQ3ZDLEtBQTRCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBdUI7UUF4QjFDLFVBQUssR0FBWSxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFzQixFQUFFLENBQUM7UUFFeEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUUzQixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFFbkMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFrQi9CLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFmRCxzQkFBSSxpQ0FBSzthQUFUO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FMQTtJQWVE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