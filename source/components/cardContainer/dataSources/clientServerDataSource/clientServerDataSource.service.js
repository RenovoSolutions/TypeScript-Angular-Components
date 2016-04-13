'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
var __array = typescript_angular_utilities_1.services.array;
var __object = typescript_angular_utilities_1.services.object;
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.clientServerDataSource';
exports.factoryName = 'clientServerDataSource';
var ClientServerDataSource = (function (_super) {
    __extends(ClientServerDataSource, _super);
    function ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
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
clientServerDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function clientServerDataSourceFactory(observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet, searchFilter, getFilterModel, validateModel) {
            return new ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.clientServerDataSourceFactory = clientServerDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName, __object.moduleName, __synchronizedRequests.moduleName])
    .factory(exports.factoryName, clientServerDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50U2VydmVyRGF0YVNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50U2VydmVyRGF0YVNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxZQUFZLEdBQUcsdUNBQVEsQ0FBQyxVQUFVLENBQUM7QUFDMUMsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFDaEMsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFFbEMsSUFBTyxzQkFBc0IsR0FBRyx1Q0FBUSxDQUFDLG9CQUFvQixDQUFDO0FBRTlELHdDQUFvRSw0QkFBNEIsQ0FBQyxDQUFBO0FBQ2pHLDRDQUEyRCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWpGLGtCQUFVLEdBQVcsbUVBQW1FLENBQUM7QUFDekYsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQW1CMUQ7SUFBdUQsMENBQTBCO0lBS2hGLGdDQUFZLFVBQWlELEVBQ2pELFlBQXdELEVBQ3pELGNBQW9DLEVBQ3BDLGFBQXdDLEVBQy9DLGlCQUF5RCxFQUN6RCxtQkFBeUMsRUFDekMsS0FBNEIsRUFDcEIsTUFBK0IsRUFDdkMsMkJBQWdGO1FBQ25GLGtCQUFNLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQVJuRixpQkFBWSxHQUFaLFlBQVksQ0FBNEM7UUFDekQsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGtCQUFhLEdBQWIsYUFBYSxDQUEyQjtRQUl2QyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQVhuQyxvQkFBZSxHQUFXLENBQUMsQ0FBQztRQWVuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FB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