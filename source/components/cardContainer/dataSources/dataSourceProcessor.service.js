'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZVByb2Nlc3Nvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YVNvdXJjZVByb2Nlc3Nvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUE2Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBSzVFLCtCQUdPLGdDQUFnQyxDQUFDLENBQUE7QUFFN0IsNEJBQW9CLEdBQVcscUJBQXFCLENBQUM7QUEwQmhFO0lBRUMsNkJBQW9CLE1BQStCLEVBQ3ZDLE1BQWU7UUFEUCxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQUksQ0FBQztJQUVoQyxxQ0FBTyxHQUFQLFVBQW1CLEtBQWMsRUFDM0IsT0FBMEIsRUFDMUIsS0FBaUIsRUFDakIsSUFBaUI7UUFDdEIsSUFBSSxhQUFhLEdBQWdCLElBQUksQ0FBQztRQUV0QyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsRCxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBQyxZQUF5QixFQUFFLE1BQXVCO2dCQUNwRiw4REFBOEQ7Z0JBQzlELE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQThCO1lBQ3ZDLEtBQUssRUFBRSxDQUFDLGFBQWEsSUFBSSxJQUFJLEdBQUcs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