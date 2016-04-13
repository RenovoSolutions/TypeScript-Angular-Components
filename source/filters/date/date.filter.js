'use strict';
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.ui.filters.date';
exports.filterName = 'rlDate';
dateFilter.$inject = [];
function dateFilter() {
    'use strict';
    return function (date, includeTime) {
        if (__object.objectUtility.isNullOrEmpty(date)) {
            return '';
        }
        var momentDate = moment(date);
        if (includeTime) {
            return momentDate.format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.zoneAbbr();
        }
        else {
            return momentDate.format(__date.defaultFormats.dateFormat);
        }
    };
}
angular.module(exports.moduleName, [])
    .filter(exports.filterName, dateFilter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLE1BQU0sR0FBRyx1Q0FBUSxDQUFDLElBQUksQ0FBQztBQUM5QixJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUV2QixrQkFBVSxHQUFXLG9CQUFvQixDQUFDO0FBQzFDLGtCQUFVLEdBQVcsUUFBUSxDQUFDO0FBTXpDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3hCO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDLFVBQUMsSUFBb0IsRUFBRSxXQUFxQjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFFRCxJQUFJLFVBQVUsR0FBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNGLENBQUMsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDIn0=