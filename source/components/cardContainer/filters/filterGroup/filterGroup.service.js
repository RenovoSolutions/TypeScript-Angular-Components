'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
exports.factoryName = 'filterGroup';
var FilterGroup = (function (_super) {
    __extends(FilterGroup, _super);
    function FilterGroup(settings, object) {
        _super.call(this);
        this.settings = settings;
        this.object = object;
        this.template = '<rl-filter-group filter-group="filter" source="dataSource"></rl-filter-group>';
        this.label = settings.label;
        this.type = settings.type != null ? settings.type : settings.label;
        this.initOptions();
    }
    FilterGroup.prototype.initOptions = function () {
        var _this = this;
        this.options = this.settings.options;
        this.activeOption = this.setDefaultOption();
        _.each(this.options, function (option) {
            if (_.isUndefined(option.type)) {
                option.type = option.label;
            }
            option.type = _this.object.toString(option.type).toLowerCase();
        });
    };
    Object.defineProperty(FilterGroup.prototype, "activeOption", {
        get: function () {
            return this._activeOption;
        },
        set: function (value) {
            this._activeOption = value;
            this.onChange(false);
        },
        enumerable: true,
        configurable: true
    });
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
        return this.activeOption.value;
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
}(typescript_angular_utilities_1.filters.SerializableFilter));
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