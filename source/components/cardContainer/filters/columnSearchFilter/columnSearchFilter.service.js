'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uU2VhcmNoRmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2x1bW5TZWFyY2hGaWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBNkMsOEJBQThCLENBQUMsQ0FBQTtBQUc1RSxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFJdkMsa0JBQVUsR0FBVywyREFBMkQsQ0FBQztBQUNqRixtQkFBVyxHQUFXLG9CQUFvQixDQUFDO0FBQzNDLGtCQUFVLEdBQVcsZUFBZSxDQUFDO0FBUWhEO0lBTUMsNEJBQW9CLE1BQStCLEVBQ3ZDLE1BQStCO1FBRHZCLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBTjNDLFNBQUksR0FBVyxrQkFBVSxDQUFDO0lBTXFCLENBQUM7SUFFaEQsbUNBQU0sR0FBTixVQUFrQixJQUFlO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUUzRixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksMEJBQWtCLHFCQXlCOUIsQ0FBQTtBQU1ELHlCQUF5QixDQUFDLE9BQU8sR0FBRyxDQUFDLHdDQUFTLENBQUMsaUJBQWlCLEVBQUUsd0NBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9GLG1DQUEwQyxNQUErQixFQUFFLE1BQStCO0lBQ3pHLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVc7WUFDVixNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0MsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBUGUsaUNBQXlCLDRCQU94QyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxPQUFPLENBQUMsbUJBQVcsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIn0=