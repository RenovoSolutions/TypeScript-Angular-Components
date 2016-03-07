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
//# sourceMappingURL=selectFilter.service.js.map