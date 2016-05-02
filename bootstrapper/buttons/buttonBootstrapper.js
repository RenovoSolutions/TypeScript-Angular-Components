"use strict";
var angular = require('angular');
exports.moduleName = 'ButtonTestModule';
var ButtonTestController = (function () {
    function ButtonTestController($timeout) {
        this.$timeout = $timeout;
    }
    ButtonTestController.prototype.action = function (name) {
        console.log('Action: ' + name);
    };
    ButtonTestController.prototype.wait = function (callback, name) {
        return this.$timeout(function () { return callback(name); }, 1000);
    };
    ButtonTestController.$inject = ['$timeout'];
    return ButtonTestController;
}());
ButtonRoute.$inject = ['$stateProvider'];
function ButtonRoute($stateProvider) {
    $stateProvider
        .state('buttons', {
        url: '/buttons',
        template: require('./buttons.html'),
        controller: 'ButtonTestController',
        controllerAs: 'button',
    });
}
angular.module(exports.moduleName, [])
    .controller('ButtonTestController', ButtonTestController)
    .config(ButtonRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uQm9vdHN0cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uQm9vdHN0cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV0QixrQkFBVSxHQUFXLGtCQUFrQixDQUFDO0FBRXJEO0lBRUMsOEJBQW9CLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQztJQUUxRCxxQ0FBTSxHQUFOLFVBQU8sSUFBWTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLFFBQVEsRUFBRSxJQUFJO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFUTSw0QkFBTyxHQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFVekMsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUVELFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLHFCQUFxQixjQUFjO0lBQ2xDLGNBQWM7U0FDWixLQUFLLENBQUMsU0FBUyxFQUFFO1FBQ2pCLEdBQUcsRUFBRSxVQUFVO1FBQ2YsUUFBUSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuQyxVQUFVLEVBQUUsc0JBQXNCO1FBQ2xDLFlBQVksRUFBRSxRQUFRO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQztLQUN4RCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMifQ==