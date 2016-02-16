'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.factoryName = 'filterGroup';
var FilterGroup = (function () {
    function FilterGroup(settings, object) {
        this.settings = settings;
        this.label = settings.label;
        this.type = settings.type != null ? settings.type : settings.label;
        this.options = settings.options;
        this.activeOption = this.setDefaultOption();
        _.each(this.options, function (option) {
            if (_.isUndefined(option.type)) {
                option.type = option.label;
            }
            option.type = object.toString(option.type).toLowerCase();
        });
    }
    FilterGroup.prototype.setDefaultOption = function () {
        var defaultOption = this.options[0];
        _.each(this.options, function (item) {
            if (item.active != null && item.active === true) {
                defaultOption = item;
            }
        });
        return defaultOption;
    };
    FilterGroup.prototype.filter = function (item) {
        return this.activeOption.filter(item);
    };
    FilterGroup.prototype.serialize = function () {
        if (_.isFunction(this.settings.serialize)) {
            return this.settings.serialize();
        }
        if (_.isFunction(this.activeOption.serialize)) {
            return this.activeOption.serialize();
        }
        return null;
    };
    FilterGroup.prototype.setActiveOption = function (index) {
        if (index >= 0 && index < this.options.length) {
            this.activeOption = this.options[index];
        }
    };
    FilterGroup.prototype.setOptionCounts = function (counts) {
        _.each(this.options, function (option) {
            if (_.has(counts, option.type)) {
                option.count = counts[option.type];
            }
        });
    };
    FilterGroup.prototype.updateOptionCounts = function (filteredDataSet) {
        _.each(this.options, function (option) {
            option.count = _.filter(filteredDataSet, option.filter.bind(option)).length;
        });
    };
    return FilterGroup;
})();
exports.FilterGroup = FilterGroup;
filterGroupFactory.$inject = [__object.serviceName];
function filterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new FilterGroup(settings, object);
        },
    };
}
exports.filterGroupFactory = filterGroupFactory;
//# sourceMappingURL=filterGroup.service.js.map