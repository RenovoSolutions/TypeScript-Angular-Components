'use strict';
var _ = require('lodash');
exports.factoryName = 'rlSelectFilterFactory';
var SelectFilter = (function () {
    function SelectFilter(valueSelector) {
        this.valueSelector = valueSelector;
        this.type = 'selectFilter';
    }
    SelectFilter.prototype.filter = function (item) {
        if (this.selectedValue == null) {
            return true;
        }
        return this.getValue(item) === this.selectedValue;
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
})();
function selectFilterFactory() {
    return {
        getInstance: function (valueSelector) {
            return new SelectFilter(valueSelector);
        },
    };
}
exports.selectFilterFactory = selectFilterFactory;
//# sourceMappingURL=selectFilter.service.js.map