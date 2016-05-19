"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWxlY3RGaWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsNkNBQWdDLDhCQUE4QixDQUFDLENBQUE7QUFDL0QsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBRXZDLG1CQUFXLEdBQVcsdUJBQXVCLENBQUM7QUFzQnpEO0lBZUMsc0JBQVksUUFBdUQ7UUFibkUsU0FBSSxHQUFXLGNBQWMsQ0FBQztRQWM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsbUJBQW1CLENBQUM7UUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsK1FBQ2tILENBQUM7SUFDcEksQ0FBQztJQUVELDZCQUFNLEdBQU4sVUFBTyxJQUFlO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTywrQkFBUSxHQUFoQixVQUFpQixJQUFlO1FBQy9CLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVGLG1CQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQztBQU1EO0lBQ0MsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUF5QixRQUF1RDtZQUMxRixNQUFNLENBQUMsSUFBSSxZQUFZLENBQXlCLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQU5lLDJCQUFtQixzQkFNbEMsQ0FBQSJ9