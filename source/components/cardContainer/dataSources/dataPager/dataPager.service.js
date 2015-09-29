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
    DataPager.prototype.filter = function (dataSet) {
        var size = this.pageSize;
        var start = (this.pageNumber - 1) * size;
        return _(dataSet)
            .drop(start)
            .take(size)
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