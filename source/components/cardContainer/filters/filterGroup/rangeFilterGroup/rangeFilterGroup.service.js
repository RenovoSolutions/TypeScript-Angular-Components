"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
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
            var value = __transform.getValue(item, _this.getValue);
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
rangeFilterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
function rangeFilterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new RangeFilterGroup(settings, object);
        },
    };
}
exports.rangeFilterGroupFactory = rangeFilterGroupFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, rangeFilterGroupFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VGaWx0ZXJHcm91cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFuZ2VGaWx0ZXJHcm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRW5FLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUVsRCxvQ0FBeUQsd0JBQXdCLENBQUMsQ0FBQTtBQUV2RSxrQkFBVSxHQUFXLHFFQUFxRSxDQUFDO0FBQzNGLG1CQUFXLEdBQVcsa0JBQWtCLENBQUM7QUFvQ3BEO0lBQStCLG9DQUFXO0lBR3pDLDBCQUFZLFFBQXdDLEVBQUUsTUFBK0I7UUFDcEYsa0JBQVcsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQWlELFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNDLElBQUksWUFBWSxHQUE0QixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDO1lBQ04sYUFBYSxFQUFFLFlBQVksQ0FBQyxhQUFhO1lBQ3pDLGFBQWEsRUFBRSxZQUFZLENBQUMs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