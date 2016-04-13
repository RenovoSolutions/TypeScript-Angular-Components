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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbHRlckdyb3VwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBa0MsOEJBQThCLENBQUMsQ0FBQTtBQUNqRSxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUV2QixtQkFBVyxHQUFXLGFBQWEsQ0FBQztBQStCL0M7SUFBaUMsK0JBQStCO0lBTy9ELHFCQUFvQixRQUE4QixFQUFVLE1BQStCO1FBQzFGLGlCQUFPLENBQUM7UUFEVyxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBSDNGLGFBQVEsR0FBVywrRUFBK0UsQ0FBQztRQUtsRyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQUEsaUJBV0M7UUFWQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBcUI7WUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxHQUFH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