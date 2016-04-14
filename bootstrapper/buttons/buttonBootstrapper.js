"use strict";
var angular = require('angular');
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
angular.module('app')
    .controller('ButtonTestController', ButtonTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uQm9vdHN0cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uQm9vdHN0cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQztJQUVDLDhCQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUFJLENBQUM7SUFFMUQscUNBQU0sR0FBTixVQUFPLElBQVk7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxRQUFRLEVBQUUsSUFBSTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFkLENBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBVE0sNEJBQU8sR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBVXpDLDJCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNuQixVQUFVLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9