'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVTdHJpbmdEYXRlcy5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbGl6ZVN0cmluZ0RhdGVzLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQyw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLE1BQU0sR0FBRyx1Q0FBUSxDQUFDLElBQUksQ0FBQztBQUM5QixJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFFBQVEsQ0FBQztBQUc1QixrQkFBVSxHQUFXLHFDQUFxQyxDQUFDO0FBQzNELGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFNeEQ7OztHQUdHO0FBQ0g7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUMsVUFBQyxLQUFjO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsNEVBQTRFO1FBQzVFLElBQU0sUUFBUSxHQUFXLFdBQVcsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUVoRiwyRUFBMkU7UUFDM0UsSUFBTSxLQUFLLEdBQVcsMkhBQTJILENBQUM7UUFFbEosSUFBSSxjQUFjLEdBQVcsS0FBSyxDQUFDO1FBQ25DLElBQUksY0FBYyxHQUFhLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsK0VBQStFO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDdkIsQ0FBQztRQUNELDhHQUE4RztRQUM5RyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtZQUNuQyxjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUN2QixDQUFDLENBQUM7SUFDRixvQkFBb0IsSUFBWSxFQUFFLFFBQVE7UUFDekMsWUFBWSxDQUFDO1FBRWIsSUFBTSxTQUFTLEdBQVcsS0FBSyxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1gsQ0FBQztRQUNELGtEQUFrRDtRQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxxQ0FBcUM7UUFDckUsQ0FBQztRQUNELElBQUksVUFBVSxHQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFeEgsQ0FBQztBQUNGLENBQUM7QUExQ2UsMkJBQW1CLHNCQTBDbEMsQ0FBQTtBQUdELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsTUFBTSxDQUFDLGtCQUFVLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyJ9