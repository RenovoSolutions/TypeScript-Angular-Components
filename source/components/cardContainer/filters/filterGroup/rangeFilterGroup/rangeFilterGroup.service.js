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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2VGaWx0ZXJHcm91cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFuZ2VGaWx0ZXJHcm91cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBRWxELG9DQUF5RCx3QkFBd0IsQ0FBQyxDQUFBO0FBRXZFLGtCQUFVLEdBQVcscUVBQXFFLENBQUM7QUFDM0YsbUJBQVcsR0FBVyxrQkFBa0IsQ0FBQztBQW9DcEQ7SUFBK0Isb0NBQVc7SUFHekMsMEJBQVksUUFBd0MsRUFBRSxNQUErQjtRQUNwRixrQkFBVyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBaUQsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0MsSUFBSSxZQUFZLEdBQTRCLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFDRCxNQUFNLENBQUM7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