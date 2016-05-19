"use strict";
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var sorter_service_1 = require('../sorts/sorter/sorter.service');
exports.processorServiceName = 'dataSourceProcessor';
var DataSourceProcessor = (function () {
    function DataSourceProcessor(object, sorter) {
        this.object = object;
        this.sorter = sorter;
    }
    DataSourceProcessor.prototype.process = function (sorts, filters, pager, data) {
        var processedData = data;
        processedData = this.sort(processedData, sorts);
        if (this.object.isNullOrEmpty(filters) === false) {
            processedData = _.reduce(filters, function (filteredData, filter) {
                // Filter the data set using the filter function on the filter
                return _.filter(filteredData, filter.filter.bind(filter));
            }, processedData);
        }
        var result = {
            count: (processedData != null ? processedData.length : 0),
            filteredDataSet: processedData,
            dataSet: processedData,
        };
        result.dataSet = this.page(processedData, pager);
        return result;
    };
    DataSourceProcessor.prototype.processAndCount = function (sorts, filters, pager, data) {
        var _this = this;
        // If there are no filters that need to updated option counts, use the normal processor
        if (this.object.isNullOrEmpty(filters)
            || _.some(filters, function (filter) { return _.isFunction(filter.updateOptionCounts); }) === false) {
            return this.process(sorts, filters, pager, data);
        }
        var processedData = data;
        processedData = this.sort(processedData, sorts);
        var wrappedData = this.wrapData(processedData);
        // Run filtration logic and compute visible items
        _.each(filters, function (filter /* filters.IFilterWithCounts */) {
            _.each(wrappedData, function (item) {
                item.filterData[filter.type] = filter.filter(item.data);
            });
        });
        // Give each filter a chance to update option counts
        _.each(filters, function (filter /* filters.IFilterWithCounts */) {
            if (_.isFunction(filter.updateOptionCounts)) {
                var otherFiltersApplied = _.filter(wrappedData, function (item) {
                    // Omit the true or false of the current filter an
                    //  only filter out items removed by other filters
                    var filterData = _.omit(item.filterData, filter.type); //*filterData
                    return _.every(_.values(filterData));
                });
                filter.updateOptionCounts(_this.unwrapData(otherFiltersApplied));
            }
        });
        // Filter down to final data set by removing items that don't match all filters
        wrappedData = _.filter(wrappedData, function (item) {
            return _.every(_.values(item.filterData));
        });
        processedData = this.unwrapData(wrappedData);
        var result = {
            count: processedData.length,
            filteredDataSet: processedData,
            dataSet: processedData,
        };
        result.dataSet = this.page(processedData, pager);
        return result;
    };
    DataSourceProcessor.prototype.sort = function (data, sorts) {
        if (this.object.isNullOrEmpty(sorts) === false) {
            return this.sorter.sort(data, sorts);
        }
        return data;
    };
    DataSourceProcessor.prototype.page = function (data, pager) {
        if (pager != null) {
            return pager.filter(data);
        }
        return data;
    };
    DataSourceProcessor.prototype.wrapData = function (data) {
        return _.map(data, function (item) {
            return {
                data: item,
                filterData: {},
            };
        });
    };
    DataSourceProcessor.prototype.unwrapData = function (data) {
        return _.map(data, function (item) {
            return item.data;
        });
    };
    DataSourceProcessor.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, sorter_service_1.serviceName];
    return DataSourceProcessor;
}());
exports.DataSourceProcessor = DataSourceProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZVByb2Nlc3Nvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YVNvdXJjZVByb2Nlc3Nvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBNkMsOEJBQThCLENBQUMsQ0FBQTtBQUs1RSwrQkFHTyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTdCLDRCQUFvQixHQUFXLHFCQUFxQixDQUFDO0FBMEJoRTtJQUVDLDZCQUFvQixNQUErQixFQUN2QyxNQUFlO1FBRFAsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUztJQUFJLENBQUM7SUFFaEMscUNBQU8sR0FBUCxVQUFtQixLQUFjLEVBQzNCLE9BQTBCLEVBQzFCLEtBQWlCLEVBQ2pCLElBQWlCO1FBQ3RCLElBQUksYUFBYSxHQUFnQixJQUFJLENBQUM7UUFFdEMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEQsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQUMsWUFBeUIsRUFBRSxNQUF1QjtnQkFDcEYsOERBQThEO2dCQUM5RCxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQUksTUFBTSxHQUE4QjtZQUN2QyxLQUFLLEVBQUUsQ0FBQyxhQUFhLElBQUksSUFBSSxHQUFHLGFBQWEsQ0FBQyxNQUFN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