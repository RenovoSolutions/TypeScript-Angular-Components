"use strict";
var angular = require('angular');
exports.moduleName = 'FormTestModule';
var FormTestController = (function () {
    function FormTestController($q, $timeout) {
        this.$q = $q;
        this.$timeout = $timeout;
    }
    FormTestController.prototype.submit = function () {
        return this.$timeout(function () { return console.log('Submitted'); }, 1000);
    };
    FormTestController.prototype.save = function () {
        this.count++;
        return this.$q.when();
    };
    FormTestController.$inject = ['$q', '$timeout'];
    return FormTestController;
}());
FormRoute.$inject = ['$stateProvider'];
function FormRoute($stateProvider) {
    $stateProvider
        .state('forms', {
        url: '/forms',
        template: require('./forms.html'),
        controller: 'FormTestController',
        controllerAs: 'forms',
    });
}
angular.module(exports.moduleName, [])
    .controller('FormTestController', FormTestController)
    .config(FormRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtc0Jvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyxnQkFBZ0IsQ0FBQztBQUVuRDtJQUlDLDRCQUFvQixFQUFxQixFQUFVLFFBQWlDO1FBQWhFLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBRyxDQUFDO0lBRXhGLG1DQUFNLEdBQU47UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFZLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBeEIsQ0FBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFWTSwwQkFBTyxHQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBVy9DLHlCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFFRCxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxtQkFBbUIsY0FBYztJQUNoQyxjQUFjO1NBQ1osS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUcsRUFBRSxRQUFRO1FBQ2IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDakMsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxZQUFZLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7S0FDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=