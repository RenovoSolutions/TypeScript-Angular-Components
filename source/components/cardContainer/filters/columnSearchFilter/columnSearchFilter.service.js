'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __string = typescript_angular_utilities_1.services.string;
exports.moduleName = 'rl.ui.components.cardContainer.filters.columnSearchFilter';
exports.factoryName = 'columnSearchFilter';
exports.filterName = 'column-search';
var ColumnSearchFilter = (function () {
    function ColumnSearchFilter(object, string) {
        this.object = object;
        this.string = string;
        this.type = exports.filterName;
    }
    ColumnSearchFilter.prototype.filter = function (item) {
        if (this.column == null) {
            return true;
        }
        var value = this.object.toString(this.column.getValue(item));
        var search = this.searchText;
        if (!this.caseSensitive) {
            search = search.toLowerCase();
            value = value.toLowerCase();
        }
        return this.string.contains(value, search);
    };
    return ColumnSearchFilter;
})();
exports.ColumnSearchFilter = ColumnSearchFilter;
columnSearchFilterFactory.$inject = [__object.serviceName, __string.serviceName];
function columnSearchFilterFactory(object, string) {
    'use strict';
    return {
        getInstance: function () {
            return new ColumnSearchFilter(object, string);
        },
    };
}
exports.columnSearchFilterFactory = columnSearchFilterFactory;
angular.module(exports.moduleName, [__object.moduleName, __string.moduleName])
    .factory(exports.factoryName, columnSearchFilterFactory);
//# sourceMappingURL=columnSearchFilter.service.js.map