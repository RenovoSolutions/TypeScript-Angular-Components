"use strict";
var angular = require('angular');
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
angular.module('app')
    .controller('FormTestController', FormTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtc0Jvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkM7SUFJQyw0QkFBb0IsRUFBcUIsRUFBVSxRQUFpQztRQUFoRSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUcsQ0FBQztJQUV4RixtQ0FBTSxHQUFOO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBWSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQXhCLENBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELGlDQUFJLEdBQUo7UUFDQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBVk0sMEJBQU8sR0FBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQVcvQyx5QkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDbkIsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMifQ==