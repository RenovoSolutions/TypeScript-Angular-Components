"use strict";
var angular = require('angular');
var moment = require('moment');
var MiscTestController = (function () {
    function MiscTestController($scope) {
        this.$scope = $scope;
    }
    MiscTestController.prototype.$onInit = function () {
        var _this = this;
        this.myNum = 2;
        this.myValue = 1;
        this.validator = {
            validate: function () { return _this.text === 'valid'; },
            errorMessage: 'String must be valid',
        };
        var templateScope = this.$scope.$new();
        templateScope.text = 'Some text';
        this.template = {
            template: '<div>{{text}}</div>',
            scope: templateScope,
        };
        this.number = 5;
        this.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
        var unbind = this.$scope.$watch('misc.lazyLoad', function (value) {
            if (value) {
                _this.initialized = true;
                unbind();
            }
        });
    };
    MiscTestController.$inject = ['$scope'];
    return MiscTestController;
}());
angular.module('app')
    .controller('MiscTestController', MiscTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pc2NCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBV2pDO0lBV0MsNEJBQW9CLE1BQXNCO1FBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQUksQ0FBQztJQUUvQyxvQ0FBTyxHQUFQO1FBQUEsaUJBMEJDO1FBekJBLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNoQixRQUFRLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFyQixDQUFxQjtZQUNyQyxZQUFZLEVBQUUsc0JBQXNCO1NBQ3BDLENBQUM7UUFFRixJQUFJLGFBQWEsR0FBbUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RSxhQUFhLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixLQUFLLEVBQUUsYUFBYTtTQUNwQixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQUMsS0FBYztZQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixNQUFNLEVBQUUsQ0FBQztZQUNWLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUE3Qk0sMEJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBOEJ2Qyx5QkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNuQixVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyJ9