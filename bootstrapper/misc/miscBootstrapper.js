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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pc2NCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBT3BCLGtCQUFVLEdBQVcsZ0JBQWdCLENBQUM7QUFNbkQ7SUFXQyw0QkFBb0IsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFBSSxDQUFDO0lBRS9DLG9DQUFPLEdBQVA7UUFBQSxpQkEwQkM7UUF6QkEsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQXJCLENBQXFCO1lBQ3JDLFlBQVksRUFBRSxzQkFBc0I7U0FDcEMsQ0FBQztRQUVGLElBQUksYUFBYSxHQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZFLGFBQWEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLEtBQUssRUFBRSxhQUFhO1NBQ3BCLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVyRSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBQyxLQUFjO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE1BQU0sRUFBRSxDQUFDO1lBQ1YsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTdCTSwwQkFBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUE4QnZDLHlCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQUVELFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZDLG1CQUFtQixjQUFjO0lBQ2hDLGNBQWM7U0FDWixLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2QsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUNoQyxVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFlBQVksRUFBRSxNQUFNO0tBQ3BCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztLQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMifQ==