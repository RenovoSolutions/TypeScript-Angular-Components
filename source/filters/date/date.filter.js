"use strict";
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.ui.filters.date';
exports.filterName = 'rlDate';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFFdkIsa0JBQVUsR0FBVyxvQkFBb0IsQ0FBQztBQUMxQyxrQkFBVSxHQUFXLFFBQVEsQ0FBQztBQU16QztJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQyxVQUFDLElBQW9CLEVBQUUsV0FBcUI7UUFDbEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxVQUFVLEdBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5RixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELENBQUM7SUFDRixDQUFDLENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixNQUFNLENBQUMsa0JBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyJ9