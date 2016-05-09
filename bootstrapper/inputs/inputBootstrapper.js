"use strict";
var angular = require('angular');
var moment = require('moment');
require('moment-timezone');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __timezone = typescript_angular_utilities_1.services.timezone;
exports.moduleName = 'InputTestModule';
var InputTestController = (function () {
    function InputTestController($q) {
        this.$q = $q;
    }
    InputTestController.prototype.$onInit = function () {
        var _this = this;
        this.options = [
            { name: 'item1', value: 1 },
            { name: 'item2', value: 2 },
            { name: 'item3', value: 3 },
            { name: 'item4', value: 4 },
            { name: 'item5', value: 5 },
        ];
        this.typeaheadList = [this.options[0], this.options[4]];
        this.useSearch = true;
        this.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
        __timezone.timezoneService.setCurrentTimezone('-08:00');
        this.greaterThanFive1 = {
            validate: function () { return _this.validate1 > 5; },
            errorMessage: 'Must be greater than 5',
        };
        this.greaterThanFive2 = {
            validate: function () { return _this.validate2 > 5; },
            errorMessage: 'Must be greater than 5',
        };
        this.lessThanTen = {
            validate: function () { return _this.validate2 < 10; },
            errorMessage: 'Must be less than 10',
        };
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
InputRoute.$inject = ['$stateProvider'];
function InputRoute($stateProvider) {
    $stateProvider
        .state('inputs', {
        url: '/inputs',
        template: require('./inputs.html'),
        controller: 'InputTestController',
        controllerAs: 'input',
    });
}
angular.module(exports.moduleName, [])
    .controller('InputTestController', InputTestController)
    .config(InputRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dEJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDakMsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sVUFBVSxHQUFHLHVDQUFRLENBQUMsUUFBUSxDQUFDO0FBR3pCLGtCQUFVLEdBQVcsaUJBQWlCLENBQUM7QUFPcEQ7SUFjQyw2QkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFBRyxDQUFDO0lBRTdDLHFDQUFPLEdBQVA7UUFBQSxpQkEyQkM7UUExQkEsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNkLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1NBQzNCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdkIsUUFBUSxFQUFFLGNBQWUsT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBbEIsQ0FBa0I7WUFDM0MsWUFBWSxFQUFFLHdCQUF3QjtTQUN0QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3ZCLFFBQVEsRUFBRSxjQUFlLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQWxCLENBQWtCO1lBQzNDLFlBQVksRUFBRSx3QkFBd0I7U0FDdEMsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDbEIsUUFBUSxFQUFFLGNBQWUsT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBbkIsQ0FBbUI7WUFDNUMsWUFBWSxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFNLEdBQU4sVUFBTyxLQUFnQjtRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsb0NBQU0sR0FBTixVQUFPLEtBQWE7UUFDbkIsTUFBTSxDQUFDO1lBQ04sSUFBSSxFQUFFLEtBQUs7U0FDWCxDQUFDO0lBQ0gsQ0FBQztJQUVELHdDQUFVLEdBQVY7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNDLElBQU0sTUFBTSxHQUFHLHNCQUFzQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQWxETSwyQkFBTyxHQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFtRG5DLDBCQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQztBQUVELFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3hDLG9CQUFvQixjQUFjO0lBQ2pDLGNBQWM7U0FDWixLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ2hCLEdBQUcsRUFBRSxTQUFTO1FBQ2QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7UUFDbEMsVUFBVSxFQUFFLHFCQUFxQjtRQUNqQyxZQUFZLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUM7S0FDdEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDIn0=