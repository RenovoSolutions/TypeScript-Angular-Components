'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var filterGroup_service_1 = require('../filterGroup.service');
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.rangeFilterGroup';
exports.factoryName = 'rangeFilterGroup';
var RangeFilterGroup = (function (_super) {
    __extends(RangeFilterGroup, _super);
    function RangeFilterGroup(settings, object) {
        _super.call(this, settings, object);
        this.getValue = settings.getValue;
        settings.options = _.map(settings.options, this.buildRangeOption.bind(this));
        this.initOptions();
    }
    RangeFilterGroup.prototype.serialize = function () {
        var activeOption = this.activeOption;
        if (this.isNullOption(activeOption)) {
            return null;
        }
        return {
            highInclusive: activeOption.highInclusive,
            highExclusive: activeOption.highExclusive,
            lowInclusive: activeOption.lowInclusive,
            lowExclusive: activeOption.lowExclusive,
        };
    };
    RangeFilterGroup.prototype.buildRangeOption = function (option) {
        var _this = this;
        var modeOption = option;
        modeOption.filter = function (item) {
            var value = _this.getValue(item);
            var result = true;
            if (_.isUndefined(option.highExclusive) === false) {
                result = value < option.highExclusive;
            }
            else if (_.isUndefined(option.highInclusive) === false) {
                result = value <= option.highInclusive;
            }
            if (_.isUndefined(option.lowExclusive) === false) {
                result = result && value > option.lowExclusive;
            }
            else if (_.isUndefined(option.lowInclusive) === false) {
                result = result && value >= option.lowInclusive;
            }
            return result;
        };
        return modeOption;
    };
    RangeFilterGroup.prototype.isNullOption = function (option) {
        return option.highInclusive == null
            && option.highExclusive == null
            && option.lowInclusive == null
            && option.lowExclusive == null;
    };
    return RangeFilterGroup;
}(filterGroup_service_1.FilterGroup));
rangeFilterGroupFactory.$inject = [__object.serviceName];
function rangeFilterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new RangeFilterGroup(settings, object);
        },
    };
}
exports.rangeFilterGroupFactory = rangeFilterGroupFactory;
angular.module(exports.moduleName, [__object.moduleName])
    .factory(exports.factoryName, rangeFilterGroupFactory);
//# sourceMappingURL=rangeFilterGroup.service.js.map