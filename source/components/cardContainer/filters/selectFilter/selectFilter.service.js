'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
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
        if (_.isFunction(this.valueSelector)) {
            var func = this.valueSelector;
            return (func(item));
        }
        else {
            var property = this.valueSelector;
            return item[property];
        }
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