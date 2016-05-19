"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
filterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
function filterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new FilterGroup(settings, object);
        },
    };
}
exports.filterGroupFactory = filterGroupFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbHRlckdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQTZDLDhCQUE4QixDQUFDLENBQUE7QUFHakUsbUJBQVcsR0FBVyxhQUFhLENBQUM7QUErQi9DO0lBQWlDLCtCQUErQjtJQU8vRCxxQkFBb0IsUUFBOEIsRUFBVSxNQUErQjtRQUMxRixpQkFBTyxDQUFDO1FBRFcsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUgzRixhQUFRLEdBQVcsK0VBQStFLENBQUM7UUFLbEcsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUFBLGlCQVdDO1FBVkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTVDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQXFCO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzVCLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxHQUFH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