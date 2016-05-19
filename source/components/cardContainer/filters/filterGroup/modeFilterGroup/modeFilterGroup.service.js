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
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup';
exports.factoryName = 'modeFilterGroup';
var ModeFilterGroup = (function (_super) {
    __extends(ModeFilterGroup, _super);
    function ModeFilterGroup(settings, object) {
        _super.call(this, settings, object);
        this.getValue = settings.getValue;
        settings.options = _.map(settings.options, this.buildModeOption.bind(this));
        this.initOptions();
    }
    ModeFilterGroup.prototype.serialize = function () {
        var activeOption = this.activeOption;
        if (activeOption.displayAll) {
            return null;
        }
        return activeOption.value;
    };
    ModeFilterGroup.prototype.buildModeOption = function (option) {
        var _this = this;
        var modeOption = option;
        modeOption.filter = function (item) {
            if (modeOption.displayAll) {
                return true;
            }
            return __transform.getValue(item, _this.getValue) === modeOption.value;
        };
        return modeOption;
    };
    return ModeFilterGroup;
}(filterGroup_service_1.FilterGroup));
exports.ModeFilterGroup = ModeFilterGroup;
modeFilterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
function modeFilterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new ModeFilterGroup(settings, object);
        },
    };
}
exports.modeFilterGroupFactory = modeFilterGroupFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, modeFilterGroupFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZUZpbHRlckdyb3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RlRmlsdGVyR3JvdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUVuRSxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFFbEQsb0NBQXlELHdCQUF3QixDQUFDLENBQUE7QUFFdkUsa0JBQVUsR0FBVyxvRUFBb0UsQ0FBQztBQUMxRixtQkFBVyxHQUFXLGlCQUFpQixDQUFDO0FBeUJuRDtJQUFxQyxtQ0FBVztJQUcvQyx5QkFBWSxRQUF1QyxFQUFFLE1BQStCO1FBQ25GLGtCQUFXLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUErQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUgsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxtQ0FBUyxHQUFUO1FBQ0MsSUFBSSxZQUFZLEdBQTJCLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRU8seUNBQWUsR0FBdkIsVUFBd0IsTUFBaUM7UUFBekQsaUJBV0M7UUFWQSxJQUFJLFVBQVUsR0FBMkIsTUFBTSxDQUFDO1FBQ2hELFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxJQUErQjtZQUNuRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUM7WUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDdkUsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBOUJELENBQXFDLGlDQUFXLEdBOEIvQztBQTlCWSx1QkFBZSxrQkE4QjNCLENBQUE7QUFNRCxzQkFBc0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx3Q0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDL0QsZ0NBQXVDLE1BQStCO0lBQ3JFLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBQyxRQUF1QztZQUNsRCxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVBlLDhCQUFzQix5QkFPckMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQsT0FBTyxDQUFDLG1CQUFXLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyJ9