"use strict";
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
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
        var value = this.object.toString(__transform.getValue(item, this.column.getValue));
        var search = this.searchText;
        if (!this.caseSensitive) {
            search = search.toLowerCase();
            value = value.toLowerCase();
        }
        return this.string.contains(value, search);
    };
    return ColumnSearchFilter;
}());
exports.ColumnSearchFilter = ColumnSearchFilter;
columnSearchFilterFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.stringServiceName];
function columnSearchFilterFactory(object, string) {
    'use strict';
    return {
        getInstance: function () {
            return new ColumnSearchFilter(object, string);
        },
    };
}
exports.columnSearchFilterFactory = columnSearchFilterFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, columnSearchFilterFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2x1bW5TZWFyY2hGaWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQTZDLDhCQUE4QixDQUFDLENBQUE7QUFHNUUsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBSXZDLGtCQUFVLEdBQVcsMkRBQTJELENBQUM7QUFDakYsbUJBQVcsR0FBVyxvQkFBb0IsQ0FBQztBQUMzQyxrQkFBVSxHQUFXLGVBQWUsQ0FBQztBQVFoRDtJQU1DLDRCQUFvQixNQUErQixFQUN2QyxNQUErQjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQU4zQyxTQUFJLEdBQVcsa0JBQVUsQ0FBQztJQU1xQixDQUFDO0lBRWhELG1DQUFNLEdBQU4sVUFBa0IsSUFBZTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFM0YsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLDBCQUFrQixxQkF5QjlCLENBQUE7QUFNRCx5QkFBeUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx3Q0FBUyxDQUFDLGlCQUFpQixFQUFFLHdDQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvRixtQ0FBMEMsTUFBK0IsRUFBRSxNQUErQjtJQUN6RyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixXQUFXO1lBQ1YsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVBlLGlDQUF5Qiw0QkFPeEMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQsT0FBTyxDQUFDLG1CQUFXLEVBQUUseUJBQXlCLENBQUMsQ0FBQyJ9