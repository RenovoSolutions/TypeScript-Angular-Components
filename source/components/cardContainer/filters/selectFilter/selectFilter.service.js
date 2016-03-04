'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.factoryName = 'rlSelectFilterFactory';
var SelectFilter = (function () {
    function SelectFilter(valueSelector, comparer) {
        this.valueSelector = valueSelector;
        this.comparer = comparer;
        this.type = 'selectFilter';
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
        getInstance: function (valueSelector, comparer) {
            return new SelectFilter(valueSelector, comparer);
        },
    };
}
exports.selectFilterFactory = selectFilterFactory;
//# sourceMappingURL=selectFilter.service.js.map