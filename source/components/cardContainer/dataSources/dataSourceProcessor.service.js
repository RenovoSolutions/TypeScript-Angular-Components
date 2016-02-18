'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var sorter_service_1 = require('../sorts/sorter/sorter.service');
exports.processorServiceName = 'dataSourceProcessor';
var DataSourceProcessor = (function () {
    function DataSourceProcessor(object, sorter) {
        this.object = object;
        this.sorter = sorter;
    }
    DataSourceProcessor.prototype.process = function (sorts, filters, pager, data) {
        var processedData = data;
        if (this.object.isNullOrEmpty(sorts) === false) {
            processedData = this.sorter.sort(processedData, sorts);
        }
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
        if (pager != null) {
            result.dataSet = pager.filter(processedData);
        }
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
        if (this.object.isNullOrEmpty(sorts) === false) {
            processedData = this.sorter.sort(processedData, sorts);
        }
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
        if (pager != null) {
            result.dataSet = pager.filter(processedData);
        }
        return result;
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
    DataSourceProcessor.$inject = [__object.serviceName, sorter_service_1.serviceName];
    return DataSourceProcessor;
})();
exports.DataSourceProcessor = DataSourceProcessor;
//# sourceMappingURL=dataSourceProcessor.service.js.map