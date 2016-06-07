"use strict";
var angular = require('angular');
var moment = require('moment');
exports.moduleName = 'MiscTestModule';
var MiscTestController = (function () {
    function MiscTestController($scope) {
        this.$scope = $scope;
    }
    MiscTestController.prototype.$onInit = function () {
        var _this = this;
        this.myNum = 2;
        this.myValue = 1;
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
MiscRoute.$inject = ['$stateProvider'];
function MiscRoute($stateProvider) {
    $stateProvider
        .state('misc', {
        url: '/misc',
        template: require('./misc.html'),
        controller: 'MiscTestController',
        controllerAs: 'misc',
    });
}
angular.module(exports.moduleName, [])
    .controller('MiscTestController', MiscTestController)
    .config(MiscRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pc2NCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBSXBCLGtCQUFVLEdBQVcsZ0JBQWdCLENBQUM7QUFNbkQ7SUFVQyw0QkFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBSSxDQUFDO0lBRS9DLG9DQUFPLEdBQVA7UUFBQSxpQkFxQkM7UUFwQkEsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLGFBQWEsR0FBbUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2RSxhQUFhLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixLQUFLLEVBQUUsYUFBYTtTQUNwQixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFckUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFVBQUMsS0FBYztZQUNqRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixNQUFNLEVBQUUsQ0FBQztZQUNWLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUF4Qk0sMEJBQU8sR0FBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBeUJ2Qyx5QkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFFRCxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxtQkFBbUIsY0FBYztJQUNoQyxjQUFjO1NBQ1osS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNkLEdBQUcsRUFBRSxPQUFPO1FBQ1osUUFBUSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDaEMsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxZQUFZLEVBQUUsTUFBTTtLQUNwQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7S0FDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=