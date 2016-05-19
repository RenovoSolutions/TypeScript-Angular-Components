"use strict";
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
var __timezones = typescript_angular_utilities_1.services.timezone;
exports.moduleName = 'rl21.ui.filters.localizeStringDates';
exports.filterName = 'rlLocalizeStringDates';
/**
 *Filters a string and find all, datetimes that match the format M/D/YYYY H:M:S AM|PM that is used to store dates in message log body text.
* Assumes they are UTC  and parses them, converts to local browser time replaces them in the string.
 */
function localizeStringDates() {
    'use strict';
    return function (input) {
        if (input == null) {
            return '';
        }
        //if no timezone is specified then use moment to get the browsers time zone.
        var timezone = __timezones.timezoneService.currentTimezone.momentName;
        // regex to match M/DD/YYYY hh:mm:ss AM|PM with an optional UTC at the end.
        var regex = /([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2} ([1-9]|1[0-9])\:([0-9])([0-9])(?:\:([0-9])([0-9]))? (AM|PM)(?: UTC)?/g;
        var messageLogText = input;
        var datesToReplace = messageLogText.match(regex);
        //if there where no dates found by the RegExp return the value passed the list.
        if (datesToReplace == null) {
            return messageLogText;
        }
        // Iterates each date found, reformats it for the current time zone and replace's it's original in the string.
        datesToReplace.forEach(function (date) {
            messageLogText = messageLogText.replace(date, formatDate(date, timezone));
        });
        return messageLogText;
    };
    function formatDate(date, timezone) {
        'use strict';
        var utcString = 'UTC';
        if (__object.objectUtility.isNullOrEmpty(date)) {
            return '';
        }
        //the assumtion is all dates in the string are UTC
        if (date.indexOf(utcString) === -1) {
            date = date + ' ' + utcString; //could have used leftPad here... lol
        }
        var momentDate = moment(date);
        return momentDate.tz(timezone).format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.tz(timezone).zoneAbbr();
    }
}
exports.localizeStringDates = localizeStringDates;
angular.module(exports.moduleName, [])
    .filter(exports.filterName, localizeStringDates);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVTdHJpbmdEYXRlcy5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbGl6ZVN0cmluZ0RhdGVzLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxRQUFRLENBQUM7QUFHNUIsa0JBQVUsR0FBVyxxQ0FBcUMsQ0FBQztBQUMzRCxrQkFBVSxHQUFXLHVCQUF1QixDQUFDO0FBTXhEOzs7R0FHRztBQUNIO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDLFVBQUMsS0FBYztRQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUVELDRFQUE0RTtRQUM1RSxJQUFNLFFBQVEsR0FBVyxXQUFXLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFFaEYsMkVBQTJFO1FBQzNFLElBQU0sS0FBSyxHQUFXLDJIQUEySCxDQUFDO1FBRWxKLElBQUksY0FBYyxHQUFXLEtBQUssQ0FBQztRQUNuQyxJQUFJLGNBQWMsR0FBYSxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELCtFQUErRTtRQUMvRSxFQUFFLENBQUMsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCw4R0FBOEc7UUFDOUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVk7WUFDbkMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0lBQ0Ysb0JBQW9CLElBQVksRUFBRSxRQUFRO1FBQ3pDLFlBQVksQ0FBQztRQUViLElBQU0sU0FBUyxHQUFXLEtBQUssQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNYLENBQUM7UUFDRCxrREFBa0Q7UUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMscUNBQXFDO1FBQ3JFLENBQUM7UUFDRCxJQUFJLFVBQVUsR0FBa0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXhILENBQUM7QUFDRixDQUFDO0FBMUNlLDJCQUFtQixzQkEwQ2xDLENBQUE7QUFHRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==