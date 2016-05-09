'use strict';
var rxjs_1 = require('rxjs');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var DataSourceBase = (function () {
    function DataSourceBase(dataSourceProcessor, array) {
        this.dataSourceProcessor = dataSourceProcessor;
        this.array = array;
        this.sorts = [];
        this.filters = [];
        this._count = 0;
        this.countFilterGroups = false;
        this.loadingDataSet = false;
        this.countChanges = new rxjs_1.Subject();
        this.redrawing = new rxjs_1.Subject();
        this.changed = new rxjs_1.Subject();
        this.added = new rxjs_1.Subject();
        this.removed = new rxjs_1.Subject();
        this.replaced = new rxjs_1.Subject();
    }
    Object.defineProperty(DataSourceBase.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            this._count = value;
            this.countChanges.next(value);
        },
        enumerable: true,
        configurable: true
    });
    DataSourceBase.prototype.initPager = function () {
        if (this.pager) {
            this.pager.pageSizeChanges.subscribe(this.onPagingChange.bind(this));
            this.pager.pageNumberChanges.subscribe(this.onPagingChange.bind(this));
        }
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
            this.redrawing.next(null);
        }
    };
    DataSourceBase.prototype.onPagingChange = function () {
        if (!this.loadingDataSet) {
            this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
            this.redrawing.next(null);
        }
    };
    DataSourceBase.prototype.refresh = function () {
        if (!this.loadingDataSet) {
            this.processData();
            this.redrawing.next(null);
        }
    };
    DataSourceBase.prototype.remove = function (data) {
        var item = this.array.remove(this.rawDataSet, data);
        if (item != null) {
            this.removed.next(null);
            this.changed.next(null);
            this.refresh();
        }
    };
    DataSourceBase.prototype.push = function (data) {
        this.rawDataSet.push(data);
        this.added.next(null);
        this.changed.next(null);
        this.refresh();
    };
    DataSourceBase.prototype.replace = function (oldData, newData) {
        var locationOfOldData = this.rawDataSet.indexOf(oldData);
        if (locationOfOldData >= 0) {
            this.array.replace(this.rawDataSet, oldData, newData);
            this.replaced.next(null);
            this.changed.next(null);
            this.refresh();
        }
    };
    return DataSourceBase;
}());
exports.DataSourceBase = DataSourceBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZUJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFTb3VyY2VCYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIscUJBQXdCLE1BQU0sQ0FBQyxDQUFBO0FBRS9CLDZDQUFrQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRWpFLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBT2xDO0lBOEJDLHdCQUFvQixtQkFBeUMsRUFDL0MsS0FBNEI7UUFEdEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQUMvQyxVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQTNCMUMsVUFBSyxHQUFZLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQUV4QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBRTNCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQXFCL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGNBQU8sRUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxjQUFPLEVBQVEsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxFQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGNBQU8sRUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQVEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBTyxFQUFRLENBQUM7SUFDckMsQ0FBQztJQWpCRCxzQkFBSSxpQ0FBSzthQUFUO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEIsQ0FBQzthQUVELFVBQVUsS0FBYTtZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFB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