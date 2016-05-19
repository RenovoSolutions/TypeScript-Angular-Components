"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.clientServerDataSource';
exports.factoryName = 'clientServerDataSource';
var ClientServerDataSource = (function (_super) {
    __extends(ClientServerDataSource, _super);
    function ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.searchFilter = searchFilter;
        this.getFilterModel = getFilterModel;
        this.validateModel = validateModel;
        this.object = object;
        this.minSearchLength = 4;
        this.getFilterModel = this.getFilterModel || function () { return null; };
        this.validateModel = this.validateModel || function () { return true; };
        this.countFilterGroups = true;
        this.search = searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        searchFilter.minSearchLength = this.minSearchLength;
    }
    ClientServerDataSource.prototype.refresh = function () {
        if (this.searchFilter.searchText !== this.search
            || this.filterModelChanged()) {
            this.reload();
        }
        else {
            _super.prototype.refresh.call(this);
        }
    };
    ClientServerDataSource.prototype.reload = function () {
        this.search = this.searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        var hasValidSearch = !this.object.isNullOrEmpty(this.search) && this.search.length >= this.minSearchLength;
        var hasValidFilterModel = this.filterModel != null && this.validateModel(this.filterModel);
        if (!hasValidSearch && !hasValidFilterModel) {
            this.resolveReload(null);
            return;
        }
        _super.prototype.reload.call(this);
    };
    ClientServerDataSource.prototype.filterModelChanged = function () {
        return !this.object.areEqual(this.getFilterModel(), this.filterModel);
    };
    ClientServerDataSource.prototype.getParams = function () {
        var searchModel = this.getFilterModel();
        if (searchModel != null) {
            searchModel.search = this.search;
        }
        else {
            searchModel = this.search;
        }
        return searchModel;
    };
    return ClientServerDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.ClientServerDataSource = ClientServerDataSource;
clientServerDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
function clientServerDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet, searchFilter, getFilterModel, validateModel) {
            return new ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.clientServerDataSourceFactory = clientServerDataSourceFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, clientServerDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50U2VydmVyRGF0YVNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50U2VydmVyRGF0YVNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBTW5FLHdDQUFvRSw0QkFBNEIsQ0FBQyxDQUFBO0FBQ2pHLDRDQUEyRCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWpGLGtCQUFVLEdBQVcsbUVBQW1FLENBQUM7QUFDekYsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQW1CMUQ7SUFBdUQsMENBQTBCO0lBS2hGLGdDQUFZLFVBQWlELEVBQ2pELFlBQXdELEVBQ3pELGNBQW9DLEVBQ3BDLGFBQXdDLEVBQy9DLG1CQUF5QyxFQUN6QyxLQUE0QixFQUNwQixNQUErQixFQUN2QywyQkFBZ0Y7UUFDbkYsa0JBQU0sVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBUGhFLGlCQUFZLEdBQVosWUFBWSxDQUE0QztRQUN6RCxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQTJCO1FBR3ZDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBVm5DLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBY25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENB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