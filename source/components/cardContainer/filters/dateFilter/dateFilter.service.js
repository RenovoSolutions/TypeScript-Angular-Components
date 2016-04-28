'use strict';
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.factoryName = 'rlDateFilterFactory';
var DateFilter = (function () {
    function DateFilter(settings, dateUtility) {
        this.dateUtility = dateUtility;
        this.valueSelector = settings.valueSelector;
        this.type = settings.type;
        this.clearButton = settings.clearButton;
        this.includeDateRange = settings.includeDateRange;
        this.includeTime = settings.includeTime != null ? settings.includeTime : false;
        this.label = settings.label;
        this.template = "<rl-date-filter filter=\"filter\" source=\"dataSource\" label=\"{{filter.label}}\" include-time=\"filter.includeTime\"\n\t\t\t\t\t\t\t\t\t     include-date-range=\"filter.includeDateRange\" clear-button=\"filter.clearButton\"></rl-date-filter>";
    }
    DateFilter.prototype.filter = function (item) {
        if (!this.dateUtility.isDate(this.selectedDate1)) {
            return true;
        }
        if (this.dateRange) {
            var itemDate = this.getValue(item);
            var selectedDate1 = void 0;
            //have to set the selectedDate1 to a valid Date object for comparisons.
            if (this.includeTime) {
                selectedDate1 = moment(this.selectedDate1);
            }
            else {
                //increase it by 1 days. to inlcude the selectec date in the range.
                selectedDate1 = moment(this.selectedDate1).add(1, 'days');
            }
            return this.dateUtility.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);
        }
        else {
            if (this.includeTime) {
                return this.dateUtility.sameDateTime(this.getValue(item), this.selectedDate1);
            }
            else {
                return this.dateUtility.sameDate(this.getValue(item), this.selectedDate1);
            }
        }
    };
    DateFilter.prototype.getValue = function (item) {
        return __transform.getValue(item, this.valueSelector);
    };
    return DateFilter;
}());
dateFilterFactory.$inject = [typescript_angular_utilities_1.downgrade.dateServiceName];
function dateFilterFactory(dateUtility) {
    return {
        getInstance: function (settings) {
            return new DateFilter(settings, dateUtility);
        },
    };
}
exports.dateFilterFactory = dateFilterFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZUZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUdiLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDZDQUEyQyw4QkFBOEIsQ0FBQyxDQUFBO0FBRTFFLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUV2QyxtQkFBVyxHQUFXLHFCQUFxQixDQUFDO0FBdUJ2RDtJQWVDLG9CQUFZLFFBQTZCLEVBQVUsV0FBZ0M7UUFBaEMsZ0JBQVcsR0FBWCxXQUFXLENBQXFCO1FBQ2xGLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMvRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxUEFDNkYsQ0FBQztJQUMvRyxDQUFDO0lBRUQsMkJBQU0sR0FBTixVQUFPLElBQVM7UUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLFFBQVEsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqRCxJQUFJLGFBQWEsU0FBZSxDQUFDO1lBRWpDLHVFQUF1RTtZQUN2RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLG1FQUFtRTtnQkFDbkUsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2RixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9FLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0UsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBRU8sNkJBQVEsR0FBaEIsVUFBaUIsSUFBUztRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRixpQkFBQztBQUFELENBQUMsQUF6REQsSUF5REM7QUFNRCxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx3Q0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hELDJCQUFrQyxXQUFnQztJQUNqRSxNQUFNLENBQUM7UUFDTixXQUFXLFlBQUMsUUFBNkI7WUFDeEMsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFOZSx5QkFBaUIsb0JBTWhDLENBQUEifQ==