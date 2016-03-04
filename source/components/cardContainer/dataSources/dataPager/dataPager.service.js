// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataPager';
exports.factoryName = 'dataPager';
exports.defaultPageSize = 10;
var DataPager = (function () {
    function DataPager() {
        this.pageNumber = 1;
        this.pageSize = exports.defaultPageSize;
    }
    Object.defineProperty(DataPager.prototype, "startItem", {
        get: function () {
            return (this.pageNumber - 1) * this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    DataPager.prototype.filter = function (dataSet) {
        return _(dataSet)
            .drop(this.startItem)
            .take(this.pageSize)
            .value();
    };
    return DataPager;
})();
exports.DataPager = DataPager;
function dataPagerFactory() {
    'use strict';
    return {
        getInstance: function () {
            return new DataPager();
        },
    };
}
exports.dataPagerFactory = dataPagerFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, dataPagerFactory);
//# sourceMappingURL=dataPager.service.js.map