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
modeFilterGroupFactory.$inject = [__object.serviceName];
function modeFilterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new ModeFilterGroup(settings, object);
        },
    };
}
exports.modeFilterGroupFactory = modeFilterGroupFactory;
angular.module(exports.moduleName, [__object.moduleName])
    .factory(exports.factoryName, modeFilterGroupFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZUZpbHRlckdyb3VwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RlRmlsdGVyR3JvdXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUVsRCxvQ0FBeUQsd0JBQXdCLENBQUMsQ0FBQTtBQUV2RSxrQkFBVSxHQUFXLG9FQUFvRSxDQUFDO0FBQzFGLG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUF5Qm5EO0lBQXFDLG1DQUFXO0lBRy9DLHlCQUFZLFFBQXVDLEVBQUUsTUFBK0I7UUFDbkYsa0JBQVcsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQStDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDQyxJQUFJLFlBQVksR0FBMkIsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFTyx5Q0FBZSxHQUF2QixVQUF3QixNQUFpQztRQUF6RCxpQkFXQztRQVZBLElBQUksVUFBVSxHQUEyQixNQUFNLENBQUM7UUFDaEQsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFDLElBQStCO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsQ0FBQztZQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ25CLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUE5QkQsQ0FBcUMsaUNBQVcsR0E4Qi9DO0FBOUJZLHVCQUFlLGtCQThCM0IsQ0FBQTtBQU1ELHNCQUFzQixDQUFDLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN4RCxnQ0FBdUMsTUFBK0I7SUFDckUsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFDLFFBQXVDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBUGUsOEJBQXNCLHlCQU9yQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLHNCQUFzQixDQUFDLENBQUMifQ==