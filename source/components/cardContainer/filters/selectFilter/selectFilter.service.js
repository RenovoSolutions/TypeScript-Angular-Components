'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.factoryName = 'rlSelectFilterFactory';
var SelectFilter = (function () {
    function SelectFilter(settings) {
        this.type = 'selectFilter';
        this.valueSelector = settings.valueSelector;
        this.comparer = settings.comparer;
        this.options = settings.options;
        this.getOptions = settings.getOptions;
        this.label = settings.label;
        this.displayNameSelector = settings.displayNameSelector;
        this.nullOption = settings.nullOption;
        this.template = "<rl-select-filter filter=\"filter\" source=\"dataSource\" options=\"filter.options\" get-options=\"filter.getOptions()\"\n\t\t\t\t\t\t\t\t\t\t   label=\"{{filter.label}}\" selector=\"filter.displayNameSelector\" null-option=\"{{filter.nullOption}}\"></rl-select-filter>";
    }
    SelectFilter.prototype.filter = function (item) {
        if (this.selectedValue == null) {
            return true;
        }
        if (this.comparer != null) {
            return this.comparer(this.getValue(item), this.selectedValue);
        }
        return __object.objectUtility.areEqual(this.getValue(item), this.selectedValue);
    };
    SelectFilter.prototype.getValue = function (item) {
        return __transform.getValue(item, this.valueSelector);
    };
    return SelectFilter;
}());
function selectFilterFactory() {
    return {
        getInstance: function (settings) {
            return new SelectFilter(settings);
        },
    };
}
exports.selectFilterFactory = selectFilterFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWxlY3RGaWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYiw2Q0FBZ0MsOEJBQThCLENBQUMsQ0FBQTtBQUMvRCxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFFdkMsbUJBQVcsR0FBVyx1QkFBdUIsQ0FBQztBQXNCekQ7SUFlQyxzQkFBWSxRQUF1RDtRQWJuRSxTQUFJLEdBQVcsY0FBYyxDQUFDO1FBYzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRywrUUFDa0gsQ0FBQztJQUNwSSxDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFPLElBQWU7UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVPLCtCQUFRLEdBQWhCLFVBQWlCLElBQWU7UUFDL0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUYsbUJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBTUQ7SUFDQyxNQUFNLENBQUM7UUFDTixXQUFXLFlBQXlCLFFBQXVEO1lBQzFGLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBeUIsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBTmUsMkJBQW1CLHNCQU1sQyxDQUFBIn0=