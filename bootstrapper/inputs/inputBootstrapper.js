"use strict";
var angular = require('angular');
var moment = require('moment');
require('moment-timezone');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __timezone = typescript_angular_utilities_1.services.timezone;
var InputTestController = (function () {
    function InputTestController($q) {
        this.$q = $q;
    }
    InputTestController.prototype.$onInit = function () {
        this.options = [
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' },
            { name: 'item4' },
            { name: 'item5' },
        ];
        this.typeaheadList = [this.options[0], this.options[4]];
        this.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
        __timezone.timezoneService.setCurrentTimezone('-08:00');
    };
    InputTestController.prototype.select = function (value) {
        this.set.push(value);
    };
    InputTestController.prototype.create = function (value) {
        return {
            name: value,
        };
    };
    InputTestController.prototype.getOptions = function () {
        return this.$q.when(_.clone(this.options));
    };
    InputTestController.prototype.logDates = function () {
        var format = 'YYYY-MM-DDTHH:mm:ssZ';
        console.log(this.date.format(format));
        console.log(this.date2.format(format));
    };
    InputTestController.$inject = ['$q'];
    return InputTestController;
}());
angular.module('app')
    .controller('InputTestController', InputTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dEJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDakMsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sVUFBVSxHQUFHLHVDQUFRLENBQUMsUUFBUSxDQUFDO0FBTXRDO0lBUUMsNkJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO0lBQUcsQ0FBQztJQUU3QyxxQ0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNkLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2pCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7U0FDakIsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxVQUFVLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxvQ0FBTSxHQUFOLFVBQU8sS0FBZ0I7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELG9DQUFNLEdBQU4sVUFBTyxLQUFhO1FBQ25CLE1BQU0sQ0FBQztZQUNOLElBQUksRUFBRSxLQUFLO1NBQ1gsQ0FBQztJQUNILENBQUM7SUFFRCx3Q0FBVSxHQUFWO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDQyxJQUFNLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFwQ00sMkJBQU8sR0FBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBcUNuQywwQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNuQixVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyJ9