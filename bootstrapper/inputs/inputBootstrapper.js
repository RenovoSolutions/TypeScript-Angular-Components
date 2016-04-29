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
            { name: 'item1' },
            { name: 'item2' },
            { name: 'item3' },
            { name: 'item4' },
            { name: 'item5' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dEJvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDakMsUUFBTyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sVUFBVSxHQUFHLHVDQUFRLENBQUMsUUFBUSxDQUFDO0FBR3pCLGtCQUFVLEdBQVcsaUJBQWlCLENBQUM7QUFNcEQ7SUFjQyw2QkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFBRyxDQUFDO0lBRTdDLHFDQUFPLEdBQVA7UUFBQSxpQkEyQkM7UUExQkEsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNkLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2pCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7U0FDakIsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRSxVQUFVLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxnQkFBZ0IsR0FBRztZQUN2QixRQUFRLEVBQUUsY0FBZSxPQUFBLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFsQixDQUFrQjtZQUMzQyxZQUFZLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdkIsUUFBUSxFQUFFLGNBQWUsT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBbEIsQ0FBa0I7WUFDM0MsWUFBWSxFQUFFLHdCQUF3QjtTQUN0QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNsQixRQUFRLEVBQUUsY0FBZSxPQUFBLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxFQUFuQixDQUFtQjtZQUM1QyxZQUFZLEVBQUUsc0JBQXNCO1NBQ3BDLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQU0sR0FBTixVQUFPLEtBQWdCO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBTSxHQUFOLFVBQU8sS0FBYTtRQUNuQixNQUFNLENBQUM7WUFDTixJQUFJLEVBQUUsS0FBSztTQUNYLENBQUM7SUFDSCxDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0MsSUFBTSxNQUFNLEdBQUcsc0JBQXNCLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBbERNLDJCQUFPLEdBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQW1EbkMsMEJBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDO0FBRUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDeEMsb0JBQW9CLGNBQWM7SUFDakMsY0FBYztTQUNaLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDaEIsR0FBRyxFQUFFLFNBQVM7UUFDZCxRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUNsQyxVQUFVLEVBQUUscUJBQXFCO1FBQ2pDLFlBQVksRUFBRSxPQUFPO0tBQ3JCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQztLQUN0RCxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMifQ==