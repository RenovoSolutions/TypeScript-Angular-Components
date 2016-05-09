'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rxjs_1 = require('rxjs');
var dataSourceBase_service_1 = require('./dataSourceBase.service');
var AsyncDataSource = (function (_super) {
    __extends(AsyncDataSource, _super);
    function AsyncDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, dataSourceProcessor, array);
        this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
        this.reloaded = new rxjs_1.Subject();
    }
    Object.defineProperty(AsyncDataSource.prototype, "getDataSet", {
        set: function (value) {
            this.synchronizedRequests.dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    AsyncDataSource.prototype.reload = function () {
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.synchronizedRequests.getData(this.getParams());
    };
    AsyncDataSource.prototype.resolveReload = function (data) {
        this.loadingDataSet = false;
        this.rawDataSet = data;
        this.processData();
        this.reloaded.next(null);
        this.redrawing.next(null);
        this.changed.next(null);
    };
    // override with params for getDataSet
    AsyncDataSource.prototype.getParams = function () {
        return null;
    };
    return AsyncDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.AsyncDataSource = AsyncDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhc3luY0RhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUdiLHFCQUF3QixNQUFNLENBQUMsQ0FBQTtBQU8vQix1Q0FBK0IsMEJBQTBCLENBQUMsQ0FBQTtBQWExRDtJQUFnRCxtQ0FBeUI7SUFJeEUseUJBQVksVUFBdUMsRUFDL0MsbUJBQXlDLEVBQ3pDLEtBQTRCLEVBQzVCLDJCQUFnRjtRQUNuRixrQkFBTSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsMkJBQTJCLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFPLEVBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0JBQUksdUNBQVU7YUFBZCxVQUFlLEtBQWtDO1lBQ2hELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBRUQsZ0NBQU0sR0FBTjtRQUNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRTNCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVTLHVDQUFhLEdBQXZCLFVBQXdCLElBQWlCO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsc0NBQXNDO0lBQzVCLG1DQUFTLEdBQW5CO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNiLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUF2Q0QsQ0FBZ0QsdUNBQWMsR0F1QzdEO0FBdkNZLHVCQUFlLGtCQXVDM0IsQ0FBQSJ9